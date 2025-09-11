import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function WelcomeScreen() {
  const token = useSelector(state=>state.auth.token);
  const [data, setData] = useState();
  
  useEffect(()=>{
    axios.get(`https://reactnativeauthapplication-default-rtdb.firebaseio.com/testValue.json?auth=${token}`).then((response)=>{
      setData(response.data);
    });

  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{data && data}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
