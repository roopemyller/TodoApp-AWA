document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("todoForm").addEventListener("submit", async (e) => {
        e.preventDefault()
        const todoForm = document.getElementById("todoForm")
        const name = document.getElementById("userInput").value
        const todo = document.getElementById("todoInput").value
        const messageElement = document.getElementById('message')
        
        try{
            const response = await fetch('/add', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: name, todo: todo})
            })
    
            if (response.ok) {
                const message = await response.text();
                messageElement.textContent = message;
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = 'Failed to add todo!';
                messageElement.style.color = 'red';
            }
            todoForm.reset()
        }catch (error){
            console.error('Error:', error)
            messageElement.textContent = 'An error occurred!';
            messageElement.style.color = 'red';
        }
    }),
    document.getElementById("searchForm").addEventListener('submit', function (e) {
        e.preventDefault()

        const userId = document.getElementById('searchInput').value
        const messageElement = document.getElementById('message')
        const todoList = document.getElementById("todoList")

        messageElement.textContent = ''
        todoList.innerHTML = ''

        if (userId){
            fetch(`/todos/${userId}`).then(response => {
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json();
            }).then(todos => {
                todos.forEach(todo => {
                    const li = document.createElement('li');
                    li.textContent = todo;
                    todoList.appendChild(li);
                });
            })
            .catch(error => {
                errorMessage.textContent = error.message;
            });
    } else {
        errorMessage.textContent = "Please enter a username.";
    }
    })
})
