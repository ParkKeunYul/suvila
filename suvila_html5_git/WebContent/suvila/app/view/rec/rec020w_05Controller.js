Ext.define('ExFrm.view.rec.rec020w_05Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec020w_05',
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
    		me.callStore(me, 'ds_General', '', null ,me.onSelectCallback);
    	},50);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec020w_05_a').getView().select(0);
    	}
    	
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	if(cellIndex != 4){
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
    	var record = me.lookupReference('rec020w_05_b').getView().getSelectionModel().getSelection()[0];
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
				"V_TEMPLE_STAY_CD" :  record[0].get("TEMPLE_STAY_CD")
			}
			
			setTimeout(function(){
	    		me.callStore(me, 'ds_Detail', '', params ,me.dsDetailCallback);
	    	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsDetailCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec020w_05_b').getView().select(0);
    	}
    	
    },
    onAdd : function(){
    	var me = this;
    	
    	if(!me.inCheck(me, 'General')){
    		return false;
    	}
    	
    	var row = me.getViewModel().getStore('ds_General').getCount();
    	var data = {
    		 "SQL_MODE" : "I"
    		,"SORT_SEQ" : row + 1	 
    		,"FDATE"    : -1
    		,"PERIOD"   : 0
    		,"AMT"      : 0
    	}
    	me.getViewModel().getStore('ds_General').add(data);
    	me.lookupReference('rec020w_05_a').getView().select(row);
    	me.lookupReference('rec020w_05_a').plugins[0].startEditByPosition({
            row   : row,
            column: 1
        });
    },
    inCheck : function(me , gbn){
    	if(gbn == "General"){
    		var row = me.getViewModel().getStore('ds_General').getCount();
    		for(var i = 0; i < row ; i++){
    			var record = me.getViewModel().getStore('ds_General').getAt(i);
    			
    			var TEMPLE_STAY_NM = exCommon.getRepVal(record.get("TEMPLE_STAY_NM"), "");
    			var PERIOD         = exCommon.getRepNum(record.get("PERIOD"));
    			
    			if(TEMPLE_STAY_NM == ""){
    				exCommon.msgAlert("프로그램명은 필수입력 사항입니다.");
    				return false;
    			}
    			
    			if(PERIOD <= 0){
    				exCommon.msgAlert("기간은 0 보다 커야 합니다.");
    				return false;
    			}
    			
    			for( var j = 0; j< row ; j++ ){
        			var sub_record  = me.getViewModel().getStore('ds_General').getAt(j);
        			
        			var SUB_TEMPLE_STAY_NM =  exCommon.getRepVal( sub_record.get("TEMPLE_STAY_NM") );
        			
        			if(TEMPLE_STAY_NM == SUB_TEMPLE_STAY_NM && i != j){
    					me.lookupReference('rec020w_05_a').getView().select(j);
    					exCommon.msgAlert('행사명이 중복되었습니다. 중복된 행사명을 수정하세요.');
    					return false;
    				}
        		}// for j
    			
    		}// for
    	}
    	return true;
    },
    onSave : function(){
    	var me  = this;
    	
    	
    	if(!me.inCheck(me,'General' )){
    		return false;
    	}
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_General'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC020W_05/GeneralSave.suvila'
    		,me.onSaveCallback
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success, action ,'ds_General' );
    	
    	if(success) me.onSelect();
    },
    onCancel : function(){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('rec020w_05_a').getView().getSelectionModel().getSelection();
    	if(selectedRecord.length <= 0){
    		exCommon.msgAlert('삭제할 자료를 먼저 선택하여주십시요.');
    		return false;
    	}
    	
    	var row = me.getViewModel().getStore('ds_Detail').getCount();
    	
    	if(row > 0){
    		exCommon.msgAlert('상세목록이 존재합니다.');
    		return false;
    	}
    	exCommon.gridRemoveDetail(me , 'rec020w_05_a' , 'ds_General');
    },
    onAddRight : function(){
    	var me  = this;
    	
    	var change  =  exCommon.ChangeCount('ds_General' , me);
    	
    	if(change > 0){
    		exCommon.msgAlert('프로그램 설정에 변경된자료가 있습니다<br/>저장 후 작업하십시오.');
    		return false;
    	}
    	
    	//var valCheck = 0;
    	var row      = me.getViewModel().getStore('ds_Detail').getCount();
    	
    	
    	for(var i = 0; i< row; i ++){
    		var record = me.getViewModel().getStore('ds_Detail').getAt(i);
    		
    		var SQL_MODE = record.get("SQL_MODE");
    		
    		if(SQL_MODE == "I"){
    			exCommon.msgAlert('추가된 기존 설정이 있습니다.<br/>저장후 추가 가능합니다.');
    			return false;
    		}//    		
    		
    	}// for i
    	
    	
    	var period = parseInt( exCommon.getRepNum(me.lookupReference('rec020w_05_a').getView().getSelectionModel().getSelection()[0].get("PERIOD")) ) -1;
    	if(exCommon.getRepNum < 0){
    		period = 0;
    	}
    	
    	var data = {
    		 "TEMPLE_CD"        :  exCommon.user.templeCd
    		,"SQL_MODE"         : "I"
    		,"AMOUNT"     	    : 0
    		,"PERIOD"     	    : 0
    		,"AMT"     	        : 0
    		,"TEMPLE_STAY_NM"   : me.lookupReference('rec020w_05_a').getView().getSelectionModel().getSelection()[0].get("TEMPLE_STAY_NM")
    		,"TEMPLE_STAY_CD"   : me.lookupReference('rec020w_05_a').getView().getSelectionModel().getSelection()[0].get("TEMPLE_STAY_CD")
    		,"USE_YN"           : false
    		,"FDATE"            : exCommon.getNowDate() 
    		,"RDATE"            : exCommon.getPlusDay(period)
    		,"CAPACITY"         : 0
    	}
    	me.getViewModel().getStore('ds_Detail').add(data);
    	me.lookupReference('rec020w_05_b').getView().select(row);    	
    	
    },
    onSaveRight : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_Detail').getCount();
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_Detail').getAt(i);
    		
    		var FDATE = toDateForm( record.get("FDATE") );
    		var RDATE = toDateForm( record.get("RDATE") );
    		
    		
    		console.log('FDATE = ', FDATE);
    		console.log('RDATE = ', RDATE);
    		
    		if(FDATE == "" || FDATE == null){
    			exCommon.msgAlert('시작일 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec020w_05_b').getView().select(i);
    			return false;
    		}
    		if(RDATE == ""|| RDATE == null){
    			exCommon.msgAlert('종료일 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec020w_05_b').getView().select(i);
    			return false;
    		}
    	}// for
    	
    	exCommon.fnGridSaveAll(
       		 me
       		,'ds_Detail'
       		,'newData'
       		,'uptData'
       		,'delData'
       		,'/rec/REC020W_05/DetailSave.suvila'
       		,me.onSaveRightCallback
       	);
    },
    onSaveRightCallback : function(me, success, form, action){
    	
    	exCommon.fnGridSaveCallback( me, success, action ,'ds_General' );
    	
    	if(success) me.onSelectRight();
    	
    },
    onSelectRight : function(){
    	var me  = this;
    	var params ={
			"V_TEMPLE_STAY_CD" :  me.lookupReference('rec020w_05_a').getView().getSelectionModel().getSelection()[0].get("TEMPLE_STAY_CD")
		}
		
		setTimeout(function(){
    		me.callStore(me, 'ds_Detail', '', params ,me.dsDetailCallback);
    	},50);
    },
    onCancelRight : function(){
    	var me = this;
    	
    	exCommon.gridRemoveDetail(me , 'rec020w_05_b' , 'ds_Detail');
    },   
    
    
})
