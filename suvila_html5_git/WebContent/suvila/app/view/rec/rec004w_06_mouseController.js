Ext.define('ExFrm.view.rec.rec004w_06_mouseController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec004w_06_mouse',
    onCalled:function(records){
        var me = this;
    },
    onInit:function(){},
    onAfterRender:function(){},    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    unCheckClose : function(){
    	var me = this;
    	
    	this.receiveTo('F', true);
    },
    checkPrint : function(){
    	var me = this;
    	
    	this.receiveTo('T', true);
    }
})