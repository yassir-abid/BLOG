const baseUrl = 'http://localhost:3000';

const app = {
    async handleContactForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await fetch(`${baseUrl}/contact`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const json = await response.json();
                let message;
                let html;
                if (json) {
                    message = 'Message envoyé !';
                    html = '.success-response';
                } else {
                    message = 'Echec de l\'envoi';
                    html = '.failure-response';
                }
                const formResponse = document.querySelector(html);
                formResponse.textContent = message;
                formResponse.classList.remove('is-hidden');
            }
        } catch (err) {
            console.error(err);
        }
    },

    async formAction() {
        document.querySelector('.form-content').addEventListener('submit', app.handleContactForm);
        document.querySelectorAll('.form-response').forEach((element) => element.classList.add('is-hidden'));
    },

    init() {
        app.formAction();
    },

};

document.addEventListener('DOMContentLoaded', app.init);
