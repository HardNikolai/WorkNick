declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  GoogleSignIn: undefined;
  HomeScreen: undefined;
  ProfileInnerScreen: undefined;
  ProfileScreen: undefined;
  ErrorEnterScreen: undefined;
  FilterTask: undefined;
  AddCatExpense: undefined;
  EnterApp: undefined;
};
