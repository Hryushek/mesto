const validation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };
  const form = document.querySelector(validation.formSelector);
  const formInput = form.querySelector(validation.inputSelector);
  const formError = form.querySelector(`.${formInput.id}-error`);
  
  const showInputError = (formElement, inputElement, errorMessage, validationElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationElement.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationElement.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, validationElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationElement.inputErrorClass);
    errorElement.classList.remove(validationElement.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, validationElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationElement);
    } else {
      hideInputError(formElement, inputElement, validationElement);
    }
  };
  
  function foundInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  function toggleButtonState(inputList, buttonElement, validationElement) {
    if (foundInvalidInput(inputList)) {
      buttonElement.classList.add(validationElement.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationElement.inactiveButtonClass);
      buttonElement.disabled = false;
    };
  };
  
  function setEventListeners(formElement, validationElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationElement.inputSelector));
    const buttonElement = formElement.querySelector(validationElement.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationElement);
        toggleButtonState(inputList, buttonElement, validationElement);
      });
    });
  };
  
  function enableValidation(validationElement) {
    const formList = Array.from(document.querySelectorAll(validationElement.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationElement);
    })
  };
  
  enableValidation(validation);