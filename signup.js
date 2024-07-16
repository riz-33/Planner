import {auth, createUserWithEmailAndPassword} from "./firebase.js";

const register = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Successfully Registered`,
                showConfirmButton: false,
                timer: 1500
            });
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

    console.log(email.value, password.value, confirmPassword.value)
}

let registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);