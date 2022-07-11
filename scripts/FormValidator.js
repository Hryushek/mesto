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

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
        this._errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        if (!this._errorElement) return;
        inputElement.classList.remove(this._inputErrorClass);
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