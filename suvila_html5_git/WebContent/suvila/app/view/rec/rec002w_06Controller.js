var printDataFlag = false;

Ext.define('ExFrm.view.rec.rec002w_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_06',
    onSearch:function(params){
        var me = this;
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_GDKindInfo', '', null ,me.dsGdCallback);
    	},50);
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	
    	var st_day = 91;
    	//st_day = 365;
    	
    	
    	me.lookupReference('me_AcceptSDateGD').setExValue( exCommon.getMinusDay(st_day) );
		me.lookupReference('me_AcceptEDateGD').setExValue( today );
		
		
		// 체크박스
		fn_getBudNo(me, '' , "all");
    	
    },
    dsGdCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_GDKindInfo').getAt(0).set("PRAY_CODE", "0");
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null, me.dsTempleCallback);
    	},50);
    },
    dsTempleCallback : function(me, success, form, action){
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
    onSearchBlur : function(m2, event, eOpts ){
    	
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onSelectGD : function(){
    	var me = this;
    	
    	
    	var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateGD').getExValue();
    	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateGD').getExValue();
		
    	if(new Number(V_ACCEPT_SDATE) > new Number(V_ACCEPT_EDATE)){
    		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
    		me.lookupReference('me_AcceptSDateGD').focus();
    		return false;
    	}
    	
    	var txt_stipulation = exCommon.getRepVal(me.lookupReference('txt_stipulation').getExValue(), '');
    	
    	if(txt_stipulation == '') {
    		me.lookupReference('txt_budNo').setExValue('');
    	}
    	
    	var bud_no = me.lookupReference('txt_budNo').getExValue();
    	if(bud_no != ""){
    		bud_no = bud_no.substring(0,bud_no.length-3);
		}
    	
    	var rd_GDGbn = me.lookupReference('rd_GDGbn').getValue().rd_GDGbn;
    	if(rd_GDGbn == 0 || rd_GDGbn == 1){
    		me.lookupReference('praygbn').setExValue(1);
    	}else{
    		me.lookupReference('praygbn').setExValue(2);
    	}
    	
    	var per_gbn = "N";
    	if(rd_GDGbn == 1 || rd_GDGbn == 3){
    		per_gbn = "Y";
    	}
    
    	var params = {
    		 V_PRAY_GBN        : exCommon.getRepVal(me.lookupReference('praygbn').getExValue(), '')
    		,V_PROPOSAL_BUD_NO : bud_no
    		,V_DATE_GBN        : exCommon.getRepVal(me.lookupReference('cb_dateGD').getExValue(), '')
    		,V_ACCEPT_SDATE    : exCommon.getRepVal(me.lookupReference('me_AcceptSDateGD').getExValue(), '')
    		,V_ACCEPT_EDATE    : exCommon.getRepVal(me.lookupReference('me_AcceptEDateGD').getExValue(), '')
    		,V_CODE            : exCommon.getRepVal(me.lookupReference('lc_GDKindInfo').getExValue(), '')
    		,VV_USER_ID        : exCommon.getRepVal(me.lookupReference('lc_templeUserGD').getExValue(), '')
    		,V_PER_GBN         : per_gbn
    	};
    	
    	printDataFlag = false;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_GDRec', '', params, me.onSelectGDCallback);
    	},50);
    },
    onSelectGDCallback : function(me, success, form, action){
    	console.log('onSelectGDCallback');
    	if(success){
    		
    		var rd_GDGbn = me.lookupReference('rd_GDGbn').getValue().rd_GDGbn;
    		
        	if(rd_GDGbn == '0' || rd_GDGbn == '2'){
        		console.log('onSelectGDCallback1111= ', rd_GDGbn);
        		me.lookupReference('select_gido_type').setExValue('1');
        	}else{
        		console.log('onSelectGDCallback222= ', rd_GDGbn);
        		me.lookupReference('select_gido_type').setExValue('2');
        	}
    		
        	me.lookupReference('rec002w_06_a').getView().select(0);
        	
    		setTimeout(function(){
    			me.getViewModel().getStore('ds_GDRec_sel').removeAll();
        		me.callStore(me, 'ds_GDRec_sel', '', action._params, me.ondsGdSelCallback);
        	},50);
    	}
    },
    onPrintGD : function(){
    	var me = this;
    	
    	
    	console.log('onPrintGD');
    	
    	
    	var checkRecord = me.getViewModel().getStore('ds_GDRec').findRecord('CHECK_P', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	
    	var print_type;
    	
    	var rd_GDGbn = me.lookupReference('rd_GDGbn').getValue().rd_GDGbn;
    	if(rd_GDGbn == 0 || rd_GDGbn == 2){
    		print_type = '1';
    	}else{
    		print_type = '2';
    	}
    	
    	var select_gido_type = me.lookupReference('select_gido_type').getExValue();
    	
    	
    	if(select_gido_type != print_type){
			if(select_gido_type == '1') {
				exCommon.msgAlert("가족을 조회후 개인 인쇄를 할수 없습니다.<br/>개인 조회후 인쇄가능합니다.");
				return;
			}
			if(select_gido_type == '2'){
				exCommon.msgAlert("개인을 조회후 가족 인쇄를 할수 없습니다.<br/>가족 조회후 인쇄가능합니다.");
				return;
			}
		}
    	
    	if(!printDataFlag){
    		exCommon.msgAlert('인쇄에 필요한 데이터를 조회중입니다.<br/> 잠시후 시도해주세요.');
    		return;
    	}
    	
    	
    	var g_row = me.getViewModel().getStore('ds_GDRec').getCount();
    	
    	//console.log('g_row', g_row);
    	
    	var ds_GDRec_sel = me.getViewModel().getStore('ds_GDRec_sel');
    	var sel_row      = ds_GDRec_sel.getCount();
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_GDRec').getAt(i);
    		
    		
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			var findRecord = ds_GDRec_sel.findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			
    			if(findRecord != null && findRecord  != undefined){
    			
	    			var ROW        = ds_GDRec_sel.indexOf(findRecord);
	
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
					var ADDR_ALL      = exCommon.getRepVal(findRecord.get("ADDR_ALL"), '');
	    	    	
					var TODAY = exCommon.setDateFormat( exCommon.getNowDate() );
					
	    	    	jsonBaseData = {
	    	    		 BUD_CODE : BUD_CODE
						,TELNO    : TELNO  
						,ADDR_ALL : ADDR_ALL
						,ZIP_CD   : ZIP_CD
						,WISH     : me.lookupReference('txt_pray_title').getExValue()
						,TODAY    : TODAY
						,prayList : jsonPrayData
	    	    	};    	    	
	    	    	jsonPrintData.push(jsonBaseData);
    			}// findRecord != null if
    		}
    	}// for
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	var params = {
  			 FILE_PATH  : '/rec002w_06_rp_GDRec.ozr' 
  			,PRINT_DATA : jsonAllData
  		};
    	
    	if(rd_GDGbn == 1 || rd_GDGbn == 3){
    		params.FILE_PATH = '/rec002w_06_rp_GDRec2.ozr';
    	}
    	
    	
    	if(exCommon.user.death_type == '2'){
    		params.FILE_PATH = '/rec002w_06_rp_GDRec_000031.ozr';
    		
    	}
    	
    	
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    	
    },
    ondsGdSelCallback : function(me, success, form, action){
    	printDataFlag = true;
    },
    onMouseRightClick_A:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec002w_06_a').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  selectedRecord , me.onMouseRightReceive_A);
    },
    onMouseRightReceive_A : function(gbn, me){
    	var selectedRecord = me.lookupReference('rec002w_06_a').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
    		if(gbn == 'T'){
	    		selectedRecord[i].set("CHECK_P", true);
	    	}else{
	    		selectedRecord[i].set("CHECK_P", false);
	    	}
	    	
    	}
    },
})
