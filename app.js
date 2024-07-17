import { auth, onAuthStateChanged } from "./firebase.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        if (location.pathname !== "/todo.html") {
            window.location = "todo.html"
        }
        console.log(user)
    } else {
        if (location.pathname !== "/index.html") {
            window.location = "index.html"
        }
        console.log("not login")
    }
});