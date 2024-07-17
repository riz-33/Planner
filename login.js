import {auth, signInWithEmailAndPassword} from "./firebase.js";

const login = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Successfully Login`,
                showConfirmButton: false,
                // timer: 1000
            });
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