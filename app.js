import { auth, onAuthStateChanged, doc, db, getDoc } from "./firebase.js";

let loader = document.getElementById("loader");
let mainContent = document.getElementById("mainContent");
const name = document.getElementById("name");
const email = document.getElementById("email");
const number = document.getElementById("number");
const userImage = document.getElementById("userImage");

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

            if (docSnap.data().photo) {
                userImage.innerHTML = `<img style="height:auto;" alt="" src=${docSnap.data().photo} width="260"
                height="260" class="avatar avatar-user width-full border color-bg-default">`
            } else {
                userImage.innerHTML = `<img style="height:auto;" alt="" src="/Images/user.png" width="260"
                height="260" class="avatar avatar-user width-full border color-bg-default">`
            }

            if (docSnap.data().name) {
                name.innerHTML = 'Name:' + " " + docSnap.data().name;
            } else {
                name.innerHTML = 'Name:' + " " + 'Not Found';
            }

            email.innerHTML = 'Email:' + " " + docSnap.data().email;

            if (docSnap.data().number) {
                number.innerHTML = 'Contact No:' + " " + docSnap.data().number;
            } else {
                number.innerHTML = 'Contact No:' + " " + 'Not Found';
            }
            
            console.log(user);
        }
    }
    else {
        if (location.pathname !== "/index.html") {
            window.location = "index.html"
        }
        // loader.style.display = "block"
        // mainContent.style.display = "none"
        console.log("not login")
    }

}
);

