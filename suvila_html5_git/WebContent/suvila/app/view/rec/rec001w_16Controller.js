var printDataFlag = false;

Ext.define('ExFrm.view.rec.rec001w_16Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec001w_16',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null, me.dsTempleCallback);
    	},50);
    	console.log('rec001w_16Controller');
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	
    	var st_day = 91;
    	
		
		me.lookupReference('me_AcceptSDateYD').setExValue( exCommon.getMinusDay(st_day) );
		me.lookupReference('me_AcceptEDateYD').setExValue( today );
		
		fn_getBudNo(me, '' , "all");
		
		if(exCommon.user.death_type == '2'){
			console.log('exCommon.user.death_type = ', exCommon.user.death_type);
			me.lookupReference('rdo_ApprovalGbn5').setHidden(true);
			me.lookupReference('rp_acceptGbn2').setHidden(true);
			me.lookupReference('rp_acceptGbn3').setHidden(true);
		}
		
		// me.lookupReference('rdo_ApprovalGbn').setValue({rdo_ApprovalGbn : '3'});
		
		me.inGetYdPrintType();
		
    },
    dsTempleCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_YDKindInfo', '', null, me.YdKindCallback);
    	},50);
    },
    YdKindCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_YDJGKindInfo', '', null, null);
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
    	
    		me.lookupReference('rdTab3').setHidden(false);
    		me.lookupReference('area_3').setHidden(false);
    		me.lookupReference('lc_PrintSort').setHidden(false);
    		me.lookupReference('rd_YDGbn').setValue({rd_YDGbn : 0});
    		
    		if(type == 3 ){
    			me.lookupReference('rec001w_16_c').setHidden(false);
    			me.lookupReference('rec001w_16_d').setHidden(true);
    			me.lookupReference('rp_acceptDeathGbn').setHidden(false);
    		}else{
    			me.lookupReference('rec001w_16_c').setHidden(true);
    			me.lookupReference('rec001w_16_d').setHidden(false);
    			me.lookupReference('rp_acceptGbn').setHidden(true);
    			me.lookupReference('rp_acceptDeathGbn').setHidden(true);
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
    ondsGdSelCallback : function(me, success, form, action){
    	
    },   
    onSelectYD : function(){
    	var me = this;
    	
    	console.log('onSelectYD');
    	
    	var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateYD').getExValue();
    	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateYD').getExValue();
		
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
    	
    	var rd_YDGbn = me.lookupReference('rd_YDGbn').getValue().rd_YDGbn;
    	
    	
    	var famgbn     = "";
		var deathgbn   = "";
		var YEONDEUNG  = "";
		
		if(rd_YDGbn == 0){
			famgbn = "F";
			deathgbn = "F";
			YEONDEUNG = "YEONDEUNG";
		}
		else if(rd_YDGbn == 1){
			famgbn = "T";
			deathgbn = "F";
			YEONDEUNG = "YEONDEUNG_FAM";
		}
		else if(rd_YDGbn == 2){
			famgbn = "F";
			deathgbn = "T";
			INYEONDEUNGDEUNG = "DEATH";
		}
		else if(rd_YDGbn == 3){
			famgbn = "T";
			deathgbn = "T";
			YEONDEUNG = "DEATH_FAM";
		}
		
		var params = {
    		 V_PROPOSAL_BUD_NO : bud_no
    		,V_FAM_GBN         : famgbn
    		,V_DEATH_GBN       : deathgbn
    		,V_ACCEPT_SDATE    : V_ACCEPT_SDATE
    		,V_ACCEPT_EDATE    : V_ACCEPT_EDATE  		
    		,V_JUNGAK_CD       : exCommon.getRepVal(me.lookupReference('lc_YDJungakInfo').getExValue(), '')
    		,V_CODE       	   : exCommon.getRepVal(me.lookupReference('lc_YDKindInfo').getExValue(), '')
    		,VV_USER_ID        : exCommon.getRepVal(me.lookupReference('lc_templeUserYD').getExValue(), '')
    		,V_CLOSE_YN        : exCommon.getRepVal(me.lookupReference('lc_YDCloseYn').getExValue(), '')
    		,V_SORT_SEQ        : exCommon.getRepVal(me.lookupReference('lc_PrintSort').getExValue(), '')
    		,rd_YDGbn          : rd_YDGbn
    	};
    	
		
		var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn').getValue().rdo_ApprovalGbn;
		
		
		printDataFlag = false;
		
		if(rdo_ApprovalGbn == undefined) rdo_ApprovalGbn = 3;
		
		
		if(rdo_ApprovalGbn == "3"){
			setTimeout(function(){				
	    		me.callStore(me, 'ds_YDRec_grd', '', params, me.onSelectYDCallback);
	    	},50);
		}else{
			setTimeout(function(){
	    		me.callStore(me, 'ds_YDRec_CH', '', params, me.onSelectYdCHCallback);
	    	},50);
		}
    },
    onSelectYdCHCallback : function(me, success, form, action){
    	console.log('onSelectYdCHCallback = ', action._params);
    	
    	if( success ){
    		//me.lookupReference('rec001w_16_c').getView().select(0);
    		
    		var rd_YDGbn = action._params.rd_YDGbn;
    		
    		me.lookupReference('select_yd_type').setExValue( action._params.rd_YDGbn);
    		
    		
    		var printDataStore  = 'ds_YDRec_sel';
    		
			var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn').getValue().rdo_ApprovalGbn;
    		
    		console.log(rdo_ApprovalGbn ,' '+ rd_YDGbn);
    		if(rdo_ApprovalGbn == 4 &&  (rd_YDGbn ==2 || rd_YDGbn == 3)){
    			printDataStore = 'ds_YDRec_sel_CH';
    		}
    		
    		
    		setTimeout(function(){
        		me.callStore(me, printDataStore, '', action._params, me.dsYdRecSelCallback);
        	},50);
    	}
    },
    onSelectYDCallback : function(me, success, form, action){
    	console.log('onSelectID_CHCallback = ', action._params);
    	
    	if( success ){
    		me.lookupReference('select_yd_type').setExValue( action._params.rd_YDGbn);
    		
    		me.lookupReference('rec001w_16_c').getView().select(0);
    		
    		
    		var rd_YDGbn        = me.lookupReference('rd_YDGbn').getValue().rd_YDGbn;
    		
    		if(rd_YDGbn != 3){
    			setTimeout(function(){
            		me.callStore(me, 'ds_YDRec_sel', '', action._params, me.dsYdRecSelCallback);
            	},50);
    		}else{
    			console.log('onSelectYDCallback');
    			printDataFlag = true;
    		}
    	}
    },
    dsYdRecSelCallback : function(me, success, form, action){
    	var rd_YDGbn = me.lookupReference('rd_YDGbn').getValue().rd_YDGbn;
    	
    	printDataFlag = true;
    	
    	me.inGetYdPrintType();
    },
    inGetYdPrintType : function(field, newValue, oldValue, options) {
    	var me = this;
    	
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn').getValue().rdo_ApprovalGbn;
    	var rd_YDGbn = me.lookupReference('rd_YDGbn').getValue().rd_YDGbn;
    	
    	if(rdo_ApprovalGbn == undefined) rdo_ApprovalGbn = 3;
    	if(rd_YDGbn == undefined) rd_YDGbn = 0;
    	
    	console.log('rdo_ApprovalGbn = ', rdo_ApprovalGbn);
    	console.log('getYdPrintType = ',rd_YDGbn);
    	
    	if(rdo_ApprovalGbn == 4){
    		me.lookupReference('rp_acceptGbn').setHidden(true);
    		return;
    	}
    	
    	
    	if(rd_YDGbn == 0 ){
    		me.lookupReference('rp_acceptGbn').setHidden(false);
    		me.lookupReference('rp_acceptDeathGbn').setHidden(true);
    		
    		me.lookupReference('rp_acceptGbn').setValue({rp_acceptGbn : 0});
    		
    		me.lookupReference('rp_acceptGbn3').setHidden(true);
    		
    		me.lookupReference('lc_PrintSort').setHidden(true);
    	}else if(rd_YDGbn == 1){
    		
    		me.lookupReference('rp_acceptGbn').setHidden(false);
    		me.lookupReference('rp_acceptDeathGbn').setHidden(true);
    		me.lookupReference('rp_acceptGbn').setValue({rp_acceptGbn : 0});
    		
    		me.lookupReference('rp_acceptGbn3').setHidden(false);
    		me.lookupReference('lc_PrintSort').setHidden(false);
    		/*
    	}else if(rd_YDGbn == 2){
    		me.lookupReference('rp_acceptGbn').setHidden(true);
    		me.lookupReference('rp_acceptDeathGbn').setHidden(true);
    		*/
    	}else{
    		me.lookupReference('rp_acceptDeathGbn').setValue({rp_acceptDeathGbn : 1});
    		me.lookupReference('rp_acceptGbn').setHidden(true);
    		me.lookupReference('rp_acceptDeathGbn').setHidden(false);
    		
    		me.lookupReference('lc_PrintSort').setHidden(true);
    	}
    },
    onRadioTypeClick : function(field, newValue, oldValue, options){
    	var me = this;
    	var rp_acceptGbn = newValue.rp_acceptGbn;
    	if(rp_acceptGbn == 0){
    		me.lookupReference('rp_mode').setExValue(1);
    	}else if(rp_acceptGbn == 1){
    		me.lookupReference('rp_mode').setExValue(2);
    	}else if(rp_acceptGbn == 2){
    		me.lookupReference('rp_mode').setExValue(4);
    	}else{
    		me.lookupReference('rp_mode').setExValue(3);
    	}
    	
    },
    onRadioTypeClickDeath : function(field, newValue, oldValue, options){
    	var me = this;
    	var rp_acceptDeathGbn = newValue.rp_acceptDeathGbn;
    	if(rp_acceptDeathGbn == 0){
    		me.lookupReference('drp_mode').setExValue(1);
    	}else{
    		me.lookupReference('drp_mode').setExValue(2);
    	}
    },
    onPrintYD : function(){
    	var me = this;
    	
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn').getValue().rdo_ApprovalGbn; // 1
    	var rd_YDGbn        = me.lookupReference('rd_YDGbn').getValue().rd_YDGbn; // 2
    	var select_yd_type  = me.lookupReference('select_yd_type').getExValue();
    	
    	
    	
    	
    	if(rdo_ApprovalGbn == undefined) rdo_ApprovalGbn = 3;
    	if(rd_YDGbn == undefined) rd_YDGbn = 0;
    	
    	
    	
    	var gridNm = 'ds_YDRec_grd';
    	if( rdo_ApprovalGbn == 4 ){
    		gridNm  = 'ds_YDRec_CH';
    	}
    	
    	var checkRecord = me.getViewModel().getStore(gridNm).findRecord('CHECK_P', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	if(rd_YDGbn != select_yd_type){
    		exCommon.msgAlert('조회데이터와 인쇄 유형이 일치하지 않습니다. ');
    		return;
    	}
    	
    	if(!printDataFlag){
    		exCommon.msgAlert('인쇄에 필요한 데이터를 조회중입니다.<br/> 잠시후 시도해주세요.');
    		return;
    	}
    	
    	console.log('rdo_ApprovalGbn = ', rdo_ApprovalGbn);
    	console.log('select_yd_type = [', select_yd_type+']');
    	
    	
    	if(rdo_ApprovalGbn == 3){
    		if(select_yd_type == 0){
       			me.inPrintYD_00(me);
       			return;
        	}
        	else if(select_yd_type == 1){
        		
        		var rp_acceptGbn = me.lookupReference('rp_acceptGbn').getValue().rp_acceptGbn;
        		console.log('select_yd_type =  가족등');
        		if(rp_acceptGbn == 0){
        			me.inPrintYD_01(me);
        		}else if(rp_acceptGbn == 1){
        			me.inPrintYD_01_01(me);
        		}
        		return;
        	}
        	else if(select_yd_type == 2 ){
        		
        		
        		
        	//	console.log( jsonAllData );
        		
        		var rp_acceptDeathGbn = me.lookupReference('rp_acceptDeathGbn').getValue().rp_acceptGbn;
        		if(rp_acceptDeathGbn == undefined ) rp_acceptDeathGbn = 0;
        		
        		
        		console.log('select_yd_type = 영가등 개인 ', rp_acceptDeathGbn);
        		
        		var jsonAllData  = me.inPrintYD_02(me); 
        		
        		var FILE_PATH   =  '/rec001w_06_rp_YDRec_03.ozr';
        		
        		if(rp_acceptDeathGbn == 1){
        			FILE_PATH   =  '/rec001w_06_rp_YDRec_03_2.ozr';
        		}
        		
        		var params = {
      				 FILE_PATH  : FILE_PATH 
      				,PRINT_DATA : jsonAllData
      				,rp_acceptDeathGbn  : rp_acceptDeathGbn
      			};
          		setTimeout(function(){
                		me.openPopup('ExFrm.view.com.print',  params, null);
               },100);
    		
        		
        		return;
        	}
        	else if(select_yd_type == 3 ){
        		var rp_acceptDeathGbn = me.lookupReference('rp_acceptDeathGbn').getValue().rp_acceptDeathGbn;
        		if(rp_acceptDeathGbn == undefined ) rp_acceptDeathGbn = 1;
        		
        		
        		var params = me.inParamInit();
        		params.rp_acceptDeathGbn = rp_acceptDeathGbn; 
        		
        		console.log('params = ', params);
        		
        		setTimeout(function(){
    	    		me.callStore(me, 'ds_YDRec_sel_new', '', params, me.onYdRecSelNewCHCallback);
    	    	},50);
        		return;
        	}
    	}   
    	else{ // 연등 축천혼
    		if(select_yd_type == 0 || select_yd_type == 1){
       			me.inPrintYD_00_CH(me);
       			return;
    		}else{
    			me.inPrintYD_01_CH(me);
    			return;
    		}
    	}
    },
    onYdRecSelNewCHCallback : function(me, success, form, action){
    	console.log('onYdRecSelNewCHCallback 영가 가족등 인쇄');
    	var jsonAllData   = me.inPrintYD_02_NEW(me);
    	
    	var FILE_PATH   =  '/rec001w_06_rp_YDRec_03.ozr';
		
    	console.log( action._params );
    	
		if(action._params.rp_acceptDeathGbn == 3){
			FILE_PATH   =  '/rec001w_06_rp_YDRec_03_2.ozr';
		}
    	
    	var params = {
			 FILE_PATH  : FILE_PATH 
			,PRINT_DATA : jsonAllData
		};
  		setTimeout(function(){
        		me.openPopup('ExFrm.view.com.print',  params, null);
       },100);
    	
    },
    inPrintYD_02_NEW : function(me){
    	console.log('inPrintYD_02_NEW ');
    	
    	
    	var varchar1 = '';  var varchar2 = '';  var varchar3  = ''; var varchar4 = '';  var varchar5  = '';
    	var varchar6 = '';  var varchar7 = '';  var varchar8  = ''; var varchar9 = '';  var varchar10 = ''; 
    	var varchar11 = ''; var varchar12 = ''; var varchar13 = ''; var varchar14 = ''; var varchar15 = '';
    	var varchar16 = ''; var varchar17 = ''; var varchar18 = ''; var varchar19 = ''; var varchar20 = ''; 
    	var varchar21 = ''; var varchar22 = ''; var varchar23 = ''; var varchar24 = ''; var varchar25 = '';
    	var varchar99 = '';
    	
    	
    	var row = me.getViewModel().getStore('ds_YDRec_sel_new').getCount();
    	console.log('inPrintYD_02 row = ', row);
		var idx1          = 25;
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var A_PAGE_SKIP_NEW;
    	var A_CNT;
    	
    	for(var i = 0; i<row ; i++){
    		
    		var CNT           = '';
    		var PAGE_SKIP_NEW = '';
    		try{
    			 CNT           = me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("CNT");
        		 PAGE_SKIP_NEW = me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("PAGE_SKIP_NEW");
    		}catch (e) {
				console.log(e);
				console.log(i);
				console.log(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i));
			}
    		
    		
    		if(i == 0 || PAGE_SKIP_NEW != A_PAGE_SKIP_NEW){
    			A_PAGE_SKIP_NEW = PAGE_SKIP_NEW;
    			A_CNT           = CNT;
    			//ds_print.AddRow();
    		}
    		
    		
    		//console.log(i, ' ->'+ PAGE_SKIP_NEW + ' : '+ CNT + '  : '+ A_CNT);
    		
    		
    		varchar1 = '';  varchar2 = '';  varchar3  = ''; varchar4 = '';  varchar5  = '';
        	varchar6 = '';  varchar7 = '';  varchar8  = ''; varchar9 = '';  varchar10 = ''; 
        	varchar11 = ''; varchar12 = ''; varchar13 = ''; varchar14 = ''; varchar15 = '';
        	varchar16 = ''; varchar17 = ''; varchar18 = ''; varchar19 = ''; varchar20 = ''; 
        	varchar21 = ''; varchar22 = ''; varchar23 = ''; varchar24 = ''; varchar25 = '';
        	varchar99 = '';
			
			
			varchar21 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("LIGHT_NO"), '');
			varchar22 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("ADDR1"), '') +' '+
						exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("ADDR2"), '').replace(/[-]/g,'·');
			varchar24 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("HYO_REL"), '') + " " +
						exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("BOK_NAME_KOR"), '')
			varchar99 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("TEMPLE_NM"), '');
			
    		
			if(A_CNT >= 1){
				varchar25 = 'default1';
				
				varchar1 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("DECE_REL"), '');
				varchar2 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("BON_SEX_NM"), '');
				varchar3 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("NAME_KOR"), '');
				varchar4 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("YOUNGGA"), '');
			}
			
			if(A_CNT >= 2){
				i++;
				varchar25 = 'default2';
				
				varchar5 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("DECE_REL"), '');
				varchar6 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("BON_SEX_NM"), '');
				varchar7 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("NAME_KOR"), '');
				varchar8 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("YOUNGGA"), '');
				
			}// if
			
			if(A_CNT >= 3){
				i++;
				varchar25 = 'default2';
				
				varchar9  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("DECE_REL"), '');
				varchar10 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("BON_SEX_NM"), '');
				varchar11 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("NAME_KOR"), '');
				varchar12 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("YOUNGGA"), '');
				
			}// if
			
			if(A_CNT >= 4){
				i++;
				varchar25 = 'default2';
				
				varchar13 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("DECE_REL"), '');
				varchar14 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("BON_SEX_NM"), '');
				varchar15 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("NAME_KOR"), '');
				varchar16 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("YOUNGGA"), '');
			}// if
			
			if(A_CNT >= 5){
				i++;
				varchar25 = 'default5';
				
				varchar17  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("DECE_REL"), '');
				varchar18 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("BON_SEX_NM"), '');
				varchar19 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("NAME_KOR"), '');
				varchar20 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel_new').getAt(i).get("YOUNGGA"), '');
				A_CNT -= 5;
			}// if
			
			var jsonYDdata = {
				 varchar1  : varchar1  , varchar2  : varchar2  , varchar3  : varchar3  ,varchar4  : varchar4  ,varchar5  : varchar5 
				,varchar6  : varchar6  , varchar7  : varchar7  , varchar8  : varchar8  ,varchar9  : varchar9  ,varchar10 : varchar10
				,varchar11 : varchar11 , varchar12 : varchar12 , varchar13 : varchar13 ,varchar14 : varchar14 ,varchar15 : varchar15
				,varchar16 : varchar16 , varchar17 : varchar17 , varchar18 : varchar18 ,varchar19 : varchar19 ,varchar20 : varchar20
				,varchar21 : varchar21 , varchar22 : varchar22 , varchar23 : varchar23 ,varchar24 : varchar24 ,varchar25 : varchar25
				,varchar99 : varchar99
			};
			jsonPrintData.push(jsonYDdata);
			
    	}// for
    	
    	
    	
		
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		return jsonAllData;
		
    },    
    
    inPrintYD_01 : function(me){
    	//rp_acceptGbn
		var g_row = me.getViewModel().getStore('ds_YDRec_grd').getCount();
		
    	var jsonPrintData   = [];
    	var jsonAllData     = {};
    	var addr1           = '';
		var addr2           = '';
		var daeju_no        = '';
		var dongcham_bud_no = '';
    	
		//rp_YDRec_02
		for(var i = 0; i < g_row ; i++){
			var g_record  = me.getViewModel().getStore('ds_YDRec_grd').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			
    			var findRecord = me.getViewModel().getStore('ds_YDRec_sel').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var ROW        = me.getViewModel().getStore('ds_YDRec_sel').indexOf(findRecord);
    			
    			if(findRecord != null && findRecord != undefined){
    			
	    			if(ROW != -1){
	    				
	    				var CNT = me.getViewModel().getStore('ds_YDRec_sel').getAt(ROW).get("CNT");
	    				
						var idx = (ROW+CNT);
	    				
	    				for(k = ROW; k <idx ; k++){
	    					var k_record = me.getViewModel().getStore('ds_YDRec_sel').getAt(k);
	    					
	    					if(k==ROW){
								addr1 = exCommon.getRepVal(k_record.get("ADDR1"),'');
								addr2 = exCommon.getRepVal(k_record.get("ADDR2"),'');
								addr2 = addr2.replace(/[-]/g,'·');
								break;l
							}
	    				}// if k
	    				
	    				for(j = ROW; j <idx ; j++){
	    					
	    					
	    					var idx1 = 24;
	    					
	    					var varchar24;
	    					var varchar1  = ''; var varchar2  = ''; var varchar3  = '';  var varchar4  = '';  var varchar5  = '';  var varchar6  = '';
	    					var varchar7  = ''; var varchar8  = ''; var varchar9  = '';  var varchar10 = '';  var varchar11 = '';  var varchar12 = '';
	    					var varchar13 = ''; var varchar14 = ''; var varchar15 = '';  var varchar16 = '';  var varchar17 = '';  var varchar18 = '';
	    					var varchar19 = ''; var varchar20 = ''; var varchar21 = '';  var varchar22 = '';  var varchar23 = '';  var varchar99 = '';
	    					
	    					
	    					varchar23 = addr2;
	    					varchar22 = addr1+' '+ addr2;
	    					varchar21 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("LIGHT_NO"),'');
	    					varchar99 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("TEMPLE_NM"),'');
	    					
	    					
	    					if(CNT >= 1){
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						varchar24 = 'default1';  	
	    						varchar1  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar2  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    					}
	    					
	    					if(CNT >= 2){
	    						j++;
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						varchar24 = 'default2';
	    						varchar3  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar4  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    					}
	    					
	    					if(CNT >= 3){
	    						j++;
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						varchar24 = 'default3';
	    						varchar5  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar6  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    					}
	    					
	    					if(CNT >= 4){
	    						j++;
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						varchar24 = 'default4';
	    						varchar7  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar8  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    					}
	    					
	    					if(CNT >= 5){
	    						j++;
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						varchar24 = 'default5';
	    						varchar9  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar10 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    					}
	    					
	    					if(CNT >= 6){
	    						j++;
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						varchar24 = 'default6';
	    						varchar11 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar12 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    					}
	    					
	    					if(CNT >= 7){
	    						j++;
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						varchar24 = 'default7';
	    						varchar13 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar14 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    					}
	    					
	    					if(CNT >= 8){
	    						j++;
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						
	    						varchar24 = 'default8';    						    						
	    						varchar15 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar16 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');    						
	    					}
	    					
	    					if(CNT >= 9){
	    						j++;
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						
	    						varchar24 = 'default9';
	    						varchar17  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar18  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						
	    					}
	    					
	    					if(CNT >= 10){
	    						j++;
	    						
	    						if(PAGE_SKIP != exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("PAGE_SKIP"),'') ){
	            	    			break;
	            	    		}
	    						
	    						varchar24 = 'default9';
	    						varchar19  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"),'');
	    						varchar20  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"),'');
	    						
	    						CNT -= 10;
	    					}
	    					        					        				        					
	    					var subData = {
	    						 varchar1  : exCommon.getRepVal(varchar1,'')  ,varchar2  : exCommon.getRepVal(varchar2,'')
	    						,varchar3  : exCommon.getRepVal(varchar3,'')  ,varchar4  : exCommon.getRepVal(varchar4,'')
	    						,varchar5  : exCommon.getRepVal(varchar5,'')  ,varchar6  : exCommon.getRepVal(varchar6,'')
	    						,varchar7  : exCommon.getRepVal(varchar7,'')  ,varchar8  : exCommon.getRepVal(varchar8,'')
	    						,varchar9  : exCommon.getRepVal(varchar9,'')  ,varchar10 : exCommon.getRepVal(varchar10,'')
	    						,varchar11 : exCommon.getRepVal(varchar11,'') ,varchar12 : exCommon.getRepVal(varchar12,'')
	    						,varchar13 : exCommon.getRepVal(varchar13,'') ,varchar14 : exCommon.getRepVal(varchar14,'')
	    						,varchar15 : exCommon.getRepVal(varchar15,'') ,varchar16 : exCommon.getRepVal(varchar16,'')
	    						,varchar17 : exCommon.getRepVal(varchar17,'') ,varchar18 : exCommon.getRepVal(varchar18,'')
	    						,varchar19 : exCommon.getRepVal(varchar19,'') ,varchar20 : exCommon.getRepVal(varchar20,'')
	    						,varchar21 : exCommon.getRepVal(varchar21,'') ,varchar22 : exCommon.getRepVal(varchar22,'')
	    						,varchar23 : exCommon.getRepVal(varchar23,'') ,varchar24 : exCommon.getRepVal(varchar24,'')
	    						,varchar99 : varchar99
	    					}
	    					jsonPrintData.push(subData);
	    				}// for j
	    				
	    			}// if
    			} 
    		}// if
		}// for i
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		console.log('jsonAllData = ', jsonAllData);
		
		var params = {
  			 FILE_PATH  : '/rec001w_06_rp_YDRec_02.ozr' 
  			,PRINT_DATA : jsonAllData
  		};
		
		setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    },
    inPrintYD_01_CH : function(me){
    	
    	var g_row = me.getViewModel().getStore('ds_YDRec_CH').getCount();
		
    	
    	
		var jsonAllData   = {};
    	var jsonPrintData = [];
		
    	console.log('inPrintYD_01_CH g_row = ', g_row);
    	console.log('inPrintYD_01_CH g_row getCount = ', me.getViewModel().getStore('ds_YDRec_CH').getCount());
    	
    	
    	
		for(var i = 0; i < g_row ; i++){
			var g_record  = me.getViewModel().getStore('ds_YDRec_CH').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			
    			var findRecord = me.getViewModel().getStore('ds_YDRec_sel_CH').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			
    			if(findRecord != null &&   findRecord != undefined){
	    			var ROW        = me.getViewModel().getStore('ds_YDRec_sel_CH').indexOf(findRecord);
	    			var sel_row    = me.getViewModel().getStore('ds_YDRec_sel_CH').getCount();
	    			
	    			var jsonPrayData = [];
	    			
	    			
	    			var A_HYO_REL      = '';
		    		var A_BOK_NAME_KOR = '';
		    		var A_BOKWI_NM     = '';
	    			
	    			var flag = 0;
	    			for(ROW ; ROW < sel_row ; ROW++){
	    	    		var sel_record = me.getViewModel().getStore('ds_YDRec_sel_CH').getAt(ROW);
	    	    		
	    	    		try{
	    	    			if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
	        	    			break;
	        	    		}
	    	    		}catch (e) {
	    	    			console.log('catch');
							break;
						}
	    	    		
	    	    		var HYO_REL      = exCommon.getRepVal(sel_record.get("HYO_REL"), '');
	    	    		var BOK_NAME_KOR = exCommon.getRepVal(sel_record.get("BOK_NAME_KOR"), '');
	    	    		var BOKWI_NM     = exCommon.getRepVal(sel_record.get("BOKWI_NM"), '');
	    	    		
	    	    		if(A_HYO_REL == HYO_REL && A_BOK_NAME_KOR == BOK_NAME_KOR && A_BOKWI_NM == BOKWI_NM){
	    	    			HYO_REL      = '';
	    	    			BOK_NAME_KOR = '';
	    	    			BOKWI_NM     = '';
	    	    		}else{
	    	    			A_HYO_REL      = HYO_REL;
	    	    			A_BOK_NAME_KOR = BOK_NAME_KOR;
	    	    			A_BOKWI_NM     = BOKWI_NM;
	    	    		}
	    	    		
	    	    		var subData = {
	    					HYO_REL      : HYO_REL
		    			   ,BOK_NAME_KOR : BOK_NAME_KOR
		    			   ,BOKWI_NM     : BOKWI_NM
		    			   ,DECE_REL     : exCommon.getRepVal(sel_record.get("DECE_REL"), '')
		    			   ,BON_NM       : exCommon.getRepVal(sel_record.get("BON_NM"), '')
		    			   ,NAME_KOR     : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')    	    			   
		    			   ,DEATH_KOR    : exCommon.getRepVal(sel_record.get("DEATH_KOR"), '')
	    	    		};
	    	    		
	    	    		if(flag == 0){
	    	    			A_HYO_REL       = HYO_REL;
	    	    			A_BOK_NAME_KOR  = BOK_NAME_KOR;
	    	    			A_BOKWI_NM      = BOKWI_NM;
	    	    		}
	    	    		
	    	    		
	    	    		jsonPrayData.push(subData);
	    	    		
	    	    		flag++;
	    	    	}// for ROW
	    	    	
	    	    	var ZIP_CD        = exCommon.getRepVal(findRecord.get("ZIP_CD"), '');
	    	    	var TELNO         = exCommon.getRepVal(findRecord.get("TELNO"), '');
						TELNO         = TELNO.replace('()-', '');  
					var BUD_CODE      = exCommon.getRepVal(findRecord.get("PROPOSAL_BUD_NO"), '').substr(0,10);
					var ADDR_ALL      = exCommon.getRepVal(findRecord.get("ADDR_ALL"), '');
	    	    	
	    	    	jsonBaseData = {
		    			 BUD_CODE : BUD_CODE
						,TELNO    : TELNO.replace('() -','')
						,ADDR_ALL : ADDR_ALL
						,ZIP_CD   : ZIP_CD
						,WISH     : ''
						,prayList : jsonPrayData
	    	    	};    	    	
	    	    	jsonPrintData.push(jsonBaseData);
    			}else{
    				console.log(PAGE_SKIP+ ' -->', findRecord);
    			}
    		}// 
		}// for g_row
		
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		console.log(jsonAllData);
	//	console.log( Ext.encode(jsonAllData) );
		var params = {
			 FILE_PATH  : '/rec001w_06_rp_ID_CH_02Rec.ozr' 
			,PRINT_DATA : jsonAllData
		};
      	
      	setTimeout(function(){
      		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    inPrintYD_00_CH : function(me){
    	
    	var g_row = me.getViewModel().getStore('ds_YDRec_CH').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
		
		for(var i = 0; i < g_row ; i++){
			var g_record  = me.getViewModel().getStore('ds_YDRec_CH').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(g_record != null && g_record != undefined){
    		
	    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
	    			
	    			var findRecord = me.getViewModel().getStore('ds_YDRec_sel').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
	    			
	    			if(findRecord != null && findRecord != undefined){
	    			
		    			var ROW        = me.getViewModel().getStore('ds_YDRec_sel').indexOf(findRecord);
		    			var sel_row    = me.getViewModel().getStore('ds_YDRec_sel').getCount();
		    			
		    			var jsonPrayData = [];
		    			
		    			for(ROW ; ROW < sel_row ; ROW++){
		    	    		
		    	    		var sel_record = me.getViewModel().getStore('ds_YDRec_sel').getAt(ROW);
		    	    		
		    	    		try{
		    	    			if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
		        	    			break;
		        	    		}
		    	    		}catch (e) {
		    	    			console.log('inPrintYD_00_CH err = ', i + ' <-->'+ ROW);
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
							,TELNO    : TELNO.replace('() -','')  
							,ADDR_ALL : ADDR_ALL
							,ZIP_CD   : ZIP_CD
							,WISH     : ''
							,prayList : jsonPrayData
		    	    	};    	    	
		    	    	jsonPrintData.push(jsonBaseData);
	    			}// 
	    		}// 
    		} //
		}// for 
		
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		var params = {
			 FILE_PATH  : '/rec002w_06_rp_GDRec.ozr' 
			,PRINT_DATA : jsonAllData
		};
      	
      	setTimeout(function(){
      		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    inPrintYD_02 : function(me){
    	
    	var g_row = me.getViewModel().getStore('ds_YDRec_grd').getCount();
		
		var idx1          = 25;
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	console.log('inPrintYD_02 g_row = ', g_row);
    	
		for(var i = 0; i < g_row ; i++){
			var g_record  = me.getViewModel().getStore('ds_YDRec_grd').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(g_record != null && g_record != undefined){
	    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
	    			
	    			var findRecord = me.getViewModel().getStore('ds_YDRec_sel').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
	    			
	    			if(findRecord != null && findRecord != undefined){
	    			
		    			var ROW        = me.getViewModel().getStore('ds_YDRec_sel').indexOf(findRecord);
		    			
		    			var varchar1 = '';  var varchar2 = '';  var varchar3  = ''; var varchar4 = '';  var varchar5  = '';
		            	var varchar6 = '';  var varchar7 = '';  var varchar8  = ''; var varchar9 = '';  var varchar10 = ''; 
		            	var varchar11 = ''; var varchar12 = ''; var varchar13 = ''; var varchar14 = ''; var varchar15 = '';
		            	var varchar16 = ''; var varchar17 = ''; var varchar18 = ''; var varchar19 = ''; var varchar20 = ''; 
		            	var varchar21 = ''; var varchar22 = ''; var varchar23 = ''; var varchar24 = ''; var varchar25 = '';
		            	var varchar99 = '';
		    			
		    			if(ROW != -1){
		    				var CNT = me.getViewModel().getStore('ds_YDRec_sel').getAt(ROW).get("CNT");
							var idx = (ROW+CNT);
							
							for(j = ROW; j <idx ; j++){
								
								varchar1 = '';  varchar2 = '';  varchar3  = ''; varchar4 = '';  varchar5  = '';
				            	varchar6 = '';  varchar7 = '';  varchar8  = ''; varchar9 = '';  varchar10 = ''; 
				            	varchar11 = ''; varchar12 = ''; varchar13 = ''; varchar14 = ''; varchar15 = '';
				            	varchar16 = ''; varchar17 = ''; varchar18 = ''; varchar19 = ''; varchar20 = ''; 
				            	varchar21 = ''; varchar22 = ''; varchar23 = ''; varchar24 = ''; varchar25 = '';
				            	varchar99 = '';
								
								
								
								varchar21 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("LIGHT_NO"), '');
								varchar22 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("ADDR1"), '') +' '+
											exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("ADDR2"), '').replace(/[-]/g,'·');
								varchar24 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("HYO_REL"), '') + " " +
											exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("BOK_NAME_KOR"), '')
								varchar99 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("TEMPLE_NM"), '');
								
								if(CNT >= 1){
									varchar25 = 'default1';
									
									varchar1 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("DECE_REL"), '');
									varchar2 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("BON_SEX_NM"), '');
									varchar3 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
									varchar4 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("YOUNGGA"), '');
								}
								
								if(CNT >= 2){
									j++;
									varchar25 = 'default2';
									
									varchar5 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("DECE_REL"), '');
									varchar6 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("BON_SEX_NM"), '');
									varchar7 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
									varchar8 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("YOUNGGA"), '');
									
								}// if
								
								if(CNT >= 3){
									j++;
									varchar25 = 'default2';
									
									varchar9  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("DECE_REL"), '');
									varchar10 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("BON_SEX_NM"), '');
									varchar11 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
									varchar12 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("YOUNGGA"), '');
									
								}// if
								
								if(CNT >= 4){
									j++;
									varchar25 = 'default2';
									
									varchar13  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("DECE_REL"), '');
									varchar14 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("BON_SEX_NM"), '');
									varchar15 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
									varchar16 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("YOUNGGA"), '');
								}// if
								
								if(CNT >= 5){
									j++;
									varchar25 = 'default5';
									
									varchar17  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("DECE_REL"), '');
									varchar18 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("BON_SEX_NM"), '');
									varchar19 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
									varchar20 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("YOUNGGA"), '');
									CNT -= 5;
								}// if
								
								var jsonYDdata = {
									 varchar1  : varchar1  , varchar2  : varchar2  , varchar3  : varchar3  ,varchar4  : varchar4  ,varchar5  : varchar5 
									,varchar6  : varchar6  , varchar7  : varchar7  , varchar8  : varchar8  ,varchar9  : varchar9  ,varchar10 : varchar10
									,varchar11 : varchar11 , varchar12 : varchar12 , varchar13 : varchar13 ,varchar14 : varchar14 ,varchar15 : varchar15
									,varchar16 : varchar16 , varchar17 : varchar17 , varchar18 : varchar18 ,varchar19 : varchar19 ,varchar20 : varchar20
									,varchar21 : varchar21 , varchar22 : varchar22 , varchar23 : varchar23 ,varchar24 : varchar24 ,varchar25 : varchar25
									,varchar99 : varchar99
								};
								jsonPrintData.push(jsonYDdata);
								
							}// for j
		    				
		    			}// if ROW
	    			}// if(findRecord != null && findRecord != undefined){
		    			
	    		}// if CHECK_P
    		}// if(g_record != null && g_record != undefined){
    		
			
		}// for i
		
		
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		return jsonAllData;
		
    },
    inPrintYD_01_01 : function(me){
    	
    	var g_row = me.getViewModel().getStore('ds_YDRec_grd').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_YDRec_grd').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(g_record != null && g_record != undefined){
    		
	    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
	    			
	    			var findRecord = me.getViewModel().getStore('ds_YDRec_sel').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
	    			var ROW        = me.getViewModel().getStore('ds_YDRec_sel').indexOf(findRecord);
	    			console.log('findRecord = ', findRecord);
	    			if(findRecord != null && findRecord != undefined){
		    			var varchar1 = '';  var varchar2 = '';  var varchar3  = ''; var varchar4 = '';  var varchar5  = '';
		            	var varchar6 = '';  var varchar7 = '';  var varchar8  = ''; var varchar9 = '';  var varchar10 = ''; 
		            	var varchar11 = ''; var varchar12 = ''; var varchar13 = ''; var varchar14 = ''; var varchar15 = '';
		            	var varchar16 = ''; var varchar17 = ''; var varchar18 = ''; var varchar19 = ''; var varchar20 = ''; 
		            	var varchar21 = ''; var varchar22 = ''; var varchar23 = ''; var varchar24 = ''; var varchar25 = '';
		            	var varchar99 = ''; var varchar30 = ''; var varchar31 = '';
		    			
		    			if(ROW != -1){
		    				 var CNT             = findRecord.get("CNT");
		    				 var idx             = (ROW+CNT);
		    				 var maxUp           = false;
							 var daeju_name      = '';
							 var daeju_ganji     = '';
							 var addr1           = '';
							 var addr2           = '';
							 var daeju_no        = '';
							 var dongcham_bud_no = '';
		    				
							//주소정보 세팅
							for(k = ROW; k <idx ; k++){
								varchar1 = '';  varchar2 = '';  varchar3  = ''; varchar4 = '';  varchar5  = '';
				            	varchar6 = '';  varchar7 = '';  varchar8  = ''; varchar9 = '';  varchar10 = ''; 
				            	varchar11 = ''; varchar12 = ''; varchar13 = ''; varchar14 = ''; varchar15 = '';
				            	varchar16 = ''; varchar17 = ''; varchar18 = ''; varchar19 = ''; varchar20 = ''; 
				            	varchar21 = ''; varchar22 = ''; varchar23 = ''; varchar24 = ''; varchar25 = '';
				            	varchar99 = ''; varchar30 = ''; varchar31 = '';
								
								
								var k_record = me.getViewModel().getStore('ds_YDRec_sel').getAt(k);
								
								if(k==ROW){
									addr1       = exCommon.getRepVal(k_record.get("ADDR1"), '');
									addr2       = exCommon.getRepVal(k_record.get("ADDR2"), '').replace(/[-]/g,'·');
									daeju_name  = exCommon.getRepVal(k_record.get("NAME_KOR"), '');  								
									daeju_ganji = exCommon.getRepVal(k_record.get("SEXAGENARY_NM"), '');
								}
							}
		    				
							
							for(j = ROW; j <idx ; j++){
								var j_record = me.getViewModel().getStore('ds_YDRec_sel').getAt(j);
								var idx1          = 24;
								
								if(maxUp){
									varchar1 = '';  varchar2 = '';  varchar3  = ''; varchar4 = '';  varchar5  = '';
					            	varchar6 = '';  varchar7 = '';  varchar8  = ''; varchar9 = '';  varchar10 = ''; 
					            	varchar11 = ''; varchar12 = ''; varchar13 = ''; varchar14 = ''; varchar15 = '';
					            	varchar16 = ''; varchar17 = ''; varchar18 = ''; varchar19 = ''; varchar20 = ''; 
					            	varchar21 = ''; varchar22 = ''; varchar23 = ''; varchar24 = ''; varchar25 = '';
					            	varchar99 = ''; varchar30 = ''; varchar31 = '';
								}
								
								varchar23 = addr2;
								varchar22 = addr1 +' ' + addr2;												
								varchar21 = exCommon.getRepVal(findRecord.get("LIGHT_NO"), '');
								varchar99 = exCommon.user.templeNm;
								
								console.log(j+'F CNT = ', CNT);
								if(CNT >= 1){
									console.log(j+'CNT = ', CNT);
									varchar24 = 'default1';
									varchar1  = daeju_ganji;
									varchar2  = daeju_name;
								}
								
								if(CNT >= 2){
									console.log(j+'CNT = ', CNT);
									varchar24 = 'default2';
									
									console.log('1cnt 2 >  j = ', j);
									console.log(exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j)));
									
									if(!maxUp){
										j++
									}
									
									console.log('2cnt 2 >  j = ', j);
									console.log(exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j)));
									
									varchar3  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar4  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 3){
									varchar24 = 'default3';
									j++
									varchar5  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar6  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 4){
									varchar24 = 'default4';
									j++;
									console.log('j = ', j);
									varchar7  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar8  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 5){
									varchar24 = 'default5';
									j++
									varchar9  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar10  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 6){
									varchar24 = 'default6';
									j++
									varchar11  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar12  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 7){
									varchar24 = 'default7';
									j++
									varchar13  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar14  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 8){
									varchar24 = 'default9';
									j++
									varchar15  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar16  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 9){
									varchar24 = 'default9';
									j++
									varchar17  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar18  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 10){
									varchar24 = 'default10';
									j++
									varchar19  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar20  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
								}
								
								if(CNT >= 11){
									varchar24 = 'default10';
									j++
									varchar30  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("SEXAGENARY_NM"), '');
									varchar31  = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("NAME_KOR"), '');
									CNT -= 10;
									maxUp = true;
								}
								var jsonYDdata = {
									 varchar1  : varchar1  , varchar2  : varchar2  , varchar3  : varchar3  ,varchar4  : varchar4  ,varchar5  : varchar5 
									,varchar6  : varchar6  , varchar7  : varchar7  , varchar8  : varchar8  ,varchar9  : varchar9  ,varchar10 : varchar10
									,varchar11 : varchar11 , varchar12 : varchar12 , varchar13 : varchar13 ,varchar14 : varchar14 ,varchar15 : varchar15
									,varchar16 : varchar16 , varchar17 : varchar17 , varchar18 : varchar18 ,varchar19 : varchar19 ,varchar20 : varchar20
									,varchar21 : varchar21 , varchar22 : varchar22 , varchar23 : varchar23 ,varchar24 : varchar24 ,varchar25 : varchar25
									,varchar99 : varchar99 , varchar30 : varchar30 , varchar31 : varchar31 
								};
								jsonPrintData.push(jsonYDdata);
							
							}// if
							
		    			}// if ROW
	    			}//if(findRecord != null && findRecord != undefined){
		    			
	    		}// CHECK_P
    		}// if(g_record != null && g_record != undefined){
    	}// for i
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	console.log( jsonAllData );
    	
    	var params = {
   			 FILE_PATH  : '/rec001w_06_rp_YDRec_06.ozr' 
   			,PRINT_DATA : jsonAllData
   		};
         	
     	setTimeout(function(){
     		me.openPopup('ExFrm.view.com.print',  params, null);
       },100);
    	
    	
    	// rp_YDRec_06
    },
    inPrintYD_00 : function(me){
    	var g_row = me.getViewModel().getStore('ds_YDRec_grd').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
		
		for(var i = 0; i < g_row ; i++){
			var g_record  = me.getViewModel().getStore('ds_YDRec_grd').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(g_record != null && g_record != undefined){
	    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
	    			
	    			var findRecord = me.getViewModel().getStore('ds_YDRec_sel').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
	    			var ROW        = me.getViewModel().getStore('ds_YDRec_sel').indexOf(findRecord);
	    			if(ROW != -1){
	    				var sel_record = me.getViewModel().getStore('ds_YDRec_sel').getAt(ROW);
	    			//	console.log(sel_record);
	    				
	    				var LIGHT_NO      = exCommon.getRepVal(sel_record.get("LIGHT_NO"), '');
	    				var ADDR1         = exCommon.getRepVal(sel_record.get("ADDR1"), '');
	    				var ADDR2         = exCommon.getRepVal(sel_record.get("ADDR2"), '');
	    				var NAME_KOR      = exCommon.getRepVal(sel_record.get("NAME_KOR"), '');
	    				var SEXAGENARY_NM = exCommon.getRepVal(sel_record.get("SEXAGENARY_NM"), '');
	    				var TEMPLE_NM     = exCommon.getRepVal(sel_record.get("TEMPLE_NM"), '');
	    				
	    				var jsonYDdata = {
	    					 LIGHT_NO      : LIGHT_NO
	    					,ADDR          : ADDR1+ ' ' + ADDR2        					
	    					,NAME_KOR      : NAME_KOR
	    					,SEXAGENARY_NM : SEXAGENARY_NM
	    					,TEMPLE_NM     : TEMPLE_NM
	        			}
	    			}
	    			jsonPrintData.push(jsonYDdata);
	    		}// 
    		}
		}// for g_row
		
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		
		var params = {
			 FILE_PATH  : '/rec001w_06_rp_YDRec_01.ozr' 
			,PRINT_DATA : jsonAllData
		};
		
		var rp_acceptGbn       = me.lookupReference('rp_acceptGbn').getValue().rp_acceptGbn;
		
		if(rp_acceptGbn == 1){
			params.FILE_PATH = 'rec001w_06_rp_YDRec_01_01.ozr';
		}
      	
      	setTimeout(function(){
      		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    onMouseRightClick_A:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec001w_16_c').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  selectedRecord , me.onMouseRightReceive_A);
    },
    onMouseRightReceive_A : function(gbn, me){
    	var selectedRecord = me.lookupReference('rec001w_16_c').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
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
    	
    	var selectedRecord = me.lookupReference('rec001w_16_d').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  selectedRecord , me.onMouseRightReceive_B);
    	
    },
    onMouseRightReceive_B : function(gbn, me){
    	var selectedRecord = me.lookupReference('rec001w_16_d').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
    		if(gbn == 'T'){
	    		selectedRecord[i].set("CHECK_P", true);
	    	}else{
	    		selectedRecord[i].set("CHECK_P", false);
	    	}
	    	
    	}
    },
    inParamInit : function(){
    	var me =this;
    	
    	var params = {
   			 V_ACCEPT_SEQ1  : ''
   			,V_ACCEPT_SEQ2  : ''
   			,V_ACCEPT_SEQ3  : ''
   			,V_ACCEPT_SEQ4  : ''
   			,V_ACCEPT_SEQ5  : ''
   			,V_ACCEPT_SEQ6  : ''
   			,V_ACCEPT_SEQ7  : ''
   			,V_ACCEPT_SEQ8  : ''
   			,V_ACCEPT_SEQ9  : ''
   			,V_ACCEPT_SEQ10 : ''
   			
   		}
   		var row = me.getViewModel().getStore('ds_YDRec_grd').getCount();
   		
    	
    	var addedRow = 0;
   		for(var i = 0; i < row ; i++){
   			var record      = me.getViewModel().getStore('ds_YDRec_grd').getAt(i);
   			var ACCEPT_SEQ  = record.get("ACCEPT_SEQ");
   			var CHECKED     = record.get("CHECK_P");
   			
   			if(CHECKED){
   				addedRow++;
   				if(addedRow<=150){
   					params.V_ACCEPT_SEQ1 +=",'"+ACCEPT_SEQ+"'";
   				}
   			    else if(addedRow<=300){
   			    	params.V_ACCEPT_SEQ2 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			    else if(addedRow<=450){
   			    	params.V_ACCEPT_SEQ3 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			    else if(addedRow<=600){
   			    	params.V_ACCEPT_SEQ4 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			    else if(addedRow<=750){
   			    	params.V_ACCEPT_SEQ5 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			    else if(addedRow<=900){
   			    	params.V_ACCEPT_SEQ6 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			    else if(addedRow<=1050){
   			    	params.V_ACCEPT_SEQ7 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			    else if(addedRow<=1200){
   			    	params.V_ACCEPT_SEQ8 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			    else if(addedRow<=1350){
   			    	params.V_ACCEPT_SEQ9 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			    else if(addedRow<=1500){
   			    	params.V_ACCEPT_SEQ10 +=",'"+ACCEPT_SEQ+"'";
   			    }
   			}
   		}// for i
   		
   		if(params.V_ACCEPT_SEQ1 != ''){
   			params.V_ACCEPT_SEQ1 = params.V_ACCEPT_SEQ1.substring(1);
   		}
   		if(params.V_ACCEPT_SEQ2 != ''){
   			params.V_ACCEPT_SEQ2 = params.V_ACCEPT_SEQ2.substring(1);
   		}
   		if(params.V_ACCEPT_SEQ3 != ''){
   			params.V_ACCEPT_SEQ3 = params.V_ACCEPT_SEQ3.substring(1);
   		}   		
   		if(params.V_ACCEPT_SEQ4 != ''){
   			params.V_ACCEPT_SEQ4 = params.V_ACCEPT_SEQ4.substring(1);
   		}
   		if(params.V_ACCEPT_SEQ5 != ''){
   			params.V_ACCEPT_SEQ5 = params.V_ACCEPT_SEQ5.substring(1);
   		}
   		if(params.V_ACCEPT_SEQ6 != ''){
   			params.V_ACCEPT_SEQ6 = params.V_ACCEPT_SEQ6.substring(1);
   		}
   		if(params.V_ACCEPT_SEQ7 != ''){
   			params.V_ACCEPT_SEQ7 = params.V_ACCEPT_SEQ7.substring(1);
   		}
   		if(params.V_ACCEPT_SEQ8 != ''){
   			params.V_ACCEPT_SEQ8 = params.V_ACCEPT_SEQ8.substring(1);
   		}
   		if(params.V_ACCEPT_SEQ9 != ''){
   			params.V_ACCEPT_SEQ9 = params.V_ACCEPT_SEQ9.substring(1);
   		}
   		if(params.V_ACCEPT_SEQ10 != ''){
   			params.V_ACCEPT_SEQ10 = params.V_ACCEPT_SEQ10.substring(1);
   		}
   		
   		return params;
    },
})
