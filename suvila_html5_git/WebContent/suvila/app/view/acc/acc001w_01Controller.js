Ext.define('ExFrm.view.acc.acc001w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc001w_01',    
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
    	//me.lookupReference('me_ActDate').setExValue("20171103");
    	
    	
    	var params = {
    		group_cd : "IEGBN" 
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', params, me.dsIeGbnCallback);
    	},10);
    	
    	
    },
    loadStorDate:[],
    loadStorDatekPoP : function(me){
    	for(var i = 0; i<me.loadStorDate.length ; i++){
    		me.loadStorDate.pop();
    	}
    },
    dsIeGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_Change', '', null, me.dsChangeCallback);
    	},50);
    },
    dsChangeCallback : function(me, success, form, action){
    	if(success){
    		var TOT_AMOUNT = me.getViewModel().getStore('ds_Change').getAt(0).get("AMOUNT");
    		me.lookupReference('me_Amount').setExValue(TOT_AMOUNT);    		    		
    	}
    },
    totalCalc : function(me){
    	var income = 0;
    	var expend = 0;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i =0; i < rowCnt ; i++){
    		var AMOUNT  =  new Number(me.lookupReference('acc001w_01_a').getStore().getAt(i).get("AMOUNT"));
    		var IE_GBN  = me.lookupReference('acc001w_01_a').getStore().getAt(i).get("IE_GBN");
    		
    		if(IE_GBN == "I"){
    			income += AMOUNT;
    		}else{
    			expend += AMOUNT;
    		}
    	}// for
    	
    	
    	me.lookupReference('me_acctGbnIn').setExValue(income);
    	me.lookupReference('me_acctGbnOut').setExValue(expend);
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
    		V_ACT_DATE : V_ACT_DATE   		
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		//console.log(action);
    	if(success){
    		me.lookupReference('acc001w_01_a').getView().select(0);

    		me.totalCalc(me);
    		
    		
    		me.loadStorDatekPoP(me);
    		me.loadStorDate.push( me.lookupReference('me_ActDate').getExValue() );
    	
    		
    		if(me.getViewModel().getStore('ds_main').getCount() == 0){
    			setTimeout(function(){
    				Ext.Msg.alert('알림', ' 검색된 데이터가 없습니다.');    				
    			},50);
    		}
    	}else{
    		me.loadStorDatekPoP(me);
    	}
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
    	
    	var record = me.lookupReference('acc001w_01_a').getView().getSelectionModel().getSelection()[0];
    	record.set("ACCT_GBN" , params.ACCT_GBN);
    	record.set("IE_GBN"   , params.IE_GBN);
    	record.set("KWAN"     , params.KWAN);
    	record.set("HANG"     , params.HANG);    	
    	record.set("HANG_NAME", params.HANG_NAME);
    	record.set("MOK"      , params.MOK);
    	record.set("MOK_NAME" , params.MOK_NAME);
    	
    	me.onResetSumAmounts(me);
    	
    },
    onBeforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	
    	if( (context.colIdx == 4 && me.lookupReference('acc001w_01_a').getStore().getAt(context.rowIdx).get("SQL_MODE") == "I") ||     	  
    	    (context.colIdx == 0 && me.lookupReference('acc001w_01_a').getStore().getAt(context.rowIdx).get("OLD_YN") != "T") || 
    	    context.colIdx == 6 || context.colIdx == 7  ){
    		return true;
    	}else{
    		return false;
    	}
    },
    onEdit : function( ){
    	var me = this;
    	console.log('focusleave');
    	
    	me.onResetSumAmounts(me);
    	
    },    
    onResetSumAmounts : function(me){
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i =0; i < rowCnt ; i++){
    			
			var AMOUNT     =  new Number(me.lookupReference('acc001w_01_a').getStore().getAt(i).get("AMOUNT"));
			//var SUM_AMOUNT =  new Number(me.lookupReference('acc001w_01_a').getStore().getAt(i).get("SUM_AMOUNT"));
			var SUM_AMOUNT =  0;
			
			var IE_GBN     =  me.lookupReference('acc001w_01_a').getStore().getAt(i).get("IE_GBN");
			
			if(i >= 1){
    			SUM_AMOUNT =  new Number(me.lookupReference('acc001w_01_a').getStore().getAt(i-1).get("SUM_AMOUNT"));
			}else{
				SUM_AMOUNT = new Number( me.getViewModel().getStore('ds_Change').getAt(0).get("AMOUNT") );
			}
			
			if(IE_GBN == "I"){
				me.lookupReference('acc001w_01_a').getStore().getAt(i).set("SUM_AMOUNT" , SUM_AMOUNT + AMOUNT  );
			}else{
				me.lookupReference('acc001w_01_a').getStore().getAt(i).set("SUM_AMOUNT" , SUM_AMOUNT - AMOUNT  );
			}
			//console.log(AMOUNT, SUM_AMOUNT);
    			
    	}// for
    	
    	me.totalCalc(me);
    },
    onAdd : function(){
    	var me = this;
    	
    	if(me.loadStorDate.length <= 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 가져오기를 먼저 실행하셔야 합니다.');    				
			},50);
    		return;
		}
    	
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	var ACT_NO      = "";
    	var ACT_DATE    = me.loadStorDate[0];
    	
    	
    	var TEMP_ACT_NO = "00001";
    	var SUM_AMOUNT  = 0;
    	if(rowCnt != 0){
    		TEMP_ACT_NO = Number(me.lookupReference('acc001w_01_a').getStore().getAt(rowCnt-1).get("ACT_NO"))+1;
    		SUM_AMOUNT  = me.lookupReference('acc001w_01_a').getStore().getAt(rowCnt-1).get("SUM_AMOUNT");
    	}
    	
    	
    	var padCnt = 5 - String(TEMP_ACT_NO+'').length;
    	for(var i=0;i<padCnt;i++) ACT_NO += "0";
    	
    	ACT_NO = ACT_NO + String(TEMP_ACT_NO+'');
    	
    	console.log('ACT_NO = '+ ACT_NO);
    	
		var data = {
    		 TEMPLE_CD  : exCommon.user.templeCd
    		,IE_GBN     : 'I'
    		,ACT_DATE   : ACT_DATE
    		,ACT_NO     : ACT_NO
    		,USER_ID    : exCommon.user.userId
    		,SUM_AMOUNT : SUM_AMOUNT
    		,SQL_MODE   : 'I'
    		,AMOUNT     : 0
    		,OLD_YN     : ''
    	};
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('acc001w_01_a').getView().select(rowCnt);
    	
    },
    /*onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc001w_01_a');
    	    	
    	exCommon.excelDown(grid, 'finance', '재무결산',  me.getViewModel().getStore('ds_main').getCount());
    },*/
    onExcel : function(){
    	var me = this;
    	
    	if(me.loadStorDate.length <= 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 가져오기를 먼저 실행하셔야 합니다.');    				
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
       		 TITLE    : "현금출납현황("+me.lookupReference('me_ActDate').getRawValue()+")"
       	}
    	
    	jsonAllData = {
    		  "base" : baseData
        	 ,"list" : jsonPrintData
        };
          	
      	var params = {
  			 FILE_PATH  : '/acc001w_01_excel.ozr' 
  			,PRINT_DATA : jsonAllData
      	};
    		
		setTimeout(function(){
			me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    	
    },
    onDelete : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('acc001w_01_a').getView().getSelectionModel().getSelection()[0];
    	var rowIndex  = me.lookupReference('acc001w_01_a').getStore().indexOf(selection);
    	
    	var OLD_YN = selection.get("OLD_YN");
    	
    	if(OLD_YN  == "" ){
    		Ext.MessageBox.confirm('경고', '삭제하시겠습니까?', function(btn){  
    			if (btn == 'yes') { 
    				me.lookupReference('acc001w_01_a').getStore().remove(selection);
    				
    				if(rowIndex > 0  ) rowIndex = rowIndex -1;
    				if( rowIndex  < 0) rowIndex = 0;
    				
    				me.lookupReference('acc001w_01_a').getView().select(rowIndex);
    				
    				me.onResetSumAmounts(me);
    			}
    			
    		});
    	}else{
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 삭제할 수 없는 정보 입니다.');    				
			},50);
    	}
    },
    onSave : function(){
    	var me = this;
    	
    	
    	me.lookupReference('newData').setExValue("");
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	var jsonNewData = [];
    	
    	for(var i =0; i < rowCnt ; i++){
    		var MOK_NAME     =  me.lookupReference('acc001w_01_a').getStore().getAt(i).get("MOK_NAME");
    		var IE_GBN       =  me.lookupReference('acc001w_01_a').getStore().getAt(i).get("IE_GBN");
    		var USER_ID      =  me.lookupReference('acc001w_01_a').getStore().getAt(i).get("USER_ID");
    		
    		if( MOK_NAME == "" || MOK_NAME == null || MOK_NAME == undefined ){
    		
    			setTimeout(function(){
    				Ext.Msg.alert('알림', '계정과목이 등록되지 않은 접수 항목이 존재합니다.<br>계정과목을 등록 후 사용하세요.');    				
    			},50);
    			me.lookupReference('acc001w_01_a').getView().select(i);
    			me.lookupReference('acc001w_01_a').plugins[0].startEditByPosition({
    	            row   : i,
    	            column: 3
    	        });
    			
    			return;
    		}
    		
    		
    		if(IE_GBN == "O" && ( USER_ID == "" || USER_ID == null || USER_ID == undefined )){
    			setTimeout(function(){
    				Ext.Msg.alert('알림', '세출일 경우 영수인은 필수입력 항목입니다.');
    			},50);
    			me.lookupReference('acc001w_01_a').getView().select(i);
    			
    			me.lookupReference('acc001w_01_a').plugins[0].startEditByPosition({
    	            row   : i,
    	            column: 6
    	        });
    			return;
    		}
    		jsonNewData.push(me.lookupReference('acc001w_01_a').getStore().getAt(i).data);
    		
    	}// for
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			
    			me.lookupReference('newData').setExValue( Ext.encode(jsonNewData) );
    			
    			setTimeout(function(){
    				me.callForm(me, '/acc/ACC001W_01/save.suvila', me.onSaveCallback , false);
    			},10);	
    		}
    	});
    	    
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.getViewModel().getStore('ds_main').removeAll();
    		me.getViewModel().getStore('ds_main').commitChanges();
    		
    		me.loadStorDatekPoP(me);
    	}
    },
    
    onUpRow : function(){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(rowCnt > 0){
    		
    		var selection = me.lookupReference('acc001w_01_a').getView().getSelectionModel().getSelection()[0];
        	var _idx      = me.lookupReference('acc001w_01_a').getStore().indexOf(selection);
        	
        	console.log('_idx = ', _idx);
        	
        	if(_idx == 0){
    			return false;
    		}
        	        	
        	var upRecord = me.lookupReference('acc001w_01_a').getStore().getAt(_idx-1);
        	var upActNo        = upRecord.get("ACT_NO");
        	
        	var selectionActNo = selection.get("ACT_NO");
        	
        	/*console.log('upRecord =  ', upRecord.get("ACT_NO"));
        	console.log('selection = ',selection.get("ACT_NO"));*/
        	
        	selection.set("ACT_NO" , upActNo);
        	upRecord.set("ACT_NO", selectionActNo);
        	
        	/*console.log('upRecord =  ', upRecord.get("ACT_NO"));
        	console.log('selection = ',selection.get("ACT_NO"));*/
        	
        	me.getViewModel().getStore('ds_main').sort([{
                property: 'ACT_NO',
                direction: 'ASC'
            }]);
        	
        	me.onResetSumAmounts(me);
    		
    	}else{
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 변경할 자료가 없습니다.');    				
			},50);
    	}
    	
    },
    onDownRow : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	
    	if(_tCnt > 0){
    		
    		var selection = me.lookupReference('acc001w_01_a').getView().getSelectionModel().getSelection()[0];
        	var _idx      = me.lookupReference('acc001w_01_a').getStore().indexOf(selection);
    		
        	console.log(_tCnt ,' = ' + _idx);
        	
        	if(_tCnt == (_idx+1) ){
        		return false;
        	}
        	
    		
        	var downRecord = me.lookupReference('acc001w_01_a').getStore().getAt(_idx+1);
        	var downActNo  = downRecord.get("ACT_NO");
        	
        	var selectionActNo = selection.get("ACT_NO");
        	
        	
        	/*console.log('downRecord =  ', downRecord.get("ACT_NO"));
        	console.log('selection =   ',selection.get("ACT_NO"));*/
        	
        	selection.set("ACT_NO" , downActNo);
        	downRecord.set("ACT_NO", selectionActNo);
        	
        	/*console.log('downRecord =  ', downRecord.get("ACT_NO"));
        	console.log('selection =   ',selection.get("ACT_NO"));*/
        	
        	
        	me.getViewModel().getStore('ds_main').sort([{
                property: 'ACT_NO',
                direction: 'ASC'
            }]);
        	
        	me.onResetSumAmounts(me);
        	
    	}else{
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 변경할 자료가 없습니다.');    				
			},50);
    	}
    	
    }
    
})