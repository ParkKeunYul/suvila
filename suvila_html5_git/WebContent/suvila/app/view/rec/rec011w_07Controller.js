Ext.define('ExFrm.view.rec.rec011w_07Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec011w_07',
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
    		me.lookupReference('rec011w_07_a').getView().select(0);
    	}
    	
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);	
    	
        if(clickedDataIndex != "ACCNAME"){
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
    	
    	var record = me.lookupReference('rec011w_07_a').getView().getSelectionModel().getSelection()[0];
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
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onAdd : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var SUPPORT_NM = exCommon.getRepVal( record.get("SUPPORT_NM") );
    		if(SUPPORT_NM == ""){
    			exCommon.msgAlert('후원명 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec011w_07_a').getView().select(i);
    			return false;
    		}
    	}// for
    	
    	
    	var data = {
    		 "SQL_MODE" : "I"
    		,"USE_YN"   : true
    		,"SORT_SEQ" : row +1
    	}
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('rec011w_07_a').getView().select(row);
    	me.lookupReference('rec011w_07_a').plugins[0].startEditByPosition({
            row   : row,
            column: 1
        });
    },
    onSave : function(){
    	var me  = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var SUPPORT_NM = exCommon.getRepVal( record.get("SUPPORT_NM") );
    		if(SUPPORT_NM == ""){
    			exCommon.msgAlert('후원명 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec011w_07_a').getView().select(i);
    			return false;
    		}
    		
    		for( var j = 0; j< row ; j++ ){
    			var sub_record  = me.getViewModel().getStore('ds_main').getAt(j);
    			
    			var SUB_SUPPORT_NM =  exCommon.getRepVal( sub_record.get("SUPPORT_NM") );
    			
    			if(SUB_SUPPORT_NM == SUPPORT_NM && i != j){
					me.lookupReference('rec011w_07_a').getView().select(j);
					exCommon.msgAlert('후원명이 중복되었습니다. 중복된 후원명을 수정하세요.');
					return false;
				}
    		}// for j
    		
    	}// for
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC011W_07/save.suvila'
    		,me.onSaveCallback
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success, action ,'ds_main' );
    	
    	if(success) me.onSelect();
    },
    onSortUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var selection = me.lookupReference('rec011w_07_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec011w_07_a').getStore().indexOf(selection);
    	
    	
    	if(_idx == 0) return false;
    	
    	
    	var upRecord    = me.lookupReference('rec011w_07_a').getStore().getAt(_idx-1);
    	var upSortSeq   = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_main').sort([{
            property  : 'SORT_SEQ',
            direction : 'ASC'
        }]);
    	
    },
    onDownUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_main').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var selection = me.lookupReference('rec011w_07_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec011w_07_a').getStore().indexOf(selection);
    	if(_tCnt == (_idx+1) ) return false;
    	
    	var downRecord   = me.lookupReference('rec011w_07_a').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_main').sort([{
            property  : 'SORT_SEQ',
            direction : 'ASC'
        }]);
    },
})
