Ext.define('ExFrm.view.rec.rec002w_02Controller',{
	extend : 'ExFrm.view.base.ViewController',
	alias : 'controller.rec002w_02',
	onCalled : function(params){},
	onInit : function() {
		var me = this;

		setTimeout(function() {
			me.callStore(me, 'ds_GDKindInfo', '', null,me.dsGdKindCallback);
		}, 50);
	},
	onAfterRender : function() {
		var me = this;

		var record = {
			"BUD_NO" : "-9999",
			"NAME_KOR" : "선택안함"
		}
		me.getViewModel().getStore('body_FamilyInfo').add(record);
	},
	dsGdKindCallback : function(me, success, form, action) {


		me.lookupReference('rec002w_02_a').getView().select(0);
	},
	callFamilyInfo : function(family, spirit) {

		var me = this;


		me.getViewModel().getStore('body_FamilyInfo').removeAll();
		me.getViewModel().getStore('ds_familySelInfo').removeAll();
		me.getViewModel().getStore('ds_spiritSelInfo').removeAll();
		var record = {
			"BUD_NO" : "-9999",
			"NAME_KOR" : "선택안함"
		}
		me.getViewModel().getStore('body_FamilyInfo').add(record);

		for (var i = 0; i < family.length; i++) {
			me.getViewModel().getStore('body_FamilyInfo').add(family[i]);
			me.getViewModel().getStore('ds_familySelInfo').add(family[i]);
		}// for

		for (var i = 0; i < spirit.length; i++) {
			me.getViewModel().getStore('ds_spiritSelInfo').add(spirit[i]);
		}// for


		console.log('body_FamilyInfo  = ', me.getViewModel().getStore('body_FamilyInfo').getCount());
		console.log('ds_spiritSelInfo = ', me.getViewModel().getStore('ds_spiritSelInfo').getCount());

	},
	onCallback002 : function(params) {
		var me = this;
		me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
	},
	onShift : function() {
		var me = this;

		var recAmtDefault = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
		var row = me.getViewModel().getStore('ds_GDRec').getCount();
		var cnt = me.getViewModel().getStore('ds_GDKindInfo').getCount();

		for (var i = 0; i < cnt; i++) {
			var record = me.getViewModel().getStore('ds_GDKindInfo').getAt(i);
			var SEL_YN = record.get("SEL_YN");

			if (SEL_YN) {
				console.log(i, " : " + SEL_YN);
				var tempCnt = me.getViewModel().getStore('ds_GDRec').getCount() + 1;
				var data = {
					TEMPLE_CD : record.get("TEMPLE_CD"),
					ACCEPT_GBN : "1",
					PRAY_GBN : record.get("PRAY_GBN"),
					PROD_CODE : record.get("PROD_CODE"),
					PRAY_NM : record.get("PRAY_NM"),
					FDATE : record.get("FDATE"),
					RDATE : record.get("RDATE"),
					PERIOD : record.get("PERIOD"),
					BASE_PLAN_AMT : record.get("AMOUNT"),
					NAME_KOR : ""// dsSel.NameValue(faminlySelInfoRow[b-1],"NAME_KOR");
					,
					PAYMENT_PLAN_AMT : record.get("PROD_AMT"),
					PAYMENT_AMT : record.get("PROD_AMT"),
					MISU_AMT : 0,
					CMS_TYPE : exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r02_02').getValue().rdo_ApprovalGbn_r02_02, 1),
					END_YN : "F",
					DEL_YN : "F",
					REMARK : "",
					PER_BUD_NO : "-9999"
				}

				me.getViewModel().getStore('ds_GDRec').add(data);

				if (row == 0)
					me.lookupReference('rec002w_02_b').getView().select(0);

				record.set("SEL_YN", false);
			}
		}// for

		me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();
	},
	onDelete : function() {
		var me = this;

		exCommon.gridRemove(me, 'rec002w_02_b', 'ds_GDRec',false, true);

		me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();
	},
	onDelAll : function() {
		var me = this;
		exCommon.gridRemove(me, 'rec002w_02_b', 'ds_GDRec',true, true);

		me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();
	},
	onSave : function() {
		var me = this;

		var rowCnt = exCommon.ChangeCount('ds_GDRec', me);

		if (rowCnt == 0) {
			setTimeout(function() {
				Ext.Msg.alert('알림', "접수할 기도가 없습니다.");
			}, 50);
			return false;
		}

		if (!me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation()) return false;
		


		var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
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
		
		console.log('smsInfo = ', smsInfo);
		
		var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_r02_02').getValue().rdo_ApprovalGbn_r02_02;
		console.log('rdo_ApprovalGbn = ', rdo_ApprovalGbn);
		
		if(rdo_ApprovalGbn == 2){ // 카드결제일때
			console.log('카드결제창');
			
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_GDRec').getCount(); i++){
				var record = me.getViewModel().getStore('ds_GDRec').getAt(i).data;
				
				record.PgCardPopupGbn = '1';
				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
				record.ACCEPT_GBNTXT  = record.PRAY_NM;
				
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
		
		

		ds_acceptRecAmtData.CASH_TYPE = me.lookupReference('rdo_ApprovalGbn_r02_02').getValue().rdo_ApprovalGbn_r02_02;

		if (ds_acceptRecAmtData.APPROVAL_GBN != 3) {
			ds_acceptRecAmtData.APPROVAL_GBN = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r02_02').getValue().rdo_ApprovalGbn_r02_02,1);
		}
		/*
		 * console.log('ds_acceptRecAmtData
		 * =',ds_acceptRecAmtData ); return false;
		 */

		/* 카드결제일때  개발해야함*/
		
		

		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
		me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);

		exCommon.addParamSetting(me, 'ds_GDRec'        ,'ds_GDRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?',function(btn) {
			if (btn == 'yes') {
				me.callForm(me,'/rec/REC002W_02/save.suvila',me.onSaveCallback, false);
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
		
		

		exCommon.addParamSetting(me, 'ds_GDRec'        ,'ds_GDRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC002W_02/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
	onSaveCallback : function(me, success, form, action) {
		exCommon.fnGridSaveCallback(me, success, action,'ds_GDRec');
		
		if (success) {
			
			me.getViewModel().getStore('ds_GDRec').removeAll();
			me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
			me.getViewModel().getStore('ds_sms').removeAll();
			me.getViewModel().getStore('ds_pgCardInfo').removeAll();

			me.getViewModel().getStore('ds_GDRec').commitChanges();
			me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
			me.getViewModel().getStore('ds_sms').commitChanges();
			me.getViewModel().getStore('ds_pgCardInfo').commitChanges();

			me.inFirstAmtCalc();
			me.inPaymentAmtCalc();
			me.inMisuAmtCalc();
			// onSearchRec
			me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
			
			me.lookupReference('rdo_ApprovalGbn_r02_02').setValue(1);
		}
	},
	inFirstAmtCalc : function() {
		var me = this;
		var me_totPaymentPlanAmt = 0;
		try {
			me_totPaymentPlanAmt = exCommon.getRepNum(me.getViewModel().getStore('ds_GDRec').sum('PAYMENT_PLAN_AMT'));
		} catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt',me_totPaymentPlanAmt);
	},
	inPaymentAmtCalc : function() {
		var me = this;
		var me_totPaymentAmt = 0;
		try {
			me_totPaymentAmt = exCommon.getRepNum(me.getViewModel().getStore('ds_GDRec').sum('PAYMENT_AMT'));
		} catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt',me_totPaymentAmt);
	},
	inMisuAmtCalc : function() {
		var me = this;
		var me_misuAmt = 0;
		try {

			me_misuAmt = exCommon.getRepNum(me.getViewModel().getStore('ds_GDRec').sum('PAYMENT_PLAN_AMT'))  - 
						 exCommon.getRepNum(me.getViewModel().getStore('ds_GDRec').sum('PAYMENT_AMT'));
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

		var rCnt = me.getViewModel().getStore('ds_GDRec').getCount();
		for (var i = 0; i < rCnt; i++) {
			var record = me.getViewModel().getStore('ds_GDRec').getAt(i);
			var smsNum = i;

			var fMessage = "[" + exCommon.user.templeNm + "("+ (smsNum + 1) + ") ";
			   fMessage += record.get("PRAY_NM")+ " "+ exCommon.setNumberFormat(record.get("PAYMENT_PLAN_AMT")) + "] ";

			var bMessage = "동참(예약)되었습니다. 성불하세요";

			if (record.get("PAYMENT_AMT") > 0) {
				bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+ "원 보시하셨습니다. 성불하세요.";
			}

			var data = {
				TR_ID : "1",
				TR_SENDSTAT : "0",
				TR_PHONE : mobileTelno,
				TR_DEST_INFO : recAmtInfo.PROPOSAL_BUD_NM + "^"
						+ mobileTelno,
				TR_SMS_YN : "T",
				TR_CALLBACK : exCommon.user.tel // telno
				,
				TR_ETC1 : exCommon.user.templeCd,
				TR_ETC2 : recAmtInfo.PROPOSAL_BUD_NO,
				TR_ETC3 : "SMSREC",
				TR_ETC4 : "1",
				TR_ETC5 : exCommon.user.userId,
				TR_MESSAGE : fMessage + " " + bMessage
			}
			console.log(data);
			me.getViewModel().getStore('ds_sms').add(data);
		}// for

	},
	onBeforeedit : function(editor, context, eOpts) {
		var me = this;

		if (context.colIdx == 2) {
			var PER_BUD_NO = me.lookupReference('rec002w_02_b')
					.getStore().getAt(context.rowIdx).get(
							"PER_BUD_NO");

			if (PER_BUD_NO == '-9999') {
				return false;
			}
			return true;
		} else {
			return true;
		}
	},
	onEdit : function(editor, context, eOpts) {
		var me = this;

		var record = me.lookupReference('rec002w_02_b').getView().getSelectionModel().getSelection()[0];

		if (context.colIdx == 1&& record.get("PER_BUD_NO") == "-9999") {
			record.set("ORGINATE", "");
		}

		var PAYMENT_PLAN_AMT = exCommon.getRepNum(record.get("PAYMENT_PLAN_AMT"));
		var PAYMENT_AMT = exCommon.getRepNum(record.get("PAYMENT_AMT"));

		record.set("MISU_AMT", PAYMENT_PLAN_AMT - PAYMENT_AMT);

		me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();
	},
	callSetRecType : function(){
		return 1;
	}
})
