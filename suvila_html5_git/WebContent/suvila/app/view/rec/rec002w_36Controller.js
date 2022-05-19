var printDataFlag = false;
Ext.define('ExFrm.view.rec.rec002w_36Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_36',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null, me.dsTempleCallback);
    	},50);
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	
    	var st_day = 91;
		me.lookupReference('me_AcceptSDateBS').setExValue( exCommon.getMinusDay(st_day) );
		me.lookupReference('me_AcceptEDateBS').setExValue( today );
		
		fn_getBudNo(me, '' , "all");
    	
    },
    dsTempleCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_BSKindInfo', '', null, null);
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
    onPrintBS : function(){
    	var me = this;
    	
    	
    	var rd_BSGbn = me.lookupReference('rd_BSGbn').getValue().rd_BSGbn;
    	
    	var checkRecord = me.getViewModel().getStore('ds_BSRec').findRecord('CHECK_P', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	
    	var select_bs_type = me.lookupReference('select_bs_type').getExValue();
    	if(select_bs_type != rd_BSGbn){
			exCommon.msgAlert( '출력 유형이 동일하지 않습니다.' );
			return;
		}
    	
    	if(!printDataFlag){
    		exCommon.msgAlert('인쇄에 필요한 데이터를 조회중입니다.<br/> 잠시후 시도해주세요.');
    		return;
    	}
    	
    	
    	var ds_BSRec_sel = me.getViewModel().getStore('ds_BSRec_sel');
    	var g_row        = me.getViewModel().getStore('ds_BSRec').getCount();
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
		for(var i = 0; i < g_row ; i++){
			var g_record  = me.getViewModel().getStore('ds_BSRec').getAt(i);
			
			var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("ACCEPT_SEQ"), '')+'' + exCommon.getRepVal(g_record.get("SEQ"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			var findRecord = ds_BSRec_sel.findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var ROW        = ds_BSRec_sel.indexOf(findRecord);
    			
    			var jsonBaseData;
    	    	var jsonPrayData = [];
    			
    	    	
    	    	var BUD_CODE; 
    	    	var TELNO;
    	    	var ADDR_ALL;
    	    	var ZIP_CD;
    	    	
    	    	var flag = true;
    	    	
    			for(ROW; ROW< ds_BSRec_sel.getCount() ; ROW++){
    				var sel_record = ds_BSRec_sel.getAt(ROW);
    				
    				if(sel_record == null || sel_record == undefined){
    					break;
    				}
    					
    				
    			//	console.log(ROW , ' -->'+ sel_record);
    				
    				if(PAGE_SKIP != sel_record.get("PAGE_SKIP") ){
    					break;
    				}// if
    				
    				if(flag){
    					BUD_CODE = exCommon.getRepVal(sel_record.get("BUD_CODE"), '')
            	    	TELNO    = exCommon.getRepVal(sel_record.get("TELNO"), '')
            	    	ADDR_ALL = exCommon.getRepVal(sel_record.get("ADDR_ALL"), '')
            	    	ZIP_CD   = exCommon.getRepVal(sel_record.get("ZIP_CD"), '')
    				}
    				
    				
    				var subData;
    				if(rd_BSGbn == 0){
    					subData = {
		    				REPRESEN_REL    : exCommon.getRepVal(sel_record.get("REPRESEN_REL"), '')
		    			   ,SEXAGENARY_NM   : exCommon.getRepVal(sel_record.get("SEXAGENARY_NM"), '')
		    			   ,NAME_KOR        : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')
		    			   ,BIRTHDAY        : exCommon.getRepVal(sel_record.get("BIRTHDAY"), '')
		    			   ,AGE             : exCommon.getRepVal(sel_record.get("AGE"), '')    	    			   
	    	    		};
        			}else{
        				subData = {
        					HYO_REL      : exCommon.getRepVal(sel_record.get("HYO_REL"), '')
		    			   ,BOK_NAME_KOR : exCommon.getRepVal(sel_record.get("BOK_NAME_KOR"), '')
		    			   ,BOKWI_NM     : exCommon.getRepVal(sel_record.get("BOKWI_NM"), '')
		    			   ,DECE_REL     : exCommon.getRepVal(sel_record.get("DECE_REL"), '')
		    			   ,BON_NM       : exCommon.getRepVal(sel_record.get("BON_NM"), '')
		    			   ,NAME_KOR     : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')    	    			   
		    			   ,DEATH_KOR    : exCommon.getRepVal(sel_record.get("DEATH_KOR"), '')
	    	    		};
        			}
    	    		jsonPrayData.push(subData);
    	    		
    	    		flag = false;
    	    		
    			}// for ROW
    			
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
		}// for
		
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		var params = {
  			 FILE_PATH  : '/rec002w_06_rp_BS_CH_02Rec.ozr' 
  			,PRINT_DATA : jsonAllData
  		};
		if(rd_BSGbn == 0){
			// 축혼
			params.FILE_PATH = '/rec002w_06_rp_BS_CHRec.ozr';
		}
		
		setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    	
    },
    ondsGdSelCallback : function(me, success, form, action){
    	
    },
    onSelectBS : function(){
    	var me = this;
    	
    	var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateBS').getExValue();
    	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateBS').getExValue();
		
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
    	
    	var V_DEATH_GBN = 'F';
    	var storeNm     =  'ds_BSRec_CH1';
    	
    	var rd_BSGbn = me.lookupReference('rd_BSGbn').getValue().rd_BSGbn;
    	if(rd_BSGbn == '1'){
    		V_DEATH_GBN ="T";
    		storeNm     =  'ds_BSRec_CH3';
    	}
    	
    	var params = {
       		 V_PRAY_GBN        : exCommon.getRepVal(me.lookupReference('praygbn').getExValue(), '')
       		,V_PROPOSAL_BUD_NO : bud_no
       		,V_ACCEPT_SDATE    : V_ACCEPT_SDATE
       		,V_ACCEPT_EDATE    : V_ACCEPT_EDATE
       		,V_DEATH_GBN       : V_DEATH_GBN
       		,rd_BSGbn          : rd_BSGbn
       		,storeNm           : storeNm
       		,rd_BSGbn          : rd_BSGbn
       	};
    	
    	printDataFlag = false;
    	setTimeout(function(){
    		me.callStore(me, 'ds_BSRec', '', params, me.onSelectBSCallback);
    	},50);
    },
    onSelectBSCallback : function(me, success, form, action){
    	console.log('onSelectBSCallback = ', action._params.storeNm);
    	if(success){
    		setTimeout(function(){
        		
    			me.callStore(me, 'ds_BSRec_sel', '', action._params, me.dsBsRecSelCallback);
        	},50);
    		
    		me.lookupReference('select_bs_type').setExValue(action._params.rd_BSGbn);
    		
    	}
    },
    dsBsRecSelCallback : function(me, success, form, action){
    	printDataFlag = true;
    },
    onMouseRightClick_A:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec002w_06_b').getView().getSelectionModel().getSelection();
    	
    	
    	me.openPopup('ExFrm.view.rec.rec004w_06_mouse',  selectedRecord , me.onMouseRightReceive_A);
    },
    onMouseRightReceive_A : function(gbn, me){
    	var selectedRecord = me.lookupReference('rec002w_06_b').getView().getSelectionModel().getSelection();
    	for(var i = 0; i<selectedRecord.length ; i++){
    	
    		if(gbn == 'T'){
	    		selectedRecord[i].set("CHECK_P", true);
	    	}else{
	    		selectedRecord[i].set("CHECK_P", false);
	    	}
	    	
    	}
    },
})
