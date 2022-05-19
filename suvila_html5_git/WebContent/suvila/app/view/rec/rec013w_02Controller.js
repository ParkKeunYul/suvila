Ext.define('ExFrm.view.rec.rec013w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec013w_02',
    onSearch:function(params){
        var me = this;
       // console.log('rec013w_02 alias');
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
          	me.callStore(me, 'ds_manageMgt', '', null ,null);
        },50);
    	
    	if(success){
    		var CARD_USE = exCommon.getRepVal( me.getViewModel().getStore('ds_pgCardUseYn').getAt(0).get("CARD_USE"));
    		if(CARD_USE != "T"){
    			me.lookupReference('rdo_ApprovalGbn2').setReadOnly(true);
    		}
    	}
    },
    onTabChange:function(tappanel, panel){},
    onCallback002:function(params){
    	var me = this;
    	me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
    },
    callRecHis : function(list){
    	var me = this;
    	console.log('recHis =', list.length);
    	me.getViewModel().getStore('ds_recHisInfo2').removeAll();
    	for(var i = 0; i<list.length; i++ ){
    		var data ={
    			 SEL_YN       : false
    			,ACCEPT_DATE  : list[i].ACCEPT_DATE
    			,PROD_NAME    : list[i].PROD_NAME
    			,ACCEPT_SEQ   : list[i].ACCEPT_SEQ
    			,SEQ          : list[i].SEQ
    		}
    		me.getViewModel().getStore('ds_recHisInfo2').add( data );
    	}// for
    },
    callFamilyInfo : function(){
    },
    manageCheckchange : function(column, recordIndex, checked){
    	var me = this;
    	var row  = me.getViewModel().getStore('ds_manageMgt').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_manageMgt').getAt(i);
    		if(recordIndex != i){
    			record.set("SEL_YN", false);
    		}
    	}// for
    	
    },
    recCheckchange : function(column, recordIndex, checked){
    	var me = this;
    	var row  = me.getViewModel().getStore('ds_recHisInfo2').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_recHisInfo2').getAt(i);
    		if(recordIndex != i){
    			record.set("SEL_YN", false);
    		}
    	}// for
    	
    },
    onShift : function(){
    	var me  = this; 
    	
    	
    	if( !me.getView().down('[xtype=rec000w_02]').getController().inDaejuInfoCheck() ) return false;
    	var recAmtDefault = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	var nowMonth      = exCommon.getNowDate();
    	
    	var cnt  = me.getViewModel().getStore('ds_manageMgt').getCount();
    	for(var i = 0 ; i < cnt ; i++){
    		var record   = me.getViewModel().getStore('ds_manageMgt').getAt(i);
    		var SEL_YN   = record.get("SEL_YN");
    		if(SEL_YN){
    			
    			for(var j =0 ; j < me.getViewModel().getStore('ds_recHisInfo2').getCount() ; j++){
    				var subRecord   = me.getViewModel().getStore('ds_recHisInfo2').getAt(j);
    				var SUB_SEL_YN  = subRecord.get("SEL_YN");
    				
    				if(SUB_SEL_YN){
    					var tempCnt = me.getViewModel().getStore('ds_ManageRec').getCount()+1;
    	    			var data = {
    	    				 TEMPLE_CD            : exCommon.user.templeCd
    	    				,ACCEPT_SEQ           : ""
    	    				,SEQ                  : tempCnt
    	    				,ACCEPT_GBN           : "15"
    	    				,MANAGE_CODE          : record.get("MANAGE_CODE")
    	    				,MANAGE_NM            : record.get("MANAGE_NM")
    	    				,NAME_KOR             : me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo().BUD_NM
    	    				,BASE_AMT             : 0
    	    				,PAYMENT_AMT          : 0
    	    				,DEL_YN               : "F"
    	    				,MANAGE_END_YN        : "F"
    	    				,MANAGE_PERIOD        : 1
    	    				,FIRST_PAYMENT_YYYYMM : nowMonth.substr(0,4)+""+nowMonth.substr(4,2)
    	    				,RECEIPT_AMT          : 0
    	    				,REMARK               : ''
    	    				,PAYMENT_PLAN_AMT     : 0
    	    				,MISU_AMT             : 0
    	    				,REL_ACCEPT_SEQ       : subRecord.get("ACCEPT_SEQ")
    	    				,REL_SEQ              : subRecord.get("SEQ")
    	    				,MISU_AMT        	  : 0
    	    				,PERIOD_TYPE          : '1'
    	    			}
    	    			me.getViewModel().getStore('ds_ManageRec').add(data);
    	    			subRecord.set("SEL_YN", false);
    				}
    				
    			}// for j
    			record.set("SEL_YN", false);
    		}
    	}// for
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec013w_02_c', 'ds_ManageRec' , false , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onDelAll : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec013w_02_c', 'ds_ManageRec' , true , true);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
    onSave : function(){
    	var me = this;
    	
    	var rowCnt = exCommon.ChangeCount('ds_ManageRec' , me);
    	
    	if(rowCnt == 0){
    		return false;
    	}
    	
    	var rdo_ApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r13_02').getValue().rdo_ApprovalGbn_r13_02, 1);
    	
    	
    	if( !me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation() ) return false;
    	
    	var row = me.getViewModel().getStore('ds_ManageRec').getCount();
    	var flag = true;
    	for(var i = 0; i < row ; i++ ){
    		var record       = me.getViewModel().getStore('ds_ManageRec').getAt(i);
    		
    		var FIRST_PAYMENT_YYYYMM = exCommon.getRepVal( record.get("FIRST_PAYMENT_YYYYMM") )+"";
    			try{
    				FIRST_PAYMENT_YYYYMM = exCommon.getGridDateFormat(FIRST_PAYMENT_YYYYMM, "", 6);
    				FIRST_PAYMENT_YYYYMM = FIRST_PAYMENT_YYYYMM.replace(/-/gi, "");
    				FIRST_PAYMENT_YYYYMM = FIRST_PAYMENT_YYYYMM.replace(/\//gi, "");    	
    				FIRST_PAYMENT_YYYYMM = FIRST_PAYMENT_YYYYMM.substr(0,6);
    				
    			}catch (e) {
					console.log('START_YYYYMM e', e);
				}
    		
    			
    		var BASE_AMT     = exCommon.getRepNum( record.get("BASE_AMT") );
    		var PAYMENT_AMT  = exCommon.getRepNum( record.get("PAYMENT_AMT") );
    		
    		if(FIRST_PAYMENT_YYYYMM.length != 6 || FIRST_PAYMENT_YYYYMM == ""){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',   "입금시작월은 년/월 6자리입니다. 예) 200901");    				
        		},50);
    			me.lookupReference('rec013w_02_c').getView().select(i);
    			return false;
    		}
    		
    		if(BASE_AMT <= 0){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',   "납부예정금액은 필수입니다.");    				
        		},50);
    			me.lookupReference('rec013w_02_b').getView().select(i);
    			return false;
    		}
    		
    		if(PAYMENT_AMT % BASE_AMT != 0){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',   "납부금액은 월납부금액인 "+BASE_AMT+"원 단위로 만 가능합니다.");    				
        		},50);
    			me.lookupReference('rec013w_02_b').getView().select(i);
    			return false;
    		}
    		
    	}// for
    	
    	
    	var ds_acceptRecAmtData        = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	ds_acceptRecAmtData.CASH_TYPE  = rdo_ApprovalGbn;
    	
    	
    	
    	if(ds_acceptRecAmtData.APPROVAL_GBN != 3){
    		ds_acceptRecAmtData.APPROVAL_GBN = rdo_ApprovalGbn;
    	}
    		
    	console.log('ds_acceptRecAmtData = ', ds_acceptRecAmtData);
    		
    	
    	var smsInfo = me.getView().down('[xtype=rec000w_03]').getController().inSmsInfo();
    	if(smsInfo.SMS_YN){
    		me.inSendMessage( smsInfo );
    		ds_acceptRecAmtData.SMS_YN = 'T';
    	}
    	
    	if(rdo_ApprovalGbn == 2){ 
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_ManageRec').getCount(); i++){
				var record = me.getViewModel().getStore('ds_ManageRec').getAt(i).data;
				
				record.PgCardPopupGbn = '1';
				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
				record.ACCEPT_GBNTXT  = record.MANAGE_NM;
				
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
    	
    	
    	
    	me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    	me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
    	
    	exCommon.addParamSetting(me , 'ds_ManageRec'    , 'ds_ManageRec');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' , 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          , 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   , 'ds_pgCardInfo');
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, '/rec/REC013W_02/save.suvila', me.onSaveCallback , false);
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
		

		exCommon.addParamSetting(me , 'ds_ManageRec'    , 'ds_ManageRec');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' , 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          , 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   , 'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC013W_02/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
    onSaveCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_ManageRec').removeAll();
    		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    		me.getViewModel().getStore('ds_sms').removeAll();
    		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
    		
    		me.getViewModel().getStore('ds_ManageRec').commitChanges();
    		me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
    		me.getViewModel().getStore('ds_sms').commitChanges();
    		me.getViewModel().getStore('ds_pgCardInfo').commitChanges();
    		
    		me.inFirstAmtCalc();
        	me.inPaymentAmtCalc();
        	me.inMisuAmtCalc();
    		
    		//me.getView().down('[id=rec000w_02]').getController().onSearchRec();
        	me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
    	}
    	exCommon.fnGridSaveCallback(me, success, action,'ds_ManageRec');
    },
    /*onRadioChange : function(field, newValue, oldValue, options){
    	var me = this;
    	
    	//var rdo_ApprovalGbn = me.lookupReference('exRadioGroup').getValue().rdo_ApprovalGbn ;
    	var val = newValue.rdo_ApprovalGbn;
    	
    },*/
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
    	
    	var rCnt = me.getViewModel().getStore('ds_ManageRec').getCount();
    	for(var i = 0; i < rCnt ; i++){
    		var record =  me.getViewModel().getStore('ds_ManageRec').getAt(i);
    		var smsNum = i;
    		
    		var fMessage  = "["+exCommon.user.templeNm+"("+(smsNum+1)+") ";
    		    fMessage +=  record.get("MANAGE_NM") +" " + exCommon.setNumberFormat(record.get("BASE_AMT")) + "] "; 
    		    		    		
    		var bMessage = "동참(예약)되었습니다. 성불하세요";
    		
    		if( record.get("PAYMENT_AMT") > 0  ){
    			bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+"원 보시하셨습니다. 성불하세요.";
    		}
    		
    		var data = {
    			 TR_ID        : "15"
    			,TR_SENDSTAT  : "0"
    			,TR_PHONE     : mobileTelno
    			,TR_DEST_INFO : recAmtInfo.PROPOSAL_BUD_NM+"^"+mobileTelno 
    			,TR_SMS_YN    : "T"
    			,TR_CALLBACK  : exCommon.user.tel  // telno
    			,TR_ETC1      : exCommon.user.templeCd
    			,TR_ETC2      : recAmtInfo.PROPOSAL_BUD_NO
    			,TR_ETC3      : "SMSREC"
    			,TR_ETC4      : "19"
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
    		
    		for(var i = 0; i < me.getViewModel().getStore('ds_ManageRec').getCount() ; i++){
    			var record = me.getViewModel().getStore('ds_ManageRec').getAt(i);
    			
    			var MANAGE_PERIOD = exCommon.getRepNum( record.get('MANAGE_PERIOD') )
        		var BASE_AMT      = exCommon.getRepNum( record.get('BASE_AMT') )
    			
        		me_totPaymentPlanAmt += parseInt(MANAGE_PERIOD) * parseInt(BASE_AMT);
    			console.log('me_totPaymentPlanAmt = ', me_totPaymentPlanAmt);
    		}// for
    		
    	}catch (e) {}
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt' , me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
    	var me_totPaymentAmt  = 0;
    	try{
    		
    		for(var i = 0; i < me.getViewModel().getStore('ds_ManageRec').getCount() ; i++){
    			var record = me.getViewModel().getStore('ds_ManageRec').getAt(i);
    			
    			me_totPaymentAmt += parseInt(exCommon.getRepNum( record.get('PAYMENT_AMT')) );
    			console.log('inPaymentAmtCalc = ', me_totPaymentAmt);
    		}// for
    		
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt' , me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
    	var me_misuAmt  = 0;
    	try{
    		for(var i = 0; i < me.getViewModel().getStore('ds_ManageRec').getCount() ; i++){
    			var record = me.getViewModel().getStore('ds_ManageRec').getAt(i);
    			
    			var MANAGE_PERIOD = exCommon.getRepNum( record.get('MANAGE_PERIOD') )
        		var BASE_AMT      = exCommon.getRepNum( record.get('BASE_AMT') )
        		var PAYMENT_AMT   = exCommon.getRepNum( record.get('PAYMENT_AMT') )
        		
        		record.set("PAYMENT_PLAN_AMT", parseInt(MANAGE_PERIOD) * parseInt(BASE_AMT));
        		record.set("MISU_AMT"        , (parseInt(MANAGE_PERIOD) * parseInt(BASE_AMT)) - PAYMENT_AMT);
        		
        		me_misuAmt += (parseInt(MANAGE_PERIOD) * parseInt(BASE_AMT)) - PAYMENT_AMT;
    		}// for
    		
    		
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt' , me_misuAmt);
    },
    inDisalbedCms : function(){
    	return false;    	
    },
    callSetRecType : function(){
		return 15;
	}
})
