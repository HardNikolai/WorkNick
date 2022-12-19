import { makeAutoObservable, runInAction } from "mobx";
import axios, { AxiosRequestConfig } from "axios";
import ModalStore, { ITask } from "./ModalStore";


const HTTP_HEADERS:any = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

class AllTasks {
    Tasks:Array<ITask> = [];

    constructor() {
        makeAutoObservable(this);
    };


    async getAllTask() {
        const res = await axios.get('http://192.168.88.222:8000/tasks');
        if (res.status === 200) {
            runInAction(() => {
                this.Tasks = res.data.data.sort((a:ITask, b:ITask) => a.isCheck > b.isCheck);
            });
        } else {
            ModalStore.changeFlageError();
        };
    };

    async addNewTask(task:ITask) {
        if (task.text.length > 0) {
            const result = await axios.post('http://192.168.88.222:8000/task', task, HTTP_HEADERS);
            if (result.status === 200) {
                const res = await axios.get('http://192.168.88.222:8000/tasks');
                if (res.status === 200) {
                    runInAction(() => {
                        this.Tasks = res.data.data.sort((a:ITask, b:ITask) => a.isCheck > b.isCheck);
                    });
                    ModalStore.changeFlagViewAdd();
                } else {
                    alert("Ошибка добавления задачи!")
                };
            } else {
                alert("Ошибка добавления задачи!")
            }
        } else {
            alert("Невозможно добавить задачу, пустое поле!")
        }
    };

    async changeTask(task:ITask) {
        const result = await axios.patch('http://192.168.88.222:8000/task', task, HTTP_HEADERS);
        if (result.status === 200) {
            const res = await axios.get('http://192.168.88.222:8000/tasks');
            if (res.status === 200) {
                runInAction(() => {
                    this.Tasks = res.data.data.sort((a:ITask, b:ITask) => a.isCheck > b.isCheck);
                });
            } else {
                alert("Ошибка загрузки базы данных!");
            };
        };
    };

    async deleteTask(task:ITask) {
        const result = await axios.delete('http://192.168.88.222:8000/task/', { headers: HTTP_HEADERS, data: task });
        if (result.status === 200) {
            ModalStore.changeFlagViewDeleteTask();
            const res = await axios.get('http://192.168.88.222:8000/tasks');
            if (res.status === 200) {
                runInAction(() => {
                    this.Tasks = res.data.data;
                });
            } else {
                alert("Ошибка загрузки базы данных!")
            };
        };
    };
};

export default new AllTasks();

function alert(arg0: string) {
    throw new Error("Function not implemented.");
}
