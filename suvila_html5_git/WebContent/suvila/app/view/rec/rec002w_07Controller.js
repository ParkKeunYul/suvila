Ext.define('ExFrm.view.rec.rec002w_07Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_07',
    onDestroy : function() {
    },
    onAfterRender:function(){
    	var me = this;
    	
    	var params = {
    		V_ACCPET_GBN : '2'
    	}
    	
    },
    onMenuChange : function(field, newValue, oldValue, options) {
    	var me = this;
    	me.lookupReference('content_manage').removeAll();
    	me.lookupReference('content_manage').add(Ext.create('ExFrm.view.rec.'+newValue.rdo_ApprovalGbn));
    },
    
})
