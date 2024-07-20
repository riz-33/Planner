import {
    auth, signInWithEmailAndPassword, googleProvider, signInWithPopup, GoogleAuthProvider, doc, setDoc, db
} from "./firebase.js";

let load = document.getElementById("load");
let mainContent = document.getElementById("main");

const login = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            // Swal.fire({
            //     position: "top-end",
            //     icon: "success",
            //     title: `Successfully Registered`,
            //     showConfirmButton: false,
            //     timer: 1500
            // });
            addDataToFirestore(user)
            load.style.display = "block"
            mainContent.style.display = "none"
            window.location = "todo.html"
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


let addDataToFirestore = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        number: user.phoneNumber,
        photo: user.photoURL,
        uid: user.uid
      });
}

let googleLogin = () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            load.style.display = "block"
            mainContent.style.display = "none"
            window.location = "todo.html"
            console.log(user)
            addDataToFirestore(user)
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