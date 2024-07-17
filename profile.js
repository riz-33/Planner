import { auth, updateProfile, updateEmail, updatePassword, updatePhoneNumber } from "./firebase.js";

let load = document.getElementById("load");
let mainContent = document.getElementById("main");

const profile = () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const number = document.getElementById("number");
    const password = document.getElementById("password");

    console.log(name.value, email.value, number.value)
    updateProfile(auth.currentUser, {
        displayName: name.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
    updateEmail(auth.currentUser, email.value)
        .then(() => {
            // Email updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    updatePhoneNumber(auth.currentUser, number.value)
        .then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    updatePassword(auth.currentUser, password.value)
        .then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
}

let profileBtn = document.getElementById("profileBtn");

profileBtn.addEventListener("click", profile);