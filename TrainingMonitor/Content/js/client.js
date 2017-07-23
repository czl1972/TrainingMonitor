$(document).ready(function () {
    $('#clientTable').DataTable({
        "fnDrawCallback": function () {
            setupDelete();
        }
    });
    $('#productTable').DataTable();
    setupDelete();
});
function setupDelete() {
    $('.deleteButton').on('click', function () {
        $('.tooltip-inner').remove();
        var row = $(this).parents('.clientRow');
        var json = JSON.stringify(
            {
                'clientId': row.attr('id')
            });
        $.ajax({
            type: "POST",
            url: "/Client/Delete",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function () {
                row.remove();
            }
        });
    });
};