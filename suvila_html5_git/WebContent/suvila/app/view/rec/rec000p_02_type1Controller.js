Ext.define('ExFrm.view.rec.rec000p_02_type1Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_02_type1',
    onInit:function(){
    	var me = this;
    },
    onAfterRender:function(){
    	console.log('onAfterRender');
    	var me = this;
    	
    },
    destroy: function () {
        console.log('rec destroy'); 
        this.receiveTo(null, false);
    },
    onCalled:function(record){
    	console.log('onCalled');
        var me = this;
        
        me.getViewModel().getStore('ds_recAmt').removeAll();
        me.getViewModel().getStore('ds_recAmt').add(record);
        
        me.getViewModel().getStore('ds_temp').removeAll();
        me.getViewModel().getStore('ds_temp').add(record);
        
        
        
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
            
            me.lookupReference('txt_smsYn').setExValue(exCommon.getRepVal( record.SMS_YN ));
            
            me.lookupReference('txt_approvalGbn').setExValue(exCommon.getRepVal( record.APPROVAL_GBN_NM ));
            me.lookupReference('txt_whajubosalNm').setExValue("");
            me.lookupReference('txt_kwonsunNo').setExValue("");
            
            
            console.log('record.ACCEPT_GBN = ', record.ACCEPT_GBN);
            
            if(record.ACCEPT_GBN == "5" || record.ACCEPT_GBN == "6"|| record.ACCEPT_GBN == "7"){
            	me.lookupReference('jesaInfo').setHidden(false);
            	var params ={
	               	 V_ACCEPT_SEQ : record.ACCEPT_SEQ
	               	,V_SEQ        : record.SEQ
	               	,V_ACCEPT_GBN : record.ACCEPT_GBN
	            } 
	            
            	me.inSelectMisu();
            	
	            setTimeout(function(){
	            	me.callStore(me, 'ds_jesaday', '', params ,null);
	       		},150);
            	
            	
            }else if(record.ACCEPT_GBN == "8"){
            	me.lookupReference('wepae_area').setHidden(false);
            	
            	var params ={
   	               	 V_ACCEPT_SEQ : record.ACCEPT_SEQ
   	               	,V_SEQ        : record.SEQ
   	               	,V_ACCEPT_GBN : record.ACCEPT_GBN
   	               	,V_EVENT_CD   : record.EVENT_CD
   	               	,V_EVENT_DATE : record.EVENT_DATE
   	               	,V_WEPAECNT   : record.WEPAECNT
   	            }
            	setTimeout(function(){
	               	me.callStore(me, 'ds_dongChamJa', '', params ,me.dsJesaCallback);
	       		},50);
            }else if(record.ACCEPT_GBN == "1"){
            	
            	var params = {
            		 V_ACCEPT_SEQ : record.ACCEPT_SEQ
       	            ,V_SEQ        : record.SEQ
            	}
            	setTimeout(function(){
	               	me.callStore(me, 'ds_pray_orgin', '', params ,me.dsPrayOrginCallback);
	       		},50);
            }else if(record.ACCEPT_GBN == "3"){
            	me.lookupReference('bulsa_area').setHidden(false);
            	
            	var param = {
        			V_SEQ        : record.SEQ
            	   ,V_ACCEPT_SEQ : record.ACCEPT_SEQ
            	   ,V_ACCEPT_GBN : '3'    		
            	   ,V_PROD_CODE  : record.PROD_CODE
            	   ,V_LIGHT_NO   : exCommon.getRepVal( record.LIGHT_NO )
            	   ,V_JUNGAK_CD  : exCommon.getRepVal( record.JUNGAK_CD )
            	}
            	
            	setTimeout(function(){
        			me.callStore(me, 'ds_lightOut', '', param ,me.IdLightOutCallback);    				
        		},250);
            	
            }else{
            	me.inSelectMisu();
            }
      
    },
    IdLightOutCallback : function(me, success, form, action){
    	me.inSelectMisu();
    	if(success  && me.getViewModel().getStore('ds_lightOut').getCount() > 0 ){
    		me.lookupReference('txt_bul_donchamja').setExValue( me.getViewModel().getStore('ds_lightOut').getAt(0).get("NAME_KOR") );
    	}
    },
    dsPrayOrginCallback : function(me, success, form, action){
    	me.inSelectMisu();
    	
    	if(success && me.getViewModel().getStore('ds_pray_orgin').getCount() > 0){
    		me.lookupReference('perPrayArea').setHidden(false);
    		var record = me.getViewModel().getStore('ds_pray_orgin').getAt(0);
    		
    		me.lookupReference('per_nm').setExValue( record.get("PER_NM") );
    		me.lookupReference('per_no').setExValue( record.get("PER_BUD_NO"));
    		me.lookupReference('per_memo').setExValue( record.get("ORGINATE"));    		
    	}
    	
    	console.log(me.getViewModel().getStore('ds_pray_orgin').getAt(0) );
    	
    },
    dsJesaCallback : function(me, success, form, action){
    	me.inSelectMisu();
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
    	
    	setTimeout(function(){
			me.callStore(me, 'ds_misuRec', '', param ,me.selectLimitCallback);    				
		},50);
    },
    selectLimitCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('tr_sunab3_a').getView().select( 0 );  
    		me.inMisuCalc();
    	}
    },
    inMisuCalc : function(){
    	
    	var me = this;
    	
		var totAmt  = 0;
    	var misuCnt = me.getViewModel().getStore('ds_misuRec').getCount();
    	for(var i = 0; i<misuCnt ; i++){
    		totAmt +=   exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") );
    	}// for
    	
    	me.lookupReference('me_totPaymentAmt').setExValue(totAmt);
    	
    	console.log('inMisuCalc = ' , totAmt);
    	var me_misuAmt = exCommon.getRepNum( me.lookupReference('me_totPaymentPlanAmt').getExValue() ) - totAmt;
    	me.lookupReference('me_misuAmt').setExValue(me_misuAmt);
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
    			}//
    			
    			
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
    onAdd : function(){
    	var me = this;
    	
    	var v_AG =  me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
    	
    	console.log( v_AG );
    	
    	
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
    		
    },
    on_cancel : function(){
    	var me = this;
    	
    	
    	var record = me.lookupReference('tr_sunab3_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	if(me.getViewModel().getStore('ds_misuRec').getNewRecords().length == 0  ||  exCommon.getRepVal(record.get("SQL_MODE")) != "I" ){
    		return false;
    	}
    	
    	Ext.MessageBox.confirm('알림', '자료를 취소하시겠습니까?', function(btn){  
	        if (btn == 'yes') { 
        		exCommon.gridRemove(me, 'tr_sunab3_a' , 'ds_misuRec' , false, true);
	        	me.inMisuCalc();
	        }// yes
	    });
    },
    onSave : function(rec_cancel){
    	var me = this;
    	
    
    	if(rec_cancel != 'rec_cancel'){
    		rec_cancel = ''
    	}
    	
    	
    	var isUpdate = exCommon.ChangeCount('ds_misuRec' , me);
    	
    	if(isUpdate == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림',  "변동된 내역이 없습니다.");    				
    		},50);
    		return false;
    	}// isUpdate
    	
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
    	
    	me.getViewModel().getStore('ds_pgCardInfo').clearData();
    	
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
    	
    	console.log('inApproval = ', rec_cancel);
    	
    	exCommon.addParamSetting(me, 'ds_misuRec'		, 'ds_misuRec');
    	exCommon.uptParamSetting(me, 'ds_misuRec'		, 'ds_misuRecUpt');
		exCommon.addParamSetting(me, 'ds_sms'			, 'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'	, 'ds_pgCardInfo');
    	
		setTimeout(function(){
			
			if(rec_cancel == 'rec_cancel'){
				me.callForm(me, '/rec/REC000P_02/save.suvila', me.saveUnLimitRecCancelCallback , false);
			}else{
				me.callForm(me, '/rec/REC000P_02/save.suvila', me.saveUnLimitCallback , false);
			}
		},10);
    },
    onRecCancel : function(){
    	var me = this;
    	
    	//if( me.inCheckEnd() )return;
    	
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
    	Ext.Msg.prompt('알림', '접수를 취소 하시겠습니까?', function(btn, rtn) {
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
    inApproval : function(rec_cancel){
    	var me = this;
    	
    	//console.log('inApproval = ', rec_cancel);
    	
    	exCommon.addParamSetting(me, 'ds_misuRec'		, 'ds_misuRec');
    	exCommon.uptParamSetting(me, 'ds_misuRec'		, 'ds_misuRecUpt');
		exCommon.addParamSetting(me, 'ds_sms'			, 'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'	, 'ds_pgCardInfo');
    	
		setTimeout(function(){
			
			if(rec_cancel == 'rec_cancel'){
				me.callForm(me, '/rec/REC000P_02/save.suvila', me.saveUnLimitRecCancelCallback , false);
			}else{
				me.callForm(me, '/rec/REC000P_02/save.suvila', me.saveUnLimitCallback , false);
			}
		},10);
    },
    saveUnLimitRecCancelCallback : function(me, success, form, action){
    	console.log('saveUnLimitCallback = ',success );
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
    onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	var SQL_MODE   = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("SQL_MODE");
    	var EDIT_MODE  = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("EDIT_MODE");
    	var LIMIT_YN   = me.getViewModel().getStore('ds_recAmt').getAt(0).get("LIMIT_YN");
    	var ACCEPT_GBN = me.getViewModel().getStore('ds_recAmt').getAt(0).get("ACCEPT_GBN");
    	
    	
		if( context.colIdx == 5 || (context.colIdx == 3 && SQL_MODE == "I") ){
    		return true;
    	}else{
    		return false;
    	}
    },
    onSmsChange : function(ele, newValue, oldValue){
    	var me  = this;
    	
    	me.lookupReference('mobileArea').setHidden(true);
    	
    	if(newValue == 'T'){
    		me.lookupReference('mobileArea').setHidden(false);
    		me.lookupReference('txt_MobiletelNo1').focus();
    	}
    },
    onAfteredit : function  ( editor, context, eOpts ) {
    	var me = this;
    	me.inMisuCalc();
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
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onCellSaveCallback: function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_sinCell').clearData();
    	}
    	exCommon.fnGridSaveCallback(me, success, action, 'ds_sinCell'  );
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
    onSmsGuide : function(){
    	var me = this;
    	
    	var record   = me.getViewModel().getStore('ds_recAmt').getAt(0);
    	var sin_name = record.get("PROPOSAL_BUD_NM");
    	var cellNum  = record.get("MOBILE_TELNO1")+""+record.get("MOBILE_TELNO2")+""+record.get("MOBILE_TELNO3");
    	
    	if( !(cellNum.length == 11 || cellNum.length== 10) ){
    		exCommon.msgAlert("sin_name+'님의 저장된 휴대폰 번호가없습니다.<br/>휴대폰 번호 저장후 발송가능합니다.");    		
    		return;		
    	}
    	
    	var templeCallback = exCommon.user.tel;
    	if(templeCallback == null || templeCallback == ""  ){
    		exCommon.msgAlert('회신번호 정보가 존재하지 않아 문자를 발송하수 없습니다.<br/>070-7860-7902로 회신번호 등록후 문자 발송 가능합니다.');
    		return;
    	}
    	
    	var rec_name = record.get("PROD_NAME");
    	var msg      = sin_name+ "님 "+rec_name;
    	var wepae    = "";
    	
    	var selSmsType = me.lookupReference('smsGuide').getExValue();
    	
    	if(selSmsType == "0" ){
    		exCommon.msgAlert('발송하실 문자 유형을 선택해주세요.');
    		return;
    	}
    	
    	var row =  me.getViewModel().getStore('ds_dongChamJa').getCount();
    	
    	
    	var PRE_EVENT_SEQ = "";
    	for(var i=0 ; i<row ; i++){
    		var EVENT_SEQ = me.getViewModel().getStore('ds_dongChamJa').getAt(i).get("EVENT_SEQ");
    		
    		if(PRE_EVENT_SEQ != EVENT_SEQ){
    			if(i == 0){
        			wepae += me.getViewModel().getStore('ds_dongChamJa').getAt(i).get("EVENT_SEQ");
        		}else{
        			wepae += ","+me.getViewModel().getStore('ds_dongChamJa').getAt(i).get("EVENT_SEQ");
        		}
    		}
    		
    		PRE_EVENT_SEQ = EVENT_SEQ;
    		
    	}// for i
    	
    	
    	if(selSmsType.value == "1"){
    		msg = 	msg + "\n위패번호 " + wepae+ " 접수하셨습니다.";
    	}else if(selSmsType == "2"){
    		var misuPrice = new Number(me.lookupReference('me_misuAmt').getExValue());
    		
    		if(misuPrice <= 0){
    			exCommon.msgAlert('미수금액이 없습니다.');
    			return;
    		}
    		msg =  msg  + "\n미수금액은 "+NumberComma(String(misuPrice))+"원입니다.";
    	}else if(selSmsType == "3"){
    		msg = 	msg + "\n위패번호는" + wepae+ " 입니다.";
    	}
    	
    	var smsData = {
    		 TR_ID        : "SUNAB"
    	    ,TR_SMS_YN    : "T"
    		,TR_SENDSTAT  : "0"
    		,TR_PHONE     : cellNum
    		,TR_DEST_INFO : sin_name+"^"+cellNum
    		,TR_CALLBACK  : exCommon.user.tel
    		,TR_ETC1      : exCommon.user.templeCd
    		,TR_ETC2      : record.get("PROPOSAL_BUD_NO")
    		,TR_ETC3      : "SMSREC"
    		,TR_ETC4      : exCommon.recCodeToSmsCode(me , record.get("ACCEPT_GBN"))
    		,TR_ETC5      : exCommon.user.userId
    		,TR_MESSAGE   : '['+exCommon.user.templeNm+']' + " " + msg
    	}
    	me.getViewModel().getStore('ds_sms').removeAll();
    	me.getViewModel().getStore('ds_sms').add(smsData);
    	
    	console.log('ds_sms = ', me.getViewModel().getStore('ds_sms').getAt(0));
    	
    	exCommon.addParamSetting(me , 'ds_sms'  , 'ds_sms');
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, '/rec/REC000P_02/sendGuideSms.suvila', me.onSmsGuideCallback , false);
    		}
    	});
    },
    onSmsGuideCallback: function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_sms');
    	if(success){
    		me.getViewModel().getStore('ds_sms').removeAll();
    	}
    },
    onPrint : function(){
    	var me = this;
    	
    	var record = me.getViewModel().getStore('ds_temp').getAt(0).data;
    	
    	
    	console.log('type1 = ',record.ACCEPT_GBN  );
    	
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
    		me.getViewModel().getStore('ds_misuRec').reload();
    	}
    	
    }
    
})