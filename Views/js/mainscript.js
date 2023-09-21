var mnav = 0, innermnav = 0;
var hrefurl = window.location.href, hrefvar;
var domainname;

$(document).ready(function () {
    var pagename = $('#hdnpagename').val();
    domainname = $('#hdndomainname').val();
    $(".match-height").matchHeight();
    $('[type="text"]').hover(function () { $(this).attr("data-original-title", ""); });
    $('[type="password"]').hover(function () { $(this).attr("data-original-title", ""); });
    $('[type="checkbox"]').hover(function () { $(this).attr("data-original-title", ""); });
    $('a[href="#"]').click(function (e) { e.preventDefault(); });

    /*header menu*/
    $("#mobnav").click(function () {
        if (mnav === 0) {
            $(this).addClass("Nclose");
            $(".slidenav").addClass("open");
            mnav = 1;
        } else {
            $(this).removeClass("Nclose");
            $(".slidenav").removeClass("open");
            mnav = 0;
        }
    });

    $("#nclose").click(function () {
        $("#mobnav").removeClass("Nclose");
        $(".slidenav").removeClass("open");
        mnav = 0;
    });

    $('#mnav .submenus').hover(function () {
        //topopensecdetails();
        $('#GalaxyC .submenudetails').removeClass('open');
        $('.searchtopsection').removeClass('open');
    });

    /*responsive menu click*/
    $(".slidenav ul#mnav > li.submenus").click(function () {
        {
            $(this).find(".submenudetails").slideToggle();
        }
    });

    $("#GalaxyC .submenudetails").click(function (e) {
        e.stopPropagation();
    });

    //for mkt menu selection

    if ($('.mkttopmenugrp').length > 0) {
        if (hrefurl.indexOf("mostactive") >= 0) {
            hrefvar = hrefurl.split('/');
        }
        else {
            hrefvar = hrefurl.split('?')[0].split('/');
        }
        hrefvar = hrefvar.slice(-2);

        if (hrefurl.indexOf("/equity/") >= 0) {
            $('#equity1 > a').addClass('activemenu');
        }
        else if (hrefurl.indexOf("/mutual-fund/") >= 0) {
            $('#mut1 > a').addClass('activemenu');
        }
        else if (hrefurl.indexOf("/derivative/") >= 0) {
            $('#derv1 > a').addClass('activemenu');
        }
        else if (hrefurl.indexOf("/ipo/") >= 0) {
            $('#ipo1 > a').addClass('activemenu');
        }
        else {
            var linktag = $('.mkttopmenugrp .outwrapper ul a[href*="/' + hrefvar[0] + '/' + hrefvar[1] + '"]');
            $(linktag).closest('li').find('a').addClass('activemenu');
        }


        /***market top menu***/
        $('.navinner > span').click(function () {
            $(this).parent().find('ul').stop().slideToggle();
            if (innermnav == 0) { $(this).addClass("Nclose"); innermnav = 1; }
            else { $(this).removeClass("Nclose"); innermnav = 0; }
        });
        var navlink = $('.navinner > ul > li');
        navlink.hover(function () {
            if ($(document).width() > 995) { $(this).find('.dropsec').stop(true, true).show(); }
        }, function () {
            if ($(document).width() > 995) {
                $(this).find('.dropsec').hide();
            }
        });
        $('.navinner > ul > li').click(function () {
            if ($(document).width() < 995) {
                if ($(this).find('a').hasClass("active")) {
                    $(this).find('a').removeClass("active");
                    $(this).find('.dropsec').stop(true, true).slideUp();
                }
                else {
                    $(".navinner > ul > li").each(function (index) {
                        $(this).find('a').removeClass("active");
                        $(this).find('.dropsec').stop(true, true).slideUp();
                    });
                    $(this).find('a').addClass("active");
                    $(this).find('.dropsec').stop(true, true).slideToggle();
                }
            }
        });

        $(".innermarketmenu > span").click(function () {
            $(".innermarketmenu > span").toggleClass("open");
            $(".innermarketmenu > ul").slideToggle()
        });
        $('.innermarketmenu > ul > li > a[href="#"]').click(function () {
            $(".innermarketmenu > span").toggleClass("open");
            $(".innermarketmenu > ul").slideToggle()
        });

        $(".fullmenubg:visible").find("#topmrktmenu").addClass("active");
    }

});


/*Check Phone Validation*/
function phonenovalidate(tboxid) {
    var userinput = $("#" + tboxid).val();
    if (userinput != "") {
        var filter = /^[6-9]\d{9}$/;
        if (filter.test(userinput)) {
            return true;
        }
        else {
            $("#" + tboxid).attr('data-original-title', 'Invalid Phone Number, Please Re enter..');
            $("#" + tboxid).tooltip('show');
            $("#" + tboxid).val('');
            $("#" + tboxid).focus();
            $("#" + tboxid).addClass('blured');
            return false;
        }
    }
}

/*Check Alphabets Only*/
function CheckCharacter4AplhabtesOnly(_char, _mozChar, tboxid) {
    if (_mozChar != null) {
        if ((_mozChar == 08) || (_mozChar == 0) || (_mozChar >= 65 && _mozChar <= 90) || (_mozChar >= 97 && _mozChar <= 122) || (_mozChar == 13)) {
            var key = String.fromCharCode(_mozChar);
            key = key.toUpperCase();
            _RetVal = true;
        }
        else if ((_mozChar == 32)) {
            if ($("#" + tboxid).val() != "")
                _RetVal = true;
            else
                _RetVal = false;
        }
        else {
            $("#" + tboxid).attr('data-original-title', 'Please enter alphabetic characters');
            $("#" + tboxid).tooltip('show');
            $("#" + tboxid).focus();
            _RetVal = false;
        }
        if (!_RetVal) {
            return false;
        }
    }
    else {
        if ((_char >= 65 && _char <= 90) || (_char >= 97 && _char <= 122) || (_char == 13) || (_char == 47) || (_char == 39)) {
            var key = String.fromCharCode(_char);
            key = key.toUpperCase();
            _RetVal = true;
        }
        else if ((_char == 32)) {
            if ($("#" + tboxid).val() != "")
                _RetVal = true;
            else
                _RetVal = false;
        }
        else {
            return false;
            _RetVal = false;
        }
    }
    return _RetVal;
}

/*Check Number Only*/
function checknumberonly(_char, _mozChar, tboxid) {
    if (_mozChar != null && _mozChar != 0) {
        if ((_mozChar >= 48 && _mozChar <= 57) || _mozChar == 13 || (_mozChar < 65 && _mozChar > 90) || (_mozChar < 97 && _mozChar > 122) || (_mozChar == 8)) {
            return true;
        }
        else {
            $("#" + tboxid).attr('data-original-title', 'Please enter numeric value');
            $("#" + tboxid).tooltip('show');
            $("#" + tboxid).focus();
            return false;
        }
    } else {
        if ((_char >= 48 && _char <= 57) || _char == 13 || (_char < 65 && _char > 90) || (_char < 97 && _char > 122) || (_char == 8) || (_char == 37)) {
            return true;
        } else {
            $("#" + tboxid).attr('data-original-title', 'Please enter numeric value');
            $("#" + tboxid).tooltip('show');
            $("#" + tboxid).focus();
            return false;
        }
    }
}

/* email validate */
function emailvalidate(tboxid) {
    var userinput = $("#" + tboxid).val();
    if (userinput != "") {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(userinput)) {
            return true;
        }
        else {
            $("#" + tboxid).attr("data-original-title", "'" + userinput + "' Invalid E-mail Address! Please re-enter.");
            $("#" + tboxid).tooltip('show');
            $("#" + tboxid).val('');
            $("#" + tboxid).focus();
            $("#" + tboxid).addClass('blured');
            return false;
        }
    }
}
