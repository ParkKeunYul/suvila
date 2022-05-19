Ext.define('ExFrm.view.rec.rec003w_32Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec003w_32',
    onSearch:function(params){
        var me = this;
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	setTimeout(function(){
          	me.callStore(me, 'ds_bokwigibu', '', null ,me.dsBokwigibuCallback);
        },50);
    },
    dsBokwigibuCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_lunarSolar', '', null ,me.dsLunarSolar);
        },50);
    },
    dsLunarSolar : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_monk', '', null ,me.dsmonkCallback);
        },50);
    },
    dsmonkCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_leapmonth', '', null ,me.dsleapCallback);
        },50);
    },
    dsleapCallback : function(me, success, form, action){
    	var data = {
       		 LUNAR_SOLAR      : "F"
       		,LEAP_MONTH       : "F"
       		,DAMDANG_MONK_ID  : ""
       		,MOBILE_TELNO     : ""
       		,PAYMENT_PLAN_AMT : 0
       		,PAYMENT_AMT      : 0
       		,MISU_AMT         : 0
       		,NUMBER_COUNT     : 0
       	}    	
       	me.getViewModel().getStore('ds_giJae').add(data);
    },
    onAfterRender:function(){
    	var me = this;
    	
    	
    },
    bokwiCheckChange : function (comp, rowIndex, checked, eOpts ){
    	var me = this;
    	
    	var cnt = me.getViewModel().getStore('ds_giJaeBokwi').getCount();
    	
    	for(var i = 0; i < cnt ; i++){
    		
    		if(rowIndex != i){
    			me.getViewModel().getStore('ds_giJaeBokwi').getAt(i).set("REP_YN", false);
    		}else{
    			me.getViewModel().getStore('ds_giJaeBokwi').getAt(i).set("REP_YN", true);
    		}
    		
    	}// for
    },
    spritCheckChange : function (comp, rowIndex, checked, eOpts ){
    	var me = this;
    	
    	var DEATH_DAY = exCommon.getRepVal(eOpts.data.DEATH_DAY, "");
    	
    	
    	var cnt = me.getViewModel().getStore('ds_spiritSelInfo').getCount();
    	/*
    	for(var i = 0; i < cnt ; i++){
    		var data = me.getViewModel().getStore('ds_spiritSelInfo').getAt(i);
    		
    		if(i != rowIndex && data.get("SEL_YN")  && DEATH_DAY  != data.get("DEATH_DAY") ){
    			
    			me.getViewModel().getStore('ds_spiritSelInfo').getAt(rowIndex).set("SEL_YN", false);
    			
    			exCommon.msgAlert('기일이 다른 영가자를 선택할 수 없습니다.');    			
    			return false;
    		}// if
    	}// for
    	*/
    },
    onShift : function(){
    	var me = this;
    	console.log('onShift = ');
    	/* 영가 선택 */
    	var sel_row = me.getViewModel().getStore('ds_spiritSelInfo').getCount();
    	
    	var flag = 0;
    	
    	for(var i = 0; i < sel_row ; i++){
    		
    		var record = me.getViewModel().getStore('ds_spiritSelInfo').getAt(i);
    		
    		if(record.get("SEL_YN")){
    		
    			var findRecord = me.getViewModel().getStore('ds_giJaeSpirit').findRecord('DECE_BUD_NO', record.get("BUD_NO"), 0, false, true, true);
    			
    			if(findRecord != null){
    				me.inRestSelInfo(me);
    				exCommon.msgAlert('동일한 영가자를 선택할수 없습니다.');
    				return false;
    			}
    			
    			var deathDay = exCommon.getRepVal(record.get("DEATH_DAY"), "");
    			if( deathDay.indexOf('0000')  == 0){
    				deathDay = deathDay.replace('0000','1919');
    			}
    			
    			var leftRow = me.getViewModel().getStore('ds_giJaeSpirit').getCount();
    			console.log('leftRow = ', leftRow);
    			if( leftRow > 0){
    				
    				var left_deathDay = exCommon.getRepVal(me.getViewModel().getStore('ds_giJaeSpirit').getAt(0).get("DEATH_DAY"), ""); 
    				if(deathDay != left_deathDay){
    					exCommon.msgAlert('기일이 다른 영가자를 추가할 수 없습니다.');
    					return false;
    				}
    				
    			}// 
    			
    			var LUNAR_SOLAR = exCommon.getRepVal(record.get("LUNAR_SOLAR"), 'F');
    			
    			
    			var data = {
    				 SORT_SEQ        : leftRow + 1
    				,TEMPLE_CD       : exCommon.user.templeCd
    				,HYO_REL         : record.get("HYO_REL")
    				,DECE_REL        : record.get("DECE_REL")
    				,DECE_BUD_NO     : record.get("BUD_NO")
    				,DECE_NAME_KOR   : record.get("NAME_KOR")
    				,DEATH_DAY       : deathDay
    				,LUNAR_SOLAR     : LUNAR_SOLAR
    			};
    			me.getViewModel().getStore('ds_giJaeSpirit').add(data);
    			
    			
    			flag ++;
    			
    			if(me.getViewModel().getStore('ds_giJaeSpirit').getCount() == 1){
    				me.getViewModel().getStore('ds_giJaeBokwi').getAt(0).set("HYO_REL" , record.get("HYO_REL"));
    			}// if
    		}// if
    	}// for i
    	me.inRestSelInfo(me);
    	
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    	
    	if(flag > 0){
    		var death_day = "";
    		
    		var params = {
    			 lunar_solar : me.getViewModel().getStore('ds_giJaeSpirit').getAt(0).get("LUNAR_SOLAR")
    			,death_day   : me.getViewModel().getStore('ds_giJaeSpirit').getAt(0).get("DEATH_DAY")
    		}
    		    		
    	}// if flag
    	
    },
    onEdit : function(editor, context, eOpts) {
    	var me = this;
    	
    	// context.colIdx
    	if(context.field == 'EVENT_TIME'){
    		var EVENT_TIME = exCommon.getRepVal(me.getViewModel().getStore('ds_saguJaeKind').getAt(context.rowIdx).get("EVENT_TIME"),"");
    		console.log('EVENT_TIME = ', EVENT_TIME);
    		if(EVENT_TIME.length == 1){
    			EVENT_TIME ="0"+ EVENT_TIME + ":00"; 
    		}else if(EVENT_TIME.length == 2){
    			EVENT_TIME = EVENT_TIME + ":00";
    		}else if(EVENT_TIME.length == 3){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2) +"0";
    		}else if(EVENT_TIME.length == 4){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2);
    		}else if(EVENT_TIME.length > 4){
    			console.log(EVENT_TIME.substr(2,4));
    			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2,2);
    		}
    		me.getViewModel().getStore('ds_saguJaeKind').getAt(context.rowIdx).set("EVENT_TIME",EVENT_TIME);
    	}    
    	else if(context.field == 'NUMBER_COUNT'){
    		
    		var NUMBER_COUNT = exCommon.getRepVal(me.getViewModel().getStore('ds_saguJaeKind').getAt(context.rowIdx).get("NUMBER_COUNT"),"");
    		console.log('onEdit NUMBER_COUNT= ', NUMBER_COUNT);
    		if( isNaN(NUMBER_COUNT) ){
    			me.getViewModel().getStore('ds_saguJaeKind').getAt(context.rowIdx).set("NUMBER_COUNT",0);
    		}
    	}
    },
    onMonKChange : function (opts , nowValue , oldValue){
    	
    	var me = this;
    	var index = me.getViewModel().getStore('ds_monk').find("USER_ID",nowValue, 0, false, true, true);
    	var record= me.getViewModel().getStore('ds_monk').getAt(index);
    	
    	try{
    		me.lookupReference('txt_MonkTelNo1').setExValue(exCommon.getRepVal(record.get("TELNO1"),""));
        	me.lookupReference('txt_MonkTelNo2').setExValue(exCommon.getRepVal(record.get("TELNO2"),""));
        	me.lookupReference('txt_MonkTelNo3').setExValue(exCommon.getRepVal(record.get("TELNO3"),""));
        	me.lookupReference('txt_MonkMTelNo1').setExValue(exCommon.getRepVal(record.get("MOBILE_TELNO1"),""));
        	me.lookupReference('txt_MonkMTelNo2').setExValue(exCommon.getRepVal(record.get("MOBILE_TELNO2"),""));
        	me.lookupReference('txt_MonkMTelNo3').setExValue(exCommon.getRepVal(record.get("MOBILE_TELNO3"),""));
    	}catch (e) {
    		me.lookupReference('txt_MonkTelNo1').setExValue("");
        	me.lookupReference('txt_MonkTelNo2').setExValue("");
        	me.lookupReference('txt_MonkTelNo3').setExValue("");
        	me.lookupReference('txt_MonkMTelNo1').setExValue("");
        	me.lookupReference('txt_MonkMTelNo2').setExValue("");
        	me.lookupReference('txt_MonkMTelNo3').setExValue("");
		}
    	
    },
    inRestSelInfo : function(me){
    	var row = me.getViewModel().getStore('ds_spiritSelInfo').getCount();
    	for(var i = 0; i < row ; i++){
    		me.getViewModel().getStore('ds_spiritSelInfo').getAt(i).set("SEL_YN", false);
    	}
    },
    onDelAll : function(){
    	var me = this;
    	
    	
    	me.getViewModel().getStore('ds_giJaeSpirit').removeAll();
    	me.getViewModel().getStore('ds_giJae').removeAll();
    	
    	
    	var data = {
      		 LUNAR_SOLAR      : "F"
      		,LEAP_MONTH       : "F"
      		,DAMDANG_MONK_ID  : ""
      		,MOBILE_TELNO     : ""
      		,PAYMENT_PLAN_AMT : 0
      		,PAYMENT_AMT      : 0
      		,MISU_AMT         : 0
      		,NUMBER_COUNT     : 0
      	}    	
      	me.getViewModel().getStore('ds_giJae').add(data);
    	me.inMisuCal(me);
    	
    	
    	
    }, 
    onSave : function(){
    	var me = this;
    	
    	
    	var txt_budNo = exCommon.getRepVal( me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo().txt_budNo ,"");
    	if( txt_budNo  == "" ){
    		exCommon.msgAlert('신도를 검색하시기 바랍니다.');
    		return;
    	}
    	
    	var cnt49 = exCommon.ChangeCount('ds_giJaeSpirit' , me);
    	if( cnt49  == 0 ){
    		exCommon.msgAlert('선택된 영가가 없습니다.');
    		return;
    	}
    	
    	if(me.fnValidate(me)){
    		
    		if( !me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation() ) return false;
    		
    		var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    		
    		console.log('ds_acceptRecAmtData =', ds_acceptRecAmtData);
    		
    		ds_acceptRecAmtData.CASH_TYPE = me.lookupReference('rdo_ApprovalGbn_r03_32').getValue().rdo_ApprovalGbn_r03_32;
    		if (ds_acceptRecAmtData.APPROVAL_GBN != 3) {
    			ds_acceptRecAmtData.APPROVAL_GBN = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r03_32').getValue().rdo_ApprovalGbn_r03_32,1);
    		}
    		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    		me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
    		
    		/* 카드결제일때  개발해야함*/
    		
    		var smsInfo = me.getView().down('[xtype=rec000w_03]').getController().inSmsInfo();
    		
    		if (smsInfo.SMS_YN == "T") {
    			if( exCommon.getRepVal(smsInfo.MOBILE_TELNO1  ,"") == "" || 
    				exCommon.getRepVal(smsInfo.MOBILE_TELNO2  ,"") == "" ||  
    				exCommon.getRepVal(smsInfo.MOBILE_TELNO3  ,"") == ""    ){
    				
    				exCommon.msgAlert('발송전화번호를 입력하시기 바랍니다.');
    				return false;
    			}
    			me.inSendMessage(smsInfo);
    			ds_acceptRecAmtData.SMS_YN = 'T';
    		}
    		
    		var jsonBokData = [];
    		var b_row       = me.getViewModel().getStore('ds_giJaeBokwi').getCount();
        	for(var i = 0; i < b_row ; i++){
        		var record = me.getViewModel().getStore('ds_giJaeBokwi').getAt(i).data;
        		jsonBokData.push(record);        		        		
        	}// for
        	me.lookupReference('ds_giJaeBokwi').setExValue(Ext.encode(jsonBokData));
        	
    		
    		var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_r03_32').getValue().rdo_ApprovalGbn_r03_32;
    		ds_acceptRecAmtData.CASH_TYPE    = rdo_ApprovalGbn;
    		if(rdo_ApprovalGbn == 2){
    			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
    			
    			
    			var array = new Array();
    			for(var i = 0; i< me.getViewModel().getStore('ds_giJae').getCount(); i++){
    				var record = me.getViewModel().getStore('ds_giJae').getAt(i).data;
    				
    				record.PgCardPopupGbn = '1';
    				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
    				record.ACCEPT_GBNTXT  = '기제';
    				
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
    		
    		exCommon.addParamSetting(me, 'ds_giJae'         ,'ds_giJae');
    		exCommon.addParamSetting(me, 'ds_giJaeSpirit'   ,'ds_giJaeSpirit');
    		exCommon.addParamSetting(me, 'ds_acceptRecAmt'  ,'ds_acceptRecAmt');
    		exCommon.addParamSetting(me, 'ds_sms'           ,'ds_sms');
    		exCommon.addParamSetting(me, 'ds_pgCardInfo'    ,'ds_pgCardInfo');
    		
        	        	
    		
        	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?',function(btn) {
    			if (btn == 'yes') {
    				me.callForm(me,'/rec/REC003W_32/save.suvila',me.onSaveCallback, false);
    			}
    		});
        	
    	}// fnValidate
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
		

		exCommon.addParamSetting(me, 'ds_giJae'         ,'ds_giJae');
		exCommon.addParamSetting(me, 'ds_giJaeSpirit'   ,'ds_giJaeSpirit');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt'  ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'           ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'    ,'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC003W_32/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
    onSaveCallback : function(me, success, form, action) {
    	exCommon.fnGridSaveCallback(me, success, action,'ds_giJaeSpirit');
    	
    	if (success) {
			me.getViewModel().getStore('ds_giJaeSpirit').removeAll();
			me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
			me.getViewModel().getStore('ds_sms').removeAll();
			me.getViewModel().getStore('ds_pgCardInfo').removeAll();
			
			
			me.getViewModel().getStore('ds_giJaeSpirit').commitChanges();
			me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
			me.getViewModel().getStore('ds_sms').commitChanges();
			me.getViewModel().getStore('ds_pgCardInfo').commitChanges();
			
			
	    	
	    	for(var i = 0; i<me.getViewModel().getStore('ds_giJaeBokwi').getCount() ; i++){
	    		me.getViewModel().getStore('ds_giJaeBokwi').getAt(i).set("HYO_REL", "");
	    	}
	    	
			
			me.onDelAll();
			me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
    	}
    	
    },
    inApproval : function(me){
    	
		
		
    },
    fnValidate  : function(me){
    	

    	var check = true;
    	
    	var row_kd = me.getViewModel().getStore('ds_giJaeSpirit').getCount();
    	for(var i = 0; i < row_kd ; i++){
    		var record = me.getViewModel().getStore('ds_giJaeSpirit').getAt(i);
    		
    		if( !exCommon.gridFormVal(me , i , 'ds_giJaeSpirit' , 'rec003w_32_b' , "DECE_REL"    , '망관계' ) ){
    			check = false;
				return false;
			}
    	}// row_kd
    	
    	var row_bk = me.getViewModel().getStore('ds_giJaeBokwi').getCount();
    	
    	for(var i = 0; i < row_bk ; i++){
    		var record = me.getViewModel().getStore('ds_giJaeBokwi').getAt(i);
    		
    		if( !exCommon.gridFormVal(me , i , 'ds_giJaeBokwi' , 'rec003w_32_c' , "BOKWEJA_NM"    , '복위자명' ) ){
    			check = false;
				return false;
			}
    		
    		if( !exCommon.gridFormVal(me , i , 'ds_giJaeBokwi' , 'rec003w_32_c' , "BOKWI_KIBU_GBN"    , '복위/기부' ) ){
    			check = false;
				return false;
			}
    		
    		if( exCommon.getRepVal(record.get("REP_YN"),"")){
    			if( !exCommon.gridFormVal(me , i , 'ds_giJaeBokwi' , 'rec003w_32_c' , "HYO_REL"    , '행관계' ) ){
        			check = false;
    				return false;
    			}
    		}
    	}// row_bk
    	
    	
		if(!exCommon.gridFormVal(me , 0 , 'ds_giJae' , 'rec003w_32_d' , "EVENT_DATE"    , '제사일' ) ){
			return false;
		}
		
		if(!gf_validateDateDS(me , 0 , 'ds_giJae' , 'rec003w_32_d' , "EVENT_DATE"    , '제사일')){
			return false;
		}
		
		if( !exCommon.gridFormVal(me , 0 , 'ds_giJae' , 'rec003w_32_d' , "EVENT_TIME"    , '제사시간' ) ){
			return false;
		}
		
		
		if(!TimeConfirm( me.getViewModel().getStore("ds_giJae").getAt(0).get("EVENT_TIME")) ){
			
			setTimeout(function(){
				Ext.Msg.alert('알림',  "유효하지 않은 제사시간 입니다.");    				
			},50);
			
			return false;
		}
			
    	
    	return true;
    },
    onBeforeEdit : function(editor, context, eOpts){
    	var me = this;
    	
    	if(context.field == 'DAMDANG_MONK_ID'){
    		var DAMDANG_MONK_ID = exCommon.getRepVal(me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).get("DAMDANG_MONK_ID"),"");
    		console.log('DAMDANG_MONK_ID222 = ', DAMDANG_MONK_ID);
    	}
    },
    onEdit : function(editor, context, eOpts) {
    	var me = this;
    	
    	
    	if(context.field == 'EVENT_TIME'){
    		var EVENT_TIME = exCommon.getRepVal(me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).get("EVENT_TIME"),"");
    		if(EVENT_TIME.length == 1){
    			EVENT_TIME ="0"+ EVENT_TIME + ":00"; 
    		}else if(EVENT_TIME.length == 2){
    			EVENT_TIME = EVENT_TIME + ":00";
    		}else if(EVENT_TIME.length == 3){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2) +"0";
    		}else if(EVENT_TIME.length == 4){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2);
    		}else if(EVENT_TIME.length > 4){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2,2);
    		}
    		me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("EVENT_TIME",EVENT_TIME);
    	}
    	else if(context.field == 'DAMDANG_MONK_ID'){
    		
    		var DAMDANG_MONK_ID = exCommon.getRepVal(me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).get("DAMDANG_MONK_ID"),"");
    		console.log('DAMDANG_MONK_ID = ', DAMDANG_MONK_ID);
    		
    		if(DAMDANG_MONK_ID != ""){
    			var idx = me.getViewModel().getStore('ds_monk').findExact('USER_ID',DAMDANG_MONK_ID);
    			console.log('idx = ', idx);
    			
    			var record = me.getViewModel().getStore('ds_monk').getAt(idx);    	
    			console.log('record = ', record.get("TELNO"));
    			console.log('record = ', record.get("MOBILE_TELNO"));
    			
    			me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("TELNO",record.get("TELNO"));
    			me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("MOBILE_TELNO",record.get("MOBILE_TELNO"));
    			
    		}else{
    			me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("TELNO","");
    			me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("MOBILE_TELNO","");
    		}    		
    	}
    	else if(context.field == 'PAYMENT_PLAN_AMT'){
    		var PAYMENT_PLAN_AMT = exCommon.getRepVal(me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).get("PAYMENT_PLAN_AMT"),"");
    		if( isNaN(PAYMENT_PLAN_AMT) ){
    			me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("PAYMENT_PLAN_AMT",0);
    		}
    		me.inMisuCal(me);
    	}
    	else if(context.field == 'PAYMENT_AMT'){
    		var PAYMENT_AMT = exCommon.getRepVal(me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).get("PAYMENT_AMT"),"");
    		if( isNaN(PAYMENT_AMT) ){
    			me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("PAYMENT_AMT",0);
    		}
    		me.inMisuCal(me);
    	}
    	return;    	
    },
    inMisuCal : function(me){
    	var PAYMENT_PLAN_AMT =  me.getViewModel().getStore('ds_giJae').getAt(0).get("PAYMENT_PLAN_AMT");
    	var PAYMENT_AMT      =  me.getViewModel().getStore('ds_giJae').getAt(0).get("PAYMENT_AMT");
    	
    
    	me.getViewModel().getStore('ds_giJae').getAt(0).set("MISU_AMT", PAYMENT_PLAN_AMT - PAYMENT_AMT);
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    },
   /* onAmoutBlur : function(m, e, eOpts ){
    	var me = this;
    	
    	var PAYMENT_PLAN_AMT = exCommon.getRepNum(me.lookupReference('me_saguPaymentPlanAmt').getExValue());
    	var PAYMENT_AMT      = exCommon.getRepNum(me.lookupReference('me_saguPaymentAmt').getExValue());
    	
    	
    	me.lookupReference('me_saguPaymentPlanAmt').setExValue(PAYMENT_PLAN_AMT);
    	me.lookupReference('me_saguPaymentAmt').setExValue(PAYMENT_AMT);
    	me.lookupReference('me_saguMisuAmt').setExValue(PAYMENT_PLAN_AMT-PAYMENT_AMT);		
    	
    	
    	me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();
    	
    },*/
    callFamilyInfo : function(family , spirit){
    	
    	var me = this;
    	
    	console.log('callFamilyInfo', family);
    	
    	
    	me.getViewModel().getStore('ds_spiritSelInfo').removeAll();
    	me.getViewModel().getStore('ds_giJaeBokwi').removeAll();
    	me.getViewModel().getStore('ds_giJaeSpirit').removeAll();
    	
    	var record = {
    		 "BUD_NO"   : "-9999"
    		,"NAME_KOR"	: "선택안함"
    	}
    	
    	for(var i = 0; i<spirit.length; i++ ){
    		spirit[i].SEL_YN = false;
    		me.getViewModel().getStore('ds_spiritSelInfo').add( spirit[i] );
    	}// for
    	
    	
    	var txt_budNo = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo().txt_budNo;
    	
    	for(var i = 0; i<family.length; i++ ){
    		var REP_YN = "";
    		
    		if( txt_budNo  ==  family[i].BUD_NO){
    			var data = {
	    			 DECE_REL       : ""
	    			,HYO_REL        : ""
	    			,BOKWI_KIBU_GBN : "T"
	    			,BOKWEJA_NM     : family[i].NAME_KOR
	    			,BUD_NO         : family[i].BUD_NO
	    			,REP_YN         : true
	    		};
	    		me.getViewModel().getStore('ds_giJaeBokwi').add( data );
    		}
    	};//
    	
    	for(var i = 0; i<family.length; i++ ){
    		var REP_YN = "";
    		
    		if( txt_budNo  !=  family[i].BUD_NO){
    			var data = {
	    			 DECE_REL       : ""
	    			,HYO_REL        : ""
	    			,BOKWI_KIBU_GBN : "T"
	    			,BOKWEJA_NM     : family[i].NAME_KOR
	    			,BUD_NO         : family[i].BUD_NO
	    			,REP_YN         : false
	    		};
	    		me.getViewModel().getStore('ds_giJaeBokwi').add( data );
    		}
    	};//
    	
    	
    	
    	console.log('getTxtBudNo = ', me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo());
    	
    	
    	me.lookupReference('rec003w_21_a').getView().select( 0 );
    	me.lookupReference('rec003w_21_c').getView().select( 0 );
    	
    	
    	console.log('exCommon.user.death_type = ', exCommon.user.death_type);
    	
		/*if(exCommon.user.death_type == "2"){
			
			var rtnParam  = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo();
	    	var t_budno   = rtnParam.txt_budNo;
	    	
	    	if(rtnParam.cb_setBunga){
				t_budno = t_budno.substring(0,8);
			}else{
				t_budno = t_budno.substring(0,10);
			}
	    	
	    	var params = {
	    		V_BUD_CODE : t_budno
	    	};
			
			setTimeout(function(){
	    		me.callStore(me, 'ds_bokwi', '', params , me.dsBokwiCallback);
	    	},50);
		}*/
    	
    	/*
    	me.lookupReference('me_saguPaymentPlanAmt').setExValue(0);
    	me.lookupReference('me_saguPaymentAmt').setExValue(0);
    	me.lookupReference('me_saguMisuAmt').setExValue(0);
    	*/
    	
    },
    inSendMessage : function(smsInfo) {
		var me = this;

		me.getViewModel().getStore('ds_sms').removeAll();

		var mobileTelno = smsInfo.MOBILE_TELNO1+ smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
		var recAmtInfo = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();

		
		var PAYMENT_PLAN_AMT =  me.getViewModel().getStore('ds_giJae').getAt(0).get("PAYMENT_PLAN_AMT");
    	var PAYMENT_AMT      =  me.getViewModel().getStore('ds_giJae').getAt(0).get("PAYMENT_AMT");
		

		var fMessage  = "[" + exCommon.user.templeNm +" 기제";
		var bMessage  = "] 동참(예약)되었습니다. 성불하세요";

		if (PAYMENT_PLAN_AMT > 0) {
			bMessage = exCommon.setNumberFormat(PAYMENT_PLAN_AMT)+"] "+ exCommon.setNumberFormat(PAYMENT_AMT)+ " 원 보시하셨습니다. 성불하세요.";
		}
		
		console.log('bMessage = ', bMessage);

		var data = {
			TR_ID         : "7",
			TR_SENDSTAT   : "0",
			TR_PHONE      : mobileTelno,
			TR_DEST_INFO  : recAmtInfo.PROPOSAL_BUD_NM + "^"+ mobileTelno,
			TR_SMS_YN     : "T",
			TR_CALLBACK   : exCommon.user.tel,
			TR_ETC1       : exCommon.user.templeCd,
			TR_ETC2       : recAmtInfo.PROPOSAL_BUD_NO,
			TR_ETC3       : "SMSREC",
			TR_ETC4       : "7",
			TR_ETC5       : exCommon.user.userId,
			TR_MESSAGE    : fMessage + " " + bMessage
		}
		console.log(data);
		me.getViewModel().getStore('ds_sms').add(data);

	},
    onCallback002:function(params){
    	var me = this;
    	
    	me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
    },
    inFirstAmtCalc : function(){
    	var me = this;
    	var me_totPaymentPlanAmt  = 0;
    	try{
    		me_totPaymentPlanAmt =  me.getViewModel().getStore('ds_giJae').getAt(0).get("PAYMENT_PLAN_AMT");
    	}catch (e) {}
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt' , me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
    	var me_totPaymentAmt  = 0;
    	try{
    		me_totPaymentAmt = me.getViewModel().getStore('ds_giJae').getAt(0).get("PAYMENT_AMT");
    	}catch (e) {}
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt' , me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
    	var me_misuAmt  = 0;
    	try{
    		me_misuAmt = me.getViewModel().getStore('ds_giJae').getAt(0).get("MISU_AMT");
    	}catch (e) {}
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt' , me_misuAmt);
    },
    inDisalbedCms : function(){
    	return false;    	
    },
    callSetRecType : function(){
		return 6;
	}
})
