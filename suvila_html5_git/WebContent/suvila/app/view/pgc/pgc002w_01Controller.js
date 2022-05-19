Ext.define('ExFrm.view.pgc.pgc002w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.pgc002w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	
    },   
    onInit:function(me){
    	var nowDate = exCommon.getNowDate();
    	
    	
    	me.lookupReference('from_date').setExValue(nowDate);
    	me.lookupReference('to_date').setExValue(nowDate);
    	me.lookupReference('In_date').setExValue(nowDate);
    	
    	console.log('exCommon.user.searchGbn', exCommon.user.searchGbn);
    	me.lookupReference('sel_BudSearchGbn').setExValue(exCommon.user.searchGbn);
    	
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		PGCODE : "01" 
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_main'   , '', params, me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, records, operation){
    		
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSindoSearch();
    	}
    },
    onSindoSearch : function(){
    	var me = this;
    	
    	var params = {
    		 V_SEARCH_GBN : me.lookupReference('sel_BudSearchGbn').getExValue( )
    		,V_SEARCH_WORD  : me.lookupReference('txt_stipulation').getExValue( )
    	};
    	
    	this.openPopup('ExFrm.view.com.sindo',  params, this.onSindoSearchReceive);
    },
    onSindoSearchReceive : function(params, me){
    	
    	var sel_BudSearchGbn = me.lookupReference('sel_BudSearchGbn').getExValue( );
    	var txt_stipulation  = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_budNo      = me.lookupReference('txt_budNo').getExValue( );
    	
    	gf_SetBudFind(params, sel_BudSearchGbn, txt_stipulation, txt_budNo , me);
    	
    	
    },
    onChange : function (){
    	var me  = this;
    	
    	me.lookupReference('txt_stipulation').focus();
    },
    onSelectCard : function(){
    	var me = this;
    	
    	 var strPart      = me.lookupReference('exRadioGroup').getValue() ;
    	 var strFrom_DATE = me.lookupReference('from_date').getExValue() ;
         var strTo_DATE   = me.lookupReference('to_date').getExValue() ;
         var strBud_no    = me.lookupReference('txt_budNo').getExValue() ;
         var strIn_DATE   = me.lookupReference('In_date').getExValue() ;
         
         
    	 
    	 var params = {
    		  PART          : strPart
    		 ,BUD_NO        : strBud_no
    		 ,FROM_SUB_DATE : strFrom_DATE
    		 ,TO_SUB_DATE   : strTo_DATE
    		 ,IN_DATE       : strIn_DATE
    	 };
    	setTimeout(function(){
    		me.callStore(me, 'ds_main'   , '', params, me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, records, operation){
    	if(success && records.length > 0){
    		me.lookupReference('pgc002w_01_a').getView().select(0);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		var params = {
    			 AUTHCODE : record[0].get("PGAUTHCODE")
    			,PGCODE   : record[0].get("PGCODE")
	    	};
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_detail', '', params, null);    		
	    	},10);
    	}catch(Exception){}
    },
    onExcelCard : function(){
    	var me  = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	var grid   = me.lookupReference('pgc002w_01_a');
    	
    	exCommon.excelDown(grid, '' , '카드결제현황' , rowCnt);    	
    	
    }
    
})