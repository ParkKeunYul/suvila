Ext.define('ExFrm.view.acc.acc003w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc003w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){},
    loadState:[],
    loadStatePoP : function(me){
    	var row = me.loadState.length;
    	for(var i = 0; i<row; i++){
    		me.loadState.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	
    	me.lookupReference('em_sDate').setExValue(today);
    	me.lookupReference('em_eDate').setExValue(today);
    	
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, null);
    	},50);
    	
    	
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	
    	var V_ACT_DATE_01  =  me.lookupReference('em_sDate').getExValue();
    	var V_ACT_DATE_02  =  me.lookupReference('em_eDate').getExValue();
    	
    	var DATE_GBN     =  me.lookupReference('sel_date_gbn').getExValue();
    	
    	
    	var flag = true;
    	
    	if(V_ACT_DATE_01.length > DATE_GBN){
    		V_ACT_DATE_01 = V_ACT_DATE_01.substr(0,DATE_GBN);
    	}
    	if(V_ACT_DATE_02.length > DATE_GBN){
    		V_ACT_DATE_02 = V_ACT_DATE_02.substr(0,DATE_GBN);
    	}
    	
    	
    	if( V_ACT_DATE_01.length <  DATE_GBN  ){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_sDate').focus();
    		return;
    	}
    	
    	if( V_ACT_DATE_02.length <  DATE_GBN  ){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_eDate').focus();
    		return;
    	}
    		
    	
    	var params = {
    		 V_ACT_DATE_01  : V_ACT_DATE_01
    		,V_ACT_DATE_02  : V_ACT_DATE_02
    		,V_ACCT_GBN     : me.lookupReference('lc_acctGbn').getExValue()
    		,V_DATE_GBN     : me.lookupReference('sel_date_gbn').getExValue()
       	};
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_in', '', params, me.onSelectCallback);
    	},30);
    	
    	
    	
    },
	onSelectCallback : function(me, success, form, action){
		
		var V_ACT_DATE_01  =  me.lookupReference('em_sDate').getExValue();
    	var V_ACT_DATE_02  =  me.lookupReference('em_eDate').getExValue();
    	var DATE_GBN       =  me.lookupReference('sel_date_gbn').getExValue();
    	
    	if(V_ACT_DATE_01.length > DATE_GBN){
    		V_ACT_DATE_01 = V_ACT_DATE_01.substr(0,DATE_GBN);
    	}
    	if(V_ACT_DATE_02.length > DATE_GBN){
    		V_ACT_DATE_02 = V_ACT_DATE_02.substr(0,DATE_GBN);
    	}
		
		var params = {
    		 V_ACT_DATE_01  : V_ACT_DATE_01
    		,V_ACT_DATE_02  : V_ACT_DATE_02
    		,V_ACCT_GBN     : me.lookupReference('lc_acctGbn').getExValue()
    		,V_DATE_GBN     : me.lookupReference('sel_date_gbn').getExValue()
       	};
		
		setTimeout(function(){
    		me.callStore(me, 'ds_out', '', params, null);
    	},100);
		
    },
    
    onDateField : function(){
    	var me = this;
    	
    	var DATE  = me.lookupReference('em_sDate').getExValue();
    	var DATE2 = me.lookupReference('em_eDate').getExValue();
    	
    	
    	var TYPE = me.lookupReference('sel_date_gbn').getExValue();
    	
    	if(TYPE == 8){
    		me.lookupReference('em_sDate').format = "Y-m-d";
    		me.lookupReference('em_eDate').format = "Y-m-d";
    	}else if(TYPE == 6){
    		me.lookupReference('em_sDate').format = "Y-m";
    		me.lookupReference('em_eDate').format = "Y-m";
    	}else{
    		me.lookupReference('em_sDate').format = "Y";
    		me.lookupReference('em_eDate').format = "Y";
    	}
    	
    	me.lookupReference('em_sDate').setExValue(DATE);
    	me.lookupReference('em_eDate').setExValue(DATE2);
    },
    onExcelIn : function(){
    	var me = this;
    	var grid = me.lookupReference('acc003w_01_a');
    	exCommon.excelDown(grid, 'total', '세입통계',  me.getViewModel().getStore('ds_in').getCount());
    },
    onExcelOut : function(){
    	var me = this;
    	var grid = me.lookupReference('acc003w_01_b');
    	exCommon.excelDown(grid, 'total', '세출통계',  me.getViewModel().getStore('ds_out').getCount());
    },
    onSeriesTooltipRender: function (tooltip, record, item) {
    	
    	var me = this;
    	
    	
    	var store = me.getViewModel().getStore('ds_in');
    	
    	var per = me.getPer(me ,store , record);
    	console.log('per = ', per);
    	
        tooltip.setHtml(record.get('NAME') + '<br/>' + exCommon.setNumberFormat(record.get('AMOUNT')) + ' 원'+ "<br/>"+ per + "%");
    },
    onSeriesTooltipRenderOut: function (tooltip, record, item) {
    	var me = this;
    	
    	var store = me.getViewModel().getStore('ds_out');
    	
    	var per = new Number( record.get("PER") ).toFixed(2);
    	
        tooltip.setHtml(record.get('NAME') + '<br/>' + exCommon.setNumberFormat(record.get('AMOUNT')) + ' 원'+ "<br/>"+ per + "%");
    },
    getPer(me , store , record){
    	var tot = 0;
    	var val1 = 0;
    	
    	store.each(function(record){
    		var sub = 0;
    		try{
    			sub = parseInt( record.get("AMOUNT") );
    		}catch (e) {
    			sub = 0;
    		}
    		tot = tot + sub;
    	});
    	
    	try{
    		val1 = parseInt( record.get("AMOUNT") );
    	}catch (e) {
    		val1 = 0;
    	}
    	
    	var per = ( val1 / tot ) * 100;
    	return per.toFixed(2); 
    }
    
})