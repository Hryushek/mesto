export class Card {
    constructor(data, selector, openCard) {
        this._title = data.place;
        this._image = data.link;
        this._selector = selector;
        this._openCard = openCard;
    }

    _getCard() {
        const cardTemplate = document.querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardTemplate;
    }

    generateCard() {
        this._element = this._getCard();
        this._imageElement = this._element.querySelector('.card__photo');
        this._imageElement.src = this._image;
        this._element.querySelector('.card__name').textContent = this._title;
        this._imageElement.alt = this._title;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.card__like-button');
        this._imageElement.addEventListener('click', () => {
            this._openCard(this._title, this._image);
        });

        this._likeButton.addEventListener('click', () => {
            this._handleLikeCLick();
        });

        this._element.querySelector('.card__thrash').addEventListener('click', () => {
            this._handleDeleteClick();
        });
    }

    _handleLikeCLick() {
            this._likeButton.classList.toggle('card__like-button_activated');
    }
    
    _handleDeleteClick() {
            this._element.remove();
            this._element = null;
    }
    
} 