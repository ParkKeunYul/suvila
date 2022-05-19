Ext.define('ExFrm.view.cad.cad004w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cad004w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate());
    	me.lookupReference('em_eDate').setExValue(today);
    	me.lookupReference('em_sDate').setExValue(today);
    	
    },   
    onInit:function(me){
    	var me = this;
    	
    	var params = {
       		 V_KEYWORD  : ""
       		,V_CLASS_CD : ""
       	};
       	
       	setTimeout(function(){
       	},50);
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 V_NAME_KOR  : encodeURI(me.lookupReference('txt_keyword').getExValue())
      		,tb_Radio    : me.lookupReference('tb_Radio').getValue().tb_Radio
      		,em_sDate    : me.lookupReference('em_sDate').getExValue()
      		,em_eDate    : me.lookupReference('em_eDate').getExValue()
      	};
    	
    	console.log('params = ', params);
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_main', '', params, me.onSelectCallback)
       	},50);
    	
    },
    onSelectCallback : function (me, success, records, action){
    	if(success && records.length > 0){
    		me.lookupReference('cad004w_01_a').getView().select(0);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <= 0){
    			return;
    		}
    		me.lookupReference('ta_msg').setExValue( record[0].get("TR_MSG") );
    		
    	}catch (e) {
			console.log('e = ', e);
		}
    },
    onExcel : function (){
    	var me = this;
    	var grid = me.lookupReference('cad004w_01_a');
    	
    	exCommon.excelDown(grid, exCommon.getNowDateTime(),'SMS발송내역',  me.getViewModel().getStore('ds_main').getCount());
    },
    
    
    
})