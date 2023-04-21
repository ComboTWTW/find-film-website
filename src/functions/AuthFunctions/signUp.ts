import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged  } from 'firebase/auth'

interface authDataSignUpT  {
    username: string;
    email: string;
    password: string;
  }

    /* After user creation Instantly chagning the name to specified */
const newName = (authDataSignUp:authDataSignUpT):Promise<string> => {

    return new Promise<string>((resolve) => {
        onAuthStateChanged(auth, (user:any) => {
            updateProfile(user, {
                displayName: authDataSignUp.username
            })
            .then(() => resolve('resolved'))
            .catch(err => console.error(err));
        });
    })

}

    /* Create new user and change their name */
export const signUp = async (authDataSignUp:authDataSignUpT) => {

    try {
        await createUserWithEmailAndPassword(auth, authDataSignUp.email, authDataSignUp.password); 
        await newName(authDataSignUp);
    
    } catch(err) {
        throw err;
    }

}
