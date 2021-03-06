Ext.define('ExFrm.view.com.group_sms_mouseController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.group_sms_mouse',
    onCalled:function(store){
        var me = this;
        
        console.log();
        
        var row = store.getCount();
        
        
        var LONG_PARAM  = "";
        var LONG_PARAM2 = "";
        var LONG_PARAM3 = "";
        var LONG_PARAM4 = "";
        var LONG_PARAM5 = "";
        
        var cnt = 1;
        for(var i = 0; i < row ; i++){
        	
        	var flag = true;
        	
        	var DEL_YN          = exCommon.getRepVal( store.getAt(i).data.DEL_YN, '' );
        	var MOBILE_TELNO    = exCommon.getRepVal( store.getAt(i).data.MOBILE_TELNO, '' );
        	var SMS_GROUP_TRANS = exCommon.getRepVal( store.getAt(i).data.SMS_GROUP_TRANS, '' );
        	
        	if(DEL_YN == 'T'){
        		flag = false; 
        	}else if(!(MOBILE_TELNO.length == 12 || MOBILE_TELNO.length == 13)){
        		flag = false;
        	}else if(SMS_GROUP_TRANS == 'F'){
        		flag = false;
        	}
        	
        	
        	if(flag){
        		var findRecord = me.getViewModel().getStore('ds_main_temp').findRecord('BUD_NO', store.getAt(i).data.BUD_NO, 0, false, true, true);
            	if(findRecord != null && findRecord != "" && findRecord != undefined){
            		flag = false;
            	}else{
            		store.getAt(i).set("SEL_YN",true);
            		me.getViewModel().getStore('ds_main_temp').add( store.getAt(i).data );
            		
            		if(cnt <= 200){
            			LONG_PARAM  +=",'"+ store.getAt(i).data.BUD_NO+"'";
            		}else if(cnt <= 400){
            			LONG_PARAM2 +=",'"+ store.getAt(i).data.BUD_NO+"'";
            		}else if(cnt <= 600){
            			LONG_PARAM3 +=",'"+ store.getAt(i).data.BUD_NO+"'";
            		}else if(cnt <= 800){
            			LONG_PARAM4 +=",'"+ store.getAt(i).data.BUD_NO+"'";
            		}else if(cnt <= 1000){
            			LONG_PARAM5 +=",'"+ store.getAt(i).data.BUD_NO+"'";
            		}
            		cnt++;
            	}
        	}
        }// for i
        
        
        if(cnt == 1){
        	exCommon.msgAlert('SMS?????? ????????? ????????????.');
        	return false;
        }
        
        if(LONG_PARAM.length > 0){
        	LONG_PARAM = LONG_PARAM.substring(1);
        }
        
        if(LONG_PARAM2.length > 0){
        	LONG_PARAM2 = LONG_PARAM2.substring(1);
        }
        
        if(LONG_PARAM3.length > 0){
        	LONG_PARAM3 = LONG_PARAM3.substring(1);
        }
        
        if(LONG_PARAM4.length > 0){
        	LONG_PARAM4 = LONG_PARAM4.substring(1);
        }
        
        if(LONG_PARAM5.length > 0){
        	LONG_PARAM5 = LONG_PARAM5.substring(1);
        }
        
        
        var row = me.getViewModel().getStore('ds_main_temp').getCount();
        
        console.log('LONG_PARAM  = ', LONG_PARAM);
        console.log('LONG_PARAM2 = ', LONG_PARAM2);
        console.log('LONG_PARAM3 = ', LONG_PARAM3);
        console.log('LONG_PARAM4 = ', LONG_PARAM4);
        console.log('LONG_PARAM5 = ', LONG_PARAM5);
        
        var params ={
        	 V_ORG_CD      : 0
        	,V_CLASS_CD    : 0
        	,V_SEARCH_WORD : '' 
        	,V_SEARCH_GBN  : ''
        	,V_BUD_NO      : LONG_PARAM
        	,V_BUD_NO2     : LONG_PARAM2
        	,V_BUD_NO3     : LONG_PARAM3
        	,V_BUD_NO4     : LONG_PARAM4
        	,V_BUD_NO5     : LONG_PARAM5
        };
        
        setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params , me.dsMainCallback);
    	},50);
    },
    dsMainCallback  : function (me, success, records, action){
    	me.lookupReference('group_sms_mouse_a').getView().select(0);
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i< row; i++){
    		me.getViewModel().getStore('ds_main').getAt(i).set("SEL_YN", true);
    		me.getViewModel().getStore('ds_main').getAt(i).set("MOBILE_TELNO", me.getViewModel().getStore('ds_main').getAt(i).get("MOBILE_TELNO_M"));
    	};
    	
    },
    onInit:function(){
    	var me = this;
    	setTimeout(function(){
    		me.callStore(me, 'ds_sms_doc', '', null , me.smsDocCallback);
    	},50);
    	
    },
    smsDocCallback  : function (me, success, records, action){
    	me.lookupReference('txt_sel_index').setExValue(-1);
    	me.lookupReference('group_sms_mouse_b').getView().select( 0 );
    	//me.onSelect();
    	
    	
    	me.inSmsSetting();
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('me_telno').setExValue( exCommon.user.tel );    	
    	
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) {
    			me.lookupReference('txt_sel_index').setExValue(-1);    			
    			return false;
    		}
    		
			var preIndex    = me.lookupReference('txt_sel_index').getExValue();
			if(preIndex != -1){
				me.inSettingRecord(me, preIndex);
			}// if 
			
			var nowIndex       = me.lookupReference('group_sms_mouse_b').getStore().indexOf(record[0]);
			me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
    		me.lookupReference("ta_sms_doc").setExValue( record[0].get("DOC_TEXT"));
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_sms_doc').getAt(index);
			
			pre_record.set("DOC_TEXT", exCommon.getRepVal(me.lookupReference('ta_sms_doc').getExValue(),''));
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    onChangeSmsItem : function (now, newValue, oldValue, eOpts ){
    	var me = this;
    	
    	var sel_item = exCommon.getRepVal(newValue, '');
    	var ta_msg  = exCommon.getRepVal(me.lookupReference('ta_msg').getRawValue(), '');
    	
    	if(sel_item != ''){
    		ta_msg = ta_msg +""+ me.lookupReference('lc_smsItem').getRawValue();
    		me.lookupReference('ta_msg').setExValue( ta_msg );
    	}
    	
    },
    inSmsSetting : function(){
    	var me = this;
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	var data = {
    		 V_TR_NUM      : '0'	
    		,V_TR_CALLBACK : exCommon.user.tel
    		,V_TR_ETC1     : exCommon.user.templeCd
    		,V_TR_ETC2     : ''
    		,V_TR_ETC3     : ''
    		,V_TR_ETC4     : ''
    		,V_TR_ETC5     : exCommon.user.userId
    		,V_TR_MSGTYPE  : '0'
    		,V_TR_MSG_GB   : 'SMS'    		
    	}
    	me.getViewModel().getStore('ds_sms').add(data);
    },
    onCheckSmsByte : function(){
    	var me = this;
    	
    	var max_length_sms = me.lookupReference('max_length_sms').getExValue();
    	var max_length_lms = me.lookupReference('max_length_lms').getExValue();
    	var ta_msg         = me.lookupReference('ta_msg').getExValue();
    	var bytes          = gf_calBytes(ta_msg);
    	
    	if(ta_msg.indexOf("[?????????]")>= 0 || ta_msg.indexOf("[??????]")>= 0 ){
    		bytes += 10;
    	}
    	
    	if(bytes<=max_length_sms) {
    		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSG_GB", "SMS");
    		$('#sp_byte').html(bytes);
    		$('#sp_max').html(max_length_sms+" bytes (??????)");
    		return "SMS";
    	}else if(bytes<=max_length_lms) {
    		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSG_GB", "LMS");
    		$('#sp_byte').html(bytes);
    		$('#sp_max').html(max_length_lms+" bytes (<b>??????</b>)");
    		return "LMS";
        }else{
        	me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSG_GB", "SMS");
        	$('#sp_max').html(max_length_lms+" bytes (???????????????)");
    		return "";
    	}    	
    },
    onRadioClick : function (now, newValue, oldValue, eOpts ){
    	var me = this;
    	
    	
    	if(newValue.rd_sendDate  == 1){
    		me.lookupReference('td_sendDate').setHidden(true);
    		
    		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSGTYPE", "0");
    	}else{
    		me.lookupReference('td_sendDate').setHidden(false);
    		me.lookupReference('me_sendDate').focus();
    		
    		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSGTYPE", "1");
    	}
    	
    },
    onSmsDbClick : function(dataview, record, item, index, e){
    	var me = this;
    	me.lookupReference('ta_msg').setExValue( record.get("DOC_TEXT")  );
    	me.onCheckSmsByte();
    },
    onSmsSend : function(){
    	var me = this;
    	
    	
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row ; i++){
    		var SEL_YN = me.getViewModel().getStore('ds_main').getAt(i).get("SEL_YN");
    		if(SEL_YN){
    			rowCnt++;
    		}
    	}
    	
    	if (rowCnt == 0) {
    		exCommon.msgAlert('????????? ?????? ????????? ????????????.');
			return false;
		}
    	
    	var rd_sendDate = me.lookupReference('rd_sendDate').getValue().rd_sendDate;
    	
    	var me_sendDate  = exCommon.getRepVal( me.lookupReference('me_sendDate').getExValue()  , '');
    	var me_sendTimeT = exCommon.getRepVal( me.lookupReference('me_sendTimeT').getExValue() , '');
    	var me_sendTimeM = exCommon.getRepVal( me.lookupReference('me_sendTimeM').getExValue() , '');
    	
    	
    	if(rd_sendDate == 2){
    		
    		if(  me_sendDate  == '' ){
    			exCommon.msgAlert('????????? ???????????? ???????????????.');
    			me.lookupReference('me_sendDate').focus();
    		}
    		if(  me_sendTimeT  == '' ){
    			exCommon.msgAlert('????????? ???????????? ???????????????.');
    			me.lookupReference('me_sendTimeT').focus();
    		}
    		if(  me_sendTimeM  == '' ){
    			exCommon.msgAlert('????????? ???????????? ???????????????.');
    			me.lookupReference('me_sendTimeM').focus();
    		}
    		
    		if( me_sendTimeT >23  || me_sendTimeT < 0 ){
    			exCommon.msgAlert('0 ~ 23 ????????? ???????????????.');
    			me.lookupReference('me_sendTimeT').focus();
    		}
    		
    		if( me_sendTimeM > 60  || me_sendTimeM < 0 ){
    			exCommon.msgAlert('0 ~ 59 ????????? ???????????????.');
    			me.lookupReference('me_sendTimeM').focus();
    		}
    		
    		if( isNaN( me_sendDate ) ||  isNaN( me_sendTimeT ) || isNaN( me_sendTimeM )){
    			exCommon.msgAlert('????????????????????? ????????? ?????????????????????.');
    			return;
    		}
    		
    		if( parseInt(exCommon.getNowDate('')) > parseInt(me_sendDate)){
    			exCommon.msgAlert('????????? ???????????? ???????????????.');
    			me.lookupReference('me_sendDate').focus();    			
    			return;
    		}
    	}
    	
    	
    	var telNo   = exCommon.getRepVal( me.lookupReference('me_telno').getExValue()  , '');
		var telNo1  = telNo.substr(0,3);
		
		if( (telNo1 == "011" || telNo1 == "016" || telNo1 == "017" || telNo1 == "018" || telNo1 == "019") && telNo.length != 10 ){
			exCommon.msgAlert('???????????? ????????? ?????????????????? ???????????????.');
			me.lookupReference('me_telno').focus()
			return;
		}
		
		if(telNo1 == "010" && telNo.length != 11){
			exCommon.msgAlert('???????????? ????????? ?????????????????? ???????????????.');
			me.lookupReference('me_telno').focus()
			return;
		}
    	
		
		var ta_msg =  exCommon.getRepVal( me.lookupReference('ta_msg').getExValue()  , '');
		if(  ta_msg  == '' ){
			exCommon.msgAlert('SMS????????? ?????? ???????????? ?????????.');
			me.lookupReference('ta_msg').focus();
			return;
		}
		
		var msgGbn  = me.onCheckSmsByte();
		var sendMsg = "";
		
		if( msgGbn == "SMS" ){
			sendMsg = "???????????? ???????????? ???????????????????";
		}else if( msgGbn == "LMS" ){
			sendMsg = "<b>??????</b>?????? ???????????? ???????????????????";
		}else{
			exCommon.msgAlert(me.lookupReference('max_length_lms').getExValue() + 'bytes ??? ????????? ??? ????????????.');
			return;
		}
		
		
		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_CALLBACK", telNo);
		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSG_GB"  , msgGbn);		
		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_SENDDATE", me_sendDate);
		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_SENDTIME", me_sendTimeT+""+me_sendTimeM);
		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MESSAGE" , ta_msg);
		
		
		exCommon.addParamSetting(me, 'ds_sms'  , 'ds_sms');
		exCommon.uptParamSetting(me, 'ds_main' , 'uptData');
		
		
		Ext.MessageBox.confirm('??????', sendMsg, function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/sin/SIN011W_01/save.suvila', me.onSmsSendCallback , false);
    			},50);	
    		}
    	});
    },
    onSmsSendCallback : function(me, success, form, action){
    	if(success){
    		exCommon.msgAlert('?????????????????????.');
    		me.receiveTo(true , true);
    	}else{
    		exCommon.msgAlert('????????? ??????????????????.<br/>?????? ??????????????????.');
    	}
    },
})