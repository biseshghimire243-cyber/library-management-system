function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');

    // toggle open/close
    sidebar.classList.toggle('open');   // matches CSS
    main.classList.toggle('shift');     // shift main content
}

/* Sections */
function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* Students */
// Arrays for students and books
let students = [];
let books = [];

// Sidebar toggle
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Show sections
function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// Show message
function showMessage(text, color = "#28a745") {
    const msg = document.getElementById("message");
    msg.innerText = text;
    msg.style.backgroundColor = color;
    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
    }, 3000);
}

// Add Student
function addStudent() {
    const name = document.getElementById('studentName').value.trim();
    const libraryCard = document.getElementById('studentLibraryCardNumber').value.trim();
    const faculty = document.getElementById('studentFaculty').value.trim();
const Bookname = document.getElementById('studentbookname').value.trim();
const Totalbookcollected = document.getElementById('Totalbookcollected').value.trim();

    if(name && libraryCard && faculty && Bookname && Totalbookcollected ){
        students.push({name, libraryCard, faculty, Bookname, Totalbookcollected });
        document.getElementById('studentName').value = '';
        document.getElementById('studentLibraryCardNumber').value = '';
        document.getElementById('studentFaculty').value = '';
        document.getElementById('studentbookname').value = '';
        document.getElementById('Totalbookcollected').value = '';
        showMessage("Student added successfully!"); // ✅ show message
        updateStudentTable();
        showSection('studentRecord');
    } else {
        showMessage("Please fill all fields", "#dc3545"); // red for error
    }
}

// Update Student Table
function updateStudentTable() {
    const table = document.getElementById('studentTable');
    table.innerHTML = '';
    students.forEach(s => {
        const row = table.insertRow();
        row.insertCell(0).innerText = s.name;
        row.insertCell(1).innerText = s.libraryCard;
        row.insertCell(2).innerText = s.faculty;
        row.insertCell(3).innerText = s.Bookname;
        row.insertCell(4).innerText = s.Totalbookcollected;
    });
}

function addBook() {
    const title = document.getElementById("bTitle").value.trim();
    const author = document.getElementById("bAuthor").value.trim();
    const publisher = document.getElementById("bPublisher").value.trim();
    const isbn = document.getElementById("bISBN").value.trim();
    const shelf = document.getElementById("bShelf").value.trim();
    const date = document.getElementById("bDate").value;
    const description = document.getElementById("bDescription").value.trim();

    if (!title || !author || !publisher || !isbn || !shelf || !date || !description) {
        alert("Please fill all book fields");
        return;
    }

    const table = document.getElementById("bookTable");

    const row = table.insertRow();
    row.insertCell(0).innerText = title;
    row.insertCell(1).innerText = author;
    row.insertCell(2).innerText = publisher;
    row.insertCell(3).innerText = isbn;
    row.insertCell(4).innerText = shelf;
    row.insertCell(5).innerText = date;
    row.insertCell(6).innerText = description;

    // Clear inputs
    document.getElementById("bTitle").value = "";
    document.getElementById("bAuthor").value = "";
    document.getElementById("bPublisher").value = "";
    document.getElementById("bISBN").value = "";
    document.getElementById("bShelf").value = "";
    document.getElementById("bDate").value = "";
    document.getElementById("bDescription").value = "";

    alert("Book added successfully!");
    showSection("bookRecord");
}

// Clock
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);
function showCenterMsg(text) {
    const msg = document.getElementById('centerMsg');
    const formattedText = text.replace(/\n/g, '<br>'); // convert newlines to <br>

    if(msg.innerHTML === formattedText && !msg.classList.contains('hidden')){
        msg.classList.add('hidden'); // hide if same message showing
    } else {
        msg.innerHTML = formattedText;
        msg.classList.remove('hidden');
    }
}

// Sidebar buttons
function toggleGuidelines() {
    showCenterMsg(
`📘 Please return books on time
📘 Maintain silence in the library
📘 Handle books carefully`
    );
}

function toggleOrder() {
    showCenterMsg(
`📦 Check pending book orders
📦 Manage library resources
📦 Update inventory regularly
📦 Communicate with suppliers if needed`
    );
}

function toggleOthers() {
    showCenterMsg(
`✨ New arrivals
✨ Digital library
✨ Reading events coming soon!`
    );
}

function logout() {
    localStorage.removeItem("loggedIn"); // remove login flag
    window.location.href = "login/login.html"; // redirect to login page
}

// Check login on page load
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login/login.html"; // force login
}
function showWelcomeSlides() {
    const slides = document.querySelectorAll(".welcome-slide");

    slides.forEach((slide, index) => {
        setTimeout(() => {
            slide.classList.add("show");

            // hide after 2 seconds
            setTimeout(() => {
                slide.classList.remove("show");
            }, 2000);

        }, index * 2200); // delay between slides
    });
}

// Show only after login
window.addEventListener("load", () => {
    if (localStorage.getItem("loggedIn") === "true") {
        showWelcomeSlides();
    }
});
function filterStudents() {
    const search = document.getElementById("studentSearch").value.toLowerCase();
    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(search) ? "" : "none";
    });
}
// Load admin dashboard counts
function loadAdminStats() {
    document.getElementById("adminStudentCount").innerText =20
        document.querySelectorAll("#studentTable tr").length;

    document.getElementById("adminBookCount").innerText =15
        document.querySelectorAll("#bookTable tr").length;
}

// Change password (localStorage version)
function changePassword() {
    const newPass = document.getElementById("newPassword").value.trim();

    if (!newPass) {
        showMessage("Password cannot be empty", "#dc3545");
        return;
    }

    localStorage.setItem("adminPassword", newPass);
    showMessage("Password updated successfully");
    document.getElementById("newPassword").value = "";
}

// Clear all data
function clearAllData() {
    if (!confirm("Are you sure? This will delete all records.")) return;

    localStorage.removeItem("students");
    localStorage.removeItem("books");

    document.getElementById("studentTable").innerHTML = "";
    document.getElementById("bookTable").innerHTML = "";

    showMessage("All records cleared", "#dc3545");
}

// Load admin data when admin panel opens
function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    if (id === "adminPanel") {
        loadAdminStats();
    }
}

