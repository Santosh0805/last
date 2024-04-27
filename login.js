document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

   
    fetch(`http://localhost:3000/users?email=${userEmail}&password=${userPassword}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const loggedInUser = data[0];
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            alert('Login successful!');
            window.location.href = './product.html'; 
        } else {
            alert('Invalid credentials!');
        }
    })
    .catch(error => console.error('Error:', error));
});
