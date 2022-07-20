const script = {
    init: async () => {
        console.log('init script launched');
        script.addListennersToAction();

        // get the token and if any
        // try to POST it directly
        const token = window.localStorage.getItem('audicServerToken');

        if (token) {
            const login = await fetch('/', {
                method: 'GET',
                headers: {
                    "authorization": token
                }
            });

            try {
                const decodedLogin = await login.json();

                // Analysing the answer from server
                if (decodedLogin.result === false) {
                    // document.getElementById('messageContainer').textContent = decodedLogin.message;
                    return;
                }
                document.write(decodedLogin.html);

            }
            catch (e) {

            }

        }


    },
    addListennersToAction: () => {
        const logInBtn = document.getElementById('logInBtn');
        logInBtn.addEventListener('click', script.sendLoginCredentials);

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

        if (login.result === true) {
            // server sent back a token - we will store it or replace it in the localStorage
            localStorage.setItem('audicServerToken', login.accessToken);

            // trying to access the console page
            const newDocument = await fetch('/', {
                method: 'GET',
                headers: {
                    "authorization": login.accessToken
                }
            }).then(res => res.json());

            document.write(newDocument.html);


        }
    }

};

document.addEventListener('DOMContentLoaded', script.init);