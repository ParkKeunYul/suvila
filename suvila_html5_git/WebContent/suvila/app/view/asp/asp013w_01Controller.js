Ext.define('ExFrm.view.asp.asp013w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp013w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('smsSearchDate').setExValue(today);
    	me.lookupReference('cmsSearchDate').setExValue(today);
    	
    	setTimeout(function () {
    		$('.x-grid-row-summary').hide();
        }, 100);
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    	}
    	setTimeout(function(){},10);
    },
    smsSelect:function(){
        var me = this;
        
        
        var yyyyMm = me.lookupReference('smsSearchDate').getExValue();
        if(exCommon.checkValidation( me.lookupReference('smsSearchDate') ,'년월',true)){
        	if(yyyyMm.length > 6){
        		yyyyMm = yyyyMm.substr(0,6);
        	}
        	
        	var params = {
        			V_YYYYMM  : yyyyMm,
        			TR_MSG_GB : me.lookupReference('sel_TR_MSG_GB_Search').getExValue()
        	}
        	me.callStore(me, 'ds_SMS', '', params , me.dsSmsCallbak);
        }
    },
    dsSmsCallbak : function(me, success, records, operation){
    	var yyyyMm = me.lookupReference('smsSearchDate').getExValue();
        if(exCommon.checkValidation( me.lookupReference('smsSearchDate') ,'년월',true)){
        	if(yyyyMm.length > 6){
        		yyyyMm = yyyyMm.substr(0,6);
        	}
        	
        	var params = {
        			V_YYYYMM  : yyyyMm,
        			TR_MSG_GB : me.lookupReference('sel_TR_MSG_GB_Search').getExValue()
        	}
        	me.callStore(me, 'ds_SMS_summary','',  params , null);
        }
    },
    smsSelectCallback : function(me, success, records, operation){
    	var yyyyMm = me.lookupReference('smsSearchDate').getExValue();
    	if(yyyyMm.length > 6){
    		yyyyMm = yyyyMm.substr(0,6);
    	}
    	var params = {
    			V_YYYYMM  : yyyyMm,
    			TR_MSG_GB : me.lookupReference('sel_TR_MSG_GB_Search').getExValue()
    	}
    },
    smsSelectSummaryCallback : function(me, success, records, operation){
    	console.log('smsSelectSummaryCallback',success );
    	
    },
    selectedRecord:{},
    onCmsSearch : function (){
    	var me =this;
    	
    	var yyyyMm = me.lookupReference('cmsSearchDate').getExValue();
    	
    	if(exCommon.checkValidation( me.lookupReference('cmsSearchDate') ,'년월',true)){
    		if(yyyyMm.length > 6){
        		yyyyMm = yyyyMm.substr(0,6);
        	}
        	
        	var params = {
        			V_YYYYMM : yyyyMm
        	}
        	me.callStore(me, 'ds_CMS', '', params, me.onCmsSearchCallback , true , true);
    	}
    	
    },
    onCmsSearchCallback : function(me, success, records, operation){
    	
    	var rowCount = me.getViewModel().getStore('ds_CMS').getCount();    	
    	if(success && rowCount > 0){
    		$('.cmsGrid .x-grid-row-summary').show();
    	}else{
    		$('.cmsGrid .x-grid-row-summary').hide();
    	}
    },
    onCmsExcel : function(){
    	//onCmsExcel
    	var me = this;
    	var grid = me.lookupReference('asp013w_01_b');
    	
    	exCommon.excelDown(grid, 'SMS','SMS' ,  me.getViewModel().getStore('ds_CMS').getCount());
    },
    onSmsExcel : function(){
    	var me = this;
    	
    	var g_row         = me.getViewModel().getStore('ds_SMS').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_SMS').getAt(i);
    		jsonPrintData.push(g_record.data);
    	}// for
    	
    	
    	jsonAllData = {
        	  "list" : jsonPrintData
        	 ,TITLE  : 'SMS수수료  '+(me.lookupReference('smsSearchDate').getExValue()).substr(0,6)+'월'
        };
    	
    	
    	
      	var params = {
  			 FILE_PATH  : '/asp013w_01_excel.ozr' 
  			,PRINT_DATA : jsonAllData
      	};
    		
		setTimeout(function(){
			me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    }
    
    
})