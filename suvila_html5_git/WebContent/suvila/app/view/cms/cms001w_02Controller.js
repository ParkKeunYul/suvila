Ext.define('ExFrm.view.cms.cms001w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cms001w_02',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	
    	var me = this;
    	
    	me.lookupReference('sel_BudSearchGbn').setExValue(exCommon.user.searchGbn);
    	
    	var params = {
    			
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, null)
    	},100);
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSindoSearch();
    	}
    },
    onSindoSearch : function(){
    	var me = this;
    	console.log('onSindoSearch');
    	exCommon.onSindoSearch(
    		 me.lookupReference('sel_BudSearchGbn')
    		,me.lookupReference('txt_stipulation')
    		,me
    		,me.onSindoSearchReceive
    	);
    },
    onSindoSearchReceive : function(params, me){
    	var sel_BudSearchGbn = me.lookupReference('sel_BudSearchGbn').getExValue( );
    	var txt_stipulation  = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_budNo        = me.lookupReference('hid_bud_no').getExValue( );
    	
    	
    	gf_SetBudFind(params, 
    			      me.lookupReference('sel_BudSearchGbn'), 
    			      me.lookupReference('txt_stipulation'), 
    			      me.lookupReference('hid_bud_no') );
    	
    	me.onSelect();
    },    
    onSelect : function(){
    	var me = this;
    	
    	if(me.lookupReference('txt_stipulation').getExValue() == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    	}
    	
    	var params = {
    		V_BUD_NO : me.lookupReference('hid_bud_no').getExValue()
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback)
    	},100);
    },
    onSelectCallback : function (me, success, records, action){
    	console.log('onSelectCallback', success);
    },
    onExcel : function (){
    	var me = this;
    	var grid = me.lookupReference('cms001w_02_a');
    	
    	exCommon.excelDown(grid, exCommon.getNowDateTime(),'CMS회원삭제현황',  me.getViewModel().getStore('ds_main').getCount());
    },
})