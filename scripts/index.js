const editButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
// const likeButton = document.querySelector('.card__like-button');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
// const saveButton = document.querySelector('.popup__save-button');

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

// function like() {
//     likeButton.style.backgroundImage = "url(images/black_like.svg)";
// }

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}

editButton.addEventListener('click', popupOpen);

editButton.addEventListener('click', formValue);

closeButton.addEventListener('click', popupClose);

// likeButton.addEventListener('click', like);

popupForm.addEventListener('submit', formSubmitHandler); 