Ext.define('ExFrm.view.sin.sin001p_03_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_03_02',
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
    	console.log('onInit');
    	setTimeout(function(){
    		me.callStore(me, 'ds_sex_gbn', '', null ,null);
    	},310);
        
        setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', null ,null);
    	},610);
        
        setTimeout(function(){
    		me.callStore(me, 'ds_kibu', '', null ,me.dsKibuCallbak);
    	},910);
    },
    onCalled:function(array){
        var me = this;
        console.log('onCalled', array);
        
        me.loadStatePoP(me);
        var V_BOKWI_BUD_NO  = "";
        
        if(array.length > 0){
    		for(var i = 0; i< array.length ; i++){
    			
    			if(i == 0) V_BOKWI_BUD_NO  =  array[i].BUD_NO;
    			
    			var data = {
    				 BUD_NO   : array[i].BUD_NO
    				,NAME_KOR : array[i].NAME_KOR
    			}
    			me.getViewModel().getStore('ds_bokwi').add(data);
    		}
        }
        
        me.loadState.push(V_BOKWI_BUD_NO);
        me.lookupReference('lc_bokwi').setExValue(V_BOKWI_BUD_NO);
        
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
    	
    	var V_BOKWI_BUD_NO =  me.lookupReference('lc_bokwi').getExValue();
    	
    	 setTimeout(function(){
     		me.callStore(me, 'ds_main', '', {V_BOKWI_BUD_NO : V_BOKWI_BUD_NO} ,me.onSearchCallback);
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