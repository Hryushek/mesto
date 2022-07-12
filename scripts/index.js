import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfileForm = document.querySelector('#popup_profile-form');
const buttonEditClose = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#bio');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const elementsItem = document.querySelector('.elements__item');
const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoSrc = document.querySelector('.popup__image');
const popupPhotoTitle = document.querySelector('.popup__description');
const imageCloseButton = document.querySelector('.popup__close-button_photo');
const placeInput = document.querySelector('#card-name');
const placeImageInput = document.querySelector('#card-link');
const popupNewCard = document.querySelector('#popup_new-card');
const popupNewCardClose = document.querySelector('#new-card_close');
const profileAddButton = document.querySelector('.profile__add-button');
const popupPlaceForm = document.querySelector('#new-card_form');
const popupOverlayes = document.querySelectorAll('.popup');

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

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

initialCards.forEach((item) => {
    const cardItem = createNewCard(item);
    elementsItem.prepend(cardItem);
});

function createNewCard(data) {
    const card = new Card(data, '#card', openCard);
    const cardElement = card.generateCard();
    return cardElement;
};

function renderCard(card, container) {
    container.prepend(card);
};

function openCard(title, src) {
    openPopup(popupPhoto);
    popupPhotoSrc.src = src;
    popupPhotoTitle.textContent = title;
    popupPhotoSrc.alt = title;
};

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
};

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
};

function setProfileFormFieldsValues() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

function saveProfileFormChanges (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileForm);
};

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const cardValue = {
        name: placeInput.value,
        link: placeImageInput.value,
    };
    const cardItem = createNewCard(cardValue);
    renderCard(cardItem, elementsItem);
    closePopup(popupNewCard);
    popupPlaceForm.reset();
    placeFormValidation.disableSubmitButton();
};

buttonEditProfile.addEventListener('click', () => {
    openPopup(popupProfileForm);
    setProfileFormFieldsValues();
});

buttonEditClose.addEventListener('click', () => {
    closePopup(popupProfileForm);
});

popupProfileForm.addEventListener('submit', saveProfileFormChanges);

profileAddButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

popupNewCardClose.addEventListener('click', () => {
    closePopup(popupNewCard);
});

imageCloseButton.addEventListener('click', () => {
    closePopup(popupPhoto);
});

popupPlaceForm.addEventListener('submit', handleAddCardSubmit);

popupOverlayes.forEach((popupElement) => popupElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}));

const closePopupByEscape = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    }
};

const profileFormValidation = new FormValidator(popupProfileForm, validationConfig);
profileFormValidation.enableValidaton();

const placeFormValidation = new FormValidator(popupPlaceForm, validationConfig);
placeFormValidation.enableValidaton();
