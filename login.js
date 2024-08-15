import {
    auth, signInWithEmailAndPassword, googleProvider, signInWithPopup, GoogleAuthProvider
} from "./firebase.js";

let loader = document.getElementById("loader");
let mainContent = document.getElementById("mainContent");

const login = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            loader.style.display = "block"
            mainContent.style.display = "none"
            console.log("user-->", user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: "error",
                title: errorMessage,
            })
            console.log("errorMessage-->", errorMessage)
        });

    console.log(email.value, password.value)
}

let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", login);

let googleLogin = () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            loader.style.display = "block"
            mainContent.style.display = "none"
            console.log(user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            Swal.fire({
                icon: "error",
                title: errorMessage,
            })
            console.log(errorMessage)
        });

}

let googleBtn = document.getElementById("googleBtn");

googleBtn.addEventListener("click", googleLogin);