// (async () => {
//     const contractInstance = await initialize();
//     const uname = localStorage.getItem('username');
//     if (uname) {
//         document.querySelector('#loginsignup').setAttribute('hidden', 'true');
//         document.querySelector('#uname').innerText = uname;
//         document.querySelector('#logout').addEventListener('click', async () => {
//             await logout();
//         });
//     }
//     else {
//         document.querySelector('#username').setAttribute('hidden', 'true');
//     }
//     async function logout() {
//         const res = await contractInstance.logout.call(uname);
//         console.log(res);
//         localStorage.removeItem('username');
//         location.reload();
//     }
// })().catch(err => console.log(err));

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
