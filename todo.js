import {
    auth, signOut, addDoc, collection, db, onSnapshot, query, serverTimestamp, orderBy, where, getDoc, doc,
    onAuthStateChanged, updateDoc
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