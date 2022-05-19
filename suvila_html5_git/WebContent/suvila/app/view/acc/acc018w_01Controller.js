Ext.define('ExFrm.view.acc.acc018w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc018w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){
    	me.loadStorDatekPoP(me);
    	console.log('onDestroy');
    },
    onAfterRender:function(){
    	var me  = this;
    
    	me.loadStorDatekPoP(me);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate());
    	me.lookupReference('me_ActDate').setExValue(today);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', {group_cd : "IEGBN", v_group_cd : "IEGBN"}, null);
    	},10);
    	
    },
    loadStorDate:[],
    loadStorDatekPoP : function(me){
    	for(var i = 0; i<me.loadStorDate.length ; i++){
    		me.loadStorDate.pop();
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var V_ACT_DATE  =  me.lookupReference('me_ActDate').getExValue();
    	
    	if( V_ACT_DATE.length != 8  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('me_ActDate').focus();
    		return;
    	}
    	
    	var params = {
       		 V_SACT_DATE : V_ACT_DATE
       		,V_EACT_DATE : V_ACT_DATE
       		,V_ACCT_GBN  : ""
       		,V_IE_GBN    : 0
        	,V_KWAN      : 0
        	,V_REMARK    : ""
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		//console.log(action);
    	if(success){
    		
    		me.loadStorDatekPoP(me);
    		me.loadStorDate.push( me.lookupReference('me_ActDate').getExValue() );
    		
    		me.lookupReference('acc018w_01_a').getView().select(0);
    		
    		if(me.getViewModel().getStore('ds_main').getCount() == 0){
    			setTimeout(function(){
    				Ext.Msg.alert('알림', ' 검색된 데이터가 없습니다.');    				
    			},50);
    		}
    	}
    },
    /*onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc018w_01_a');
    	    	
    	exCommon.excelDown(grid, 'finance', '현금출납삭제',  me.getViewModel().getStore('ds_main').getCount());
    },*/
    onExcel : function(){
    	var me = this;
    	
    	if(me.getViewModel().getStore('ds_main').getCount() <= 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 출력 자료가 없습니다.');    				
			},50);
    		return;
		}
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		jsonPrintData.push(g_record.data);
    	}// for
    	
    	
    	var baseData = {
       		 TITLE    : "현금출납수정("+me.lookupReference('me_ActDate').getRawValue()+")"
       	}
    	
    	jsonAllData = {
    		  "base" : baseData
        	 ,"list" : jsonPrintData
        };
          	
      	var params = {
  			 FILE_PATH  : '/acc018w_01_excel.ozr' 
  			,PRINT_DATA : jsonAllData
      	};
    		
		setTimeout(function(){
			me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	
    	var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue = record.get(clickedDataIndex);
        
    	var OLD_YN = record.get("OLD_YN");
    	
    	if(OLD_YN != "T" && clickedDataIndex == "MOK_NAME"){
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
        	}
        	this.openPopup('ExFrm.view.com.accounts',  params, this.onCellDbClickReceive);
    	}
    	
    },
    onCellDbClickReceive : function(params, me){
    	console.log('onCellDbClickReceive', params);
    	
    	var record = me.lookupReference('acc018w_01_a').getView().getSelectionModel().getSelection()[0];
    	record.set("ACCT_GBN" , params.ACCT_GBN);
    	record.set("IE_GBN"   , params.IE_GBN);
    	record.set("KWAN"     , params.KWAN);
    	record.set("HANG"     , params.HANG);    	
    	record.set("HANG_NAME", params.HANG_NAME);
    	record.set("MOK"      , params.MOK);
    	record.set("MOK_NAME" , params.MOK_NAME);
    	
    	
    },
    onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	console.log( context.colIdx );
    	
    	if( (context.colIdx == 4 && me.lookupReference('acc018w_01_a').getStore().getAt(context.rowIdx).get("SQL_MODE") == "I") ||     	  
    		(context.colIdx == 5 && me.lookupReference('acc018w_01_a').getStore().getAt(context.rowIdx).get("SQL_MODE") == "I") ||
    		(context.colIdx == 6 && me.lookupReference('acc018w_01_a').getStore().getAt(context.rowIdx).get("SQL_MODE") == "I") ){
    		return true;
    	}else{
    		return false;
    	}
    },
    onAdd : function(){
    	var me = this;
    	
    	if(me.getViewModel().getStore('ds_main').getCount() <= 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 가져오기를 먼저 실행하셔야 합니다.');    				
			},50);
    		return;
		}
    	
    	
    	var ACT_NO      = "";
    	var TEMP_ACT_NO = "00001";
    	
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(rowCnt != 0){
    		TEMP_ACT_NO = Number(me.lookupReference('acc018w_01_a').getStore().getAt(rowCnt-1).get("ACT_NO"))+1;
    	}
    	
    	var padCnt = 5 - String(TEMP_ACT_NO+'').length;
    	for(var i=0 ; i<padCnt ; i++) {
    		ACT_NO += "0";
    	}// for
    	
    	ACT_NO = ACT_NO + String(TEMP_ACT_NO+'');
    	
    	var data = {
    		 TEMPLE_CD :  exCommon.user.templeCd
    		,IE_GBN    : "I"
    		,ACT_DATE  : me.loadStorDate[0]
    		,ACT_NO    : ACT_NO
    		,SQL_MODE  : 'I'
    		,OLD_YN    : 'S'
    		,AMOUNT    : 0
    	}
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('acc018w_01_a').getView().select(rowCnt);
    	
    },
    onSave : function(){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	var dsGrid = me.lookupReference('acc018w_01_a');
    	
    	for(var i =0; i < rowCnt ; i++){
    		
    		var MOK_NAME     =  dsGrid.getStore().getAt(i).get("MOK_NAME");
    		var IE_GBN       =  dsGrid.getStore().getAt(i).get("IE_GBN");
    		var USER_ID      =  dsGrid.getStore().getAt(i).get("USER_ID");
    		
    		
    		if( MOK_NAME == "" || MOK_NAME == null || MOK_NAME == undefined ){
    			setTimeout(function(){
    				Ext.Msg.alert('알림', '계정과목이 등록되지 않은 접수 항목이 존재합니다.<br>계정과목을 등록 후 사용하세요.');    				
    			},50);
    			dsGrid.getView().select(i);
    			dsGrid.plugins[0].startEditByPosition({
    	            row   : i,
    	            column: 3
    	        });
    			return;
    		}
    		
    		if(IE_GBN == "O" && ( USER_ID == "" || USER_ID == null || USER_ID == undefined )){
    			setTimeout(function(){
    				Ext.Msg.alert('알림', '세출일 경우 영수인은 필수입력 항목입니다.');
    			},50);
    			dsGrid.getView().select(i);
    			
    			dsGrid.plugins[0].startEditByPosition({
    	            row   : i,
    	            column: 5
    	        });
    			return;
    		}
    	}// for
    	
    	exCommon.fnGridSaveAll( 
    			   me 
			      ,'ds_main'
			      ,'newData'
			      ,'uptData'
			      ,'delData'
			      ,'/acc/ACC006W_01/appendAcc.suvila'
			      ,me.onSaveCallback
			      ,false);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	
    	exCommon.fnGridSaveCallback(me, success,  action, 'ds_main');
    	
    	if(success){
    		var params = {
	       		 V_SACT_DATE : me.loadStorDate[0]
	       		,V_EACT_DATE : me.loadStorDate[0]
	       		,V_ACCT_GBN  : ""
	       		,V_IE_GBN    : 0
	        	,V_KWAN      : 0
	        	,V_REMARK    : ""
	       	}
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_main', '', params, null);
	    	},50);
    		
    	}
    }
})