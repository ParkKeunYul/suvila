Ext.define('ExFrm.view.sin.sin001p_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_02',
    onCalled:function(params){
        var me = this;
        console.log('onCalled', params);
       
        var params = {
        	V_BUD_CODE_AFTER  : params.V_BUD_CODE
       	}
       	
       	setTimeout(function(){
       		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
       	},50);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success && me.getViewModel().getStore('ds_main').getCount() > 0){
    		me.lookupReference('sin001p_02_a').getView().select(0);
    	}
    },
    onCellDbClick : function(me , td , cellIndex , record , tr , rowIndex , e , eOpts ){
    	
        var params = {
        	V_BUD_CODE : record.get('BUD_CODE')
           ,V_BUD_NO   : record.get('BUD_NO')
        };
        this.receiveTo(params, true);
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	me.getView().destroy();
    }
    
})