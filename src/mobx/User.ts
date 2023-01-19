import { makeAutoObservable, runInAction } from "mobx";

class User {
  user: any = {
  };
  nameUser = "";
  token = "";

  constructor() {
    makeAutoObservable(this);
  };

  setUser(res: any) {
    runInAction(() => this.user = res);
    runInAction(() => this.nameUser = res.profile.email)
  };

  setToken(str: string) {
    runInAction(() => this.token = str);
  };

};

export default new User();