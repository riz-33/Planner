import { auth, onAuthStateChanged } from "./firebase.js";

let loader = document.getElementById("loader");
let mainContent = document.getElementById("main-content");
let userName = document.getElementById ("name");
let email = document.getElementById ("email");
let number = document.getElementById ("number");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        if (location.pathname !== "/todo.html") {
            window.location = "todo.html"
        }
        loader.style.display = "none"
        mainContent.style.display = "block"
        userName.innerHTML = 'Name:' + " " + user.displayName;
        email.innerHTML = 'Email:' + " " + user.email;
        number.innerHTML = 'Contact No:' + " " + user.phoneNumber; 
        
        console.log(user)
    } else {
        if (location.pathname !== "/index.html") {
            window.location = "index.html"
        }
        loader.style.display = "block"
        mainContent.style.display = "none"
        console.log("not login")
    }
});