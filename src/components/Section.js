export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._selector = containerSelector;
    }

    addItem(item) {
        this._selector.prepend(item)
    }

    renderItem() {
        this._renderedItems.forEach(element => {
            this._renderer(element)
        })
    }
}