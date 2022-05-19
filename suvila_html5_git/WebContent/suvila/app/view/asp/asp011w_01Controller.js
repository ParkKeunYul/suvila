Ext.define('ExFrm.view.asp.asp011w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp011w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    },   
    onInit:function(me){
    	me.lookupReference('em_date').setExValue( exCommon.getNowDate() );
    },
    onSelect : function(){
    	var me = this;
    	
    	var vdate = me.lookupReference('em_date').getRawValue().replace('/', '');
    	
    	var params = {
    		 V_DATE  : vdate
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main'   , '', params, null);
    	},10);
    },
    onSave : function(){
    	var me = this;
    	exCommon.fnGridSaveAll(me
				             ,'ds_main'
				             ,'addData'
				             ,'uptData'
				             ,'delData'
				             ,'/asp/asp011w_01/save.suvila'
				             , me.onSaveCallback);
    },
    onSaveCallback: function(me, success, form, action){
    }
    
})