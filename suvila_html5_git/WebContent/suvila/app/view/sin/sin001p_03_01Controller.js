Ext.define('ExFrm.view.sin.sin001p_03_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_03_01',
    onCalled:function(params){
        var me = this;
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy(); 
    },
    onConfirm : function(){
    	var me = this;
    	
    	var title = me.lookupReference('MangTab').activeTab.title;
    	var mang   = "";
    	var bok    = '';
    	var gender = '';
    	
    	var selection = "";
    	
    	if(title == "남"){
    		selection = me.lookupReference('acc001p_03_01_a').getView().getSelectionModel().getSelection();
    	}else{
    		selection = me.lookupReference('acc001p_03_01_b').getView().getSelectionModel().getSelection();
    	}
    	
    	
    	if(selection.length == 1){
    		mang    = selection[0].get("B");
    		bok     = selection[0].get("E");
    		gender  = selection[0].get("F");
    	}
    	
    	console.log(selection[0]);
    	
    	
    	var params = {
    		 DECE_REL       : mang
    		,BOKWI_KIBU_GBN : bok
    		,SEX_GBN        : gender
    	}
    	
    	me.receiveTo(params, true);
    },
    onTabChange : function(tappanel, panel){
    	var me = this;
    	
    	if(panel.title == "남"){
    	}else{
    	}
    }
    
})