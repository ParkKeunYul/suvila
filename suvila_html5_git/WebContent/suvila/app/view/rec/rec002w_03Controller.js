Ext.define('ExFrm.view.rec.rec002w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_03',
    onSearch:function(params){
        var me = this;
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    },
    onAfterRender:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_payState', '', null ,me.dspayStateCallback);
    	},50);
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('me_AcceptSDateGD').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDateGD').setExValue( today );
		
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
    		me.callStore(me, 'ds_praygbn', '', null ,me.dsaprayGbnCallback);
    	},50);
    },
    dsaprayGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_GDKindInfo', '', null ,me.dsaprayKindCallback);
    	},50);
    	
    	if(success){
    		me.getViewModel().getStore('ds_praygbn').getAt(0).set("PRAY_NM", "전체");
    	}
    },
    dsaprayKindCallback : function(me, success, form, action){
    
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
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD")
    	console.log('selectType = ', selectType);
    	
    	var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateGD').getExValue();
    	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateGD').getExValue();
		
    	if(new Number(V_ACCEPT_SDATE) > new Number(V_ACCEPT_EDATE)){
    		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
    		me.lookupReference('me_AcceptSDateGD').focus();
    		return false;
    	}
    	
    	var params = {
    		 V_PAY_STATE     	: me.lookupReference('lc_payState').getExValue()
    		 ,V_PROPOSAL_BUD_NO  : me.lookupReference('hid_bud_no').getExValue()
    		,V_DATE_GBN 		: me.lookupReference('cb_dateGD').getExValue()
    		,V_ACCEPT_SDATE 	: me.lookupReference('me_AcceptSDateGD').getExValue()
    		,V_ACCEPT_EDATE    	: me.lookupReference('me_AcceptEDateGD').getExValue()
    		,V_CODE    	        : me.lookupReference('lc_GDKindInfo').getExValue()
    		,VV_USER_ID      	: me.lookupReference('lc_templeUser').getExValue()
    		,V_PRAY_GBN     	: me.lookupReference('lc_prayGBN').getExValue()
    		,V_APPROV     		: me.lookupReference('lc_approv').getExValue()
    		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
    	}
    	
    	console.log('params= ', params);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_GDRec', '', params ,me.onSelectCallback);
    	},10);
    	
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec002w_03_a').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('rec002w_03_a');
        exCommon.excelDown(grid, 'pray', '기도접수조회',  me.getViewModel().getStore('ds_GDRec').getCount());	
    	
    },
    onSaveGD : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
			 me
			,'ds_GDRec'
			,'newData'
			,'uptData'
			,'delData'
			,'/rec/REC002W_03/saveGD.suvila'
			,me.onSaveGDCallback
    	);
    },
    onSaveGDCallback : function(me, success, form, action){
    	if( success ){
    		exCommon.fnGridSaveCallback( me, success , action , 'ds_GDRec' );
    	}
    },
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onBeforeeditGD : function(editor, context, eOpts ){
    	var me = this;
    	
    	var PER_BUD_NO  = exCommon.getRepVal(me.lookupReference('rec002w_03_a').getStore().getAt(context.rowIdx).get("PER_BUD_NO"), "");
    	if( PER_BUD_NO != "" ){
    		return true;
    	}
    	return false;
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onMouseRightClickGD:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var dataIndex = eOpts.position.colIdx -1;
    	
    	
    	var selectedRecord = me.lookupReference('rec002w_03_a').getView().getSelectionModel().getSelection();
    	
    	exCommon.groupPopUp(
    		 me
    		,selectedRecord
    		,me.onReceivePopupGD
    	);
    },
})
