Ext.define('ExFrm.view.rec.rec000p_04Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_04',
    onCalled:function(params){
        var me = this;
        
        var params = {
        	 V_JUNGAK_CD  : params.V_JUNGAK_CD
       		,V_LIGHTNO    : params.V_LIGHT_NO
       		,V_ACCEPT_GBN : params.V_ACCEPT_GBN
       		,V_JUNGAK_GBN : params.V_JUNGAK_GBN
       	}
       	
       	setTimeout(function(){
       		me.callStore(me, 'ds_Jungak', '', params ,null);
       	},50);
        
    },
    onInit:function(){},
    onAfterRender:function(){},
    onSelect : function(){
    	var me = this;
    	
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	
    	var params = {
    		 JUNGAK_CD : record.get("JUNGAK_CD")
    		,JUNGAK_NM : record.get("JUNGAK_NM")
    	};
    	
    	console.log( 'params = ', params );
    	
    	me.receiveTo(params , true);
    	
    }
})