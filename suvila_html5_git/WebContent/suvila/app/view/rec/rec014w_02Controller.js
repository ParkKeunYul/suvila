Ext.define('ExFrm.view.rec.rec014w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec014w_02',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	setTimeout(function(){
          	me.callStore(me, 'ds_pgCardUseYn', '', null ,me.dsPgCardCallback);
        },50);
    },
    onAfterRender:function(){
    	var me = this;
    	
    	/*me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();*/
    },
    dsPgCardCallback : function(me, success, form, action){
    	if(success){
    		var CARD_USE = exCommon.getRepVal( me.getViewModel().getStore('ds_pgCardUseYn').getAt(0).get("CARD_USE"));
    		if(CARD_USE != "T"){
    		
    			me.lookupReference('rdo_ApprovalGbn_r14_02_2').setReadOnly(true);
    		}
    	}
    },
    onTabChange:function(tappanel, panel){},
    onCallback002:function(params){
    	var me = this;
    	
    	me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
    },
    onShift : function(){
    	var me  = this; 
    	
    	
    	if( !me.getView().down('[xtype=rec000w_02]').getController().inDaejuInfoCheck() ) return false;
    	
    	var recAmtDefault = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	
    	
    	console.log(exCommon.getNowDate('') );
    	    	
    	var cnt  = me.getViewModel().getStore('ds_spiritSelInfo').getCount();
    	for(var i = 0 ; i < cnt ; i++){
    		var record   = me.getViewModel().getStore('ds_spiritSelInfo').getAt(i);
    		var SEL_YN   = record.get("SEL_YN");
    		if(SEL_YN){
    			var tempCnt = me.getViewModel().getStore('ds_youngtop_youngga').getCount()+1;
    			
    			var findRecord = me.getViewModel().getStore('ds_youngtop_youngga').findRecord('YOUNGGA_BUD_NO', record.get("BUD_NO"), 0, false, true, true);
    			if(findRecord == null){
	    			var data = {
	    				 TEMPLE_CD        : exCommon.user.templeCd
	    				,BUD_NO           : ""
	    				,BONGTOP_SEQ      :  tempCnt
	    				,BONGTOP_DT       : exCommon.getNowDate('') 
	    				,YOUNGGA_BUD_NO   : record.get("BUD_NO")
	    				,YOUNGGA_REL      : record.get("DECE_REL")
	    				,YOUNGGA_BON      : record.get("BON_NM")
	    				,YOUNGGA_BUD_NM   : record.get("NAME_KOR")
	    				,YOUNGGA_GENDER   : record.get("SEX_GBN")
	    				,YOUNGGA_EQUAL    : record.get("EQUAL_GBN")
	    				,YOUNGGA_SPIRITUAL: record.get("SPIRITUAL_GBN")
	    				,BOKWIJA_NO       : record.get("BOKWIJA_NO")
	    				,POSITION_SEQ     : tempCnt
	    				,PAYMENT_PLAN_AMT : 0
	    				,PAYMENT_AMT      : 0
	    				,MISU_AMT         : 0
	    			}
	    			me.getViewModel().getStore('ds_youngtop_youngga').add(data);    			    			    			
    			}
    			record.set("SEL_YN", false);
    		}
    	}// for
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },    
    onDelete : function(){
    	var me = this;
    	
    	var fir_record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(0);
    	
    	exCommon.gridRemove(me, 'rec014w_02_b', 'ds_youngtop_youngga' , false , true);
    	
    	var PAYMENT_PLAN_AMT = fir_record.get("PAYMENT_PLAN_AMT");
    	var PAYMENT_AMT 	 = fir_record.get("PAYMENT_AMT");
    	var JUNGAK_NM 		 = fir_record.get("JUNGAK_NM");
    	var LIGHT_NO 		 = fir_record.get("LIGHT_NO");
    	var REMARK 			 = fir_record.get("REMARK");
    	
    	console.log('onDelete = ', fir_record);
    	
    	for(var i =0  ; i < me.getViewModel().getStore('ds_youngtop_youngga').getCount() ; i++){
    		var record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(i);
    		
    		if(i==0){
    			record.set("PAYMENT_PLAN_AMT", PAYMENT_PLAN_AMT);
        		record.set("PAYMENT_AMT"     , PAYMENT_AMT);
        		record.set("MISU_AMT"        , parseInt(PAYMENT_PLAN_AMT)- parseInt(PAYMENT_AMT));
        		record.set("JUNGAK_NM"       , JUNGAK_NM);
        		record.set("LIGHT_NO"        , LIGHT_NO);
        		record.set("REMARK"          , REMARK);
    		}else{
    			record.set("PAYMENT_PLAN_AMT", 0);
        		record.set("PAYMENT_AMT"     , 0);
        		record.set("MISU_AMT"        , 0);
        		record.set("JUNGAK_NM"       , "");
        		record.set("LIGHT_NO"        , "");
        		record.set("REMARK"          , "");
    		}
    		record.set("POSITION_SEQ"    , i + 1);
    	}
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onDelAll : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec014w_02_b', 'ds_youngtop_youngga' , true , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onSave : function(){
    	var me = this;
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_r14_02').getValue().rdo_ApprovalGbn_r14_02;
    	
    	var rowCnt = exCommon.ChangeCount('ds_youngtop_youngga' , me);
    	
    	if(rowCnt == 0){
    		return false;
    	}
    	
    	if( !me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation() ) return false;
    	
    	var row = me.getViewModel().getStore('ds_youngtop_youngga').getCount();
    	var flag = true;
    	for(var i = 0; i < row ; i++ ){
    		var record       = me.getViewModel().getStore('ds_youngtop_youngga').getAt(i);

    		if(i == 0){    			
    			var JUNGAK_CD = exCommon.getRepVal(record.get("JUNGAK_CD"),"" ); 
    			var LIGHT_NO = exCommon.getRepVal(record.get("LIGHT_NO"),"" );
    			
    			if(JUNGAK_CD == "" || LIGHT_NO == ""){
    				exCommon.msgAlert('영탑번호는 필수입력 사항입니다.');
    				me.lookupReference('rec014w_02_b').getView().select(i);
    				return false;
    			}
    		} // if  i == 0;
    		
    		
    		var BONGTOP_DT = exCommon.getRepVal(record.get("BONGTOP_DT"),"" );
    		if(BONGTOP_DT == ""){
				exCommon.msgAlert('봉탑일은 필수입력 사항입니다.');
				me.lookupReference('rec014w_02_b').getView().select(i);
				return false;
			}
    		
    		var YOUNGGA_BUD_NM = exCommon.getRepVal(record.get("YOUNGGA_BUD_NM"),"" );
    		if(YOUNGGA_BUD_NM == ""){
				exCommon.msgAlert('영가자명은 필수입력 사항입니다.');
				me.lookupReference('rec014w_02_b').getView().select(i);
				return false;
			}
    	}// for
    	
    	var BUD_NO = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo().txt_budNo;
    	if(BUD_NO == ""){
    		exCommon.msgAlert('신도번호는 필수입력 사항입니다.');
    		return false;
    	}
    	
    	var ACCEPT_DT  = exCommon.getRepVal(me.lookupReference('em_accept_dt').getExValue(),"" );
    	if(ACCEPT_DT == ""){
    		exCommon.msgAlert('접수일자를 정확하게 입력하세요.');
    		return false;
    	}
    	if( gf_validateDate(ACCEPT_DT)  != 0 ){
    		exCommon.msgAlert('접수일자를 정확하게 입력하세요.');
    		return false;
    	}
    	
    	
    	var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	ds_acceptRecAmtData.CASH_TYPE    = rdo_ApprovalGbn;
    	
    	
    	if(ds_acceptRecAmtData.APPROVAL_GBN == 3){
    		exCommon.msgAlert('CMS 접수는 지원하지 않습니다.');
    		return false;
    	}
    	
    	var smsInfo = me.getView().down('[xtype=rec000w_03]').getController().inSmsInfo();
    	if(smsInfo.SMS_YN){
    		me.inSendMessage( smsInfo );
    		ds_acceptRecAmtData.SMS_YN = 'T';
    	}
    	
    	
    	me.inSettingDetail(me);
    	me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    	me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
    	
    	if(rdo_ApprovalGbn == 2){ 
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_youngtop_youngga').getCount(); i++){
				var record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(i).data;
				
				record.PgCardPopupGbn = '1';
				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
				record.ACCEPT_GBNTXT  = record.JUNGAK_NM;
				
				record.EMAIL 		 = daejuRecord.get("EMAIL");
				record.MOBILE_TELNO1 = daejuRecord.get("MOBILE_TELNO1");
				record.MOBILE_TELNO2 = daejuRecord.get("MOBILE_TELNO2");
				record.MOBILE_TELNO3 = daejuRecord.get("MOBILE_TELNO3");
				record.BUYER_NAME    = daejuRecord.get("NAME_KOR");
				record.CARD_BUD_NO   = ds_acceptRecAmtData.PROPOSAL_BUD_NO;
				
				
				array[i] = record;
			}// for i
			
			setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.cardPay',  array, me.onSaveCard);
	       	},100);
			return;
		}
    	
    	
    	exCommon.addParamSetting(me , 'ds_youngtop_youngga' , 'ds_youngtop_youngga');
    	exCommon.addParamSetting(me , 'ds_youngtop_detail'  , 'ds_youngtop_detail');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' 	, 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          	, 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   	, 'ds_pgCardInfo');
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, '/rec/REC014W_00/saveRecYoungTop.suvila', me.onSaveCallback , false);
    		}
    	});
    },
    onSaveCard  : function(cardPayInfo, me){
		console.log('cardPayInfo = ', cardPayInfo);
		
		
		var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
		ds_acceptRecAmtData.APPROVAL_GBN = '2';
		ds_acceptRecAmtData.CASH_TYPE    = '2';
		
		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
		me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
		
		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
		me.getViewModel().getStore('ds_pgCardInfo').add(cardPayInfo);
		

		exCommon.addParamSetting(me , 'ds_youngtop_youngga' , 'ds_youngtop_youngga');
    	exCommon.addParamSetting(me , 'ds_youngtop_detail'  , 'ds_youngtop_detail');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' 	, 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          	, 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   	, 'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC014W_00/saveRecYoungTop.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
    
    onSaveCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_youngtop_youngga').removeAll();
    		me.getViewModel().getStore('ds_youngtop_detail').removeAll();
    		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    		me.getViewModel().getStore('ds_sms').removeAll();
    		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
    		
    		me.getViewModel().getStore('ds_youngtop_youngga').commitChanges();
    		me.getViewModel().getStore('ds_youngtop_detail').commitChanges();
    		me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
    		me.getViewModel().getStore('ds_sms').commitChanges();
    		me.getViewModel().getStore('ds_pgCardInfo').commitChanges();
    		
    		me.inFirstAmtCalc();
        	me.inPaymentAmtCalc();
        	me.inMisuAmtCalc();
    		
        	me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
        	
        	
        	var getDaeJuInfo = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo();
        	var STX_GBN_NM = "행효자"; 
        	if(getDaeJuInfo.SINDO_SEX_GBN == "F"){
        		STX_GBN_NM = "행효녀";
        	}
        	me.lookupReference('txt_topju_nm').setExValue(getDaeJuInfo.BUD_NM);
        	me.lookupReference('sel_hyo_rel').setExValue(STX_GBN_NM);
        	me.lookupReference('em_accept_dt').setExValue(exCommon.getNowDate());
        	
        	me.lookupReference('em_bulsa_dt').setExValue("");
        	me.lookupReference('em_bongan_dt').setExValue("");
        	me.lookupReference('em_rebong_dt').setExValue("");
        	me.lookupReference('cbx_agree_sheet_yn').setExValue("");
        	me.lookupReference('cbx_family_sheet_yn').setExValue("");
        	me.lookupReference('cbx_hojuk_sheet_yn').setExValue("");
        	me.lookupReference('cbx_jumin_sheet_yn').setExValue("");
        	me.lookupReference('cbx_jejuk_sheet_yn').setExValue("");
        	me.lookupReference('cbx_acenst_yn').setExValue("");
        	me.lookupReference('cbx_nameless_yn').setExValue("");
        	me.lookupReference('lc_hyo_bon').setExValue("");
        	me.lookupReference('txt_top_mng_nm').setExValue("");
        	
    	}
    	exCommon.fnGridSaveCallback(me, success, action,'ds_youngtop_youngga');
    },
    inSettingDetail:function(me){    	
    	me.getViewModel().getStore('ds_youngtop_detail').removeAll();
    	
    	var me_totPaymentPlanAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_youngtop_youngga').sum('PAYMENT_PLAN_AMT') )
    	var me_totPaymentAmt     = exCommon.getRepNum( me.getViewModel().getStore('ds_youngtop_youngga').sum('PAYMENT_AMT') )
    	var me_misuAmt           = parseInt(me_totPaymentPlanAmt) - parseInt(me_totPaymentAmt);
    	var data ={    	
    		 BUD_NM           : exCommon.getRepVal( me.lookupReference('txt_topju_nm').getExValue(), "")    		
    		,ACCEPT_DT        : exCommon.getRepVal( me.lookupReference('em_accept_dt').getExValue(), "")
    		,BULSA_DT         : exCommon.getRepVal( me.lookupReference('em_bulsa_dt').getExValue(), "")
    		,BONGAN_DT        : exCommon.getRepVal( me.lookupReference('em_bongan_dt').getExValue(), "")
    		,REBONG_DT        : exCommon.getRepVal( me.lookupReference('em_rebong_dt').getExValue(), "")
    		,AGREE_SHEET_YN   : exCommon.getCheckVal( me.lookupReference('cbx_agree_sheet_yn').getExValue() , 'T' , 'F')
    		,FAMILY_SHEET_YN  : exCommon.getCheckVal( me.lookupReference('cbx_family_sheet_yn').getExValue(), 'T' , 'F')
    		,HOJUK_SHEET_YN   : exCommon.getCheckVal( me.lookupReference('cbx_hojuk_sheet_yn').getExValue() , 'T' , 'F')
    		,JUMIN_SHEET_YN   : exCommon.getCheckVal( me.lookupReference('cbx_jumin_sheet_yn').getExValue() , 'T' , 'F')
    		,JEJUK_SHEET_YN   : exCommon.getCheckVal( me.lookupReference('cbx_jejuk_sheet_yn').getExValue() , 'T' , 'F')
    		,ACENST_YN        : exCommon.getCheckVal( me.lookupReference('cbx_acenst_yn').getExValue()      , 'T' , 'F')
    		,NAMELESS_YN      : exCommon.getCheckVal( me.lookupReference('cbx_nameless_yn').getExValue()    , 'T' , 'F')
    		,HYO_BON          : exCommon.getRepVal( me.lookupReference('lc_hyo_bon').getExValue(), "")
    		,HYO_REL          : exCommon.getRepVal( me.lookupReference('sel_hyo_rel').getExValue(), "")
    		,TOP_MNG_NM       : exCommon.getRepVal( me.lookupReference('txt_top_mng_nm').getExValue(), "")
    		,PAYMENT_PLAN_AMT : me_totPaymentPlanAmt
    		,PAYMENT_AMT      : me_totPaymentAmt
    		,MISU_AMT         : me_misuAmt 
    		,V_CASH_TYPE      : me.lookupReference('rdo_ApprovalGbn_r14_02').getValue().rdo_ApprovalGbn_r14_02
    		,YOUNGTOP_MEMO    : exCommon.getRepVal( me.lookupReference('ta_youngtop_memo').getExValue(), "")
    		,BUD_NO           : me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo().txt_budNo
    		,JUNGAK_CD        : me.getViewModel().getStore('ds_youngtop_youngga').getAt(0).get("JUNGAK_CD")
    		,LIGHT_NO         : me.getViewModel().getStore('ds_youngtop_youngga').getAt(0).get("LIGHT_NO")
    	}
    	me.getViewModel().getStore('ds_youngtop_detail').add(data);
    	
    	console.log('cbx_family_sheet_yn = ', me.lookupReference('cbx_family_sheet_yn'));
    	console.log('data = ', data);
    	
    },
    onBeforeedit : function( editor, context, eOpts ){
    	var me = this;
    	console.log(context.field);
    	console.log(context.rowIdx);
    	
    	var column = context.field;
    	
    	if( column == 'PAYMENT_PLAN_AMT' || column == 'PAYMENT_AMT' || column == 'PAYMENT_PLAN_AMT' || column == 'PAYMENT_PLAN_AMT' || column == 'REMARK'){
    		if(context.rowIdx != 0){
    			return false;
    		}
    	}
    	return true;
    },
    onSearchBonEnter : function(me2, e, eOpts ){
    	var me = this;
    	console.log('onSearchBonEnter = ', e.keyCode);
    	if(e.keyCode == 13){
    		me.onSearchBon();
    	}
    },
    onSearchBon : function(){
    	var me = this;
    	
    	var params = {
    		 group_cd  : "BON"
    		,remark    : encodeURI(me.lookupReference('txt_hyo_bon').getExValue())
    	}
    	
    	setTimeout(function(){
          	me.callStore(me, 'ds_hyo_bon', '', params , me.dshyobonCallback);
        },50);
    },
    dshyobonCallback:function(me, success, form, action){
    	me.lookupReference('lc_hyo_bon').setExValue('');
    },
    onEdit : function( ){
    	var me = this;
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onCellClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        var JUNGAK_CD  = exCommon.getRepVal( record.get("JUNGAK_CD"),"" );
    	var LIGHT_NO   = exCommon.getRepVal( record.get("LIGHT_NO"),"" );
    	
    	
    	var ACCEPT_GBN =14; 
    	
    	if(clickedDataIndex == "JUNGAK_NM"){
    		if(rowIndex != 0){
        		return false;
        	}
    	        	
        	var param = {        		 
        		 V_JUNGAK_GBN  : 'O'
        		,V_ACCEPT_GBN  : ACCEPT_GBN
        		
        	};
       		me.openPopup('ExFrm.view.rec.rec000p_04',  param, me.onYoungTopJungakReceive);
        	
        }
        else if(clickedDataIndex == "LIGHT_NO"){
        	if(rowIndex != 0){
        		return false;
        	}
        	
        	if(JUNGAK_CD == "" || JUNGAK_CD == " "){
        		exCommon.msgAlert("위치를 선택하고 탑번 선택 가능합니다.");
        		return false;
        	}
        	
        	var params = {
        		  V_JUNGAK_CD   : JUNGAK_CD
        		 ,V_ACCEPT_GBN  : "14"
        	     ,V_LIGHT_NO    : LIGHT_NO
        	     ,V_JUNGAK_GBN  : 'O'
        	}
        	me.openPopup('ExFrm.view.rec.rec000p_03',  params, me.onDetailReceive);
        	
        }
    },
    onDetailReceive : function( params , me ){
    	var recordID = me.lookupReference('rec014w_02_b').getView().getSelectionModel().getSelection()[0];
    	var RESERVATION_YN = exCommon.getRepVal(params.RESERVATION_YN);
    	if("F" == RESERVATION_YN){
    		recordID.set("JUNGAK_CD"  , "");
        	recordID.set("JUNGAK_NM"  , "");
        	recordID.set("LIGHT_NO"   , "");
        	recordID.set("JUNGAK_GBN" , "O");
    		return false;
    	}
    	
    	recordID.set("JUNGAK_CD"  , params.JUNGAK_CD);
    	recordID.set("JUNGAK_NM"  , params.JUNGAK_NM);
    	recordID.set("LIGHT_NO"   , params.LIGHT_NO);
    	recordID.set("ACCEPT_GBN" , params.ACCEPT_GBN);
    	recordID.set("JUNGAK_GBN" , params.JUNGAK_GBN);
    	
    },
    onYoungTopJungakReceive : function(params , me){
    	var recordID = me.lookupReference('rec014w_02_b').getView().getSelectionModel().getSelection()[0];
    	
    	recordID.set("JUNGAK_CD", params.JUNGAK_CD);
    	recordID.set("JUNGAK_NM", params.JUNGAK_NM);
    },
    inSendMessage : function( smsInfo){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	var mobileTelno   = smsInfo.MOBILE_TELNO1 + smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
    	var recAmtInfo    = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	
    	var rCnt = me.getViewModel().getStore('ds_youngtop_youngga').getCount();
    	for(var i = 0; i < 1 ; i++){
    		var record =  me.getViewModel().getStore('ds_youngtop_youngga').getAt(i);
    		var smsNum = i;
    		
    		var fMessage  = "["+exCommon.user.templeNm+"("+(smsNum+1)+") ";
    		    fMessage +=  record.get("PRAY_NM") +" " + exCommon.setNumberFormat(record.get("BASE_AMT")) + "] "; 
    		    		    		
    		var bMessage = "동참(예약)되었습니다. 성불하세요";
    		
    		if( record.get("PAYMENT_AMT") > 0  ){
    			bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+"원 보시하셨습니다. 성불하세요.";
    		}
    		
    		var data = {
    			 TR_ID        : "14"
    			,TR_SENDSTAT  : "0"
    			,TR_PHONE     : mobileTelno
    			,TR_DEST_INFO : recAmtInfo.PROPOSAL_BUD_NM+"^"+mobileTelno 
    			,TR_SMS_YN    : "T"
    			,TR_CALLBACK  : exCommon.user.tel  // telno
    			,TR_ETC1      : exCommon.user.templeCd
    			,TR_ETC2      : recAmtInfo.PROPOSAL_BUD_NO
    			,TR_ETC3      : "SMSREC"
    			,TR_ETC4      : "18"
    			,TR_ETC5      : exCommon.user.userId
    			,TR_MESSAGE   : fMessage + " " + bMessage
    		}
    		
    		//console.log(data);
    		
    		me.getViewModel().getStore('ds_sms').add(data);
    	}// for
    	
    },
    inFirstAmtCalc : function(){
    	var me = this;
    	var me_totPaymentPlanAmt  = 0;
    	try{
    		me_totPaymentPlanAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_youngtop_youngga').sum('PAYMENT_PLAN_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt' , me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
    	var me_totPaymentAmt  = 0;
    	try{
    		me_totPaymentAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_youngtop_youngga').sum('PAYMENT_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt' , me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
    	var me_misuAmt  = 0;
    	try{
    		var me_totPaymentPlanAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_youngtop_youngga').sum('PAYMENT_PLAN_AMT') );
    		var me_totPaymentAmt     = exCommon.getRepNum( me.getViewModel().getStore('ds_youngtop_youngga').sum('PAYMENT_AMT') );
    		me_misuAmt = parseInt(me_totPaymentPlanAmt) - parseInt(me_totPaymentAmt);
    	}catch (e) {}
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt' , me_misuAmt);
    },
    inDisalbedCms : function(){
    	return false;    	
    },
    callFamilyInfo : function(family , spirit){
    	
    	var me = this;
    	
    	//console.log('callFamilyInfo', family);
    	
    	
    	me.getViewModel().getStore('ds_familySelInfo').removeAll();
    	me.getViewModel().getStore('ds_spiritSelInfo').removeAll();
    	
    	
    	for(var i = 0; i<family.length; i++ ){
    		me.getViewModel().getStore('ds_familySelInfo').add( family[i] );
    	}// for
    	
    	for(var i = 0; i<spirit.length; i++ ){
    		me.getViewModel().getStore('ds_spiritSelInfo').add( spirit[i] );
    	}// for
    	
    	
    	
    	/*me.lookupReference('rec014w_02_e').getView().select( 0 );
    	me.lookupReference('rec014w_02_f').getView().select( 0 );*/
    	
    	
    	console.log('exCommon.user.death_type = ', exCommon.user.death_type);
    	
		if(exCommon.user.death_type == "2"){
			
			var rtnParam  = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo();
	    	var t_budno   = rtnParam.txt_budNo;
	    	
	    	if(rtnParam.cb_setBunga){
				t_budno = t_budno.substring(0,8);
			}else{
				t_budno = t_budno.substring(0,10);
			}
	    	
	    	var params = {
	    		 V_ACCEPT_GBN : "14"
	    		,V_BUD_NO     : rtnParam.txt_budNo
	    		,V_BUD_CODE   : t_budno
	    	};
			setTimeout(function(){
	    		me.callStore(me, 'ds_bokwi', '', params , me.dsBokwiCallback);
	    	},50);
		}
    },
    dsBokwiCallback : function(me, success, form, action){
    	me.lookupReference('lc_bokwi').setExValue('00000');
    	
    	for(var a=0; a<me.getViewModel().getStore('ds_spiritSelInfo').getCount();a++){
			me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).set('SEL_YN' , true);
		}// for
    	var getDaeJuInfo = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo();
    	
    	var STX_GBN_NM = "행효자"; 
    	if(getDaeJuInfo.SINDO_SEX_GBN == "F"){
    		STX_GBN_NM = "행효녀";
    	}
    	
    	me.lookupReference('txt_topju_nm').setExValue(getDaeJuInfo.BUD_NM);
    	me.lookupReference('sel_hyo_rel').setExValue(STX_GBN_NM);
    	me.lookupReference('em_accept_dt').setExValue(exCommon.getNowDate());
    	
    	me.getViewModel().getStore('ds_youngtop_detail').removeAll();
    },
    dsYoungtopDetailCallback : function(me, success, form, action){
    	var cnt = me.getViewModel().getStore('ds_youngtop_detail').getCount();
    	if(cnt > 0){
    		
    	}else{
    		
    	}
    },
    onSearchBokWi : function(opts , nowValue , oldValue){
    	var me = this;
    	
    	console.log('onSearchBokWi = ', nowValue);
    	
    	if(nowValue == "00000"){
    		
    		for(var a=0; a<me.getViewModel().getStore('ds_spiritSelInfo').getCount();a++){
    			me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).set('SEL_YN' , true);
    		}// for
    		
    	}else{
    		var findRocord = me.getViewModel().getStore('ds_bokwi').findRecord('FIND_VALUE', nowValue, 0, false, true, true);
    		
    		var pageskip = findRocord.get("BUD_NO");
    		
    		console.log('pageskip = ', pageskip);
    		
    		for(var a=0; a<me.getViewModel().getStore('ds_spiritSelInfo').getCount();a++){
    	    	
    			var val = false;
    			
    	    	if( pageskip == me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).get("BOKWIJA_NO")  ){
    	    		val  = true;
    	    	}
    	    	me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).set("SEL_YN", val);
    			
    	    }// for
    		
    	}
    	
    },
    onSortUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_youngtop_youngga').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var fir_record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(0);
    	
    	
    	var selection = me.lookupReference('rec014w_02_b').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec014w_02_b').getStore().indexOf(selection);
    	
    	
    	if(_idx == 0) return false;
    	
    	var upRecord      = me.lookupReference('rec014w_02_b').getStore().getAt(_idx-1);
    	var upSortSeq     = upRecord.get("BONGTOP_SEQ");
    	var selectSortSeq = selection.get("BONGTOP_SEQ");
    	
    	selection.set("BONGTOP_SEQ" , upSortSeq);
    	upRecord.set("BONGTOP_SEQ"  , selectSortSeq);

    	me.getViewModel().getStore('ds_youngtop_youngga').sort([{
            property  : 'BONGTOP_SEQ',
            direction : 'ASC'
        }]);
    	
    	
    	var PAYMENT_PLAN_AMT = fir_record.get("PAYMENT_PLAN_AMT");
    	var PAYMENT_AMT 	 = fir_record.get("PAYMENT_AMT");
    	var JUNGAK_NM 		 = fir_record.get("JUNGAK_NM");
    	var LIGHT_NO 		 = fir_record.get("LIGHT_NO");
    	var REMARK 			 = fir_record.get("REMARK");
    	for(var i =0  ; i < _tCnt ; i++){
    		var record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(i);
    		
    		if(i==0){
    			record.set("PAYMENT_PLAN_AMT", PAYMENT_PLAN_AMT);
        		record.set("PAYMENT_AMT"     , PAYMENT_AMT);
        		record.set("MISU_AMT"        , parseInt(PAYMENT_PLAN_AMT)- parseInt(PAYMENT_AMT));
        		record.set("JUNGAK_NM"       , JUNGAK_NM);
        		record.set("LIGHT_NO"        , LIGHT_NO);
        		record.set("REMARK"          , REMARK);
    		}else{
    			record.set("PAYMENT_PLAN_AMT", 0);
        		record.set("PAYMENT_AMT"     , 0);
        		record.set("MISU_AMT"        , 0);
        		record.set("JUNGAK_NM"       , "");
        		record.set("LIGHT_NO"        , "");
        		record.set("REMARK"          , "");
    		}
    		record.set("POSITION_SEQ"    , i + 1);
    	}
    },
    onDownUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_youngtop_youngga').getCount();
    	if(_tCnt == 0) return false;
    	
    	var fir_record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(0);
    	
    	
    	var selection = me.lookupReference('rec014w_02_b').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec014w_02_b').getStore().indexOf(selection);
    	if(_tCnt == (_idx+1) ) return false;
    	
    	var downRecord   = me.lookupReference('rec014w_02_b').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("BONGTOP_SEQ");
    	
    	var selectSortSeq = selection.get("BONGTOP_SEQ");
    	
    	selection.set("BONGTOP_SEQ" , downSortSeq);
    	downRecord.set("BONGTOP_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_youngtop_youngga').sort([{
            property  : 'BONGTOP_SEQ',
            direction : 'ASC'
        }]);
    	
    	var PAYMENT_PLAN_AMT = fir_record.get("PAYMENT_PLAN_AMT");
    	var PAYMENT_AMT 	 = fir_record.get("PAYMENT_AMT");
    	var JUNGAK_NM 		 = fir_record.get("JUNGAK_NM");
    	var LIGHT_NO 		 = fir_record.get("LIGHT_NO");
    	var REMARK 			 = fir_record.get("REMARK");
    	for(var i =0  ; i < _tCnt ; i++){
    		var record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(i);
    		
    		if(i==0){
    			record.set("PAYMENT_PLAN_AMT", PAYMENT_PLAN_AMT);
        		record.set("PAYMENT_AMT"     , PAYMENT_AMT);
        		record.set("MISU_AMT"        , parseInt(PAYMENT_PLAN_AMT)- parseInt(PAYMENT_AMT));
        		record.set("JUNGAK_NM"       , JUNGAK_NM);
        		record.set("LIGHT_NO"        , LIGHT_NO);
        		record.set("REMARK"          , REMARK);
    		}else{
    			record.set("PAYMENT_PLAN_AMT", 0);
        		record.set("PAYMENT_AMT"     , 0);
        		record.set("MISU_AMT"        , 0);
        		record.set("JUNGAK_NM"       , "");
        		record.set("LIGHT_NO"        , "");
        		record.set("REMARK"          , "");
    		}
    		record.set("POSITION_SEQ"    , i + 1);
    	}
    	
    	
    	console.log('JUNGAK_NM = ', JUNGAK_NM);
    },
    callSetRecType : function(){
		return 14;
	}
})
