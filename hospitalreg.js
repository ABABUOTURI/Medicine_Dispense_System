document.getElementById('hospitalForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Gather form data
    const hospitalData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        role: document.getElementById('role').value,
    };

    // Send POST request
    fetch('https://your-server-endpoint/register', {  // Update the URL to your server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hospitalData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error registering hospital');
    })
    .then(data => {
        // Assuming the response contains the token in a field called 'token'
        localStorage.setItem('authToken', data.token);  // Store the token in localStorage
        document.getElementById('responseMessage').innerText = 'Hospital registered successfully!';
        // Optionally redirect or clear form
        // window.location.href = 'another-page.html';  // Optional redirection
        document.getElementById('hospitalForm').reset();  // Optional: Reset form fields
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'Error registering hospital: ' + error.message;
    });
});
