import {
    auth, createUserWithEmailAndPassword, googleProvider, signInWithPopup, GoogleAuthProvider, doc, setDoc, db,
    onAuthStateChanged, getDoc
} from "./firebase.js";

let loader = document.getElementById("load");
let mainContent = document.getElementById("main");

let addDataToFirestore = async (user) => {
    const response = await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        number: user.phoneNumber,
        photo: user.photoURL,
        uid: user.uid
    });
    console.log("resp", response)
}

const register = () => {
    // const name = document.getElementById("name");
    const email = document.getElementById("email");
    // const phone = document.getElementById("number");
    const password = document.getElementById("password");

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            loader.style.display = "block"
            mainContent.style.display = "none"
            // window.location = "todo.html"
            addDataToFirestore(user)
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

    console.log(name.value, email.value, password.value, number.value)
}

let registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);

let googleLogin = () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            loader.style.display = "block"
            mainContent.style.display = "none"
            // window.location = "todo.html"
            addDataToFirestore(user)
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

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("doc",docSnap.data())
        if (docSnap.data()) {
            if (location.pathname !== "/todo.html") {
                window.location = "todo.html"
            }
            loader.style.display = "none"
            mainContent.style.display = "block"
            console.log(user);
        }
    } else {
        if (location.pathname !== "/signup.html") {
            window.location = "signup.html"
        }
        // loader.style.display = "block"
        // mainContent.style.display = "none"
        console.log("not login")
    }
});
