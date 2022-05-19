Ext.define('ExFrm.view.desk.announce001p_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.announce001p_02',
    onCalled:function(param){
        var me = this;
        
        me.getViewModel().getStore('ds_main').removeAll();        
        //console.log('announce001p_02 = ', param);
        
        me.lookupReference('txt_name_kor').setExValue(param.NAME_KOR);
        me.lookupReference('lc_telno').setExValue(param.TELNO1);
        me.lookupReference('txt_telno2').setExValue(param.TELNO2);
        me.lookupReference('txt_telno3').setExValue(param.TELNO3);
        me.lookupReference('lc_mobile_telno1').setExValue(param.MOBILE_TELNO1);
        me.lookupReference('txt_mobile_telno2').setExValue(param.MOBILE_TELNO2);
        me.lookupReference('txt_mobile_telno3').setExValue(param.MOBILE_TELNO3);
        me.lookupReference('lc_accept_yn').setExValue(param.ACCEPT_YN);
        me.lookupReference('txt_remark').setExValue(param.REMARK);
        
        var data ={
        	 BUD_NO        : param.BUD_NO
        	,EVENT_DATE    : param.EVENT_DATE
        	,ACCEPT_GBN    : param.ACCEPT_GBN
        	,LUNAR_SOLAR   : param.LUNAR_SOLAR
        	,TEMPLE_CD     : param.TEMPLE_CD
        	,NAME          : param.NAME
        	,ACCEPT_YN     : param.ACCEPT_YN
        	,ACCEPT_SEQ    : param.ACCEPT_SEQ
        	,NAME_KOR      : param.NAME_KOR
        	,JESA_GUBUN    : param.JESA_GUBUN
        	,REMARK        : param.REMARK
        	,DECE_NAME_KOR : param.DECE_NAME_KOR
        	,SEQ           : param.SEQ
        }
        me.getViewModel().getStore('ds_main').add(data);
    },
    dsMainCallback: function(me, success, form, action){
    	
    	
    },
    onInit:function(){
    	var me = this;
    	setTimeout(function(){
			me.callStore(me, 'ds_telno1', '', null , me.dsTelCallback);    				
		},50);
    },
    dsTelCallback: function(me, success, form, action){
    	setTimeout(function(){
			me.callStore(me, 'ds_mobile_telno1', '', null , me.dsMobileTelCallback);    				
		},50);
    },
    dsMobileTelCallback: function(me, success, form, action){
    	setTimeout(function(){
			me.callStore(me, 'ds_accept_yn', '', null , null);    				
		},50);
    },
    onAfterRender:function(){
    	var me = this;
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onKeyUpTel : function(me2, e, eOpts ){
    	var me = this;
    	
    	try{
    		
    		var  textNm = me2.reference;
    		
    		var txtTelno = exCommon.getRepVal(me.lookupReference(textNm).getExValue(),"");
        	
        	if( !(e.keyCode >= 48 && e.keyCode<= 57)){
        		txtTelno = txtTelno.substr(0, txtTelno.length-1)
        	}
        	me.lookupReference(textNm).setExValue( txtTelno );
        	
        	if(txtTelno.length > 4){
        		me.lookupReference(textNm).setExValue( txtTelno.substr(0,4) );
        	}
        	
        	if(txtTelno.length == 4){
	        	if(textNm == 'txt_telno2'){
	            	me.lookupReference('txt_telno3').focus();
	    		}
	        	
	        	if(textNm == 'txt_mobile_telno2'){
	            	me.lookupReference('txt_mobile_telno3').focus();
	    		}
        	}
    	}catch (e) {}
    },
    onSave : function(){
    	var me = this;
    	
    	var TELNO1 = exCommon.getRepVal(me.lookupReference('lc_telno').getExValue(), '');
    	var TELNO2 = exCommon.getRepVal(me.lookupReference('txt_telno2').getExValue(), '');
    	var TELNO3 = exCommon.getRepVal(me.lookupReference('txt_telno3').getExValue(), '');
    	
    	var MOBILE_TELNO1 = exCommon.getRepVal(me.lookupReference('lc_mobile_telno1').getExValue(), '');
    	var MOBILE_TELNO2 = exCommon.getRepVal(me.lookupReference('txt_mobile_telno2').getExValue(), '');
    	var MOBILE_TELNO3 = exCommon.getRepVal(me.lookupReference('txt_mobile_telno3').getExValue(), '');
    	
    	if( TELNO1 == '' ){
    		exCommon.msgAlert('전화번호는 필수입력 사항입니다.');
    		me.lookupReference('lc_telno').focus();
    		return false;
    	}
    	
    	if( TELNO2.length < 3){
    		exCommon.msgAlert('전화번호는 필수입력 사항입니다.');
    		me.lookupReference('txt_telno2').focus();
    		return false;
    	}
    	
    	if( TELNO2.length < 4 ){
    		exCommon.msgAlert('전화번호는 필수입력 사항입니다.');
    		me.lookupReference('txt_telno3').focus();
    		return false;
    	}
    	
    	if( MOBILE_TELNO1 == '' ){
    		exCommon.msgAlert('휴대전화는 필수입력 사항입니다.');
    		me.lookupReference('lc_mobile_telno1').focus();
    		return false;
    	}
    	
    	if( MOBILE_TELNO2.length < 3){
    		exCommon.msgAlert('휴대전화는 필수입력 사항입니다.');
    		me.lookupReference('txt_mobile_telno2').focus();
    		return false;
    	}
    	
    	if( MOBILE_TELNO3.length < 4 ){
    		exCommon.msgAlert('휴대전화는 필수입력 사항입니다.');
    		me.lookupReference('txt_mobile_telno3').focus();
    		return false;
    	}
    	
    	var ACCEPT_YN = exCommon.getRepVal(me.lookupReference('lc_accept_yn').getExValue(), '');
    	
    	if(ACCEPT_YN == 'T'){
    		me.inSms();
    	}
    	
    	var record = me.getViewModel().getStore('ds_main').getAt(0);
    	
    	record.set("TELNO1"       , TELNO1);
    	record.set("TELNO2"       , TELNO2);
    	record.set("TELNO3"       , TELNO3);
    	record.set("MOBILE_TELNO1", MOBILE_TELNO1);
    	record.set("MOBILE_TELNO2", MOBILE_TELNO2);
    	record.set("MOBILE_TELNO3", MOBILE_TELNO3);
    	record.set("ACCEPT_YN"    , ACCEPT_YN);
    	record.set("REMARK"       , exCommon.getRepVal(me.lookupReference('txt_remark').getExValue()+" ", ''));
    	
    	exCommon.addParamSetting(me, 'ds_main', 'ds_main');
    	exCommon.addParamSetting(me, 'ds_sms' , 'ds_sms');
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			
    			setTimeout(function(){
    				me.callForm(me, '/asp/Announce/reqSave.suvila', me.onSaveCallback , false);
    			},10);	
    		}
    	});
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.getView().destroy();
    	}
    },
    inSms : function(){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	var nameKor = exCommon.getRepVal(me.lookupReference('txt_name_kor').getExValue(), '');
    	var cellNum = exCommon.getRepVal( me.lookupReference('lc_mobile_telno1').getExValue(), '' ) + ""+ exCommon.getRepVal( me.lookupReference('txt_mobile_telno2').getExValue(), '' )+ ""+ exCommon.getRepVal( me.lookupReference('txt_mobile_telno3').getExValue(), '' );
    	
    	
    	var msg = '['+exCommon.user.templeNm+']'
    	    msg+= me.getViewModel().getStore('ds_main').getAt(0).get("NAME") + " "
    	    msg+= me.getViewModel().getStore('ds_main').getAt(0).get("EVENT_DATE")+"일에 있습니다. 동참바랍니다.";
     	
    	var data = {
    		 TR_ID        : me.getViewModel().getStore('ds_main').getAt(0).get("BUD_NO")
    		,TR_SENDSTAT  : '0'
    		,TR_PHONE     : cellNum
    		,TR_DEST_INFO : nameKor+"^"+cellNum
    		,TR_CALLBACK  : exCommon.user.tel
    		,TR_ETC1      : exCommon.user.templeCd
    		,TR_ETC2      : me.getViewModel().getStore('ds_main').getAt(0).get("BUD_NO")
    		,TR_ETC3      : 'SMSREC'
    		,TR_ETC4      : me.getViewModel().getStore('ds_main').getAt(0).get("BUD_NO")
    		,TR_ETC5      : exCommon.user.userId
    		,TR_MESSAGE   : msg
    		,TR_SMS_YN    : 'T'
    	};
    	console.log('data =', data);
    	
    	me.getViewModel().getStore('ds_sms').add(data);
    }
})