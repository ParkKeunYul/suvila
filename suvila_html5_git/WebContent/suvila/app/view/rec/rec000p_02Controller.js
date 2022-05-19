Ext.define('ExFrm.view.rec.rec000p_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_02',
    onInit:function(){
    	var me = this;
    	
    },
    onAfterRender:function(){
    	console.log('onAfterRender');
    	var me = this;
    	
    },
    destroy: function () {
        console.log('rec destroy'); // never called
        this.receiveTo(null, false);
    },
    onCalled:function(record){
    	console.log('onCalled');
        var me = this;
        
        me.getViewModel().getStore('ds_recAmt').removeAll();
        me.getViewModel().getStore('ds_recAmt').add(record);
        
        me.getViewModel().getStore('ds_temp').removeAll();
        me.getViewModel().getStore('ds_temp').add(record);
        
        
        var dsRecAmt = me.getViewModel().getStore('ds_recAmt').getAt(0);
        if(dsRecAmt.get("ACCEPT_GBN")  == 15  || dsRecAmt.get("ACCEPT_GBN")  == 13){
   			$('#div_tot_txt').text('월 납입금액');	
	   	}
        
        setTimeout(function(){
        	
        	if( dsRecAmt.get("ACCEPT_GBN") == "2" && dsRecAmt.get("LIMIT_YN") == "T" ){
        		me.lookupReference('tr_sunab3_b').setHidden(true);
        		me.lookupReference('limitBtn').setHidden(true);
        		me.lookupReference('unLimitBtnArea').setHidden(false);
        		
        		me.lookupReference('tr_sunab3_a').columns[7].show();
            	me.lookupReference('tr_sunab3_a').columns[3].hide();
            	
            	me.lookupReference('tr_sunab3_c').setHidden(false);
        	}
        	
        	
    	},1000);
        
       
        try{
        	
        	var APPROVAL_GBN = exCommon.getRepVal( record.APPROVAL_GBN );
        	if(APPROVAL_GBN != 3){
        		me.lookupReference('cmsArea').setHidden(true);
        	}
        	
        	
        	me.lookupReference('txt_prodName').setExValue(exCommon.getRepVal( record.PROD_NAME ));
            me.lookupReference('txt_proposalBudNm').setExValue(exCommon.getRepVal( record.PROPOSAL_BUD_NM ));
            me.lookupReference('me_totPaymentPlanAmt').setExValue(exCommon.getRepNum( record.PAYMENT_PLAN_AMT ));
            me.lookupReference('me_totPaymentAmt').setExValue(exCommon.getRepNum( record.PAYMENT_AMT ));
            me.lookupReference('me_misuAmt').setExValue(exCommon.getRepNum( record.MISU_AMT ));        
            me.lookupReference('cb_smsYn').setExValue(exCommon.getRepVal( record.SMS_YN ));
            me.lookupReference('ta_memo').setExValue(exCommon.getRepVal( record.MEMO ));
            me.lookupReference('ta_remark').setExValue(exCommon.getRepVal( record.REMARK ));
            
            me.lookupReference('txt_MobiletelNo1').setExValue(exCommon.getRepVal( record.MOBILE_TELNO1 ));
            me.lookupReference('txt_MobiletelNo2').setExValue(exCommon.getRepVal( record.MOBILE_TELNO2 ));
            me.lookupReference('txt_MobiletelNo3').setExValue(exCommon.getRepVal( record.MOBILE_TELNO3 ));        
            
            me.lookupReference('txt_CmsTradeCd').setExValue(exCommon.getRepVal( record.CMS_TRADE_CD ));        
            me.lookupReference('txt_bunnabDay').setExValue(exCommon.getRepVal( record.BUNNAB_DAY ));
            me.lookupReference('txt_bank').setExValue(exCommon.getRepVal( record.BANK_NM ));
            me.lookupReference('txt_accountNumber').setExValue(exCommon.getRepVal( record.ACCOUNT_NUMBER ));
            me.lookupReference('txt_accountSeq').setExValue(exCommon.getRepVal( record.ACCOUNT_SEQ ));
            me.lookupReference('txt_smsYn').setExValue(exCommon.getRepVal( record.SMS_YN ));
            
            me.lookupReference('txt_approvalGbn').setExValue(exCommon.getRepVal( record.APPROVAL_GBN_NM ));
            me.lookupReference('txt_whajubosalNm').setExValue("");
            me.lookupReference('txt_kwonsunNo').setExValue("");
            
            var params ={
            	V_BUD_NO : record.sinDaejuBud_no
            } 
            
            console.log('record = ', record);
            
            setTimeout(function(){
            	me.callStore(me, 'ds_sindo_cms_info', '', params ,me.dsSinoCmsCallback);
    		},50);
            
            
        }catch (e) {
			console.log('param setting error');
		}
        //
        
        me.inSelectMisu();
    },
    dsSinoCmsCallback : function(me, success, form, action){
    	console.log('dsSinoCmsCallback');
    },
    inSelectMisu : function(){
    	
    	var me = this;
    	var record = me.getViewModel().getStore('ds_recAmt').getAt(0);
    	
    	var ACCEPT_GBN = record.get("ACCEPT_GBN");
    	
    	
    	var param = {
    		 V_SEQ        : record.get("SEQ")
    		,V_ACCEPT_SEQ : record.get("ACCEPT_SEQ")
    		,V_ACCEPT_GBN : ACCEPT_GBN    		
    		,V_PROD_CODE  : record.get("PROD_CODE")
    		,V_LIGHT_NO   : exCommon.getRepVal( record.get("LIGHT_NO") )
    		,V_JUNGAK_CD  : exCommon.getRepVal( record.get("JUNGAK_CD") )
    	}
    	
    	var dsType   = 'ds_misuRec';
    	var LIMIT_YN = exCommon.getRepVal( record.get("LIMIT_YN") );
    	
    	if(LIMIT_YN == "T" && ACCEPT_GBN != 4 && ACCEPT_GBN != 9 && ACCEPT_GBN != 15) dsType = 'ds_misuRecBase';
    	
    	console.log('dsType = ', dsType);
    	
    	
    	setTimeout(function(){
			me.callStore(me, dsType, '', param ,me.selectLimitCallback);    				
		},50);
    	
    	if(ACCEPT_GBN == 2 || ACCEPT_GBN == 3 || ACCEPT_GBN == 8 || ACCEPT_GBN == 14 || ACCEPT_GBN == 4 || ACCEPT_GBN == 12 ){
    		me.lookupReference('iDArea').setHidden(false);
    		me.lookupReference('iDBtnArea').setHidden(false);
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_lightOut', '', param ,me.IdLightOutCallback);    				
    		},250);
    	}
    },
    IdLightOutCallback : function(me, success, form, action){
    	console.log('IdLightOutCallback', success);
    	if(success  && me.getViewModel().getStore('ds_lightOut').getCount() > 0 ){
    		me.lookupReference('txt_lightNo').setExValue( me.getViewModel().getStore('ds_lightOut').getAt(0).get("LIGHT_NO") );
    		me.lookupReference('txt_donchamja').setExValue( me.getViewModel().getStore('ds_lightOut').getAt(0).get("NAME_KOR") );
    		me.lookupReference('txt_closeYn').setExValue( me.getViewModel().getStore('ds_lightOut').getAt(0).get("CLOSE_YN_NM") );
    	}
    },
    selectLimitCallback : function(me, success, form, action){
    	if(success){
    		
    		var dsType = 'ds_payMonth';
    		var LIMIT_YN   = exCommon.getRepVal( me.getViewModel().getStore('ds_recAmt').getAt(0).get("LIMIT_YN") );
    		var ACCEPT_GBN = exCommon.getRepVal( me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN") );
    		
    		console.log('LIMIT_YN = ',  LIMIT_YN);
    		
    		if(LIMIT_YN == "T" && ACCEPT_GBN != 4 && ACCEPT_GBN != 9 && ACCEPT_GBN != 15){
    			
    			var rowCnt = 0;
    			for(var i = 0; i< me.getViewModel().getStore('ds_misuRecBase').getCount(); i++ ){
    				me.getViewModel().getStore('ds_misuRec').add( me.getViewModel().getStore('ds_misuRecBase').getAt(i).data );
    			}// for
    			me.getViewModel().getStore('ds_misuRec').commitChanges();
    			
    			dsType = 'ds_payMonthBase';
    		}
    			
    		console.log('dsType =', dsType);
    		setTimeout(function(){
				me.callStore(me, dsType, '', action._params ,me.selectMonthCallback);    				
			},50);
    	}
    	
    	//me.onPrint();
    },
    selectMonthCallback : function(me, success, form, action){
    	if(success){
    		setTimeout(function(){
				me.callStore(me, 'ds_rec_base_amount', '', action._params ,null);    				
			},50);
    	}
    },
    onSunab2 : function(){
    	var me = this;
    	
    	
    	if( me.getViewModel().getStore('ds_payMonth').getCount() == 0 ) return false;
    	
    	
    	if( me.inCheckEnd() )return;
    	
    	var v_AG     = me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
    	var v_EY     = me.getViewModel().getStore('ds_recAmt').getAt(0).get("END_YN");
    	
    	
    	if(v_AG == "2" || v_AG == "4" || v_AG == "12" || v_AG == "14"){
    		if(  (v_AG == "15" && v_EY =='T'  )  ||  me.getViewModel().getStore('ds_lightOut').getAt(0).get("CLOSE_YN") == "T" ){
    			setTimeout(function(){
    				Ext.Msg.alert('알림',"소등처리된 경우는 수납 처리를 할수 없습니다.");    				
    			},50);
    			
    			return;
    		}
    	}// v_AG
    	
    	
    	    	
    	
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
		
		
		/*console.log('row = [ ', (start.rowIdx+1) +"열에서 ==> " +(end.rowIdx+1) + "열까지 ]"   );
		console.log('col = [ ', (start.colIdx-1) +"월부터 ==> " +(end.colIdx-1) + "월까지 ]"   );*/
		
		
		console.log('row = [ ', (sRowIdx+1) +"열에서 ==> " +(eRowIdx+1) + "열까지 ]"   );
		console.log('col = [ ', (sColIdx) +"월부터 ==> " +(eColIdx) + "월까지 ]"   );
		
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
		 			
		 			if( (v_AG =="2"|| v_AG =="9"|| v_AG =="13"|| v_AG =="15")  &&  new Number(temp_yyyymm) < new Number(me.getViewModel().getStore('ds_misuRec').getAt(0).get("PAYMENT_YYYYMM")) ){
		 				exCommon.msgAlert("해당 기간은 납부 기간이 아닙니다.");
			 			return;
		 			}
		 			
		 			
		 			
		 			var rtnAdd = me.inAdd2(temp_yyyymm , temp_amount);
		 			
		 			if(rtnAdd == 1){
		 				
		 				record.set('amount_'+temp_month,temp_amount);
		 				record.set("M_STATUS_"+temp_month ,"3");
		 				
		 				console.log(record);
		 			}
		 			else if( rtnAdd == 2 ){
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
		 			me.inMisuCalc();
		 		}
			}// for k
		}// for i 
    },
    getCancelApprovlType : function(sRowIdx,sColIdx,eColIdx){
    	var me = this;
    	
    	var  tmpColVal = me.getViewModel().getStore('ds_payMonth').getAt(sRowIdx).get("A_STATUS_"+exCommon.addZero(sColIdx)); 
    	
    	
    	for(i=sColIdx ; i<=eColIdx ; i++){
    		var ColVal = me.getViewModel().getStore('ds_payMonth').getAt(sRowIdx).get("A_STATUS_"+exCommon.addZero(i));
    		
    		console.log(i , ": "+ ColVal + " = "+ tmpColVal);
    		
    		if (tmpColVal != ColVal ){
    			exCommon.msgAlert('현금수납과 카드수납을 동시에 취소할 수 없습니다.');
				return false; 
			}
    	}// for
    	
    	return true;
    }, 
    getCancelCardAuthCode : function(){
    	
    	var me = this;
    	
    	var  tmpColVal = me.getViewModel().getStore('ds_payMonth').getAt(sRowIdx).get("B_STATUS_"+exCommon.addZero(sColIdx));
    	
    	for(i=sColIdx ; i<=eColIdx ; i++){
    		var ColVal = me.getViewModel().getStore('ds_payMonth').getAt(sRowIdx).get("B_STATUS_"+exCommon.addZero(i));
    		
    		
    		if (tmpColVal != ColVal ){
    			exCommon.msgAlert('승인번호가 서로 다른 수납건 입니다. 한건씩 취소해 주세요.');
				return false; 
			}
    	}// for
    	
    	return true;
    },
    onCardCancelReceive : function (params , me){
    	console.log('onCardCancelReceive = ', params);
    	
    	if(params.cancel){
    		me.getViewModel().getStore('ds_misuRec').reload();
    	}
    	
    },
    /*-- 고정금액 수납 취소 --*/
    onCancel : function(){
    	var me = this;
    	
    	if( me.inCheckEnd() )return;
    	
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
			
			console.log(record);
			
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
		 			
		 			
		 			var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_p').getValue().rdo_ApprovalGbn_p;
		 			
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
				me.inMisuCalc();
			}// for k
		}// for i
    },
    on_cancel : function(){
    	var me = this;
    	
    	if( me.inCheckEnd() )return;
    	
    	
    	var record = me.lookupReference('tr_sunab3_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	if(me.getViewModel().getStore('ds_misuRec').getNewRecords().length == 0  ||  exCommon.getRepVal(record.get("SQL_MODE")) != "I" ){
    		return false;
    	}
    	
    	Ext.MessageBox.confirm('알림', '자료를 취소하시겠습니까?', function(btn){  
	        if (btn == 'yes') { 
	        	var ACCEPT_GBN = me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
	        	var LIMIT_YN   = me.getViewModel().getStore('ds_recAmt').getAt(0).get("LIMIT_YN");
	        	
	        	
	        	if( (LIMIT_YN =="F" && ACCEPT_GBN  == 2)   || ACCEPT_GBN  == 13){
        			
	        		exCommon.gridRemove(me, 'tr_sunab3_a' , 'ds_misuRec' , false, true);
        			
        			var v_yyyy = exCommon.getRepVal(record.get("PAYMENT_YYYYMM")).substring(0,4);
        			var v_mm   = exCommon.getRepVal(record.get("PAYMENT_YYYYMM")).substring(4);
        			
        			var findRocord = me.getViewModel().getStore('ds_payMonth').findRecord('YEAR', v_yyyy, 0, false, true, true);
        			
        			
        			findRocord.set("amount_"+v_mm     , exCommon.getRepVal( findRocord.getPrevious("amount_"+v_mm ))  );
        			findRocord.set("M_STATUS_"+v_mm   , exCommon.getRepVal( findRocord.getPrevious("M_STATUS_"+v_mm ))  );
	        	}else if(LIMIT_YN =="T" && ACCEPT_GBN  == 2){
	        		exCommon.gridRemove(me, 'tr_sunab3_a' , 'ds_misuRec' , false, true);
        		}// if
	        	
	        		
	        	me.inMisuCalc();
	        }// yes
	    });
    },
    inMisuCalc : function(){
    	
    	var me = this;
    	
    	var ACCEPT_GBN = me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
    	var LIMIT_YN   = me.getViewModel().getStore('ds_recAmt').getAt(0).get("LIMIT_YN");
    	
    	console.log('inMisuCalc ACCEPT_GBN= ', ACCEPT_GBN);
    	console.log('inMisuCalc LIMIT_YN  = ', LIMIT_YN);
    	
    	
    	
		var totAmt = 0;
    	var misuCnt = me.getViewModel().getStore('ds_misuRec').getCount();
    	for(var i = 0; i<misuCnt ; i++){
    		totAmt +=   exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") );
    	}// for
    	
    	console.log('inMisuCalc = ' , totAmt);
    	me.lookupReference('me_totPaymentAmt').setExValue(totAmt);
    	
    	var me_misuAmt = exCommon.getRepNum( me.lookupReference('me_totPaymentPlanAmt').getExValue() ) - totAmt;
    	me.lookupReference('me_misuAmt').setExValue(me_misuAmt);
    	
    	
    	if( (ACCEPT_GBN == "2" && LIMIT_YN == "F") ||  ACCEPT_GBN == "9"||  ACCEPT_GBN == "13" ||   ACCEPT_GBN == "15" ){
    		me.lookupReference('me_misuAmt').setExValue(0);    	    		
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
    inAdd2 : function(temp_yyyymm , amount){
    	var me = this;
    	
    	
    	var fndRowIdx = me.inRowFindIndex(me, 'ds_misuRec',temp_yyyymm ,'I');
    	
    	console.log('fndRowIdx = ', fndRowIdx);
    	
    	if 	(fndRowIdx > 0 ){    		
    		me.getViewModel().getStore('ds_misuRec').removeAt(fndRowIdx);    		
    		return '2';
    	}
    	
    	
    	var dupleRecord = me.getViewModel().getStore('ds_misuRec').findRecord('PAYMENT_YYYYMM', temp_yyyymm, 0, false, true, true);
    	
    	console.log('dupleRecord = ', dupleRecord);
    	
    	var rowIndex    = me.lookupReference('tr_sunab3_a').getStore().indexOf(dupleRecord);
    	
    	var records = new Array();
    	var findCnt = 0;
    	
    	var data = {
    		 TEMPLE_CD    	 : exCommon.user.templeCd
    		,ACCEPT_SEQ   	 : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
    		,SEQ          	 : me.getViewModel().getStore('ds_recAmt').getAt(0).get("SEQ")
    		,PAYMENT_YYYYMM	 : temp_yyyymm
    		,AMOUNT       	 : amount
    		,APPROVAL_GBN 	 : "1"
    		,APPROVAL_GBN_NM : "현금접수"
    		,SUB_DATE        : exCommon.getNowDate()
    		,SQL_MODE        : 'I'
    	}
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_p').getValue().rdo_ApprovalGbn_p;
    	
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
    	
    	return '1';
    },
    onCellDbClickSunap3 : function(me2, td, cellIndex, record, tr, rowIndex, e, eOpts ){
    	
	 	if( !(cellIndex >=2 && cellIndex<=13)){
	 		return false;
	 	} 
	 
	 	var me = this;
	 	
	 	if( me.inCheckEnd() )return;
	 	
    	var YEAR     = record.get("YEAR");    	
    	var MONTH    = exCommon.addZero(cellIndex -1 );
    	var M_STATUS = record.get("M_STATUS_"+MONTH);
    	
    	if(M_STATUS == 3){
    		me.onCancel();
    	}else{
    		me.onSunab2();
    	}
    },
    onAddYear : function(){
    	
    	var me = this;
    	
    	if( me.inCheckEnd() )return;
    	
    	var cnt = me.getViewModel().getStore('ds_payMonth').getCount();
    	
    	if(cnt  == 0){
    		var start_yyyy = me.getViewModel().getStore('ds_misuRec').getAt(0).get("PAYMENT_YYYYMM").substr(0,4);
    		var data ={
				 TEMPLE_CD 	 : me.getViewModel().getStore('ds_recAmt').getAt(0).get("TEMPLE_CD")
    			,ACCEPT_SEQ  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
    			,SEQ 		 : me.getViewModel().getStore('ds_recAmt').getAt(0).get("SEQ")
    			,ACCEPT_GBN  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN")
    			,INDEUNG_GBN : me.getViewModel().getStore('ds_recAmt').getAt(0).get("INDEUNG_GBN")
    			,YEAR 		 : parseInt(start_yyyy,10)
    		}
    		me.getViewModel().getStore('ds_payMonth').insert(0 , data);
    	}else{
    		
    		var nextYear = "";
    		for(i=cnt-1; i >= 0; i--){
    			nextYear = me.getViewModel().getStore('ds_payMonth').getAt(i).get("YEAR");
    		}//for
    		nextYear = parseInt( nextYear ) + 1;
    		
    		
    		var data = {
    			 TEMPLE_CD 	 : me.getViewModel().getStore('ds_recAmt').getAt(0).get("TEMPLE_CD")
    			,ACCEPT_SEQ  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
    			,SEQ 		 : me.getViewModel().getStore('ds_recAmt').getAt(0).get("SEQ")
    			,ACCEPT_GBN  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN")
    			,INDEUNG_GBN : me.getViewModel().getStore('ds_recAmt').getAt(0).get("INDEUNG_GBN")
    			,YEAR 		 : nextYear
    		}
    		me.getViewModel().getStore('ds_payMonth').insert(0 , data);
    	}
    	me.lookupReference('tr_sunab3_b').getView().select(0);
    	
    },
    inCheckEnd : function(){
    	var me = this;
    	
    	var ACCEPT_GBN = me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
    	var END_YN     = me.getViewModel().getStore('ds_recAmt').getAt(0).get("END_YN");
    	
    	/*console.log('ACCEPT_GBN = ', ACCEPT_GBN);
    	console.log('END_YN = ', END_YN);*/
    	
    	if( (ACCEPT_GBN == "9" || ACCEPT_GBN == "13") && END_YN == "T" ){
    		exCommon.msgAlert('접수가 종료되어 접수내용을 수정 하실 수 없습니다.');
    		return true;
    	}
    	return false;
    },
    inGetCancelAmount : function(temp_yyyymm){
    	var me        = this;
    	var rtnAmount = 0;
    	
    	var rowCnt = me.getViewModel().getStore('ds_misuRec').getCount();
    	
    	for(var i = 0; i< rowCnt ; i++){
    	//	console.log(temp_yyyymm, "  : "+ me.getViewModel().getStore('ds_misuRec').getAt(i).get("PAYMENT_YYYYMM"));
    		
    		if( temp_yyyymm == me.getViewModel().getStore('ds_misuRec').getAt(i).get("PAYMENT_YYYYMM") ){
    			rtnAmount += ( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") * -1);
    		}
    		
    	}// for
    	//console.log("inGetCancelAmount = ",rtnAmount );
    	return rtnAmount;
    },
    inGetAmount : function(iYYYYMMDD){
    	var me = this;
    	
    	var rtnAmount = 0;
    	
    	var recRecord  =    me.getViewModel().getStore('ds_recAmt').getAt(0);
    	var ACCEPT_GBN       = recRecord.get("ACCEPT_GBN");
    	var APPROVAL_GBN     = recRecord.get("APPROVAL_GBN");
    	var WEPAECNT         = recRecord.get("WEPAECNT");
    	var PAYMENT_PLAN_AMT = recRecord.get("PAYMENT_PLAN_AMT");
    	
    	
    	var recBaseAmountCnt = me.getViewModel().getStore('ds_rec_base_amount').getCount();
    	
    	
    	/*console.log('recRecord = ' , recRecord);
    	console.log('ACCEPT_GBN = ' , ACCEPT_GBN);
    	console.log('recBaseAmountCnt = ' , recBaseAmountCnt);*/
    	if(ACCEPT_GBN == "2" || ACCEPT_GBN == "13"){
    		
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
    				//기간 설정 금액이 엇는경우 기본 금액 설정
    				rtnAmount = me.getViewModel().getStore('ds_rec_base_amount').getAt(0).get("AMOUNT");
    			}
    		}
    	}else if(ACCEPT_GBN == "4" && APPROVAL_GBN == "3" && WEPAECNT > 1 ){
    		rtnAmount = PAYMENT_PLAN_AMT / WEPAECNT;
    	}else if(ACCEPT_GBN == "9" ){
    		rtnAmount =  me.getViewModel().getStore('ds_recAmt').getAt(0).get("BASE_AMT");
    	}else if(ACCEPT_GBN == "15" ){
    		rtnAmount = me.getViewModel().getStore('ds_recAmt').getAt(0).get("BASE_AMT");
    	}
    	//console.log('rtnAmount = ', rtnAmount);
    	return rtnAmount;
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onFocus : function(){
    	var me = this;
    	
    	console.log('onFocus');
    },
    onSmsChange : function(ele, newValue, oldValue){
    	var me  = this;
    	
    	me.lookupReference('mobileArea').setHidden(true);
    	
    	if(newValue == 'T'){
    		me.lookupReference('mobileArea').setHidden(false);
    		me.lookupReference('txt_MobiletelNo1').focus();
    	}
    },
    onCellSave : function(){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_sinCell').clearData();
    	
    	var MOBILE_TELNO1 = me.lookupReference('txt_MobiletelNo1').getExValue();
    	var MOBILE_TELNO2 = me.lookupReference('txt_MobiletelNo2').getExValue();
    	var MOBILE_TELNO3 = me.lookupReference('txt_MobiletelNo3').getExValue();
    	var SMS_YN 		  = me.lookupReference('cb_smsYn').getExValue()
    	
    	
    	var data = {
    		 MOBILE_TELNO1   : MOBILE_TELNO1
    		,MOBILE_TELNO2 	 : MOBILE_TELNO2
    		,MOBILE_TELNO3 	 : MOBILE_TELNO3
    		,ACCEPT_SEQ    	 : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
    		,PROPOSAL_BUD_NO : me.getViewModel().getStore('ds_recAmt').getAt(0).get("PROPOSAL_BUD_NO")
    		,TEMPLE_CD 		 : me.getViewModel().getStore('ds_recAmt').getAt(0).get("TEMPLE_CD")
    		,SMS_YN 	 	 : SMS_YN
    	}
    	me.getViewModel().getStore('ds_sinCell').add( data );
    	
    	exCommon.fnGridSaveAll(
       		 me
       		,'ds_sinCell'
       		,'newData'
       		,'uptData'
       		,'delData'
       		,'/rec/REC000P_02/saveCell.suvila'
       		,me.onCellSaveCallback
       		,false
       		,'접수문자상태 변경 하시겠습니까?'
       	);
    },
    onCellSaveCallback: function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_sinCell').clearData();
    	}
    	exCommon.fnGridSaveCallback(me, success, action, 'ds_sinCell'  );
    },
    onCmsInfoChange : function(opt , newV , oldV){
    	var me  = this;
    	
    	me.getViewModel().getStore('ds_cmsinfo').clearData();
    	
    	/*var newCmsInfo  = newV.split('|');
    	var oldCmsInfo  = odlV.split('|');*/
    	
    	if(newV == "" || newV == null || newV == undefined){
    		return false;
    	}
    	
    	var newData = me.getViewModel().getStore('ds_sindo_cms_info').findRecord('DISPLAY', newV, 0, false, true, true);
    	var oldData = me.getViewModel().getStore('ds_sindo_cms_info').findRecord('DISPLAY', oldV, 0, false, true, true);
    	
    	if(oldData != null && oldData != undefined){
    		var data ={
	       		 BUNNAB_DAY     	: newData.get("CMS_PAYMENT_DAY")
	       		,ACCOUNT_NUMBER 	: newData.get("IF_PAYMENT_ACCOUNT") 
	       		,ACCOUNT_SEQ 		: newData.get("ACCOUNT_SEQ")
	       		,CMS_TRADE_CD 		: newData.get("CMS_TRADE_CD")
	       		,BANK_NO 			: newData.get("IF_PAYMENT_BANK_CD")
	       		,BANK_CD 			: newData.get("IF_PAYMENT_BANK_CD")
	       		,BANK_NM 			: newData.get("BANK_NM")
	       		,OLD_ACCOUNT_NUMBER : oldData.get("IF_PAYMENT_ACCOUNT")
	       		,OLD_ACCOUNT_SEQ 	: oldData.get("ACCOUNT_SEQ")
	       		,OLD_CMS_TRADE_CD 	: oldData.get("CMS_TRADE_CD")
	       		,OLD_BANK_CD 		: oldData.get("IF_PAYMENT_BANK_CD")      		
	       		,ACCEPT_SEQ 		: me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
	       		,OLD_ACCEPT_SEQ 	: me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
	       		,REC_NAME 			: me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_NAME")
	       		,TEMPLE_CD          : me.getViewModel().getStore('ds_recAmt').getAt(0).get("TEMPLE_CD")
	       		,DISPLAY            : newData.get("newData")
	       	};
	    	me.getViewModel().getStore('ds_cmsinfo').add(data);
    	}else{
    		var data ={
   	       		 BUNNAB_DAY     	: newData.get("CMS_PAYMENT_DAY") 
   	       		,ACCOUNT_NUMBER 	: newData.get("IF_PAYMENT_ACCOUNT") 
   	       		,ACCOUNT_SEQ 		: newData.get("ACCOUNT_SEQ")
   	       		,CMS_TRADE_CD 		: newData.get("CMS_TRADE_CD")
   	       		,BANK_NO 			: newData.get("IF_PAYMENT_BANK_CD")
   	       		,BANK_CD 			: newData.get("IF_PAYMENT_BANK_CD")
   	       		,BANK_NM 			: newData.get("BANK_NM")
   	       		,OLD_ACCOUNT_NUMBER : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCOUNT_NUMBER")
   	       		,OLD_ACCOUNT_SEQ 	: me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCOUNT_SEQ")
   	       		,OLD_CMS_TRADE_CD 	: me.getViewModel().getStore('ds_recAmt').getAt(0).get("CMS_TRADE_CD")
   	       		,OLD_BANK_CD 		: me.getViewModel().getStore('ds_recAmt').getAt(0).get("BANK_NO")      		
   	       		,ACCEPT_SEQ 		: me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
   	       		,OLD_ACCEPT_SEQ 	: me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
   	       		,REC_NAME 			: me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_NAME")
   	       		,TEMPLE_CD          : me.getViewModel().getStore('ds_recAmt').getAt(0).get("TEMPLE_CD")
   	       		,DISPLAY            : newData.get("newData")
   	       	};
   	    	me.getViewModel().getStore('ds_cmsinfo').add(data);
    	}
    	
    	me.lookupReference('txt_CmsTradeCd').setExValue(exCommon.getRepVal(   newData.get("CMS_TRADE_CD") ));        
        me.lookupReference('txt_bunnabDay').setExValue(exCommon.getRepVal( newData.get("CMS_PAYMENT_DAY") ));
        me.lookupReference('txt_bank').setExValue(exCommon.getRepVal( newData.get("BANK_NM") ));
        me.lookupReference('txt_accountNumber').setExValue(exCommon.getRepVal( newData.get("IF_PAYMENT_ACCOUNT") ));
        me.lookupReference('txt_accountSeq').setExValue(exCommon.getRepVal( newData.get("ACCOUNT_SEQ") ));
    	
    },
    onCmsRec : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_cmsinfo'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC000P_02/saveCmsInfo.suvila'
    		,me.onCmsRecCallback
    		,false
    		,'접수계좌정보를 변경 하시겠습니까?'
    	);
    },
    onCmsRecCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_cmsinfo').clearData();
    		me.lookupReference('lc_sindoCmsInfo').setExValue("");
    	}
    	exCommon.fnGridSaveCallback(me, success, action, 'ds_cmsinfo'  );
    },
    onSave : function(rec_cancel){
    	var me = this;
    	
    	if( me.inCheckEnd() )return;
    
    	var isUpdate = exCommon.ChangeCount('ds_misuRec' , me);
    	
    	if(isUpdate == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림',  "변동된 내역이 없습니다.");    				
    		},50);
    		return false;
    	}// isUpdate
    	
    	if(rec_cancel != 'rec_cancel'){
    		rec_cancel = ''
    	}
    	
    	var totAmt = 0;
    	var misuCnt = me.getViewModel().getStore('ds_misuRec').getCount();
    	for(var i = 0; i<misuCnt ; i++){
    		if( me.getViewModel().getStore('ds_misuRec').getAt(i).get("SQL_MODE") == "I" ){
    			totAmt +=   exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") );
    		}
    	}// for
    	
    	
    	me.getViewModel().getStore('ds_sms').clearData();
    	
    	var SMS_YN = me.lookupReference('cb_smsYn').getExValue();
    	if(SMS_YN  == "T" && totAmt > 0){
    		
    		var txt_MobiletelNo1 = exCommon.getRepVal( me.lookupReference('txt_MobiletelNo1').getExValue() );
    		var txt_MobiletelNo2 = exCommon.getRepVal( me.lookupReference('txt_MobiletelNo2').getExValue() );
    		var txt_MobiletelNo3 = exCommon.getRepVal( me.lookupReference('txt_MobiletelNo3').getExValue() );
    		var txt_MobiletelNo  = txt_MobiletelNo1 + "" + txt_MobiletelNo2 + "" + txt_MobiletelNo3;
    		
    		if(txt_MobiletelNo1 == ""){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',  "발송전화번호를 입력하시기 바랍니다.");    				
        		},50);
    			me.lookupReference('txt_MobiletelNo1').focus();
        		return false;
    		}
    		if(txt_MobiletelNo2 == ""){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',  "발송전화번호를 입력하시기 바랍니다.");    				
        		},50);
    			me.lookupReference('txt_MobiletelNo2').focus();
        		return false;
    		}
    		if(txt_MobiletelNo3 == ""){
    			setTimeout(function(){
        			Ext.Msg.alert('알림',  "발송전화번호를 입력하시기 바랍니다.");    				
        		},50);
    			me.lookupReference('txt_MobiletelNo3').focus();
        		return false;
    		}
    		
    		var l_temple_cd  = exCommon.user.templeCd;
    		var l_temple_nm  = exCommon.user.templeNm;
    		var l_accept_gbn = exCommon.recCodeToSmsCode( me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN")  );

    		var TR_MESSAGE   = "["+l_temple_nm+"] " + me.getViewModel().getStore('ds_recAmt').getAt(0).get("PROD_NAME")+" ";
    		if( ("000008" ==  l_temple_cd ||  "000089" ==  l_temple_cd) && l_accept_gbn == "8" ){
    			TR_MESSAGE   = "["+l_temple_nm+"] " + me.getViewModel().getStore('ds_recAmt').getAt(0).get("PROD_NAME_ORI")+" ";
    		}
    		TR_MESSAGE  += exCommon.setNumberFormat(totAmt)+"원 보시하셨습니다. 성불하세요.";
    		
    		var data = {
    				 TR_ID 		  : "SUNAB"
    				,TR_SENDSTAT  : "0"
   					,TR_PHONE 	  : txt_MobiletelNo
   					,TR_DEST_INFO : me.getViewModel().getStore('ds_recAmt').getAt(0).get("PROPOSAL_BUD_NM")+"^"+txt_MobiletelNo
   					,TR_CALLBACK  : exCommon.user.tel
   					,TR_ETC1 	  : l_temple_cd
   					,TR_ETC2 	  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("PROPOSAL_BUD_NO")
   					,TR_ETC3 	  : "SMSREC"
   					,TR_ETC4 	  : l_accept_gbn
   					,TR_ETC5 	  : exCommon.user.userId
   					,TR_MESSAGE   : TR_MESSAGE
   					,TR_SMS_YN    : "T"
    		}// data
    		me.getViewModel().getStore('ds_sms').add( data );
    		
    	}// SMS_YN
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_p').getValue().rdo_ApprovalGbn_p;
		if(rdo_ApprovalGbn == 2){
			me.inValidate2("2");
			
			console.log('카드결제창');
			
			var recAmtRecord = me.getViewModel().getStore('ds_recAmt').getAt(0).data;
			console.log('recAmtRecord = ', recAmtRecord);
			
			var array        = new Array();
			var records      = me.getViewModel().getStore('ds_misuRec').getNewRecords();
			for (var i=0; i < records.length; i++){
				array[i] = records[i].data;
				array[i].PAYMENT_AMT    = array[i].AMOUNT; 
				array[i].PgCardPopupGbn = '5';
				array[i].ACCEPT_DATE    = recAmtRecord.ACCEPT_DATE;
				array[i].ACCEPT_GBNTXT  = recAmtRecord.PROD_NAME;
				array[i].CARD_BUD_NO    = recAmtRecord.PROPOSAL_BUD_NO;
				array[i].rec_cancel     = rec_cancel;
				array[i].MOBILE_TELNO1  = exCommon.getRepVal(recAmtRecord.MOBILE_TELNO1, '')
				array[i].MOBILE_TELNO2  = exCommon.getRepVal(recAmtRecord.MOBILE_TELNO2, '')
				array[i].MOBILE_TELNO3  = exCommon.getRepVal(recAmtRecord.MOBILE_TELNO3, '')
				array[i].BUYER_NAME     = exCommon.getRepVal(recAmtRecord.PROPOSAL_BUD_NM, '')
		    }
			
			setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.cardPay',  array, me.onSaveCard);
	       	},100);
			return;
			
		}else{
			
			me.getViewModel().getStore('ds_pgCardInfo').clearData();
			me.inValidate2("1");
			
			Ext.MessageBox.confirm('알림', "저장하시겠습니까?", function(btn){
        		if (btn == 'yes') {
        			me.inApproval(rec_cancel);
        		}
        	});
		}
    },
    onSaveCard  : function(cardPayInfo, me){
    	
		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
		me.getViewModel().getStore('ds_pgCardInfo').add(cardPayInfo);
		
		me.inApproval(cardPayInfo.rec_cancel);
		
	},
    inApproval : function(rec_cancel){
    	var me = this;
    	
    	exCommon.addParamSetting(me, 'ds_misuRec'		, 'ds_misuRec');
    	exCommon.uptParamSetting(me, 'ds_misuRec'		, 'ds_misuRecUpt');
		exCommon.addParamSetting(me, 'ds_sms'			, 'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'	, 'ds_pgCardInfo');
    	
    	var ACCEPT_GBN    = me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
    	var LIMIT_YN      = me.getViewModel().getStore('ds_recAmt').getAt(0).get("LIMIT_YN");
    	var APPROVAL_GBN  = me.getViewModel().getStore('ds_recAmt').getAt(0).get("APPROVAL_GBN");
    	var WEPAECNT      = me.getViewModel().getStore('ds_recAmt').getAt(0).get("WEPAECNT"); // 연등일때 기간
    	
    	/*var totAmt  = 0;
    	for(var i = 0; i< me.getViewModel().getStore('ds_misuRec').getCount() ; i++){
    		totAmt +=   exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") );
    	}// for
*/    	
    	if( (ACCEPT_GBN == "4" && APPROVAL_GBN == "3" && WEPAECNT > 1 ) || (ACCEPT_GBN == "2" && LIMIT_YN == "F") || ACCEPT_GBN == "9" || ACCEPT_GBN == "13"){
    		setTimeout(function(){
    			
    			if(rec_cancel == 'rec_cancel'){
    				me.callForm(me, '/rec/REC000P_02/saveLimit.suvila', me.saveLimitRecCancelCallback , false);
    			}else{
    				me.callForm(me, '/rec/REC000P_02/saveLimit.suvila', me.saveLimitCallback , false);
    			}
    			
    		},10);
    	}
    	else if( ACCEPT_GBN == "2" && LIMIT_YN == "T" ){
    		var misuAmt = new Number( me.lookupReference('me_misuAmt').getExValue());
			//var jubAmt  = new Number(totAmt);
			 
			if(misuAmt <= 0 ){
				Ext.MessageBox.confirm('알림', "납부금액이 미수금액보다 많습니다. <br/>수납하시겠습니까?", function(btn){
	        		if (btn == 'yes') {
	        			setTimeout(function(){
	            			
	            			if(rec_cancel == 'rec_cancel'){
	            				me.callForm(me, '/rec/REC000P_02/save.suvila', me.saveUnLimitRecCancelCallback , false);
	            			}else{
	            				me.callForm(me, '/rec/REC000P_02/save.suvila', me.saveUnLimitCallback , false);
	            			}
	            			
	            		},10);
	        		}
	        	});
			}else{
				setTimeout(function(){
					
					if(rec_cancel == 'rec_cancel'){
						me.callForm(me, '/rec/REC000P_02/save.suvila', me.saveUnLimitRecCancelCallback , false);
        			}else{
        				me.callForm(me, '/rec/REC000P_02/save.suvila', me.saveUnLimitCallback , false);
        			}
        		},10);
			}
			
    	}else{
    		
    	}
    	
    	//  LIMIT_YN ==> T(2,4) .  save
    },
    saveUnLimitRecCancelCallback : function(me, success, form, action){
    	console.log('saveUnLimitRecCancelCallback = ',success );
    	if(success) {
    		
    		var totAmt = 0;
        	for(var i = 0; i<me.getViewModel().getStore('ds_misuRec').getCount() ; i++){
        		totAmt +=   exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") );
        	}// fo
    		
    		var totPaymentPlanAmt = new Number( me.lookupReference('me_totPaymentPlanAmt').getExValue() );
    		me.lookupReference('me_misuAmt').setExValue(totPaymentPlanAmt - totAmt);
    		
    		me.getViewModel().getStore('ds_misuRec').removeAll();
    		me.inSelectMisu();
    		setTimeout(function(){
    			me.onRecCancel();
    		},500);
    	}
    },
    saveUnLimitCallback : function(me, success, form, action){
    	console.log('saveUnLimitCallback = ',success );
    	exCommon.fnGridSaveCallback(me, success, action,'ds_misuRec');
    	if(success) {
    		
    		var totAmt = 0;
        	for(var i = 0; i<me.getViewModel().getStore('ds_misuRec').getCount() ; i++){
        		totAmt +=   exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") );
        	}// fo
    		
    		var totPaymentPlanAmt = new Number( me.lookupReference('me_totPaymentPlanAmt').getExValue() );
    		me.lookupReference('me_misuAmt').setExValue(totPaymentPlanAmt - totAmt);
    		
    		me.getViewModel().getStore('ds_misuRec').removeAll();
    		me.inSelectMisu();
    	}
    },
    saveLimitRecCancelCallback : function(me, success, form, action){
    	console.log('saveLimitRecCancelCallback = ',success );
    	
    	if(success) {
    		me.getViewModel().getStore('ds_misuRec').removeAll();
    		me.inSelectMisu();
    		
    		setTimeout(function(){
    			me.onRecCancel();
    		},500);
    	}
    },
    saveLimitCallback : function(me, success, form, action){
    	console.log('saveLimitCallback = ',success );
    	
    	exCommon.fnGridSaveCallback(me, success, action,'ds_misuRec');
    	if(success) {
    		me.getViewModel().getStore('ds_misuRec').removeAll();
    		me.inSelectMisu();
    	}
    },
    inValidate2 : function(strGbn){
    	var me = this;

    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_p').getValue().rdo_ApprovalGbn_p;
    	var misuCnt 		= me.getViewModel().getStore('ds_misuRec').getCount();
    	
    	if (strGbn=="2"){
    		for(var i = 0; i<misuCnt ; i++){
    			
    			var SQL_MODE 	 = exCommon.getRepVal(me.getViewModel().getStore('ds_misuRec').getAt(i).get("SQL_MODE"));
    			var AMOUNT 		 = exCommon.getRepNum(me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT"));
    			var APPROVAL_GBN = exCommon.getRepVal(me.getViewModel().getStore('ds_misuRec').getAt(i).get("APPROVAL_GBN"));
    			
    			if( SQL_MODE == "I" ){
    				
    				if(AMOUNT < 0){
	    				setTimeout(function(){
	            			Ext.Msg.alert('알림',  "카드 수납시 금액이 0원보다 작을수 없습니다.");    				
	            		},50);
	            		return false;
    				}
            		
            		if(APPROVAL_GBN == "1" || APPROVAL_GBN == "4"){
        				setTimeout(function(){
                			Ext.Msg.alert('알림',  "현금,무통장,카드를 동시에 수납할 수 없습니다.");    				
                		},50);
                		return false;
        			}
            		me.getViewModel().getStore('ds_misuRec').getAt(i).set("APPROVAL_GBN", 2);
    			}// SQL_MODE
    			
    			
    		}// for
    		
    	}else{
    		for(var i = 0; i<misuCnt ; i++){
    			var SQL_MODE 	 = exCommon.getRepVal(me.getViewModel().getStore('ds_misuRec').getAt(i).get("SQL_MODE"));
    			if( SQL_MODE == "I" ){
    				me.getViewModel().getStore('ds_misuRec').getAt(i).set("APPROVAL_GBN", rdo_ApprovalGbn);
    			}
    		}// for
    	}
    	
    },
    onRecCancel : function(){
    	var me = this;
    	
    	if( me.inCheckEnd() )return;
    	
    	var isUpdate = exCommon.ChangeCount('ds_misuRec' , me);
    	

    	var totAmt  = 0;
    	var misuCnt = me.getViewModel().getStore('ds_misuRec').getCount();
    	for(var i = 0; i<misuCnt ; i++){
    		totAmt +=   exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") );
    	}// for
    	
    	if( totAmt > 0){
    		exCommon.msgAlert("납부 총금액이 0원이어야 취소가 가능합니다.");
    		return false;
    	}
    	
    	if( isUpdate > 0 && totAmt > 0){
    		//me.onSave();
    		exCommon.msgAlert("변경내역이 있습니다 저장후 접수취소 가능합니다.");
    		return false;
    	}
    	
    	
    	if( isUpdate > 0 && totAmt == 0){
    		console.log('isUpdate > 0 && totAmt');
    		me.onSave('rec_cancel');
    		return false;
    	}
    	
    	
    	var rsQue  = "";
    	var remark = "";
    	//Ext.MessageBox.confirm('알림', "접수를 취소 하시겠습니까?", function(btn){
    	Ext.Msg.prompt('알림', '접수를 취소 하시겠습니까?', function(btn, rtn) {
    		console.log('btn = ', btn);
    		console.log('rtn = ', rtn);
    		if (btn == 'ok') {
    			
    			me.getViewModel().getStore('ds_sms').clearData();
    			me.getViewModel().getStore('ds_recCancel').clearData();
    			
    			var SMS_YN = me.lookupReference('cb_smsYn').getExValue();
    	    	if(SMS_YN  == "T"){
    	    		var TR_MESSAGE  = "["+exCommon.user.templeNm+"] " + me.getViewModel().getStore('ds_recAmt').getAt(0).get("PROD_NAME")
    	    			TR_MESSAGE  =TR_MESSAGE +" 동참(예약)이 취소되었습니다. 성불하세요.";
    	    		
    	    		
    	    		
    	    		var MOBILE_TELNO1 = me.lookupReference('txt_MobiletelNo1').getExValue();
    	        	var MOBILE_TELNO2 = me.lookupReference('txt_MobiletelNo2').getExValue();
    	        	var MOBILE_TELNO3 = me.lookupReference('txt_MobiletelNo3').getExValue();
    	        	var MOBILE_TELNO  = MOBILE_TELNO1 + "" + MOBILE_TELNO2 + "" + MOBILE_TELNO3;
    	        	
    	    		var data = {
	       				 TR_ID 		  : "1"
	       				,TR_SENDSTAT  : "0"
	  					,TR_PHONE 	  : MOBILE_TELNO
	  					,TR_DEST_INFO : me.getViewModel().getStore('ds_recAmt').getAt(0).get("PROPOSAL_BUD_NM")+"^"+MOBILE_TELNO
	  					,TR_CALLBACK  : exCommon.user.tel
	  					,TR_ETC1 	  : exCommon.user.templeCd
	  					,TR_ETC2 	  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("PROPOSAL_BUD_NO")
	  					,TR_ETC3 	  : "SMSREC"
	  					,TR_ETC4 	  : "10"
	  					,TR_ETC5 	  : exCommon.user.userId
	  					,TR_MESSAGE   : TR_MESSAGE
	  					,TR_SMS_YN    : "T"
	  					,ACCEPT_SEQ : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
	  	    	    	,SEQ 		: me.getViewModel().getStore('ds_recAmt').getAt(0).get("SEQ")
	  	    	    	,ACCEPT_GBN : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN")
	    			}// data
	    			me.getViewModel().getStore('ds_sms').add( data );
    	    	}//  SMS_YN
    			
    	    	var data ={
    	    		 TEMPLE_CD  : exCommon.user.templeCd
    	    		,ACCEPT_SEQ : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
    	    		,SEQ 		: me.getViewModel().getStore('ds_recAmt').getAt(0).get("SEQ")
    	    		,ACCEPT_GBN : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN")
    	    		,REMARK 	: "[취소사유 : "+rtn+"]"
    	    	}
    	    	me.getViewModel().getStore('ds_recCancel').add( data );
    	    	
    	    	
    	    	exCommon.addParamSetting(me, 'ds_sms'		, 'ds_sms');
    			exCommon.addParamSetting(me, 'ds_recCancel'	, 'ds_recCancel');
    	    
    			setTimeout(function(){
        			me.callForm(me, '/rec/REC000P_02/recCancel.suvila', me.onRecCancelCallback , false);
        		},10);
    	    	
    		}
    	});
    },
    onRecCancelCallback : function(me, success, form, action){
    	console.log('onRecCancelCallback = ',success );
    	if(success){    		
    		me.getView().destroy();
    	}
    },
    onLightOut : function(){
    	var me = this;
    	
    	var lightInfo = me.getViewModel().getStore('ds_lightOut').getAt(0);
    	
    	if( lightInfo.get("CLOSE_YN") == "T" ){
    		exCommon.msgAlert('소등된 상태입니다.');
    		return false;
    	}
    	
    	lightInfo.set("CLOSE_YN", "T");
    	
    	exCommon.fnGridSaveAll(
      		 me
      		,'ds_lightOut'
      		,'newData'
      		,'uptData'
      		,'delData'
      		,'/rec/REC000P_02/saveLightOut.suvila'
      		,me.onLightOutCallback
      		,false
      		,'소등하시겠습니까?'
      	);
    },
    onLightOutCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_lightOut');
    },
    onSaveRemark : function(){
    	var me = this;
    	
    	var a_m = me.lookupReference('ta_memo').getExValue();
    	var a_r = me.lookupReference('ta_remark').getExValue();
    	
    	me.getViewModel().getStore('ds_recAmt').getAt(0).set("MEMO"  , a_m);
    	me.getViewModel().getStore('ds_recAmt').getAt(0).set("REMARK", a_r);
    	
    	exCommon.fnGridSaveAll(
     		 me
     		,'ds_recAmt'
     		,'newData'
     		,'uptData'
     		,'delData'
     		,'/rec/REC000P_02/saveRemark.suvila'
     		,me.onSaveRemarkCallback
     		,false
     		,'메모를 저장하시겠습니까?'
     	);
    },
    onSaveRemarkCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_recAmt');
    },
    onAdd : function(){
    	var me = this;
    	
    	if( me.inCheckEnd() )return;
    	
    	var v_AG =  me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
    	
    	console.log( v_AG );
    	
    	if(v_AG == "2" || v_AG == "4" || v_AG == "12" || v_AG == "14" || v_AG == "8"){
    		
    		
    		if( exCommon.getRepVal( me.getViewModel().getStore('ds_recAmt').getAt(0).get("CLOSE_YN") )  != "T" ){
    			var data ={
   	        		 TEMPLE_CD 	  : exCommon.user.templeCd
   	        		,ACCEPT_SEQ   : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
   	        		,SEQ 		  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("SEQ")        		        	
   	        		,SQL_MODE     : 'I'
   	        		,EDIT_MODE    : 'T'
   	        	}
   	        	me.getViewModel().getStore('ds_misuRec').add(data);
    			
    			me.lookupReference('tr_sunab3_a').getView().select( me.getViewModel().getStore('ds_misuRec').getCount()-1 );
    			me.lookupReference('tr_sunab3_a').plugins[0].startEditByPosition({
                    row    : me.getViewModel().getStore('ds_misuRec').getCount()-1,
                    column : 3
                });
    			
    			return;
    		}
    		
    		console.log(2,' = ' +me.inGetApprovSumAmt('2'));
    		console.log(1,' = ' + me.inGetApprovSumAmt('1'));
    		
    		if( me.inGetApprovSumAmt('2') >  0 ){
    			setTimeout(function(){
    				Ext.Msg.alert('알림',  '카드결재된 건이 있습니다.<br>먼저 카드 취소부터 해주십시오!');    				
    			},50);
    			return;
    		}else if( me.inGetApprovSumAmt('1') !=  0 ){
    			
    			Ext.MessageBox.confirm('알림', '소등처리된 경우입니다. <br>접수취소를 위한 금액처리를 하시겠습니까?', function(btn){  
    		        if (btn == 'yes') { 
    		        	
    		        	var data ={
    		        		 TEMPLE_CD 	  : exCommon.user.templeCd
    		        		,ACCEPT_SEQ   : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
    		        		,SEQ 		  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("SEQ")
    		        		,APPROVAL_GBN : 1
    		        		,AMOUNT 	  : me.inGetApprovSumAmt * (-1)
    		        		,SQL_MODE     : 'I'
    		        		,EDIT_MODE    : 'T'
    		        	}
    		        	me.getViewModel().getStore('ds_misuRec').add(data);
    		        	me.lookupReference('tr_sunab3_a').getView().select( me.getViewModel().getStore('ds_misuRec').getCount()-1 );
    		        	me.lookupReference('tr_sunab3_a').plugins[0].startEditByPosition({
    		                row: me.getViewModel().getStore('ds_misuRec').getCount()-1,
    		                column: 3
    		            });
    		        	
    		        	
    		        }// yes
    		    });
    		}
    		
    	}else{
    		var data ={
        		 TEMPLE_CD 	  : exCommon.user.templeCd
        		,ACCEPT_SEQ   : me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_SEQ")
        		,SEQ 		  : me.getViewModel().getStore('ds_recAmt').getAt(0).get("SEQ")        		        	
        		,SQL_MODE     : 'I'
        	}
        	me.getViewModel().getStore('ds_misuRec').add(data);
    		me.lookupReference('tr_sunab3_a').getView().select( me.getViewModel().getStore('ds_misuRec').getCount()-1 );
    		me.lookupReference('tr_sunab3_a').plugins[0].startEditByPosition({
                row    : me.getViewModel().getStore('ds_misuRec').getCount()-1,
                column : 3
            });
    		
    	}
    },
    inGetApprovSumAmt : function (strApprTy){
    	var me = this;
    	var totAmt = 0;
    	
    	var cnt = me.getViewModel().getStore('ds_misuRec').getCount();
    	
    	for(var row=0; row<cnt; row++){
    		
    		var APPROVAL_GBN = me.getViewModel().getStore('ds_misuRec').getAt(row).get("APPROVAL_GBN");
    		
			if( APPROVAL_GBN == strApprTy){
				totAmt +=  exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(row).get("AMOUNT") );
			}
    	}// for
    	
    	return totAmt;
    },
    onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	var SQL_MODE   = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("SQL_MODE");
    	var EDIT_MODE  = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("EDIT_MODE");
    	var LIMIT_YN   = me.getViewModel().getStore('ds_recAmt').getAt(0).get("LIMIT_YN");
    	var ACCEPT_GBN = me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
    	
    	
    	if(LIMIT_YN == 'T' && ACCEPT_GBN == '2'){
    		
    		
    		if( (context.colIdx == 3 && EDIT_MODE == "T" && SQL_MODE == "I") || context.colIdx == 5	){
	    		return true;
	    	}else{
	    		return false;
	    	}
    	}else{
    		if( (context.colIdx == 7 && SQL_MODE == "I") ){
	    		return true;
	    	}else{
	    		return false;
	    	}
    	}
    },
    onAfteredit : function  ( editor, context, eOpts ) {
    	var me = this;
    	me.inMisuCalc();
    },
    onPrint : function(){
    	var me = this;
    	var record = me.getViewModel().getStore('ds_temp').getAt(0).data;
    	
    	console.log('rec000p_02 onPrint', record.ACCEPT_GBN );
    	
    	if(record.ACCEPT_GBN == '1'){ 
    		me.openPopup('ExFrm.view.rec.rec000p_02_1',  record, null);
    	}
    	else if(record.ACCEPT_GBN == '2'){ 
    		me.openPopup('ExFrm.view.rec.rec000p_02_2',  record, null);
    	}
    	else if(record.ACCEPT_GBN == '4'){
    		me.openPopup('ExFrm.view.rec.rec000p_02_4',  record, null);
    	}
    	else if(record.ACCEPT_GBN == '5'){ 
    		me.openPopup('ExFrm.view.rec.rec000p_02_5',  record, null);
    	}
    	else if(record.ACCEPT_GBN == '6'){ 
    		me.openPopup('ExFrm.view.rec.rec000p_02_6',  record, null);
    	}
    	else if(record.ACCEPT_GBN == '7'){ 
    		me.openPopup('ExFrm.view.rec.rec000p_02_7',  record, null);
    	}
    	else if(record.ACCEPT_GBN == '8'){ 
    		me.openPopup('ExFrm.view.rec.rec000p_02_8',  record, null);
    	}
    	else if(record.ACCEPT_GBN == '13'){
    		me.openPopup('ExFrm.view.rec.rec000p_02_13',  record, null);
    	}
    	else if(record.ACCEPT_GBN == '14'){
    		me.openPopup('ExFrm.view.rec.rec000p_02_14',  record, null);
    	}
    	else{
    		exCommon.msgAlert('해당접수는 출력 할 수 없습니다.');
    	}
    	return;
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        console.log(clickedDataIndex);
        console.log(clickedColumnName);
        
        if(clickedDataIndex == 'CANCELGBN' || clickedColumnName == '취소'){
        	console.log(11);
        	console.log(record);
        	
        	
        	
        	var strAPPROVAL_GBN = record.get("APPROVAL_GBN");
    		var strAMOUNT       = new Number(record.get("AMOUNT"));
    		
    		console.log('strAPPROVAL_GBN = ', strAPPROVAL_GBN);
    		console.log('strAMOUNT = ', strAMOUNT);
    		
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
    		/*me.getViewModel().getStore('ds_misuRec').reload();*/
    		me.inSelectMisu();
    	}
    	
    }
    
    
})