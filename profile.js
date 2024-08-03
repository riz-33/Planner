import {
    auth, updateDoc, doc, db, ref, getStorage, uploadBytesResumable, getDownloadURL, storage,
} from "./firebase.js";

let updateProfile = async () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const number = document.getElementById("number");
    const profileImage = document.getElementById("profileImage");

    const userRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(userRef, {
        name: name.value,
        email: email.value,
        number: number.value,
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

const uploadToStorage = (profileImage) => {
    return new Promise((resolve, reject) => {
        const fileName = profileImage.name;
        const storageRef = ref(storage, `users/user.uid`);

        const uploadTask = uploadBytesResumable(storageRef, profileImage);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + Math.round(progress) + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })
}
// profileImage.addEventListener("click", uploadToStorage)

// const uploadImage = () => {
//     const profileImage = document.getElementById("profileImage")

//     console.log(profileImage.files[0])
// }
// profileImage.addEventListener("change", (e) => {

// })

// const imageBtn = document.getElementById("imageBtn")
// imageBtn.addEventListener("click", uploadImage)

// const uploadImage = async () => {



profileImage.addEventListener("change", (e) => {
    const url = uploadToStorage(profileImage.files[0])
    const avatar = document.getElementById("avatar");
    avatar.src = URL.createObjectURL(e.target.files[0]);
    console.log(profileImage.files[0].name);
})

// let downloadFile = () => {
//     getDownloadURL(ref(storage, 'users/user.uid'))
//         .then((url) => {
//             console.log(url)
//             const avatar = document.getElementById('avatar');
//             img.setAttribute('src', url);
//         })
//         .catch((error) => {
//             console.log(error)
//         });
// }


// profileImage.addEventListener("change", function (uploadToStorage) {

// });

// getDownloadURL(ref(storage, 'users/user.uid'))
//     .then((url) => {
//         console.log(url)
//         const avatar = document.getElementById('avatar');
//         avatar.setAttribute('src', url);
//     })
//     .catch((error) => {
//         console.log(error)
//     });