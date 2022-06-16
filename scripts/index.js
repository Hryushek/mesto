const editButton = document.querySelector('.profile__edit-button');
const popupProfileForm = document.querySelector('.popup');
const editCloseButton = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const elementsItem = document.querySelector('.elements__item');
const popupPhoto = document.querySelector('.popup_photo');
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
const cardTemplate = document.querySelector('#card').content;

for (let i = 0; i < initialCards.length; i++) {
    cardContent = createCard(initialCards[i].name, initialCards[i].link);
    showCard(cardContent, elementsItem);
}

function createCard(title, src) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardPhoto = card.querySelector('.card__photo');
    cardPhoto.src = src
    cardPhoto.alt = title
    card.querySelector('.card__name').textContent = title;
    card.querySelector('.card__photo').addEventListener('click', () => {
        openCard(title, src);
    });
    card.querySelector('.card__like-button').addEventListener('click', likeCard);
    card.querySelector('.card__thrash').addEventListener('click', deleteCard);
    return card;
}

function showCard(card, container) {
    container.prepend(card);
}

function openCard(title, src) {
    openPopup(popupPhoto);
    popupPhotoSrc.src = src;
    popupPhotoTitle.textContent = title;
    popupPhotoSrc.alt = title;
}

function openPopup(element) {
    element.classList.add('popup_opened');
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function likeCard(event) {
    const evtTarget = event.target;
    evtTarget.classList.toggle('card__like-button_activated');
}

function deleteCard(event) {
    const evtTarget = event.target;
    evtTarget.closest('.card').remove();
}

function showProfileFormValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function saveProfileFormChages (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileForm);
}

function showEmptyPlaceForm() {
    placeInput.value = '';
    placeImageInput.value = '';
}

function addCard(evt) {
    evt.preventDefault();
    cardContent = createCard(placeInput.value, placeImageInput.value);
    showCard(cardContent, elementsItem);
    closePopup(popupNewCard);
    popupPlaceForm.reset();
}

editButton.addEventListener('click', () => {
    openPopup(popupProfileForm);
    showProfileFormValue();
});

editCloseButton.addEventListener('click', () => {
    closePopup(popupProfileForm);
});

popupProfileForm.addEventListener('submit', saveProfileFormChages);

addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
    showEmptyPlaceForm();
});

popupNewCardClose.addEventListener('click', () => {
    closePopup(popupNewCard);
});

imageCloseButton.addEventListener('click', () => {
    closePopup(popupPhoto);
});

popupPlaceForm.addEventListener('submit', addCard);