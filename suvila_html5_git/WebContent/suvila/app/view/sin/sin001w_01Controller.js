Ext.define('ExFrm.view.sin.sin001w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001w_01',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    loadStorDate:[],
    loadStorDatekPoP : function(me){
    	var cnt = me.loadStorDate.length ;
    	for(var i = 0; i<cnt ; i++){
    		me.loadStorDate.pop();
    	}
    },
    loadState:[],
    loadStatePoP : function(me){
    	var cnt = me.loadState.length ;
    	for(var i = 0; i<cnt ; i++){
    		me.loadState.pop();
    	}
    },
    onHelp:function(){},
    onDestroy:function(me){
    	var me = this;
    	me.loadStorDatekPoP(me);
    	me.loadStatePoP(me);
    	
    	console.log('onDestroy');
    },
    onAfterRender:function(me){
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('txt_stipulation').focus();
    	me.lookupReference('txt_sel_index').setExValue(-1);
    	
    },
    onInit:function(me){
    	
    	me.loadStorDatekPoP(me);
    	me.loadStatePoP(me);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_telno1', '', null ,me.dsTelnoCallback);
    	},50);
    },
    dsTelnoCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_mobile_telno1', '', null ,me.dsMobileTelCallback);
    	},50);
    },
    dsMobileTelCallback : function(me, success, form, action){
    	/*
    	var row = me.getViewModel().getStore('ds_mobile_telno1').getCount();
    	for(var i = row-1 ; i>= 1; i--){
    		var data = {
    			 CODE : me.getViewModel().getStore('ds_mobile_telno1').getAt(i).get("CODE")
    			,NAME : me.getViewModel().getStore('ds_mobile_telno1').getAt(i).get("NAME")
    		}
    		me.getViewModel().getStore('ds_telno1').insert(1, data);
    	}// for
    	*/
    	setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', null ,me.dsLunarSolarCallback);
    	},50);
    },
    dsLunarSolarCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_ganjiMaster', '', null ,me.dsCanjiCallback);
    	},50);
    },
    dsCanjiCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sex_gbn', '', null ,me.dsSexGbnCallbck);
    	},50);
    },
    dsSexGbnCallbck : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sindo_gbn', '', null ,null);
    	},50);
    	/*
    	me.lookupReference('txt_stipulation').setExValue("00011");
    	me.onSindoSearch();
    	*/
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSindoSearch();
    	}
    },
    onKeyUpTel : function(me2, e, eOpts ){
    	var me = this;
    	
    	try{
    		
    		var  textNm = me2.reference;
    		
    		var txtTelno = exCommon.getRepVal(me.lookupReference(textNm).getExValue(),"");
        	
        	if( !(e.keyCode >= 48 && e.keyCode<= 57)){
        		//txtTelno = txtTelno.substr(0, txtTelno.length-1);
        		txtTelno = txtTelno.replace(/[^0-9]/g,"");
        	}
        	me.lookupReference(textNm).setExValue( txtTelno );
        	
        	if(txtTelno.length > 4){
        		me.lookupReference(textNm).setExValue( txtTelno.substr(0,4) );
        	}
        	
        	if(txtTelno.length == 4){
	        	if(textNm == 'txt_telno2'){
	            	me.lookupReference('txt_telno3').focus();
	    		}
	        	
	        	if(textNm == 'txt_mobile_telno2'){
	            	me.lookupReference('txt_mobile_telno3').focus();
	    		}
        	}
    	}catch (e) {}
    },
    onSindoSearch : function(){
    	var me = this;
    	console.log('onSindoSearch');
    	
    	var searchValue = "";
    	var searchgbn   =  me.lookupReference('cb_Stipulation').getExValue();
    	var searchword  =  me.lookupReference('txt_stipulation').getExValue();
    	var flag        = false;
    	
    	
    	if(searchword == "" || searchword == null || searchword == undefined){
    		
    		var msg = "신도명을 입력 후 조회 버튼을 눌러주세요.";
    		if(searchgbn == "BUD_NO"){
    			msg = "신도번호를 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "CARD_NO"){
    			msg = "카드번호을 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "SACRED_KOR"){
    			msg = "법명을 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "MOBILE_TELNO"){
    			msg = "핸드폰번호를 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "TELNO"){
    			msg = "전화번호를 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "YOUNGGA"){
    			msg = "영가명을 입력 후 조회 버튼을 눌러주세요.";
    		}	
    		setTimeout(function(){
				Ext.Msg.alert('알림', msg);    				
			},50);
    		
    		me.lookupReference('txt_stipulation').focus();
    		
    		return;
    	}
    	
    	
    	searchValue = me.lookupReference('txt_stipulation').getExValue();
		
		var pos   = searchValue.indexOf('5243350001313266');		
		var fCard = searchValue.indexOf('=');
		var bCard = searchValue.lastIndexOf('=');
		var cNum  = searchValue.indexOf('=1234567');
    	
		
		if( pos != -1 ){
			
			flag = true;
			
			searchValue = searchValue.substr(0, searchValue.indexOf('=') );
			
			me.lookupReference('txt_stipulation').setExValue("");
			me.lookupReference('pre_cb_Stipulation').setExValue( me.lookupReference('cb_Stipulation').getExValue() );
			me.lookupReference('card_stipulation').setExValue(searchValue);
			/*ds_cardBud.DataID = "/asp/BudSearch.bf?searchgbn=CARD&searchword="+$('#card_stipulation').val()+"&action=sindo";
			gf_Process(ds_cardBud);*/
		} else if(fCard >= -1  && bCard > 0 ){

			flag = true;
			
			searchValue  = searchValue.substr(fCard, (bCard-fCard+1) ) ;
			me.lookupReference('txt_stipulation').setExValue("");
			me.lookupReference('card_stipulation').setExValue(searchValue);

			/*ds_cardBud.DataID = "/asp/BudSearch.bf?searchgbn=CARD&searchword="+$('#card_stipulation').val()+"&action=sindo";
			gf_Process(ds_cardBud);*/
		}else if(searchgbn == "CARD_NO"){
			flag = true;
			searchValue = searchValue

			me.lookupReference('card_stipulation').setExValue(searchValue);
			me.lookupReference('pre_cb_Stipulation').setExValue(searchValue);
			
			/*ds_cardBud.DataID = "/asp/BudSearch.bf?searchgbn=CARD_NO&searchword="+$('#card_stipulation').val()+"&action=sindo";
			gf_Process(ds_cardBud);*/
		}else{
			if(searchgbn == "BUD_NO"){
				if(searchword.length < 5){
					for(var a=searchword.length; a<5; a++){
						searchword = "0" + searchword;
					}					
					me.lookupReference('txt_stipulation').setExValue(searchword);
					
				}//
			}//
		}
		
		if( !flag ){
			exCommon.setCustCardNo("");
			
			/*frame.Provider("../../").document.getElementById("setCardNo").value = "";
		    gf_SetBudFind(rtnVal, cb_Stipulation, txt_stipulation);
			var as_argArrary = rtnVal.split(";");		
			
			on_SearchSindo(as_argArrary[2]);
			ds_pray_except.ClearDat*/
			
			exCommon.onSindoSearch(
	    		 me.lookupReference('cb_Stipulation')
	    		,me.lookupReference('txt_stipulation')
	    		,me
	    		,me.onSindoSearchReceive
	    	);
		}
    	
    },
    onSindoSearchReceive : function(params, me){
    	var sel_BudSearchGbn = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_stipulation  = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_budNo        = me.lookupReference('hid_bud_no').getExValue( );
    	
    	
    	gf_SetBudFind(params, 
    			      me.lookupReference('cb_Stipulation'), 
    			      me.lookupReference('txt_stipulation'), 
    			      me.lookupReference('hid_bud_no') );
    	
    	
    	me.onSelectSindo();
    	closeDaumPostcode();
    },
    onFindAddr : function(){
    	console.log(11111);
    	var me = this;
    	find_addr(
    		  me 
    		,'em_zip_cd'
    		,'txt_addr1'
    		,'txt_addr3'
    		,'txt_bldg_num' 
    		,'txt_addr2'
    		,'layerSin001'
    	);
    	
    },    
    onFindAddrReceive : function(params, me){
    	me.lookupReference('em_zip_cd').setExValue(params.ZIPCODE);
    	me.lookupReference('txt_addr1').setExValue(params.ADDR1);
    	me.lookupReference('txt_addr3').setExValue(params.ADDR3);
    	me.lookupReference('txt_bldg_num').setExValue(params.BLDG_NUM);
    	me.lookupReference('txt_addr2').focus();
    },
    onSelectSindo : function(){
    	var me = this;
    	
    	if(me.lookupReference('txt_stipulation').getExValue() == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		return;
    	}
    	
    	
    	var params ={
    		V_BUD_CODE : me.lookupReference('hid_bud_no').getExValue().substr(0,10)
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectSindoCallback);
    	},10);
    },
    onSelectSindoCallback: function(me, success, form, action){
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue(-1);
    		me.loadStatePoP(me);
    		me.lookupReference('sin001w_01_a').getView().select(0);
    		me.getViewModel().getStore('ds_pray_except').removeAll();
    		
    		var row = me.getViewModel().getStore('ds_main').getCount();
    		for(var i = 0; i < row ; i++){
    			var record = me.getViewModel().getStore('ds_main').getAt(i);
    			var SEXAGENARY = exCommon.getRepVal(record.get("SEXAGENARY") , '');
    			var FMLY_SEXAGENARY = '';
    			
    			if(SEXAGENARY != ''){
    				var findRecord =  me.getViewModel().getStore('ds_ganjiMaster').findRecord('CODE', SEXAGENARY, 0, false, true, true);
    				FMLY_SEXAGENARY = findRecord.get("NAME")+ "생";
    			}
    			record.set("FMLY_SEXAGENARY", FMLY_SEXAGENARY);
    			
    		}
    		
    	}
    },
    onDownUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(_tCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('sin001w_01_a').getStore().indexOf(selection);
    	
    	if(selection.length > 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '신도 한명씩 선택후 정렬할수 있습니다.');    				
    		},50);
    		return;
    	}
    	
    	if(_tCnt == (_idx+1) ){
    		return false;
    	}
    	var downRecord   = me.lookupReference('sin001w_01_a').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.lookupReference('txt_sort_seq').setValue(downSortSeq);
    	
    	me.getViewModel().getStore('ds_main').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    	me.lookupReference('txt_sel_index').setExValue(-1);
    },
    onSortUp : function(){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('sin001w_01_a').getStore().indexOf(selection);
    	
    	if(selection.length > 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '신도 한명씩 선택후 정렬할수 있습니다.');    				
    		},50);
    		return;
    	}
    	
    	if(_idx == 0){
			return false;
		}
    	
    	var upRecord      = me.lookupReference('sin001w_01_a').getStore().getAt(_idx-1);
    	var upSortSeq     = upRecord.get("SORT_SEQ");
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_main').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    	
    	me.lookupReference('txt_sort_seq').setValue(upSortSeq);
    	me.lookupReference('txt_sel_index').setValue(-1);
    	
    
    },
    inSettingRecord : function(me , index){
    	
    	
    	try{
    		var pre_record = me.getViewModel().getStore('ds_main').getAt(index);
    		
    		console.log('inSettingRecord = ', index);
    		console.log(pre_record);
    		
			
    		pre_record.set("SINDO_GBN"           , exCommon.getRepVal(me.lookupReference('lc_sindo_gbn').getExValue() ,'') );
    		pre_record.set("BUD_CODE"            , exCommon.getRepVal(me.lookupReference('txt_bud_code').getExValue() ,'') );
    		pre_record.set("ZIP_CD"              , exCommon.getRepVal(me.lookupReference('em_zip_cd').getExValue() ,'') );
    		pre_record.set("ADDR1"               , exCommon.getRepVal(me.lookupReference('txt_addr1').getExValue() ,'') );
    		pre_record.set("ADDR2"               , exCommon.getRepVal(me.lookupReference('txt_addr2').getExValue() ,'') );
    		pre_record.set("ADDR3"               , exCommon.getRepVal(me.lookupReference('txt_addr3').getExValue() ,'') );
    		pre_record.set("BLDG_NUM"            , exCommon.getRepVal(me.lookupReference('txt_bldg_num').getExValue() ,'') );
    		pre_record.set("TELNO1"              , exCommon.getRepVal(me.lookupReference('lc_telno').getExValue() ,'') );
    		pre_record.set("TELNO2"              , exCommon.getRepVal(me.lookupReference('txt_telno2').getValue() ,'') );
    		pre_record.set("TELNO3"              , exCommon.getRepVal(me.lookupReference('txt_telno3').getValue() ,'') );
    		pre_record.set("HWAJU_BUD_NAME"      , exCommon.getRepVal(me.lookupReference('txt_hwaju_bud_name').getExValue() ,'') );
    		pre_record.set("HWAJU_BUD_NO"        , exCommon.getRepVal(me.lookupReference('txt_hwaju_bud_no').getExValue() ,'') );
    		pre_record.set("REPRESEN_REL"        , exCommon.getRepVal(me.lookupReference('txt_represen_rel').getExValue() ,'') );
    		pre_record.set("SEX_GBN"             , exCommon.getRepVal(me.lookupReference('lc_sex_gbn').getExValue() ,'') );
    		pre_record.set("NAME_KOR"            , exCommon.getRepVal(me.lookupReference('txt_name_kor').getExValue() ,'') );
    		pre_record.set("SACRED_KOR"          , exCommon.getRepVal(me.lookupReference('txt_sacred_kor').getExValue() ,'') );
    		pre_record.set("LUNAR_SOLAR"         , exCommon.getRepVal(me.lookupReference('lc_lunar_solar').getExValue() ,'') );
    		pre_record.set("BIRTHDAY"            , exCommon.getRepVal(me.lookupReference('em_birthday').getExValue() ,'') );
    		pre_record.set("MOBILE_TELNO1"       , exCommon.getRepVal(me.lookupReference('lc_mobile_telno1').getExValue() ,'') );
    		pre_record.set("MOBILE_TELNO2"       , exCommon.getRepVal(me.lookupReference('txt_mobile_telno2').getValue() ,'') );
    		pre_record.set("MOBILE_TELNO3"       , exCommon.getRepVal(me.lookupReference('txt_mobile_telno3').getValue() ,'') );
    		pre_record.set("EMAIL1"              , exCommon.getRepVal(me.lookupReference('txt_email1').getExValue() ,'') );
	    	pre_record.set("EMAIL2"              , exCommon.getRepVal(me.lookupReference('txt_email2').getExValue() ,'') );
	    	pre_record.set("SEXAGENARY"          , exCommon.getRepVal(me.lookupReference('lc_sexagenary').getExValue() ,'') );
	    	pre_record.set("LEAP_MONTH"          , exCommon.getRepVal(me.lookupReference('txt_leap_month').getExValue() ,'') );
	    	pre_record.set("ISSUE_DATE"          , exCommon.getRepVal(me.lookupReference('em_issue_date').getExValue() ,'') );
	    	pre_record.set("MEMO"                , exCommon.getRepVal(me.lookupReference('ta_memo').getExValue() ,'') );
	    	
	    	pre_record.set("POST_TRANS"          , exCommon.getRepVal(me.lookupReference('cb_post_trans').getExValue() ,'') );
	    	pre_record.set("SMS_TRANS"           , exCommon.getRepVal(me.lookupReference('cb_sms_trans').getExValue() ,'') );
	    	pre_record.set("SMS_BIRTH_TRANS"     , exCommon.getRepVal(me.lookupReference('cb_birth_trans').getExValue() ,'') );
	    	pre_record.set("SMS_GROUP_TRANS"     , exCommon.getRepVal(me.lookupReference('cb_group_trans').getExValue() ,'') );
	    	
	    	pre_record.set("SORT_SEQ"            , exCommon.getRepVal(me.lookupReference('txt_sort_seq').getValue() ,'') );
	    	
	    	var MOBILE_TELNO = exCommon.getRepVal(me.lookupReference('lc_mobile_telno1').getExValue(),'') 
	    					  + "-" + exCommon.getRepVal(me.lookupReference('txt_mobile_telno2').getValue(),'') 
	    					  + "-" + exCommon.getRepVal(me.lookupReference('txt_mobile_telno3').getValue(),'');
	    	MOBILE_TELNO = MOBILE_TELNO.replace('--', '');
	    	
	    	pre_record.set("MOBILE_TELNO"            , MOBILE_TELNO);
	    	
	    	
	    	//console.log("DAEJU_YN = ", selection.get("DAEJU_YN"));
	    	
	    	var OLD_DAEJU_YN = exCommon.getRepVal(pre_record.get("DAEJU_YN"),'');
	    	var DAEJU_YN     = exCommon.getRepVal(me.lookupReference('cb_daeju_yn').getExValue(),'');
	    	
	    	if(DAEJU_YN){    	
	    		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
	    		for(var i =0; i < rowCnt ; i++){
	    			var RECORD_DAEJU_YN = me.lookupReference('sin001w_01_a').getStore().getAt(i).get("DAEJU_YN");
	    			if(RECORD_DAEJU_YN || RECORD_DAEJU_YN == 0){
	    				me.lookupReference('sin001w_01_a').getStore().getAt(i).set("DAEJU_YN" ,false);
	    			}
	    		}// for
	    	}// if
	    	
	    	if( (OLD_DAEJU_YN || OLD_DAEJU_YN == 1)  && !DAEJU_YN){
	    		pre_record.set("DAEJU_YN"            ,true);
	    	}else{
	    		pre_record.set("DAEJU_YN"            , me.lookupReference('cb_daeju_yn').getExValue());
	    	}
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0){
    			me.lookupReference('txt_sel_index').setExValue(-1);
    			return;
    		}
    		
    		//이전값 세팅
			var preIndex    = me.lookupReference('txt_sel_index').getExValue();
			if(preIndex != -1){
				console.log('preIndex = ', preIndex);
				me.inSettingRecord(me, preIndex);
			}// if preIndex
    		
			var nowIndex       = me.lookupReference('sin001w_01_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
			
    		
    		me.lookupReference('txt_email2').setReadOnly(true);
    		me.lookupReference('txt_email2').setFieldStyle('background-color:#d0e4f3;');
    		me.lookupReference('sel_mobile_telno').setExValue("");
    		
    		me.lookupReference('lc_sindo_gbn').setExValue( exCommon.getRepVal(record[0].get("SINDO_GBN"),'') );
    		me.lookupReference('txt_bud_code').setExValue( exCommon.getRepVal(record[0].get("BUD_CODE"),'') );
    		me.lookupReference('em_zip_cd').setExValue( exCommon.getRepVal(record[0].get("ZIP_CD"),'') );
    		me.lookupReference('txt_addr1').setExValue( exCommon.getRepVal(record[0].get("ADDR1"),'') );
    		me.lookupReference('txt_addr2').setExValue( exCommon.getRepVal(record[0].get("ADDR2"),'') );
    		me.lookupReference('txt_addr3').setExValue( exCommon.getRepVal(record[0].get("ADDR3"),'') );
    		me.lookupReference('txt_bldg_num').setExValue( exCommon.getRepVal(record[0].get("BLDG_NUM"),'') );
    		me.lookupReference('lc_telno').setExValue(exCommon.getRepVal( record[0].get("TELNO1"),'') );
    		me.lookupReference('txt_telno2').setValue( exCommon.getRepVal(record[0].get("TELNO2"),'') );
    		me.lookupReference('txt_telno3').setValue( exCommon.getRepVal(record[0].get("TELNO3"),'') );
    		me.lookupReference('txt_hwaju_bud_name').setExValue(exCommon.getRepVal( record[0].get("HWAJU_BUD_NAME"),'') );
    		me.lookupReference('txt_hwaju_bud_no').setExValue( exCommon.getRepVal(record[0].get("HWAJU_BUD_NO"),'') );
    		me.lookupReference('txt_represen_rel').setExValue( exCommon.getRepVal(record[0].get("REPRESEN_REL"),'') );
    		me.lookupReference('lc_sex_gbn').setExValue( exCommon.getRepVal(record[0].get("SEX_GBN"),'') );
    		me.lookupReference('txt_name_kor').setExValue( exCommon.getRepVal(record[0].get("NAME_KOR"),'') );
    		me.lookupReference('txt_sacred_kor').setExValue( exCommon.getRepVal(record[0].get("SACRED_KOR"),'') );
    		me.lookupReference('lc_lunar_solar').setExValue( exCommon.getRepVal(record[0].get("LUNAR_SOLAR"),'') );    		
    		me.lookupReference('lc_mobile_telno1').setExValue( exCommon.getRepVal(record[0].get("MOBILE_TELNO1"),'') );
    		me.lookupReference('txt_mobile_telno2').setValue( exCommon.getRepVal(record[0].get("MOBILE_TELNO2"),'') );
    		me.lookupReference('txt_mobile_telno3').setValue( exCommon.getRepVal(record[0].get("MOBILE_TELNO3"),'') );
    		me.lookupReference('txt_email1').setExValue( exCommon.getRepVal(record[0].get("EMAIL1"),'') );
    		me.lookupReference('txt_email2').setExValue( exCommon.getRepVal(record[0].get("EMAIL2"),'') );
    		me.lookupReference('lc_sexagenary').setExValue( exCommon.getRepVal(record[0].get("SEXAGENARY"),'') );
    		me.lookupReference('txt_leap_month').setExValue( exCommon.getRepVal(record[0].get("LEAP_MONTH"),'') );
    		
    		
    		me.lookupReference('ta_memo').setExValue( exCommon.getRepVal(record[0].get("MEMO"),'') );
    		
    		me.lookupReference('cb_post_trans').setExValue( exCommon.getRepVal(record[0].get("POST_TRANS"),'') );    		
    		me.lookupReference('cb_daeju_yn').setExValue( exCommon.getRepVal(record[0].get("DAEJU_YN") ,''));
    		
    		me.lookupReference('cb_sms_trans').setExValue( exCommon.getRepVal(record[0].get("SMS_TRANS") ,''));
    		me.lookupReference('cb_birth_trans').setExValue( exCommon.getRepVal(record[0].get("SMS_BIRTH_TRANS") ,''));
    		me.lookupReference('cb_group_trans').setExValue( exCommon.getRepVal(record[0].get("SMS_GROUP_TRANS") ,''));
    		
    		
    		var BIRTHDAY   = exCommon.getRepVal(exCommon.getRepVal(record[0].get("BIRTHDAY"),'') );
    		var ISSUE_DATE = exCommon.getRepVal(exCommon.getRepVal(record[0].get("ISSUE_DATE"),'') );
    		
    		me.lookupReference('em_birthday').setExValue( BIRTHDAY );
    		me.lookupReference('em_issue_date').setExValue( ISSUE_DATE);
    		me.lookupReference('txt_sort_seq').setValue( exCommon.getRepVal(record[0].get("SORT_SEQ"), ''));
    		
    		
    		if(record[0].get("SMS_TRANS") == 1 && record[0].get("SMS_BIRTH_TRANS") == 1 && record[0].get("SMS_GROUP_TRANS") == 1){
    			me.lookupReference('all_sms').setExValue(1);
    		}else{
    			me.lookupReference('all_sms').setExValue(0);
    		}
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onTempSave : function(){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	
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
    	
    	selection.set("SORT_SEQ"            , me.lookupReference('txt_sort_seq').getValue());
    	
    	
    	//console.log("DAEJU_YN = ", selection.get("DAEJU_YN"));
    	
    	var OLD_DAEJU_YN = selection.get("DAEJU_YN");
    	var DAEJU_YN     = me.lookupReference('cb_daeju_yn').getExValue();
    	
    	if(DAEJU_YN){    	
    		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    		for(var i =0; i < rowCnt ; i++){
    			var RECORD_DAEJU_YN = me.lookupReference('sin001w_01_a').getStore().getAt(i).get("DAEJU_YN");
    			if(RECORD_DAEJU_YN || RECORD_DAEJU_YN == 0){
    				me.lookupReference('sin001w_01_a').getStore().getAt(i).set("DAEJU_YN" ,false);
    			}
    		}// for
    	}// if
    	
    	if( (OLD_DAEJU_YN || OLD_DAEJU_YN == 1)  && !DAEJU_YN){
    		selection.set("DAEJU_YN"            ,true);
    	}else{
    		selection.set("DAEJU_YN"            , me.lookupReference('cb_daeju_yn').getExValue());
    	}
    	
    	
    },
    onBasicInfo : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection();
    	
    	var selectRow   = selection.length;
    	var selectSindo = 0;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount(); 
    	if( rowCnt  == 0){
			setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색 후 작업하세요');    				
			},50);
    	}
	
    	if( rowCnt  == 1){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 등록된 신도가 한명인 경우에는 사용할수 없습니다.');    				
			},50);
    		
    		return;
    	}
    	
		var data = selection[0];
		
		
		var name = data.get("NAME_KOR");
		
		selectSindo = selection.length;
		
		if(selection.length == 1){
			selectSindo =  rowCnt;
		}
		
		var comfirmMsg = "선택하신 "+selectSindo+"명의 가족을 <span style='font-weight:700;color:blue;'>"+ name + "</span>님의 정보로<br/>가족 기본정보를 변경 하시겠습니까?"
		
		Ext.MessageBox.confirm('알림', comfirmMsg, function(btn){
    		if (btn == 'yes') {
    			
    			if(selectRow != 1){
	    			for(var i = 0; i < selection.length ; i++){
	    				selection[i].set("GBN_CODE"    , data.get("GBN_CODE"));
	    				selection[i].set("BRANCH_CODE" , data.get("BRANCH_CODE"));
	    				selection[i].set("ZIP_CD"      , data.get("ZIP_CD"));
	    				selection[i].set("ADDR1"       , data.get("ADDR1"));
	    				selection[i].set("ADDR2"       , data.get("ADDR2"));
	    				selection[i].set("ADDR3"       , data.get("ADDR3"));
	    				selection[i].set("BLDG_NUM"    , data.get("BLDG_NUM"));
	    				selection[i].set("TELNO1"      , data.get("TELNO1"));
	    				selection[i].set("TELNO2"      , data.get("TELNO2"));
	    				selection[i].set("TELNO3"      , data.get("TELNO3"));
	    				
	    				if( exCommon.user.templeCd == "000031" ){
	    					selection[i].set("SINDO_GBN" , data.get("SINDO_GBN"));
	    				}
	    			}// for
				}else if(selectRow == 1){
					for(var i = 0; i < rowCnt ; i++){
						
						var subData = me.lookupReference('sin001w_01_a').getStore().getAt(i);
						subData.set("GBN_CODE"    , data.get("GBN_CODE"));
						subData.set("BRANCH_CODE" , data.get("BRANCH_CODE"));
						subData.set("ZIP_CD"      , data.get("ZIP_CD"));
	    				subData.set("ADDR1"       , data.get("ADDR1"));
	    				subData.set("ADDR2"       , data.get("ADDR2"));
	    				subData.set("ADDR3"       , data.get("ADDR3"));
	    				subData.set("BLDG_NUM"    , data.get("BLDG_NUM"));
	    				subData.set("TELNO1"      , data.get("TELNO1"));
	    				subData.set("TELNO2"      , data.get("TELNO2"));
	    				subData.set("TELNO3"      , data.get("TELNO3"));
	    				
	    				if( exCommon.user.templeCd == "000031" ){
	    					subData.set("SINDO_GBN" , data.get("SINDO_GBN"));
	    				}
					}// for
        		}// if
    			setTimeout(function(){
    				Ext.Msg.alert('알림', "<span style='font-weight:700;color:blue;'>"+ name + "</span>님의 정보로공유되었습니다.");    				
    			},50);
    		}
    	});
    		
    	
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin001w_01_a');
    	    	
    	exCommon.excelDown(grid, 'SindoInfo', '신도정보',  me.getViewModel().getStore('ds_main').getCount());
    },
    onPray : function(){
    	var me = this;
    	
    	var stroe = me.getViewModel().getStore('ds_main');
    	
    	var rowCnt = stroe.getCount(); 
    	if( rowCnt  == 0){
			setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색 후 작업하세요');    				
			},50);
    	}
    	
    	var url = 'ExFrm.view.sin.sin001p_07';
    	if(exCommon.user.death_type == '2'){
    		url = 'ExFrm.view.sin.sin001p_07_000031';
    	}
    	
    	
    	me.openPopup(url,  stroe, null);
    },
    isValidation : function(me){
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row; i++){    		
    		
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "SINDO_GBN"  , "신도구분" ) ){
    			me.lookupReference('lc_sindo_gbn').focus();
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "SEX_GBN"  , "성별" ) ){
    			me.lookupReference('lc_sex_gbn').focus();
    			return false;
    		}
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "NAME_KOR"  , "성명" ) ){
    			me.lookupReference('txt_name_kor').focus();
    			return false;
    		}
    		
    		var NAME_KOR = record.get("NAME_KOR");
    		if(NAME_KOR.length >= 11){
    			setTimeout(function(){
    				Ext.Msg.alert('알림',  '성명은 공백포함 최대 10자까지 가능합니다.');    				
    			},50);
    			me.lookupReference('txt_name_kor').focus();
    			return false;
    		}
    		
    		
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "NAME_KOR"  , "성명" ) ){
    			me.lookupReference('txt_name_kor').focus();
    			return false;
    		}
    		
    		
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "REPRESEN_REL"  , "관계" ) ){
    			me.lookupReference('txt_represen_rel').focus();
    			return false;
    		}
    		
    		var DAEJU_YN         = record.get("DAEJU_YN");
    		var POST_TRANS       = record.get("POST_TRANS");
    		var EMAIL_TRANS      = record.get("EMAIL_TRANS");
    		var SMS_TRANS        = record.get("SMS_TRANS");
    		var SMS_BIRTH_TRANS  = record.get("SMS_BIRTH_TRANS");
    		var SMS_GROUP_TRANS  = record.get("SMS_GROUP_TRANS");
    		
    		
    		if( (DAEJU_YN || DAEJU_YN == 1) && (POST_TRANS || POST_TRANS == 1) ){
    				
   				if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "ZIP_CD"  , "DM 선택 시 우편번호" ) ) return false;
   				if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "ADDR1"   , "DM 선택 시 주소" ) ) return false;
    			
    		}// DAEJU_YN
    		
    		if( (SMS_TRANS || SMS_TRANS == 1 || SMS_BIRTH_TRANS || SMS_BIRTH_TRANS == 1 || SMS_GROUP_TRANS || SMS_GROUP_TRANS == 1) &&
    			(DAEJU_YN || DAEJU_YN == 1) ){
				
				if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "MOBILE_TELNO1"  , "문자 선택시 휴대전화 번호" ) ){
	    			me.lookupReference('lc_mobile_telno1').focus();
	    			return false;
	    		}
				
				if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "MOBILE_TELNO2"  , "문자 선택시 휴대전화 번호" ) ){
	    			me.lookupReference('txt_mobile_telno2').focus();
	    			return false;
	    		}
				
				if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "MOBILE_TELNO3"  , "문자 선택시 휴대전화 번호" ) ){
	    			me.lookupReference('txt_mobile_telno3').focus();
	    			return false;
	    		}
			}// SMS_TRANS
    		
    		
    		if( (DAEJU_YN || DAEJU_YN == 1)  && (EMAIL_TRANS || EMAIL_TRANS == 1)  ){
    			if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "EMAIL1"  , "EMAIL 선택시 E-Mail" ) ){
	    			me.lookupReference('txt_email1').focus();
	    			return false;
	    		}
    			if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001w_01_a', "EMAIL2"  , "EMAIL 선택시 E-Mail" ) ){
	    			me.lookupReference('txt_email2').focus();
	    			return false;
	    		}
    		}
    	}// for
    	return true;
    },
    inCheckSeq : function(me){
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i< row; i++){
    		me.getViewModel().getStore('ds_main').getAt(i).set("SORT_SEQ", (i+1));
    	}// for
    	
    	me.getViewModel().getStore('ds_main').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    	
    },
    onNewSindo : function(){
    	var me= this;
    	
    	var cnt = exCommon.ChangeCount('ds_main', me);
    	
    	
    	if(cnt > 0 && me.loadState.length == 0){
    		var selectedRecord = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('sin001w_01_a').getStore().indexOf(selectedRecord[0]);
        	me.inSettingRecord(me, index);
    		
    		if(!me.isValidation(me) ) {
        		return;
        	}
    		
    		if( !me.inPopBeforeSindoSave(me) ){
        		return;
        	}
    	}
    	
    	me.onRemoveLastRowSindo(me);
    	if(me.loadState.length > 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', ' 작성중인 신규등록건이 있습니다.');    				
    		},50);
    		return;
    	}
    	
    	me.lookupReference('txt_sel_index').setExValue(-1);
    	
    	
		me.loadState.push(1);
    	me.getViewModel().getStore('ds_main').removeAll();
    	me.getViewModel().getStore('ds_main').commitChanges();
    	
    	
    	var data = {
       		 GBN_CODE       : "01"
       		,BRANCH_CODE    : "0"
       		,DAEJU_YN       : 1
       		,POST_TRANS     : 1
       		,EMAIL_TRANS    : 0
       		,ISSUE_DATE     :  exCommon.getNowDate()
       		,SORT_SEQ       : 1
       		,LUNAR_SOLAR    : "T"
       		,SINDO_GBN      : "T"
       		,SMS_TRANS      : exCommon.user.sin_sms_yn.substr(0,1) == "Y" ? 1 : 0
       		,SMS_BIRTH_TRANS: exCommon.user.sin_sms_yn.substr(1,1) == "Y" ? 1 : 0
       		,SMS_GROUP_TRANS: exCommon.user.sin_sms_yn.substr(2,1) == "Y" ? 1 : 0
       		,SQL_MODE       : 'I'       		
       	}
    	
    	console.log('data = ', data);
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('sin001w_01_a').getView().select(0);
    },
    onSave : function(){
    	var me  = this;
    	
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	if(row > 0){
    		console.log('row >>> 00 Save');
    		var selectedRecord = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('sin001w_01_a').getStore().indexOf(selectedRecord[0]);
        	me.inSettingRecord(me, index);
    	}
    	
    	if(row == 0){
    		exCommon.msgAlert('변경된 자료가 없습니다.');
    		return;
    	}
    	
    	
    	if(me.loadState.length == 0) me.onRemoveLastRowSindo(me); // 기존
    	
    	if(!me.isValidation(me) ) {
    		return;
    	}
    	
    	if(me.loadState.length > 0) me.onRemoveLastRowSindo(me); // 신규
    	
    	me.inCheckSeq(me);
    	
    	
    	if(me.loadState.length == 0){
    		exCommon.fnGridSaveAll(
	    		 me
	    		,'ds_main'
	    		,'newData'
	    		,'uptData'
	    		,'delData'
	    		,'/sin/SIN001W_01/SindoSave.suvila'
	    		,me.onSindoSaveCallback
	    	);
    		return;
    	}
    	console.log('onSave after');
    	
    	me.onNewSindoSave(me);
    	
    },
    onSindoSaveCallback : function(me, success, form, action){
    	me.loadStatePoP(me);
    	
    	if(success){
    		
    		me.loadStatePoP(me);
    		
    		setTimeout(function(){
    			Ext.Msg.alert("알림", "저장되었습니다.");
    		},10);
    		
    		
    		var BUD_CODE = action.result.msg;
    		var params ={
	    		V_BUD_CODE : BUD_CODE
	    	};
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_main', '', params ,me.onSelectSindoCallback);
	    	},10);
	    	
	    	me.lookupReference('txt_sel_index').setExValue(-1);
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert("알림", action.result.msg);
    		});
    	}
    },
    
    onNewSindoSave : function(me){
    	console.log('onNewSindoSave');
    	var row          = me.getViewModel().getStore('ds_main').getCount();
    	var NAME_KOR     = "";
    	var REPRESEN_REL = "";
    	var ZIP_CD       = "";
    	for(var i = 0 ; i<row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		if( record.get("DAEJU_YN") || record.get("DAEJU_YN")  == 1){
    			NAME_KOR     = record.get("NAME_KOR");
    	    	REPRESEN_REL = record.get("REPRESEN_REL");
    	    	ZIP_CD       = record.get("ZIP_CD");
    		}
    	}
    	
    	var params = {
    		 V_REPRESEN_REL : encodeURI( REPRESEN_REL )
    		,V_NAME_KOR     : encodeURI( NAME_KOR )
    		,V_ZIP_CD       : ZIP_CD
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_sin_exist', '', params , me.dsSinCallBack);
    	},50);
    },
    dsSinCallBack : function(me, success, form, action){
    	if(success &&  me.getViewModel().getStore('ds_sin_exist').getCount() > 0){
    		 
    		var record = me.getViewModel().getStore('ds_sin_exist').getAt(0);
    		var row    = me.getViewModel().getStore('ds_sin_exist').getCount();
    		
    		var msg = record.get("NAME_KOR")+"같은 이름의 중복된 신도가 " + row+ "명 존재합니다.<BR/>등록하시겠습니까?"
    		
    		Ext.MessageBox.confirm('경고', msg, function(btn){  
    	        if (btn == 'yes') { 
    	        	exCommon.fnGridSaveAll(
    	   	    		 me
    	   	    		,'ds_main'
    	   	    		,'newData'
    	   	    		,'uptData'
    	   	    		,'delData'
    	   	    		,'/sin/SIN001W_01/newSindoSave.suvila'
    	   	    		,me.onNewSindoSaveCallback
    	   	    		,true
    	   	    	);
    	        }else{
    	        	var params = {
	        	   		 V_SEARCH_GBN     : "NAME_KOR"	        	   		
	        	   		,V_SEARCH_WORD    : record.get("NAME_KOR")
	        	   		,OPEN_SEARCH_GBN  : "DUPI"
	        	   		,ZIP_CD           : record.get("ZIP_CD")
	        	   		,V_REPRESEN_REL   : record.get("REPRESEN_REL")
	        	   	};
	        		
	        		me.openPopup('ExFrm.view.com.sindo',  params, me.onSindoSearchReceive);
    	        	
    	        	return false;
    	        }
    		});
    	}else{
    		exCommon.fnGridSaveAll(
   	    		 me
   	    		,'ds_main'
   	    		,'newData'
   	    		,'uptData'
   	    		,'delData'
   	    		,'/sin/SIN001W_01/newSindoSave.suvila'
   	    		,me.onNewSindoSaveCallback
   	    		,false
   	    	);
    	}
    },
    onNewSindoSaveCallback : function(me, success, form, action){
    	if(success){
    		
    		me.loadStatePoP(me);
    		
    		setTimeout(function(){
    			Ext.Msg.alert("알림", "저장되었습니다.");
    		},10);
    		
    		
    		var BUD_CODE = action.result.msg;
    		
    		me.lookupReference('txt_stipulation').setExValue(BUD_CODE);
    		
    		var params ={
	    		V_BUD_CODE : BUD_CODE
	    	};
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_main', '', params ,me.onSelectSindoCallback);
	    	},10);
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert("알림", action.result.msg);
    		});
    	}
    },
    onAdd : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount()
    	
    	if(row <= 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
    		},50);
    		return;
    	}
    	
    	
		var selectedRecord = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection();
    	var index          = me.lookupReference('sin001w_01_a').getStore().indexOf(selectedRecord[0]);
    	me.inSettingRecord(me, index);
    	
    	if(!me.isValidation(me) ) {
    		return;
    	}
    	
    	var record = me.getViewModel().getStore('ds_main').getAt(0);
    	var cnt    = me.getViewModel().getStore('ds_main').getCount();
    	
    	var data = {
    		 GBN_CODE       : record.get("GBN_CODE")
    		,BRANCH_CODE    : record.get("BRANCH_CODE")
    		,DAEJU_YN       : 0
    		,DAEJU_BUD_NO   : record.get("DAEJU_BUD_NO")
    		,SINDO_GBN      : record.get("SINDO_GBN")
    		,ZIP_CD         : record.get("ZIP_CD")
    		,ADDR1          : record.get("ADDR1")
    		,ADDR2          : record.get("ADDR2")
    		,ADDR3          : record.get("ADDR3")
    		,BLDG_NUM       : record.get("BLDG_NUM")
    		,TELNO1         : record.get("TELNO1")
    		,TELNO2         : record.get("TELNO2")
    		,TELNO3         : record.get("TELNO3")
    		,HWAJU_BUD_NO   : record.get("HWAJU_BUD_NO")
    		,HWAJU_BUD_NAME : record.get("HWAJU_BUD_NAME")
    		,BUD_CODE       : record.get("BUD_CODE")
    		,ISSUE_DATE     : exCommon.getNowDate()
    		,SORT_SEQ       : cnt +1
    		,LUNAR_SOLAR    : "T"
    		,SQL_MODE       : 'I'
    	}
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('sin001w_01_a').getView().select(cnt);
    	
    },
    onDelete : function(){
    	var me = this;
    	
    	var row        = me.getViewModel().getStore('ds_main').getCount();
    	if(row == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
    		},50);
    		return;
    	}
    	
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection();
    	if(selection.length > 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '신도한명씩 삭제를 할수 있습니다.');    				
    		},50);
    		return;
    	}
    	
		var data      = selection[0];
		
		var DAEJU_YN = data.get("DAEJU_YN");
		var CMS_CNT  = data.get("CMS_CNT");
		var NAME_KOR = data.get("NAME_KOR");
		
		console.log('DAEJU_YN= ', DAEJU_YN);
		
		if(DAEJU_YN == 1 || DAEJU_YN){
			setTimeout(function(){
    			Ext.Msg.alert('알림', NAME_KOR+' 대표신도는 삭제 할 수 없습니다.');    				
    		},50);
			return;
		}// if
			
		var msg =  NAME_KOR+" 신도를 삭제하시겠습니까?";
		if( CMS_CNT > 0 ){
			msg = NAME_KOR +" 신도는 CMS("+CMS_CNT+"개)에 등록된 신도입니다.<br/> 삭제하시겠습니까?"
		}
		
		
		exCommon.gridRemove(me, 'sin001w_01_a' , 'ds_main' , false);
		
		Ext.MessageBox.confirm('알림', msg, function(btn){
    		if (btn == 'yes') {
    			me.lookupReference('txt_sel_index').setExValue(-1);
    			
    			exCommon.gridRemove(
    				 me
    				,'sin001w_01_a'
    				,'ds_main'
    				,false
    				,true
    			);
    		}
    	});
		
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
    	//me.lookupReference('em_birthday').setExValue(param.YEAR);
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
    
    
    
    onBeforeshow : function(){
    	var me = this;
    	console.log('onBeforeshow');
    	return false;
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
    inGetGangiCallbak : function(me, success, form, action){
    	if(success &&  me.getViewModel().getStore('ds_ganji').getCount() ){
    		
    		var data = me.getViewModel().getStore('ds_ganji').getAt(0);
    		me.lookupReference('lc_sexagenary').setExValue( data.get("SEXAGENARY") );
    		me.lookupReference('txt_leap_month').setExValue( data.get("LEAP_MONTH") );
    	}
    },
    onDaeJuChange : function(m, newValue, oldValue, eOpts){
    	var me = this;
    	
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var SELET_DAEJU_YN = selection.get("DAEJU_YN");
    	var FROM_DAEJU_YN  =  me.lookupReference('cb_daeju_yn').getExValue();
    	
    	
    	if( SELET_DAEJU_YN == 1 || SELET_DAEJU_YN ){    		
    		setTimeout(function(){
    			me.lookupReference('cb_daeju_yn').setExValue(1);
        	},30);    	
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
    inPopBeforeSindoSave : function(me){
    	
    	var selectedRecord = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection();
    	var index          = me.lookupReference('sin001w_01_a').getStore().indexOf(selectedRecord[0]);
    	me.inSettingRecord(me, index);
    	
    	var cnt = exCommon.ChangeCount('ds_main' , me);
    	console.log('onDeath cnt = ', cnt);
    	
    	if(cnt > 0){
    		
    		var newCnt = me.getViewModel().getStore('ds_main').getNewRecords().length;
    		var delCnt = me.getViewModel().getStore('ds_main').getRemovedRecords().length;
    		
    		if( (newCnt+delCnt) > 0){
    			setTimeout(function(){
        			Ext.Msg.alert('알림', '변경된 자료가 있습니다. 저장후 작업하십시오.');    				
        		},50);
        		return false;
    		}else{
    			console.log('수정부분만');
    			
    			exCommon.fnGridSaveAll(
		    		 me
		    		,'ds_main'
		    		,'newData'
		    		,'uptData'
		    		,'delData'
		    		,'/sin/SIN001W_01/SindoSave.suvila'
		    		,me.inSindoCallPopBack
		    		,true
		    	);
    			return true;
    		}
    	}else{
    		return true;
    	}
    },
    onDeath : function(){
    	var me = this;
    	
    	
    	if( !me.inPopBeforeSindoSave(me) ){
    		return;
    	}
    	
    	var selectedRecord = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var params = {
       		 V_BUD_CODE : selectedRecord.get("BUD_CODE")
       		,V_BUD_NO   : selectedRecord.get("BUD_NO")
       		,GRANT      : 'S' // 사용자등급
       	    ,MODE       : ""
       	};
    	/*
    	var params = {
    		 V_BUD_CODE : '01-00001-0'
    		,V_BUD_NO   : '01-00001-0-02'
    		,GRANT      : 'S' // 사용자등급
    		,MODE       : ""
    	};
    	*/
    	
    	var url = 'ExFrm.view.sin.sin001p_03';
    	if(exCommon.user.death_type == '2'){
    		url = 'ExFrm.view.sin.sin001p_03_000031';
    	}
    	
    	setTimeout(function(){
    		me.openPopup(url,  params, me.onDeathReceive);
    	},150);
    },
    inSindoCallPopBack : function(me, success, form, action){
    	console.log('inSindoCallPopBack');
    },
    onDeathReceive : function(params, me){
    	console.log('onDeathReceive  = ',params );
    },
    onMemo : function(){
    	var me = this;
    	
    	var params = {};
    	
    	me.openPopup('ExFrm.view.com.memo',  params, me.onFindAddrReceive);
    	
    },
    onMemoReceive : function(params, me){
    	console.log('onMemoReceive  = ',params );
    },
    deathState:[],
    deathStatePoP : function(me){
    	var cnt = me.deathState.length;
    	for(var i = 0; i<cnt ; i++){
    		me.deathState.pop();
    	}
    },
    onDeathConvert : function(){
    	
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	
    	if( !me.inPopBeforeSindoSave(me) ){
    		return;
    	}
    	
    	
    	if(me.deathState != 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '이전요청의 영가전환 작업준비중입니다.');    				
    		},50);
    		return;
    	}
    	
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	if(selection.length > 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '신도 한명씩 영가 전환할수 있습니다.');    				
    		},50);
    		return;
    	}
    	
    	var DAEJU_YN = exCommon.getRepVal(selection.get("DAEJU_YN"));
    	if(DAEJU_YN || DAEJU_YN == 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '대표신도는 영가 전환할수 없습니다.');    				
    		},50);
    		return;
    	}
    	
    	me.deathState.push(1);
    	
    	
    	var params = {
    		V_BOKWI_BUD_NO : selection.get("BUD_NO")
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_young_exist', '', params ,me.onDeahConvertCallback);
    	},100);
    },
    onDeathCovertReceive : function(params, me){
    	console.log('onDeathCovertReceive');
    	
    	var param ={
    		V_BUD_CODE : me.lookupReference('hid_bud_no').getExValue().substr(0,10)
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', param ,me.onSelectSindoCallback);
    	},50);
    },
    onDeahConvertCallback : function(me, success, form, action){
    	
    	
    	me.deathStatePoP(me);
    	console.log('onDeahConvertCallback = ',me.getViewModel().getStore('ds_young_exist').getCount());
    
    	
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    
    	var url = 'ExFrm.view.sin.sin001p_03';
    	if(exCommon.user.death_type == '2'){
    		url = 'ExFrm.view.sin.sin001p_03_000031';
    	}
    	
    	
    	var params  = selection.data;
    	params.MODE = 'convert';
    	params.V_BUD_CODE = selection.get("BUD_CODE");
    	params.V_BUD_NO   = selection.get("BUD_NO");
    	params.V_NAME_KOR = selection.get("NAME_KOR");
    	
    	if(success &&  me.getViewModel().getStore('ds_young_exist').getCount() > 0 ){
    		
    		Ext.MessageBox.confirm('경고', '해당 신도에 속한 영가정보가 있습니다.<br/>해당신도의 영가 정보를 삭제및 영가모시기를 활용하시겠습니까?', function(btn){  
    	        if (btn == 'yes') { 
    	        	me.onDeath();
    	        }else{
    	        	me.openPopup(url,  params, me.onDeathCovertReceive);
    	        }
    		});
    	}
    	else if(success &&  me.getViewModel().getStore('ds_young_exist').getCount() == 0 ){
    		me.openPopup(url,  params, me.onDeathCovertReceive);
    	}
    },
    onBranchProc : function(){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	/*
    	var cnt = exCommon.ChangeCount('ds_main' , me);
    	if(cnt > 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '변경된 자료가 있습니다. 저장후 작업하십시오.');    				
    		},50);
    		return false;
    	}
    	*/
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection();
    	
    	for(var i = 0; i< selection.length ; i++){
    		var DAEJU_YN = exCommon.getRepVal( selection[i].get("DAEJU_YN") );
    		
    		if(DAEJU_YN || DAEJU_YN == 1){
    			setTimeout(function(){
        			Ext.Msg.alert('알림', '대표신도는 분가처리할수 없습니다.<BR/>대표신도 제외후에 시도해주세요.');    				
        		},50);
    			return false;
    		}
    	}
    	
    	me.openPopup('ExFrm.view.sin.sin001p_01',  selection, me.onBranchProcReceive);
    },
    onBranchProcReceive : function(params , me){
    	me.onSelectSindo();
    },
    onRemoveLastRowSindo: function(me){
		var row = me.getViewModel().getStore('ds_main').getCount();
		
		if(row == 1){
			return false;
		}
		
		for(var i = (row-1); i >= 0 ; i--){
			var data = me.getViewModel().getStore('ds_main').getAt(i);
			    		    		
			var SQL_MODE     = data.get("SQL_MODE");
			if(SQL_MODE != "I"){
				return;
			}
			
			var REPRESEN_REL = exCommon.getRepVal( data.get("REPRESEN_REL"));
	    	var SEX_GBN 	 = exCommon.getRepVal( data.get("SEX_GBN"));
	    	var NAME_KOR 	 = exCommon.getRepVal( data.get("NAME_KOR"));
	    	var SACRED_KOR 	 = exCommon.getRepVal( data.get("SACRED_KOR"));
	    	var LUNAR_SOLAR  = exCommon.getRepVal( data.get("LUNAR_SOLAR"));
	    	var BIRTHDAY 	 = exCommon.getRepVal( data.get("BIRTHDAY"));
	    	
	    	if(REPRESEN_REL == "" && SEX_GBN     == "" && NAME_KOR    == "" && 
	    	   SACRED_KOR   == "" && BIRTHDAY    ==""     ){
	    		
	    		me.getViewModel().getStore('ds_main').removeAt(i);
	    		me.lookupReference('sin001w_01_a').getView().select(i-1);
	    		
	    	}// if
			
		}// for
		
		me.lookupReference('txt_stipulation').setExValue('');
		me.lookupReference('hid_bud_no').setExValue('');
		me.lookupReference('txt_budNo').setExValue('');
	}, 
	onUnionhProc : function(){
		var me = this;
	
		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
		
		var V_BUD_CODE = me.getViewModel().getStore('ds_main').getAt(0).get("BUD_CODE");
		var params = {
			V_BUD_CODE : V_BUD_CODE
		}
		
		me.openPopup('ExFrm.view.sin.sin001p_04',  params, me.onUnionhProcReceive);
	},
	onUnionhProcReceive : function(params , me){
		console.log('onUnionhProcReceive = ', params);
		me.onSelectSindo();
	},
	onBranchSearch : function(){
		var me = this;
		
		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
		
    	var selection = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
		var params = {
			V_BUD_CODE : selection.get("BUD_CODE")
		}
		me.openPopup('ExFrm.view.sin.sin001p_02',  params, me.onBranchSearchReceive);
	},
	onBranchSearchReceive : function(params , me){
		
		var V_BUD_CODE = exCommon.getRepVal(params.V_BUD_CODE);
		var V_BUD_NO   = exCommon.getRepVal(params.V_BUD_NO);
		
		if(V_BUD_CODE != "" && V_BUD_NO != ""){
			
			me.lookupReference('hid_bud_no').setExValue(V_BUD_NO);
			
			me.lookupReference('txt_stipulation').setExValue(V_BUD_CODE);
			
			var params ={
	    		V_BUD_CODE : V_BUD_CODE
	    	};
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_main', '', params ,me.onSelectSindoCallback);
	    	},10);
		}
	},
	onExceptAdd : function(){
		var me  = this;
		
		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
		
		var store = me.getViewModel().getStore('ds_pray_except');
		
		me.openPopup('ExFrm.view.sin.sin001p_06',  store, me.onExceptAddReceive);
	},
	onExceptAddReceive : function(records , me){
		console.log('onExceptAddReceive', records);
		
		me.getViewModel().getStore('ds_pray_except').removeAll();
		
		for(i=0; i<records.length ; i++){
			me.getViewModel().getStore('ds_pray_except').add(records[i]);
			console.log( me.getViewModel().getStore('ds_pray_except').getAt(i) );
			
		}// for
		
		console.log(me.getViewModel().getStore('ds_pray_except'));
	},
	onPrayModify : function(){
		var me = this;
		
		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
		
    	var selectedRecord = me.lookupReference('sin001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var params = {
    		V_BUD_NO : selectedRecord.get("BUD_NO")
    	}
    	
		me.openPopup('ExFrm.view.sin.sin001p_05',  params, me.onPrayModifyReceive);
	},
	onPrayModifyReceive :function(params, me){
		
		var params ={
    		V_BUD_CODE : params
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectSindoCallback);
    	},10);
	},
	onBudNoChange : function(){
		var me = this;
		
		
		var params = {
			old_budCd : me.lookupReference('txt_bud_code').getExValue()
		};
		
		me.openPopup('ExFrm.view.sin.sin001p_08',  params, me.onBudNoChangeReceive);
		
		/*
		if(txt_bud_code.value != ""){
			var returnVal = window.showModalDialog("./sin001p_08.jsp?bud_code="+ txt_bud_code.value + "&Grant="+"<%=Grant%>",window, "dialogWidth:350px; dialogHeight:500px; status:no; scroll:no; help:no");

			if(returnVal != "") {
				var budCode = txt_bud_code.value;
				on_SearchSindo(returnVal+budCode.substring(8,10));
			}
		}else{
			gf_Callmsg("N","<%=Message.MSG_QQ002%>"); <%--검색 후 작업하세요--%>
		}
		*/
	},
	onBudNoChangeReceive :function(rtn, me){
		
		if(rtn.suc){
			var budCode =  me.lookupReference('txt_bud_code').getExValue(  );
			
			var params ={
	    		V_BUD_CODE : rtn.BUD_CODE + ''+budCode.substring(8,10)
	    	};
			
			console.log('params = ', params);
			
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_main', '', params ,me.onSelectSindoCallback);
	    	},10);
		}
		console.log('onBudNoChangeReceive = ', params);
		
	},
	onCheckChange : function(omp, rowIndex, checked, eOpts) {
		var me = this;
		console.log('rowIndex = ',rowIndex);
		
		var row = me.getViewModel().getStore('ds_main').getCount();
		setTimeout(function(){
	    	for(var i = 0; i < row; i++){
	    		if(i == rowIndex){
	    			me.getViewModel().getStore('ds_main').getAt(i).set("DAEJU_YN" , 1);
	    			me.lookupReference('cb_daeju_yn').setExValue(1);
	    		}else{
	    			me.getViewModel().getStore('ds_main').getAt(i).set("DAEJU_YN" , 0);
	    			me.lookupReference('cb_daeju_yn').setExValue(0);
	    		}
	    	}
		},100);
	},
})


