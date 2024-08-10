import {
    auth, updateDoc, doc, db, ref, getStorage, uploadBytesResumable, getDownloadURL, storage, onAuthStateChanged,
    getDoc
} from "./firebase.js";

const loader = document.getElementById("loader");
const mainContent = document.getElementById("mainContent");
const name = document.getElementById("name");
const email = document.getElementById("email");
const number = document.getElementById("number");
const userImage = document.getElementById("userImage");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data()) {
            if (location.pathname !== "/profile.html") {
                window.location = "profile.html"
            }
            loader.style.display = "none"
            mainContent.style.display = "block"

            if (docSnap.data().photo) {
                userImage.innerHTML = `
                    <img alt="" src=${docSnap.data().photo} width="200"
                height="200" class=" mb-2 avatar avatar-user width-full border color-bg-default">`
            } else {
                userImage.innerHTML = `<label class="mb-2" id="imageBtn" for="profileImage">
                    <a style="cursor: pointer;" class="image">
                    <img style="height:auto;" alt="" src="/Images/user.png" width="200"
                height="200" class="avatar avatar-user width-full border color-bg-default">
                    </a>
                </label>
                <input type="file" name="profileImage" id="profileImage" style="display: none;">`
            }
            if (docSnap.data().name) {
                name.innerHTML = `<i class="fa-solid fa-user icon"></i> 
                <li class="list-group-item ">${docSnap.data().name}</li>`;
            } else {
                name.innerHTML = `<i class="fa-solid fa-user icon"></i>
                <input id="nameUpdate" class="input-field" type="text" 
                placeholder="Name" name="Name"></input>`;
            }
            if (docSnap.data().email) {
                email.innerHTML = `<i class="fa fa-envelope icon"></i> 
                <li style="cursor: no-drop" class="list-group-item">${docSnap.data().email}</li>`;
            } else {
                email.innerHTML = `<i class="fa fa-envelope icon"></i>
                <input id="emailUpdate" class="input-field" type="email" 
                placeholder="Email" name="Email"></input>`;
            }
            if (docSnap.data().number) {
                number.innerHTML = `<i class="fa-solid fa-phone icon"></i> 
                <li style="cursor: no-drop" class="list-group-item">${docSnap.data().number}</li>`;
            } else {
                number.innerHTML = `<i class="fa-solid fa-phone icon"></i>
                <input id="numberUpdate" class="input-field" type="number" 
                placeholder="Number" name="Number"></input>`;
            }
        }
        console.log(docSnap.data().number);

        let updateProfile = async () => {
            const nameUpdate = document.getElementById("nameUpdate")
            const emailUpdate = document.getElementById("emailUpdate")
            const numberUpdate = document.getElementById("numberUpdate")

            const userRef = doc(db, "users", user.uid);
            if (docSnap.data().name === "" || docSnap.data().name === null){
                await updateDoc (userRef,{
                    name : nameUpdate.value
                });
            }else {
                await updateDoc (userRef,{
                    name: docSnap.data().name
                });
            };

            if (docSnap.data().email === "" || docSnap.data().email === null){
                await updateDoc (userRef,{
                    email : emailUpdate.value
                });
            }else {
                await updateDoc (userRef,{
                    email: docSnap.data().email
                });
            };

            if (docSnap.data().number === "" || docSnap.data().number === null){
                await updateDoc (userRef,{
                    number : numberUpdate.value
                });
            }else {
                await updateDoc (userRef,{
                    number: docSnap.data().number
                });
            };
            console.log(number)
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
    }
});

            // if (docSnap.data()) {
            //     if (docSnap.data().name) {
            //         name: docSnap.data().name
            //     }
            //     else if (docSnap.data().email) {
            //         email: docSnap.data().email
            //     }
            //     else if (docSnap.data().number) {
            //         number: docSnap.data().number
            //     }
            // } else {
                // }

                

// const uploadToStorage = (profileImage) => {
//     return new Promise((resolve, reject) => {
//         const fileName = profileImage.name;
//         const storageRef = ref(storage, `users/user.uid`);

//         const uploadTask = uploadBytesResumable(storageRef, profileImage);
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + Math.round(progress) + '% done');
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//                 reject(error)
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     resolve(downloadURL);
//                 });
//             }
//         );
//     })
// }




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



// profileImage.addEventListener("change", (e) => {
//     const url = uploadToStorage(profileImage.files[0])
//     const avatar = document.getElementById("avatar");
//     avatar.src = URL.createObjectURL(e.target.files[0]);
//     console.log(profileImage.files[0].name);
// })





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