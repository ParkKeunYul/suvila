Ext.define('ExFrm.view.cms.cms001p_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cms001p_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	
    },
    onCalled:function(params){
        var me = this;
        me.callStore(me, 'ds_main', '', params, me.onCalledCallback)
    },
    onCalledCallback:function(me, success, records, operation){
    	console.log('onCalledCallback = ', success );
    }
   
})