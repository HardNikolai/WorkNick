import { makeAutoObservable } from "mobx";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

class InputText {
    InputText = "";

    constructor() {
        makeAutoObservable(this);
    };
    
    changeInputText(e:NativeSyntheticEvent<TextInputChangeEventData>) {
        if (e) {
            this.InputText = e.nativeEvent.text.trim();
        };
    };
    clearText() {
        this.InputText = "";
    }
};

export default new InputText();