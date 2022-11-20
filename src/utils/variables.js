export const profileForm = document.querySelector('#profile_form');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const popupProfileForm = document.querySelector('#popup_profile-form');
export const buttonEditClose = document.querySelector('.popup__close-button');
export const nameInput = document.querySelector('#fullName');
export const jobInput = document.querySelector('#bio');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');
export const cardItems = document.querySelector('.card__items');
export const popupPhoto = document.querySelector('.popup_photo');
export const popupPhotoSrc = document.querySelector('.popup__image');
export const popupPhotoTitle = document.querySelector('.popup__description');
export const imageCloseButton = document.querySelector('.popup__close-button_photo');
export const placeInput = document.querySelector('#card-name');
export const placeImageInput = document.querySelector('#card-link');
export const popupNewCard = document.querySelector('#popup_new-card');
export const popupNewCardClose = document.querySelector('#new-card_close');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupPlaceForm = document.querySelector('#new-card_form');
export const popupOverlayes = document.querySelectorAll('.popup');
export const popupAvatar = document.querySelector('#popup_avatar');
export const placeSubmitBtn = popupPlaceForm.querySelector('.popup__save-button');
export const profileSubmitBtn = profileForm.querySelector('.popup__save-button');
export const avatarButton = document.querySelector('.profile__avatar');
export const avatarForm = document.querySelector('#avatar_form');
export const popupConfirm = document.querySelector('#popup_confirm');


export const initialCards = [
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

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    avatarSelector: '.profile__avatar-image',
};