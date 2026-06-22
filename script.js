document.addEventListener("DOMContentLoaded", () => {
    const authCard = document.getElementById("authCard");
    const toSignup = document.getElementById("toSignup");
    const toLogin = document.getElementById("toLogin");

    // 1. Form Switch Toggle Logic (Sliding Panel Controller)
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

    // 2. Password Show/Hide Toggle Logic
    const passToggles = document.querySelectorAll(".pass-toggle");
    passToggles.forEach(btn => {
        btn.addEventListener("click", function() {
            const input = this.parentElement.querySelector("input");
            if (input) {
                const isPass = input.getAttribute("type") === "password";
                input.setAttribute("type", isPass ? "text" : "password");
                this.textContent = isPass ? "Hide" : "Show";
            }
        });
    });

    // User ke input start karte hi red invalid warning boundaries clear karne ke liye loop
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach(input => {
        input.addEventListener("input", function() {
            this.parentElement.classList.remove("invalid");
        });
    });

    // 📥 3. SMART FACEBOOK/INSTAGRAM STYLE LOGIN VALIDATION
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail");
            const pass = document.getElementById("loginPassword");
            const emailError = document.getElementById("loginEmailError");
            let valid = true;

            // Reset custom error properties
            if (emailError) emailError.textContent = "Please enter a valid email.";

            // Email Format Check
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                email.parentElement.classList.add("invalid");
                valid = false;
            }
            
            // Password Format Check
            if (pass.value.trim().length < 6) {
                pass.parentElement.classList.add("invalid");
                valid = false;
            }

            if (!valid) return;

            const userEmail = email.value.trim().toLowerCase();
            const registeredPassword = localStorage.getItem(userEmail);

            // Database verification conditional logic trace
            if (!registeredPassword) {
                email.parentElement.classList.add("invalid");
                if (emailError) {
                    emailError.innerHTML = "⚠️ Account not found! Please <span style='color:#38bdf8; cursor:pointer; text-decoration:underline;' id='switchLink'>Sign Up</span> first.";
                    
                    // Error link text trigger click shortcut to sign up
                    document.getElementById("switchLink").addEventListener("click", () => {
                        authCard.classList.add("show-signup");
                    });
                }
            } else if (registeredPassword !== pass.value.trim()) {
                // Wrong Password -> Shake input active
                const passError = pass.parentElement.parentElement.querySelector(".error-text");
                if (passError) passError.textContent = "Incorrect password! Please try again.";
                pass.parentElement.classList.add("invalid");
            } else {
                // All verification passed successfully
                console.log("Welcome back! Navigation routing success verified.");
                loginForm.reset();
                const toggles = loginForm.querySelectorAll(".pass-toggle");
                toggles.forEach(t => t.textContent = "Show");

                // 🚀 REDIRECTION TO PORTFOLIO FIXED: Aapka hosted profile URL link add kar diya hai
                window.location.href = "https://skhacker9947-afk.github.io/Noman-Portfolio-/"; 
            }
        });
    }

    // 📝 4. SIGNUP VALIDATION & LOCAL STORAGE MANAGEMENT
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("signupName");
            const email = document.getElementById("signupEmail");
            const pass = document.getElementById("signupPassword");
            let valid = true;

            if (name.value.trim() === "") {
                name.parentElement.classList.add("invalid");
                valid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                const signupEmailError = email.parentElement.querySelector(".error-text");
                if (signupEmailError) signupEmailError.textContent = "Please enter a valid email.";
                email.parentElement.classList.add("invalid");
                valid = false;
            }
            if (pass.value.trim().length < 6) {
                pass.parentElement.classList.add("invalid");
                valid = false;
            }

            if (!valid) return;

            const userEmail = email.value.trim().toLowerCase();

            // Duplicate Check
            if (localStorage.getItem(userEmail)) {
                const signupEmailError = email.parentElement.querySelector(".error-text");
                if (signupEmailError) signupEmailError.textContent = "This email is already registered.";
                email.parentElement.classList.add("invalid");
                return;
            }

            // Store inside memory matrix array framework
            localStorage.setItem(userEmail, pass.value.trim());
            
            // Success switch automatically back
            signupForm.reset();
            const toggles = signupForm.querySelectorAll(".pass-toggle");
            toggles.forEach(t => t.textContent = "Show");
            authCard.classList.remove("show-signup");
        });
    }
});