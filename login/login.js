function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "../index.html"; // go to main site
        } else {
            alert(data.message);
        }
    })
    .catch(err => alert("Server error"));
}
