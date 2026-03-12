/* Sidebar & Sections */
let students = [];
let books = [];

// Load saved data from localStorage
window.addEventListener("load", () => {
    const savedStudents = localStorage.getItem("students");
    const savedBooks = localStorage.getItem("books");

    if (savedStudents) students = JSON.parse(savedStudents);
    if (savedBooks) books = JSON.parse(savedBooks);

    updateStudentTable(); // populate student table
    updateBookTable();    // populate book table
    updateAdminCounts();  // update admin counts
});

/* Sidebar toggle */
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

/* Show sections */
function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    if (id === "adminPanel") {
        updateAdminCounts();
    }
}

/* Show message */
function showMessage(text, color = "#28a745") {
    const msg = document.getElementById("message");
    msg.innerText = text;
    msg.style.backgroundColor = color;
    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
    }, 3000);
}

/* Add Student */
function addStudent() {
    const name = document.getElementById('studentName').value.trim();
    const libraryCard = document.getElementById('studentLibraryCardNumber').value.trim();
    const faculty = document.getElementById('studentFaculty').value.trim();
    const Bookname = document.getElementById('studentbookname').value.trim();
    const Totalbookcollected = document.getElementById('Totalbookcollected').value.trim();

    if(name && libraryCard && faculty && Bookname && Totalbookcollected ){
        students.push({name, libraryCard, faculty, Bookname, Totalbookcollected });

        // Save students to localStorage
        localStorage.setItem("students", JSON.stringify(students));

        // Clear inputs
        document.getElementById('studentName').value = '';
        document.getElementById('studentLibraryCardNumber').value = '';
        document.getElementById('studentFaculty').value = '';
        document.getElementById('studentbookname').value = '';
        document.getElementById('Totalbookcollected').value = '';

        showMessage("Student added successfully!");
        updateStudentTable();
        updateAdminCounts();
        showSection('studentRecord');
    } else {
        showMessage("Please fill all fields", "#dc3545");
    }
}

/* Update Student Table */
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

/* Add Book */
function addBook() {
    const title = document.getElementById("bTitle").value.trim();
    const author = document.getElementById("bAuthor").value.trim();
    const publisher = document.getElementById("bPublisher").value.trim();
    const isbn = document.getElementById("bISBN").value.trim();
    const shelf = document.getElementById("bShelf").value.trim();
    const date = document.getElementById("bDate").value;
    const description = document.getElementById("bDescription").value.trim();

    if (!title || !author || !publisher || !isbn || !shelf || !date || !description) {
        showMessage("Please fill all book fields", "#dc3545");
        return;
    }

    books.push({ title, author, publisher, isbn, shelf, date, description });

    // Save books to localStorage
    localStorage.setItem("books", JSON.stringify(books));

    // Clear inputs
    document.getElementById("bTitle").value = "";
    document.getElementById("bAuthor").value = "";
    document.getElementById("bPublisher").value = "";
    document.getElementById("bISBN").value = "";
    document.getElementById("bShelf").value = "";
    document.getElementById("bDate").value = "";
    document.getElementById("bDescription").value = "";

    showMessage("Book added successfully!");
    updateBookTable();
    updateAdminCounts();
    showSection("bookRecord");
}

/* Update Book Table */
function updateBookTable() {
    const table = document.getElementById("bookTable");
    table.innerHTML = '';
    books.forEach(b => {
        const row = table.insertRow();
        row.insertCell(0).innerText = b.title;
        row.insertCell(1).innerText = b.author;
        row.insertCell(2).innerText = b.publisher;
        row.insertCell(3).innerText = b.isbn;
        row.insertCell(4).innerText = b.shelf;
        row.insertCell(5).innerText = b.date;
        row.insertCell(6).innerText = b.description;
    });
}

/* Admin Counts */
function updateAdminCounts() {
    document.getElementById("adminStudentCount").innerText = students.length;
    document.getElementById("adminBookCount").innerText = books.length;
}

/* Filter Students */
function filterStudents() {
    const search = document.getElementById("studentSearch").value.toLowerCase();
    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(search) ? "" : "none";
    });
}

/* Filter Books */
function filterBooks() {
    const search = document.getElementById("bookSearch").value.toLowerCase();
    const rows = document.querySelectorAll("#bookTable tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(search) ? "" : "none";
    });
}

/* Clock */
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);

/* Center Messages */
function showCenterMsg(text) {
    const msg = document.getElementById('centerMsg');
    const formattedText = text.replace(/\n/g, '<br>');

    if(msg.innerHTML === formattedText && !msg.classList.contains('hidden')){
        msg.classList.add('hidden');
    } else {
        msg.innerHTML = formattedText;
        msg.classList.remove('hidden');
    }
}

/* Sidebar info buttons */
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

/* Logout */
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login/login.html";
}

/* Welcome Slides */
function showWelcomeSlides() {
    const slides = document.querySelectorAll(".welcome-slide");

    slides.forEach((slide, index) => {
        setTimeout(() => {
            slide.classList.add("show");
            setTimeout(() => {
                slide.classList.remove("show");
            }, 2000);
        }, index * 2200);
    });
}

window.addEventListener("load", () => {
    if (localStorage.getItem("loggedIn") === "true") {
        showWelcomeSlides();
    }
});

/* Clear all data */
function clearAllData() {
    if (!confirm("Are you sure? This will delete all records.")) return;

    students = [];
    books = [];
    localStorage.removeItem("students");
    localStorage.removeItem("books");

    updateStudentTable();
    updateBookTable();
    updateAdminCounts();

    showMessage("All records cleared", "#dc3545");
}