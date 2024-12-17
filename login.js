// Handle Login Form Submission
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent form from submitting normally

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Retrieve the stored username and password from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Check if the entered username and password match the stored credentials
    if (username === storedUsername && password === storedPassword) {
        alert("Login Successful!");

        // Redirect to homepage after successful login
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password!");
    }
});
