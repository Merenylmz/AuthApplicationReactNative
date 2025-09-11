import axios from "axios";

const API_KEY = "YOURAPIKEY";

// mode ------> signUp, signInWithPassword
const authenticate = async(mode, email, password) =>{
    const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true
    });
    const data = res.data;
    return data;
};

const createUser = async(email, password) =>{
    return await authenticate("signUp", email, password);
}
const loginAuth = async(email, password) =>{
    return (await authenticate("signInWithPassword", email, password)).idToken;
}

export {createUser, loginAuth};