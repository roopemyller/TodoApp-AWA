document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("todoForm").addEventListener("submit", async (e) => {
        e.preventDefault()
        const todoForm = document.getElementById("todoForm")
        const name = document.getElementById("userInput").value
        const todo = document.getElementById("todoInput").value
        const messageElement = document.getElementById('message');
        
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
    })
})
