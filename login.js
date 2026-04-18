// Lấy form
let formLogin = document.getElementById("form-login");

// Lấy input đúng ID
let email = document.getElementById("loginEmail");
let password = document.getElementById("loginPass");

// Lấy users
let users = JSON.parse(localStorage.getItem("users")) || [];

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset lỗi
    document.getElementById("loginErrEmail").innerText = "";
    document.getElementById("loginErrPass").innerText = "";
    document.getElementById("loginError").innerText = "";

    let emailInput = email.value.trim();
    let passwordInput = password.value.trim();

    let isValid = true;

    // ===== VALIDATE =====
    if (!emailInput) {
        document.getElementById("loginErrEmail").innerText = "Không được để trống";
        isValid = false;
    }

    if (!passwordInput) {
        document.getElementById("loginErrPass").innerText = "Không được để trống";
        isValid = false;
    }

    if (!isValid) return;

    // ===== CHECK USER =====
    let user = users.find((u) => {
        return u.email === emailInput && u.password === passwordInput;
    });

    if (user) {
        // Lưu user đang đăng nhập
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Đăng nhập thành công!");
        window.location.href = "../index.html";
    } else {
        document.getElementById("loginError").innerText =
            "Email hoặc mật khẩu không đúng!";
    }
});