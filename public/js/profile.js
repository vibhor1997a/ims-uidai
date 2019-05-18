$(document).ready(() => {
    const token = localStorage.getItem('userToken');
    $.ajax('/api/v1.0/users/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        },
        method: 'get',
        success: (res) => {
            document.getElementById('uname').value = JSON.parse(atob(token.split('.')[1])).username;
            document.getElementById('firstName').value = res.data.firstName;
            document.getElementById('lastName').value = res.data.lastName;
            document.getElementById('DOB').value = res.data.DOB;
            document.getElementById('gender').value = res.data.gender;
            document.getElementById('sonOfOp').innerText = res.data.sonOfOp;
            document.getElementById('sonOfVal').value = res.data.sonOfVal;
            document.getElementById('addressLine1').value = res.data.addressLine1;
            document.getElementById('addressLine2').value = res.data.addressLine2;
            document.getElementById('state').value = res.data.state;
            document.getElementById('pincode').value = res.data.pincode;
        },
        error: err => {
            alert(err.responseJSON.data.message);
        }
    });
});