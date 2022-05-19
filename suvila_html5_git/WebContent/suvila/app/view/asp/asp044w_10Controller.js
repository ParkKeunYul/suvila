Ext.define('ExFrm.view.asp.asp044w_10Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp044w_10',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('em_Sdate').setExValue( exCommon.getMinusDay(15) );
		me.lookupReference('em_Edate').setExValue( today );
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
    	},50);
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSelect();
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 'V_SDATE'  : me.lookupReference('em_Sdate').getExValue()
    		,'V_EDATE'  : me.lookupReference('em_Edate').getExValue()
    		,'V_SEARCH' : me.lookupReference('txt_search').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params , me.onSelectCallbak);
    	},50);
    },
    onSelectCallbak : function(me, success, form, action){
    	
    }
})