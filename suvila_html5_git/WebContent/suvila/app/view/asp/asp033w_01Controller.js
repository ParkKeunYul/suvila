Ext.define('ExFrm.view.asp.asp033w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp033w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	
    	me.lookupReference('start_date').setExValue( exCommon.getMinusDay(365) );
    	me.lookupReference('end_date').setExValue(  today );
    	
    },   
    onInit:function(me){
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_yn_gbn', '', null , me.dYnCallbak);
    	},50);
    	
    	
    },
    dYnCallbak : function(me, success, records, operation){
    	setTimeout(function(){
    		me.callStore(me, 'ds_yn_issue', '', null , me.dYnIsCallbak);
    	},50);
    },
    dYnIsCallbak : function(me, success, records, operation){
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeCd', '', null , me.dsTempleCallbak);
    	},50);
    },
    dsTempleCallbak : function(me, success, records, operation){
		var data ={
			 TEMPLE_CD : ''
			,TEMPLE_NM : '전체'
		}
		
		me.getViewModel().getStore('ds_templeCd').insert(0, data);
		
		
		me.lookupReference('lc_templeCd').setExValue('');
		
		me.onSelect();
	},
	 onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		//me.onBudSearch();
    	}
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    	//	me.lookupReference('hid_bud_no').setExValue("");
    	//	me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 V_BUD_NO        : me.lookupReference('txt_budNo').getExValue()
    		,V_S_DATE        : me.lookupReference('start_date').getExValue()
    		,V_E_DATE        : me.lookupReference('end_date').getExValue()
    		,V_SEARCH_TEMPLE : me.lookupReference('lc_templeCd').getExValue()
    		,V_SEARCH_ISSUE  : me.lookupReference('search_issue').getExValue()
    		,V_SEARCH_DATE   : me.lookupReference('search_date').getExValue()
    		,V_SETTING_TYPE  : me.lookupReference('search_setting').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params , me.dsMainCallbak);
    	},50);
    },
    dsMainCallbak : function(me, success, records, operation){
    	
    	if(success){
    		me.lookupReference('rec033w_02_a').getView().select(0);
    	}
    },
    onBeforeedit : function(editor, context, eOpts) {
		var me = this;

		//console.log(context.field);
		if(context.field == 'DEL_YN' || context.field == 'DELIVERY_DATE'|| context.field == 'ISSUE_STATE'){
			return true;
		}

		return false;
		
	},
	onEdit : function(editor, context, eOpts) {
		var me = this;

	},
	onExcel : function(){
		var me = this;
		var grid = me.lookupReference('rec033w_02_a');
        exCommon.excelDown(grid, 'sin_card_select', '신도증신청현황',  me.getViewModel().getStore('ds_main').getCount());
	},
	onSave : function(){
		var me = this;
		
		var rowCnt = exCommon.ChangeCount('ds_main', me);
		
		if (rowCnt == 0) {
			exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
		}
		
		me.inTransact(me);
	},
	onDelivery : function(){
		var me  = this;
		
		var checkRecord = me.getViewModel().getStore('ds_main').findRecord('CHECK_P', true, 0, false, true, true);
		if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '1개이상 선택하세요' );
    		return;
    	}
		
		var row = me.getViewModel().getStore('ds_main').getCount();
		
		for(var i = 0; i < row ; i++){
			var g_record    = me.getViewModel().getStore('ds_main').getAt(i);
			var CHECK_P     = g_record.get("CHECK_P");
			
			if(CHECK_P || CHECK_P == 'T'){
				g_record.set('DELIVERY_DATE', exCommon.setDateFormat( exCommon.getNowDate() ));
			}
		}
		me.inTransact(me);
		
	},
	onIssue : function(){
		var me = this;
		
		var checkRecord = me.getViewModel().getStore('ds_main').findRecord('CHECK_P', true, 0, false, true, true);
		if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '1개이상 선택하세요' );
    		return;
    	}
		
		var row = me.getViewModel().getStore('ds_main').getCount();
		
		for(var i = 0; i < row ; i++){
			var g_record    = me.getViewModel().getStore('ds_main').getAt(i);
			var CHECK_P     = g_record.get("CHECK_P");
			
			if(CHECK_P || CHECK_P == 'T'){
				g_record.set('ISSUE_STATE', 2);
			}
		}
		me.inTransact(me);
		
	}, 
	inTransact : function(me){
		
		exCommon.uptParamSetting(me, 'ds_main'        ,'uptData');
		
		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?',function(btn) {
			if (btn == 'yes') {
				me.callForm(me,'/asp/ASP033W_01/save.suvila',me.onSaveCallback, false);
			}
		});
	},
	onSaveCallback : function(me, success, form, action) {
		exCommon.fnGridSaveCallback(me, success, action,'ds_main');
		
		if (success) {
			me.onSelect();
		}
	},
	onSelectionChange : function( me2 , record , selections , eOpts ) {
		var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		var selection = me.lookupReference('rec033w_02_a').getView().getSelectionModel().getSelection()[0];
    		
    		//console.log('selection = ', selection);
    		
    		me.lookupReference('txt_name_kor').setValue(selection.get("NAME_KOR"));
    		me.lookupReference('txt_bud_no').setValue(selection.get("BUD_NO"));
    		me.lookupReference('txt_card_code').setValue(selection.get("CARD_CODE"));
    		me.lookupReference('txt_file_name').setValue(selection.get("R_PHOTO"));
    		
    		me.lookupReference('image').setSrc('/suvila/upload/'+selection.get("PHOTO"));
    		
    		//console.log('/suvila/upload/'+selection.get("PHOTO"));
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
	},
	
    
})