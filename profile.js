import {
    auth, updateDoc, doc, db, ref, uploadBytesResumable, getDownloadURL, storage, onAuthStateChanged, getDoc
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
                    <img alt="" id="uploadIcon" src=${docSnap.data().photo} style="width: 200px; height: 200px; 
                    cursor: pointer;" class=" mb-2 avatar avatar-user width-full border color-bg-default">
                    <input type="file" id="file" class="file" style="display: none;"  />`
            } else {
                userImage.innerHTML =
                    `<img class="mb-2 avatar" id="uploadIcon" src="/Images/user-plus.png" 
                style="width: 200px; height: 200px; cursor: pointer;" /> 
                    <input type="file" id="file" class="file" style="display: none;"  />`
            }
            if (docSnap.data().name) {
                name.innerHTML = `<i class="fa-solid fa-user icon"></i> 
                <li style="cursor: no-drop" class="list-group-item ">${docSnap.data().name}</li>`;
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
        console.log(docSnap.data().photo);

        document.getElementById('uploadIcon').addEventListener('click', function () {
            document.getElementById('file').click();
        });

        const uploadImageToFirestore = (file) => {
            return new Promise((resolve, reject) => {
                const fileName = file.name
                const storageRef = ref(storage, user.uid);
                const uploadTask = uploadBytesResumable(storageRef, file);
                const loaderImage = document.getElementById("loaderImage")

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + Math.round(progress) + '% done');
                        if (progress) {
                            loaderImage.style.display = "block"
                        }
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
                        Swal.fire({
                            icon: "error",
                            text: error,
                        });
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        }
        const uploadFile = async () => {
            const file = document.getElementById("file");
            const url = await uploadImageToFirestore(file.files[0])
            const uploadIcon = document.getElementById("uploadIcon");
            uploadIcon.src = url
            console.log("uploadIcon", uploadIcon, "file", file);

            const userRef = doc(db, "users", user.uid);
            if (docSnap.data().photo === "" || docSnap.data().photo === null || docSnap.data().photo !== null) {
                await updateDoc(userRef, {
                    photo: url,
                });
                loaderImage.style.display = "none"
            } else {
                await updateDoc(userRef, {
                    photo: docSnap.data().photo
                });
            };
            console.log("Image Updated")
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Image Updated",
                showConfirmButton: false,
                timer: 1500
            });
            if (location.pathname !== "/todo.html") {
                setTimeout(() => {
                    window.location.href = "todo.html";
                    loader.style.display = "block"
                    mainContent.style.display = "none"
                }, 1500);
            }
        };

        const imageBtn = document.getElementById("imageBtn");
        imageBtn.addEventListener("click", uploadFile);

        let updateProfile = async () => {
            const nameUpdate = document.getElementById("nameUpdate")
            const emailUpdate = document.getElementById("emailUpdate")
            const numberUpdate = document.getElementById("numberUpdate")

            const userRef = doc(db, "users", user.uid);
            if (docSnap.data().name === "" || docSnap.data().name === null) {
                await updateDoc(userRef, {
                    name: nameUpdate.value
                });
            } else {
                await updateDoc(userRef, {
                    name: docSnap.data().name
                });
            };

            if (docSnap.data().email === "" || docSnap.data().email === null) {
                await updateDoc(userRef, {
                    email: emailUpdate.value
                });
            } else {
                await updateDoc(userRef, {
                    email: docSnap.data().email
                });
            };

            if (docSnap.data().number === "" || docSnap.data().number === null) {
                await updateDoc(userRef, {
                    number: numberUpdate.value
                });
            } else {
                await updateDoc(userRef, {
                    number: docSnap.data().number
                });
            };
            console.log("Profile Updated")
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile Updated",
                showConfirmButton: false,
                timer: 1500
            });
            if (location.pathname !== "/todo.html") {
                setTimeout(() => {
                    window.location.href = "todo.html";
                    loader.style.display = "block"
                    mainContent.style.display = "none"
                }, 1500);
            }
        }
        const profileBtn = document.getElementById("profileBtn");
        profileBtn.addEventListener("click", updateProfile);
    }
});