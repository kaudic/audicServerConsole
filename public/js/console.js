const script = {
    init: async () => {
        console.log('init script launched');
        script.addListennersToAction();

    },
    addListennersToAction: () => {
        const logInBtn = document.getElementById('logInBtn');
        if (logInBtn) {
            logInBtn.addEventListener('click', script.sendLoginCredentials);
        }
    },
    sendLoginCredentials: async (e) => {
        e.preventDefault();

        // sending details to server with POST request
        const login = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                login: document.getElementById('login').value,
                password: document.getElementById('password').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

        // Analysing the answer from server
        if (login.result === false) {
            document.getElementById('messageContainer').textContent = login.message;
            return;
        }

        window.location.href = '/';

    }

};

document.addEventListener('DOMContentLoaded', script.init);