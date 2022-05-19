Ext.define('ExFrm.view.asp.asp010w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp010w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_templeCd', '', null, me.onInitCallback);    		
       	},300);
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_payment_day_gbn', '', null, me.onDayGbnCallback);    		
       	},500);
    	
    },
    onDayGbnCallback : function(me, success, records, operation){
    	
    	if(success && records.length > 0){
    		console.log("onDayGbnCallback = ", success);
    		me.getViewModel().getStore('ds_payment_day_gbn').filter("SEQ", "2");
    	}
    },
    onInitCallback : function (me, success, records, operation){
    	console.log('onInitCallback', success);
    	
    	if(success && records.length > 0){
    		me.lookupReference('asp010w_01_a').getView().select(0);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	me.lookupReference('lc_use_yn').setExValue( "" );
		me.lookupReference('select_temple_cd').setExValue( "" );
		me.lookupReference('txt_new_cms_trade_cd').setExValue( "" );
		me.lookupReference('txt_cms_trade_cd').setExValue( "" );
		me.lookupReference('pw_cms_trade_pw').setExValue( "" );
		me.lookupReference('em_cms_entrance_fee').setExValue( "" );
		me.lookupReference('em_month_limit_amount').setExValue( "" );
		me.lookupReference('em_once_max_amount').setExValue( "" );
		me.lookupReference('txt_remark').setExValue( "" );
		me.lookupReference('select_customer_comment').setExValue( "" );
		me.lookupReference('select_sql_mode').setExValue( "" );
		me.lookupReference('lc_misu_method').setExValue("");
    	
    	
    	if(record.length > 0){
    		var V_TEMPLE = record[0].get("TEMPLE_CD");
    		var params = {
    			V_TEMPLE : V_TEMPLE
    		}
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_main', '', params, me.onSelectionChangeCallback);
    		},10);
    	}
    },
    onSelectionChangeCallback:function(me, success, records, operation){
    	if(records.length > 0){
    		
    		setTimeout(function(){
    			me.lookupReference('asp010w_01_b').getView().select(0);
    		},10);
    	}
    },
    onSelectionCms : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	if(record.length > 0){
    		
    		setTimeout(function(){
    			me.lookupReference('lc_misu_method').setExValue( record[0].get("MISU_METHOD") );
    		},50);
    		
    		me.lookupReference('lc_use_yn').setExValue( record[0].get("USE_YN") );
    		me.lookupReference('select_temple_cd').setExValue( record[0].get("TEMPLE_CD") );
    		me.lookupReference('txt_new_cms_trade_cd').setExValue( record[0].get("NEW_CMS_TRADE_CD") );
    		me.lookupReference('txt_cms_trade_cd').setExValue( record[0].get("CMS_TRADE_CD") );
    		me.lookupReference('pw_cms_trade_pw').setExValue( record[0].get("CMS_TRADE_PW") );
    		me.lookupReference('em_cms_entrance_fee').setExValue( record[0].get("CMS_ENTRANCE_FEE") );
    		me.lookupReference('em_month_limit_amount').setExValue( record[0].get("MONTH_LIMIT_AMOUNT") );
    		me.lookupReference('em_once_max_amount').setExValue( record[0].get("ONCE_MAX_AMOUNT") );
    		me.lookupReference('txt_remark').setExValue( record[0].get("tx_remark") );
    		me.lookupReference('select_customer_comment').setExValue( record[0].get("CMS_CUSTOMER_COMMENT") );
    		me.lookupReference('select_sql_mode').setExValue( record[0].get("SQL_MODE") );
    		
    		
    		if(record[0].get("SQL_MODE") == "I"){
    			me.lookupReference('txt_new_cms_trade_cd').setReadOnly(false);
        		me.lookupReference('txt_cms_trade_cd').setReadOnly(false);
        		
        		me.lookupReference('txt_new_cms_trade_cd').focus();
    		}else{
    			me.lookupReference('txt_new_cms_trade_cd').setReadOnly(true);
        		me.lookupReference('txt_cms_trade_cd').setReadOnly(true);
        		
        		var NEW_CMS_TRADE_CD = me.lookupReference('txt_new_cms_trade_cd').getExValue( );
        		if(NEW_CMS_TRADE_CD == "" || NEW_CMS_TRADE_CD == null){
        			me.lookupReference('txt_new_cms_trade_cd').setReadOnly(false);
        		}
    		}
    		
    		var params ={
    			 V_TEMPLE       : record[0].get("TEMPLE_CD")
    			,V_CMS_TRADE_CD : record[0].get("CMS_TRADE_CD")
    		};
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_payDay', '', params, null);
    		},10);
    		
    		
    	}
    },
    onInput : function (){
    	var me = this;
    	console.log('onInput' , me.lookupReference('select_temple_cd').getExValue());
    	
    	if( me.lookupReference('select_temple_cd').getExValue() == "000000" ){
    		Ext.Msg.alert('경고', '기준사찰은 추가할수 없습니다.');
    		return false;
    	}
    	
    	var records = me.getViewModel().getStore('ds_main').getNewRecords();
    	
    	
    	if( records.length > 0 ){
    		setTimeout(function(){
    			Ext.Msg.alert('경고', '입력중인 CMS 계정이 있습니다.');
    		},50);
    		me.lookupReference('txt_new_cms_trade_cd').focus();
    		return false;
    	}
    	
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	var data = {
			 TEMPLE_CD            : me.lookupReference('select_temple_cd').getExValue()    			
			,USE_YN               : "T"
			,MISU_METHOD          : "2"
			,CMS_CUSTOMER_COMMENT :  me.lookupReference('select_customer_comment').getExValue()
			,SQL_MODE             : "I"
		    ,CMS_ENTRANCE_FEE     : "0"
		    ,MONTH_LIMIT_AMOUNT   : "0"
		    ,ONCE_MAX_AMOUNT      : "0"
    	};
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	
    	setTimeout(function(){
    		me.lookupReference('asp010w_01_b').getView().select(rowCount);
    	},10);    	
    },
    onSave : function (){
    	var me = this;
    	
    	me.lookupReference('uptData').setExValue("");
    	
    	if(me.lookupReference('regform').invalidateForm() == false){
            return;
        }
    	
    	var MONTH_LIMIT_AMOUNT = new Number( me.lookupReference('em_month_limit_amount').getExValue()  );
    	var ONCE_MAX_AMOUNT    = new Number( me.lookupReference('em_once_max_amount').getExValue() );
    	
    	if(MONTH_LIMIT_AMOUNT <= 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', '월 출금 한도금액은 0원을 초과해야 합니다.');
			},50);
    		me.lookupReference('em_month_limit_amount').focus();
			return false;
    	}
    	
    	if(ONCE_MAX_AMOUNT <= 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', '건당 최대 이체 금액은 0원을 초과해야 합니다.');
			},50);
    		me.lookupReference('em_once_max_amount').focus();
			return false;
    	}
    	
    	if( MONTH_LIMIT_AMOUNT <= ONCE_MAX_AMOUNT ){
    		setTimeout(function(){
				Ext.Msg.alert('알림', '월 츨금 한도금액은 건당 최대 이체금액보다 작을 수 없습니다.');
			},50);
    		me.lookupReference('em_month_limit_amount').focus();
    		return false;
    	}
    	
    	
    	
    	var jsonUptData = [];
        var records = me.getViewModel().getStore('ds_payDay').getUpdatedRecords();
        for (var i=0; i < records.length; i++){       
        	jsonUptData.push(records[i].data);        	
        }
        me.lookupReference('uptData').setExValue(Ext.encode(jsonUptData));
        console.log('uptData', me.lookupReference('uptData').getValue() );
    	
        
        me.callForm(me, '/asp/asp010w_01/saveCMSInfo.suvila', me.onSaveCallback , false);
        
    },
    onSaveCallback : function(me, success, form, action){
    	console.log('onSaveCallback', action);
    	
    	var callback = Ext.decode(action.response.responseText);	
    	var msgType = "경고";
    	
    	if(success){
    		msgType = "알림";
    		
    		var params = {
				V_TEMPLE : me.lookupReference('select_temple_cd').getExValue()
			}
			
			setTimeout(function(){
				me.callStore(me, 'ds_main', '', params, me.onSelectionChangeCallback);
			},10);
    	}
    	Ext.Msg.alert(msgType, callback.msg);
    	
    }
})