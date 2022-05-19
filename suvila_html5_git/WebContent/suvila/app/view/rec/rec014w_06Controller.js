Ext.define('ExFrm.view.rec.rec014w_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec014w_06',
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
    	
    	me.lookupReference('me_AcceptSDate').setExValue( '20210101');
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
    		//me.getViewModel().getStore('ds_approv').getAt(0).set("CODE", "0");    	
    		//me.lookupReference('lc_approv').setExValue("0");
    	}
    },
    dstempleUserCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.dsclassMgtCallback);
    	},50);
    },
    dsclassMgtCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_jungak', '', null ,me.dsJungakCallback);
    	},50);
    },     
    dsJungakCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_death_gender', '', null ,null);
    	},50);
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
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
    onSelect : function(){
    	
    	var me = this;
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	var params = {
    		 V_SEARCH_BUD_NO    : me.lookupReference('hid_bud_no').getExValue()
       		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
       		,V_ACCEPT_SDATE 	: me_AcceptSDate
       		,V_ACCEPT_EDATE 	: me_AcceptEDate
       		,V_REC_USER_ID      : me.lookupReference('lc_templeUser').getExValue()
       		,V_PAY_STATE        : me.lookupReference('lc_payState').getExValue()
       		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
       		,V_AGREE_SHEET_YN	: me.lookupReference('cb_agree_sheet_yn').getExValue()
       		,V_FAMILY_SHEET_YN	: me.lookupReference('cb_family_sheet_yn').getExValue()
       		,V_HOJUK_SHEET_YN	: me.lookupReference('cb_hojuk_sheet_yn').getExValue()
       		,V_JUMIN_SHEET_YN	: me.lookupReference('cb_jumin_sheet_yn').getExValue()
       		,V_JEJUK_SHEET_YN	: me.lookupReference('cb_jejuk_sheet_yn').getExValue()
       		,V_JUNGAK_CD        : me.lookupReference('lc_jungak').getExValue()
       		,V_YOUNG_MEMO       : encodeURI(me.lookupReference('txt_young_memo').getExValue())
       		,V_CANCEL_YN        : me.lookupReference('cb_cancel_sheet_yn').getExValue()
       		,V_EXPORT_YN        : me.lookupReference('cb_export_sheet_yn').getExValue()
       		,V_CNTR_NMBR        : encodeURI(me.lookupReference('txt_cntr_nmbr_search').getExValue())
       	};
    	
		setTimeout(function(){
    		me.callStore(me, 'ds_detail', '', params ,me.onSelectCallback);
    	},50);
    		
    	    	
    },
    onSelectCallback : function(me, success, form, action){
    	console.log('onSelectCallback');
    	if(success){
    		me.lookupReference('rec014w_06_a').getView().select(0);    		
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		var selection = me.lookupReference('rec014w_06_a').getView().getSelectionModel().getSelection()[0];
    		var ACCEPT_SEQ = selection.get("ACCEPT_SEQ"); 
    		var SEQ        = selection.get("SEQ");
    		
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsYoungTopCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec014w_06_b').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	
    	var grid = me.lookupReference('rec014w_06_a');
    	exCommon.excelDown(grid, '영탐접수', '영탑접수 접수내역',  me.getViewModel().getStore('ds_detail').getCount());    	
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
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onRadioClick : function(field, newValue, oldValue, options){
    	var me = this;
    	
    	if( newValue.rd_YTGbn == '3' || newValue.rd_YTGbn == '4'){
    		me.lookupReference('rd_YTGbnSub').setHidden(false);
    		
    		console.log('1---->',me.lookupReference('rd_YTGbnSub').setValue());
    		me.lookupReference('rd_YTGbnSub').setValue({rd_YTGbnSub : 0}); 
    		console.log('2---->',me.lookupReference('rd_YTGbnSub').setValue());
    		
    	}else{
    		me.lookupReference('rd_YTGbnSub').setHidden(true);    		
    	}
    },
    onPrint : function(){
    	var me =this;
    	
    	if(me.getViewModel().getStore('ds_detail').getCount() <= 0){
    		exCommon.msgAlert('조회데이터가 없습니다.');
    		return;
    	}
    	
    	
    	var addedRow = 0;
    	console.log('sadalsjdlkasjdlkasjdlk');
    	var rd_YTGbn = (me.lookupReference('rd_YTGbn').getValue().rd_YTGbn);
    	    
    	    
    	var params = me.inParamInit();
    	
    	
    	if(rd_YTGbn == 2){
    		console.log('영탑천혼문');
    		params.V_PRINT_TYPE = 'CHONHON';
    	}
    	else if(rd_YTGbn == 3){
    		params.V_PRINT_TYPE = 'CHONHON_YOUNGGA';
    	}    	
    	else if(rd_YTGbn == 4){
    		params.V_PRINT_TYPE = 'DEUNG';
    	}
    	
    	/*
      	영탑대장 PAPER rp_youngtop_youngga_print
      	영탑천혼문 CHONHON
      	천혼문  CHONHON_YOUNGGA
      	영탑등 DEUNG
      	축원문 CHUKWON  
      */
    	
    	me.getViewModel().getStore('ds_youngtop_chuk_print').removeAll();
    	
    	if(rd_YTGbn == 1){
    		console.log('영탑대장');
    		
    		console.log('params = ', params);
    		
    		//rp_youngtop_youngga_print
    		setTimeout(function(){
        		me.callStore(me, 'ds_youngtop_chon_print', '', params ,me.dsYoungTopPrintCallback);
        	},50);
    		
    		
    	}else if(rd_YTGbn == 2 ){
    		var rd_YTGbnSub = me.lookupReference('rd_YTGbnSub').getValue().rd_YTGbnSub;
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_youngtop_chon_print', '', params ,me.dsChonHonYoungPrintCallback);
        	},50);
    	}else if(rd_YTGbn == 3 ){
    		var rd_YTGbnSub = me.lookupReference('rd_YTGbnSub').getValue().rd_YTGbnSub;
    		params.V_CHONHON_YOUNGGA_DETAIL = rd_YTGbnSub;
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_youngtop_chon_print', '', params ,me.dsChonHonYoungPrintCallback);
        	},50);
    	}else if(rd_YTGbn == 4 ){
    		var rd_YTGbnSub = me.lookupReference('rd_YTGbnSub').getValue().rd_YTGbnSub;
    		params.V_CHONHON_YOUNGGA_DETAIL = rd_YTGbnSub;
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_youngtop_chon_print', '', params ,me.dsDeungPrintCallback);
        	},50);
    		
    	}else if(rd_YTGbn == 5 ){
    		console.log('축원문');
    		
    		setTimeout(function(){
        		//me.callStore(me, 'ds_youngtop_chuk_print', '', params ,me.dsChukPrintCallback);
    			me.callStore(me, 'ds_youngtop_chon_print', '', params ,me.dsChonHonPrintCallback);
        	},50);
    	}else{
    		exCommon.msgAlert('인쇄 준비중입니다.');
    		return;
    	}
    	
    },
    inGetSetData : function (){
    	
    	var setData = {
	    	varchar1   : '' , varchar2  : '' , varchar3   : '' , varchar4   : '' , varchar5   : '' , varchar6   : '' , varchar7   : '' , varchar8   : '' , varchar9   : '' , varchar10  : '' ,
	    	varchar11  : '' , varchar12 : '' , varchar13  : '' , varchar14  : '' , varchar15  : '' , varchar16  : '' , varchar17  : '' , varchar18  : '' , varchar19  : '' , varchar20  : '' ,
	    	varchar21  : '' , varchar22 : '' , varchar23  : '' , varchar24  : '' , varchar25  : '' , varchar26  : '' , varchar27  : '' , varchar28  : '' , varchar29  : '' , varchar30  : '' ,
	    	varchar31  : '' , varchar32 : '' , varchar33  : '' , varchar34  : '' , varchar35  : '' , varchar36  : '' , varchar37  : '' , varchar38  : '' , varchar39  : '' , varchar40  : '' ,
	    	varchar41  : '' , varchar42 : '' , varchar43  : '' , varchar44  : '' , varchar45  : '' , varchar46  : '' , varchar47  : '' , varchar48  : '' , varchar49  : '' , varchar50  : '' ,
	    	varchar51  : '' , varchar52 : '' , varchar53  : '' , varchar54  : '' , varchar55  : '' , varchar56  : '' , varchar57  : '' , varchar58  : '' , varchar59  : '' , varchar60  : '' ,
	    	varchar61  : '' , varchar62 : '' , varchar63  : '' , varchar64  : '' , varchar65  : '' , varchar66  : '' , varchar67  : '' , varchar68  : '' , varchar69  : '' , varchar70  : '' ,
	    	varchar71  : '' , varchar72 : '' , varchar73  : '' , varchar74  : '' , varchar75  : '' , varchar76  : '' , varchar77  : '' , varchar78  : '' , varchar79  : '' , varchar80  : '' ,
	    	varchar81  : '' , varchar82 : '' , varchar83  : '' , varchar84  : '' , varchar85  : '' , varchar86  : '' , varchar87  : '' , varchar88  : '' , varchar89  : '' , varchar90  : '' ,
	    	varchar91  : '' , varchar92 : '' , varchar93  : '' , varchar94  : '' , varchar95  : '' , varchar96  : '' , varchar97  : '' , varchar98  : '' , varchar99  : '' , varchar100 : '' ,
	    	varchar101 : '' , varchar102: '' , varchar103 : '' , varchar104 : '' , varchar105 : '' , varchar106 : '' , varchar107 : '' , varchar108 : '' , varchar109 : '' , varchar110 : '' ,
	    	varchar111 : '' , varchar112: '' , varchar113 : '' , varchar114 : '' , varchar115 : '' , varchar116 : '' , varchar117 : '' , varchar118 : '' , varchar119 : '' , varchar120 : '' ,
	    	varchar121 : '' , varchar122: '' , varchar123 : '' , varchar124 : '' , varchar125 : '' , varchar126 : '' , varchar127 : '' , varchar128 : '' , varchar129 : '' , varchar130 : '' ,
	    	varchar131 : '' , varchar132: '' , varchar133 : '' , varchar134 : '' , varchar135 : '' , varchar136 : '' , varchar137 : '' , varchar138 : '' , varchar139 : '' , varchar140 : '' ,
	    	varchar141 : '' , varchar142: '' , varchar143 : '' , varchar144 : '' , varchar145 : '' , varchar146 : '' , varchar147 : '' , varchar148 : '' , varchar149 : '' , varchar150 : '' ,
	    	varchar151 : '' , varchar152: '' , varchar153 : '' , varchar154 : '' , varchar155 : '' , varchar156 : '' , varchar157 : '' , varchar158 : '' , varchar159 : '' , varchar160 : '' ,
	    	varchar161 : '' , varchar162: '' , varchar163 : '' , varchar164 : '' , varchar165 : '' , varchar166 : '' , varchar167 : '' , varchar168 : '' , varchar169 : '' , varchar170 : '' ,
	    	varchar171 : '' , varchar172: '' , varchar173 : '' , varchar174 : '' , varchar175 : '' , varchar176 : '' , varchar177 : '' , varchar178 : '' , varchar179 : '' , varchar180 : '' ,
	    	varchar181 : '' , varchar182: '' , varchar183 : '' , varchar184 : '' , varchar185 : '' , varchar186 : '' , varchar187 : '' , varchar188 : '' , varchar189 : '' , varchar190 : '' ,
	        varchar191 : '' , varchar192: '' , varchar193 : '' , varchar194 : '' , varchar195 : '' , varchar196 : '' , varchar197 : '' , varchar198 : '' , varchar199 : '' , varchar200 : '' ,
	    	varchar201 : 'default1' , varchar0 : 0
    	}
    	
    	return setData;
    	
    },
    dsDeungPrintCallback : function(me, success, form, action){
    	console.log('dsDeungPrintCallback');
    	
    	if(me.getViewModel().getStore('ds_youngtop_chon_print').getCount() <= 0){
    		exCommon.msgAlert('출력할 인쇄 정보가  없습니다.');
    		return;
    	}
    	
    	var ds_youngtop_chon_print    = me.getViewModel().getStore('ds_youngtop_chon_print');
    	var sel_row                   = ds_youngtop_chon_print.getCount();
    	
    	
    	me.getViewModel().getStore('ds_youngtop_chon_print_temp').removeAll();
    	me.getViewModel().getStore('ds_youngtop_print').removeAll();
    	
    	var g_row = me.getViewModel().getStore('ds_detail').getCount();
    	
    	for(var i = 0; i < g_row ; i++){    		
    		var g_record   = me.getViewModel().getStore('ds_detail').getAt(i);
    		var CHECKED    = exCommon.getRepVal(g_record.get("CHECKED"), '');
    		var PAGESKIP   = exCommon.getRepVal(g_record.get("ACCEPT_SEQ"), '')+''+ exCommon.getRepVal(g_record.get("SEQ"), '');
    		
    		
    		if(CHECKED  || CHECKED == true || CHECKED =='T'){
    			var findRecord = ds_youngtop_chon_print.findRecord('PAGESKIP', PAGESKIP, 0, false, true, true);
    			
    			var ROW    = ds_youngtop_chon_print.indexOf(findRecord);
    			
    			if(findRecord != null && findRecord != undefined ){
    			
	    			for(ROW ; ROW < sel_row ; ROW++){
	    				var sel_record = ds_youngtop_chon_print.getAt(ROW);
	    				
	    				if(PAGESKIP == exCommon.getRepVal(sel_record.get("PAGESKIP"), '') ){
	    					//console.log('1 -->', PAGESKIP);
	    					me.getViewModel().getStore('ds_youngtop_chon_print_temp').add(sel_record.data);
	    	    		}else{
	    	    			//console.log('2 -->', PAGESKIP);
	    	    			break;
	    	    		}
	    			}// for ROW
    			
    			}// if
    			
    		}// if CHECKED
    	}// for i
    	
      
    	var setData = me.inGetSetData();
    	/*
    	var setData = {
	    	varchar201 : 'default1' , varchar0 : 0
    	}
    	*/
    //	console.log('top setData = ', setData);
    	
        var FIX_COUNT      = 100;
  	  	var rowidx         = 1;
  	  	var PRINT_INDEX    = 0;  //PRINT_INDEX 0: 왼쪽 , 1: 오른쪽 
  	  	var PRE_ACCEPT_SEQ = 0;  //이전 가족번호 
  	  	var MAX_COL        = 0;
  	  	var ADDR_TRUE      = true;
  	  	
  	  	var dsRowPosition = 0;
  	  	
  	  	console.log(  me.getViewModel().getStore('ds_youngtop_chon_print_temp').getCount() );
  	    
  	  	for(var j = 0; j < me.getViewModel().getStore('ds_youngtop_chon_print_temp').getCount() ; j++){
  	  		var record     = me.getViewModel().getStore('ds_youngtop_chon_print_temp').getAt(j);
  	  		
  	  		
  	  		var ACCEPT_SEQ = record.get("ACCEPT_SEQ");
  	  		
  	  		
  	  		if(j == 0){
  	  			PRE_ACCEPT_SEQ = ACCEPT_SEQ;
  	  			PRINT_INDEX    = 0;
  	  			
  	  			setData = me.inGetSetData();
  	  			
  	  			me.getViewModel().getStore('ds_youngtop_print').insert(dsRowPosition, setData);
  	  			
  	  		}else{
  	  			
  	  			
	  	  		if(rowidx >= MAX_COL){  
		  	  		if(j != 0  && PRE_ACCEPT_SEQ != ACCEPT_SEQ ){
						 PRE_ACCEPT_SEQ = ACCEPT_SEQ;
						 ADDR_TRUE = true;
					 }// 
	  	  			
	  	  		
	  	  			rowidx = 1;
	  	  		
		  	  		if(PRINT_INDEX == 1){
		  	  			setData = me.inGetSetData();
		  	  			setData.varchar0 = dsRowPosition + 1;
		  	  			
		  	  			dsRowPosition = dsRowPosition + 1;
		  	  			me.getViewModel().getStore('ds_youngtop_print').insert(dsRowPosition, setData);
		  	  		}
	  	  			
		  	  		PRINT_INDEX = PRINT_INDEX == 0 ? 1:0;
		  	  		
		  	  		
	  	  		}else{	  	  			
		  	  		 if(j != 0 && PRE_ACCEPT_SEQ != ACCEPT_SEQ ){ 
			    		 PRE_ACCEPT_SEQ = ACCEPT_SEQ;
			    		 rowidx = 1;
			    		 
			    		 if(PRINT_INDEX == 1) {
			    			 
			    			 setData = me.inGetSetData();
			    			 setData.varchar0 = dsRowPosition + 1;
			    			 
			    			 dsRowPosition =  dsRowPosition + 1;
			    			 me.getViewModel().getStore('ds_youngtop_print').insert(dsRowPosition, setData);
			    			 
			    		 }
							 
			    		 PRINT_INDEX = PRINT_INDEX == 0 ? 1:0;
			    		 
			    		 ADDR_TRUE = true;
			    	 }
		  	  		 
	  	  		}// if rowidx >= MAX_COL
  	  		}// if j== 1
  	  		
  	  		var setRecord =  me.getViewModel().getStore('ds_youngtop_print').getAt(dsRowPosition);
  	  		
	  	  	if(rowidx == 1){
	  	  		
	  	  		MAX_COL = 28;
	  	  		if(ADDR_TRUE){
	  	  			setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + 96)  , gf_trim(exCommon.getRepVal(record.get("ADDR1") + ' ' + record.get("ADDR2")),"") );
	  	  			setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + 97)  , exCommon.getRepVal(record.get("HYO_REL"),""));
	  	  			setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + 98)  , exCommon.getRepVal(record.get("BUD_NM"),""));
	  	  			setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + 95)  , "복위");
	  	  			
	  	  			ADDR_TRUE = false;
	  	  		}// ADDR_TRUE
	  	  		
		  	  	setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + 99)  , exCommon.getRepVal(record.get("JUNGAK_NM"),"") + '-'+ exCommon.getRepVal(record.get("LIGHT_NO"),""));
		  		setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + 100)  , exCommon.getRepVal(record.get("BUD_NO"),"").substring(0,10));
	  	  	}
	  	  	
	  		setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + rowidx)  , exCommon.getRepVal(record.get("YOUNGGA_REL"),""));
	  		rowidx ++;
	  		setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + rowidx)  , exCommon.getRepVal(record.get("YOUNGGA_BON"),"") + ' ' + exCommon.getRepVal(record.get("YOUNGGA_GENDER_NM"),""));
	  		rowidx ++;
	  		setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + rowidx)  , exCommon.getRepVal(record.get("YOUNGGA_BUD_NM"),""));
	  		rowidx ++;
	  		setRecord.set("varchar"+((PRINT_INDEX * FIX_COUNT) + rowidx)  , exCommon.getRepVal(record.get("YOUNGGA_EQUAL_SPIRITUAL_NM"),""));
	  		rowidx ++;
	  		
  	  	}// for j
    
  	  	// 마지막 추가?
    
  	    var jsonAllData   = {};
	    var jsonPrintData = [];
  	  	
  	  	for(var i = 0; i< me.getViewModel().getStore('ds_youngtop_print').getCount() ; i++){
  	  		jsonPrintData.push( me.getViewModel().getStore('ds_youngtop_print').getAt(i).data )
  	  	}// for i
  	  	
  	  	  	      	  
  	  jsonAllData = {
      		"info" : jsonPrintData
      };
  	  	
  	  var params = {
      		 FILE_PATH  : '/rec014w_06_rp_youngtop_deung.ozr' 
    			,PRINT_DATA : jsonAllData
    		};
      	
      	setTimeout(function(){
      		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    dsYoungTopPrintCallback : function(me, success, form, action){
    	console.log('dsYoungTopPrintCallback');
    	if(me.getViewModel().getStore('ds_youngtop_chon_print').getCount() > 0){
    		
    		var g_row = me.getViewModel().getStore('ds_detail').getCount();
        	
        	
        	var ds_youngtop_chon_print    = me.getViewModel().getStore('ds_youngtop_chon_print');
        	var sel_row                   = ds_youngtop_chon_print.getCount();
        	
        	
        	var jsonAllData   = {};
        	var jsonPrintData = [];
        	
        	for(var i = 0; i < g_row ; i++){
        		var g_record   = me.getViewModel().getStore('ds_detail').getAt(i);
        		var CHECKED    = exCommon.getRepVal(g_record.get("CHECKED"), '');
        		var PAGESKIP = exCommon.getRepVal(g_record.get("ACCEPT_SEQ"), '')+''+ exCommon.getRepVal(g_record.get("SEQ"), '');
        		
        		if(CHECKED  || CHECKED == true || CHECKED =='T'){
        			var findRecord = ds_youngtop_chon_print.findRecord('PAGESKIP', PAGESKIP, 0, false, true, true);
        			if(findRecord == null || findRecord == undefined ){
        				break;
        			}
        			
        			var ROW    = ds_youngtop_chon_print.indexOf(findRecord);

        	    	var jsonBaseData;
        	    	var jsonPrayData  = [];
        	    	var jsonAmoutData = [];
        	    	/*
        	    	jsonBaseData.TOP_TOTAL_INFO = jsonBaseData.JUNGAK_NM +'-'+jsonBaseData.LIGHT_NO; 
        	    	jsonBaseData.ADDR           = jsonBaseData.ADDR1 +' '+jsonBaseData.ADDR2;
        	    	*/
        	    	var subCnt = 1;
        	    	for(ROW ; ROW < sel_row ; ROW++){
        	    		
        	    		var sel_record = ds_youngtop_chon_print.getAt(ROW);
        	    		
        	    		if(PAGESKIP != exCommon.getRepVal(sel_record.get("PAGESKIP"), '') ){
        	    			subCnt = 1;
        	    			break;
        	    		}
        	    		//jsonPrayData.push(sel_record.data);
        	    		// YOUNGGA_BON&&YOUNGGA_GENDER_NM
        	    		
        	    		var BONGTOP_DT = exCommon.getRepVal(sel_record.get("BONGTOP_DT"), '');
        	    		try{
        	    			BONGTOP_DT = BONGTOP_DT.substr(0,4)+'-'+BONGTOP_DT.substr(4,2)+'-'+BONGTOP_DT.substr(6,2);
        	    		}catch (e) {}
        	    		
        	    		
        	    		if(subCnt == 1){
        	    			jsonBaseData = {
        	    				 TOP_TOTAL_INFO : exCommon.getRepVal(sel_record.get("JUNGAK_NM"), '')+'-' + exCommon.getRepVal(sel_record.get("LIGHT_NO"), '')
        	    				,BUD_NM         : exCommon.getRepVal(sel_record.get("BUD_NM"), '')  
        	    				,HYO_BON_NAME   : exCommon.getRepVal(sel_record.get("HYO_BON_NAME"), '')
        	    				,SEX_GBN_NM         : exCommon.getRepVal(sel_record.get("SEX_GBN_NM"), '')
        	    				,PAYMENT_PLAN_AMT         : exCommon.getRepVal(sel_record.get("PAYMENT_PLAN_AMT"), '')
        	    				,PAYMENT_AMT_RESULT         : exCommon.getRepVal(sel_record.get("PAYMENT_AMT_RESULT"), '')
        	    				,MISU_AMT_RESULT         : exCommon.getRepVal(sel_record.get("MISU_AMT_RESULT"), '')
        	    				,AGREE_SHEET_YN_NM         : exCommon.getRepVal(sel_record.get("AGREE_SHEET_YN_NM"), '')
        	    				,FAMILY_SHEET_YN_NM         : exCommon.getRepVal(sel_record.get("FAMILY_SHEET_YN_NM"), '')
        	    				,HOJUK_SHEET_YN_NM         : exCommon.getRepVal(sel_record.get("HOJUK_SHEET_YN_NM"), '')
        	    				,JUMIN_SHEET_YN_NM         : exCommon.getRepVal(sel_record.get("JUMIN_SHEET_YN_NM"), '')
        	    				,JEJUK_SHEET_YN_NM         : exCommon.getRepVal(sel_record.get("JEJUK_SHEET_YN_NM"), '')
        	    				,ADDR         : exCommon.getRepVal(sel_record.get("ADDR1"), '')+'' + exCommon.getRepVal(sel_record.get("ADDR2"), '')
        	    				,ZIP_CD         : exCommon.getRepVal(sel_record.get("ZIP_CD"), '')
        	    				,TEL_NO         : exCommon.getRepVal(sel_record.get("TEL_NO"), '')
        	    				,MOBILE_TELNO         : exCommon.getRepVal(sel_record.get("MOBILE_TELNO"), '')
        	    				,TOP_MNG_NM         : exCommon.getRepVal(sel_record.get("TOP_MNG_NM"), '')
        	    				,ACCEPT_DT         : exCommon.getRepVal(sel_record.get("ACCEPT_DT"), '')
        	    				,BULSA_DT         : exCommon.getRepVal(sel_record.get("BULSA_DT"), '')
        	    				,BONGAN_DT         : exCommon.getRepVal(sel_record.get("BONGAN_DT"), '')
        	    				,REBONG_DT         : exCommon.getRepVal(sel_record.get("REBONG_DT"), '')
        	    				,YOUNGTOP_MEMO         : exCommon.getRepVal(sel_record.get("YOUNGTOP_MEMO"), '')
        	    			};
        	    		}
        	    		
        	    		var BONGTOP_SEQ =   exCommon.getRepVal(sel_record.get("BONGTOP_SEQ"), '');  
        	    		var subData = {
        	    			 BONGTOP_SEQ                : BONGTOP_SEQ 
           					,YOUNGGA_REL                : '망'+exCommon.getRepVal(sel_record.get("YOUNGGA_REL"), '')
           					,BON_SGBN                   : exCommon.getRepVal(sel_record.get("YOUNGGA_BON"), '') + exCommon.getRepVal(sel_record.get("YOUNGGA_GENDER_NM"), '')
           					,YOUNGGA_BUD_NM             : exCommon.getRepVal(sel_record.get("YOUNGGA_BUD_NM"), '')
           					,YOUNGGA_EQUAL_SPIRITUAL_NM : exCommon.getRepVal(sel_record.get("YOUNGGA_EQUAL_SPIRITUAL_NM"), '') 		
           					,BONGTOP_DT                 : BONGTOP_DT
           					,BONGTOP_GBN                : exCommon.getRepVal(sel_record.get("BONGTOP_GBN"), '')
    	    	    	};
        	    		
        	    		
        	    		var AMOUNT = exCommon.getRepVal(sel_record.get("AMOUNT"), '')
        	    		if(AMOUNT > 0){
        	    			var amountData = {
        	    				AMOUNT : AMOUNT
        	    			}
        	    			jsonAmoutData.push(amountData);
        	    		}
        	    		
        	    		if(BONGTOP_SEQ != 9999){
        	    			jsonPrayData.push(subData);
        	    		}
        	    		
        	    		
        	    		
        	    		subCnt++;
        	    	}// for ROW
        	    	
        	    	jsonBaseData.prayList   = jsonPrayData;
        	    	
        	    	
        	    	if(jsonAmoutData.length == 0){
        	    		var amountData = {
    	    				AMOUNT : 0
    	    			}
    	    			jsonAmoutData.push(amountData);
        	    	}
        	    	
        	    	
        	    	jsonBaseData.amountList = jsonAmoutData;
        	    	
        	    	jsonPrintData.push(jsonBaseData);
        		}// if CHECKED
        	}// for i
        	
        	jsonAllData = {
        		"info" : jsonPrintData
        	};
        	
        	console.log( '<-------------------------------->' );
        	console.log( Ext.encode(jsonAllData) );
        	console.log( '<-------------------------------->' );
        	
        	var params = {
           		 FILE_PATH  : '/rp_youngtop_youngga_print.ozr' 
         			,PRINT_DATA : jsonAllData
         		};
           	
           //	params.FILE_PATH = '';
           	
           	setTimeout(function(){
           		me.openPopup('ExFrm.view.com.print',  params, null);
             },100);
    	}
    	else{
    		exCommon.msgAlert('출력할 인쇄 정보가  없습니다.');
    		return;
    	}
    },
    dsChonHonYoungPrintCallback : function(me, success, form, action){
    	if(me.getViewModel().getStore('ds_youngtop_chon_print').getCount() > 0){
    		var g_row = me.getViewModel().getStore('ds_detail').getCount();
        	
        	var ds_youngtop_chon_print    = me.getViewModel().getStore('ds_youngtop_chon_print');
        	var sel_row                   = ds_youngtop_chon_print.getCount();
        	
        	
        	var jsonAllData   = {};
        	var jsonPrintData = [];
        	
        	
        	
        	for(var i = 0; i < g_row ; i++){
        		var g_record  = me.getViewModel().getStore('ds_detail').getAt(i);
        		
        		var CHECKED    = exCommon.getRepVal(g_record.get("CHECKED"), '');
        		var ACCEPT_SEQ = exCommon.getRepVal(g_record.get("ACCEPT_SEQ"), '');
        		var SEQ         = exCommon.getRepVal(g_record.get("SEQ"), '');
        		
        		var PAGESKIP = ACCEPT_SEQ+ ''+SEQ;
        		
        		console.log('PAGESKIP = ', PAGESKIP);
        		
        		if(CHECKED  || CHECKED == true || CHECKED =='T'){
        			var findRecord = ds_youngtop_chon_print.findRecord('PAGESKIP',PAGESKIP+'', 0, false, true, true);
        			
        			
        			if(findRecord != null && findRecord != undefined ){
        			
	        			var ROW        = ds_youngtop_chon_print.indexOf(findRecord);
	
	        	    	var jsonBaseData;
	        	    	var jsonPrayData = [];
	        	    	
	        	    	var ZIP_CD        = exCommon.getRepVal(findRecord.get("ZIP_CD"), '');
	        	    	var TELNO         = exCommon.getRepVal(findRecord.get("MOBILE_TELNO"), '');
	    					TELNO         = TELNO.replace('()-', '');  
	    				var BUD_CODE      = exCommon.getRepVal(findRecord.get("BUD_CODE"), '');
	    				var ADDR_ALL      = exCommon.getRepVal(findRecord.get("ADDR1"), '') + ' '+exCommon.getRepVal(findRecord.get("ADDR2"), '');
	        	    	
	    				var varchar1 = '';
	    				var varchar2 = '';
	    				
	    				var BONGTOP_COUNT = 0;
	    				var roop_cnt = 1;
	    				
	    				
	        	    	for(ROW ; ROW < sel_row ; ROW++){
	        	    		
	        	    		var sel_record = ds_youngtop_chon_print.getAt(ROW);
	        	    		try{
	        	    			if(ACCEPT_SEQ != exCommon.getRepVal(sel_record.get("ACCEPT_SEQ"), '') ){
	            	    			break;
	            	    		}
	        	    			
	        	    			if(BONGTOP_COUNT>= sel_record.get("BONGTOP_COUNT") ){
	            	    			BONGTOP_COUNT = 0;
	            	    			break;
	            	    		}else{
	            	    			BONGTOP_COUNT++;
	            	    		}
	        	    			
	        	    		}catch (e) {
								console.log(e);
								break;
							}
	        	    		
	        	    		 
	        	    		if(exCommon.getRepVal(sel_record.get("ACENST_YN"), '') == 'T'){
	        	    			if(exCommon.getRepVal(sel_record.get("HYO_BON"), '')  !=""){
	        	    				varchar1 = "망 "+exCommon.getRepVal(sel_record.get("HYO_FULL_NAME"),'');
	        	    			}
	        	    			varchar1 += " 인연일체 조상영가";
	        	    		}
	        	    		
	        	    	
	        	    		if(exCommon.getRepVal(sel_record.get("NAMELESS_YN"), '') == 'T'){
	        	    			varchar2 = ' 망 일체무명영가';
	        	    		}
	        	    		
	        	    		var YOUNGGA_REL = exCommon.getRepVal(sel_record.get("YOUNGGA_REL"), '');
	        	    		if(YOUNGGA_REL != ''){
	        	    			YOUNGGA_REL = ''+YOUNGGA_REL;
	        	    		}
	        	    		
	        	    		var subData = {
	        					 MANG          : exCommon.getRepVal(sel_record.get("YOUNGGA_SPIRITUAL"), '') =="2" ? "" : "망" 
	        					,DECE_REL      : exCommon.getRepVal(sel_record.get("YOUNGGA_REL"), '')
	        					,BON_SGBN      : exCommon.getRepVal(sel_record.get("YOUNGGA_BON"), '') + exCommon.getRepVal(sel_record.get("YOUNGGA_GENDER_NM"), '')
	        					,NAME_KOR      : exCommon.getRepVal(sel_record.get("YOUNGGA_BUD_NM"), '')
	        					,SPIRITUAL_GBN : exCommon.getRepVal(sel_record.get("YOUNGGA_EQUAL_SPIRITUAL_NM"), '') 		
	 	    	    		};
	        	    		jsonPrayData.push(subData);
	        	    		
	        	    		roop_cnt++;
	        	    		if(roop_cnt > 13){
	        	    			jsonBaseData = {
	    	        	    		 BUD_CODE          : BUD_CODE
	    	    					,ADDR_ALL          : ADDR_ALL
	    	    					,BOKWI_NAME_KOR    : exCommon.getRepVal(findRecord.get("HYO_REL"), '')+' ' + exCommon.getRepVal(findRecord.get("BUD_NM"), '')
	    	    					,BOKWI_KIBU_GBN_NM : '복위'
	    	    					,TOP_NO            : exCommon.getRepVal(findRecord.get("JUNGAK_NM"), '') + '-' + exCommon.getRepVal(findRecord.get("LIGHT_NO"), '')
	    	    					,prayList          : jsonPrayData
	    	    					,varchar1          : varchar1
	    	    					,varchar2          : varchar2    					
	    	        	    	};    	    	
	    	        	    	jsonPrintData.push(jsonBaseData);
	    	        	    	jsonPrayData = [];  
	    	        	    	roop_cnt = 1;
	        	    		}
	        	    		
	        	    		
	        	    	}// for ROW
	        	    	
	        	    	
	        	    	jsonBaseData = {
	        	    		 BUD_CODE          : BUD_CODE
	    					,ADDR_ALL          : ADDR_ALL
	    					,BOKWI_NAME_KOR    : exCommon.getRepVal(findRecord.get("HYO_REL"), '')+' ' + exCommon.getRepVal(findRecord.get("BUD_NM"), '')
	    					,BOKWI_KIBU_GBN_NM : '복위'
	    					,TOP_NO            : exCommon.getRepVal(findRecord.get("JUNGAK_NM"), '') + '-' + exCommon.getRepVal(findRecord.get("LIGHT_NO"), '')
	    					,prayList          : jsonPrayData
	    					,varchar1          : varchar1
	    					,varchar2          : varchar2    					
	        	    	};    	    	
	        	    	jsonPrintData.push(jsonBaseData);
        			}
        		}
        	}// for
        	
        	jsonAllData = {
        		"info" : jsonPrintData
        	};
        	
        	console.log( '<-------------------------------->' );
        	console.log( Ext.encode(jsonAllData) );
        	console.log( '<-------------------------------->' );
        	
        	var params = {
        		 FILE_PATH  : '/rec014w_06_youngtop_chon.ozr' 
      			,PRINT_DATA : jsonAllData
      		};
        	
        //	params.FILE_PATH = '';
        	
        	setTimeout(function(){
        		me.openPopup('ExFrm.view.com.print',  params, null);
           	},100);
    	}
    	else{
    		exCommon.msgAlert('출력할 천혼문 영가 정보가  없습니다.');
    		return;
    	}
    },
    dsChukPrintCallback : function(me, success, form, action){
    	
    	if(me.getViewModel().getStore('ds_youngtop_chuk_print').getCount() > 0){
    		var g_row = me.getViewModel().getStore('ds_detail').getCount();
        	
        	//console.log('g_row', g_row);
        	
        	var ds_youngtop_chuk_print    = me.getViewModel().getStore('ds_youngtop_chuk_print');
        	var sel_row                   = ds_youngtop_chuk_print.getCount();
        	
        	var jsonAllData   = {};
        	var jsonPrintData = [];
        	
        	for(var i = 0; i < g_row ; i++){
        		var g_record  = me.getViewModel().getStore('ds_detail').getAt(i);
        		
        		var CHECKED    = exCommon.getRepVal(g_record.get("CHECKED"), '');
        		var ACCEPT_SEQ = exCommon.getRepVal(g_record.get("ACCEPT_SEQ"), '');
        		
        		if(CHECKED  || CHECKED == true || CHECKED =='T'){
        			var findRecord = ds_youngtop_chuk_print.findRecord('ACCEPT_SEQ', ACCEPT_SEQ, 0, false, true, true);
        			var ROW        = ds_youngtop_chuk_print.indexOf(findRecord);

        	    	var jsonBaseData;
        	    	var jsonPrayData = [];
        	    	
        	    	for(ROW ; ROW < sel_row ; ROW++){
        	    		
        	    		var sel_record = ds_youngtop_chuk_print.getAt(ROW);
        	    		
        	    		if(ACCEPT_SEQ != exCommon.getRepVal(sel_record.get("ACCEPT_SEQ"), '') ){
        	    			break;
        	    		}
        	    		
        	    		var BIRTHDAY = exCommon.getRepVal(sel_record.get("BIRTHDAY"), '');
        	    		
        	    		if(BIRTHDAY.length  == 8){
        	    			BIRTHDAY = BIRTHDAY.substr(0,4)+ '年 '+BIRTHDAY.substr(4,2)+'月 '+ BIRTHDAY.substr(6,2)+'日生';
        	    		}
        	    		
        	    		var subData = {
    	    				REPRESEN_REL    : exCommon.getRepVal(sel_record.get("REPRESEN_REL"), '')
    	    			   ,SEXAGENARY_NM   : exCommon.getRepVal(sel_record.get("SEXAGENARY_NM"), '')
    	    			   ,NAME_KOR        : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')
    	    			   ,BIRTHDAY        : BIRTHDAY
    	    			   ,AGE             : exCommon.getRepVal(sel_record.get("AGE"), '')
    	    			   ,ORGINATE        : exCommon.getRepVal(sel_record.get("ORGINATE"), '')    	    			   
        	    		};
        	    		jsonPrayData.push(subData);
        	    		
        	    	}// for ROW
        	    	
        	    	var ZIP_CD        = exCommon.getRepVal(findRecord.get("ZIP_CD"), '');
        	    	var TELNO         = exCommon.getRepVal(findRecord.get("MOBILE_TELNO"), '');
    					TELNO         = TELNO.replace('()-', '');  
    				var BUD_CODE      = exCommon.getRepVal(findRecord.get("BUD_CODE"), '');
    				var ADDR_ALL      = exCommon.getRepVal(findRecord.get("ADDR1"), '') + ' '+exCommon.getRepVal(findRecord.get("ADDR2"), '');
        	    	
        	    	jsonBaseData = {
        	    		 BUD_CODE : BUD_CODE
    					,TELNO    : TELNO  
    					,ADDR_ALL : ADDR_ALL
    					,ZIP_CD   : ZIP_CD
    					,WISH     : ''
    					,TODAY    : exCommon.setDateFormat( exCommon.getNowDate() )
    					,prayList : jsonPrayData
        	    	};    	    	
        	    	jsonPrintData.push(jsonBaseData);
        		}
        	}// for
        	
      
        	jsonAllData = {
        		"info" : jsonPrintData
        	};
        	
        	// 가족 rec002w_06_rp_GDRec
        	/*
        	var params = {
      			 FILE_PATH  : '/rec002w_06_rp_GDRec.ozr' 
      			,PRINT_DATA : jsonAllData
      		};
        	*/
        	var params = {
     			 FILE_PATH  : '/rec002w_06_rp_GDRec_000031.ozr' 
     			,PRINT_DATA : jsonAllData
     		};
        	setTimeout(function(){
        		me.openPopup('ExFrm.view.com.print',  params, null);
           	},100);
        	
    	}else{
    		exCommon.msgAlert('인쇄 출력건이 없습니다.');
    	}
    	
    	console.log('dsChukPrintCallback -->', me.getViewModel().getStore('ds_youngtop_chuk_print').getCount());
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
   		var row = me.getViewModel().getStore('ds_detail').getCount();
   		
    	
    	var addedRow = 0;
   		for(var i = 0; i < row ; i++){
   			var record      = me.getViewModel().getStore('ds_detail').getAt(i);
   			var ACCEPT_SEQ  = record.get("ACCEPT_SEQ");
   			var CHECKED     = record.get("CHECKED");
   			
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
    onMouseRightClick_A:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec014w_06_a').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  selectedRecord , me.onMouseRightReceive_A);
    },
    onMouseRightReceive_A : function(gbn, me){
    	var selectedRecord = me.lookupReference('rec014w_06_a').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
    		if(gbn == 'T'){
	    		selectedRecord[i].set("CHECKED", true);
	    	}else{
	    		selectedRecord[i].set("CHECKED", false);
	    	}
	    	
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
})
