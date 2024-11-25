"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const TODOS_FILE = path_1.default.resolve(__dirname, '../..', 'data', 'todos.json');
const loadTodos = () => {
    try {
        const data = fs_1.default.readFileSync(TODOS_FILE, 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        console.error(`Error reading or parsing the todo file: `, err);
        return [];
    }
};
const saveTodos = (todos) => {
    try {
        fs_1.default.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf-8');
    }
    catch (err) {
        console.error(`Error writing the todo file: `, err);
    }
};
router.post('/add', (req, res) => {
    console.log(req.body);
    const { name, todo } = req.body;
    let todos = loadTodos();
    const user = todos.find((user) => user.name === name);
    if (user) {
        user.todos.push(todo);
    }
    else {
        todos.push({ name, todos: [todo] });
    }
    saveTodos(todos);
    res.send(`Todo added successfully for user ${name}`);
});
router.get('/todos', (req, res) => {
    let todos = loadTodos();
    res.status(200).json({ todos });
});
router.get('/todos/:id', (req, res) => {
    let userId = req.params.id;
    let todos = loadTodos();
    const user = todos.find((user) => user.name.toLowerCase() === userId.toLowerCase());
    if (user) {
        res.status(200).json(user.todos);
    }
    else {
        res.status(404).send("User not found");
    }
});
exports.default = router;
