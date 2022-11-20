export class FormValidator {
    constructor(formElement, config) {
        this._form = formElement;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._button = config.submitButtonSelector;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._button);
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach(formElement => {
            formElement.addEventListener('input', () => {
                this._errorElement = this._form.querySelector(`.${formElement.id}-error`);
                this._checkInputValidity(formElement);
                this._toggleButtonState();
            });
        });
    }

    hideAllErrors() {
        this._toggleButtonState(this._buttonElement);

        this._inputList.forEach((input) => {
           this._errorElement = this._form.querySelector(`.${input.id}-error`);
           this._hideInputError(input);
        })
    }

    _checkInputValidity(formElement) {
        if (!formElement.validity.valid) {
            this._showInputError(formElement);
        } else {
            this._hideInputError(formElement);
        }
    }

    _showInputError(formElement) {
        formElement.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
        this._errorElement.textContent = formElement.validationMessage;
    }

    _hideInputError(formElement) {
        if (!this._errorElement) return;
        formElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    }

    _toggleButtonState() {
        if (this._validateInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _validateInput() {
        return this._inputList.some((input) => !input.validity.valid);
    }

    enableValidaton() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}