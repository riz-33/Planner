import { auth, signOut, addDoc, collection, db, onSnapshot, query, serverTimestamp, orderBy, where } from "./firebase.js";

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

let addTodo = async () => {
    let todo = document.getElementById("todo");
    const docRef = await addDoc(collection(db, "todos"), {
        value: todo.value,
        timestamp: serverTimestamp(),
        status: "pending"
    });
    console.log("Document written with ID: ", docRef.id);
    console.log(todo.value)
}

let addTodoBtn = document.getElementById("addTodoBtn");

addTodoBtn && addTodoBtn.addEventListener('click', addTodo)


let getAllTodos = async () => {
    const ref = query(collection(db, "todos"), orderBy("timestamp", "desc"), where ("status", "==", "completed"));
    const todoList = document.getElementById("todoList");
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        todoList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            todoList.innerHTML += `<li class="list-group-item">${doc.data().value}</li>`;
            // todo.innerHTML = "",
        });
    });
}

getAllTodos();