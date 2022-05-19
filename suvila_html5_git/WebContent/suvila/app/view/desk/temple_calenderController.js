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
    onInit:function(me){
     	setTimeout(function(){
			me.callStore(me, 'ds_CalenderYear', '', null , me.dsCalYearCallback);    				
		},50);
    },
    dsCalYearCallback  : function (me, success, records, action){
    	if(success){
    		
    	}
    },
    onAfterRender:function(){
    	var me = this;
    	
    	
    	
    	//me.inInitDay(me);
    	
    	var nowDate  = new Date();
        var nowYear  = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth();
        nowMonth++;
        if(nowMonth < 10) nowMonth = '0'+ nowMonth;
        
    //    nowMonth = '11';
        
        me.lookupReference('me_year').setExValue( nowYear );
        me.lookupReference('me_month').setExValue( nowMonth );
    	
    	//me.onSelect();
    },
    inInitDay : function(me){
    	
    	
    	me.getViewModel().getStore('ds_info').removeAll();
    	
    	for(var a=1;a<=6;a++){
    		var ZERO = '';
    		var ONE  = '';
    		var TWO  = '';
    		var THR  = '';
    		var FOR  = '';
    		var FIVE = '';
    		var SIX  = '';
    		
    		var data ={
    			 NUM_1 : ''
    			,NUM_2 : ''
    			,NUM_3 : ''
    			,NUM_4 : ''
    			,NUM_5 : ''
    			,NUM_6 : ''
    			,NUM_7 : ''
    			,NUM_1_TEMP : 0
    	    	,NUM_2_TEMP : 0
    	    	,NUM_3_TEMP : 0
    	    	,NUM_4_TEMP : 0
    	    	,NUM_5_TEMP : 0
    	    	,NUM_6_TEMP : 0
    	    	,NUM_7_TEMP : 0
    	    	,NUM_1_DAY : ''
    			,NUM_2_DAY : ''
    			,NUM_3_DAY : ''
    			,NUM_4_DAY : ''
    			,NUM_5_DAY : ''
    			,NUM_6_DAY : ''
    			,NUM_7_DAY : ''
    		}
	    	me.getViewModel().getStore('ds_info').add( data );
    	}// for a
    },
    onSelect : function(){
    	var me = this;
    	
    	var params ={
    		 V_YEAR : me.lookupReference('me_year').getExValue( )
    		,V_MONTH: me.lookupReference('me_month').getExValue( )
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_calender', '', params ,me.dsCalenderCallback);
    	},50);
    },
    dsCalenderCallback  : function (me, success, records, action){
    	
    	me.inInitDay(me);
    	
    	var Row = me.getViewModel().getStore('ds_calender').getCount();
    	
    	console.log('Row = ', Row);
    	//Row = 2;
    	
    	var TEMP = 0;
    	var a_FRONT_F = 0;
    	var a_FRONT_B = 0;
    	for(var row = 0; row <  Row; row++){
    		var record = me.getViewModel().getStore('ds_calender').getAt(row);
    		
    		//console.log("record = ",record);
    		
    		if(record == null){
    			return false;
    		}
    		
    		var WEEKDAY          = exCommon.getRepVal( record.get("WEEKDAY") , '');
    		var DAY              = exCommon.getRepVal( record.get("DAY") , '');
    		var FRONT_F          = WEEKDAY.substr(0,1)-1;
    		var FRONT_B          = WEEKDAY.substr(1,1);
    		var BUD_EVENT_NAME   = exCommon.getRepVal( record.get("BUD_EVENT_NAME") , '');
    		var MINUS_DISPLAY_YN = exCommon.getRepVal( record.get("MINUS_DISPLAY_YN") , '');
    		var MINUS_YYYYMMDD   = exCommon.getRepVal( record.get("MINUS_YYYYMMDD") , '');
    	//	console.log( FRONT_F, ' <- >', FRONT_B);
    		var NUM = me.getViewModel().getStore('ds_info').getAt(FRONT_F).get("NUM_"+FRONT_B);
    		
    		
    		var TITLE       = exCommon.getRepVal( record.get("TITLE") , '');
    		var MEMO_COUNT  = record.get("MEMO_COUNT");
    		
    		
    		var html = '<div style="width:100%;height:112px;position: relative;">  \n';
    		
    		var top_html = '<div style="text-align:left;"> \n';
    		top_html+= DAY;
    		if(BUD_EVENT_NAME !=''){
    			top_html+= '<span style="display:inline-block;padding-left:5px;position: absolute; right:0px;">'+BUD_EVENT_NAME+'</span>  \n';
    		}
    		top_html+= '</div> \n';
    		
    		/* 일정 등록 여부 보여주기 */
    		var cal_html = '';
			var cnt      = 1;
			var cutCnt   = 11; //보여주는 제한겟수 
			var textCnt  = 9;
    		if(MEMO_COUNT > 0){
    			cal_html = '<div style="text-align:left;padding-top:3px;cursor: pointer;"> \n';
    			var sc = TITLE;
				    sc = sc.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"");
				
			    var array = sc.split('<br/>');
				
				var word ="";// "&lt; 메모 &gt; <br/>";
				for(var wo = 0 ; wo< array.length-1 ; wo++){
					word +=  array[wo].length > textCnt ?  (wo+1)+"."+ array[wo].substring(0,textCnt)+".<br/>"   : (wo+1)+"."+array[wo]+"<br/>";
					cnt++;
				}// for
    			cal_html+= word+ '</div>  \n';
    			
    			TEMP++;
    		}
    		    		    	
    		/* 제사일정 보여주기*/
    		var jesa_html = '';
			var JESA = exCommon.getRepVal(record.get("JESA"), '');
			if( JESA != '' & cnt <=  cutCnt ){
				jesa_html+='<div style="text-align:left;padding-top:3px;color:blue;cursor: pointer;"> \n';
				
				var word = "";//"&lt; 제사일정 &gt;<br/>";
				var sc = JESA;
			    	sc = sc.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, "\"");
			    var array = sc.split('<br/>');
			    for(var wo = 0 ; wo< array.length-1 ; wo++){
			    //	word += "<a href='#none' onClick='on_schedulePopup(\""+WEEKDAY+"\",\"R\",\""+wo+"\")'>";
					word +=  array[wo].length > textCnt+6 ?  array[wo].substring(0,textCnt+6)+".<br/></a>"   : (wo+1)+"."+array[wo]+"<br/>";
					word += '</a>';
					cnt++;
				 }
			    
			    jesa_html+= word+ '</div> \n';
			    
			    TEMP++;
			}else{
				jesa_html= '';
			}
			
			
			var L_HTML = "";
			if(MINUS_DISPLAY_YN =='T' ){
				L_HTML ='<div style="display:inline-block;padding-left:5px;color:green;position: absolute;right:0px;bottom:0px;">'+MINUS_YYYYMMDD.substr(0,4)+'/'+MINUS_YYYYMMDD.substr(4,2)+'</div> \n';
    		} 
			
			html += top_html + cal_html+ jesa_html+L_HTML +'</div> \n';
			
			//console.log(html)
			
    		me.getViewModel().getStore('ds_info').getAt( FRONT_F ).set("NUM_"+FRONT_B , html);
			me.getViewModel().getStore('ds_info').getAt( FRONT_F ).set("NUM_"+FRONT_B+"_TEMP" , TEMP);
			me.getViewModel().getStore('ds_info').getAt( FRONT_F ).set("NUM_"+FRONT_B+"_DAY" , DAY);
    		
			a_FRONT_F = FRONT_F;
			a_FRONT_B = FRONT_B;
			
    	}// for row
    	
    	
    	console.log('a_FRONT_B == ', a_FRONT_B);
    	if(a_FRONT_F == 4 && a_FRONT_B < 7){
    		//console.log('a_FRONT_B == ', a_FRONT_B);
    		var roop = parseInt(a_FRONT_B) + 1;
    		var html = '<div style="width:100%;height:112px;position: relative;">&nbsp; </div>\n';
    		for(var i = roop; i <=7 ; i++){
    		//	console.log('var i = ', i);
    			me.getViewModel().getStore('ds_info').getAt( 4 ).set("NUM_"+i , html);
    		}
    	}
    	
    	if(a_FRONT_F < 5){
    		var html = '<div style="width:100%;height:112px;position: relative;">&nbsp; </div>\n';
    		for(var i = 1; i <=7 ; i++){
    			me.getViewModel().getStore('ds_info').getAt( 5 ).set("NUM_"+i , html);
    		}
    	}
    	
    	
    	//me.onCellClick();
    },
    onCellClick : function(me2, td, cellIndex, record, tr, rowIndex, e, eOpts ){
    	var me = this;

    	var NUM = cellIndex+1;
    	/*
    	console.log('record = ', record);
    	console.log('NUM = ', NUM);
    	*/
    	var DAY = record.get("NUM_"+NUM+"_DAY" );
    	var CNT = record.get("NUM_"+NUM+"_TEMP" );
    	
    	if(DAY == '' || DAY == null || DAY == undefined){
    		return;
    	}
    	
    	console.log(DAY + " <-->", + CNT);

    	if(DAY<10){
    		DAY = "0"+DAY;
    	}
    	
    	
    	var params = {
    		 yyyy : me.lookupReference('me_year').getExValue( )
    		,mm   : me.lookupReference('me_month').getExValue( )
    		,day  : DAY
    	}
    	
    	me.openPopup('ExFrm.view.desk.announce001p_04',  params, me.popReceive);    	
    },
    popReceive : function(paramm, me){
    	console.log('popReceive = ');
    	
    	me.onSelect();
    	console.log('popReceive22 = ');
    },
    onChangeMonth : function (){
    	var me = this;
    
    	console.log('onChangeMonth');
    	
    	me.onSelect();
    },
    onDownYear : function(){
    	var me = this;
    	
    	var MIN_YEAR = parseInt(me.getViewModel().getStore('ds_CalenderYear').getAt(0).get("MIN_YEAR"));
    	var NOW_YEAR = parseInt(me.lookupReference('me_year').getExValue( ));
    	
    	if(MIN_YEAR > (NOW_YEAR -1) ){
    		return;
    	}
    	
    	me.lookupReference('me_year').setExValue( NOW_YEAR -1 );
    	
    	console.log('MIN_YEAR = ', MIN_YEAR);
    	me.onSelect();
    },
    onUpYear : function(){
    	var me = this;
    	
    	var MAX_YEAR = parseInt(me.getViewModel().getStore('ds_CalenderYear').getAt(0).get("MAX_YEAR"));
    	var NOW_YEAR = parseInt(me.lookupReference('me_year').getExValue( ));
    	
    	console.log('MAX_YEAR = ', MAX_YEAR);
    	
    	if(MAX_YEAR < (NOW_YEAR + 1) ){
    		return;
    	}
    	me.lookupReference('me_year').setExValue( NOW_YEAR +1 );
    	
    	me.onSelect();
    },
});



