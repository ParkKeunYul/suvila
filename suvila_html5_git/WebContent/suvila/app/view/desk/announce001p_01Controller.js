Ext.define('ExFrm.view.desk.announce001p_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.announce001p_01',
    onCalled:function(param){
        var me = this;
        
        //console.log('announce001p_01 = ', param);
        
        
        me.lookupReference('txt_title').setExValue( param.TITLE )
        me.lookupReference('txt_date').setExValue( param.CRT_DATE )
        me.lookupReference('txt_contents').setExValue( param.CONTENTS )
        
    },
    onAfterRender:function(){
    	var me = this;
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },    
})