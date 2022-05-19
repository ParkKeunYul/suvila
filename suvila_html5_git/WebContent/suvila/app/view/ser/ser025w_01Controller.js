Ext.define('ExFrm.view.ser.ser025w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.ser025w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate());
    	
    	me.lookupReference('me_AcceptSDate').setExValue(today);    	
    	me.lookupReference('me_AcceptEDate').setExValue(today);
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 V_ACCEPT_SDATE : me.lookupReference('me_AcceptSDate').getExValue()
    		,V_ACCEPT_EDATE : me.lookupReference('me_AcceptEDate').getExValue()
    		,V_ACCEPT_GBN   : me.lookupReference('lc_recKind').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_detail', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
    	
    	
    	if(success){
    		me.lookupReference('ser025w_01_a').getView().select(0);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	try{
    		if(record.length >= 1){
    			var params = {
	    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
	    			,V_SEQ        : record[0].get("SEQ")
	    		};
	    		setTimeout(function(){
	        		me.callStore(me, 'ds_MisuAmt', '', params, null);
	        	},50);
    		}
    		
    	}catch (e) {
			console.log('e = ', e);
		}
    },
    beforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	console.log('beforeedit');
    	
    	console.log(context.rowIdx, me.lookupReference('ser025w_01_b').getStore().getAt(context.rowIdx).get("CRT_USER") );
    	
    	if(me.lookupReference('ser025w_01_b').getStore().getAt(context.rowIdx).get("CRT_USER") != undefined){
    		return false;
    	}
    },
    onExcelBot : function(){
    	var me = this;
    	var grid = me.lookupReference('ser025w_01_b');
    	
    	var selection = me.lookupReference('ser025w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	exCommon.excelDown(grid, 'Pay', '접수취소 납부내역('+selection.get("PROPOSAL_BUD_NM")+')',  me.getViewModel().getStore('ds_MisuAmt').getCount());
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('ser025w_01_a');
    	    	
    	exCommon.excelDown(grid, 'list', '접수취소 내역',  me.getViewModel().getStore('ds_detail').getCount());
    },
    onRecover : function(){
    	var me = this;
    	
    	var cnt = exCommon.ChangeCount('ds_detail' , me);
    	
    	if(cnt > 0){
    		exCommon.fnGridSaveAll(
	    		  me
	    		,'ds_detail'
	    		,'newData'
	    		,'uptData'
	    		,'delData'
	    		,'/ser/SER025w_01/recReturn.suvila'
	    		,me.onRecoverCallback
	    	);
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '복원할 접수를 최소 1개이상 선택하세요.');
    		},50);
    	}
    },
    onRecoverCallback : function(me, success, records, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_detail');
    	if(success){
    		me.onSelect();
    	}
    },
    /*
    onCheckFalse : function(model, record, index){
    	record.set("SEL_YN", "F");
    },
    onCheckTrue : function(model, record, index){
    	record.set("SEL_YN", "T");
    },
    */
    
})