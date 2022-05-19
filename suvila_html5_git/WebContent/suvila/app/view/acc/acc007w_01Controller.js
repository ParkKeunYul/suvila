Ext.define('ExFrm.view.acc.acc007w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc007w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){},
    loadState:[],
    loadStatePoP : function(me){
    	var row = me.loadState.length;
    	for(var i = 0; i<row; i++){
    		me.loadState.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_sDate').setExValue(today.substr(0,4)+"0101");
    	me.lookupReference('em_eDate').setExValue(today);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, me.dsActGbnCallback);
    	},50);
    	
    },
    dsActGbnCallback : function(me, success, form, action){
    	if(success){
    		var data = {
	    		 "NAME"      : "전체"
	    	    ,"CODE"      : "0"
	    	};
    		me.getViewModel().getStore('ds_acctGbn').insert(0, data);
    		me.lookupReference('lc_acctGbn').setValue("0");
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var V_SACT_DATE  =  me.lookupReference('em_sDate').getExValue();
    	var V_EACT_DATE  =  me.lookupReference('em_eDate').getExValue();
    	
    	if( V_SACT_DATE.length != 8  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_sDate').focus();
    		return;
    	}
    	if( V_EACT_DATE.length != 8  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_eDate').focus();
    		return;
    	}
    	
    	var params = {
    		 V_SACT_DATE : V_SACT_DATE   	
    		,V_EACT_DATE : V_EACT_DATE
    		,V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_temple', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('acc007w_01_a').getSelectionModel().select(0);
    		
    		me.getViewModel().getStore('ds_chongmu').removeAll();
    	}
    },
    onPrint : function(){
    	var me = this;
    	
    	setTimeout(function(){
			Ext.Msg.alert('알림', ' 인쇄 준비중입니다.');    				
		},50);
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc007w_01_a');
    	    	
    	exCommon.excelDown(grid, 'cash', '현금출납장',  me.getViewModel().getStore('ds_main').getCount());
    },
    onRightMove : function(me , selection){
    	
    	for(var i = 0; i<selection.length ; i++){
    		var CHONGMU_GBN = selection[i].get("CHONGMU_GBN"); 
    		
    		if(CHONGMU_GBN != 1 && CHONGMU_GBN != 2){
    			var data = {
    				 TEMPLE_CD   : selection[i].get("TEMPLE_CD")
    			    ,ACT_DATE    : selection[i].get("ACT_DATE")
    			    ,ACT_NO      : selection[i].get("ACT_NO")
    			    ,ACCT_GBN    : selection[i].get("ACCT_GBN")
    			    ,ACCT_NM     : selection[i].get("ACCT_NM")
    			    ,IE_GBN      : selection[i].get("IE_GBN")
    			    ,IE_GBN_NM   : selection[i].get("IE_GBN_NM")
    			    ,KWAN        : selection[i].get("KWAN")
    			    ,KWAN_NAME   : selection[i].get("KWAN_NAME")
    			    ,HANG        : selection[i].get("HANG")
    			    ,HANG_NAME   : selection[i].get("HANG_NAME")
    			    ,MOK         : selection[i].get("MOK")
    			    ,MOK_NAME    : selection[i].get("MOK_NAME")
    			    ,AMOUNT      : selection[i].get("AMOUNT")
    			    ,REMARK      : selection[i].get("REMARK")
    			    ,USER_NM     : selection[i].get("USER_NM")
    			    ,USER_ID     : selection[i].get("USER_ID")
    			    ,CHONGMU_GBN : selection[i].get("CHONGMU_GBN")
    			    ,SKIP        : selection[i].get("SKIP")
    			};
    			
    			me.getViewModel().getStore('ds_chongmu').add(data);
    			
    			selection[i].set("CHONGMU_GBN", 2);
    		}
    		
    	}// for
    	
    	me.getViewModel().getStore('ds_chongmu').sort([{
            property: 'ACT_DATE',
            direction: 'ASC'
    	},{
    		property: 'ACT_NO',
            direction: 'ASC'
        }]);
    	
    },
    onRightMoveOne : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('acc007w_01_a').getView().getSelectionModel().getSelection();
    	
    	me.onRightMove(me , selection);
    },
    onRightMoveALL : function(){
    	var me = this;
    	
    	me.lookupReference('acc007w_01_a').getSelectionModel().selectAll();
    	
    	var selection = me.lookupReference('acc007w_01_a').getView().getSelectionModel().getSelection();
    	me.onRightMove(me , selection);
    	
    	me.lookupReference('acc007w_01_a').getSelectionModel().select(0);
    	
    },
    onLeftMove : function(me , selection){
    	
    	var dsTemple =me.getViewModel().getStore('ds_temple');
    	
    	for(var i = 0; i<selection.length ; i++){
    		
    		try{
    			var SKIP =  selection[i].get("SKIP");
        		var findRecord =  dsTemple.findRecord('SKIP', SKIP, 0, false, true, true);

        		findRecord.set("CHONGMU_GBN", 0);
        		
        		me.getViewModel().getStore('ds_chongmu').remove( selection[i] );
    		}catch (e) {
    			var selectedRecord = me.lookupReference('acc007w_01_b').getView().getSelectionModel().getSelection();
    			console.log('cat = ', selectedRecord);
    			me.lookupReference('acc007w_01_b').getStore().remove(selectedRecord);
			}
    		
    	}// for
    	
    },
    onLeftMoveOne : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('acc007w_01_b').getView().getSelectionModel().getSelection();
    	
    	me.onLeftMove(me , selection);
    },
    onLeftMoveALL : function(){
    	var me = this;
    	me.lookupReference('acc007w_01_b').getSelectionModel().selectAll();
    	
    	var selection = me.lookupReference('acc007w_01_b').getView().getSelectionModel().getSelection();
    	
    	me.onLeftMove(me , selection);
    },
    onSave : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_chongmu').getCount();
    	
    	for( var i = 0 ; i< row ; i++ ){
    		var record = me.getViewModel().getStore('ds_chongmu').getAt(i);
    		
    		var SQL_MODE = exCommon.getRepVal(record.get("SQL_MODE"),'');
    		var ACT_DATE = exCommon.getRepVal(record.get("ACT_DATE"),'');
    		var SQL_MODE = exCommon.getRepVal(record.get("SQL_MODE"),'');
    		var MOK = exCommon.getRepVal(record.get("MOK"),'');
    		
    		
    		if(SQL_MODE == 'I'){
    			if(ACT_DATE == ''){
    				me.lookupReference('acc007w_01_b').getView().select(i);
    				exCommon.msgAlert('작성일자는 필수 항목입니다.');
    				return;
    			}
    			
    			if(MOK == ''){
    				me.lookupReference('acc007w_01_b').getView().select(i);
    				exCommon.msgAlert('계정과목은 필수 항목입니다.');
    				return;
    			}
    		}
    	}// for
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_chongmu'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/acc/ACC007W_01/save.suvila'
    		,me.onSaveCallback
    		,false
    	);
    	
    },
    onSaveCallback : function (me, success, records, action){
    	if(success){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', "자료 처리가 성공적으로 수행되었습니다.");
    		},50);
    		me.onSelect();
    	}
    },
    onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	
    	console.log(context);
    	
    	var colIdx= context.colIdx;
    	var rowIdx= context.rowIdx;
    	
    	var SQL_MODE = me.lookupReference('acc007w_01_b').getStore().getAt(rowIdx).get("SQL_MODE");
    	
    	if(colIdx == 0 &&SQL_MODE == 'I' || colIdx == 5){
    		return true;
    	}else{
    		return false;
    	}
    	return true;
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        
        
        var MOK = record.get("MOK");
        
        var SQL_MODE = record.get("SQL_MODE");
        
        
        if(clickedDataIndex == "MOK_NAME" && SQL_MODE == 'I' ){
        	
        	var ACCT_GBN = record.get("ACCT_GBN");
        	var IE_GBN   = record.get("IE_GBN");
        	var KWAN     = record.get("KWAN");
        	var MOK      = record.get("MOK");
        	var HANG     = record.get("HANG");
        	var MOK_NAME = record.get("MOK_NAME");
        	var HANG_NAME= record.get("HANG_NAME");
        	
        	var params  =  {
           		 ACCT_GBN  : ACCT_GBN    		 
           		,IE_GBN    : IE_GBN
           		,KWAN      : KWAN
           		,MOK       : MOK
           		,HANG      : HANG
           		,HANG_NAME : HANG_NAME
           		,MOK_NAME  : MOK_NAME
           		,ROWIDX    : rowIndex
           	}
        	this.openPopup('ExFrm.view.com.accounts',  params, this.onCellDbClickReceive);
        }// if
    },
    onCellDbClickReceive : function(params, me){
    	
    	console.log('onCellDbClickReceive', params);
    	
    	var record = me.lookupReference('acc007w_01_b').getView().getSelectionModel().getSelection()[0];
    	if(params.ROWIDX != null && ROWIDX != "" && ROWIDX != undefined ){
    		console.log("ROWIDX = ", ROWIDX);
    		
    		record = me.lookupReference('acc007w_01_b').getStore().getAt(ROWIDX).getAt(ROWIDX);
    		
    		console.log('record = ', record);
    	}
    	
    	var IE_GBN_NM = '세출'
    	
    	if(params.IE_GBN == 'I'){
    		IE_GBN_NM = '세입'
    	}
    	
    	
    	record.set("IE_GBN_NM", IE_GBN_NM);
    	record.set("ACCT_GBN" , params.ACCT_GBN);
    	record.set("IE_GBN"   , params.IE_GBN);
    	record.set("KWAN"     , params.KWAN);
    	record.set("HANG"     , params.HANG);    	
    	record.set("HANG_NAME", params.HANG_NAME);
    	record.set("MOK"      , params.MOK);
    	record.set("MOK_NAME" , params.MOK_NAME);
    	record.set("ACCT_NM"  , params.ACCT_NM);
    	
    	
    	
    	console.log(record);
    },
    onAdd : function(){
    	var me = this;
    	var data = {
    		 SQL_MODE : 'I'
    	    ,AMOUNT   : 0
    	}
    	
    	me.getViewModel().getStore('ds_chongmu').add(data);
    }
})