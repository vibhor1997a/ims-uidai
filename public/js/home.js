$(document).ready(function () {
    const token = localStorage.getItem('userToken');
    console.log(token);
    if (token) {
        const abc = token.split('.');
        document.querySelector('#loginsignup').setAttribute('hidden', 'true');
        document.querySelector('#uname').innerText = JSON.parse(atob(token.split('.')[1])).username;
        document.querySelector('#logout').addEventListener('click', async () => {
            localStorage.removeItem('userToken');
            location.reload();
        });
    }
    else {
        document.querySelector('#username').setAttribute('hidden', 'true');
        console.log(document.querySelector('#username'));
    }
});
