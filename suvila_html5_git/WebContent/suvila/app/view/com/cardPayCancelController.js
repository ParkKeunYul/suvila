Ext.define('ExFrm.view.com.cardPayCancelController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cardPayCancel',
    onCalled:function(params){
        var me = this;
        
        
        var pg_CHECKYYYY      = exCommon.getRepVal(params.CHECKYYYY, '');
        var pg_PAYMENT_YYYYMM = exCommon.getRepVal(params.PAYMENT_YYYYMM, '');
        var pg_SEQ            = exCommon.getRepVal(params.SEQ, '');
        
        me.lookupReference('pg_CHECKYYYY').setExValue(pg_CHECKYYYY);
        me.lookupReference('pg_PAYMENT_YYYYMM').setExValue(pg_CHECKYYYY);
        me.lookupReference('pg_SEQ').setExValue(pg_SEQ);
        
        
        setTimeout(function(){
     		me.callStore(me, 'ds_acceptGbn', '', null ,null);
     	},10);
        
        setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.dsMainCallback);
    	},550);
    },
    dsMainCallback : function(me, success, form, action){
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	var pg_flg = me.lookupReference('pg_flg').getExValue();
    	
    	if(rowCnt == 0 && pg_flg ==1 ){
    		exCommon.msgAlert( '이미 승인취소가 완료된 건입니다.' );
    		return;
    	}
    	
    	
    	var pg_CHECKYYYY      = exCommon.getRepVal(me.lookupReference('pg_CHECKYYYY').getExValue(), '');
    	var pg_PAYMENT_YYYYMM = exCommon.getRepVal(me.lookupReference('pg_CHECKYYYY').getExValue(), '');
    	var pg_SEQ            = exCommon.getRepVal(me.lookupReference('pg_SEQ').getExValue(), '');
    	
    	if(pg_CHECKYYYY == undefined || pg_CHECKYYYY == '') {
    		
    		if (pg_PAYMENT_YYYYMM.length > 0 ) {
    			for(var row = 0; row< rowCnt; row++){
    				var record = me.getViewModel().getStore('ds_main').getAt(row);
    				
    				var strACCEPT_SEQ    = record.get("ACCEPT_SEQ");
    		 		var strPaymentYYYYMM = record.get("PAYMENT_YYYYMM");
    		 		record.set("CHK". true)
    			}
    		}else{
    			if(pg_SEQ == undefined || pg_SEQ == '') {
    				me.getViewModel().getStore('ds_main').getAt(0).get("CHK",true);
    			}else{
    				for(var row = 0; row< rowCnt; row++){
        				var record = me.getViewModel().getStore('ds_main').getAt(row);
        				console.log('row = ', row);
        				
        				var strACCEPT_SEQ    = record.get("ACCEPT_SEQ");
        		 		var strPaymentYYYYMM = record.get("PAYMENT_YYYYMM");
        		 		record.set("CHK", true)
        			}
    			}
    		}// if
    	}else{
    		for(var row = 0; row< rowCnt; row++){
				var record = me.getViewModel().getStore('ds_main').getAt(row);
				
				var strACCEPT_SEQ    = record.get("ACCEPT_SEQ");
		 		var strPaymentYYYYMM = record.get("PAYMENT_YYYYMM");
		 		record.set("CHK", true)
			}
    	}
    	
    	setTimeout(function(){
     		me.callStore(me, 'ds_card_detail', '', null ,me.dsCardDetailCallback);
     	},50);
    	
    	console.log( me.getViewModel().getStore('ds_main').getAt(0) );
    },
    dsCardDetailCallback : function(me, success, form, action){
    	var detail = me.getViewModel().getStore('ds_card_detail').getAt(0).data;
    	console.log('detail = ',detail);
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onDestroy:function(){
        console.log('memoController', 'onDestroy');
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onCancel : function(){
    	var me = this;
    	
    	var g_row = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(g_row == 0){
    		exCommon.msgAlert( '승인된 자료가 없습니다.' );
    		return;
    	}
    	
    	var checkRecord = me.getViewModel().getStore('ds_main').findRecord('CHK', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '1개 이상선택후에 취소 가능합니다.' );
    		return;
    	}
    	
    	var fRecord =  me.getViewModel().getStore('ds_main').getAt(0);
    	
    	var diffDay          = fRecord.get("DIFFDAY");
    	var intPARTCANCELCNT = fRecord.get("PARTCANCELCNT");
    	var PARTCANCELCNT    = fRecord.get("PARTCANCELCNT");
    	
    	if (parseInt(intPARTCANCELCNT,10) > 5) {
      		exCommon.msgAlert( '부분취소는 5회까지만 가능합니다.' );
      		return;
      	}
    	
    	var ORG_TID = fRecord.get("ORG_TID");
    	if(ORG_TID == null || ORG_TID == undefined){
    		exCommon.msgAlert( '카드취소에 필요한 청보가 부족합니다<br/>다음 순서 신도를 접수시도후 1~2분후에 카드 결제취소 바랍니다.' );
    		return;
    	}
    	
    	
    	var iTotalCnt     = 0;
	  	var cancel_cnt    = 0;
	  	var card_tot_pay  = 0;
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		var CHK   = exCommon.getRepVal(g_record.get("CHK"), '');
    		
    		if(CHK  || CHK == true || CHK =='T'){
    			iTotalCnt = iTotalCnt + parseInt(g_record.get("AMOUNT"));
    			cancel_cnt++;
    		}// if
    		card_tot_pay = card_tot_pay + parseInt(g_record.get("AMOUNT"));
    	}// for i
    	
    	/*
    	$('#c_CancelAmt').val(iTotalCnt);
		$('#c_TID').val(ds_main.NameValue(1,"ORG_TID"));
		*/
    	
    	
    	var c_CancelAmt          = iTotalCnt;
    	var c_TID                = fRecord.get("ORG_TID");
    	var c_PartialCancelCode  = 1;
    	
    	if(cancel_cnt == g_row && PARTCANCELCNT == 0){
    		c_PartialCancelCode = 0;
    	}
    	
    	var info = {
    		 MID               : me.getViewModel().getStore('ds_card_detail').getAt(0).get("SUB2_TRADE_ID")
    		,TID               : fRecord.get("ORG_TID")
    		,CancelAmt         : iTotalCnt
    		,CancelMsg         : '고객취소'
    		,CancelPwd         : '123456'
    		,PartialCancelCode : c_PartialCancelCode
    	}
    	
    	me.getViewModel().getStore('ds_recAmt').removeAll();
    	
    	Ext.MessageBox.confirm('알림', '해당 수납의 신용카드 승인이 취소됩니다.<br>승인취소 하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			$.ajax({
    		        type        : "POST",
    		        dataType    : "json",
    		        url         : "/cardCancel_keyin.jsp",
    		        contentType : "application/x-www-form-urlencoded; charset=euc-kr", 
    		        data        : info,
    		        success : function(data) {
    		        	
    		        	if(data.resultCode ==2001 || data.resultCode  == "2001" || data.resultCode == 'V103'){
    		        		var addInfo = {
    		        			 TEMPLE_CD       : fRecord.get("TEMPLE_CD")
    		        			,PGCODE          : fRecord.get("PGCODE")
    		        			,CARDAUTHCODE    : fRecord.get("PGAUTHCODE")
    		        			,CANCELPRICE     : iTotalCnt.toString()
    		        			,ORG_TID         : fRecord.get("ORG_TID")
    		        			,TID             : data.tid
    		        			,RESULTMSG       : data.resultMsg
    		        			,PR_REMAINS      : (card_tot_pay - iTotalCnt).toString()
    		        			,PAY_TYPE        : 'keyin_cancel'
    		        			,GETRESULTPRICE  : iTotalCnt.toString()
    		        			,AUTHGBN         : '2'
    		        		}
    		        		me.getViewModel().getStore('ds_recAmt').add(addInfo);
    		        		
    		        		
    		        		exCommon.addParamSetting(me, 'ds_recAmt','ds_recAmt');
    		        		
    		        		var jsonNewData = [];
    		        		var records = me.getViewModel().getStore('ds_main').getUpdatedRecords();
    		        		for (var i=0; i < records.length; i++){
    		        	    	jsonNewData.push(records[i].data);
    		        	    }
    		        		me.lookupReference('ds_main').setExValue(Ext.encode(jsonNewData));
    		        		
	            			setTimeout(function(){
	            				me.callForm(me, '/asp/PgCard/save.suvila', me.onSaveCallback , false);
	            			},10);	
    		        		
    		        	}else{
    		        		exCommon.msgAlert( data.resultMsg );
    		        	}
    		        },
    		        error : function(e) {
    		        	exCommon.msgAlert( '결제 취소중  에러가 발생했습니다. 다시 시도해 주십시오.' );
  			        }
    			});
    		}
    	});
    },
    onSaveCallback : function(me, success, form, action){
    	var params = {
    		cancel : true
    	};
    	me.receiveTo(params, true);
    },
    onCard : function(){
    	var me  = this;
    }
    
})