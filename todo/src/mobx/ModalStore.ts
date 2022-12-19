import { makeAutoObservable, runInAction } from "mobx";

export interface ITask {
    text: string
    isCheck: boolean
    _id: string
    date: string
    dateTime: string
    id: string
};

class ModalStore {
    isFlagChange = false;
    isFlagDelete = false;
    isViewAdd = false;
    isFlagError = false;
    isFlagViewDeleteTask = false;
    isFlagViewChangeTask = false;

    task:ITask = {
        text: "",
        isCheck: false,
        _id: "",
        date: "",
        dateTime: "",
        id: ""
    };

    constructor() {
        makeAutoObservable(this);
    };

    changeModalFlag = () => {
        this.isFlagChange = !this.isFlagChange;
    };

    changeFlagDelete = () => {
        this.isFlagDelete = !this.isFlagDelete;
    };

    changeFlagViewAdd() {
        this.isViewAdd = !this.isViewAdd;
        if (this.isViewAdd) {
            runInAction(() =>  setTimeout(() => {runInAction(() => {this.isViewAdd = !this.isViewAdd})}, 1000));
        };
    };

    changeFlageError() {
        this.isFlagError = !this.isFlagError;
    };

    changeFlagViewDeleteTask() {
        this.isFlagViewDeleteTask = !this.isFlagViewDeleteTask;
        if (this.isFlagViewDeleteTask) {
            runInAction(() =>  setTimeout(() => {runInAction(() => {this.isFlagViewDeleteTask = !this.isFlagViewDeleteTask})}, 1000));
        };
    };

    changeFlagViewChangeTask() {
        this.isFlagViewChangeTask = !this.isFlagViewChangeTask;
        if (this.isFlagViewChangeTask) {
            runInAction(() =>  setTimeout(() => {runInAction(() => {this.isFlagViewChangeTask = !this.isFlagViewChangeTask})}, 1000));
        };
    };

    setTask(item:ITask) {
        this.task = item;
    };
};

export default new ModalStore();