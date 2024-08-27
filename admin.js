document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect the form data
    const formData = {
        first_name: document.getElementById('firstName').value,
        second_name: document.getElementById('secondName').value,
        email: document.getElementById('email').value,
        phone_number: document.getElementById('phoneNumber').value,
        user: document.getElementById('userRole').value,
        password: document.getElementById('password').value,
    };
    
    // Validate the form data (optional, you can add more validation as needed)
    if (!formData.first_name || !formData.second_name || !formData.email || !formData.phone_number || !formData.user|| !formData.password) {
        alert('Please fill in all fields.');
        return;
    }

    // Send the registration data to the server
    fetch('https://hpms-0be27dd3c23f.herokuapp.com/api/v1/register_admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Registration failed');
    })
    .then(data => {
        alert('Registration successful!');
        // Optionally redirect to another page or login page
        window.location.href = 'index.htm';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed: ' + error.message);
    });
});
