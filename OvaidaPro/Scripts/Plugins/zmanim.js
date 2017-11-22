/* kzman.js - Kaluach halachic times Javascript routines
 *   Version 0.01 (initial beta release)
 *   Version 0.02 (fixed bug in display of Shabbat times)
 *   Version 1.00 (fixed bug displaying locations at 0 deg lat/lon)
 * Copyright (C) 5760,5761 (2000 CE), by Abu Mami and Yisrael Hersch.
 *   All Rights Reserved.
 *   All copyright notices in this script must be left intact.
 * Acknowledgment given to scripts by:
 *   - P. Lutus <lutusp@arachnoid.com>
 *     available under the www.arachnoid.com CareWare program
 *	 - Tomer and Yehuda Shiran (docjs.com)
 *   - irt.org
 *   - javascripter.net
 * Permission will be granted to use this script on your web page
 *   if you wish. All that's required is that you please ask.
 *   (Of course if you want to send a few dollars, that's OK too :-)
 * website: http://www.kaluach.net
 * email: abumami@kaluach.org
 */

var lat = 0, lng = 0;	// sun's location
var latd = 32, latm = 5;// lat on earth
var lngd = 34, lngm = 46;// long on earth
var ns = 'N', ew = 'E';	// hemisphere
var dst = 0;			// daylight saving time
var ampm = 0;			// am/pm or 24 hour display
var document = {};
document.data = {};
// ********************  returned parameters *********************************

function doit(dst) {
    var d, m, y;
    var nsi, ewi;
    var i;

    htsIndex = ns.indexOf("N");
    nsi = (htsIndex != -1) ? 0 : 1;

    htsIndex = ew.indexOf("W");
    ewi = (htsIndex != -1) ? 0 : 1;

    d = day + 1;
    m = month + 1;
    y = year;

    var adj = 2;
    adj += dst;

    var time;
    var sunrise, sunset;
    var shaa_zmanit;

    time = suntime(d, m, y, 90, 46.8, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0) {
        sunrise = time[2];
        sunset = time[3];
        hanetz = timeadj(sunrise, ampm);
        shkia = timeadj(sunset, ampm);
        shaa_zmanit = (sunset - sunrise) / 12;
    }
    else {
        hanetz = "";
        shkia = "";
    }

    time = suntime(d, m, y, 115, 54, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0)
        alotearly = timeadj(time[2], ampm);
    else
        alotearly = "";

    time = suntime(d, m, y, 105, 59.4, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0)
        alotlate = timeadj(time[2], ampm);
    else
        alotlate = "";

    time = suntime(d, m, y, 101, 30, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0)
        misheyakir = timeadj(time[2], ampm);
    else
        misheyakir = "";

    time = suntime(d, m, y, 95, 52.8, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0)
        tzeit = timeadj(time[3], ampm);
    else
        tzeit = "";

    shema = timeadj(sunrise + shaa_zmanit * 3 - 2 / 60, ampm);
    tefillah = timeadj(sunrise + shaa_zmanit * 4, ampm);
    chatzot = timeadj(sunrise + shaa_zmanit * 6, ampm);
    if (shaa_zmanit >= 1)
        minchag = timeadj(sunrise + shaa_zmanit * 6.5, ampm);
    else
        minchag = timeadj(sunrise + shaa_zmanit * 6 + 30.0 / 60.0, ampm);
    minchak = timeadj(sunrise + shaa_zmanit * 9.5, ampm);
    plag = timeadj(sunrise + shaa_zmanit * 10.75, ampm);
}

/* ksun.js - Kaluach suntimes Javascript routines
 *   Version 1.00 (initial release)
 *   Version 1.01 (fixed bug with time adjust - AM/PM and 24 hour clock)
 *   Version 1.02 (fixed bug with time adjust [again] - AM/PM and 24 hour clock)
 * Copyright (C) 5760-5762 (2000,2001 CE), by Abu Mami and Yisrael Hersch.
 *   All Rights Reserved.
 *   All copyright notices in this script must be left intact.
 * Based on:
 *	 - the program SUN.C by Michael Schwartz
 *   - an algorithm contained in:
 *         Almanac for Computers, 1990
 *         published by Nautical Almanac Office
 *         United States Naval Observatory
 *         Washington, DC 20392
 * Permission will be granted to use this script on your web page
 *   if you wish. All that's required is that you please ask.
 *   (Of course if you want to send a few dollars, that's OK too :-)
 * website: http://www.kaluach.net
 * email: abumami@kaluach.org
 */

var monCount = new makeArray(1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366);

function leap(y) {
    return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0));
}

function makeArray() {
    this[0] = makeArray.arguments.length;
    for (htsIndex = 0; htsIndex < makeArray.arguments.length; htsIndex = htsIndex + 1)
        this[htsIndex + 1] = makeArray.arguments[htsIndex];
}

function doy(d, m, y) {
    return monCount[m] + d + (m > 2 && leap(y));
}

function suntime(
    dy, mn, yr,
    sundeg, sunmin,
    londeg, lonmin, ew,
    latdeg, latmin, ns,
    timezone) {
    var invalid = 0;	// start out as OK

    longitude = (londeg + lonmin / 60.0) * ((ew == 0) ? -1 : 1);
    latitude = (latdeg + latmin / 60.0) * ((ns == 0) ? 1 : -1);

    var yday = doy(dy, mn, yr);

    var A = 1.5708;
    var B = 3.14159;
    var C = 4.71239;
    var D = 6.28319;
    var E = 0.0174533 * latitude;
    var F = 0.0174533 * longitude;
    var G = 0.261799 * timezone;

    var R = Math.cos(0.01745 * (sundeg + sunmin / 60.0));

    var J;

    // two times through the loop
    //    i=0 is for sunrise
    //    i=1 is for sunset
    for (i = 0; i < 2; i++) {

        if (!i)
            J = A;	// sunrise 
        else
            J = C;	// sunset

        var K = yday + ((J - F) / D);
        var L = (K * .017202) - .0574039;              // Solar Mean Anomoly 
        var M = L + .0334405 * Math.sin(L);            // Solar True Longitude 
        M += 4.93289 + (3.49066E-04) * Math.sin(2 * L);

        // Quadrant Determination 
        if (D == 0) {
            alert("Trying to normalize with zero offset...");
            exit;
        }

        while (M < 0)
            M = (M + D);

        while (M >= D)
            M = (M - D);

        if ((M / A) - Math.floor(M / A) == 0)
            M += 4.84814E-06;

        var P = Math.sin(M) / Math.cos(M);                   // Solar Right Ascension 
        P = Math.atan2(.91746 * P, 1);

        // Quadrant Adjustment 
        if (M > C)
            P += D;
        else {
            if (M > A)
                P += B;
        }

        var Q = .39782 * Math.sin(M);      // Solar Declination 
        Q = Q / Math.sqrt(-Q * Q + 1);     // This is how the original author wrote it! 
        Q = Math.atan2(Q, 1);

        var S = R - (Math.sin(Q) * Math.sin(E));
        S = S / (Math.cos(Q) * Math.cos(E));

        if (Math.abs(S) > 1)
            invalid = 1;	// uh oh! no sunrise/sunset

        S = S / Math.sqrt(-S * S + 1);
        S = A - Math.atan2(S, 1);

        if (!i)
            S = D - S;	// sunrise

        var T = S + P - 0.0172028 * K - 1.73364;  // Local apparent time 
        var U = T - F;                            // Universal timer 
        var V = U + G;                            // Wall clock time 

        // Quadrant Determination 
        if (D == 0) {
            alert("Trying to normalize with zero offset...");
            exit;
        }

        while (V < 0)
            V = V + D;
        while (V >= D)
            V = V - D;
        V = V * 3.81972;

        if (!i)
            sr = V;	// sunrise
        else
            ss = V;	// sunset
    }

    var ret = new Object();
    ret[1] = invalid;
    ret[2] = sr;
    ret[3] = ss;
    return ret;
}


function timeadj(t, ampm) {
    var hour;
    var min;

    var time = t;

    var hour = Math.floor(time);
    var min = Math.floor((time - hour) * 60.0 + 0.5);

    if (min >= 60) {
        hour += 1;
        min -= 60;
    }

    if (hour < 0)
        hour += 24;

    if (ampm) {
        ampm_str = (hour > 11) ? ' PM' : ' AM';
        hour %= 12;
        hour = (hour < 1) ? 12 : hour;
    }
    else
        ampm_str = '';

    var str = hour + ':' + ((min < 10) ? '0' : '') + min + ampm_str;
    return str;
}

function todec(deg, min) {
    return (deg + min / 60.0);
}

function M(x) {
    return (0.9856 * x - 3.251);
}

function L(x) {
    return (x + 1.916 * Math.sin(0.01745 * x) + 0.02 * Math.sin(2 * 0.01745 * x) + 282.565);
}

function adj(x) {
    return (-0.06571 * x - 6.620);
}


/* kzman.js - Kaluach halachic times Javascript routines
 *   Version 0.01 (initial beta release)
 *   Version 0.02 (fixed bug in display of Shabbat times)
 *   Version 1.00 (fixed bug displaying locations at 0 deg lat/lon)
 *   Version 2.01 (handle invalid sunrise/set, different knissat shabbat times)
 *   Special version 2.01 for Tzerei Agudat Chabad
 * Copyright (C) 5760,5761 (2000 CE), by Abu Mami and Yisrael Hersch.
 *   All Rights Reserved.
 *   All copyright notices in this script must be left intact.
 * Acknowledgment given to scripts by:
 *   - P. Lutus <lutusp@arachnoid.com>
 *     available under the www.arachnoid.com CareWare program
 *	 - Tomer and Yehuda Shiran (docjs.com)
 *   - irt.org
 *   - javascripter.net
 * Permission will be granted to use this script on your web page
 *   if you wish. All that's required is that you please ask.
 *   (Of course if you want to send a few dollars, that's OK too :-)
 * website: http://www.kaluach.net
 * email: abumami@kaluach.org
 */

var x = new Date();
var month = x.getMonth(), day = x.getDate() - 1, year = x.getFullYear();
//var month = 3, day = 24, year = 2003;
var lat = 0, lng = 0;	// sun's location
var latd = -1, latm = 0;// lat on earth
var lngd = -1, lngm = 0;// long on earth
var ns = 'N', ew = 'E';	// hemisphere
var dst = 0;			// daylight saving time
var ampm = 0;			// am/pm or 24 hour display
var tz = 2

function leap(y) {
    return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0));
}

/*function civMonthLength(month, year) {
	if(month == 2)
		return 28 + leap(year);
	else if(month == 4 || month == 6 || month == 9 || month == 11)
	   return 30;
	else
		return 31;
}

function set_ampm(val) {
	ampm = val;
	doit("");
}


function change_year(num) {
	var y = parseInt(document.data.year);
	y += num;
	document.data.year = y;
	year = y;
	date_vars_doit();
}*/

function set_dst(bValue) {
    dst = bValue; //document.data.dst.checked;
    doit("");
}

function set_dst_clean(bValue) {
    dst = bValue; //document.data.dst.checked;
    doit_clean("");
}

function set_dst1(bValue) {
    dst = bValue;
}


function list_pos(w) {
    debugger;
    var str, place, desc
    str = w;
    var i;

   
    i = 2;
   
    //w.options[i].selected = 1; // restore current selection
    with (w) {
        desc = "";
        //str = "";
        place = "";
        //if(i == 0)
        //	document.data.placename = '';
    }

    if (i != 0) {
        i = str.indexOf(",");
        ns = str.substring(0, i);
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        latd = eval(str.substring(0, i));
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        latm = eval(str.substring(0, i));
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        ew = str.substring(0, i);
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        lngd = eval(str.substring(0, i));
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        lngm = eval(str.substring(0, i));

        tz = eval(str.substring(i + 1, str.length));

        if ((latd != -1) && (lngd != -1)) {
            //document.data.tz.options[12+tz].selected = 1;
            doit("(" + desc + ") " + place);
        }
    }
}

function doit(title) {
    var d, m, y;
    var nsi, ewi;
    var i;

    if (title != "")
        document.data.placename = title;

    //document.data.latd = latd;
    //document.data.latm = latm;
    i = ns.indexOf("N");
    nsi = (i != -1) ? 0 : 1;
    //document.data.lats[nsi].checked = 1;

    //document.data.lngd = lngd;
    //document.data.lngm = lngm;
    i = ew.indexOf("W");
    ewi = (i != -1) ? 0 : 1;
    //document.data.lngs[ewi].checked = 1;

    d = day + 1;
    m = month + 1;
    y = year;

    var adj = tz//2 //- (12 - document.data.tz.options.selectedIndex);
    adj += dst;

    var time;
    var sunrise, sunset;
    var shaa_zmanit;

    time = suntime(d, m, y, 90, 46.8, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0) {
        sunrise = time[2];
        sunset = time[3];
        document.data.hanetz = timeadj(sunrise, ampm);
        document.data.shkia = timeadj(sunset, ampm);
        shaa_zmanit = (sunset - sunrise) / 12;
    }
    else {
        document.data.hanetz = "";
        document.data.shkia = "";
    }

    time = suntime(d, m, y, 115, 54, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0)
        document.data.alotearly = timeadj(time[2], ampm);
    else
        document.data.alotearly = "";

    time = suntime(d, m, y, 105, 59.4, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0)
        document.data.alotlate = timeadj(time[2], ampm);
    else
        document.data.alotlate = "";

    time = suntime(d, m, y, 101, 30, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0)
        document.data.misheyakir = timeadj(time[2], ampm);
    else
        document.data.misheyakir = "";

    time = suntime(d, m, y, 95, 52.8, lngd, lngm, ewi, latd, latm, nsi, adj);
    if (time[1] == 0)
        document.data.tzeit = timeadj(time[3], ampm);
    else
        document.data.tzeit = "";

    document.data.shema = timeadj(sunrise + shaa_zmanit * 3 - 2 / 60, ampm);
    document.data.tefillah = timeadj(sunrise + shaa_zmanit * 4, ampm);
    document.data.chatzot = timeadj(sunrise + shaa_zmanit * 6, ampm);
    var minchag;
    if (shaa_zmanit >= 1)
        minchag = timeadj(sunrise + shaa_zmanit * 6.5, ampm);
    else
        minchag = timeadj(sunrise + shaa_zmanit * 6 + 30.0 / 60.0, ampm);
    document.data.minchag = minchag;
    document.data.minchak = timeadj(sunrise + shaa_zmanit * 9.5, ampm);
    document.data.plag = timeadj(sunrise + shaa_zmanit * 10.75, ampm);

    var yom = new Date(y, m - 1, d);
    while (yom.getDay() < 6) {
        yom = new Date(yom.valueOf() + (24 * 60 * 60 * 1000))
    }
    if (yom.getDay() == 6) {
        // motzei shabbat (3 small stars)
        time = suntime(yom.getDate(), yom.getMonth() + 1, yom.getYear(), 98, 30, lngd, lngm, ewi, latd, latm, nsi, adj);
        if (time[1] == 0)
            document.data.motzeiShabbat = timeadj(time[3], ampm);
        else
            document.data.motzeiShabbat = "";

        // knissat shabbat (sunset from day before)
        var day_before = new Date(yom.getTime() - 86400000);
        db = day_before.getDate();
        mb = day_before.getMonth() + 1;
        yb = day_before.getYear();
        if (yb < 1900)
            yb += 1900;
        time = suntime(db, mb, yb, 90, 50, lngd, lngm, ewi, latd, latm, nsi, adj);

        if (document.data.placename.indexOf("חוץ לארץ") != -1)
            document.data.knissatShabbat = timeadj(time[3] - 18.0 / 60.0, ampm);
        else if (document.data.placename.indexOf("ירושלים") != -1)
            document.data.knissatShabbat = timeadj(time[3] - 40.0 / 60.0, ampm);
        else if (document.data.placename.indexOf("פתח תקוה") != -1)
            document.data.knissatShabbat = timeadj(time[3] - 40.0 / 60.0, ampm);
        else if (document.data.placename.indexOf("חיפה") != -1)
            document.data.knissatShabbat = timeadj(time[3] - 30.0 / 60.0, ampm);
        else if (document.data.placename.indexOf("באר שבע") != -1)
            document.data.knissatShabbat = timeadj(time[3] - 30.0 / 60.0, ampm);
        else if (document.data.placename.indexOf("קרני שומרון") != -1)
            document.data.knissatShabbat = timeadj(time[3] - 22.0 / 60.0, ampm);
        else if (document.data.placename.indexOf("תל אביב") != -1)
            document.data.knissatShabbat = timeadj(time[3] - 22.0 / 60.0, ampm);
        else if (document.data.placename.indexOf("אילת") != -1)
            document.data.knissatShabbat = timeadj(time[3] - 22.0 / 60.0, ampm);
        else
            document.data.knissatShabbat = timeadj(time[3] - 22.0 / 60.0, ampm);
    }
	/*else if(yom.getDay() == 5) {
		// motzei shabbat (3 small stars)
		time = suntime(d+1, m, y, 98, 30, lngd, lngm, ewi, latd, latm, nsi, adj);
		if(time[1] == 0)
			document.data.motzeiShabbat = timeadj(time[3], ampm);
		else
			document.data.motzeiShabbat = "";

		// knissat shabbat (sunset from day before)
		var day_before = new Date(yom.getTime());
		db = day_before.getDate();
		mb = day_before.getMonth() + 1;
		yb = day_before.getYear();
		if(yb < 1900)
			yb += 1900;
		time = suntime(db, mb, yb, 90, 50, lngd, lngm, ewi, latd, latm, nsi, adj);

		if (document.data.placename.indexOf("חוץ לארץ") != -1)
			document.data.knissatShabbat = timeadj(time[3] - 18.0/60.0, ampm);
		else if(document.data.placename.indexOf("ירושלים") != -1)
			document.data.knissatShabbat = timeadj(time[3] - 40.0/60.0, ampm);
		else if(document.data.placename.indexOf("חיפה") != -1)
			document.data.knissatShabbat = timeadj(time[3] - 30.0/60.0, ampm);
		else if(document.data.placename.indexOf("באר שבע") != -1)
			document.data.knissatShabbat = timeadj(time[3] - 30.0/60.0, ampm);
		else if(document.data.placename.indexOf("קרני שומרון") != -1)
			document.data.knissatShabbat = timeadj(time[3] - 22.0/60.0, ampm);
		else if(document.data.placename.indexOf("תל אביב") != -1)
			document.data.knissatShabbat = timeadj(time[3] - 22.0/60.0, ampm);
		else if(document.data.placename.indexOf("אילת") != -1)
			document.data.knissatShabbat = timeadj(time[3] - 22.0/60.0, ampm);
		else
			document.data.knissatShabbat = timeadj(time[3] - 22.0/60.0, ampm);
	}
	else {
		document.data.motzeiShabbat = '';
		document.data.knissatShabbat = '';
	}*/


}

function set_date(sDay, sMonth, sYear) {
    month = sMonth;
    day = sDay;
    year = sYear;
}

function fnPrintTimes(w, nWeeks) {
    var str, place, desc;
    with (w) {
        desc = options[0].text;
        str = options[options.selectedIndex];
        place = options[options.selectedIndex].text;
        //if(i == 0)
        //	document.data.placename = '';
    }
    var i = w.options.selectedIndex;
    if (i != 0) {
        i = str.indexOf(",");
        ns = str.substring(0, i);
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        latd = eval(str.substring(0, i));
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        latm = eval(str.substring(0, i));
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        ew = str.substring(0, i);
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        lngd = eval(str.substring(0, i));
        str = str.substring(i + 1, str.length);

        i = str.indexOf(",");
        lngm = eval(str.substring(0, i));

        tz = eval(str.substring(i + 1, str.length));
    }

    var d, m, y;
    var nsi, ewi;
    var n;

    n = ns.indexOf("N");
    nsi = (n != -1) ? 0 : 1;

    n = ew.indexOf("W");
    ewi = (n != -1) ? 0 : 1;

    d = day + 1;
    m = month + 1;
    y = year;

    var adj = tz
    adj += dst;

    var yom = new Date(y, m - 1, d);
    var tbl = document.getElementById("tblScedules");
    for (var nWeekCount = 1; nWeekCount <= nWeeks; nWeekCount++) {
        while (yom.getDay() < 6) {
            yom = new Date(yom.valueOf() + (24 * 60 * 60 * 1000))
        }

        if (yom.getDay() == 6) {
            var tblRow = tbl.insertRow(tbl.rows.length);
            var tblCell = tbl.rows[tbl.rows.length - 1].insertCell();
            tblCell.innerHTML = nWeekCount;

            // motzei shabbat (3 small stars)
            var sMotzeiShabbat, sMotzeiShabbatDate;
            time = suntime(yom.getDate(), yom.getMonth() + 1, yom.getYear(), 98, 30, lngd, lngm, ewi, latd, latm, nsi, adj);

            if (time[1] == 0) {
                sMotzeiShabbat = timeadj(time[3], ampm);
                sMotzeiShabbatDate = yom.getDate() + "/" + (yom.getMonth() + 1) + "/" + yom.getYear();
            }
            else {
                sMotzeiShabbat = "";
                sMotzeiShabbatDate = "";
            }

            tblCell = tbl.rows[tbl.rows.length - 1].insertCell();
            // knissat shabbat (sunset from day before)
            var day_before = new Date(yom.getTime() - 86400000);
            db = day_before.getDate();
            mb = day_before.getMonth() + 1;
            yb = day_before.getYear();
            if (yb < 1900)
                yb += 1900;
            time = suntime(db, mb, yb, 90, 50, lngd, lngm, ewi, latd, latm, nsi, adj);

            if (document.data.placename.indexOf("בחר עיר בחוץ לארץ") != -1)
                tblCell.innerHTML = day_before.getDate() + "/" + (day_before.getMonth() + 1) + "/" + day_before.getYear() + " - " + timeadj(time[3] - 18.0 / 60.0, ampm);
            else if (document.data.placename.indexOf("ירושלים") != -1)
                tblCell.innerHTML = day_before.getDate() + "/" + (day_before.getMonth() + 1) + "/" + day_before.getYear() + " - " + timeadj(time[3] - 40.0 / 60.0, ampm);
            else if (document.data.placename.indexOf("חיפה") != -1)
                tblCell.innerHTML = day_before.getDate() + "/" + (day_before.getMonth() + 1) + "/" + day_before.getYear() + " - " + timeadj(time[3] - 30.0 / 60.0, ampm);
            else if (document.data.placename.indexOf("באר שבע") != -1)
                tblCell.innerHTML = day_before.getDate() + "/" + (day_before.getMonth() + 1) + "/" + day_before.getYear() + " - " + timeadj(time[3] - 30.0 / 60.0, ampm);
            else if (document.data.placename.indexOf("קרני שומרון") != -1)
                tblCell.innerHTML = day_before.getDate() + "/" + (day_before.getMonth() + 1) + "/" + day_before.getYear() + " - " + timeadj(time[3] - 22.0 / 60.0, ampm);
            else if (document.data.placename.indexOf("תל אביב") != -1)
                tblCell.innerHTML = day_before.getDate() + "/" + (day_before.getMonth() + 1) + "/" + day_before.getYear() + " - " + timeadj(time[3] - 22.0 / 60.0, ampm);
            else if (document.data.placename.indexOf("אילת") != -1)
                tblCell.innerHTML = day_before.getDate() + "/" + (day_before.getMonth() + 1) + "/" + day_before.getYear() + " - " + timeadj(time[3] - 22.0 / 60.0, ampm);
            else
                tblCell.innerHTML = day_before.getDate() + "/" + (day_before.getMonth() + 1) + "/" + day_before.getYear() + " - " + timeadj(time[3] - 22.0 / 60.0, ampm);

            tblCell = tbl.rows[tbl.rows.length - 1].insertCell();
            tblCell.innerHTML = sMotzeiShabbatDate + " - " + sMotzeiShabbat;
        }
        yom = new Date(yom.valueOf() + (7 * 24 * 60 * 60 * 1000))
    }
}

/*function set_date_vars() {
	month = document.data.month.selectedIndex;
	day   = document.data.day.selectedIndex;
	year  = document.data.year;

	var len = civMonthLength(month+1, year);
	if(day >= len) {
		day = len - 1;
		document.data.day.selectedIndex = day;
	}
}

function date_vars_doit() {
	set_date_vars();
	doit("");
}

function set_default_date() {
	var now = new Date();
	var d = now.getDate();
	var m = now.getMonth();
	year = now.getYear();
	if(year < 1900)
		year += 1900;
	document.data.month.selectedIndex = m;
	document.data.day.selectedIndex = d - 1;
	document.data.year = year;
	set_date_vars("");
}*/

