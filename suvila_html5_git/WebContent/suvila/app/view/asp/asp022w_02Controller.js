Ext.define('ExFrm.view.asp.asp022w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp022w_02',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	me.lookupReference('em_date').setExValue( exCommon.getNowDate() );
    	setTimeout(function () {
    		$('.x-grid-row-summary').hide();
        }, 100);
    },
    onSelect : function(){
    	var me = this;
    	
    	var vdate = me.lookupReference('em_date').getRawValue().replace('/', '');
    	
    	var params = {
    		YMDATE : vdate
    	};
    	
    	console.log('param', params);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main'   , '', params, me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, records, operation){
    	if(success && records.length > 0){
    		$('.x-grid-row-summary').show();
    	}else{
    		$('.x-grid-row-summary').hide();
    	}
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSelect();
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('asp022w_02_a');
    	exCommon.excelDown(grid, exCommon.getNowDateTime(),'카드수수료',  me.getViewModel().getStore('ds_main').getCount());
    	
    }
    
})