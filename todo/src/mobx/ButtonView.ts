import { makeAutoObservable } from "mobx";

class ButtonView {
    isButton = true;

    constructor() {
        makeAutoObservable(this);
    };

    changeIsButton() {
        this.isButton = !this.isButton;
    };
};

export default new ButtonView();