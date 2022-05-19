Ext.define('ExFrm.view.sin.sin009w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin009w_01',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    onHelp:function(){},
    onDestroy:function(me){},
    onInit:function(me){},
    onAfterRender:function(){
    	var me = this;
    
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('txt_stipulation').focus();
    	
    	
    	var today = exCommon.getNowDate('');
    	
    	
    	me.lookupReference('em_sDate').setExValue(today);
    	me.lookupReference('em_eDate').setExValue(today);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_smsrec', '', null ,me.smsRecCallback);
    	},50);
    },
    smsRecCallback : function (me, success, records, action){
    	
    },
    smsDocCallback  : function (me, success, records, action){
    	me.lookupReference('sin009w_01_b').getView().select( 0 );
    	me.onSelect();
    	
    	
    	me.inSmsSetting();
    	
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onSelect : function (){
    	var me = this;
    	
    	var V_POST_TRANS = 0;
    	var V_DAEJU      = 0;
    	
    	var params = {
    		 V_SEARCH_GBN  : me.lookupReference('cb_Stipulation').getExValue()
    		,V_SEARCH_WORD : encodeURI(me.lookupReference('txt_stipulation').getExValue())
    		,lc_org_NmAll  : me.lookupReference('lc_org_NmAll').getExValue()
    		,tb_Radio      : me.lookupReference('tb_Radio').getValue().tb_Radio
    		,em_sDate 	   : me.lookupReference('em_sDate').getExValue()
    		,em_eDate      : me.lookupReference('em_eDate').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row > 0){
    			me.lookupReference('sin009w_01_a').getView().select(0);
    		}
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin009w_01_a');
    	    	
    	exCommon.excelDown(grid, 'sindoSms', '단체신도 명단',  me.getViewModel().getStore('ds_main').getCount());
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) {
    			return false;
    		}
    		
    		console.log('record = ', record[0].get("PHOTO"));
    		
    		me.lookupReference('tr_tr_msg').setExValue(record[0].get("TR_MSG"));
    		me.lookupReference('tr_tr_sendstat').setExValue(record[0].get("TR_SENDSTAT"));
    		
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onRadioClick : function (now, newValue, oldValue, eOpts ){
    	var me = this;
    	
    },
   
})


