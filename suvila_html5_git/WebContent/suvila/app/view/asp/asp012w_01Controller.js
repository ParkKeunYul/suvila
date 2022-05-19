Ext.define('ExFrm.view.asp.asp012w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp012w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_templeCd', '', null, me.onInitCallback);    		
       	},300);
    },
    onInitCallback : function (me, success, records, operation){
    	console.log('onInitCallback', success);
    	
    	if(success && records.length > 0){
    		me.lookupReference('asp012w_01_a').getView().select(0);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	if( record.length == 1){
    		
    		var params  = {
    			V_TEMPLE : record[0].get("TEMPLE_CD")
    		}
    		setTimeout(function(){
    			me.callStore(me, 'ds_main', null, params, null);
    		},10);
    	}
    },
    onCellDbClick : function(me , td , cellIndex , record , tr , rowIndex , e , eOpts ){
    	console.log('onCellDbClick', td);
    	
    	var ACCT_GBN = td.get("ACCT_GBN");
    	var IE_GBN   = td.get("IE_GBN");
    	var KWAN     = td.get("KWAN");
    	var MOK      = td.get("MOK");
    	var MOK_NAME = td.get("HANG_NAME");
    	var HANG     = td.get("HANG");
    	var HANG_NAME= td.get("HANG_NAME");
    	
    	var params  =  {
    		 ACCT_GBN  : ACCT_GBN    		 
    		,IE_GBN    : IE_GBN
    		,KWAN      : KWAN
    		,MOK       : MOK
    		,HANG      : HANG
    		,HANG_NAME : HANG_NAME
    		,MOK_NAME  : MOK_NAME
    	}   
    	
    	console.log('params', params);
    	
    	this.openPopup('ExFrm.view.com.accounts',  params, this.onCellDbClickReceive);
    },
    onCellDbClickReceive : function(params, me){
    	console.log('onCellDbClickReceive', params);
    	
    	var dsMainRecord = me.lookupReference('asp012w_01_b').getView().getSelectionModel().getSelection()[0];
    	dsMainRecord.set("ACCT_GBN" , params.ACCT_GBN);
    	dsMainRecord.set("IE_GBN"   , params.IE_GBN);
    	dsMainRecord.set("KWAN"     , params.KWAN);
    	dsMainRecord.set("HANG"     , params.HANG);    	
    	dsMainRecord.set("HANG_NAME", params.HANG_NAME);
    	dsMainRecord.set("MOK"      , 0);
    	
    	console.log("KWAN  = ", dsMainRecord.get("KWAN") );
    	
    },
    onSave : function(){
    	var me = this;
    	exCommon.fnGridSaveAll(me
				              ,'ds_main'
				              ,'newData'
				              ,'uptData'
				              ,'delData'
				              ,'/asp/asp012w_01/save.suvila'
				              , me.onSaveCallback);
    },
    onSaveCallback : function(me, success, form, action){    	
    	console.log('onSaveCallback', success);
    	exCommon.fnGridSaveCallback(me , success, action ,'ds_main');
    }
})