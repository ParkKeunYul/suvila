Ext.define('ExFrm.view.rec.rec000p_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_06',
    onCalled:function(params){
        var me = this;
        
        console.log('onCalled = ',params );
        
        var V_BUD_NO = params.V_BUD_NO;
        var V_BUNGA  = params.V_BUNGA;
        
        
        me.lookupReference('MOBILE_TELNO1').setExValue(params.MOBILE_TELNO1);
        me.lookupReference('MOBILE_TELNO2').setExValue(params.MOBILE_TELNO2);
        me.lookupReference('MOBILE_TELNO3').setExValue(params.MOBILE_TELNO3);
        me.lookupReference('BUYER_NAME').setExValue(params.BUYER_NAME);
        me.lookupReference('PROPOSAL_BUD_NO').setExValue(params.PROPOSAL_BUD_NO);
        
        var params = {
       	 V_SEARCH_BUD : V_BUD_NO.substring(0,10)
       	,V_BUNGA  	  : V_BUNGA
       };
       
       me.lookupReference('v_bunga').setExValue(V_BUNGA);
       me.lookupReference('v_bud_no').setExValue(V_BUD_NO.substring(0,10));
        
        setTimeout(function(){
    		me.callStore(me, 'ds_approvalGbn', '', params , me.dsAppCallback);
    	},50);
        
    },
    dsAppCallback : function(me, success, form, action){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_all_rec_base_amount', '', action._params , me.dsAllBaseCallback);
    	},50);
    },
    dsAllBaseCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', action._params ,me.dsMainCallback);
    	},50);
    },
    dsMainCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec000p_06_a').getView().select(0);
    		me.inSetinitMonth();
    	}
    },
    onInit:function(){},
    onAfterRender:function(){},
    onSelect : function(){
    	var me = this;
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	try{
    		if(record.length <=  0) return false;
    		
    		var LIMIT_YN = record[0].get("LIMIT_YN");
    		
    		
    		if(LIMIT_YN == 'F'){
    			me.lookupReference('tr_sunab3_a').getColumns()[3].show();
    			me.lookupReference('tr_sunab3_a').getColumns()[7].hide();
    			
    			me.lookupReference('tr_sunab3_b').setHidden(false);
        		me.lookupReference('limitBtn').setHidden(false);
        		
        		me.lookupReference('tr_sunab3_c').setHidden(true);
        		me.lookupReference('unLimitBtnArea').setHidden(true);
        		
    		}else{
    			me.lookupReference('tr_sunab3_a').getColumns()[3].hide();
    			me.lookupReference('tr_sunab3_a').getColumns()[7].show();
    			
        		me.lookupReference('tr_sunab3_b').setHidden(true);
        		me.lookupReference('limitBtn').setHidden(true);
        		
        		me.lookupReference('tr_sunab3_c').setHidden(false);
        		me.lookupReference('unLimitBtnArea').setHidden(false);
    		}
    		
    		
    		var params = {
    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
    			,V_SEQ        : record[0].get("SEQ")
    			,V_LIMIT_YN   : LIMIT_YN
    			,V_ACCEPT_GBN : '2'
    			,V_JUNGAK_CD  : record[0].get("JUNGAK_CD")
    			,V_LIGHT_NO   : record[0].get("LIGHT_NO")
    			,V_PROD_CODE  : record[0].get("INDEUNG_GBN")
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_lightOut', '', params ,me.dsLightOutCallback);
        	},50);
    		
    		
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    dsLightOutCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_misuRec', '', action._params ,me.dsMisuCallback);
    	},50);
    },
    dsMisuCallback : function(me, success, form, action){
    	
    	var LIMIT_YN = action._params.V_LIMIT_YN;
    	
    	if(LIMIT_YN == 'F'){
    		setTimeout(function(){
        		me.callStore(me, 'ds_payMonth', '', action._params ,me.dsPayMonthCallback);
        	},50);
    	}else{
    		setTimeout(function(){
        		me.callStore(me, 'ds_payMonthBase', '', action._params ,me.dsPayMonthBaseCallback);
        	},50);
    	}
    	
    },
    dsPayMonthCallback : function(me, success, form, action){
    	setTimeout(function(){
			me.callStore(me, 'ds_rec_base_amount', '', action._params ,null);    				
		},50);
    },
    dsPayMonthBaseCallback : function(me, success, form, action){
    	
    },
    inSetinitMonth  : function(){
    	var me  = this;
    	var month     = parseInt( me.lookupReference('me_month').getExValue() );
    	if(month <= 0){
    		return false;
    	}
    	
    	var row   = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var SUNAB_YN    = record.get("SUNAB_YN");
    		var LIMIT_YN    = record.get("LIMIT_YN");
    		var START_MONTH = record.get("START_MONTH");
    		var LAST_MONTH  = record.get("LAST_MONTH");
    		var BASE_AMT  	= parseInt(record.get("BASE_AMT"));
    		var INDEUNG_GBN = record.get("INDEUNG_GBN");
    	    		    		
    		if(SUNAB_YN == 'T' && LIMIT_YN == 'T'){
    			record.set("SUNAP_MONTH", month);
    			record.set("PAYMENT_AMT", BASE_AMT * month);
    		}else if(SUNAB_YN == 'T' && LIMIT_YN == 'F'){
    			
    			// 무한등일경우 금액관리 설정된 금액이 있는지 체크
    			var mFLAG = true;
				var LAST_MONTH = LAST_MONTH;
				if(LAST_MONTH == "000000"){
					mFLAG = false;
					LAST_MONTH = START_MONTH
				}
				
				var SUNAP_MONTH = LAST_MONTH;
				var idx_amount  = BASE_AMT;
				if(month  == 1){
					idx_amount = me.inGetSunapMonthAmout( parseInt(SUNAP_MONTH) ,INDEUNG_GBN ,BASE_AMT );
					//getSunapMonthAmout
				}else{
					//console.log(i , ' = inGetSunapMultiMonthAmount');
					idx_amount = me.inGetSunapMultiMonthAmount( parseInt(SUNAP_MONTH) ,INDEUNG_GBN ,BASE_AMT , parseInt(month) );
					//getSunapMultiMonthAmount
				}
				record.set("SUNAP_MONTH", month);
				record.set("PAYMENT_AMT", idx_amount+'');
    		}
    		
    	}// for
    	
    	me.inViewSumAmount(me);
    },
    inGetSunapMultiMonthAmount : function( yyyymm , light_code  , base_amount , sunap_month ){
    	var me = this;
    	
    	var MULTI_AMOUNT = 0;
    	var START_YYYYMM = "";
    	var END_YYYYMM   = "";
    	var roop_yyyymm  = "";
    	
    	for(j = 1 ; j<= sunap_month ; j++){ // 개월수 만큼 roop
    		
    		var amount       = 0;
    		var sunap_yyyymm = yyyymm;
    		var roop         = 1;
    		var check        = 0;
    		
    		if(j > 1){			
    			
    			var sunap_yyyy = new Number( roop_yyyymm.substr(0,4) );
    			var sunap_mm   = new Number( roop_yyyymm.substr(4,2) );
    			
    			if(sunap_mm == 12){
    				sunap_yyyymm = (sunap_yyyy+1) + "01"
    				check= 1;
    			}else if(sunap_mm >= 9){
    				sunap_yyyymm = (sunap_yyyy+1) + ""+ (sunap_mm+1);
    				check= 2;
    			}else{
    				sunap_yyyymm = sunap_yyyy +"0"+ (sunap_mm+1);
    				check= 3;
    			}
    		}
    		
    		roop_yyyymm = sunap_yyyymm+"";  
    		
    		sunap_yyyymm = new Number(sunap_yyyymm);
    		
    		
    		var row = me.getViewModel().getStore('ds_all_rec_base_amount').getCount();
    		for(var k = 0 ; k < row ; k++){
    			var record   = me.getViewModel().getStore('ds_all_rec_base_amount').getAt(k);
    			START_YYYYMM = new Number( record.get("START_YYYYMM") );
        		END_YYYYMM 	 = new Number( record.get("END_YYYYMM") );
        		
        		if( record.get("LIGHT_CODE") == light_code ){
        			
        			if(sunap_yyyymm >= START_YYYYMM && sunap_yyyymm <= END_YYYYMM ){
    					amount = new Number( record.get("AMOUNT") );
    					break;
    				}	// if
        			
        		}// if LIGHT_CODE
        		
    		}// for k
    		
    		if(amount == 0) amount = base_amount;
    		// 누적시키자 
    		MULTI_AMOUNT =  MULTI_AMOUNT +  amount;
    	}// for i
    	return MULTI_AMOUNT;
    },
    inGetSunapMonthAmout : function(yyyymm , light_code  , base_amount){
    	var me = this;
    	
    	var amount       = 0;
    	var START_YYYYMM = "";
    	var END_YYYYMM   = "";
    	
    	var row = me.getViewModel().getStore('ds_all_rec_base_amount').getCount();
    	
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_all_rec_base_amount').getAt(i);
    		
    		if(light_code == record.get("LIGHT_CODE")){
    			START_YYYYMM = new Number( record.get("START_YYYYMM") );
        		END_YYYYMM 	 = new Number( record.get("END_YYYYMM") );
        		
        		if(yyyymm >= START_YYYYMM && yyyymm <= END_YYYYMM ){
        			amount = new Number( record.get("AMOUNT") );
        			break;
        		}//
    		}
    	}// for
    	
		if(amount == 0) {
			amount = base_amount;
		}else{
		}
		
    	return amount;
    },
    inViewSumAmount : function(me){
    	
    	var month     = parseInt( me.lookupReference('me_month').getExValue() );
    	var row       = me.getViewModel().getStore('ds_main').getCount();
    	var totAmount = 0; 
    	for(var i = 0; i < row ; i++){
    		var record      = me.getViewModel().getStore('ds_main').getAt(i)
    		var SUNAB_YN    = record.get("SUNAB_YN");
    		
    		if(SUNAB_YN == 'T'){
    			totAmount =  totAmount + parseInt( me.getViewModel().getStore('ds_main').getAt(i).get("PAYMENT_AMT") );
    		}
    		    		
    	}// for
    	
    	/*console.log('inViewSumAmount = ', row);
    	console.log('inViewSumAmount = ', month);
    	console.log('inViewSumAmount = ', totAmount);*/
    	me.lookupReference('me_totPaymentAmt').setExValue( totAmount );
    },
    onTopCancel : function (){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_main').each(function(record){
    	      record.reject();
    	});
    	//me.inViewSumAmount(me);
    },
    onTopSave : function(){
    	var me = this;
    	
    	var cnt = exCommon.ChangeCount('ds_main', me);
    	
    	if( cnt  == 0 ){
    		exCommon.msgAlert('변경된 자료가 없습니다.');
    		return false;
    	}
    	
    	var me_month = me.lookupReference('me_month').getExValue();
    	var row  = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var LIMIT_YN = record.get("LIMIT_YN");
    		var LIGHT_NM = record.get("LIGHT_NM");
    		var SUNAB_YN = record.get("SUNAB_YN");
    		
    		
    		if(LIMIT_YN == 'T' && SUNAB_YN == 'T'){ // 유한
    			var amounts        = parseInt(record.get("AMOUNTS"));
				var amount         = parseInt(record.get("PAYMENT_AMT"));
				var amt            = (amounts+amount);
				var paymentplanAmt = parseInt(record.get("PAYMENT_PLAN_AMT"));
				
				if(paymentplanAmt < amt){
					var remainCnt = (paymentplanAmt - amounts) / parseInt(record.get("BASE_AMT"));
					me.lookupReference('rec000p_06_a').getView().select(i);
					
					var msg = LIGHT_NM+" "+me_month+"개월분은 총납입금이<br/>접수금액보다 많아서 수납하실수 없습니다. <br/><font style='color: red;'>최대 "+remainCnt+"개월분 수납가능</font>"
					exCommon.msgAlert(msg);
					return false;
				}
    		}
    	}// for i
    	
    	var rdo_ApprovalGbn = me.lookupReference('Trdo_ApprovalGbn').getValue().Trdo_ApprovalGbn;
    	console.log('rdo_ApprovalGbn = ', rdo_ApprovalGbn);
    	
    	
    	me.getViewModel().getStore('ds_pgCardInfo').removeAll();
    	me.inSetSMS(me);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	if(rdo_ApprovalGbn == '2'){// 카드
    		
    		var array     = new Array();
    		var records   = me.getViewModel().getStore('ds_main').getUpdatedRecords();
    		
        	for(var i = 0; i < records.length; i++){
        		records[i].set("TEMP_APPROVAL_GBN",'2');
        		
        		array[i]                 = records[i].data;
        		array[i].ACCEPT_GBNTXT   = records[i].data.LIGHT_NM + ' - ' + records[i].data.DONGCHAM_NM;
        		array[i].ACCEPT_DATE     = today;
        		array[i].PgCardPopupGbn  = '2';
        		array[i].PAYMENT_AMT     = parseInt(records[i].data.PAYMENT_AMT); 
        		array[i].MOBILE_TELNO1   = me.lookupReference('MOBILE_TELNO1').getExValue();
        		array[i].MOBILE_TELNO2   = me.lookupReference('MOBILE_TELNO2').getExValue();
        		array[i].MOBILE_TELNO3   = me.lookupReference('MOBILE_TELNO3').getExValue();
				array[i].BUYER_NAME      = me.lookupReference('BUYER_NAME').getExValue();
				array[i].CARD_BUD_NO     = me.lookupReference('PROPOSAL_BUD_NO').getExValue();
				
        	}// for
        	
        	console.log(array);
        	setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.cardPay',  array, me.onTopSaveCard);
	       	},100);
			return;
    	}
    	
    	
    	var rc = '1';
		if(rdo_ApprovalGbn == '4') rc = '4'
			
		var row       = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		if(record.crudState == 'U'){
    			record.set("TEMP_APPROVAL_GBN",rc);
    		}
    	}// for
    	
    	exCommon.uptParamSetting(me, 'ds_main'        ,'ds_main');
    	exCommon.addParamSetting(me, 'ds_sms'         ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'  ,'ds_pgCardInfo');
    	
		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?',function(btn) {
			if (btn == 'yes') {
				me.callForm(me,'/rec/REC000P_06/saveSunab.suvila',me.onTopSaveCallback, false);
			}
		});
		
		//on_Approval
    },
    onTopSaveCard  : function(cardPayInfo, me){
    	me.getViewModel().getStore('ds_pgCardInfo').removeAll();
		me.getViewModel().getStore('ds_pgCardInfo').add(cardPayInfo);
		
		
		var row       = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		if(record.crudState == 'U'){
    			record.set("TEMP_APPROVAL_GBN",2);
    		}
    	}// for
    	
    	exCommon.uptParamSetting(me, 'ds_main'        ,'ds_main');
    	exCommon.addParamSetting(me, 'ds_sms'         ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'  ,'ds_pgCardInfo');
    	
		setTimeout(function(){
			me.callForm(me,'/rec/REC000P_06/saveSunab.suvila',me.onTopSaveCallback, false);
		},50);
		
		
    },
    onTopSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_main');
    	if(success){
    		
    		me.lookupReference('me_month').setExValue(1);
    		
    		var params = {
    			V_SEARCH_BUD  : me.lookupReference('v_bud_no').getExValue()
    			,V_BUNGA      : me.lookupReference('v_bunga').getExValue()
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_main', '', params ,me.dsMainCallback);
        	},50);
    		
    	}
    },
    onLightOut : function(){
    	var me = this;
    	
    	var record = me.getViewModel().getStore('ds_lightOut').getAt(0);
    	
    	//console.log('selection = ', selection);
    	var CLOSE_YN  = record.get("CLOSE_YN");
    	
    	if(CLOSE_YN != 'F'){
    		exCommon.msgAlert('소등된 상태입니다.');
    		return false;
    	}
    	record.set("CLOSE_YN", 'T');
    	
    	exCommon.uptParamSetting(me, 'ds_lightOut'     ,'uptData');
    	
    	Ext.MessageBox.confirm('알림', '소등 하시겠습니까?',function(btn) {
			if (btn == 'yes') {
				me.callForm(me,'/rec/REC000P_02/saveLightOut.suvila',me.onTopSaveCallback, false);
			}
		});
    },
    onLightOutCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('me_month').setExValue(1);
    		
    		var params = {
    			V_SEARCH_BUD  : me.lookupReference('v_bud_no').getExValue()
    			,V_BUNGA      : me.lookupReference('v_bunga').getExValue()
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_main', '', params ,me.dsMainCallback);
        	},50);
    	}
    },
    on_cancel : function(){
    	var me = this;
    	
    	var record    = me.lookupReference('tr_sunab3_a').getView().getSelectionModel().getSelection()[0];
    	var mainRecord = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
    	
    	if(me.getViewModel().getStore('ds_misuRec').getNewRecords().length == 0  ||  exCommon.getRepVal(record.get("SQL_MODE")) != "I" ){
    		return false;
    	}
    	
    	Ext.MessageBox.confirm('알림', '자료를 취소하시겠습니까?', function(btn){  
	        if (btn == 'yes') { 
	        	var ACCEPT_GBN = mainRecord.get("ACCEPT_GBN");
	        	var LIMIT_YN   = mainRecord.get("LIMIT_YN");
	        	
	        	if( LIMIT_YN =="F" ){
        			
	        		exCommon.gridRemove(me, 'tr_sunab3_a' , 'ds_misuRec' , false, true);
        			
        			var v_yyyy = exCommon.getRepVal(record.get("PAYMENT_YYYYMM")).substring(0,4);
        			var v_mm   = exCommon.getRepVal(record.get("PAYMENT_YYYYMM")).substring(4);
        			
        			var findRocord = me.getViewModel().getStore('ds_payMonth').findRecord('YEAR', v_yyyy, 0, false, true, true);
        			
        			
        			findRocord.set("amount_"+v_mm     , exCommon.getRepVal( findRocord.getPrevious("amount_"+v_mm ))  );
        			findRocord.set("M_STATUS_"+v_mm   , exCommon.getRepVal( findRocord.getPrevious("M_STATUS_"+v_mm ))  );
	        	}else if(LIMIT_YN =="T"){
	        		exCommon.gridRemove(me, 'tr_sunab3_a' , 'ds_misuRec' , false, true);
        		}// if
	        }// yes
	    });
    },
    onAddYear : function(){
    	var me = this;
    	
    	var cnt = me.getViewModel().getStore('ds_payMonth').getCount();
    	
    	var mainRecord = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
    	
    	if(cnt  == 0){
    		var start_yyyy = me.getViewModel().getStore('ds_misuRec').getAt(0).get("PAYMENT_YYYYMM").substr(0,4);
    		var data ={
				 TEMPLE_CD 	 : mainRecord.get("TEMPLE_CD")
    			,ACCEPT_SEQ  : mainRecord.get("ACCEPT_SEQ")
    			,SEQ 		 : mainRecord.get("SEQ")
    			,ACCEPT_GBN  : mainRecord.get("ACCEPT_GBN")
    			,INDEUNG_GBN : mainRecord.get("INDEUNG_GBN")
    			,YEAR 		 : parseInt(start_yyyy,10)
    		}
    		me.getViewModel().getStore('ds_payMonth').insert(0 , data);
    	}else{
    		
    		var nextYear = "";
    		//console.log('cnt = ', (cnt));
    		for(i=cnt-1; i >= 0; i--){
    			nextYear = me.getViewModel().getStore('ds_payMonth').getAt(i).get("YEAR");
    		}//for
    		nextYear = parseInt( nextYear ) + 1;
    		
    		//console.log('nextYear= '+ nextYear);
    		
    		var data = {
    			 TEMPLE_CD 	 : mainRecord.get("TEMPLE_CD")
    			,ACCEPT_SEQ  : mainRecord.get("ACCEPT_SEQ")
    			,SEQ 		 : mainRecord.get("SEQ")
    			,ACCEPT_GBN  : mainRecord.get("ACCEPT_GBN")
    			,INDEUNG_GBN : mainRecord.get("INDEUNG_GBN")
    			,YEAR 		 : nextYear
    		}
    		me.getViewModel().getStore('ds_payMonth').insert(0 , data);
    	}
    	me.lookupReference('tr_sunab3_b').getView().select(0);
    },
    onCellDbClickSunap3 : function(me2, td, cellIndex, record, tr, rowIndex, e, eOpts ){
    	
	 	if( !(cellIndex >=2 && cellIndex<=13)){
	 		return false;
	 	} 
	 
	 	var me = this;
	 	
	 	
    	var YEAR     = record.get("YEAR");    	
    	var MONTH    = exCommon.addZero(cellIndex -1 );
    	var M_STATUS = record.get("M_STATUS_"+MONTH);
    	

    	if(M_STATUS == 3){
    		me.onCancel();
    	}else{
    		me.onSunab2();
    	}
    },
    onCancel : function(){
    	var me = this;
    	
    	
    	var rowCnt = me.getViewModel().getStore('ds_payMonth').getCount();
    	if(rowCnt  == 0){
    		return false;
    	}
    	
    	
    	var start = me.lookupReference('tr_sunab3_b').getView().getSelectionModel().selected.startCell;
		var end   = me.lookupReference('tr_sunab3_b').getView().getSelectionModel().selected.endCell;
    	
		var sRowIdx = start.rowIdx;
		var eRowIdx = end.rowIdx;
		
		var temp = 0;
		if(sRowIdx > eRowIdx){
			temp    = sRowIdx;
			sRowIdx = eRowIdx;
			eRowIdx = temp;
		}
		
		var sColIdx = start.colIdx -1;
		var eColIdx = end.colIdx   -1;
		if(sColIdx > eColIdx){
			temp    = sColIdx;
			sColIdx = eColIdx;
			eColIdx = temp;
		}
		
		if(sRowIdx != eRowIdx){
			exCommon.msgAlert('취소 처리는 같은 년도만 가능합니다.');
			return false;
		}
		
	 	
		for(var i= eRowIdx; i>=sRowIdx ; i-- ){
			var record = me.getViewModel().getStore('ds_payMonth').getAt(i);
			var YEAR   = record.get("YEAR");
			
			for(var k= sColIdx; k<=eColIdx; k++){
				var varStatus = record.get("M_STATUS_"+exCommon.addZero(k));
				
				if( varStatus == "9"){
					exCommon.msgAlert("CMS 요청 처리중인 데이터는 취소처리 못합니다.");
		 		}else if( varStatus == "3"){
		 			var temp_yyyymm = YEAR+exCommon.addZero(k);
		 			var temp_month  = exCommon.addZero(k);
		 			var temp_amount = me.inGetCancelAmount(temp_yyyymm);
		 			
		 			var tem_AproveGbn = record.get("A_STATUS_"+temp_month);
		 			console.log('tem_AproveGbn = ', tem_AproveGbn);
		 			
		 			
		 			var rdo_ApprovalGbn = me.lookupReference('Brdo_ApprovalGbn').getValue().Brdo_ApprovalGbn;
		 			
		 			if(tem_AproveGbn =="2"){
		 				var strACCEPT_SEQ     = record.get("ACCEPT_SEQ");
		 				var strPAYMENT_YYYYMM = temp_yyyymm;
		 				var arrRtnVal         = '';
		 				
		 				console.log('strPAYMENT_YYYYMM  = ', strPAYMENT_YYYYMM);
		 				
		 				var oSendData = {
		 					 ACCEPT_SEQ     : strACCEPT_SEQ 
		 					,PAYMENT_YYYYMM : strPAYMENT_YYYYMM
		 					,SUB_DATE       : ''
		 					,SEQ            : record.get("SEQ")
		 					,CHECKYYYY      : arrRtnVal
		 					,WINDOW         : ''
		 				}
		 				
		 				this.openPopup('ExFrm.view.com.cardPayCancel',  oSendData, this.onCardCancelReceive);
		 				
	 					return false;
		 			}
		 			
		 			if(tem_AproveGbn == "1" && rdo_ApprovalGbn != "1"){
	 					exCommon.msgAlert("해당 납부월은 현금으로만 취소 가능합니다.");
	 					return false;
		 			}
		 			
		 			if(tem_AproveGbn == "4" && rdo_ApprovalGbn != "4"){
	 					exCommon.msgAlert("해당 납부월은 무통장으로만 취소 가능합니다.");
	 					return false;
		 			}
		 			
		 			var subRowCnt = me.getViewModel().getStore('ds_misuRec').getCount();
		 	    	for(var c = 0; c < subRowCnt ; c++){
		 	    		var SQL_MODE     = exCommon.getRepVal( me.getViewModel().getStore('ds_misuRec').getAt(c).get("SQL_MODE") );
		 	    		var sAmount      = exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(c).get("AMOUNT") );
		 	    		var sApprovalGbn = me.getViewModel().getStore('ds_misuRec').getAt(c).get("APPROVAL_GBN")
		 	    		
		 	    		if( SQL_MODE == "I" && sAmount < 0 && sApprovalGbn != rdo_ApprovalGbn){
		 	    			exCommon.msgAlert("현금,무통장 수납 취소를 동시에 할수 없습니다.<br/>한종류씩 취소가능합니다.");
		 	    			return false;
		 	    		}
		 	    	}// for
		 			
		 	    	if(temp_amount != 0){
		 	    		var rtnAdd = me.inAdd2(temp_yyyymm,temp_amount);
		 	    		
		 	    		console.log("amount_"+temp_month, " == "+rtnAdd )
		 	    		if(rtnAdd == 1){
		 	    			record.set("amount_"+temp_month , temp_amount);
		 	    			record.set("M_STATUS_"+temp_month , "1");
		 	    		}else if(rtnAdd == 2){
		 	    			record.set('amount_'+temp_month,0);
	 	    				record.set("M_STATUS_"+temp_month , "1");
		 	    		}else{
		 	    			record.set("amount_"+temp_month , 0);
	 	    				record.set("M_STATUS_"+temp_month , "3");
		 	    		}
		 	    	}//temp_amount
		 	    	
		 	    	
		 		}else{
		 			exCommon.msgAlert("해당 기간은 취소를 할 수 없습니다.");
		 		}
			}// for k
		}// for i
    },
    inGetCancelAmount : function(temp_yyyymm){
    	var me        = this;
    	var rtnAmount = 0;
    	
    	var rowCnt = me.getViewModel().getStore('ds_misuRec').getCount();
    	
    	for(var i = 0; i< rowCnt ; i++){
    		
    		if( temp_yyyymm == me.getViewModel().getStore('ds_misuRec').getAt(i).get("PAYMENT_YYYYMM") ){
    			rtnAmount += ( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") * -1);
    		}
    		
    	}// for
    	return rtnAmount;
    },
    onSunab2 : function(){
    	var me = this;
    	
    	
    	if( me.getViewModel().getStore('ds_payMonth').getCount() == 0 ) return false;
    	
    	
    	    	
    	
    	var start = me.lookupReference('tr_sunab3_b').getView().getSelectionModel().selected.startCell;
		var end   = me.lookupReference('tr_sunab3_b').getView().getSelectionModel().selected.endCell;
    	
		var sRowIdx = start.rowIdx;
		var eRowIdx = end.rowIdx;
		
		var temp = 0;
		if(sRowIdx > eRowIdx){
			temp    = sRowIdx;
			sRowIdx = eRowIdx;
			eRowIdx = temp;
		}
		
		var sColIdx = start.colIdx -1;
		var eColIdx = end.colIdx   -1;
		if(sColIdx > eColIdx){
			temp    = sColIdx;
			sColIdx = eColIdx;
			eColIdx = temp;
		}
		
		if(sRowIdx != eRowIdx){
			exCommon.msgAlert('수납 처리는 같은 년도만 가능합니다.');
			return false;
		}
		
		
		for(var i= eRowIdx; i>=sRowIdx ; i-- ){
			var record = me.getViewModel().getStore('ds_payMonth').getAt(i);
			var YEAR   = record.get("YEAR");
			
			for(var k= sColIdx; k<=eColIdx; k++){
				var varStatus = record.get("M_STATUS_"+exCommon.addZero(k));
				
				if( varStatus == "9"){
					exCommon.msgAlert("CMS 요청 처리중인 데이터는 입금처리하지 못합니다.");
		 			return;
		 		}else if( varStatus == "3"){
		 			exCommon.msgAlert("이미 납부된 월은 납부 처리 할수 없습니다.");
		 			return;
		 		}else if( varStatus == "0"){
		 			exCommon.msgAlert("해당 기간은 납부 기간이 아닙니다.");
		 			return;
		 		}else {
		 			//var col_month = i-1;
		 			var temp_yyyymm = YEAR+exCommon.addZero(k);
		 			var temp_month  = exCommon.addZero(k);
		 			console.log('temp_yyyymm = ', temp_yyyymm);
		 			var temp_amount = me.inGetAmount( new Number( temp_yyyymm ) );
		 			
		 			var v_AG = me.getViewModel().getStore('ds_payMonth').getAt(0).get("ACCEPT_GBN");
		 			
		 			if( new Number(temp_yyyymm) < new Number(me.getViewModel().getStore('ds_misuRec').getAt(0).get("PAYMENT_YYYYMM")) ){
		 				exCommon.msgAlert("해당 기간은 납부 기간이 아닙니다.");
			 			return;
		 			}
		 			
		 			console.log('temp_amount = ', temp_amount);
		 			
		 			var rtnAdd = me.inAdd2(temp_yyyymm , temp_amount);
		 			
		 			console.log('rtnAdd = ', rtnAdd);
		 			
		 			if(rtnAdd == 1){
		 				record.set('amount_'+temp_month,temp_amount);
		 				record.set("M_STATUS_"+temp_month ,"3");
		 			}else if( rtnAdd == 2 ){
		 				if(temp_amount < 0){
		 					record.set('amount_'+temp_month,temp_amount);
		 				}else{
		 					record.set('amount_'+temp_month,0);
		 				}
		 				record.set("M_STATUS_"+temp_month ,"3");
		 			}else{
		 				record.set('amount_'+temp_month,0);
		 				record.set("M_STATUS_"+temp_month ,"3");
		 			}
		 		}
			}// for k
		}// for i 
    },
    onSave : function(){
    	var me  = this;
    	
    	var isUpdate = exCommon.ChangeCount('ds_misuRec' , me);
    	
    	if(isUpdate == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림',  "변동된 내역이 없습니다.");    				
    		},50);
    		return false;
    	}// isUpdate
    	
    	var rdo_ApprovalGbn = me.lookupReference('Brdo_ApprovalGbn').getValue().Brdo_ApprovalGbn;
    	
    	if(rdo_ApprovalGbn == 1 || rdo_ApprovalGbn == 4){
    		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
    		
    		var misuCnt 		= me.getViewModel().getStore('ds_misuRec').getCount();
    		for(var i = 0; i<misuCnt ; i++){
    			var SQL_MODE 	 = exCommon.getRepVal(me.getViewModel().getStore('ds_misuRec').getAt(i).get("SQL_MODE"));
    			if( SQL_MODE == "I" ){
    				me.getViewModel().getStore('ds_misuRec').getAt(i).set("APPROVAL_GBN", rdo_ApprovalGbn);
    			}
    		}
    		
    		var mainRecord = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
    		console.log('mainRecord =', mainRecord);

    		
			exCommon.addParamSetting(me, 'ds_misuRec'     ,'ds_misuRec');
    		exCommon.addParamSetting(me, 'ds_pgCardInfo'  ,'ds_pgCardInfo');
    		
    		var saveUrl = '/rec/REC000P_02/save_indeungLimit.suvila';
    		
    		console.log( mainRecord.get("LIMIT_YN") == 'T' );
    		console.log( mainRecord.get("LIMIT_YN") == 'T' );
    		
    		if(mainRecord.get("LIMIT_YN") == 'T'){
    			saveUrl = '/rec/REC000P_02/save_indeung.suvila';
    		}
    		
    		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?',function(btn) {
    			if (btn == 'yes') {
    				me.callForm(me, saveUrl,me.onSaveLimitCallback, false);
    			}
    		});
    	}//
    	
    	if(rdo_ApprovalGbn == 2){ //카드
    	}
    },
    onSaveLimitCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action, 'ds_misuRec' );
    	if(success){
    		me.lookupReference('me_month').setExValue(1);
    		
    		var params = {
    			V_SEARCH_BUD  : me.lookupReference('v_bud_no').getExValue()
    			,V_BUNGA      : me.lookupReference('v_bunga').getExValue()
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_main', '', params ,me.dsMainCallback);
        	},50);
    	}
    },
    onAdd : function(){
    	var me = this;
    	
    	var mainRecord = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
    	
    	var rdo_ApprovalGbn = me.lookupReference('Mrdo_ApprovalGbn').getValue().Mrdo_ApprovalGbn;
    	
    	var data ={
       		 TEMPLE_CD 	  : exCommon.user.templeCd
       		,ACCEPT_SEQ   : mainRecord.get("ACCEPT_SEQ")
       		,SEQ 		  : mainRecord.get("SEQ")
       		,APPROVAL_GBN : rdo_ApprovalGbn
       		,AMOUNT       : 0
       		,SQL_MODE     : 'I'
       	}
       	me.getViewModel().getStore('ds_misuRec').add(data);
   		me.lookupReference('tr_sunab3_a').getView().select( me.getViewModel().getStore('ds_misuRec').getCount()-1 );
   		me.lookupReference('tr_sunab3_a').plugins[0].startEditByPosition({
           row    : me.getViewModel().getStore('ds_misuRec').getCount()-1,
           column : 3
       });
    	
    },
    inGetAmount : function(iYYYYMMDD){
    	var me = this;
    	
    	var rtnAmount = 0;
    	
    	var recRecord  		 = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
    	var recBaseAmountCnt = me.getViewModel().getStore('ds_rec_base_amount').getCount();
    	
    	
    		
		if( recBaseAmountCnt == 0 ){
			rtnAmount = 0;
		}else if( recBaseAmountCnt == 1 ){    			
			
			rtnAmount =  me.getViewModel().getStore('ds_rec_base_amount').getAt(0).get("AMOUNT");
		}else{
			var rtn = true;
			
			for(var z=1; z<recBaseAmountCnt; z++){
				
				var START_YYYYMM  = new Number(me.getViewModel().getStore('ds_rec_base_amount').getAt(z).get("START_YYYYMM"));
				var END_YYYYMM    = new Number(me.getViewModel().getStore('ds_rec_base_amount').getAt(z).get("END_YYYYMM"));
				
				if(	START_YYYYMM <= iYYYYMMDD && END_YYYYMM >= iYYYYMMDD){
					rtnAmount =  me.getViewModel().getStore('ds_rec_base_amount').getAt(z).get("AMOUNT"); 
					rtn       = false;
					break;
				}
			}// for
			if(rtn){
				rtnAmount = me.getViewModel().getStore('ds_rec_base_amount').getAt(0).get("AMOUNT");
			}
		}
    	return rtnAmount;
    },
    inAdd2 : function(temp_yyyymm , amount){
    	var me = this;
    	
    	var fndRowIdx = me.inRowFindIndex(me, 'ds_misuRec',temp_yyyymm ,'I');
    	
    	console.log('fndRowIdx = ', fndRowIdx);
    	
    	if 	(fndRowIdx > 0 ){    		
    		me.getViewModel().getStore('ds_misuRec').removeAt(fndRowIdx);    		
    		return 2;
    	}
    	
    	
    	var dupleRecord = me.getViewModel().getStore('ds_misuRec').findRecord('PAYMENT_YYYYMM', temp_yyyymm, 0, false, true, true);
    	
    	console.log('dupleRecord = ', dupleRecord);
    	
    	var rowIndex    = me.lookupReference('tr_sunab3_a').getStore().indexOf(dupleRecord);
    	//console.log('rowIndex = ', rowIndex);
    	
    	var records = new Array();
    	var findCnt = 0;
    	
    	var recRecord  		 = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
    	
    	var data = {
    		 TEMPLE_CD    	 : exCommon.user.templeCd
    		,ACCEPT_SEQ   	 : recRecord.get("ACCEPT_SEQ")
    		,SEQ          	 : recRecord.get("SEQ")
    		,PAYMENT_YYYYMM	 : temp_yyyymm
    		,AMOUNT       	 : amount
    		,APPROVAL_GBN 	 : "1"
    		,APPROVAL_GBN_NM : "현금접수"
    		,SUB_DATE        : exCommon.getNowDate()
    		,SQL_MODE        : 'I'
    	}
    	
    	var rdo_ApprovalGbn = me.lookupReference('Brdo_ApprovalGbn').getValue().Brdo_ApprovalGbn;
    	
    	if(rdo_ApprovalGbn == "4"){
    		data.APPROVAL_GBN    = "4";
    		data.APPROVAL_GBN_NM = "무통장입금";
    	}
    	
    	if(rdo_ApprovalGbn == "2"){
    		data.APPROVAL_GBN    = "2";
    		data.APPROVAL_GBN_NM = "카드결제";
    	}
    	
    	var misuCnt = me.getViewModel().getStore('ds_misuRec').getCount(); 
    	me.getViewModel().getStore('ds_misuRec').add(data);
    	
    	me.lookupReference('tr_sunab3_a').plugins[0].startEditByPosition({
            row: misuCnt,
            column: 6
        });
    	me.lookupReference('tr_sunab3_a').getView().select( misuCnt );
    	
    	return 1;
    	
    },
    onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	var SQL_MODE   = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("SQL_MODE");
    	var EDIT_MODE  = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("EDIT_MODE");
    	
    	var recRecord  = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
    	var LIMIT_YN   = recRecord.get("LIMIT_YN");
    	
    	console.log('context = ', context.field);
    	console.log('LIMIT_YN = ', LIMIT_YN);
    	
    	if(LIMIT_YN == 'T'){
    		if( (context.field == 'AMOUNT' && SQL_MODE == "I") || (context.field == 'REMARK' && SQL_MODE == "I")){
	    		return true;
	    	}else{
	    		return false;
	    	}
    	}
    	else{
    		if( (context.field == 'REMARK' && SQL_MODE == "I") ){
	    		return true;
	    	}else{
	    		return false;
	    	}
    	}
    },
    inRowFindIndex : function(me, storNm , strYYYYMM , rowStatus){
    	var rtnVal = -1;
    	
    	for(var i = 0; i<me.getViewModel().getStore(storNm).getCount(); i++){
    		
    		var record = me.getViewModel().getStore(storNm).getAt(i);
    		
    		var fndYYYYMM  = exCommon.getRepVal( record.get("PAYMENT_YYYYMM"), "" );
    		var SQL_MODE   = exCommon.getRepVal( me.getViewModel().getStore(storNm).getAt(i).get("SQL_MODE"), "" );
    		
    		if( fndYYYYMM == strYYYYMM  && SQL_MODE == rowStatus ){
    			rtnVal = i;
    		}
    		
    	}// for
    	
    	return rtnVal;
    },
    inSetSMS : function (me){
    	
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	var row       = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < row ; i++){
    		var record 	        = me.getViewModel().getStore('ds_main').getAt(i);
    		var SMS_YN 		    = record.get("SMS_YN");
    		var MOBILE_TELNO    = exCommon.getRepVal( record.get("MOBILE_TELNO") , '');
    		var PROPOSAL_BUD_NM = record.get("PROPOSAL_BUD_NM");
    		var PROPOSAL_BUD_NO = record.get("PROPOSAL_BUD_NO");
    		
    		
    		if(record.crudState == 'U' && SMS_YN == 'T' && MOBILE_TELNO != ''){
    			
    			var msg = "["+exCommon.user.templeNm +"] "+record.get("LIGHT_NM") + "-" + record.get("DONGCHAM_NM")+" ";
    				msg+= parseInt(  record.get("PAYMENT_AMT")  )  + "원 보시하셨습니다. 성불하세요.";
    				
    			var data ={
    				 TR_ID       : 'SUNAB'
    				,TR_SENDSTAT : '0'
    				,TR_PHONE    : MOBILE_TELNO
    				,TR_DEST_INFO: PROPOSAL_BUD_NM + "^" + MOBILE_TELNO
    				,TR_CALLBACK : exCommon.user.tel
    				,TR_ETC1     : exCommon.user.templeCd 
    				,TR_ETC2     : PROPOSAL_BUD_NO
    				,TR_ETC3     : 'SMSREC'
    				,TR_ETC4     : '2'
    				,TR_ETC5     : exCommon.user.userId
    				,TR_MESSAGE  : msg
    			};
    			
    			console.log('data = ', data);
    			
    			me.getViewModel().getStore('ds_sms').add(data);
    		}
    	}// for
    	
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        if(clickedDataIndex == 'CANCELGBN '){
        	
        	var strAPPROVAL_GBN = record.get("APPROVAL_GBN");
    		var strAMOUNT       = new Number(record.get("AMOUNT"));
    		if(strAPPROVAL_GBN == '2' && strAMOUNT > 0){
    			var params = {
	    			 ACCEPT_SEQ     : record.get("ACCEPT_SEQ") 	
	    			,PAYMENT_YYYYMM : ''
	    			,SUB_DATE       : record.get("SUB_DATE")
	    			,SEQ            : record.get("SEQ")
	    			,WINDOW         : ''
	    		}
	    		
	    		this.openPopup('ExFrm.view.com.cardPayCancel',  params, this.onCellDbClickDeungReceive);
    		}
    		
        }
        return;
    },
    onCellDbClickDeungReceive : function (params , me){
    	console.log('onCellDbClickDeungReceive = ', params);
    	
    	if(params.cancel){
    	}
    	
    },
    onCardCancelReceive : function (params , me){
    	console.log('onCardCancelReceive = ', params);
    	
    	if(params.cancel){
    	}
    	
    },
    onBeforeedit_all : function(editor, context, eOpts) {
		var me = this;

		 console.log(context);
		 
		 if(context.field == 'SUNAP_MONTH'){
			 var record = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
			 var SUNAB_YN = record.get("SUNAB_YN");
			 var LIMIT_YN = record.get("LIMIT_YN");
			 if(SUNAB_YN == 'T' && LIMIT_YN == 'F'){
				return true; 
			 }
			 return false;
		 }
		 return false;
	},
	onEdit_all : function(editor, context, eOpts) {
		var me = this;

		var record = me.lookupReference('rec000p_06_a').getView().getSelectionModel().getSelection()[0];
		var month  = record.get("SUNAP_MONTH");
		
		if(context.field == 'SUNAP_MONTH'){
			var SUNAB_YN    = record.get("SUNAB_YN");
    		var LIMIT_YN    = record.get("LIMIT_YN");
    		var START_MONTH = record.get("START_MONTH");
    		var LAST_MONTH  = record.get("LAST_MONTH");
    		var BASE_AMT  	= parseInt(record.get("BASE_AMT"));
    		var INDEUNG_GBN = record.get("INDEUNG_GBN");
    	    		    		
    		if(SUNAB_YN == 'T' && LIMIT_YN == 'T'){
    			record.set("SUNAP_MONTH", month);
    			record.set("PAYMENT_AMT", BASE_AMT * month);
    		}else if(SUNAB_YN == 'T' && LIMIT_YN == 'F'){
    			var mFLAG = true;
				var LAST_MONTH = LAST_MONTH;
				if(LAST_MONTH == "000000"){
					mFLAG = false;
					LAST_MONTH = START_MONTH
				}
				
				var SUNAP_MONTH = LAST_MONTH;
				var idx_amount  = BASE_AMT;
				if(month  == 1){
					idx_amount = me.inGetSunapMonthAmout( parseInt(SUNAP_MONTH) ,INDEUNG_GBN ,BASE_AMT );
				}else{
					idx_amount = me.inGetSunapMultiMonthAmount( parseInt(SUNAP_MONTH) ,INDEUNG_GBN ,BASE_AMT , parseInt(month) );
				}
				record.set("SUNAP_MONTH", month);
				record.set("PAYMENT_AMT", idx_amount+'');
    		}
		}
    	
    	me.inViewSumAmount(me);
	},
})