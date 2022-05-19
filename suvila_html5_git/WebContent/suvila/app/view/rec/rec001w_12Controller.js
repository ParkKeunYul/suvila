Ext.define('ExFrm.view.rec.rec001w_12Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec001w_12',
    onCalled:function(params){},
    onInit:function(){
    	var me = this;
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	if(exCommon.user.death_type == "2"){
    		me.lookupReference('lc_bokwi').setHidden(false);
    	}// 
    	
    	var params = {
    		V_ACCEPT_GBN : "4"
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_YDKindInfo', '', params ,me.dsYDCallback);
    	},650);
    	
    	// 연등
    	me.inRecTabClick(me , 4)
    },
    dsYDCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_jungakGbn', '', null ,me.dsJungakCallback);
    	},50);
    },
    dsJungakCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_limit_yn', '', null ,null);
    	},50);
    },
    onCallback002:function(params){
    	var me = this;  
    	me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
    },
    callFamilyInfo : function(family , spirit){
    	
    	var me = this;
    	
    	me.getViewModel().getStore('ds_familySelInfo').removeAll();
    	me.getViewModel().getStore('ds_spiritSelInfo').removeAll();
    	var record = {
    		 "BUD_NO"   : "-9999"
    		,"NAME_KOR"	: "선택안함"
    	}
    	
    	for(var i = 0; i<family.length; i++ ){
    		me.getViewModel().getStore('ds_familySelInfo').add( family[i] );
    		me.getViewModel().getStore('ds_familySelInfo').getAt(i).set("SEL_YN", false);
    	}// for
    	
    	for(var i = 0; i<spirit.length; i++ ){
    		me.getViewModel().getStore('ds_spiritSelInfo').add( spirit[i] );
    		me.getViewModel().getStore('ds_spiritSelInfo').getAt(i).set("SEL_YN", false);
    	}// for
    	
    	
    	me.lookupReference('rec002w_02_e').getView().select( 0 );
    	me.lookupReference('rec002w_02_f').getView().select( 0 );
    	
    	console.log('ds_spiritSelInfo = ',me.getViewModel().getStore('ds_spiritSelInfo').getCount() );
    	
    	
    	
    	console.log('exCommon.user.death_type = ', exCommon.user.death_type);
    	
		if(exCommon.user.death_type == "2"){
			
			var rtnParam  = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo();
	    	var t_budno   = rtnParam.txt_budNo;
	    	
	    	if(rtnParam.cb_setBunga){
				t_budno = t_budno.substring(0,8);
			}else{
				t_budno = t_budno.substring(0,10);
			}
	    	
	    	var params = {
	    		V_BUD_CODE : t_budno
	    	};
			
			setTimeout(function(){
	    		me.callStore(me, 'ds_bokwi', '', params , me.dsBokwiCallback);
	    	},50);
		}
    },
    dsBokwiCallback : function(me, success, form, action){
    	console.log('dsBokwiCallback');
    	me.lookupReference('lc_bokwi').setExValue('00000');
    	
    	for(var a=0; a<me.getViewModel().getStore('ds_spiritSelInfo').getCount();a++){
			me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).set('SEL_YN' , true);
		}// for
    	
    },
    onSearchBokWi : function(opts , nowValue , oldValue){
    	var me = this;
    	
    	console.log('onSearchBokWi = ', nowValue);
    	
    	if(nowValue == "00000"){
    		
    		for(var a=0; a<me.getViewModel().getStore('ds_spiritSelInfo').getCount();a++){
    			me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).set('SEL_YN' , true);
    		}// for
    		
    	}else{
    		
    		var findRocord = me.getViewModel().getStore('ds_bokwi').findRecord('FIND_VALUE', nowValue, 0, false, true, true);
    		console.log('findRocord = ', findRocord);
    		
    		var pageskip = findRocord.get("BUD_NO")+""+findRocord.get("DEATH_YN");
    		
    		for(var a=0; a<me.getViewModel().getStore('ds_spiritSelInfo').getCount();a++){
    	    	
    			var val = false;
    			
    	    	if( pageskip == me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).get("PAGE_SKIP")  ){
    	    		val  = true;
    	    	}
    	    	me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).set("SEL_YN", val);
    			
    	    }// for
    		
    	}
    	
    },
    onDelAll : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec002w_02_dd', 'ds_YDRec' , true , true);
    	
    	/*me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();*/
    	me.inTtoAmtCalc();
    },
    ydCheckchange : function(column, recordIndex, checked){
    	
    	var me = this;
    	
    	var store = me.getViewModel().getStore('ds_YDKindInfo');
    	if( !me.inKindSelCheck(me, store, recordIndex) ) return false;
    },
    inKindSelCheck : function(me , store , row){
    	var FCount      = 0;
    	var Count       = 0;
    	var FDCount     = 0;
    	var DCount      = 0;
    	var tempCount   = 0;
    	var familyYN    = new Array();
    	var ds_selInfo = "";
    	
    	/* 선택한 종류가 몇개인지 */
    	for(var a=0;a < store.getCount();a++){
    		   
    		var SEL_YN    =  exCommon.getTF(exCommon.getRepVal( store.getAt(a).get("SEL_YN") ,""));
    		var FAMILY_YN =  exCommon.getTF(exCommon.getRepVal( store.getAt(a).get("FAMILY_YN") ,""));
    		var DEATH_YN  =  exCommon.getTF(exCommon.getRepVal( store.getAt(a).get("DEATH_YN") ,""));
    		
    		/*
    		console.log(a+"]FOR_SEL_YN", SEL_YN);
    		console.log(a+"]FOR_FAMILY_YN", FAMILY_YN);
    		console.log(a+"]FOR_DEATH_YN", DEATH_YN);
    		*/
    		
    		/* 가족등이면서 영가등이 아닐 경우 */
    		if( SEL_YN == "T" ){
    			if(FAMILY_YN == "T" && DEATH_YN == "F"){
    				FCount++;
    				tempCount++;
    			}/* 가족등이 아니면서 영가등이 아닐 경우*/
    			else if(FAMILY_YN == "F" && DEATH_YN == "F"){
    				Count++;
    				tempCount++;
    			}/* 가족등이면서 영가등일 경우 */
    			else if(FAMILY_YN == "T" && DEATH_YN == "T"){
    				FDCount++;
    				tempCount++;
    			}/* 가족등이 아니면서 영가등일 경우 */
    			else if(FAMILY_YN == "F" && DEATH_YN == "T"){
    				DCount++;
    				tempCount++;
    			}
    		}
    	} // for
    	
    	if(FCount == tempCount || Count == tempCount || FDCount == tempCount || DCount == tempCount){
    	}else{
    		exCommon.msgAlert("같은 종류의 등이 아닙니다.<br/>선택하신 등을 먼저 추가 하셔야 합니다.");
    		store.getAt(row).set("SEL_YN", false);
    		return false;
    	}
    	
    	
    	var dsStoreNm = "ds_familySelInfo";
    	var SEL_DEATH_YN  = exCommon.getTF( store.getAt(row).get("DEATH_YN") );
    	
    	if(SEL_DEATH_YN == "F"){
    		me.lookupReference('familyTab').setActiveItem(0);

    	//	gf_TabClick(1);
    	//	tab_focus = 1;
    	}else if(SEL_DEATH_YN == "T"){
    		dsStoreNm = "ds_spiritSelInfo";
    	//	gf_TabClick(2);
    	//	tab_focus = 2;
    		me.lookupReference('familyTab').setActiveItem(1);
    		
    		console.log('exCommon.user.death_type = ', exCommon.user.death_type);
    		
    		if( exCommon.user.death_type  == "2"){
    			me.lookupReference('lc_bokwi').setExValue('00000');
    		}
    	}
    	
    	
    	var SEL_FAMILY_YN = exCommon.getTF( store.getAt(row).get("FAMILY_YN") );
    	var SEL_SEL_YN    = exCommon.getTF( store.getAt(row).get("SEL_YN") );
    	
    	if(  SEL_FAMILY_YN == "T" &&  SEL_SEL_YN == "T"){
    		
    		for(var a=0; a<me.getViewModel().getStore(dsStoreNm).getCount();a++){    			
    			me.getViewModel().getStore(dsStoreNm).getAt(a).set('SEL_YN' , true);
    		}// for
    		
    	}else if( (SEL_FAMILY_YN == "T" || SEL_FAMILY_YN == true ) && (SEL_SEL_YN == "F" || !SEL_SEL_YN ) ){
    		
    		for(var a=0; a<me.getViewModel().getStore(dsStoreNm).getCount();a++){
    			me.getViewModel().getStore(dsStoreNm).getAt(a).set('SEL_YN' , false);
    		}// for
    	}
    	
    	return true;
    },
    onShift : function(){
    	var me = this;
    	
    	var recKindInfoRow      = new Array();
    	var faminlySelInfoRow   = new Array();
    	var recKindInfoCount    = 0;
    	var faminlySelInfoCount = 0;
    	var dsSel               = "";
    	
    	var year  = exCommon.getNowDate().substring(0,4);
    	var month = parseInt(exCommon.getNowDate().substring(4,6),10).toString();    
    	
    	
    	
    	var selectTab     = me.lookupReference('recTYpe').getActiveTab();
    	var recAmtDefault = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	
    	
    	
    	var ds_familyType = "";

    	
    	if( me.lookupReference('familyTab').getActiveTab().title == "영가" ){
    		ds_familyType = "ds_spiritSelInfo";
    		
    		var findRocord = me.getViewModel().getStore('ds_familySelInfo').findRecord('SEL_YN', true, 0, false, true, true);
    		
    		if(findRocord != null ){
    			exCommon.msgAlert('선택된 등은 가족을 동참자로 올릴 수 없습니다.');
    			return false;
    		}
    		
    	}else{
    		ds_familyType = "ds_familySelInfo";
    		
    		var findRocord = me.getViewModel().getStore('ds_spiritSelInfo').findRecord('SEL_YN', true, 0, false, true, true);
    		
    		if(findRocord != null ){
    			exCommon.msgAlert('선택된 등은 가족을 동참자로 올릴 수 없습니다.');
    			return false;
    		}
    	}
    	
    	// ds_FamilyTemp
    	me.getViewModel().getStore('ds_FamilyTemp').removeAll();
    	for(var i = 0; i <me.getViewModel().getStore(ds_familyType).getCount() ; i++){
    		var record = me.getViewModel().getStore(ds_familyType).getAt(i);
    		var SEL_YN = record.get("SEL_YN");
    		
    		if(SEL_YN){
    			me.getViewModel().getStore('ds_FamilyTemp').add(record);
    		}
    	}// for
    	
    	
    	if( me.getViewModel().getStore('ds_FamilyTemp').getCount()  == 0){
    		me.getViewModel().getStore('ds_YDKindInfo').rejectChanges();
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_recKindTemp').removeAll();
    	
    	
    	
    		
		var cnt = me.getViewModel().getStore('ds_YDKindInfo').getCount();
		
		for (var i = 0; i < cnt; i++) {
			var record = me.getViewModel().getStore('ds_YDKindInfo').getAt(i);
			
			if(record.get("SEL_YN")){
				console.log('ds_YDKindInfo = ', record);
				me.getViewModel().getStore('ds_recKindTemp').add(record);
			}
		}// for
		
		if( me.getViewModel().getStore('ds_recKindTemp').getCount()  == 0){
			me.getViewModel().getStore('ds_YDKindInfo').rejectChanges();
			return false;
		}
		
		
		/*
    		dsRec      = ds_YDRec;
			dsRecTemp  = ds_YDRecTemp;
			dsKindInfo = ds_YDKindInfo;
		*/
		var dApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r01_12').getValue().rdo_ApprovalGbn_r01_12,1);
		
		
		me.getViewModel().getStore('dsRecTemp').removeAll();
		
		recKindInfoCount    = me.getViewModel().getStore('ds_recKindTemp').getCount() ;
		faminlySelInfoCount = me.getViewModel().getStore('ds_FamilyTemp').getCount() ;
		
		console.log('recKindInfoCount    = ', recKindInfoCount);
		console.log('faminlySelInfoCount = ', faminlySelInfoCount);
		
		
		for(var a=0; a<recKindInfoCount; a++){
			var dsKindInfo = me.getViewModel().getStore('ds_recKindTemp').getAt(a);
			
			console.log('dsKindInfo = ', dsKindInfo);
			
			for(var b=0; b<faminlySelInfoCount; b++){
				
				var familyInfo = me.getViewModel().getStore('ds_FamilyTemp').getAt(b);
				
				
				var SORT       = (me.getViewModel().getStore('dsRecTemp').getCount() + 1);
				var PROD_CODE  = dsKindInfo.get("PROD_CODE");
				var NAME_KOR   = familyInfo.get("NAME_KOR");
				var IMG_NORMAL = "N";
				var IMG_DETAIL = "S";
				var CMS_TYPE   = dApprovalGbn;
				
				var dPamt = dsKindInfo.get("PROD_AMT");
				
				var TEMPLE_CD        = exCommon.user.templeCd;
				var LIGHT_NM         = dsKindInfo.get("LIGHT_NM");
				var DONGCHAM_BUD_NO  = familyInfo.get("BUD_NO");
				var FAMILY_YN        = dsKindInfo.get("FAMILY_YN");
				var BOKWIJA_NM       = exCommon.getRepVal(familyInfo.get("BOKWIJA_NM"),"");
				var BOKWIJA_NO       = exCommon.getRepVal(familyInfo.get("BOKWIJA_NO"),"");
				
				var JUNGAK_GBN       = "";
				var JUNGAK_CD        = "";
				var PAYMENT_PLAN_AMT = 0;
				var PAYMENT_AMT      = 0;
				var DONGCHAMJA_GBN   = "";
				
				var BASE_PAYMENT_AMT = 0;
				
				var BASE_PAYMENT_AMT = 0;
				var LIMIT_YN         = "";
				var MISU_AMT         = 0;    				
				var SPIRITUAL_YN     = 1;
				
				var YEONDEUNG_YEAR     = "";
				var YEONDEUNG_MONTH    = "";
				var YEONDEUNG_PERIOD   = exCommon.getRepVal(dsKindInfo.get("PERIOD"),"");
				console.log('YEONDEUNG_PERIOD = ', YEONDEUNG_PERIOD);
				
				var SPIRITUAL_YN     = 1;		
				if( dsKindInfo.get("DEATH_YN") == "T" ){
					SPIRITUAL_YN = 2;
				}
				
				/* 가족등이고 대표일경우 동참자수 입력 */
				if(FAMILY_YN == "T" && b == 0){
					JUNGAK_GBN       = "I";
					JUNGAK_CD        = " ";
					PAYMENT_PLAN_AMT = dPamt * YEONDEUNG_PERIOD;
					PAYMENT_AMT      = dPamt * YEONDEUNG_PERIOD;
					DONGCHAMJA_GBN   = faminlySelInfoCount;
					BASE_PAYMENT_AMT = dPamt;
					YEONDEUNG_YEAR   = year;
					YEONDEUNG_MONTH  = month;
					LIMIT_YN         = "T";
					
					if(dApprovalGbn == 3){
						PAYMENT_AMT = 0;
						MISU_AMT    = dPamt;
					}
				}else if( FAMILY_YN == "T" && b != 0 ){
					console.log('shift === > ', 2);
					
					DONGCHAMJA_GBN  = "*";	/* 동참자구분 */
					JUNGAK_GBN      = "";   /* 전각구분 */
					JUNGAK_CD	    = "";   /* 등위치 */ 
					YEONDEUNG_YEAR  = "";	/* 연등년 */ 
					YEONDEUNG_MONTH = "";	/* 연등월 */ 
					YEONDEUNG_PERIOD= "0";	/* 인등기간 */
				}else{
					PAYMENT_PLAN_AMT = dPamt;
					PAYMENT_AMT      = dPamt;
					JUNGAK_GBN       = "I";
					JUNGAK_CD        = " ";
					BASE_PAYMENT_AMT = dPamt;
					YEONDEUNG_YEAR   = year;
					YEONDEUNG_MONTH  = month;
					
					if(dApprovalGbn == 3){
						PAYMENT_AMT = 0;
						MISU_AMT    = dPamt;
					}
					LIMIT_YN         = "T";
				}
				
				
				var data = {
					 SORT             : SORT
					,PROD_CODE        : PROD_CODE
					,NAME_KOR         : NAME_KOR
					,IMG_NORMAL       : IMG_NORMAL
					,IMG_DETAIL       : IMG_DETAIL
					,CMS_TYPE         : CMS_TYPE
					,TEMPLE_CD        : TEMPLE_CD    
					,LIGHT_NM         : LIGHT_NM  
					,DONGCHAM_BUD_NO  : DONGCHAM_BUD_NO
					,FAMILY_YN        : FAMILY_YN
					,BOKWIJA_NM       : BOKWIJA_NM
					,BOKWIJA_NO       : BOKWIJA_NO
					,FAMILY_YN        : FAMILY_YN
					,JUNGAK_GBN       : JUNGAK_GBN
					,JUNGAK_CD        : JUNGAK_CD
					,PAYMENT_PLAN_AMT : PAYMENT_PLAN_AMT
					,PAYMENT_AMT      : PAYMENT_AMT
					,DONGCHAMJA_GBN   : DONGCHAMJA_GBN
					,BASE_PAYMENT_AMT : BASE_PAYMENT_AMT 
					,YEONDEUNG_YEAR   : YEONDEUNG_YEAR
					,YEONDEUNG_MONTH  : YEONDEUNG_MONTH
					,YEONDEUNG_PERIOD : YEONDEUNG_PERIOD
					,BASE_PAYMENT_AMT : BASE_PAYMENT_AMT
					,LIMIT_YN         : LIMIT_YN
					,PAYMENT_AMT      : PAYMENT_AMT 
					,MISU_AMT         : MISU_AMT						
					,SPIRITUAL_YN     : SPIRITUAL_YN
				}
				me.getViewModel().getStore('dsRecTemp').add(data);
			}// for b
		}// for a
		
		/* 중복된 데이터 제거 */
		var prodGbn     = "";
		var budNm       = ""; 
		var prodGbnTemp = "";
		var budNmTemp   = "";
		
		var dsRecCnt     =  me.getViewModel().getStore('ds_YDRec').getCount();
		var dsRecTempCnt =  me.getViewModel().getStore('dsRecTemp').getCount();
		
		
		for(var d=0; d<dsRecCnt; d++){
			for(var c= (dsRecTempCnt-1) ; c>=0; c--){
				prodGbnTemp = me.getViewModel().getStore('dsRecTemp').getAt(c).get("PROD_CODE");
				budNmTemp   = me.getViewModel().getStore('dsRecTemp').getAt(c).get("BOKWIJA_NO") + me.getViewModel().getStore('dsRecTemp').getAt(c).get("DONGCHAM_BUD_NO");
				
				
				prodGbn     = me.getViewModel().getStore('ds_YDRec').getAt(d).get("PROD_CODE");
				budNm       = me.getViewModel().getStore('ds_YDRec').getAt(d).get("BOKWIJA_NO") + me.getViewModel().getStore('ds_YDRec').getAt(d).get("DONGCHAM_BUD_NO");
				
				
				console.log(prodGbn+' = ', prodGbnTemp);
				console.log(budNm+' = ', budNmTemp);
				
				if((prodGbn == prodGbnTemp) && (budNm == budNmTemp)){
					me.getViewModel().getStore('dsRecTemp').remove( me.getViewModel().getStore('dsRecTemp').getAt(c) ); 
				}
				
			}// for c
		}// for d
		
		
		for(var i = 0; i < me.getViewModel().getStore('dsRecTemp').getCount() ; i++){
			console.log('YD ===>', me.getViewModel().getStore('dsRecTemp').getAt(i).data  );
			me.getViewModel().getStore('ds_YDRec').add( me.getViewModel().getStore('dsRecTemp').getAt(i));
		}// for i

		me.getViewModel().getStore('ds_YDKindInfo').rejectChanges();
		me.getViewModel().getStore('ds_familySelInfo').rejectChanges();
		me.getViewModel().getStore('ds_spiritSelInfo').rejectChanges();
    		
    	
    	/*me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();*/
    	me.inTtoAmtCalc();
    },
    onCellClickYD : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	
    	var me = this;
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        
        
        var tempLightNo = "";
        
        var JUNGAK_CD  = exCommon.getRepVal( record.get("JUNGAK_CD"),"" );
    	var JUNGAK_GBN = exCommon.getRepVal( record.get("JUNGAK_GBN"),"" );
    	var LIGHT_NO   = exCommon.getRepVal( record.get("LIGHT_NO"),"" );
        
        if(clickedDataIndex == "JUNGAK_NM"){
        	if(record.get("DONGCHAMJA_GBN") == "*"){
        		return false;
        	}
        	
        	var param = {        		 
        		 V_JUNGAK_GBN  : record.get("JUNGAK_GBN")
        		,V_ACCEPT_GBN  : '4'
        		
        	};
        	
        	me.openPopup('ExFrm.view.rec.rec000p_04',  param, me.onYdJungGakReceive);
        	
        	
        }
        else if(clickedDataIndex == "IMG_NORMAL"){
        	
        	 
        	if(JUNGAK_GBN == ""){
        		return false;
        	}
        	
        	if(JUNGAK_CD == "" || JUNGAK_CD == " "){
        		exCommon.msgAlert("등 위치를 선택하시기 바랍니다.");
        		return false;
        	}
        	
        	if(LIGHT_NO != null && LIGHT_NO != ""){
        		return false;
        	}
        	
        	
        	var params = {
        		  V_JUNGAK_CD   : JUNGAK_CD
        		 ,V_ACCEPT_GBN  : '4'
        	     ,record        : record
        	}
        	setTimeout(function(){
        		me.callStore(me, 'ds_deungID', '', params ,me.dsDeungCallback);
        		//me.onCellDbClick();
        	},50);
        }else if(clickedDataIndex == "IMG_DETAIL"){
        	
        	if(record.get("DONGCHAMJA_GBN") == "*"){
        		return false;
        	}
        	
        	var JUNGAK_CD  = exCommon.getRepVal( record.get("JUNGAK_CD"),"" );
        	
        	var params = {
          		  V_JUNGAK_CD   : JUNGAK_CD
          		 ,V_ACCEPT_GBN  : '4'
          	     ,V_LIGHT_NO    : LIGHT_NO
          	     ,V_JUNGAK_GBN  : JUNGAK_GBN
          	}
        	
       		me.openPopup('ExFrm.view.rec.rec000p_03',  params, me.onYdDetailReceive);
        	
        	
        }else if(clickedDataIndex == "DONGCHAMJA_GBN"){        	
        	if(record.get("DONGCHAMJA_GBN") == "*"){
        		return false;
        	}
        }
    },
    dsDeungCallback : function(me, success, form, action){
    	
    	if(success){
    		action._params.record.set("LIGHT_NO",  me.getViewModel().getStore('ds_deungID').getAt(0).get("LIGHT_NO") );
    	}else{
    		action._params.record.set("LIGHT_NO", "");
    	}
    },
    onYdJungGakReceive : function(params , me){
    	var recordID = me.lookupReference('rec002w_02_dd').getView().getSelectionModel().getSelection()[0];
    	
    	recordID.set("JUNGAK_CD", params.JUNGAK_CD);
    	recordID.set("JUNGAK_NM", params.JUNGAK_NM);
    },
    onYdDetailReceive : function( params , me ){
    	console.log('onIdDetailReceive = ', params);
    	
    	var recordID = me.lookupReference('rec002w_02_dd').getView().getSelectionModel().getSelection()[0];
    	
    	
    	var RESERVATION_YN = exCommon.getRepVal(params.RESERVATION_YN);
    	if("F" == RESERVATION_YN){
    		recordID.set("JUNGAK_CD"  , "");
        	recordID.set("JUNGAK_NM"  , "");
        	recordID.set("LIGHT_NO"   , "");
        	recordID.set("JUNGAK_GBN" , "I");
    		return false;
    	}
    	
    	recordID.set("JUNGAK_CD"  , params.JUNGAK_CD);
    	recordID.set("JUNGAK_NM"  , params.JUNGAK_NM);
    	recordID.set("LIGHT_NO"   , params.LIGHT_NO);
    	recordID.set("ACCEPT_GBN" , params.ACCEPT_GBN);
    	recordID.set("JUNGAK_GBN" , params.JUNGAK_GBN);
    	
    },
    onBeforeeditYD : function( editor, context, eOpts ){
    	var me = this;
    	
    	var record = me.getViewModel().getStore('ds_YDRec').getAt(context.rowIdx);
    
    	var FIELD_NM  	   = context.field ;
    	var COL_IDX  	   = context.colIdx ;
    	var ROW_IDX  	   = context.rowIdx ;
    	var LIMIT_YN       = exCommon.getRepVal(record.get("LIMIT_YN"), "")
    	var DONGCHAMJA_GBN = exCommon.getRepVal(record.get("DONGCHAMJA_GBN"), "")
   	

    	if( (FIELD_NM == 'LIGHT_NO'  && DONGCHAMJA_GBN != "*" )        || 
    		(FIELD_NM == 'JUNGAK_GBN'  && DONGCHAMJA_GBN != "*")       ||     		
    		(FIELD_NM == 'DONGCHAMJA_GBN' && DONGCHAMJA_GBN != "*" )   || 
    		(FIELD_NM == 'REMARK' && DONGCHAMJA_GBN != "*")            ||
    		(FIELD_NM == 'PAYMENT_AMT' && DONGCHAMJA_GBN != "*")       || 
    		(FIELD_NM == 'YEONDEUNG_YEAR' && DONGCHAMJA_GBN != "*")    ||
    		(FIELD_NM == 'YEONDEUNG_MONTH'  && DONGCHAMJA_GBN != "*")  ||
    		(FIELD_NM == 'YEONDEUNG_PERIOD' && DONGCHAMJA_GBN != "*" && LIMIT_YN  == "T") ||
    		(FIELD_NM == 'PAYMENT_PLAN_AMT' && DONGCHAMJA_GBN != "*" && LIMIT_YN  == "T")
    	){
    		return true;
    	}
    	return false;
    },
    onEditYD : function(editor, context, eOpts) {
    	var me = this;
    	
    	console.log('onEditYD = ',context.colIdx);
    	console.log('onEditYD = ',context);
    	var record = me.getViewModel().getStore('ds_YDRec').getAt(context.rowIdx);
    	
    	var groupCount     = "";
    	var backGroupCount = "";
    	    	
    	
    	var ROW_IDX   = context.rowIdx;
    	var LAST_IDX  = 0;
    	var ID_CNT    = me.getViewModel().getStore('ds_YDRec').getCount();
    	var TOT_IDX   = 0;
    	    	    	    	
    	var PAYMENT_PLAN_AMT = record.get("PAYMENT_PLAN_AMT");
		var PAYMENT_AMT 	 = record.get("PAYMENT_AMT");
		var BASE_PAYMENT_AMT = record.get("BASE_PAYMENT_AMT");
		var PROD_CODE        = record.get("PROD_CODE");    			
		var YEONDEUNG_YEAR   = record.get("YEONDEUNG_YEAR");
		var YEONDEUNG_MONTH  = record.get("YEONDEUNG_MONTH");
		var YEONDEUNG_PERIOD = record.get("YEONDEUNG_PERIOD");
		var JUNGAK_GBN       = record.get("JUNGAK_GBN");
		var LIMIT_YN         = record.get("LIMIT_YN");
    	
		if(context.field ==  'YEONDEUNG_YEAR'){ // 년도
			
			if(!isNaN(YEONDEUNG_YEAR) && YEONDEUNG_YEAR.length == 4){
				
			}else{
				try{
					record.set("YEONDEUNG_YEAR", record.previousValues.YEONDEUNG_YEAR)
				}catch (e) {}
			}
		}else if(context.field == 'YEONDEUNG_MONTH'){ // 인등 월
			
			if(!isNaN(YEONDEUNG_MONTH) && YEONDEUNG_MONTH >=1 && YEONDEUNG_MONTH <=12){
				
			}else{
				try{
					record.set("YEONDEUNG_MONTH", record.previousValues.YEONDEUNG_MONTH)
				}catch (e) {}
				
			}
						
		}else if(context.field == 'YEONDEUNG_PERIOD'){ // 연등기간
    		
    		var YEONDEUNG_PERIOD = record.get("YEONDEUNG_PERIOD");
    		
    		if(!isNaN(YEONDEUNG_PERIOD)){
    			
    			console.log('1 YEONDEUNG_PERIOD= ', YEONDEUNG_PERIOD);
    			
    			record.set("PAYMENT_PLAN_AMT", YEONDEUNG_PERIOD * BASE_PAYMENT_AMT);
    			record.set("PAYMENT_AMT"     , YEONDEUNG_PERIOD * BASE_PAYMENT_AMT);
    		}else{
    			
    			var DONG_PRICE = BASE_PAYMENT_AMT * record.previousValues.YEONDEUNG_PERIOD;
    			console.log('DONG_PRICE = ', DONG_PRICE);
    			
    			record.set("YEONDEUNG_PERIOD", record.previousValues.YEONDEUNG_PERIOD);
    			record.set("PAYMENT_PLAN_AMT", DONG_PRICE);
    		}
    		record.set("MISU_AMT"     , 0);
    		
    		me.inTtoAmtCalc();
    	}else if(context.field == 'PAYMENT_PLAN_AMT' || context.field == 'PAYMENT_AMT'){ // 동참금
    		
    		
    		record.set("MISU_AMT"     , PAYMENT_PLAN_AMT - PAYMENT_AMT );
    		
    		me.inTtoAmtCalc();
    	}else if(context.field == 'DONGCHAMJA_GBN'){ // 동참자
    		
    		groupCount = record.get("DONGCHAMJA_GBN");
    		
    		
    		if(!isNaN(groupCount)){
    			
    			if(groupCount < 1){
    				groupCount = 1;
    				record.set("DONGCHAMJA_GBN", 1);
        		}
    			
    			// on_dongChamJa(row, colid) 
    			
    			var moveRow       = 0;
    			var minusRowCount = 0;
    			
    			var row           = context.rowIdx;
    			
    			console.log('moveRow  ==== ', row);
    			
    			for(moveRow=row-1; moveRow>=0 ;moveRow--){
    				
    				var m_record = me.getViewModel().getStore('ds_YDRec').getAt(moveRow);
    				var r_record = me.getViewModel().getStore('ds_YDRec').getAt(row);
    				
    				if(exCommon.getRepVal(m_record.get("DONGCHAMJA_GBN"), '') == ''){
    					minusRowCount++;
    				}
    				
    				if(!isNaN(exCommon.getRepVal(m_record.get("DONGCHAMJA_GBN"), '')) && exCommon.getRepVal(m_record.get("DONGCHAMJA_GBN"), '') != ''){
    					
    					if( m_record.get("PROD_CODE")    == r_record.get("PROD_CODE")     &&
    						r_record.get("SPIRITUAL_YN") == m_record.get("SPIRITUAL_YN")  &&
    						m_record.get("DONGCHAMJA_GBN") > 1                                   ) {
    						
    						m_record.set("DONGCHAMJA_GBN", (row - moveRow - minusRowCount))
    						break;
    					}else{
    						break;
    					}// end if
    				}
    			}// for moveRow
    			
    			for(moveRow=row+1; moveRow<Number(groupCount)+row; moveRow++){
    				if( moveRow ==  (me.getViewModel().getStore('ds_YDRec').getCount() )){
    					console.log('breask moveRow = ', moveRow-row);
    					r_record.set("DONGCHAMJA_GBN"   , moveRow-row);
    					break;
    				}
    				
    				
    				var m_record = me.getViewModel().getStore('ds_YDRec').getAt(moveRow);
    				var r_record = me.getViewModel().getStore('ds_YDRec').getAt(row);
    				/* 접수종류가 같을경우 만 */
    				if(m_record.get("PROD_CODE") == r_record.get("PROD_CODE")  && m_record.get("SPIRITUAL_YN") == r_record.get("SPIRITUAL_YN") ){
    					
    					m_record.set("LIGHT_NO"         , '');
    					m_record.set("JUNGAK_GBN"       , '');
    					m_record.set("JUNGAK_CD"        , '');
    					m_record.set("PAYMENT_PLAN_AMT" , 0);
    					m_record.set("PAYMENT_AMT"      , 0);
    					m_record.set("DONGCHAMJA_GBN"   , '*');
    					m_record.set("YEONDEUNG_YEAR"   , '');
    					m_record.set('YEONDEUNG_PERIOD' , 0);
    					m_record.set('LIMIT_YN '        , '');
    					
    				}//  if
    				else{
    					console.log('moveRow = ', moveRow-row);
    					r_record.set("DONGCHAMJA_GBN"   , moveRow-row);
    					break;
    				}
    			}
    			
    			/* 남은 동참자가 *일경우 */    			
    			if( moveRow < me.getViewModel().getStore('ds_YDRec').getCount() &&  
    				me.getViewModel().getStore('ds_YDRec').getAt(moveRow).get("DONGCHAMJA_GBN") == '*' ){
    				
    				var rec_count = me.getViewModel().getStore('ds_YDRec').getCount();
    				for(var b=moveRow ; b<rec_count; b++){
    					var b_record = me.getViewModel().getStore('ds_YDRec').getAt(b);
        				var r_record = me.getViewModel().getStore('ds_YDRec').getAt(row);
        				
        				if( b_record.get("PROD_CODE") == r_record.get("PROD_CODE") &&  b_record.get('DONGCHAMJA_GBN') == '*'){
        					
        					b_record.set('JUNGAK_GBN'       , 'I');
        					b_record.set('JUNGAK_CD'        , ' ');
        					b_record.set('DONGCHAMJA_GBN'   , '1');
        					
        					
        					var findRecord = me.getViewModel().getStore('ds_YDKindInfo').findRecord('PROD_CODE', r_record.get("PROD_CODE"), 0, false, true, true);
        					b_record.set('YEONDEUNG_PERIOD'   , findRecord.get("PERIOD"));
        					b_record.set('PAYMENT_PLAN_AMT'   , findRecord.get("PROD_AMT") * findRecord.get("PERIOD"));
        					b_record.set('PAYMENT_AMT'        , findRecord.get("PROD_AMT") * findRecord.get("PERIOD"));
        					b_record.set('BASE_PAYMENT_AMT'   , findRecord.get("PROD_AMT") );
        					b_record.set('LIMIT_YN'           , 'T');
        					
        					
        					b_record.set('YEONDEUNG_YEAR'     , exCommon.getNowYear());
        					console.log(b,  '------------->');
        					console.log( b_record);
        				}
        				
    				}//
    			}//
    		}else{
    			try{
    				record.set("DONGCHAMJA_GBN", record.previousValues.DONGCHAMJA_GBN)
				}catch (e) {}
    		}
    		
    		me.inTtoAmtCalc();
    	}
    	
    	return false;
    },
    onDelAll : function() {
		var me = this;
		exCommon.gridRemove(me, 'rec001w_02_dd', 'ds_YDRec',true, true);

		/*me.inFirstAmtCalc();
		me.inPaymentAmtCalc();
		me.inMisuAmtCalc();*/
		me.inTtoAmtCalc();
	},
	onDelete : function(){
		var me = this;
		

		var storeNm = "ds_YDRec";
		var gridNm  = "rec002w_02_dd";
		
		
		var cancel_record = me.lookupReference(gridNm).getView().getSelectionModel().getSelection()[0];
		
		if(cancel_record == undefined){
			exCommon.msgAlert('취소를 기도를 선택하세요.');
			return false;
		}
		var row        = me.lookupReference('rec002w_02_dd').getStore().indexOf(cancel_record);
		var groupCount = me.getViewModel().getStore('ds_YDRec').getAt(row).get('DONGCHAMJA_GBN');
		
		
		if(!isNaN(groupCount)){
			
			for(var a=row; a< groupCount+row; a++){
				
				if(a == me.getViewModel().getStore('ds_YDRec').getCount()){
					break;
				}
				
				var r_record = me.getViewModel().getStore('ds_YDRec').getAt(row);
				var a_record = me.getViewModel().getStore('ds_YDRec').getAt(a);
				
				
				if(r_record.get("PROD_CODE") == a_record.get("PROD_CODE")){
					
					var findRecord = me.getViewModel().getStore('ds_YDKindInfo').findRecord('PROD_CODE', r_record.get("PROD_CODE"), 0, false, true, true);
					
					a_record.set('DONGCHAMJA_GBN'  , 1);
					a_record.set('PAYMENT_PLAN_AMT', findRecord.get("PROD_AMT") * findRecord.get("PERIOD"));
					a_record.set('PAYMENT_AMT'     , findRecord.get("PROD_AMT") * findRecord.get("PERIOD"));
					a_record.set('YEONDEUNG_PERIOD'   , findRecord.get("PERIOD"));
					a_record.set('BASE_PAYMENT_AMT'   , findRecord.get("PROD_AMT") );
					a_record.set('LIMIT_YN'           , 'T');
					
				}
			}
		}
		else if(groupCount =="*"){
				
		}
		exCommon.gridRemove( me
						    ,gridNm
						    ,storeNm
						    ,false
						    ,true);
		
	
		me.inTtoAmtCalc();
	},
    
	onSave : function(){
		var me = this;
		
		var dApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r01_12').getValue().rdo_ApprovalGbn_r01_12,1);
		var rowCnt       = exCommon.ChangeCount('ds_YDRec', me);
		
		
		if (rowCnt == 0) {
			exCommon.msgAlert('접수할 기도가 없습니다.');
			return false;
		}
		
		if (!me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation()) return false;
		
		
		var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();		
			ds_acceptRecAmtData.CASH_TYPE = dApprovalGbn;
		
		
		var yd_row = me.getViewModel().getStore('ds_YDRec').getCount();
		for( var row=0; row< yd_row ; row++ ){
			var record  = me.getViewModel().getStore('ds_YDRec').getAt(row);
			
			var DONGCHAMJA_GBN     = exCommon.getRepVal( record.get("DONGCHAMJA_GBN") );
			var YEONDEUNG_PERIOD   = exCommon.getRepNum( record.get("YEONDEUNG_PERIOD") );
			var PAYMENT_PLAN_AMT   = exCommon.getRepNum( record.get("PAYMENT_PLAN_AMT") );
			var PAYMENT_AMT        = exCommon.getRepNum( record.get("PAYMENT_AMT") );
			var BASE_PAYMENT_AMT   = exCommon.getRepNum( record.get("BASE_PAYMENT_AMT") );
			
			if(DONGCHAMJA_GBN != "*"){
				
				if( !exCommon.gridFormVal(me , row , 'ds_YDRec' , 'rec002w_02_dd' , "JUNGAK_NM"      , '연등위치' ) ) {
					return false;
				}
				if( !exCommon.gridFormVal(me , row , 'ds_YDRec' , 'rec002w_02_dd' , "LIGHT_NO"       , '연등번호' ) ) {
					return false;
				}
				if( !exCommon.gridFormVal(me , row , 'ds_YDRec' , 'rec002w_02_dd' , "JUNGAK_CD"      , '연등위치' ) ) {
					return false;
				}
				if( !exCommon.gridFormVal(me , row , 'ds_YDRec' , 'rec002w_02_dd' , "YEONDEUNG_YEAR" , '연년' ) ) {
					return false;
				}
				
				if( ! isValidYear(  exCommon.getRepVal( record.get("YEONDEUNG_YEAR") , "")  ) ){
					exCommon.msgAlert('동참년도를 정확하게 입력하시기 바랍니다.');
					me.lookupReference('rec002w_02_dd').getView().select(row);
					return false;
				}
				
				if( !exCommon.gridFormVal(me , row , 'ds_YDRec' , 'rec002w_02_dd' , "YEONDEUNG_MONTH" , '연등 월' ) ){
					return false;
				}
				if( ! isValidMonth(  exCommon.getRepVal( record.get("YEONDEUNG_MONTH") , "")  ) ){
					exCommon.msgAlert('유효하지 않은 월 입니다.');
					me.lookupReference('rec002w_02_dd').getView().select(row);
					return false;
				}
				
				if(YEONDEUNG_PERIOD < 1){		
					exCommon.msgAlert('연등기간은 1이상이어야 합니다.');
					me.lookupReference('rec002w_02_dd').getView().select(row);
					return false;
				}
				
				if(dApprovalGbn == "3"){
					
					if(PAYMENT_PLAN_AMT == 0){
						me.lookupReference('rec002w_02_dd').getView().select(row);
						exCommon.msgAlert('CMS접수 경우에는 동참금 필수입력입니다.');
						return false;
					}
					
					if( PAYMENT_PLAN_AMT % YEONDEUNG_PERIOD == 0){
						var dOncePayment = PAYMENT_PLAN_AMT / YEONDEUNG_PERIOD;
						
						if( PAYMENT_AMT % dOncePayment  != 0 ){
							var msg = "CMS 출금인 경우<br>납부금액은 월납부금액인 "+ dOncePayment + "원<br>단위로 만 가능합니다.";
							exCommon.msgAlert(msg);
							me.lookupReference('rec002w_02_dd').getView().select(row);
							return false;
						}
					}else{
						exCommon.msgAlert('CMS로 분납 할 경우 총 접수액 / 기간의 나머지는 0이어야 합니다.');
						me.lookupReference('rec002w_02_dd').getView().select(row);
						return false;
					}
					
					if( Number(PAYMENT_PLAN_AMT) < Number(PAYMENT_AMT) ){
						exCommon.msgAlert('CMS 접수 경우에 납부금액은 동참금보다 클수 없습니다.');
						me.lookupReference('rec002w_02_dd').getView().select(row);
						return false;
					}
					
				}// dApprovalGbn
				
				
			}// DONGCHAMJA_GBN
			
		}// for
		
		
		var smsInfo = me.getView().down('[xtype=rec000w_03]').getController().inSmsInfo();
		
		if (smsInfo.SMS_YN == "T" || smsInfo.SMS_YN == true) {
			if( exCommon.getRepVal(smsInfo.MOBILE_TELNO1  ,"") == "" || 
				exCommon.getRepVal(smsInfo.MOBILE_TELNO2  ,"") == "" ||  
				exCommon.getRepVal(smsInfo.MOBILE_TELNO3  ,"") == ""    ){
				
				exCommon.msgAlert('발송전화번호를 입력하시기 바랍니다.');
				return false;
			}
			me.inSendMessage(smsInfo);
			ds_acceptRecAmtData.SMS_YN = 'T';
		}
		
		
		var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_r01_12').getValue().rdo_ApprovalGbn_r01_12;
		console.log('rdo_ApprovalGbn = ', rdo_ApprovalGbn);
		
		if(rdo_ApprovalGbn == 2){ // 카드결제일때
			console.log('카드결제창');
			//cardPay
			
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_YDRec').getCount(); i++){
				var record = me.getViewModel().getStore('ds_YDRec').getAt(i).data;
				
				record.PgCardPopupGbn = '1';
				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
				record.ACCEPT_GBNTXT  = record.LIGHT_NM;
				
				record.EMAIL 		 = daejuRecord.get("EMAIL");
				record.MOBILE_TELNO1 = daejuRecord.get("MOBILE_TELNO1");
				record.MOBILE_TELNO2 = daejuRecord.get("MOBILE_TELNO2");
				record.MOBILE_TELNO3 = daejuRecord.get("MOBILE_TELNO3");
				record.BUYER_NAME    = daejuRecord.get("NAME_KOR");
				record.CARD_BUD_NO   = ds_acceptRecAmtData.PROPOSAL_BUD_NO;
				
				
				array[i] = record;
			//	console.log(record);
				
			}// for i
			
			setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.cardPay',  array, me.onSaveCard);
	       	},100);
			return;
		}
		
		
		if (ds_acceptRecAmtData.APPROVAL_GBN != 3) {
			ds_acceptRecAmtData.APPROVAL_GBN = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r01_12').getValue().rdo_ApprovalGbn_r01_12,1);
		}
		
		if(dApprovalGbn == 3){
			if( exCommon.getRepVal(ds_acceptRecAmtData.MOBILE_TELNO1  ,"BANK_NO") 		 == "" || 
				exCommon.getRepVal(ds_acceptRecAmtData.MOBILE_TELNO2  ,"ACCOUNT_NUMBER") == "" ||  
				exCommon.getRepVal(ds_acceptRecAmtData.MOBILE_TELNO3  ,"") 				 == ""     ){
				
				exCommon.msgAlert('CMS 계좌를 선택하세요.');
				return false;
			}
			
			var me_juminNo = exCommon.getRepVal(ds_acceptRecAmtData.MOBILE_TELNO1  ,"JUMIN_NO");
			if(me_juminNo.length == 10 && !gf_BizNoCheck(me_juminNo)){
				exCommon.msgAlert('유효하지 않은 사업자 등록번호 입니다.');
				return false;
			}
		}
		
		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
		me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
		
		exCommon.addParamSetting(me, 'ds_YDRec'        ,'ds_YDRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?',function(btn) {
			if (btn == 'yes') {
				me.callForm(me,'/rec/REC001W_02/save.suvila',me.onSaveCallback, false);
			}
		});
	},
	onSaveCard  : function(cardPayInfo, me){
		console.log('cardPayInfo = ', cardPayInfo);
		
		
		var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
		ds_acceptRecAmtData.APPROVAL_GBN = '2';
		ds_acceptRecAmtData.CASH_TYPE    = '2';
		
		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
		me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
		
		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
		me.getViewModel().getStore('ds_pgCardInfo').add(cardPayInfo);
		
		

		exCommon.addParamSetting(me, 'ds_YDRec'        ,'ds_YDRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC001W_02/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
	onSaveCallback : function(me, success, form, action) {
		exCommon.fnGridSaveCallback(me, success, action,'ds_YDRec');
		
		if (success) {
			me.getViewModel().getStore('ds_YDRec').removeAll();
			me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
			me.getViewModel().getStore('ds_sms').removeAll();
			me.getViewModel().getStore('ds_pgCardInfo').removeAll();

			me.getViewModel().getStore('ds_YDRec').commitChanges();
			me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
			me.getViewModel().getStore('ds_sms').commitChanges();
			me.getViewModel().getStore('ds_pgCardInfo').commitChanges();

			me.getViewModel().getStore('ds_YDKindInfo').rejectChanges();
    		me.getViewModel().getStore('ds_familySelInfo').rejectChanges();
    		me.getViewModel().getStore('ds_spiritSelInfo').rejectChanges();
			
			/*me.inFirstAmtCalc();
			me.inPaymentAmtCalc();
			me.inMisuAmtCalc();*/
    		me.inTtoAmtCalc();
			
    		me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
		}
	},
	inSendMessage : function(smsInfo) {
		var me = this;

		me.getViewModel().getStore('ds_sms').removeAll();

		var mobileTelno = smsInfo.MOBILE_TELNO1+ smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
		var recAmtInfo  = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();

		// 연등문자
		var rCnt = me.getViewModel().getStore('ds_YDRec').getCount();
		console.log('rCnt = ', rCnt);
		
		
		for (var i = 0; i < rCnt; i++) {
			var record		   = me.getViewModel().getStore('ds_YDRec').getAt(i);
			var DONGCHAMJA_GBN = exCommon.getRepVal( record.get("DONGCHAMJA_GBN") );
			
			if(DONGCHAMJA_GBN != "*"){
				var smsNum = i;

				var fMessage  = "[" + exCommon.user.templeNm + "("+ (smsNum + 1) + ") ";
				    fMessage += record.get("LIGHT_NM")+ " "+record.get("LIGHT_NO")+ "번 ] ";

				var bMessage = "동참(예약)되었습니다. 성불하세요";
				if ( exCommon.getRepNum(record.get("PAYMENT_AMT"))  > 0) {
					bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+ "원 보시하셨습니다. 성불하세요.";
				}

				var data = {
					TR_ID 			: "4",
					TR_SENDSTAT 	: "0",
					TR_PHONE 		: mobileTelno,
					TR_DEST_INFO 	: recAmtInfo.PROPOSAL_BUD_NM + "^"+ mobileTelno,
					TR_SMS_YN 		: "T",
					TR_CALLBACK 	: exCommon.user.tel, // telno
					TR_ETC1 		: exCommon.user.templeCd,
					TR_ETC2 		: recAmtInfo.PROPOSAL_BUD_NO,
					TR_ETC3 		: "SMSREC",
					TR_ETC4 		: "4",
					TR_ETC5 		: exCommon.user.userId,
					TR_MESSAGE 		: fMessage + " " + bMessage
				}
				console.log(data);
				me.getViewModel().getStore('ds_sms').add(data);
			}
			
			
		}// for
	},
    inDisalbedCms : function(){
    	return true;    	
    },
    inTtoAmtCalc  : function(){
    	var me = this;
    	
    	var me_totPaymentPlanAmt = 0;
    	var me_totPaymentAmt     = 0;
    	var me_misuAmt           = 0;
    	
    	
    	for(var i = 0; i < me.getViewModel().getStore('ds_YDRec').getCount() ; i++){
    		var record = me.getViewModel().getStore('ds_YDRec').getAt(i)
    		
    		me_totPaymentPlanAmt += exCommon.getRepNum( record.get("PAYMENT_PLAN_AMT") );
    		me_totPaymentAmt     += exCommon.getRepNum( record.get("PAYMENT_AMT") );    		
    	}// for
    	
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt',me_totPaymentPlanAmt);
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt',me_totPaymentAmt);
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt', (me_totPaymentPlanAmt -me_totPaymentAmt));
    },
    inFirstAmtCalc : function(){
    	var me = this;
		var me_totPaymentPlanAmt = 0;
		try {
			
			me_totPaymentPlanAmt = parseInt(exCommon.getRepNum(me.getViewModel().getStore('ds_YDRec').sum('PAYMENT_PLAN_AMT')));
			
		} catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt',me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
		var me_totPaymentAmt = 0;
		try {
			
			var yd_sum = parseInt(exCommon.getRepNum(me.getViewModel().getStore('ds_YDRec').sum('PAYMENT_AMT')));
			
			me_totPaymentAmt =  yd_sum;
			
			
		} catch (e) {}
		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt',me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
		var me_misuAmt = 0;
		try {

			me_misuAmt = parseInt(exCommon.getRepNum(me.getViewModel().getStore('ds_YDRec').sum('PAYMENT_PLAN_AMT'))) - 
						 parseInt(exCommon.getRepNum(me.getViewModel().getStore('ds_YDRec').sum('PAYMENT_AMT')));
		} catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt', me_misuAmt);
    },
    inRecTabClick : function(me , type){
    	
   		me.lookupReference('rec002w_02_dd').setHidden(false);
    },
    callSetRecType : function(){
		return 4;
	}
    
})
