Ext.define('ExFrm.view.sin.sin011w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin011w_02',    
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
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row > 0){
    			me.lookupReference('sin011w_02_a').getView().select(0);
    		}
    	}
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
    onSettingCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    	}
    },
    onSetting : function(){
    	var me = this;
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	
    	if (rowCnt == 0) {
    		exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
		}
    	
    	if(!me.inValidation(me) ) {
    		return;
    	}
    	
    	var jsonUptData = [];
    	
    	Ext.MessageBox.confirm('알림', '정산처리 하시겠습니까?<br/>저장후 변경할수 없습니다.', function(btn){
    		if (btn == 'yes') {    			
    			var today = exCommon.getNowDate('') ;
    			var row   = me.getViewModel().getStore('ds_main').getCount();
    			
    			for(var i = 0; i < row; i++){
    				var record         = me.getViewModel().getStore('ds_main').getAt(i);
    	    		var CHECK_P        = exCommon.getTF(record.get("CHECK_P"));
    	    		var SETTING_DATE_R = exCommon.getRepVal(record.get("R_SETTING_DATE"), '');
    	    		
    	    		if(CHECK_P == 'T' && SETTING_DATE_R == ''){
    	    			record.set("SETTING_DATE",today );
    	    			jsonUptData.push(record.data);
    	    		}
    			}// for
    			
    			me.lookupReference('uptData').setExValue(Ext.encode(jsonUptData));
    			
    			setTimeout(function(){
    				me.callForm(me, '/sin/SIN017W_01/saveSetting.suvila', me.onSettingCallback , false);
    			},50);	
    		}
    	});
    },
    onMouseRight:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('sin011w_02_a').getView().getSelectionModel().getSelection();
    	
    	me.openPopup('ExFrm.view.sin.sin011p_01_mouse',  selectedRecord , me.onMouseRightReceive);
    	
    },
    onMouseRightReceive : function(gbn, me){
    	var selectedRecord = me.lookupReference('sin011w_02_a').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
	    	if(gbn){
	    		selectedRecord[i].set("SEL_YN", true);
	    	}
	    	
	    	if(!gbn){
	    		selectedRecord[i].set("SEL_YN", false);
	    	}
    	}
    },
    onSmsSend : function(){
    	var me = this;
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	
    	if (rowCnt == 0) {
    		exCommon.msgAlert('선택된 발송 대상이 없습니다.');
			return false;
		}
		
    	me.getViewModel().getStore('ds_card_detail').getAt(0).set("PRAY_NM", me.lookupReference('me_goodsNm').getExValue());
    	me.getViewModel().getStore('ds_card_detail').getAt(0).set("AMOUNT", me.lookupReference('me_goodsAmt').getExValue());
    	
    	
		exCommon.uptParamSetting(me, 'ds_card_detail'  , 'ds_card_detail');
		exCommon.uptParamSetting(me, 'ds_main'         , 'uptData');
		
		
		Ext.MessageBox.confirm('알림', "발송하시겠습니까?", function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/sin/SIN011W_02/saveReq.suvila', me.onSmsSendCallback , false);
    			},50);	
    		}
    	});
    },
    onSmsSendCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    	}
    },    
    onSmsDbClick : function(dataview, record, item, index, e){
    	var me = this;
    	me.lookupReference('ta_msg').setExValue( record.get("DOC_TEXT")  );
    },
})


