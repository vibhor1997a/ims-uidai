$(document).ready(() => {
    $('#frm').submit((e) => {
        e.preventDefault();
        if (!$("#agree").prop('checked')) {
            alert('Please agree to the age declaration');
        }
        else {
            const username = $('#uid').val().trim();
            const state = $('#state').val().trim();
            $.ajax('/api/v1.0/users/exists', {
                data: {
                    username
                },
                method: 'post',
                success: (res) => {
                    if (!res.data.userExists) {
                        alert('UIDAI id Not found!');
                        return;
                    }
                    else {
                        $.ajax('/api/v1.0/users/me/organizations/validate', {
                            data: {
                                username,
                                organizationName: 'Insurance Portal',
                                state
                            },
                            method: 'post',
                            success: (res) => {
                                if (!res.data.isAdult) {
                                    alert(`You're under age to buy an insurance.`);
                                }
                                else if (!res.data.isStateCorrect) {
                                    alert(`You are not registered for this state.`);
                                }
                                else {
                                    alert('Your request would be processed soon.');
                                }
                            },
                            error: err => {
                                if (err.status == 403) {
                                    alert("We don't have permissions to access the required information");
                                }
                                else{
                                    alert("something went wrong, Please contact support");
                                }
                            }
                        });
                    }
                },
                error: err => {
                    alert(err.responseJSON.data.message);
                }
            });
        }
    });
});