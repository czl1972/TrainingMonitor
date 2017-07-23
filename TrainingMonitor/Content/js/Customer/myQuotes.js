$(document).ready(function () {
    //$('#myQuoteTable').dataTable({
        //"bPaginate": false,
        //"bLengthChange": false,
        //"bFilter": false,
        //"bInfo": false,
        //"bAutoWidth": true
    //});

    $('#myQuotesTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $('#myQuotesTable tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        var json = JSON.stringify(
            {
                'quoteId': $(this).attr('id')
            });
            $.ajax({
                type: "POST",
                url: getQuoteDetailsUrl,
                contentType: "application/json; charset=utf-8",
                data: json,
                success: function (result) {
                    $('#myQuotesQuatationDetail').html(result);
                }
            });
    });
});
