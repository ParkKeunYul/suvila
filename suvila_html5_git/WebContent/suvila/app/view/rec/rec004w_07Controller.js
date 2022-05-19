Ext.define('ExFrm.view.rec.rec004w_07Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec004w_07',
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
    		me.lookupReference('rec004w_07_a').getView().select(0);
    	}
    	
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	
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
    	
    	var record = me.lookupReference('rec004w_07_a').getView().getSelectionModel().getSelection()[0];
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
				"V_EVENT_CD" :  record[0].get("EVENT_CD")
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
    		me.lookupReference('rec004w_07_b').getView().select(0);
    	}
    	
    },
    onAdd : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_General').getCount();
    	
    	var data = {
    		 "SQL_MODE" : "I"
    		,"SORT_SEQ" : row + 1	 
    	}
    	me.getViewModel().getStore('ds_General').add(data);
    	me.lookupReference('rec004w_07_a').getView().select(row);
    	me.lookupReference('rec004w_07_a').plugins[0].startEditByPosition({
            row   : row,
            column: 1
        });
    },
    onSave : function(){
    	var me  = this;
    	
    	var row = me.getViewModel().getStore('ds_General').getCount();
    	
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_General').getAt(i);
    		
    		var EVENT_NAME = exCommon.getRepVal( record.get("EVENT_NAME") );
    		
    		if(EVENT_NAME == ""){
    			exCommon.msgAlert('행사명 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec004w_07_a').getView().select(i);
    			return false;
    		}
    		
    		
    		for( var j = 0; j< row ; j++ ){
    			var sub_record  = me.getViewModel().getStore('ds_General').getAt(j);
    			
    			var SUB_EVENT_NAME =  exCommon.getRepVal( sub_record.get("EVENT_NAME") );
    			
    			if(EVENT_NAME == SUB_EVENT_NAME && i != j){
					me.lookupReference('rec004w_07_a').getView().select(j);
					exCommon.msgAlert('행사명이 중복되었습니다. 중복된 행사명을 수정하세요.');
					return false;
				}
    		}// for j
    		
    	}// for
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_General'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC004W_07/GeneralSave.suvila'
    		,me.onSaveCallback
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success, action ,'ds_General' );
    	
    	if(success) me.onSelect();
    },
    onCancel : function(){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('rec004w_07_a').getView().getSelectionModel().getSelection();
    	if(selectedRecord.length <= 0){
    		exCommon.msgAlert('삭제할 자료를 먼저 선택하여주십시요.');
    		return false;
    	}
    	
    	var SQL_MODE = exCommon.getRepVal( selectedRecord[0].get("SQL_MODE") );
    	if( SQL_MODE != "I"){
    		exCommon.msgAlert('기존에 저장된 자료입니다.<br/>저장되지 않은 자료만 취소 가능합니다.');
    		return false;
    	}
    	
    	exCommon.gridRemoveDetail(me , 'rec004w_07_a' , 'ds_General');
    },
    onAddRight : function(){
    	var me  = this;
    	
    	var change  =  exCommon.ChangeCount('ds_General' , me);
    	
    	if(change > 0){
    		exCommon.msgAlert('위패 목록에 변경된자료가 있습니다<br/>저장 후 작업하십시오.');
    		return false;
    	}
    	
    	//var valCheck = 0;
    	var row      = me.getViewModel().getStore('ds_Detail').getCount();
    	
    	
    	var data = {
    		 "TEMPLE_CD"  :  exCommon.user.templeCd
    		,"SQL_MODE"   : "I"
    		,"AMOUNT"     : 0
    		,"EVENT_CD"   : me.lookupReference('rec004w_07_a').getView().getSelectionModel().getSelection()[0].get("EVENT_CD")
    		,"COMPLET_YN" : false
    		,"EVENT_DATE" : exCommon.getNowDate() 
    	}
    	me.getViewModel().getStore('ds_Detail').add(data);
    	
    	me.lookupReference('rec004w_07_b').getView().select(row);
    	/*me.lookupReference('rec004w_07_b').plugins[0].startEditByPosition({
            row   : row,
            column: 1
        });*/
    	
    },
    /*onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	var colIdx     = parseInt(context.colIdx);
    	var EVENT_DATE = exCommon.getRepVal( me.getViewModel().getStore('ds_Detail').getAt(context.rowIdx).get("EVENT_DATE") );
    	var EDIT       = exCommon.getRepVal( me.getViewModel().getStore('ds_Detail').getAt(context.rowIdx).get("EDIT") );
    	var SQL_MODE   = exCommon.getRepVal( me.getViewModel().getStore('ds_Detail').getAt(context.rowIdx).get("SQL_MODE") );
    	
    	//console.log('EDIT = ', EDIT);
    	
    	return true;
    },*/
    onSaveRight : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_Detail').getCount();
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_Detail').getAt(i);
    		
    		var EVENT_DATE = toDateForm( record.get("EVENT_DATE") );
    		
    		if(EVENT_DATE == ""){
    			exCommon.msgAlert('입제일 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec004w_07_b').getView().select(i);
    			return false;
    		}
    		
    		if(!gf_validateDateDS(me , i , 'ds_Detail' , 'rec004w_07_b' , "EVENT_DATE"    , '입제일')){
    			return false;
    		}
    		record.set("EVENT_DATE", EVENT_DATE);
    		
    		
    		for( var j = 0; j< row ; j++ ){
    			var sub_record  = me.getViewModel().getStore('ds_Detail').getAt(j);
    			
    			var SUB_EVENT_DATE =  exCommon.getRepVal( sub_record.get("EVENT_DATE") );
    			
    			if(EVENT_DATE == SUB_EVENT_DATE && i != j){
					me.lookupReference('rec004w_07_b').getView().select(j);
					exCommon.msgAlert('중복된 입제일입니다.');
					return false;
				}
    		}// for j
    		
    	}// for
    	
    	exCommon.fnGridSaveAll(
       		 me
       		,'ds_Detail'
       		,'newData'
       		,'uptData'
       		,'delData'
       		,'/rec/REC004W_07/DetailSave.suvila'
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
			"V_EVENT_CD" :  me.lookupReference('rec004w_07_a').getView().getSelectionModel().getSelection()[0].get("EVENT_CD")
		}
		
		setTimeout(function(){
    		me.callStore(me, 'ds_Detail', '', params ,me.dsDetailCallback);
    	},50);
    },
    onCancelRight : function(){
    	var me = this;
    	
    	exCommon.gridRemoveDetail(me , 'rec004w_07_b' , 'ds_amount_mgt');
    },
    onSortUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_General').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var selection = me.lookupReference('rec004w_07_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec004w_07_a').getStore().indexOf(selection);
    	
    	
    	if(_idx == 0) return false;
    	
    	
    	var upRecord    = me.lookupReference('rec004w_07_a').getStore().getAt(_idx-1);
    	var upSortSeq   = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_General').sort([{
            property  : 'SORT_SEQ',
            direction : 'ASC'
        }]);
    	
    },
    onDownUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_General').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var selection = me.lookupReference('rec004w_07_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec004w_07_a').getStore().indexOf(selection);
    	if(_tCnt == (_idx+1) ) return false;
    	
    	var downRecord   = me.lookupReference('rec004w_07_a').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_General').sort([{
            property  : 'SORT_SEQ',
            direction : 'ASC'
        }]);
    },
    
    
})
