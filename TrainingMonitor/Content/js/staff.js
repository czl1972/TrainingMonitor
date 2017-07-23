$(document).ready(function () {
    $('#staffTable').DataTable({
        "fnDrawCallback": function () {
            setupDelete();
        }
    });
    $('#clientTable').DataTable();
    $('#productTable').DataTable();
    setupDelete();
});

function setupDelete() {
    $('.deleteButton').on('click', function () {
        $('.tooltip-inner').remove();
        var row = $(this).parents('.staffRow');
        var json = JSON.stringify(
            {
                'staffId': row.attr('id')
            });
        $.ajax({
            type: "POST",
            url: "/Staff/Delete",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function () {
                row.remove();
            }
        });
    });
};