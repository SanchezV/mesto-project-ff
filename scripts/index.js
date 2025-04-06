// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 
// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard(name, link, deleteCard)
{
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__image').src = link;
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
for (let i = 0; i < initialCards.length; i++)
{
    cardsList.append(addCard(initialCards[i].name, initialCards[i].link, deleteCard));
}