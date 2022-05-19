Ext.define('ExFrm.view.rec.rec011w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec011w_02',
    onSearch:function(params){
        var me = this;
       // console.log('rec020w_02 alias');
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
    	
    	setTimeout(function(){
          	me.callStore(me, 'ds_supportMgt', '', null , null);
        },50);
    	
    	if(success){
    		var CARD_USE = exCommon.getRepVal( me.getViewModel().getStore('ds_pgCardUseYn').getAt(0).get("CARD_USE"));
    		if(CARD_USE != "T"){
    			me.lookupReference('rdo_ApprovalGbn_r11_02').setReadOnly(true);
    		}
    	}
    },
    onTabChange:function(tappanel, panel){},
    onCallback002:function(params){
    	var me = this;
    	me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec020w_02_c', 'ds_SupportRec' , false , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onDelAll : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec020w_02_c', 'ds_SupportRec' , true , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onShift : function(){
    	var me = this;
    	
    	var SORT  = 1;
    	
    	var e_row   = me.getViewModel().getStore('ds_supportMgt').getCount();
    	var f_row   = me.getViewModel().getStore('ds_familySelInfo').getCount();
    	var rec_row = me.getViewModel().getStore('ds_SupportRec').getCount();
    	
    	var nowMonth = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	for(var i = 0; i < e_row ; i++){
    		var e_record = me.getViewModel().getStore('ds_supportMgt').getAt(i);    		
    		var e_SEL_YN = e_record.get("SEL_YN");
    		
    		console.log('e_SEL_YN = ', e_SEL_YN);
    		
    		if(e_SEL_YN){
    			for(var j = 0; j < f_row ; j++){
    				var f_record = me.getViewModel().getStore('ds_familySelInfo').getAt(j);
    	    		var f_SEL_YN = f_record.get("SEL_YN");
    	    		
    	    		if(f_SEL_YN){
    	    			var data = {
    	    				 SORT                 : SORT
    	    				,TEMPLE_CD            : exCommon.user.templeCd
    	    				,SEQ                  : ""
    	    				,ACCEPT_GBN           : "9"
    	    				,SUPPORT_CODE         : e_record.get("SUPPORT_CODE")
    	    				,SUPPORT_NM           : e_record.get("SUPPORT_NM")
    	    				,DONGCHAM_BUD_NO      : f_record.get("BUD_NO")
    	    				,NAME_KOR             : f_record.get("NAME_KOR")
    	    				,BASE_AMT             : 0
    	    				,PAYMENT_AMT          : 0
    	    				,DEL_YN               : 'F'
    	    				,SUPPORT_END_YN       : 'F'
    	    				,SUPPORT_PERIOD       : 1
    	    				,FIRST_PAYMENT_YYYYMM : nowMonth.substr(0,4)+""+nowMonth.substr(5,2)
    	    				,RECEIPT_AMT          : 0
    	    				,REMARK               : ''
    	    				,PAYMENT_PLAN_AMT     : 0
    	    				,MISU_AMT             : 0
    	    			}
	    				me.getViewModel().getStore('ds_SupportRec').add(data);
    	    			SORT++;
    	    		}// if e_SEL_YN
    			}// for j
    		}// if f_SEL_YN
    	}// for i
    	
    	if(SORT != 1){
    		me.lookupReference('rec011w_02_c').getView().select(rec_row);
    	}
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onSave : function(){
    	var me = this;
    	
    	var rowCnt = exCommon.ChangeCount('ds_SupportRec' , me);
    	
    	if(rowCnt == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림',   "접수할 신청건이 없습니다.");    				
    		},50);
    		return false;
    	}
    	
    	var rdo_ApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r11_02').getValue().rdo_ApprovalGbn_r11_02,1);
    	
    	if( !me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation() ) return false;
    	
    	var row = me.getViewModel().getStore('ds_SupportRec').getCount();
    	
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_SupportRec').getAt(i);
    		
    		console.log('record = ', record);
    		
    		var FIRST_PAYMENT_YYYYMM = exCommon.getRepVal(record.get("FIRST_PAYMENT_YYYYMM"), "");
    		var SUPPORT_PERIOD       = exCommon.getRepNum(record.get("SUPPORT_PERIOD"));
    		var BASE_AMT       		 = exCommon.getRepNum(record.get("BASE_AMT"));
    		var PAYMENT_AMT       	 = exCommon.getRepNum(record.get("PAYMENT_AMT"));
    		
    		if( FIRST_PAYMENT_YYYYMM .length  != 6){
    			exCommon.msgAlert("후원시작월은 년/월 6자리입니다. <br>예) 200901");
    			me.lookupReference('rec011w_02_a').getView().select(row);
    			return false;
    		}
    		
    		if( FIRST_PAYMENT_YYYYMM.substring(4,6) > 12){
    			exCommon.msgAlert("후원시작월은 월은  12까지 입니다. <br>예) 200901");
    			me.lookupReference('rec011w_02_a').getView().select(row);
    			return false;
    		}
    		
    		if( SUPPORT_PERIOD <  0){
    			exCommon.msgAlert("납부 기간은 0이상을 입력하셔야 합니다.");
    			me.lookupReference('rec011w_02_a').getView().select(row);
    			return false;
    		}
    		
    		if( BASE_AMT <= 0){
    			exCommon.msgAlert("월납입예정금액은 필수입니다.");
    			me.lookupReference('rec011w_02_a').getView().select(row);
    			return false;
    		}else{
    			if( PAYMENT_AMT % BASE_AMT != 0 ){
    				exCommon.msgAlert('납부금액은 월납부금액인  '+BASE_AMT+'원<br>단위로 만 가능합니다.');
    				me.lookupReference('rec011w_02_a').getView().select(row);
    				return false;
    			}// if
    		}
    		
    		var m = SUPPORT_PERIOD;
    		if(m >0){
    			var a = BASE_AMT;
    			var t = PAYMENT_AMT;
    			
    			if(m*a < t){
    				exCommon.msgAlert("납입금액은 (기간 * 기준급액) 을 초과할 수 없습니다.");
    				me.lookupReference('rec011w_02_a').getView().select(row);
    				return false;
    			}
    		}// if m
    	}// for row
    	
    	
    	var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	ds_acceptRecAmtData.CASH_TYPE  = rdo_ApprovalGbn;
    	
    	
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
		
		if (ds_acceptRecAmtData.APPROVAL_GBN != 3) {
			ds_acceptRecAmtData.APPROVAL_GBN = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r11_02').getValue().rdo_ApprovalGbn_r11_02,1);
		}
		

		var dApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r11_02').getValue().rdo_ApprovalGbn_r11_02,1);
		
		if(dApprovalGbn == 3){
			if( exCommon.getRepVal(ds_acceptRecAmtData.MOBILE_TELNO1  ,"BANK_NO") 		 == "" || 
				exCommon.getRepVal(ds_acceptRecAmtData.MOBILE_TELNO2  ,"ACCOUNT_NUMBER") == "" ||  
				exCommon.getRepVal(ds_acceptRecAmtData.MOBILE_TELNO3  ,"") 				 == ""     ){
				
				exCommon.msgAlert('CMS 계좌를 선택하세요.');
				return false;
			}
			
			
			var me_juminNo = exCommon.getRepVal(ds_acceptRecAmtData.MOBILE_TELNO1  ,"JUMIN_NO");
			if(me_juminNo.length == 10 && !gf_BizNoCheck(me_juminNo)){
				exCommon.msgAlert('유효하지 않은 사업자 등록번호 입니다.');
				return false;
			}
		}
    	
    	
    	me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    	me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
    	
    	
    	
    	if(rdo_ApprovalGbn == 2){ 
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_SupportRec').getCount(); i++){
				var record = me.getViewModel().getStore('ds_SupportRec').getAt(i).data;
				
				record.PgCardPopupGbn = '1';
				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
				record.ACCEPT_GBNTXT  = record.SUPPORT_NM;
				
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
    	
    	
    	exCommon.addParamSetting(me , 'ds_SupportRec'   , 'ds_SupportRec');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' , 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          , 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   , 'ds_pgCardInfo');
    	
    	/*카드결제일때 추가해야*/
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, '/rec/REC011W_02/save.suvila', me.onSaveCallback , false);
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
		

		exCommon.addParamSetting(me , 'ds_SupportRec'		, 'ds_SupportRec');
    	exCommon.addParamSetting(me , 'ds_youngtop_detail'  , 'ds_youngtop_detail');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' 	, 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          	, 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   	, 'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me, '/rec/REC011W_02/save.suvila', me.onSaveCallback , false);
		}, 50);
		
	},
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_SupportRec');
    	if(success){
    		me.getViewModel().getStore('ds_SupportRec').removeAll();
    		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    		me.getViewModel().getStore('ds_sms').removeAll();
    		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
    		
    		
    		me.getViewModel().getStore('ds_SupportRec').commitChanges();
    		me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
    		me.getViewModel().getStore('ds_sms').commitChanges();
    		me.getViewModel().getStore('ds_pgCardInfo').commitChanges();
    		
    		me.inFirstAmtCalc();
        	me.inPaymentAmtCalc();
        	me.inMisuAmtCalc();
    		
        	me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
        	
        	
        	me.getViewModel().getStore('ds_supportMgt').rejectChanges();
    		me.getViewModel().getStore('ds_familySelInfo').rejectChanges();
    	}
    },
    onEdit : function(editor, context, eOpts) {
    	var me = this;
    	
    	console.log(context.field);
    	var record           = me.getViewModel().getStore('ds_SupportRec').getAt(context.rowIdx);
    	
    	
    	if(context.field == 'SUPPORT_PERIOD'){
    		var SUPPORT_PERIOD =  exCommon.getRepNum(record.get("SUPPORT_PERIOD"));
    		record.set('SUPPORT_PERIOD' , SUPPORT_PERIOD);
    	}
    	
    	var record           = me.getViewModel().getStore('ds_SupportRec').getAt(context.rowIdx);
    	var BASE_AMT 		 = exCommon.getRepNum(record.get("BASE_AMT"));
    	var PAYMENT_AMT      = exCommon.getRepNum(record.get("PAYMENT_AMT"));
    	var SUPPORT_PERIOD   = exCommon.getRepNum(record.get("SUPPORT_PERIOD"));
    	
    	var PAYMENT_PLAN_AMT = exCommon.getRepNum(record.get("PAYMENT_PLAN_AMT"));
			PAYMENT_PLAN_AMT = parseInt(SUPPORT_PERIOD) * parseInt(BASE_AMT);

		
		record.set("PAYMENT_PLAN_AMT", parseInt(SUPPORT_PERIOD) * parseInt(BASE_AMT));
		record.set("PAYMENT_AMT"     , parseInt(PAYMENT_AMT));
		record.set("MISU_AMT"        , parseInt(PAYMENT_PLAN_AMT) - parseInt(PAYMENT_AMT));
    	
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    callFamilyInfo : function(family , spirit){
    	
    	var me = this;
    	
    	console.log(1);
    	
    	me.getViewModel().getStore('ds_familySelInfo').removeAll();
    	console.log(2);
    	var txt_budNo = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo().txt_budNo;
    	console.log(3);
    	for(var i = 0; i<family.length; i++ ){
    		me.getViewModel().getStore('ds_familySelInfo').add( family[i] );
    	};//
    	console.log(4);
    	
 
    	
    	console.log('getTxtBudNo = ', me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo());
    	
    	me.getViewModel().getStore('ds_familySelInfo').commitChanges();
    	
    },
    inSendMessage : function( smsInfo){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	var mobileTelno   = smsInfo.MOBILE_TELNO1 + smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
    	
    	var recAmtInfo    = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	
    	var rCnt = me.getViewModel().getStore('ds_SupportRec').getCount();
    	for(var i = 0; i < rCnt ; i++){
    		var record =  me.getViewModel().getStore('ds_SupportRec').getAt(i);
    		var smsNum = i;
    		
    		var fMessage  = "["+exCommon.user.templeNm+"("+(smsNum+1)+") ";
    		    fMessage +=  record.get("SUPPORT_NM") +" "+ record.get("NAME_KOR")
    		    fMessage += " " + exCommon.setNumberFormat(record.get("PAYMENT_PLAN_AMT")) + "] "; 
    		    		    		
    		var bMessage = "동참(예약)되었습니다. 성불하세요";
    		
    		if( record.get("PAYMENT_AMT") > 0  ){
    			bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+"원 보시하셨습니다. 성불하세요.";
    		}
    		
    		var data = {
    			 TR_ID        : "9"
    			,TR_SENDSTAT  : "0"
    			,TR_PHONE     : mobileTelno
    			,TR_DEST_INFO : recAmtInfo.PROPOSAL_BUD_NM+"^"+mobileTelno 
    			,TR_SMS_YN    : "T"
    			,TR_CALLBACK  : exCommon.user.tel  // telno
    			,TR_ETC1      : exCommon.user.templeCd
    			,TR_ETC2      : recAmtInfo.PROPOSAL_BUD_NO
    			,TR_ETC3      : "SMSREC"
    			,TR_ETC4      : "9"
    			,TR_ETC5      : exCommon.user.userId
    			,TR_MESSAGE   : fMessage + " " + bMessage
    		}
    		
    		me.getViewModel().getStore('ds_sms').add(data);
    	}// for
    	
    },
    inFirstAmtCalc : function(){
    	var me = this;
    	var me_totPaymentPlanAmt  = 0;
    	try{
    		me_totPaymentPlanAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_SupportRec').sum('PAYMENT_PLAN_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt' , me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
    	var me_totPaymentAmt  = 0;
    	try{
    		me_totPaymentAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_SupportRec').sum('PAYMENT_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt' , me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
    	var me_misuAmt  = 0;
    	try{
    		me_misuAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_SupportRec').sum('MISU_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt' , me_misuAmt);
    },
    inDisalbedCms : function(){
    	return true;    	
    },
    callSetRecType : function(){
		return 9;
	}
})
