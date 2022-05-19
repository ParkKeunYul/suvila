Ext.define('ExFrm.view.rec.rec022w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec022w_02',
    onCalled:function(params){},
    onInit:function(){
    	var me = this;
    },
    onAfterRender:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_WBKindInfo', '', {V_ACCEPT_GBN : "12"} ,me.dsWBCallback);
    	},650);
    	
    },   
    dsWBCallback : function(me, success, form, action){
    	me.lookupReference('rec022w_02_a').getView().select( 0 );
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
    	//me.getViewModel().getStore('body_FamilyInfo').add(record);
    	
    	for(var i = 0; i<family.length; i++ ){
    		me.getViewModel().getStore('ds_familySelInfo').add( family[i] );
    		me.getViewModel().getStore('ds_familySelInfo').getAt(i).set("SEL_YN", false);
    	}// for
    	
    	for(var i = 0; i<spirit.length; i++ ){
    		me.getViewModel().getStore('ds_spiritSelInfo').add( spirit[i] );
    		me.getViewModel().getStore('ds_spiritSelInfo').getAt(i).set("SEL_YN", false);
    	}// for
    	
    	
    	me.lookupReference('rec022w_02_c').getView().select( 0 );
    	me.lookupReference('rec022w_02_b').getView().select( 0 );
    	
    	console.log('ds_spiritSelInfo = ',me.getViewModel().getStore('ds_spiritSelInfo').getCount() );
    	
    },
    dsBokwiCallback : function(me, success, form, action){
    	console.log('dsBokwiCallback');
    	for(var a=0; a<me.getViewModel().getStore('ds_spiritSelInfo').getCount();a++){
			me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).set('SEL_YN' , true);
		}// for
    	
    },
    onDelAll : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec002w_02_b', 'ds_WBRec' , true , true);
    	
    	me.inTtoAmtCalc();
    },
    wbCheckchange : function(column, recordIndex, checked){
    	var me = this;
    	
        var store = me.getViewModel().getStore('ds_WBKindInfo');
        
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
    	}else if(SEL_DEATH_YN == "T"){
    		dsStoreNm = "ds_spiritSelInfo";
    		me.lookupReference('familyTab').setActiveItem(1);
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
    			//faminlySelInfoCount ++;
    			me.getViewModel().getStore('ds_FamilyTemp').add(record);
    		}
    	}// for
    	
    	
    	if( me.getViewModel().getStore('ds_FamilyTemp').getCount()  == 0){
    		me.getViewModel().getStore('ds_WBKindInfo').rejectChanges();
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_recKindTemp').removeAll();
    	
    		
		var cnt = me.getViewModel().getStore('ds_WBKindInfo').getCount();
		
		for (var i = 0; i < cnt; i++) {
			var record = me.getViewModel().getStore('ds_WBKindInfo').getAt(i);
			
			if(record.get("SEL_YN")){
				//console.log('ds_IDKindInfo = ', record);
				me.getViewModel().getStore('ds_recKindTemp').add(record);
			}
		}// for
		
		if( me.getViewModel().getStore('ds_recKindTemp').getCount()  == 0){
			me.getViewModel().getStore('ds_WBKindInfo').rejectChanges();
			return false;
		}
		
		/**
		 * 
		 *  dsRec      = ds_IDRec;
			dsRecTemp  = ds_IDRecTemp;
			dsKindInfo = ds_IDKindInfo;
		 * 
		 */
		
		
		var dApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r22_02').getValue().rdo_ApprovalGbn_r22_02,1);
		
		
		me.getViewModel().getStore('dsRecTemp').removeAll();
		
		recKindInfoCount    = me.getViewModel().getStore('ds_recKindTemp').getCount() ;
		faminlySelInfoCount = me.getViewModel().getStore('ds_FamilyTemp').getCount() ;
		
		for(var a=0; a<recKindInfoCount; a++){
			var dsKindInfo = me.getViewModel().getStore('ds_recKindTemp').getAt(a);
			
			console.log('dsKindInfo = ', dsKindInfo);
			
			for(var b=0; b<faminlySelInfoCount; b++){
				var familyInfo = me.getViewModel().getStore('ds_FamilyTemp').getAt(b);
				
				
				var SORT       = me.getViewModel().getStore('ds_WBRec').getCount() + (me.getViewModel().getStore('dsRecTemp').getCount() + 1);
				var PROD_CODE  = dsKindInfo.get("PROD_CODE");
				var NAME_KOR   = familyInfo.get("NAME_KOR");
				var IMG_NORMAL = "N";
				var IMG_DETAIL = "S";
				var CMS_TYPE   = dApprovalGbn;
				
				
				var dPamt      = dsKindInfo.get("PROD_AMT");
				var dPeriod    = dsKindInfo.get("PERIOD");
				console.log(dPeriod);
				
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
				var MISU_AMT         = 0;
				var PERIOD_MONTH   = exCommon.getRepVal(dsKindInfo.get("PERIOD"),"");
				var SPIRITUAL_YN     = 1;
				
				if( dsKindInfo.get("DEATH_YN") == "T" ){
					SPIRITUAL_YN = 2;
				}    				
				
				/* 가족등이고 대표일경우 동참자수 입력 */
				if(FAMILY_YN == "T" && b == 0){
					/*console.log('shift === > ', 1);
					console.log('dPamt =  ', dPamt);
					console.log('dPeriod =  ', dPeriod);
					console.log('dPamt * dPeriod =  ', dPamt * dPeriod);*/
					
					JUNGAK_GBN       = "I";
					JUNGAK_CD        = " ";
					PAYMENT_PLAN_AMT = dPamt;
					PAYMENT_AMT      = dPamt;
					DONGCHAMJA_GBN   = faminlySelInfoCount;
					BASE_PAYMENT_AMT = dPamt;
					PERIOD_MONTH     = dPeriod;
					
				}else if( FAMILY_YN == "T" && b != 0 ){
					DONGCHAMJA_GBN  = "*";	
		       		JUNGAK_GBN      = "";   
		       		JUNGAK_CD	    = "";    
					PERIOD_MONTH  = "";	 
				}else{
					
					PAYMENT_PLAN_AMT = dPamt;
					PAYMENT_AMT      = dPamt;
					JUNGAK_GBN       = "I";
					JUNGAK_CD        = " ";
					BASE_PAYMENT_AMT = dPamt;
					PERIOD_MONTH   = dPeriod;
					
				}// if 
				
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
    				,BASE_PAYMENT_AMT : BASE_PAYMENT_AMT
    				,PAYMENT_AMT      : PAYMENT_AMT
    				,MISU_AMT         : MISU_AMT
    				,PERIOD_MONTH   : PERIOD_MONTH
    				,SPIRITUAL_YN     : SPIRITUAL_YN
				} 
				
				console.log('dsRecTemp data = ',data);
				
				
				me.getViewModel().getStore('dsRecTemp').add(data);
			}// for b
		}// for a
		
		/* 중복된 데이터 제거 */
		var prodGbn     = "";
		var budNm       = ""; 
		var prodGbnTemp = "";
		var budNmTemp   = "";
		
		
		var dsRecCnt     =  me.getViewModel().getStore('ds_WBRec').getCount();
		var dsRecTempCnt =  me.getViewModel().getStore('dsRecTemp').getCount();
		
		//console.log('dsRecTempCnt = ', dsRecTempCnt);
		
		for(var d=0; d<dsRecCnt; d++){
			
			for(var c= (dsRecTempCnt-1) ; c>=0; c--){
				prodGbnTemp = me.getViewModel().getStore('dsRecTemp').getAt(c).get("PROD_CODE");
				budNmTemp   = me.getViewModel().getStore('dsRecTemp').getAt(c).get("BOKWIJA_NO") + me.getViewModel().getStore('dsRecTemp').getAt(c).get("DONGCHAM_BUD_NO");
				
				
				prodGbn     = me.getViewModel().getStore('ds_WBRec').getAt(d).get("PROD_CODE");
				budNm       = me.getViewModel().getStore('ds_WBRec').getAt(d).get("BOKWIJA_NO") + me.getViewModel().getStore('ds_WBRec').getAt(d).get("DONGCHAM_BUD_NO");
				if((prodGbn == prodGbnTemp) && (budNm == budNmTemp)){
					me.getViewModel().getStore('dsRecTemp').remove( me.getViewModel().getStore('dsRecTemp').getAt(c) ); 
					dsRecTempCnt = me.getViewModel().getStore('dsRecTemp').getCount();
				}
				
			}// for c
		}// for d
		
		
		console.log('dsRecTempdsRecTemp = ', me.getViewModel().getStore('dsRecTemp').getCount());
		
		for(var i = 0; i < me.getViewModel().getStore('dsRecTemp').getCount() ; i++){
			me.getViewModel().getStore('ds_WBRec').add( me.getViewModel().getStore('dsRecTemp').getAt(i));
		}// for i
		
		me.getViewModel().getStore('ds_WBKindInfo').rejectChanges();
		me.getViewModel().getStore('ds_familySelInfo').rejectChanges();
		me.getViewModel().getStore('ds_spiritSelInfo').rejectChanges();
    		
    	me.inTtoAmtCalc();
    },
    onCellClickWB : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	
    	var me = this;
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        
        me.inCellClick(me , record, clickedDataIndex  , "12");
    },
    inCellClick : function(me, record ,clickedDataIndex , ACCEPT_GBN ){
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
        		,V_ACCEPT_GBN  : ACCEPT_GBN
        		
        	};
       		me.openPopup('ExFrm.view.rec.rec000p_04',  param, me.onWbJungGakReceive);
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
        		 ,V_ACCEPT_GBN  : ACCEPT_GBN
        	     ,record        : record
        	}
        	setTimeout(function(){
        		me.callStore(me, 'ds_deungID', '', params ,me.dsDeungCallback);
        	},50);
        }else if(clickedDataIndex == "IMG_DETAIL"){
        	
        	if(record.get("DONGCHAMJA_GBN") == "*"){
        		return false;
        	}
        	
        	var JUNGAK_CD  = exCommon.getRepVal( record.get("JUNGAK_CD"),"" );
        	
        	var params = {
          		  V_JUNGAK_CD   : JUNGAK_CD
          		 ,V_ACCEPT_GBN  : ACCEPT_GBN
          	     ,V_LIGHT_NO    : LIGHT_NO
          	     ,V_JUNGAK_GBN  : JUNGAK_GBN
          	}
        	
       		me.openPopup('ExFrm.view.rec.rec000p_03',  params, me.onWbDetailReceive);
        	
        	
        	
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
    onWbJungGakReceive : function(params , me){
    	var recordWB = me.lookupReference('rec022w_02_d').getView().getSelectionModel().getSelection()[0];
    	
    	console.log('onWbJungGakReceive  = ', params);
    	console.log('recordWB            = ', recordWB);
    	
    	recordWB.set("JUNGAK_CD", params.JUNGAK_CD);
    	recordWB.set("JUNGAK_NM", params.JUNGAK_NM);
    },
    onWbDetailReceive : function( params , me ){
    	console.log('onIdDetailReceive = ', params);
    	
    	var record       = me.lookupReference('rec022w_02_d').getView().getSelectionModel().getSelection()[0];
    	console.log('record = ', record);
    	
    	var RESERVATION_YN = exCommon.getRepVal(params.RESERVATION_YN);
    	
    	if("F" == RESERVATION_YN){
    		record.set("JUNGAK_CD"  , "");
    		record.set("JUNGAK_NM"  , "");
    		record.set("LIGHT_NO"   , "");
    		record.set("JUNGAK_GBN" , "I");
    		return false;
    	}
    	
    	record.set("JUNGAK_CD"  , params.JUNGAK_CD);
    	record.set("JUNGAK_NM"  , params.JUNGAK_NM);
    	record.set("LIGHT_NO"   , params.LIGHT_NO);
    	record.set("ACCEPT_GBN" , params.ACCEPT_GBN);
    	record.set("JUNGAK_GBN" , params.JUNGAK_GBN);
    	
    },
    onBeforeeditWB : function( editor, context, eOpts ){
    	var me = this;
    	
    	var record  = me.getViewModel().getStore('ds_WBRec').getAt(context.rowIdx);
    	var COL_IDX = context.colIdx ;
    	var column  = context.field;
    	
    	if(record.get("FAMILY_YN") == "F" && column =="DONGCHAMJA_GBN"){
    		return false;
    	}
    	
    	if(record.get("DONGCHAMJA_GBN") == "*"){
    		return false;
    	}
    	
    	if( column == "LIGHT_NO" ||  column == "REMARK" ||  column == "PAYMENT_PLAN_AMT" ||  column == "PAYMENT_AMT" ||  column == "DONGCHAMJA_GBN"){
    		return true;
    	}
    	
    	return false;
    },
    onEditWB : function(editor, context, eOpts) {
    	
    	
    	var me = this;
    	
    	var column  = context.field;
    	
    	var record = me.getViewModel().getStore('ds_WBRec').getAt(context.rowIdx);
    	
    	var groupCount     = "";
    	var backGroupCount = "";
    	
    	var EDIT_IDX  = context.rowIdx;
    	var LAST_IDX  = 0;
    	var ID_CNT    = me.getViewModel().getStore('ds_WBRec').getCount();
    	var TOT_IDX   = 0;
    	    	    	    	
    	var PAYMENT_PLAN_AMT = parseInt(record.get("PAYMENT_PLAN_AMT"));
		var PAYMENT_AMT 	 = parseInt(record.get("PAYMENT_AMT"));
		var BASE_PAYMENT_AMT = record.get("BASE_PAYMENT_AMT");
		var PROD_CODE        = record.get("PROD_CODE");    			
		var PERIOD_MONTH     = record.get("PERIOD_MONTH");
		var JUNGAK_GBN       = record.get("JUNGAK_GBN");
    	
		
		if(column == "PAYMENT_PLAN_AMT" ||  column == "PAYMENT_AMT"){
			record.set("MISU_AMT"     , PAYMENT_PLAN_AMT - PAYMENT_AMT );
    		me.inTtoAmtCalc();
		}
		else if( column == "DONGCHAMJA_GBN" ){
    		
    		groupCount = record.get("DONGCHAMJA_GBN");
    		if(!isNaN(groupCount)){
    			
    			if(record.get("DONGCHAMJA_GBN") != "*"){
    				
    				var TOT_CNT   = 0;
    				
    				for(var i = EDIT_IDX; i < ID_CNT ; i ++ ){
    					var EQ_PROD_CODE = me.getViewModel().getStore('ds_WBRec').getAt(i).get("PROD_CODE");
    					
    					if(EQ_PROD_CODE == PROD_CODE){
    						TOT_CNT++;
    						LAST_IDX = i;
    					}// if
        			}// for
    				
    				TOT_IDX = TOT_CNT;
    				if(groupCount > TOT_CNT ){  
    					groupCount = TOT_CNT;
    					record.set("DONGCHAMJA_GBN" , groupCount);
    				}
    				
    				var DONGCHAMJA_CNT  = 1;
    				
    				
    				var flag;
    				var inCount  = groupCount;
    				
    				console.log('EDIT_IDX = ', EDIT_IDX);
    				
    				for(var i = EDIT_IDX; i <= LAST_IDX ; i ++ ){ 
    					flag = false;
    					
    					var data = me.getViewModel().getStore('ds_WBRec').getAt(i);
    					inCount--;
    					
	    				if(i == EDIT_IDX){
	    					data.set("DONGCHAMJA_GBN", groupCount);
	    					flag = true;
	    				}else if(inCount >=0 ){
	    						data.set("DONGCHAMJA_GBN", "*");
						}else{
							data.set("DONGCHAMJA_GBN", 1);
							flag = true;
						}
    					
    					if(flag){
    						
    						data.set("PAYMENT_PLAN_AMT" , PAYMENT_PLAN_AMT);
    						data.set("PAYMENT_AMT"      , PAYMENT_AMT);    						
    						data.set("PERIOD_MONTH"     , PERIOD_MONTH);
    						data.set("JUNGAK_GBN"       , JUNGAK_GBN);
							data.set("PAYMENT_AMT"      , "0");
							data.set("BASE_PAYMENT_AMT" , BASE_PAYMENT_AMT);
    					}else{
    						data.set("PAYMENT_PLAN_AMT" , "");
    						data.set("PAYMENT_AMT"      , "");
    						data.set("BASE_PAYMENT_AMT" , "");
    						data.set("PERIOD_MONTH"     , "");
    						data.set("JUNGAK_GBN"       , "");
    					}
    				}// for
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
		exCommon.gridRemove(me, 'rec022w_02_d', 'ds_WBRec',true, true);

		me.inTtoAmtCalc();
	},
	onDelete : function(){
		var me = this;

		

		var storeNm = "ds_WBRec";
		var gridNm  = "rec022w_02_d";
		var cancel_record = me.lookupReference(gridNm).getView().getSelectionModel().getSelection()[0];
		
		if(cancel_record == undefined){
			exCommon.msgAlert('취소를 기도를 선택하세요.');
			return false;
		}
		
		var sel_row       = me.lookupReference(gridNm).getStore().indexOf( sel_row );
		var cnt           = me.lookupReference(gridNm).getStore().getCount();
		
		
		for(var a = (cnt-1) ; a >= 0 ; a--){
			var a_record   = me.lookupReference(gridNm).getStore().getAt(a);
			if( a_record.get("PROD_CODE") ==  cancel_record.get("PROD_CODE") ){
				me.lookupReference(gridNm).getStore().remove(a_record);
				
			}
		}// for
		
		
		for(var a = 0 ; a< me.getViewModel().getStore(storeNm).getCount() ; a++  ){
			me.getViewModel().getStore(storeNm).getAt(a).set("SORT", (a+1));
		}// for
		
		me.inTtoAmtCalc();
	},
	onSave : function(){
		var me = this;
		
		var dApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r22_02').getValue().rdo_ApprovalGbn_r22_02,1);
		
		var rowCnt = exCommon.ChangeCount('ds_WBRec', me);
		
		if (rowCnt == 0) return false;
		
		
		if (!me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation()) return false;
		
		
		var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();		
			ds_acceptRecAmtData.CASH_TYPE = dApprovalGbn;
		
		/* 결재구분 현금결재 및 카드결재 외 일경우   ==> 생략 */ 
		
		var id_row = me.getViewModel().getStore('ds_WBRec').getCount();
		
		for( var row=0; row< id_row ; row++ ){
			var record 		   = me.getViewModel().getStore('ds_WBRec').getAt(row);
			
			var DONGCHAMJA_GBN   = exCommon.getRepVal( record.get("DONGCHAMJA_GBN") );
			var PERIOD_MONTH     = exCommon.getRepNum( record.get("PERIOD_MONTH") );
			var PAYMENT_PLAN_AMT = exCommon.getRepNum( record.get("PAYMENT_PLAN_AMT") );
			var PAYMENT_AMT      = exCommon.getRepNum( record.get("PAYMENT_AMT") );
			var BASE_PAYMENT_AMT = exCommon.getRepNum( record.get("BASE_PAYMENT_AMT") );
			
			
			if(DONGCHAMJA_GBN != "*"){
				if( !exCommon.gridFormVal(me , row , 'ds_WBRec' , 'rec022w_02_d' , "JUNGAK_CD"    , '원불위치' ) ){
					return false;
				}
				if( !exCommon.gridFormVal(me , row , 'ds_WBRec' , 'rec022w_02_d' , "LIGHT_NO"     , '원불번호' ) ){
					return false;
				}		
			}// if DONGCHAMJA_GBN
		}// for id_row
		
		
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
		
		var rdo_ApprovalGbn = exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r22_02').getValue().rdo_ApprovalGbn_r22_02,1);
		ds_acceptRecAmtData.APPROVAL_GBN = rdo_ApprovalGbn;
		
		
		if(rdo_ApprovalGbn == 2){ 
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_WBRec').getCount(); i++){
				var record = me.getViewModel().getStore('ds_WBRec').getAt(i).data;
				
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
			}// for i
			
			setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.cardPay',  array, me.onSaveCard);
	       	},100);
			return;
		}
		
		
		
		
		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
		me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
		
		exCommon.addParamSetting(me, 'ds_WBRec'        ,'ds_WBRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?',function(btn) {
			if (btn == 'yes') {
				me.callForm(me,'/rec/REC022W_02/save.suvila',me.onSaveCallback, false);
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
		
		

		exCommon.addParamSetting(me, 'ds_WBRec'        ,'ds_WBRec');
		exCommon.addParamSetting(me, 'ds_acceptRecAmt' ,'ds_acceptRecAmt');
		exCommon.addParamSetting(me, 'ds_sms'          ,'ds_sms');
		exCommon.addParamSetting(me, 'ds_pgCardInfo'   ,'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC022W_02/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
	onSaveCallback : function(me, success, form, action) {
		exCommon.fnGridSaveCallback(me, success, action,'ds_WBRec');
		
		if (success) {
			me.getViewModel().getStore('ds_WBRec').removeAll();
			me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
			me.getViewModel().getStore('ds_sms').removeAll();
			me.getViewModel().getStore('ds_pgCardInfo').removeAll();

			me.getViewModel().getStore('ds_WBRec').commitChanges();
			me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
			me.getViewModel().getStore('ds_sms').commitChanges();
			me.getViewModel().getStore('ds_pgCardInfo').commitChanges();

			me.getViewModel().getStore('ds_WBKindInfo').rejectChanges();
    		me.getViewModel().getStore('ds_familySelInfo').rejectChanges();
    		me.getViewModel().getStore('ds_spiritSelInfo').rejectChanges();
			
    		me.inTtoAmtCalc();
			
    		me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
		}
	},
	inSendMessage : function(smsInfo) {
		var me = this;

		me.getViewModel().getStore('ds_sms').removeAll();

		var mobileTelno = smsInfo.MOBILE_TELNO1+ smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
		var recAmtInfo  = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();

		// 원불 봉안
		var rCnt = me.getViewModel().getStore('ds_WBRec').getCount();
		console.log('rCnt = ', rCnt);
		
		
		for (var i = 0; i < rCnt; i++) {
			var record		   = me.getViewModel().getStore('ds_WBRec').getAt(i);
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
					TR_ID 			: "14",
					TR_SENDSTAT 	: "0",
					TR_PHONE 		: mobileTelno,
					TR_DEST_INFO 	: recAmtInfo.PROPOSAL_BUD_NM + "^"+ mobileTelno,
					TR_SMS_YN 		: "T",
					TR_CALLBACK 	: exCommon.user.tel, // telno
					TR_ETC1 		: exCommon.user.templeCd,
					TR_ETC2 		: recAmtInfo.PROPOSAL_BUD_NO,
					TR_ETC3 		: "SMSREC",
					TR_ETC4 		: "14",
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
    	
    	for(var i = 0; i < me.getViewModel().getStore('ds_WBRec').getCount() ; i++){
    		var record = me.getViewModel().getStore('ds_WBRec').getAt(i)
    		
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
			
			
			for(var i = 0; i < me.getViewModel().getStore('ds_WBRec').getCount() ; i++){
    			var record = me.getViewModel().getStore('ds_WBRec').getAt(i);
    			var MANAGE_PERIOD = exCommon.getRepNum( record.get('MANAGE_PERIOD') )
        		var BASE_AMT      = exCommon.getRepNum( record.get('BASE_AMT') )
    			
        		me_totPaymentPlanAmt += parseInt(MANAGE_PERIOD) * parseInt(BASE_AMT);
    		}// for
			
		} catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt',me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
		var me_totPaymentAmt = 0;
		try{
    		for(var i = 0; i < me.getViewModel().getStore('ds_WBRec').getCount() ; i++){
    			var record = me.getViewModel().getStore('ds_WBRec').getAt(i);
    		
    			me_totPaymentAmt += parseInt(exCommon.getRepNum( record.get('PAYMENT_AMT')) );
    		}// for
    		
    	}catch (e) {}
		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt',me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
		var me_misuAmt = 0;
		try{
    		for(var i = 0; i < me.getViewModel().getStore('ds_WBRec').getCount() ; i++){
    			var record = me.getViewModel().getStore('ds_WBRec').getAt(i);
    			
    			var MANAGE_PERIOD = exCommon.getRepNum( record.get('MANAGE_PERIOD') )
        		var BASE_AMT      = exCommon.getRepNum( record.get('BASE_AMT') )
        		var PAYMENT_AMT   = exCommon.getRepNum( record.get('PAYMENT_AMT') )
        		
        		record.set("PAYMENT_PLAN_AMT", parseInt(MANAGE_PERIOD) * parseInt(BASE_AMT));
        		record.set("MISU_AMT"        , (parseInt(MANAGE_PERIOD) * parseInt(BASE_AMT)) - PAYMENT_AMT);
        		
        		me_misuAmt += (parseInt(MANAGE_PERIOD) * parseInt(BASE_AMT)) - PAYMENT_AMT;
    		}// for
		}catch (e) {}

		me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt', me_misuAmt);
    },
    callSetRecType : function(){
		return 12;
	}
})
