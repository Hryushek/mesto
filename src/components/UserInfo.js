export default class UserInfo {
    constructor({ titleSelector, subtitleSelector }) {
    this._name = document.querySelector(titleSelector);
    this._about = document.querySelector(subtitleSelector);
    }

    getUserInfo() {
        const info = {
            name: this._name.textContent,
            bio: this._about.textContent,
        }
        return info
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.bio;
    }
}