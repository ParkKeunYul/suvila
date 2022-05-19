Ext.define('ExFrm.view.asp.asp044w_09Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp044w_09',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('me_AcceptSDateID').setExValue( exCommon.getMinusDay(15) );
		me.lookupReference('me_AcceptEDateID').setExValue( today );
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeCd', '', null , me.dsTempleCallbak);
    	},50);
    },
    dsTempleCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_09_a').getView().select(3);
    	}
    	setTimeout(function(){
    	},50);
	},
	
	onSelectionTemple : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		
    		var selection = me.lookupReference('asp044w_09_a').getView().getSelectionModel().getSelection()[0];
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('asp044w_09_a').getView().getSelectionModel().getSelection()[0];
    	
    	var params = {
    		 'V_ACCEPT_SDATE' : me.lookupReference('me_AcceptSDateID').getExValue()
    		,'V_ACCEPT_EDATE' : me.lookupReference('me_AcceptEDateID').getExValue()
    		,'VV_TEMPLE_CD'   : selection.get("TEMPLE_CD")
    		,'V_MENU'         : me.lookupReference('menu').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params , me.onSelectCallbak);
    	},50);
    },
    onSelectCallbak : function(me, success, form, action){
    	
    }
})