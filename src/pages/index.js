import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import {
    buttonEditProfile,
    popupProfileForm,
    nameInput,
    jobInput,
    elementsItem,
    popupPhoto,
    profileAddButton,
    popupPlaceForm,
    profileForm,
    popupNewCard,
    initialCards,
    validationConfig,
    popupConfirm,
    avatarButton, 
    avatarForm,
    profileName,
    profileJob,
    popupAvatar,
} from '../utils/variables.js';

import Section from '../components/Section.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import './index.css';

let userId;

const cardsList = new Section({
    renderer: (data) => {
        const card = createCard(data);
        cardsList.addItem(card)
    }
}, elementsItem)

function createCard(data) {
    const card = new Card(
        {
            // изменено name на place
            place: data.place,
            link: data.link,
            likes: data.likes,
            userId,
            ownerId: data.owner._id,
            id: data._id
        },
        '#card',
        openCard,
        async () => {
            try {
                const res = await api.like(data._id);
                card.like();
                card.setLikesCount(res);
            } catch (e) {
                console.warn(e)
            }
        },
        async () => {
            try {
                const res = await api.dislike(data._id);
                card.dislike();
                card.setLikesCount(res);
            } catch (e) {
                console.warn(e)
            }
        },
        () => {
            confirmPopup.open(card)
        }
    );

    return card.generateCard();
}

const popupAdd = new PopupWithForm(popupNewCard, submitPlaceForm)
popupAdd.setEventListeners();

async function submitPlaceForm(data) {
    popupAdd.renderLoading(true, 'Сохранение...');
    try {
        const res = await api.addNewCard(data);
        const card = createCard(res);
        cardsList.addItem(card);
        popupAdd.close();
    } catch (e) {
        console.warn(e)
    } finally {
        popupAdd.renderLoading(false);
    }
}

const confirmPopup = new PopupConfirm(popupConfirm, async (card) => {
    try {
        await api.deleteCard(card._id);
        card.delete();
        confirmPopup.close();
    } catch (e) {
        console.warn(e)
    }
})
confirmPopup.setEventListeners();

const popupEdit = new PopupWithForm(popupProfileForm, submitProfileForm)
popupEdit.setEventListeners();

const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__description',
    profileAvatarSelector: '.profile__avatar-image',
})

async function submitProfileForm(data) {
    popupEdit.renderLoading(true, 'Сохранение...')
    try {
        console.log(data)
        const res = await api.setUserInfo(data);
        userInfo.setUserInfo(res);
        popupEdit.close();
    } catch (e) {
        console.warn(e)
    } finally {
        popupEdit.renderLoading(false);
    }
}

buttonEditProfile.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    popupEdit.setInputValue(info);
    popupEdit.open();
    renderProfilePopupInputs();
    editFormValidation.hideAllErrors();
});

const avatarPopup = new PopupWithForm(popupAvatar, submitAvatarChangeForm)
avatarPopup.setEventListeners();

async function submitAvatarChangeForm(data) {
    avatarPopup.renderLoading(true, 'Сохранение...')
    try {
        const res = await api.changeAvatar(data);
        userInfo.setAvatar(res);
        avatarPopup.close();
    } catch (e) {
        console.warn(e)
    } finally {
        avatarPopup.renderLoading(false);
    }
}

avatarButton.addEventListener('click', () => {
    avatarPopup.open();
    avatarFormValidation.hideAllErrors();
})

function openCard(title, src) {
    imagePopup.open(title, src)
}

function renderProfilePopupInputs() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

profileAddButton.addEventListener('click', () => {
    popupAdd.open();
    addFormValidation.hideAllErrors();
});

const editFormValidation = new FormValidator(profileForm, validationConfig);
editFormValidation.enableValidaton();
const addFormValidation = new FormValidator(popupPlaceForm, validationConfig);
addFormValidation.enableValidaton();
const avatarFormValidation = new FormValidator(avatarForm, validationConfig);
avatarFormValidation.enableValidaton();
const imagePopup = new PopupWithImage(popupPhoto);
imagePopup.setEventListeners();
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
    headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        "Content-Type": "application/json",
    },
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        cardsList.renderItems(cards.reverse());
    })
    .catch((e) => console.log(e));