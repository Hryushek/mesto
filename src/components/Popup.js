export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._form = this._popup.querySelector('.popup__form')
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('click', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._form.reset();
        document.removeEventListener('click', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (element) => {
            if (element.target.classList.contains('popup_opened') || element.target.classList.contains('popup__close-button')) {
                this.close();
            }
        })
    }
}