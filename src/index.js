import './pages/index.css';
import {initialCards} from './scripts/cards.js'; 
import { createCard, deleteCard, toggleLike} from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// DOM узлы
const cardsList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const closeButtons = document.querySelectorAll('.popup__close');

// Вывести карточки на страницу
initialCards.forEach(element => {
    cardsList.append(createCard(cardTemplate, element.name, element.link, deleteCard, showImage, toggleLike));
});

// Редактирование профиля
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');
// Текущие значения профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
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
function handleFormSubmit(evt) {
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

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);
// Вызываем функцию для заполнения полей при открытии попапа 
editButton.addEventListener('click', fillFormFields);
// Открытие попапа редактирования профиля
editButton.addEventListener('click', () => openPopup(editPopup));
// Открытие попапа добавления нового места
addButton.addEventListener('click', () => openPopup(newCardPopup));

// Открытие попапа по клику на картинку
function showImage(link, name) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(imagePopup);
}

// Закрытие попапов по клику на кнопку закрытия
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    });
});

// Закрытие попапов при клике вне области содержимого
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
});

// Добавление новой карточки
const addNewCard = document.querySelector('.popup_type_new-card');
const place = addNewCard.querySelector('.popup__input_type_card-name');
const link = addNewCard.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы
function handleAddNewCard(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение формы
    // Получаем значения из полей ввода
    const newName = place.value;
    const newLink = link.value;
    // Создаем новую карточку и добавляем её в начало контейнера
    const newCard = createCard(cardTemplate, newName, newLink, deleteCard, showImage);
    cardsList.prepend(newCard); // Добавляем новую карточку в начало контейнера
    // Очищаем поля формы
    clearFormFields(place, link);
    // Закрываем попап (предполагается наличие функции closePopup)
    closePopup(newCardPopup); 
}

// Прикрепляем обработчик к форме:
addNewCard.addEventListener('submit', handleAddNewCard);