Ext.define('ExFrm.view.rec.rec024w_07Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec024w_07',
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	
    	setTimeout(function(){
    		me.onSelect();
    	},50);
    },
    onSelect : function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', null ,me.onSelectCallback);
    	},50);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec024w_07_a').getView().select(0);
    	}
    	
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	
    	//console.log(cellIndex);
    	
       if(cellIndex != 3){
    	   return false;
       }
    	
       
       
    	var ACCT_GBN = record.get("ACCT_GBN");
    	var IE_GBN   = record.get("IE_GBN");
    	var KWAN     = record.get("KWAN");
    	var MOK      = record.get("MOK");
    	var HANG     = record.get("HANG");
    	var MOK_NAME = record.get("ACCNAME");
    	var HANG_NAME= record.get("HANG_NAME");
    	
    	var params  =  {
    		 ACCT_GBN  : ACCT_GBN    		 
    		,IE_GBN    : IE_GBN
    		,KWAN      : KWAN
    		,MOK       : MOK
    		,HANG      : HANG
    		,HANG_NAME : HANG_NAME
    		,MOK_NAME  : MOK_NAME
    	}
    	this.openPopup('ExFrm.view.com.accounts',  params, this.onCellDbClickReceive);
    },
    onCellDbClickReceive : function(params, me){
    	console.log('onCellDbClickReceive', params);
    	
    	var record = me.lookupReference('rec024w_07_a').getView().getSelectionModel().getSelection()[0];
    	record.set("ACCT_GBN" , params.ACCT_GBN);
    	record.set("IE_GBN"   , params.IE_GBN);
    	record.set("KWAN"     , params.KWAN);
    	record.set("HANG"     , params.HANG);    	
    	record.set("MOK"      , params.MOK);
    	record.set("ACCNAME" , params.MOK_NAME);
    	
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0){
    			return;
    		}
    		
    		
    		
			var params ={
				"V_PRAY_CODE" :  record[0].get("PRAY_CODE")
			}
			
			setTimeout(function(){
	    		me.callStore(me, 'ds_amount_mgt', '', params ,me.dsamountCallback);
	    	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsamountCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec024w_07_b').getView().select(0);
    		
    		var row = me.getViewModel().getStore('ds_amount_mgt').getCount();
    		if(row >  0){
    			var lastRecord = me.getViewModel().getStore('ds_amount_mgt').getAt(row-1);
    			var END_YYYYMM = exCommon.getRepVal( lastRecord.get("END_YYYYMM") );
    			if(END_YYYYMM == ""){
    				lastRecord.set("EDIT", "Y");
    			}
    		}
    		
    	}
    	
    },
    onAdd : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	var data = {
    		 "SQL_MODE" : "I"
    		,"USE_YN"   : true
    	}
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('rec024w_07_a').getView().select(row);
    	me.lookupReference('rec024w_07_a').plugins[0].startEditByPosition({
            row   : row,
            column: 0
        });
    },
    onSave : function(){
    	var me  = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var PRAY_NM = exCommon.getRepVal( record.get("PRAY_NM") );
    		var AMOUNT  = exCommon.getRepVal( record.get("AMOUNT") );
    		
    		if(PRAY_NM == ""){
    			exCommon.msgAlert('기도명 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec024w_07_a').getView().select(i);
    			return false;
    		}
    		
    		if(AMOUNT == ""){
    			exCommon.msgAlert('기도비 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec024w_07_a').getView().select(i);
    			return false;
    		}
    		
    		if(AMOUNT <= 0 ){
    			exCommon.msgAlert('기도비는 0원 이상이여야 합니다.');
    			me.lookupReference('rec024w_07_a').getView().select(i);
    			return false;
    		}
    		
    	}// for
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC024W_07/saveMgt.suvila'
    		,me.onSaveCallback
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success, action ,'ds_main' );
    	
    	if(success) me.onSelect();
    },
    onCancel : function(){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('rec024w_07_a').getView().getSelectionModel().getSelection();
    	if(selectedRecord.length <= 0){
    		exCommon.msgAlert('삭제할 자료를 먼저 선택하여주십시요.');
    		return false;
    	}
    	
    	var SQL_MODE = exCommon.getRepVal( selectedRecord[0].get("SQL_MODE") );
    	if( SQL_MODE != "I"){
    		exCommon.msgAlert('기존에 저장된 자료입니다.<br/>저장되지 않은 자료만 취소 가능합니다.');
    		return false;
    	}
    	
    	exCommon.gridRemoveDetail(me , 'rec024w_07_a' , 'ds_main');
    },
    onAddRight : function(){
    	var me  = this;
    	
    	var change  =  exCommon.ChangeCount('ds_main' , me);
    	
    	if(change > 0){
    		exCommon.msgAlert('기도목록에 변경된자료가 있습니다<br/>저장 후 작업하십시오.');
    		return false;
    	}
    	
    	//var valCheck = 0;
    	var row      = me.getViewModel().getStore('ds_amount_mgt').getCount();
    	
    	for(var i = 0; i < row ; i++){
    		var END_YYYYMM =  exCommon.getRepVal( me.getViewModel().getStore('ds_amount_mgt').getAt(i).get("END_YYYYMM") );
    		
    		if(END_YYYYMM == ""){
    			exCommon.msgAlert('신규로 입력하기 전에 종료월을 먼저 입력하셔야 합니다.');
    			me.lookupReference('rec024w_07_b').getView().select(i);
    			//valCheck = i;
    			return false;
    		}
    	}// for
    	
    	if( ! me.isValidationPriceMgt()) return false;
    	
    	var data = {
    		 "TEMPLE_CD"  :  exCommon.user.templeCd
    		,"SQL_MODE"   : "I"
    		,"AMOUNT"     : 0
    		,"PRAY_CODE"  : me.lookupReference('rec024w_07_a').getView().getSelectionModel().getSelection()[0].get("PRAY_CODE")
    	}
    	me.getViewModel().getStore('ds_amount_mgt').add(data);
    	
    	
    	if(row  == 0){
    		me.getViewModel().getStore('ds_amount_mgt').getAt(row).set("START_YYYYMM" , exCommon.getNowDate().substring(0,6) );
    	}else{
    		
    		console.log(me.getViewModel().getStore('ds_amount_mgt').getAt(row-1).data);
    		var y = me.getViewModel().getStore('ds_amount_mgt').getAt(row-1).get("END_YYYYMM").substring(0,4);
    		var m = me.getViewModel().getStore('ds_amount_mgt').getAt(row-1).get("END_YYYYMM").substring(4);
    		
    		if(m == "12"){
				m = "1"
				y = y*1 +1;
			}else{
				m = m*1 +1;
			}
    		
    		if(m < 10){
				m = "0" + m.toString();
			}
    		
    		me.getViewModel().getStore('ds_amount_mgt').getAt(row).set("START_YYYYMM", y.toString()+m.toString());
    	}
    	me.lookupReference('rec024w_07_b').getView().select(row);
    	
    },
    isValidationPriceMgt : function(){
    	var me = this;
    	
    	var TEMP_END_YYYYMM = "";
    	
    	var row = me.getViewModel().getStore('ds_amount_mgt').getCount();
    	for(var i = 0; i < row ; i++){
    		
    		var record = me.getViewModel().getStore('ds_amount_mgt').getAt(i);
    		
    		
    		var START_YYYYMM = exCommon.getRepVal( record.get("START_YYYYMM") );
    		if( START_YYYYMM != null && START_YYYYMM != "" ){
    			try{
    				START_YYYYMM = START_YYYYMM.replace("/","");
    			}catch (e) {
					var date = new Date(START_YYYYMM);
					var month = date.getMonth() + 1;
					if(month< 10){
						month = "0"+month;
					}
					START_YYYYMM = date.getFullYear() + "" + month;
				}
    		}
    		var start_yyyy   = START_YYYYMM.substring(0,4)
    		var start_mm 	 = START_YYYYMM.substring(4)
    		
    		
    		var END_YYYYMM = exCommon.getRepVal( record.get("END_YYYYMM") );
    		if( END_YYYYMM != null && END_YYYYMM != "" ){
    			try{
    				END_YYYYMM = END_YYYYMM.replace("/","");
    			}catch (e) {
					var date = new Date(END_YYYYMM);
					var month = date.getMonth() + 1;
					if(month< 10){
						month = "0"+month;
					}
					END_YYYYMM = date.getFullYear() + "" + month;
				}
    		}
    		
    		var end_yyyy   = END_YYYYMM.substring(0,4)
    		var end_mm     = END_YYYYMM.substring(4)
    		
    		
    		if ( START_YYYYMM == "" ) {
    			exCommon.msgAlert("시작월은 필수입니다.");    			
    			me.lookupReference('rec024w_07_b').getView().select(i);
    			return false;
    		}//End s
    		
    		if(isNaN(START_YYYYMM)|| START_YYYYMM.length !=6){
    			exCommon.msgAlert("시작월은 숫자 6자리를 입력하셔야 합니다.");
    			me.lookupReference('rec024w_07_b').getView().select(i);
    			return false;
    		}//End len
    		
    		if(start_mm*1 > 12){
    			exCommon.msgAlert("달은 12를 초과할수 없습니다.");
    			me.lookupReference('rec024w_07_b').getView().select(i);
    			return false;
    		}// Emd mon
    		
    		if(TEMP_END_YYYYMM != "" && TEMP_END_YYYYMM >= START_YYYYMM){
    			exCommon.msgAlert("종료월은 시작월보다 커야 합니다.");
    			me.lookupReference('rec024w_07_b').getView().select(i);
    			return false;
    		}
    		
    		
    		if(END_YYYYMM != ""){
    			if(isNaN(END_YYYYMM)|| END_YYYYMM.length !=6){
    				exCommon.msgAlert("종료월은 숫자 6자리를 입력하셔야 합니다.");
    				me.lookupReference('rec024w_07_b').getView().select(i);
    				return false;
    			}
    			
    			if ( START_YYYYMM > END_YYYYMM) {
    				exCommon.msgAlert("종료월은 시작월보다 커야 합니다.");
    				me.lookupReference('rec024w_07_b').getView().select(i);
    				return false;
    			}
    			
    			if(end_mm*1 > 12){
    				exCommon.msgAlert("달은 12를 초과할수 없습니다.");
    				me.lookupReference('rec024w_07_b').getView().select(i);
    				return false;
    			}
    		}// End e
    		
    		if (i != (row -1) && END_YYYYMM == "" ){
    			exCommon.msgAlert("마지막 데이터가 아닌경우 종료월은 필수입니다.");
    			me.lookupReference('rec024w_07_b').getView().select(i);
    			return false;
    		}
    		
    		TEMP_END_YYYYMM = END_YYYYMM;
    	}// for
    	return true;
    }, 
    onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	var colIdx     = parseInt(context.colIdx);
    	var END_YYYYMM = exCommon.getRepVal( me.getViewModel().getStore('ds_amount_mgt').getAt(context.rowIdx).get("END_YYYYMM") );
    	var EDIT       = exCommon.getRepVal( me.getViewModel().getStore('ds_amount_mgt').getAt(context.rowIdx).get("EDIT") );
    	var SQL_MODE   = exCommon.getRepVal( me.getViewModel().getStore('ds_amount_mgt').getAt(context.rowIdx).get("SQL_MODE") );
    	
    	if(colIdx == 3 || (colIdx == 1 && END_YYYYMM == "" ) || EDIT == "Y" || SQL_MODE == "I"){
    		return true;
    	}else{
    		return false;
    	}
    	
    	return true;
    },
    onSaveRight : function(){
    	var me = this;
    	
    	var flag = me.isValidationPriceMgt();
    	
    	console.log('flag = ', flag);
    	
    	if( ! flag) return false;
    	
    	exCommon.fnGridSaveAll(
       		 me
       		,'ds_amount_mgt'
       		,'newData'
       		,'uptData'
       		,'delData'
       		,'/rec/REC024W_07/savePriceMgt.suvila'
       		,me.savePriceMgtCallback
       	);
    },
    savePriceMgtCallback : function(me, success, form, action){
    	if(success){
    		
    		var record = me.lookupReference('rec024w_07_a').getView().getSelectionModel().getSelection()[0];
    		var params ={
				"V_PRAY_CODE" :  me.lookupReference('rec024w_07_a').getView().getSelectionModel().getSelection()[0].get("PRAY_CODE")
			}
			
			setTimeout(function(){
	    		me.callStore(me, 'ds_amount_mgt', '', params ,me.dsamountCallback);
	    	},50);
    	}
    	
    },
    onCancelRight : function(){
    	var me = this;
    
    	var selectedRecord = me.lookupReference('rec024w_07_b').getView().getSelectionModel().getSelection();
    	if(selectedRecord.length <= 0){
    		exCommon.msgAlert('삭제할 자료를 먼저 선택하여주십시요.');
    		return false;
    	}
    	
    	var SQL_MODE = exCommon.getRepVal( selectedRecord[0].get("SQL_MODE") );
    	if( SQL_MODE != "I"){
    		exCommon.msgAlert('기존에 저장된 자료입니다.<br/>저장되지 않은 자료만 취소 가능합니다.');
    		return false;
    	}
    	
    	exCommon.gridRemoveDetail(me , 'rec024w_07_b' , 'ds_amount_mgt');
    }
    
    
})
