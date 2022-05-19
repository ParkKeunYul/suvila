Ext.define('ExFrm.view.cad.cad002p_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cad002p_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	var me = this;
    	
    	
    },
    
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onFindSindo();
    	}
    },
    onFindSindo : function(){
    	var me = this;
    	    	
    	var SEARCH_WORD  = me.lookupReference('txt_keyword').getExValue();
    	
    	if(SEARCH_WORD == null || SEARCH_WORD == ""){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '검색조건을 입력하세요.');
    		},50);
    		me.lookupReference('txt_keyword').focus();
    		return false;
    	}
    	
    	
    	var params = {
    		 V_CLASS_CD    : "0"
    		,V_KEYWORD     : encodeURI(me.lookupReference('txt_keyword').getExValue())
    	};
    	
    	me.callStore(me, 'ds_main', '', params, null);
    },
    onClose : function(){
    	var me = this;
    	
    	me.getView().destroy();
    },
    onReturn : function(){
    	
    	var me = this;
    	
    	var params = new Array();
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();

    	var q = 0;
    	
    	for(var i = 0; i < rowCount ; i++){
    		if( me.getViewModel().getStore('ds_main').getAt(i).get("CHECKP") == "T" ){
    			params[q] =  me.getViewModel().getStore('ds_main').getAt(i).data;
    			q ++;
    		}
    	}
    	
    	if(q > 0){
    		this.receiveTo( params , true);
    	}else{
    		me.getView().destroy();
    	}
    	
    },
    onDeSelect : function(model, record, index){
    	record.set("CHECKP", "F");
    },
    onSelect : function(model, record, index){
    	record.set("CHECKP", "T");
    },
     
})