export {createCard, toggleLike, deleteCard, updateLikesCount};

// Функция создания карточки
function createCard(cardTemplate, card, deleteCallback, showImage, handleLikeCallback, currentUserId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    // Обновляем счетчик лайков для этой карточки
    updateLikesCount(cardElement, card.likes);

    // Проверяем, поставил ли текущий пользователь лайк
    if (card.likes.some(user => user._id === currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (card.owner._id !== currentUserId) {
        deleteButton.style.display = 'none';
    }

    // Обработчик для показа изображения
    cardImage.addEventListener('click', () => showImage(card.link, card.name));

    // Обработчик для удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCallback(card._id, cardElement);
    });

    // Обработчик для лайка 
    likeButton.addEventListener('click', () => {
        handleLikeCallback(likeButton, card, cardElement);
    });
    
    return cardElement;
}

// Функция добавления/снятия лайка
function toggleLike(likeBtn) {
    likeBtn.classList.toggle('card__like-button_is-active');
}

function updateLikesCount(cardElement, likesArray) {
  const likesCountElem = cardElement.querySelector('.card__like-count');
  likesCountElem.textContent = likesArray.length;
}

function deleteCard(cardElement) {
    cardElement.remove();
}