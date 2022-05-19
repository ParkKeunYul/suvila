Ext.define('ExFrm.view.rec.rec000w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000w_03',
    onInit:function(){    	
    	
    	var me = this;
    },
    onAfterRender:function(){
    	
    	
    	var me = this
    	me.lookupReference('pannel_sms').setHidden(true);
    	me.lookupReference('lc_sindoCmsInfo').setHidden(true);
    	me.lookupReference('panel_cms_row').setHidden(true);
    	me.lookupReference('chk_UseCms').setDisabled(true);
    	
    	
    	me.lookupReference('me_acceptDate').setValue(exCommon.getNowDate("/"));
    	
    },
    onUpCalled : function(obj){
    	var me = this;
    	
    	me.lookupReference('ta_daeju_memo').setValue(obj.MEMO);
    	me.lookupReference('cb_smsYn').setValue(obj.SMS_YN);
    	me.lookupReference('lc_mobile_telno1').setValue(obj.MOBILE_TELNO1);
    	me.lookupReference('txt_recMobiletelNo2').setValue(obj.MOBILE_TELNO2);
    	me.lookupReference('txt_recMobiletelNo3').setValue(obj.MOBILE_TELNO3);
    	me.lookupReference('txt_proposalBudNm').setValue(obj.PROPOSAL_BUD_NM);
    	me.lookupReference('txt_proposalBudNo').setValue(obj.PROPOSAL_BUD_NO);
    	
    	
    	var params = {
       		 V_BUD_NO     : obj.V_BUD_NO
       	};
   		setTimeout(function(){
          	me.callStore(me, 'ds_sindo_cms_info', '', params ,me.dsSindoCallback);
        },10);
    },
    upAmtCalCalled : function(id  , val){
    	var me = this;
    	
    	
    	me.lookupReference(id).setValue(val);
    },
    dsSindoCallback : function(me, success, form, action){
    	me.lookupReference('lc_sindoCmsInfo').setHidden(true);
    	
    	me.inRecAmtDefault();
    	
    	
    	if( !me.getView().up('[isRootView=true]').getController().inDisalbedCms() ) return false;
    	
    	if(success &&  me.getViewModel().getStore('ds_sindo_cms_info').getCount() ){    	
    		me.lookupReference('chk_UseCms').setDisabled(false);
    	}else{
    		me.lookupReference('chk_UseCms').setDisabled(true);
    	}
    },
    onChoiceCms : function(opts , nowValue , oldValue){
    	var me = this;
    	var index = me.getViewModel().getStore('ds_sindo_cms_info').find("DISPLAY",nowValue, 0, false, true, true);
    	var record= me.getViewModel().getStore('ds_sindo_cms_info').getAt(index);
    	
    	try{
    		if(record != "" || record == null || record != undefined){
        		me.lookupReference('me_bunnabDay').setExValue(record.get("CMS_PAYMENT_DAY"));
        		me.lookupReference('me_juminNo').setExValue(record.get("JUMIN_NO"));
        		me.lookupReference('lc_bankNo').setExValue(record.get("IF_PAYMENT_BANK_CD"));
        		me.lookupReference('lc_bankNm').setExValue(record.get("BANK_NM"));
        		me.lookupReference('txt_accountNumber').setExValue(record.get("IF_PAYMENT_ACCOUNT"));
        		me.lookupReference('txt_accountSeq').setExValue(record.get("ACCOUNT_SEQ"));
        		me.lookupReference('txt_cms_trade_cd').setExValue(record.get("CMS_TRADE_CD"));
        	}
    	}catch (e) {
    		me.lookupReference('me_bunnabDay').setExValue("");
    		me.lookupReference('me_juminNo').setExValue("");
    		me.lookupReference('lc_bankNo').setExValue("");
    		me.lookupReference('lc_bankNm').setExValue("");
    		me.lookupReference('txt_accountNumber').setExValue("");
    		me.lookupReference('txt_accountSeq').setExValue("");
    		me.lookupReference('txt_cms_trade_cd').setExValue("");
		}
    },
    onCheckCms : function(opts , nowValue , oldValue){
    	var me = this;
    	if(nowValue){
    		me.lookupReference('lc_sindoCmsInfo').setHidden(false);
    		me.lookupReference('panel_cms_row').setHidden(false);
    	}else{
    		me.lookupReference('lc_sindoCmsInfo').setHidden(true);
    		me.lookupReference('panel_cms_row').setHidden(true);
    		me.lookupReference('lc_sindoCmsInfo').setExValue("");
    	}
    	me.inRecAmtDefault();
    	
    	//console.log('onCheckCms= ', nowValue);
    },
    onChangeSms : function(opts , nowValue , oldValue){
    	var me = this;
    //	console.log('onChangeSms = '+ nowValue);
    	if(nowValue == "T"){
    		me.lookupReference('pannel_sms').setHidden(false);
    	}else{
    		me.lookupReference('pannel_sms').setHidden(true);
    	}
    },
    inRecAmtDefault : function(){
    	
    	var me = this;
    	
		var TEMPLE_CD                =  exCommon.user.templeCd;
		var ACCEPT_DATE              =  me.lookupReference('me_acceptDate').getExValue();
		var PROPOSAL_BUD_NM          =  me.lookupReference('txt_proposalBudNm').getExValue();
		var PROPOSAL_BUD_NO          =  me.lookupReference('txt_proposalBudNo').getExValue();
		var APPROVAL_GBN             =  "1";
		var PAYMENT_GBN              =  "T";
		var CASH_TYPE                =  "1"; 
		var CMS_PAYMENT_DAY          =  "";
		var JUMIN_NO                 =  "";
		var CMS_TRADE_CD             =  "";
		
		var WHAJUBOSAL_NM         = me.lookupReference('txt_whajubosalNm').getExValue();
		var WHAJUBOSAL            = me.lookupReference('txt_whajubosal').getExValue();
		var KWONSUN_NO            = me.lookupReference('txt_kwonsunNo').getExValue();
		var TOT_PAYMENT_PLAN_AMT  = me.lookupReference('me_totPaymentPlanAmt').getExValue();
		var TOT_PAYMENT_AMT       = me.lookupReference('me_totPaymentAmt').getExValue();
		var MISU_AMT              = me.lookupReference('me_misuAmt').getExValue();
		var BUNNAB_DAY            = "";
		var BANK_NO               = "";
		var ACCOUNT_NUMBER        = "";
		var ACCOUNT_SEQ           = "";
		var MEMO                  = me.lookupReference('ta_memo').getExValue();
		
		
		if(me.lookupReference('chk_UseCms').checked){
			APPROVAL_GBN       = "3"
			CMS_PAYMENT_DAY    = me.lookupReference('me_bunnabDay').getExValue();
			JUMIN_NO           = me.lookupReference('me_juminNo').getExValue();
			BANK_NO            = me.lookupReference('lc_bankNo').getExValue();
			ACCOUNT_NUMBER     = me.lookupReference('txt_accountNumber').getExValue();
			ACCOUNT_SEQ        = me.lookupReference('txt_accountSeq').getExValue();
			CMS_TRADE_CD       = me.lookupReference('txt_cms_trade_cd').getExValue();
			BUNNAB_DAY         = ""
		}
		
		var data = {
			 TEMPLE_CD          : TEMPLE_CD
			,ACCEPT_DATE        : ACCEPT_DATE
			,PROPOSAL_BUD_NM    : PROPOSAL_BUD_NM
			,PROPOSAL_BUD_NO    : PROPOSAL_BUD_NO
			,APPROVAL_GBN       : APPROVAL_GBN
			,PAYMENT_GBN        : PAYMENT_GBN
			,CASH_TYPE          : CASH_TYPE
			,CMS_PAYMENT_DAY    : CMS_PAYMENT_DAY
			,JUMIN_NO           : JUMIN_NO
			,ACCOUNT_SEQ        : ACCOUNT_SEQ
			,CMS_TRADE_CD       : CMS_TRADE_CD
			,WHAJUBOSAL_NM      : WHAJUBOSAL_NM
			,WHAJUBOSAL         : WHAJUBOSAL
			,KWONSUN_NO         : KWONSUN_NO
			,TOT_PAYMENT_PLAN_AMT : TOT_PAYMENT_PLAN_AMT
			,TOT_PAYMENT_AMT     : TOT_PAYMENT_AMT
			,MISU_AMT            : MISU_AMT
			,BUNNAB_DAY          : BUNNAB_DAY
			,ACCOUNT_NUMBER      : ACCOUNT_NUMBER
			,SMS_YN              : 'F'
			,MEMO                : MEMO
			,BANK_NO             : BANK_NO
		}
		return data;
    },
    inSmsInfo : function(){
    	var  me = this;
    	
    	var data = {
    		 SMS_YN        : me.lookupReference('cb_smsYn').getValue() 
    		,MOBILE_TELNO1 : me.lookupReference('lc_mobile_telno1').getValue()
    		,MOBILE_TELNO2 : me.lookupReference('txt_recMobiletelNo2').getValue()
    		,MOBILE_TELNO3 : me.lookupReference('txt_recMobiletelNo3').getValue()
    	}
    	
    	return data;
    },
    inRecBasicValadation : function(){
    	
    	var me = this;
    	
    	if(me.lookupReference('cb_smsYn').getValue() == 'T'){
    		if( !exCommon.lookupReVal( me.lookupReference('lc_mobile_telno1')  , '발송전화번호를 ') ) return false;
    		if( !exCommon.lookupReVal( me.lookupReference('txt_recMobiletelNo2')  , '발송전화번호를 ') ) return false;
    		if( !exCommon.lookupReVal( me.lookupReference('txt_recMobiletelNo3')  , '발송전화번호를 ') ) return false;
    	}
    	
    	if(me.lookupReference('chk_UseCms').getValue()){
    		
    		if( !exCommon.lookupReVal( me.lookupReference('lc_bankNo')  , 'CMS 계좌를 ') ) return false;
    		if( !exCommon.lookupReVal( me.lookupReference('txt_accountNumber')  , 'CMS 계좌를 ') ) return false;
    		if( !exCommon.lookupReVal( me.lookupReference('me_juminNo')  , 'CMS 계좌를 ') ) return false;
    		
    		var me_juminNo = me.lookupReference('me_juminNo').getExValue();
    		
    		if(me_juminNo.length == 10  ){
    			if( !gf_BizNoCheck(me_juminNo) ) return false;
    		}
    	}
    	
    	return true;
    },
    onKwonSunNo : function(){
    	var me = this;
    	
    	var params = {
    		 V_SEARCHGBN : "BUD_NO"
    		,V_SEARWORD  : me.lookupReference('txt_whajubosal').setExValue()
    	}
    	
    	me.openPopup('ExFrm.view.com.moyeonmun',  params, me.onKwonSunNoReceive);
    },
    onKwonSunNoReceive : function(params, me){
    	 me.lookupReference('txt_whajubosal').setExValue( params.BUD_NO);
    	 me.lookupReference('txt_whajubosalNm').setExValue( params.NAME_KOR );
    	 me.lookupReference('txt_kwonsunNo').setExValue( params.KWONSUN_NO );
    }
    
    
    
})
