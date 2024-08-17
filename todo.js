import {
    auth, signOut, addDoc, collection, db, onSnapshot, query, serverTimestamp, orderBy, where, getDoc, doc,
    onAuthStateChanged, updateDoc, deleteDoc, getDocs, reauthenticateWithCredential, EmailAuthProvider,
    GoogleAuthProvider, reauthenticateWithPopup
} from "./firebase.js";

let logout = () => {
    signOut(auth).then(() => {
        console.log("sign out")
        window.location = "index.html"
    }).catch((error) => {
        console.log(error)
    });
}

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logout);

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let addTodo = async () => {
            let todo = document.getElementById("todo");
            if (todo.value.trim()) {
                const docRef = await addDoc(collection(db, "users", docSnap.data().uid, "todos"), {
                    value: todo.value,
                    timestamp: serverTimestamp(),
                    status: "pending"
                });
                todo.value = "";
            } else {
                Swal.fire({
                    icon: "error",
                    // title: "Oops...",
                    text: "Please Enter Your Task!",
                });
            }
        }
        console.log("Document written with ID: ", docRef.id);
        console.log(todo.value)
        let addTodoBtn = document.getElementById("addTodoBtn");
        addTodoBtn && addTodoBtn.addEventListener('click', addTodo)
    }
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let userID = docSnap.data().uid;
        console.log(userID)

        let getAllTodos = async () => {
            const ref = query(collection(db, "users", docSnap.data().uid, "todos"),
                orderBy("timestamp", "desc"), where("status", "==", "pending"));
            const todoList = document.getElementById("todoList");
            const unsubscribe = onSnapshot(ref, (querySnapshot) => {
                todoList.innerHTML = "";
                querySnapshot.forEach((doc) => {
                    const li = document.createElement("li");
                    li.innerText = doc.data().value;
                    li.id = doc.id;
                    todoList.appendChild(li);
                    li.classList.add("list-group-item");
                });
            });
        };
        getAllTodos();

        let deleteTodo = async () => {
            const getID = async (event) => {
                const id = event.target.closest("li").getAttribute("id")
                const todoRef = doc(db, 'users', docSnap.data().uid, 'todos', id);
                await updateDoc(todoRef, {
                    status: "completed"
                });
                console.log(id)
            }
            todoList.addEventListener('dblclick', getID);
        }
        deleteTodo();
    }
});

async function deleteUserDataAndAccount() {
    const user = auth.currentUser;
    if (user) {
        try {
            const subcollectionRef = collection(db, "users", user.uid, "todos");
            const querySnapshot = await getDocs(subcollectionRef);
            const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            console.log("Subcollection deleted successfully.");

            const userDocRef = doc(db, "users", user.uid);
            await deleteDoc(userDocRef);
            console.log("User document deleted successfully.");

            try {
                await user.delete();
                console.log("User account deleted successfully.");
            } catch (error) {
                if (error.code === 'auth/requires-recent-login') {
                    console.error("User needs to reauthenticate before deleting the account.");
                    await reauthenticateUser();
                } else {
                    console.error("Error deleting user account: ", error);
                }
            }
        } catch (error) {
            console.error("Error deleting user data: ", error);
        }
    } else {
        console.log("No user is currently signed in.");
    }
}

async function reauthenticateUser() {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
        user.email,
        prompt("Please enter your password to confirm deletion:")
    );

    try {
        await reauthenticateWithCredential(user, credential);
        await deleteUserDataAndAccount();
    } catch (error) {
        console.error("Error reauthenticating: ", error);
    }
}

async function reauthenticateUserWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = auth.currentUser;
    try {
        await reauthenticateWithPopup(user, provider);
        await deleteUserDataAndAccount();
    } catch (error) {
        console.error("Error reauthenticating with Google: ", error);
    }
}

document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    await deleteUserDataAndAccount();
});

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User is signed in:", user);
    } else {
        console.log("No user is currently signed in.");
    }
});
