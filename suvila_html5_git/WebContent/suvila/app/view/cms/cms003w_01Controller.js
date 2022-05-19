Ext.define('ExFrm.view.cms.cms003w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cms003w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	
    	var me = this;
    	
    	me.lookupReference('sel_BudSearchGbn').setExValue(exCommon.user.searchGbn);
    	
    	var nowDate = exCommon.getNowDate();
    	if(new Number( nowDate.substr(0,2) ) < 8 ){
    		me.lookupReference('em_sDate').setDateValue( exCommon.getDateAddDate(-7, null, nowDate ));
    	}else{
    		me.lookupReference('em_sDate').setDateValue( exCommon.getNowMonth() + "01"  );
    	}
    	me.lookupReference('em_eDate').setDateValue( nowDate );
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_payment_day_gbn', '', null, me.dsPayCallback);
    	},500);
    	
    },
    dsPayCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_rec', '', null, me.dsRecCallback);
    	},50);
    },
    dsRecCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_cms_amount_status', '', null, null);
    	},50);
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
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 V_BUD_NO        : me.lookupReference('hid_bud_no').getExValue()
    		,V_SDATE         : me.lookupReference('em_sDate').getExValue()
    		,V_EDATE         : me.lookupReference('em_eDate').getExValue()
    		,V_CMS_TRADE_CD  : me.lookupReference('lc_cms_trade_cd').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},100);
    	
    },
    onSelectCallback : function (me, success, records, action){
    	console.log('onSelectCallback', success);
    	console.log('onSelectCallback', records.length );
    	
    	if(success && records.length > 0){
    		me.lookupReference('cms003w_01_a').getView().select(0);
    	}
    	
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	console.log('onSelectionChange = ' , record.length);
    	try{
    		if(record.length> 0){
    			var params = {
    				 V_IF_REQUEST_DATE : record[0].get("IF_REQUEST_DATE")
    				,V_IF_TRAN_ID      : record[0].get("IF_TRAN_ID")
    				,V_IF_MEMBER_ID    : record[0].get("IF_MEMBER_ID")
    				,V_REQUEST_SEQ     : record[0].get("REQUEST_SEQ")
    			};
    			
    			console.log('onSelectionChange');
    			
    			setTimeout(function(){
    				console.log('111');
    	    		me.callStore(me, 'ds_detail', '', params, null)
    	    	},100);
    		}
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onExcel : function (){
    	var me = this;
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		jsonPrintData.push(g_record.data);
    	}// for
    	
    	
    	jsonAllData = {
        	 "list" : jsonPrintData
        };
          	
      	var params = {
  			 FILE_PATH  : '/cms003w_01_excel.ozr' 
  			,PRINT_DATA : jsonAllData
      	};
    		
		setTimeout(function(){
			me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
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
    onSearchBlur : function(m2, event, eOpts ){
    	console.log('onSearchBlur');
    	
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		//me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    
})