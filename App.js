import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store/store';
import IconButton from "./components/ui/IconButton";
import { useEffect } from 'react';
import { logout } from './store/slices/authSlices';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({tintColor})=>{
          return <IconButton color={tintColor} size={24} icon={"exit"} onPress={()=>dispatch(logout())} />
        }
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export function Navigation() {
  const token = useSelector(state=>state.auth.token);
  // useEffect(() => {
  //   console.log('Token değişti:', token);
  // }, [token]);

console.log(token);

  return (
    <NavigationContainer>
      {
        !token ? 
        <AuthStack/> : 
        <AuthenticatedStack/>
      }
    </NavigationContainer>
  );
}
//m.erenyilmaz2007@gmail.com
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}
