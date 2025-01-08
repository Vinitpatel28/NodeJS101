const fs = require('fs');
const filePath = 'todos.txt';

// Function to ensure the todo file exists
function ensureFileExists() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
    }
}

// Function to read todos from the file
function readTodos() {
    ensureFileExists();
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').filter(line => line.trim() !== ''); // return non-empty lines
}

// Function to write todos to the file
function writeTodos(todos) {
    fs.writeFileSync(filePath, todos.join('\n') + '\n', 'utf8');
}

// Command: Add a new todo
function addTodo(task) {
    if (!task) {
        console.log('Error: Please provide a task description.');
        return;
    }

    const todos = readTodos();
    todos.push(task);
    writeTodos(todos);
    console.log('Todo added!');
}

// Command: List all todos
function listTodos() {
    const todos = readTodos();
    if (todos.length === 0) {
        console.log('No todos available.');
        return;
    }

    todos.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

// Command: Delete a todo by its number
function deleteTodo(index) {
    const todos = readTodos();
    if (index < 1 || index > todos.length) {
        console.log('Error: Invalid task number.');
        return;
    }

    todos.splice(index - 1, 1); // remove the task by index
    writeTodos(todos);
    console.log('Todo deleted!');
}

// Command: Mark a todo as complete (just adds " [Done]" to the task)
function markTodo(index) {
    const todos = readTodos();
    if (index < 1 || index > todos.length) {
        console.log('Error: Invalid task number.');
        return;
    }

    todos[index - 1] += ' [Done]'; // mark the task as done
    writeTodos(todos);
    console.log('Todo marked as complete!');
}

// Command: Clear all todos
function clearTodos() {
    writeTodos([]);
    console.log('All todos cleared!');
}

// Function to handle commands
function handleCommand() {
    const [,, command, ...args] = process.argv;

    switch (command) {
        case 'add':
            addTodo(args.join(' '));
            break;
        case 'list':
            listTodos();
            break;
        case 'delete':
            if (args.length === 0 || isNaN(args[0])) {
                console.log('Error: Please provide a valid task number to delete.');
                return;
            }
            deleteTodo(Number(args[0]));
            break;
        case 'mark':
            if (args.length === 0 || isNaN(args[0])) {
                console.log('Error: Please provide a valid task number to mark.');
                return;
            }
            markTodo(Number(args[0]));
            break;
        case 'clear':
            clearTodos();
            break;
        default:
            console.log('Usage: node todo.js <command> [arguments]');
            console.log('Commands:');
            console.log('  add <task>     - Add a new task');
            console.log('  list           - List all tasks');
            console.log('  delete <number>- Delete a task by its number');
            console.log('  mark <number>  - Mark a task as complete');
            console.log('  clear          - Clear all tasks');
            break;
    }
}

// Execute the command
handleCommand();
