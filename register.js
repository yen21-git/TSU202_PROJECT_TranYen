let users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);

let formRegister = document.getElementById("form-register");

// ĐÚNG ID theo HTML
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirm = document.getElementById("confirm");

formRegister.addEventListener("submit", function (event) {
    event.preventDefault();

    let firstNameInput = firstName.value.trim();
    let lastNameInput = lastName.value.trim();
    let emailInput = email.value.trim();
    let passwordInput = password.value.trim();
    let confirmInput = confirm.value.trim();

    // ===== VALIDATE =====
    if (
        firstNameInput === "" ||
        lastNameInput === "" ||
        emailInput === "" ||
        passwordInput === "" ||
        confirmInput === ""
    ) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Email format
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        alert("Email không đúng định dạng!");
        return;
    }

    if (passwordInput.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    if (passwordInput !== confirmInput) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    // Check trùng email
    let checkEmail = users.some(function (u) {
        return u.email === emailInput;
    });

    if (checkEmail) {
        alert("Email đã tồn tại!");
        return;
    }

    // ===== LƯU =====
    let newUser = {
        firstname: firstNameInput,
        lastname: lastNameInput,
        email: emailInput,
        password: passwordInput
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "./login.html";
});