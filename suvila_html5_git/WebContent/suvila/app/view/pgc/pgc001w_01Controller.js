Ext.define('ExFrm.view.pgc.pgc001w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.pgc001w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	
    	setTimeout(function () {
    		me.onSelect();
        }, 10);
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		PGCODE : "01" 
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_main'   , '', params, me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, records, operation){
    	if(success && records.length > 0){
    		console.log('onSelectCallback',records ); 
    		
    		me.lookupReference('txt_REP_TRADE_ID').setExValue( records[0].get("REP_TRADE_ID") );
    		me.lookupReference('txt_TP_RATE_COMMISSION').setExValue( records[0].get("TP_RATE_COMMISSION") );
    		me.lookupReference('txt_accname').setExValue( records[0].get("ACCNAME") );
    	}else{
    		me.lookupReference('txt_REP_TRADE_ID').setExValue( "" );
    		me.lookupReference('txt_TP_RATE_COMMISSION').setExValue( "");
    		me.lookupReference('txt_accname').setExValue( "" );
    	}
    		
    },
    
})