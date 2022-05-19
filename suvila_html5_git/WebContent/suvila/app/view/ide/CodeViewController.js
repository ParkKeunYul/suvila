Ext.define('ExFrm.view.ide.CodeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.codeview',
    calledByOther:function(param){
    	this.lookupReference('codeView').setExValue(param);
    }
});