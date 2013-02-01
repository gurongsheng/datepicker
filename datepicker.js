// {{{ class EmDatepicker()

/**
 * 日期选择器
 * @function 
 *
 * @param {object} options 选项
 */
var Datepicker = function(options) 
{
    var settings = {
        container:document.body,
        min : null,//可以解析为日期的字符串，或日期对象等 
        max : null, 
        weekStart:0, // 第一天是周几 0 周日
        dateFormat:'Y-M-D', // Y 4位年份 y 2位年份 m 没有前导0的月份 M 有前导0月份 d 没有前导0的天数 D有前导0的天数 
        weekLabel : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        monthLabel : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        yearMonthTpl : '%Y年%M',//zh_CN 2002年一月; en_US Jan 2012
        nextMonthLabel: '>',
        prevMonthLabel : '<',
        nextYearLabel : '>>',
        prevYearLabel : '<<',
        todayFontColor : '#666',
        todayBgColor : '#F1CA7E',
        selectedFontColor : '#fff',
        selectedBgColor : '#3399FF',
        weeksFontColor:'#2200CC',
        weeksBgColor:'#E3E9FF',
        weeksBorderColor:'#D0D4F0',
        currentMonthDayFontColor : '#333', //当前月
        otherMonthDayFontColor : '#666', //非当前月
        linkTo:null, //帮定到input节点，onFoucs触发show事件
        onSelect:null,
        onShow:null,
        onHide:null,
        beforeShow:null
    }, that=this, timer = 0;

    var days = [];

    var now = new Date(), nowYear=now.getFullYear(), nowMonth = now.getMonth(), nowDate = now.getDate();
    
    var currentYear = nowYear; 
    var currentMonth = nowMonth;
    //var currentDay = nowDate; 
    var selectDate = null;

    var panel;

    // {{{ function fCall()

    /**
     * 调用回调函数
     *
     * @param {string} fun 函数名
     * @param {array} params 参数
     * @params {object} obj 替换回调函数中this的对象
     * 
     * @return {mixed}
     */
    var fCall = function(fun, params, obj)
    {
        if (typeof(settings[fun]) === 'function') {
            obj = obj || that;
            return settings[fun].apply(obj, params);
        }
    }

    // }}}
    // {{{ function getPosition()

    /**
     * 获取元素的位置
     *
     * @param object e
     *
     * @return array [x.y]
     */
    function getPosition (e) {
        if (e.getBoundingClientRect()) {
            if (e.tagName === 'BODY') {
                return [0, 0];
            }

            var pos = e.getBoundingClientRect();
            return [pos.left + (document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft :
                    document.body.scrollLeft), pos.top + (document.documentElement.scrollTop ?
                        document.documentElement.scrollTop :
                        document.body.scrollTop)];
        }

        var left = 0;
        var _top  = 0;
        while (e.offsetParent) {
            left += e.offsetLeft;
            _top  += e.offsetTop;
            e     = e.offsetParent;
        }

        left += e.offsetLeft;
        _top  += e.offsetTop;
        return [left, _top];
    }

    // }}}
    // {{{ function htmlEncode()

    /**
     * html转义
     *
     * @param {string} str 字符串
     *
     * @return {string}
     */
    var htmlEncode = function(str) 
    {
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    // }}}
    // {{{ function setSelectedDate()

    /**
     * 设置选中日期
     *
     * @param {Date} d 选中日期
     *
     * @return {void}
     */
    this.setSelectedDate = function(d)
    {
        selectDate = d;
    }

    // }}}
    // {{{ function create()

    /**
     * 初始化创建
     *
     * @param {void}
     *
     * @return {void}
     */
    var create = function()
    {
        panel = document.createElement('IFRAME');
        panel.src                 = 'javascript:void(0);' ;
        panel.frameBorder         = '0' ;
        panel.scrolling           = 'no' ;
        panel.width = panel.height = 0 ;
        panel.style.zIndex = 999999999;
        panel.style.left = '-1px';
        panel.style.top = '-1px';
        panel.style.boxShadow = '0 1px 3px rgba(0,0,0,.3)'; // box-shadow:0 1px 3px rgba(0,0,0,.3);

        panel.style.border = 'solid 1px #ccc';
        

        var sBase = '' ;
        if (navigator.userAgent.toLowerCase().indexOf(' applewebkit/') > -1) {
            sBase = '<base href="' + window.document.location + '">' ;
        }
        
        settings.container.appendChild(panel);

        that.window = panel.contentWindow;
        that.document = that.window.document;
        var oDocument =  that.document;

        oDocument.open() ;
        oDocument.write( '<html><head>' + sBase + '<\/head><body style="margin:0px;padding:0px;background-color:#fff">' +
                '<table><tbody><tr><td align=left><a href="javascript:void(0);" hidefocus=true style="margin:3px;padding:0 4px;font-family:Arial;text-decoration:none;color:#000;background:#E7E7E7;border:solid 1px #ACACAC">' + htmlEncode(settings.prevYearLabel) + '</a><a href="javascript:void(0);" hidefocus=true style="margin:3px;padding:0 4px;font-family:Arial;text-decoration:none;color:#000;background:#E7E7E7;border:solid 1px #ACACAC">' + htmlEncode(settings.prevMonthLabel) + '</a></td><td align=center></td><td align="right"><a href="javascript:void(0);" hidefocus=true style="margin:3px;padding:0 4px;font-family:Arial;text-decoration:none;color:#000;background:#E7E7E7;border:solid 1px #ACACAC">' + htmlEncode(settings.nextMonthLabel) + '</a><a href="javascript:void(0);" hidefocus=true style="margin:3px;padding:0 4px;font-family:Arial;text-decoration:none;color:#000;background:#E7E7E7;border:solid 1px #ACACAC">' + htmlEncode(settings.nextYearLabel) + '</a></td></tr><tr><td colspan=3></td></tr></tbody></table>' +
                '<\/body><\/html>' ) ;
        oDocument.close() ;

        if (document.all) {
            panel.attachEvent('onblur', function(){that.hide();});
            that.document.attachEvent('oncontextmenu', function(e){return false});
        } else {
            oDocument.addEventListener('contextmenu', function(e){if (e) {e.preventDefault();}}, false);
            that.window.addEventListener('blur', function(){that.hide();}, false);
        }

        if (settings.linkTo) {
            panel.style.position = 'absolute';

            settings.linkTo.onclick = function() {
                var v = settings.linkTo.value || ''; 
                if (v) {
                    v = parseDate(v);
                    if (!v || !isNaN(v.getFullYear())) {
                        that.setSelectedDate(v);
                        that.showDate(v.getFullYear(), v.getMonth());
                        return;
                    }
                } 
                
                v = new Date();
                that.showDate(v.getFullYear(), v.getMonth());
            }
        }
    }

    // }}}
    // {{{ function setOptions()

    /**
     * 设置选项
     *
     * @param {object} options 选项 
     *
     * @return {object} 返回EmResumeUpload对象实例 
     */
    this.setOptions = function(options) 
    {
        for (var p in options) {
            if (p in settings) {
                settings[p] = options[p];
            }
        }
    }

    // }}}
    // {{{ function buildByDate()

    /**
     * 根据年，月建立日历
     *
     * @param {number} year 年份
     * @param {number} month 月份 0-11 表示 1-12月
     *
     * @return {void}
     */
    this.buildByDate = function(year, month)
    {
        year = year - 0;
        month = month - 0;
        var testDate = new Date(year, month, 1);
        currentYear = testDate.getFullYear();
        currentMonth = testDate.getMonth();

        if (settings.min !== null) {
            var min = settings.min instanceof Date ? settings.min : parseDate(settings.min);//new Date(settings.min);
            var minYear = min.getFullYear();
            var minMonth = min.getMonth();
            var minDate = min.getDate();
            if (currentYear < minYear) {
                currentYear = minYear;
                currentMonth = minMonth;
            } 
            
            if (currentYear === minYear && currentMonth < minMonth) {
                currentMonth = minMonth;
            }
        } else {
            var min = null;
            var minYear = null; 
            var minMonth = null; 
            var minDate = null;
        }
        
        if (settings.max !== null) {
            var max = settings.max instanceof Date ? settings.max : parseDate(settings.max);//new Date(settings.max);
            var maxYear = max.getFullYear();
            var maxMonth = max.getMonth();
            var maxDate = max.getDate();
            if (currentYear > maxYear) {
                currentYear = maxYear;
                currentMonth = maxMonth;
            }

            if (currentYear=== maxYear && currentMonth > maxMonth) {
                currentMonth = maxMonth;
            }
        } else {
            var max = null;
            var maxYear = null
            var maxMonth = null
            var maxDate = null;
        }

        if (selectDate) {
            var selectYear = selectDate.getFullYear();
            var selectMonth = selectDate.getMonth();
            var selectDay = selectDate.getDate();
        } else {
            var selectYear = null; 
            var selectMonth = null; 
            var selectDay = null; 
        }

        days = [];

        var before = new Date(currentYear, currentMonth, 0);//上一个月最后一天
        var first = new Date(currentYear, currentMonth, 1);//本月第一天
        var last = new Date(currentYear, currentMonth+1, 0);//本月最后一天

        //weekDay = 4 周四  第一天是1
        var weekDay = first.getDay(); // 
        var weekDay2 = last.getDay(); // 

        var left;
        if (weekDay < settings.weekStart) {
            left = weekDay + 7 - settings.weekStart;
        } else {
            left = weekDay - settings.weekStart;
        }

        var right;
        if (weekDay2 < settings.weekStart) {
            right = 7 - (weekDay2 + 7 - settings.weekStart + 1);
        } else {
            right = 7  - (weekDay2 - settings.weekStart + 1); 
        }

        var curWeek = [],beforeDate = before.getDate(), lastDate = last.getDate();
        for (var i=1; i <= lastDate; i++) {
            if (i == 1) {
                //补全旧上月的
                if (left > 0) {
                    for (var j=beforeDate-left+1; j <= beforeDate; j++) {
                        curWeek.push(j);
                    }
                }
            }

            curWeek.push(i);
            
            if (i == lastDate) {
                //补充不够的 
                if (right > 0) {
                    for (var j=1; j<=right; j++) {
                        curWeek.push(j);
                    }
                }
            }

            if (curWeek.length === 7) {
                days.push(curWeek);
                curWeek = [];
            }
        }

        //输出周表格
        var weekTitle = [], index, i=0;
        while (true) {
            index = settings.weekStart + i;
            if (index > 6) index = index-7;
            weekTitle.push(settings.weekLabel[index]);

            i++;
            if (i >= 7) break;
        }
        
        var tb = that.document.getElementsByTagName('table')[0];

        var monthTd = tb.rows[0].cells[1];
        
        var monthList = [], tmpDate, tmpStyle, disabled, tmpYear, tmpMonth;
        for (var i=-6; i<=6; i++) {
            tmpDate = new Date(currentYear, currentMonth + i, 1);
            if (i == 0) 
                tmpStyle = ' selected';
            else 
                tmpStyle = '';
            tmpYear = tmpDate.getFullYear();
            tmpMonth = tmpDate.getMonth();
            if ((min && (minYear > tmpYear || (minYear === tmpYear && minMonth > tmpMonth))) || 
                    (max && (maxYear < tmpYear ||  (maxYear === tmpYear && maxMonth < tmpMonth)))) {
                disabled = ' disabled';
            
            } else {
                disabled = '';
            }

            monthList.push('<option value="' + tmpDate.getFullYear() + '-' + tmpDate.getMonth() + '"'  + tmpStyle + disabled + '>' + htmlEncode(settings.yearMonthTpl.replace(/%Y/g, tmpDate.getFullYear()).replace(/%M/g, settings.monthLabel[tmpDate.getMonth()])) + '</option>');
        }

        monthTd.innerHTML = '<select style="font-size:12px;">' + monthList.join('') + '</select>';

        var dateTd = tb.rows[1].cells[0];
        var table = ['<table style="border-collapse:collapse;border:solid 1px #000" width=100%>'];

        table.push('<tr>');
        var borderLeft = '';
        for (var i=0; i<weekTitle.length; i++) {
            if (i>0) {
                borderLeft = ';border-left:solid 1px ' + settings.weeksBorderColor; 
            }
            table.push('<td style="white-space:nowrap;padding:3px 4px;font-size:12px;border-bottom:solid 1px ' + settings.weeksBorderColor + ';background:' + settings.weeksBgColor + ';color:' + settings.weeksFontColor + borderLeft + '" align=center>' + htmlEncode(weekTitle[i]) + '</td>');
        }
        table.push('</tr>');
        
        var alpha, fontColor, bgColor, data, mouseEvent,tmpDate, tmpYear,tmpMonth, tmpDay, isToday, isSelect;
        for (var i=0; i<days.length; i++) {
            table.push('<tr>');

            for (var j=0; j<days[i].length; j++) {
                if (i == 0 && days[i][j] > 7) {
                    tmpDate = new Date(currentYear, currentMonth-1, days[i][j]);
                } else if (i == days.length -1 && days[i][j] < 7) {
                    tmpDate = new Date(currentYear, currentMonth+1, days[i][j]);
                } else {
                    tmpDate = new Date(currentYear, currentMonth, days[i][j]);
                }

                tmpYear = tmpDate.getFullYear();
                tmpMonth = tmpDate.getMonth();
                tmpDay = tmpDate.getDate();
                if (tmpYear === nowYear && tmpMonth === nowMonth && tmpDay === nowDate) isToday = true; else isToday = false;
                if (tmpYear === selectYear && tmpMonth === selectMonth && tmpDay === selectDay) isSelect = true; else isSelect = false;

                if ((i == 0 && days[i][j] > 7) || (i == days.length -1 && days[i][j] < 7)) {
                    if (isSelect) {
                        fontColor = ';color:' + settings.selectedFontColor + ';background-color:' + settings.selectedBgColor;
                    } else if (isToday) {
                        fontColor = ';color:' + settings.todayFontColor + ';background-color:' + settings.todayBgColor;
                    } else {
                        fontColor = ';color:' + settings.otherMonthDayFontColor;
                    }
                } else {
                    if (isSelect) {
                        fontColor = ';font-weight:bold;color:' + settings.selectedFontColor + ';background-color:' + settings.selectedBgColor;
                    } else if (isToday) {
                        fontColor = ';font-weight:bold;color:' + settings.todayFontColor + ';background-color:' + settings.todayBgColor;
                    } else {
                        fontColor = ';font-weight:bold;color:' + settings.currentMonthDayFontColor;
                    }
                }

                if ((min && tmpYear < minYear || (tmpYear === minYear && tmpMonth < minMonth) || (tmpYear === minYear && tmpMonth === minMonth && tmpDay < minDate)) || (max && (tmpYear > maxYear || (tmpYear === maxYear && tmpMonth > maxMonth) || (tmpYear === maxYear && tmpMonth === maxMonth && tmpDay > maxDate)))) {
                    //disabled
                    data = '' 
                    mouseEvent = '';
                    alpha = ';opacity:0.3;filter:alpha(opacity=30)';
                } else {
                    data = ' data="' + [tmpYear,tmpMonth, tmpDay].join('-') + '"';
                    if (isSelect) {
                        mouseEvent = '';
                    } else if (isToday) {
                        mouseEvent = ' onmouseover="this.style.color=\'' + settings.selectedFontColor + '\';this.style.backgroundColor=\'' + settings.selectedBgColor + '\'" onmouseout="this.style.color=\'' + settings.todayFontColor + '\';this.style.backgroundColor=\'' + settings.todayBgColor + '\'"'; 
                    } else {
                        mouseEvent = ' onmouseover="this.style.color=\'' + settings.selectedFontColor + '\';this.style.backgroundColor=\'' + settings.selectedBgColor + '\'"';
                        if ((i == 0 && days[i][j] > 7) || (i == days.length -1 && days[i][j] < 7)) {
                            mouseEvent += ' onmouseout="this.style.color=\'' + settings.otherMonthDayFontColor + '\';this.style.backgroundColor=\'\'"'; 
                        } else {
                            mouseEvent += ' onmouseout="this.style.color=\'' + settings.currentMonthDayFontColor + '\';this.style.backgroundColor=\'\'"'; 
                        }
                    }
                    alpha = '';
                }

                //当前选中的，今日的，不能被选中的j
                table.push('<td ' + data + mouseEvent + ' align="center" style="cursor:default;padding:3px 4px;font-size:14px;' + fontColor + alpha + '">' + days[i][j] + '</td>');
            }

            table.push('</tr>');
        }
        
        dateTd.innerHTML = table.join('');

        //绑定事件
        var select = monthTd.getElementsByTagName('select')[0];
        select.onchange = function() {
            var data = select.options[select.selectedIndex].value.split('-');
            that.showDate(data[0], data[1]);
        }
        
        select.onclick = function(ev) {
            clearTimeout(timer);
        }

        var as = tb.rows[0].getElementsByTagName('a'); 
        as[0].onclick = that.prevYear;
        as[1].onclick = that.prevMonth;
        as[2].onclick = that.nextMonth;
        as[3].onclick = that.nextYear;

        var t = dateTd.childNodes[0];

        t.onclick = function(e) {
            e = e || that.window.event;
            var tn = e.target || e.srcElement;
            if (tn && tn.tagName === 'TD') {
                var data = tn.getAttribute('data');
                if (data) {
                    data = data.split('-'); 
                    var ret = formatDate(data[0]-0, data[1]-0+1, data[2]-0);
                    if (settings.linkTo)  {
                        settings.linkTo.value = ret;
                    }
                    var d = fCall('onSelect', [ret, data[0]-0, data[1]-0+1, data[2]-0]);
                    d = d || ret;
                    if (d !== ret) {
                        if (settings.linkTo)  {
                            settings.linkTo.value = ret;
                        }
                    }

                    that.hide();
                }
            }
        }

    }

    // }}}
    // {{{ function prevYear()

    /**
     * 切换上一年
     *
     * @param {void}
     *
     * @return {void}
     */
    this.prevYear = function()
    {
        that.showDate(currentYear-1, currentMonth);
    }

    // }}}
    // {{{ function nextYear()

    /**
     * 切换下一年
     *
     * @param {void}
     *
     * @return {void}
     */
    this.nextYear = function()
    {
        that.showDate(currentYear+1, currentMonth);
    }

    // }}}
    // {{{ function prevMonth()

    /**
     * 切换上一月
     *
     * @param {void}
     *
     * @return {void}
     */
    this.prevMonth = function()
    {
        that.showDate(currentYear, currentMonth-1);
    }

    // }}}
    // {{{ function nextMonth()

    /**
     * 切换下一月
     *
     * @param {void}
     *
     * @return {void}
     */
    this.nextMonth = function()
    {
        that.showDate(currentYear, currentMonth+1);
    }

    // }}}
    // {{{ function show()

    /**
     * 显示日期
     *
     * @param {void}
     *
     * @return {void}
     */
    var show = function()
    {
        if (settings.linkTo && panel) {
            fCall('onShow', [settings.linkTo.value || '']);
            panel.style.width = '1px';
            panel.style.height = '1px';
            var w = that.document.body.scrollWidth;
            var h = that.document.body.scrollHeight;
            panel.style.width = w + 'px';
            panel.style.height = h + 'px';

            var pos = getPosition(settings.linkTo);
            var l = pos[0], t = pos[1] + settings.linkTo.offsetHeight;
            var sL = (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft);
            var sT = (document.documentElement.scrollTop ?  document.documentElement.scrollTop : document.body.scrollTop);
            
            var sh = sT;   
            var eh = document.body.clientHeight + sT;
            var sw = sL;
            var ew = sL + document.body.clientWidth;
            if (l < sw) {
                l = sw;
            } else if (l + panel.offsetWidth > ew) {
                //l = ew - panel.offsetWidth;
                l = ew - w; 
            }
            
            if (t < sh) {
                t = sh;
            } else if (t + panel.offsetHeight > eh) {
                //t = eh - panel.offsetHeight;
                t = eh - h; 
            }

            panel.style.left = l + 'px';
            panel.style.top = t + 'px';
            that.window.focus();
        }
    }

    // }}}
    // {{{ function hide()

    /**
     * 隐藏日期
     *
     * @param {void}
     *
     * @return {void}
     */
    this.hide = function()
    {
        if (panel) {
            fCall('onHide', []);            
            panel.style.width = 0;
            panel.style.height = 0;
            panel.style.left = -10 + "px";
            panel.style.top = -10 + "px";
        }
    }

    // }}}
    // {{{ function showDate()

    /**
     * 显示具体日期
     *
     * @param {number} year
     * @param {number} month
     *
     * @return {void}
     */
    this.showDate = function(year, month)
    {
        year = isNaN(year) ? currentYear : year;
        month = isNaN(month) ? currentMonth : month;
        var opt = fCall('beforeShow');
        if (opt) {
            that.setOptions(opt);
        }
        that.buildByDate(year, month);
        show();
    }

    // }}}
    // {{{ function parseDate()

    /**
     * 解析字符串日期，返回日期对象
     *
     * @param {string} str 日期格式 
     *
     * @return {date}
     * @example parseDate('2012/12/19');
     */
    var parseDate = function(str)
    {
        var f = settings.dateFormat + '';
        var year, month, day, l=0,c;
        for (var i=0; i<f.length; i++) {
            //c = f[i];
            c = f.substr(i, 1);
            switch (c) {
                case 'Y':
                    year = str.substr(l, 4);
                    l += 4;
                    break;
                case 'y':
                    l += 2;
                    break;
                case 'M':
                    month = str.substr(l, 2);
                    l += 2;
                    break;
                case 'm':
                    month = str.substr(l, 1);
                    l++;
                    if (month-0 < 2 && str.substr(l, 1) !== undefined && str.substr(l,1).match(/\d/)) {
                        month += str.substr(l, 1);
                        l++;
                    }
                    break;
                case 'D':
                    day = str.substr(l, 2);
                    l += 2;
                    break;
                case 'd':
                    day = str.substr(l,1);
                    l++;
                    if (day-0 < 4 && str.substr(l, 1) !== undefined && str.substr(l, 1).match(/\d/)) {
                        day += str.substr(l, 1);
                        l++;
                    }
                    break;
                default:
                    l++;

            }
        }

        return new Date(year, month-1, day);
    }

    // }}}
    // {{{ function formatDate()

    /**
     * 格式化日期对象
     *
     * @param {number} year
     * @param {number} month
     * @param {number} day
     *
     * @return {string}
     * @example formatDate(year, month, day);
     */
    var formatDate = function(year, month, day)
    {
        var f = settings.dateFormat + '';
        var str = '', c;
        for (var i=0; i<f.length; i++) {
            c = f.substr(i,1);
            switch (c) {
                case 'Y':
                    str += '' + year;
                    break;
                case 'y':
                    str += '' + (year - 1900);
                    break;
                case 'M':
                    str += month < 10 ? ('0' + '' + month) : ('' + month); 
                    break;
                case 'm':
                    str += '' + month;
                    break;
                case 'D':
                    str += day < 10 ? ('0' + '' + day) : ('' + day); 
                    break;
                case 'd':
                    str += '' + day;
                    break;
                default:
                    str += c;

            }
        }

        return str;
    }

    // }}}

    this.setOptions(options);
    create();
    //this.buildByDate(currentYear, currentMonth);

}

// }}}
