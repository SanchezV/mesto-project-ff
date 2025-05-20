export {createCard, toggleLike};

// Функция создания карточки
function createCard(cardTemplate, card, deleteCardApi, showImage, setLikeCard, deleteLikeCard, currentUserId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesCountElem = cardElement.querySelector('.card__like-count');
    updateLikesCount(cardTemplate, card.likes);
    if (card.owner._id !== currentUserId) {
        deleteButton.style.display = 'none';
    }
    // Обработчик для показа изображения
    cardImage.addEventListener('click', () => showImage(card.link, card.name));
    // Обработчик для удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCardApi(card._id)
            .then(() => {
                cardElement.remove();
            })
            .catch((err) => {
                console.error('Ошибка при удалении:', err);
            });
    });
    // Обработчик для лайка 
    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');
        if (!isLiked) {
            // Добавляем лайк
            setLikeCard(card['_id'])
            .then(updatedCard => {
                likesCountElem.textContent = updatedCard.likes.length;
                toggleLike(likeButton);
            })
            .catch(err => console.error('Ошибка при добавлении лайка:', err));
        } else {
            // Удаляем лайк
            deleteLikeCard(card['_id'])
            .then(updatedCard => {
                likesCountElem.textContent = updatedCard.likes.length;
                toggleLike(likeButton);
            })
            .catch(err => console.error('Ошибка при удалении лайка:', err));
        }
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