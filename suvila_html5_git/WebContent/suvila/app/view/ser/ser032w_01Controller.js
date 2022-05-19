Ext.define('ExFrm.view.ser.ser032w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.ser032w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate());
    	me.lookupReference('em_sDate').setExValue(exCommon.getMinusDay(30) );
    	me.lookupReference('em_eDate').setExValue(today);
    },
    addZero : function(i){
    	var rtn = i + 100;
    	return rtn.toString().substring(1,3);
    },
    onSelect : function(){
    	var me = this;
    	
    	var em_sDate = me.lookupReference('em_sDate').getExValue();
		var em_eDate = me.lookupReference('em_eDate').getExValue();

    	var dt    = new Date();
    	var now   = me.addZero((dt.getMonth()+1))+"/"+me.addZero(dt.getDate())+"/"+dt.getFullYear();
    	var newDt = new Date(now);
    	newDt.setMonth( newDt.getMonth() - 6 );
    	newDt.setDate( 1 );
    	
    	var monthSix = newDt.getFullYear() + ""+me.addZero((newDt.getMonth()+1)) + "" + me.addZero(newDt.getDate())
    	
    	if(new Number(monthSix) > new Number( em_sDate ) ){
    		Ext.Msg.alert('알림', '6개월이내의 문자 발송내역만 조회할수 있습니다.');
    		return;
    	}
    	
    	var params = {
       		 em_sDate : em_sDate
       		,em_eDate : em_eDate
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
    	
    	if(success){
    		me.lookupReference('ser032w_01_a').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('ser032w_01_a');
    	    	
    	exCommon.excelDown(grid, 'SMS', '문자발송 건수',  me.getViewModel().getStore('ds_main').getCount());
    },
    /*onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	try{
    		
    		console.log('onSelectionChange start 111' );
    		console.log('onSelectionChange start ' , record.length);
    		
    		if(record.length >= 1){
    			var params = {
	    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
	    			,V_SEQ        : record[0].get("SEQ")
	    		};
	    		setTimeout(function(){
	        		me.callStore(me, 'ds_MisuAmt', '', params, null);
	        	},50);
    		}
    		
    	}catch (e) {
			console.log('e = ', e);
		}
    },    */   
})