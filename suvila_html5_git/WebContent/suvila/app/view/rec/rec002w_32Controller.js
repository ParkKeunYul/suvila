Ext.define('ExFrm.view.rec.rec002w_32Controller',{
	extend : 'ExFrm.view.base.ViewController',
	alias : 'controller.rec002w_32',
	onCalled : function(params){},
	onInit : function() {
		var me = this;

	},
	onAfterRender : function() {
		var me = this;

		var record = {
			"BUD_NO" : "-9999",
			"NAME_KOR" : "선택안함"
		}
		me.getViewModel().getStore('body_FamilyInfo').add(record);
		
		setTimeout(function() {
			me.callStore(me, 'ds_BSKindDetail', '', null,me.ds_BSKindCallback);
		}, 50);

	},
	dsGdKindCallback : function(me, success, form, action) {

		me.lookupReference('rec002w_32_a').getView().select(0);
	},
	ds_BSKindCallback : function(me, success, form, action) {

		me.lookupReference('rec002w_32_c').getView().select(0);

		setTimeout(function() {
			me.callStore(me, 'ds_BSKindInfo', '', null,me.ds_BSKindInfoCallback);
		}, 50);

	},
	ds_BSKindInfoCallback : function(me, success, form, action) {
		me.lookupReference('lc_BSKindInfo').setExValue("0");
	},
	callFamilyInfo : function(family, spirit) {

		var me = this;

		// console.log('callFamilyInfo', family);
		me.getViewModel().getStore('ds_familySelInfo').removeAll();
		me.getViewModel().getStore('ds_spiritSelInfo').removeAll();
		
		
		try{
			for(var i = 0; i<family.length; i++ ){
	    		me.getViewModel().getStore('ds_familySelInfo').add( family[i] );
	    		me.getViewModel().getStore('ds_familySelInfo').getAt(i).set("SEL_YN", false);
	    	}// for
		}catch (e) {console.log(e);}
		

		try{
			for (var i = 0; i < spirit.length; i++) {
			//	console.log(spirit[i]);
				me.getViewModel().getStore('ds_spiritSelInfo').add(spirit[i]);
			}// for
		}catch (e) {console.log(e);}
		
		me.getViewModel().getStore('ds_familySelInfo').commitChanges();
		me.getViewModel().getStore('ds_spiritSelInfo').commitChanges();
		me.lookupReference('rec002w_32_f').getView().select(0);
/*
		console.log('body_FamilyInfo   ', me.getViewModel().getStore('body_FamilyInfo').getCount());
		console.log('ds_spiritSelInfo  ', me.getViewModel().getStore('ds_spiritSelInfo').getCount());
		*/
	},
	onCallback002 : function(params) {
		var me = this;
		console.log('onCallback002 = ', params);
		me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
	},
	onShift : function() {
		var me = this;

		/*
		 * if(
		 * !me.getView().down('[xtype=rec000w_02]').getController().inDaejuInfoCheck() )
		 * return false;
		 * 
		 */

		var recAmtDefault = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();


		var index = me.getViewModel().getStore('ds_BSKindDetail').find("SEL_YN", true, 0,false, true, true);

		console.log('index = ', index);

		if (index < 0) {
			exCommon.msgAlert('불사 종류를 선택해 주세요.');
			return false;
		}

		var row = me.getViewModel().getStore('ds_BSKindDetail').getCount();
		
		var type_nm = 'ds_spiritSelInfo';
		var type_yn = '2';
		if( me.lookupReference('familyTab').getActiveTab().title != "영가" ){
			type_nm = 'ds_familySelInfo';
			type_yn = '1';
		}
		
		for (var i = 0; i < row; i++) {
			var record = me.getViewModel().getStore('ds_BSKindDetail').getAt(i);

			if (record.get("SEL_YN")) {

				var subRow = me.getViewModel().getStore(type_nm).getCount();
				for (var j = 0; j < subRow; j++) {

					var subRecord = me.getViewModel().getStore(type_nm).getAt(j);
					var SUB_SEL_YN = subRecord.get("SEL_YN");
					if (SUB_SEL_YN) {

						var data = {
							BUD_NO           : subRecord.get("BUD_NO"),
							NAME_KOR         : subRecord.get("NAME_KOR"),
							TEMPLE_CD        : record.get("TEMPLE_CD"),
							PAYMENT_PLAN_AMT : record.get("PROD_AMT"),
							PAYMENT_AMT      : record.get("PROD_AMT"),
							MISU_AMT         : 0,
							BULSA_SEQ        : record.get("BULSA_SEQ"),
							BULSA_DETAIL     : record.get("BULSA_DETAIL"),
							BULSA_NM         : record.get("BULSA_NM"),
							MEMO             : record.get("MEMO"),
							ACPT_FDATE       : record.get("ACPT_FDATE"),
							ACPT_EDATE       : record.get("ACPT_EDATE"),
							CMS_TYPE         : exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r02_032').getValue().rdo_ApprovalGbn_r02_032,1),
							END_YN           : "F",
							DEL_YN           : "F",
							IMG_NORMAL       : "N",
							IMG_DETAIL       : "S",
							PROD_CODE        : record.get("PROD_CODE"),
							SPIRITUAL_YN     : type_yn,
							ACCEPT_GBN       : "3"
						}// bsAdd
						me.getViewModel().getStore('ds_BSRec').add(data);
						me.lookupReference('rec002w_32_d').getView().select(0);

					}//
				}// subfor
				record.set("SEL_YN", false);
			}// i record.get("SEL_YN")
		}

		var subRow = me.getViewModel().getStore(type_nm).getCount();
		for (var j = 0; j < subRow; j++) {
			me.getViewModel().getStore(type_nm).getAt(j).set("SEL_YN", false);
		}// 

		me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();
	},
	onDelete : function() {
		var me = this;

		exCommon.gridRemove(me, 'rec002w_32_d', 'ds_BSRec',false, true);

		me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();
	},
	onDelAll : function() {
		var me = this;
		exCommon.gridRemove(me, 'rec002w_32_d', 'ds_BSRec',true, true);

		me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();
	},
	onSave : function() {
		var me = this;

		var rowCnt =  exCommon.ChangeCount('ds_BSRec', me);

		if (rowCnt == 0) {
			setTimeout(function() {
				Ext.Msg.alert('알림', "접수할 기도가 없습니다.");
			}, 50);
			return false;
		}

		if (!me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation())
			return false;

		var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();


		console.log('rdo_ApprovalGbn = ', me.lookupReference('rdo_ApprovalGbn_r02_032').getValue().rdo_ApprovalGbn_r02_032);

		ds_acceptRecAmtData.CASH_TYPE = me.lookupReference('rdo_ApprovalGbn_r02_032').getValue().rdo_ApprovalGbn_r02_032;

		if (ds_acceptRecAmtData.APPROVAL_GBN != 3) {
			ds_acceptRecAmtData.APPROVAL_GBN = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r02_032').getValue().rdo_ApprovalGbn_r02_032,1);
		}
		var smsInfo = me.getView().down('[xtype=rec000w_03]').getController().inSmsInfo();
		
		if (smsInfo.SMS_YN == "T" || smsInfo.SMS_YN == true) {
			if( exCommon.getRepVal(smsInfo.MOBILE_TELNO1  ,"") == "" || 
				exCommon.getRepVal(smsInfo.MOBILE_TELNO2  ,"") == "" ||  
				exCommon.getRepVal(smsInfo.MOBILE_TELNO3  ,"") == ""    ){
				
				exCommon.msgAlert('발송전화번호를 입력하시기 바랍니다.');
				return false;
			}
			me.inSendMessage(smsInfo);
			ds_acceptRecAmtData.SMS_YN = 'T';
		}
		
		var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_r02_032').getValue().rdo_ApprovalGbn_r02_032;
		console.log('rdo_ApprovalGbn = ', rdo_ApprovalGbn);
		
		if(rdo_ApprovalGbn == 2){ // 카드결제일때
			console.log('카드결제창');
			
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_BSRec').getCount(); i++){
				var record = me.getViewModel().getStore('ds_BSRec').getAt(i).data;
				
				record.PgCardPopupGbn = '1';
				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
				record.ACCEPT_GBNTXT  = record.BULSA_NM;
				
				record.EMAIL 		 = daejuRecord.get("EMAIL");
				record.MOBILE_TELNO1 = daejuRecord.get("MOBILE_TELNO1");
				record.MOBILE_TELNO2 = daejuRecord.get("MOBILE_TELNO2");
				record.MOBILE_TELNO3 = daejuRecord.get("MOBILE_TELNO3");
				record.BUYER_NAME    = daejuRecord.get("NAME_KOR");
				record.CARD_BUD_NO   = ds_acceptRecAmtData.PROPOSAL_BUD_NO;
				
				
				array[i] = record;
			//	console.log(record);
				
			}// for i
			
			setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.cardPay',  array, me.onSaveCard);
	       	},100);
			return;
		}

		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
		me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);

		exCommon.addParamSetting(me, 'ds_BSRec'        ,'ds_BSRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?',function(btn) {
			if (btn == 'yes') {
				me.callForm(me,'/rec/REC002W_02/save.suvila',me.onSaveCallback, false);
			}
		});
	},
	onSaveCallback : function(me, success, form, action) {
		exCommon.fnGridSaveCallback(me, success, action,'ds_BSRec');
		
		if (success) {
			
			me.getViewModel().getStore('ds_BSRec').removeAll();
			me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
			me.getViewModel().getStore('ds_sms').removeAll();
			me.getViewModel().getStore('ds_pgCardInfo').removeAll();

			me.getViewModel().getStore('ds_BSRec').commitChanges();
			me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
			me.getViewModel().getStore('ds_sms').commitChanges();
			me.getViewModel().getStore('ds_pgCardInfo').commitChanges();

			me.inFirstAmtCalc();
			me.inPaymentAmtCalc();
			me.inMisuAmtCalc();
			// onSearchRec
			me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
		}
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
		
		

		exCommon.addParamSetting(me, 'ds_BSRec'        ,'ds_BSRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC002W_02/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
	inFirstAmtCalc : function() {
		var me = this;
		var me_totPaymentPlanAmt = 0;
		try {
			me_totPaymentPlanAmt = exCommon.getRepNum(me.getViewModel().getStore('ds_BSRec').sum('PAYMENT_PLAN_AMT'));
		} catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt',me_totPaymentPlanAmt);
	},
	inPaymentAmtCalc : function() {
		var me = this;
		var me_totPaymentAmt = 0;
		try {
			me_totPaymentAmt = exCommon.getRepNum(me.getViewModel().getStore('ds_BSRec').sum('PAYMENT_AMT'));
		} catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt',me_totPaymentAmt);
	},
	inMisuAmtCalc : function() {
		var me = this;
		var me_misuAmt = 0;
		try {

			me_misuAmt = exCommon.getRepNum(me.getViewModel().getStore('ds_BSRec').sum('PAYMENT_PLAN_AMT')) - 
						 exCommon.getRepNum(me.getViewModel().getStore('ds_BSRec').sum('PAYMENT_AMT'));
		} catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt', me_misuAmt);
	},
	inDisalbedCms : function() {
		return false;
	},
	inSendMessage : function(smsInfo) {
		var me = this;

		me.getViewModel().getStore('ds_sms').removeAll();

		var mobileTelno = smsInfo.MOBILE_TELNO1+ smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
		var recAmtInfo = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();

		var bCnt = me.getViewModel().getStore('ds_BSRec').getCount();
		for (var i = 0; i < bCnt; i++) {
			
			var record = me.getViewModel().getStore('ds_BSRec').getAt(i);

			var smsNum = i;

			var fMessage  = "[" + exCommon.user.templeNm + "("+ (smsNum + 1) + ") ";
				fMessage += record.get("BULSA_NM")+ " "+ exCommon.setNumberFormat(record.get("PAYMENT_PLAN_AMT")) + "] ";

			var bMessage = "동참(예약)되었습니다. 성불하세요";
			
			if (record.get("PAYMENT_AMT") > 0) {
				bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+ "원 보시하셨습니다. 성불하세요.";
			}
			
			var data = {
				TR_ID 	     : "3",
				TR_SENDSTAT  : "0",
				TR_PHONE 	 : mobileTelno,
				TR_DEST_INFO : recAmtInfo.PROPOSAL_BUD_NM + "^"+ mobileTelno,
				TR_SMS_YN    : "T",
				TR_CALLBACK  : exCommon.user.tel, // telno
				TR_ETC1      : exCommon.user.templeCd,
				TR_ETC2      : recAmtInfo.PROPOSAL_BUD_NO,
				TR_ETC3      : "SMSREC",
				TR_ETC4      : "3",
				TR_ETC5      : exCommon.user.userId,
				TR_MESSAGE   : fMessage + " " + bMessage
			}
			console.log(data);
			me.getViewModel().getStore('ds_sms').add(data);

		}// for

	},
	onBsEdit : function(editor, context, eOpts) {
		var me = this;
		var record = me.lookupReference('rec002w_32_d').getView().getSelectionModel().getSelection()[0];

		var PAYMENT_PLAN_AMT = exCommon.getRepNum(record.get("PAYMENT_PLAN_AMT"));
		var PAYMENT_AMT = exCommon.getRepNum(record.get("PAYMENT_AMT"));

		record.set("MISU_AMT", PAYMENT_PLAN_AMT - PAYMENT_AMT);

		me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();

	},
	onBschange : function() {
		var me = this;

		setTimeout(function() {
			me.callStore(me, 'ds_BSKindDetail', '', {
				'V_BULSA_CD' : me.lookupReference('lc_BSKindInfo').getExValue()
			}, null);
		}, 50);

	},
	callSetRecType : function(){
		return 3;
	}

})
