Ext.define('ExFrm.view.sin.sin001p_05Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_05',
    onCalled:function(params){
        var me = this;
        console.log('onCalled', params);
        
        var params ={
        	V_BUD_NO : params.V_BUD_NO
        }
        setTimeout(function(){
    		me.callStore(me, 'ds_group','', params  ,me.groupCallback);
    	},10);
        
    },
    groupCallback : function(me, success, form, action){
    	  setTimeout(function(){
      		me.callStore(me, 'ds_ganjiMaster', '', action._params ,me.ganjiCallback);
      	},10);
    },
    ganjiCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_telno1', '', action._params ,me.telNo1Callback);
    	},10);
    },
    telNo1Callback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_mobile_telno1', '', action._params ,me.mobileCallback);
    	},10);
    },
    mobileCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sex_gbn', '', action._params ,me.sexCallback);
    	},10);
    },
    sexCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', action._params ,me.lunarCallback);
    	},10);
    },
    lunarCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sindo_gbn', '', action._params ,me.sindoGbnCallback);
    	},10);
    },
    sindoGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_last_schola', '', action._params ,me.scoholaCallback);
    	},10);
    },
    sindoGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_last_schola', '', action._params ,me.scoholaCallback);
    	},10);
    },
    sindoGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_main','', action._params ,me.dsSinCallback);
    	},10);
    },
    dsSinCallback : function(me, success, form, action){
    	if( success  && me.getViewModel().getStore('ds_main').getCount() > 0 ){
    		var record = me.getViewModel().getStore('ds_main').getAt(0);
    		
    		console.log('dsSinCallback = ',record);
    		
    		me.lookupReference('txt_email2').setReadOnly(true);
    		me.lookupReference('txt_email2').setFieldStyle('background-color:#d0e4f3;');
    		me.lookupReference('sel_mobile_telno').setExValue("");
    		
    		me.lookupReference('lc_sindo_gbn').setExValue( record.get("SINDO_GBN") );
    		me.lookupReference('txt_bud_code').setExValue( record.get("BUD_CODE") );
    		me.lookupReference('em_zip_cd').setExValue( record.get("ZIP_CD") );
    		me.lookupReference('txt_addr1').setExValue( record.get("ADDR1") );
    		me.lookupReference('txt_addr2').setExValue( record.get("ADDR2") );
    		me.lookupReference('txt_addr3').setExValue( record.get("ADDR3") );
    		me.lookupReference('txt_bldg_num').setExValue( record.get("BLDG_NUM") );
    		me.lookupReference('lc_telno').setExValue( record.get("TELNO1") );
    		me.lookupReference('txt_telno2').setValue( record.get("TELNO2") );
    		me.lookupReference('txt_telno3').setValue( record.get("TELNO3") );
    		me.lookupReference('txt_hwaju_bud_name').setExValue( record.get("HWAJU_BUD_NAME") );
    		me.lookupReference('txt_hwaju_bud_no').setExValue( record.get("HWAJU_BUD_NO") );
    		me.lookupReference('txt_represen_rel').setExValue( record.get("REPRESEN_REL") );
    		me.lookupReference('lc_sex_gbn').setExValue( record.get("SEX_GBN") );
    		me.lookupReference('txt_name_kor').setExValue( record.get("NAME_KOR") );
    		me.lookupReference('txt_sacred_kor').setExValue( record.get("SACRED_KOR") );
    		me.lookupReference('lc_lunar_solar').setExValue( record.get("LUNAR_SOLAR") );    		
    		me.lookupReference('lc_mobile_telno1').setExValue( record.get("MOBILE_TELNO1") );
    		me.lookupReference('txt_mobile_telno2').setValue( record.get("MOBILE_TELNO2") );
    		me.lookupReference('txt_mobile_telno3').setValue( record.get("MOBILE_TELNO3") );
    		me.lookupReference('txt_email1').setExValue( record.get("EMAIL1") );
    		me.lookupReference('txt_email2').setExValue( record.get("EMAIL2") );
    		me.lookupReference('lc_sexagenary').setExValue( record.get("SEXAGENARY") );
    		me.lookupReference('txt_leap_month').setExValue( record.get("LEAP_MONTH") );
    		me.lookupReference('ta_memo').setExValue( record.get("MEMO") );
    		me.lookupReference('cb_post_trans').setExValue( record.get("POST_TRANS") );    		
    		me.lookupReference('cb_sms_trans').setExValue( record.get("SMS_TRANS") );
    		me.lookupReference('cb_birth_trans').setExValue( record.get("SMS_BIRTH_TRANS") );
    		me.lookupReference('cb_group_trans').setExValue( record.get("SMS_GROUP_TRANS") );
    	
    		var BIRTHDAY   = exCommon.getRepVal(record.get("BIRTHDAY") );
    		var ISSUE_DATE = exCommon.getRepVal(record.get("ISSUE_DATE") );
    		
    		me.lookupReference('em_birthday').setExValue( BIRTHDAY );
    		me.lookupReference('em_issue_date').setExValue( ISSUE_DATE);
    		
    		if(record.get("SMS_TRANS") == 1 && record.get("SMS_BIRTH_TRANS") == 1 && record.get("SMS_GROUP_TRANS") == 1){
    			me.lookupReference('all_sms').setExValue(1);
    		}else{
    			me.lookupReference('all_sms').setExValue(0);
    		}
    		
    		// 추가
    		me.lookupReference('em_card_issue_date').setExValue( record.get("CARD_ISSUE_DATE") );
    		me.lookupReference('cb_hwaju_yn').setExValue( record.get("HWAJU_YN") );
    		me.lookupReference('cb_news_yn').setExValue( record.get("NEWS_YN") );
    		me.lookupReference('txt_card_issue_cnt').setExValue( record.get("CARD_ISSUE_CNT") );
    		me.lookupReference('lc_last_schola').setExValue( record.get("LAST_SCHOLA") );
    		me.lookupReference('txt_etc1').setExValue( record.get("ETC1") );
    		me.lookupReference('txt_interest').setExValue( record.get("INTEREST") );
    		me.lookupReference('txt_skill').setExValue( record.get("SKILL") );
    		me.lookupReference('txt_company_name').setExValue( record.get("COMPANY_NAME") );
    		me.lookupReference('txt_company_pos').setExValue( record.get("COMPANY_POS") );
    		me.lookupReference('lc_company_tel1').setExValue( record.get("COMPANY_TEL1") );
    		me.lookupReference('txt_company_tel2').setExValue( record.get("COMPANY_TEL2") );
    		me.lookupReference('txt_company_tel3').setExValue( record.get("COMPANY_TEL3") );
    		me.lookupReference('txt_entrance_cd').setExValue( record.get("ENTRANCE_CD") );
    		me.lookupReference('txt_qualification').setExValue( record.get("QUALIFICATION") );
    		me.lookupReference('txt_sachal_name').setExValue( record.get("SACHAL_NAME") );
    		
    		me.lookupReference('txt_name_han').setExValue( record.get("QUALIFICATION") );
    		me.lookupReference('txt_sacred_han').setExValue( record.get("SACHAL_NAME") );
    		
    		
    		me.lookupReference('hid_bud_no').setExValue( record.get("BUD_NO") );
    		me.lookupReference('hid_daeje_bud_no').setExValue( record.get("DAEJU_BUD_NO") );
    		me.lookupReference('hid_sort_seq').setExValue( record.get("SORT_SEQ") );
    		
    		
    		var BIRTHTIME = exCommon.getRepVal(record.get("BIRTHTIME"));
    		
    		if(BIRTHTIME != ""){
    			me.lookupReference('sel_birthtime1').setValue( BIRTHTIME.substr(0,2) );
        		me.lookupReference('sel_birthtime2').setValue( BIRTHTIME.substr(2,2) );
    		}
    		
    	}
    },
    onInit:function(me){},
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
    onSearchHwaju : function(){
    	var me = this;
    	
    	if(me.getViewModel().getStore('ds_main').getCount() == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
    		},50);
    		return;
    	}
    	
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
    onSave : function(){
    	var me = this;
    	
    	if(me.lookupReference('regform').invalidateForm() == false){
            return;
        }
    	
    	var BIRHT_TIME1 = exCommon.getRepVal( me.lookupReference('sel_birthtime1').getRawValue() );
    	var BIRHT_TIME2 = exCommon.getRepVal( me.lookupReference('sel_birthtime2').getRawValue() );
    	
    	
    	if(BIRHT_TIME1 != "" &&  BIRHT_TIME2 == ""){
    		setTimeout(function(){
    			Ext.Msg.alert('경고', "생분을 선택하세요.");
    		},50);
    		me.lookupReference('sel_birthtime2').focus();
    		return;
    	}
    	
    	if(BIRHT_TIME1 == "" &&  BIRHT_TIME2 != ""){
    		setTimeout(function(){
    			Ext.Msg.alert('경고', "생시을 선택하세요.");
    		},50);
    		me.lookupReference('sel_birthtime1').focus();
    		return;
    	}
    	
    	var BIRHT_TIME = BIRHT_TIME1 + ""+ BIRHT_TIME2;
    	me.lookupReference('sel_birthtime').setExValue(BIRHT_TIME);
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/sin/SIN001P_05/saveSindoDetail.suvila', me.onSaveCallback , false);
    			},10);	
    		}
    	});
    	
    },
    onSaveCallback : function(me, success, form, action){
    	
    	var callback = Ext.decode(action.response.responseText);
    	Ext.Msg.alert("알림", callback.msg);
    	
    	if(success){
    		var BUD_CODE= me.lookupReference('txt_bud_code').getExValue();
    		setTimeout(function(){
    			me.receiveTo(BUD_CODE, true);
    		},50);	
    		
    	}
    	
    	
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	me.getView().destroy();
    }
    
})