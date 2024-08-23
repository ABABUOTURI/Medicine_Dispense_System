document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    fetch('https://hpms-0be27dd3c23f.herokuapp.com/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Invalid login credentials');
    })
    .then(data => {
        // Assuming the response contains the token in a field called 'token'
        localStorage.setItem('authToken', data.token);  // Store the token in localStorage
        alert('Login successful!');
        // Optionally redirect to another page
        window.location.href = 'file:///home/emmanuel/Desktop/WIZARD/Hospitalcs/AdminDash.htm';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
});