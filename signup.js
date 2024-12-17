document.addEventListener("DOMContentLoaded", () => {
// Handle Sign-Up Form Submission
document.getElementById("signup-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Store the user credentials in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    console.log("User registered:", { username: username, password: password }); // Debugging

    alert("Sign-Up Successful!");

    // Redirect to login page
    window.location.href = "login.html";
});
