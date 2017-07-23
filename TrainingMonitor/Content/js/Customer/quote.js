$(document).ready(function () {
    //template item population
    $('.typeDropdown').on('change',
        function () {
            TypeSelectedHandler();
        });

    $('.subtypeDropdown').on('change',
        function () {
            SubtypeSelectedHandler();
        });

    $('#solveForSelect').on('change',
        function () {
            SolveForSelectedHandler();
        });

    init();

    //$('.nav-tabs a').on('shown.bs.tab', function (event) {
    //    var loaded = $(event.target).attr('data-quoteLoaded');
    //    var quoteId = $(event.target).attr('data-quoteId');
    //    if (loaded === null || loaded === 'true') return;

    //    var json = JSON.stringify(
    //        {
    //            'quoteId': quoteId
    //        });
    //    $.ajax({
    //        type: "POST",
    //        //url: "Customer/Quote/GetQuote",
    //        url: getQuoteUrl,
    //        contentType: "application/json; charset=utf-8",
    //        data: json,
    //        success: function (result) {
    //            $('#' + quoteId).html('');
    //            $('#' + quoteId).html(result);
    //            init();
    //        }
    //    });
    //}); 

    
});

function init() {
    TypeSelectedHandler();
    $('.datepicker').datepicker();
};

function TypeSelectedHandler() {
    var type = $(".active .typeDropdown option:selected").text().toLowerCase();
    if (type === '' || type === null || type === undefined) return;

    var json = JSON.stringify(
        {
            'type': type
        });
    $.ajax({
        type: "POST",
        url: "/ProductTemplate/GetSubtypes",
        contentType: "application/json; charset=utf-8",
        data: json,
        success: function (result) {
            $('.subtypeDropdown').find('option').remove();
            $.each(result, function (i, item) {
                $('.subtypeDropdown').append('<option class="form-control">' + item + '</option>');
            });
            $('.subtypeDropdown').find('option:eq(0)').prop('selected', true);
            SubtypeSelectedHandler();
        }
    });
}
function AdjustProgress() {
    $('.active #indicative-progress-bar').width(0).animate({
        width: "100%"
    }, 2500);

};

function SubtypeSelectedHandler() {
    var type = $(".active .typeDropdown option:selected").text().toLowerCase();
    var subtype = $(".active .subtypeDropdown option:selected").text().toLowerCase();
    if (type === null || type === undefined ||
        subtype === null || subtype === undefined) return;
    GetSolveForOptions(type, subtype);
}

function GetSolveForOptions(type, subtype) {
    if (type === null || type === undefined ||
        subtype === null || subtype === undefined) return;
    var json = JSON.stringify(
        {
            'type': type,
            'subtype': subtype
        });
    $.ajax({
        type: "POST",
        url: "/ProductTemplate/GetSolveFors",
        contentType: "application/json; charset=utf-8",
        data: json,
        success: function (result) {
            $('#solveForSelect').find('option').remove();
            //$('#solveForSelect').append('<option value="" disabled selected>&#60;Select a Solve for&#62;</option>');
            $.each(result, function (i, item) {
                $('#solveForSelect').append('<option class="form-control">' + item + '</option>');
            });
            $('#solveForSelect').find('option:eq(0)').prop('selected', true);
        }
    });
};