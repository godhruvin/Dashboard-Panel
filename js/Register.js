// Get references to the elements
const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const registerbutton = document.getElementById('registerbutton');
const loginbutton = document.getElementById('loginbutton');

// Event listener for showing the register form
showRegister.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    loginContainer.classList.remove("active");
    registerContainer.classList.add("active");
});

// Event listener for showing the login form
showLogin.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    registerContainer.classList.remove("active");
    loginContainer.classList.add("active");
});

// Function to show toast
var toastEl = document.getElementById('toast');
function showToast(message, bgcol = "#c45c67") {
    var toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = message;
    toastEl.style.backgroundColor = bgcol;
    toastEl.classList.remove('show', 'hide');
    toastEl.classList.add('show');
    setTimeout(() => {
        toastEl.classList.add('hide');
    }, 1500);
    setTimeout(() => {
        toastEl.classList.remove('show', 'hide');
    }, 2000);
}

let userDetails = JSON.parse(localStorage.getItem('userDetails')) || []; // For storing user details in local storage.

// Function to navigate to Dashboard Page
function navigateToDashBoard(event) {
    event.preventDefault();

    // Check if the login form is active
    if (loginContainer.classList.contains("active")) {
        // Login logic
        let email = document.getElementById('login-email').value.trim();
        let password = document.getElementById('login-pass').value.trim();
        if (email === "" || password === "") {
            showToast("Please fill all the details...");
            return;
        }

        // Check if user exists
        const user = userDetails.find(u => u.email === email && u.password === password);

        if (!user) {
            showToast("Invalid email or password.");
            return;
        }

        // Successful login

        showToast("Login successful!", "#0D6EFD");
        setTimeout(() => {
            window.location.href = `Dashboard.html`; // Redirect to dashboard after 2 seconds
        }, 2000);

    } else {
        // Registration logic

        let userName = document.getElementById('register-username').value.trim();
        let email = document.getElementById('register-email').value.trim();
        let password = document.getElementById('register-pass').value.trim();
        let user = { username: userName, email: email, password: password };

        // Check for empty fields
        if (userName === "" || email === "" || password === "") {
            showToast("Please fill all the details...");
            return;
        }

        // Check for existing user
        const existingUser = userDetails.find(u => u.email === email);
        if (existingUser) {
            showToast("User already exists. Please log in.");
            return;
        }

        // Register the new user
        userDetails.push(user);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        // Successful registration

        showToast("Registered successfully!", "#add8e6");
        setTimeout(() => {
            window.location.href = `Dashboard.html`;
        }, 2000);
    }
}

// Event listeners for buttons
registerbutton.addEventListener('click', navigateToDashBoard);
loginbutton.addEventListener('click', navigateToDashBoard);
