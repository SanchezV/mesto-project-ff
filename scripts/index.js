// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(name, link, deleteCard)
{
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.alt = name;
    cardImage.src = link;
    cardElement.querySelector('.card__title').textContent = name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard); 
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(cardElement)
{  
    const cardToRemove = cardElement.target.closest('.card');
    cardToRemove.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    cardsList.append(createCard(element.name, element.link, deleteCard));
});