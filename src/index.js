import './pages/index.css';
import {initialCards} from './scripts/cards.js'; 
import { createCard, deleteCard, toggleLike} from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';

const cardTemplate = document.querySelector('#card-template').content; 
const cardsList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closeButtons = document.querySelectorAll('.popup__close');
const addNewCard = document.querySelector('form[name="new-place"]');
const inputNameFormAddNewCard = addNewCard.querySelector('.popup__input_type_card-name');
const inputLinkFormAddNewCard = addNewCard.querySelector('.popup__input_type_url');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_image');
const popupImage = popupAddNewCard.querySelector('.popup__image');
const popupImageName = popupAddNewCard.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');

// Функция для заполнения полей формы текущими значениями
function fillFormFields() {
    nameInput.value = profileTitle.textContent; // Заполняем поле имени
    jobInput.value = profileDescription.textContent; // Заполняем поле должности
}

// Функция для очистки полей после отправки
function clearFormFields(input1, input2) {
    input1.value = ''; // Очищаем поле имени
    input2.value = ''; // Очищаем поле должности
}

// Обработчик «отправки» формы
function handleEditProfile(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы
    // Получаем значения полей
    const newName = nameInput.value;
    const newJob = jobInput.value;
    // Обновляем значения профиля на странице
    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;
    // Очищаем поля после отправки
    clearFormFields(nameInput, jobInput);
    // Закрываем попап
    closePopup(editPopup); 
}

// Открытие попапа по клику на картинку
function popupFullImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
    openPopup(popupAddNewCard);
}

// Обработчик «отправки» формы
function handleAddNewCard(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение формы
    // Получаем значения из полей ввода
    const newName = inputNameFormAddNewCard.value;
    const newLink = inputLinkFormAddNewCard.value;
    // Создаем новую карточку и добавляем её в начало контейнера
    const newCard = createCard(cardTemplate, newName, newLink, deleteCard, popupFullImage, toggleLike);
    cardsList.prepend(newCard); // Добавляем новую карточку в начало контейнера
    // Очищаем поля формы
    clearFormFields(inputNameFormAddNewCard, inputLinkFormAddNewCard);
    // Закрываем попап (предполагается наличие функции closePopup)
    closePopup(newCardPopup); 
}

// Вывести карточки на страницу
initialCards.forEach(element => {
    cardsList.append(createCard(cardTemplate, element.name, element.link, deleteCard, popupFullImage, toggleLike));
});

// Прикрепляем обработчик к форме:
formEditProfile.addEventListener('submit', handleEditProfile);
// Вызываем функцию для заполнения полей при открытии попапа 
editButton.addEventListener('click', fillFormFields);
// Открытие попапа редактирования профиля
editButton.addEventListener('click', () => openPopup(editPopup));
// Открытие попапа добавления нового места
addButton.addEventListener('click', () => openPopup(newCardPopup));

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

// Прикрепляем обработчик к форме:
addNewCard.addEventListener('submit', handleAddNewCard);