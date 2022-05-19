Ext.define('ExFrm.view.acc.acc020w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc020w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){},
    loadState:[],
    loadStatePoP : function(me){
    	var row = me.loadState.length;
    	for(var i = 0; i<row ; i++){
    		me.loadState.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	console.log('today = ', today);
    	
    	me.lookupReference('em_sDate').setExValue(today);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, me.dsAcctCallback);
    	},50);
    	
    	me.setZero(me);
    },
    dsAcctCallback : function(me, success, form, action){
    	
    	var data = {
    		 "NAME"      : "전체"
    	    ,"CODE"      : "0"
    	};
   		me.getViewModel().getStore('ds_acctGbn').insert(0, data);
   		me.lookupReference('lc_acctGbn').setValue("0");
   		
   		setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', null, me.dsIeGbnCallback);
    	},50);
   		
    },
    dsIeGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_approval', '', null, null);
    	},50);
    },
    setZero : function(me){
    	
    	me.lookupReference('me_pAmount').setExValue(0);
    	me.lookupReference('me_iAmount').setExValue(0);
    	me.lookupReference('me_oAmount').setExValue(0);
    	me.lookupReference('me_tAmount').setExValue(0);
    	
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	me.setZero(me);
    	
    	var V_SACT_DATE  =  me.lookupReference('em_sDate').getExValue();
    	var DATE_GBN     =  me.lookupReference('sel_date_gbn').getExValue();
    	
    	
    	var flag = true;
    	
    	if(V_SACT_DATE.length > DATE_GBN){
    		V_SACT_DATE = V_SACT_DATE.substr(0,DATE_GBN);
    	}
    	
    	
    	if( V_SACT_DATE.length <  DATE_GBN  ){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_sDate').focus();
    		return;
    	}
    		
    	
    	var params = {
    		 V_SDATE     : V_SACT_DATE   	
    		,V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
    		,V_DATE_GBN  : me.lookupReference('sel_date_gbn').getExValue()
       	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		if( success ){
			
			me.lookupReference('acc020w_01_a').getView().select(0);
			
			if(me.getViewModel().getStore('ds_main').getCount()  == 0){
				return;
			}
			
			var params = {
	    		 V_SDATE     : me.lookupReference('em_sDate').getExValue()   	
	    		,V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
	    		,V_DATE_GBN  : me.lookupReference('sel_date_gbn').getExValue()
	       	};
	    	
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_change', '', params, me.dsChangeCallback);
	    	},50);
			
	    	var V_SACT_DATE  =  me.lookupReference('em_sDate').getExValue();
	    	me.lookupReference('SEARCH_DATE').setExValue( V_SACT_DATE );
	    	
		}
    },
    dsChangeCallback : function(me, success, form, action){
    	if( success && me.getViewModel().getStore('ds_change').getCount() > 0){
    		
    		var me_pAmount = new Number( me.getViewModel().getStore('ds_change').getAt(0).get("AMOUNT") );
    		
    		me.lookupReference('me_pAmount').setExValue( me_pAmount );
    		
    		
    		var me_iAmount = 0;
    		var me_oAmount = 0;
    		var me_tAmount = 0;
    		
    		for(var i = 0; i < me.getViewModel().getStore('ds_main').getCount() ; i++ ){
    			var record = me.getViewModel().getStore('ds_main').getAt(i);
    			
    			me_iAmount += new Number( record.get("I_AMOUNT") );
    			me_oAmount += new Number( record.get("O_AMOUNT") );
    		}// for
    		
    		me.lookupReference('me_iAmount').setExValue( me_iAmount );
    		me.lookupReference('me_oAmount').setExValue( me_oAmount );
    		me.lookupReference('me_tAmount').setExValue( me_pAmount + ( me_iAmount - me_oAmount)  );
    		
    	}
    },
    onDateField : function(){
    	var me = this;
    	
    	var DATE = me.lookupReference('em_sDate').getExValue();
    	var TYPE = me.lookupReference('sel_date_gbn').getExValue();
    	
    	if(TYPE == 8){
    		me.lookupReference('em_sDate').format = "Y-m-d";
    	}else if(TYPE == 6){
    		me.lookupReference('em_sDate').format = "Y-m";
    	}else{
    		me.lookupReference('em_sDate').format = "Y";
    	}
    	
    	me.lookupReference('em_sDate').setExValue(DATE);
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc020w_01_a');
    	
    	var em_sDate = me.lookupReference('em_sDate').getExValue();
    	var TYPE     = me.lookupReference('sel_date_gbn').getExValue();
    	
    	var M   = em_sDate.substr(0,4)+'년';
    	TITLE   = " 년 계 표";
    	
    	if(TYPE >= 6){
    		M = M + " " + em_sDate.substr(4,2) + "월";
    		TITLE   = " 월 계 표";
    	}
    	
    	if(TYPE == 8){
    		M = M + " " + em_sDate.substr(6,2) + "일";
    		TITLE   = " 일 계 표";
    	}
    	
    	var SUBTITLE = "이전 누적금액 - ["+NumberComma(me.lookupReference('me_pAmount').getExValue())
			+"]    수입 - ["+NumberComma(me.lookupReference('me_iAmount').getExValue())
			+"]    지출 - ["+NumberComma(me.lookupReference('me_oAmount').getExValue())
			+"]    누적금액 - ["+NumberComma(me.lookupReference('me_tAmount').getExValue())+"]";
    	
    	
    	
    	var baseData = {
    		 TITLE    : M + TITLE 
    		,SUBTITLE : SUBTITLE
    	}
    	
    	var jsonPrintData = [];
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		jsonPrintData.push(g_record.data);
    	}// for
    	
    	
    	jsonAllData = {
       		 "base" : baseData
       		,"list" : jsonPrintData
       	};
       	
       	var params = {
   			 FILE_PATH  : '/acc020w_01_excel.ozr' 
   			,PRINT_DATA : jsonAllData
       	};
     		
 		setTimeout(function(){
 			me.openPopup('ExFrm.view.com.print',  params, null);
    	},100);
    	
    },
    onPrint : function(){
    	var me = this;
    	
    	
    	if( me.getViewModel().getStore('ds_main').getCount() <= 0 ){
    		exCommon.msgAlert( '검색 후 작업하십시요.' );
    		return;
    	}
    	
    	var APPROVAL_TITLE = new Array("","","","","") ;
    	for(i=0; i<me.getViewModel().getStore('ds_approval').getCount(); i++){
			if(i>5){break;}
			APPROVAL_TITLE[i] = me.getViewModel().getStore('ds_approval').getAt(i).get("APPROVAL_TITLE");
		}
    	
    	var M            = '일';
    	var TYPE = me.lookupReference('sel_date_gbn').getExValue();
    	if(TYPE == 6){
    		M = '월';
    	}else if(TYPE == 4){
    		M = '년';
    	}
    	
    	
    	
    	var TITLE           = M + "    계    표";
    	var ACT_TITLE       = "기 준 " + M + " :";
    	var ACT_DATE        = me.inMakeDateFormat( me.lookupReference('SEARCH_DATE').getExValue()  );
    	var W_USER_NM       = exCommon.user.userName;
    	var TABLE_TITLE1    = '전 ' + M + ' 잔 고';
    	var TABLE_TITLE2    = '금 ' + M + ' 잔 고';
    	var C_AMOUNT        = NumberComma( me.lookupReference('me_pAmount').getExValue() );
    	var T_I_AMOUNT      = NumberComma( me.lookupReference('me_iAmount').getExValue() );
    	var T_O_AMOUNT      = NumberComma( me.lookupReference('me_oAmount').getExValue() );
    	var T_AMOUNT        = NumberComma( me.lookupReference('me_tAmount').getExValue() );
    	var SUB_TITLE2      = "2. " + (M == "일" ? "상세" : "계정과목별") + " 입출금 현황";
    	var APPROVAL_TITLE1 = APPROVAL_TITLE[0];
    	var APPROVAL_TITLE2 = APPROVAL_TITLE[1];
    	var APPROVAL_TITLE3 = APPROVAL_TITLE[2];
    	var APPROVAL_TITLE4 = APPROVAL_TITLE[3];
    	var APPROVAL_TITLE5 = APPROVAL_TITLE[4];
    	
    	
    	var baseData= {
    		 TITLE           : TITLE
    		,ACT_TITLE       : ACT_TITLE
    		,ACT_DATE        : ACT_DATE
    		,W_USER_NM       : W_USER_NM
    		,TABLE_TITLE1    : TABLE_TITLE1
    		,TABLE_TITLE2    : TABLE_TITLE2
    		,C_AMOUNT        : C_AMOUNT
    		,T_I_AMOUNT      : T_I_AMOUNT
    		,T_O_AMOUNT      : T_O_AMOUNT
    		,T_O_AMOUNT      : T_O_AMOUNT
    		,T_AMOUNT        : T_AMOUNT
    		,SUB_TITLE2      : SUB_TITLE2
    		,APPROVAL_TITLE1 : APPROVAL_TITLE1
    		,APPROVAL_TITLE2 : APPROVAL_TITLE2
    		,APPROVAL_TITLE3 : APPROVAL_TITLE3
    		,APPROVAL_TITLE4 : APPROVAL_TITLE4
    		,APPROVAL_TITLE5 : APPROVAL_TITLE5
    	}
    	
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var I_AMOUNT_TOT = 0;
    	var O_AMOUNT_TOT = 0;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var I_AMOUNT_VAL = NumberComma(g_record.get("I_AMOUNT"));
			var O_AMOUNT_VAL = NumberComma(g_record.get("O_AMOUNT"));
    		
			if(I_AMOUNT_VAL =='0' || I_AMOUNT_VAL == ''){
				I_AMOUNT_VAL = '';
			}
			
			if(O_AMOUNT_VAL =='0' || O_AMOUNT_VAL == ''){
				O_AMOUNT_VAL = '';
			}
			
			var REMARK = g_record.get("REMARK");
			
    		var subData = {
    			 MOK_NAME : g_record.get("MOK_NAME")
    			,REMARK   : REMARK
    			,I_AMOUNT : exCommon.getRepVal(I_AMOUNT_VAL, '')
    			,O_AMOUNT : exCommon.getRepVal(O_AMOUNT_VAL, '')			    			
    		};
    		    		
    		
    		I_AMOUNT_TOT += new Number( g_record.get("I_AMOUNT") );
    		O_AMOUNT_TOT += new Number( g_record.get("O_AMOUNT") );
    		
    		jsonPrintData.push(subData);
    		
    	}// for i
    	
    	var subDataEnd = {
    		 MOK_NAME : ''
    		,REMARK   : '합    계'
    		,I_AMOUNT : NumberComma( I_AMOUNT_TOT )
    		,O_AMOUNT : NumberComma( O_AMOUNT_TOT )
    	}
    	jsonPrintData.push(subDataEnd);
    	
    	
    	jsonAllData = {
    		 'base' : baseData
    		,'info' : jsonPrintData
    	};
    	
    	var params = {
 			 FILE_PATH  : '/acc020w_01_rp_main.ozr' 
 			,PRINT_DATA : jsonAllData
     	};
   		
   		setTimeout(function(){
   			me.openPopup('ExFrm.view.com.print',  params, null);
      	},100);
    },
    inMakeDateFormat : function(day){
    	
    	var rtnValue = "";
	    if(day.length ==4){
	    	rtnValue = day +"년 ";
	    }else if(day.length ==6){
	    	rtnValue = day.substring(0,4)+"년 " + day.substring(4,6) + "월";
	    }else if(day.length ==8){
	    	rtnValue = day.substring(0,4)+"년 " + day.substring(4,6) + "월 " + day.substring(6) + "일";
	    }
		return rtnValue;
    	
    }
})