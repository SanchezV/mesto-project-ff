export {openPopup, closePopup};

// Функция для открытия попапа
function openPopup(popup) {
    popup.classList.toggle('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', handleEscClose);
}

// Функция для закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose); 
}

// Функция для закрытия попапа по нажатию "Esc"
function handleEscClose(event) {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup[style*="display: flex"]'); // Находим открытый попап
        if (openPopup) {
            closePopup(openPopup);
        }
    }
}