exCommon.onSindoSearch = function( type , value , me , callback , Gbn){
	
	//console.log('onSindoSearch Gbn = ', Gbn);
	
	var searchgbn;
	var searchword;
	try{
		searchgbn  = type.getExValue();
		searchword = value.getExValue();
		
		if(searchword != ""){
			console.log('onSindoSearch1', "["+searchword+"]");
			if(searchgbn == "BUD_NO"){
				if(searchword.length < 5){
					for(var a=searchword.length; a<5; a++){
						searchword = "0" + searchword;
					}
					value.setExValue(searchword);
				}
			}
		}else {
			
			if(searchgbn == "BUD_NO"){
				msg = "신도번호를 입력 후 조회 버튼을 눌러주세요.";
			}else if(searchgbn == "NAME_KOR"){
				msg = "신도명을 입력 후 조회 버튼을 눌러주세요.";
			}else if(searchgbn == "CARD_NO"){
				msg = "카드번호을 입력 후 조회 버튼을 눌러주세요.";
			}else {
				msg = "전화번호를 입력 후 조회 버튼을 눌러주세요.";
			}
			console.log('onSindoSearch2', searchgbn);
			setTimeout(function(){
				Ext.Msg.alert('경고', msg);
			},50);
			value.focus();
			return false;
		}
	}catch (e) {
		
		if(Gbn == 'DONGCHAM' || Gbn == 'YOUNGGA' || Gbn == 'DONGCHAM_DECE'){
			searchgbn  = type;
			searchword = value;
		}
	}
	
	
	var params = {
   		 V_SEARCH_GBN : searchgbn
   		,V_SEARCH_WORD: searchword	
   		,V_gbn        : Gbn
   	};
	
	me.openPopup('ExFrm.view.com.sindo',  params, callback);
}

exCommon.onHwajuSearch = function(me , callback ){
	var params = {
		V_gbn : "HWAJU"
	}
	me.openPopup('ExFrm.view.com.sindo',  params, callback);
}


exCommon.recCodeToSmsCode = function(rec) {
	  if (rec=="1")
	    return "1";
	  else if(rec=="2")
	    return "2";
	  else if(rec=="3")
	    return "4";
	  else if(rec=="4")
	    return "3";
	  else if(rec=="5")
	    return "5";
	  else if(rec=="6")
	    return "6";
	  else if(rec=="7")
	    return "7";
	  else if(rec=="8")
	    return "8";
	  else if(rec=="9")
	    return "9";
	  else if(rec=="10")
	    return "12";
	  else if(rec=="11")
	    return "13";
	  else if(rec=="12")
	    return "14";
	  else if(rec=="13")
	    return "17";
	  else
	    return "12";
}



exCommon.getTF = function(val){
	try{
		if(val == true){
			return "T";
		}else if(val  == false){
			return "F";
		}else{
			return val;
		}
		
	}catch (e) {
		return val;
	}
}



exCommon.gridFormVal = function(me, row, storeNm, gridNm, index  , msg ){
	
	var record = me.getViewModel().getStore(storeNm).getAt(row);
	
	var val    = exCommon.getRepVal(record.get(index));
	
	//console.log(index +' = ', val);
	if(val == ""){
		me.lookupReference(gridNm).getView().select(row);
		
		setTimeout(function(){
			Ext.Msg.alert('알림',  msg + " 항목은 필수입력 항목입니다.");    				
		},50);
		
		return false;
	}
	return true;
}


exCommon.gridFormValDate = function(me, row, storeNm, gridNm, index  , msg ){
	
	var record = me.getViewModel().getStore(storeNm).getAt(row);
	
	var val    = exCommon.getRepVal(record.get(index))+"";
	    val    = exCommon.getGridDateFormat(val, "", 8);
	
	//console.log('gridFormValDate val = ', + val);
	    
	var valid  = gf_validateDate(val,"");
	
	//console.log('gridFormValDate valid = ', + valid);
	
	/* 0보다 작으면 오류이다. */
	if ( valid < 0 ) {
		var alertMsg = msg + " 항목이 올바른 날짜 값이 아닙니다.";
		switch (valid) {
			case -1 : /* 연도에 문제가 있는 경우. */
				alertMsg = itemName + " 항목의 연도를 확인해 주십시오.";
				break;

			case -2 : /* 월에 문제가 있는 경우. */
				alertMsg = itemName + " 항목의 월을 확인해 주십시오.";
				break;

			case -3 : /* 일에 문제가 있는 경우. */
				alertMsg = itemName + " 항목의 일을 확인해 주십시오.";
				break;
		}
		me.lookupReference(gridNm).getView().select(row);
		
		setTimeout(function(){
			Ext.Msg.alert('알림',  alertMsg);    				
		},50);
		
		return false;
	}
	return true;
}

function gf_validateDate(dateValue, delim) {

	/* 값이 넘어오지 않았으면 0을 돌려준다. */
	if ( dateValue == "" ) return 0;

	/* 구별자의 길이를 구한다.
	   뒤에서 연월일을 분리할 때 건너뛸 글자수로 사용된다. */
	var delimLength = 0;

	if ( delim != undefined && delim != null ) {
		delimLength = delim.length;
	}

	/* dateValue의 type이 문자열이 아닐 수 있으므로 문자열로 치환한다. */
	dateValue = gf_trim("" + dateValue);


	/* 연월일이 모두 입력되었는지 길이를 점검한다. */
	if ( dateValue.length != ( 8 + delimLength * 2 ) ) {
		return -4;
	}

	/* 연, 월, 일을 분리한다. */
	var startIndex = 0;
	var yearStr  = dateValue.substr(startIndex, 4);

	startIndex += 4 + delimLength;
	var monthStr = dateValue.substr(startIndex, 2);

	startIndex += 2 + delimLength;
	var dayStr   = dateValue.substr(startIndex, 2);

	/* 연도 값 점검. 숫자인가? */
	if ( isNaN(yearStr) ) return -1;
	/* 연도 값 점검. 양의 숫자인가? */
	var year = parseInt(yearStr, 10);
	if ( year <= 0 ) return -1;
	/* 월 값 점검. 숫자인가? */
	if ( isNaN(monthStr) ) return -2;
	/* 월 값 점검. 1 ~ 12 값인가? */
	var month = parseInt(monthStr, 10);
	if ( month < 1 || month > 12 ) return -2;
	/* 일 값 점검. 숫자인가? */
	if ( isNaN(dayStr) ) return -3;

	/* 일 값 점검. 월에 맞는 일자인가? */
	//var day = parseInt(dayStr, 10);
	//var lastDay = gf_getLastDayOfMonth(year, month);

	//if ( day < 1 || day > lastDay ) return -3;

	/* 여기까지 왔으면 정상이다. */
	return 0;
}




exCommon.addZero = function(i){
	var rtn = i + 100;
	return rtn.toString().substring(1,3);
}

exCommon.getMinusDate = function(month){
	var dt    = new Date();
	var now   = exCommon.addZero((dt.getMonth()+1))+"/"+exCommon.addZero(dt.getDate())+"/"+dt.getFullYear();
	
	// console.log("dt.getDate() = "+ dt.getDate());
	
	var newDt = new Date(now);
	
	newDt.setMonth( newDt.getMonth() - month );
	newDt.setDate(1);
	
	var monthSix = newDt.getFullYear() + ""+exCommon.addZero((newDt.getMonth()+1)) + "" + exCommon.addZero(dt.getDate())
	
	return monthSix;
}

exCommon.getMinusDay = function(day){
	 var d = new Date();
	 d.setDate(d.getDate()- day);
	 /*console.log('getMinusDay = ', d);*/
	 
	 return d.getFullYear() + ""+exCommon.addZero((d.getMonth()+1)) + "" + exCommon.addZero(d.getDate())
}

exCommon.getPlusDay = function(day){
	 var d = new Date();
	 
	 if(day > 0){
		 d.setDate(d.getDate() + day); 
	 }
	 
	 
	 return d.getFullYear() + ""+exCommon.addZero((d.getMonth()+1)) + "" + exCommon.addZero(d.getDate())
}

exCommon.getDateCalDay = function(date1 , period){
	var strDate1 = date1;
	//console.log("getDateCalDay = "+date1 ," = "+period );
	
	var arr1 = strDate1.split('/');
	
	console.log("getDateCalDay = " ,arr1[0]);
	console.log("getDateCalDay = " ,arr1[1]);
	console.log("getDateCalDay = " ,arr1[2]);
	
	
	var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
	
	if(period > 0){
		 //d.setDate(d.getDate() + day);
		 dat1.setDate( dat1.getDate() + period  )  ;
	 }
	
	
	var yyyy = dat1.getFullYear();
	var mm = dat1.getMonth();
	
	
	if(mm == 0 || mm == '0') {
		mm = 12;
		yyyy = yyyy -1;
	}
	
	
	return yyyy+ ""+exCommon.addZero( mm )+ ""+  exCommon.addZero(dat1.getDate());
	
}





exCommon.getFormat=function(val, type){
	// console.log('getFormat' , val);
	// console.log('getFormat' , type);
	
	if( exCommon.getRepVal(val) == "" ) return "";
	
	try{
		var rtn= "";
		
		switch (type) {
			case 'cell':
				var cel = val;
				if(cel.length == 10){
					rtn =  cel.substr(0,3) + "-" + cel.substr(3,3) + "-"+ cel.substr(6,4);
		    	}
		    	else if(cel.length == 11){
		    		rtn =  cel.substr(0,3) + "-" + cel.substr(4,4) + "-"+ cel.substr(7,4);
		    	}
		    	else{
		    		rtn =  cel;
		    	}
				break;
			case 'dateYMD':
				if(val.length == 4){
					rtn  = val.substr(0,4)
				}else if(val.length == 6){
					rtn  = val.substr(0,4) + " / " + val.substr(4,2)
				}else{
					rtn  = val.substr(0,4) + " / " + val.substr(4,2)+ " / " +val.substr(6,2);
				}
				
				break;
			case 'useYN':
				if(val == "F"){
					rtn = "아니오";
				}else if(val == "T"){
					rtn = "예";
				}
				break;
			case 'gender':
				if(val == "F"){
					rtn = "여자";
				}else if(val == "T"){
					rtn = "남자";
				}
				break;
			case 'lunar':
				if(val == "F"){
					rtn = "양력";
				}else if(val == "T"){
					rtn = "음력";
				}	
				break;
			case 'zip':
				console.log(type, val.length)
				if(val.length == 6){
					return val.substr(0,3) + "-" +val.substr(3,3);
				}else{
					return val;
				}
				
				break;
			default:
				rtn = val;
				break;
		}
		return rtn;
		
	}catch (e) {
		console.log(e);
		return "";
	}	
	return val;
}

exCommon.getComboVal=function(value, store , type , code , display, repDis){
	// var store =
	// this.up('[isRootView=true]').getViewModel().getStore('ds_type');
	try{
		if(type == "user"){
			if(value != "" && value != null && value != undefined){
		    	var index = store.find(code,value, 0, false, true, true);
		        if(index != -1){
		            return store.getAt(index).get(display);
		        }
		        else {
		        	if(repDis != undefined && repDis != null){
		        		return repDis
		        	}else{
		        		return value;
		        	}
		        }
		    }else{
		    	if(repDis != undefined && repDis != null){
	        		return repDis
	        	}else{
	        		return value;
	        	}
		    }
		}else{
			if(value != "" && value != null && value != undefined){
		    	var index = store.find('CODE',value)
		        if(index != -1){
		            return store.getAt(index).get('NAME');
		        }
		        else {
		        	if(repDis != undefined && repDis != null){
		        		return repDis
		        	}else{
		        		return value;
		        	}
		        }
		    }else{
		    	if(repDis != undefined && repDis != null){
	        		return repDis
	        	}else{
	        		return value;
	        	}
		    }
		}
	}catch (e) {
		// console.log(e);
		return value;
	}
	
}


exCommon.getGridDateFormat=function(value , form , length){
	
	/*
	 * console.log('getGridDateFormat = ',value); console.log('getGridDateFormat =
	 * ',value.length);
	 */
	
	try{
		if(value == null || value == "" || value == undefined ){
			
			
			return "";
		}
		else if(value.length == 6){
			if(form != null && form != "" && form != undefined ){
    			return  value.substr(0,4) + form + value.substr(4,2);
			}else if(form == ""){
				return value.substr(0,4) + "" + value.substr(4,2) ;
    		}else{
    			return value.substr(0,4) + "-" + value.substr(4,2) ;
    		}
		}
		else if(value.length == 8){
			if(form != null && form != "" && form != undefined ){
				
				if(length == 6){
					return  value.substr(0,4) + form + value.substr(4,2);
				}else{
					return  value.substr(0,4) + form + value.substr(4,2) + form + value.substr(6,2);
				}
			}else if(form == ""){
				return value.substr(0,4) + "" + value.substr(4,2) + "" + value.substr(6,2);
			}else{
    			return value.substr(0,4) + "-" + value.substr(4,2) + "-" + value.substr(6,2);
    		}
		}
		else if(value.length <= 10){
			
			if(form != null && form != "" && form != undefined ){
    			return value.replace(/-/gi, form); 
    		}else{
    			return value
    		}
    	}else{
    		
    		if(form != null && form != "" && form != undefined ){
    			
    			if(length == 6){
    				return Ext.util.Format.date(value, 'Y'+form+'m');
    			}else{
    				return Ext.util.Format.date(value, 'Y'+form+'m'+form+'d');
    			}
    		}else if(form == ""){
    			return Ext.util.Format.date(value, 'Y'+''+'m'+''+'d');
    		}else{
    			return Ext.util.Format.date(value, 'Y-m-d');
    		}
    	}
	}catch (e) {
		return "";
	}
}



function fn_getBudNo(me, param,type){
	
	var budNo = exCommon.getRepVal( exCommon.getCustBudNo() );
	if(budNo != ""){
		console.log(' fn_getBudNo 1', type + " : "+ budNo);
		try{
			
			if(type == "all"){
				me.lookupReference('txt_stipulation'+param).setExValue( budNo );
			}else{
				me.lookupReference('txt_stipulation'+param).setExValue( budNo.substring(3,8) );
			}
			me.lookupReference('txt_budNo'+param).setExValue( budNo );
			me.lookupReference('cb_setBudNo'+param).setExValue(true);
			me.lookupReference('hid_bud_no'+param).setExValue(budNo);
		}catch (e) {}
	}else{
		console.log(' fn_getBudNo 2');
		try{
			me.lookupReference('txt_stipulation'+param).setExValue( "" );			
			me.lookupReference('txt_budNo'+param).setExValue( "" );
			me.lookupReference('cb_setBudNo'+param).setExValue( false  )
		}catch (e) {}
	}
}

function fn_setBudNo(me,param){
	var cb_setBudNo = me.lookupReference('cb_setBudNo'+param).checked;
	var txt_budNo   = me.lookupReference('txt_budNo'+param).getExValue();
	
	//console.log('fn_setBudNo = ',txt_budNo );
	
	if(cb_setBudNo){
	//	console.log(1);
		exCommon.setCustBudNo( txt_budNo );
	}else{
	//	console.log(2);
		exCommon.setCustBudNo("");
	}
}


/**
 * 사업자번호를 체크한다.(3자리-2자리-5자리)-고유번호와 동일
 *
 * @param sBusiNo 사업자등록번호. 예) "1234567890"
 * @return 일치 - true, 실패 - false
 */
function gf_BizNoCheck(sBusiNo) {
	var iBusi = new Array();
	var iSum  = 0;
	var iMod  = 0;
	var iMod_a = 0;
	var iMod_b = 0;
	var iMod_c = 0;

	if(sBusiNo == "" || sBusiNo == " ") return true;// Null은 체크 않음

	if(sBusiNo.length != 10) {						// 처음은 자리수부터 Check 한다.
		return false;
	}

	iBusi[0]  = parseInt(sBusiNo.substring(0,1),  10);
	iBusi[1]  = parseInt(sBusiNo.substring(1,2),  10) * 3;
	iBusi[2]  = parseInt(sBusiNo.substring(2,3),  10) * 7;
	iBusi[3]  = parseInt(sBusiNo.substring(3,4),  10);
	iBusi[4]  = parseInt(sBusiNo.substring(4,5),  10) * 3;
	iBusi[5]  = parseInt(sBusiNo.substring(5,6),  10) * 7;
	iBusi[6]  = parseInt(sBusiNo.substring(6,7),  10);
	iBusi[7]  = parseInt(sBusiNo.substring(7,8),  10) * 3;
	iBusi[8]  = parseInt(sBusiNo.substring(8,9),  10) * 5;
	iBusi[9]  = parseInt(sBusiNo.substring(9,10), 10);

	// 8 자리수 까지 SUM
	for(var i=0; i < sBusiNo.length - 2; i++) {
		iSum += iBusi[i];
	}

	iMod_a = iSum  %  10;							// 10으로 나눈 나머지 a
													// 9번째 자리 는
	iMod_b = parseInt((iBusi[8] / 10),10);  		// 몫     b
	iMod_c = iBusi[8] % 10;                 		// 나머지 c
	iMod   = 10 -  ((iMod_a + iMod_b + iMod_c) % 10);
	iMod   = iMod % 10;

	if(iMod == iBusi[9]) {
		return true;								// 사업자 번호 OK
	}
	else {
		return false;								// 사업자 번호 오류
	}
}


/**
 * 문자열의 바이트 수 계산
 */
function gf_calBytes(str){
  var tcount = 0;

  var tmpStr = new String(str);
  var temp = tmpStr.length;

  var onechar;
  for ( k=0; k<temp; k++ )
  {
    onechar = tmpStr.charAt(k);
    if (escape(onechar).length > 4)
    {
      tcount += 2;
    }
    else
    {
      tcount += 1;
    }
  }

  return tcount;
}


function on_resetBud( value , hide , txt_budNo){
	hide.setExValue("");
	value.setExValue("");
	try{
		txt_budNo.setExValue("");
	}catch (e) {}
	
	value.focus();
}


function gf_SetBudFind(){
	try{
		console.log('gf_SetBudFind arguments.length = ', arguments.length);
		
		if(arguments.length==5) {
			  var params            = arguments[0];
		      var cb_Stipulation    = eval(arguments[1]);
		      var txt_stipulation   = eval(arguments[2]);
		      var hid_bud_no        = eval(arguments[3]);
		      
		      if(cb_Stipulation == "BUD_NO"){	    	 
		    	  arguments[2].setExValue(params.BUD_NO.substring(3,8));
		      }else if(cb_Stipulation == "NAME_KOR"){
		    	  arguments[2].setExValue(params.NAME_KOR);
		      }else if(cb_Stipulation == "SACRED_KOR"){
		    	  arguments[2].setExValue(params.SACRED_KOR);
		      }else if(cb_Stipulation == "TELNO"){
		    	  arguments[2].setExValue(params.TEL_NO_RENDER);
		      }else if(cb_Stipulation == "MOBILE_TELNO"){
		    	  arguments[2].setExValue(params.MOBILE_TELNO_RENDER);
		      }else if(cb_Stipulation == "YOUNGGA"){
		    	  arguments[2].setExValue(params.DEATH_NAME_KOR)
		      }else if(cb_Stipulation == "CARD_NO"){
		    	  arguments[2].setExValue(params.CARD_NO)
		      }
		      arguments[3].setExValue(params.BUD_NO);
		      try{arguments[4].setExValue(params.BUD_NO);}catch (e) {}
		}
	    else if(arguments.length==4) {
	      
	      var params            = arguments[0];
	      var cb_Stipulation    = arguments[1].getExValue( );
	      var txt_stipulation   = arguments[2].getExValue( );
	      var txt_budNo         = arguments[3].getExValue( );
	      
	      if(cb_Stipulation == "BUD_NO"){	    	 
	    	  arguments[2].setExValue(params.BUD_NO.substring(3,8));
	      }else if(cb_Stipulation == "NAME_KOR"){
	    	  arguments[2].setExValue(params.NAME_KOR);
	      }else if(cb_Stipulation == "SACRED_KOR"){
	    	  arguments[2].setExValue(params.SACRED_KOR);
	      }else if(cb_Stipulation == "TELNO"){
	    	  arguments[2].setExValue(params.TEL_NO_RENDER);
	      }else if(cb_Stipulation == "MOBILE_TELNO"){
	    	  arguments[2].setExValue(params.MOBILE_TELNO_RENDER);
	      }else if(cb_Stipulation == "YOUNGGA"){
	    	  arguments[2].setExValue(params.DEATH_NAME_KOR)
	      }else if(cb_Stipulation == "CARD_NO"){
	    	  arguments[2].setExValue(params.CARD_NO)
	      }
	      arguments[3].setExValue(params.BUD_NO);
	      try{arguments[4].setExValue(params.BUD_NO);}catch (e) {}
	    }
	}catch (e) {
		console.log(e);
	}
}

function gf_SetBudFindNew(){
	console.log('gf_SetBudFindNew = ', arguments.length);
	
	if(arguments.length==5){
		
		  var params            = arguments[0];
	      var cb_Stipulation    = eval(arguments[1]);
	      var txt_stipulation   = eval(arguments[2]);
	      var txt_budNo         = eval(arguments[3]);
	      var hid_bud_no        = eval(arguments[4]);
	      
	      if(cb_Stipulation == "BUD_NO"){	    	 
	    	  arguments[2].setExValue(params.BUD_NO.substring(3,8));
	      }else if(cb_Stipulation == "NAME_KOR"){
	    	  arguments[2].setExValue(params.NAME_KOR);
	      }else if(cb_Stipulation == "SACRED_KOR"){
	    	  arguments[2].setExValue(params.SACRED_KOR);
	      }else if(cb_Stipulation == "TELNO"){
	    	  arguments[2].setExValue(params.TEL_NO_RENDER);
	      }else if(cb_Stipulation == "MOBILE_TELNO"){
	    	  arguments[2].setExValue(params.MOBILE_TELNO_RENDER);
	      }else if(cb_Stipulation == "YOUNGGA"){
	    	  arguments[2].setExValue(params.DEATH_NAME_KOR)
	      }else if(cb_Stipulation == "CARD_NO"){
	    	  arguments[2].setExValue(params.CARD_NO)
	      }
	      arguments[3].setExValue(params.BUD_NO);
	      arguments[4].setExValue(params.BUD_NO);
	}
}


function isValidYear(yyyy) {
	var y = parseInt(yyyy,10);
	return (y >= 1900 && y <= 2050);
}

function isValidMonth(mm) {
	 var m = parseInt(mm,10);
	 return (m >= 1 && m <= 12);
}


function TimeConfirm(time){
	if(time.length < 4){
		return false;
	}else{
		firstClock 	= time.substring(0,1);
		secondClock = time.substring(1,2);
		firstMin 	= time.substring(2,3);
		secondMin 	= time.substring(3,4);

		if(firstClock > 2){
			return false;
		}else if(firstClock == 2){
			if(secondClock > 4){
				return false;
			}
		}else{
			if(firstMin>5){
				return false;
			}
		}
		return true;
	}
}

function gf_trim(str) {
	return (str.replace(/^\s+|\s+$/g , ''));
}


function gf_validateDateDS( me
						   ,row
		                   ,storeNm
		                   ,gridNm		                   
		                   ,index
		                   ,itemName){
	
	
	var record = me.getViewModel().getStore(storeNm).getAt(row);
	
	//console.log('gf_validateDateDS = ', record);
	
	
	var valid = ""; 
	try{
		var dateValue    = exCommon.getRepVal(record.get(index));
		var year  = dateValue.getFullYear();
		var month = dateValue.getMonth()+1;
		var day   = dateValue.getDate();
		
		if(month < 10){
			month = "0"+month;
		}
		
		if(day < 10){
			day = "0"+day;
		}
		valid =	gf_validateDate(year+""+month+""+day);
	}catch (e) {
		valid = (dateValue);
	}
	
		
	
	/* 0보다 작으면 오류이다. */
	if ( valid < 0 ) {
		var msg = itemName + " 항목이 올바른 날짜 값이 아닙니다.";
		switch (valid) {
			case -1 : /* 연도에 문제가 있는 경우. */
				msg = itemName + " 항목의 연도를 확인해 주십시오.";
				break;

			case -2 : /* 월에 문제가 있는 경우. */
				msg = itemName + " 항목의 월을 확인해 주십시오.";
				break;

			case -3 : /* 일에 문제가 있는 경우. */
				msg = itemName + " 항목의 일을 확인해 주십시오.";
				break;
		}

		
		me.lookupReference(gridNm).getView().select(row);
		
		setTimeout(function(){
			Ext.Msg.alert('알림',  msg);    				
		},50);
		
		return false;
	}
	
	return true;
}


function gf_validateDate(dateValue ,delim){
	
	/* 값이 넘어오지 않았으면 0을 돌려준다. */
	if ( dateValue == "" ) return 0;

	/* 구별자의 길이를 구한다.
	   뒤에서 연월일을 분리할 때 건너뛸 글자수로 사용된다. */
	var delimLength = 0;

	if ( delim != undefined && delim != null ) {
		delimLength = delim.length;
	}

	/* dateValue의 type이 문자열이 아닐 수 있으므로 문자열로 치환한다. */
	dateValue = gf_trim("" + dateValue);


	/* 연월일이 모두 입력되었는지 길이를 점검한다. */
	if ( dateValue.length != ( 8 + delimLength * 2 ) ) {
		return -4;
	}
	
	
	var startIndex = 0;
	var yearStr  = dateValue.substr(startIndex, 4);

	startIndex += 4 + delimLength;
	var monthStr = dateValue.substr(startIndex, 2);

	startIndex += 2 + delimLength;
	var dayStr   = dateValue.substr(startIndex, 2);

	/* 연도 값 점검. 숫자인가? */
	if ( isNaN(yearStr) ) return -1;
	/* 연도 값 점검. 양의 숫자인가? */
	var year = parseInt(yearStr, 10);
	if ( year <= 0 ) return -1;
	/* 월 값 점검. 숫자인가? */
	if ( isNaN(monthStr) ) return -2;
	/* 월 값 점검. 1 ~ 12 값인가? */
	var month = parseInt(monthStr, 10);
	if ( month < 1 || month > 12 ) return -2;
	/* 일 값 점검. 숫자인가? */
	if ( isNaN(dayStr) ) return -3;
	
	return 0;
	
}


function toDateForm(date , form){
	
	try{
		var year  = dateValue.getFullYear();
		var month = dateValue.getMonth()+1;
		var day   = dateValue.getDate();
		

		if(month < 10){
			month = "0"+month;
		}
		
		if(day < 10){
			day = "0"+day;
		}
		
		if(form == "" || form == undefined || form == null){
			form == "";
		} 
		return year + form + month + form + day;
	}catch (e) {
		return date;
	}
}

function getFullArea(area){
	var temp = area;
	
	try{
		if( temp.indexOf('부산 ') == 0 ){
			temp = temp.replace('부산', '부산광역시 ');
		}
		else if( temp.indexOf('충남 ') == 0 ){
			temp = temp.replace('충남 ', '충청남도 ');
		}
		else if( temp.indexOf('대구 ') == 0 ){
			temp = temp.replace('대구 ', '대구광역시 ');
		}
		else if( temp.indexOf('대전 ') == 0 ){
			temp = temp.replace('대전 ', '대전광역시 ');
		}
		else if( temp.indexOf('경기 ') == 0 ){
			temp = temp.replace('경기 ', '경기도 ');
		}
		else if( temp.indexOf('경북 ') == 0 ){
			temp = temp.replace('경북 ', '경상북도 ');
		}
		else if( temp.indexOf('경남 ') == 0 ){
			temp = temp.replace('경남 ', '경상남도 ');
		}
		else if( temp.indexOf('인천 ') == 0 ){
			temp = temp.replace('인천 ', '인천광역시 ');
		}
		else if( temp.indexOf('전북 ') == 0 ){
			temp = temp.replace('전북 ', '전라북도 ');
		}
		else if( temp.indexOf('전남 ') == 0 ){
			temp = temp.replace('전남 ', '전라남도 ');
		}
		else if( temp.indexOf('강원 ') == 0 ){
			temp = temp.replace('강원 ', '강원도 ');
		}
		else if( temp.indexOf('울산 ') == 0 ){
			temp = temp.replace('울산 ', '울산광역시 ');
		}
		
	}catch (e) {
		return area;
	}
	return temp;
	
}

function find_addr(me , em_zip_cd , txt_addr1 , txt_addr3 , txt_bldg_num ,txt_addr2 , layer){
	var element_layer = document.getElementById(layer);
	
	 new daum.Postcode({
        oncomplete: function(data) {

            var fullAddr = data.address; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            if(data.userSelectedType === 'R'){
            	
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                fullAddr = data.roadAddress;
                
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
            }
            
            fullAddr = getFullArea(fullAddr);
            
            //document.getElementById(txt_addr1).value = fullAddr;
            me.lookupReference(txt_addr1).setExValue(fullAddr);
            
            var addrNm =  "(" + data.bname;
            if(data.buildingName != '' && data.buildingName != null && data.buildingName != undefined){
            	addrNm = addrNm + ","+data.buildingName
            }
            addrNm = addrNm + ")";
            
             me.lookupReference(em_zip_cd).setExValue(data.zonecode);             	 
        	 me.lookupReference(txt_addr3).setExValue(addrNm);
        	 me.lookupReference(txt_bldg_num).setExValue(data.buildingCode);
        	 me.lookupReference(txt_addr2).focus();
            
            element_layer.style.display = 'none';
        },
        width : '100%',
        height : '100%',
        maxSuggestItems : 5
    }).embed(element_layer);

    // iframe을 넣은 element를 보이게 한다.
    element_layer.style.display = 'block';

    // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
    initLayerPosition(element_layer);
}

function initLayerPosition(element_layer){
	var width = 1000; 
    var height = 600; 
    var borderWidth = 5; 

    // 위에서 선언한 값들을 실제 element에 넣는다.
    element_layer.style.width = width + 'px';
    element_layer.style.height = height + 'px';
    element_layer.style.border = borderWidth + 'px solid';
    // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
    element_layer.style.left  = '210px';
    element_layer.style.top  = '100px';
   // element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
   // element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
}

function closeDaumPostcode(){
	$('.find_addr_layer_pop').hide();
}  



/**
 *  숫자에 콤마찍기
 */

function NumberComma(amt){
	
	amt = (amt+'').split("");
	var revAmt = amt.reverse().join('');
	var comAmt = '';

	for (a=0;a<revAmt.length;a++){
		if(a%3 == 0 && a != 0) comAmt = comAmt+","+revAmt.charAt(a);
		else comAmt += revAmt.charAt(a);
	}
	comAmt = comAmt.split("");
	return comAmt.reverse().join('');
}



function gf_number2Hangeul( strNumber ){ 
   // strNumber = strNumber.replace(new RegExp(",", "g"), ""); 

	strNumber = strNumber.toString();

    var arrayAmt = new Array("일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십"); 
    var arraypos = new Array("", "십", "백", "천"); 
    var arrayUnit = new Array("", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정", "재", "극", "항하사", "아승기", "나유타", "불가사의", "무량대수"); 

    var pos = strNumber.length%4;                        //자리수 
    var len = (strNumber.length/4).toString(); 


    if( len.indexOf(".") > 0 ) 
        var unit = len.substring(0, len.indexOf("."));      //단위(0:일단위, 1:만단위...) 
    else 
        var unit = strNumber.length/4-1; 

  

    var korNumber = ""; 
    var op = 0; 

    for( i=0; i<strNumber.length; i++ ) 
    { 
        if(pos==0) pos=4; 
        var num = parseInt( strNumber.substring( i, i+1 ) ); 
        if( num != 0 ) 
        { 
            korNumber += arrayAmt[ num-1 ]; 
            korNumber += arraypos[ pos-1 ]; 
            op=1; 
        } 
        if(pos==1) 
        { 
            if(op==1) korNumber += arrayUnit[unit]; 
            unit--; 
            op = 0; 
        } 
        pos--; 
    } 
    


    if (korNumber.length==0 || korNumber.length==null ) 
        return  ""; 
    else 
        return korNumber ; 
} 