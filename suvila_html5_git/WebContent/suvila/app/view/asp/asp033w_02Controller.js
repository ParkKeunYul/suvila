Ext.define('ExFrm.view.asp.asp033w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp033w_02',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('start_date').setExValue(today);
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeCd', '', null , me.dsTempleCallbak);
    	},50);
    },
    dsTempleCallbak : function(me, success, records, operation){
		var data ={
			 TEMPLE_CD : ''
			,TEMPLE_NM : '전체'
		}
		
		me.getViewModel().getStore('ds_templeCd').insert(0, data);
		
		
		me.lookupReference('lc_templeCd').setExValue('');
	},
	onTempleChange : function (){
    	var me = this;
    	 
    	
    	me.onSelect();
    },
	onSelect : function(){
    	var me = this;
    	
    	var param = {
    		 VV_TEMPLE_CD : me.lookupReference('lc_templeCd').getExValue()
    		,S_MONTH      : me.lookupReference('start_date').getExValue().substr(0,6)
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_month', '', param , me.dsMonthCallbak);
    	},50);
    },
    dsMonthCallbak : function(me, success, records, operation){
    	if(success){
    		me.lookupReference('rec033w_02_a').getView().select(0);
    		me.getViewModel().getStore('ds_day').removeAll();
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		var selection = me.lookupReference('rec033w_02_a').getView().getSelectionModel().getSelection()[0];
    		

    		var params = {
    			 S_MONTH    : selection.get("APP_MONTH")
    			,S_TEMPLE   : selection.get("TEMPLE_CD")
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_day', '', params ,me.dsDayCallbak);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsDayCallbak : function(me, success, records, operation){
    	if(success){
    		me.lookupReference('rec033w_02_b').getView().select(0);
    	}
    },
    
})