Ext.define('ExFrm.view.rec.rec024w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec024w_02',
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
    		
    			me.lookupReference('rdo_ApprovalGbn_r24_02_2').setReadOnly(true);
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

    	
    	var index = me.getViewModel().getStore('ds_PrayMgt').find("SEL_YN", true, 0, false, true, true);
    	
    	if(index < 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림',  " 상시기도  종류를 선택해 주세요.");    				
    		},50);
    		return false;
    	}
    	
    	
    	var nowMonth = exCommon.setDateFormat( exCommon.getNowDate() );
    	    	
    	var cnt  = me.getViewModel().getStore('ds_PrayMgt').getCount();
    	for(var i = 0 ; i < cnt ; i++){
    		var record   = me.getViewModel().getStore('ds_PrayMgt').getAt(i);
    		var SEL_YN   = record.get("SEL_YN");
    		if(SEL_YN){
    			var tempCnt = me.getViewModel().getStore('ds_PrayRec').getCount()+1;
    			var data = {
    				 TEMPLE_CD        : exCommon.user.templeCd
    				,ACCEPT_SEQ       : ""
    				,SEQ              :  tempCnt
    				,ACCEPT_GBN       : "13"
    				,PRAY_CODE        : record.get("PRAY_CODE")
    				,PRAY_NM          : record.get("PRAY_NM")
    				,START_YYYYMM     : nowMonth.substr(0,4)+""+nowMonth.substr(5,2)
    				,BASE_AMT         : record.get("AMOUNT")
    				,BASE_PLAN_AMT    : record.get("AMOUNT")
    				,PAYMENT_PLAN_AMT : 0
    				,PAYMENT_AMT      : 0
    				,MISU_AMT         : 0
    				,END_YN           : "F"
    				,DEL_YN           : "F"
    				,REMARK           : ""
    			}
    			me.getViewModel().getStore('ds_PrayRec').add(data);
    			
    		//	console.log( me.getViewModel().getStore('ds_PrayRec').getAt(i) );
    			
    			record.set("SEL_YN", false);
    		}
    	}// for
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec024w_02_b', 'ds_PrayRec' , false , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onDelAll : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec024w_02_b', 'ds_PrayRec' , true , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onSave : function(){
    	var me = this;
    	
    	var rowCnt = exCommon.ChangeCount('ds_PrayRec' , me);
    	
    	if(rowCnt == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림',   "접수할 상시기도가 없습니다.");    				
    		},50);
    		return false;
    	}
    	
    	
    	//if( !me.getView().down('[id=rec000w_03]').getController().inRecBasicValadation() ) return false;
    	if( !me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation() ) return false;
    	
    	var row = me.getViewModel().getStore('ds_PrayRec').getCount();
    	var flag = true;
    	for(var i = 0; i < row ; i++ ){
    		var record       = me.getViewModel().getStore('ds_PrayRec').getAt(i);
    		
    		
    		
    		console.log("record = ",record);
    		//console.log("START_YYYYMM = ",record.get("START_YYYYMM"));
    		
    		var START_YYYYMM = exCommon.getRepVal( record.get("START_YYYYMM") )+"";
    			try{
    				START_YYYYMM = exCommon.getGridDateFormat(START_YYYYMM, "", 6);
    				START_YYYYMM = START_YYYYMM.replace(/-/gi, "");
    				START_YYYYMM = START_YYYYMM.replace(/\//gi, "");    	
    				START_YYYYMM = START_YYYYMM.substr(0,6);    				
    				
    			}catch (e) {
					console.log('START_YYYYMM e', e);
				}
    		
    			
    		var BASE_AMT     = exCommon.getRepNum( record.get("BASE_AMT") );
    		var PAYMENT_AMT  = exCommon.getRepNum( record.get("PAYMENT_AMT") );
    		
    		
    		console.log('START_YYYYMM = ', START_YYYYMM);
    		
    		if(START_YYYYMM.length != 6 || START_YYYYMM == ""){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',   "납부시작월은 년/월 6자리입니다. 예) 200901");    				
        		},50);
    			me.lookupReference('rec024w_02_b').getView().select(i);
    			return false;
    		}else{
    			record.set("START_YYYYMM",START_YYYYMM );
    			
    		}
    		
    		if(BASE_AMT <= 0){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',   "월납입예정금액은 필수입니다.");    				
        		},50);
    			me.lookupReference('rec024w_02_b').getView().select(i);
    			return false;
    		}
    		
    		if(PAYMENT_AMT % BASE_AMT != 0){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',   "납부금액은 월납부금액인 "+BASE_AMT+"원 단위로 만 가능합니다.");    				
        		},50);
    			me.lookupReference('rec024w_02_b').getView().select(i);
    			return false;
    		}
    		
    	}// for
    	
    	
    	var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	
    	console.log(ds_acceptRecAmtData.CASH_TYPE  , me.lookupReference('rdo_ApprovalGbn_r24_02').getValue().rdo_ApprovalGbn_r24_02);
    	
    	ds_acceptRecAmtData.CASH_TYPE    = me.lookupReference('rdo_ApprovalGbn_r24_02').getValue().rdo_ApprovalGbn_r24_02;
    	
    	
    	
    	console.log('rdo_ApprovalGbn = ', me.lookupReference('rdo_ApprovalGbn_r24_02').getValue());
    	
    	
    	if(ds_acceptRecAmtData.APPROVAL_GBN != 3){
    		ds_acceptRecAmtData.APPROVAL_GBN = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r24_02').getValue().rdo_ApprovalGbn_r24_02, 1);
    	}
    		
    	console.log('ds_acceptRecAmtData = ', ds_acceptRecAmtData);
    	
    	var smsInfo = me.getView().down('[xtype=rec000w_03]').getController().inSmsInfo();
    	if(smsInfo.SMS_YN){
    		me.inSendMessage( smsInfo );
    		ds_acceptRecAmtData.SMS_YN = 'T';
    	}
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_r24_02').getValue().rdo_ApprovalGbn_r24_02;
    	if(rdo_ApprovalGbn == 2){ 
			
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_PrayRec').getCount(); i++){
				var record = me.getViewModel().getStore('ds_PrayRec').getAt(i).data;
				
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
    	
    	
    	me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    	me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
    	
    	exCommon.addParamSetting(me , 'ds_PrayRec'      , 'ds_PrayRec');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' , 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          , 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   , 'ds_pgCardInfo');
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, '/rec/REC024W_02/save.suvila', me.onSaveCallback , false);
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
		
		

		exCommon.addParamSetting(me, 'ds_PrayRec'      ,'ds_PrayRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC024W_02/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
    onSaveCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_PrayRec').removeAll();
    		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    		me.getViewModel().getStore('ds_sms').removeAll();
    		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
    		
    		me.getViewModel().getStore('ds_PrayRec').commitChanges();
    		me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
    		me.getViewModel().getStore('ds_sms').commitChanges();
    		me.getViewModel().getStore('ds_pgCardInfo').commitChanges();
    		
    		me.inFirstAmtCalc();
        	me.inPaymentAmtCalc();
        	me.inMisuAmtCalc();
    		
    		//me.getView().down('[id=rec000w_02]').getController().onSearchRec();
        	me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
    	}
    	exCommon.fnGridSaveCallback(me, success, action,'ds_PrayRec');
    },
    onEdit : function( ){
    	var me = this;
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    inSendMessage : function( smsInfo){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	var mobileTelno   = smsInfo.MOBILE_TELNO1 + smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
    	var recAmtInfo    = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	
    	var rCnt = me.getViewModel().getStore('ds_PrayRec').getCount();
    	for(var i = 0; i < rCnt ; i++){
    		var record =  me.getViewModel().getStore('ds_PrayRec').getAt(i);
    		var smsNum = i;
    		
    		var fMessage  = "["+exCommon.user.templeNm+"("+(smsNum+1)+") ";
    		    fMessage +=  record.get("PRAY_NM") +" " + exCommon.setNumberFormat(record.get("BASE_AMT")) + "] "; 
    		    		    		
    		var bMessage = "동참(예약)되었습니다. 성불하세요";
    		
    		if( record.get("PAYMENT_AMT") > 0  ){
    			bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+"원 보시하셨습니다. 성불하세요.";
    		}
    		
    		var data = {
    			 TR_ID        : "17"
    			,TR_SENDSTAT  : "0"
    			,TR_PHONE     : mobileTelno
    			,TR_DEST_INFO : recAmtInfo.PROPOSAL_BUD_NM+"^"+mobileTelno 
    			,TR_SMS_YN    : "T"
    			,TR_CALLBACK  : exCommon.user.tel  // telno
    			,TR_ETC1      : exCommon.user.templeCd
    			,TR_ETC2      : recAmtInfo.PROPOSAL_BUD_NO
    			,TR_ETC3      : "SMSREC"
    			,TR_ETC4      : "17"
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
    		me_totPaymentPlanAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_PrayRec').sum('PAYMENT_PLAN_AMT') );
    	}catch (e) {}
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt' , me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
    	var me_totPaymentAmt  = 0;
    	try{
    		me_totPaymentAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_PrayRec').sum('PAYMENT_AMT') );
    	}catch (e) {}
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt' , me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
    	var me_misuAmt  = 0;
    	try{
    		me_misuAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_PrayRec').sum('MISU_AMT') );
    	}catch (e) {}
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt' , me_misuAmt);
    },
    inDisalbedCms : function(){
    	return true;    	
    },
    callSetRecType : function(){
		return 13;
	}
})
