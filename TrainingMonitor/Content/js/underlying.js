$(document).ready(function() {
    $('#underlyingTable').DataTable({
        "fnDrawCallback": function () {
            setupDelete();
        }
    });
    setupDelete();
});

function setupDelete() {
    $('.deleteButton').on('click',
        function () {
            $('.tooltip-inner').remove();//a bug in tooltip-inner which tooltip remians on the screen
            var row = $(this).parents('.underlyingRow');
            var json = JSON.stringify(
                {
                    'underlyingId': row.attr('id')
                });
            $.ajax({
                type: "POST",
                url: "/Underlying/Delete",
                contentType: "application/json; charset=utf-8",
                data: json,
                success: function () {
                    row.remove();
                }
            });
        });
};