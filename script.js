const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');
const feedback = document.querySelector('#error')
let todos = [];

// -----Validering-----
const validate = () => {
    if(input.value === '') {
        input.classList.add('is-invalid');
        feedback.innerText = 'Please add a todo';
        return false;
    }
    else if (input.value.length < 1){
        input.classList.add('is-valid');
        feedback.innerText = '';
        return true;
    }
}

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
    })
}

const createTodoElement = todo => {
    
    let card = document.createElement('div');
    card.classList.add('todo');

    let title = document.createElement('p');
    title.classList.add('todo-title');
    title.innerText = todo.title;

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-delete');
    button.innerText = 'X';

    
    card.appendChild(title);
    card.appendChild(button);
    
    button.addEventListener('click', () => removeTodo(todo.id, card))
    return card;
}


function removeTodo(id, todo) {
    todos = todos.filter(todo => todo.id !== id)
    console.log(todos)
    // todosOutput();
    // if(todo.status === 200) {}
    todo.remove()
    console.log(todos);
    
}

const createTodo = title => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title,
            completed: false
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // FIXA id????
        
        todos.unshift(data);
        // todosOutput();
        output.prepend(createTodoElement(data))
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    validate();

    if(input.value !== '') {
        createTodo(input.value);        
        input.value = '';
        input.focus()
        input.classList.remove('is-invalid');
        feedback.innerText = '';
    }
})

