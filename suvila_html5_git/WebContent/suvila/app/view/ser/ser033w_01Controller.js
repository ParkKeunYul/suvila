Ext.define('ExFrm.view.ser.ser033w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.ser033w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	me.onSelect();
    },
    onSelect : function (){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', null ,null);
    	},50);
    },
    onSave : function (){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/ser/SER033W_01/save.suvila'
    		,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_main');
    }
    /*onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	try{
    		
    		console.log('onSelectionChange start 111' );
    		console.log('onSelectionChange start ' , record.length);
    		
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
    },    */   
})