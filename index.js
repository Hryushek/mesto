let edit_button = document.querySelector('.profile__edit-button');
let popup_form = document.querySelector('.popup-form');

function edit() {
    popup_form.classList.add('popup-form_opened');
}

edit_button.addEventListener('click', edit);

let close_button = document.querySelector('.popup-form__close-button');

function close() {
    popup_form.classList.remove('popup-form_opened');
}

close_button.addEventListener('click', close);

let like_button = document.querySelector('.card__like-button');

function like() {
    like_button.style.backgroundImage = "url(images/black_like.svg)";
}

like_button.addEventListener('click', like);

let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let save_button = document.querySelector('.popup-form__save-button');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    close();
}

save_button.addEventListener('click', formSubmitHandler); 