Ext.define('ExFrm.view.rec.rec002w_10Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_10',
    onDestroy : function() {
        console.log('onSearch0044422Des');
    },
    onAfterRender:function(){
    	var me = this;
    },
    onInit : function(){
    	var me = this;
    	console.log('onInit');
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_General', '', null ,me.dsGeneralCallback);
    	},50);
    },
    dsGeneralCallback : function(me, success, form, action){
    	me.lookupReference('rec002w_10_a').getView().select(0);
    }
    
})
