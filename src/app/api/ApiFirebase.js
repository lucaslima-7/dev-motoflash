import firebaseService from "app/config/firebase/index";
import history from "@history";

export const submitLoginWithFireBase = ({ email, password }) => {
  firebaseService.auth &&
    firebaseService.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("success", response)
      })
      .catch(error => {
        const usernameErrorCodes = [
          "auth/email-already-in-use",
          "auth/invalid-email",
          "auth/operation-not-allowed",
          "auth/user-not-found",
          "auth/user-disabled"
        ];
        const passwordErrorCodes = [
          "auth/weak-password",
          "auth/wrong-password"
        ];
        const response = {
          email: usernameErrorCodes.includes(error.code)
            ? error.message
            : null,
          password: passwordErrorCodes.includes(error.code)
            ? error.message
            : null
        };

        if (error.code === "auth/invalid-api-key") {
          console.log("Erro de API Key");
        }

        console.log("Erro", response)
      });
}

export const registerWithFirebase = ({ email, password }) => {
  firebaseService.auth && firebaseService.auth.createUserWithEmailAndPassword(email, password)
    .then(response => {
      history.push('/users')
    })
    .catch(error => {
      const usernameErrorCodes = [
        'auth/operation-not-allowed',
        'auth/user-not-found',
        'auth/user-disabled'
      ];
      const emailErrorCodes = [
        'auth/email-already-in-use',
        'auth/invalid-email'
      ];
      const passwordErrorCodes = [
        'auth/weak-password',
        'auth/wrong-password'
      ];
      const response = {
        email: emailErrorCodes.includes(error.code) ? error.message : null,
        password: passwordErrorCodes.includes(error.code) ? error.message : null
      };

      if (error.code === 'auth/invalid-api-key') {
        console.log("Erro na API");
      }

      console.log("Erro", response)
    });
}

export const logoutUser = () => {
  firebaseService.signOut();
  history.push('/')
}