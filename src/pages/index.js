import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import {
    buttonEditProfile,
    popupProfileForm,
    nameInput,
    jobInput,
    profileName,
    profileJob,
    elementsItem,
    popupPhoto,
    profileAddButton,
    popupPlaceForm,
    profileForm,
    popupNewCard,
    initialCards,
    validationConfig
} from '../utils/variables.js';

import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

const createCards = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = createCard(data);
        createCards.addItem(card)
    }
}, elementsItem)
createCards.renderItem()

function createCard(data) {
    const card = new Card(data, '#card', openCard);
    const cardElement = card.generateCard();
    return cardElement;
}

function openCard(title, src) {
    imagePopup.open(title, src)
}

function renderProfilePopupInputs() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function submitProfileForm(obj) {
    info.setUserInfo(obj)
}

function submitPlaceForm(obj) {
    const card = createCard(obj)
    createCards.addItem(card);
    popupAdd.close();
}

buttonEditProfile.addEventListener('click', () => {
    popupEdit.open();
    renderProfilePopupInputs();
    editFormValidation.hideAllErrors();
});

profileAddButton.addEventListener('click', () => {
    popupAdd.open();
    addFormValidation.hideAllErrors();
});

const editFormValidation = new FormValidator(profileForm, validationConfig);
editFormValidation.enableValidaton();
const addFormValidation = new FormValidator(popupPlaceForm, validationConfig);
addFormValidation.enableValidaton();
const imagePopup = new PopupWithImage(popupPhoto);
imagePopup.setEventListeners();
const popupAdd = new PopupWithForm(popupNewCard, submitPlaceForm)
popupAdd.setEventListeners();
const popupEdit = new PopupWithForm(popupProfileForm, submitProfileForm)
popupEdit.setEventListeners();
const info = new UserInfo({
    profileName: profileName,
    profileJob: profileJob
})

console.log(popupAdd);
