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
            window.location.href = "../index.html";
        } else {
            alert(data.message);
        }
    })
    .catch(err => alert("Server error"));
}
function openForgotPopup() {
    document.getElementById("forgotPopup").classList.remove("hidden");
}

function closeForgotPopup() {
    document.getElementById("forgotPopup").classList.add("hidden");
}

function submitForgot() {
    const email = document.getElementById("forgotEmail").value.trim();
    const passcode = document.getElementById("forgotPasscode").value.trim();

    if (!email || !passcode) {
        alert("Please fill all fields");
        return;
    }

    alert("Verification request submitted!\n(your OTP code is send to your email address)");
    closeForgotPopup();
}
