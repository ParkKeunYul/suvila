Ext.define('ExFrm.view.acc.acc019w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc019w_01',    
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
    
    	
    	me.loadState.push(1);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_sDate').setExValue(today.substr(0,4)+'0101');
    	me.lookupReference('em_eDate').setExValue(today);
    	
    	var params = {
    		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
    		,V_HANG     : "0"
    		,V_MOK      : "0"
    	};
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, me.dsAcctGbnCallback);
    	},10);
    	
    	setTimeout(function(){
    	},1250);
    	
    },
    dsAcctGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', {group_cd : "IEGBN", v_group_cd : "IEGBN"}, me.dsIeGbnCallback);
    	},50);
    },
    dsIeGbnCallback : function(me, success, form, action){
    	var params = {
       		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
       		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
       		,V_HANG     : "0"
       		,V_MOK      : "0"
       	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan', '', params, me.kwanInitCallback);
    	},50);
    	
    	me.loadStatePoP(me);
    },
    kwanInitCallback : function(me, success, form, action){
    	
    	
    	if(success){
    		var kwanRecord = me.getViewModel().getStore('ds_kwan').getAt(0);
    		me.lookupReference('lc_kwan').setValue(kwanRecord.get("KWAN"));
    		
    		me.onKwanChange(true);
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var V_SACT_DATE  =  me.lookupReference('em_sDate').getExValue();
    	var V_EACT_DATE  =  me.lookupReference('em_eDate').getExValue();
    	
    	if(V_SACT_DATE.length == 8) V_SACT_DATE = V_SACT_DATE.substr(0,6);
    	if(V_EACT_DATE.length == 8) V_EACT_DATE = V_EACT_DATE.substr(0,6);
    	
    	if( V_SACT_DATE.length != 6  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_sDate').focus();
    		return;
    	}
    	if( V_EACT_DATE.length != 6  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_eDate').focus();
    		return;
    	}
    	
    	if( V_SACT_DATE.substr(0,4) != V_EACT_DATE.substr(0,4)  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색 시작월과 종료월은 년도가 같아야 합니다.');    				
			},50);
    		me.lookupReference('em_sDate').focus();
    		return;
    	}
    	
    	
    	var params = {
    		 V_SDATE     : V_SACT_DATE   	
    		,V_EDATE     : V_EACT_DATE
    		,V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN    : me.lookupReference('lc_iegbn').getExValue()
    		,V_KWAN      : me.lookupReference('lc_kwan').getExValue()
    		,V_HANG      : me.lookupReference('lc_hang').getExValue()
    		,V_MOK       : me.lookupReference('lc_mok').getExValue()
       	}
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		
    	if(success){
    		/*var cnt = me.getViewModel().getStore('ds_main').getCount();
    		var TOTAL = me.getViewModel().getStore('ds_main').getAt(cnt-1).get("TOTAL") ;
    		
    		me.lookupReference('txt_total').setExValue(TOTAL);*/
    		
    		
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
	       		me.callStore(me, 'ds_kwan', '', params, me.kwanInitCallback);
	       	},50);
    	}
    },
    onKwanChange : function(init){
    	var me = this;
    	
    	if(me.loadState.length == 0 || init){
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
    	
    	console.log('onKwanChangeCallback');
    	
    	if(success){
    		var kwanRecord = me.getViewModel().getStore('ds_hang').getAt(0);
    		me.lookupReference('lc_hang').setValue(kwanRecord.get("HANG"));
    		
    		
    		me.onHangChange();
    	}
    },
    onHangChange : function(){
    	var me = this;    	

    	console.log('onHangChange = ', me.loadState.length);
    	
    	if(me.loadState.length == 0){
    		var params = {
  	       		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
  	       		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
  	       		,V_KWAN     : me.lookupReference('lc_kwan').getExValue()
  	       		,V_HANG      : me.lookupReference('lc_hang').getExValue()
      	    };
       		setTimeout(function(){
   	       		me.callStore(me, 'ds_mok', '', params, me.onHangChangeCallback);
   	       	},50);
    	}
    },
    onHangChangeCallback : function(me, success, form, action){
    	if(success){
    		var dataMok = {
    			"MOK_NAME" : "전체"
    		   ,"MOK"      : "0"
   	    	};
    		
    		me.getViewModel().getStore('ds_mok').insert(0, dataMok);
    		me.lookupReference('lc_mok').setValue("0");
    	}
    },
    /*onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc019w_01_a');
    	exCommon.excelDown(grid, 'total', '계정별원장',  me.getViewModel().getStore('ds_main').getCount());
    },*/
    onExcel : function(){
    	var me = this;
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		jsonPrintData.push(g_record.data);
    	}// for
    	
    	
    	var baseData = {
      		TITLE : "계정별원장"   
      	}
    	
    	jsonAllData = {
        	 "list" : jsonPrintData
        	 ,"base" : baseData
        };
          	
      	var params = {
  			 FILE_PATH  : '/acc019w_01_excel.ozr' 
  			,PRINT_DATA : jsonAllData
      	};
    		
		setTimeout(function(){
			me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    	
    },
})