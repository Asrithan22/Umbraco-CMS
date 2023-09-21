var hiddensiteurl, pagename;
$(document).ready(function () {
    $('.chosen-select').selectpicker({
        style: 'btn',
        size: 6,
        container: false
    });
    $('#modality > tbody').append("<div class='ajaxloaderhmediv'></div>");
    hiddensiteurl = $("#hdndomainname").val();
    pagename = $("#hdnpagename").val();


    if (pagename == "top-gainers-and-losers") {
        $("#symbol").click(function () {
            var symboldir = $("txtsrtdir").val();
            if (symboldir == "DESC") {
                $("#txtsrtdir").val('ASC');
            }
            else {
                $("#txtsrtdir").val('DESC');
            }
            $("#txtsrtexp").val('Symbol');
            var srtexp = $("#txtsrtexp").val();
            var srtdir = $("#txtsrtdir").val();
            var typ = $('#Type').val();
            var exg = $('#Exch').val();
            var indicesvalbtn = $('#txtIndices').val();
            initPage(hiddensiteurl + '/ajaxpages/EquitygainLose.aspx?Exchange=' + exg + '&Type=' + typ + '&Period=1&Indices=' + indicesvalbtn + '&SortExp=' + srtexp + '&SortDirect=' + srtdir, 'modality', 'paginate', 'FINCODE', 'S_NAME', hiddensiteurl + '/company-profile/');
        });
        GetIndicesgainlose('');
        var srtexp = $("#txtsrtexp").val();
        var srtdir = $("#txtsrtdir").val();
        var indicesval = $('#txtIndices').val();
        var typ = $('#Type').val();
        var exg = $('#Exch').val();
        if (typ.toLowerCase() == "gain") {
            $("#Gain").addClass('sel');
            $("#Lose").removeClass('sel');
        }
        else {
            $("#Gain").removeClass('sel');
            $("#Lose").addClass('sel');
        }
        $("#ddlExchange").change(function () {
            $('#Exch').val($("#ddlExchange").val());
        });
        showeqdate(exg);
        initPage(hiddensiteurl + '/equity/EquitygainLose?Exchange=' + exg + '&Type=' + typ + '&Period=1&Indices=' + indicesval + '&SortExp=' + srtexp + '&SortDirect=' + srtdir, 'modality', 'paginate', 'FINCODE', 'S_NAME', hiddensiteurl + '/company-profile/');
        $('#GL').click(function () {
            eqdatabind('GainLose');
        });
    }
});


function showeqdate(exc) {
    hiddensiteurl = $('#hdndomainname').val();
    var requestUrl = hiddensiteurl + "/equity/Equitydate?EXCHG=" + exc;
    $.ajax({
        url: requestUrl,
        context: document.body
    }).done(function (data) {
        if (data != "") {
            data = JSON.parse(data);
            $('#eqinnerdate > span').html(data[0].Date);
        }
    });
}

function eqdatabind(page) {
    hiddensiteurl = $('#hdndomainname').val();
    showeqdate($("#ddlExchange").val());
    var Type = $("#Type").val();
    $("#Exch").val($("#ddlExchange").val());
    $("#txtPeriod").val($("#ddlOptions").val());
    var Indices = $('#ddlIndices option:selected').text().toLowerCase();
    if (Indices.indexOf("group") >= 0) {
        $('#txtIndices').val('');
        $('#txtGroup').val($('#ddlIndices option:selected').val());
    }
    else {
        $('#txtIndices').val($('#ddlIndices option:selected').val());
        $('#txtGroup').val('');
    }
    /*********For Gainers And Losers***/
    if (page == 'GainLose') {
        url = hiddensiteurl + "/equity/EquitygainLose?Exchange=" + $("#Exch").val() + "&Type=" + Type + "&Period=" + $("#txtPeriod").val() + "&Group=" + $("#txtGroup").val() + "&Indices=" + $("#txtIndices").val();
        initPage(url, 'modality', 'paginate', 'FINCODE', 'S_NAME', hiddensiteurl + '/company-profile/');
    }
}

/***Top Gainers & Losers***/
function GetIndicesgainlose(symb) {
    hiddensiteurl = $('#hdndomainname').val();
    $('#Exch').val($("#ddlExchange").val());
    var Exchg1 = $("#Exch").val();
    var Indices = document.getElementById("ddlIndices");
    document.body.style.cursor = "progress";

    var requestUrl = hiddensiteurl + "/equity/GetIndices?Exchg=" + Exchg1 + "&Symbol=" + symb;
    $.ajax({       
        url: requestUrl,
        context: document.body
    }).done(function (data) {
        fillIndices(Indices, data);
        if (Exchg1 == "NSE") {
            $("#ddlIndices").val('123');
            $('#txtIndices').val('123');
        }
        else {
            $("#ddlIndices").val('2');
            $('#txtIndices').val('2');
        }
        $("#ddlIndices").selectpicker("refresh");
    });
}

function fillIndices(ig_, data) {
    var strData = data;
    if (strData != "") {
        data = JSON.parse(data);
        data = data.Table;
        ig_.length = 0;
        for (i = 0; i < data.length; i++) {
            ig_.options[i] = new Option();
            ig_.options[i].value = data[i].Val;
            ig_.options[i].text = data[i].INDICES;
        }
    }
    else {
        ig_.length = 0;
        ig_.options[0] = new Option();
        ig_.options[0].value = "";
        ig_.options[0].text = "Indices not available";
    }
    document.body.style.cursor = "auto";
    $(ig_).selectpicker("refresh");
}

function selecttab(id) {
    if (id == "1") {
        $('#txtsrtdir').val("DESC");
        $("#Lose").removeClass('sel');
        $("#Gain").addClass('sel');
        $('#Type').val("GAIN");
        eqdatabind('GainLose');
    }
    if (id == "2") {
        $('#txtsrtdir').val("ASC");
        $("#Gain").removeClass('sel');
        $("#Lose").addClass('sel');
        $('#Type').val("LOSE");
        eqdatabind('GainLose');
    }
}
