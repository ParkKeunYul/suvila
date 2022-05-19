Ext.define('ExFrm.view.acc.acc009w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc009w_01',    
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
    	
    	
    	me.lookupReference('em_yyyy').setExValue(today);
    	
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', {group_cd : "IEGBN", v_group_cd : "IEGBN"}, me.dsIeCallback);
    	},100);
    	
    },
    dsIeCallback : function(me, success, form, action){
    	var params = {
       		 V_ACCT_GBN : '1'
       		,V_IE_GBN   : 'I'
       		,V_HANG     : "0"
       		,V_MOK      : "0"
       	};
       	
       	setTimeout(function(){
       		me.callStore(me, 'ds_kwan', '', params, me.kwanInitCallback);
       	},50);
    },
    kwanInitCallback : function(me, success, form, action){
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
    onSelect : function(){
    	var me = this;
    	
    	
    	var V_YEAR  =  me.lookupReference('em_yyyy').getExValue();
    	
    	if(V_YEAR.length > 4) V_YEAR = V_YEAR.substr(0,4);
    	
    	if( V_YEAR.length != 4  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_yyyy').focus();
    		return;
    	}
    	
    	
    	var params = {
    		 V_YEAR     : V_YEAR   	
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
    onKwanChange : function(){
    	var me = this;
    	
    	//console.log('onKwanChange = ', me.loadState.length);
    	
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
    onHangChange : function(){
    	var me = this;    	

    	console.log('onHangChange = ', me.loadState.length);
    	
    	if(me.loadState.length == 0){
    		
    	}
    },
    onHangChangeCallback : function(me, success, form, action){
    	if(success){
    		
    	}
    },
    onSave : function(){
    	var me = this;
    	
    	me.lookupReference('newData').setExValue("");
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	var jsonNewData = [];
    	
    	for(var i =0; i < rowCnt ; i++){
    		jsonNewData.push(me.lookupReference('acc009w_01_a').getStore().getAt(i).data);
    	}// for
    	
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			
    			me.lookupReference('newData').setExValue( Ext.encode(jsonNewData) );
    			
    			console.log('jsonNewData = ', me.lookupReference('newData').getExValue());
    			
    			
    			setTimeout(function(){
    				me.callForm(me, '/acc/ACC009W_01/save.suvila', me.onSaveCallback , false);
    			},10);	
    		}
    	});
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    },
    onEdit : function( ){
    	var me = this;
    	
    	/*var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	var tot_amount = 0;
    	for(var i =0; i < rowCnt ; i++){

    		var AMOUNT = me.lookupReference('acc009w_01_a').getStore().getAt(i).get("AMOUNT1");
    		if(AMOUNT == undefined || AMOUNT == "" || AMOUNT == null){
    			AMOUNT = 0;
    		}
    		
    		tot_amount  = tot_amount + new Number(AMOUNT);
    	} // for 
    	
    	console.log('tot_amount = ', tot_amount);*/
    	
    	me.getViewModel().getStore('ds_main').commitChanges();
    	
    },
    onPrint : function(){
    	var me = this;
    	
    	setTimeout(function(){
			Ext.Msg.alert('알림', ' 인쇄 준비중입니다.');    				
		},50);
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc009w_01_a');
    	
    	
    	
    	
    	var baseData = {
    		 TITLE    : '재무회계 '+me.lookupReference('em_yyyy').getRawValue()+'년도 예산'        		
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
   			 FILE_PATH  : '/acc009w_01_excel.ozr' 
   			,PRINT_DATA : jsonAllData
       	};
     		
 		setTimeout(function(){
 			me.openPopup('ExFrm.view.com.print',  params, null);
    	},100);
    	
    },
})