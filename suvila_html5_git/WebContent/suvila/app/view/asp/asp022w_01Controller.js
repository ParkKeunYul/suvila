Ext.define('ExFrm.view.asp.asp022w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp022w_01',    
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
    },
    onInitCallback : function (me, success, records, operation){
    	console.log('onInitCallback', success);
    	
    	if(success && records.length > 0){
    		me.lookupReference('asp022w_01_a').getView().select(8);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	if( record.length == 1){
    		
    		var params  = {
    			 TEMPLE_CD : record[0].get("TEMPLE_CD")
    			,PGCODE    : "01"
    		};
    		
    		me.lookupReference('txt_TEMPLE_CD').setExValue( record[0].get("TEMPLE_CD") );	
    		
    		setTimeout(function(){
    			
    			me.getViewModel().getStore('ds_sub').removeAll();
    			me.callStore(me, 'ds_main', null, params, me.onSelectionChangeCallback);
    		},10);
    	}else{
    		
    	}
    },    
    onSelectionChangeCallback : function(me, success, records, operation){
    	if(success && records.length > 0){
    		
    		me.lookupReference('txt_SUB1_TRADE_ID').setExValue( records[0].get("SUB1_TRADE_ID") );
    		me.lookupReference('txt_SUB1_TRADE_PW').setExValue( records[0].get("SUB1_TRADE_PW") );
    		me.lookupReference('txt_SUB2_TRADE_ID').setExValue( records[0].get("SUB2_TRADE_ID") );
    		me.lookupReference('txt_SUB2_TRADE_PW').setExValue( records[0].get("SUB2_TRADE_PW") );
    		me.lookupReference('txt_KEYIN_LICENSE').setExValue( records[0].get("KEYIN_LICENSE") );
    		me.lookupReference('txt_REP_TRADE_ID').setExValue( records[0].get("REP_TRADE_ID") );
    		me.lookupReference('txt_REP_TRADE_PW').setExValue( records[0].get("REP_TRADE_PW") );
    		me.lookupReference('txt_TP_RATE_COMMISSION').setExValue( records[0].get("TP_RATE_COMMISSION") );
    		me.lookupReference('txt_TP_COMMISSION_FROM').setExValue( records[0].get("TP_COMMISSION_FROM") );
    		me.lookupReference('txt_TP_COMMISSION_TO').setExValue( records[0].get("TP_COMMISSION_TO") );
    		me.lookupReference('lc_use_yn').setExValue( records[0].get("USE_YN") );
    		me.lookupReference('txt_DEVICEPRICE').setExValue( records[0].get("DEVICEPRICE") );
    		me.lookupReference('txt_accname').setExValue( records[0].get("ACCNAME") );
    		me.lookupReference('txt_ACCT_GBN').setExValue( records[0].get("ACCT_GBN") );
    		me.lookupReference('txt_IE_GBN').setExValue( records[0].get("IE_GBN") );
    		me.lookupReference('txt_KWAN').setExValue( records[0].get("KWAN") );
    		me.lookupReference('txt_HANG').setExValue( records[0].get("HANG") );
    		me.lookupReference('txt_MOK').setExValue( records[0].get("MOK") );
    		me.lookupReference('txt_SQL_MODE').setExValue("S" );
    		me.lookupReference('remark').setExValue( records[0].get("REMARK") );
    		me.lookupReference('txt_PGCODE').setExValue( records[0].get("PGCODE") );
    		me.lookupReference('txt_SMS_FORMAT').setExValue( records[0].get("SMS_FORMAT") );
    		
    		
    		var params  = {
	   			 TEMPLE_CD : records[0].get("TEMPLE_CD")
	   			,PGCODE    : records[0].get("PGCODE")
    		};
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_sub', null, params, me.getDsSubCallback);
    		},10);
    		
    	}else{
    		me.lookupReference('txt_SUB1_TRADE_ID').setExValue( "" );
    		me.lookupReference('txt_SUB1_TRADE_PW').setExValue( "" );
    		me.lookupReference('txt_SUB2_TRADE_ID').setExValue( "" );
    		me.lookupReference('txt_SUB2_TRADE_PW').setExValue( "" );
    		me.lookupReference('txt_KEYIN_LICENSE').setExValue( "" );
    		me.lookupReference('txt_REP_TRADE_ID').setExValue( "" );
    		me.lookupReference('txt_REP_TRADE_PW').setExValue( "");
    		me.lookupReference('txt_TP_RATE_COMMISSION').setExValue( "" );
    		me.lookupReference('txt_TP_COMMISSION_FROM').setExValue( "" );
    		me.lookupReference('txt_TP_COMMISSION_TO').setExValue( "" );
    		me.lookupReference('lc_use_yn').setExValue( "" );
    		me.lookupReference('txt_DEVICEPRICE').setExValue( "" );
    		me.lookupReference('remark').setExValue( "" );
    		me.lookupReference('txt_accname').setExValue( "" );
    		
    		me.lookupReference('txt_ACCT_GBN').setExValue("" );
    		me.lookupReference('txt_IE_GBN').setExValue( "" );
    		me.lookupReference('txt_KWAN').setExValue("" );
    		me.lookupReference('txt_HANG').setExValue( "" );
    		me.lookupReference('txt_MOK').setExValue( "" );
    		me.lookupReference('txt_SQL_MODE').setExValue("I");
    		
    		me.lookupReference('txt_PGCODE').setExValue( "" );
    		me.lookupReference('txt_SMS_FORMAT').setExValue( "" );
    	}
    },
    getDsSubCallback : function (me, success, records, operation){
    	console.log('getDsSubCallback', success);
    },
    onSave : function(){
    	var me = this;
    	
    	if(me.lookupReference('regform').invalidateForm() == false){
            return;
        }
    	
    	var selectData = me.getViewModel().getStore('ds_main').getAt(0);
    	
    	
    	var SQL_MODE = me.lookupReference('txt_SQL_MODE').getExValue();
    	
    	if(SQL_MODE == "I"){  // 신규
    		
    		
    		if(txt_TP_COMMISSION_TO == "" || txt_TP_COMMISSION_TO == null){
    			txt_TP_COMMISSION_TO = "00000000";
    		}
    		
    		
    		var dsData = {
				 TEMPLE_CD          : me.lookupReference('txt_TEMPLE_CD').getExValue()
				,PGCODE             : "01"
				,TP_RATE_COMMISSION : me.lookupReference('txt_TP_RATE_COMMISSION').getExValue()
				,TP_COMMISSION_FROM : me.lookupReference('txt_TP_COMMISSION_FROM').getExValue()
				,TP_COMMISSION_TO   : txt_TP_COMMISSION_TO
			};
			me.getViewModel().getStore('ds_sub').add(dsData);
    		
    		
    	}
    	else if(SQL_MODE == "S"){  // 업데이트
    		
    		console.log('SQL_MODE', 'S');
    		
    		var sel_TP_RATE_COMMISSION = selectData.get("TP_RATE_COMMISSION");
    		var sel_TP_COMMISSION_FROM = selectData.get("TP_COMMISSION_FROM");
    		var sel_TP_COMMISSION_TO   = selectData.get('TP_COMMISSION_TO');
    		
    		
    		console.log('sel_TP_COMMISSION_TO111', sel_TP_COMMISSION_TO);
    		
    		var txt_TP_RATE_COMMISSION = me.lookupReference('txt_TP_RATE_COMMISSION').getExValue();
    		var txt_TP_COMMISSION_FROM = me.lookupReference('txt_TP_COMMISSION_FROM').getExValue();
    		var txt_TP_COMMISSION_TO   = me.lookupReference('txt_TP_COMMISSION_TO').getExValue();
    		if(txt_TP_COMMISSION_TO == "" || txt_TP_COMMISSION_TO == null){
    			txt_TP_COMMISSION_TO = "00000000";
    		}
    		
    		
    		
    		
    		var isChg1 = false;
    		var isChg2 = false;
    		var isChg3 = false;
    		if(sel_TP_RATE_COMMISSION !=  txt_TP_RATE_COMMISSION){
    			isChg1 = true;
    		}
    		
    		if(sel_TP_COMMISSION_FROM !=  txt_TP_COMMISSION_FROM){
    			isChg2 = true;
    		}
    		
    		if(sel_TP_COMMISSION_TO  !=  txt_TP_COMMISSION_TO){
    			isChg3 = true;
    		}
    		
    		
    		
    		var isChange =  false;    		
    		if(isChg1 || isChg2 || isChg3){
    			isChange = true;
    		}
    		
    		
    		console.log('isChg1', isChg1);
    		console.log('isChg2', isChg2);
    		console.log('isChg3', isChg3);
    		
    		var rowCount = me.getViewModel().getStore('ds_sub').getCount();
    		
    		if (isChange){
    			
    			if (isChg1 == true && isChg2 ==false && isChg3 ==false){ 
    				
    				for(var i=0; i<rowCount; i++){
    					
    					var store_COMMISSION_FROM = me.getViewModel().getStore('ds_sub').getAt(i).get("TP_COMMISSION_FROM");
						var store_COMMISSION_TO   = me.getViewModel().getStore('ds_sub').getAt(i).get("TP_COMMISSION_TO");
						
						if (txt_TP_COMMISSION_FROM == store_COMMISSION_FROM && txt_TP_COMMISSION_TO == store_COMMISSION_TO ){
							me.getViewModel().getStore('ds_sub').getAt(i).set("TP_RATE_COMMISSION", txt_TP_RATE_COMMISSION);							
						}
    				}// for
    			}// if
    			else{
    				
    				
    				var strTo   = txt_TP_COMMISSION_TO;
    				var strFrom = txt_TP_COMMISSION_FROM;
    				
    				if(strTo = "00000000"){
    					strTo = "99999999";
    				}
    				
    				if(strFrom > strTo){
    					Ext.Msg.alert('알림', '수수료 적용기간 설정이 잘못되었습니다.');
    					me.lookupReference('txt_TP_COMMISSION_FROM').focus();
    					return false;
    				}
    				
    				for(var i=0; i<rowCount; i++){
    					
    					var store_COMMISSION_FROM = me.getViewModel().getStore('ds_sub').getAt(i).get("TP_COMMISSION_FROM");
						var store_COMMISSION_TO   = me.getViewModel().getStore('ds_sub').getAt(i).get("TP_COMMISSION_TO");
						
						if (store_COMMISSION_TO =="00000000"){
							store_COMMISSION_TO ="99999999";
						}
						
						if (strFrom <= store_COMMISSION_FROM){
							console.log('strFrom <= store_COMMISSION_FROM',strFrom );
							console.log('strFrom <= store_COMMISSION_FROM',store_COMMISSION_FROM );
							Ext.Msg.alert('알림', '기간 From 보다 작거나 같은수 없습니다.');
							return false;
						}
						
						if (store_COMMISSION_TO !="99999999"){
							if (strFrom >=store_COMMISSION_FROM && strFrom < store_COMMISSION_TO){
								
								console.log('Date.today()', Date.today());
								
								var strToday = Date.today().toString('yyyyMMdd');
								if ( tgtFrom > strToday) {
									Ext.Msg.alert('알림', '기간이 겹칩니다.');
									
									return false;
								}
							}
						}
    				}// for
    				
    				
    				var strYY =  me.lookupReference('txt_TP_COMMISSION_FROM').getExValue().substr(0,4);  
					var strMM =  me.lookupReference('txt_TP_COMMISSION_FROM').getExValue().substr(4,2);  
					var strDD =  me.lookupReference('txt_TP_COMMISSION_FROM').getExValue().substr(6,2); 
					
					
					
					var setDate = exCommon.getDateAddDate( -1 , null , me.lookupReference('txt_TP_COMMISSION_FROM').getExValue() );
					
    				
					me.getViewModel().getStore('ds_sub').getAt(0).set("TP_COMMISSION_TO", setDate)
					
					var dsData = {
						 TEMPLE_CD          : me.getViewModel().getStore('ds_main').getAt(0).get("TEMPLE_CD")
						,PGCODE             : me.getViewModel().getStore('ds_main').getAt(0).get("PGCODE")
						,TP_RATE_COMMISSION : txt_TP_RATE_COMMISSION
						,TP_COMMISSION_FROM : txt_TP_COMMISSION_FROM
						,TP_COMMISSION_TO   : txt_TP_COMMISSION_TO
					};
					me.getViewModel().getStore('ds_sub').add(dsData);
					
    			}// 
    			
    		}// if isChange
    	}// SQL_MODE s
    	
    	me.lookupReference('newData').setExValue("");
		me.lookupReference('uptData').setExValue("");
    	
		var jsonNewData = [];
		var records = me.getViewModel().getStore('ds_sub').getNewRecords();
		for (var i=0; i < records.length; i++){
	    	jsonNewData.push(records[i].data);
	    }
		me.lookupReference('newData').setExValue(Ext.encode(jsonNewData));
		
		var jsonUptData = [];
	    records = me.getViewModel().getStore('ds_sub').getUpdatedRecords();
	    for (var i=0; i < records.length; i++){       
	    	jsonUptData.push(records[i].data);
	    }
	    me.lookupReference('uptData').setExValue(Ext.encode(jsonUptData));
	   
	    setTimeout(function(){
			me.callForm(me, '/asp/asp022w_01/save.suvila', me.onSaveCallback , false);
		},10);
		
    	
    },
    onSaveCallback : function(me, success, form, action){    	
    	console.log('onSaveCallback', success);
    	exCommon.fnGridSaveCallback(me , success, action ,'ds_sub');
    	
    },
    onKhmFind : function(){
    	var me = this;
    	
    	
    	
    	var ACCT_GBN = "";
    	var IE_GBN   = "";
    	var KWAN     = "";
    	var MOK      = "";
    	var HANG     = "";
    	var HANG_NAME= "";
    	var MOK_NAME = "";
    	
    	var  rowCnt = me.getViewModel().getStore('ds_main').getCount() ;
    	var data = me.getViewModel().getStore('ds_main').getAt(0);
    	console.log('data', data);
    	
    	console.log('rowCnt = ', rowCnt);
    	if( rowCnt > 0 ){
    		ACCT_GBN = data.get("ACCT_GBN");
        	IE_GBN   = data.get("IE_GBN");
        	KWAN     = data.get("KWAN");
        	MOK      = data.get("MOK");
        	HANG     = data.get("HANG");
        	HANG_NAME= data.get("ACCNAME");
        	MOK_NAME = data.get("ACCNAME");
    	}else{
    		ACCT_GBN = "1"
            IE_GBN   = "O";
            KWAN     = "";
            MOK      = "";
            HANG     = "";
            HANG_NAME= "";
            MOK_NAME = "";
    	}
    	
    	var params  =  {
    		 ACCT_GBN  : ACCT_GBN    		 
    		,IE_GBN    : IE_GBN
    		,KWAN      : KWAN
    		,MOK       : MOK
    		,HANG      : HANG
    		,HANG_NAME : HANG_NAME
    		,MOK_NAME  : MOK_NAME
    	};
    	
    	console.log('onKhmFind', params);
    	
    	
    	this.openPopup('ExFrm.view.com.accounts',  params, this.onCellDbClickReceive);
    },
    onCellDbClickReceive : function(params, me){
    	console.log('onCellDbClickReceive', params);
    	
    	me.lookupReference('txt_accname').setExValue( params.MOK_NAME );
		me.lookupReference('txt_ACCT_GBN').setExValue(params.ACCT_GBN );
		me.lookupReference('txt_IE_GBN').setExValue( params.IE_GBN );
		me.lookupReference('txt_KWAN').setExValue(params.KWAN );
		me.lookupReference('txt_HANG').setExValue( params.HANG );
		me.lookupReference('txt_MOK').setExValue( params.MOK );
    	
    }
})