Ext.define('ExFrm.view.sin.sin011w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin011w_03',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    onHelp:function(){},
    onDestroy:function(me){},
    onInit:function(me){},
    onAfterRender:function(){
    	var me = this;
    
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('txt_stipulation').focus();
    	
    	
    	console.log( exCommon.user.tel );
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('me_sDate').setExValue( exCommon.getMinusDay(140) );
		me.lookupReference('me_eDate').setExValue( today );
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.ClassMgtCallback);
    	},50);
    },
    ClassMgtCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_org_NmAll', '', null ,me.orgNmAllCallback);
    	},50);
    },
    orgNmAllCallback  : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_card_detail', '', null ,me.dsCardDetailCallback);
    	},50);
    },
    dsCardDetailCallback  : function (me, success, records, action){
    	
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onSelect : function (){
    	var me = this;
    	
    	var V_POST_TRANS = 0;
    	var V_DAEJU      = 0;
    	
    	var params = {
    		 V_SEARCH_GBN  : me.lookupReference('cb_Stipulation').getExValue()
    		,V_SEARCH_WORD : encodeURI(me.lookupReference('txt_stipulation').getExValue())
    		,V_CLASS_CD    : me.lookupReference('lc_classMgt').getExValue()
    		,V_ORG_CD      : me.lookupReference('lc_org_NmAll').getExValue()
    		,V_SMS_TRANS   : ''
    		,V_GROUP_TRANS : ''
    		,V_BIRTH_TRANS : ''
    		,V_DATE_GBN    : me.lookupReference('cb_date').getExValue()
    		,V_SDATE       : me.lookupReference('me_sDate').getExValue()
    		,V_EDATE       : me.lookupReference('me_eDate').getExValue()
    		,V_PAYSTATE    : me.lookupReference('paystate').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_card_detail').getAt(0).set("PRAY_NM", '0000');
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		
    		console.log( me.getViewModel().getStore('ds_main').getCount() );
    		
    		me.getViewModel().getStore('ds_main_temp').removeAll();
    		me.getViewModel().getStore('ds_main_temp').commitChanges();
    		
    		for(var i = 0; i < row ; i++){
    			var row_data = me.getViewModel().getStore('ds_main').getAt(i).data;
    			if(row_data.PAYSTATUS == '미완료'){
    				row_data.PAYDT = '00000000';
    				me.getViewModel().getStore('ds_main_temp').add(row_data);
    			}
    		}// for
    		
    		var jsonNewData = [];
    		for(var i = 0; i< me.getViewModel().getStore('ds_main_temp').getCount(); i++){
    			jsonNewData.push(me.getViewModel().getStore('ds_main_temp').getAt(i).data);
    		}
    		me.lookupReference('ds_main_temp').setExValue(Ext.encode(jsonNewData));
    		
    		exCommon.uptParamSetting(me, 'ds_card_detail' , 'ds_card_detail');
    		
    		
			setTimeout(function(){
				me.callForm(me, '/sin/SIN011W_03/resultReq.suvila', me.onResultCallback , false);
			},50);
		
    	}
    },
    onResultCallback: function(me, success, form, action){
    	var params = {
       		 V_SEARCH_GBN  : me.lookupReference('cb_Stipulation').getExValue()
       		,V_SEARCH_WORD : encodeURI(me.lookupReference('txt_stipulation').getExValue())
       		,V_CLASS_CD    : me.lookupReference('lc_classMgt').getExValue()
       		,V_ORG_CD      : me.lookupReference('lc_org_NmAll').getExValue()
       		,V_SMS_TRANS   : ''
       		,V_GROUP_TRANS : ''
       		,V_BIRTH_TRANS : ''
       		,V_DATE_GBN    : me.lookupReference('cb_date').getExValue()
       		,V_SDATE       : me.lookupReference('me_sDate').getExValue()
       		,V_EDATE       : me.lookupReference('me_eDate').getExValue()
       		,V_PAYSTATE    : me.lookupReference('paystate').getExValue()
       	}
       	
       	setTimeout(function(){
       		me.callStore(me, 'ds_main_grid', '', params ,me.onDsMainGridCallback);
       	},10);
    },
    onDsMainGridCallback: function(me, success, form, action){
    	me.lookupReference('sin011w_03_a').getView().select(0);
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin011w_02_a');
    	    	
    	exCommon.excelDown(grid, 'sindoSms', '단체신도 명단',  me.getViewModel().getStore('ds_main').getCount());
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onCellDbClickPay : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue = record.get(clickedDataIndex);
        
        var PAYSTATUS = record.get("PAYSTATUS");
        var CANCEL    = record.get("CANCEL");
        
        if(clickedDataIndex != 'CANCEL_TEMP'){
        	return;
        }
        
        if(PAYSTATUS == '결제완료' && CANCEL != 'Y'){
        	var msg = record.get("ORDNM") + '님 '+ record.get("PRAY_NM")+ ' 동참비 ' + record.get("AMOUNT")+ '원을 취소하겠습니까?';
        	
        	Ext.Msg.confirm('확인', msg, function(btn,msg,obj){
                if(btn == 'yes'){
                	me.inCancelPay(me, record);
                }
            });
        	
        }
        
    },
    inCancelPay: function(me, record){
    	$.ajax({
	        type     : "POST",
	        dataType : "json",
	        url      : "/cardCancel_keyin.jsp",
	        data     : {
	        	  MID                : record.get("MID")
	        	, TID                : record.get("TID")
	        	, CancelAmt          : record.get("AMOUNT")
	        	, CancelPwd          : '123456'
	        	, CancelMsg          : '고객변심' 
	        	, PartialCancelCode  : '0'
	        },
	        success : function(data) {
	        	console.log(data);	        		
	        	
	        	if(data.resultCode == 2001 || data.resultCode == 2015){
	        		record.set("CANCEL", 'Y');
	        		me.inCancelUpdate(me);
	        	}else{
	        		exCommon.msgAlert(data.resultMsg);
	        	}
	        },
	        error : function(e) {
	        	alert('카드결제 도중 에러가 났습니다. 다시 시도해 주십시오.');
	        }
		})
    },
    inCancelUpdate : function(me){
    	exCommon.uptParamSetting(me, 'ds_main_grid'  ,'upt_data');
    	
    	
    	setTimeout(function(){
			me.callForm(me, '/sin/SIN011W_03/updateCancel.suvila', me.inCancelUpdateCallback , false);
		},50);
    },
    inCancelUpdateCallback : function(me, success, form, action) {
    	var params = {
      		 V_SEARCH_GBN  : me.lookupReference('cb_Stipulation').getExValue()
      		,V_SEARCH_WORD : encodeURI(me.lookupReference('txt_stipulation').getExValue())
      		,V_CLASS_CD    : me.lookupReference('lc_classMgt').getExValue()
      		,V_ORG_CD      : me.lookupReference('lc_org_NmAll').getExValue()
      		,V_SMS_TRANS   : ''
      		,V_GROUP_TRANS : ''
      		,V_BIRTH_TRANS : ''
      		,V_DATE_GBN    : me.lookupReference('cb_date').getExValue()
      		,V_SDATE       : me.lookupReference('me_sDate').getExValue()
      		,V_EDATE       : me.lookupReference('me_eDate').getExValue()
      		,V_PAYSTATE    : me.lookupReference('paystate').getExValue()
      	}
      	
      	setTimeout(function(){
      		me.callStore(me, 'ds_main_grid', '', params ,me.onDsMainGridCallback);
      	},10);
    	
    	
    	setTimeout(function(){
    		exCommon.msgAlert('카드취소 완료되었습니다.');
    	},100);
    },
    onSave : function(){
    	var me = this;
    	
    	exCommon.uptParamSetting(me, 'ds_main_grid'  ,'upt_data');
    	
    	setTimeout(function(){
			me.callForm(me, '/sin/SIN011W_03/saveRemark.suvila', me.onSaveCallback , false);
		},50);
    },
    onSaveCallback : function(me, success, form, action) {
    	
    }
})


