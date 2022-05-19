Ext.define('ExFrm.view.acc.acc026w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc026w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){},
    loadState:[],
    loadStatePoP : function(me){
    	for(var i = 0; i<me.loadState.length ; i++){
    		me.loadState.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_Month').setExValue(today);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, me.dsAcctCallback);
    	},50);
    	
    	
    },
    dsAcctCallback : function(me, success, form, action){
    	
    	var data = {
    		 "NAME"      : "전체"
    	    ,"CODE"      : "0"
    	};
   		me.getViewModel().getStore('ds_acctGbn').insert(0, data);
   		me.lookupReference('lc_acctGbn').setValue("0");
   		
   		setTimeout(function(){
    		me.callStore(me, 'ds_approval', '', null, null);
    	},50);
   		
    },
    onSelect : function(){
    	var me = this;
    	
    	var MONTH 		 =  me.lookupReference('em_Month').getExValue();
    	
    	if(MONTH.length > 6) MONTH = MONTH.substr(0,6);
    	
    	if( MONTH.length  != 6  ){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_Month').focus();
    		return;
    	}
    		
    	
    	var params = {
    		 V_MONTH      : MONTH   	
    		,V_ACCT_GBN   : me.lookupReference('lc_acctGbn').getExValue()
    		,V_TYPE       : 'bogo'
       	};
    	
    	console.log('params = ', params);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		if( success ){
			
		}
    },
    /*onPrint : function(){
    	var me = this;
    	
    	setTimeout(function(){
			Ext.Msg.alert('알림', ' 출력 준비중입니다.');    				
		},50);
    },*/
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
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i).data;
    		
    		g_record.APPROVAL_TITLE1  =  exCommon.getRepVal(APPROVAL_TITLE[0], '');
    		g_record.APPROVAL_TITLE2  =  exCommon.getRepVal(APPROVAL_TITLE[1], '');
    		g_record.APPROVAL_TITLE3  =  exCommon.getRepVal(APPROVAL_TITLE[2], '');
    		g_record.APPROVAL_TITLE4  =  exCommon.getRepVal(APPROVAL_TITLE[3], '');
    		g_record.APPROVAL_TITLE5  =  exCommon.getRepVal(APPROVAL_TITLE[4], '');
    		
    		jsonPrintData.push(g_record);
    		
    	}// for i
    	
    	jsonAllData = {       		
       		"info" : jsonPrintData
       	};
    	/*console.log(jsonAllData);
    	console.log( Ext.encode(jsonAllData) );*/
    	var params = {
 			 FILE_PATH  : '/acc021w_01_rp_print.ozr' 
 			,PRINT_DATA : jsonAllData
     	};
   		
   		setTimeout(function(){
   			me.openPopup('ExFrm.view.com.print',  params, null);
   		},100);
    },
})