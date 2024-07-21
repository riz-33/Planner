import { auth, onAuthStateChanged, doc, db, getDoc } from "./firebase.js";

let loader = document.getElementById("loader");
let mainContent = document.getElementById("mainContent");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("doc", docSnap.data())
        if (docSnap.data()) {
            if (location.pathname !== "/todo.html") {
                window.location = "todo.html"
            }
            loader.style.display = "none"
            mainContent.style.display = "block"
            console.log(user);
        }
    }
    else {
        if (location.pathname !== "/index.html") {
            window.location = "index.html"
        }
        // loader.style.display = "block"
        // mainContent.style.display = "none"
        // console.log("not login")
    }
}
);


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const uid = user.uid;
//         // if (location.pathname !== "/todo.html") {
//         //     window.location = "todo.html"
//         // }
//         loader.style.display = "none"
//         mainContent.style.display = "block"
//         console.log(user);
//     } else {
//         // if (location.pathname !== "/index.html") {
//         //     window.location = "index.html"
//         // }
//         // loader.style.display = "block"
//         // mainContent.style.display = "none"
//         console.log("not login")
//     }
// });