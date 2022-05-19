Ext.define('ExFrm.view.sin.sin001p_03_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_03_03',
    onCalled:function(params){
        var me = this;
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	
    	var title = me.lookupReference('hangTab').activeTab.title;
    	var rtn = "";
    	
    	if(title == "남"){
    		rtn = me.lookupReference('man').getValue()[me.lookupReference('man').name];
    	}else{
    		rtn = me.lookupReference('woman').getValue()[me.lookupReference('woman').name];
    	}
    	
    	var params = {
    		HYO_REL : rtn
    	}
    	
    	me.receiveTo(params, true);
    },
    onTabChange : function(tappanel, panel){
    	var me = this;
    	
    	if(panel.title == "남"){
    		
    		console.log(me.lookupReference('woman').getValue());
    	}else{
    		console.log(me.lookupReference('man').getValue());
    	}
    }
    
})