let forgotEmailGlobal = ""; // store email across steps

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

// Forgot Password popup handling
function openForgotPopup() {
    document.getElementById("forgotPopup").classList.remove("hidden");
    showStep(1);
}

function closeForgotPopup() {
    document.getElementById("forgotPopup").classList.add("hidden");
}

// Show popup step
function showStep(step) {
    const popup = document.getElementById("forgotPopup");
    popup.innerHTML = ""; // clear previous content

    if (step === 1) {
        popup.innerHTML = `
            <div class="forgot-box">
                <span class="close-btn" onclick="closeForgotPopup()">✖</span>
                <h2>Forgot Password</h2>
                <input type="email" id="fpEmail" placeholder="Enter your username/email">
                <button onclick="sendOTP()">Send OTP</button>
            </div>
        `;
    } else if (step === 2) {
        popup.innerHTML = `
            <div class="forgot-box">
                <span class="close-btn" onclick="closeForgotPopup()">✖</span>
                <h2>Enter OTP for ${forgotEmailGlobal}</h2>
                <input type="text" id="fpOTP" placeholder="Enter OTP">
                <button onclick="verifyOTP()">Verify OTP</button>
            </div>
        `;
    } else if (step === 3) {
        popup.innerHTML = `
            <div class="forgot-box">
                <span class="close-btn" onclick="closeForgotPopup()">✖</span>
                <h2>Change Password for ${forgotEmailGlobal}</h2>
                <input type="password" id="fpNewPassword" placeholder="New Password">
                <input type="password" id="fpConfirmPassword" placeholder="Confirm Password">
                <button onclick="changePassword()">Change Password</button>
            </div>
        `;
    }
}

// Step 1: Send OTP
function sendOTP() {
    const email = document.getElementById("fpEmail").value.trim();
    if (!email) { alert("Enter your username/email"); return; }

    fetch("/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            forgotEmailGlobal = email; // store email for next steps
            showStep(2);
        }
    })
    .catch(err => alert("Server error"));
}

// Step 2: Verify OTP
function verifyOTP() {
    const otp = document.getElementById("fpOTP").value.trim();
    if (!otp) { alert("Enter OTP"); return; }

    fetch("/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmailGlobal, otp }) // use stored email
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.success) showStep(3);
    })
    .catch(err => alert("Server error"));
}

// Step 3: Change Password
function changePassword() {
    const newPassword = document.getElementById("fpNewPassword").value.trim();
    const confirmPassword = document.getElementById("fpConfirmPassword").value.trim();
    if (!newPassword || !confirmPassword) { alert("Fill all fields"); return; }

    fetch("/forgot-password/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmailGlobal, newPassword, confirmPassword })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.success) closeForgotPopup();
    })
    .catch(err => alert("Server error"));
}