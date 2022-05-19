Ext.define('ExFrm.view.rec.rec024w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec024w_03',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_payState', '', null ,me.dspayStateCallback);
    	},50);
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
		
		// 체크박스
		fn_getBudNo(me, '' , "all");
    	
    },
    dspayStateCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_approv', '', null ,me.dsapprovCallback);
    	},50);
    	
    	if(success){
    		me.getViewModel().getStore('ds_payState').getAt(0).set("NAME", "전체");
    	}
    	
    },
    dsapprovCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null ,me.dstempleUserCallback);
    	},50);
    	
    	
    	if(success){
    		me.getViewModel().getStore('ds_approv').getAt(0).set("NAME", "전체");
    	}
    },
    dstempleUserCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.dsclassMgtCallback);
    	},50);
    },
    dsclassMgtCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_aprayMgt', '', null ,me.dsaprayMgtCallback);
    	},50);
    },
    dsaprayMgtCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_aprayMgt').getAt(0).set("PRAY_NM", "전체");
    	}
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearch();
    	}
    },
    onBudSearch : function(){
    	var me = this;
    	
    	var searchValue = "";
    	var searchgbn   =  me.lookupReference('cb_Stipulation').getExValue();
    	var searchword  =  me.lookupReference('txt_stipulation').getExValue();
    	var flag        = false;
    	
    	if(searchword == ""){
    		setTimeout(function(){
				Ext.Msg.alert('알림',  me.lookupReference('cb_Stipulation').getRawValue() +"를 입력 후 조회 버튼을 눌러주세요.");    				
			},50);
    		me.lookupReference('txt_stipulation').focus();
    		return false;
    	}
    	
    	if(searchgbn == "BUD_NO" && searchword.length < 5){
			for(var a=searchword.length; a<5; a++){
				searchword = "0" + searchword;
			}					
			me.lookupReference('txt_stipulation').setExValue(searchword);
		}
    	
    	
    	searchValue = me.lookupReference('txt_stipulation').getExValue();
		
		var pos   = searchValue.indexOf('5243350001313266');		
		var fCard = searchValue.indexOf('=');
		var bCard = searchValue.lastIndexOf('=');
		var cNum  = searchValue.indexOf('=1234567');
    	
		if( !flag ){
			exCommon.setCustCardNo("");
			
			exCommon.onSindoSearch(
	    		 me.lookupReference('cb_Stipulation')
	    		,me.lookupReference('txt_stipulation')
	    		,me
	    		,me.onBudSearchReceive
	    	);
		}
    },
    onBudSearchReceive : function(params, me){
 
    	var stipulation = me.lookupReference('cb_Stipulation').getExValue();
    	
    	
    	gf_SetBudFind (params, 
			      me.lookupReference('cb_Stipulation'), 
			      me.lookupReference('txt_stipulation'), 
			      me.lookupReference('hid_bud_no'),
			      me.lookupReference('txt_budNo') );
		
		if(stipulation == "BUD_NO"){
    		me.lookupReference('txt_stipulation').setExValue(params.BUD_NO);
    		me.lookupReference('txt_budNo').setExValue(params.BUD_NO);
		}
    },
    onDateField : function(){
    	
    	var me = this;
    	
    	var cb_date = me.lookupReference('cb_date').getExValue();
    	
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	
    	if(cb_date == 1){
    		me.lookupReference('me_AcceptSDate').format = "Y-m-d";
    		me.lookupReference('me_AcceptEDate').format = "Y-m-d";
    	}else{
    		me.lookupReference('me_AcceptSDate').format = "Y-m";
    		me.lookupReference('me_AcceptEDate').format = "Y-m";
    	}
    	
    	me.lookupReference('me_AcceptSDate').setExValue( me_AcceptSDate );
		me.lookupReference('me_AcceptEDate').setExValue( me_AcceptEDate );
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSelect : function(){
    	var me = this;
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	if(cb_date != 1){
    		me_AcceptSDate = me_AcceptSDate.substring(0,6);
    		me_AcceptEDate = me_AcceptEDate.substring(0,6);
    	}
    	
    	var params = {
    		 V_PROPOSAL_BUD_NO  : me.lookupReference('hid_bud_no').getExValue()
    		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
    		,V_ACCEPT_SDATE 	: me_AcceptSDate
    		,V_ACCEPT_EDATE 	: me_AcceptEDate
    		,V_PRAY_CODE    	: me.lookupReference('lc_aprayMgt').getExValue()
    		,V_PAY_STATE    	: me.lookupReference('lc_payState').getExValue()
    		,V_APPROV       	: me.lookupReference('lc_approv').getExValue()
    		,VV_USER_ID     	: me.lookupReference('lc_templeUser').getExValue()
    		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_detail', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec024w_03_a').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('rec024w_03_a');
    	exCommon.excelDown(grid, 'aways_pary', '상시접수조회',  me.getViewModel().getStore('ds_detail').getCount());
    },
    onSave : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    			 me
    			,'ds_detail'
    			,'newData'
    			,'uptData'
    			,'delData'
    			,'/rec/REC024W_03/saveDetail.suvila'
    			,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success , action , 'ds_detail' );
    	if( success ){
    		
    	}
    },
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	console.log('onSearchBlur = ');
    	exCommon.onSearchBlur(
    		 me
    		,m2
    		,'hid_bud_no'
    		,'txt_budNo'
    	);
    },
    onMouseRightClick:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec024w_03_a').getView().getSelectionModel().getSelection();
    	
    	for(var i = 0; i < selectedRecord.length ; i++){
    		var record = selectedRecord[i];
    		var BUD_NO   = record.get("PROPOSAL_BUD_NO");
    		
    		record.set("BUD_NO"  ,BUD_NO);
    	}
    	
    	exCommon.groupPopUp(
      		 me
      		,selectedRecord
      		,me.onReceivePopup
      	);
    },
    onReceivePopup:function(params, me){
    	console.log('onReceivePopupID = ');
    },
})
