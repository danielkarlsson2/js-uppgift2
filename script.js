const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];

// -----Validering-----
// const validate = () => {
//     if(input.value === '') {
//         input.classList.add('is-invalid');
//         return false;
//     }
//     else if (input.value.length < 1){
//         input.classList.add('is-valid');
//         return true;
//     }
// }

const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await res.json()
    todos = data;
    console.log(data);

    todosOutput();
}

fetchTodos();

const todosOutput = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
        output.appendChild(createTodoElement(todo))
        // output.insertAdjacentHTML('beforeend', 
        // ` <div class="todo">
        //     <p class="todo-title">${todo.title}</p>
        //     <button class="btn btn-danger btn-sm">X</button>
        // </div>`)
    })
}

const createTodoElement = todo => {
    
    let card = document.createElement('div');
    card.classList.add('todo');

    let title = document.createElement('p');
    title.classList.add('todo-title');
    title.innerText = todo.title;

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-danger', 'btn-sm');
    button.innerText = 'X';

    button.addEventListener('click', () => removeTodo(todo.id))

    card.appendChild(title);
    card.appendChild(button);

    return card;
}


function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
    console.log(todos)
    todosOutput();
}

const createTodo = title => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
            title,
            completed: false
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

form.addEventListener('click', (e) => {
    e.preventDefault()

    if(input.value !== '') {
        createTodo(input.value);        
        input.value = '';
        input.focus()
        // validate();
    }
})