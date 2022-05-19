Ext.define('ExFrm.view.acc.acc004w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc004w_01',    
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
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, null);
    	},50);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', {group_cd : "IEGBN", v_group_cd : "IEGBN"}, null);
    	},80);
    	
    	
    	
    	me.onSelect();
    },
    dsKwanCallback : function(me, success, form, action){
		if( success && me.getViewModel().getStore('ds_kwan').getCount() > 0 ){
			me.lookupReference('acc004w_01_a').getView().select(0);
		}
    },
    onKwanSelection : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <= 0){
    			return;
    		}
    		
    		var params = {
	    		V_ACCT_GBN : exCommon.getReferVal(me, 'lc_acctGbn' , 1 )
	           ,V_IE_GBN   : exCommon.getReferVal(me, 'lc_iegbn'   , "I" )
	           ,V_KWAN     : record[0].get("KWAN")
	    	}
	    	
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_hang', '', params, me.dsHangCallback);
	    	},50);
    	}catch (e) {
			console.log('onKwanSelection = ', e);
		}
    	
    },
    dsHangCallback : function(me, success, form, action){
    	if( success && me.getViewModel().getStore('ds_hang').getCount() > 0 ){
			me.lookupReference('acc004w_01_b').getView().select(0);
		}
    },
    onHangSelection : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <= 0){
    			return;
    		}
    		
    		var selectedKwan = me.lookupReference('acc004w_01_a').getView().getSelectionModel().getSelection()[0];
    		
    		var params = {
	    		V_ACCT_GBN : exCommon.getReferVal(me, 'lc_acctGbn' , 1 )
	           ,V_IE_GBN   : exCommon.getReferVal(me, 'lc_iegbn'   , "I" )
	           ,V_KWAN     : selectedKwan.get("KWAN")
	           ,V_HANG     : record[0].get("HANG")
	    	}
    		
    		setTimeout(function(){
	    		me.callStore(me, 'ds_mok', '', params, me.dsMokCallback);
	    	},50);
    	}catch (e) {
    		console.log('onHangSelection = ', e);
		}
    },
    dsMokCallback : function(me, success, form, action){
    	if( success && me.getViewModel().getStore('ds_mok').getCount() > 0 ){
			me.lookupReference('acc004w_01_c').getView().select(0);
		}
    },
    onAdd : function(){
    	var me = this;
    	
    	
    	var selectedKwan = me.lookupReference('acc004w_01_a').getView().getSelectionModel().getSelection()[0];
    	var selectedMok  = me.lookupReference('acc004w_01_b').getView().getSelectionModel().getSelection()[0];
    	
    	var MOK   = 1;
    	var rowCnt = me.getViewModel().getStore('ds_mok').getCount();
    	
    	
    	if(rowCnt > 0){
    		
    		for(var i =0; i < rowCnt ; i++){
    			var MOK_NAME = me.lookupReference('acc004w_01_c').getStore().getAt(i).get("MOK_NAME");
    			
    			if(MOK_NAME == null || MOK_NAME == "" || MOK_NAME == undefined ){
    				
    				setTimeout(function(){
    					Ext.Msg.alert('알림', '계정명(목)은 필수 입력 사항입니다.');    				
    				},50); 
    				
    				me.lookupReference('acc004w_01_c').getView().select(i);
    				return false;
    			}
    		}// for
    		
    		var maxId = me.getViewModel().getStore('ds_mok').getAt(0).get("MOK");
    		
    		me.getViewModel().getStore('ds_mok').each(function(rec){
    			maxId = Math.max(maxId, rec.get('MOK'));
    		});
    		
    		MOK = parseInt(maxId) + 1;
    	}// if
    	
    	
    	var data  = {
    		  ACCT_GBN  : me.lookupReference('lc_acctGbn').getValue()
    		 ,IE_GBN    : me.lookupReference('lc_iegbn').getValue()
    	     ,KWAN      : selectedKwan.get("KWAN")
    	     ,KWAN_NAME : selectedKwan.get("KWAN_NAME")
    	     ,HANG      : selectedMok.get("HANG")
    	     ,HANG_NAME : selectedMok.get("HANG_NAME")
    	     ,MOK       : MOK
    	}
    	
    	
    	me.getViewModel().getStore('ds_mok').add(data);
    	me.lookupReference('acc004w_01_c').getView().select(rowCnt);
    },
    onSelect : function(){
    	var me = this;
    	
    	var V_ACCT_GBN =  exCommon.getReferVal(me, 'lc_acctGbn' , 1 ); 
    	var V_IE_GBN   =  exCommon.getReferVal(me, 'lc_iegbn' , 'I' ); 
    	
    	var params = {
    		 V_ACCT_GBN : V_ACCT_GBN
    		,V_IE_GBN   : V_IE_GBN
    		,V_HANG     : 0
    		,V_MOK      : 0
    		,SQL_MODE   : 'S'
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan', '', params, me.dsKwanCallback);
    	},100);
    },
    onSave : function(){
    	var me = this;
    	
    	
    	var rowCnt = me.getViewModel().getStore('ds_mok').getCount();
    	
    	for(var i =0; i < rowCnt ; i++){
			var MOK_NAME = me.lookupReference('acc004w_01_c').getStore().getAt(i).get("MOK_NAME");
			
			if(MOK_NAME == null || MOK_NAME == "" || MOK_NAME == undefined ){
				
				setTimeout(function(){
					Ext.Msg.alert('알림', '계정명(목)은 필수 입력 사항입니다.');    				
				},50); 
				
				me.lookupReference('acc004w_01_c').getView().select(i);
				return false;
			}
		}// for
    	
    	exCommon.fnGridSaveAll(
       		 me
       		,'ds_mok'
       		,'newData'
       		,'uptData'
       		,'delData'
       		,'/asp/CodeSearch/mokSave.suvila'
       		,me.onSaveCallback
       	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_mok');
    	
    	if(success){
    		
    		var selectedKwan = me.lookupReference('acc004w_01_a').getView().getSelectionModel().getSelection()[0];
    		var selectedHang = me.lookupReference('acc004w_01_b').getView().getSelectionModel().getSelection()[0];
    		
    		var params = {
	    		V_ACCT_GBN : exCommon.getReferVal(me, 'lc_acctGbn' , 1 )
	           ,V_IE_GBN   : exCommon.getReferVal(me, 'lc_iegbn'   , "I" )
	           ,V_KWAN     : selectedKwan.get("KWAN")
	           ,V_HANG     : selectedHang.get("HANG")
	    	}
    		
    		setTimeout(function(){
	    		me.callStore(me, 'ds_mok', '', params, me.dsMokCallback);
	    	},50);
    		
    	}
    },
    
})