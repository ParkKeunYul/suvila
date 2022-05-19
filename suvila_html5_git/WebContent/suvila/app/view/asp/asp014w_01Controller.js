Ext.define('ExFrm.view.asp.asp014w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp014w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    },   
    onInit:function(me){
    	
    	me.lookupReference('em_sDate').setDateValue( exCommon.getNowMonth()+"01" );
    	me.lookupReference('em_eDate').setDateValue( exCommon.getNowDate() );
    },
    onSelect:function(){
    	var me = this;
    	
    	var success_Yn = me.lookupReference('sel_successYn').getExValue();
    	var em_sDate   = me.lookupReference('em_sDate').getExValue();
    	var em_eDate   = me.lookupReference('em_eDate').getExValue();
    	var search_Gbn = me.lookupReference('sel_SearchGbn').getExValue();
    	var search_Txt = me.lookupReference('txt_find_Search').getExValue();
    	
    	var params = {
    		 success_Yn : success_Yn
    		,em_sDate   : em_sDate
   			,em_eDate   : em_eDate
   			,search_Gbn : search_Gbn
   			,search_Txt : search_Txt
    	};
    	
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_main', '', params, null);    		
       	},10);
    	
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSelect();
    	}
    },
    onExcel : function (){
    	var me = this;
    	var grid = me.lookupReference('asp014w_01_a');
    	
    	exCommon.excelDown(grid, exCommon.getNowDateTime(),'로그인현황',  me.getViewModel().getStore('ds_main').getCount());
    }
    
})