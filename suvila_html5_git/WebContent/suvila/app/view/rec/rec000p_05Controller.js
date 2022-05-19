Ext.define('ExFrm.view.rec.rec000p_05Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_05',
    onCalled:function(params){
        var me = this;
        
        me.lookupReference('txt_daeju').setExValue(params.V_DAEJU);
        me.lookupReference('txt_bud_code').setExValue(params.V_BUD_CODE);
        
    },
    onInit:function(){
    	
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_rec', '', null ,me.dsAcceptCallback);
    	},50);
    },
    onAfterRender:function(){
    	
    	var me = this;
    	
    	me.onOneYear();
    	
    	setTimeout(function(){
    		me.onSelect();
    	},500);
    },
    dsAcceptCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_rec').getAt(0).set("NAME", "전체");
    		me.getViewModel().getStore('ds_rec').getAt(0).set("CODE", "0");
    		me.lookupReference('lc_rec').setExValue("0");
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var V_APPROVAL_GBN = exCommon.getRepVal(me.lookupReference('lc_approv').getExValue());
    	
    	var params = {
    		 V_BUD_NO       : me.lookupReference('txt_bud_code').getExValue()
    		,V_SDATE        : me.lookupReference('em_sDate').getExValue()
    		,V_EDATE        : me.lookupReference('em_eDate').getExValue()
    		,V_ACCEPT_GBN   : me.lookupReference('lc_rec').getExValue()
    		,V_APPROVAL_GBN : V_APPROVAL_GBN
    	}
    	
    	console.log('onSelect = ', params);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.dsMainCallback);
    	},50);
    },
    dsMainCallback : function(me, success, form, action){
    	
    	if(success){
    		
    	}
    	
    },
    onOneDay : function(){
    	
    	var me = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('em_sDate').setExValue(exCommon.getMinusDay(1));
    	me.lookupReference('em_eDate').setExValue(today);
    	
    },
    onOneYear : function(){
    	var me = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('em_sDate').setExValue( exCommon.getMinusDate(12) );
    	me.lookupReference('em_eDate').setExValue( today );
    	
    },
    onPrintBase : function(){
    	var me = this;
    	
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	var jsonListData  = [];
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	var A_AMOUNT = 0;
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var data  = {
    			 SUNAB_DATE      : exCommon.getRepVal(record.get("SUNAB_DATE"), '')
    			,ACCPET_NM       : exCommon.getRepVal(record.get("ACCPET_NM"), '')
    			,REC_DETAIL_NM   : exCommon.getRepVal(record.get("REC_DETAIL_NM"), '')
    			,AMOUNT  		 : exCommon.getRepVal(record.get("AMOUNT"), '0')+''
    			,PAYMENT_YYYYMM  : exCommon.getRepVal(record.get("PAYMENT_YYYYMM"), '')
    		}
    		jsonListData.push(data);
    		
    		
    		A_AMOUNT += parseInt( exCommon.getRepVal(record.get("AMOUNT"),'0') );
    		
    	}// for i
    	
    	
    	var USER_INFO   = '신도번호:'+me.lookupReference('txt_bud_code').getExValue() + ' 대표신도 : '+ me.lookupReference('txt_daeju').getExValue();
    	var SEARCH_DATE = '수납기간:'+ me.lookupReference('em_sDate').getRawValue() + ' ~ ' + me.lookupReference('em_eDate').getRawValue();
    	jsonPrintData = {
    		 USER_INFO   : USER_INFO
    		,SEARCH_DATE : SEARCH_DATE
    		,AMOUNT      : A_AMOUNT
    		,list        : jsonListData
    	}
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	
    	var params = {
 			 FILE_PATH  : '/rec000p_05_rp_print.ozr' 
 			,PRINT_DATA : jsonAllData
 		};
       	
       	setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    	
    	
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onExcel : function(){
    	var me = this;
    	
   		var grid = me.lookupReference('rec000p_05_a');
       	exCommon.excelDown(grid, 'receipt', '영수증',  me.getViewModel().getStore('ds_main').getCount());	
    	
    	
    },
})