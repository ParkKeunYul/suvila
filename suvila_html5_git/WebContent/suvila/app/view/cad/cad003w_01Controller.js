Ext.define('ExFrm.view.cad.cad003w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cad003w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	/*setTimeout(function(){
    		me.openPopup('ExFrm.view.cad.cad002p_01',  null, me.onAddRightReceive);
    	},1000);*/
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('td_sendDate').setHidden(true);
    	me.lookupReference('me_sendDate').setExValue(today);
    	
    	
    	var txt_callback = exCommon.user.mobiletelno;
    	if(txt_callback == "" || txt_callback == null || txt_callback == undefined){
    		txt_callback = exCommon.user.tel ;
    	}
    	
    	me.lookupReference('txt_callback').setExValue( txt_callback );
    	me.lookupReference('TR_ETC1').setExValue( exCommon.user.templeCd );
    	me.lookupReference('TR_ETC5').setExValue( exCommon.user.userId );
    	
    },   
    onInit:function(me){
    	var me = this;
    	
    	var params = {
       		 V_KEYWORD  : ""
       		,V_CLASS_CD : ""
       	};
       	
       	setTimeout(function(){
       		me.callStore(me, 'ds_main', '', params, me.dsMainCallback)
       	},200);
    },
    dsMainCallback : function (me, success, records, action){
    	if(success && records.length > 0){
    	}
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onFindSindo();
    	}
    },
    onFindSindo : function(){
    	var me = this;
    	    	
    	var params = {
    		 V_CLASS_CD    : me.lookupReference('lc_group').getExValue()
    		,V_KEYWORD     : me.lookupReference('txt_keyword').getExValue()
    	};
    	
    	me.callStore(me, 'ds_main', '', params, null);
    },
    onDeSelect : function(model, record, index){
    	record.set("CHECK_P", "F");
    	console.log('onDeSelect = ', index);
    },
    onSelect : function(model, record, index){
    	record.set("CHECK_P", "T");
    	console.log('onSelect = ', index);
    },
    onChangeForamt : function(logEntry, newValue, oldValue, eOpts ){
    	
    	var me =this;
    	
    	var max_length_sms = 80;
    	var max_length_lms = 1000;
    	
    	var bytes         = gf_calBytes(newValue);
	    if(bytes<=max_length_sms) {
	    	$('#sp_byte').text(bytes);
	    	$('#sp_max').text(max_length_sms+" bytes (단문)");
	    	
	    	
	    	me.lookupReference('TR_MSG_GB').setExValue("SMS");
	    }
	    else if(bytes<=max_length_lms) {
	    	$('#sp_byte').text(bytes);
	    	$('#sp_max').text(max_length_lms+" bytes (장문)");
	    	
	    	me.lookupReference('TR_MSG_GB').setExValue("LMS");
	    }
	    else{
	    	$('#sp_byte').text(bytes);
	    	$('#sp_max').text(max_length_lms+" bytes (글자수초과)");
	    	
	    	me.lookupReference('TR_MSG_GB').setExValue("LMS");
	    }
    },
    onRadioChange : function(field, newValue, oldValue, options){
    	var me = this;
    	/*console.log(field);
    	console.log(newValue);
    	console.log(oldValue);
    	console.log(options);
    	console.log('newValue', newValue.TR_MSGTYPE);
    	*/
    	
    	var val = newValue.TR_MSGTYPE;
    	if(val == "0"){
    		me.lookupReference('td_sendDate').setHidden(true);
    	}else{
    		me.lookupReference('td_sendDate').setHidden(false);
    	}
    },
    onSmsSend : function(){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_smsSindo').removeAll();
    	
    	var allRecord  = me.getViewModel().getStore('ds_main');
    	
    	
    	for(var i = 0; i< allRecord.getCount() ; i++){
    		var record = allRecord.getAt(i);
    		
    		if("T" == record.get("CHECK_P")){
    			console.log(me.getViewModel().getStore('ds_smsSindo'));
    			me.getViewModel().getStore('ds_smsSindo').add(record);
    		}
    	}// for
    	
    	console.log(me.getViewModel().getStore('ds_smsSindo').getUpdatedRecords().length);
    	
    	if(me.getViewModel().getStore('ds_smsSindo').getCount() == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '선택된 발송대상이 없습니다.');
    		},50);
    		return false;
    	}
    	
    	
    	//var TR_MSGTYPE = me.lookupReference('rd_sendDate').getValue();
    	var TR_MSGTYPE = me.lookupReference('exRadioGroup').getValue().TR_MSGTYPE ;
    	
    	console.log('TR_MSGTYPE = ', TR_MSGTYPE);
    	
    	if(TR_MSGTYPE == 1 || TR_MSGTYPE == "1"){
    		
    		var TR_SENDDATE      = me.lookupReference('me_sendDate').getExValue();
    		var TR_SENDTIME_TEMP = me.lookupReference('me_sendTimeTemp').getValue();
    		
    		
    		var now = new Date(TR_SENDTIME_TEMP);
    		
    		var TR_SENDTIME    = "";
    		var TR_SENDTIME_HH = now.getHours();
    		var TR_SENDTIME_MM = now.getMinutes();
    		
    		console.log('TR_SENDTIME_HH = ', new Number(TR_SENDTIME_HH) < 10);
    		console.log('TR_SENDTIME_MM = ', new Number(TR_SENDTIME_MM) < 10);
    		
    		if(new Number(TR_SENDTIME_HH) < 10)  TR_SENDTIME_HH = "0"+TR_SENDTIME_HH;
    		if(new Number(TR_SENDTIME_MM) < 10)  TR_SENDTIME_MM = "0"+TR_SENDTIME_MM;
    		
    		
    		TR_SENDTIME = TR_SENDTIME_HH+""+TR_SENDTIME_MM;
    		
    		console.log('TR_SENDTIME = ', TR_SENDTIME);
    		
    		me.lookupReference('me_sendTime').setExValue(TR_SENDTIME);
    		
    		
    		if(TR_SENDDATE == "" || TR_SENDDATE == null){
    			setTimeout(function(){
        			Ext.Msg.alert('알림', '예약일자는 필수 입력사항 입니다.');
        		},50);
    		}
    		
    		if(TR_SENDTIME == "" || TR_SENDTIME == null){
    			setTimeout(function(){
        			Ext.Msg.alert('알림', '예약시간은 필수 입력사항 입니다.');
        		},50);
    		}
    		
    	}// if
    	
    	var TR_CALLBACK = me.lookupReference('txt_callback').getExValue();
    	var TR_MESSAGE  = me.lookupReference('ta_msg').getExValue();
    	
    	
    	if(TR_CALLBACK == "" || TR_CALLBACK == null){
			setTimeout(function(){
    			Ext.Msg.alert('알림', '발송번호를 입력해 주세요.');
    		},50);
		}
    	
    	if(TR_MESSAGE == "" || TR_MESSAGE == null){
			setTimeout(function(){
    			Ext.Msg.alert('알림', '발송내용은 필수 입력사항 입니다.');
    		},50);
		}else{
			var max_length_sms = 80;
	    	var max_length_lms = 1000;
	    	
	    	var bytes          = gf_calBytes(TR_MESSAGE);
			
	    	if(bytes<=max_length_sms) {
    			Ext.MessageBox.confirm('알림', '단문으로 문자발송 하시겠습니까?', function(btn){
    				if (btn == 'yes') {  
            			me.onSmsSendProc(me);
            		}
    			});
		    }
		    else if(bytes<=max_length_lms) {
	    		Ext.MessageBox.confirm('알림', '<b>장문</b>으로 문자발송 하시겠습니까?', function(btn){
    				if (btn == 'yes') {  
    					me.onSmsSendProc(me);
            		}
    			});
		    }else{
	    		Ext.Msg.alert('알림', max_length_lms+'bytes 를 초과할 수 없습니다.');
		    }
		}
    },
    onSmsSendProc : function(me){
    	
    	var jsonNewData = [];
    	
    	var records = me.getViewModel().getStore('ds_smsSindo').getUpdatedRecords();
    	
    	console.log(records);
    	
    	
    	for (var i=0; i < records.length; i++){
        	jsonNewData.push(records[i].data);
        }
    	
    	me.lookupReference('newData').setExValue(Ext.encode(jsonNewData));
    	console.log('newData', me.lookupReference('newData').getValue() );
    	
		setTimeout(function(){
			me.callForm(me, '/cad/CAD003W_01/save.suvila', me.onSmsSendCallBack , false);
		},10);	
    	
    },
    onSmsSendCallBack : function (me, success, records, action){
    	console.log('onSmsSendCallBack = ', success);
    	
    	var callback = Ext.decode(action.response.responseText);	
    	var msgType = "경고";
    	
    	if(success){
    		msgType = "알림";    		
    		me.getViewModel().getStore('ds_smsSindo').removeAll();
    
    		
    		var params = {
	    		 V_CLASS_CD    : me.lookupReference('lc_group').getExValue()
	    		,V_KEYWORD     : me.lookupReference('txt_keyword').getExValue()
	    	};
	    	
	    	me.callStore(me, 'ds_main', '', params, null);
    		
    	}
    	Ext.Msg.alert(msgType, callback.msg);
    	
    },
    onTimeSelect : function(combo, record, eOpts){
    	var me = this;
    	
    	
    	var dateForNewStartTime = new Date(combo.getValue());
    	
    	console.log(combo);
    	console.log(dateForNewStartTime);

        var dateForEndTime = new Date();
        dateForEndTime.setHours(dateForNewStartTime.getHours()+2); 
        dateForEndTime.setMinutes(dateForNewStartTime.getMinutes());

        var timeOutField = me.lookupReference('me_sendTime').getValue();
        timeOutField.setValue(dateForEndTime);

        timeOutField.setMinimumValue(combo.getValue());
    }
})