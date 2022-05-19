Ext.define('ExFrm.view.rec.rec013w_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec013w_06',
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
    		me.callStore(me, 'ds_manageMgt', '', null ,me.onSelectCallback);
    	},50);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec013w_06_a').getView().select(0);
    	}
    	
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	
    	//console.log(cellIndex);
    	
       if(cellIndex != 2){
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
    	
    	var record = me.lookupReference('rec013w_06_a').getView().getSelectionModel().getSelection()[0];
    	record.set("ACCT_GBN" , params.ACCT_GBN);
    	record.set("IE_GBN"   , params.IE_GBN);
    	record.set("KWAN"     , params.KWAN);
    	record.set("HANG"     , params.HANG);    	
    	record.set("MOK"      , params.MOK);
    	record.set("ACCNAME" , params.MOK_NAME);
    	
    },
    onAdd : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_manageMgt').getCount();
    	
    	var data = {
    		 "SQL_MODE" : "I"
    		,"USE_YN"   : true	 
    	}
    	me.getViewModel().getStore('ds_manageMgt').add(data);
    	me.lookupReference('rec013w_06_a').getView().select(row);
    	me.lookupReference('rec013w_06_a').plugins[0].startEditByPosition({
            row   : row,
            column: 1
        });
    },
    onSave : function(){
    	var me  = this;
    	
    	var row = me.getViewModel().getStore('ds_manageMgt').getCount();
    	
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_manageMgt').getAt(i);
    		
    		var MANAGE_NM = exCommon.getRepVal( record.get("MANAGE_NM") );
    		
    		if(MANAGE_NM == ""){
    			exCommon.msgAlert('관리비 항목은 필수입력 항목입니다.');
    			me.lookupReference('rec013w_06_a').getView().select(i);
    			return false;
    		}
    		
    		
    		for( var j = 0; j< row ; j++ ){
    			var sub_record  = me.getViewModel().getStore('ds_manageMgt').getAt(j);
    			
    			var SUB_MANAGE_NM =  exCommon.getRepVal( sub_record.get("MANAGE_NM") );
    			
    			if(MANAGE_NM == SUB_MANAGE_NM && i != j){
					me.lookupReference('rec013w_06_a').getView().select(j);
					exCommon.msgAlert('관리비명이 중복되었습니다. 중복된 관리비명을 수정하세요.');
					return false;
				}
    		}// for j
    		
    	}// for
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_manageMgt'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC013W_06/save.suvila'
    		,me.onSaveCallback
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success, action ,'ds_manageMgt' );
    	if(success) me.onSelect();
    },
})
