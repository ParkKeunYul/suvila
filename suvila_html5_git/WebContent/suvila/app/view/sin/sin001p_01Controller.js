Ext.define('ExFrm.view.sin.sin001p_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_01',
    onCalled:function(selection){
        var me = this;
        console.log('onCalled', selection);
        
        setTimeout(function(){
        
	        for(var i = 0; i< selection.length ; i++){
	        	
	        	var DAEJU_YN     = false;
	        	if(i==0) DAEJU_YN = true;
	        	
	        	var data = {
	        		 SINDO_GBN       : selection[i].get("SINDO_GBN")
	        		,BUD_CODE        : selection[i].get("BUD_CODE")
	        		,BUD_NO        	 : selection[i].get("BUD_NO")
	        		,ZIP_CD          : selection[i].get("ZIP_CD")
	        		,ADDR1           : selection[i].get("ADDR1")
	        		,ADDR2           : selection[i].get("ADDR2")
	        		,ADDR3           : selection[i].get("ADDR3")
	        		,BLDG_NUM        : selection[i].get("BLDG_NUM")
	        		,TELNO1          : selection[i].get("TELNO1")
	        		,TELNO2          : selection[i].get("TELNO2")
	        		,TELNO3          : selection[i].get("TELNO3")
	        		,HWAJU_BUD_NAME  : selection[i].get("HWAJU_BUD_NAME")
	        		,HWAJU_BUD_NO    : selection[i].get("HWAJU_BUD_NO")
	        		,REPRESEN_REL    : selection[i].get("REPRESEN_REL")
	        		,SEX_GBN         : selection[i].get("SEX_GBN")
	        		,NAME_KOR        : selection[i].get("NAME_KOR")
	        		,SACRED_KOR      : selection[i].get("SACRED_KOR")
	        		,LUNAR_SOLAR     : selection[i].get("LUNAR_SOLAR")
	        		,BIRTHDAY        : selection[i].get("BIRTHDAY")
	        		,MOBILE_TELNO1   : selection[i].get("MOBILE_TELNO1")
	        		,MOBILE_TELNO2   : selection[i].get("MOBILE_TELNO2")
	        		,MOBILE_TELNO3   : selection[i].get("MOBILE_TELNO3")
	        		,EMAIL1          : selection[i].get("EMAIL1")
	        		,EMAIL2          : selection[i].get("EMAIL2")
	        		,SEXAGENARY      : selection[i].get("SEXAGENARY")
	        		,LEAP_MONTH      : selection[i].get("LEAP_MONTH")
	        		,ISSUE_DATE      : selection[i].get("ISSUE_DATE")
	        		,MEMO            : selection[i].get("MEMO")
	        		,POST_TRANS      : selection[i].get("POST_TRANS")
	        		,SMS_TRANS       : selection[i].get("SMS_TRANS")
	        		,SMS_BIRTH_TRANS : selection[i].get("SMS_BIRTH_TRANS")
	        		,SMS_GROUP_TRANS : selection[i].get("SMS_GROUP_TRANS")
	        		,DAEJU_YN        : DAEJU_YN
	        		,SORT_SEQ        : i +1
	        	}
	        	
	        	console.log(data);
	        	
	        	me.getViewModel().getStore('ds_main').add(data);
	        }// for
	        me.lookupReference('sin001p_01_a').getView().select(0);
        },600);
    },
    onAfterRender:function(){
    	var params = {};
    	console.log('onAfterRender');
    },
    onInit:function(me){
    	console.log('onInit');
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_ganjiMaster', '', null ,me.ganjiCallback);
    	},10);
    },
    ganjiCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sex_gbn', '', null ,me.sexCallback);
    	},50);
    },
    sexCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', null ,me.lunarSolarCallback);
    	},50);
    },
    lunarSolarCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sindo_gbn', '', null , me.sindoGbnCallback);
    	},50);
    },
    sindoGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_telno1', '', null , me.telNoCallback);
    	},50);
    },
    telNoCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_mobile_telno1', '', null ,null);
    	},50);
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	//try{
    		if(record.length <=  0){
    			return;
    		}
    		me.lookupReference('txt_email2').setReadOnly(true);
    		me.lookupReference('txt_email2').setFieldStyle('background-color:#d0e4f3;');
    		me.lookupReference('sel_mobile_telno').setExValue("");
    		
    		me.lookupReference('lc_sindo_gbn').setExValue( record[0].get("SINDO_GBN") );
    		me.lookupReference('txt_bud_code').setExValue( record[0].get("BUD_CODE") );
    		me.lookupReference('em_zip_cd').setExValue( record[0].get("ZIP_CD") );
    		me.lookupReference('txt_addr1').setExValue( record[0].get("ADDR1") );
    		me.lookupReference('txt_addr2').setExValue( record[0].get("ADDR2") );
    		me.lookupReference('txt_addr3').setExValue( record[0].get("ADDR3") );
    		me.lookupReference('txt_bldg_num').setExValue( record[0].get("BLDG_NUM") );
    		me.lookupReference('lc_telno').setExValue( record[0].get("TELNO1") );
    		me.lookupReference('txt_telno2').setValue( record[0].get("TELNO2") );
    		me.lookupReference('txt_telno3').setValue( record[0].get("TELNO3") );
    		me.lookupReference('txt_hwaju_bud_name').setExValue( record[0].get("HWAJU_BUD_NAME") );
    		me.lookupReference('txt_hwaju_bud_no').setExValue( record[0].get("HWAJU_BUD_NO") );
    		me.lookupReference('txt_represen_rel').setExValue( record[0].get("REPRESEN_REL") );
    		me.lookupReference('lc_sex_gbn').setExValue( record[0].get("SEX_GBN") );
    		me.lookupReference('txt_name_kor').setExValue( record[0].get("NAME_KOR") );
    		me.lookupReference('txt_sacred_kor').setExValue( record[0].get("SACRED_KOR") );
    		me.lookupReference('lc_lunar_solar').setExValue( record[0].get("LUNAR_SOLAR") );    		
    		me.lookupReference('lc_mobile_telno1').setExValue( record[0].get("MOBILE_TELNO1") );
    		me.lookupReference('txt_mobile_telno2').setValue( record[0].get("MOBILE_TELNO2") );
    		me.lookupReference('txt_mobile_telno3').setValue( record[0].get("MOBILE_TELNO3") );
    		me.lookupReference('txt_email1').setExValue( record[0].get("EMAIL1") );
    		me.lookupReference('txt_email2').setExValue( record[0].get("EMAIL2") );
    		me.lookupReference('lc_sexagenary').setExValue( record[0].get("SEXAGENARY") );
    		me.lookupReference('txt_leap_month').setExValue( record[0].get("LEAP_MONTH") );
    		
    		
    		me.lookupReference('ta_memo').setExValue( record[0].get("MEMO") );
    		
    		me.lookupReference('cb_post_trans').setExValue( record[0].get("POST_TRANS") );    		
    		me.lookupReference('cb_daeju_yn').setExValue( record[0].get("DAEJU_YN") );
    		
    		me.lookupReference('cb_sms_trans').setExValue( record[0].get("SMS_TRANS") );
    		me.lookupReference('cb_birth_trans').setExValue( record[0].get("SMS_BIRTH_TRANS") );
    		me.lookupReference('cb_group_trans').setExValue( record[0].get("SMS_GROUP_TRANS") );
    		
    		
    		var BIRTHDAY   = exCommon.getRepVal(record[0].get("BIRTHDAY") );
    		var ISSUE_DATE = exCommon.getRepVal(record[0].get("ISSUE_DATE") );
    		
    		me.lookupReference('em_birthday').setExValue( BIRTHDAY );
    		me.lookupReference('em_issue_date').setExValue( ISSUE_DATE);
    		
    		
    		if(record[0].get("SMS_TRANS") == 1 && record[0].get("SMS_BIRTH_TRANS") == 1 && record[0].get("SMS_GROUP_TRANS") == 1){
    			me.lookupReference('all_sms').setExValue(1);
    		}else{
    			me.lookupReference('all_sms').setExValue(0);
    		}
    		
    	/*}catch (e) {
    		console.log('e = ', e);
    	}*/
    },
    onTempSave : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('sin001p_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	selection.set("SINDO_GBN"           , me.lookupReference('lc_sindo_gbn').getExValue());
    	selection.set("BUD_CODE"            , me.lookupReference('txt_bud_code').getExValue());
    	selection.set("ZIP_CD"              , me.lookupReference('em_zip_cd').getExValue());
    	selection.set("ADDR1"               , me.lookupReference('txt_addr1').getExValue());
    	selection.set("ADDR2"               , me.lookupReference('txt_addr2').getExValue());
    	selection.set("ADDR3"               , me.lookupReference('txt_addr3').getExValue());
    	selection.set("BLDG_NUM"            , me.lookupReference('txt_bldg_num').getExValue());
    	selection.set("TELNO1"              , me.lookupReference('lc_telno').getExValue());
    	selection.set("TELNO2"              , me.lookupReference('txt_telno2').getValue());
    	selection.set("TELNO3"              , me.lookupReference('txt_telno3').getValue());
    	selection.set("HWAJU_BUD_NAME"      , me.lookupReference('txt_hwaju_bud_name').getExValue());
    	selection.set("HWAJU_BUD_NO"        , me.lookupReference('txt_hwaju_bud_no').getExValue());
    	selection.set("REPRESEN_REL"        , me.lookupReference('txt_represen_rel').getExValue());
    	selection.set("SEX_GBN"             , me.lookupReference('lc_sex_gbn').getExValue());
    	selection.set("NAME_KOR"            , me.lookupReference('txt_name_kor').getExValue());
    	selection.set("SACRED_KOR"          , me.lookupReference('txt_sacred_kor').getExValue());
    	selection.set("LUNAR_SOLAR"         , me.lookupReference('lc_lunar_solar').getExValue());
    	selection.set("BIRTHDAY"            , me.lookupReference('em_birthday').getExValue());
    	selection.set("MOBILE_TELNO1"       , me.lookupReference('lc_mobile_telno1').getExValue());
    	selection.set("MOBILE_TELNO2"       , me.lookupReference('txt_mobile_telno2').getValue());
    	selection.set("MOBILE_TELNO3"       , me.lookupReference('txt_mobile_telno3').getValue());
    	selection.set("EMAIL1"              , me.lookupReference('txt_email1').getExValue());
    	selection.set("EMAIL2"              , me.lookupReference('txt_email2').getExValue());
    	selection.set("SEXAGENARY"          , me.lookupReference('lc_sexagenary').getExValue());
    	selection.set("LEAP_MONTH"          , me.lookupReference('txt_leap_month').getExValue());
    	selection.set("ISSUE_DATE"          , me.lookupReference('em_issue_date').getExValue());
    	selection.set("MEMO"                , me.lookupReference('ta_memo').getExValue());
    	
    	
    	selection.set("POST_TRANS"          , me.lookupReference('cb_post_trans').getExValue());
    	selection.set("SMS_TRANS"           , me.lookupReference('cb_sms_trans').getExValue());
    	selection.set("SMS_BIRTH_TRANS"     , me.lookupReference('cb_birth_trans').getExValue());
    	selection.set("SMS_GROUP_TRANS"     , me.lookupReference('cb_group_trans').getExValue());
    	
    	
    	var OLD_DAEJU_YN = selection.get("DAEJU_YN");
    	var DAEJU_YN     = me.lookupReference('cb_daeju_yn').getExValue();
    	
    	if(DAEJU_YN){    	
    		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    		for(var i =0; i < rowCnt ; i++){
    			var RECORD_DAEJU_YN = me.lookupReference('sin001p_01_a').getStore().getAt(i).get("DAEJU_YN");
    			if(RECORD_DAEJU_YN || RECORD_DAEJU_YN == 0){
    				me.lookupReference('sin001p_01_a').getStore().getAt(i).set("DAEJU_YN" ,false);
    			}
    		}// for
    	}// if
    	
    	if( (OLD_DAEJU_YN || OLD_DAEJU_YN == 1)  && !DAEJU_YN){
    		selection.set("DAEJU_YN"            ,true);
    	}else{
    		selection.set("DAEJU_YN"            , me.lookupReference('cb_daeju_yn').getExValue());
    	}
    	
    },
    onSave : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/sin/SIN001P_01/saveBranchFam.suvila'
    		,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me ,success , action , 'ds_main' );
    	
    	if(success){
    		me.receiveTo(null, true);
    	}
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onEmailChange : function(m, newValue, oldValue, eOpts){
    	var me = this;
    	
    	if(newValue == 9999){
    		me.lookupReference('txt_email2').setReadOnly(false);
    		me.lookupReference('txt_email2').setFieldStyle('background-color:#ffffff;');
    		me.lookupReference('txt_email2').setExValue("");
    		me.lookupReference('txt_email2').focus();
    	}else{
    		me.lookupReference('txt_email2').setReadOnly(true);
    		me.lookupReference('txt_email2').setFieldStyle('background:#d0e4f3;');
    		me.lookupReference('txt_email2').setExValue(newValue);
    	}
    	
    	console.log('newValue = ', newValue);
    	
    },
    onSmsAllClick : function(){
    	var me = this;
    	
    	console.log('onSmsAllClick');
    	
    	var newValue = me.lookupReference('all_sms').getExValue();
    	
    	if(newValue || newValue == 1){
    		
    		me.lookupReference('cb_sms_trans').setExValue(1);
    		me.lookupReference('cb_birth_trans').setExValue(1);
    		me.lookupReference('cb_group_trans').setExValue(1);
    		
    	}else{
    		me.lookupReference('cb_sms_trans').setExValue(0);
    		me.lookupReference('cb_birth_trans').setExValue(0);
    		me.lookupReference('cb_group_trans').setExValue(0);
    	}
    },
    onSmsChange : function(m, newValue, oldValue, eOpts){
    	var me = this;
    	
    	var SMS_TRANS       = me.lookupReference('cb_sms_trans').getExValue();
    	var SMS_BIRTH_TRANS = me.lookupReference('cb_birth_trans').getExValue();
    	var SMS_GROUP_TRANS = me.lookupReference('cb_group_trans').getExValue();
    	
    	if(SMS_TRANS && SMS_BIRTH_TRANS && SMS_GROUP_TRANS){
    		me.lookupReference('all_sms').setExValue(1);
    	}else{
    		me.lookupReference('all_sms').setExValue(0);
    	}
    },
    onRelBlur : function(m, e, eOpts ){
    	var me = this;
    	
    	var rel = me.lookupReference('txt_represen_rel').getExValue();
    	
    	if(rel == "건명" || rel == "장남" || rel == "차남" || rel == "서랑" || rel == "사위" || rel == "아들" || rel == "장손" || rel == "아버지" || rel == "청신사" || rel == "비구"){
    		me.lookupReference('lc_sex_gbn').setExValue("T");
    	}
    	else if(rel == "곤명" || rel == "장녀" || rel == "차녀" || rel == "손녀"  || rel == "어머니" || rel == "자부" || rel == "며느리" || rel == "청신녀" || rel == "비구니"){
    		me.lookupReference('lc_sex_gbn').setExValue("F");
    	}
    	else if(rel.indexOf("자부")>=0){
    		me.lookupReference('lc_sex_gbn').setExValue("F");
    	}
    	else if(rel.indexOf("부")>=0 || rel.indexOf("남")>=0 || rel.indexOf("손자")>=0){
    		me.lookupReference('lc_sex_gbn').setExValue("T");
    	}
    	else if(rel.indexOf("모")>=0 || rel.indexOf("녀")>=0 || rel.indexOf("여")>=0 || rel.indexOf("딸")>=0){
    		me.lookupReference('lc_sex_gbn').setExValue("F");
    	}
    },
    onFindAddr : function(){
    	var params = {};
        this.openPopup('ExFrm.view.com.post',  params, this.onFindAddrReceive);
    },
    onFindAddrReceive : function(params, me){
    	me.lookupReference('em_zip_cd').setExValue(params.ZIPCODE);
    	me.lookupReference('txt_addr1').setExValue(params.ADDR1);
    	me.lookupReference('txt_addr3').setExValue(params.ADDR3);
    	me.lookupReference('txt_bldg_num').setExValue(params.BLDG_NUM);
    	me.lookupReference('txt_addr2').focus();
    },
    onSearchHwaju : function(){
    	var me = this;
    	
    	exCommon.onHwajuSearch(me , me.onSearchHwajuCallbak);
    },
    onSearchHwajuCallbak : function(param , me){
    	
    	var BUD_NO   = param.BUD_NO;
    	var NAME_KOR = param.NAME_KOR;
    	
    	if(BUD_NO == null || BUD_NO == undefined){
    		BUD_NO = "";
    	}
    	
    	if(NAME_KOR == null || NAME_KOR == undefined){
    		NAME_KOR = "";
    	}
    	
    	
    	if(BUD_NO != "" && NAME_KOR != ""){
    		me.lookupReference('txt_hwaju_bud_no').setExValue(BUD_NO);
        	me.lookupReference('txt_hwaju_bud_name').setExValue(NAME_KOR);
    	}
    },
    onGanji : function(){
    	var me = this;
    	if(me.getViewModel().getStore('ds_main').getCount() == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
    		},50);
    		return;
    	}
    	
    	var params = {};
        this.openPopup('ExFrm.view.sin.sin001p_09',  params, this.onGanjiReceive);
    },
    onGanjiReceive : function(param , me){
    	me.lookupReference('lc_sexagenary').setExValue(param.CODE);
    	me.lookupReference('em_birthday').setExValue(param.YEAR+"0101");
    },
    onExpand : function(field, eOpts){
    	var me = this;

    	var SEX_GBN = exCommon.getReferVal(me , 'lc_lunar_solar' , ""); 
    	
    	if(SEX_GBN == ""){
    		me.lookupReference('em_birthday').collapse();
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '[양력][음력] 구분을 먼저 선택 하셔야 합니다.');    				
    		},50);
    		return;
    		me.lookupReference('lc_lunar_solar').focus();
    	}
    	return false;
    },
    onDaeJuChange : function(m, newValue, oldValue, eOpts){
    	var me = this;
    	
    	/*console.log('newValue = ', newValue);
    	console.log('oldValue = ', oldValue);*/
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin001p_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var SELET_DAEJU_YN = selection.get("DAEJU_YN");
    	var FROM_DAEJU_YN  =  me.lookupReference('cb_daeju_yn').getExValue();
    	
    	
    	if( SELET_DAEJU_YN == 1 || SELET_DAEJU_YN ){    		
    		setTimeout(function(){
    			me.lookupReference('cb_daeju_yn').setExValue(1);
        	},30);    	
    	}
    },
    onBirthChange : function(){
    	var me = this;
    	
    	var BIRTHDAY = me.lookupReference('em_birthday').getExValue();
    	
    	if(BIRTHDAY.length == 8){
    		me.inGetGangi(me);
    	}
    },
    inGetGangi : function(me){
    	
    	var params ={
    		 V_GANJI        : me.lookupReference('em_birthday').getExValue()
    		,V_LUNAR_SOLAR  : me.lookupReference('lc_lunar_solar').getExValue()
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_ganji', '', params ,me.inGetGangiCallbak);
    	},50);
    },
    inGetGangiCallbak : function(me, success, form, action){
    	if(success &&  me.getViewModel().getStore('ds_ganji').getCount() ){
    		
    		var data = me.getViewModel().getStore('ds_ganji').getAt(0);
    		me.lookupReference('lc_sexagenary').setExValue( data.get("SEXAGENARY") );
    		me.lookupReference('txt_leap_month').setExValue( data.get("LEAP_MONTH") );
    	}
    },
    
})