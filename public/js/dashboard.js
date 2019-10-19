$(document).ready(function () {
    $('#organizations-link').on('click', function (evt) {
        evt.preventDefault();
        $('#profile-container').hide();
        $('#organizations-container').show();
    });

    $('#profile-link').on('click', function (evt) {
        evt.preventDefault();
        $('#organizations-container').hide();
        $('#profile-container').show();
    });

    $('#logout').on('click', function () {
        localStorage.removeItem('userToken');
        location.href = '/';
    });

    $('.save-organization').on('click', function () {
        let age = $('#myModal').find('.age-permission').prop('checked');
        let state = $('#myModal').find('.state-permission').prop('checked');
        let name = $('#myModal').find('.chooseCompany').val();
        let organization = {
            name,
            permissions: {
                age,
                state
            }
        };
        $.post({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            },
            url: '/api/v1.0/users/me/organizations',
            contentType: 'application/json',
            data: JSON.stringify(organization),
            success: response => {
                $(this).parents('.modal').modal('hide').find('form').trigger('reset');
                appendOrganization(organization);
            },
            error: err => {
                console.log(err);
            }
        });
    });

    $.get({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        },
        url: '/api/v1.0/users/me/organizations',
        success: response => {
            const organizations = response.data.organizations;
            for (let organization of organizations) {
                appendOrganization(organization);
            }
        },
        error: err => {
            console.log(err);
        }
    });

    $(document).on('click', '.edit-organization', function () {
        let $trow = $(this).parents('tr');
        $('#edit-organization-modal').modal('show').find('.chooseCompany').val($(this).parents('tr').get(0).id.match(/organization-(.+)/)[1]);
        let $tds = $trow.children();
        $('#edit-organization-modal').find('.age-permission').prop('checked', $($tds.get(1)).val() == 'yes');
        $('#edit-organization-modal').find('.state-permission').prop('checked', $($tds.get(2)).val() == 'yes');
    });

    $(document).on('click', '.edit-save-organization', function () {
        let age = $('#edit-organization-modal').find('.age-permission').prop('checked');
        let state = $('#edit-organization-modal').find('.state-permission').prop('checked');
        let name = $('#edit-organization-modal').find('.chooseCompany').val();
        let organization = {
            name,
            permissions: {
                age,
                state
            }
        };
        $.post({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            },
            url: '/api/v1.0/users/me/organizations',
            contentType: 'application/json',
            data: JSON.stringify(organization),
            success: response => {
                $(this).parents('.modal').modal('hide').find('form').trigger('reset');
                $(`#organization-${name}`).remove();
                appendOrganization(organization);
                location.reload();
            },
            error: err => {
                console.log(err);
            }
        });
    });
});

let $tableBody = $('#organizations-list tbody');
function appendOrganization(organization) {
    $tableBody.append(`<tr id="organization-${organization.name}">
    <td>
    ${organization.name}
    </td>
    <td>
    ${organization.permissions.age ? 'yes' : 'no'}
    </td>
    <td>
    ${organization.permissions.state ? 'yes' : 'no'}
    </td>
    <td>
    <button class="btn btn-secondary btn-sm edit-organization">Edit</button>
    </td>
    </tr>
`);
}