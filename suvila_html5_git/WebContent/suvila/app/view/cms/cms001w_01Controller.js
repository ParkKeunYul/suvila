Ext.define('ExFrm.view.cms.cms001w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cms001w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
		
		me.lookupReference('sel_BudSearchGbn').setExValue(exCommon.user.searchGbn);
    },   
    onInit:function(me){
    	me.fileCheck.pop();
    	
    	setTimeout(function () {
    		me.callStore(me, 'ds_mobile_telno1', '', null ,me.MobileTelNoCallback);
        },10);
    	
    },
    MobileTelNoCallback : function(me, success, form, action){
    	setTimeout(function () {
    		me.callStore(me, 'ds_reg_gbn', '', null ,me.RegGbnCallback);
        },10);
    },
    RegGbnCallback : function(me, success, form, action){
    	setTimeout(function () {
    		me.callStore(me, 'ds_if_payment_bank_cd', '', null ,me.PaymentBankCallback);
        },10);
    },
    PaymentBankCallback : function(me, success, form, action){
    	setTimeout(function () {
    		me.callStore(me, 'ds_cms_payment_day', '', null ,me.CmsPaymentCallback);
        },10);
    },
    CmsPaymentCallback : function(me, success, form, action){
    	setTimeout(function () {
    		me.callStore(me, 'ds_cms_account_status', '', null ,me.CmsAccountCallback);
        },10);
    },
    CmsAccountCallback : function(me, success, form, action){
    	setTimeout(function () {
    		me.callStore(me, 'ds_temple_CMS_info', '', null ,me.TempleCmstCallback);
        },10);
    },
    TempleCmstCallback : function(me, success, form, action){
    	me.onSelectCms();
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSindoSearch();
    	}
    },
    onSindoSearch : function(){
    	var me = this;
    	console.log('onSindoSearch');
    	exCommon.onSindoSearch(
    		 me.lookupReference('sel_BudSearchGbn')
    		,me.lookupReference('txt_stipulation')
    		,me
    		,me.onSindoSearchReceive
    	);
    },
    onSindoSearchReceive : function(params, me){
    	var sel_BudSearchGbn = me.lookupReference('sel_BudSearchGbn').getExValue( );
    	var txt_stipulation  = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_budNo        = me.lookupReference('hid_bud_no').getExValue( );
    	
    	
    	gf_SetBudFind (params, 
			      me.lookupReference('cb_Stipulation'), 
			      me.lookupReference('txt_stipulation'), 
			      me.lookupReference('hid_bud_no') );
    	
    	
    	me.onSelectCms();
    },
    onSelectCms : function(){
    	var me = this;
    	
    	if(me.lookupReference('txt_stipulation').getExValue() == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    	}
    	
    	
    	var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDate').getExValue();
    	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDate').getExValue();
		
    	if(new Number(V_ACCEPT_SDATE) > new Number(V_ACCEPT_EDATE)){
    		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
    		me.lookupReference('me_AcceptSDate').focus();
    		return false;
    	}
    	
    	var params ={
    		 V_BUD_NO       : me.lookupReference('hid_bud_no').getExValue()
    		,V_STATUS       : me.lookupReference('lc_cms_account_status2').getExValue( )
    		,V_ACCEPT_SDATE : V_ACCEPT_SDATE
    		,V_ACCEPT_EDATE : V_ACCEPT_EDATE
    	}
    	
    	me.getViewModel().getStore('ds_main').removeAll();
    	setTimeout(function () {
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCmsCallback);
        },10);
    	
    	/*
    	
    	var myProxy  = me.getViewModel().getStore('ds_main').getProxy();
    	myProxy.params = {
    		V_BUD_NO: '',
    		V_STATUS: ''    		
        };
    	myProxy.setExtraParam('V_BUD_NO', me.lookupReference('hid_bud_no').getExValue( ));
        myProxy.setExtraParam('V_STATUS', me.lookupReference('lc_cms_account_status2').getExValue( ));
    	
        
        
        var limit = me.lookupReference('txt_limit').getExValue( );
        me.getViewModel().getStore('ds_main').pageSize = me.lookupReference('txt_limit').getExValue( );
        
    	setTimeout(function(){
    		me.getViewModel().getStore('ds_main').removeAll();
    		me.getViewModel().getStore('ds_main').load({
        		page     : 1,
        		callback : function(records, operation, success) {
        			if(success && records.length > 0){
    	    			setTimeout(function(){
    	    				me.lookupReference('cms001w_01_a').getView().select(0);
    	    			},10);
        	    	}
        		}
        	});
    	},10);
    	*/
    },
    onSelectCmsCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('cms001w_01_a').getView().select(0);
    	}
    },
    checkUpdateRow : function (me){
    	var recordAdd  = me.getViewModel().getStore('ds_main').getNewRecords().length;
    	var recordsUpt = me.getViewModel().getStore('ds_main').getUpdatedRecords().length;
    	var recordsDel = me.getViewModel().getStore('ds_main').getRemovedRecords().length;
    	
    	var recordTot = recordAdd + recordsUpt + recordsDel;
    	
    	
    	console.log('recordTot  = ', recordTot);
    	if(recordTot >= 1){
    		Ext.MessageBox.confirm('알림', "변경된 자료가 있습니다.<br/>저장후 다른 자료를 수정할수있습니다.<br/>아니오시 변경한 자료는 없어집니다.", function(btn){
        		if (btn == 'yes') {
        			setTimeout(function(){
        				me.onSave();
        			},10);
        			
        		}else{
        			me.getViewModel().getStore('ds_main').rejectChanges();
        			me.lookupReference('cms001w_01_a').getView().select(0);
        			var params = {
    		   	   		 V_SEARCH_GBN : me.lookupReference('sel_BudSearchGbn').getExValue()
    		   	   		,V_SEARCH_WORD: ""    		
    		   	   	};
    		       	me.openPopup('ExFrm.view.com.sindo',  params, me.onAddSindoReceive);
        		}
        	});
    		return false;
    	}else{
    		return true;
    	}
    	
    },
    onAddSindo : function(){
    	var me = this;
    	
    	console.log('onAddSindo', rTn);
    	
    	var rTn = me.checkUpdateRow(me);
    	console.log('onAddSindo', rTn);
    	
    	if(!rTn){
    		return false;
    	}
    	
    	var params = {
   	   		 V_SEARCH_GBN : me.lookupReference('sel_BudSearchGbn').getExValue()
   	   		,V_SEARCH_WORD: ""    		
   	   	};
       	me.openPopup('ExFrm.view.com.sindo',  params, me.onAddSindoReceive);
    	    	
    },
    onAddSindoReceive : function(params, me){
    	console.log('onAddSindoReceive', me.getViewModel().getStore('ds_temple_CMS_info').getAt(1).get("CMS_TRADE_CD"));
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	var data = {
    		 NAME_KOR           : params.NAME_KOR
    		,BUD_NO             : params.BUD_NO
    		,CMS_ACCOUNT_STATUS : "1"
    		,USE_YN             : "T"
    		,REG_GBN            : "1"
    		,REG_NO             : params.REG_NO
    		,MOBILE_TELNO1      : params.MOBILE_TELNO1
    		,MOBILE_TELNO2      : params.MOBILE_TELNO2
    		,MOBILE_TELNO3      : params.MOBILE_TELNO3
    		,CMS_TRADE_CD       : me.getViewModel().getStore('ds_temple_CMS_info').getAt(1).get("CMS_TRADE_CD")
    		,FILE_CHECK         : 1
    		,SQL_MODE           : "I"
    		,ORG_CMS_ACCOUNT_STATUS : "1"
    	};
    	

    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('cms001w_01_a').getView().select(row);
    	
    	/*
    	me.getViewModel().getStore('ds_main').insert(0,data);
    	me.getViewModel().getStore('ds_main').removeAll();
    	var myProxy  = me.getViewModel().getStore('ds_main').getProxy();
    	myProxy.params = {
    		V_BUD_NO: '',
    		V_STATUS: ''    		
        };
    	myProxy.setExtraParam('V_BUD_NO', "");
        myProxy.setExtraParam('V_STATUS', "1");
        
        var limit = me.lookupReference('txt_limit').getExValue( );
        me.getViewModel().getStore('ds_main').pageSize = me.lookupReference('txt_limit').getExValue( );
        
        me.lookupReference('lc_cms_account_status2').getExValue("1" );
        
    	setTimeout(function(){
    		me.getViewModel().getStore('ds_main').removeAll();
    		me.getViewModel().getStore('ds_main').load({
        		page     : 1,
        		callback : function(records, operation, success) {
        			if(success && records.length > 0){
    	    			setTimeout(function(){
    	    				me.getViewModel().getStore('ds_main').insert(0,data);
    	    				me.lookupReference('cms001w_01_a').getView().select(0);
    	    				
    	    				
    	    			},10);
        	    	}
        		}
        	});
    	},10);
    	*/
    },
    onAdd : function(){
    	var me = this;
    	
    	/*var rTn = me.checkUpdateRow(me);
    	
    	if(!rTn){
    		return false;
    	}*/
    	
    	var recordAdd  = me.getViewModel().getStore('ds_main').getNewRecords().length;
    	var recordsUpt = me.getViewModel().getStore('ds_main').getUpdatedRecords().length;
    	var recordsDel = me.getViewModel().getStore('ds_main').getRemovedRecords().length;
    	var recordTot = recordAdd + recordsUpt + recordsDel;
    	
    	
    	console.log('recordTot  = ', recordTot);
    	if(recordTot >= 1){
    		Ext.MessageBox.confirm('알림', "변경된 자료가 있습니다.<br/>저장후 다른 자료를 수정할수있습니다.<br/>아니오시 변경한 자료는 없어집니다.", function(btn){
        		if (btn == 'yes') {
        			setTimeout(function(){
        				me.onSave();
        			},10);
        		}
        	});
    		return false;
    	}
    	
    	
    	var selection   = me.lookupReference('cms001w_01_a').getView().getSelectionModel().getSelection();
    	var selectIndex = me.getViewModel().getStore('ds_main').indexOf(selection[0]);
    	
    	console.log('onAdd', selection);
    	
    	if(selection.length  == 0 ){
    		Ext.Msg.alert('알림', "신도를 선택후 작업하십시요.");
    		return false;
    	}
    	
    	var name   =  me.lookupReference('txt_name_kor').getExValue( );
		var bud_no =  me.lookupReference('txt_bud_no').getExValue( );
		if( name != "" && bud_no != ""){
			var data = {
				 NAME_KOR           : name
				,BUD_NO             : bud_no
				,CMS_ACCOUNT_STATUS : "1"
				,USE_YN             : "T"
				,REG_GBN            : me.lookupReference('lc_reg_gbn').getExValue( )
				,REG_NO             : me.lookupReference('em_reg_no').getExValue( )
				,MOBILE_TELNO1      : me.lookupReference('lc_mobile_telno1').getExValue( )
				,MOBILE_TELNO2      : me.lookupReference('txt_mobile_telno2').getExValue( )
				,MOBILE_TELNO3      : me.lookupReference('txt_mobile_telno3').getExValue( )
				,CMS_TRADE_CD       : me.lookupReference('lc_cms_trade_cd').getExValue( )
				,FILE_CHECK         :  1
				,SQL_MODE           : 'I'
				,ORG_CMS_ACCOUNT_STATUS : "1"
			};
			me.getViewModel().getStore('ds_main').insert(selectIndex+1,data);
			
			me.lookupReference('cms001w_01_a').getView().select(selectIndex+1);
		}
    	
    },
    onDel : function(){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('cms001w_01_a').getView().getSelectionModel().getSelection()[0];
		var selectIndex    = me.getViewModel().getStore('ds_main').indexOf(selectedRecord);
    	
    	Ext.MessageBox.confirm('경고', '삭제하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			
    			me.lookupReference('cms001w_01_a').getStore().remove(selectedRecord);
        		var sqlMode = selectedRecord.get("SQL_MODE");
        		
        		if(sqlMode == "S"){ // DB삭제
        			exCommon.fnGridSaveAll( me
							              ,'ds_main'
							              ,'newData'
							              ,'uptData'
							              ,'delData'
							              ,'/cms/CMS001W_01/onDel.suvila'
							              , me.onDelCallback
							              , true);
        		}else{
        			me.getViewModel().getStore('ds_main').commitChanges();
        			
        			console.log('selectIndex', selectIndex);
        			me.lookupReference('cms001w_01_a').getView().select(selectIndex-1);
        		}
        		
    		}
    	});
    },
    
    onDelCallback : function (me, success, records, action){
    
    	exCommon.fnGridSaveCallback(
    			 me
    			,success
    			,action
    			,'ds_main'
    	);
    	
    	
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    	
    },  
    pageingChange : function(page, currentPage){
    },    
    onPagesizeInit:[],
    onPagesizeChange : function(){
    	
    	var me = this;
    	
    	   	    	
    	if( me.onPagesizeInit.length == 1 ){
    		var myProxy  = me.getViewModel().getStore('ds_main').getProxy();
        	myProxy.params = {    		
        		V_STATUS: ''    		
            };
            myProxy.setExtraParam('V_STATUS', 2);
            
            me.onPagesizeInit.pop();
    	}
    	
    	me.getViewModel().getStore('ds_main').removeAll();    	
    	me.getViewModel().getStore('ds_main').pageSize = me.lookupReference('txt_limit').getExValue( );
    	
    	
    	setTimeout(function(){
        	me.getViewModel().getStore('ds_main').load({
        		page     : 1,
        		callback : function(records, operation, success) {
        			if(success && records.length > 0){
    	    			setTimeout(function(){
    	    				me.lookupReference('cms001w_01_a').getView().select(0);
    	    			},10);
        	    	}
        		}
        	});
		},100);
    	
    	
    },
    onExcel : function (){
    	var me = this;
    	var grid = me.lookupReference('cms001w_01_a');
    	
    	exCommon.excelDown(grid, exCommon.getNowDateTime(),'CMS회원현황',  me.getViewModel().getStore('ds_main').getCount());
    },
    onTerminate : function (){
    	var me = this;
    	
    	var selection = me.lookupReference('cms001w_01_a').getView().getSelectionModel().getSelection();
    	
    	if(selection.length > 0){
    		var recYN = me.getViewModel().getStore('ds_SubInfo').getAt(0).data.list;
    		
    		var org_stat = selection[0].get("ORG_CMS_ACCOUNT_STATUS"); 
    		var stat     = selection[0].get("CMS_ACCOUNT_STATUS"); 
    		
    			var msg = "계좌를 해지 하시 겠습니까?";
    			if(recYN > 0) msg = "선택된 계좌로 기도접수가 등록되어있습니다.<BR/>계좌를 해지 신청 하시겠습니까?"; 
    			
    			
    			Ext.MessageBox.confirm('알림', msg, function(btn) {
    				if (btn == 'yes') {
    					selection[0].set("CMS_ACCOUNT_STATUS",3 );
    					
    					
    					setTimeout(function(){
	    					exCommon.fnGridSaveAll( me
					   				               ,'ds_main'
					   				               ,'newData'
					   				               ,'uptData'
					   				               ,'delData'
					   				               ,'/cms/CMS001W_01/onTerminate.suvila'
					   				               , me.onTerminateCallback
					   				               , true);
    					},10); 
    				}
    			});
    	}else{
    		setTimeout(function(){
				Ext.Msg.alert('알림', '선택 되어진 데이터가 없습니다.');    				
			},10); 
    	}
    },
    onTerminateCallback : function (me, success, records, operation){
		console.log('onTerminateCallback',success );
		
		if(success){
			Ext.Msg.alert('알림', '해지 신청되었습니다.');
			
			setTimeout(function () {
        		me.getViewModel().getStore('ds_main').reload();
            }, 15);
		}else{
			var callback = Ext.decode(operation.response.responseText);
			Ext.Msg.alert("경고", callback.msg);
			me.getViewModel().getStore('ds_main').rejectChanges();
		}
    		
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		
    		if(record.length <= 0){
    			return;
    		}
    		
    		var addRecords  = me.getViewModel().getStore('ds_main').getNewRecords();
    		if(addRecords.length > 0){
    			var ADD_SQL_MODE = addRecords[0].get("SQL_MODE");
    			var SEL_SQL_MODE = record[0].get("SQL_MODE");
    			
    			if(ADD_SQL_MODE != SEL_SQL_MODE){
    				Ext.Msg.alert('알림', '추가후 저장하지 않은 상태로 다른 데이터를 선택시<br/>추가된 데이터는 삭제됩니다. .');
    				setTimeout(function(){
    					me.getViewModel().getStore('ds_main').rejectChanges();
    				},500);	
    			}
    		}
    		
    		
    		me.lookupReference('txt_name_kor').setExValue( record[0].get("NAME_KOR")  );
        	me.lookupReference('txt_bud_no').setExValue( record[0].get("BUD_NO")  );
        	me.lookupReference('lc_reg_gbn').setExValue( record[0].get("REG_GBN")  );
        	me.lookupReference('em_reg_no').setExValue( record[0].get("REG_NO")  );
        	me.lookupReference('lc_if_payment_bank_cd').setExValue( record[0].get("IF_PAYMENT_BANK_CD")  );
        	me.lookupReference('em_if_payment_account').setExValue( record[0].get("IF_PAYMENT_ACCOUNT")  );
        	me.lookupReference('lc_cms_payment_day').setExValue( record[0].get("CMS_PAYMENT_DAY")  );
        	me.lookupReference('lc_cms_account_status').setExValue( record[0].get("CMS_ACCOUNT_STATUS")  );
        	me.lookupReference('lc_cms_trade_cd').setExValue( record[0].get("CMS_TRADE_CD")  );
        	me.lookupReference('lc_use_yn').setExValue( record[0].get("USE_YN")  );
        	me.lookupReference('lc_mobile_telno1').setExValue( record[0].get("MOBILE_TELNO1")  );
        	me.lookupReference('txt_mobile_telno2').setExValue( record[0].get("MOBILE_TELNO2")  );
        	me.lookupReference('txt_mobile_telno3').setExValue( record[0].get("MOBILE_TELNO3")  );
        	me.lookupReference('em_crt_date').setExValue( record[0].get("CRT_DATE")  );
        	me.lookupReference('ta_memo').setExValue( record[0].get("REMARK")  );
        	me.lookupReference('txt_sql_mode').setExValue( record[0].get("SQL_MODE")  );
        	
        	
        	var cms_state = record[0].get("CMS_ACCOUNT_STATUS");
        	var sqlMode = record[0].get("SQL_MODE");
        	
        	me.lookupReference('terminationBtn').setHidden(true);
        	
        	me.lookupReference('ds_File').setHidden(false);
        	
        	
        	
        	if(cms_state == 1){
        		
        		me.lookupReference('txt_name_kor').setExReadOnly(true);
        		me.lookupReference('txt_bud_no').setExReadOnly(true);
        		me.lookupReference('lc_cms_account_status').setExReadOnly(true);
        		
        		if(sqlMode == "S"){
        			me.lookupReference('lc_reg_gbn').setExReadOnly(true);
            		me.lookupReference('em_reg_no').setExReadOnly(true);
            		me.lookupReference('lc_if_payment_bank_cd').setExReadOnly(true);
            		me.lookupReference('em_if_payment_account').setExReadOnly(true);
            		me.lookupReference('lc_cms_trade_cd').setExReadOnly(true);  
        		}else{
        			me.lookupReference('lc_reg_gbn').setExReadOnly(false);
            		me.lookupReference('em_reg_no').setExReadOnly(false);
            		me.lookupReference('lc_if_payment_bank_cd').setExReadOnly(false);
            		me.lookupReference('em_if_payment_account').setExReadOnly(false);
            		me.lookupReference('lc_cms_trade_cd').setExReadOnly(false);  
        		}
        		
        		
        		var FILE_CHECK = record[0].get("FILE_CHECK");
        		var CMS_ACCOUNT_STATUS = record[0].get("CMS_ACCOUNT_STATUS");
        		
        		if(FILE_CHECK != 1){
        			me.lookupReference('ds_File').setHidden(true);
        		}
        		
        		
        	}
        	else if(cms_state == 2){
        		
        		me.lookupReference('terminationBtn').setHidden(false);
        		
        		me.lookupReference('txt_name_kor').setExReadOnly(true);
        		me.lookupReference('txt_bud_no').setExReadOnly(true);
        		me.lookupReference('lc_reg_gbn').setExReadOnly(true);
        		me.lookupReference('em_reg_no').setExReadOnly(true);
        		me.lookupReference('lc_if_payment_bank_cd').setExReadOnly(true);
        		me.lookupReference('em_if_payment_account').setExReadOnly(true);
        		me.lookupReference('lc_cms_account_status').setExReadOnly(true);
        		me.lookupReference('lc_cms_trade_cd').setExReadOnly(true);        		

        		me.lookupReference('ds_File').setHidden(true);
        		me.lookupReference('terminationBtn').setHidden(false);
        	}
        	else if(cms_state == 3){
        		me.lookupReference('txt_name_kor').setExReadOnly(true);
        		me.lookupReference('txt_bud_no').setExReadOnly(true);
        		me.lookupReference('lc_reg_gbn').setExReadOnly(true);
        		me.lookupReference('em_reg_no').setExReadOnly(true);
        		me.lookupReference('lc_if_payment_bank_cd').setExReadOnly(true);
        		me.lookupReference('em_if_payment_account').setExReadOnly(true);
        		me.lookupReference('lc_cms_account_status').setExReadOnly(true);
        		me.lookupReference('lc_cms_trade_cd').setExReadOnly(true);        		
        		me.lookupReference('em_crt_date').setExReadOnly(true);
        		me.lookupReference('ds_File').setHidden(true);
        		
        	}
        	else if(cms_state == 4){
        		
        		me.lookupReference('txt_name_kor').setExReadOnly(true);
        		me.lookupReference('txt_bud_no').setExReadOnly(true);
        		me.lookupReference('lc_reg_gbn').setExReadOnly(false);
        		me.lookupReference('em_reg_no').setExReadOnly(false);
        		me.lookupReference('lc_if_payment_bank_cd').setExReadOnly(false);
        		me.lookupReference('em_if_payment_account').setExReadOnly(false);
        		me.lookupReference('lc_cms_account_status').setExReadOnly(true);
        		me.lookupReference('lc_cms_trade_cd').setExReadOnly(false); 
        		me.lookupReference('ds_File').setHidden(false);
        	}
        	
        	var bank_cd 	     = record[0].get("IF_PAYMENT_BANK_CD");
        	var account 	     = record[0].get("IF_PAYMENT_ACCOUNT");
        	var seq			     = record[0].get("ACCOUNT_SEQ");    	
        	var bud_no           = record[0].get("BUD_NO");
        	var cms_trade_cd     = record[0].get("CMS_TRADE_CD");
        	var rec_cms_trade_cd = record[0].get("CMS_TRADE_CD");
        	
        	if(record[0].get("FILE_CHECK")  == "1"){
        		cms_trade_cd = "";
        	}
        	
        	
        	if(bank_cd != null && bank_cd != ""  ){
        		var params  = {
        			 V_BANK_CD          : bank_cd
        			,V_ACCOUNT          : account
        			,V_SEQ              : seq
        			,V_CMS_TRADE_CD     : cms_trade_cd
        			,V_BUD_NO           : bud_no
        			,V_REC_CMS_TRADE_CD : rec_cms_trade_cd
        		}
        		
        		setTimeout(function(){
        			me.callStore(me, 'ds_SubInfo'  , '', params, me.onRecInfoCallback);
            	},100);  
        	}// if
    	}catch (e) {
    	}
    	
    	
    },
    onRecInfoCallback : function (me, success, records, operation){
    	
    	if(success && records[0].data.file.length > 0){
    	}
    },
    onSave : function (){
    	var me = this;
    	
    	
    	var selectedRecord = me.lookupReference('cms001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var lc_cms_trade_cd = me.lookupReference('lc_cms_trade_cd').getExValue();
    	var cms_record      = me.lookupReference('lc_cms_trade_cd').findRecord(me.lookupReference('lc_cms_trade_cd').valueField || me.lookupReference('lc_cms_trade_cd').displayField, lc_cms_trade_cd);
    	var cms_index       = me.lookupReference('lc_cms_trade_cd').store.indexOf(cms_record);
    	
    	
    	if(me.lookupReference('regform').invalidateForm() == false){
            return;
        }
    	
    	
    	var CMS_PAYMENT_MISU_DAY = me.getViewModel().getStore('ds_temple_CMS_info').getAt(cms_index).get("CMS_PAYMENT_MISU_DAY");
    	var lc_cms_payment_day   = me.lookupReference('lc_cms_payment_day').getExValue();
    	
    	if(CMS_PAYMENT_MISU_DAY == lc_cms_payment_day){
    		
    		setTimeout(function(){
    			Ext.Msg.alert('경고',  "미납출금일 [" + CMS_PAYMENT_MISU_DAY + "일]은 출금일로 지정할 수 없습니다.");    				
    		},50);  
    		me.lookupReference('lc_cms_payment_day').focus();
    		return false;
    	}
    	
		
    	
    	var SQL_MODE               = selectedRecord.get("SQL_MODE");
    	var ORG_CMS_ACCOUNT_STATUS = selectedRecord.get("ORG_CMS_ACCOUNT_STATUS");
    	var ORG_IF_PAYMENT_BANK_CD = selectedRecord.get("ORG_IF_PAYMENT_BANK_CD");
    	var ORG_IF_PAYMENT_ACCOUNT = selectedRecord.get("ORG_IF_PAYMENT_ACCOUNT");
    	var ORG_REG_NO             = selectedRecord.get("ORG_REG_NO");
    	var IF_PAYMENT_BANK_CD     = me.lookupReference('lc_if_payment_bank_cd').getExValue();
    	var IF_PAYMENT_ACCOUNT     = me.lookupReference('em_if_payment_account').getExValue();
    	var REG_NO                 = me.lookupReference('em_reg_no').getExValue();
    	var FILE_NAME              = me.lookupReference('ds_File').getValue();
    	
    	
    	if(SQL_MODE == "S" && ORG_CMS_ACCOUNT_STATUS == "4"){
    		if( ORG_IF_PAYMENT_BANK_CD == IF_PAYMENT_BANK_CD && ORG_IF_PAYMENT_ACCOUNT == IF_PAYMENT_ACCOUNT && ORG_REG_NO == REG_NO ){
    			
    			var msgFlag = true;
    			console.log('me.fileCheck[0] = ', me.fileCheck[0]);
    			
    			if( me.fileCheck.length == 1  && me.fileCheck[0] == "OK" ){
    				msgFlag = false;
    			}
    			
    			console.log('msgFlag = ', msgFlag);
    			
    			if(msgFlag){
    				setTimeout(function(){
            			Ext.Msg.alert('경고',  "출금 계좌정보 변경 혹은 CMS 동의서류가 필요합니다.");
            		},50);
    				return false;
    			}
    		}
    		
    		/*if(FILE_NAME == null || FILE_NAME == ""){
    			setTimeout(function(){
        			Ext.Msg.alert('경고',  "재신청시 CMS 동의서류가 필요합니다.");
        		},50);
    			me.lookupReference('ds_File').focus();
    			return false;
    		}*/
    		
    		else if( (ORG_IF_PAYMENT_BANK_CD != IF_PAYMENT_BANK_CD || ORG_IF_PAYMENT_ACCOUNT != IF_PAYMENT_ACCOUNT || ORG_REG_NO != REG_NO) &&  (FILE_NAME != null && FILE_NAME != "") ){
    			me.lookupReference('lc_cms_account_status').setExValue();
    		}    		
    	}
    	
    	if(SQL_MODE == "I" && me.lookupReference('lc_cms_account_status').getExValue() == "1" && (FILE_NAME == null || FILE_NAME == "")  ){
    		setTimeout(function(){
    			Ext.Msg.alert('경고',  "신규가입시 신청시 CMS 동의서류가 필요합니다.");
    		},50);
    		me.lookupReference('ds_File').focus();
    		return false;
    	}
    	
    	
    	if( (SQL_MODE == "S" && ORG_CMS_ACCOUNT_STATUS == "4" ) || SQL_MODE == "I"){
    		if(me.fileCheck.length > 0){
    			setTimeout(function(){
    				if("OK"!= me.fileCheck[0]){
    					Ext.Msg.alert('경고',  me.fileCheck[0] );
    					return false;
    				}
        		},50);
    		}
	    	me.lookupReference('lc_cms_account_status').setExValue(1);
	    	console.log('lc_cms_account_status', me.lookupReference('lc_cms_account_status').getExValue());
    	}
    	
    	console.log('lc_cms_account_status = ', me.lookupReference('lc_cms_account_status').getExValue());
    	
    	
    	Ext.MessageBox.confirm('알림', '저장하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			me.settingData(me ,selectedRecord);    			
    			setTimeout(function () {
       				me.callForm(me, '/cms/CMS001W_01/onSave.suvila', me.onSaveCallback , false);
    	        }, 100);
    		}
    	}); 
    },
    settingData: function (me , selectedRecord){
    	
    	selectedRecord.set("CMS_ACCOUNT_STATUS" ,  me.lookupReference('lc_cms_account_status').getExValue() );
    	selectedRecord.set("CMS_PAYMENT_DAY"    ,  me.lookupReference('lc_cms_payment_day').getExValue() );
    	selectedRecord.set("CMS_TRADE_CD"       ,  me.lookupReference('lc_cms_trade_cd').getExValue() );
    	selectedRecord.set("IF_PAYMENT_ACCOUNT" ,  me.lookupReference('em_if_payment_account').getExValue() );
    	selectedRecord.set("IF_PAYMENT_BANK_CD" ,  me.lookupReference('lc_if_payment_bank_cd').getExValue() );
    	selectedRecord.set("MOBILE_TELNO1"      ,  me.lookupReference('lc_mobile_telno1').getExValue() );
    	selectedRecord.set("MOBILE_TELNO2"      ,  me.lookupReference('txt_mobile_telno2').getExValue() );
    	selectedRecord.set("MOBILE_TELNO3"      ,  me.lookupReference('txt_mobile_telno3').getExValue() );
    	selectedRecord.set("REG_GBN"            ,  me.lookupReference('lc_reg_gbn').getExValue() );
    	selectedRecord.set("REG_NO"             ,  me.lookupReference('em_reg_no').getExValue() );
    	selectedRecord.set("REMARK"             ,  me.lookupReference('ta_memo').getExValue() );
    	selectedRecord.set("USE_YN"             ,  me.lookupReference('lc_use_yn').getExValue() );
    	
    	
    	console.log('CMS_ACCOUNT_STATUS = ',selectedRecord.get("CMS_ACCOUNT_STATUS") );
    	
    	var jsonNewData = [];
    	jsonNewData.push(selectedRecord.data);
    	me.lookupReference('newData').setExValue( Ext.encode(jsonNewData) );
    },
    onSaveCallback : function(me, success, form, action){
    	console.log('onSaveCallback = ',success );
    	if(success){
    		me.getViewModel().getStore('ds_main').reload();
    		Ext.Msg.alert("알림", "저장되었습니다.");    		    		    		
    	}else{
    		Ext.Msg.alert("알림", "다시 시도해주세요.");
    	}
    },
    onDestroy: function  ( panel , eOpts ){
    	var me = this;
    	
    	me.fileCheck.pop();
    	
    }
    ,fileCheck : []
    ,fileChange  : function(widget, value, eOpts){
    	var me = this; // the controller
    	
    	me.fileCheck.pop();
    	
    	var files = event.target.files
    	console.log('files', event.target.files);
    	
        
    	if (!files || files.length == 0) return;
   
        
    	var eXtend = files[0].name.substring(files[0].name.lastIndexOf(".")+1,files[0].name.length);
    	    eXtend = eXtend.toLowerCase();
    	    console.log('eXtend  =', eXtend);
	    
    	if( !( eXtend == 'jpg' || eXtend == 'jpeg'  || eXtend == 'gif' || eXtend == 'tif' || eXtend == 'mp3'  || eXtend == 'wav' ) ){
			setTimeout(function(){
    			Ext.Msg.alert('경고',  "동의서 스캔파일 JPG, JPEG, GIF, TIF<br/> 동의서 녹취록 파일 MP3, WAV 확장자만 첨부 가능합니다.");
    		},50);
			me.lookupReference('ds_File').focus();
			
			me.fileCheck.push("동의서 스캔파일 JPG, JPEG, GIF, TIF<br/> 동의서 녹취록 파일 MP3, WAV 확장자만 첨부 가능합니다.");
			
			return false;
		}
    	
    	
    	if( (eXtend == 'jpg' || eXtend == 'jpeg'  || eXtend == 'gif' || eXtend == 'tif') &&  files[0].size >= 300000  ){
    		setTimeout(function(){
    			Ext.Msg.alert('경고',  "CMS가입동의서 스캔파일 용량은 300kb 이하로만 첨부 가능합니다.");
    		},50);
    		me.fileCheck.push("CMS가입동의서 스캔파일 용량은 300kb 이하로만 첨부 가능합니다.");
			return false;
		}
		
		if( (eXtend == 'mp3' || eXtend == 'wav') &&  files[0].size >= 200000  ){
			setTimeout(function(){
    			Ext.Msg.alert('경고',  "CMS 가입동의 녹취파일은 용량은 200kb 이하로만 첨부 가능합니다.");
    		},50);
			me.fileCheck.push("CMS 가입동의 녹취파일은 용량은 200kb 이하로만 첨부 가능합니다.");
			return false;
		}
		console.log('fileChange ENd');
		me.fileCheck.push("OK");
		
    },
    onCmsUptHis : function(){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('cms001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var params = {
    		 V_CMS_TRADE_CD : selectedRecord.get("CMS_TRADE_CD")
  	   		,V_IF_MEMBER_ID : selectedRecord.get("IF_MEMBER_ID")    		
  	   	};
      	me.openPopup('ExFrm.view.cms.cms001p_01',  params, null);
    }
    
})