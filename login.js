// Handle Login Form Submission
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent form from submitting normally

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Simple login check (replace with your actual logic)
    if (username === "test" && password === "1234") {
        alert("Login Successful!");

        // Redirect to homepage after successful login
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password!");
    }
});
