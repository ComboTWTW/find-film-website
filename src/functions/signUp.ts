import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged  } from 'firebase/auth'



interface authData  {
    username: string;
    email: string;
    password: string;
    loginType: string;
}

const user:any = auth.currentUser;

export const signUp = async (authData:authData) => {
    try {
      await createUserWithEmailAndPassword(auth, authData.email, authData.password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
            updateProfile(user, {
                displayName: authData.username
            }).then(() => {
                return new Promise(resolve => {
                    console.log(auth.currentUser?.displayName + " is signed up");
                    resolve('resolved');
                }); 
            }).catch((error) => {
                console.error(error);
            });
        }
        });
    } catch(err) {
      console.error(err)
    }
  }