export {getUserProfile, getInitialCards, updateUserProfile, createNewCard, deleteCardApi, setLikeCard, deleteLikeCard, updateAvatar}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
    headers: {
        authorization: 'aa274eb0-e5ec-41c9-9bd1-c6b6f3a508a2',
        'Content-Type': 'application/json'
    }
}

function request(url, options) {
    return fetch(`${config.baseUrl}${url}`, options);
}

function checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

function getUserProfile() {
    return request('/users/me', { headers: config.headers })
    .then(checkResponse)
}

function getInitialCards() {
    return request('/cards', { headers: config.headers })
    .then(checkResponse)
}

function updateUserProfile(userName, userWork) {
    return request('/users/me', { 
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userWork
        })  
    })
    .then(checkResponse)
}

function createNewCard(nameCard, linkCard) {
    return request('/cards', { 
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameCard,
            link: linkCard
        })  
    })
    .then(checkResponse)
}

function deleteCardApi(idCard) {
    return request(`/cards/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse)
}

function setLikeCard(idCard) {
    return request(`/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(checkResponse)
}

function deleteLikeCard(idCard) {
    return request(`/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse)
}

function updateAvatar(url) {
    return request('/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    })
    .then(checkResponse)
}