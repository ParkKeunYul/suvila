Ext.define('ExFrm.view.rec.rec002p_10_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002p_10_01',
    onCalled:function(params){
        var me = this;
        
        
        
        me.lookupReference('txt_jungak_cd').setExValue(params.V_JUNGAK_CD);
        me.lookupReference('txt_accept_gbn').setExValue(params.V_ACCEPT_GBN);
        me.lookupReference('txt_accept_seq').setExValue(params.V_ACCEPT_SEQ);
        me.lookupReference('txt_accept_gbn').setExValue(params.V_ACCEPT_GBN);
        me.lookupReference('txt_light_no').setExValue(params.V_LIGHT_NO);
        
        me.onSelect();
       
    },
    
    onInit:function(){},
    onAfterRender:function(){},
    onSelect : function(){
    	var me = this;
    	
    	 var params = {
        	 V_JUNGAK_CD  : me.lookupReference('txt_jungak_cd').getExValue()       		
       		,V_ACCEPT_GBN : me.lookupReference('txt_accept_gbn').getExValue()
       		,V_LIGHT_NO   : me.lookupReference('txt_light_no').getExValue()       		
       	}
       	
       	setTimeout(function(){
       		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
       	},50);
    	
    },
    onSelectCallback : function(me, success, record, action){
    	console.log('record = ', record[0]);
    	
    	if(success){
    		
    		
    		if(me.getViewModel().getStore('ds_main').getCount() != 1){
    			exCommon.msgAlert('해당 등은 연장 할 수 없습니다.');
    			me.getView().destroy();
    			return false;
    		}
    		
    		
    		var INDEUNG_PERIOD   = exCommon.getRepNum( record[0].get("INDEUNG_PERIOD") );
    		var PAYMENT_PLAN_AMT = exCommon.getRepNum( record[0].get("PAYMENT_PLAN_AMT") );
    		var LIMIT_YN         = exCommon.getRepVal( record[0].get("LIMIT_YN") , "");
    		var DEFAULT_AMT      = 0;
    		
    		if(INDEUNG_PERIOD == 0){
    			exCommon.msgAlert('기간이 [0] 인등은 연장 할 수 없습니다.');
        		me.getView().destroy();
        		return false;
    		}
    		
    		if(PAYMENT_PLAN_AMT == 0){
    			exCommon.msgAlert('총 접수 금액이  [0] 인등은 연장 할 수 없습니다.');
        		me.getView().destroy();
        		return false;
    		}
    		
    		if(LIMIT_YN != "T"){
    			exCommon.msgAlert('무한으로 접수된 인등은 연장 할 수 없습니다.');
        		me.getView().destroy();
        		return false;
    		}
    		
    		if(PAYMENT_PLAN_AMT % INDEUNG_PERIOD != 0){
    			exCommon.msgAlert('금액 / 기간 이 0 이 아닌 경우<br> 월금액환산시 소수점금액이 발생되어<br>처리 할 수 없습니다.<br>소등후 재접수하시기 바랍니다.');
    			me.getView().destroy();
    			return false;
    		}
    		
    		DEFAULT_AMT =  PAYMENT_PLAN_AMT / INDEUNG_PERIOD;
    		
    		
    		me.lookupReference('em_payment_plan_amt').setExValue(record[0].get("PAYMENT_PLAN_AMT"));
    		me.lookupReference('em_total_plan_amt').setExValue(record[0].get("TOTAL_PLAN_AMT"));
    		me.lookupReference('em_payment_amt').setExValue(record[0].get("PAYMENT_AMT"));
    		me.lookupReference('em_misu_amt').setExValue(record[0].get("MISU_AMT"));
    		me.lookupReference('em_total_misu_amt').setExValue(record[0].get("TOTAL_MISU_AMT"));
    		me.lookupReference('em_default_amt').setExValue( DEFAULT_AMT );
    		me.lookupReference('em_start_month').setExValue(record[0].get("START_MONTH"));
    		me.lookupReference('em_indeung_period').setExValue(record[0].get("INDEUNG_PERIOD"));
    		me.lookupReference('em_total_period').setExValue(record[0].get("TOTAL_PERIOD"));
    		me.lookupReference('em_add_period').setExValue(record[0].get("ADD_PERIOD"));
    		
    	}else{
    		exCommon.msgAlert('오류가 발생했습니다.<br/>다시 시도해주세요.');
    		me.getView().destroy();
    	}
    	
    },
    onApply : function(){
    	var me = this;
    	
    	var em_add_period = exCommon.getRepVal( me.lookupReference('em_add_period').getExValue() , "" );
    	
    	
    	if(em_add_period == ""){
    		exCommon.msgAlert('추가 기간을 숫자로 입력하세요.');
    		me.lookupReference('txt_state').setExValue(0);
    		return false;
    	}
    	
    	if( isNaN(em_add_period) ){
    		exCommon.msgAlert('숫자만 입력가능합니다.');
    		me.lookupReference('txt_state').setExValue(0);
    		return false;
    	}
    	
    	if(em_add_period < 1 ){
    		exCommon.msgAlert('추가 기간은 1이상의 값을 입력해야 합니다.');
    		me.lookupReference('txt_state').setExValue(0);
    		return false;
    	}
    	
    	var em_indeung_period   = exCommon.getRepNum( me.lookupReference('em_indeung_period').getExValue() );  
    	var em_add_period       = exCommon.getRepNum( me.lookupReference('em_add_period').getExValue() );
    	var em_payment_plan_amt = exCommon.getRepNum( me.lookupReference('em_payment_plan_amt').getExValue() );
    	var em_default_amt      = exCommon.getRepNum( me.lookupReference('em_default_amt').getExValue() );
    	var em_add_period       = exCommon.getRepNum( me.lookupReference('em_add_period').getExValue() );
    	var em_total_plan_amt   = exCommon.getRepNum( me.lookupReference('em_total_plan_amt').getExValue() );
    	var em_payment_amt      = exCommon.getRepNum( me.lookupReference('em_payment_amt').getExValue() );
    	
    	
    	var em_total_period    = parseInt(em_indeung_period,10) + parseInt(em_add_period,10);
    	var em_total_plan_amt  = parseInt(em_payment_plan_amt,10) + (parseInt(em_default_amt,10) * parseInt(em_add_period,10));
    	var em_total_misu_amt  = parseInt(em_total_plan_amt,10) - parseInt(em_payment_amt,10);
    	
    	me.lookupReference('em_total_period').setExValue( em_total_period );
    	me.lookupReference('em_total_plan_amt').setExValue( em_total_plan_amt );
    	me.lookupReference('em_total_misu_amt').setExValue( em_total_misu_amt );
    	
    	
    	me.getViewModel().getStore('ds_main').getAt(0).set("ADD_PERIOD"     , em_add_period);
    	me.getViewModel().getStore('ds_main').getAt(0).set("TOTAL_PERIOD"   , em_total_period);
    	me.getViewModel().getStore('ds_main').getAt(0).set("TOTAL_PLAN_AMT" , em_total_plan_amt);
    	me.getViewModel().getStore('ds_main').getAt(0).set("TOTAL_MISU_AMT" , em_total_misu_amt);
    	
    	
    	me.lookupReference('txt_state').setExValue(1);
    },
    onSave : function(){
    	var me = this;
    	
    	
    	var txt_state = me.lookupReference('txt_state').getExValue();
    	
    	if(txt_state != 1){
    		exCommon.msgAlert('적용 버튼을 눌러 주시기 바랍니다.');
    		return false;
    	}
    	
    	exCommon.uptParamSetting(me , 'ds_main' , 'uptData');
    	
    	setTimeout(function(){
			me.callForm(me, '/rec/REC001W_10/savePeriodInfo.suvila', me.onSaveCallback , false);
		},10);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	console.log('onSaveCallback = ',success );
    	if(success){
    		exCommon.msgAlert('연장되었습니다.');
    		me.receiveTo(null , true);
    	}else{
    		exCommon.msgAlert('오류가 발생했습니다<br>다시 시도해주세요.');
    		return false;
    	}
    	
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
})