
var pagenos = 1;
var pagenos1 = 1;
var pagenos2 = 1;
var pagenos3 = 1;
var pagenos4 = 1;
var pagecnt = 0;
var pagecount = 0;
var pagecntnew = 0;
var pagecntnew3 = 0;
var pagecountnew = 0;
var j = 0;
var sel = 0, selnew = 0, selnew3 = 0;
sel2 = 0;
var footable12;
var footable123;
var footablenew;
var footablenew3;
var mainurl;
//Initiating Table

function initPage(pageWithQuery, dataId, paginateId, symFin, fieldName, refPage) {
    if (sel == 0) {
        if (dataId == "schemeMF") {
            footable123 = '';
            footable123 = $('#' + dataId).footable().data('footable');
        }
        else if (dataId == "modalitynew") {
            footablenew = '';
            footablenew = $('#' + dataId).footable().data('footable');
        }
        else if (dataId == "modalitynew3") {
            footablenew3 = '';
            footablenew3 = $('#' + dataId).footable().data('footable');
        }
        else {
            footable12 = '';
            footable12 = $('#' + dataId).footable().data('footable');
        }
        sel = 1;
    }
    if (selnew == 0) {
        if (dataId == "modalitynew") {
            footablenew = '';
            footablenew = $('#' + dataId).footable().data('footable');
            selnew = 1;
        }
    }
    if (selnew3 == 0) {
        if (dataId == "modalitynew3") {
            footablenew3 = '';
            footablenew3 = $('#' + dataId).footable().data('footable');
            selnew3 = 1;
        }
    }
    $('#' + dataId + ' > tbody').append("<div class='ajaxloaderhmediv'></div>");

    //$.ajax({
    //    url: pageWithQuery + '&pageNo=1&PageSize=10&opt=page'
    //}).done(function (Data) {
    //    if (dataId == "schemeMF") {
    //        pagecount = parseInt(Data);
    //        pagecountnew = pagecount;
    //    }
    //    else if (dataId == "modalitynew") {
    //        pagecntnew = parseInt(Data);
    //        pagecountnew = pagecntnew;
    //    }
    //    else if (dataId == "modalitynew3") {
    //        pagecntnew3 = parseInt(Data);
    //        pagecountnew = pagecntnew3;
    //    }
    //    else {
    //        pagecnt = parseInt(Data);
    //        pagecountnew = pagecnt;
    //    }

    //    // added for no data - during php api
    //    if (pagecountnew != 0 && pagecountnew != null && pagecountnew != "") {
    //        getPage(1, pageWithQuery, dataId, paginateId, symFin, fieldName, refPage);
    //    }
    //    else {
    //        NoDataAvailable(dataId);
    //    }
    //});

    getPage(1, pageWithQuery, dataId, paginateId, symFin, fieldName, refPage);

}

//Get Data from ajax and bind to the table with FOOTABLE
function getPage(num, pageWithQuery, dataId, paginateId, symFin, fieldName, refPage) {
    if (dataId == "schemeMF")
        $(".nodatainner").remove();
    else if (dataId == "modalitynew")
        $("#" + dataId + " .nodatainner").remove();
    else if (dataId == "modalitynew3")
        $("#" + dataId + " .nodatainner").remove();
    else
        $("#" + dataId + " .nodatainner").remove();
    if (num != 0) {
        if (dataId == "schemeMF")
            pagenos1 = num;
        else if (dataId == "modalitynew")
            pagenos2 = num;
        else if (dataId == "modalitynew3")
            pagenos3 = num;
        else
            pagenos4 = num;
        pagenos = num;
    }
    $('#' + dataId + ' > tbody').append("<div class='ajaxloaderhmediv'></div>");
    var finsymVal;
    $.ajax({
        url: pageWithQuery + '&pageNo=' + pagenos + '&PageSize=10',
        dataType: 'json',
        success: function (result) {
            var row = $('#' + dataId).find('tbody > tr');
            if (dataId == "schemeMF") {
                footable123.removeRow(row);
            }
            else if (dataId == "modalitynew") {
                footablenew.removeRow(row);
            }
            else if (dataId == "modalitynew3") {
                footablenew3.removeRow(row);
            }
            else
                footable12.removeRow(row);

            var ResData = result.Table;

            pagecnt = parseInt(Math.ceil((result.Table1[0].TotalRows) / 10));

            pagecountnew = pagecnt;

            $.each(ResData, function (idx, obj) {
                var setalgn = 1;
                var row = '<tr>';
                if (symFin == 'Fincode' || symFin == 'FinCode' || symFin == 'fincode' || symFin == 'FINCODE' || symFin == 'SYMBOL' || symFin == 'SCHEMECODE' || symFin == 'CLASSCODE' || symFin == 'Top_schemecode'
                    || symFin == 'FMP_schemecode' || symFin == 'NFO_schemecode' || symFin == 'AMC_CODE' || symFin == '' || symFin == 'INDEXCODE' || symFin == 'INDEX_ID' || symFin == 'COMSYMBOL') {
                    $.each(obj, function (key, value) {
                        if (key == symFin) {
                            finsymVal = value;
                        }
                        else {
                            if (key == fieldName) {
                                if (fieldName == 'INDX_GRP') {
                                    var Exchg1 = $("#ContentPlaceHolder1_ddlExchange").val();
                                    var fin;
                                    fin = finsymVal;
                                    var url = refPage.replace("details/", "details.aspx?option=") + '&IndexCode=' + finsymVal + '&IndexGroup=' + value + '&EXCHG=' + Exchg1;
                                    row += '<td><a href="' + url.toLowerCase() + '">' + value + '</a></td>';

                                    //                                    if (fin !== "") {
                                    //                                        fin = finsymVal;
                                    //                                    }
                                    //                                    else {
                                    //                                        fin = "null";
                                    //                                    }
                                    //                                    var url = refPage + '/' + fin + '/' + value + '/' + Exchg1;
                                    //                                    row += '<td><a href="' + url + '">' + value + '</a></td>';
                                }
                                else
                                    if (refPage.indexOf("SmartQuotes.aspx") > 0) {
                                        var name = value;
                                        value = value.replace("&", "-");
                                        var dname_without_space = value.replace(/[^a-zA-Z 0-9]+/g, "");
                                        var name_without_special_char = dname_without_space.replace(/ /g, "-");
                                        var name_without_special_charect = name_without_special_char.replace("--", "-");
                                        row += '<td><a href=' + refPage + value.replace(/ /g, "-").replace("&", "-").replace("--", "-") + '>' + value + '</a></td>';
                                    }
                                    else {
                                        if (refPage.indexOf("/company-profile/") > 0) {
                                            mainurl = $('#hdndomainname').val() + '/company-profile/smart-quotes.aspx?fincode=' + finsymVal;
                                            row += '<td><a href="' + mainurl + '">' + value + '</a></td>';
                                            //                                            var comSname = value.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').replace(/\--/g, '-');
                                            //                                            if (pageWithQuery.indexOf("MFWhatsInAjax.aspx") > 0 || pageWithQuery.indexOf("MFWhatsOutAjax.aspx") > 0) {
                                            //                                                row += '<td><a href="' + refPage + comSname + "/mf" + '">' + value + '</a></td>';
                                            //                                            }
                                            //                                            else
                                            //                                                row += '<td><a href="' + refPage + comSname + '">' + value + '</a></td>';
                                        }
                                        else if (refPage.indexOf("/ipo/") > 0) {
                                            //                                            var comp = value.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').replace(/\--/g, '-');
                                            //                                            row += '<td><a href="' + refPage + comp + '">' + value + '</a></td>';
                                            mainurl = $('#hdndomainname').val() + '/ipo/iposnapshot.aspx?fincode=' + finsymVal;
                                            row += '<td><a href="' + mainurl + '">' + value + '</a></td>';
                                        }
                                        else if (refPage.indexOf("/worldindices-history/") > 0) {
                                            //mainurl = $('#hdndomainname').val() + '/equity/worldindices-history.aspx?index_id=' + finsymVal;
                                            mainurl = 'javascript://';
                                            row += '<td><a href="' + mainurl + '">' + value + '</a></td>';
                                        }
                                        else if (refPage.indexOf("/mutual-fund/") > 0) {
                                            row += '<td><a href="' + (refPage + finsymVal).toLowerCase() + '">' + value + '</a></td>';
                                        }
                                        else if (refPage.indexOf("/scheme-profile/") > 0) {
                                            mainurl = $('#hdndomainname').val() + '/mutual-fund/scheme-profile.aspx?schemecode=' + finsymVal;
                                            row += '<td><a href="' + mainurl + '">' + value + '</a></td>';
                                        }
                                        //if (refPage.indexOf("/company-profile/") > 0) { // company profile
                                        //    var comSname = value.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').replace(/\--/g, '-');
                                        //    if (pageWithQuery.indexOf("MFWhatsInAjax.aspx") > 0 || pageWithQuery.indexOf("MFWhatsOutAjax.aspx") > 0) {
                                        //        row += '<td><a href="' + refPage + comSname + "/mf" + '">' + value + '</a></td>';
                                        //    }
                                        //    else
                                        //        row += '<td><a href="' + refPage + comSname + '">' + value + '</a></td>';
                                        //}
                                        //else if (refPage.indexOf("/ipo/") > 0) { // ipo
                                        //    var comp = value.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').replace(/\--/g, '-');
                                        //    row += '<td><a href="' + refPage + comp + '">' + value + '</a></td>';
                                        //}
                                        //// mutual fund
                                        //else if (refPage.indexOf("/scheme-profile/") > 0) {
                                        //    var schemename = value.toLowerCase().replace(/\ /g, '-').replace(/\&/g, '-').replace(/\(/g, '-').replace(/\)/g, '-');
                                        //    //var ref = "../scheme-profile/";
                                        //    row += '<td><a href="' + schemename + '">' + value + '</a></td>';
                                        //}
                                        //else if (fieldName == 'AMC' || fieldName == 'NFO_scheme' || fieldName == 'FMP_scheme') {
                                        //    row += '<td><a href="' + refPage + finsymVal + '">' + value + '</a></td>';
                                        //}
                                        //else if (fieldName == 'TypeName') {
                                        //    var ref = "../mutual-fund/scheme-category/";
                                        //    row += '<td><a href="' + ref + finsymVal + '">' + value + '</a></td>';
                                        //}
                                        //else if (refPage.indexOf("/mutual-fund/") > 0) {
                                        //    var schemename = value.toLowerCase().replace(/\ /g, '-').replace(/\&/g, '-').replace(/\(/g, '-').replace(/\)/g, '-');
                                        //    var ref = $("#hdndomainname").val() + "/mutual-fund/";
                                        //    row += '<td><a href="' + ref + schemename + '">' + value + '</a></td>';
                                        //}
                                        //else {
                                        //    row += '<td><a href="' + refPage + finsymVal + '">' + value + '</a></td>';
                                        //}
                                    }
                            }
                            else {
                                if (($.isNumeric(value) && key != 'BSEDelistScripCode') || (value == "NA" && key != 'BSEDelistScripCode')) {
                                    if (value.indexOf('.') != -1) {
                                        if (value.split(".")[1].length != 2) {
                                            if (isNaN(parseFloat(value))) return;
                                            value = parseFloat(value).toFixed(2);
                                        }
                                    }
                                    if (key == "ScripCode" || key == "SCRIPCODE")
                                        row += '<td>' + value + '</td>';
                                    else {
                                        if (key == "PERCHG" || key == "DiffPerformance" || key == "PerChng" || key == "PerChange" || key == "PERCHNG" ||
                                            key == "PER_CHANGE" || key == "perChg" || key == "NETCHG" || key == "Chng" || key == "Change" || key == "faochg" ||
                                            key == "faodiff" || key == "change" || key == "Perchange" || key == "AVGPERCHNG5DAYBEFOREVOLUME" || key == "CNIM_EX" ||
                                            key == "Net_Value" || key == "CHANGE" || key == "LTP_Chg_Per") {
                                            if (parseFloat(value) > 0)
                                                row += '<td class="text-right hmgrntxt" >' + value + '</td>';
                                            else if (parseFloat(value) < 0)
                                                row += '<td class="text-right hmredtxt" >' + value + '</td>';
                                            else if (parseFloat(value) == 0)
                                                row += '<td class="text-right hmblutxt" >' + value + '</td>';
                                        }
                                        else
                                            row += '<td class="text-right">' + value + '</td>';
                                    }
                                }
                                else {
                                    if (value.indexOf('/') != -1 && value.split("/").length == 3 && setalgn != 1) {
                                        if (key == "Details" || key == "DETAILS") {
                                            row += '<td>' + value + '</td>';
                                        }
                                        else {
                                            var d = new Date(value);
                                            var curr_date = d.getDate();
                                            var curr_month = GetMonthName(d.getMonth() + 1); //Months are zero based
                                            var curr_year = d.getFullYear();
                                            if (value.split("/")[0].length > 2 || value.split("/")[1].length > 2) {
                                                row += '<td>' + value + '</td>';
                                            }
                                            else {
                                                value = curr_date + "-" + curr_month + "-" + curr_year;
                                                row += '<td class="text-center">' + value + '</td>';
                                            }
                                        }
                                    }
                                    else if (value.indexOf('-') != -1 && value.split("-").length == 3 && setalgn != 1) {
                                        if (key == "Details" || key == "DETAILS") {
                                            row += '<td>' + value + '</td>';
                                        }
                                        else {
                                            var d = new Date(value);
                                            var curr_date = d.getDate();
                                            var curr_month = GetMonthName(d.getMonth() + 1); //Months are zero based
                                            var curr_year = d.getFullYear();

                                            if (Date.parse(d)) {
                                                value = curr_date + "-" + curr_month + "-" + curr_year;
                                                row += '<td class="text-center">' + value + '</td>';
                                            }
                                            else {
                                                row += '<td>' + value + '</td>';
                                            }
                                        }
                                    }
                                    else if (value.indexOf('-') != -1 && value.split("-").length == 3 && setalgn != 1 && value.split("-")[0].length < 3 && value.split("-")[1].length < 4) {
                                        row += '<td class="text-center">' + value + '</td>';
                                    }
                                    else {
                                        if (key == "OI_Ltp" || key == "OI_OI" || key == "FundRank")
                                            row += '<td class="text-right">' + value + '</td>';
                                        else {
                                            if (value == "")
                                                if (key == "ISSUEPRICE" || key == "Volume" || key == "3YEARRET" || key == "1YEARRET" || key == "LASTPRICE" || key == "CurrentDELVVOLUME" || key == "PrevDELVVOLUME" || key == "DELVVOLUMEChange" || key == "DELVVOLUME_PERCHANGE" || key == "CurrentLTP" || key == "Change" || key == "Dividend %" || key == "LISTPRICE" || key == "IssueSize") {//for right aligned values
                                                    row += '<td class="text-right">NA</td>';
                                                }
                                                else {
                                                    row += '<td class="text-right">NA</td>';
                                                }
                                            else
                                                if (key == "IssueSize" || key == "PriceBand" || key == "ratio1" || key == "raaaaa") {//for right aligned values
                                                    row += '<td class="text-right">' + value + '</td>';
                                                }
                                                else if (key == "OptType" || key == "OI_OptType" || key == "Interim / Final / Dividend") {
                                                    row += '<td class="text-center">' + value + '</td>';
                                                }
                                                else {
                                                    row += '<td>' + value + '</td>';
                                                }
                                        }
                                    }
                                }
                            }
                            setalgn = 0;
                        }
                    });
                }
                else if (symFin == 'IPOCODEH') {
                    $.each(obj, function (key, value) {
                        if (key == symFin) {
                            finsymVal = value;
                        }
                        else {
                            if (key == fieldName) {
                                //                                row += '<td><a target=_blank href="' + refPage + finsymVal + '.html">' + value + '</a></td>';
                                row += '<td><a href="javascript://">' + value + '</a></td>';
                            }
                            else {
                                if ($.isNumeric(value) || (value == "NA")) {
                                    if (value.indexOf('.') != -1) {
                                        if (value.split(".")[1].length > 2) {
                                            if (isNaN(parseFloat(value))) return;
                                            value = parseFloat(value).toFixed(2);
                                        }
                                    }
                                    row += '<td class="text-right">' + value + '</td>';
                                }
                                else {
                                    if (value.indexOf('/') != -1 && value.split("/").length == 3 && setalgn != 1) {
                                        var d = new Date(value);
                                        var curr_date = d.getDate();
                                        var curr_month = GetMonthName(d.getMonth() + 1); //Months are zero based
                                        var curr_year = d.getFullYear();
                                        if (value.split("/")[0].length > 2 || value.split("/")[1].length > 2) {
                                            row += '<td>' + value + '</td>';
                                        }
                                        else {
                                            value = curr_date + "-" + curr_month + "-" + curr_year;
                                            row += '<td class="text-center">' + value + '</td>';
                                        }
                                    }
                                    else if (value.indexOf('-') != -1 && value.split("-").length == 3 && setalgn != 1 && value.split("-")[0].length < 3 && value.split("-")[1].length < 4) {
                                        row += '<td class="text-center">' + value + '</td>';
                                    }
                                    else
                                        row += '<td>' + value + '</td>';
                                }
                            }
                            setalgn = 0;
                        }
                    });
                }
                else if (symFin == 'IPOCODEP') {
                    $.each(obj, function (key, value) {
                        if (key == symFin) {
                            finsymVal = value;
                        }
                        else {
                            if (key == fieldName) {
                                row += '<td><a target=_blank href="' + refPage + finsymVal + '.pdf">' + value + '</a></td>';
                            }
                            else {
                                if ($.isNumeric(value) || (value == "NA")) {
                                    if (value.indexOf('.') != -1) {
                                        if (value.split(".")[1].length > 2) {
                                            if (isNaN(parseFloat(value))) return;
                                            value = parseFloat(value).toFixed(2);
                                        }
                                    }
                                    row += '<td class="text-right">' + value + '</td>';
                                }
                                else {
                                    if (value.indexOf('/') != -1 && value.split("/").length == 3 && setalgn != 1) {
                                        var d = new Date(value);
                                        var curr_date = d.getDate();
                                        var curr_month = GetMonthName(d.getMonth() + 1); //Months are zero based
                                        var curr_year = d.getFullYear();
                                        if (value.split("/")[0].length > 2 || value.split("/")[1].length > 2) {
                                            row += '<td>' + value + '</td>';
                                        }
                                        else {
                                            value = curr_date + "-" + curr_month + "-" + curr_year;
                                            row += '<td class="text-center">' + value + '</td>';
                                        }
                                    }
                                    else if (value.indexOf('-') != -1 && value.split("-").length == 3 && setalgn != 1 && value.split("-")[0].length < 3 && value.split("-")[1].length < 4) {
                                        row += '<td class="text-center">' + value + '</td>';
                                    }
                                    else
                                        row += '<td>' + value + '</td>';
                                }
                            }
                            setalgn = 0;
                        }
                    });
                }
                else if (symFin == 'Javascrpt') {
                    $.each(obj, function (key, value) {
                        if (key == symFin) {
                            finsymVal = value;
                        }
                        else {
                            if (key == fieldName) {
                                row += '<td><a href="' + finsymVal + '">' + value + '</a></td>';
                            }
                            else {
                                if ($.isNumeric(value) || (value == "NA")) {
                                    if (value.indexOf('.') != -1) {
                                        if (value.split(".")[1].length > 2) {
                                            if (isNaN(parseFloat(value))) return;
                                            value = parseFloat(value).toFixed(2);
                                        }
                                    }
                                    row += '<td class="text-right">' + value + '</td>';
                                }
                                else {
                                    if (value.indexOf('/') != -1 && value.split("/").length == 3 && setalgn != 1) {
                                        var d = new Date(value);
                                        var curr_date = d.getDate();
                                        var curr_month = GetMonthName(d.getMonth() + 1); //Months are zero based
                                        var curr_year = d.getFullYear();
                                        if (value.split("/")[0].length > 2 || value.split("/")[1].length > 2) {
                                            row += '<td>' + value + '</td>';
                                        }
                                        else {
                                            value = curr_date + "-" + curr_month + "-" + curr_year;
                                            row += '<td class="text-center">' + value + '</td>';
                                        }
                                    }
                                    else if (value.indexOf('-') != -1 && value.split("-").length == 3 && setalgn != 1 && value.split("-")[0].length < 3 && value.split("-")[1].length < 4) {
                                        row += '<td class="text-center">' + value + '</td>';
                                    }
                                    else
                                        row += '<td>' + value + '</td>';
                                }
                            }
                            setalgn = 0;
                        }
                    });
                }
                else if (symFin == 'GetQuote') {
                    $.each(obj, function (key, value) {
                        if (key == symFin) {
                            finsymVal = value;
                        }
                        else {
                            if (key == fieldName) {
                                //mainurl = $('#hdndomainname').val() + '/commodity/get-quotes.aspx?excha=' + finsymVal.split('/')[0] + '&symbol=' + finsymVal.split('/')[1] + '&expdate=' + finsymVal.split('/')[2] + '&home=' + finsymVal.split('/')[3];
                                mainurl = $('#hdndomainname').val() + '/commodity/get-quotes/' + finsymVal.split('/')[0] + '/' + finsymVal.split('/')[1] + '/' + finsymVal.split('/')[2] + '/' + finsymVal.split('/')[3];
                                row += '<td><a href="' + mainurl + '">' + value + '</a></td>';
                                //row += '<td><a href="' + refPage + finsymVal + '">' + value + '</a></td>';
                            }
                            else {
                                if ($.isNumeric(value) || (value == "NA")) {
                                    if (value.indexOf('.') != -1) {
                                        if (value.split(".")[1].length > 2) {
                                            if (isNaN(parseFloat(value))) return;
                                            value = parseFloat(value).toFixed(2);
                                        }
                                    }
                                    if (key == "Perchange") {
                                        if (parseFloat(value) > 0)
                                            row += '<td class="text-right hmgrntxt" >' + value + '</td>';
                                        else if (parseFloat(value) < 0)
                                            row += '<td class="text-right hmredtxt" >' + value + '</td>';
                                        else if (parseFloat(value) == 0)
                                            row += '<td class="text-right hmblutxt" >' + value + '</td>';
                                        else
                                            row += '<td class="text-right" >' + value + '</td>';
                                    }
                                    else
                                        row += '<td class="text-right">' + value + '</td>';
                                }
                                else {
                                    if (value.indexOf('/') != -1 && value.split("/").length == 3 && setalgn != 1) {
                                        var d = new Date(value);
                                        var curr_date = d.getDate();
                                        var curr_month = GetMonthName(d.getMonth() + 1); //Months are zero based
                                        var curr_year = d.getFullYear();
                                        if (value.split("/")[0].length > 2 || value.split("/")[1].length > 2) {
                                            row += '<td>' + value + '</td>';
                                        }
                                        else {
                                            value = curr_date + "-" + curr_month + "-" + curr_year;
                                            row += '<td class="text-center">' + value + '</td>';
                                        }
                                    }
                                    else if (value.indexOf('-') != -1 && value.split("-").length == 3 && setalgn != 1 && value.split("-")[0].length < 3 && value.split("-")[1].length < 4) {
                                        row += '<td class="text-center">' + value + '</td>';
                                    }

                                    else
                                        row += '<td>' + value + '</td>';
                                }
                            }
                            setalgn = 0;
                        }
                    });
                }
                row += '</tr>';
                $('#' + dataId + ' .ajaxloaderhmediv').remove();
                $('#' + dataId + ' > tbody').append(row);
            }); //else part
            if (dataId == "schemeMF") {
                paginateFoo(pagenos, pagecount, dataId, paginateId, pageWithQuery, symFin, fieldName, refPage);
                footable123.options.pageSize = 10;
                footable123.redraw();
                footable123.resize();
            }
            else if (dataId == "modalitynew") {
                paginateFoo(pagenos, pagecntnew, dataId, paginateId, pageWithQuery, symFin, fieldName, refPage);
                footablenew.options.pageSize = 10;
                footablenew.redraw();
                footablenew.resize();
            }
            else if (dataId == "modalitynew3") {
                paginateFoo(pagenos, pagecntnew3, dataId, paginateId, pageWithQuery, symFin, fieldName, refPage);
                footablenew3.options.pageSize = 10;
                footablenew3.redraw();
                footablenew3.resize();
            }
            else {
                paginateFoo(pagenos, pagecnt, dataId, paginateId, pageWithQuery, symFin, fieldName, refPage);
                footable12.options.pageSize = 10;
                footable12.redraw();
                footable12.resize();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            NoDataAvailable(dataId);
        }
    });
}

//Paginate Click Management
function paginateClicks(clickType, pageWithQuery, dataId, paginateId, symFin, fieldName, refPage) {
    if (clickType == 'first') {
        if (dataId == "schemeMF")
            pagenos1 = 1;
        else if (dataId == "modalitynew")
            pagenos2 = 1;
        else if (dataId == "modalitynew3")
            pagenos3 = 1;
        else
            pagenos4 = 1;
    }
    else if (clickType == 'prev') {
        if (dataId == "schemeMF") {
            if (pagenos1 == 1)
                return false;
            else {
                pagenos1--;
            }
        } else if (dataId == "modalitynew") {
            if (pagenos2 == 1)
                return false;
            else {
                pagenos2--;
            }
        }
        else if (dataId == "modalitynew3") {
            if (pagenos3 == 1)
                return false;
            else {
                pagenos3--;
            }
        }
        else {
            if (pagenos4 == 1)
                return false;
            else {
                pagenos4--;
            }
        }
    }
    else if (clickType == 'next') {
        if (dataId == "schemeMF") {
            if (pagenos1 == pagecount) return false;
            else pagenos1++;
        }
        else if (dataId == "modalitynew") {
            if (pagenos2 == pagecntnew) return false;
            else pagenos2++;
        }
        else if (dataId == "modalitynew3") {
            if (pagenos3 == pagecntnew3) return false;
            else pagenos3++;
        }
        else {
            if (pagenos4 == pagecnt) return false;
            else pagenos4++;
        }
    }
    else if (clickType == 'last') {
        if (dataId == "schemeMF")
            pagenos1 = pagecount;
        else if (dataId == "modalitynew")
            pagenos2 = pagecntnew;
        else if (dataId == "modalitynew3")
            pagenos3 = pagecntnew3;
        else
            pagenos4 = pagecnt;
    }
    if (dataId == "schemeMF")
        pagenos = pagenos1;
    else if (dataId == "modalitynew")
        pagenos = pagenos2;
    else if (dataId == "modalitynew3")
        pagenos = pagenos3;
    else
        pagenos = pagenos4;
    if (dataId == "schemeMF")
        getPage(pagenos, pageWithQuery, dataId, paginateId, symFin, fieldName, refPage);
    else
        getPage(pagenos, pageWithQuery, dataId, paginateId, symFin, fieldName, refPage);
}

//Generate Page Numbers and Next,Previous,First,Last and functionate it
function paginateFoo(curPg, pgSize, dataId, paginateId, pageWithQuery, symFin, fieldName, refPage) {
    var returnData, pglook = 4, totsec, curno;
    if (curPg > pgSize) {
        if (dataId == "schemeMF")
            $("#Schemepage").hide();
        else if (dataId == "modalitynew")
            $("#paginatenew").hide();
        else if (dataId == "modalitynew3")
            $("#paginatenew3").hide();
        else
            $("#paginate").hide();
        var nodata = "<span class='nodatainner'>No Data Found</span>";
        var nodatamf = "<span class='nodatainner'>No Data Found</span>";
        if (dataId == "schemeMF")
            $('#schemeMF > tbody').html(nodatamf);
        else if (dataId == "modality2")
            $('#modality2 > tbody').html(nodata);
        else if (dataId == "modalitynew")
            $('#modalitynew > tbody').html(nodata);
        else if (dataId == "modalitynew3")
            $('#modalitynew3 > tbody').html(nodata);
        else if (dataId == "modality1")
            $('#modality1 > tbody').html(nodata);
        else
            $('#modality > tbody').html(nodata);
        return false;
    }
    else if (pgSize == 1) {
        if (dataId == "schemeMF")
            $("#Schemepage").hide();
        else if (dataId == "modalitynew")
            $("#paginatenew").hide();
        else if (dataId == "modalitynew3")
            $("#paginatenew3").hide();
        else
            $("#paginate").hide();
    }
    else {
        if (dataId == "schemeMF")
            $("#Schemepage").show();
        else if (dataId == "modalitynew")
            $("#paginatenew").show();
        else if (dataId == "modalitynew3")
            $("#paginatenew3").show();
        else
            $("#paginate").show();
        returnData = "<ul>";
        var pgcount = parseInt(pgSize / 4);
        var totmode = pgSize % 4;
        if (totmode == 0)
            totsec = pgcount;
        else
            totsec = pgcount + 1;
        var cursec = parseInt(curPg / 4);
        var curmode = curPg % 4;
        if (curmode == 0)
            curno = cursec;
        else
            curno = cursec + 1;
        var actClass = '', disClass = '';
        if (curPg == 1) {
            disClass = ' disabled';
            returnData += "<li class='footable-page-arrow " + disClass + "'><a data-page='first' class='first' >«</a></li><li class='footable-page-arrow " + disClass + "'><a class='prev' >‹</a></li>";
        }
        else
            returnData += "<li class='footable-page-arrow " + disClass + "'><a data-page='first' class='first' onclick=\"paginateClicks(\'first\',\'" + pageWithQuery + "\',\'" + dataId + "\',\'" + paginateId + "\',\'" + symFin + "\',\'" + fieldName + "\',\'" + refPage + "\')\">«</a></li><li class='footable-page-arrow " + disClass + "'><a class='prev' onclick=\"paginateClicks(\'prev\',\'" + pageWithQuery + "\',\'" + dataId + "\',\'" + paginateId + "\',\'" + symFin + "\',\'" + fieldName + "\',\'" + refPage + "\')\">‹</a></li>";
        var newcount = ((curno - 1) * 4)
        if ((4 * curno) > pgSize) {
            newcount = ((curno - 1) * 4) - (4 - parseInt(totmode))
        }
        if (newcount < 0)
            newcount = 0;
        for (i = newcount; i < ((4 * curno) > pgSize ? pgSize : (4 * curno)); i++) {
            if (i == (curPg - 1))
                actClass = ' active';
            returnData += "<li class='footable-page" + actClass + "'><a onclick=\"getPage(" + (i + 1) + ",\'" + pageWithQuery + "\',\'" + dataId + "\',\'" + paginateId + "\',\'" + symFin + "\',\'" + fieldName + "\',\'" + refPage + "\')\" href=\"javascript://\">" + (i + 1) + "</a></li>";
            actClass = '';
        }
        disClass = '';
        if (curPg == pgSize) {
            disClass = ' disabled';
            returnData += "<li class='footable-page-arrow " + disClass + "'><a data-page='last' class='next'  >›</a></li><li class='footable-page-arrow " + disClass + "'><a class='last'  >»</a></li>";
        }
        else
            returnData += "<li class='footable-page-arrow " + disClass + "'><a data-page='last' class='next'  onclick=\"paginateClicks(\'next\',\'" + pageWithQuery + "\',\'" + dataId + "\',\'" + paginateId + "\',\'" + symFin + "\',\'" + fieldName + "\',\'" + refPage + "\')\">›</a></li><li class='footable-page-arrow " + disClass + "'><a class='last'  onclick=\"paginateClicks(\'last\',\'" + pageWithQuery + "\',\'" + dataId + "\',\'" + paginateId + "\',\'" + symFin + "\',\'" + fieldName + "\',\'" + refPage + "\')\">»</a></li>";
        returnData += "</ul>";
        $('#' + paginateId).html(returnData);
    }
}

function GetMonthName(MonthNumber) {
    switch (MonthNumber) {
        case 1:
            return 'Jan';
            break;
        case 2:
            return 'Feb';
            break;
        case 3:
            return 'Mar';
            break;
        case 4:
            return 'Apr';
            break;
        case 5:
            return 'May';
            break;
        case 6:
            return 'Jun';
            break;
        case 7:
            return 'Jul';
            break;
        case 8:
            return 'Aug';
            break;
        case 9:
            return 'Sep';
            break;
        case 10:
            return 'Oct';
            break;
        case 11:
            return 'Nov';
            break;
        case 12:
            return 'Dec';
            break;
    }
}
//API No Data or Error // added by Balu for maintaining API no data issue
function NoDataAvailable(dataId) {
    $("#paginate").hide();
    var nodata = "<span class='nodatainner'>No Data Found</span>";
    var nodatamf = "<span class='nodatainner'>No Data Found</span>";
    if (dataId == "schemeMF")
        $('#schemeMF > tbody').html(nodatamf);
    else if (dataId == "modality2")
        $('#modality2 > tbody').html(nodata);
    else if (dataId == "modalitynew")
        $('#modalitynew > tbody').html(nodata);
    else if (dataId == "modalitynew3")
        $('#modalitynew3 > tbody').html(nodata);
    else if (dataId == "modality1")
        $('#modality1 > tbody').html(nodata);
    else
        $('#modality > tbody').html(nodata);
    return false;
}