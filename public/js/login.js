// (async () => {
//     const contractInstance = await initialize();
//     const frm = document.querySelector('form');
//     frm.addEventListener('submit', async (evt) => {
//         evt.preventDefault();
//         const uname = frm.querySelector('#uname').value;
//         const password = frm.querySelector('#password').value;
//         await login(uname, password);
//     });
//     async function login(uname, password) {
//         const success = await contractInstance.login.call(uname, password);
//         if (success) {
//             localStorage.setItem('username', uname);
//             location.href = '/';
//         }
//         else {
//             alert('Account Not Found!');
//         }
//     }
// })().catch(err => console.log(err));

$(document).ready(() => {
    $('form').submit((e) => {
        e.preventDefault();
        const username = $('#uname').val().trim();
        const password = $('#password').val().trim();
        $.ajax('http://localhost:3001/api/v1.0/users/login', {
            data: {
                username, password
            },
            method: 'post',
            success: (data) => {
                console.log(data);
                localStorage.setItem('userToken', data.data.accessToken);
                location.href = '/';
            },
            error: err => {
                alert(err.responseJSON.data.message);
            }
        });
    });
});