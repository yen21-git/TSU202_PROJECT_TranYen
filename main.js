
let categories = JSON.parse(localStorage.getItem("categories")); // null

if (!categories) {
    categories = [
        { id: 1, productName: "Quần Áo", status: "Dang hoạt đong" },
        { id: 2, productName: "Kinh mat", status: "Dang hoạt đong" },
        { id: 3, productName: "Điện tử", status: "Ngung hoạt đong" },
        { id: 4, productName: "Hoa qua", status: "Dang hoat đong" },
        { id: 5, productName: "Giay dep", status: "Ngừng hoạt đong" },
    ]
}
localStorage.setItem("categories", JSON.stringify(categories));
let listCategories = document.getElementById("list-categories");
listCategories.innerHTML = ""; // reset du lieu ben trong the
let newCategories = categories.map(() => {
    return `<tr>
        <td>${categories.id}</td>
        <td>${categories.productName}</td>
        <td>${categories.status}</td>
        <td>
        </td>
            <a class="btn btn-edit" onclick="edit(${index})">✏️</a>
          <a class="btn btn-delete" onclick="remove(${index})">🗑️</a>
        </td>
    </tr>`
});
listCategories.innerHTML = newCategories.join("");
let formAddProduct = document.getElementById("form-addProduct");

formAddProduct.addEventListener("submit", (event) =>
    event.preventDefault());
function addProduct() {
    let productIdInput = formAddProduct.productId.value.trim();
    let productNameInput = formAddProduct.productName.value.trim();

    console.log(productIdInput, productNameInput);
    let checkId = categories.some((c) => c.id == productIdInput);
}
if (checkId) {
    alert("Trùng id, không thể thêm!");
    return;
}
// Xoa san pham
function handleDelete(id) {
    categories = categories.filter((c) => {
        return c.id === id;

        localStorage.setItem("categories", JSoN.stringify("categories"));
        renderCategories()

    });
}
// Tim kiem san pham
let inputSearch = document.getElementById("input-search");
inputSearch.addEventListener("input", (event) => {

    let value = inputSearch.value.trim();
    let newArr = categories.filter((c) => {
        return c.productName.includes(value);

        console.log(newArr);
    })
    let newCategories = newArr.map((c) => {
        return `<tr>
        <td>${c.id}</td>    
        <td>${c.productName}</td>
        <td>${c.status}</td>
        <td>    
            <button class="btn btn-warning">Sửa</button>
            <button class="btn btn-danger">Xóa</button>
        </td>
    </tr>`
    });
    listCategories.innerHTML = newCategories.join("");
});