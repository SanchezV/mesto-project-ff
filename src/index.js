import './pages/index.css';
import { createCard, deleteCard, toggleLike, updateLikesCount} from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import { getUserProfile, getInitialCards, updateUserProfile, createNewCard, deleteCardApi, setLikeCard, deleteLikeCard, updateAvatar } from './scripts/api.js';

const cardTemplate = document.querySelector('#card-template').content; 
const cardsList = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const editButtonProfile = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closeButtons = document.querySelectorAll('.popup__close');
const formAddNewCard = document.querySelector('form[name="new-place"]');
const inputNameFormAddNewCard = formAddNewCard.querySelector('.popup__input_type_card-name');
const inputLinkFormAddNewCard = formAddNewCard.querySelector('.popup__input_type_url');
const addNewCardButton = formAddNewCard.querySelector('.popup__button');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="description"]');
const formSaveProfile = formEditProfile.querySelector('.popup__button');
const editProfileButton = formEditProfile.querySelector('.popup__button');
const avatar = document.querySelector('.profile__image');
const editAvatarPopup = document.querySelector('.popup_type_new-avatar');
const formEditAvatar = document.querySelector('form[name="edit-avatar"]');
const inputLinkFormChangeAvatar = formEditAvatar.querySelector('.popup__input_type_url');
const editAvatarButton = formEditAvatar.querySelector('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_image');
const popupImage = popupAddNewCard.querySelector('.popup__image');
const popupImageName = popupAddNewCard.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

let userId;

// Функция для заполнения полей формы текущими значениями
function fillFormProfileFields() {
    nameInput.value = profileTitle.textContent; // Заполняем поле имени
    jobInput.value = profileDescription.textContent; // Заполняем поле должности
}

// Открытие попапа по клику на картинку
function openPopupFullImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
    openPopup(popupAddNewCard);
}

// Прикрепляем обработчик к форме редактирования профиля:
formEditProfile.addEventListener('submit', function(evt) {
    evt.preventDefault();
    editProfileButton.textContent = 'Сохранение...';
    updateUserProfile(nameInput.value, jobInput.value)
    .then((profile) => {
        profileTitle.textContent = profile.name;
        profileDescription.textContent = profile.about;
        formEditProfile.reset();
        closePopup(editProfilePopup); 
    })
    .catch((err) => {
        console.log('Ошибка при обновлении профиля: ' + err);
    })
        .finally(() => {
        editProfileButton.textContent = 'Сохранить';
    })
})

// Прикрепляем обработчик к форме добавления новых мест:
formAddNewCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    addNewCardButton.textContent = 'Сохранение...';
    createNewCard(inputNameFormAddNewCard.value, inputLinkFormAddNewCard.value)
    .then((card) => {
        const newCard = createCard(cardTemplate, card, handleDeleteCard, openPopupFullImage, handleLikeCard, userId);
        cardsList.prepend(newCard); // Добавляем новую карточку в начало контейнера
        formAddNewCard.reset();
        closePopup(newCardPopup);
    })
    .catch((error) => {
        console.log('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
        addNewCardButton.textContent = 'Сохранить';
    })  
})

// Прикрепляем обработчик к форме редактирования аватара:
formEditAvatar.addEventListener('submit', function(evt) {
    evt.preventDefault();
    editAvatarButton.textContent = 'Сохранение...';
    return updateAvatar(inputLinkFormChangeAvatar.value)
    .then((newAvatar) => {
        avatar.style.backgroundImage = `url(${newAvatar.avatar})`;
        formEditAvatar.reset();
        closePopup(editAvatarPopup); 
    })
    .catch((err) => {
        console.log('Ошибка при обновлении аватара: ' + err);
    })
    .finally(() => {
        editAvatarButton.textContent = 'Сохранить';
    })

})

// Вызываем функцию для заполнения полей при открытии попапа 
editButtonProfile.addEventListener('click', fillFormProfileFields);
// Открытие попапа редактирования профиля
editButtonProfile.addEventListener('click', function() { 
    openPopup(editProfilePopup);
    clearValidation(formEditProfile, validationConfig, formSaveProfile);
});
// Открытие попапа добавления нового места
addButton.addEventListener('click', function() {
    openPopup(newCardPopup);
    formAddNewCard.reset();
    clearValidation(formAddNewCard, validationConfig, addNewCardButton);
});
// Открытие попапа редактирования аватара
avatar.addEventListener('click', function() { 
    openPopup(editAvatarPopup);
    clearValidation(formEditAvatar, validationConfig, editAvatarButton);
    formEditAvatar.reset();
});

// Закрытие попапов по клику на кнопку закрытия
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    });
});

// Закрытие попапов при клике вне области содержимого
popups.forEach((popup) => {
    popup.onclick = function(event) {      
        if (event.target === popup) {
            closePopup(popup);      
        };
    };
});

function handleDeleteCard(cardId, cardElement) {
    deleteCardApi(cardId)
        .then(() => {
            deleteCard(cardElement);
        })
        .catch((err) => {
            console.error('Ошибка при удалении:', err);
        });
}

function handleLikeCard(likeButton, card, cardElement) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? deleteLikeCard : setLikeCard;
    likeMethod(card['_id'])
        .then(updatedCard => {
            updateLikesCount(cardElement, updatedCard.likes);
            toggleLike(likeButton);
        })
        .catch(err => {
            console.error(`Ошибка при ${isLiked ? 'удалении' : 'добавлении'} лайка:`, err);
        });
}

enableValidation(validationConfig); 

Promise.all([getUserProfile(), getInitialCards()])
    .then(([profile, cards]) => {
        profileTitle.textContent = profile.name;
        profileDescription.textContent = profile.about;
        avatar.setAttribute('style', `background-image: url(${profile.avatar})`);
        userId = profile['_id'];
        cards.forEach(function(card) {
            // Вывести карточки на страницу
            cardsList.append(createCard(cardTemplate, card, handleDeleteCard, openPopupFullImage, handleLikeCard, userId))
        });
    })
    .catch((error) => {
        console.log('Поймали ошибку! Вот она: ', error.message);
    })