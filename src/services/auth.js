import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAM80kNqvK4OuDGP4nS0a89qTCl1zUi0Eo",
    authDomain: "dortes-training.firebaseapp.com",
    databaseURL: "https://dortes-training-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dortes-training",
    storageBucket: "dortes-training.appspot.com",
    messagingSenderId: "177995384003",
    appId: "1:177995384003:web:eb4b3282c3f7e67f510e76"
};
app.initializeApp(config);
const auth = app.auth();
const db = app.database();
let currentUser = null;
auth.onAuthStateChanged(user=> {
  if(user) {
    currentUser = user;
  } else {
      currentUser = null;
  } 
});

 
class AuthService {
  // *** Auth API ***
  static getDatabase = () => db
  static doSignInWithEmailAndPassword = (email, password) => 
    auth.signInWithEmailAndPassword(email, password);
  static doSignOut = () => auth.signOut();
  static doPasswordReset = email => auth.sendPasswordResetEmail(email);
  static doPasswordUpdate = password => auth.currentUser.updatePassword(password);
  static currentUser = ()=> currentUser
  static authHook = (callback)=> auth.onAuthStateChanged(callback) 
}
 
export default AuthService;




