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
 
class AuthService {
  constructor() {
    if(!window.authService) {
      app.initializeApp(config);
    }
 
    this.auth = app.auth();
    this.db = app.database();
    this.auth.onAuthStateChanged(user=> {
      if(user) {
        if(window.location.pathname === "/") {
          window.location.href = "/home";
        }
      } else {
          if(window.location.pathname !== "/") {
            window.location.href = "/";
          }
      } 
    });
  }
 
  // *** Auth API ***
 
  doSignInWithEmailAndPassword = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);
  
 
  doSignOut = () => this.auth.signOut();

 
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}
 
export default AuthService;