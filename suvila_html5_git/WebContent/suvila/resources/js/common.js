

var exLocale={
    custName:'CustName'
};
exCommon={};

// 조작자정보
exCommon.user = {
    userId      :'',
    userName    :'',
    addr        :'',
    tel         :'',
    brcd        :'',
    brcdName    :'',
    templeCd    : '',
    templeNm    : '',
    searchGbn   : '',
    mobiletelno : '',
    sin_sms_yn  : '',
    sect_nm     : '',
    imgIP       :  'http://www.suvila1.org',
    printFormYn : '',
    death_type  : ''
};

// 메뉴정보
exCommon.menu = {
    topMenu1:{},
    topMenu2:{},
    topMenu3:{},
    topMenu4:{},
    topMenu5:{},
    topMenu6:{},
    topMenu7:{}
};

// 화면에서 가지고 다닐 변수
exCommon.cust = {
     budNo     : ''
    ,cardNo    : ''
    ,bunGa     : 0
}

// 신도카드

exCommon.khm ={
	 IN  : '9311'
	,OUT : '9511' 
}


exCommon.setCustBunGa=function(bunGa){
    exCommon.cust.bunGa = bunGa;    
}

exCommon.getCustBunGa=function(){
    //return exCommon.cust.bunGa;
	return exCommon.cust.budNo;
}


exCommon.setCustBudNo=function(budNo){
    exCommon.cust.budNo = budNo;    
}

exCommon.getCustBudNo=function(){
    return exCommon.cust.budNo;
}


exCommon.setCustCardNo=function(cardNo){
    exCommon.cust.cardNo = cardNo;    
}

exCommon.getCustCardNo=function(){
    return exCommon.cust.cardNo;
}




exCommon.setParam=function(params){
    if(params == null){
        alert('Not Define params!!');
        return;
    }
    if(params._csrf == null){
        params._csrf=exCommon._csrf;
    }
    return params;
}
exCommon.setLang=function(lng){
    localStorage.setItem("lang", lng);
    if(lng=='ko'){
        exLocale.custName = '고객명';
    }
    if(lng=='en'){
        exLocale.custName = 'Customer Name';
    }
    console.log('변경된이름:' + exLocale.custName);
    console.log('setLang', lng);
}
exCommon.getLang = function(){
    console.log(localStorage.getItem("lang"));
    if(localStorage.getItem("lang") == null || localStorage.getItem("lang") == 'undefined'){
        var userLang = navigator.language || navigator.userLanguage; 
         // alert ("The language is: " + userLang);
         if(userLang=='ko' || userLang == 'ko-KR'){
             exCommon.setLang('ko');
         }
         else{
             exCommon.setLang('en');
         }    
    
    }
    return localStorage.getItem("lang");
}

// 날짜관련연산
exCommon.getNowDateTime=function(seperate){
    
    if(seperate == null){
        seperate = '';
    }
    var nowDate = new Date();
    var nowHour = nowDate.getHours();
    if(nowHour < 10){
        nowHour = '0' + nowHour;
    }
    var nowMinutes = nowDate.getMinutes();
    if(nowMinutes < 10){
        nowMinutes = '0' + nowMinutes;
    }
    var nowSeconds = nowDate.getSeconds();
    if(nowSeconds < 10){
        nowSeconds = '0' + nowSeconds;
    }
    
    
    
    return exCommon.getNowDate(seperate) +  nowHour + seperate
        + nowMinutes + seperate + nowSeconds;
}

exCommon.getNowDate=function(seperate){        
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
    nowMonth++;
    var nowDay = nowDate.getDate();
    if(nowYear < 2000)
        nowYear += 1900;

    var tempDay = '';
    var tempMonth = '';
    if(nowDay < 10)
        tempDay = '0';
    if(nowMonth < 10)
        tempMonth = '0';
    if(seperate == null || seperate == undefined)
        seperate = '';
  // console.log('날짜',nowYear + seperate + tempMonth + nowMonth + seperate +
	// tempDay + nowDay);
    return nowYear + seperate + tempMonth + nowMonth + seperate + tempDay + nowDay;
}
exCommon.getNowMonth=function(seperate){        
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
    nowMonth++;
    var tempDay = '';
    var tempMonth = '';

    if(nowMonth < 10)
        tempMonth = '0';
    if(seperate == null || seperate == undefined)
        seperate = '';
    return nowYear + seperate + tempMonth + nowMonth;
}
exCommon.getNowYear=function(){        
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    return nowYear;
},        
exCommon.getNowJustMonth=function(seperate){        
    var nowDate = new Date();
    var nowMonth = nowDate.getMonth();
    nowMonth++;
    var tempMonth= '';
    
    if(nowMonth < 10)
        tempMonth = '0';
    return tempMonth + nowMonth;
},            
exCommon.getDateAddDate=function(val, seperate, baseDate){
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
    nowMonth++;
    var nowDay = nowDate.getDate();
    if(baseDate != null && baseDate != undefined){
        if(baseDate.length == 8){
            nowYear = baseDate.substring(0,4);    
            nowMonth = baseDate.substring(4,6);    
            nowDay = baseDate.substring(6,8);    
            if(nowMonth < 10){
                nowMonth = nowMonth.substring(1);
            }
            if(nowDay < 10){
                nowDay = nowDay.substring(1);
            }
        }
        else if(baseDate.length ==10){
            nowYear = baseDate.substring(0,4);    
            nowMonth = baseDate.substring(5,7);    
            nowDay = baseDate.substring(8,10);    
            if(nowMonth < 10){
                nowMonth = nowMonth.substring(1);
            }
            if(nowDay < 10){
                nowDay = nowDay.substring(1);
            }
        }
        else{
            Ext.Msg.alert('오류', '날짜 입력값(' + baseDate +')이 정확하지 않습니다.');
            return;
        }
    }
    
    var yunYearCls = false;

    nowDay = Number(nowDay) + Number(val);
    if(val > 0){
        var lastDay = 30;
        if(nowMonth ==1 || nowMonth ==3 || nowMonth ==5 ||nowMonth ==7 || nowMonth ==8 ||nowMonth ==10 || nowMonth ==12)
            lastDay =31;
        if(nowMonth ==2){
            if(nowYear%4== 0){
                yunYearCls = true;
                lastDay = 29;
                if(nowYear % 100 ==0){
                    yunYearCls = false;
                    lastDay = 28;
                    if(nowYear % 400 == 0){
                        ynYearCls = true;
                        lastDay = 29;                        
                    }
                }
            }            
        }            
        while(Number(nowDay)> Number(lastDay)){
            nowDay = Number(nowDay) - Number(lastDay);    
            nowMonth++;
            if(nowMonth >12){
                nowMonth = Number(nowMonth) - 12;
                nowYear = Number(nowYear) + 1;
            }  
            lastDay = 30;
            if(nowMonth ==1 || nowMonth ==3 || nowMonth ==5 ||nowMonth ==7 || nowMonth ==8 ||nowMonth ==10 || nowMonth ==12)
                lastDay =31;
            if(nowMonth ==2){
                if(nowYear%4== 0){
                    yunYearCls = true;
                    lastDay = 29;
                    if(nowYear % 100 ==0){
                        yunYearCls = false;
                        lastDay = 28;
                        if(nowYear % 400 == 0){
                            ynYearCls = true;
                            lastDay = 29;                        
                        }
                    }
                }            
            }                      
        }
    }
    else if (val <= 0){
    
        while(Number(nowDay) <= 0){
            nowMonth--;                
            var lastDay = 30;
            if(nowMonth ==1 || nowMonth ==3 || nowMonth ==5 ||nowMonth ==7 || nowMonth ==8 ||nowMonth ==10 || nowMonth ==12)
                lastDay =31;
            if(nowMonth ==2){
                if(nowYear%4== 0){
                    yunYearCls = true;
                    lastDay = 29;
                    if(nowYear % 100 ==0){
                        yunYearCls = false;
                        lastDay = 28;
                        if(nowYear % 400 == 0){
                            ynYearCls = true;
                            lastDay = 29;                        
                        }
                    }
                }            
            }    
            nowDay = Number(nowDay) + Number(lastDay);    
            if(nowMonth <1){
                nowMonth = 12;
                nowYear = Number(nowYear) - 1;
            }                      
        }
    }
    var tempDay = '';
    var tempMonth = '';
    if(nowDay < 10)
        tempDay = '0';
    if(nowMonth < 10)
        tempMonth = '0';
    if(seperate == null || seperate == undefined)
        seperate = '';
    // console.log(nowYear + seperate + tempMonth + nowMonth + seperate +
	// tempDay + nowDay);
    return nowYear + seperate + tempMonth + nowMonth + seperate + tempDay + nowDay;
}
exCommon.getDateAddMonth=function(val, seperate, baseDate){
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
    nowMonth++;
    var nowDay = nowDate.getDate();
    if(baseDate != null && baseDate != undefined){
        if(baseDate.length == 8){
            nowYear = baseDate.substring(0,4);    
            nowMonth = baseDate.substring(4,6);    
            nowDay = baseDate.substring(6,8);    
            if(nowMonth < 10){
                nowMonth = nowMonth.substring(1);
            }
            if(nowDay < 10){
                nowDay = nowDay.substring(1);
            }
        }
        else if(baseDate.length ==10){
            nowYear = baseDate.substring(0,4);    
            nowMonth = baseDate.substring(5,7);    
            nowDay = baseDate.substring(8,10);    
            if(nowMonth < 10){
                nowMonth = nowMonth.substring(1);
            }
            if(nowDay < 10){
                nowDay = nowDay.substring(1);
            }
        }
        else{
            Ext.Msg.alert('오류', '날짜 입력값(' + baseDate +')이 정확하지 않습니다.');
            return;
        }
    }        
    
    nowMonth = Number(nowMonth) + Number(val);
    
    if(val > 0){
        while(nowMonth > 12){
            nowMonth = Number(nowMonth) - 12;
            nowYear = Number(nowYear) + 1;
        }            
        var yunYearCls = false;
        var lastDay = 30;
        if(nowMonth ==1 || nowMonth ==3 || nowMonth ==5 ||nowMonth ==7 || nowMonth ==8 ||nowMonth ==10 || nowMonth ==12)
            lastDay =31;
        if(nowMonth ==2){
            if(nowYear%4== 0){
                yunYearCls = true;
                lastDay = 29;
                if(nowYear % 100 ==0){
                    yunYearCls = false;
                    lastDay = 28;
                    if(nowYear % 400 == 0){
                        ynYearCls = true;
                        lastDay = 29;                        
                    }
                }
            }            
        }
        if(nowDay> lastDay){
            nowDay = lastDay;
        }
        else{
        }        
    }
    else if(val <= 0){
        while(nowMonth < 1){
            nowMonth = Number(nowMonth) + 12;
            nowYear = Number(nowYear) - 1;
        }            
        var yunYearCls = false;
        var lastDay = 30;
        if(nowMonth ==1 || nowMonth ==3 || nowMonth ==5 ||nowMonth ==7 || nowMonth ==8 ||nowMonth ==10 || nowMonth ==12)
            lastDay =31;
        if(nowMonth ==2){
            if(nowYear%4== 0){
                yunYearCls = true;
                lastDay = 29;
                if(nowYear % 100 ==0){
                    yunYearCls = false;
                    lastDay = 28;
                    if(nowYear % 400 == 0){
                        ynYearCls = true;
                        lastDay = 29;                        
                    }
                }
            }            
        }
        if(nowDay> lastDay){
            nowDay = lastDay;
        }
        else{
        }                
    }
    var tempDay = '';
    var tempMonth = '';
    if(nowDay < 10)
        tempDay = '0';
    if(nowMonth < 10)
        tempMonth = '0';
    if(seperate == null || seperate == undefined)
        seperate = '';
    console.log(nowYear + seperate + tempMonth + nowMonth + seperate + tempDay + nowDay);                        
    return nowYear + seperate + tempMonth + nowMonth + seperate + tempDay + nowDay;
}, 
exCommon.getDateAddYear=function(val, seperate, baseDate){
     var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
    nowMonth++;
    var nowDay = nowDate.getDate();
    if(baseDate != null && baseDate != undefined){
        if(baseDate.length == 8){
            nowYear = baseDate.substring(0,4);    
            nowMonth = baseDate.substring(4,6);    
            nowDay = baseDate.substring(6,8);    
            if(nowMonth < 10){
                nowMonth = nowMonth.substring(1);
            }
            if(nowDay < 10){
                nowDay = nowDay.substring(1);
            }
        }
        else if(baseDate.length ==10){
            nowYear = baseDate.substring(0,4);    
            nowMonth = baseDate.substring(5,7);    
            nowDay = baseDate.substring(8,10);    
            if(nowMonth < 10){
                nowMonth = nowMonth.substring(1);
            }
            if(nowDay < 10){
                nowDay = nowDay.substring(1);
            }
        }
        else{
            Ext.Msg.alert('오류', '날짜 입력값(' + baseDate +')이 정확하지 않습니다.');
            return;
        }
    }        
    nowYear = Number(nowYear) + Number(val);

    
    
    var yunYearCls = false;
    var lastDay = 30;
    if(nowMonth ==1 || nowMonth ==3 || nowMonth ==5 ||nowMonth ==7 || nowMonth ==8 ||nowMonth ==10 || nowMonth ==12)
        lastDay =31;
    if(nowMonth ==2){
        if(nowYear%4== 0){
            yunYearCls = true;
            lastDay = 29;
            if(nowYear % 100 ==0){
                yunYearCls = false;
                lastDay = 28;
                if(nowYear % 400 == 0){
                    ynYearCls = true;
                    lastDay = 29;                        
                }
            }
        }            
    }
    if(nowDay> lastDay){
        nowDay = lastDay;    // nowDay + val - lastDay;
        // nowMonth++;
        // if(nowMonth >12){
        // nowMonth = nowMonth - 12;
        // nowYear = nowYear + 1;
        // }
    }
    else{
        // nowDay = Number(nowDay) + Number(val);
    }
    var tempDay = '';
    var tempMonth = '';
    if(nowDay < 10)
        tempDay = '0';
    if(nowMonth < 10)
        tempMonth = '0';    
    if(seperate == null || seperate == undefined)
        seperate = '';
        
    console.log(nowYear + seperate + tempMonth + nowMonth + seperate + tempDay + nowDay);                        
    return nowYear + seperate + tempMonth + nowMonth + seperate + tempDay + nowDay;       
}   
exCommon.getDaysBetween=function(fromDate, toDate){
    var fromYear = '';
    var fromMonth = '';
    var fromDay = '';
    var toYear = '';
    var toMoneh = '';
    var toDay = '';
    
    if(fromDate != null && fromDate != undefined){
        if(fromDate.length == 8){
            fromYear = fromDate.substring(0,4);    
            fromMonth = fromDate.substring(4,6);    
            fromDay = fromDate.substring(6,8);    
            if(fromMonth < 10){
                fromMonth = fromMonth.substring(1);
            }
            if(fromDay < 10){
                fromDay = fromDay.substring(1);
            }
        }
        else if(fromDate.length ==10){
            fromYear = fromDate.substring(0,4);    
            fromMonth = fromDate.substring(5,7);    
            fromDay = fromDate.substring(8,10);    
            if(fromMonth < 10){
                fromMonth = fromMonth.substring(1);
            }
            if(fromDay < 10){
                fromDay = fromDay.substring(1);
            }
        }
        else{
            Ext.Msg.alert('오류', '날짜 입력값(' + fromDate +')이 정확하지 않습니다.');
            return;
        }
    }
    if(toDate != null && toDate != undefined){
        if(toDate.length == 8){
            toYear = toDate.substring(0,4);    
            toMonth = toDate.substring(4,6);    
            toDay = toDate.substring(6,8);    
            if(toMonth < 10){
                toMonth = toMonth.substring(1);
            }
            if(toDay < 10){
                toDay = toDay.substring(1);
            }
        }
        else if(toDate.length ==10){
            toYear = toDate.substring(0,4);    
            toMonth = toDate.substring(5,7);    
            toDay = toDate.substring(8,10);    
            if(toMonth < 10){
                toMonth = toMonth.substring(1);
            }
            if(toDay < 10){
                toDay = toDay.substring(1);
            }
        }
        else{
            Ext.Msg.alert('오류', '날짜 입력값(' + fromDate +')이 정확하지 않습니다.');
            return;
        }
    }
    var t1 = new Date(fromYear, fromMonth, fromDay);
    var t2 = new Date(toYear, toMonth, toDay);
    
    var days = (t2 - t1)/1000/60/60/24;
    
    return days
}     
exCommon.getMonthAddMonth=function(val, seperate){
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
    nowMonth++;
    if(nowMonth >12){
        nowMonth = nowMonth - 12;
        nowYear = nowYear + 1;
    }            
    var tempDay = '';
    var tempMonth = '';
    if(nowDay < 10)
        tempDay = '0';
    if(nowMonth < 10)
        tempMonth = '0';
    if(seperate == null || seperate == undefined)
        seperate = '';
    return nowYear + seperate + tempMonth + nowMonth + seperate + tempDay + nowDay;
} 

exCommon.getLastDate=function(baseDate){
    var val=0;
    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth();
    nowMonth++;
    var nowDay = nowDate.getDate();
    if(baseDate != null && baseDate != undefined){
        if(baseDate.length == 8){
            nowYear = baseDate.substring(0,4);    
            nowMonth = baseDate.substring(4,6);    
        }
        else if(baseDate.length ==10){
            nowYear = baseDate.substring(0,4);    
            nowMonth = baseDate.substring(5,7);    
            if(nowMonth < 10){
                nowMonth = nowMonth.substring(1);
            }
        }
        else{
            Ext.Msg.alert('오류', '날짜 입력값(' + baseDate +')이 정확하지 않습니다.');
            return;
        }
    }
    
    var yunYearCls = false;
    var lastDay = 30;
    if(nowMonth ==1 || nowMonth ==3 || nowMonth ==5 ||nowMonth ==7 || nowMonth ==8 ||nowMonth ==10 || nowMonth ==12)
        lastDay =31;
    if(nowMonth ==2){
        if(nowYear%4== 0){
            yunYearCls = true;
            lastDay = 29;
            if(nowYear % 100 ==0){
                yunYearCls = false;
                lastDay = 28;
                if(nowYear % 400 == 0){
                    ynYearCls = true;
                    lastDay = 29;                        
                }
            }
        }            
    }    
    return lastDay;
}
exCommon.getNowTimePmAm=function(seperate){
    var nowDate = new Date();
    var nowHour = nowDate.getHours();
    var pmAm = '오전'; 
    if(nowHour > 12){
       // nowHour = nowHour - 12;
        pmAm = '오후'; 
    }
    
    if(nowHour < 10){
    	nowHour = "0"+ nowHour;
    }
    

    var nowMin = nowDate.getMinutes();
    if(nowMin < 10){
    	nowMin = "0"+nowMin;
    }
    
    var nowSec = nowDate.getSeconds();
    if(nowSec < 10){
    	nowSec = "0"+nowSec;
    }
    
    return nowHour + seperate + nowMin+ seperate + nowSec;
    
   // return nowHour + seperate + nowDate.getMinutes() + seperate +
	// nowDate.getSeconds();
}

// Validation 체크
exCommon.checkValidation=function(obj, objName,exMand, exType, exMin, exMax){
	
	
// console.log('checkValidation', obj.getExValue().trim());
	
    // 필수입력체크
    if(obj == null){
    	setTimeout(function(){
    		Ext.Msg.alert('오류', objName + '은(는) 화면에 없는 항목입니다.');
		},50);
        obj.focus();            
        return false;            
    }
    if(exMand != null && exMand == true){  
    	
        if(    obj.xtype == 'extextfield' || 
            obj.xtype == 'extextfieldsrch' ||
            obj.xtype == 'excombobox' ||
            obj.xtype == 'excomboboxsrch' ||
            obj.xtype == 'exdatefield' ||
            obj.xtype == 'exdatefieldsrch' ||
            obj.xtype == 'extextarea' 
        ){
            if(obj.getExValue() == null){
            	setTimeout(function(){
            		Ext.Msg.alert('확인', objName + '은(는) 필수 입력값입니다.');
				},50);
                
                obj.focus();            
                return false;                    
            }
            var objValue = obj.getExValue().trim();
            if(objValue == null || objValue == '' || objValue == ' '){
            	setTimeout(function(){
            		Ext.Msg.alert('확인', objName + '은(는) 필수 입력값입니다.');
				},50);    
                obj.focus();            
                return false;
            }
        }
    }
    // 필수입력체크
    if(exMand != null && exMand != '' && exMand != ' ' && exMand == true){
        if(    obj.xtype == 'extextfield' || 
            obj.xtype == 'extextfieldsrch' ||
            obj.xtype == 'excombobox' ||
            obj.xtype == 'excomboboxsrch' ||
            obj.xtype == 'extextarea' 
        ){
            var objValue = obj.getValue().trim();
            if(objValue == null || objValue == '' || objValue == ' '){
            	setTimeout(function(){
            		Ext.Msg.alert('확인', objName + '은(는) 필수 입력값입니다.');
        		},50);
                obj.focus();            
                return false;
            }
        }
        else if( obj.xtype == 'exdatefield' ||
                 obj.xtype == 'exdatefieldsrch'){                
            var objValue = obj.getValue();
            if(objValue == null || objValue == '' || objValue == ' '){
            	setTimeout(function(){
            		Ext.Msg.alert('확인', objName + '은(는) 필수 입력값입니다.');
        		},50);
                obj.focus();             
                return false;
            }
        }
    }        
    if(exType == 'number'){
        var objValue = obj.getValue().trim();
        if(    obj.xtype == 'extextfield' || 
            obj.xtype == 'extextfieldsrch'
        ){                
            if(objValue == null || objValue == '' || objValue == ' '){
                // Ext.Msg.alert('확인', objName + '은(는) 숫자이어야 합니다.');
                // obj.focus();
                // return false;
            }
            else {
                var val = objValue.replace(/,/g,'');
                if(isNaN(val)== true){
                	setTimeout(function(){
                		Ext.Msg.alert('확인', objName + '은(는) 숫자이어야 합니다.');
            		},50);
                    obj.focus();                
                    return false;
                }
               }
        }
        if(exMin != null && exMin != '' && exMin != ' '){
            if(exMax != null && exMax != '' && exMax != ' '){
                if(exMin == exMax){
                    var val = objValue.replace(/,/g,'');
                    if( Number(val) != Number(exMin)){
                    	setTimeout(function(){
                    		Ext.Msg.alert('확인', objName + '은(는) ' + exMin + '(으)로 입력하셔야 합니다.');
                		},50);
                        obj.focus();
                        return false;
                    }
                }
            }
        }

        if(exMin != null && exMin != '' && exMin != ' '){
            var val = objValue.replace(/,/g,'');
            if( Number(val) < Number(exMin)){
            	setTimeout(function(){
            		Ext.Msg.alert('확인', objName + '은(는) ' + exMin + ' 이상 입력하셔야 합니다.');
        		},50);
                
                obj.focus();
                return false;
            }
        }
        if(exMax != null && exMax != '' && exMax != ' '){
            var val = objValue.replace(/,/g,'');
            if( Number(val) > Number(exMax)){
            	setTimeout(function(){
            		Ext.Msg.alert('확인', objName + '은(는) ' + exMax + ' 이하로 입력하셔야 합니다.');
        		},50);
                
                obj.focus();
                return false;
            }
        }
    }        
    if(exType == 'string'){
        var objValue = obj.getValue().trim();
        
        if(exMin != null && exMin != '' && exMin != ' '){
            if(exMax != null && exMax != '' && exMax != ' '){
                if(exMin == exMax){
                    if( objValue.length != Number(exMin)){
                    	setTimeout(function(){
                    		Ext.Msg.alert('확인', objName + '은(는) ' + exMin + '자로 입력하셔야 합니다.');
                		},50);
                        obj.focus();
                        return false;
                    }
                }
            }
        }
        
        if(exMin != null && exMin != '' && exMin != ' '){
            if( objValue.length < Number(exMin)){
                setTimeout(function(){
                	Ext.Msg.alert('확인', objName + '은(는) 최소' + exMin + '자 이상 입력하셔야 합니다.');
        		},50);
                obj.focus();
                return false;
            }
        }
        if(exMax != null && exMax != '' && exMax != ' '){                
            if( objValue.length > Number(exMax)){
                setTimeout(function(){
                	Ext.Msg.alert('확인', objName + '은(는) 최대' + exMax + '자 이하로 입력하셔야 합니다.');
        		},50);
                obj.focus();
                return false;
            }
        }
    }
    if(exType == 'stringonly'){
        var objValue = obj.getValue().trim();
        for(var i=0; i<9; i++){
           // console.log('=============>' + objValue.search(i));
            if(objValue.search(i) >= 0){
                
                setTimeout(function(){
                	Ext.Msg.alert('확인', objName + '은(는) 숫자를 입력할 수 없습니다.');
        		},50);
                obj.focus();
                return false;
            }
        }
        if(exMin != null && exMin != '' && exMin != ' '){
            if(exMax != null && exMax != '' && exMax != ' '){
                if(exMin == exMax){
                    if( objValue.length != Number(exMin)){
                        
                        setTimeout(function(){
                        	Ext.Msg.alert('확인', objName + '은(는) ' + exMin + '자로 입력하셔야 합니다.');
                		},50);
                        obj.focus();
                        return false;
                    }
                }
            }
        }            
        if(exMin != null && exMin != '' && exMin != ' '){
            if( objValue.length < Number(exMin)){
                Ext.Msg.alert('확인', objName + '은(는) 최소' + exMin + '자 이상 입력하셔야 합니다.');
              // obj.focus();
                return false;
            }
        }
        if(exMax != null && exMax != '' && exMax != ' '){                
            if( objValue.length > Number(exMax)){
                Ext.Msg.alert('확인', objName + '은(는) 최대' + exMax + '자 이하로 입력하셔야 합니다.');
             // obj.focus();
                return false;
            }
        }
    }                
    if(exType == 'date'){
        
        if(obj.xtype == 'extextfield' ||
            obj.xtype == 'extextfieldsrch' ){

            var objValue = obj.getValue().trim();
            
            if(objValue != ''){
                if(objValue.length !=8 && objValue.length !=10){
                    Ext.Msg.alert('확인', objName + '은(는) 날짜형식에 맞지 않습니다.');
                // obj.focus();
                    return false;
                }
                if(this.getDateAddDate( 0, '-', objValue) == ''){
                    Ext.Msg.alert('확인', objName + '은(는) 날짜형식에 맞지 않습니다.');
                // obj.focus();
                    return false;                    
                }

                var valCalc = this.getDateAddDate( 0, '-', objValue);  
                var valCalc1 = this.getDateAddDate( 1, '-', objValue);  
                var valCalc2 = this.getDateAddDate( -1, '-', valCalc1);  
             // console.log(valCalc , valCalc2);
                if(valCalc != valCalc2){
                    Ext.Msg.alert('확인', objName + '은(는) 날짜형식에 맞지 않습니다.(일자,윤년 등)');
                // obj.focus();
                    return false;
                }

                if(exMin != null && exMin != '' && exMin != ' '){
                    if(exMax != null && exMax != '' && exMax != ' '){
                        if(exMin == exMax){
                            if( Number(objValue) != Number(exMin)){
                                Ext.Msg.alert('확인', objName + '은(는) ' + exMin + '일자로 입력하셔야 합니다.');
                      // obj.focus();
                                return false;
                            }
                        }
                    }
                }                    
                if(exMin != null && exMin != '' && exMin != ' '){
                    if( Number(objValue) < Number(exMin)){                            
                        Ext.Msg.alert('확인', objName + '은(는) 최소' + exMin + '일자 이후로 입력하셔야 합니다.');
                  // obj.focus();
                        return false;
                    }
                }
                if(exMax != null && exMax != '' && exMax != ' '){                
                    if( Number(objValue) > Number(exMax)){
                        Ext.Msg.alert('확인', objName + '은(는) 최대' + exMax + '일자 이전으로 입력하셔야 합니다.');
                 // obj.focus();
                        return false;
                    }
                }
            }
        }
        if(obj.xtype == 'exdatefield' ||
            obj.xtype == 'exdatefieldsrch' ){
            var objValue = obj.getRawValue().trim();
            if(objValue != ''){
                if(objValue.length !=8 && objValue.length !=10){
                    Ext.Msg.alert('확인', objName + '은(는) 날짜형식에 맞지 않습니다.');
                // obj.focus();
                    return false;
                }
                if(this.getDateAddDate( 0, '-', objValue) == ''){
                    Ext.Msg.alert('확인', objName + '은(는) 날짜형식에 맞지 않습니다.');
                  // obj.focus();
                    return false;                    
                }
                var valCalc = this.getDateAddDate( 0, '-', objValue);  
                var valCalc1 = this.getDateAddDate( 1, '-', objValue);  
                var valCalc2 = this.getDateAddDate( -1, '-', valCalc1);  
                console.log(valCalc);
                if(valCalc != valCalc2){
                    Ext.Msg.alert('확인', objName + '은(는) 날짜형식에 맞지 않습니다.(일자,윤년 등)');
                 // obj.focus();
                    return false;
                }
                
                if(exMin != null){
                    exMin = exMin.replace(/-/g,'');
                }
                if(exMax != null){
                    exMax = exMax.replace(/-/g,'');
                }
                
                if(exMin != null && exMin != '' && exMin != ' '){
                    if(exMax != null && exMax != '' && exMax != ' '){
                        if(exMin == exMax){
                            if( Number(objValue) != Number(exMin)){
                                Ext.Msg.alert('확인', objName + '은(는) ' + exMin + '일자로 입력하셔야 합니다.');
                              // obj.focus();
                                return false;
                            }
                        }
                    }
                }    
               // console.log('exMin', exMin);
                if(exMin != null && exMin != '' && exMin != ' '){
                    var val = obj.getRawValue().replace(/-/g,'');
                    
                    if(Number(val) < Number(exMin)){
                        Ext.Msg.alert('확인', objName + '은(는) 최소일자(' + exMin + ') 이후로  입력하셔야 합니다.');
                    // obj.focus();
                        return false;
                    }
                }
                if(exMax != null && exMax != '' && exMax != ' '){
                    var val = obj.getRawValue().replace(/-/g,'');                
                    if( Number(val) > Number(exMax)){
                        Ext.Msg.alert('확인', objName + '은(는) 최대일자(' + exMax + ') 이전으로 입력하셔야 합니다.');
                     // obj.focus();
                        return false;
                    }
                }
            }
        }
        
    }        
    return true;
}
exCommon.setNumberFormat=function(val , rep){
	
	try{
		var valc = (val + "").replace('/,/g','') + '';
	    var n = valc.indexOf('.');
	    var fval = valc.substring(0,n);
	    var rval = valc.substring(n+1);
	    // console.log('fval, rval', fval, rval, n);
	    if(n == null || n== -1){
	        // console.log('superclass' + this.superclass);
	        return Ext.util.Format.number(valc, '0,000');
	    }
	    else{
	        return Ext.util.Format.number(fval, '0,000') + '.' + rval;
	    }
	}catch (e) {
		if(rep != null || rep != undefined){
			return rep;
		}else{
			return 0;
		}
		
	}
    
}
exCommon.setTelFormat = function(val1, val2, val3){
    
	try{
		if(val1 == null){
	        val1 = '';
	    }
	    if(val2 == null){
	        val2 = '';
	    }
	    if(val3 == null){
	        val3 = '';
	    }
	    if(val1.trim() == '' && val2.trim() == '' && val3.trim() == ''){
	        return '';
	    }
	    else{
	        return val1 + '-' + val2 + '-' + val3;
	    }
	}catch (e) {
		return '';
	}
	
    
}
exCommon.setBznFormat = function(val1){
	
	try{
		if(val1.length == 10){
	        val1 = val1.substring(0,3) + '-' + val1.substring(3,5) + '-'+ val1.substring(5,10);
	    }
	    else{
	        return val1;
	    }
	}catch (e) {
		 return val1;
	}
	
    
}   
exCommon.setAcnFormat = function(val1){
	
	try{
		if(val1.length == 14){
	        val1 = val1.substring(0,3) + '-' + val1.substring(3,9) + '-'+ val1.substring(9,11)+ '-'+ val1.substring(11,14);
	    }
	    else{
	        return val1;
	    }
	}catch (e) {
		return val1;
	}
	
    
}    
exCommon.setDateFormat = function(val){
	try{
	    if(val.length == 10){
	        return val;
	    }
	    else if(val.length == 8){
	        return val.substring(0,4) + '-' + val.substring(4,6) + '-' + val.substring(6,8);
	    }
	    else {
	        return val;
	    }
	}catch (e) {
		return val;
	}
}
exCommon.setDateFormat2 = function(val){
	
	try{
		if(val.length == 10){
	        return val;
	    }
	    else if(val.length == 8){
	        return val.substring(0,4) + '/' + val.substring(4,6) + '/' + val.substring(6,8);
	    }
	    else if(val.length == 6){
	    	return val.substring(0,4) + '/' + val.substring(4,6);
	    }
	    else {
	        return val;
	    }
	}catch (e) {
		return val;
	}
	
    
}


exCommon.excelDown = function(grid , title , fileName, rowCnt){
	
	if(rowCnt == 0){
		setTimeout(function(){
    		Ext.Msg.alert('알림',  '검색후 작업하십시오.');
		},10);
		return;
	}
	
	// var rowCount = me.getViewModel().getStore('ds_approval').getCount();
	
	
	grid.saveDocumentAs({
	     type        : 'excel'
	    // ,title : title
	    ,title       : ''
	    ,fileName    : fileName+"_"+exCommon.getNowDateTime()+'.xlsx'
	    ,showSummary : true
	    ,onlyExpandedNodes : false
	    ,showSummary : true
	    ,includeGroups: true
        ,includeSummary: true
		/*
		 * ,type: 'excel07' ,ext: 'xlsx'
		 */        
	});
}

exCommon.gridValidation = function (val , msg , obj){
	// console.log('msg', val);
	if( val == null ||  val == "" || val == undefined  || val.length == 0){
		setTimeout(function(){
			Ext.Msg.alert('알림',  msg +' 입력하세요.');    				
		},50);
		
		if(obj != null && obj != undefined){
			obj.focus();
		}
		return false;
	}else{
		return true;
	}
}

// ==================== 하단의 코드는 수정하지마세요 =======================================
exCommon.setSummaryGrid=function(store, gridType, fieldName, plusminus1, fieldName1, plusminus2, fieldName2, plusminus3, fieldName3, plusminus4, fieldName4, plusminus5, fieldName5){
    console.log('setSummaryGrid 들어옴');
    if(gridType == 'sum'){
        var ret=0;
        store.each(function(record){
            if(record.get(fieldName).trim() != ''){
                var val = Number(record.get(fieldName).replace(/,/g,''));
                ret += val;
            }
        });
        return ret;
    }
    else if(gridType == 'max'){
        var ret=0;
        var i=0;
        store.each(function(record){
            if(record.get(fieldName).trim() != ''){
                var val = Number(record.get(fieldName).replace(/,/g,''));
                if(i==0)
                    ret = val;
                if(val > ret)
                    ret = val;
                i++;
            }
        });
        return ret;
    }
    else if(gridType == 'min'){
        var ret=0;
        var i=0;
        store.each(function(record){
            if(record.get(fieldName).trim() != ''){
                var val = Number(record.get(fieldName).replace(/,/g,''));
                if(i==0)
                    ret = val;
                if(val < ret)
                    ret = val;
                i++;
            }
        });
        return ret;
    }
    else if(gridType == 'count'){
        var ret=0;
        store.each(function(record){
            ret++;
        });
        return ret;
    }
}


exCommon.ChangeCount = function(storeNm ,  me){
	
	try{
		var recordAdd  = me.getViewModel().getStore(storeNm).getNewRecords().length;
		var recordsUpt = me.getViewModel().getStore(storeNm).getUpdatedRecords().length;
		var recordsDel = me.getViewModel().getStore(storeNm).getRemovedRecords().length;

		return recordAdd + recordsUpt + recordsDel;
		
	}catch (e) {
		console.log(e);
		return 0;
	}
}




exCommon.gridParamSetting = function( me 
								     ,storeName
								     ,newParam
								     ,uptParam
								     ,delParam){
		
	try{
		me.lookupReference(newParam).setValue("");
		me.lookupReference(uptParam).setValue("");
		me.lookupReference(delParam).setValue("");
	}catch (e) {
		me.lookupReference(newParam).setExValue("");
		me.lookupReference(uptParam).setExValue("");
		me.lookupReference(delParam).setExValue("");
	}
	
	var jsonNewData = [];
	
	
	var records = me.getViewModel().getStore(storeName).getNewRecords();
	for (var i=0; i < records.length; i++){
    	jsonNewData.push(records[i].data);
    }
	me.lookupReference(newParam).setExValue(Ext.encode(jsonNewData));
	
	var jsonUptData = [];
    records = me.getViewModel().getStore(storeName).getUpdatedRecords();
    for (var i=0; i < records.length; i++){       
    	jsonUptData.push(records[i].data);
    }
    me.lookupReference(uptParam).setExValue(Ext.encode(jsonUptData));
    
    
    var jsonDelData = [];
    records = me.getViewModel().getStore(storeName).getRemovedRecords();
    for (var i=0; i < records.length; i++){       
    	jsonDelData.push(records[i].data);
    }
   me.lookupReference(delParam).setExValue(Ext.encode(jsonDelData));
	
}// gridParamSetting

exCommon.addParamSetting = function(me ,storeNm , newParam ){
	
	try{
		me.lookupReference(newParam).setExValue("");
	}catch (e) {
		me.lookupReference(newParam).setValue("");
	}
	
	var jsonNewData = [];
	var records     = me.getViewModel().getStore(storeNm).getNewRecords();
	for (var i=0; i < records.length; i++){
		//console.log(i , " = "+records[i].data );
    	jsonNewData.push(records[i].data);
    }
	
	me.lookupReference(newParam).setExValue(Ext.encode(jsonNewData));
	console.log(newParam+' = ', me.lookupReference(newParam).getExValue());
	
}// addParamSetting


exCommon.uptParamSetting = function(me ,storeNm , newParam ){
	
	try{
		me.lookupReference(newParam).setExValue("");
	}catch (e) {
		me.lookupReference(newParam).setValue("");
	}
	
	var jsonUptData = [];
	var records     = me.getViewModel().getStore(storeNm).getUpdatedRecords();
	for (var i=0; i < records.length; i++){
		//console.log('uptParamSetting =', records[i].data);
		jsonUptData.push(records[i].data);
    }
	me.lookupReference(newParam).setExValue(Ext.encode(jsonUptData));
	
}// addParamSetting



exCommon.callStoreCallback = function (success , records){
	console.log('callStoreCallback' , success);
	if(success){
		var rowCount = records.length;
		if(rowCount == 0){
			setTimeout(function(){
				Ext.Msg.alert('알림', '검색결과가 없습니다.');    				
			},50); 
		}else{
			return true;
		}
	}else{
		setTimeout(function(){
			Ext.Msg.alert('경고', '오류가 발생하였습니다.<br>관련문의 : 070-7860-7902<br>(주)오투아이 수비라담당자.');    				
		},50); 
	}
	return false;
}

exCommon.fnGridSaveCallback = function(me, success, action,storName  ){
	try{
		console.log('fnGridSaveCallback', success);
		var callback = Ext.decode(action.response.responseText);	
		var msgType = "경고";
		if(success){
			msgType = "알림";
			me.getViewModel().getStore(storName).commitChanges();
		}
		Ext.Msg.alert(msgType, callback.msg);
	}catch (e) {
		setTimeout(function(){
			Ext.Msg.alert('경고', '오류가 발생하였습니다.<br>관련문의 : 070-7860-7902<br>(주)오투아이 수비라담당자.');    				
		},50); 
	}
	
	
	/*
	 * if(params != null && callback == null){ console.log('fnGridSaveCallback
	 * NotCallback'); setTimeout(function(){ me.callStore(me, storName, '',
	 * params, null); },10); }
	 */
	
	/*
	 * if(params != null && callback != null){ console.log('fnGridSaveCallback
	 * Callback'); setTimeout(function(){ me.callStore(me, storName, '', params,
	 * callback); },10); }
	 */
	
}
						  


exCommon.fnGridSave = function( me 
							   ,storeName
							   ,newParam
							   ,uptParam
							   ,callUrl
							   ,callBackName
							   ,confirm){
	
	me.lookupReference(newParam).setValue("");
	me.lookupReference(uptParam).setValue("");
	
	
	var dataCnt =0;
	
	var jsonNewData = [];
	var records = me.getViewModel().getStore(storeName).getNewRecords();
	for (var i=0; i < records.length; i++){
    	jsonNewData.push(records[i].data);
    	dataCnt ++;
    }
	me.lookupReference(newParam).setExValue(Ext.encode(jsonNewData));
	console.log(newParam, me.lookupReference(newParam).getValue() );
	
	var jsonUptData = [];
    records = me.getViewModel().getStore(storeName).getUpdatedRecords();
    for (var i=0; i < records.length; i++){       
    	jsonUptData.push(records[i].data);
    	dataCnt ++;
    }
    me.lookupReference(uptParam).setExValue(Ext.encode(jsonUptData));
    console.log(uptParam, me.lookupReference(uptParam).getValue() );
    
    if(dataCnt != 0){
    	console.log('confirm = ', confirm);
    	if(confirm){
    		me.callForm(me, callUrl, callBackName , false);
    	}else{
    		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
        		if (btn == 'yes') {  
        			me.callForm(me, callUrl, callBackName , false);
        		}
        	});
    	}
    	
    	
    }else{
    	Ext.Msg.alert('알림', '변경된 자료가 없습니다.');
    }
}// fnGridSave


exCommon.fnGridSaveAll = function( me 
							      ,storeName
							      ,newParam
							      ,uptParam
							      ,delParam
							      ,callUrl
							      ,callBackName
							      ,confirm
							      ,msg){
	
	try{
		me.lookupReference(newParam).setValue("");
		me.lookupReference(uptParam).setValue("");
		me.lookupReference(delParam).setValue("");
	}catch (e) {
		me.lookupReference(newParam).setExValue("");
		me.lookupReference(uptParam).setExValue("");
		me.lookupReference(delParam).setExValue("");
	}
	
	
	
	var dataCnt =0;
	
	var jsonNewData = [];
	var records = me.getViewModel().getStore(storeName).getNewRecords();
	for (var i=0; i < records.length; i++){
    	jsonNewData.push(records[i].data);
    	dataCnt ++;
    }
	me.lookupReference(newParam).setExValue(Ext.encode(jsonNewData));
	//console.log(newParam, me.lookupReference(newParam).getValue() );
	
	var jsonUptData = [];
    records = me.getViewModel().getStore(storeName).getUpdatedRecords();
    for (var i=0; i < records.length; i++){       
    	jsonUptData.push(records[i].data);
    	dataCnt ++;
    }
    me.lookupReference(uptParam).setExValue(Ext.encode(jsonUptData));
    //console.log(uptParam, me.lookupReference(uptParam).getValue() );
    
    var jsonDelData = [];
    records = me.getViewModel().getStore(storeName).getRemovedRecords();
    for (var i=0; i < records.length; i++){       
    	jsonDelData.push(records[i].data);
    	dataCnt ++;
    }
   me.lookupReference(delParam).setExValue(Ext.encode(jsonDelData));
   //console.log(delParam, me.lookupReference(delParam).getValue() );
    
    if(dataCnt != 0){
    	
    	if(confirm){
    		console.log('confirm All1', confirm);
    		setTimeout(function(){
				me.callForm(me, callUrl, callBackName , false);
			},10);	
    	}else{
    		console.log('confirm All2', confirm);
    		if(msg == null || msg == "" || msg == undefined){
    			msg = "저장 하시겠습니까?";
    		}
    		
    		Ext.MessageBox.confirm('알림', msg, function(btn){
        		if (btn == 'yes') {
        			setTimeout(function(){
        				me.callForm(me, callUrl, callBackName , false);
        			},10);	
        		}
        	});
    	}
    	
    }else{
    	Ext.Msg.alert('알림', '변경된 자료가 없습니다.');
    }
}



exCommon.gridRemove = function(me , gridNm, storeNm , all , confirm ){
	
	try{
		if(confirm){
			if(all){
        		me.getViewModel().getStore(storeNm).removeAll();
        	}else{
        		exCommon.gridRemoveDetail(me , gridNm, storeNm , all , confirm )
        	}
			return false;
		}else{
			Ext.MessageBox.confirm('경고', '삭제하시겠습니까?', function(btn){  
		        if (btn == 'yes') { 
		        	exCommon.gridRemoveDetail(me , gridNm, storeNm , all , confirm )
		        }  
		    });
		}
		
		
		
	}catch (e) {}
}//

exCommon.gridRemoveDetail= function(me , gridNm, storeNm , all , confirm ){
	if(all){
		me.getViewModel().getStore(storeNm).removeAll();
	}else{
		
		var selectedRecord = me.lookupReference(gridNm).getView().getSelectionModel().getSelection();
		
		for(var i = 0; i<selectedRecord.length ; i++){
			var rowIndex = me.lookupReference(gridNm).getStore().indexOf(selectedRecord[i]);
			me.lookupReference(gridNm).getStore().remove(selectedRecord[i]);
			
			if(i+1 == selectedRecord.length ){
				if(rowIndex > 0) rowIndex = rowIndex -1;
				if(rowIndex < 0) rowIndex = 0;
				me.lookupReference(gridNm).getView().select(rowIndex);
			}
		}// for
		
		me.lookupReference(gridNm).getView().refresh();
	}
}




exCommon.lookupReVal = function (obj , msg){
	// console.log('msg', val);
	
	var val = "";
	try{
		val = obj.getExValue();
	}catch (e) {
		val = obj.getValue();
	}
	
	if( val == null ||  val == "" || val == undefined  || val.length == 0){
		setTimeout(function(){
			Ext.Msg.alert('알림',  msg +' 입력하세요.');    				
		},50);
		
		if(obj != null && obj != undefined){
			obj.focus();
		}
	// console.log('false');
		return false;
	}
// console.log('truue');
	return true;
	
}



exCommon.payMonthColor = function(val ,temp ){
	var Temp = val;
	
	if( Temp == "T" ){
		return  "#FFAAAA";
	}else if( Temp == "F" ){
		return  "#FFE6E6";
	}else{
		return  "#FFFFFF";
	}
}

exCommon.payMonthText = function(val){
	var value = exCommon.getRepVal(val,"");
	
	try{
		return value.replace('T', '').replace('F', '');
	}catch (e) {
		return "";
	}
	
	
}

// exCommon.getRepVal
exCommon.payMonthLimitColor = function(val ,temp ){
	
	if(val == 0 ){
		return  "#F6F9FD ";
	}else if(val == 1   ){
		return "#FFFFFF ";
	}else if(val == 2){
		return "#FF6600 ";
	}else if(val == 3 ){				
		return "#6699FF ";
	}else if(val == 9){
		return "#2BD768 ";		
	}else{
		return "#FFFFFF  ";
	}
	
}



exCommon.msgAlert = function(msg){
	setTimeout(function(){
		Ext.Msg.alert('알림',  msg);    				
	},50);
	return false;
}


exCommon.getReferVal = function(me, refer, rep){
	var val = me.lookupReference(refer).getValue();
	
	if(val == null || val == "" || val == undefined){
		val = rep;
	}
	return val;
}


exCommon.getRepVal = function(val , rep){
	try{
		if(val == null || val == "" || val == undefined){
			
			if(rep != undefined && rep != null){
				return rep;
			}else{
				return "";
			}
			
		}
	}catch (e) {
		return "";
	}
	
	return val;
}

exCommon.getRepNum = function(val){
	try{
		if(val == null || val == "" || val == undefined){
			return 0;
		}
		
		if( isNaN(val) ){
			return 0;
		}
		
		//return new Number(val);
		return parseInt(val);
	}catch (e) {
		return 0;
	}
	
}


exCommon.getLength = function(val){
	try{
		if(val == null || val == "" || val == undefined){
			return 0;
		}	
		return val.length;
	}catch (e) {
		return 0;
	}
	
}


exCommon.getCheckVal = function(val, check , uncheck){
	try{
		
		if(val){
			return check;
		}else{
			return uncheck;
		}
		
	}catch (e) {
		return "";
	}
}

exCommon.onSearchBlur = function(me, m2 , hid_bud_no , txtBudNo){
	try{
		var txt_budNo = exCommon.getRepVal( m2.value, "" );
		if(txt_budNo == ""){
			me.lookupReference(hid_bud_no).setExValue("");
			me.lookupReference(txtBudNo).setExValue("");
		}
	}catch (e) {}
}

exCommon.groupPopUp  =  function(me , selectedRecord , rtn){
	me.openPopup('ExFrm.view.com.group_mouse',  selectedRecord , rtn);
}


