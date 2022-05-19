Ext.define('ExFrm.view.cms.cms002w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cms002w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_temple_CMS_info', '', null, me.cmsStoreCallback)
    	},100);
    	
    	
    	
    },
    onAfterRender:function(){
    	var me  = this;
    },
    cmsStoreCallback:function(me, success, form, action){
    	console.log('cmsStoreCallback' , success);
    	if(success){
    		var index = 1;
    		me.lookupReference('lc_cms_trade_cd').setExValue(me.lookupReference('lc_cms_trade_cd').getStore().getAt(index).get(me.lookupReference('lc_cms_trade_cd').valueField))
    	}
    },
    onSearchTypeChange : function(){
    	var me = this;
    	console.log('onSearchTypeChange', me.lookupReference('lc_cms_trade_cd').getExValue());
    	
    	var lc_cms_trade_cd = me.lookupReference('lc_cms_trade_cd').getExValue();
    	if(lc_cms_trade_cd != null && lc_cms_trade_cd != ""){
    		
    		var params= {
    			V_CMS_TRADE_CD : lc_cms_trade_cd
    		};
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_main', '', params,  me.typeChanageCallback);
    		},100);
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_payDay', '', params,  null);
    		},150);
    	}else{
    		console.log('사찰 계좌정보를 선택해 주세요');
    	}
    },
    typeChanageCallback : function (me, success, records, operation){
    	console.log('typeChanageCallback', success);
    	if(success){
    		var data = records[0];
    		
    		me.lookupReference('txt_cms_trade_cd').setExValue(data.get("CMS_TRADE_CD"));
    		me.lookupReference('lc_misu_method').setExValue(data.get("MISU_METHOD"));
    		me.lookupReference('lc_use_yn').setExValue(data.get("USE_YN"));
    		me.lookupReference('em_month_limit_amount').setExValue(data.get("MONTH_LIMIT_AMOUNT"));
    		me.lookupReference('em_once_max_amount').setExValue(data.get("ONCE_MAX_AMOUNT"));
    		me.lookupReference('txt_accname').setExValue(data.get("ACCNAME"));
    		me.lookupReference('tx_sms_format').setExValue(data.get("SMS_FORMAT"));
    		me.lookupReference('tx_remark').setExValue(data.get("REMARK"));
    		
    		console.log('data = ', data);
    	}
    },
    onAddSmsWord : function(){
    	var me = this;
    	
    	var SEL_SMS_FORMAT  =  me.lookupReference('lc_sect').getExValue();
    	
    	if(SEL_SMS_FORMAT != "선택"){
    		console.log('SEL_SMS_FORMAT', SEL_SMS_FORMAT);
    		
    		var SMS_FORMAT = me.lookupReference('tx_sms_format').getExValue();
    		
    		me.lookupReference('tx_sms_format').setExValue(SMS_FORMAT + "" + SEL_SMS_FORMAT);
    	}
    },
    onKeyUpSms : function(textarea, event) {
    	var me = this;
    	console.log('onKeyUpSms');
    	
    	$('#sp_max').text('11111111111111');
    },
    onChangeForamt : function(logEntry, newValue, oldValue, eOpts ){
    	console.log('onChangeForamt n =', newValue);
    	
    	var max_length_sms = 80;
    	var max_length_lms = 1000;
    	
    	var bytes         = gf_calBytes(newValue);
	    if(bytes<=max_length_sms) {
	    	$('#sp_byte').text(bytes);
	    	$('#sp_max').text(max_length_sms+" bytes (단문)");
	    }
	    else if(bytes<=max_length_lms) {
	    	$('#sp_byte').text(bytes);
	    	$('#sp_max').text(max_length_lms+" bytes (장문)");
	    }
	    else{
	    	$('#sp_byte').text(bytes);
	    	$('#sp_max').text(max_length_lms+" bytes (글자수초과)");
	    }
    	
    },
    onSave : function(){
    	var me = this;
    
    	var SMS_FORMAT = me.lookupReference('tx_sms_format').getExValue();
    	
    	if(SMS_FORMAT == "" || SMS_FORMAT == null){
    		setTimeout(function(){
    			Ext.Msg.alert('경고', "CMS 출금 성공 SMS 문자서식은 필수입니다.");
    		},50);
    		me.lookupReference('tx_sms_format').focus();
    		return false;
    	}
    	
    	if( gf_calBytes(SMS_FORMAT) > 1000 ){
    		setTimeout(function(){
    			Ext.Msg.alert('경고', "SMS 문자서식의 최대 Byte를 초과하였습니다.");
    		},50);
    		me.lookupReference('tx_sms_format').focus();
    		return false;
    	}
    	
    	var msg = "저장하시겠습니까?";
    	if( gf_calBytes(SMS_FORMAT) > 80 ){
    		msg = "장문으로 문자가 발송됩니다.<br>계속하시겠습니까?";
    	}
    	
		setTimeout(function(){
			Ext.MessageBox.confirm('알림', msg, function(btn){  
				if (btn == 'yes') { 
					me.callForm(me, '/cms/CMS002W_01/saveTempleCMSInfo.suvila', me.onSaveCallback , false);
				}else{
					return false;
				}
			});
		},50);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	var msg = "다시시도해주세요.";
    	
    	if(success) msg = "저장되었습니다.";
    	
    	
    	Ext.Msg.alert('알림', msg);
    }
    /*onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSindoSearch();
    	}
    },
    
    onSelect : function(){
    	var me = this;
    	
    	if(me.lookupReference('txt_stipulation').getExValue() == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    	}
    	
    	var params = {
    		V_BUD_NO : me.lookupReference('hid_bud_no').getExValue()
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback)
    	},100);
    },
    onSelectCallback : function (me, success, records, action){
    	console.log('onSelectCallback', success);
    },
    onExcel : function (){
    	var me = this;
    	var grid = me.lookupReference('cms002w_01_a');    	
    	exCommon.excelDown(grid, exCommon.getNowDateTime(),'CMS회원삭제현황',  me.getViewModel().getStore('ds_main').getCount());
    },*/
})