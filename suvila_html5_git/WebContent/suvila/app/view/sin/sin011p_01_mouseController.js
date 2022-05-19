Ext.define('ExFrm.view.sin.sin011p_01_mouseController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin011p_01_mouse',
    onCalled:function(record){
        var me = this;
        
        //console.log('onCalled = ', record);
    },
    onInit:function(){},
    onAfterRender:function(){},
    onCheck : function(){
    	var me = this;    
    	
    	me.receiveTo(true , true);
    },
    onCancel : function(){
    	var me = this;    
    	
    	me.receiveTo(false , true);
    }
})