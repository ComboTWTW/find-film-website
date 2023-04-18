import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged  } from 'firebase/auth'

interface authData  {
    username: string;
    email: string;
    password: string;
    loginType: string;
}

    /* After user creation Instantly chagning the name to specified */
const newName = (authData:authData):Promise<string> => {

    return new Promise<string>((resolve) => {
        onAuthStateChanged(auth, (user:any) => {
            updateProfile(user, {
                displayName: authData.username
            })
            .then(() => resolve('resolved'))
            .catch(err => console.error(err));
        });
    })

}
    /* Create new user and change their name */
export const signUp = async (authData:authData) => {
    try {

        await createUserWithEmailAndPassword(auth, authData.email, authData.password); 
        await newName(authData);
    
} catch(err) {
    console.error(err)
}
}
