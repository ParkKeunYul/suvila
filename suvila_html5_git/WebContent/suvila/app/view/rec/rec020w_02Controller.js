Ext.define('ExFrm.view.rec.rec020w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec020w_02',
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
          	me.callStore(me, 'ds_TSKindDetail', '', null ,me.dsTkKindCallback);
        },50);
    	
    	if(success){
    		var CARD_USE = exCommon.getRepVal( me.getViewModel().getStore('ds_pgCardUseYn').getAt(0).get("CARD_USE"));
    		if(CARD_USE != "T"){
    			me.lookupReference('rdo_ApprovalGbn_r20_02_2').setReadOnly(true);
    		}
    	}
    },
    dsTkKindCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_TSKindInfo', '', null ,me.dsKindInfoCallback);
        },50);
    },
    dsKindInfoCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_sexGbn', '', null ,me.dsSexGbnCallback);
        },50);
    },
    dsSexGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_religion', '', null ,me.dsReligionCallback);
        },50);
    },
    dsReligionCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_nation', '', null ,me.dsNationCallback);
        },50);
    },
    dsNationCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_joinPath', '', null ,me.dsJoinPathCallback);
        },50);
    },
    dsJoinPathCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_telno1', '', null ,me.dsTelCallback);
        },50);
    },
    dsTelCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_mobile_telno1', '', null ,me.dsMobileCallback);
        },50);
    },
    dsMobileCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_job', '', null ,me.dsJobCallback);
        },50);
    },
    dsJobCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_email', '', null ,me.dsEmailCallback);
        },50);
    },
    dsEmailCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_joinPath', '', null ,null);
        },50);
    },
    onTabChange:function(tappanel, panel){},
    onCallback002:function(params){
    	var me = this;
    	me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
    },
    onEventChange : function(){
    	var me = this;
    	
    	var lc_TSKindInfo = me.lookupReference('lc_TSKindInfo').getValue();
    	
    	var params = {
    		V_TEMPLE_STAY_CD : lc_TSKindInfo
    	};
    	
    	setTimeout(function(){
          	me.callStore(me, 'ds_TSKindDetail', '', params , null);
        },50);
    },
    onFindAddr : function(){
    	var params = {};
        this.openPopup('ExFrm.view.com.post',  params, this.onFindAddrReceive);
    },
    onFindAddrReceive : function(params, me){
    	me.lookupReference('em_zip_cd').setExValue(params.ZIPCODE);
    	me.lookupReference('txt_rec_addr1').setExValue(params.ADDR1);
    	me.lookupReference('txt_rec_addr3').setExValue(params.ADDR3);
    	me.lookupReference('txt_rec_bldg_num').setExValue(params.BLDG_NUM);
    	me.lookupReference('txt_rec_addr2').focus();
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec020w_02_c', 'ds_TSRec' , false , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onDelAll : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec020w_02_c', 'ds_TSRec' , true , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onShift : function(){
    	var me = this;
    	
    	var SORT  = 1;
    	
    	var e_row   = me.getViewModel().getStore('ds_TSKindDetail').getCount();
    	var f_row   = me.getViewModel().getStore('ds_familySelInfo').getCount();
    	var rec_row = me.getViewModel().getStore('ds_TSRec').getCount();
    	
    	
    	for(var i = 0; i < e_row ; i++){
    		var e_record = me.getViewModel().getStore('ds_TSKindDetail').getAt(i);
    		var e_SEL_YN = e_record.get("SEL_YN");
    		
    		if(e_SEL_YN){
    			for(var j = 0; j < f_row ; j++){
    				var f_record = me.getViewModel().getStore('ds_familySelInfo').getAt(j);
    	    		var f_SEL_YN = f_record.get("SEL_YN");
    	    		
    	    		if(f_SEL_YN){
    	    			var data = {
    	    				 SORT             : SORT
    	    				,TEMPLE_CD        : exCommon.user.templeCd
    	    				,TEMPLE_STAY_CD   : e_record.get("TEMPLE_STAY_CD")
    	    				,TEMPLE_STAY_NM   : e_record.get("TEMPLE_STAY_NM")
    	    				,NAME_KOR         : f_record.get("NAME_KOR")
    	    				,BUD_NO           : f_record.get("BUD_NO")
    	    				,FDATE            : e_record.get("FDATE")
    	    				,RDATE            : e_record.get("RDATE")
    	    				,PAYMENT_PLAN_AMT : e_record.get("AMT")
    	    				,PAYMENT_AMT      : e_record.get("AMT")
    	    				,MISU_AMT         : 0
    	    				,SEX_GBN          : f_record.get("SEX_GBN")
    	    				,RELIGION_CD      : f_record.get("RELIGION_CD")
    	    				,NATION_CD        : f_record.get("NATION_CD")
    	    				,JOB_CD           : f_record.get("JOB_CD")
    	    				,BIRTHDAY         : f_record.get("BIRTHDAY")
    	    				,TELNO1           : f_record.get("TELNO1")
    	    				,TELNO2           : f_record.get("TELNO2")
    	    				,TELNO3           : f_record.get("TELNO3")
    	    				,MOBILE_TELNO1    : f_record.get("MOBILE_TELNO1")
    	    				,MOBILE_TELNO2    : f_record.get("MOBILE_TELNO2")
    	    				,MOBILE_TELNO3    : f_record.get("MOBILE_TELNO3")
    	    				,EMAIL1           : f_record.get("EMAIL1")
    	    				,EMAIL2           : f_record.get("EMAIL2")
    	    				,EMAIL_TRANS      : f_record.get("EMAIL_TRANS")
    	    				,ZIP_CD           : f_record.get("ZIP_CD")
    	    				,ADDR1            : f_record.get("ADDR1")
    	    				,ADDR2            : f_record.get("ADDR2")
    	    				,ADDR3            : f_record.get("ADDR3")
    	    				,BLDG_NUM         : f_record.get("BLDG_NUM")
    	    				,DUPLE_CHEKC_VAL  : e_record.get("TEMPLE_STAY_CD")+""+f_record.get("BUD_NO")
    	    			}
    	    			
    	    			var dupleRecord = me.getViewModel().getStore('ds_TSRec').findRecord('DUPLE_CHEKC_VAL',e_record.get("TEMPLE_STAY_CD")+""+f_record.get("BUD_NO") , 0, false, true, true); 
    	    			if(dupleRecord == null || dupleRecord == undefined){
    	    				me.getViewModel().getStore('ds_TSRec').add(data);
        	    			SORT++;
    	    			}
    	    		}// if e_SEL_YN
    			}// for j
    		}// if f_SEL_YN
    	}// for i
    	if(SORT != 1){
    		me.lookupReference('rec020w_02_c').getView().select(rec_row);
    	}
    	
    	me.getViewModel().getStore('ds_TSKindDetail').rejectChanges();
		me.getViewModel().getStore('ds_familySelInfo').rejectChanges();
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onSave : function(){
    	var me = this;
    	
    	var rdo_ApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r20_02').getValue().rdo_ApprovalGbn_r20_02,1);
    	
    	var rowCnt = exCommon.ChangeCount('ds_TSRec' , me);
    	
    	if(rowCnt == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림',   "접수할 신청건이 없습니다.");    				
    		},50);
    		return false;
    	}
    	
    	
    	if( !me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation() ) return false;
    	
    	
    	
    	var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	ds_acceptRecAmtData.CASH_TYPE  = rdo_ApprovalGbn;
    	
    	
    	if(ds_acceptRecAmtData.APPROVAL_GBN != 3){
    		ds_acceptRecAmtData.APPROVAL_GBN = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r20_02').getValue().rdo_ApprovalGbn_r20_02, 1);
    	}
    		
    	
    	/*카드결제일때*/
    	
    	var smsInfo = me.getView().down('[xtype=rec000w_03]').getController().inSmsInfo();
    	if(smsInfo.SMS_YN){
    		me.inSendMessage( smsInfo );
    		ds_acceptRecAmtData.SMS_YN = 'T';
    	}
    	
    	me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    	me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
    	
    	
    	if(rdo_ApprovalGbn == 2){ // 카드결제일때
			console.log('카드결제창');
			//cardPay
			
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_TSRec').getCount(); i++){
				var record = me.getViewModel().getStore('ds_TSRec').getAt(i).data;
				
				record.PgCardPopupGbn = '1';
				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
				record.ACCEPT_GBNTXT  = record.TEMPLE_STAY_NM;
				
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
    	
    	
    	exCommon.addParamSetting(me , 'ds_TSRec'        , 'ds_TSRec');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' , 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          , 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   , 'ds_pgCardInfo');
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, '/rec/REC020W_02/save.suvila', me.onSaveCallback , false);
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
		
		

		exCommon.addParamSetting(me, 'ds_TSRec'        ,'ds_TSRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC020W_02/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
    onSaveCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_TSRec').removeAll();
    		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    		me.getViewModel().getStore('ds_sms').removeAll();
    		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
    		
    		
    		me.getViewModel().getStore('ds_TSRec').commitChanges();
    		me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
    		me.getViewModel().getStore('ds_sms').commitChanges();
    		me.getViewModel().getStore('ds_pgCardInfo').commitChanges();
    		
    		me.inFirstAmtCalc();
        	me.inPaymentAmtCalc();
        	me.inMisuAmtCalc();
    		
        	me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
        	
        	
        	me.getViewModel().getStore('ds_TSKindDetail').rejectChanges();
    		me.getViewModel().getStore('ds_familySelInfo').rejectChanges();
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return;
    		
    		var params = {
    			 V_BUD_NO : record[0].get("BUD_NO")
    		};
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    onEdit : function(editor, context, eOpts) {
    	var me = this;
    	
    	
    	var record = me.getViewModel().getStore('ds_TSRec').getAt(context.rowIdx);
    	var PAYMENT_PLAN_AMT = exCommon.getRepNum(record.get("PAYMENT_PLAN_AMT"));
		var PAYMENT_AMT      = exCommon.getRepNum(record.get("PAYMENT_AMT"));

		
		record.set("PAYMENT_PLAN_AMT", parseInt(PAYMENT_PLAN_AMT));
		record.set("PAYMENT_AMT", parseInt(PAYMENT_AMT));
		record.set("MISU_AMT", parseInt(PAYMENT_PLAN_AMT) - parseInt(PAYMENT_AMT));
    	
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    
    callFamilyInfo : function(family , spirit){
    	
    	var me = this;
    	
    	
    	me.getViewModel().getStore('ds_familySelInfo').removeAll();
    	
    	var txt_budNo = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo().txt_budNo;
    	
    	for(var i = 0; i<family.length; i++ ){
    		me.getViewModel().getStore('ds_familySelInfo').add( family[i] );
    	};//
    	
 
    	
    	console.log('getTxtBudNo = ', me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo());
    },
    inSendMessage : function( smsInfo){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	var mobileTelno   = smsInfo.MOBILE_TELNO1 + smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
    	var recAmtInfo    = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	
    	var rCnt = me.getViewModel().getStore('ds_TSRec').getCount();
    	for(var i = 0; i < rCnt ; i++){
    		var record =  me.getViewModel().getStore('ds_TSRec').getAt(i);
    		var smsNum = i;
    		
    		var fMessage  = "["+exCommon.user.templeNm+"("+(smsNum+1)+") ";
    		    fMessage +=  record.get("TEMPLE_STAY_NM") +" "+ record.get("TEMPLE_STAY_NM")
    		    fMessage += " " + exCommon.setNumberFormat(record.get("PAYMENT_PLAN_AMT")) + "] "; 
    		    		    		
    		var bMessage = "동참(예약)되었습니다. 성불하세요";
    		
    		if( record.get("PAYMENT_AMT") > 0  ){
    			bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+"원 보시하셨습니다. 성불하세요.";
    		}
    		
    		var data = {
    			 TR_ID        : "3"
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
    		me.getViewModel().getStore('ds_sms').add(data);
    	}// for
    	
    },
    inFirstAmtCalc : function(){
    	var me = this;
    	var me_totPaymentPlanAmt  = 0;
    	try{
    		me_totPaymentPlanAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_TSRec').sum('PAYMENT_PLAN_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt' , me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
    	var me_totPaymentAmt  = 0;
    	try{
    		me_totPaymentAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_TSRec').sum('PAYMENT_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt' , me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
    	var me_misuAmt  = 0;
    	try{
    		me_misuAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_TSRec').sum('MISU_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt' , me_misuAmt);
    },
    inDisalbedCms : function(){
    	return false;    	
    },
    callSetRecType : function(){
		return 11;
	}
})
