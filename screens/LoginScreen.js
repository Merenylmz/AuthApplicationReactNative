import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { loginAuth } from "../util/auth";
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {login} from "../store/slices/authSlices";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen() {
  const [isAuthing, setIsAuthing] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let component;
  const loginTask = async({email, password}) =>{
    setIsAuthing(true);
    try {
      await AsyncStorage.setItem("Deneme", email);
      const token = await loginAuth(email, password);
      dispatch(login({token: token, user: {}}));
      // token && navigation.navigate("Welcome");
    } catch (error) {
      Alert.alert("Error", "Please Check Your Informations");
    }
    setIsAuthing(false);
  };

  if (isAuthing) {
    component = <LoadingOverlay message={"Loading..."}/>
  } else {
    component = <AuthContent isLogin onAuthenticate={loginTask}/>
  }

  return component;
}

export default LoginScreen;
