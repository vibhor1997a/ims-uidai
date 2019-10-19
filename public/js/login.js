$(document).ready(() => {
    $('form').submit((e) => {
        e.preventDefault();
        const username = $('#uname').val().trim();
        const password = $('#password').val().trim();
        $.ajax('/api/v1.0/users/login', {
            data: {
                username, password
            },
            method: 'post',
            success: (data) => {
                console.log(data);
                localStorage.setItem('userToken', data.data.accessToken);
                location.href = '/dashboard.html';
            },
            error: err => {
                alert(err.responseJSON.data.message);
            }
        });
    });
});