document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value;

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Validate credentials
    if (usernameInput === storedUsername && passwordInput === storedPassword) {
        alert("Login Successful! Redirecting to homepage...");
        window.location.href = "index.html"; // Redirect to homepage
    } else {
        alert("Invalid username or password!");
    }
});

