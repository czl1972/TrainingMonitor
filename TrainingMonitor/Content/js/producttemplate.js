$(document).ready(function () {
    $('#productTemplateTable').DataTable({
        "fnDrawCallback": function () {
            setupDelete();
        },
        'columnDefs': [{
            'targets': [0],
            'orderable': false
        }]
    });
    setupDelete();
    $('#underlyingTable').DataTable({
        "fnDrawCallback": function () {

            $('#checkColumn').width(10);
        }
    });

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

    TypeSelectedHandler();
});

function TypeSelectedHandler() {
    var type = $(".typeDropdown option:selected").text().toLowerCase();
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
            $.each(result,
                function (i, item) {
                    $('.subtypeDropdown').append('<option class="form-control">' + item + '</option>');
                });
            $('.subtypeDropdown').find('option:eq(0)').prop('selected', true);
            SubtypeSelectedHandler();
        }
    });
};

function SubtypeSelectedHandler() {
    var type = $(".typeDropdown option:selected").text().toLowerCase();
    var subtype = $(".subtypeDropdown option:selected").text().toLowerCase();
    if (type === null || type === undefined ||
        subtype === null || subtype === undefined) return;
    GetSolveForOptions(type, subtype);
    InitialiseControls();
};

function SolveForSelectedHandler() {
    InitialiseControls();
    CollectSelections();
};

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
            //add hidden to match the length of inputs on the same epage
            //$('#solveForSelect')
            //    .append(
            //        '<option class="form-control" style="display: none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>');
            $('#solveForSelect').find('option:eq(0)').prop('selected', true);
            SolveForSelectedHandler();
        }
    });
};

function CollectSelections() {
    var type = $(".typeDropdown option:selected").text().toLowerCase();
    var subtype = $(".subtypeDropdown option:selected").text().toLowerCase();
    var solveFor = $("#solveForSelect option:selected").text().toLowerCase();
    UpdateControls(type, subtype, solveFor);
};

//autocall
function AthenaApollon(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');
    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'offer price') {
        $('#strikeInput').val('100');
    } else if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else if (solveFor === 'recall coupon') {
        $('#strikeInput').val('100');
    } else if (solveFor === 'recall threshold') {
        $('#strikeInput').val('100');
    } else if (solveFor === 'ki threshold') {
        $('#strikeInput').val('');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }

    if (solveFor === "recall threshold") {
        $('#recallThresholdInput').val('');
    } else {
        $('#recallThresholdInput').val('100');
    }

    if (solveFor === "recall coupon") {
        $('#recallCouponInput').val('');
    } else {
        $('#recallCouponInput').val('3');
    }

    $('#observationFrequencyInput2').val('12 per year');
};

function AthenaApollonOxygen(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');
    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'offer price') {
        $('#strikeInput').val('100');
    } else if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else if (solveFor === 'recall coupon') {
        $('#strikeInput').val('100');
    } else if (solveFor === 'recall threshold') {
        $('#strikeInput').val('100');
    } else if (solveFor === 'ki=coupon barrier') {
        $('#strikeInput').val('100');
    } else if (solveFor === 'ki threshold') {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }

    $('#capitalProtectionInput').val('');

    $('#couponInput').val('');
    $('#couponOxogenInput').val('3%');
    $('#couponBarrierInput').val('');


    if (solveFor === 'offer price') {
        $('#oxygenCouponBarrierInput').val('80');
    } else if (solveFor === 'strike') {
        $('#oxygenCouponBarrierInput').val('80');
    } else if (solveFor === 'recall coupon') {
        $('#oxygenCouponBarrierInput').val('80');
    } else if (solveFor === 'recall threshold') {
        $('#oxygenCouponBarrierInput').val('80');
    } else if (solveFor === 'ki=coupon barrier') {
        $('#oxygenCouponBarrierInput').val('');
    } else if (solveFor === 'ki threshold') {
        $('#oxygenCouponBarrierInput').val('');
    }

    if (solveFor === 'offer price') {
        $('#couponTypeInput').val('oxgen');
    } else if (solveFor === 'strike') {
        $('#couponTypeInput').val('oxgen');
    } else if (solveFor === 'recall coupon') {
        $('#couponTypeInput').val('oxgen');
    } else if (solveFor === 'recall threshold') {
        $('#couponTypeInput').val('oxgen');
    } else if (solveFor === 'ki=coupon barrier') {
        $('#couponTypeInput').val('');
    } else if (solveFor === 'ki threshold') {
        $('#couponTypeInput').val('');
    }


    if (solveFor === 'recall threshold') {
        $('#recallThresholdInput').val('');
    } else {
        $('#recallThresholdInput').val('100');
    }

    if (solveFor === 'recall coupon') {
        $('#recallCouponInput').val('');
    } else {
        $('#recallCouponInput').val('3');
    }
    $('#observationFrequencyInput2').val('12 per year');
};

function DailyAccrual(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');
    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'coupon') {
        $('#strikeInput').val('100');
    } else {
        $('#strikeInput').val('');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold' || solveFor === 'ki=coupon barrier') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }


    if (solveFor === 'ki=coupon barrier') {
        $('#couponInput').val('3');
        $('#couponTypeInput').val('accrual');
        $('#observationFrequencyInput1').val('12 per year');
    } else {
        $('#couponInput').val('');
        $('#couponTypeInput').val('');
        $('#observationFrequencyInput1').val('');
    }

    $('#couponOxogenInput').val('3%');

    if (solveFor === 'recall threshold') {
        $('#recallThresholdInput').val('');
    } else {
        $('#recallThresholdInput').val('100');
    }
};

function Phoenix(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');
    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike' || solveFor === "ki threshold") {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'recall threshold' || solveFor === 'ki threshold' || solveFor === 'ki=coupon barrier') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }


    if (solveFor === 'ki=coupon barrier') {
        $('#couponInput').val('3');
        $('#couponTypeInput').val('digit');
        $('#observationFrequencyInput1').val('12 per year');
        $('#observationFrequencyInput2').val('');
    } else {
        $('#couponInput').val('');
        $('#couponTypeInput').val('');
        $('#observationFrequencyInput1').val('');
        $('#observationFrequencyInput2').val('12 per year');
    }
    $('#recallThresholdInput').val('100');
    $('#recallCouponInput').val('3');
};

function PhoenixPlus(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');
    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike' || solveFor === '"ki threshold' || solveFor === 'recall threshold') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'recall threshold' || solveFor === 'ki=coupon barrier') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }


    if (solveFor === 'ki=coupon barrier') {
        $('#couponInput').val('3');
        $('#couponTypeInput').val('memory');
        $('#observationFrequencyInput1').val('12 per year');
        $('#observationFrequencyInput2').val('');
    } else {
        $('#couponInput').val('');
        $('#couponTypeInput').val('');
        $('#observationFrequencyInput1').val('');
        $('#observationFrequencyInput2').val('12 per year');
    }
    $('#recallThresholdInput').val('100');
    $('#recallCouponInput').val('3');
};

function PhoenixDouble(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    if (solveFor === 'offer price') {
        $('#remunerationSelect').val('');
    } else {
        $('#remunerationSelect').val('Reoffer');
    }

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'offer price' || solveFor === 'recall threshold') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold' || solveFor === 'ki=coupon barrier') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }


    if (solveFor === 'ki=coupon barrier') {
        $('#couponInput').val('');
    } else {
        $('#couponInput').val('3');
    }

    if (solveFor === 'coupon') {
        $('#couponBarrierInput').val('');
    } else {
        $('#couponBarrierInput').val('80');
    }

    $('#recallThresholdInput').val('100');
    if (solveFor === 'coupon') {
        $('#recallCouponInput').val('');
    } else {
        $('#recallCouponInput').val('6');
    }

    $('#observationFrequencyInput2').val('12 per year');
};

function PhoenixGuaranteedCoupons(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }


    if (solveFor === 'coupon') {
        $('#couponInput').val('');
    } else {
        $('#couponInput').val('3');
    }

    $('#couponBarrierInput').val('');
    $('#couponTypeInput').val('Guaranteed');
    $('#observationFrequencyInput1').val('12 per year');

    if (solveFor === 'recall threshold') {
        $('#recallThresholdInput').val('0.01');
    } else {
        $('#recallThresholdInput').val('100');
    }

    if (solveFor === 'coupon' || solveFor === 'recall coupon') {
        $('#recallCouponInput').val('');
    } else {
        $('#recallCouponInput').val('6');
    }

    $('#observationFrequencyInput2').val('12 per year');
};

function PhoenixCombo(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold' || solveFor === 'ki coupon barrier') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }


    if (solveFor === 'coupon' || solveFor === 'recall threshold') {
        $('#couponInput').val('');
    } else {
        $('#couponInput').val('3');
    }

    if (solveFor === 'ki coupon barrier') {
        $('#couponBarrierInput').val('');
    } else {
        $('#couponBarrierInput').val('80');
    }


    $('#couponTypeInput').val('Digit');
    $('#observationFrequencyInput1').val('12 per year');

    if (solveFor === 'recall threshold') {
        $('#recallThresholdInput').val('');
    } else {
        $('#recallThresholdInput').val('100');
    }

    if (solveFor === 'coupon' || solveFor === 'recall coupon') {
        $('#recallCouponInput').val('');
    } else {
        $('#recallCouponInput').val('6');
    }

    $('#observationFrequencyInput2').val('');
};

function TriggerBarrierDiscountCertificate(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'offer price' || solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }

    $('#couponInput').val('');
    $('#couponBarrierInput').val('');
    $('#couponTypeInput').val('');
    $('#observationFrequencyInput1').val('In Fine');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');

    $('#triggerLevelInput').val('110');
    $('#triggerCouponInput').val('3');
    $('#triggerSettlementOffsetInput').val('5');
};

function TriggerBarrierReverseConvertible(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }

    if (solveFor === 'coupon') {
        $('#couponInput').val('');
    } else {
        $('#couponInput').val('3');
    }


    $('#couponBarrierInput').val('');
    $('#couponTypeInput').val('');
    $('#observationFrequencyInput1').val('In Fine');
    $('#couponDefinitionTypeInput').val('Per Period');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');

    $('#triggerLevelInput').val('110');
    $('#triggerCouponInput').val('3');
    $('#triggerSettlementOffsetInput').val('5');
};


//Reverse Convertible
function DiscountCertificate(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('0.01');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('');
    $('#kiThresholdInput').val('');

    $('#couponInput').val('');
    $('#couponBarrierInput').val('');
    $('#couponTypeInput').val('');
    $('#observationFrequencyInput1').val('In Fine');
    $('#couponDefinitionTypeInput').val('0.01');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');
};

function BarrierDiscountCertificate(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }

    $('#couponInput').val('');
    $('#couponBarrierInput').val('');
    $('#couponTypeInput').val('');
    $('#observationFrequencyInput1').val('In Fine');
    $('#couponDefinitionTypeInput').val('0.01');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');
};

function StandardReverseConvertible(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#barrierSelect').val('0.01');
    $('#kiThresholdInput').val('');

    if (solveFor === 'coupon') {
        $('#couponInput').val('0.01');
    } else {
        $('#couponInput').val('3');
    }


    $('#couponBarrierInput').val('');
    $('#couponTypeInput').val('Guarantee');
    $('#observationFrequencyInput1').val('In Fine');
    $('#couponDefinitionTypeInput').val('Per Period');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');
};

function CallableReverseConvertible(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }

    $('#barrierSelect').val('European');

    $('#couponInput').val('3');
    $('#couponBarrierInput').val('');
    $('#couponTypeInput').val('Guaranteed');
    $('#observationFrequencyInput1').val('12 per year');
    $('#couponDefinitionTypeInput').val('Per Period');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');

    $('#icCouponInput').val('3');
};

function BarrierReverseConvertible(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }

    $('#barrierSelect').val('European');

    $('#couponInput').val('3');
    $('#couponBarrierInput').val('');
    $('#couponTypeInput').val('Guaranteed');
    $('#observationFrequencyInput1').val('12 per year');
    $('#couponDefinitionTypeInput').val('Per Period');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');
};

function BarrierReverseConvertibleWithCoupon(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    if (solveFor === 'ki threshold') {
        $('#kiThresholdInput').val('');
    } else {
        $('#kiThresholdInput').val('70');
    }

    $('#barrierSelect').val('European');

    if (solveFor === 'coupon') {
        $('#couponInput').val('');
    } else {
        $('#couponInput').val('3');
    }

    if (solveFor === 'ki=coupon barrier') {
        $('#couponBarrierInput').val('');
    } else {
        $('#couponBarrierInput').val('80');
    }

    $('#couponTypeInput').val('Digit');
    $('#observationFrequencyInput1').val('12 per year');
    $('#couponDefinitionTypeInput').val('');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');
};

//Credit Linked Note
function CreditLinkedNote(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('');
    $('#strikeModeSelect').val('');
    $('#issuePriceInput').val('100');

    if (solveFor === 'strike') {
        $('#strikeInput').val('');
    } else {
        $('#strikeInput').val('100');
    }

    $('#kiThresholdInput').val('');

    $('#barrierSelect').val('');

    if (solveFor === 'coupon') {
        $('#couponInput').val('');
    } else {
        $('#couponInput').val('3');
    }

    $('#couponBarrierInput').val('');

    $('#couponTypeInput').val('Floating');
    $('#observationFrequencyInput1').val('12 per year');
    $('#couponDefinitionTypeInput').val('');

    $('#couponCalculationInput').val('Accrued');
    $('#fixingModeInput').val('InAdvance');
    $('#referenceRateInput').val('LIBOR USD 1M');

    if (solveFor === 'spread') {
        $('#spreadInput').val('');
    } else {
        $('#spreadInput').val('0');
    }

    $('#recoverySettlementInput').val('Fixed');
    $('#recoverySettlementRateInput').val('30');
    $('#rateSettleTypeInput').val('European');
};

//Participation
function CallSpread(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    $('#strikeInput').val('');
    $('#kiThresholdInput').val('');
    $('#barrierSelect').val('');

    $('#bonusInput').val('');
    $('#capitalProtectionInput').val('100');
    $('#callPutInput').val('Call');
    $('#gearingUpside').val('1');
    $('#lowStrikeInput').val('100');
    $('#isCappedInput').val('Yes');
    $('#highStrikeInput').val('120');
    $('#basketOptionInput').val('Basket');
};

function BonusCertificate(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('100');

    $('#strikeInput').val('');
    $('#kiThresholdInput').val('70');
    $('#barrierSelect').val('European');

    $('#bonusInput').val('100');
    $('#capitalProtectionInput').val('');
    $('#callPutInput').val('');
    $('#gearingUpside').val('1');
    $('#lowStrikeInput').val('');
    $('#isCappedInput').val('Yes');
    $('#highStrikeInput').val('120');
    $('#basketOptionInput').val('Basket (Full)');
};

function Outperf(solveFor) {
    $('#maturityInput').val('36 Months');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    $('#remunerationSelect').val('Reoffer');

    $('#settlementSelect').val('Cash');
    $('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('');

    $('#strikeInput').val('');
    $('#kiThresholdInput').val('');
    $('#barrierSelect').val('');

    $('#bonusInput').val('');
    $('#capitalProtectionInput').val('');
    $('#callPutInput').val('');
    $('#gearingUpside').val('1');
    $('#lowStrikeInput').val('100');
    $('#isCappedInput').val('Yes');
    $('#highStrikeInput').val('120');
    $('#basketOptionInput').val('Basket');
};


function UpdateControls(type, subtype, solveFor) {
    if (type === null || type === undefined ||
        subtype === null || subtype === undefined ||
        solveFor === null || solveFor === undefined) return;

    if (type === 'autocall') {
        if (subtype === 'athena/apollon') {
            AthenaApollon(solveFor);
        }

        if (subtype === 'athena/apollon oxygen') {
            AthenaApollonOxygen(solveFor);
        }

        if (subtype === 'daily accrual') {
            DailyAccrual(solveFor);
        }

        if (subtype === 'phoenix') {
            Phoenix(solveFor);
        }

        if (subtype === 'phoenix plus') {
            PhoenixPlus(solveFor);
        }

        if (subtype === 'phoenix double') {
            PhoenixDouble(solveFor);
        }

        if (subtype === 'phoenix with guaranteed coupons') {
            PhoenixGuaranteedCoupons(solveFor);
        }

        if (subtype === 'phoenix combo') {
            PhoenixCombo(solveFor);
        }

        if (subtype === 'trigger barrier discount certificate') {
            TriggerBarrierDiscountCertificate(solveFor);
        }

        if (subtype === 'trigger barrier reverse convertible') {
            TriggerBarrierReverseConvertible(solveFor);
        }
    }

    if (type === 'reverse convertible') {
        if (subtype === 'discount certificate') {
            DiscountCertificate(solveFor);
        }

        if (subtype === 'barrier discount certificate') {
            BarrierDiscountCertificate(solveFor);
        }

        if (subtype === 'standard reverse convertible') {
            StandardReverseConvertible(solveFor);
        }

        if (subtype === 'callable reverse convertible') {
            CallableReverseConvertible(solveFor);
        }

        if (subtype === 'barrier reverse convertible') {
            BarrierReverseConvertible(solveFor);
        }

        if (subtype === 'barrier reverse convertible with conditional coupons') {
            BarrierReverseConvertibleWithCoupon(solveFor);
        }
    }

    if (type === 'credit linked note') {
        if (subtype === 'credit linked note') {
            CreditLinkedNote(solveFor);
        }
    };

    if (type === 'participation') {
        if (subtype === 'call spread/put spread') {
            CallSpread(solveFor);
        }

        if (subtype === 'bonus certificate') {
            BonusCertificate(solveFor);
        }

        if (subtype === 'outperf') {
            Outperf(solveFor);
        }
    };
};

function InitialiseControls() {
    $('#maturityInput').val('');
    $('#currencySelect').val('USD');
    $('#notionalInput').val('1,000,000');
    //$('#remunerationSelect').val('Reoffer');
    //$('#settlementSelect').val('Cash');
    //$('#strikeModeSelect').val('Close');
    $('#issuePriceInput').val('');
    $('#strikeInput').val('');
    $('#barrierSelect').val('');
    $('#kiThresholdInput').val('');
    $('#bonusInput').val('');
    $('#capitalProtectionInput').val('');
    $('#callPutInput').val('');
    $('#gearingUpside').val('');
    $('#lowStrikeInput').val('');
    $('#isCappedInput').val('');
    $('#highStrikeInput').val('');
    $('#basketOptionInput').val('');

    $('#couponInput').val('');
    $('#couponOxogenInput').val('');
    $('#couponBarrierInput').val('');
    $('#oxygenCouponBarrierInput').val('');
    $('#couponTypeInput').val('');
    $('#observationFrequencyInput1').val('');
    $('#couponDefinitionTypeInput').val('');
    $('#couponCalculationInput').val('');
    $('#fixingModeInput').val('');
    $('#referenceRateInput').val('');
    $('#spreadInput').val('');

    $('#recallThresholdInput').val('');
    $('#recallCouponInput').val('');
    $('#observationFrequencyInput2').val('');
    $('#triggerLevelInput').val('');
    $('#triggerCouponInput').val('');
    $('#triggerSettlementOffsetInput').val('');
    $('#icCouponInput').val('');

    $('#recoverySettlementInput').val('');
    $('#recoverySettlementRateInput').val('');
    $('#rateSettleTypeInput').val('');

};

function setupDelete() {
    $('.deleteButton').on('click', function () {
        $('.tooltip-inner').remove();
        var row = $(this).parents('.productTemplateRow');
        var json = JSON.stringify(
            {
                'productTemplateId': row.attr('id')
            });
        $.ajax({
            type: "POST",
            url: "/ProductTemplate/Delete",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function () {
                row.remove();
            }
        });
    });
};