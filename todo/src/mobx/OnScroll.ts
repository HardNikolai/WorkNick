import { makeAutoObservable } from "mobx";

class OnScroll {
    position = 0;

    constructor() {
        makeAutoObservable(this);
    };

    changePosition(cords:number) {
        this.position = cords;
    };
};

export default new OnScroll();