document.addEventListener("DOMContentLoaded", () => {

    const authCard = document.getElementById("authCard");
    const toSignup = document.getElementById("toSignup");
    const toLogin = document.getElementById("toLogin");

    /* ================= FORM SWITCH ================= */

    if (toSignup && toLogin && authCard) {

        toSignup.addEventListener("click", (e) => {
            e.preventDefault();
            authCard.classList.add("show-signup");
        });

        toLogin.addEventListener("click", (e) => {
            e.preventDefault();
            authCard.classList.remove("show-signup");
        });
    }

    /* ================= SHOW / HIDE PASSWORD ================= */

    const passToggles = document.querySelectorAll(".pass-toggle");

    passToggles.forEach(btn => {
        btn.addEventListener("click", function () {

            const input = this.parentElement.querySelector("input");

            if (!input) return;

            if (input.type === "password") {
                input.type = "text";
                this.textContent = "Hide";
            } else {
                input.type = "password";
                this.textContent = "Show";
            }
        });
    });

    /* ================= REMOVE INVALID CLASS ================= */

    document.querySelectorAll("input").forEach(input => {

        input.addEventListener("input", function () {

            const parent = this.parentElement;

            if (parent) {
                parent.classList.remove("invalid");
            }
        });
    });

    /* ================= LOGIN ================= */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const email = document.getElementById("loginEmail");
            const password = document.getElementById("loginPassword");
            const emailError = document.getElementById("loginEmailError");

            let valid = true;

            if (emailError) {
                emailError.textContent = "Please enter a valid email.";
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                email.parentElement.classList.add("invalid");
                valid = false;
            }

            if (password.value.trim().length < 6) {
                password.parentElement.classList.add("invalid");
                valid = false;
            }

            if (!valid) return;

            const userEmail = email.value.trim().toLowerCase();
            const storedPassword = localStorage.getItem(userEmail);

            if (!storedPassword) {

                email.parentElement.classList.add("invalid");

                if (emailError) {

                    emailError.innerHTML =
                        "⚠️ Account not found! Please <span id='switchLink' style='color:#38bdf8;cursor:pointer;text-decoration:underline;'>Sign Up</span> first.";

                    const switchLink = document.getElementById("switchLink");

                    if (switchLink) {
                        switchLink.addEventListener("click", () => {
                            authCard.classList.add("show-signup");
                        });
                    }
                }

                return;
            }

            if (storedPassword !== password.value.trim()) {

                const passError =
                    password.parentElement.parentElement.querySelector(".error-text");

                if (passError) {
                    passError.textContent = "Incorrect password!";
                }

                password.parentElement.classList.add("invalid");
                return;
            }

            alert("Login Successful!");

            loginForm.reset();

            loginForm.querySelectorAll(".pass-toggle").forEach(btn => {
                btn.textContent = "Show";
            });

            window.location.href =
                "https://skhacker9947-afk.github.io/Noman-Portfolio-/";
        });
    }

    /* ================= SIGNUP ================= */

    const signupForm = document.getElementById("signupForm");

    if (signupForm) {

        signupForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const name = document.getElementById("signupName");
            const email = document.getElementById("signupEmail");
            const password = document.getElementById("signupPassword");

            let valid = true;

            if (name.value.trim() === "") {
                name.parentElement.classList.add("invalid");
                valid = false;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                email.parentElement.classList.add("invalid");
                valid = false;
            }

            if (password.value.trim().length < 6) {
                password.parentElement.classList.add("invalid");
                valid = false;
            }

            if (!valid) return;

            const userEmail = email.value.trim().toLowerCase();

            if (localStorage.getItem(userEmail)) {

                const err =
                    email.parentElement.querySelector(".error-text");

                if (err) {
                    err.textContent = "Email already registered.";
                }

                email.parentElement.classList.add("invalid");
                return;
            }

            localStorage.setItem(
                userEmail,
                password.value.trim()
            );

            alert("Account Created Successfully!");

            signupForm.reset();

            authCard.classList.remove("show-signup");
        });
    }

    /* ================= FORGOT PASSWORD ================= */

    const forgotPassword =
        document.getElementById("forgotPassword");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", (e) => {

            e.preventDefault();

            const email =
                prompt("Enter your registered email:");

            if (!email) return;

            const userEmail =
                email.trim().toLowerCase();

            const storedPassword =
                localStorage.getItem(userEmail);

            if (!storedPassword) {

                alert("Account not found!");
                return;
            }

            const newPassword =
                prompt("Enter your new password:");

            if (!newPassword || newPassword.length < 6) {

                alert("Password must be at least 6 characters.");
                return;
            }

            localStorage.setItem(
                userEmail,
                newPassword
            );

            alert("Password changed successfully!");
        });
    }

});