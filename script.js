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

// Add Book
function addBook() {
    const name = document.getElementById('bName').value.trim();
    const author = document.getElementById('bAuthor').value.trim();

    if(name && author){
        books.push({name, author});
        document.getElementById('bName').value = '';
        document.getElementById('bAuthor').value = '';
        showMessage("Book added successfully!");
        updateBookTable();
        showSection('bookRecord');
    } else {
        showMessage("Please fill all fields", "#dc3545");
    }
}

// Update Book Table
function updateBookTable() {
    const table = document.getElementById('bookTable');
    table.innerHTML = '';
    books.forEach(b => {
        const row = table.insertRow();
        row.insertCell(0).innerText = b.name;
        row.insertCell(1).innerText = b.author;
    });
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

