Ext.define('ExFrm.view.rec.rec002w_04Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_04',
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
    onSelect : function( sel_row_index ){
    	var me = this;
    	
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD")
    	
    	console.log('sel_row_index =', parseInt( sel_row_index));
    	var sel_row_index = sel_row_index;
    	if(isNaN(sel_row_index)){
    		sel_row_index = 0;
    	}
    	var G_ROW_INDEX = exCommon.getRepVal(sel_row_index , 0);
    	
    	if(selectType == "GD"){
        	
    		var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateGD').getExValue();
        	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateGD').getExValue();
    		
        	if(new Number(V_ACCEPT_SDATE) > new Number(V_ACCEPT_EDATE)){
        		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
        		me.lookupReference('me_AcceptSDateGD').focus();
        		return false;
        	}
    		
    		
        	var params = {
        		 V_PAY_STATE     	: me.lookupReference('lc_payState').getExValue()
        		,V_PROPOSAL_BUD_NO  : me.lookupReference('txt_budNo').getExValue()
        		,V_DATE_GBN 		: me.lookupReference('cb_dateGD').getExValue()
        		,V_ACCEPT_SDATE 	: me.lookupReference('me_AcceptSDateGD').getExValue()
        		,V_ACCEPT_EDATE    	: me.lookupReference('me_AcceptEDateGD').getExValue()
        		,V_CODE    	        : me.lookupReference('lc_GDKindInfo').getExValue()
        		,VV_USER_ID       	: me.lookupReference('lc_templeUser').getExValue()
        		,V_PRAY_GBN     	: me.lookupReference('lc_prayGBN').getExValue()
        		,V_APPROV     		: me.lookupReference('lc_approv').getExValue()
        		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
        		,G_ROW_INDEX        : G_ROW_INDEX
        	}
        	
        	console.log('params= ', params);
        	
        	setTimeout(function(){
        		me.callStore(me, 'ds_GDRec', '', params ,me.onSelectCallback);
        	},10);
    	}else{
        	
    		var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateBS').getExValue();
        	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateBS').getExValue();
    		
        	if(new Number(V_ACCEPT_SDATE) > new Number(V_ACCEPT_EDATE)){
        		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
        		me.lookupReference('me_AcceptSDateBS').focus();
        		return false;
        	}
    		
        	var params = {
           		 V_PAY_STATE     	: me.lookupReference('lc_payState').getExValue()
           		,V_PROPOSAL_BUD_NO  : me.lookupReference('txt_budNo').getExValue()
           		,V_DATE_GBN 		: me.lookupReference('cb_dateGD').getExValue()
           		,V_ACCEPT_SDATE 	: me.lookupReference('me_AcceptSDateBS').getExValue()
           		,V_ACCEPT_EDATE    	: me.lookupReference('me_AcceptEDateBS').getExValue()
           		,V_CODE    	        : me.lookupReference('lc_BSKindInfo').getExValue()
           		,VV_USER_ID       	: me.lookupReference('lc_templeUser').getExValue()
           		,V_PRAY_GBN     	: me.lookupReference('lc_prayGBN').getExValue()
           		,V_APPROV     		: me.lookupReference('lc_approv').getExValue()
           		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
           		,G_ROW_INDEX        : G_ROW_INDEX
           	}
        	setTimeout(function(){
        		me.callStore(me, 'ds_BSRec', '', params ,me.onSelectCallback);
        	},10);
        	
    	}
    	
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		if(exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD") == "GD"){
    			me.lookupReference('rec002w_04_a').getView().select(action._params.G_ROW_INDEX);
    		}else{
    			me.lookupReference('rec002w_04_b').getView().select(action._params.G_ROW_INDEX);
    		}
    	}
    },
    onExcel : function(){
    	var me = this;
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, 1)
    	if(selectType == "GD"){
    		var grid = me.lookupReference('rec002w_04_a');
        	exCommon.excelDown(grid, 'pray', '기도접수조회',  me.getViewModel().getStore('ds_GDRec').getCount());	
    	}else{
    		var grid = me.lookupReference('rec002w_04_b');
        	exCommon.excelDown(grid, 'bulsa', '불사접수조회',  me.getViewModel().getStore('ds_BSRec').getCount());
    	}
    	
    	
    },
    onSaveGD : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    			 me
    			,'ds_GDRec'
    			,'newData'
    			,'uptData'
    			,'delData'
    			,'/rec/rec002w_04/saveGD.suvila'
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
    	
    	var PER_BUD_NO  = exCommon.getRepVal(me.lookupReference('rec002w_04_a').getStore().getAt(context.rowIdx).get("PER_BUD_NO"), "");
    	if( PER_BUD_NO != "" ){
    		return true;
    	}
    	return false;
    },
    onSelectionChangeGD : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		var selection = me.lookupReference('rec002w_04_a').getView().getSelectionModel().getSelection()[0];
    		var ACCEPT_SEQ = selection.get("ACCEPT_SEQ"); 
    		var SEQ        = selection.get("SEQ");
    		

    		console.log("SMS_YN = " , selection.get("SMS_YN"));
    		
    		var params = {
    			 V_ACCEPT_SEQ : ACCEPT_SEQ
    			,V_SEQ        : SEQ
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_MisuAmtGD', '', params ,me.dsMisuCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsMisuCallback : function(me, success, form, action){
    	var gridNm     = "rec002w_04_c";
    	
    	me.lookupReference(gridNm).getView().select(0);
    	
    },
    onAdd : function(){
    	var me = this;
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD");
    	var record = me.getViewModel().getStore('ds_MisuAmt'+selectType).getAt(0);
    	
    	
    	
    	var data = {
    		 TEMPLE_CD  : exCommon.user.templeCd
    		,ACCEPT_SEQ : record.get("ACCEPT_SEQ")
    		,SEQ        : record.get("SEQ")
    		,AMOUNT     : 0
    		,SQL_MODE   : 'I'
    	};
    	console.log('data = ', data);
    	
    	me.getViewModel().getStore('ds_MisuAmt'+selectType).add(data);
    	
    	var gridNm = "rec002w_04_c";
    	if(selectType == "BS"){
    		gridNm = "rec002w_04_d";
    	}
    	
    	me.lookupReference(gridNm).getView().select( me.getViewModel().getStore('ds_MisuAmt'+selectType).getCount() -1 );
    	me.lookupReference(gridNm).plugins[0].startEditByPosition({
            row    : me.getViewModel().getStore('ds_MisuAmt'+selectType).getCount() -1,
            column : 3
        });
    },
    onCancel : function(){
    	
    	var me = this;
    	
    	
    	var gridNm   = "rec002w_04_c";
    	var storeNm  = "ds_MisuAmtGD";
    	
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD");
    	if(selectType == "BS"){
    		gridNm  = "rec002w_04_d";
    		storeNm = "ds_MisuAmtBS"; 
    	}
    	
    	
    	var SQL_MODE = exCommon.getRepVal(me.lookupReference(gridNm).getView().getSelectionModel().getSelection()[0].get("SQL_MODE"));
    	
    	if(SQL_MODE == "I"){
    		exCommon.gridRemove(me , gridNm, storeNm );
    	}
    },
    onExcelSub : function(){
    	
    	var me = this;
    	
    	
    	var gridNm   = "rec002w_04_c";
    	var storeNm  = "ds_MisuAmtGD";
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD");
    	if(selectType == "BS"){
    		gridNm  = "rec002w_04_d";
    		storeNm = "ds_MisuAmtBS"; 
    	}
    	
    	
    	
    	var grid = me.lookupReference(gridNm);
    	exCommon.excelDown(grid, 'bulsa', '납부내역',  me.getViewModel().getStore(storeNm).getCount());
    	
    },
    onBeforeeditMisu : function(editor, context, eOpts){
    	var me = this;
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD");
    	var gridNm     = "rec002w_04_c";
    	
    	if(selectType == "BS"){
    		gridNm = "rec002w_04_d";
    	}
    	
    	var SQL_MODE = exCommon.getRepVal(me.lookupReference(gridNm).getStore().getAt(context.rowIdx).get("SQL_MODE"), "");
    	
    	if(SQL_MODE == 'I'){
    		return true;
    	}
    	return false;
    },
    onSaveMisu : function(){
    	var me = this;
    	
    	var topGridNm    = "rec002w_04_a";
    	var gridNm       = "rec002w_04_c";
    	var storeNm      = "ds_MisuAmtGD";
    	var smsGubun     = "1";
    	var prodNm       = "PRAY_NM";
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD");
    	if(selectType == "BS"){
    		topGridNm    = "rec002w_04_b";
    		gridNm       = "rec002w_04_d";
    		storeNm      = "ds_MisuAmtBS"; 
    		smsGubun     = "3";
    		prodNm       = "BULSA_NM";
    	}
    	
    	
    	var totAmt = 0;
    	
    	var rowCount = me.getViewModel().getStore(storeNm).getCount();
    	for(var i =0; i < rowCount ; i++){
    		var AMOUNT   = me.lookupReference(gridNm).getStore().getAt(i).get("AMOUNT");
    		var SQL_MODE = me.lookupReference(gridNm).getStore().getAt(i).get("SQL_MODE");
    		
    		if(SQL_MODE == "I"){
    			
    			totAmt += parseInt (AMOUNT);
    			
    			if(AMOUNT <= 0){
    				me.lookupReference(gridNm).getView().select( i );
        			return false;
    			}
    		}//SQL_MODE
    	}// for i
    	
    	console.log('totAmt = ', totAmt);
    	
    	var topRecord    = me.lookupReference(topGridNm).getView().getSelectionModel().getSelection()[0];
    	var SMS_YN       = exCommon.getRepVal(topRecord.get("SMS_YN"), "");
    	var MOBILE_TELNO = exCommon.getRepVal(topRecord.get("MOBILE_TELNO"), "");
    	
    	
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	if(totAmt > 0 && (SMS_YN == "T" || SMS_YN == "Y") && MOBILE_TELNO != ""){
    		
    		var message  = "["+exCommon.user.templeNm+"] "+topRecord.get(prodNm) + " ";
    			message += exCommon.setNumberFormat( exCommon.getRepNum(totAmt) )+"원 보시하셨습니다. 성불하세요."; 
    		
    		var smsData = {
    			 TR_ID        : "SUNAB"
    			,TR_SENDSTAT  : "0"
    			,TR_PHONE     : MOBILE_TELNO
    			,TR_DEST_INFO : topRecord.get("PROPOSAL_NAME_KOR")+"^"+MOBILE_TELNO
    			,TR_SMS_YN    : SMS_YN
    			,TR_CALLBACK  : exCommon.user.tel
    			,TR_ETC1      : exCommon.user.templeCd
    			,TR_ETC2      : topRecord.get("PROPOSAL_NAME_KOR")
    			,TR_ETC3      : "SMSREC"
    			,TR_ETC4      : smsGubun
    			,TR_ETC5      : exCommon.user.userId
    			,TR_MESSAGE   : message
    		};
    		console.log('smsData = ', smsData);
    		me.getViewModel().getStore('ds_sms').add(smsData);
    	}
    	
    	exCommon.addParamSetting(me , 'ds_MisuAmt'+selectType  , 'ds_MisuAmt');
    	exCommon.addParamSetting(me , 'ds_sms'                 , 'ds_sms');
    	
    	Ext.MessageBox.confirm('알림', '수납 하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, '/rec/REC000P_02/saveCash.suvila', me.onSaveCallback , false);
    		}
    	});
    },
    onSaveCallback : function(me, success, form, action){
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD");
    	if(success){
    		var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD");
    		var topGridNm    = "rec002w_04_a";
    		if(selectType == "BS"){
        		topGridNm    = "rec002w_04_b";
        	}
    		
    		var selectedRecord = me.lookupReference(topGridNm).getView().getSelectionModel().getSelection()[0];
    		var rowIndex = me.lookupReference(topGridNm).getStore().indexOf(selectedRecord);
    		console.log('rowIndex= ', rowIndex);
    		
    		me.onSelect( rowIndex );
    		
    		
    		/*me.getViewModel().getStore('ds_sms').removeAll();
    		me.getViewModel().getStore('ds_sms').commitChanges();
    		
    		

    		var topGridNm    = "rec002w_04_a";
        	
        	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "GD");
        	if(selectType == "BS"){
        		topGridNm    = "rec002w_04_b";
        	}
    		
    		
    		var selection  = me.lookupReference(topGridNm).getView().getSelectionModel().getSelection()[0];
    		var ACCEPT_SEQ = selection.get("ACCEPT_SEQ"); 
    		var SEQ        = selection.get("SEQ");
    		
    		var params = {
    			 V_ACCEPT_SEQ : ACCEPT_SEQ
    			,V_SEQ        : SEQ
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_MisuAmt'+selectType, '', params ,me.dsMisuCallback);
        	},50);*/
    	}// if
    	
    	exCommon.fnGridSaveCallback(me, success, action,'ds_MisuAmt'+selectType);
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    }
    
})
