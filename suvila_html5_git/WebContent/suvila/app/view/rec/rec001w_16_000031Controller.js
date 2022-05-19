var printDataFlag = false;

var dataType_31 = 'y';

Ext.define('ExFrm.view.rec.rec001w_16_000031Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec001w_16_000031',
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
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	
    	var st_day = 365;
    	
		
    	
    	me.lookupReference('me_AcceptSDateYD').setExValue( exCommon.getMinusDay(st_day *5) );
		me.lookupReference('me_AcceptEDateYD').setExValue( today );
		
		
		// 체크박스
		fn_getBudNo(me, '' , "all");
		
		
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
    	var me   = this;
    	var type = newValue.rdo_ApprovalGbn;
    	
    	try{
    		me.lookupReference('rd_YDGbn').setValue({rd_YDGbn : 0});
    		
    		if(type == 2 ){
    			me.lookupReference('rd_YDGbn4').setHidden(false);
    		}else{
    			me.lookupReference('rd_YDGbn4').setHidden(true);
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
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn').getValue().rdo_ApprovalGbn;
    	
    	
    	var famgbn     = "";
		var deathgbn   = "";
		var YEONDEUNG  = "";
		
		if(rdo_ApprovalGbn == 1){
			deathgbn  = "F";
			YEONDEUNG = "YEONDEUNG_FAM";
			
			dataType_31 = 'y';
		}
		else if(rdo_ApprovalGbn == 2){
			deathgbn  = "T";
			YEONDEUNG = "DEATH_FAM";
			
			dataType_31 = 'd';
		}
		
		var params = {
    		 V_PROPOSAL_BUD_NO : bud_no    		
    		,V_DEATH_GBN       : deathgbn
    		,V_ACCEPT_SDATE    : V_ACCEPT_SDATE
    		,V_ACCEPT_EDATE    : V_ACCEPT_EDATE  		
    		,V_JUNGAK_CD       : exCommon.getRepVal(me.lookupReference('lc_YDJungakInfo').getExValue(), '')
    		,V_CODE       	   : exCommon.getRepVal(me.lookupReference('lc_YDKindInfo').getExValue(), '')
    		,VV_USER_ID        : exCommon.getRepVal(me.lookupReference('lc_templeUserYD').getExValue(), '')
    		,V_CLOSE_YN        : exCommon.getRepVal(me.lookupReference('lc_YDCloseYn').getExValue(), '')
    		,V_SORT_SEQ        : exCommon.getRepVal(me.lookupReference('lc_PrintSort').getExValue(), '')
    		,rdo_ApprovalGbn   : rdo_ApprovalGbn
    	};
    	
		
		var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn').getValue().rdo_ApprovalGbn;
		
		console.log('rdo_ApprovalGbn =', rdo_ApprovalGbn);
		printDataFlag = false;
		
		console.log('printDataFlag =', printDataFlag);
		
		setTimeout(function(){
    		me.callStore(me, 'ds_YDRec_grd', '', params, me.onSelectYdCHCallback);
    	},50);
    },
    onSelectYdCHCallback : function(me, success, form, action){
    	console.log('onSelectID_CHCallback = ', action._params.V_DEATH_GBN);
    	
    	if( success ){
    		me.lookupReference('select_yd_type').setExValue( action._params.rd_YDGbn);
    		
    		me.lookupReference('rec001w_16_c').getView().select(0);
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_YDRec_sel', '', action._params, me.dsYdRecSelCallback);
        	},50);
    	}
    },
    dsYdRecSelCallback : function(me, success, form, action){
    	
    	printDataFlag = true;
    	
    },
    onPrintYD : function(){
    	var me = this;
    	
    	
    	
    	if(!printDataFlag){
    		exCommon.msgAlert('인쇄에 필요한 데이터를 조회중입니다.<br/> 잠시후 시도해주세요.');
    		return;
    	}
    	
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn').getValue().rdo_ApprovalGbn; // 1
    	
    	console.log(dataType_31 , rdo_ApprovalGbn);
    	
    	if(dataType_31 == 'y' && rdo_ApprovalGbn != 1){
    		exCommon.msgAlert('영가데이터 조회후 출력 가능합니다.');
    		return;
    	}
    	else if(dataType_31 == 'd' && rdo_ApprovalGbn != 2){
    		exCommon.msgAlert('생축데이터 조회후 출력 가능합니다.');
    		return;
    	}
    	
    	var checkRecord = me.getViewModel().getStore('ds_YDRec_grd').findRecord('CHECK_P', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	var rd_YDGbn        = me.lookupReference('rd_YDGbn').getValue().rd_YDGbn; // 2
    	var select_yd_type  = me.lookupReference('select_yd_type').getExValue();
    
    	if(rdo_ApprovalGbn == 1){
    		
    		if(rd_YDGbn == 0){
    			me.printCH_00(me);
    		}
    		else if(rd_YDGbn == 1){
    			me.printCH_01(me);
    		}
    	}
    	else if(rdo_ApprovalGbn == 2){
    		
    		if(rd_YDGbn == 0){
    		}
    		else if(rd_YDGbn == 1){
    			me.printYoung_01(me);
    		}else if(rd_YDGbn == 3){
    			me.printYoung_02(me);
    		}
    		return;
    		
    	}
    },
    printYoung_02 : function(me){
    	var ds_YDRec_sel    = me.getViewModel().getStore('ds_YDRec_sel');
		var g_row = me.getViewModel().getStore('ds_YDRec_grd').getCount();
		
		var idx1          = 25;
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	
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
								//varchar99 = exCommon.getRepVal(me.getViewModel().getStore('ds_YDRec_sel').getAt(j).get("TEMPLE_NM"), '');
								varchar99 = '';
											
											
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
	    			}// 
		    			
	    		}// if CHECK_P
    		}// 
    		
			
		}// for i
		
		
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		
		
		var params = {
  			 FILE_PATH  : '/rec001w_06_rp_YDRec_03.ozr' 
  			,PRINT_DATA : jsonAllData
  		};
    	
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    },
    printYoung_01 : function(me){
    	var ds_YDRec_sel    = me.getViewModel().getStore('ds_YDRec_sel');
		var g_row           = me.getViewModel().getStore('ds_YDRec_grd').getCount();
		var sel_row         = ds_YDRec_sel.getCount();
		var TOP_DATA        = [];
		
		for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_YDRec_grd').getAt(i);
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		var findRecord= ds_YDRec_sel.findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    		
    		if( (CHECK_P  || CHECK_P == true || CHECK_P =='T') && (findRecord != null && findRecord != undefined) ){
    			
    			var ROW           = ds_YDRec_sel.indexOf(findRecord);
    			var CNT           = findRecord.get("CNT");
				var idx           = (ROW+CNT);
				var jsonYoung     = []
				var jsonBasicData = {};
				
				var subROw = 0;
				
				for(var j = ROW; j <idx ; j++){
					var sel_record = ds_YDRec_sel.getAt(j);
    				
    				if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
    	    			break;
    	    		}
    				
    				if(subROw == 0){
    					jsonBasicData = {    	   			  				 
   			  				 BUD_CODE       : exCommon.getRepVal(sel_record.get("SPIRITUAL_GBN"), '').substring(0,10)
								,ADDR           : exCommon.getRepVal(sel_record.get("ADDR1"), '') + ' '+ exCommon.getRepVal(sel_record.get("ADDR2"), '')
								,HYO_REL        : exCommon.getRepVal(sel_record.get("HYO_REL"), '')
								,BOKWI_NAME_KOR : exCommon.getRepVal(sel_record.get("BOK_NAME_KOR"), '')
								,BOKWI_KIBU_GBN_NM: '복위'
								,PAGE_SKIP      : exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '')
								,BACK_IMAGE     : exCommon.getRepVal(sel_record.get("BACK_IMAGE"), '')
								,TODAY          : exCommon.setDateFormat( exCommon.getNowDate() )
   			  			}
    				}// subROw
    				
    				var data = {
			    			 MANG          : exCommon.getRepVal(sel_record.get("MANG"), '')
							,DECE_REL      : exCommon.getRepVal(sel_record.get("DECE_REL2"), '')
							,BON_SGBN      : exCommon.getRepVal(sel_record.get("BON_SEX_NM"), '')	   
							,NAME_KOR      : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')
							,SPIRITUAL_GBN : exCommon.getRepVal(sel_record.get("YOUNGGA"), '')
						}    			
   					jsonYoung.push(data);
    				subROw++;
				}// for j 
				jsonBasicData.prayList  = jsonYoung;
				
    			TOP_DATA.push(jsonBasicData);
    		}// if check_p
    		
		}// for
		
		var allData = {
  			 "all"  : TOP_DATA    			 
  		}
	
   		var params = {
  			 FILE_PATH  : '/sin001p_07_000031_rp_cheanHon.ozr' 
  			,PRINT_DATA : allData
  		};
    	
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    },
    inGetSetData : function (){
    	
    	var setData = {
	    	varchar1   : '' , varchar2  : '' , varchar3   : '' , varchar4   : '' , varchar5   : '' , varchar6   : '' , varchar7   : '' , varchar8   : '' , varchar9   : '' , varchar10  : '' ,
	    	varchar11  : '' , varchar12 : '' , varchar13  : '' , varchar14  : '' , varchar15  : '' , varchar16  : '' , varchar17  : '' , varchar18  : '' , varchar19  : '' , varchar20  : '' ,
	    	varchar21  : '' , varchar22 : '' , varchar23  : '' , varchar24  : '' , varchar25  : '' , varchar26  : '' , varchar27  : '' , varchar28  : '' , varchar29  : '' , varchar30  : '' ,
	    	varchar31  : '' , varchar32 : '' , varchar33  : '' , varchar34  : '' , varchar35  : '' , varchar36  : '' , varchar37  : '' , varchar38  : '' , varchar39  : '' , varchar40  : '' ,
	    	varchar41  : '' , varchar42 : '' , varchar43  : '' , varchar44  : '' , varchar45  : '' , varchar46  : '' , varchar47  : '' , varchar48  : '' , varchar49  : '' , varchar50  : '' ,
	    	varchar51  : '' , varchar52 : '' , varchar53  : '' , varchar54  : '' , varchar55  : '' , varchar56  : '' , varchar57  : '' , varchar58  : '' , varchar59  : '' , varchar60  : '' ,	    		    
	    	varchar201 : 'default1' , varchar0 : 0
    	}
    	
    	return setData;
    	
    },
    printCH_00 : function(me){
    	me.getViewModel().getStore('ds_print').removeAll();
		
		
		var PRINT_INDEX = 1;
		var FIX_COUNT   = 30;
		
		var ds_YDRec_sel    = me.getViewModel().getStore('ds_YDRec_sel');
		var g_row           = me.getViewModel().getStore('ds_YDRec_grd').getCount();
		var sel_row         = ds_YDRec_sel.getCount();
		
    	
    	var dsPrintROw = 0;
    	var dsPrintIdx = 0;
    	
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_YDRec_grd').getAt(i);
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		var setData = me.inGetSetData();
    		
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			
    			var findRecord = ds_YDRec_sel.findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			
    			if(findRecord != null && findRecord != undefined){
    				var ROW        = ds_YDRec_sel.indexOf(findRecord);
    				
    				var rowidx  = 1;
    				PRINT_INDEX = PRINT_INDEX == 0 ? 1:0;
    				    	    				
    				var CNT = findRecord.get("CNT");
					var idx = (ROW+CNT);
					
					for(var j = ROW; j <idx ; j++){
    					var sel_record = ds_YDRec_sel.getAt(j);
    					
	    				
	    				if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
	    	    			break;
	    	    		}
	    				
	    			
	    				if(PRINT_INDEX == 0 && rowidx == 1){
	    					
	    					setData.varchar0 = dsPrintIdx;
	    					
	    					me.getViewModel().getStore('ds_print').insert(dsPrintIdx , setData);
	    					
	    					
	    					dsPrintIdx = dsPrintIdx +1;
	    					console.log('getCount()=  ', me.getViewModel().getStore('ds_print').getCount());
	    					
	    					dsPrintROw = me.getViewModel().getStore('ds_print').getCount()-1;
	    					
						}
	    				
	    				if(rowidx == 1){
	    					if(j == ROW){
	    						var addr_all = gf_trim(sel_record.get("ADDR1") + " " +sel_record.get("ADDR2") );
	    						me.getViewModel().getStore('ds_print').getAt(dsPrintROw).set("varchar"+((PRINT_INDEX * FIX_COUNT) + 26), addr_all );
	    					}
	    					me.getViewModel().getStore('ds_print').getAt(dsPrintROw).set("varchar"+((PRINT_INDEX * FIX_COUNT) + 25), sel_record.get("BUD_CODE")  );
	    					me.getViewModel().getStore('ds_print').getAt(dsPrintROw).set("varchar"+((PRINT_INDEX * FIX_COUNT) + 27), sel_record.get("LIGHT_NO")  );
	    				}// rowid
	    				
	    				me.getViewModel().getStore('ds_print').getAt(dsPrintROw).set("varchar"+((PRINT_INDEX * FIX_COUNT) + rowidx), sel_record.get("REPRESEN_REL")  );
	    				rowidx ++;
	    				me.getViewModel().getStore('ds_print').getAt(dsPrintROw).set("varchar"+((PRINT_INDEX * FIX_COUNT) + rowidx), sel_record.get("NAME_KOR")  );
	    				rowidx ++;
	    				
	    				if(j <idx-1 && rowidx >= 24){
	    					rowidx = 1;
							PRINT_INDEX = PRINT_INDEX == 0 ? 1:0;
	    				}
	    				
    				}// for j
    				
    			}// findRecord
    		}// CHECK_P
    		
    	}// for i
    	
    	
    	var jsonAllData   = {};
	    var jsonPrintData = [];
  	  	
  	  	for(var i = 0; i< me.getViewModel().getStore('ds_print').getCount() ; i++){
  	  		jsonPrintData.push( me.getViewModel().getStore('ds_print').getAt(i).data )
  	  	}// for i
  	  	
  	  	
  	  	jsonAllData = {
      		"info" : jsonPrintData
      	};
      	
      	
      	var params = {
  			 FILE_PATH  : '/rec001w_16_000031_rp_YDRec_06_Deung.ozr' 
  			,PRINT_DATA : jsonAllData
  		};
        	
        setTimeout(function(){
        	me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    printCH_01 : function(me){
    	
    	var ds_YDRec_sel    = me.getViewModel().getStore('ds_YDRec_sel');
		var g_row           = me.getViewModel().getStore('ds_YDRec_grd').getCount();
		var sel_row         = ds_YDRec_sel.getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_YDRec_grd').getAt(i);
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		var PAGE_SKIP = exCommon.getRepVal(g_record.get("PAGE_SKIP"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			var findRecord = ds_YDRec_sel.findRecord('PAGE_SKIP', PAGE_SKIP, 0, false, true, true);
    			var ROW        = ds_YDRec_sel.indexOf(findRecord);
    			
    			
    			if(findRecord != null && findRecord != undefined){
    				
    				var ZIP_CD        = exCommon.getRepVal(findRecord.get("ZIP_CD"), '');
	    	    	var TELNO         = exCommon.getRepVal(findRecord.get("TELNO"), '');
						TELNO         = TELNO.replace('()-', '');  
					var BUD_CODE      = exCommon.getRepVal(findRecord.get("BUD_CODE"), '');
					var ADDR_ALL      = exCommon.getRepVal(findRecord.get("ADDR_ALL"), '');
    				
	    			var jsonBaseData;
        	    	var jsonPrayData = [];
	    			var cnt = 1;
	    			
        	    	for(ROW ; ROW < sel_row ; ROW++){
	    				//ds_YDRec_sel
	    				var sel_record = ds_YDRec_sel.getAt(ROW);
	    				
	    				if(PAGE_SKIP != exCommon.getRepVal(sel_record.get("PAGE_SKIP"), '') ){
	    	    			break;
	    	    		}
	    				
	    				subData = {
	    					REPRESEN_REL : exCommon.getRepVal(sel_record.get("REPRESEN_REL"), '')
		    			   ,NAME_KOR     : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')
		    			   ,BIRTHDAY     : exCommon.getRepVal(sel_record.get("BIRTHDAY"), '')
	    	    		};
        	    		jsonPrayData.push(subData);
        	    		cnt++;
        	    		
        	    		if(cnt > 10){
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
    		    	    	cnt = 1;
    		    	    	
    		    	    	jsonBaseData;
    	        	    	jsonPrayData = [];
        	    		}
	    			}// for ROW
	    	    	
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
    			}// findRecord
    	    	
    		}
    	}// for i
    	
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	var params = {
			 FILE_PATH  : '/rec001w_16_000031_rp_YDRec_CHUKWON_FORM.ozr' 
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
})
