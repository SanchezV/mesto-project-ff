import './pages/index.css';
import { createCard} from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import {enableValidation, clearValidation, validationConfig} from './scripts/validation.js';
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

let userId;

// Функция для заполнения полей формы текущими значениями
function fillFormFields() {
    nameInput.value = profileTitle.textContent; // Заполняем поле имени
    jobInput.value = profileDescription.textContent; // Заполняем поле должности
}

// Функция для очистки полей после отправки
function clearFormFields(form) {
    form.reset();
}

// Открытие попапа по клику на картинку
function popupFullImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
    openPopup(popupAddNewCard);
}

// Прикрепляем обработчик к форме редактирования профиля:
formEditProfile.addEventListener('submit', function(evt) {
    evt.preventDefault();
    editProfileButton.textContent = 'Сохранение...';
    return updateUserProfile(nameInput.value, jobInput.value)
    .then((profile) => {
        profileTitle.textContent = profile.name;
        profileDescription.textContent = profile.about;
        clearFormFields(formEditProfile);
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
    .then((Card) => {
        const newCard = createCard(cardTemplate, Card, deleteCardApi, popupFullImage, setLikeCard, deleteLikeCard, userId);
        cardsList.prepend(newCard); // Добавляем новую карточку в начало контейнера
        clearFormFields(inputNameFormAddNewCard, inputLinkFormAddNewCard);
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
        clearFormFields(formEditAvatar);
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
editButtonProfile.addEventListener('click', fillFormFields);
// Открытие попапа редактирования профиля
editButtonProfile.addEventListener('click', function() { 
    openPopup(editProfilePopup);
    clearValidation(formEditProfile, validationConfig);
});
// Открытие попапа добавления нового места
addButton.addEventListener('click', function() {
    openPopup(newCardPopup);
    clearFormFields(formAddNewCard);
    clearValidation(formAddNewCard, validationConfig);
});
// Открытие попапа редактирования аватара
avatar.addEventListener('click', function() { 
    openPopup(editAvatarPopup);
    clearValidation(formEditAvatar, validationConfig);
    clearFormFields(formEditAvatar);
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

enableValidation(validationConfig); 

Promise.all([getUserProfile(), getInitialCards()])
    .then(([profile, cards]) => {
        profileTitle.textContent = profile.name;
        profileDescription.textContent = profile.about;
        avatar.setAttribute('style', `background-image: url(${profile.avatar})`);
        userId = profile['_id'];
        cards.forEach(function(card) {
            // Вывести карточки на страницу
            cardsList.append(createCard(cardTemplate, card, deleteCardApi, popupFullImage, setLikeCard, deleteLikeCard, userId))
        });
    })
    .catch((error) => {
        console.log('Поймали ошибку! Вот она: ', error.message);
    })