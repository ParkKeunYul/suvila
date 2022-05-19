Ext.define('ExFrm.view.sin.sin001p_03_000033Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_03_000033',
    loadState:[],
    loadStatePoP : function(me){
    	var length = me.loadState.length;
    	
    	for(var i = 0; i<length ; i++){
    		me.loadState.pop();
    	}
    },
    loadMode:[],
    loadModePoP : function(me){
    	var length = me.loadMode.length;
    	for(var i = 0; i< length ; i++){
    		me.loadMode.pop();
    	}
    },
    onCalled:function(params){
    	
    	
        var me = this;
        
        me.loadStatePoP(me);
        me.loadModePoP(me);
        
               
        
        setTimeout(function(){
    		me.callStore(me, 'ds_bokwi', '', {V_BUD_CODE : params.V_BUD_CODE} ,me.dsBokwiCallbak);
    	},10);


    },
    dsBokwiCallbak : function(me, success, form, action){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_bon_master', '', null ,me.dsSexGbnCallback);
    	},50);
    },
    dsSexGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', null ,me.dsLunarSolarCallback);
    	},50);
    },
    dsLunarSolarCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sex_gbn', '', null ,null);
    	},50);
    },
    onClose : function(){
    	var me = this;
    	
    	if(me.loadMode.length != 0){
    		me.receiveTo(null, false);
    	}
    	me.loadStatePoP(me);
    	me.loadModePoP(me);
    	me.getView().destroy();
    	
    	//me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	
    	if(me.loadMode.length != 0){
    		me.receiveTo(null, false);
    	}
    	me.loadStatePoP(me);
    	me.loadModePoP(me);
    	me.getView().destroy();
    	
    	//me.getView().destroy();
    },
    onDestroy:function(){
    	console.log('onDestroy');
    	var me = this;
    	if(me.loadMode.length != 0){
    		me.receiveTo(null, false);
    	}
    	me.loadStatePoP(me);
    	me.loadModePoP(me);
    	
    },
    onAfterRender:function(){
    	
    },
    onInit:function(me){
    	
    },
    onSearch : function(){
    	var me  = this;
    	
    	var DISPLAY    = me.lookupReference('lc_bokwi').getRawValue();
    	var findRecord = me.getViewModel().getStore('ds_bokwi').findRecord('NAME_CODE', DISPLAY, 0, false, true, true);
    	
    	var params = {
    		 V_BOKWI_BUD_NO : findRecord.get("BUD_NO")
    		,V_DEATH_GBN    : findRecord.get("CODE")
    	};
    	
    	setTimeout(function(){
     		me.callStore(me, 'ds_main', '', params ,me.onSearchCallback);
     	},10);
    },
    onSearchCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('sin001p_03_000033').getView().select(0);
    	}
    },
    onConfirm : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('sin001p_03_000033').getView().getSelectionModel().getSelection();
    	var rtn   = new Array();
    	
    	for(var i = 0; i < selection.length; i++){
    		rtn[i] = selection[i]
    	}// for i
    	
    	me.receiveTo(rtn, true);
    	
    }
})