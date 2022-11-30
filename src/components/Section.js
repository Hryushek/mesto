export default class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = container;
    }

    addItem(item) {
        this._container.prepend(item)
    }

    renderItems(items) {
        items.forEach(el => {
            this._renderer(el)
        })
    }
}