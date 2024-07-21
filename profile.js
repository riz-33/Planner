import { auth, updateDoc, doc, db } from "./firebase.js";

let updateProfile = async () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const number = document.getElementById("number");

    const userRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(userRef, {
        name: name.value,
        email: email.value,
        number: number.value
    });
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Updated",
        showConfirmButton: false
    });
    console.log("Profile Updated")
    window.location = "todo.html"
}

let profileBtn = document.getElementById("profileBtn");

profileBtn.addEventListener("click", updateProfile); 