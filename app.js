import { auth, onAuthStateChanged, doc, db, getDoc } from "./firebase.js";

let loader = document.getElementById("loader");
let mainContent = document.getElementById("mainContent");
const name = document.getElementById("name");
const email = document.getElementById("email");
const number = document.getElementById("number");
const userImage = document.getElementById("userImage");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = await doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await addDataToFirestore(user);
        }
        console.log("doc", docSnap.data())

        if (docSnap.data()) {
            if (location.pathname !== "/todo.html") {
                window.location = "todo.html"
            }
            loader.style.display = "none"
            mainContent.style.display = "block"

            if (docSnap.data().photo) {
                userImage.innerHTML = `<img alt="" src=${docSnap.data().photo} width="200"
                height="200" class="avatar">`
            } else {
                userImage.innerHTML = `<img style="height:auto;" alt="" src="/Images/user.png" width="200"
                height="200" class="avatar">`
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
        console.log("not login")
    }
}
);