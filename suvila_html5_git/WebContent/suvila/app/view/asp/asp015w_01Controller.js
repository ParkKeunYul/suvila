Ext.define('ExFrm.view.asp.asp015w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp015w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    },   
    onInit:function(me){
    	
    	var nowDate = exCommon.getNowDate();
    	if(new Number( nowDate.substr(0,2) ) < 8 ){
    		me.lookupReference('em_sDate').setDateValue( exCommon.getDateAddDate(-7, null, nowDate ));
    	}else{
    		me.lookupReference('em_sDate').setDateValue( exCommon.getNowMonth() + "01"  );
    	}
    	
    	me.lookupReference('em_eDate').setDateValue( nowDate );
    	
    	me.lookupReference('lc_org_NmAll').select(  me.getViewModel().getStore('ds_smsrec').getAt(0)  );
    },
    onSelect:function(){
    	var me = this;
    	
    	var em_sDate     = me.lookupReference('em_sDate').getExValue();
    	var em_eDate     = me.lookupReference('em_eDate').getExValue();
    	var sel_compGb   = me.lookupReference('sel_compGb').getExValue();
    	var sel_sendYn   = me.lookupReference('sel_sendYn').getExValue();
    	var sel_msgGb    = me.lookupReference('sel_msgGb').getExValue();
    	var sel_succesYn = me.lookupReference('sel_succesYn').getExValue();
    	var lc_org_NmAll = me.lookupReference('lc_org_NmAll').getExValue();
    	var lc_templeCd  = me.lookupReference('lc_templeCd').getExValue();
    	
    	var params = {
    		 em_sDate     : em_sDate
    		,em_eDate     : em_eDate
   			,sel_compGb   : sel_compGb
   			,sel_sendYn   : sel_sendYn
   			,sel_msgGb    : sel_msgGb
   			,sel_succesYn : sel_succesYn
   			,lc_org_NmAll : lc_org_NmAll
   			,lc_templeCd  : lc_templeCd
    	};
    	
    	
    	me.getViewModel().getStore('ds_main').removeAll();
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);    		
       	},10);
    	
    },
    onSelectCallback : function (me, success, records, operation){
    	if(success && records.length > 0){
    		me.lookupReference('asp015w_01_a').getView().select(0);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	if( record.length == 1){
    		me.lookupReference('txt_success').setExValue( record[0].get("TR_SENDSTAT") );
    		me.lookupReference('txt_msg').setExValue( record[0].get("TR_MSG") );
    	}
    },
    
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSelect();
    	}
    },
    onExcel : function (){
    	var me = this;
    	var grid = me.lookupReference('asp015w_01_a');
    	
    	exCommon.excelDown(grid, exCommon.getNowDateTime(),'문자발송현황',  me.getViewModel().getStore('ds_main').getCount());
    }
    
})