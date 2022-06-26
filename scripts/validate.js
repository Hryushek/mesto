const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };
  const form = document.querySelector(validationConfig.formSelector);
  const formInput = form.querySelector(validationConfig.inputSelector);
  const formError = form.querySelector(`.${formInput.id}-error`);
  
  const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };
  
  function foundInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (foundInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    };
  };
  
  function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };
  
  function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationConfig);
    })
  };

  function disableSubmitButton(element) {
    element.setAttribute('disabled', true);
    element.classList.add('popup__save-button_inactive');
  }
  
  enableValidation(validationConfig);