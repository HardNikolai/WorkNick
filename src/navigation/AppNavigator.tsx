import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EnterApp from '../screens/EnterApp';
import ErrorEnterScreen from '../screens/ErrorEnterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileInnerScreen from '../screens/ProfileInnerScreen';
import AddCatExpense from '../screens/BlockAddCategory';
import FilterTask from '../screens/FilterTask';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="EnterApp" component={EnterApp} />
        <Stack.Screen name="ErrorEnterScreen" component={ErrorEnterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="ProfileInnerScreen"
          component={ProfileInnerScreen}
        />
        <Stack.Screen name="AddCatExpense" component={AddCatExpense} />
        <Stack.Screen name="FilterTask" component={FilterTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;