// (async () => {
//     const contractInstance = await initialize();
//     const frm = document.querySelector('#frm');
//     frm.addEventListener('submit', async evt => {
//         evt.preventDefault();
//         const uname = frm.querySelector('#uname').value
//         const password = frm.querySelector('#password').value;
//         const data = {
//             firstName: document.getElementById('firstName').value,
//             lastName: document.getElementById('lastName').value,
//             gender: document.getElementById('gender').value,
//             authority: document.getElementById('authority').value,
//             DOB: document.getElementById('DOB').value,
//             sonOfOp: document.getElementById('sonOfOp').value,
//             sonOfVal: document.getElementById('sonOfVal').value,
//             addressLine1: document.getElementById('addressLine1').value,
//             addressLine2: document.getElementById('addressLine2').value,
//             pincode: document.getElementById('pincode').value,
//             state: document.getElementById('state').value,
//         };
//         if (!(await contractInstance.signup.call(uname, password, JSON.stringify(data)))) {
//             alert('Account Already exists!');
//         }
//         else {
//             await contractInstance.signup(uname, password, JSON.stringify(data));
//             localStorage.setItem('username', uname);
//             location.href = '/';
//         }
//     });
// })().catch(err => {
//     console.log(err);
// });


// /**
//  * @param {File} file 
//  */
// function getBase64(file) {
//     return new Promise((res, rej) => {
//         if (!file) {
//             res('abc');
//         }
//         var reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = function () {
//             res(reader.result);
//         };
//         reader.onerror = function (error) {
//             rej(error);
//         };
//     });
// }


$(document).ready(() => {
    $('#frm').submit((e) => {
        e.preventDefault();
        const username = $('#uname').val().trim();
        const password = $('#password').val().trim();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const gender = document.getElementById('gender').value;
        const DOB = document.getElementById('DOB').value;
        const sonOfOp = document.getElementById('sonOfOp').value;
        const sonOfVal = document.getElementById('sonOfVal').value;
        const addressLine1 = document.getElementById('addressLine1').value;
        const addressLine2 = document.getElementById('addressLine2').value;
        const pincode = document.getElementById('pincode').value;
        const state = document.getElementById('state').value;

        $.ajax('http://localhost:3001/api/v1.0/users/signup', {
            data: {
                username,
                password,
                firstName,
                lastName,
                gender,
                DOB,
                sonOfOp,
                sonOfVal,
                addressLine1,
                addressLine2,
                pincode,
                state
            },
            method: 'post',
            success: (res) => {
                alert(res.data.message + '\nPlease login to continue');
                location.href = '/login.html';
            },
            error: err => {
                alert(err.responseJSON.data.message);
            }
        });
    });
});