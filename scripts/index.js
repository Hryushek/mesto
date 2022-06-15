const editButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup');
const editCloseButton = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const elementsItem = document.querySelector('.elements__item');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoSrc = document.querySelector('.popup__image');
const popupPhotoTitle = document.querySelector('.popup__description');
const imageCloseButton = document.querySelector('.popup__close-button_photo');
let cardContent = '';
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const placeInput = document.querySelector('#card-name');
const placeImageInput = document.querySelector('#card-link');
const popupNewCard = document.querySelector('#popup_new-card');
const popupNewCardClose = document.querySelector('#new-card_close');
const addButton = document.querySelector('.profile__add-button');
const popupPlaceForm = document.querySelector('#new-card_form');

for (let i = 0; i < initialCards.length; i++) {
    cardContent = fillCard(initialCards[i].name, initialCards[i].link);
    showCard(cardContent, elementsItem);
}

function fillCard(title, src) {
    const cardTemplate = document.querySelector('#card').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardPhoto = card.querySelector('.card__photo')
    cardPhoto.src = src
    cardPhoto.alt = title
    card.querySelector('.card__name').textContent = title;
    card.querySelector('.card__photo').addEventListener('click', () => {
        cardOpen(title, src);
    });
    card.querySelector('.card__like-button').addEventListener('click', likeButton);
    card.querySelector('.card__thrash').addEventListener('click', deleteCard);
    return card;
}

function showCard(card, container) {
    container.prepend(card);
}

function cardOpen(title, src) {
    openPopup(popupPhoto);
    popupPhotoSrc.src = src;
    popupPhotoTitle.textContent = title;
    popupPhotoSrc.alt = title;
}

function openPopup(element) {
    element.classList.add('popup_opened');
}

function likeButton(event) {
    const evtTarget = event.target;
    evtTarget.classList.toggle('card__like-button_activated');
}

function deleteCard(event) {
    const evtTarget = event.target;
    evtTarget.closest('.card').remove();
}


function popupOpen() {
    popupForm.classList.add('popup_opened');
}

function formValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function popupClose() {
    popupForm.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}

function closePopupPhoto() {
    popupPhoto.classList.remove('popup_opened');
}

function newPlacePopup() {
    placeInput.value = '';
    placeImageInput.value = '';
}

function placeSubmitHandler(evt) {
    evt.preventDefault();
    cardContent = fillCard(placeInput.value, placeImageInput.value);
    showCard(cardContent, elementsItem);
    newCardClose();
}

function newCardOpen() {
    popupNewCard.classList.add('popup_opened');
}

function newCardClose() {
    popupNewCard.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);

editButton.addEventListener('click', formValue);

editCloseButton.addEventListener('click', popupClose);

popupForm.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', newCardOpen, newPlacePopup);

popupNewCardClose.addEventListener('click', newCardClose);

imageCloseButton.addEventListener('click', closePopupPhoto);

popupPlaceForm.addEventListener('submit', placeSubmitHandler);