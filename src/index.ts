import {Request, Response, Router} from "express"
import fs from 'fs'
import path from "path"

type TUser = {
    name: string;
    todos: string[];
}

const router: Router = Router()

const TODOS_FILE = path.resolve(__dirname, '../..', 'data', 'todos.json');

const loadTodos = (): TUser[] => {
    try {
        const data = fs.readFileSync(TODOS_FILE, 'utf-8')
        return JSON.parse(data) as TUser[]
    } catch (err){
        console.error(`Error reading or parsing the todo file: `, err)
        return []
    }
}

const saveTodos = (todos: TUser[]): void => {
    try {
        fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf-8')
    } catch (err){
        console.error(`Error writing the todo file: `, err)
    }
}

router.post('/add', (req, res) => {
    console.log(req.body)
    const { name, todo } = req.body

    let todos = loadTodos()
    const user = todos.find((user) => user.name === name)

    if(user){
        user.todos.push(todo)
    }else{
        todos.push({name, todos: [todo] })
    }

    saveTodos(todos)

    res.send(`Todo added successfully for user ${name}`)

})

router.get('/todos', (req, res) => {
    let todos = loadTodos()
    res.status(200).json({ todos })
})

router.get('/todos/:id', (req, res) => {
    let userId: string = req.params.id
    let todos = loadTodos()

    const user = todos.find((user) => user.name.toLowerCase() === userId.toLowerCase())

    if(user){
        res.status(200).json(user.todos)
    }else{
        res.status(404).send("User not found")
    }
})

export default router