$(document).ready(function () {
    $('#myTradesTable tbody').on('click', 'tr', function (e) {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $('#myTradesTable tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        //var json = JSON.stringify(
        //    {
        //        'tradeId': $(this).attr('id')
        //    });
        //    $.ajax({
        //        type: "POST",
        //        url: getTradeAnalysisUrl,
        //        contentType: "application/json; charset=utf-8",
        //        data: json,
        //        success: function (result) {
                    
        //        }
        //    });
    });
});
