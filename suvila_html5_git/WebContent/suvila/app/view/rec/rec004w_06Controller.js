var printDataFlag = false;

Ext.define('ExFrm.view.rec.rec004w_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec004w_06',
    onSearch:function(params){
        var me = this;
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_approv', '', null ,me.dsapprovCallback);
    	},50);
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(90) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
		
		// 체크박스
		fn_getBudNo(me, '' , "all");
		
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
    		me.callStore(me, 'ds_chonhonKind', '', null ,null);
    	},50);
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
    onSelect : function(){
    	
    	var me = this;
    	
    	var params ="";
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	if(new Number(me_AcceptSDate) > new Number(me_AcceptEDate)){
    		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
    		me.lookupReference('me_AcceptSDateGD').focus();
    		return false;
    	}
    	
    	var rd_gidoGbn = me.lookupReference('rd_gidoGbn').getValue().rd_gidoGbn;
    	//console.log('rd_gidoGbn = ', rd_gidoGbn);
    	
    	var params = {    		 
    		 V_PROPOSAL_BUD_NO  : me.lookupReference('hid_bud_no').getExValue()
       		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
       		,V_SDATE 			: me_AcceptSDate
       		,V_EDATE 			: me_AcceptEDate
       		,V_EVENT_CD  	    : me.lookupReference('lc_KindInfo').getExValue()       		
       		,V_USER_ID    		: me.lookupReference('lc_templeUser').getExValue()
       		,V_CLOSE_YN     	: 'F'
       		,V_RD_GIDOGBN       : rd_gidoGbn
       	};
    	
    	printDataFlag = false;
    	
		setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},50);
    	    	
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		setTimeout(function(){
        		me.callStore(me, 'ds_print_org', '', action._params ,me.printOrgCallback);
        	},50);
    	}
    },
    printOrgCallback : function(me, success, form, action){
    	printDataFlag = true;
    	me.lookupReference('rec004w_06_a').getView().select(0);
    	if(success){
    		setTimeout(function(){
        		me.callStore(me, 'ds_pray', '', action._params ,null);
        	},50);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return;
    		
    		var params = {
    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
    			,V_SEQ        : record[0].get("SEQ")
    			,V_EVENT_CD   : record[0].get("EVENT_CD")
    			,V_EVENT_DATE : record[0].get("EVENT_DATE")
    			,V_WEPAECNT   : record[0].get("WEPAECNT")
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_sub', '', params ,me.dsSubCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    dsSubCallback : function(me, success, form, action){
    	me.lookupReference('rec004w_06_b').getView().select(0);
    },        
    onExcel : function(){
    	var me = this;
    	
    	var grid = me.lookupReference('rec004w_06_a');
    	exCommon.excelDown(grid, 'wepae', '위패/천혼문 접수내역',  me.getViewModel().getStore('ds_detail').getCount());    	
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
    onRightClick:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var dataIndex = eOpts.position.colIdx -1;
    	var selectionRecord = me.lookupReference('rec004w_06_a').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  null , me.onRightClickReceive);
        
    },
    onRightClickReceive : function(type, me){
    	
    	var selectionRecord = me.lookupReference('rec004w_06_a').getView().getSelectionModel().getSelection();
    	
    	for(var i = 0; i< selectionRecord.length ; i++){
    		var data = selectionRecord[i];
    		if(type == 'T'){
    			data.set("CHECK_P", true);
        	}else{
        		data.set("CHECK_P", false);
        	}
    	}// for i
    },
    onPrint : function(){
    	var me = this;
    	//gf_showProgressBar();

    	var checkRecord = me.getViewModel().getStore('ds_main').findRecord('CHECK_P', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	if(!printDataFlag){
    		exCommon.msgAlert('인쇄에 필요한 데이터를 조회중입니다.<br/> 잠시후 시도해주세요.');
    		return;
    	}
    	
    	var rd_gidoGbn =  me.lookupReference('rd_gidoGbn').getValue().rd_gidoGbn;
    	
    	if(rd_gidoGbn == 1){
    		me.onPrintChonhon(me);
    	}
    	else if(rd_gidoGbn == 2){
    		me.onPrintPray(me);
    	}
    	else if(rd_gidoGbn == 3){
    		me.onPrintChukwonChonhon(me);
    	}else{
    		me.onPrintWepaeBackjung(me);
    	}    	
    },
    onPrintWepaeBackjung : function( me ){
    	var g_row = me.getViewModel().getStore('ds_main').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var sel_row      =  me.getViewModel().getStore('ds_print_org').getCount();
    	
    	var WEPAE_INDEX = 1;  /*-- 위패 COUNT (MAX = 5)--*/
		var WEPAE_COUNT = 1;  /*-- 위패 번호 --*/
		var	WEPAE_CNT	= 1;  /*-- 위패 번호 출력용--*/
		var JOIN_SEQ	= 1;  /*-- 위패 동참자 SEQ --*/
    	
		var jsonPrintData   = [];
    	var jsonAllData     = {};
		
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			var findRecord  = me.getViewModel().getStore('ds_print_org').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			
    			if(findRecord != null &&   findRecord != undefined){
    				var print_index = me.getViewModel().getStore('ds_print_org').indexOf(findRecord);
    				var idx         = me.getViewModel().getStore('ds_print_org').getAt(print_index).get("WEPAE_CNT");
    				var Row         = print_index+idx;
    				for ( j=print_index; j<Row; j++ ) {
    					
    					var idx1         = WEPAE_INDEX * 21;
    					var seq_idx      = me.getViewModel().getStore('ds_print_org').getAt(j).get("WEPAE_SEQ_CNT"); //3
    					var seq_Row      = j+seq_idx; 
    					
    					for ( k=j; k < seq_Row; k++ ) {
    						var varchar1  = '';  var varchar2  = ''; var varchar3  = ''; var varchar4  = ''; var varchar5  = '';
            				var varchar6  = '';  var varchar7  = ''; var varchar8  = ''; var varchar9  = ''; var varchar10 = '';
            				var varchar11 = '';  var varchar12 = ''; var varchar13 = ''; var varchar14 = ''; var varchar15 = '';
            				var varchar16 = '';  var varchar17 = ''; var varchar18 = ''; var varchar19 = ''; var varchar20 = '';
            				var varchar21 = ''; 
    						
	    					varchar2  = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("HYO_REL"), '');
	    					varchar3  = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BOKWIJA_NM"), '');
	    					varchar4  = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BOKWI_HAN_NM"), '');
	    					varchar21 = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("EVENT_SEQ"), '');
	    					
	    					if(seq_idx == 1){
	    						varchar9   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar10  = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar11  = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar12  = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    						
	    					}else if(seq_idx == 2){
	    						varchar5   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar6   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar7   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar8   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    						k++;
								j++;
	    						varchar13   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar14   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar15   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar16   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    					}else if(seq_idx == 3){
	    						varchar5   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar6   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar7   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar8   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    						k++;
								j++;
	    						varchar9   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar10   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar11   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar12   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    						k++;
								j++;
	    						varchar13   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar14   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar15   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar16   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    					}else if(seq_idx >= 4){
	    						varchar5   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar6   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar7   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar8   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    						k++;
								j++;
	    						varchar9   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar10   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar11   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar12   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    						k++;
								j++;
	    						varchar13   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar14   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar15   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar16   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    						k++;
								j++;
	    						varchar17   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_REL"), '');
	    						varchar18   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("BON_SEX_NM"), '');
	    						varchar19   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
	    						varchar20   = exCommon.getRepVal(me.getViewModel().getStore('ds_print_org').getAt(j).get("DEATH_HAN"), '');
	    						if(seq_idx > 4){
									j++;
								}
	    						seq_idx -= 4;
	    					}
	    					
	    					var subData = {
	    						 varchar1  : varchar1  , varchar2  : varchar2  , varchar3  : varchar3 , varchar4  : varchar4 , varchar5  : varchar5
	    						,varchar6  : varchar6  , varchar7  : varchar7  , varchar8  : varchar8 , varchar9  : varchar9 , varchar10 : varchar10
	    						,varchar11 : varchar11 , varchar12 : varchar12 , varchar13 : varchar13, varchar14 : varchar14, varchar15 : varchar15
	    						,varchar16 : varchar16 , varchar17 : varchar17 , varchar18 : varchar18, varchar19 : varchar19, varchar20 : varchar20
	    						,varchar21 : varchar21 
	    					};
	    					jsonPrintData.push(subData);
	    					
    					}// for k
    					
    				}// for j 
    			}// findRecord if
    			
    		}// CHECK_P if 
    	}// for i
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	var params = {
 			 FILE_PATH  : '/rec004w_06_rp_wepae_backjung.ozr' 
 			,PRINT_DATA : jsonAllData
		};
   		
   		setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    	
    	
    },
    onPrintChukwonChonhon : function (me){
    	var g_row = me.getViewModel().getStore('ds_main').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var sel_row      =  me.getViewModel().getStore('ds_pray').getCount();
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			
    			var findRecord  = me.getViewModel().getStore('ds_pray').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var ROW 		= me.getViewModel().getStore('ds_pray').indexOf(findRecord);
    			
    			
    			var jsonBaseData;
    	    	var jsonPrayData = [];
    			
    	    	var ZIP_CD        = '';
    	    	var TELNO         = '';
				var BUD_CODE      = '';
				var ADDR_ALL      = '';
    	    	
				
				// 축원
    	    	var flag = true;
    	    	for(ROW ; ROW < sel_row ; ROW++){
    	    		var sel_record = me.getViewModel().getStore('ds_pray').getAt(ROW);
    	    		
    	    		
    	    		if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
    	    			break;
    	    		}
    	    		
    	    		var subData = {
	    				REPRESEN_REL    : exCommon.getRepVal(sel_record.get("REPRESEN_REL"), '')
	    			   ,SEXAGENARY_NM   : exCommon.getRepVal(sel_record.get("SEXAGENARY_NM"), '')
	    			   ,NAME_KOR        : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')
	    			   ,BIRTHDAY        : exCommon.getRepVal(sel_record.get("BIRTHDAY"), '')
	    			   ,AGE             : exCommon.getRepVal(sel_record.get("AGE"), '')
	    			   ,ORGINATE        : ''
    	    		};
    	    		jsonPrayData.push(subData);
    	    		
    	    		if(flag){
    	    			ZIP_CD        = exCommon.getRepVal(sel_record.get("ZIP_CD"), '');
    	    	    	TELNO         = exCommon.getRepVal(sel_record.get("TELNO"), '').replace('()-', '');
    					BUD_CODE      = exCommon.getRepVal(sel_record.get("BUD_CODE"), '');
    					ADDR_ALL      = exCommon.getRepVal(sel_record.get("ADDR_ALL"), '');
    					flag = false;
    	    		}
    			}// 축원 for
    	    	
    	    	// 천혼
    	    	findRecord  = me.getViewModel().getStore('ds_print_org').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var print_index = me.getViewModel().getStore('ds_print_org').indexOf(findRecord);
    	    	console.log('print_index = ', print_index);
    	    	var jsonChonData = [];
    			if(print_index >= 0){
    				
    				var idx          = exCommon.getRepVal(findRecord.get("WEPAE_CNT"), '');
    				var Row          = print_index+idx;
    				var A_HYO_REL    = '';
					var	A_BOKWIJA_NM = '';
					
					var T_BUD_CODE = '';
					var T_ADDR_ALL = '';
					var T_WISH     = '';
					
					var flag = true;
					for ( k=print_index; k<Row; k++ ) {
						var k_record      = me.getViewModel().getStore('ds_print_org').getAt(k);
						//console.log(k_record);
						
						var BUD_CODE      = exCommon.getRepVal(k_record.get("BUD_CODE"), '');
						var ADDR_ALL      = exCommon.getRepVal(k_record.get("ADDR_ALL"), '');
						var BOKWIJA_NM    = exCommon.getRepVal(k_record.get("BOKWIJA_NM"), '');
						var HYO_REL       = exCommon.getRepVal(k_record.get("HYO_REL"), '');
						var TEMPLE_NM     = exCommon.user.sect_nm + '  '+exCommon.user.templeNm;
						var DECE_REL      = exCommon.getRepVal(k_record.get("DECE_REL_MANG"), '');
						var BON_NM        = exCommon.getRepVal(k_record.get("BON_SEX_NM"), '');
						var NAME_KOR      = exCommon.getRepVal(k_record.get("NAME_KOR"), '');
						var DEATH_KOR     = exCommon.getRepVal(k_record.get("DEATH_KOR"), '');
						var DECE_BUD_NM   = exCommon.getRepVal(k_record.get("DECE_BUD_NM"), '');
						var PAGE_SKIP     = exCommon.getRepVal(k_record.get("PAGE_SKIP"), '');	
						var BOK_NAME_KOR  = '';
						var BOKWI_NM      = exCommon.getRepVal(k_record.get("BOKWI_NM"), '');
						
						if(flag){
							T_BUD_CODE = BUD_CODE;
							T_ADDR_ALL = ADDR_ALL;
						}
						
						
						if(HYO_REL == ''){
							HYO_REL = A_HYO_REL;
						}else{
							HYO_REL   = exCommon.getRepVal(k_record.get("HYO_REL"), '');
							A_HYO_REL = exCommon.getRepVal(k_record.get("HYO_REL"), '');
						}
						
						if(A_BOKWIJA_NM != BOKWIJA_NM){
							A_BOKWIJA_NM = exCommon.getRepVal(k_record.get("BOKWIJA_NM"), '');
						}else{
							BOKWIJA_NM   = '';
							HYO_REL      = '';
							HYO_REL      = '';
							BOKWI_NM     = '';
						}
						
						
						
						var data = {
							 BUD_CODE     : BUD_CODE
							,ADDR_ALL     : ADDR_ALL
						//	,BOKWIJA_NM   : BOKWIJA_NM
							,HYO_REL      : HYO_REL
							,TEMPLE_NM    : TEMPLE_NM
							,DECE_REL     : DECE_REL
							,BON_NM       : BON_NM
							,NAME_KOR     : DECE_BUD_NM
							,DEATH_KOR    : DEATH_KOR
							,PAGE_SKIP    : PAGE_SKIP
							,BOK_NAME_KOR : BOKWIJA_NM
							,BOKWI_NM     : BOKWI_NM
						}
						A_BOKWIJA_NM = exCommon.getRepVal(k_record.get("BOKWIJA_NM"), '');
						jsonChonData.push(data);
						
				//		console.log(jsonChonData);
						flag = false;
					}// for
    			}// print_index
    	    	
    	    	
    	    	jsonBaseData = {
    	    		 BUD_CODE : BUD_CODE
					,TELNO    : TELNO  
					,ADDR_ALL : ADDR_ALL
					,ZIP_CD   : ZIP_CD
					,PAGE_SKIP: PAGE_SKIP
					,WISH     : ''
					,prayList : jsonPrayData
					,chonList : jsonChonData
    	    	};    	    	
    	    	jsonPrintData.push(jsonBaseData);
    		} // CHECK_P
    	}// for
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	var params = {
 			 FILE_PATH  : '/rec004w_06_rp_chukwon_chonhon.ozr' 
 			,PRINT_DATA : jsonAllData
 		};
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    },
    onPrintPray : function(me){
    	var g_row = me.getViewModel().getStore('ds_main').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var sel_row      =  me.getViewModel().getStore('ds_pray').getCount();
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			
    			var findRecord  = me.getViewModel().getStore('ds_pray').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var ROW 		= me.getViewModel().getStore('ds_pray').indexOf(findRecord);
    			if(findRecord != null &&   findRecord != undefined){
	    			var jsonBaseData;
	    	    	var jsonPrayData = [];
	    			
	    	    	var ZIP_CD        = '';
	    	    	var TELNO         = '';
					var BUD_CODE      = '';
					var ADDR_ALL      = '';
	    	    	
	    	    	var flag = true;
	    	    	for(ROW ; ROW < sel_row ; ROW++){
	    	    		var sel_record = me.getViewModel().getStore('ds_pray').getAt(ROW);
	    	    		
	    	    		
	    	    		if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
	    	    			break;
	    	    		}
	    	    		
	    	    		var subData = {
		    				REPRESEN_REL    : exCommon.getRepVal(sel_record.get("REPRESEN_REL"), '')
		    			   ,SEXAGENARY_NM   : exCommon.getRepVal(sel_record.get("SEXAGENARY_NM"), '')
		    			   ,NAME_KOR        : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')
		    			   ,BIRTHDAY        : exCommon.getRepVal(sel_record.get("BIRTHDAY"), '')
		    			   ,AGE             : exCommon.getRepVal(sel_record.get("AGE"), '')
		    			   ,ORGINATE        : ''
	    	    		};
	    	    		jsonPrayData.push(subData);
	    	    		
	    	    		if(flag){
	    	    			ZIP_CD        = exCommon.getRepVal(sel_record.get("ZIP_CD"), '');
	    	    	    	TELNO         = exCommon.getRepVal(sel_record.get("TELNO"), '').replace('()-', '');
	    					BUD_CODE      = exCommon.getRepVal(sel_record.get("BUD_CODE"), '');
	    					ADDR_ALL      = exCommon.getRepVal(sel_record.get("ADDR_ALL"), '');
	    					flag = false;
	    	    		}
	    	    		
	    			}
	    	    	
	    	    	jsonBaseData = {
	    	    		 BUD_CODE : BUD_CODE
						,TELNO    : TELNO  
						,ADDR_ALL : ADDR_ALL
						,ZIP_CD   : ZIP_CD
						,WISH     : ''
						,prayList : jsonPrayData
	    	    	};    	    	
	    	    	jsonPrintData.push(jsonBaseData);
    			}// if(findRecord != null &&   findRecord != undefined){
    		} // CHECK_P
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
    onPrintChonhon : function(me){
    	
    	var g_row = me.getViewModel().getStore('ds_main').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	var jsonBaseData  = [];
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    		//	console.log(i , '--> '+ CHECK_P);
    			
    			var findRecord  = me.getViewModel().getStore('ds_print_org').findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var print_index = me.getViewModel().getStore('ds_print_org').indexOf(findRecord);
    			
    			
    			var jsonPrayData = [];
    			if(print_index >= 0){
    				
    				var idx          = exCommon.getRepVal(findRecord.get("WEPAE_CNT"), '');
    				var Row          = print_index+idx;
    				var A_HYO_REL    = '';
					var	A_BOKWIJA_NM = '';
					
					var T_BUD_CODE = '';
					var T_ADDR_ALL = '';
					var T_WISH     = '';
					
					var flag = true;
					for ( k=print_index; k<Row; k++ ) {
						var k_record      = me.getViewModel().getStore('ds_print_org').getAt(k);
						//console.log(k_record);
						
						var BUD_CODE      = exCommon.getRepVal(k_record.get("BUD_CODE"), '');
						var ADDR_ALL      = exCommon.getRepVal(k_record.get("ADDR_ALL"), '');
						var BOKWIJA_NM    = exCommon.getRepVal(k_record.get("BOKWIJA_NM"), '');
						var HYO_REL       = exCommon.getRepVal(k_record.get("HYO_REL"), '');
						var TEMPLE_NM     = exCommon.user.sect_nm + '  '+exCommon.user.templeNm;
						var DECE_REL      = exCommon.getRepVal(k_record.get("DECE_REL_MANG"), '');
						var BON_NM        = exCommon.getRepVal(k_record.get("BON_SEX_NM"), '');
						var NAME_KOR      = exCommon.getRepVal(k_record.get("NAME_KOR"), '');
						var DEATH_KOR     = exCommon.getRepVal(k_record.get("DEATH_KOR"), '');
						var DECE_BUD_NM   = exCommon.getRepVal(k_record.get("DECE_BUD_NM"), '');
						var PAGE_SKIP     = exCommon.getRepVal(k_record.get("PAGE_SKIP"), '');	
						var BOK_NAME_KOR  = '';
						var BOKWI_NM      = exCommon.getRepVal(k_record.get("BOKWI_NM"), '');
						
						if(flag){
							T_BUD_CODE = BUD_CODE;
							T_ADDR_ALL = ADDR_ALL;
						}
						
						
						if(HYO_REL == ''){
							HYO_REL = A_HYO_REL;
						}else{
							HYO_REL   = exCommon.getRepVal(k_record.get("HYO_REL"), '');
							A_HYO_REL = exCommon.getRepVal(k_record.get("HYO_REL"), '');
						}
						
						if(A_BOKWIJA_NM != BOKWIJA_NM){
							A_BOKWIJA_NM = exCommon.getRepVal(k_record.get("BOKWIJA_NM"), '');
						}else{
							BOKWIJA_NM   = '';
							HYO_REL      = '';
							HYO_REL      = '';
							BOKWI_NM     = '';
						}
						
						
						
						var data = {
							 BUD_CODE     : BUD_CODE
							,ADDR_ALL     : ADDR_ALL
							,HYO_REL      : HYO_REL
							,TEMPLE_NM    : TEMPLE_NM
							,DECE_REL     : DECE_REL
							,BON_NM       : BON_NM
							,NAME_KOR     : DECE_BUD_NM
							,DEATH_KOR    : DEATH_KOR
							,PAGE_SKIP    : PAGE_SKIP
							,BOK_NAME_KOR : BOKWIJA_NM
							,BOKWI_NM     : BOKWI_NM
						}
						A_BOKWIJA_NM = exCommon.getRepVal(k_record.get("BOKWIJA_NM"), '');
						
						
						jsonPrayData.push(data);
						flag = false;
					}// for
					
					jsonBaseData = {
	    	    		 BUD_CODE : T_BUD_CODE
						,ADDR_ALL : T_ADDR_ALL
						,WISH     : ''
						,prayList : jsonPrayData
	    	    	};
					
					jsonPrintData.push(jsonBaseData);
    			}// print_index
    		}// CHECK_P
    	}// for i
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	console.log( jsonAllData );
    	var params = {
   			 FILE_PATH  : '/rec001w_06_rp_ID_CH_02Rec.ozr' 
   			,PRINT_DATA : jsonAllData
   		};
         	
     	setTimeout(function(){
     		me.openPopup('ExFrm.view.com.print',  params, null);
       },100);
    	
    }
    
})
