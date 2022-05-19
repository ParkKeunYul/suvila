var printDataFlag = false;

Ext.define('ExFrm.view.rec.rec001w_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec001w_06',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDJGKindInfo', '', null ,me.idJgKindCallback);
    	},50);
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	var st_day = 91;
    	
    	me.lookupReference('me_AcceptSDateID').setExValue( exCommon.getMinusDay(st_day) );
		me.lookupReference('me_AcceptEDateID').setExValue( today );
		
		fn_getBudNo(me, '' , "all");
		
		
		if(exCommon.user.death_type == '2'){
			console.log('exCommon.user.death_type = ', exCommon.user.death_type);
			me.lookupReference('rdo_ApprovalGbn3').setHidden(true);
		}
    	
    },
    idJgKindCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null, me.dsTempleCallback);
    	},50);
    },
    dsTempleCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDKindInfo', '', null, null);
    	},50);
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onRadioClick : function(field, newValue, oldValue, options) {
    	var me = this;
    	
    	var type = newValue.rdo_ApprovalGbn;
    	
    	
    	try{
    		if(type == 1){
        		me.lookupReference('rdTab1').setHidden(false);
        		me.lookupReference('rdTab2').setHidden(true);
        		me.lookupReference('area_1').setHidden(false);
        		me.lookupReference('area_2').setHidden(true);
        		me.lookupReference('rec001w_06_a').setHidden(false);
        		me.lookupReference('rec001w_06_b').setHidden(true);
        	}else{
        		me.lookupReference('rdTab1').setHidden(true);
        		me.lookupReference('rdTab2').setHidden(false);
        		
        		me.lookupReference('area_1').setHidden(true);
        		me.lookupReference('area_2').setHidden(false);
        		
        		me.lookupReference('rec001w_06_a').setHidden(true);
        		me.lookupReference('rec001w_06_b').setHidden(false);
        	}
    	}catch (e) {
			console.log('err');
		}
    	
    	
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
    onSelectID : function(){
    	var me = this;
    	
    	
    	var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateID').getExValue();
    	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateID').getExValue();
		
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
    	
    	var famgbn = 'F';
    	var rd_IDGbn = me.lookupReference('rd_IDGbn').getValue().rd_IDGbn;
    	if(rd_IDGbn == 1){
    		famgbn = 'T'
    	}
    	
    	var params = {
    		 V_PROPOSAL_BUD_NO : bud_no
    		,V_ACCEPT_SDATE    : exCommon.getRepVal(me.lookupReference('me_AcceptSDateID').getExValue(), '')
    		,V_ACCEPT_EDATE    : exCommon.getRepVal(me.lookupReference('me_AcceptEDateID').getExValue(), '')
    		,V_FAM_GBN         : famgbn
    		,V_JUNGAK_CD       : exCommon.getRepVal(me.lookupReference('lc_IDJungakInfo').getExValue(), '')
    		,V_CODE       	   : exCommon.getRepVal(me.lookupReference('lc_IDKindInfo').getExValue(), '')
    		,VV_USER_ID        : exCommon.getRepVal(me.lookupReference('lc_templeUserID').getExValue(), '')
    		,V_CLOSE_YN        : exCommon.getRepVal(me.lookupReference('lc_IDCloseYn').getExValue(), '')
    	};
    	
    	printDataFlag = false;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDRec_sel', '', params, me.onSelectIDCallback);
    	},50);
    },
    onSelectIDCallback : function(me, success, form, action){
    	console.log('onSelectGDCallback');
    	printDataFlag = true;
    	if(success){
    		me.lookupReference('rec001w_06_a').getView().select(0);
    	}
    },
    onPrintID : function(){
    	var me = this;
    	
    	var checkRecord = me.getViewModel().getStore('ds_IDRec_sel').findRecord('CHECK_P', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	if(!printDataFlag){
    		exCommon.msgAlert('인쇄에 필요한 데이터를 조회중입니다.<br/> 잠시후 시도해주세요.');
    		return;
    	}
    	
    	var jsonAllData    = {};
    	var jsonPrintData  = [];
    	
    	var g_row        = me.getViewModel().getStore('ds_IDRec_sel').getCount();
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_IDRec_sel').getAt(i);
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			var jsonIDdata = {
    				 FAMILY_GBN_NO : exCommon.getRepVal(g_record.get("FAMILY_GBN"), '') + '-' + exCommon.getRepVal(g_record.get("LIGHT_NO"), '')
    				,SEXAGENARY_NM : exCommon.getRepVal(g_record.get("SEXAGENARY_NM"), '') 
    				,NAME_KOR      : exCommon.getRepVal(g_record.get("NAME_KOR"), '')
    				,varchar2      : ''
    			};
    			jsonPrintData.push(jsonIDdata);
    		}
    	}// for g_row
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	var params = {
 			 FILE_PATH  : '/rec001w_06_rp_IDRec.ozr' 
 			,PRINT_DATA : jsonAllData
 		};
   		
   		setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    ondsGdSelCallback : function(me, success, form, action){
    	
    },   
    onSelectID_CH : function(){
    	var me = this;
    	
    	
    	var txt_stipulation = exCommon.getRepVal(me.lookupReference('txt_stipulation').getExValue(), '');    	
    	if(txt_stipulation == '') {
    		me.lookupReference('txt_budNo').setExValue('');
    	}
    	var bud_no = me.lookupReference('txt_budNo').getExValue();
    	if(bud_no != ""){
    		bud_no = bud_no.substring(0,bud_no.length-3);
		}
    	
    	var famgbn   = "";
		var deathgbn = "";
		var INDEUNG  = "";
		var rd_ID_CHGbn = me.lookupReference('rd_ID_CHGbn').getValue().rd_ID_CHGbn;
		
		console.log('rd_ID_CHGbn = ', rd_ID_CHGbn);
		
		if(rd_ID_CHGbn == 0){
			famgbn = "F";
			deathgbn = "F";
			INDEUNG = "CHUCKWON";
		}
		else if(rd_ID_CHGbn == 1){
			famgbn = "T";
			deathgbn = "F";
			INDEUNG = "CHUCKWON";
		}
		else if(rd_ID_CHGbn == 2){
			famgbn = "F";
			deathgbn = "T";
			INDEUNG = "CHONHON";
		}
		else if(rd_ID_CHGbn == 3){
			famgbn = "T";
			deathgbn = "T";
			INDEUNG = "CHONHON";
		}
		
		var params = {
       		 V_PROPOSAL_BUD_NO : bud_no
       		,V_FAM_GBN         : famgbn
       		,V_DEATH_GBN       : deathgbn
       		,V_JUNGAK_CD       : exCommon.getRepVal(me.lookupReference('lc_ID_CHJungakInfo').getExValue(), '')
       		,V_CODE            : exCommon.getRepVal(me.lookupReference('lc_ID_CHKindInfo').getExValue(), '')
       		,VV_USER_ID        : exCommon.getRepVal(me.lookupReference('lc_templeUserID_CH').getExValue(), '')
       	};
		
		printDataFlag = false;
		
		setTimeout(function(){
    		me.callStore(me, 'ds_ID_CHRec_grd', '', params, me.onSelectID_CHCallback);
    	},50);
    },
    onSelectID_CHCallback : function(me, success, form, action){
    	console.log('onSelectID_CHCallback = ', action._params);
    	
    	if( success ){
    		//var rowCnt = me.getViewModel().getStore('ds_ID_CHRec_grd').getCount();
    		
    		
    		me.lookupReference('rec001w_06_b').getView().select(0);
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_ID_CHRec_sel', '', action._params, me.dsIdChRecSelCallback);
        	},50);
    		
    	}
    },
    dsIdChRecSelCallback : function(me, success, form, action){
    	printDataFlag = true;
    },
    onPrintID_CH : function(){
    	var me = this;
    	
    	var checkRecord = me.getViewModel().getStore('ds_ID_CHRec_grd').findRecord('CHECK_P', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	if(!printDataFlag){
    		exCommon.msgAlert('인쇄에 필요한 데이터를 조회중입니다.<br/> 잠시후 시도해주세요.');
    		return;
    	}
    	
    	var rd_ID_CHGbn = rd_GDGbn = me.lookupReference('rd_ID_CHGbn').getValue().rd_ID_CHGbn;
    	
    	if(rd_ID_CHGbn == 0 || rd_ID_CHGbn == 1){
    		me.inPrint_ID_CH_01(me , rd_ID_CHGbn);
    	}else{
    		me.inPrint_ID_CH_02(me , rd_ID_CHGbn);
    	}
    },
    inPrint_ID_CH_02 : function ( me , rd_ID_CHGbn  ){
    	
    	var g_row = me.getViewModel().getStore('ds_ID_CHRec_grd').getCount();
    	
    	var ds_ID_CHRec_sel = me.getViewModel().getStore('ds_ID_CHRec_sel');
    	var sel_row         = ds_ID_CHRec_sel.getCount();
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_ID_CHRec_grd').getAt(i);
    		
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			
    			var findRecord = ds_ID_CHRec_sel.findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var ROW        = ds_ID_CHRec_sel.indexOf(findRecord);
    			
    			
    			if(findRecord != null && findRecord != undefined){
    				
    				var jsonBaseData;
        	    	var jsonPrayData = [];
    				
	    			for(ROW ; ROW < sel_row ; ROW++){
	    				
	    				var sel_record = ds_ID_CHRec_sel.getAt(ROW);
	    				
	    				if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
	    	    			break;
	    	    		}
	    				
	    				subData = {
        					HYO_REL      : exCommon.getRepVal(sel_record.get("HYO_REL"), '')
		    			   ,BOK_NAME_KOR : exCommon.getRepVal(sel_record.get("BOK_NAME_KOR"), '')
		    			   ,BOKWI_NM     : exCommon.getRepVal(sel_record.get("BOKWI_NM"), '')
		    			   ,DECE_REL     : exCommon.getRepVal(sel_record.get("DECE_REL"), '')
		    			   ,BON_NM       : exCommon.getRepVal(sel_record.get("BON_NM"), '')
		    			   ,NAME_KOR     : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')    	    			   
		    			   ,DEATH_KOR    : exCommon.getRepVal(sel_record.get("DEATH_KOR"), '')
	    	    		};
        	    		jsonPrayData.push(subData);
	    				
	    				//console.log('sel_record = ', sel_record.data);
	    			}// for ROW
	    			
	    			
	    			var ZIP_CD        = exCommon.getRepVal(findRecord.get("ZIP_CD"), '');
	    	    	var TELNO         = exCommon.getRepVal(findRecord.get("TELNO"), '');
						TELNO         = TELNO.replace('()-', '');  
					var BUD_CODE      = exCommon.getRepVal(findRecord.get("BUD_CODE"), '');
					var ADDR_ALL      = exCommon.getRepVal(findRecord.get("ADDR_ALL"), '');
	    	    	
	    	    	jsonBaseData = {
	    	    		 BUD_CODE : BUD_CODE
						,TELNO    : TELNO  
						,ADDR_ALL : ADDR_ALL
						,ZIP_CD   : ZIP_CD
						,WISH     : ''
						,prayList : jsonPrayData
	    	    	};    	    	
	    	    	jsonPrintData.push(jsonBaseData);
	    			
    			}// findRecord
    		}// 
    	}// for g_row
    	
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	
    	var params = {
			 FILE_PATH  : '/rec002w_06_rp_BS_CH_02Rec.ozr' 
			,PRINT_DATA : jsonAllData
		};
      	
      	setTimeout(function(){
      		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    	
    	
    },
    inPrint_ID_CH_01 : function( me , rd_ID_CHGbn  ){
    	
    	var g_row = me.getViewModel().getStore('ds_ID_CHRec_grd').getCount();
    	
    	var ds_ID_CHRec_sel = me.getViewModel().getStore('ds_ID_CHRec_sel');
    	var sel_row         = ds_ID_CHRec_sel.getCount();
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_ID_CHRec_grd').getAt(i);
    		
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			
    			var findRecord = ds_ID_CHRec_sel.findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var ROW        = ds_ID_CHRec_sel.indexOf(findRecord);
    			
    			if(findRecord != null && findRecord != undefined){
    				
    				var jsonBaseData;
        	    	var jsonPrayData = [];
    				
	    			for(ROW ; ROW < sel_row ; ROW++){
	    				
	    				var sel_record = ds_ID_CHRec_sel.getAt(ROW);
	    				
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
	    	    	
	    	    	jsonBaseData = {
	    	    		 BUD_CODE : BUD_CODE
						,TELNO    : TELNO  
						,ADDR_ALL : ADDR_ALL
						,ZIP_CD   : ZIP_CD
						,WISH     : ''
						,prayList : jsonPrayData
	    	    	};    	    	
	    	    	jsonPrintData.push(jsonBaseData);
	    			
    			}// findRecord
    		}// 
    	}// for g_row
    	
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	var params = {
 			 FILE_PATH  : '/rec002w_06_rp_GDRec2.ozr' 
 			,PRINT_DATA : jsonAllData
 		};
    	
       	if(rd_ID_CHGbn == 1 ){        	
       		params.FILE_PATH = '/rec002w_06_rp_GDRec.ozr';
       	}
       	
       	setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
         },100);
    	
    },
    onMouseRightClick_A:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec001w_06_a').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  selectedRecord , me.onMouseRightReceive_A);
    },
    onMouseRightReceive_A : function(gbn, me){
    	var selectedRecord = me.lookupReference('rec001w_06_a').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
    		console.log('gbn = ', gbn);
    		
    		
    		if(gbn == 'T'){
	    		selectedRecord[i].set("CHECK_P", true);
	    	}else{
	    		selectedRecord[i].set("CHECK_P", false);
	    	}
	    	
    	}
    },
    onMouseRightClick_B:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec001w_06_b').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  selectedRecord , me.onMouseRightReceive_B);
    	
    },
    onMouseRightReceive_B : function(gbn, me){
    	var selectedRecord = me.lookupReference('rec001w_06_b').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
    		if(gbn == 'T'){
	    		selectedRecord[i].set("CHECK_P", true);
	    	}else{
	    		selectedRecord[i].set("CHECK_P", false);
	    	}
	    	
    	}
    },
})
