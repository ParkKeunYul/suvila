Ext.define('ExFrm.view.sin.sin011w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin011w_01',    
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
    	
    	me.lookupReference('td_sendDate').setHidden(true);
    	
    	
    	console.log( exCommon.user.tel );
    	
    	me.lookupReference('me_telno').setExValue( exCommon.user.tel );
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.ClassMgtCallback);
    	},50);
    },
    ClassMgtCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_org_NmAll', '', null ,me.orgNmAllCallback);
    	},50);
    },
    orgNmAllCallback  : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sms_doc', '', null , me.smsDocCallback);
    	},50);
    },
    smsDocCallback  : function (me, success, records, action){
    	me.lookupReference('sin011w_01_b').getView().select( 0 );
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
    		,V_CLASS_CD    : me.lookupReference('lc_classMgt').getExValue()
    		,V_ORG_CD      : me.lookupReference('lc_org_NmAll').getExValue()
    		,V_SMS_TRANS   : ''
    		,V_GROUP_TRANS : ''
    		,V_BIRTH_TRANS : ''
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row > 0){
    			me.lookupReference('sin011w_01_a').getView().select(0);
    		}
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin011w_01_a');
    	    	
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
    onAddSindo : function(){
    	var me = this;
    	
    	var params = {
  	   		 V_SEARCH_GBN : me.lookupReference('cb_Stipulation').getExValue()
  	   		,V_SEARCH_WORD: ""    		
  	   	};
      	me.openPopup('ExFrm.view.com.sindo',  params, me.onAddSindoReceive);
    },
    onAddSindoReceive : function(params, me){
    	console.log('onSindoSearchReceive ',params);

    	
    	var row  = me.getViewModel().getStore('ds_main').getCount();
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() ).replace(/-/gi, ""); 
    	
    	
    	var data = {
    		 ENTRY_DATE : today
    		,BUD_NO     : params.BUD_NO
    		,NAME_KOR   : params.NAME_KOR
    	}
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('sin011w_01_a').getView().select( row );
    },
    inValidation : function(me){
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row; i++){
    		var record         = me.getViewModel().getStore('ds_main').getAt(i);
    		var CHECK_P        = exCommon.getTF(record.get("CHECK_P"));
    		var SETTING_DATE_R = exCommon.getRepVal(record.get("R_SETTING_DATE"), '');
    		
    		if(CHECK_P == 'T' && SETTING_DATE_R != ''){
    			me.lookupReference('sin011w_01_a').getView().select(i);
    			exCommon.msgAlert('기존 정산처리된건을 제외시킨후 시도해주세요.');
    			return false;
    		}
    	}// for i
    	
    	return true;
    },
    onSettingCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    	}
    },
    onSetting : function(){
    	var me = this;
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	
    	if (rowCnt == 0) {
    		exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
		}
    	
    	if(!me.inValidation(me) ) {
    		return;
    	}
    	
    	var jsonUptData = [];
    	
    	Ext.MessageBox.confirm('알림', '정산처리 하시겠습니까?<br/>저장후 변경할수 없습니다.', function(btn){
    		if (btn == 'yes') {
    			
    			var today = exCommon.getNowDate('') ;
    			console.log('today = ',today);
    			var row = me.getViewModel().getStore('ds_main').getCount();
    			for(var i = 0; i < row; i++){
    				var record         = me.getViewModel().getStore('ds_main').getAt(i);
    	    		var CHECK_P        = exCommon.getTF(record.get("CHECK_P"));
    	    		var SETTING_DATE_R = exCommon.getRepVal(record.get("R_SETTING_DATE"), '');
    	    		
    	    		if(CHECK_P == 'T' && SETTING_DATE_R == ''){
    	    			record.set("SETTING_DATE",today );
    	    			jsonUptData.push(record.data);
    	    		}
    			}// for
    			
    			me.lookupReference('uptData').setExValue(Ext.encode(jsonUptData));
    			
    			setTimeout(function(){
    				me.callForm(me, '/sin/SIN017W_01/saveSetting.suvila', me.onSettingCallback , false);
    			},50);	
    		}
    	});
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
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) {
    			me.lookupReference('txt_sel_index').setExValue(-1);    			
    			return false;
    		}
    		
    		//이전값 세팅
			var preIndex    = me.lookupReference('txt_sel_index').getExValue();
			if(preIndex != -1){
				me.inSettingRecord(me, preIndex);
			}// if preIndex
			
			var nowIndex       = me.lookupReference('sin011w_01_b').getStore().indexOf(record[0]);
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
    onAdd : function(){
    	var me = this;
    	
    	var data = {
    		DOC_TEXT : ""
    	};
    	me.getViewModel().getStore('ds_sms_doc').insert(0, data );
    	me.lookupReference('txt_sel_index').setExValue(-1);
    	me.lookupReference('sin011w_01_b').getView().select(0);
    	
    },
    onDel : function(){
    	var me = this;
    	
    	exCommon.gridRemove(
       		 me
       		,'sin011w_01_b'
       		,'ds_sms_doc'
       		, false
       		, false
       	);  
    },
    onSave : function(){
    	var me  = this;
    	
    	var row = me.getViewModel().getStore('ds_sms_doc').getCount();
    	if(row > 0){
    		var selectedRecord = me.lookupReference('sin011w_01_b').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('sin011w_01_b').getStore().indexOf(selectedRecord[0]);
        	me.inSettingRecord(me, index);
    	}
    	
    	var rowCnt = exCommon.ChangeCount('ds_sms_doc', me);
    	if (rowCnt == 0) {
    		exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
		}
    	
    	if(!me.inValidation(me) ) {
    		return;
    	}
    	
    	exCommon.fnGridSaveAll(
       		 me
       		,'ds_sms_doc'
       		,'newData'
       		,'uptData'
       		,'delData'
       		,'/sin/SIN011W_01/saveSmsDoc.suvila'
       		,me.onSaveCallback
       	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_sms_doc');
    	if(success){
    		setTimeout(function(){
        		me.callStore(me, 'ds_sms_doc', '', null , me.smsDocCallback);
        	},50);
    	}
    },
    inValidation : function(me){
    	var row = me.getViewModel().getStore('ds_sms_doc').getCount();
    	
    	for(var i = 0; i < row; i++){
    		if( !exCommon.gridFormVal(me, i ,'ds_sms_doc' , 'sin011w_01_b', "DOC_TEXT"  , "문구를 입력하세요." ) ){
    			me.lookupReference('ta_sms_doc').focus();    			
    			return false;
    		}
    		
    	}// for i
    	return true;
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
    onMouseRight:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('sin011w_01_a').getView().getSelectionModel().getSelection();
    	
    	console.log('selectedRecord = ', selectedRecord);
    	
    	me.openPopup('ExFrm.view.sin.sin011p_01_mouse',  selectedRecord , me.onMouseRightReceive);
    	
    },
    onMouseRightReceive : function(gbn, me){
    	
    	console.log('gbn = ', gbn );
    	
    	var selectedRecord = me.lookupReference('sin011w_01_a').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
	    	if(gbn){
	    		selectedRecord[i].set("SEL_YN", true);
	    	}
	    	
	    	if(!gbn){
	    		selectedRecord[i].set("SEL_YN", false);
	    	}
    	}
    },
    onSmsSend : function(){
    	var me = this;
    	
    	console.log( exCommon.getNowDate('') );
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	
    	if (rowCnt == 0) {
    		exCommon.msgAlert('선택된 발송 대상이 없습니다.');
			return false;
		}
    	
    	var rd_sendDate = me.lookupReference('rd_sendDate').getValue().rd_sendDate;
    	
    	var me_sendDate  = exCommon.getRepVal( me.lookupReference('me_sendDate').getExValue()  , '');
    	var me_sendTimeT = exCommon.getRepVal( me.lookupReference('me_sendTimeT').getExValue() , '');
    	var me_sendTimeM = exCommon.getRepVal( me.lookupReference('me_sendTimeM').getExValue() , '');
    	
    	
    	if(rd_sendDate == 2){
    		
    		if(  me_sendDate  == '' ){
    			exCommon.msgAlert('일자를 정확하게 입력하세요.');
    			me.lookupReference('me_sendDate').focus();
    		}
    		if(  me_sendTimeT  == '' ){
    			exCommon.msgAlert('시간을 정확하게 입력하세요.');
    			me.lookupReference('me_sendTimeT').focus();
    		}
    		if(  me_sendTimeM  == '' ){
    			exCommon.msgAlert('시간을 정확하게 입력하세요.');
    			me.lookupReference('me_sendTimeM').focus();
    		}
    		
    		if( me_sendTimeT >23  || me_sendTimeT < 0 ){
    			exCommon.msgAlert('0 ~ 23 사이로 입력하세요.');
    			me.lookupReference('me_sendTimeT').focus();
    		}
    		
    		if( me_sendTimeM > 60  || me_sendTimeM < 0 ){
    			exCommon.msgAlert('0 ~ 59 사이로 입력하세요.');
    			me.lookupReference('me_sendTimeM').focus();
    		}
    		
    		if( isNaN( me_sendDate ) ||  isNaN( me_sendTimeT ) || isNaN( me_sendTimeM )){
    			exCommon.msgAlert('예약발송일자는 숫자만 입력가능합니다.');
    			return;
    		}
    		
    		if( parseInt(exCommon.getNowDate('')) > parseInt(me_sendDate)){
    			exCommon.msgAlert('일자를 정확하게 입력하세요.');
    			me.lookupReference('me_sendDate').focus();    			
    			return;
    		}
    	}
    	
    	
    	var telNo   = exCommon.getRepVal( me.lookupReference('me_telno').getExValue()  , '');
		var telNo1  = telNo.substr(0,3);
		
		if( (telNo1 == "011" || telNo1 == "016" || telNo1 == "017" || telNo1 == "018" || telNo1 == "019") && telNo.length != 10 ){
			exCommon.msgAlert('연락처에 올바른 휴대폰번호를 입력하세요.');
			me.lookupReference('me_telno').focus()
			return;
		}
		
		if(telNo1 == "010" && telNo.length != 11){
			exCommon.msgAlert('연락처에 올바른 휴대폰번호를 입력하세요.');
			me.lookupReference('me_telno').focus()
			return;
		}
    	
		
		var ta_msg =  exCommon.getRepVal( me.lookupReference('ta_msg').getExValue()  , '');
		if(  ta_msg  == '' ){
			exCommon.msgAlert('SMS내용은 필수 입력사항 입니다.');
			me.lookupReference('ta_msg').focus();
			return;
		}
		
		var msgGbn  = me.onCheckSmsByte();
		var sendMsg = "";
		
		if( msgGbn == "SMS" ){
			sendMsg = "단문으로 문자발송 하시겠습니까?";
		}else if( msgGbn == "LMS" ){
			sendMsg = "<b>장문</b>으로 문자발송 하시겠습니까?";
		}else{
			exCommon.msgAlert(me.lookupReference('max_length_lms').getExValue() + 'bytes 를 초과할 수 없습니다.');
			return;
		}
		
		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_SENDDATE", me_sendDate);
		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_SENDTIME", me_sendTimeT+""+me_sendTimeM);
		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MESSAGE" , ta_msg);
		
		exCommon.addParamSetting(me, 'ds_sms'  , 'ds_sms');
		exCommon.uptParamSetting(me, 'ds_main' , 'uptData');
		
		
		Ext.MessageBox.confirm('알림', sendMsg, function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/sin/SIN011W_01/save.suvila', me.onSmsSendCallback , false);
    			},50);	
    		}
    	});
    },
    onSmsSendCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    		me.inSmsSetting();
    		me.lookupReference('ta_msg').setExValue('');
    		me.lookupReference('me_sendDate').setExValue('');
    		me.lookupReference('me_sendTimeT').setExValue('');
    		me.lookupReference('me_sendTimeM').setExValue('');
    		me.onCheckSmsByte();
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
    	
    	if(ta_msg.indexOf("[사찰명]")>= 0 || ta_msg.indexOf("[이름]")>= 0 ){
    		bytes += 10;
    	}
    	
    	if(bytes<=max_length_sms) {
    		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSG_GB", "SMS");
    		$('#sp_byte').html(bytes);
    		$('#sp_max').html(max_length_sms+" bytes (단문)");
    		return "SMS";
    	}else if(bytes<=max_length_lms) {
    		me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSG_GB", "LMS");
    		$('#sp_byte').html(bytes);
    		$('#sp_max').html(max_length_lms+" bytes (<b>장문</b>)");
    		return "LMS";
        }else{
        	me.getViewModel().getStore('ds_sms').getAt(0).set("V_TR_MSG_GB", "SMS");
        	$('#sp_max').html(max_length_lms+" bytes (글자수초과)");
    		return "";
    	}    	
    },
    onSmsDbClick : function(dataview, record, item, index, e){
    	var me = this;
    	me.lookupReference('ta_msg').setExValue( record.get("DOC_TEXT")  );
    	me.onCheckSmsByte();
    },
})


