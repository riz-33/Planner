import {
    auth, signOut, addDoc, collection, db, onSnapshot, query, serverTimestamp, orderBy, where, getDoc, doc,
    onAuthStateChanged, updateDoc, deleteField
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
        // console.log("doc", docSnap.data())

        let addTodo = async () => {
            let todo = document.getElementById("todo");
            const docRef = await addDoc(collection(db, "users", docSnap.data().uid, "todos"), {
                value: todo.value,
                timestamp: serverTimestamp(),
                status: "pending"
            });
            console.log("Document written with ID: ", docRef.id);
            console.log(todo.value)
            todo.value = "";
        }
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
                    todoList.innerHTML += `<li id="todoListItem" class="list-group-item">${doc.data().value}</li>`;
                });
            });
        }
        getAllTodos();
    }
});

