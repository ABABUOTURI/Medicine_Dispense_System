document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = {
        email: email,
        password: password,
    };

    // Send a login request to the server
    fetch('https://hpms-0be27dd3c23f.herokuapp.com/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Invalid login credentials');
    })
    .then(data => {
        // Assuming the response contains the role in a field called 'role' and a token in 'token'
        const role = data.role;
        localStorage.setItem('authToken', data.access_token);  // Store the token in localStorage
        alert('Login successful!');

        // Redirect to the appropriate dashboard based on the role
        if (role === "doctor") {
            window.location.href = "file:///home/emmanuel/Desktop/WIZARD/Hospital/DoctorDash.htm";
        } else if (role === "pharmacist") {
            window.location.href = "file:///home/emmanuel/Desktop/WIZARD/Hospital/pharmacistDash.htm";
        } else if (role === "Admin") {
            window.location.href = "file:///home/emmanuel/Desktop/WIZARD/Hospital/AdminDash.htm";
        } else {
            alert("Invalid role!");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
});



//The code below handles Registration
document.getElementById('signupForm').addEventListener('submit', function(event) {
    let valid = true;

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const secondName = document.getElementById('secondName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const password = document.getElementById('password').value.trim();
    const userRole = document.getElementById('userRole').value.trim();

    // Validation Patterns
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern

    // Clear all hints initially
    document.querySelectorAll('small').forEach(hint => {
        hint.classList.add('hidden');
        hint.classList.remove('visible');
    });

    // Validation checks
    if (!firstName) {
        document.getElementById('firstNameHint').classList.add('visible');
        valid = false;
    }
    if (!secondName) {
        document.getElementById('secondNameHint').classList.add('visible');
        valid = false;
    }
    if (!emailPattern.test(email)) {
        document.getElementById('emailHint').classList.add('visible');
        valid = false;
    }
    if (!phonePattern.test(phoneNumber)) {
        document.getElementById('phoneHint').classList.add('visible');
        valid = false;
    }
    if (!password) {
        document.getElementById('passwordHint').classList.add('visible');
        valid = false;
    }
    if (!userRole) {
        document.getElementById('roleHint').classList.add('visible');
        valid = false;
    }

    // Prevent form submission if any validation fails
    if (!valid) {
        event.preventDefault();
        return;
    }

    // Show success message and redirect after 3 seconds
    alert('Registration successful!');
    setTimeout(() => {
        window.location.href = 'Login.htm';
    }, 3000); // Redirect after 3 seconds
});

//Medication issued to the patient
document.addEventListener("DOMContentLoaded", function() {
    // Placeholder: Fetch data from your database and update the table
    let patientData = document.getElementById('patientData');
    
    // Example data
    let patients = [
        {
            patient_code: '12345',
            name: 'John Doe',
            age: 45,
            gender: 'Male',
            diagnosis: 'Hypertension',
            medication: 'Amlodipine',
            date: '2024-08-20'
        },
        {
            identifier: '67890',
            name: 'Jane Smith',
            age: 34,
            gender: 'Female',
            diagnosis: 'Diabetes',
            medication: 'Metformin',
            date: '2024-08-19'
        }
    ];
    
    if (patients.length > 0) {
        patientData.innerHTML = '';
        patients.forEach(patient => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.patient_code}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.diagnosis}</td>
                <td>${patient.medication}</td>
                <td>${patient.date}</td>
            `;
            patientData.appendChild(row);
        });
    } else {
        document.querySelector('.no-data').style.display = 'block';
    }
});


//Dispense Drugs
