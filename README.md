datepicker
==========

日历小控件
==========
  
  特点：  
    体积小，压缩后只有9kb。  
    界面高可定制性，ui颜色全部在代码中定制，不需要额外的css文件。  
    兼容性强，兼容IE 6-10，firefox，chrome，opera等主流浏览器的主流版本。有不兼容的浏览器请及时留言告诉我。  
    支持日期范围限制。  
    支持每周第一天是周几定制。  
    默认界面仿chorme下的input[type=date]。  
    多语言多日期格式支持。  
  
  截图：  
  ![snapshot](http://banqiaoju.com/wp-content/uploads/2013/01/307496A8-1A4C-4258-A4FD-1E652B22836A.jpg)

使用说明：
==========
全部可用选项默认值如下：  

```Javascript
{
    container:document.body,//默认父节点为body
    min : null,//最小日期，可以解析为日期的字符串，或日期对象等 
    max : null, //最大日期
    weekStart:0, // 第一天是周几 0 周日
    dateFormat:'Y-M-D', // Y 4位年份 y 2位年份 m 没有前导0的月份 M 有前导0月份 d 没有前导0的天数 D有前导0的天数 
    weekLabel : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    monthLabel : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    yearMonthTpl : '%Y年%M',//年份选择的模板，zh_CN 2002年一月; en_US Jan 2012
    nextMonthLabel: '>',//下月按钮文本
    prevMonthLabel : '<',//上月按钮文本
    nextYearLabel : '>>',//下年按钮文本
    prevYearLabel : '<<',//上年按钮文本
    todayFontColor : '#666',//今日的前景色
    todayBgColor : '#F1CA7E',//今日的背景色
    selectedFontColor : '#fff',//选中日的前景色
    selectedBgColor : '#3399FF',//选中日的背景色
    weeksFontColor:'#2200CC',//周标题前景色
    weeksBgColor:'#E3E9FF',//周标题背景色
    weeksBorderColor:'#D0D4F0',//周标题边框颜色
    currentMonthDayFontColor : '#333', //当前月日期默认颜色
    otherMonthDayFontColor : '#666', //非当前月日期默认颜色
    linkTo:null, //帮定到input节点，onClick触发日期show事件
    onSelect:null,//当选择日期后触发的回调函数
    onShow:null,//当显示日期选择控件的时候的回调函数
    onHide:null,//当日期选择控件隐藏的时候的回调函数
    beforeShow:null //日期选择控件显示之前的回调函数
}
```
