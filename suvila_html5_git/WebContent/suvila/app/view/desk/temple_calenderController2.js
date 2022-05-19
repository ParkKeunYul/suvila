Ext.define('ExFrm.view.desk.temple_calenderController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.temple_calender',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    onHelp:function(){},
    onDestroy:function(me){},
    onInit:function(me){},
    onAfterRender:function(){
    	var me = this;
    	
    	var html  ='<table width="99%" border="1" cellpadding="0" cellspacing="1" class="table_line">';
    		html +='	<tr height="30">';
    		html +=' 		<td class="table_title_center" width="14.2%" style="text-align:center;font-weight:700;"><font color="red" id="temple_one">일</font></td>';
    		html +=' 		<td class="table_title_center" width="14.2%" style="text-align:center;font-weight:700;">월</td>';
    		html +=' 		<td class="table_title_center" width="14.2%" style="text-align:center;font-weight:700;">화</td>';
    		html +=' 		<td class="table_title_center" width="14.2%" style="text-align:center;font-weight:700;">수</td>';
    		html +=' 		<td class="table_title_center" width="14.2%" style="text-align:center;font-weight:700;">목</td>';
    		html +=' 		<td class="table_title_center" width="14.2%" style="text-align:center;font-weight:700;">금</td>';
    		html +=' 		<td class="table_title_center" width="14.2%" style="text-align:center;font-weight:700;"><font color="blue">토</font></td>';
    		html +=' 	</tr>';
    		
    		for(var a=1;a<=6;a++){
    			html +='<tr style="height: 121px;"> ';
    			for(var b=1;b<=7;b++){
    				html +='<td class="table_data2"  valign="top" style="height: 121px;"> ';
    				html +='	<table style="width: 99%;min-width: 154px;"  border="0" cellpadding="0" cellspacing="1" >';
    				html +='		<tr  style="height: 15px;vertical-align: top;">';
    				html +='			<td id="td_month'+a+''+b+'" width="12" align="right" valign="top"></td>';
    				html +='			<td id="td_event'+a+''+b+'" width="105" style="font-size: 8pt;" valign="top"></td>';
    				html +='		</tr>';
    				html +='		<tr style="height: 100px;">';
    				html +='			<td colspan="2">';
    				html +='				<table width="98%" border="0" cellpadding="0" cellspacing="0">';
    				html +='					<tr style="height: 99px;">';
    				html +='						<td align="left" style="min-width: 135px;width: 90%;max-width: 90%;" valign="top" ></div>';
    				html +='							<div class="div_bt" id="div_bt'+a+''+b+'" style="display:none;cursor:pointer;font-weight: bold;font-size: 11;padding-top:1px;" OnClick="on_schedulePopup2('+a+''+b+',\'R\')"   ></div>';
    				html +='							<div class="div_jesa" id="div_jesa'+a+''+b+'" style="font-weight: bold;color: blue;font-size: 11;cursor:pointer;padding-top:1px;"></div>';
    				html +='						</td>';
    				html +='						<td  align="right" id="td_minus'+a+''+b+'" style="min-width: 10px;width: 10%;font-size:8pt; padding-right: 3px; color:green;text-align: right;" valign="bottom" ></td>';
    				html +='					</tr>';
    				html +='				</table>';
    				html +='			</td>';
    				html +='		</tr>';
    				html +='	</table>';
    				html +='</td>';    				
    			}// for b    			
    			html +='</tr>';
    		}// for a
    	    html +='</table>';
    	    
    	$('#calender_area').html(html);
    	
    	//console.log( $('#temple_one').html() );
    	me.onSelect();
    },
    dsBudhisAllCallback : function (me, success, records, action){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_buddhismSelect', '', null ,me.dsBudhisSelectCallback);
    	},50);
    	    	
    },
    dsBudhisSelectCallback  : function (me, success, records, action){
    	//me.onSelect();
    },
    onSelect : function(){
    	var me = this;
    	
    	var params ={
    		 V_YEAR : '2019'
    		,V_MONTH: '12'
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_calender', '', null ,me.dsCalenderCallback);
    	},50);
    },
    dsCalenderCallback  : function (me, success, records, action){
    	/*
    	for(var a=1;a<=6;a++){
			for(var b=1;b<=7;b++){
				eval("td_month"+a+b).innerText = "";
				eval("td_event"+a+b).innerText = "";
				eval("img_bt"+a+b).style.display = "none";
				eval("div_bt"+a+b).style.display = "none";
				eval("div_jesa"+a+b).style.display = "none";
				$("#div_bt"+a+b).html("");
				$("#div_jesa"+a+b).html("");
				eval("td_month"+a+b).style.color = "#555555";
				eval("td_minus"+a+b).innerText = "";
			}
		}
    	*/
    	var Row = me.getViewModel().getStore('ds_calender').getCount();
    	
    	console.log('Row = ', Row);
    	
    	for(var row = 1; row <= Row; row++){
    		var record = me.getViewModel().getStore('ds_calender').getAt(row);
    		
    		if(record == null){
    			return false;
    		}
    		
    		
    		var WEEKDAY =exCommon.getRepVal( record.get("WEEKDAY") , '');
    		
    		eval("td_month"+ WEEKDAY).innerText = record.get("DAY");
    		
    		/* 휴일 여부 보여주기 */
			if( record.get("ETC2") == "H"){
				eval("td_month"+WEEKDAY).style.color = "red";
			}else if(record.get("ETC2") == "S"){
				eval("td_month"+ WEEKDAY).style.color = "blue";
			}
			
			eval("td_event"+ WEEKDAY).innerText = exCommon.getRepVal( record.get("BUD_EVENT_NAME"), '');
    		
			if(record.get("MINUS_DISPLAY_YN") == "T"){
				var mMonth = record.get("MINUS_YYYYMMDD").substring(4,6).toString();
				var mday   = record.get("MINUS_YYYYMMDD").substring(6,8).toString();
				
				eval("td_minus"+ WEEKDAY).innerText = parseInt(mMonth,10) + '/' + parseInt(mday,10);
			}
			
			/* 일정 등록 여부 보여주기 */
			var cnt     = 1;
			var cutCnt  = 11; //보여주는 제한겟수 
			var textCnt = 9;
			if(record.get("MEMO_COUNT") > 0){
				
				var sc =  record.get("TITLE");
				    sc = sc.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"");
				
				 var array = sc.split('<br/>');
				
				 var word ="";// "&lt; 메모 &gt; <br/>";
				 for(var wo = 0 ; wo< array.length-1 ; wo++){
						word +=  array[wo].length > textCnt ?  (wo+1)+"."+ array[wo].substring(0,textCnt)+".<br/>"   : (wo+1)+"."+array[wo]+"<br/>";
						cnt++;
				 }
				$('#div_bt'+WEEKDAY).html( word );
				$('#div_bt'+WEEKDAY).show();
			}
			
			/* 제사일정 보여주기*/
			var JESA = exCommon.getRepVal(record.get("JESA"), '');
			if( JESA != '' & cnt <=  cutCnt ){
				var word = "";//"&lt; 제사일정 &gt;<br/>";
				var sc = JESA;
			    	sc = sc.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"");
			    var array = sc.split('<br/>');
			    for(var wo = 0 ; wo< array.length-1 ; wo++){
			    	word += "<a href='#none' onClick='on_schedulePopup(\""+WEEKDAY+"\",\"R\",\""+wo+"\")'>";
					word +=  array[wo].length > textCnt+6 ?  array[wo].substring(0,textCnt+6)+".<br/></a>"   : (wo+1)+"."+array[wo]+"<br/></a>";
					cnt++;
				 }
				$('#div_jesa'+WEEKDAY).html( word );
				$('#div_jesa'+WEEKDAY).show();
			}
    	}// for row
    },
    onClick : function(){
    	var me = this;
    	console.log(222222222222);
    }
});
function on_schedulePopup2(code ,key){
	console.log('code = ', code);
	console.log('key', key);
	
	this.onClick();
	
	//console.log(me.getViewModel().getStore('ds_calender').getAt(code));
};


