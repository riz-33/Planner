import {
    auth, signInWithEmailAndPassword, googleProvider, signInWithPopup, GoogleAuthProvider, setDoc, doc, db,
    serverTimestamp, getDoc
} from "./firebase.js";

let loader = document.getElementById("loader");
let mainContent = document.getElementById("mainContent");

const login = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            loader.style.display = "block"
            mainContent.style.display = "none"
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
        uid: user.uid,
        createdAt: serverTimestamp()
    });
    console.log("User added to Firestore");
};

let googleLogin = () => {
    signInWithPopup(auth, googleProvider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            loader.style.display = "block";
            mainContent.style.display = "none";

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                await addDataToFirestore(user);
            } else {
                console.log("User already exists in Firestore");
            }

            console.log(user);
            window.location.href = "todo.html";
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: error.message,
            });
            console.log(error.message);
        });
};

let googleBtn = document.getElementById("googleBtn");
googleBtn.addEventListener("click", googleLogin);
