Ext.define('ExFrm.view.rec.rec000p_03_mouseController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_03_mouse',
    onCalled:function(params){
        var me = this;
        
        console.log('rec000p_03_mouse = ', params);
       	
        if(params.V_ACCEPT_GBN == 4){
    		me.lookupReference('extenBtnArea').setHidden(true);
    	}
    	
    	if(params.V_ACCEPT_GBN == 14){
    		me.lookupReference('moveBtn').setHidden(true);
    		me.lookupReference('closeBtn').setHidden(true);
    		
    	}
        
        setTimeout(function(){
        	
        	try{
        		me.lookupReference('txt_jungak_nm').setExValue( params.JUNGAK_NM );
            	me.lookupReference('txt_use_num').setExValue( params.LIGHT_NO );
            	me.lookupReference('txt_jungak_nm2').setExValue( params.JUNGAK_NM );
            	me.lookupReference('txt_use_num2').setExValue( params.LIGHT_NO );
            	me.lookupReference('txt_jungak_nm3').setExValue( params.JUNGAK_NM );
            	me.lookupReference('txt_use_num3').setExValue( params.LIGHT_NO );
            	me.lookupReference('txt_jungak_nm4').setExValue( params.JUNGAK_NM );
            	me.lookupReference('txt_use_num4').setExValue( params.LIGHT_NO );
            	
            	me.lookupReference('txt_jungak_cd').setExValue( params.JUNGAK_CD );
            	me.lookupReference('txt_accept_gbn').setExValue( params.ACCEPT_GBN );
            	
            	
            	me.lookupReference('txt_accept_seq').setExValue( params.V_ACCEPT_SEQ );
            	me.lookupReference('txt_seq').setExValue( params.SEQ );
            	me.lookupReference('txt_period').setExValue( params.PERIOD );
            	
            	
            	
        	}catch (e) {
			}
        	
    	},350);
        
        if(params.BG_COLOR == "A"){
        	me.lookupReference('useDeung').setHidden(false);
        }else if(params.BG_COLOR == "B"){
        	me.lookupReference('desDeung').setHidden(false);
        }else if(params.BG_COLOR == "D" ||  params.BG_COLOR == "C"){
        	me.lookupReference('ingDeung').setHidden(false);
        }else if(params.BG_COLOR == "E"){
        	me.lookupReference('reservDeung').setHidden(false);
        }
        
    },
    onInit:function(){},
    onAfterRender:function(){},
    onSelect : function(){
    	var me = this;
    	
    },
    recoverDeung : function(){
    	var me = this;
    	
    	var url  = "/rec/REC001W_10/process.suvila?";
    		url += "&V_JUNGAK_CD="+me.lookupReference('txt_jungak_cd').getExValue();    		
    		url += "&V_ACCEPT_GBN="+me.lookupReference('txt_accept_gbn').getExValue();
    		url += "&V_LIGHT_NO="+me.lookupReference('txt_use_num').getExValue();
    		url += "&V_FLAG=A";
    		
		setTimeout(function(){
			me.callForm(me, url, me.recoverDeungCallback , false);
		},10);	
    },
    recoverDeungCallback : function(me, success, record, action){
    	if(success){
    		var params = {
    			RESERVATION_YN : ""
    		}
    		me.receiveTo(params , true);
    	}else{
    		exCommon.msgAlert('오류가 발생했습니다<br>다시 시도해주세요.');
    		return false;
    	}
    },
    destoryDeung : function(){
    	var me = this;
    	
    	var url  = "/rec/REC001W_10/process.suvila?";
    		url += "&V_JUNGAK_CD="+me.lookupReference('txt_jungak_cd').getExValue();    		
    		url += "&V_ACCEPT_GBN="+me.lookupReference('txt_accept_gbn').getExValue();
    		url += "&V_LIGHT_NO="+me.lookupReference('txt_use_num2').getExValue();
    		url += "&V_FLAG=B";
    		
		setTimeout(function(){
			me.callForm(me, url, me.destoryDeungCallback , false);
		},10);	
    },
    destoryDeungCallback : function(me, success, record, action){
    	if(success){
    		var params = {
    			RESERVATION_YN : ""
    		}
    		me.receiveTo(params , true);
    	}else{
    		exCommon.msgAlert('오류가 발생했습니다<br>다시 시도해주세요.');
    		return false;
    	}
    },
    reservDeung : function(){
    	var me = this;
    	
    	var url  = "/rec/REC000P_03/ds_reservation.suvila?";
			url += "&JUNGAK_CD="+me.lookupReference('txt_jungak_cd').getExValue();    		
			url += "&ACCEPT_GBN="+me.lookupReference('txt_accept_gbn').getExValue();
			url += "&LIGHT_NO="+me.lookupReference('txt_use_num3').getExValue();
			url += "&RESERVATION_YN=F";
			
			Ext.MessageBox.confirm('알림', '등번호 예약을 취소하시겠습니까?', function(btn){
        		if (btn == 'yes') {
        			setTimeout(function(){
        				me.callForm(me, url, me.reservDeungCallback , false);
        			},10);	
        		}
        	});	
			
		
    },
    reservDeungCallback : function(me, success, record, action){
    	if(success){
    		
    		exCommon.msgAlert('취소되었습니다.');
    		
    		var params = {
    			RESERVATION_YN : "F"
    		}
    		me.receiveTo(params , true);
    	}else{
    		exCommon.msgAlert('오류가 발생했습니다<br>다시 시도해주세요.');
    		return false;
    	}
    },
    closeDeung : function(){
    	var me = this;
    	
    	var url  = "/rec/REC001W_10/process.suvila?";
			url += "&V_JUNGAK_CD="+me.lookupReference('txt_jungak_cd').getExValue();    		
			url += "&V_ACCEPT_GBN="+me.lookupReference('txt_accept_gbn').getExValue();
			url += "&V_LIGHT_NO="+me.lookupReference('txt_use_num3').getExValue();
			url += "&V_FLAG=D";
		
		Ext.MessageBox.confirm('알림', '소등하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, url, me.closeDeungCallback , false);
    		}
    	});
    	
    },
    closeDeungCallback : function(me, success, record, action){
    	if(success){
    		var params = {
    			RESERVATION_YN : ""
    		}
    		me.receiveTo(params , true);
    	}else{
    		exCommon.msgAlert('오류가 발생했습니다<br>다시 시도해주세요.');
    		return false;
    	}
    },
    moveDeung : function(){ 
    	var me  = this;
    	var change_light_no = exCommon.getRepVal( me.lookupReference('txt_move_num3').getExValue() , "" );
    	
    	if("" == change_light_no){
    		exCommon.msgAlert('이동할 등번호를 입력하세요.');
    		me.lookupReference('txt_move_num3').focus();
    		return false;
    	}
    	
    	
    	if(isNaN(change_light_no)){
    		exCommon.msgAlert('숫자만 입력 가능합니다.');
    		me.lookupReference('txt_move_num3').focus();
    		return false;
    	}
    	
    	var url  = "/rec/REC001W_10/process.suvila?";
			url += "&V_JUNGAK_CD="+me.lookupReference('txt_jungak_cd').getExValue();    		
			url += "&V_ACCEPT_GBN="+me.lookupReference('txt_accept_gbn').getExValue();
			url += "&V_LIGHT_NO="+me.lookupReference('txt_use_num3').getExValue();
			url += "&V_CHANGE_LIGHT_NO="+me.lookupReference('txt_move_num3').getExValue();
			url += "&V_ACCEPT_SEQ="+me.lookupReference('txt_accept_seq').getExValue();
			url += "&V_SEQ="+me.lookupReference('txt_seq').getExValue();
			url += "&V_FLAG=C";
		  
			
    	me.callForm(me, url, me.moveDeungCallback , false);
    	
    },
    moveDeungCallback : function(me, success, record, action){
    	console.log('moveDeungCallback = ', success);
    	if(success){
    		var params = {
    			RESERVATION_YN : ""
    		}
    		me.receiveTo(params , true);
    	}else{
    		exCommon.msgAlert('오류가 발생했습니다<br>다시 시도해주세요.');
    		return false;
    	}
    },
    extenDeung : function(){
    	var me = this;
    	
    	var PERIOD = me.lookupReference('txt_period').getExValue();
    	
    	if(PERIOD == 0 || PERIOD == "0"){
    		exCommon.msgAlert('기간이 무한인 인등은 연장할수 없습니다.');
    		return false;
    	}
    	
    	var params = {
    		 V_JUNGAK_CD  : me.lookupReference('txt_jungak_cd').getExValue()
    		,V_ACCEPT_GBN : me.lookupReference('txt_accept_gbn').getExValue()
    		,V_ACCEPT_SEQ : me.lookupReference('txt_accept_seq').getExValue()
    		,V_ACCEPT_GBN : me.lookupReference('txt_accept_gbn').getExValue()
    		,V_LIGHT_NO   : me.lookupReference('txt_use_num3').getExValue()
    	};
    	
    	me.openPopup('ExFrm.view.rec.rec002p_10_01',  params , me.onReceivePopupMouse);
    },
    onReceivePopupMouse:function(params, me){
    	console.log('onReceivePopupMouse = ', params);
    	var params = {
    			RESERVATION_YN : "T"
		}
		me.receiveTo(params , true);
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
})