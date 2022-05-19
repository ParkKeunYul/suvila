Ext.define('ExFrm.view.rec.rec004w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec004w_02',
    onSearch:function(params){
        var me = this;
       // console.log('rec004w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	setTimeout(function(){
          	me.callStore(me, 'ds_pgCardUseYn', '', null ,me.dsPgCardCallback);
        },50);
    },
    onAfterRender:function(){
    	var me = this;
    	
    	/*me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();*/
    },
    dsPgCardCallback : function(me, success, form, action){
    	
    	setTimeout(function(){
          	me.callStore(me, 'ds_chonhonKind', '', null ,me.dsChnnhonCallback);
        },50);
    	
    	if(success){
    		var CARD_USE = exCommon.getRepVal( me.getViewModel().getStore('ds_pgCardUseYn').getAt(0).get("CARD_USE"));
    		if(CARD_USE != "T"){
    		
    			me.lookupReference('rdo_ApprovalGbn_r04_02').setReadOnly(true);
    		}
    	}
    },
    dsChnnhonCallback : function(me, success, form, action){
    	console.log('dsChnnhonCallback = ', success);
    	
    	var data ={
    		 TEMPLE_CD        : exCommon.user.templeCd
    		,EVENT_CD         : "0"
    		,SET_YN           : "F"
    		,PAYMENT_PLAN_AMT : 0
    		,PAYMENT_AMT      : 0
    		,MISU_AMT         : 0
    	}
    	me.getViewModel().getStore('ds_detail').add(data);
    },
    onTabChange:function(tappanel, panel){},
    onCallback002:function(params){
    	var me = this;
    	
    	me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
    },
    onShift : function(){
    	var me  = this; 
    	
    	
    	if( !me.getView().down('[xtype=rec000w_02]').getController().inDaejuInfoCheck() ) return false;
    	
    	var recAmtDefault = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();

    	
    	var index = me.getViewModel().getStore('ds_spiritSelInfo').find("SEL_YN", true, 0, false, true, true);
    	
    	if(index < 0){    		
    		return false;
    	}
    	
    	
    	var nowMonth = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	var cnt      = me.getViewModel().getStore('ds_spiritSelInfo').getCount();
    	var wepaeCnt = 0;
    	var sort     = me.getViewModel().getStore('ds_dongChamJa').getCount()+1;
    	
    	
    	for(var i = 0 ; i < cnt ; i++){
    		var record   = me.getViewModel().getStore('ds_spiritSelInfo').getAt(i);
    		var SEL_YN   = record.get("SEL_YN");
    		
    		if(SEL_YN){
    			wepaeCnt++;
    			
    			var tempCnt = me.getViewModel().getStore('ds_dongChamJa').getCount()+1;
    			var findRecord = me.getViewModel().getStore('ds_dongChamJa').findRecord('DUPLE_CHECK', record.get("DUPLE_CHECK"), 0, false, true, true);
    			if(findRecord == null){
	    			var data = {
	    				 TEMPLE_CD        : exCommon.user.templeCd
	    				,ITEMSORT         : ""
	    				,SORT             : sort
	    				,HYO_REL          : record.get("HYO_REL")
	    				,BOKWIJA_NO       : record.get("BOKWIJA_NO")
	    				,BOKWIJA_NM       : record.get("BOKWIJA_NM")
	    				,DECE_REL         : record.get("DECE_REL")
	    				,DECE_BONE        : record.get("BON")
	    				,DECE_BUD_NO      : record.get("BUD_NO")
	    				,DECE_NAME_KOR    : record.get("NAME_KOR")
	    				,DUPLE_CHECK      : record.get("DUPLE_CHECK")
	    			}
	    			me.getViewModel().getStore('ds_dongChamJa').add(data);
	    			sort++;
    			}
    			record.set("SEL_YN", false);    			    			    		
    		}
    	}// for
    	
    	me.getViewModel().getStore('ds_detail').getAt(0).set("WEPAECNT",wepaeCnt );
    	
    	
    	if(exCommon.user.death_type == "2"){
    		/*var temp_row_000031 = ds_dongChamJaTemp.CountRow-spiritualSelInfoCount+1;
    		
    		for(var b=temp_row_000031;b<=spiritualSelInfoCount;b++){
    			ds_dongChamJaTemp.NameValue(b,"DONGCHAMJA_GBN") = "*";
    		} 
    		ds_dongChamJaTemp.NameValue(temp_row_000031,"DONGCHAMJA_GBN") = spiritualSelInfoCount;*/
    	}// if
    	
    	/*me.inFirstAmtCalc();
    	me.inPaymentAmtCalc();
    	me.inMisuAmtCalc();*/
    },
    
    onDelAll : function(){
    	var me = this;
    	exCommon.gridRemove(me, 'rec004w_02_b', 'ds_dongChamJa' , true , true);
    	
    },
    onSave : function(){
    	var me = this;

    	
    	var txt_budNo = me.getView().down('[xtype=rec000w_02]').getController().getTxtBudNo().txt_budNo;
    	if(txt_budNo == null || txt_budNo == "" || txt_budNo == undefined){
    		exCommon.msgAlert('신도를 검색하시기 바랍니다.');
    		return false;
    	}
    	
    	var rowCnt = exCommon.ChangeCount('ds_dongChamJa' , me);
    	if(rowCnt == 0){
    		return false;
    	}
    	
    	
    	var EVENT_CD   = me.getViewModel().getStore('ds_detail').getAt(0).get("EVENT_CD");
    	var EVENT_DATE = me.getViewModel().getStore('ds_detail').getAt(0).get("EVENT_DATE");
    	var EVENT_TIME = me.getViewModel().getStore('ds_detail').getAt(0).get("EVENT_TIME");
    	var SET_YN     = me.getViewModel().getStore('ds_detail').getAt(0).get("SET_YN");
    	
    	
    	//exCommon.addParamSetting(me , 'ds_detail'       , 'ds_detail');
    	//return;
    	
    	if(EVENT_CD == "0"){
    		exCommon.msgAlert('행사명은 필수입력 사항입니다.');
    		return false;
    	}
    	
    	if(EVENT_DATE == "" || EVENT_DATE == "0"){
    		exCommon.msgAlert('입제일은 필수입력 사항입니다.');
    		return false;
    	}
    	
    	/* 행사시간  입력 가능 일때 */
    	if(SET_YN == "T"){
    		
    		if( !exCommon.gridFormVal(me , 0 , 'ds_detail' , 'rec004w_32_c' , "EVENT_TIME"    , '행사시간' ) ){
				return false;
			}
    		
			if( !TimeConfirm( EVENT_TIME ) ){
				return false;
			}
    	}//if
    	
    	
    	
    	var rdo_ApprovalGbn = me.lookupReference('rdo_ApprovalGbn_r04_02').getValue().rdo_ApprovalGbn_r04_02;
    	
    	if( !me.getView().down('[xtype=rec000w_03]').getController().inRecBasicValadation() ) return false;
    	
    	var ds_acceptRecAmtData = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	ds_acceptRecAmtData.CASH_TYPE    = rdo_ApprovalGbn;
    	
    	
    	
    	if(ds_acceptRecAmtData.APPROVAL_GBN != 3){
    		ds_acceptRecAmtData.APPROVAL_GBN = exCommon.getRepVal(rdo_ApprovalGbn, 1);
    	}
    		
    	console.log('ds_acceptRecAmtData = ', ds_acceptRecAmtData);
    		
    	var smsInfo = me.getView().down('[xtype=rec000w_03]').getController().inSmsInfo();
    	if(smsInfo.SMS_YN){
    		me.inSendMessage( smsInfo );
    		ds_acceptRecAmtData.SMS_YN = 'T';
    	}
    	
    	
    	me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    	me.getViewModel().getStore('ds_acceptRecAmt').add(ds_acceptRecAmtData);
    	
    	
    	console.log( me.getViewModel().getStore('ds_detail').getCount() );
    	console.log( me.getViewModel().getStore('ds_detail').getAt(0).data );
    	
    	me.getViewModel().getStore('ds_detail').getAt(0).set("V_CASH_TYPE", rdo_ApprovalGbn);
    	
		console.log('rdo_ApprovalGbn = ', rdo_ApprovalGbn);
    	if(rdo_ApprovalGbn == 2){ 
			var daejuRecord = me.getView().down('[isRootView=true]').getController().callDaejuInfo();
			
			
			var array = new Array();
			for(var i = 0; i< me.getViewModel().getStore('ds_detail').getCount(); i++){
				var record = me.getViewModel().getStore('ds_detail').getAt(i).data;
				var findRocord = me.getViewModel().getStore('ds_chonhonKind').findRecord('EVENT_CD', record.EVENT_CD, 0, false, true, true);
				
				record.PgCardPopupGbn = '1';
				record.ACCEPT_DATE    = ds_acceptRecAmtData.ACCEPT_DATE;
				record.ACCEPT_GBNTXT  = findRocord.get("EVENT_NAME");
				record.EVENT_CD       = record.EVENT_CD;
				
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
    	
    	exCommon.addParamSetting(me , 'ds_dongChamJa'   , 'ds_dongChamJa');
    	exCommon.addParamSetting(me , 'ds_detail'       , 'ds_detail');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' , 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          , 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   , 'ds_pgCardInfo');
    	
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {  
    			me.callForm(me, '/rec/REC004W_02/save.suvila', me.onSaveCallback , false);
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
		

		exCommon.addParamSetting(me , 'ds_dongChamJa'   , 'ds_dongChamJa');
    	exCommon.addParamSetting(me , 'ds_detail'       , 'ds_detail');
    	exCommon.addParamSetting(me , 'ds_acceptRecAmt' , 'ds_acceptRecAmt');
    	exCommon.addParamSetting(me , 'ds_sms'          , 'ds_sms');
    	exCommon.addParamSetting(me , 'ds_pgCardInfo'   , 'ds_pgCardInfo');

		setTimeout(function() {
			me.callForm(me,'/rec/REC004W_02/save.suvila',me.onSaveCallback, false);
		}, 50);
		
	},
    onSaveCallback : function(me, success, form, action){
    	if(success){
    		
    		
    		me.getViewModel().getStore('ds_detail').removeAll();
    		me.getViewModel().getStore('ds_dongChamJa').removeAll();
    		me.getViewModel().getStore('ds_acceptRecAmt').removeAll();
    		me.getViewModel().getStore('ds_sms').removeAll();
    		me.getViewModel().getStore('ds_pgCardInfo').removeAll();
    		
    		
    		me.getViewModel().getStore('ds_detail').commitChanges();
    		me.getViewModel().getStore('ds_dongChamJa').commitChanges();
    		me.getViewModel().getStore('ds_acceptRecAmt').commitChanges();
    		me.getViewModel().getStore('ds_sms').commitChanges();
    		me.getViewModel().getStore('ds_pgCardInfo').commitChanges();
    		
    		me.inFirstAmtCalc();
        	me.inPaymentAmtCalc();
        	me.inMisuAmtCalc();
    		
        	me.getView().down('[xtype=rec000w_02]').getController().onSearchRecCall();
    	}
    	exCommon.fnGridSaveCallback(me, success, action,'ds_detail');
    	
    	var data ={
    		 TEMPLE_CD        : exCommon.user.templeCd
    		,EVENT_CD         : "0"
    		,SET_YN           : "F"
    		,PAYMENT_PLAN_AMT : 0
    		,PAYMENT_AMT      : 0
    		,MISU_AMT         : 0
    	}
    	me.getViewModel().getStore('ds_detail').add(data);
    },
    onEdit : function( editor, context, eOpts ){
    	var me = this;

    	
    	var gCol  = context.colIdx;
    	var gRow  = context.rowIdx;
    	
    	console.log(gCol,'-->' + gRow);
    	
    	var record    = me.getViewModel().getStore('ds_dongChamJa').getAt(context.rowIdx);
    	var ROW_IDX   = context.rowIdx;
    	var TOT_CNT   = me.getViewModel().getStore('ds_dongChamJa').getCount();
    	
    	
    	if(context.colIdx == 3){
    		groupCount = record.get("DONGCHAMJA_GBN");    		
    		if(!isNaN(groupCount)){
    			
    			console.log('if !isNaN(groupCount) ', groupCount);
    			
    			if(ROW_IDX == 0 && groupCount > TOT_CNT ){  
					groupCount = TOT_CNT;
					record.set("DONGCHAMJA_GBN" , groupCount);
				}
    			
    			if(ROW_IDX > 0 && groupCount > (TOT_CNT-ROW_IDX)){
    				groupCount = TOT_CNT-ROW_IDX;
    				record.set("DONGCHAMJA_GBN" , groupCount);
    			}
    			
    			
    			var moveRow       = 0;
    			var minusRowCount = 0;
    			/* 변경한 Row의 위 데이터가 동참자 설정 되었을경우 동참자 수정 */
    			/*for(moveRow=row-1;moveRow>=1;moveRow--){
    				 
    			}*/
    			
    			/*숫자만큼 roop*/
    			/*console.log('groupCount = '+ groupCount);
    			console.log('groupCount+ROW_IDX = ',groupCount+ROW_IDX);*/
    			
    			for(var moveRow = ROW_IDX+1; moveRow < Number(groupCount)+ROW_IDX ; moveRow++){
    				me.getViewModel().getStore('ds_dongChamJa').getAt(moveRow).set("DONGCHAMJA_GBN", "*");    				
    			}// for
    			
    			
    			/* 남은 동참자가 *일경우 */
    			for(var i = moveRow; i < TOT_CNT; i++ ){
    				var subRecood = me.getViewModel().getStore('ds_dongChamJa').getAt(i);
    				if(subRecood.get("DONGCHAMJA_GBN") == "*"){
    					subRecood.set("DONGCHAMJA_GBN", 1);
    				}
    				
    			}// for i
    			
    			/*중간 숫자일경우*/
    			if(gRow > 0){
    				for(var i = 0; i < gRow; i++){
    					if(i == 0){    		
    						me.getViewModel().getStore('ds_dongChamJa').getAt(i).set("DONGCHAMJA_GBN", gRow);
    					}else{
    						me.getViewModel().getStore('ds_dongChamJa').getAt(i).set("DONGCHAMJA_GBN", "*");
    					}
    				}
    			}// if gRow
    		}else{
    			console.log('else !isNaN(groupCount) ', groupCount);
    			try{
    				var PRE_DONGCHAMJA_GBN = record.previousValues.DONGCHAMJA_GBN;
    				if(PRE_DONGCHAMJA_GBN == undefined){
    					PRE_DONGCHAMJA_GBN = '*';
    				}
    				record.set("DONGCHAMJA_GBN", PRE_DONGCHAMJA_GBN);
    				
				}catch (e) {}
    		}
    		
    		me.inWepaeCnt(me);
    	}
    },
    inWepaeCnt : function(me){
    	var count = 0;
    	
    	var cnt = me.getViewModel().getStore('ds_dongChamJa').getCount();
    	
    	for(var row=0;row<cnt;row++){
    		if(me.getViewModel().getStore('ds_dongChamJa').getAt(row).get("DONGCHAMJA_GBN") == "*"){
    			count ++;
    		}
    	}// for row
    	
    	me.getViewModel().getStore('ds_detail').getAt(0).set("WEPAECNT", cnt - count);
    	
    	if( me.getViewModel().getStore('ds_detail').getAt(0).get("EVENT_CD") != 0 ){
    		
    		var EVENT_CD   = me.getViewModel().getStore('ds_detail').getAt(0).get("EVENT_CD");
    		var findRecord = me.getViewModel().getStore('ds_chonhonKindDate').findRecord('EVENT_CD', EVENT_CD, 0, false, true, true);
    		
    		if(findRecord != undefined ){
    			var amount = new Number(findRecord.get("AMOUNT")) * (cnt - count);
        		me.getViewModel().getStore('ds_detail').getAt(0).set("PAYMENT_PLAN_AMT", amount);
        		me.getViewModel().getStore('ds_detail').getAt(0).set("PAYMENT_AMT", amount);
        		me.getViewModel().getStore('ds_detail').getAt(0).set("MISU_AMT", 0);
        		
        		me.inFirstAmtCalc();
            	me.inPaymentAmtCalc();
            	me.inMisuAmtCalc();
    		}
    		
    	}// if
    	
    },
    onEditDetail : function( editor, context, eOpts ){
    	var me = this;
    	
    	
    	if(context.field == "EVENT_CD"){
    		
    		
    		var EVENT_CD =  me.getViewModel().getStore('ds_detail').getAt(0).get("EVENT_CD");
    		var params = {
    			V_EVENT_CD : EVENT_CD
    		};
    		
    		setTimeout(function(){
              	me.callStore(me, 'ds_chonhonKindDate', '', params ,me.dsKindDateCallback);
            },50);
    		
    		
    		if(EVENT_CD != 0){
    			var findRecord = me.getViewModel().getStore('ds_chonhonKind').findRecord('EVENT_CD', EVENT_CD, 0, false, true, true);
    			
    			me.getViewModel().getStore('ds_detail').getAt(0).set("SET_YN", findRecord.get("SET_YN"));
    			
    		}else{
    			me.getViewModel().getStore('ds_detail').getAt(0).set("SET_YN", "F");
    		}
    		me.getViewModel().getStore('ds_detail').getAt(0).set("EVENT_TIME","");
    		console.log(me.getViewModel().getStore('ds_detail').getAt(0));
    	}
    	else if(context.field == "EVENT_TIME"){
    		var EVENT_TIME = exCommon.getRepVal(me.getViewModel().getStore('ds_detail').getAt(0).get("EVENT_TIME"),"");
    		
    		if(isNaN(EVENT_TIME)){
    			me.getViewModel().getStore('ds_detail').getAt(0).set("EVENT_TIME","");
    			return;
        	}
    		
    		if(EVENT_TIME.length == 1){
    			EVENT_TIME ="0"+ EVENT_TIME + "00"; 
    		}else if(EVENT_TIME.length == 2){
    			EVENT_TIME = EVENT_TIME + "00";
    		}else if(EVENT_TIME.length == 3){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + "" + EVENT_TIME.substr(2) +"0";
    		}else if(EVENT_TIME.length == 4){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + "" + EVENT_TIME.substr(2);
    		}else if(EVENT_TIME.length > 4){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + "" + EVENT_TIME.substr(2,2);
    		}
    		me.getViewModel().getStore('ds_detail').getAt(0).set("EVENT_TIME",EVENT_TIME);
    	}
    	else if(context.field == "PAYMENT_PLAN_AMT" || context.field == "PAYMENT_AMT"){
    		var PAYMENT_PLAN_AMT = exCommon.getRepNum(me.getViewModel().getStore('ds_detail').getAt(0).get("PAYMENT_PLAN_AMT"));
    		var PAYMENT_AMT      = exCommon.getRepNum(me.getViewModel().getStore('ds_detail').getAt(0).get("PAYMENT_AMT"));
    		var MISU_AMT         = PAYMENT_PLAN_AMT - PAYMENT_AMT;
    		me.getViewModel().getStore('ds_detail').getAt(0).set("MISU_AMT",MISU_AMT);
    		
    		me.inFirstAmtCalc();
        	me.inPaymentAmtCalc();
        	me.inMisuAmtCalc();
    		
    	}
    	else if(context.field == "EVENT_DATE" ){
    		
    		var EVENT_DATE =  me.getViewModel().getStore('ds_detail').getAt(0).get("EVENT_DATE");
    		
    		console.log('EVENT_DATE = ', EVENT_DATE);
    		
    		var findRecord = me.getViewModel().getStore('ds_chonhonKindDate').findRecord('EVENT_DATE', EVENT_DATE, 0, false, true, true);
    		console.log('findRecord = ', findRecord);
    		
    		
    		if(findRecord == null || findRecord ==  undefined ){
    			me.getViewModel().getStore('ds_detail').getAt(0).set("MISU_AMT",0);
    			me.getViewModel().getStore('ds_detail').getAt(0).set("PAYMENT_PLAN_AMT",0);
    			me.getViewModel().getStore('ds_detail').getAt(0).set("PAYMENT_AMT",0);
    		}else{
    			var AMOUNT = findRecord.get("AMOUNT");
    			me.getViewModel().getStore('ds_detail').getAt(0).set("MISU_AMT",0);
    			me.getViewModel().getStore('ds_detail').getAt(0).set("PAYMENT_PLAN_AMT",AMOUNT);
    			me.getViewModel().getStore('ds_detail').getAt(0).set("PAYMENT_AMT",AMOUNT);
    		}
    		
    		me.inFirstAmtCalc();
        	me.inPaymentAmtCalc();
        	me.inMisuAmtCalc();
    	}
    	
    	
    },
    onBeforeEditDetail : function( editor, context, eOpts ){
    	var me = this;
    	if(context.field == "EVENT_TIME"){
    		var SET_YN = me.getViewModel().getStore('ds_detail').getAt(0).get("SET_YN");
    		
    		
    		if(SET_YN == "T"){
    			return true;
    		}
    		return false;
    	}
    	return true;
    },
    dsKindDateCallback : function(me, success, form, action){
    	me.getViewModel().getStore('ds_detail').getAt(0).set("EVENT_DATE", 0);
    },
    onDelete : function(){
    	var me = this;
    	
    	var groupCount = "";
    	
    	
    	var selectedRecord = me.lookupReference('rec004w_02_b').getView().getSelectionModel().getSelection()[0];
    	var row            = me.lookupReference('rec004w_02_b').getStore().indexOf(selectedRecord);
    	
    	console.log('row = ', row);
    	
    	
    	groupCount = selectedRecord.get("DONGCHAMJA_GBN");
    	
    	/* 삭제할 Row Data가 숫자일경우 */
    	if(!isNaN(groupCount)){
    		for(var a=row;a<groupCount;a++){
    			/* 접수종류가 같은경우만 */
    			try{
    				me.getViewModel().getStore('ds_dongChamJa').getAt(a).set("DONGCHAMJA_GBN", 1);
    			}catch (e) {
    				console.log('ds_dongChamJa error');
    			}
    			
    		}
    	}
    	
    	
    	/* 삭제할 Row Data가 *일경우 */
    	if(groupCount =="*"){
    		
    		for(moveRow=row;moveRow>=0;moveRow--){
    			
    			var record         = me.getViewModel().getStore('ds_dongChamJa').getAt(moveRow);
    			var DONGCHAMJA_GBN = record.get("DONGCHAMJA_GBN");
    			
    			
    			if( DONGCHAMJA_GBN > 1){
    				console.log( 'if DONGCHAMJA_GBN = ', DONGCHAMJA_GBN);
    				record.set("DONGCHAMJA_GBN", DONGCHAMJA_GBN -1);
    				break
    			}else{
    				console.log( 'else DONGCHAMJA_GBN = ', DONGCHAMJA_GBN);
    			}
    		}// for moveRow
    		
    	}// 
    	exCommon.gridRemove(
    		me
    	   ,'rec004w_02_b'
    	   ,'ds_dongChamJa' 
    	   ,false
    	   ,true
    	);
    	
    	me.inWepaeCnt(me);
    	
    	
    	for(var a=0;a<me.getViewModel().getStore('ds_dongChamJa').getCount();a++){
    		me.getViewModel().getStore('ds_dongChamJa').getAt(a).set("SORT", a+1);
    	}// for a
    	
    	
    },
    inSendMessage : function( smsInfo){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_sms').removeAll();
    	
    	var mobileTelno   = smsInfo.MOBILE_TELNO1 + smsInfo.MOBILE_TELNO2 + smsInfo.MOBILE_TELNO3;
    	var recAmtInfo    = me.getView().down('[xtype=rec000w_03]').getController().inRecAmtDefault();
    	
    	var rCnt = me.getViewModel().getStore('ds_detail').getCount();
    	
    	
    	
    	for(var i = 0; i < rCnt ; i++){
    		var record =  me.getViewModel().getStore('ds_detail').getAt(i);
    		
    		var smsNum = i;
    		
    		var EVENT_CD = record.get("EVENT_CD");
    		
    		var findRecord = me.getViewModel().getStore('ds_chonhonKind').findRecord('EVENT_CD', EVENT_CD, 0, false, true, true);
    		
    		var EVENT_NM = findRecord.get("EVENT_NAME");
    		
    		
    		
    		var fMessage  = "["+exCommon.user.templeNm+"("+(smsNum+1)+") ";
    		    fMessage +=  EVENT_NM +" " + exCommon.setNumberFormat(record.get("BASE_AMT")) + "] "; 
    		    		    		
    		var bMessage = "동참(예약)되었습니다. 성불하세요";
    		
    		if( record.get("PAYMENT_AMT") > 0  ){
    			bMessage = exCommon.setNumberFormat(record.get("PAYMENT_AMT"))+"원 보시하셨습니다. 성불하세요.";
    		}
    		
    		var data = {
    			 TR_ID        : "8"
    			,TR_SENDSTAT  : "0"
    			,TR_PHONE     : mobileTelno
    			,TR_DEST_INFO : recAmtInfo.PROPOSAL_BUD_NM+"^"+mobileTelno 
    			,TR_SMS_YN    : "T"
    			,TR_CALLBACK  : exCommon.user.tel  
    			,TR_ETC1      : exCommon.user.templeCd
    			,TR_ETC2      : recAmtInfo.PROPOSAL_BUD_NO
    			,TR_ETC3      : "SMSREC"
    			,TR_ETC4      : "8"
    			,TR_ETC5      : exCommon.user.userId
    			,TR_MESSAGE   : fMessage + " " + bMessage
    		}
    		
    		console.log(data);
    		
    		me.getViewModel().getStore('ds_sms').add(data);
    	}// for
    },    
    inFirstAmtCalc : function(){
    	var me = this;
    	var me_totPaymentPlanAmt  = 0;
    	try{
    		me_totPaymentPlanAmt = exCommon.getRepNum(me.getViewModel().getStore('ds_detail').getAt(0).get("PAYMENT_PLAN_AMT"));
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentPlanAmt' , me_totPaymentPlanAmt);
    },
    inPaymentAmtCalc : function(){
    	var me = this;
    	var me_totPaymentAmt  = 0;
    	try{
    		me_totPaymentAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_detail').sum('PAYMENT_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_totPaymentAmt' , me_totPaymentAmt);
    },
    inMisuAmtCalc : function(){
    	var me = this;
    	var me_misuAmt  = 0;
    	try{
    		me_misuAmt = exCommon.getRepNum( me.getViewModel().getStore('ds_detail').sum('MISU_AMT') );
    	}catch (e) {}
    	me.getView().down('[xtype=rec000w_03]').getController().upAmtCalCalled('me_misuAmt' , me_misuAmt);
    },
    inDisalbedCms : function(){
    	return false;    	
    },
    callFamilyInfo : function(family, spirit) {

		var me = this;

		me.getViewModel().getStore('body_FamilyInfo').removeAll();
		me.getViewModel().getStore('ds_familySelInfo').removeAll();
		me.getViewModel().getStore('ds_spiritSelInfo').removeAll();
		var record = {
			"BUD_NO" : "-9999",
			"NAME_KOR" : "선택안함"
		}
		me.getViewModel().getStore('body_FamilyInfo').add(record);

		for (var i = 0; i < family.length; i++) {
			me.getViewModel().getStore('body_FamilyInfo').add(family[i]);
			me.getViewModel().getStore('ds_familySelInfo').add(family[i]);
		}// for

		for (var i = 0; i < spirit.length; i++) {
			console.log(spirit[i]);
			
			spirit[i].DUPLE_CHECK = spirit[i].BOKWIJA_NO+'_'+spirit[i].BUD_NO;
			
			me.getViewModel().getStore('ds_spiritSelInfo').add(spirit[i]);
		}// for

		me.lookupReference('rec004w_02_a').getView().select(0);

		console.log('body_FamilyInfo  = ', me.getViewModel().getStore('body_FamilyInfo').getCount());
		console.log('ds_spiritSelInfo = ', me.getViewModel().getStore('ds_spiritSelInfo').getCount());
		
		
		for(var i = 0; i< me.getViewModel().getStore('ds_spiritSelInfo').getCount(); i++){
			me.getViewModel().getStore('ds_spiritSelInfo').getAt(i).set("SEL_YN", true);
		}
		
		me.getViewModel().getStore('ds_detail').getAt(0).set("EVENT_CD"         , 0);
		me.getViewModel().getStore('ds_detail').getAt(0).set("SET_YN"           , 'F');
		me.getViewModel().getStore('ds_detail').getAt(0).set("PAYMENT_PLAN_AMT" , 0);
		me.getViewModel().getStore('ds_detail').getAt(0).set("PAYMENT_AMT"      , 0);
		me.getViewModel().getStore('ds_detail').getAt(0).set("MISU_AMT"         , 0);
		me.getViewModel().getStore('ds_detail').getAt(0).set("EVENT_DATE"       , '');
		me.getViewModel().getStore('ds_detail').getAt(0).set("MISU_AMT"         , 0);
		me.getViewModel().getStore('ds_detail').getAt(0).set("WEPAECNT"         , '');
		
		
	},
	onCallback002 : function(params) {
		var me = this;
		me.getView().down('[xtype=rec000w_03]').getController().onUpCalled(params);
	},
    dsBokwiCallback : function(me, success, form, action){
    	console.log('dsBokwiCallback');
    	me.lookupReference('lc_bokwi').setExValue('00000');
    	
    	for(var a=0; a<me.getViewModel().getStore('ds_spiritSelInfo').getCount();a++){
			me.getViewModel().getStore('ds_spiritSelInfo').getAt(a).set('SEL_YN' , true);
		}// for
    	
    },
    callSetRecType : function(){
		return 8;
	}
})
