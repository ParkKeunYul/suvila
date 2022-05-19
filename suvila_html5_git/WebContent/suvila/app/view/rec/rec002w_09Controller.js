Ext.define('ExFrm.view.rec.rec002w_09Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_09',
    onDestroy : function() {
        console.log('onSearch0044422Des');
    },
    onAfterRender:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_pray_gbn_up', '', null ,me.dsPrayCallback);
    	},50);
    	
    },
    onMenuChange : function(ele, newValue, oldValue){
    	var me = this;
    	
    	var params = {
        	V_PRAY_GBN : newValue
        };
    	setTimeout(function(){
    		me.callStore(me, 'ds_Ing', '', params ,me.dsIngCallback);
    	},50);
    	
    },
    dsPrayCallback : function(me, success, form, action){
    	var params = {
        		V_PRAY_GBN : exCommon.getRepVal(me.lookupReference('mr_pray_gbn').getValue().mr_pray_gbn, 1)
        	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_Ing', '', params ,me.dsIngCallback);
    	},50);
    },
    dsIngCallback : function(me, success, form, action){
    	
    	
    	var params = {
    		V_PRAY_GBN : exCommon.getRepVal(me.lookupReference('mr_pray_gbn').getValue().mr_pray_gbn, 1)
    	};
    	
    	me.lookupReference('rec002w_09_a').getView().select(0);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_General', '', params ,me.dsGeneralCallback);
    	},50);
    	
    },    
    dsGeneralCallback : function(me, success, form, action){
    	me.lookupReference('rec002w_09_b').getView().select(0);
    	
    	if(success){
    		
    		var record = me.lookupReference('rec002w_09_b').getView().getSelectionModel().getSelection()[0];
    		console.log('record = ', record);
    		
    		if(record != undefined){
    			var params = {
	    			 V_PRAY_GBN  : record.get("PRAY_GBN")
	    			,V_PRAY_CODE : record.get("PRAY_CODE")
	    			,TEMPLE_CD   : record.get("TEMPLE_CD")
	    		}
	    		
	    		setTimeout(function(){
	        		me.callStore(me, 'ds_Detail', '', params ,me.dsDetailCallback);
	        	},50);
    		}
    	}
    },
    dsDetailCallback : function(me, success, form, action){
    	me.lookupReference('rec002w_09_c').getView().select(0);
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	try{
    		if(record.length <=  0){
    			return;
    		}
    		
    		
    		var V_PRAY_CODE = exCommon.getRepVal(record[0].get("PRAY_CODE") , "");
    		
    		if(V_PRAY_CODE != ""){
    			var params = {
	       			 V_PRAY_GBN  : record[0].get("PRAY_GBN")
	       			,V_PRAY_CODE : record[0].get("PRAY_CODE")
	       			,TEMPLE_CD   : record[0].get("TEMPLE_CD")
	       		}
	       		
	       		setTimeout(function(){
	           		me.callStore(me, 'ds_Detail', '', params ,me.dsDetailCallback);
	           	},150);
    		}else{
    			me.getViewModel().getStore('ds_Detail').removeAll();
    		}
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onSortUp1 : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_Ing').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var selection = me.lookupReference('rec002w_09_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec002w_09_a').getStore().indexOf(selection);
    	
    	
    	if(_idx == 0) return false;
    	
    	
    	var upRecord    = me.lookupReference('rec002w_09_a').getStore().getAt(_idx-1);
    	var upSortSeq   = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_Ing').sort([{
            property  : 'SORT_SEQ',
            direction : 'ASC'
        }]);
    	
    },
    onDownUp1 : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_Ing').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var selection = me.lookupReference('rec002w_09_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec002w_09_a').getStore().indexOf(selection);
    	if(_tCnt == (_idx+1) ) return false;
    	
    	var downRecord   = me.lookupReference('rec002w_09_a').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_Ing').sort([{
            property  : 'SORT_SEQ',
            direction : 'ASC'
        }]);
    },
    onSave1 : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_Ing'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC002W_09/IngSortSave.suvila'
    		,me.onSave1Callback
    	);
    },
    onSave1Callback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_Ing');
    },
    onCellDbClick2 : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	
    	var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue = record.get(clickedDataIndex);
        
        /*console.log('clickedDataIndex = ', clickedDataIndex);
        console.log('clickedColumnName = ', clickedColumnName);
        console.log('clickedCellValue = ', clickedCellValue);*/
    	
    	
        if(clickedDataIndex == "ACCNAME"){
        	var ACCT_GBN = record.get("ACCT_GBN");
        	var IE_GBN   = record.get("IE_GBN");
        	var KWAN     = record.get("KWAN");
        	var HANG     = record.get("HANG");
        	var MOK      = record.get("MOK");
        	var ACCNAME  = record.get("ACCNAME");
        	
        	var FULL_KHM = KWAN + "" + HANG + "" + MOK;
        	
        	if(FULL_KHM  == exCommon.khm.IN || FULL_KHM  == exCommon.khm.OUT ){
        		exCommon.msgAlert('신도증접수는 계정과목을 변경할수 없습니다.');
        		return false;
        	}
        	
        	
        	var params  =  {
           		 ACCT_GBN  : ACCT_GBN    		 
           		,IE_GBN    : IE_GBN
           		,KWAN      : KWAN
           		,MOK       : MOK
           		,HANG      : HANG
           		,HANG_NAME : ""
           		,MOK_NAME  : ACCNAME
           	}
           	me.openPopup('ExFrm.view.com.accounts',  params, this.onCellDbClick2Receive);
        }
    },
    onCellDbClick2Receive : function(params, me){
    	console.log('onCellDbClickReceive', params);
    	
    	
    	var record = me.lookupReference('rec002w_09_b').getView().getSelectionModel().getSelection()[0];
    	
    	record.set("ACCT_GBN" , params.ACCT_GBN);
    	record.set("IE_GBN"   , params.IE_GBN);
    	record.set("KWAN"     , params.KWAN);
    	record.set("HANG"     , params.HANG);
    	record.set("MOK"      , params.MOK);
    	record.set("ACCNAME"  , params.MOK_NAME);
    	
    },
    onSortUp2 : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_General').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var selection = me.lookupReference('rec002w_09_b').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec002w_09_b').getStore().indexOf(selection);
    	
    	
    	if(_idx == 0) return false;
    	
    	
    	var upRecord    = me.lookupReference('rec002w_09_b').getStore().getAt(_idx-1);
    	var upSortSeq   = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_General').sort([{
            property  : 'SORT_SEQ',
            direction : 'ASC'
        }]);
    	
    },
    onDownUp2 : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_General').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var selection = me.lookupReference('rec002w_09_b').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec002w_09_b').getStore().indexOf(selection);
    	if(_tCnt == (_idx+1) ) return false;
    	
    	var downRecord   = me.lookupReference('rec002w_09_b').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_General').sort([{
            property  : 'SORT_SEQ',
            direction : 'ASC'
        }]);
    },
    onSelect2 : function(){
    	var me = this;
    	
    	var params = {
    		V_PRAY_GBN : exCommon.getRepVal(me.lookupReference('mr_pray_gbn').getValue().mr_pray_gbn, 1)
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_General', '', params ,me.dsGeneralCallback);
    	},50);
    },
    onAdd2 : function(){
    	var me = this;
    	
    	console.log('onAdd2= ', me.inCheck2());
    	
    	if( !me.inCheck2()  ) return false;
    	
    	var row = me.getViewModel().getStore('ds_General').getCount();
    	    	
    	var data = {
    		 PRAY_GBN    :  exCommon.getRepVal(me.lookupReference('mr_pray_gbn').getValue().mr_pray_gbn, 1)
    		,PRAY_NM     : ""
    		,PRAY_CODE   : ""
    		,SORT_SEQ    : row +1
    		,SQL_MODE    :  'I'
    		,AMT         : 0
    		,PERIOD      : "9999"
    		,USING_COUNT : 0
    	};
    	
    	me.getViewModel().getStore('ds_General').add(data);
    	me.lookupReference('rec002w_09_b').getView().select(row);
    },
    onDel2 : function(){
    	var me = this;
    	
    	var record   = me.lookupReference('rec002w_09_b').getView().getSelectionModel().getSelection()[0];
    	var SQL_MODE = exCommon.getRepVal( record.get("SQL_MODE") , "" );
    	var row      = me.getViewModel().getStore('ds_Detail').getCount();
    	
    	var USING_COUNT = exCommon.getRepNum( record.get("USING_COUNT") );
    	
    	if(USING_COUNT > 0){
    		exCommon.msgAlert('삭제할수 없는 기도입니다..');
    		return false;
    	}
    	
    	if(SQL_MODE != "I" && row > 0){
    		exCommon.msgAlert('삭제할수 없는 기도입니다.');
    		return false;
    	}
    	
    	exCommon.gridRemove(me, 'rec002w_09_b' , 'ds_General');
    },
    onSave2 : function(){
    	var me = this;
    	
    	if( !me.inCheck2()  ) return false;
    	
    	
    	var row = me.getViewModel().getStore('ds_General').getCount();
    	
    	
    	for( var i = 0; i< row ; i++ ){
    		var record  = me.getViewModel().getStore('ds_General').getAt(i);
    		
    		var PRAY_NM =  exCommon.getRepVal( record.get("PRAY_NM") );
    		for( var j = 0; j< row ; j++ ){
    			var sub_record  = me.getViewModel().getStore('ds_General').getAt(j);
    			
    			var SUB_PRAY_NM =  exCommon.getRepVal( sub_record.get("PRAY_NM") );
    			
    			if(PRAY_NM == SUB_PRAY_NM && i != j){
					me.lookupReference('rec002w_09_b').getView().select(j);
					exCommon.msgAlert('기도명이 중복되었습니다. 중복된 기도명을 수정하세요.');
					return false;
				}
    			
    			
    		}// for j
    		
    	}// for i
    	
    	exCommon.fnGridSaveAll(
	   		 me
	   		,'ds_General'
	   		,'newData'
	   		,'uptData'
	   		,'delData'
	   		,'/rec/REC002W_09/GeneralSave.suvila'
	   		,me.onSave2Callback
	   	);
   },
   onSave2Callback : function(me, success, form, action){
   	  exCommon.fnGridSaveCallback(me, success, action,'ds_General');
   	  if(success){
   		  me.onSelect2();
   	  }
   },
   inCheck2 : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_General').getCount();
    	
    	for(var i = 0; i< row ; i++){
    		var record  = me.getViewModel().getStore('ds_General').getAt(i);
    		var pray_nm = exCommon.getRepVal( record.get("PRAY_NM") );
    		
    		if ( pray_nm == "" ) {
    			me.lookupReference('rec002w_09_b').getView().select(i);
    			exCommon.msgAlert('기도명은 필수입력 사항입니다.');
		 		return false;
		 	}
    		
    		var period = exCommon.getRepNum( record.get("PERIOD") );
    		
    		if ( period <= "0" ) {
		 		
		 		me.lookupReference('rec002w_09_b').getView().select(i);
    			exCommon.msgAlert('기간은 0 보다 커야 합니다.');
		 		
		 		return false;
		 	}
    	}
    	return true;
   },
   onAdd3 : function(){
	   var me = this;
	   
	   var record   = me.lookupReference('rec002w_09_b').getView().getSelectionModel().getSelection()[0];
       var SQL_MODE = exCommon.getRepVal( record.get("SQL_MODE") , "" );
	   
       if(SQL_MODE == "I" ){
   		 exCommon.msgAlert('신규 추가 기도는 저장후 상세일정을 추가할수 있습니다.');
   		 return false;
   	   }
       
       
       var row = me.getViewModel().getStore('ds_Detail').getCount();
   	
       var today = exCommon.setDateFormat2(exCommon.getNowDate(""));
       
	   var data = {
	   	     SQL_MODE    : 'I'
	   		,PRAY_GBN    : exCommon.getRepVal(me.lookupReference('mr_pray_gbn').getValue().mr_pray_gbn, 1)
	   		,PRAY_NM     : record.get("PRAY_NM")
	   		,PRAY_CODE   : record.get("PRAY_CODE")
	   		,AMT         : record.get("AMT")
	   		,PERIOD      : record.get("PERIOD")
	   		,USE_YN      : false
	   		,FDATE       : exCommon.getNowDate("")
	   		,RDATE       : me.inStanDay(today,record.get("PERIOD") )
	   		,USING_COUNT : "0"
	   		,REMARK      : ""
	   	};
	   	
	   	console.log('data = ', data);	   
	   	me.getViewModel().getStore('ds_Detail').add(data);
	    me.lookupReference('rec002w_09_c').getView().select(row);
       
   },
   onDel3 : function(){
	   var me = this;
	   
	   var record = me.lookupReference('rec002w_09_c').getView().getSelectionModel().getSelection()[0];
	   
	   console.log('record =', record);
	   
	   var SQL_MODE    = exCommon.getRepVal( record.get("SQL_MODE") );
	   var REMOTE      = exCommon.getRepVal( record.get("REMOTE") );
	   var USING_COUNT = exCommon.getRepNum( record.get("USING_COUNT") );
	   
	   
	   
	   if( exCommon.khm.IN == REMOTE ){
		   exCommon.msgAlert('삭제할수없는 항목입니다.');
		   return false;
	   }
	   if( USING_COUNT > 0 ){
		   exCommon.msgAlert('사용된 자료는 삭제할 수 없습니다.');
		   return false;
	   }
	   exCommon.gridRemove(me, 'rec002w_09_c' , 'ds_Detail');
	   	   	  
   },
   onSave3 : function(){
	   var me = this;
   	
   	   exCommon.fnGridSaveAll(
     		 me
     		,'ds_Detail'
     		,'newData'
     		,'uptData'
     		,'delData'
     		,'/rec/REC002W_09/DetailSave.suvila'
     		,me.onSave3Callback
     	);
   
   },
   onSave3Callback : function(me, success, form, action){
   	  exCommon.fnGridSaveCallback(me, success, action,'ds_Detail');
   	  if(success){
   		setTimeout(function(){
   			var params = {
	        	V_PRAY_GBN : exCommon.getRepVal(me.lookupReference('mr_pray_gbn').getValue().mr_pray_gbn, 1)
	        };
   			
    		me.callStore(me, 'ds_Ing', '', params ,null);
    	},50);
   	  }
   },
   inStanDay : function( StanDay,afterday ){
	   var me =this;
	   
	   console.log(StanDay , afterday);
	   
	   if ( afterday <= "1" ) {
			 afterday = "0";
	   }else{
			afterday = afterday - 1;
	   }
	   
	   
	   console.log('afterday = ', afterday);
	   console.log('exCommon.getPlusDay = ', me.onPlusDay(afterday));
	   
	   return exCommon.getDateCalDay(StanDay,afterday)
   },
   onPlusDay : function(day){
		 var d = new Date();
		 
		 if(day > 0){
			 d.setDate(d.getDate() + day); 
		 }
		 
		 console.log(d.getFullYear());
		 console.log((d.getMonth()+1));
		 console.log(d.getDate());
		 
		 
		 return d.getFullYear() + ""+exCommon.addZero((d.getMonth()+1)) + "" + exCommon.addZero(d.getDate())
	},
   onEdit3 : function(editor, context, eOpts){
	   var me  = this;
	   
	   
	   console.log(context.colIdx);
	   console.log(context.rowIdx);
	   
	   if(context.colIdx == 1){
		   var record_b   = me.lookupReference('rec002w_09_b').getView().getSelectionModel().getSelection()[0];
		   var record_c   = me.getViewModel().getStore('ds_Detail').getAt(context.rowIdx);
		   
		   var FDATE = exCommon.getGridDateFormat(record_c.get("FDATE"),'/', 8);
		   
		   
		   record_c.set("RDATE" ,  me.inStanDay(FDATE ,record_b.get("PERIOD") ) );
	   }
	   
   },
   inStanDay2 : function( StanDay,afterday ){
	   
   }
   /*onCheckChange : function(){
	   console.log('33333');
   }*/
   
    
})
