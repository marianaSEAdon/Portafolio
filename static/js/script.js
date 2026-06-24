function updateFooterYear(){
    const yearSpan = document.getElementById('current-year')
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
function setupNavbar() {
    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("navbar");

    if (btn && menu) {
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    }
}

function setupContactForm(){
    const form = document.getElementById('form-contacto');

    if(form){
        form.addEventListener('submit', function(event){
            event.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            // Loading
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            const formData = new FormData(this);

            fetch('/send_email', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                showFlashMessage(
                    data.message,
                    data.status === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                );

                if (data.status === "success") {
                    this.reset();
                }
            }).catch(error => {
                showFlashMessage("Error al enviar el formulario", "bg-red-500 text-white");
            }).finally(() => {
                // Restaurar botón
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
        });
    }
}

function showFlashMessage(message, category){
    const flashContainer = document.getElementById('flash-messages');
    const flashMessage = document.createElement('div');
    flashMessage.className = `p-4 mb-4 rounded-lg shadow-md transition-all duration-300 ${category}`;
    flashMessage.textContent = message;

    flashContainer.appendChild(flashMessage);

    setTimeout(() => {
        flashMessage.remove();
    }, 5000);
}

/**Dark Mode */
function setupDarkMode() {
    const darkButton = document.getElementById("darkButton");

    if (!darkButton) return;

    darkButton.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");

        const newTheme = isDark ? "light" : "dark";

        document.documentElement.classList.toggle("dark", !isDark);
        localStorage.setItem("color-theme", newTheme);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupDarkMode();
    updateFooterYear();
    setupNavbar();
    setupContactForm();
});
