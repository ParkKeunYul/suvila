Ext.define('ExFrm.view.rec.rec024w_04Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec024w_04',
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
    	
    	
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
    	
		
		// 체크박스
		fn_getBudNo(me, '' , "all");
		
		
		setTimeout(function(){
    	//	me.onSelect();
    	},50);
		
		
		
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
    	}
    },
    dstempleUserCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.dsclassMgtCallback);
    	},50);
    },
    dsclassMgtCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_aprayMgt', '', null ,me.dsaprayMgtCallback);
    	},50);
    },
    dsaprayMgtCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_aprayMgt').getAt(0).set("PRAY_NM", "전체");
    	}
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
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSelect : function(sel_row_index){
    	var me = this;
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	if(cb_date != 1){
    		me_AcceptSDate = me_AcceptSDate.substring(0,6);
    		me_AcceptEDate = me_AcceptEDate.substring(0,6);
    	}
    	

    	console.log('sel_row_index =', parseInt( sel_row_index));
    	var sel_row_index = sel_row_index;
    	if(isNaN(sel_row_index)){
    		sel_row_index = 0;
    	}
    	var G_ROW_INDEX = exCommon.getRepVal(sel_row_index , 0);
    	
    	console.log('G_ROW_INDEX= ', G_ROW_INDEX);
    	
    	
    	var params = {
    		 V_PROPOSAL_BUD_NO  : me.lookupReference('hid_bud_no').getExValue()
    		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
    		,V_ACCEPT_SDATE 	: me_AcceptSDate
    		,V_ACCEPT_EDATE 	: me_AcceptEDate
    		,V_PRAY_CODE    	: me.lookupReference('lc_aprayMgt').getExValue()
    		,V_PAY_STATE    	: me.lookupReference('lc_payState').getExValue()
    		,V_APPROV       	: me.lookupReference('lc_approv').getExValue()
    		,VV_USER_ID     	: me.lookupReference('lc_templeUser').getExValue()
    		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
    		,G_ROW_INDEX        : G_ROW_INDEX
    	}
    	
    	//console.log('params= ', params);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_detail', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec024w_04_a').getView().select(action._params.G_ROW_INDEX);
    	}
    },
    onSave : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    			 me
    			,'ds_detail'
    			,'newData'
    			,'uptData'
    			,'delData'
    			,'/rec/REC024W_03/saveDetail.suvila'
    			,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	if( success ){
    		exCommon.fnGridSaveCallback( me, success , action , 'ds_detail' );
    	}
    },
    setBudNo : function(){
    	var me = this;
    	console.log('setBudNo = ');
    	fn_setBudNo(me, '');
    },
    onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	var colIdx = parseInt(context.colIdx);
    	
    	var END_YN = me.getViewModel().getStore('ds_detail').getAt(context.rowIdx).get("END_YN");
    	
    	if( (colIdx == 11 && END_YN == "T") || colIdx == 12 ||  colIdx == 10){
    		console.log(1);
    		return true;
    	}else{
    		return false;
    	}
    	
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0){
    			return;
    		}
    		
    		var record = me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    		//console.log('record = ', record);
    		
    		var params = {
    			 V_ACCEPT_GBN : 13
    			,V_ACCEPT_SEQ : record.get("ACCEPT_SEQ")
    			,V_SEQ        : record.get("SEQ")
    			,V_PRAY_CODE  : record.get("PRAY_CODE")
    			,V_PROD_CODE  : record.get("PRAY_CODE")
    		}
    		
    		setTimeout(function(){
				me.callStore(me, 'ds_payMonth', '', params ,me.dspayCallback);    				
			},50);
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dspayCallback : function(me, success, form, action){
    	
    	setTimeout(function(){
			me.callStore(me, 'ds_misuRec', '', action._params ,me.dsmisuCallback);    				
		},50);
    },
    dsmisuCallback : function(me, success, form, action){
    	
    	if(success){
    		me.lookupReference('tr_sunab3_a').getView().select(0);
    	}
    	setTimeout(function(){
			me.callStore(me, 'ds_rec_base_amount', '', action._params ,null);    				
		},50);
    },
    onSunab2 : function(){
    	var me = this;
    	
    	
    	if( me.getViewModel().getStore('ds_payMonth').getCount() == 0 ) return false;
    	
    	
    	if( me.inCheckEnd() )return;
    	
    	
    	var selectRecord     = me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    	
    	var v_AG = 13;
    	var v_EY = selectRecord.get("END_YN");
    	
    	
    	if(v_AG == "2" || v_AG == "4" || v_AG == "12" || v_AG == "14" || v_AG == "15"){
    		if(  (v_AG == "15" && v_EY =='T'  )  ||  me.getViewModel().getStore('ds_lightOut').getAt(0).get("CLOSE_YN") == "T" ){
    			setTimeout(function(){
    				Ext.Msg.alert('알림',"소등처리된 경우는 수납 처리를 할수 없습니다.");    				
    			},50);
    			
    			return;
    		}
    	}// v_AG
    	
    	
    	var start = me.lookupReference('tr_sunab3_b').getView().getSelectionModel().selected.startCell;
		var end   = me.lookupReference('tr_sunab3_b').getView().getSelectionModel().selected.endCell;
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
		 			var temp_yyyymm = YEAR+exCommon.addZero(k);
		 			var temp_month  = exCommon.addZero(k);
		 			var temp_amount = me.inGetAmount( new Number( temp_yyyymm ) );
		 			
		 			var v_AG = me.getViewModel().getStore('ds_payMonth').getAt(0).get("ACCEPT_GBN");
		 			
		 			if( (v_AG =="2"|| v_AG =="9"|| v_AG =="13"|| v_AG =="15")  &&  new Number(temp_yyyymm) < new Number(me.getViewModel().getStore('ds_misuRec').getAt(0).get("PAYMENT_YYYYMM")) ){
		 				exCommon.msgAlert("해당 기간은 납부 기간이 아닙니다.");
			 			return;
		 			}
		 			
		 			
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
    onAddYear : function(){
    	
    	var me = this;
    	
    	if( me.inCheckEnd() )return;
    	
    	var cnt = me.getViewModel().getStore('ds_payMonth').getCount();
    	
    	var selectRecord  =  me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	if(cnt  == 0){
    		var start_yyyy = me.getViewModel().getStore('ds_misuRec').getAt(0).get("PAYMENT_YYYYMM").substr(0,4);
    		var data ={
				 TEMPLE_CD 	 : selectRecord.get("TEMPLE_CD")
    			,ACCEPT_SEQ  : selectRecord.get("ACCEPT_SEQ")
    			,SEQ 		 : selectRecord.get("SEQ")
    			,ACCEPT_GBN  : "13"
    			,INDEUNG_GBN : selectRecord.get("INDEUNG_GBN")
    			,YEAR 		 : parseInt(start_yyyy,10)
    		}
    		me.getViewModel().getStore('ds_payMonth').insert(0 , data);
    	}else{
    		
    		var nextYear = "";
    		//console.log('cnt = ', (cnt));
    		for(i=cnt-1; i >= 0; i--){
    			nextYear = me.getViewModel().getStore('ds_payMonth').getAt(i).get("YEAR");
    		}//for
    		nextYear = parseInt( nextYear ) + 1;
    		
    		//console.log('nextYear= '+ nextYear);
    		
    		var data = {
    			 TEMPLE_CD 	 : selectRecord.get("TEMPLE_CD")
    			,ACCEPT_SEQ  : selectRecord.get("ACCEPT_SEQ")
    			,SEQ 		 : selectRecord.get("SEQ")
    			,ACCEPT_GBN  : "13"
    			,INDEUNG_GBN : selectRecord.get("INDEUNG_GBN")
    			,YEAR 		 : nextYear
    		}
    		me.getViewModel().getStore('ds_payMonth').insert(0 , data);
    	}
    	me.lookupReference('tr_sunab3_b').getView().select(0);
    	
    },
    onSaveSunap : function(){
    	var me = this;
    	
    	
    	
    	var selectRecord  =  me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	if(selectRecord.get("SMS_YN") == "T"){
    		//console.log('222');
    		me.getViewModel().getStore('ds_sms').clearData();
    		
    		var totAmt  = 0;
        	var misuCnt = me.getViewModel().getStore('ds_misuRec').getCount();
        	for(var i = 0; i<misuCnt ; i++){
        		
        		var SQL_MODE = me.getViewModel().getStore('ds_misuRec').getAt(i).get("SQL_MODE");
        		if( SQL_MODE == "I" ){
        			totAmt +=   exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") );
        		}
        	}// for
        	
        	if(totAmt > 0){
        		var TR_MESSAGE   = "["+exCommon.user.templeNm+"] "+selectRecord.get("PRAY_NM") + exCommon.setNumberFormat(totAmt)+ "원 보시하셨습니다. 성불하세요.";
        		var MOBILE_TELNO = selectRecord.get("MOBILE_TELNO1")+""+selectRecord.get("MOBILE_TELNO2")+""+selectRecord.get("MOBILE_TELNO3");
        		var data = {
       				 TR_ID 		  : "1"
       				,TR_SENDSTAT  : "0"
  					,TR_PHONE 	  : MOBILE_TELNO
  					,TR_DEST_INFO : selectRecord.get("PROPOSAL_BUD_NM")+"^"+MOBILE_TELNO
  					,TR_CALLBACK  : exCommon.user.tel
  					,TR_SMS_YN    : "T"
  					,TR_ETC1 	  : exCommon.user.templeCd
  					,TR_ETC2 	  : selectRecord.get("PROPOSAL_BUD_NO")
  					,TR_ETC3 	  : "SMSREC"
  					,TR_ETC4 	  : "10"
  					,TR_ETC5 	  : exCommon.user.userId
  					,TR_MESSAGE   : TR_MESSAGE
  					
  					,ACCEPT_SEQ   : selectRecord.get("ACCEPT_SEQ")
  	    	    	,SEQ 		  : selectRecord.get("SEQ")
  	    	    	,ACCEPT_GBN   : selectRecord.get("ACCEPT_GBN")
    			}// data
        		console.log('data = ', data);
    			me.getViewModel().getStore('ds_sms').add( data );
    		}
    	}
    	
    	exCommon.addParamSetting(me, 'ds_misuRec'		, 'ds_misuRec');
    	exCommon.addParamSetting(me, 'ds_sms'			, 'ds_sms');
    	
		setTimeout(function(){
			me.callForm(me, '/rec/REC000P_02/saveLimit.suvila', me.saveLimitCallback , false);
		},10);
		
    },    
    saveLimitCallback : function(me, success, form, action){
    	console.log('saveLimitCallback = ',success );
    	
    	exCommon.fnGridSaveCallback(me, success, action,'ds_misuRec');
    	if(success) {
    		
    		
    		var selectedRecord = me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    		var rowIndex = me.lookupReference('rec024w_04_a').getStore().indexOf(selectedRecord);
    		
    		me.onSelect( rowIndex );
    		
    		
    		/*me.getViewModel().getStore('ds_misuRec').removeAll();
    		
    		var record = me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    		var params = {
    			 V_ACCEPT_GBN : 13
    			,V_ACCEPT_SEQ : record.get("ACCEPT_SEQ")
    			,V_SEQ        : record.get("SEQ")
    			,V_PRAY_CODE  : record.get("PRAY_CODE")
    			,V_PROD_CODE  : record.get("PRAY_CODE")
    		}
    		
    		setTimeout(function(){
				me.callStore(me, 'ds_payMonth', '', params ,me.dspayCallback);    				
			},50);*/
    	}
    },
    inCheckEnd : function(){
    	var me = this;
    	
    	var record     = me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    	var END_YN     = record.get("END_YN");
    	
    	
    	if(  END_YN == "T" ){
    		exCommon.msgAlert('접수가 종료되어 접수내용을 수정 하실 수 없습니다.');
    		return true;
    	}
    	return false;
    },
    inGetAmount : function(iYYYYMMDD){
    	var me = this;
    	
    	var rtnAmount = 0;
    	
    	var recRecord  =  me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	var recBaseAmountCnt = me.getViewModel().getStore('ds_rec_base_amount').getCount();
    		
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
				rtnAmount = me.getViewModel().getStore('ds_rec_base_amount').getAt(0).get("AMOUNT");
			}
		}
    	return rtnAmount;
    },
    inAdd2 : function(temp_yyyymm , amount){
    	var me = this;
    	
    	var selectRecord  =  me.lookupReference('rec024w_04_a').getView().getSelectionModel().getSelection()[0];
    	var dupleRecord   = me.getViewModel().getStore('ds_misuRec').findRecord('PAYMENT_YYYYMM', temp_yyyymm, 0, false, true, true);
    	var rowIndex      = me.lookupReference('tr_sunab3_a').getStore().indexOf(dupleRecord);
    	
    	var records = new Array();
    	var findCnt = 0;
    	for(var i = 0; i<me.getViewModel().getStore('ds_misuRec').getCount(); i++){
    		if( temp_yyyymm == me.getViewModel().getStore('ds_misuRec').getAt(i).get("PAYMENT_YYYYMM") && exCommon.getRepNum( me.getViewModel().getStore('ds_misuRec').getAt(i).get("AMOUNT") ) != 0 ){
    			records[findCnt] = i
    			findCnt++;
    		}
    	}// for
    	
    	if(records.length == 1 && rowIndex != -1 ){
    		var crtUSer =  exCommon.getRepVal( dupleRecord.get("CRT_USER") ); 
    		if(crtUSer == ""){
    			var rowIndex = me.lookupReference('tr_sunab3_a').getStore().indexOf(dupleRecord);
        		me.lookupReference('tr_sunab3_a').getStore().remove(dupleRecord);
        		
        		if(rowIndex > 0) rowIndex = rowIndex -1;
				if(rowIndex < 0) rowIndex = 0;
				me.lookupReference('tr_sunab3_a').getView().select(rowIndex);
        		
        		return 2;
    		}
    	}else if( records.length == 2 ){
    		var rowIndex = me.lookupReference('tr_sunab3_a').getStore().indexOf(dupleRecord);
    		me.lookupReference('tr_sunab3_a').getStore().remove(me.getViewModel().getStore('ds_misuRec').getAt(records[1]));
    		
    		
    		if(rowIndex > 0) rowIndex = rowIndex -1;
			if(rowIndex < 0) rowIndex = 0;
			me.lookupReference('tr_sunab3_a').getView().select(rowIndex);
    		
    		return 3;
    	}
   	
    	
    	var data = {
    		 TEMPLE_CD    	 : exCommon.user.templeCd
    		,ACCEPT_SEQ   	 : selectRecord.get("ACCEPT_SEQ")
    		,SEQ          	 : selectRecord.get("SEQ")
    		,PAYMENT_YYYYMM	 : temp_yyyymm
    		,AMOUNT       	 : amount
    		,APPROVAL_GBN 	 : "1"
    		,APPROVAL_GBN_NM : "현금접수"
    		,SUB_DATE        : exCommon.getNowDate()
    		,SQL_MODE        : 'I'
    	}
    	
    	
    	
    	var misuCnt = me.getViewModel().getStore('ds_misuRec').getCount(); 
    	me.getViewModel().getStore('ds_misuRec').add(data);
    	
    	me.lookupReference('tr_sunab3_a').plugins[0].startEditByPosition({
            row: misuCnt,
            column: 6
        });
    	me.lookupReference('tr_sunab3_a').getView().select( misuCnt );
    	
    	return 1;
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	console.log('onSearchBlur = ');
    	exCommon.onSearchBlur(
    		 me
    		,m2
    		,'hid_bud_no'
    		,'txt_budNo'
    	);
    }
})
