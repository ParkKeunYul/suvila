Ext.define('ExFrm.view.rec.rec001w_04Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec001w_04',
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
    	
    	me.lookupReference('me_AcceptSDateID').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDateID').setExValue( today );
		
		fn_getBudNo(me, '' , "all");
		
		
		me.onRecSearch();    	
		
    },
    onRecSearch : function(){
    	var me = this;
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID");
    	
		var gridNmRec    = "rec001w_04_a";
		
		var selectRecord = me.lookupReference(gridNmRec).getView().getSelectionModel().getSelection()[0];
		
		
		if(selectRecord == undefined ){
			me.getViewModel().getStore('ds_payMonth').removeAll();
		}else{
			
			var params = {
				 V_ACCEPT_SEQ : selectRecord.get("ACCEPT_SEQ")
				,V_SEQ 		  : selectRecord.get("SEQ")
				,V_ACCEPT_GBN : selectRecord.get("ACCEPT_GBN")
				,V_JUNGAK_CD  : selectRecord.get("JUNGAK_CD")
				,V_LIGHT_NO   : selectRecord.get("LIGHT_NO")
				,V_PROD_CODE  : selectRecord.get("INDEUNG_GBN")
			};
			
			var LIMIT_YN          = exCommon.getRepVal(selectRecord.get("LIMIT_YN") , "");
			var APPROVAL_GBN      = exCommon.getRepVal(selectRecord.get("APPROVAL_GBN") , "");
			var YEONDEUNG_PERIOD  = exCommon.getRepVal(selectRecord.get("YEONDEUNG_PERIOD") , "");
			var ACCEPT_GBN        = exCommon.getRepVal(selectRecord.get("ACCEPT_GBN") , "");
			if(  (ACCEPT_GBN == '2' && LIMIT_YN ==  'F' ) || (ACCEPT_GBN == '4' && APPROVAL_GBN == 3 && YEONDEUNG_PERIOD > 1 ) ){
				setTimeout(function(){
					me.callStore(me, 'ds_payMonth', '', params ,null); 
				},50);
			}
		}
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
    	
    },
    dstempleUserCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.dsaJkindnCallback);
    	},50);
    },    
    dsaJkindnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDJGKindInfo', '', null ,me.dsIdJungakCallback);
    	},50);    	    	
    },
    dsIdJungakCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDKindInfo', '', null ,null);
    	},50);
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
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
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSelect : function(sel_row_index){
    	var me = this;
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID")

    	
    	console.log('sel_row_index =', parseInt( sel_row_index));
    	var sel_row_index = sel_row_index;
    	if(isNaN(sel_row_index)){
    		sel_row_index = 0;
    	}
    	var G_ROW_INDEX = exCommon.getRepVal(sel_row_index , 0);
    	
    	console.log('G_ROW_INDEX= ', G_ROW_INDEX);
    	
    	
    	
    	if(selectType == "ID"){
        	
    		
    		
    		var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateID').getExValue();
        	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateID').getExValue();
    		
        	if(new Number(V_ACCEPT_SDATE) > new Number(V_ACCEPT_EDATE)){
        		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
        		me.lookupReference('me_AcceptSDateID').focus();
        		return false;
        	}
    		
        	
        	var params = {
        		 V_PAY_STATE     	: me.lookupReference('lc_payState').getExValue()
        		,V_PROPOSAL_BUD_NO  : me.lookupReference('txt_budNo').getExValue()
        		,V_ACCEPT_SDATE 	: me.lookupReference('me_AcceptSDateID').getExValue()
        		,V_ACCEPT_EDATE    	: me.lookupReference('me_AcceptEDateID').getExValue()
        		,V_CODE        		: me.lookupReference('lc_IDKindInfo').getExValue()
        		,V_JUNGAK_CD       	: me.lookupReference('lc_IDJungakInfo').getExValue()
        		,VV_USER_ID    		: me.lookupReference('lc_templeUser').getExValue()
        		,V_APPROV     		: me.lookupReference('lc_approv').getExValue()
        		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
        		,V_CLOSE_YN     	: me.lookupReference('lc_IDCloseYn').getExValue()
        		,G_ROW_INDEX        : G_ROW_INDEX
        	}
        	
        	setTimeout(function(){
        		me.callStore(me, 'ds_IDRec', '', params ,me.onSelectCallback);
        	},10);
    	}else{
        	
    		var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateYD').getExValue();
        	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateYD').getExValue();
    		
        	if(new Number(V_ACCEPT_SDATE) > new Number(V_ACCEPT_EDATE)){
        		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
        		me.lookupReference('me_AcceptSDateYD').focus();
        		return false;
        	}
    		
        	var params = {
    			 V_PAY_STATE     	: me.lookupReference('lc_payState').getExValue()
         		,V_PROPOSAL_BUD_NO  : me.lookupReference('txt_budNo').getExValue()
         		,V_ACCEPT_SDATE 	: me.lookupReference('me_AcceptSDateYD').getExValue()
         		,V_ACCEPT_EDATE    	: me.lookupReference('me_AcceptEDateYD').getExValue()
         		,V_CODE       		: me.lookupReference('lc_YDKindInfo').getExValue()
         		,V_JUNGAK_CD       	: me.lookupReference('lc_YDJungakInfo').getExValue()
         		,VV_USER_ID         : me.lookupReference('lc_templeUser').getExValue()
         		,V_APPROV     		: me.lookupReference('lc_approv').getExValue()
         		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
         		,V_CLOSE_YN     	: me.lookupReference('lc_YDCloseYn').getExValue()
         		,G_ROW_INDEX        : G_ROW_INDEX
           	}
        	setTimeout(function(){
        		me.callStore(me, 'ds_YDRec', '', params ,me.onSelectCallback);
        	},10);
        	
    	}
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		if(exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID") == "ID"){
    			console.log('action._params = ', action);
    			me.lookupReference('rec001w_04_a').getView().select(action._params.G_ROW_INDEX);
    		}else{
    			me.lookupReference('rec001w_04_b').getView().select(action._params.G_ROW_INDEX);
    		}
    		
    	}
    },
    onSelectionChangeID : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	console.log('onSelectionChangeID = ', record.length);
    	try{
    		
    		if(record.length <=  0) return;
    		
    		var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID")
    		
    		var V_ACCEPT_GBN = record[0].get("ACCEPT_GBN");
    		
    		var params = {
    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
    			,V_SEQ 		  : record[0].get("SEQ")
    			,V_ACCEPT_GBN : record[0].get("ACCEPT_GBN")
    			,V_JUNGAK_CD  : record[0].get("JUNGAK_CD")
    			,V_LIGHT_NO   : record[0].get("LIGHT_NO")
    			,V_PROD_CODE  : record[0].get("INDEUNG_GBN")
    			,LIMIT_YN     : record[0].get("LIMIT_YN")
    		};
    		
    	
    		if( record[0].get("LIMIT_YN") ==  "F" ){
    			// 무한
    			me.lookupReference('mg_payMonth').setHidden(false);
    			me.lookupReference('tr_sunab3_c').setHidden(true);
    			me.lookupReference('limit_paymonth_btn_top').setHidden(false);
    			me.lookupReference('unlimit_paymonth_btn_top').setHidden(true);
    			me.lookupReference('unlimit_btn_bot').setHidden(true);
    			
    			setTimeout(function(){
    				me.callStore(me, 'ds_payMonth', '', params ,me.selectMonthCallback); 
    			},50);
    			
    		}else{
    			// 유한
    			me.lookupReference('mg_payMonth').setHidden(true);
    			me.lookupReference('tr_sunab3_c').setHidden(false);
    			me.lookupReference('limit_paymonth_btn_top').setHidden(true);
    			me.lookupReference('unlimit_paymonth_btn_top').setHidden(false);
    			me.lookupReference('unlimit_btn_bot').setHidden(false);
    			
    			setTimeout(function(){
    				me.callStore(me, 'ds_payMonthBase', '', params ,me.selectMonthCallback); 
    			},50);
    			
    		}
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    		
    },
    selectMonthCallback : function(me, success, form, action){
    	console.log('selectMonthCallback = ');
    	if(success){
    		
    		setTimeout(function(){
				me.callStore(me, 'ds_misuRec', '', action._params ,me.dsMisuRecCallback);    				
			},50);
    	}
    },
    dsMisuRecCallback : function(me, success, form, action){
    	
    	
    	var selectType  = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID")
    	var recGridNm   = 'rec001w_04_a';
    	var sunapGridNM = 'tr_sunab3_a';
    	
    	if( selectType == 'YD' ){
    		recGridNm   = 'rec001w_04_b';
    		sunapGridNM = 'tr_sunab3_b';
    	}
    	
    	me.lookupReference(sunapGridNM).columns[3].setVisible(true);
    	me.lookupReference(sunapGridNM).columns[5].setVisible(true);
    	
    	var selectedRecord    = me.lookupReference(recGridNm).getView().getSelectionModel().getSelection()[0];
    	var ACCEPT_GBN        = exCommon.getRepVal( selectedRecord.get("ACCEPT_GBN") );
    	var LIMIT_YN          = exCommon.getRepVal( selectedRecord.get("LIMIT_YN") );
    	var APPROVAL_GBN      = exCommon.getRepVal( selectedRecord.get("APPROVAL_GBN") , "");
    	var YEONDEUNG_PERIOD  = exCommon.getRepVal( selectedRecord.get("YEONDEUNG_PERIOD") , "");

    	
		setTimeout(function(){
			me.callStore(me, 'ds_rec_base_amount', '', action._params ,null);    				
		},50);
    	
    	
    	if( (ACCEPT_GBN == '2' && LIMIT_YN == 'T') ||  (ACCEPT_GBN == '4' && APPROVAL_GBN == 3 && YEONDEUNG_PERIOD > 1) ){
    		me.lookupReference(sunapGridNM).columns[3].setVisible(false);
    		me.lookupReference(sunapGridNM).columns[5].setVisible(false);
    	}else if( ACCEPT_GBN == 4 && APPROVAL_GBN != 3 ){
    		me.lookupReference(sunapGridNM).columns[3].setVisible(false);
    	}
    	
    },
    onAddYear : function(){
    	var me = this;
    	
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID")
    	
    	var recGridNm = 'rec001w_04_a';
    	
    	if( selectType == 'YD' ){
    		recGridNm = 'rec001w_04_b';
    	}
    	
    	
    	//if( me.inCheckEnd() )return;
    	var cnt            = me.getViewModel().getStore('ds_payMonth').getCount();
    	var selectedRecord = me.lookupReference(recGridNm).getView().getSelectionModel().getSelection()[0];
    	
    	
    	console.log(selectedRecord +" = ", selectedRecord);
    	
    	if(cnt == 0){
    		
    		var start_yyyy = selectedRecord.get("PAYMENT_YYYYMM");
    		
    		var YEAR = exCommon.getRepVal(selectedRecord.get("INDEUNG_YEAR") , "");
    		if( selectType == 'YD' ){
    			YEAR = exCommon.getRepVal(selectedRecord.get("YEONDEUNG_YEAR") , "");
    		}
    		
    		var data ={
				 TEMPLE_CD 	 : exCommon.getRepVal(selectedRecord.get("TEMPLE_CD") , "")
    			,ACCEPT_SEQ  : exCommon.getRepVal(selectedRecord.get("ACCEPT_SEQ") , "")
    			,SEQ 		 : exCommon.getRepVal(selectedRecord.get("SEQ") , "")
    			,ACCEPT_GBN  : exCommon.getRepVal(selectedRecord.get("ACCEPT_GBN") , "")
    			,INDEUNG_GBN : exCommon.getRepVal(selectedRecord.get("INDEUNG_GBN") , "")    			
    			,YEAR 		 : YEAR    			
    		}
    		me.getViewModel().getStore('ds_payMonth').insert(0 , data);
    		
    	}else{
    		var nextYear = "";
    		for(i=cnt-1; i >= 0; i--){
    			nextYear = me.getViewModel().getStore('ds_payMonth').getAt(i).get("YEAR");
    		}//for
    		nextYear = parseInt( nextYear ) + 1;
    		
    		
    		var data = {
    			 TEMPLE_CD 	 : exCommon.getRepVal(selectedRecord.get("TEMPLE_CD"), "")
    			,ACCEPT_SEQ  : exCommon.getRepVal(selectedRecord.get("ACCEPT_SEQ"), "")
    			,SEQ 		 : exCommon.getRepVal(selectedRecord.get("SEQ"), "")
    			,ACCEPT_GBN  : exCommon.getRepVal(selectedRecord.get("ACCEPT_GBN"), "")
    			,INDEUNG_GBN : exCommon.getRepVal(selectedRecord.get("INDEUNG_GBN"), "")
    			,YEAR 		 : nextYear
    			,YEONDEUNG_GBN : exCommon.getRepVal(selectedRecord.get("YEONDEUNG_GBN") , "")
    		}
    		me.getViewModel().getStore('ds_payMonth').insert(0 , data);
    	}
    },
    onSunab2 : function(){
    	var me = this;
    	
    	
    	var gridMonthNm = 'mg_payMonth';
    		
		if( me.getViewModel().getStore('ds_payMonth').getCount() == 0 ) return false;
		
		var start = me.lookupReference(gridMonthNm).getView().getSelectionModel().selected.startCell;
		var end   = me.lookupReference(gridMonthNm).getView().getSelectionModel().selected.endCell;
		
		var sRowIdx = start.rowIdx;
		var eRowIdx = end.rowIdx;
		
		if(sRowIdx > eRowIdx){
			temp    = sRowIdx;
			sRowIdx = eRowIdx;
			eRowIdx = temp;
		}
		
		var sColIdx = start.colIdx -1;
		var eColIdx = end.colIdx   -1;
		if(sColIdx > eColIdx){
			temp    = sColIdx;
			sColIdx = eColIdx;
			eColIdx = temp;
		}
		
		console.log('sRowIdx = ', sRowIdx);
		console.log('eRowIdx   = ', eRowIdx);
		
		
		if(sRowIdx != eRowIdx){
			exCommon.msgAlert('수납 처리는 같은 년도만 가능합니다.');
			return false;
		}
		
		console.log('row = [ ', (sRowIdx+1) +"열에서 ==> " +(eRowIdx+1) + "열까지 ]"   );
		console.log('col = [ ', (sColIdx) +"월부터 ==> " +(eColIdx) + "월까지 ]"   );
		
		for(var i= eRowIdx; i>=sRowIdx ; i-- ){
			var record = me.getViewModel().getStore('ds_payMonth').getAt(i);
			var YEAR   = record.get("YEAR");
			
			for(var k= sColIdx; k<=eColIdx; k++){
				var varStatus = record.get("M_STATUS_"+exCommon.addZero(k));
				
				if( varStatus == "9"){
					exCommon.msgAlert("CMS 요청 처리중인 데이터는 입금처리하지 못합니다.");
		 			return;
		 		}else if( varStatus == "3"){
		 			exCommon.msgAlert("이미 납부된 월은 납부 처리 할수 없습니다.");
		 			return;
		 		}else if( varStatus == "0"){
		 			exCommon.msgAlert("해당 기간은 납부 기간이 아닙니다.");
		 			return;
		 		}else {
		 			//var col_month = i-1;
		 			var temp_yyyymm = YEAR+exCommon.addZero(k);
		 			var temp_month  = exCommon.addZero(k);
		 			
		 			console.log('temp_yyyymm = ', temp_yyyymm);
		 			
		 			var temp_amount = me.inGetAmount( new Number( temp_yyyymm ) );
		 			
		 			console.log('temp_amount = ', temp_amount);
		 			
		 			var v_AG = me.getViewModel().getStore('ds_payMonth').getAt(0).get("ACCEPT_GBN");
		 			
		 			
		 			var rtnAdd = me.inAdd2(temp_yyyymm , temp_amount);
		 			
		 			if(rtnAdd == 1){
		 				record.set('amount_'+temp_month,temp_amount);
		 				record.set("M_STATUS_"+temp_month ,"3");
		 			}else if( rtnAdd == 2 ){
		 				if(temp_amount < 0){
		 					record.set('amount_'+temp_month,temp_amount);
		 				}else{
		 					record.set('amount_'+temp_month,0);
		 				}
		 				record.set("M_STATUS_"+temp_month ,"3");
		 			}else{
		 				record.set('amount_'+temp_month,0);
		 				record.set("M_STATUS_"+temp_month ,"3");
		 			}
		 			
		 		}
			}// for k
		}// for i 
    	
    },
    inGetAmount : function(iYYYYMMDD){
    	var me = this;
    	
    	var rtnAmount = 0;
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID");
    	
    	console.log('inGetAmount  selectType = ', selectType);
    	
    	if(selectType  == "ID"){
    		
    		var recRecord  = me.lookupReference('rec001w_04_a').getView().getSelectionModel().getSelection()[0];
    		
    		var ACCEPT_GBN = recRecord.get("ACCEPT_GBN");
        	
        	
        	var recBaseAmountCnt = me.getViewModel().getStore('ds_rec_base_amount').getCount();
        	
        	console.log('inGetAmount  recBaseAmountCnt = ', recBaseAmountCnt);
        	
        		
    		if( recBaseAmountCnt == 0 ){
    			rtnAmount = 0;
    		}else if( recBaseAmountCnt == 1 ){    			
    			
    			rtnAmount =  me.getViewModel().getStore('ds_rec_base_amount').getAt(0).get("AMOUNT");
    		}else{
    			var rtn = true;
    			
    			for(var z=1; z<recBaseAmountCnt; z++){
    				
    				var START_YYYYMM  = new Number(me.getViewModel().getStore('ds_rec_base_amount').getAt(z).get("START_YYYYMM"));
    				var END_YYYYMM    = new Number(me.getViewModel().getStore('ds_rec_base_amount').getAt(z).get("END_YYYYMM"));
    				
    				if(	START_YYYYMM <= iYYYYMMDD && END_YYYYMM >= iYYYYMMDD){
    					rtnAmount =  me.getViewModel().getStore('ds_rec_base_amount').getAt(z).get("AMOUNT"); 
    					rtn       = false;
    					break;
    				}
    			}// for
    			if(rtn){
    				//기간 설정 금액이 없는경우 기본 금액 설정
    				rtnAmount = me.getViewModel().getStore('ds_rec_base_amount').getAt(0).get("AMOUNT");
    			}
    		}
    	}
    	else { // 연등
    		
    		var recRecord  = me.lookupReference('rec001w_04_b').getView().getSelectionModel().getSelection()[0];
    		
    		rtnAmount = recRecord.get("PAYMENT_PLAN_AMT") / recRecord.get("YEONDEUNG_PERIOD");
    		
    		//rtnAmount
    	}
    	
    	
    	
    	
		
    	return rtnAmount;
    },
    inRowFindIndex : function(me, storNm , strYYYYMM , rowStatus){
    	var rtnVal = -1;
    	
    	for(var i = 0; i<me.getViewModel().getStore(storNm).getCount(); i++){
    		
    		var record = me.getViewModel().getStore(storNm).getAt(i);
    		
    		var fndYYYYMM  = exCommon.getRepVal( record.get("PAYMENT_YYYYMM"), "" );
    		var SQL_MODE   = exCommon.getRepVal( me.getViewModel().getStore(storNm).getAt(i).get("SQL_MODE"), "" );
    		
    		if( fndYYYYMM == strYYYYMM  && SQL_MODE == rowStatus ){
    			rtnVal = i;
    		}
    		
    	}// for
    	
    	return rtnVal;
    	
    },
    inAdd2 : function(temp_yyyymm , amount ){
    	var me = this;
    	
    	
    	var selectType = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID");
    	
    	var misuGridNm  = "tr_sunab3_a";
    	var recGridNm   = "rec001w_04_a";
    	var misuStoreNm = "ds_misuRec";
    	
    	var fndRowIdx = me.inRowFindIndex(me, misuStoreNm,temp_yyyymm ,'I');
    	console.log('fndRowIdx = ', fndRowIdx);
    	
    	if 	(fndRowIdx > 0 ){    		
    		me.getViewModel().getStore(misuStoreNm).removeAt(fndRowIdx);    		
    		return 2;
    	}
    	
    	
    	
    	var dupleRecord = me.getViewModel().getStore(misuStoreNm).findRecord('PAYMENT_YYYYMM', temp_yyyymm, 0, false, true, true);
    	var rowIndex    = me.lookupReference(misuGridNm).getStore().indexOf(dupleRecord);
    	
    	var records = new Array();
    	var findCnt = 0;
    	
    	for(var i = 0; i<me.getViewModel().getStore(misuStoreNm).getCount(); i++){
    		
    		var PAYMENT_YYYYMM = me.getViewModel().getStore(misuStoreNm).getAt(i).get("PAYMENT_YYYYMM") ;
        	var AMOUNT         = exCommon.getRepNum( me.getViewModel().getStore(misuStoreNm).getAt(i).get("AMOUNT")) ;
        	var SQL_MODE       = exCommon.getRepNum( me.getViewModel().getStore(misuStoreNm).getAt(i).get("SQL_MODE")) ;
    		
    		if( temp_yyyymm == PAYMENT_YYYYMM && AMOUNT != 0  && SQL_MODE  == 'I'  ){
    			records[findCnt] = i
    			findCnt++;
    		}
    	}// for
    	
    	
    	
    	if(records.length == 1 && rowIndex != -1 ){
    		var crtUSer =  exCommon.getRepVal( dupleRecord.get("CRT_USER") ); 
    		if(crtUSer == ""){
    			var rowIndex = me.lookupReference(misuGridNm).getStore().indexOf(dupleRecord);
        		me.lookupReference(misuGridNm).getStore().remove(dupleRecord);
        		
        		if(rowIndex > 0) rowIndex = rowIndex -1;
				if(rowIndex < 0) rowIndex = 0;
				me.lookupReference(misuGridNm).getView().select(rowIndex);
        		
        		return 2;
    		}
    	}else if( records.length == 2 ){
    	
    		var rowIndex = me.lookupReference(misuGridNm).getStore().indexOf(dupleRecord);
    		me.lookupReference(misuGridNm).getStore().remove(me.getViewModel().getStore(misuGridNm).getAt(records[1]));
    		
    		
    		if(rowIndex > 0) rowIndex = rowIndex -1;
			if(rowIndex < 0) rowIndex = 0;
			me.lookupReference(misuGridNm).getView().select(rowIndex);
    		
    		return 3;
    	}
   	
    	
    	
    	var recRecord  = me.lookupReference(recGridNm).getView().getSelectionModel().getSelection()[0];
    	
    	var data = {
    		 TEMPLE_CD    	 : exCommon.user.templeCd
    		,ACCEPT_SEQ   	 : recRecord.get("ACCEPT_SEQ")
    		,SEQ          	 : recRecord.get("SEQ")
    		,PAYMENT_YYYYMM	 : temp_yyyymm
    		,AMOUNT       	 : amount
    		,APPROVAL_GBN 	 : "1"
    		,APPROVAL_GBN_NM : "현금접수"
    		,SUB_DATE        : exCommon.getNowDate()
    		,SQL_MODE        : 'I'
    	}
    	
    	
    	var misuCnt = me.getViewModel().getStore(misuStoreNm).getCount(); 
    	me.getViewModel().getStore(misuStoreNm).add(data);
    	
    	me.lookupReference(misuGridNm).getView().select( misuCnt );
    	
    	return 1;
    },
    onBeforeeditID : function  ( editor, context, eOpts ) {
    	var me  = this;
    	
    	var idRecord = me.lookupReference('rec001w_04_a').getView().getSelectionModel().getSelection()[0];
    	
    	var SQL_MODE   = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("SQL_MODE");
    	var EDIT_MODE  = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("EDIT_MODE");
    	var LIMIT_YN   = idRecord.get("LIMIT_YN");
    	var ACCEPT_GBN = idRecord.get("ACCEPT_GBN");
    	
    	
    	console.log('context.colIdx = ', context.colIdx);
    	
    	if( (context.colIdx == 3 && EDIT_MODE == "T" && SQL_MODE == "I") || context.colIdx == 4	){
    		return true;
    	}else{
    		return false;
    	}
    	
    },
    onAftereditID : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	var SQL_MODE   = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("SQL_MODE");
    	var EDIT_MODE  = me.lookupReference('tr_sunab3_a').getStore().getAt(context.rowIdx).get("EDIT_MODE");
    	
    	
    	if(SQL_MODE == 'I' && EDIT_MODE == 'T'){
    		var row = context.rowIdx;
        	var col = context.colIdx;
        	
        	if(col == '3'){
        		var amount = me.lookupReference('tr_sunab3_a').getStore().getAt(row).get("AMOUNT");
        		
        		if(isNaN(amount)){
        			exCommon.msgAlert('납부금액은 숫자만 입력 가능합니다.');
        			return false;
        		}
        		me.lookupReference('tr_sunab3_a').getStore().getAt(row).set("AMOUNT", parseInt(amount));
        		
        	}// 납부금액
        	
    	}
    	
    	
    },
    onAdd : function(){
    	var me = this;
    	
    	
    	var selectType   = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID");
    	
    	var gridRecNm    = "rec001w_04_a";
    	var storeSunapNm = "ds_misuRec";
    	var sunapGridNm  = 'tr_sunab3_a';
    	
    	
    	var rowCount = me.getViewModel().getStore(storeSunapNm).getCount();
    	
    	
    	var selectRecord = me.lookupReference(gridRecNm).getView().getSelectionModel().getSelection()[0];
    	
    	
    	var MISU_AMT   = selectRecord.get("MISU_AMT");
    	var LIMIT_YN   = selectRecord.get("LIMIT_YN");
    	var ACCEPT_GBN = selectRecord.get("ACCEPT_GBN");
    	
    	console.log('MISU_AMT = ', MISU_AMT);
    	console.log('LIMIT_YN = ', LIMIT_YN);

    	
    	
    	var data = {
 			 TEMPLE_CD    : exCommon.user.templeCd
 			,ACCEPT_SEQ   : selectRecord.get("ACCEPT_SEQ")
 			,SEQ          : selectRecord.get("SEQ")
 			,SQL_MODE     : 'I'
 			,APPROVAL_GBN : "1"
 			,EDIT_MODE    : 'T'
 			,AMOUNT       : 0
 		};
    	
    	
    	var flag = true;
    	
    	if( (ACCEPT_GBN == '2' && MISU_AMT <= 0 && LIMIT_YN == 'T') ||
    		(ACCEPT_GBN == '4' && MISU_AMT <= 0)    ){
    		flag = false;
    	}
    	
    	if(!flag){
    		Ext.MessageBox.confirm('알림', '동참금 완납이거나, 초과납부된 접수입니다.<br/>추가수납 하겠습니까?', function(btn){
        		if (btn == 'yes') {  
        			me.getViewModel().getStore(storeSunapNm).add( data);
        	       	me.lookupReference(sunapGridNm).plugins[0].startEditByPosition({
        	           row: rowCount,
        	           column: 4
        	        });
        		}
        	});
    		return false;
    	}
    	
    	
    	me.getViewModel().getStore(storeSunapNm).add( data);
       	me.lookupReference(sunapGridNm).plugins[0].startEditByPosition({
           row: rowCount,
           column: 4
        });
    },
    onSave : function(){
    	
    	var me = this;
    	
    	var storeNmRec = "ds_IDRec";
    	var gridNmRec  = "rec001w_04_a";
    	var storeNm    = "ds_misuRec";
    	var sunapGridNm= 'tr_sunab3_a';
    	var totAmt     = 0;
    	var sms_gubun  = 2;
    	
    	var isUpdate = exCommon.ChangeCount(storeNm , me);
    	if(isUpdate == 0){
    		exCommon.msgAlert('변동된 내역이 없습니다.');
    		return false;
    	}// isUpdate
    	
    	
    	for(var i = 0; i<  me.getViewModel().getStore(storeNm).getCount() ; i++){
    		if( me.getViewModel().getStore(storeNm).getAt(i).get("SQL_MODE") == "I" ){
    			var AMOUNT = exCommon.getRepNum( me.getViewModel().getStore(storeNm).getAt(i).get("AMOUNT") );
    			
    			if(isNaN(AMOUNT) || AMOUNT == 0){
    				me.lookupReference(sunapGridNm).getView().select(i);
    				exCommon.msgAlert(' 0원 이상의 숫자만 입력 가능합니다.');
    				return false;
    			}
    			
    			totAmt +=   exCommon.getRepNum( me.getViewModel().getStore(storeNm).getAt(i).get("AMOUNT") );
    		}
    	}// for
    	
    	me.getViewModel().getStore('ds_sms').clearData();
    	
    	console.log('gridNmRec = ', gridNmRec);
    	
    	var selectRecord = me.lookupReference(gridNmRec).getView().getSelectionModel().getSelection()[0];
    	
    	var SMS_YN            = exCommon.getRepVal(selectRecord.get("SMS_YN") , "");
    	var MOBILE_TELNO      = exCommon.getRepVal(selectRecord.get("MOBILE_TELNO") , "");
    	var PROPOSAL_NAME_KOR = exCommon.getRepVal(selectRecord.get("PROPOSAL_NAME_KOR") , "");
    	var PROPOSAL_BUD_NO   = exCommon.getRepVal(selectRecord.get("PROPOSAL_BUD_NO") , "");
    	var LIGHT_NM 		  = exCommon.getRepVal(selectRecord.get("LIGHT_NM") , "");
    	var LIMIT_YN          = exCommon.getRepVal(selectRecord.get("LIMIT_YN") , "");
    	var APPROVAL_GBN      = exCommon.getRepVal(selectRecord.get("APPROVAL_GBN") , "");
    	var YEONDEUNG_PERIOD  = exCommon.getRepVal(selectRecord.get("YEONDEUNG_PERIOD") , "");
    	
    	
    	
    	console.log('SMS_YN = ', SMS_YN);
    	
    	if(totAmt > 0 && (SMS_YN == "Y" || SMS_YN == "T") &&  MOBILE_TELNO != ""){
    		
    		var message  = "["+exCommon.user.templeNm+"] "+LIGHT_NM + " ";
				message += exCommon.setNumberFormat( exCommon.getRepNum(totAmt) )+"원 보시하셨습니다. 성불하세요.";
    		
    		var data = {
    			 TR_ID        : "SUNAB"
    			,TR_SENDSTAT  : 0
    			,TR_PHONE     : MOBILE_TELNO
    			,TR_DEST_INFO : PROPOSAL_NAME_KOR+ "^" + MOBILE_TELNO
    			,TR_SMS_YN    : SMS_YN
    			,TR_CALLBACK  : exCommon.user.tel
    			,TR_ETC1      : exCommon.user.templeCd
    			,TR_ETC2      : PROPOSAL_BUD_NO
    			,TR_ETC3      : "SMSREC"
    			,TR_ETC4      : sms_gubun
    			,TR_ETC5      : exCommon.user.userId
    			,TR_MESSAGE   : message
    		}
    		console.log('message = ', message);
    	}
    	
    	Ext.MessageBox.confirm('알림', "저장하시겠습니까?", function(btn){
    		if (btn == 'yes') {
    			exCommon.addParamSetting(me, storeNm	, 'newData');
    	    	exCommon.uptParamSetting(me, storeNm	, 'uptData');
    			exCommon.addParamSetting(me, 'ds_sms'		, 'ds_sms');
    			
    			
    			exCommon.addParamSetting(me, storeNm	, 'ds_misuRec');

    			var saveUrl = "/rec/REC001W_04/save.suvila";
    			if(LIMIT_YN == "F" ||  (APPROVAL_GBN == 3 && YEONDEUNG_PERIOD > 1) ){
    				saveUrl = "/rec/REC000P_02/saveLimit.suvila";
    			}
    		
    			setTimeout(function(){
        			me.callForm(me, saveUrl, me.onSaveCallback , false);
        		},10);
    		}
    	});
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_misuRec');
    	if(success){
    		
    		var selectType   = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID");
    		var gridNmRec    = "rec001w_04_a";
    		if(selectType == "YD"){
    			gridNmRec = "rec001w_04_b";
    		}
    		
    		var selectedRecord = me.lookupReference(gridNmRec).getView().getSelectionModel().getSelection()[0];
    		var rowIndex = me.lookupReference(gridNmRec).getStore().indexOf(selectedRecord);
    		console.log('rowIndex= ', rowIndex);
    		
    		me.onSelect( rowIndex );
    		
    		/*
    		
    		var selectRecord = me.lookupReference(gridNmRec).getView().getSelectionModel().getSelection()[0];
    		var params = {
    			 V_ACCEPT_SEQ : selectRecord.get("ACCEPT_SEQ")
    			,V_SEQ 		  : selectRecord.get("SEQ")
    			,V_ACCEPT_GBN : selectRecord.get("ACCEPT_GBN")
    			,V_JUNGAK_CD  : selectRecord.get("JUNGAK_CD")
    			,V_LIGHT_NO   : selectRecord.get("LIGHT_NO")
    			,V_PROD_CODE  : selectRecord.get("INDEUNG_GBN")
    		};
    		
    		
    		var LIMIT_YN          = exCommon.getRepVal(selectRecord.get("LIMIT_YN") , "");
    		var APPROVAL_GBN      = exCommon.getRepVal(selectRecord.get("APPROVAL_GBN") , "");
    		var YEONDEUNG_PERIOD  = exCommon.getRepVal(selectRecord.get("YEONDEUNG_PERIOD") , "");
    		var ACCEPT_GBN        = exCommon.getRepVal(selectRecord.get("ACCEPT_GBN") , "");
    		
    		
    		var payMonthStoreNm = 'ds_payMonthBase';
    		
    	
    		if(  (ACCEPT_GBN == '2' && LIMIT_YN ==  'F' ) || (ACCEPT_GBN == '4' && APPROVAL_GBN == 3 && YEONDEUNG_PERIOD > 1 ) ){
    			payMonthStoreNm = 'ds_payMonth';
    		}
    		
    		
    		setTimeout(function(){
				me.callStore(me, payMonthStoreNm, '', params ,me.selectMonthCallback); 
			},50);*/
    	}
    },
    onCancel : function(){
    	var me = this;
    	
    	
    	var storeNm   = "ds_misuRec";
    	var gridNm    = "tr_sunab3_a";
    	
    	var selectType   = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID");
    	if(selectType == 'YD'){
    		storeNm = "";
    	}
    	
    	var selectRecord = me.lookupReference(gridNm).getView().getSelectionModel().getSelection()[0];
    	
    	if(selectRecord.get("SQL_MODE") != "I"){
    		exCommon.msgAlert('기 수납된 내용은 취소할수 없습니다.');
    		return false;
    	}
    	
    	exCommon.gridRemove(
    		 me 
    		,gridNm
    		,storeNm
    		,false
    		,false
    	);
    },
    /*-- 고정금액 수납 취소 --*/
    onCancelLimit : function(){
    	
    	
    	var today = new Date();
    	var n_mm    = today.getMonth()+1; //
    	var n_yyyy  = today.getFullYear();

    	if(n_mm<10) {
    		n_mm='0'+n_mm
    	} 
    	
    	var n_yyyymm = n_yyyy + ""+ n_mm;

    	
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_payMonth').getCount();
    	if(rowCnt  == 0){
    		return false;
    	}
    	
    	
    	
    	var gridMonthNm = 'mg_payMonth';
    	var redGridNM   = 'rec001w_04_a';
    	
    	
    	var start = me.lookupReference(gridMonthNm).getView().getSelectionModel().selected.startCell;
		var end   = me.lookupReference(gridMonthNm).getView().getSelectionModel().selected.endCell;
    	
		var sRowIdx = start.rowIdx;
		var eRowIdx = end.rowIdx;
		
		var temp = 0;
		if(sRowIdx > eRowIdx){
			temp    = sRowIdx;
			sRowIdx = eRowIdx;
			eRowIdx = temp;
		}
		
		var sColIdx = start.colIdx -1;
		var eColIdx = end.colIdx   -1;
		if(sColIdx > eColIdx){
			temp    = sColIdx;
			sColIdx = eColIdx;
			eColIdx = temp;
		}
		
		if(sRowIdx != eRowIdx){
			exCommon.msgAlert('취소 처리는 같은 년도만 가능합니다.');
			return false;
		}
		
	 	
		for(var i= eRowIdx; i>=sRowIdx ; i-- ){
			var record = me.getViewModel().getStore('ds_payMonth').getAt(i);
			var YEAR   = record.get("YEAR");
			
			for(var k= sColIdx; k<=eColIdx; k++){
				var varStatus = record.get("M_STATUS_"+exCommon.addZero(k));
				
				if( varStatus == "9"){
					exCommon.msgAlert("CMS 요청 처리중인 데이터는 취소처리 못합니다.");
		 		}else if( varStatus == "3"){
		 			var temp_yyyymm = YEAR+exCommon.addZero(k);
		 			var temp_month  = exCommon.addZero(k);
		 			var temp_amount = me.inGetCancelAmount(temp_yyyymm);
		 			
		 			var tem_AproveGbn = record.get("A_STATUS_"+temp_month);
		 			
		 			var rdo_ApprovalGbn = "1"
		 			
		 			
		 			if(tem_AproveGbn =! "1"){
	 					exCommon.msgAlert("현금납부건만 취소 가능합니다.");
	 					return false;
		 			}
		 			
		 			
		 	    	if(temp_amount != 0){
		 	    		var rtnAdd = me.inAdd2(temp_yyyymm,temp_amount);
		 	    		console.log('rtnAdd = ', rtnAdd);
		 	    		console.log('temp_yyyymm = ', temp_yyyymm);
		 	    		
		 	    		console.log("amount_"+temp_month, " == "+rtnAdd )
		 	    		if(rtnAdd == 1){
		 	    			record.set("amount_"+temp_month , temp_amount);
		 	    			record.set("M_STATUS_"+temp_month , "1");
		 	    		}else if(rtnAdd == 2){
		 	    			
		 	    			var selectRecord =  me.lookupReference('rec001w_04_a').getView().getSelectionModel().getSelection()[0];
		 	    			
	 	    				f_year       = selectRecord.get("INDEUNG_YEAR");
		 	    			f_month      = parseInt(selectRecord.get("INDEUNG_MONTH"));
		 	    			
		 	    			
		 	    			if(f_month < 10){
		 	    				f_month  =  "0"+f_month;
		 	    			}
		 	    			
		 	    			var f_yyyymm    = f_year+""+f_month;
		 	    			
		 	    			if(parseInt(f_yyyymm) <= temp_yyyymm && n_yyyymm >= temp_yyyymm){
		 	    				record.set("M_STATUS_"+temp_month , 2);
		 	    			}else{
		 	    				record.set("M_STATUS_"+temp_month , "1");
		 	    			}
		 	    			record.set("amount_"+temp_month , 0);
		 	    			
	 	    				
		 	    		}else{
		 	    			record.set("amount_"+temp_month , 0);
	 	    				record.set("M_STATUS_"+temp_month , "3");
		 	    		}
		 	    	}//temp_amount
		 	    	
		 		}else{
		 			exCommon.msgAlert("해당 기간은 취소를 할 수 없습니다.");
		 		}
			}// for k
		}// for i
    },
    inGetCancelAmount : function(temp_yyyymm){
    	var me        = this;
    	
    	var misuStoreNm = 'ds_misuRec';
    	
    	var rtnAmount = 0;
    	var rowCnt = me.getViewModel().getStore(misuStoreNm).getCount();
    	
    	for(var i = 0; i< rowCnt ; i++){
    		if( temp_yyyymm == me.getViewModel().getStore(misuStoreNm).getAt(i).get("PAYMENT_YYYYMM") ){
    			rtnAmount += ( me.getViewModel().getStore(misuStoreNm).getAt(i).get("AMOUNT") * -1);
    		}
    	}// for
    	return rtnAmount;
    },
    
    onExcelSunap : function(){
    	var me = this;
    	
    	var selectType   = exCommon.getRepVal(me.lookupReference('rd_acceptGbn').getValue().rd_acceptGbn, "ID")
    	
		var grid = me.lookupReference('tr_sunab3_a');
    	exCommon.excelDown(grid, 'INDEUNG', '인등납부내역',  me.getViewModel().getStore('ds_misuRec').getCount());	
    },
    onExcel : function(){
    	var me = this;
    	
    	
    	var grid = me.lookupReference('rec001w_04_a');
        exCommon.excelDown(grid, 'INDEUNG', '인등접수조회',  me.getViewModel().getStore('ds_IDRec').getCount());	
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    }
})

