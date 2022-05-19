var printDataFlag = false;
Ext.define('ExFrm.view.rec.rec024w_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec024w_06',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_aprayMgt', '', null ,null);
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
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
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
    	
    	
    	if(cb_date == 1){
    		me_AcceptSDate = me_AcceptSDate.substring(0,8);
       		me_AcceptEDate = me_AcceptEDate.substring(0,8);	
    	}else{
    		me_AcceptSDate = me_AcceptSDate.substring(0,6);
       		me_AcceptEDate = me_AcceptEDate.substring(0,6);
    	}
    	
    	
    	var params = {
    		V_PROPOSAL_BUD_NO  	: me.lookupReference('hid_bud_no').getExValue()
    		,V_DATE_GBN    		: me.lookupReference('cb_date').getExValue()
    		,V_ACCEPT_SDATE 	: me_AcceptSDate
    		,V_ACCEPT_EDATE 	: me_AcceptEDate
    		,V_CODE   			: me.lookupReference('lc_aprayMgt').getExValue()    		
    	}
    	
    	//console.log('params= ', params);
    	
    	printDataFlag = false;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},50);
    },
    onSelectCallback : function(me, success, form, action){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_GDRec_sel', '', action._params ,me.dsGdRecSelCallback);
    	},50);
    	
    	if(success){
    		me.lookupReference('rec024w_06_a').getView().select(0);
    	}
    },
    dsGdRecSelCallback : function(me, success, form, action){
    	printDataFlag = true;
    },
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onPrint : function(){
    	var me = this;
    	
    	if(!printDataFlag){
    		exCommon.msgAlert('인쇄에 필요한 데이터를 조회중입니다.<br/> 잠시후 시도해주세요.');
    		return;
    	}
    	
    	var g_row = me.getViewModel().getStore('ds_main').getCount();
    	
    	var ds_GDRec_sel = me.getViewModel().getStore('ds_GDRec_sel');
    	var sel_row      = ds_GDRec_sel.getCount();
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			var findRecord = ds_GDRec_sel.findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var ROW        = ds_GDRec_sel.indexOf(findRecord);

    		//	console.log('findIndex = ', findIndex);
    	    	var jsonBaseData;
    	    	var jsonPrayData = [];
    	    	
    	    	for(ROW ; ROW < sel_row ; ROW++){
    	    		
    	    		var sel_record = ds_GDRec_sel.getAt(ROW);
    	    		
    	    		if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
    	    			break;
    	    		}    	    		
    	    		var subData = {
	    				REPRESEN_REL    : exCommon.getRepVal(sel_record.get("REPRESEN_REL"), '')
	    			   ,SEXAGENARY_NM   : exCommon.getRepVal(sel_record.get("SEXAGENARY_NM"), '')
	    			   ,NAME_KOR        : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')
	    			   ,BIRTHDAY        : exCommon.getRepVal(sel_record.get("BIRTHDAY"), '')
	    			   ,AGE             : exCommon.getRepVal(sel_record.get("AGE"), '')
	    			   ,ORGINATE        : exCommon.getRepVal(sel_record.get("ORGINATE"), '')
    	    		};
    	    		jsonPrayData.push(subData);
    	    		
    	    	}// for ROW
    	    	
    	    	
    	    	var ZIP_CD        = exCommon.getRepVal(findRecord.get("ZIP_CD"), '');
    	    	var TELNO         = exCommon.getRepVal(findRecord.get("TELNO"), '');
					TELNO         = TELNO.replace('()-', '');  
				var BUD_CODE      = exCommon.getRepVal(findRecord.get("BUD_CODE"), '');
				var ADDR_ALL      = exCommon.getRepVal(findRecord.get("ADDR"), '');
    	    	
    	    	jsonBaseData = {
    	    		 BUD_CODE : BUD_CODE
					,TELNO    : TELNO  
					,ADDR_ALL : ADDR_ALL
					,ZIP_CD   : ZIP_CD
					,WISH     : ''
					,prayList : jsonPrayData
    	    	};    	    	
    	    	jsonPrintData.push(jsonBaseData);
    		}
    	}// for
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	console.log('jsonAllData = ', jsonAllData);
    	
    	var params = {
 			 FILE_PATH  : '/rec002w_06_rp_GDRec.ozr' 
 			,PRINT_DATA : jsonAllData
 		};
    	
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    	
    },
    onMouseRightClick_A:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec024w_06_a').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  selectedRecord , me.onMouseRightReceive_A);
    },
    onMouseRightReceive_A : function(gbn, me){
    	var selectedRecord = me.lookupReference('rec024w_06_a').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
    		if(gbn == 'T'){
	    		selectedRecord[i].set("CHECK_P", true);
	    	}else{
	    		selectedRecord[i].set("CHECK_P", false);
	    	}
	    	
    	}
    },
})
