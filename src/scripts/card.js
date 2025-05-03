export {createCard, deleteCard, toggleLike};

// Функция создания карточки
function createCard(cardTemplate, name, link, deleteCard, showImage, likeCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.alt = name;
    cardImage.src = link;
    cardElement.querySelector('.card__title').textContent = name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    // Обработчик для показа изображения
    cardImage.addEventListener('click', () => showImage(link, name));
    // Обработчик для удаления карточки
    deleteButton.addEventListener('click', deleteCard);
    // Обработчик для лайка с использованием переданного колбэка
    likeButton.addEventListener('click', likeCallback); // Используем переданный колбэк
    return cardElement;
}

// Функция удаления карточки
function deleteCard(event) {  
    const deleteButton = event.target;
    const cardToRemove = deleteButton.closest('.card');
    if (cardToRemove) {
        cardToRemove.remove();
    }
}

// Функция добавления/снятия лайка
function toggleLike(event) {
    const likeButton = event.target; // Получаем элемент кнопки, на которую нажали
    likeButton.classList.toggle('card__like-button_is-active'); // Переключаем класс для изменения стиля
}