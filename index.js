let categories = JSON.parse(localStorage.getItem("categories")) || [];

let modal = document.getElementById("modal");
let btnAdd = document.getElementById("btnAdd");
let btnSave = document.getElementById("btnSave");

let categoryId = document.getElementById("categoryId");
let categoryName = document.getElementById("categoryName");

let errId = document.getElementById("errId");
let errName = document.getElementById("errName");

let tbody = document.getElementById("tbody");

let editIndex = -1;

// pagination
let currentPage = 1;
let perPage = 5;

// ===== MODAL =====
btnAdd.onclick = () => {
    modal.style.display = "flex";
};

function closeModal() {
    modal.style.display = "none";
    clearForm();
    editIndex = -1;
}

function clearForm() {
    categoryId.value = "";
    categoryName.value = "";
    errId.innerText = "";
    errName.innerText = "";
}

// ===== STATUS =====
function getStatus() {
    let radios = document.getElementsByName("status");
    for (let r of radios) {
        if (r.checked) return r.value;
    }
}

// ===== SAVE =====
btnSave.onclick = () => {
    let id = categoryId.value.trim();
    let name = categoryName.value.trim();
    let status = getStatus();

    errId.innerText = "";
    errName.innerText = "";

    let isValid = true;

    if (!id) {
        errId.innerText = "Không được để trống";
        isValid = false;
    }

    if (!name) {
        errName.innerText = "Không được để trống";
        isValid = false;
    }

    let checkId = categories.some((c, i) => c.id === id && i !== editIndex);
    if (checkId) {
        errId.innerText = "Trùng ID";
        isValid = false;
    }

    if (!isValid) return;

    if (editIndex === -1) {
        categories.push({ id, name, status });
    } else {
        categories[editIndex] = { id, name, status };
    }

    localStorage.setItem("categories", JSON.stringify(categories));
    render();
    closeModal();
};

// ===== EDIT =====
function editCategory(index) {
    let c = categories[index];

    categoryId.value = c.id;
    categoryName.value = c.name;

    document.getElementsByName("status").forEach(r => {
        r.checked = r.value === c.status;
    });

    editIndex = index;
    modal.style.display = "flex";
}

// ===== DELETE =====
function removeCategory(index) {
    if (confirm("Xóa?")) {
        categories.splice(index, 1);

        let totalPage = Math.ceil(categories.length / perPage);
        if (currentPage > totalPage) currentPage = totalPage || 1;

        localStorage.setItem("categories", JSON.stringify(categories));
        render();
    }
}

// ===== RENDER =====
function render() {
    tbody.innerHTML = "";

    let start = (currentPage - 1) * perPage;
    let data = categories.slice(start, start + perPage);

    data.forEach((c, i) => {
        let realIndex = start + i;

        tbody.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.status}</td>
        <td>
          <button onclick="editCategory(${realIndex})">✏️</button>
          <button onclick="removeCategory(${realIndex})">🗑️</button>
        </td>
      </tr>
    `;
    });

    renderPagination();
}

// ===== PAGINATION =====
function renderPagination() {
    let totalPage = Math.ceil(categories.length / perPage);
    let html = "";

    html += `<button ${currentPage === 1 ? "disabled" : ""} onclick="changePage(${currentPage - 1})">Prev</button>`;

    for (let i = 1; i <= totalPage; i++) {
        html += `<button class="${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`;
    }

    html += `<button ${currentPage === totalPage ? "disabled" : ""} onclick="changePage(${currentPage + 1})">Next</button>`;

    document.getElementById("pagination").innerHTML = html;
}

function changePage(page) {
    let totalPage = Math.ceil(categories.length / perPage);

    if (page < 1) page = 1;
    if (page > totalPage) page = totalPage;

    currentPage = page;
    render();
}

// ===== INIT =====
render();