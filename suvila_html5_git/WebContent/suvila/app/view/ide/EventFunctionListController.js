Ext.define('ExFrm.view.ide.EventFunctionListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventfunctionlist',
	retMethod:{},
	openerObj:{},
    calledByOther:function(eventList,openerMethod,openerObj){
    	this.openerObj = openerObj
		this.retMethod = openerMethod;
		this.lookupReference('eventList').getStore().add(eventList);
    },  
    onSave:function(){
    	this.retMethod(
    		this.lookupReference('propName').getValue(),
    		this.lookupReference('propValue').getValue(),
    		this.openerObj);
    	this.getView().destroy();
    },
    onCancel:function(){
    	this.getView().destroy();
    },
    onSelectEventFunc:function(){
    	console.log(arguments);
    	retMethod('function(aaaa)', this.openerObj, this.retMethod);
    }
});