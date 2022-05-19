Ext.define('ExFrm.view.rec.rec021w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec021w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_act_date').setExValue( today );
    	setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', null ,me.dsChangeCallback);
    	},50);
    	
    },
    dsChangeCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null ,me.dsTempleCallback);
    	},50);
    },
    dsTempleCallback : function(me, success, form, action){
    	me.onSelect();
    },
    onSelect : function (){
    	var me = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	if( new Number(me.lookupReference('em_act_date').getExValue()) > new Number(today) ){
    		exCommon.msgAlert("금일보다 이후 날짜는 조회 할수 없습니다.");
    		return false;
    	}
    	
    	var params ={
    		V_ACT_DATE : me.lookupReference('em_act_date').getExValue()
    	}
    	
    	console.log('params = ', params);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.dsMainCallback);
    	},50);
    }, 
    dsMainCallback : function(me, success, form, action){
    	if(success){
    		console.log(action._params.V_ACT_DATE);
    		me.lookupReference('select_actdate').setExValue( action._params.V_ACT_DATE );
    	}
    },
    onSave : function (){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i< row ; i++){
    		
    		var record   = me.getViewModel().getStore('ds_main').getAt(i);
    		var MOK_NAME =  exCommon.getRepVal( record.get("MOK_NAME") );
    		
    		if(MOK_NAME == ""){
    			exCommon.msgAlert("계정과목을 선택해야 합니다.");
    			me.lookupReference('rec021w_01_a').getView().select(i);
    			return false;
    		}
    	}// for
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC021W_01/save_acc.suvila'
    		,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_main');
    	
    	if(success){
    		me.onSelect();
    	}
    	
    },
   /* onBeforeEdit : function( editor, context, eOpts ){
    	if(context.field == "MOK_NAME"){
    		return false; 
    	}
    	return true;
    },*/
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	
    	var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue = record.get(clickedDataIndex);
    	
    	if(clickedDataIndex == "MOK_NAME"){
    		var ACCT_GBN = exCommon.getRepVal( record.get("ACCT_GBN") );
    		var IE_GBN   = exCommon.getRepVal( record.get("IE_GBN") );
    		var KWAN     = exCommon.getRepVal( record.get("KWAN") );
    		var HANG     = exCommon.getRepVal( record.get("HANG") );
    		var MOK      = exCommon.getRepVal( record.get("MOK") );
    		var MOK_NAME = exCommon.getRepVal( record.get("MOK_NAME") );
    		var ACCT_GBN = exCommon.getRepVal( record.get("ACCT_GBN") );
    		var HANG_NAME= exCommon.getRepVal( record.get("HANG_NAME") );
    		
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
        }
    },
    onCellDbClickReceive : function(params, me){
    	var record = me.lookupReference('rec021w_01_a').getView().getSelectionModel().getSelection()[0];
    	record.set("ACCT_GBN" , params.ACCT_GBN);
    	record.set("IE_GBN"   , params.IE_GBN);
    	record.set("KWAN"     , params.KWAN);
    	record.set("HANG"     , params.HANG);    	
    	record.set("HANG_NAME", params.HANG_NAME);
    	record.set("MOK"      , params.MOK);
    	record.set("MOK_NAME" , params.MOK_NAME);
    },
    onAdd : function (){
    	var me = this;
    	
    	var select_actdate =  exCommon.getRepVal( me.lookupReference('select_actdate').getExValue() );
    	if(select_actdate == ""){
    		exCommon.msgAlert("조회후  추가 가능합니다.");
    		return false;
    	}
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	var row  = me.getViewModel().getStore('ds_main').getCount();
    	var data ={
    		 ACT_DATE      : select_actdate
    		,TEMP_DATE     : today
    		,IE_GBN        : 'O'
    		,APPROVAL_GBN  : '1'
    		,USER_ID       : exCommon.user.userId
    		,AMOUNT        : 0
    	};
    	
    	//console.log('data = ', data);
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('rec021w_01_a').getView().select(row);
    },
    onDelete : function(){ 
    	var me =this;
    	exCommon.gridRemove(me, 'rec021w_01_a', 'ds_main',false, true);
    },
    onExcel : function(){
    	var me = this;
    	
    	var cnt = exCommon.ChangeCount('ds_main', me);
    	if(cnt > 0){
    		exCommon.msgAlert("변동된 내역이 있습니다.<br/>저장후 시도해주세요.");
    		return false;
    	}
    	var grid = me.lookupReference('rec021w_01_a');
    	exCommon.excelDown(grid, 'acc', '현글출납장',  me.getViewModel().getStore('ds_main').getCount());
    },
})