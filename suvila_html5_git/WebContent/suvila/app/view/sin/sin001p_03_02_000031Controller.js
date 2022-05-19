Ext.define('ExFrm.view.sin.sin001p_03_02_000031Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_03_02_000031',
    loadState:[],
    loadStatePoP : function(me){
    	for(var i = 0; i<me.loadState.length ; i++){
    		me.loadState.pop();
    	}
    }, 
    onDestroy:function(){
    	var me = this;
    	me.loadStatePoP(me);
    },
    onInit:function(me){
       
    },
    onCalled:function(array){
        var me = this;
        console.log('onCalled', array);
        
        me.loadStatePoP(me);
        var VALUE  = "";
        
        if(array.length > 0){
    		for(var i = 0; i< array.length ; i++){
    			
    			if(i == 0) VALUE  =  array[i].VALUE;
    			
    			var data = {
    				 BUD_NO    : array[i].BUD_NO
    				,NAME_KOR  : array[i].NAME_KOR
    				,NAME      : array[i].NAME
    				,CODE      : array[i].CODE
    				,NAME_CODE : array[i].NAME_CODE
    				,VALUE     : array[i].VALUE
    			}
    			console.log(i+'data = ', data);
    			me.getViewModel().getStore('ds_bokwi').add(data);
    		}
        }
        
        me.loadState.push(VALUE);
        me.lookupReference('lc_bokwi').setExValue(VALUE);
        
        setTimeout(function(){
    		me.callStore(me, 'ds_sex_gbn', '', null ,me.dsSexGbnCallback);
    	},50);
        
    },
    dsSexGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', null ,me.dsLunarCallback);
    	},50);
    },
    dsLunarCallback : function(me, success, form, action){
    	 setTimeout(function(){
     		me.callStore(me, 'ds_kibu', '', null ,me.dsKibuCallbak);
     	},50);
    },
    dsKibuCallbak : function(me, success, form, action){
    	me.loadStatePoP(me);
    	me.onSearch();
    },
    onSearch : function(){
    	var me  = this;
    	
    	if(me.loadState.length != 0){
    		return;
    	}
    	
    	var array = me.lookupReference('lc_bokwi').getExValue().split('|||');
    	
    	var params = {
    		V_BOKWI_BUD_NO : array[0]
    	   ,V_DEATH_GBN    : array[1]
    	}
    	
    	 setTimeout(function(){
     		me.callStore(me, 'ds_main', '', params ,me.onSearchCallback);
     	},10);
    },
    onSearchCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('sin001p_03_02_a').getSelectionModel().selectAll();
    	}
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	
    	
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	var q        = 0;
    	var params   = new Array();
    	
    	for(var i = 0; i < rowCount ; i++){
    		if( me.getViewModel().getStore('ds_main').getAt(i).get("CHECKP") == "T" ){
    			params[q] =  me.getViewModel().getStore('ds_main').getAt(i).data;
    			q ++;
    		}
    	}
    	
    	if(q == 0){
    		me.getView().destroy();
    	}
    	me.receiveTo(params, true);
    },
    onCheckFalse : function(model, record, index){
    	record.set("CHECKP", "F");
    },
    onCheckTrue : function(model, record, index){
    	record.set("CHECKP", "T");
    },
    
})