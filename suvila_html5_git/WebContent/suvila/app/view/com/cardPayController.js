var myVar;
Ext.define('ExFrm.view.com.cardPayController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cardPay',
    onCalled:function(array){
        var me = this;
                
        console.log('array = ', array.length);
        
        var PgCardPopupGbn = array[0].PgCardPopupGbn;
        
        console.log('PgCardPopupGbn = ', PgCardPopupGbn);
        
        
        me.getViewModel().getStore('ds_main').removeAll();
        
        var flag = 	me.inCallGbn1(me , array);
        
        if(flag){
        	if(PgCardPopupGbn == 5){
            	me.lookupReference('CARD_BUD_NO').setExValue( array[0].CARD_BUD_NO );
            }else{
            	me.lookupReference('CARD_BUD_NO').setExValue( array[0].CARD_BUD_NO );
            }
            
            console.log('-->', me.lookupReference('cardTab').getActiveTab().title);
            
            me.inCardMyTimer();
            
            myVar=setInterval(function () {
            	me.inCardMyTimer();
            }, 1500);
        }else{
        	//exCommon.msgAlert('결제금액 0원은 카드결제를 할수 없습니다.');
        	
        	setTimeout(function() {
	    		Ext.MessageBox.confirm('알림', '결제금액 0원은 카드결제를 할수 없습니다.', function(btn){
	        		me.getView().destroy();
	        	});
        	}, 50);
        }
    	
    },
    inCallGbn1 : function(me, array){  
    	 //기존 일반접수 ,템플,영탑, 단체 접수등 일반적인 접수인경우
    	
    	var PAYMENT_AMT = 0;
        for(var i = 0 ; i <array.length ; i++ ){
        	me.getViewModel().getStore('ds_main').add( array[i] );
        	PAYMENT_AMT = PAYMENT_AMT + parseInt( array[i].PAYMENT_AMT );
        }
    	
        
        if(PAYMENT_AMT > 0 ){
        	me.lookupReference('tot_PaymentAmt').setExValue( PAYMENT_AMT );
            $('.cardpay_tot').html( NumberComma(PAYMENT_AMT) );
            $('.cardpay_tot2').html( NumberComma(PAYMENT_AMT) );
            return true;
        }else{
    		return false;
        }
        return false;
        
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_ip', '', null, me.dsIPCallback);
    	},50);
    	
    },
    dsIPCallback:function(me, success, records, operation){
    	setTimeout(function(){
    		me.callStore(me, 'ds_card_detail', '', null, null);
    	},50);
    },
    onAfterRender:function(){
    	var me = this;
    	var today = parseInt(exCommon.setDateFormat( exCommon.getNowDate() ).substr(0,4));
    	
    	
    	var s = today - 1;
    	var e = today + 10;
    	
    	
    	
    	var data ={
   			 CODE : ''
   			,NAME : '선택'
   		}
   		me.getViewModel().getStore('ds_year').add( data );
    	
    	for (var i= s ; i <= e; i++) {
    		var yValue = i.toString().substring(4,2);
    		
    		var data ={
    			 CODE : yValue
    			,NAME : yValue
    		}
    		me.getViewModel().getStore('ds_year').add( data );
    	}		
    	
    	me.lookupReference('sel_cardexpy').setExValue( '');
    	
    	
    	if(me.inGetBrowerType()){
    		me.lookupReference('cardTab').setActiveTab(0);
    	}else{
    		me.lookupReference('cardTab').setActiveTab(1);
    	}
    },
    onClose : function(){
    	var me = this;
    	
    	clearInterval(myVar);
    	me.getView().destroy();
    },
    onDestroy:function(){
    	console.log('onDestroy');
    	console.log('onDestroy');
    	console.log('onDestroy');
    	clearInterval(myVar);
    },
    inGetBrowerType : function(){
    	var agt = navigator.userAgent.toLowerCase();
    	
    	var flag = false;
    	
    	if(agt.indexOf('mise') != -1 || agt.indexOf('rv:11.0') != -1){
    		flag = true;
    	}
    	return true;
    },
    onlyNumber : function(me2, e, eOpts ){
    	var me = this;
    	
    	try{
    		var  textNm = me2.reference;
    		
    		var txtTelno = exCommon.getRepVal(me.lookupReference(textNm).getExValue(),"");
        	
        	if( !(e.keyCode >= 48 && e.keyCode<= 57)){
        		txtTelno = txtTelno.replace(/[^0-9]/g,"");
        	}
        	me.lookupReference(textNm).setExValue( txtTelno );
        	
        	if(txtTelno.length > 16){
        		me.lookupReference(textNm).setExValue( txtTelno.substr(0,16) );
        	}
        	
    	}catch (e) {}
    },
    onTabChange : function(tabPanel, tab){
    	//console.log('onTabChange = ', tabPanel);
    	//console.log('onTabChange = ', tab.title);
    	var me = this;
    	
    	/*
    	if( !me.inGetBrowerType() ){
    		me.lookupReference('cardTab').setActiveTab(1);
    		exCommon.msgAlert('자동입력은 인터넷 익스플로러(IE)에서만 가능합니다.');
    	}
    	*/
    	var tot_PaymentAmt = me.lookupReference('tot_PaymentAmt').getExValue(  );
    	if(tab.title == '자동입력'){
    		me.lookupReference('hdn_CardRead').focus();
            $('.cardpay_tot2').html( NumberComma(tot_PaymentAmt) );
    	}else{
    		me.lookupReference('cardNum1').focus();
    		$('.cardpay_tot').html( NumberComma(tot_PaymentAmt) );
    	}
    },
    onCardKeyIn : function(){
    	var me = this;
    	console.log('onCardKeyIn = ');
    	
    	var tot_PaymentAmt = me.lookupReference('tot_PaymentAmt').getExValue(  );
    	var sel_cardquota2 = me.lookupReference('sel_cardquota2').getExValue(  );
    	
    	var cardNum1  =  exCommon.getRepVal(me.lookupReference('cardNum1').getExValue(), '');
    	
    	if(cardNum1 == '' || cardNum1.length <= 10){
    		exCommon.msgAlert('카드번호를 입력하세요.');
    		me.lookupReference('cardNum1').focus();
    		return false;
    	}
    	
    	if(tot_PaymentAmt < 50000 && sel_cardquota2 != "00" ){
    		me.lookupReference('sel_cardquota2').focus();
    		exCommon.msgAlert('5만원이하는 일시불만 가능합니다.');
    		return;
    	}
    	
    	
    	var dsMainRecord = me.getViewModel().getStore('ds_main').getAt(0);
    	//console.log('dsMainRecord = ', dsMainRecord);
    	
    	var GoodsName = dsMainRecord.get("ACCEPT_GBNTXT");
    	if(me.getViewModel().getStore('ds_main').getCount() > 1){
    		GoodsName += '외 '+ (me.getViewModel().getStore('ds_main').getCount() -1) + '건';
    	}
    	
    	var BuyerEmail = 'o2i@o2i.co.kr';
    	var MOBILE_TELNO = exCommon.getRepVal(dsMainRecord.get("MOBILE_TELNO1"), '')+""+exCommon.getRepVal(dsMainRecord.get("MOBILE_TELNO2"), '') + exCommon.getRepVal(dsMainRecord.get("MOBILE_TELNO3"), '');
    	if( MOBILE_TELNO == null || MOBILE_TELNO == "" || MOBILE_TELNO == undefined || MOBILE_TELNO.length < 10  ){
    		MOBILE_TELNO = '07078607902';
    	}
    	
    	/*
    	$('#a_catid').val(ds_card_detail.NameValue(1,"SUB1_TRADE_ID"));
    	$('#key_merchantKey').val(ds_card_detail.NameValue(1,"KEYIN_LICENSE"));
    	$('#key_MID').val(ds_card_detail.NameValue(1,"SUB2_TRADE_ID"));
    	$('#c_MID').val(ds_card_detail.NameValue(1,"SUB2_TRADE_ID"));
    	
    	*/
    	var detailRecord = me.getViewModel().getStore('ds_card_detail').getAt(0);
    	
    	var data ={
    		 GoodsCnt     : '1'
    		,CardInterest : '0'
    		,PayMethod    : 'CARD'
    		,EdiDate      : 'CARD'
    		,UserIP       : me.getViewModel().getStore('ds_ip').getAt(0).get("UserIP")
    		,MallIP       : me.getViewModel().getStore('ds_ip').getAt(0).get("MallIP")
    		,GoodsName    : GoodsName
    		//,Amt          : me.lookupReference('tot_PaymentAmt').getExValue()
    		,Amt          : tot_PaymentAmt
    		,Moid         : ''
    		,BuyerName    : dsMainRecord.get("BUYER_NAME")
    		,BuyerEmail   : BuyerEmail
    		,BuyerTel     : MOBILE_TELNO
    		,MID          : detailRecord.get("SUB2_TRADE_ID")
    		,merchantKey  : detailRecord.get("KEYIN_LICENSE")
    		,BuyerAuthNum : ''
    		,CardNo       : me.lookupReference('cardNum1').getExValue(  )
    		,CardPwd      : ''
    		,CardQuota    : me.lookupReference('sel_cardquota2').getExValue(  )
    		,expMM        : me.lookupReference('sel_cardexpm').getExValue(  )
    		,expYY        : me.lookupReference('sel_cardexpy').getExValue(  )
    	}
    	
    	console.log('data = ', data);
    	
    	Ext.MessageBox.confirm('알림', '입력한 카드정보로 결제하겠습니까?', function(btn){
    		if (btn == 'yes') {
    		
    			$.ajax({
    		        type     : "POST",
    		        dataType : "json",
    		        url      : "/card_keyin.jsp",
    		        contentType: "application/x-www-form-urlencoded; charset=utf-8", 
    		        data     : data,
    		        success : function(data) {        
    		        	var resultCode = data.resultCode.replace(/ /gi, ""); 
    		        	console.log('data', data);
    		        	console.log('resultCode',resultCode);
    		        	//if(resultCode == '3001' || resultCode == 3001 || resultCode == 3021){
    		        	if(resultCode == '3001' || resultCode == 3001 ){	
    		        		var authDate = data.authDate;
    		        		
    		        		var cardPayInfo = {
    		        			 TRN_CLSF      : rbuf.substr(k, i-k)
    		        			,TRN_TYPE      : rbuf.substr(k, i-k)
    		        			,REP_CODE      : resultCode
    		        			,FST_PRICE     : data.amt
    		        			,END_PRICE     : data.amt
    		        			,PRICE         : data.amt
    		        			,PR_REMAINS    : data.amt
    		        			,CARDQUOTA     : data.CardQuota
    		        			,PGAUTHCODE    : data.authCode
    		        			,CARDAUTHCODE  : data.authCode
    		        			,NICE_AUTHDATE : authDate.substr(0,6)
    		        			,PGAUTHDATE    : "20"+authDate.substr(0,6)
    		        			,PGAUTHTIME    : authDate.substr(6,authDate.length)
    		        			,ISN_CD        : data.cardCode
    		        			,ISN_NM        : data.cardName
    		        			,BUY_CD        : data.cardCode
    		        			,BUY_NM        : data.cardName
    		        			,MEM_SNM       : 'keyin_card'
    		        			,CATID         : 'keyin_card'
    		        			,REP_MSG       : data.resultMsg
    		        			,RESULTMSG     : data.resultMsg
    		        			,CARD_BEAN     : data.cardNo
    		        			,CARD_TYPE     : '0'
    		        			,PRF_MNG_NMB   : data.tid
    		        			,TID           : data.tid    		        			
    		        			,ORG_TID       : data.tid
    		        			,TRD_SRNM      : 'keyin_card'
    		        			,PGCODE        : '01'
    		        			,AUTHGBN       : '1'
    		        			,PAY_TYPE      : 'keyin_card'
    		        			,CARDNUMBER    : data.cardNo
    		        			,CARDQUOTA     : data.cardQuota
    		        			,MID           : detailRecord.get("SUB2_TRADE_ID")
    		        			,BUD_NO        : dsMainRecord.CARD_BUD_NO
    		        			,PARTCANCELCNT : 0
    		        			,V_CASH_TYPE   : 2
    		        			,BUD_NO        : me.lookupReference('CARD_BUD_NO').getExValue()
    		        			,rec_cancel    : exCommon.getRepVal(me.getViewModel().getStore('ds_main').getAt(0).get('rec_cancel'), '')
    		        		}
    		        		clearInterval(myVar);
    		        		me.receiveTo(cardPayInfo, true);
    		        		//on_SendCard('keyin', data);
    		        	}else{
    		        		exCommon.msgAlert(data.resultMsg);
    		        	}
    		        	
    		        },
    		        error : function(e) {
    		        	exCommon.msgAlert('카드결제 도중 에러가 났습니다. 다시 시도해 주십시오.');
    		        }
    			});
    			
    		}
    	});
    },
    inSendCard : function(me, type , data){
    	
    },
    inCardMyTimer : function(){
    	var me = this;
    	
    	try{
    	//	console.log('inCardMyTimer = [', me.lookupReference('cardTab').getActiveTab().title+']');
    		
    		if (me.lookupReference('cardTab').getActiveTab().title == '자동입력') {
        	//	console.log(me.lookupReference('cardTab').getActiveTab().title + ' focus');
            	me.lookupReference('hdn_CardRead').focus();
         	}
    	}catch (e) {
    		console.log('window close?');
    		clearInterval(myVar);
		}
    	
    	
    },
    onTab1CardRead : function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		
    		var strCardNum = me.lookupReference('hdn_CardRead').getExValue(  );
    		var oGetVal = me.inCardCheck(strCardNum);
    		
    		if (oGetVal["RESLUTCODE"]=="00"){
    			var tot_PaymentAmt = me.lookupReference('tot_PaymentAmt').getExValue(  );
    	    	var sel_cardquota  = me.lookupReference('sel_cardquota').getExValue(  );
    	    	
    	    	if(tot_PaymentAmt < 50000 && sel_cardquota != "00" ){
    	    		me.lookupReference('sel_cardquota').focus();
    	    		exCommon.msgAlert('5만원이하는 일시불만 가능합니다.');
    	    		return;
    	    	}
    	    	
    	    	
    	    	var dsMainRecord = me.getViewModel().getStore('ds_main').getAt(0);
    	    	
    	    	var GoodsName = dsMainRecord.get("ACCEPT_GBNTXT");
    	    	if(me.getViewModel().getStore('ds_main').getCount() > 1){
    	    		GoodsName += '외 '+ (me.getViewModel().getStore('ds_main').getCount() -1) + '건';
    	    	}
    	    	
    	    	var BuyerEmail = 'o2i@o2i.co.kr';
    	    	var MOBILE_TELNO = exCommon.getRepVal(dsMainRecord.get("MOBILE_TELNO1"), '')+""+exCommon.getRepVal(dsMainRecord.get("MOBILE_TELNO2"), '') + exCommon.getRepVal(dsMainRecord.get("MOBILE_TELNO3"), '');
    	    	if( MOBILE_TELNO == null || MOBILE_TELNO == "" || MOBILE_TELNO == undefined || MOBILE_TELNO.length < 10  ){
    	    		MOBILE_TELNO = '07078607902';
    	    	}
    	    	
    	    	console.log('MOBILE_TELNO = ', MOBILE_TELNO);
    	    	
    	    	
    	    	var detailRecord = me.getViewModel().getStore('ds_card_detail').getAt(0);
    	    	
    	    	var data ={
    	       		 GoodsCnt     : '1'
    	       		,CardInterest : '0'
    	       		,PayMethod    : 'CARD'
    	       		,EdiDate      : 'CARD'
    	       		,UserIP       : me.getViewModel().getStore('ds_ip').getAt(0).get("UserIP")
    	       		,MallIP       : me.getViewModel().getStore('ds_ip').getAt(0).get("MallIP")
    	       		,GoodsName    : GoodsName
    	       		//,Amt          : me.lookupReference('tot_PaymentAmt').getExValue()
    	       		,Amt          : tot_PaymentAmt
    	       		,Moid         : ''
    	       		,BuyerName    : dsMainRecord.get("BUYER_NAME")
    	       		,BuyerEmail   : BuyerEmail
    	       		,BuyerTel     : MOBILE_TELNO
    	       		,MID          : detailRecord.get("SUB2_TRADE_ID")
    	       		,merchantKey  : detailRecord.get("KEYIN_LICENSE")
    	       		,BuyerAuthNum : ''
    	       		,CardNo       : oGetVal["CARDNUMBER"]
    	       		,CardPwd      : ''
    	       		,CardQuota    : oGetVal["CARDQUOTA"]
    	       		,expMM        : oGetVal["CARDEXPM"]
    	       		,expYY        : oGetVal["CARDEXPY"]
    	       	};
    	    	
    	    	$.ajax({
    		        type     : "POST",
    		        dataType : "json",
    		        url      : "/card_keyin.jsp",
    		        contentType: "application/x-www-form-urlencoded; charset=utf-8", 
    		        data     : data,
    		        success : function(data) {        
    		        	var resultCode = data.resultCode.replace(/ /gi, ""); 
    		        	console.log('data', data);
    		        	console.log('resultCode',resultCode);
    		        	//if(resultCode == '3001' || resultCode == 3001 || resultCode == 3021){
    		        	if(resultCode == '3001' || resultCode == 3001 ){	
    		        		var authDate = data.authDate;
    		        		
    		        		var cardPayInfo = {
    		        			 TRN_CLSF      : rbuf.substr(k, i-k)
    		        			,TRN_TYPE      : rbuf.substr(k, i-k)
    		        			,REP_CODE      : resultCode
    		        			,FST_PRICE     : data.amt
    		        			,END_PRICE     : data.amt
    		        			,PRICE         : data.amt
    		        			,PR_REMAINS    : data.amt
    		        			,CARDQUOTA     : data.CardQuota
    		        			,PGAUTHCODE    : data.authCode
    		        			,CARDAUTHCODE  : data.authCode
    		        			,NICE_AUTHDATE : authDate.substr(0,6)
    		        			,PGAUTHDATE    : "20"+authDate.substr(0,6)
    		        			,PGAUTHTIME    : authDate.substr(6,authDate.length)
    		        			,ISN_CD        : data.cardCode
    		        			,ISN_NM        : data.cardName
    		        			,BUY_CD        : data.cardCode
    		        			,BUY_NM        : data.cardName
    		        			,MEM_SNM       : 'keyin_card'
    		        			,CATID         : 'keyin_card'
    		        			,REP_MSG       : data.resultMsg
    		        			,RESULTMSG     : data.resultMsg
    		        			,CARD_BEAN     : data.cardNo
    		        			,CARD_TYPE     : '0'
    		        			,PRF_MNG_NMB   : data.tid
    		        			,TID           : data.tid    		        			
    		        			,ORG_TID       : data.tid
    		        			,TRD_SRNM      : 'swiping_card'
    		        			,PGCODE        : '01'
    		        			,AUTHGBN       : '1'
    		        			,PAY_TYPE      : 'swiping_card'
    		        			,CARDNUMBER    : data.cardNo
    		        			,CARDQUOTA     : data.cardQuota
    		        			,MID           : detailRecord.get("SUB2_TRADE_ID")
    		        			,BUD_NO        : dsMainRecord.CARD_BUD_NO
    		        			,PARTCANCELCNT : 0
    		        			,V_CASH_TYPE   : 2
    		        			,BUD_NO        : me.lookupReference('CARD_BUD_NO').getExValue()
    		        			,rec_cancel    : exCommon.getRepVal(me.getViewModel().getStore('ds_main').getAt(0).get('rec_cancel'), '')
    		        		}
    		        		clearInterval(myVar);
    		        		me.receiveTo(cardPayInfo, true);
    		        	}else{
    		        		exCommon.msgAlert(data.resultMsg);
    		        	}
    		        	
    		        },
    		        error : function(e) {
    		        	exCommon.msgAlert('카드결제 도중 에러가 났습니다. 다시 시도해 주십시오.');
    		        }
    			});
    		}
    	}
    },
    inCardCheck : function( strReadCode ){
    	var me  = this;
    	
    	me.lookupReference('hdn_CardRead').getExValue('');
    	me.lookupReference('hdn_CardRead').focus();
    	
    	var arrCode = strReadCode.split("="); 
    	
    	var oRtn= {
    			   RESLUTCODE: "99"		//에러 여부 00:이상없음, 99:에러
    			  ,CARDNUMBER: null		//카드번호
    			  ,CARDEXPY: null		//카드 유효기간 (년)
    			  ,CARDEXPM: null		//카드 유효기간 (월)
    			  ,CARDQUOTA: null		//할부 개월
    	};
    	
    	//카드 "=" 가 있는지 확인 
    	if (arrCode.length != 2){
    		exCommon.msgAlert('카드번호가 상이합니다. <br/> 다시 입력해주세요');
    		return oRtn;
    	}
    	
    	//카드 앞 16자리가 맞는지 확인 
    	if ( !(arrCode[0].length == 16||arrCode[0].length == 15 )){
    		exCommon.msgAlert('카드번호가 상이합니다. <br/> 다시 입력해주세요');
    		return oRtn;
    	}
    	
    	//카드 뒷자리 20자리가 맞는지 확인
    	if (arrCode[1].length != 20){
    		exCommon.msgAlert('결제가능한 카드가 아닙니다. <br/> 다시 입력해주세요');
    		return oRtn;
    	}
    	
    	//할부기간 체크 
    	var strCardquota = me.lookupReference('sel_cardquota').getExValue();
    	if (strCardquota =="" || strCardquota.lenth ==0){
    		exCommon.msgAlert('할부 개월을 지정해주세요!');
    		return oRtn;
    	}
    	
    	var strCardexpy = arrCode[1].substring(0,2);
    	var strCardexpm = arrCode[1].substring(2,4);
    	
    	oRtn["RESLUTCODE"] = "00";
    	oRtn["CARDNUMBER"] = arrCode[0];
    	oRtn["CARDEXPY"]  = strCardexpy;
    	oRtn["CARDEXPM"]  = strCardexpm;
    	oRtn["CARDQUOTA"]  = strCardquota;
    	return  oRtn;
    	
    },
    onSelFocus : function (){
    	var me = this;
    	
    	//console.log('onSelFocus');
    	clearInterval(myVar);
    },
    onSelChange : function(){
    	var me = this;
    	me.lookupReference('hdn_CardRead').focus();
    	myVar=setInterval(function () {
        	me.inCardMyTimer();
        }, 1000);
    },
    
})
var FS = "\x1C";
var ret;
var i, j, k;
var rbuf = "";
