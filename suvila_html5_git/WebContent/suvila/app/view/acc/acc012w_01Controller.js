Ext.define('ExFrm.view.acc.acc012w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc012w_01',    
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
    	for(var i = 0; i<row; i++){
    		me.loadState.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    
    	
    	me.loadState.push(1);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_sDate').setExValue(today);
    	me.lookupReference('em_eDate').setExValue(today);
    	
    	
    	var params = {
    		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
    		,V_HANG     : "0"
    		,V_MOK      : "0"
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan', '', params, me.kwanCallback);
    	},50);
    },
    kwanCallback : function(me, success, form, action){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, me.dsAccGbnCallback);
    	},50);
    	
    	if(success){
    		var data = {
	    		 "KWAN_NAME" : "전체"
	    	    ,"KWAN"      : "0"
	    	};
    		me.getViewModel().getStore('ds_kwan').insert(0, data);
    		me.lookupReference('lc_kwan').setValue("0");
    		
    		var dataHang = {
   	    		 "HANG_NAME" : "전체"
   	    	    ,"HANG"      : "0"
   	    	};
    		
    		me.getViewModel().getStore('ds_hang').removeAll();
    		me.getViewModel().getStore('ds_hang').insert(0, dataHang);
    		me.lookupReference('lc_hang').setValue("0");
    		
    	}
    	me.loadStatePoP(me);
    },
    dsAccGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_approval', '', null, null);
    	},50);
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var V_SACT_DATE  =  me.lookupReference('em_sDate').getExValue();
    	var V_EACT_DATE  =  me.lookupReference('em_eDate').getExValue();
    	
    	if( V_SACT_DATE.length != 8  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_sDate').focus();
    		return;
    	}
    	if( V_EACT_DATE.length != 8  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_eDate').focus();
    		return;
    	}
    	
    	
    	var params = {
    		 V_SDATE     : V_SACT_DATE   	
    		,V_EDATE     : V_EACT_DATE
    		,V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN    : me.lookupReference('lc_iegbn').getExValue()
    		,V_KWAN      : me.lookupReference('lc_kwan').getExValue()
    		,V_HANG      : me.lookupReference('lc_hang').getExValue()
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('acc012w_01_a').getSelectionModel().selectAll();
    		
    	}
    },
    onIegbnChange : function(){
    	var me = this;
    	
    	console.log('onIegbnChange = ', me.loadState.length);
    	
    	if(me.loadState.length == 0){
    		var params = {
	       		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
	       		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
	       		,V_HANG     : "0"
	       		,V_MOK      : "0"
	       	};
	       	
	       	setTimeout(function(){
	       		me.callStore(me, 'ds_kwan', '', params, me.kwanCallback);
	       	},50);
    	}
    },
    onKwanChange : function(){
    	var me = this;
    	
    	console.log('onKwanChange = ', me.loadState.length);
    	
    	if(me.loadState.length == 0){
    		var params = {
   	       		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
   	       		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
   	       		,V_KWAN     : me.lookupReference('lc_kwan').getExValue()
   	       	};
    		setTimeout(function(){
	       		me.callStore(me, 'ds_hang', '', params, me.onKwanChangeCallback);
	       	},50);
    	}
    },
    onKwanChangeCallback : function(me, success, form, action){
    	if(success){
    		
    		var dataHang = {
  	    		 "HANG_NAME" : "전체"
  	    	    ,"HANG"      : "0"
  	    	};
    		
    		me.getViewModel().getStore('ds_hang').insert(0, dataHang);
    		me.lookupReference('lc_hang').setValue("0");
    	}
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
    	
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var subData =g_record.data;
    		jsonPrintData.push(subData);
    		
    		if(i == 0){
    			baseData = subData;
    			baseData.APPROVAL_TITLE1 = exCommon.getRepVal(APPROVAL_TITLE[0], '');
    			baseData.APPROVAL_TITLE2 = exCommon.getRepVal(APPROVAL_TITLE[1], '');
    			baseData.APPROVAL_TITLE3 = exCommon.getRepVal(APPROVAL_TITLE[2], '');
    			baseData.APPROVAL_TITLE4 = exCommon.getRepVal(APPROVAL_TITLE[3], '');
    			baseData.APPROVAL_TITLE5 = exCommon.getRepVal(APPROVAL_TITLE[4], '');
    		}
    		
    	}// for
    	
    	jsonAllData = {
    		 "base" : baseData
    		,"info" : jsonPrintData
    	};
    	
    	var params = {
			 FILE_PATH  : '/acc012w_01_rp_print.ozr' 
			,PRINT_DATA : jsonAllData
    	};
  		
  		setTimeout(function(){
  			me.openPopup('ExFrm.view.com.print',  params, null);
     	},100);
    	
  	
    	
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc012w_01_a');
    	    	
    	
    	var baseData = {
    		 SDATE : " [기간] "+me.lookupReference('em_sDate').getRawValue()+" ~ "+me.lookupReference('em_eDate').getRawValue()
    		,TITLE : '기간별결산'
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
   			 FILE_PATH  : '/acc012w_01_excel.ozr' 
   			,PRINT_DATA : jsonAllData
       	};
     		
 		setTimeout(function(){
 			me.openPopup('ExFrm.view.com.print',  params, null);
    	},100);
    	
    },
    /*onCheckFalse : function(model, record, index){
    	record.set("CHECK_P", "F");
    },
    onCheckTrue : function(model, record, index){
    	record.set("CHECK_P", "T");
    },*/
})