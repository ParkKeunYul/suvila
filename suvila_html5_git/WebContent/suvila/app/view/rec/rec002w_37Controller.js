Ext.define('ExFrm.view.rec.rec002w_37Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_37',
    onDestroy : function() {
        console.log('onSearch0044422Des');
    },
    onAfterRender:function(){
    	var me = this;
    },
    onInit : function(){
    	var me = this;
    	console.log('onInit');
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_Bulsa_nm', '', null ,me.dsBulsanmCallback);
    	},50);
    	
    	
    },
    dsBulsanmCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_General', '', null ,me.dsGeneralCallback);
    	},50);
    },
    dsGeneralCallback : function(me, success, form, action){
    	try{
    		me.lookupReference('rec002w_11_a').getView().select(0);
    		var record = me.lookupReference('rec002w_11_a').getView().getSelectionModel().getSelection()[0];
        	var params = {
        		V_BULSA_CD  : record.get("BULSA_CD")
       		}
        	
        	setTimeout(function(){
        		me.callStore(me, 'ds_Detail', '', params ,me.dsDetailCallback);
        	});
    	}catch (e) {}
    	
    },
    dsDetailCallback : function(me, success, form, action){
    	try{
	    	me.lookupReference('rec002w_11_b').getView().select(0);
	    	
	    	var record = me.lookupReference('rec002w_11_a').getView().getSelectionModel().getSelection()[0];
	    	var params = {
	    		V_BULSA_CD  : record.get("BULSA_CD")
	   		}
	    	
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_Ing', '', params ,me.dsIngCallback);
	    	},50);
    	}catch (e) {}
    },
    dsIngCallback : function(me, success, form, action){
    	me.lookupReference('rec002w_11_c').getView().select(0);
    },
    onSelect1 : function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_General', '', null ,me.dsGeneralCallback);
    	},50);
    },
    onCellDbClick1 : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
    	
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
           	me.openPopup('ExFrm.view.com.accounts',  params, this.onCellDbClick1Receive);
        }
    },
    onCellDbClick1Receive : function(params, me){
    	console.log('onCellDbClickReceive', params);
    	
    	
    	var record = me.lookupReference('rec002w_11_a').getView().getSelectionModel().getSelection()[0];
    	
    	record.set("ACCT_GBN" , params.ACCT_GBN);
    	record.set("IE_GBN"   , params.IE_GBN);
    	record.set("KWAN"     , params.KWAN);
    	record.set("HANG"     , params.HANG);
    	record.set("MOK"      , params.MOK);
    	record.set("ACCNAME"  , params.MOK_NAME);
    	
    },
    onSelectionChange1 : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	try{
    		if(record.length <=  0){
    			return;
    		}
    		var params = {
	    		V_BULSA_CD  : exCommon.getRepVal(record[0].get("BULSA_CD") , "")
	   		};
	    	
    		setTimeout(function(){
        		me.callStore(me, 'ds_Detail', '', params ,me.dsDetailCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onAdd1 : function(){
    	var me = this

    	if(! me.inCheck('General') ) return false;
    	
    	
    	var row = me.getViewModel().getStore('ds_General').getCount();
    	var data = {
    		 USE_YN   : true
    		,SQL_MODE : 'I'
    	}
    	me.getViewModel().getStore('ds_General').add(data);
    	me.lookupReference('rec002w_11_a').getView().select(row);
    	me.lookupReference('rec002w_11_a').plugins[0].startEditByPosition({
            row    : row,
            column : 1
        });
    },
    onDel1 : function(){
    	var me = this;
    	
    	
    	if( me.getViewModel().getStore('ds_Detail').getCount() > 0){
    		
    		var bulsa_nm = me.lookupReference('rec002w_11_a').getView().getSelectionModel().getSelection()[0].get("BULSA_NM");
    		
    		exCommon.msgAlert(bulsa_nm +'의 상세정보가 존재합니다.');
    		return false;
    	}// if
    	
    	exCommon.gridRemove(me, 'rec002w_11_a' , 'ds_General');
    },
    onSave1 : function(){
    	var me = this;
    	
    	if(! me.inCheck('General') ) return false;
    	
    	var row = me.getViewModel().getStore('ds_General').getCount();
    	
    	for( var i = 0; i< row ; i++ ){
    		
    		var record   = me.getViewModel().getStore('ds_General').getAt(i);    		
    		var BULSA_NM =  exCommon.getRepVal( record.get("BULSA_NM") );
    		
    		
    		for( var j = 0; j< row ; j++ ){
    			var sub_record  = me.getViewModel().getStore('ds_General').getAt(j);
    			var SUB_BULSA_NM = exCommon.getRepVal( sub_record.get("BULSA_NM") );
    			
    			if(BULSA_NM == SUB_BULSA_NM && i != j){
					me.lookupReference('rec002w_11_a').getView().select(j);
					exCommon.msgAlert('불사명이 중복되었습니다. 중복된 불사명을 수정하세요.');
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
   	   		,'/rec/REC002W_11/GeneralSave.suvila'
   	   		,me.onSave1Callback
   	   	);
    },
    onSave1Callback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_General');
    	
    	if(success){
    		me.onSelect1();
    	}
    },
    onAdd2 : function(){
    	var me = this;
    	
    	var record_grneral =  me.lookupReference('rec002w_11_a').getView().getSelectionModel().getSelection()[0];
    	
    	var SQL_MODE = exCommon.getRepVal( record_grneral.get("SQL_MODE") , "" );
  	   
        if(SQL_MODE == "I" ){
        	 exCommon.msgAlert('신규 추가 불사는 저장후  추가할수 있습니다.');
    		 return false;
    	}
    	
    	var row = me.getViewModel().getStore('ds_Detail').getCount();
    	var data = {
    		 USE_YN   : true
    		,SQL_MODE : 'I'
    		,BULSA_NM : record_grneral.get("BULSA_NM")
    		,BULSA_CD : record_grneral.get("BULSA_CD")
    		,AMOUNT   : 0
    	}
    	
    	console.log('data = ', data);
    	
    	me.getViewModel().getStore('ds_Detail').add(data);
    	me.lookupReference('rec002w_11_b').getView().select(row);
    	me.lookupReference('rec002w_11_b').plugins[0].startEditByPosition({
            row    : row,
            column : 2
        });
    	
    },
    onDel2 : function(){
    	var me = this;    	
    	exCommon.gridRemove(me, 'rec002w_11_b' , 'ds_Detail');
    },
    onSave2 : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
  	   		 me
  	   		,'ds_Detail'
  	   		,'newData'
  	   		,'uptData'
  	   		,'delData'
  	   		,'/rec/REC002W_11/DetailSave.suvila'
  	   		,me.onSave2Callback
  	   	);
    },
    onSave2Callback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_Detail');
    	
    	if(success){
    		me.onSelect1();
    	}
    },
    onSelect3 : function(){
    	var me = this;
    	
    	var record = me.lookupReference('rec002w_11_a').getView().getSelectionModel().getSelection()[0];
    	var params = {
    		V_BULSA_CD  : record.get("BULSA_CD")
   		}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_Ing', '', params ,me.dsIngCallback);
    	},50);
    },
    onAdd3 : function(){
    	var me = this;
    	
    	
    	var record   = me.lookupReference('rec002w_11_a').getView().getSelectionModel().getSelection()[0];
        var SQL_MODE = exCommon.getRepVal( record.get("SQL_MODE") , "" );
 	   
        if(SQL_MODE == "I" ){
    		 exCommon.msgAlert('신규 추가 불사는 저장후  추가할수 있습니다.');
    		 return false;
    	}
        
        
        var today = exCommon.setDateFormat2(exCommon.getNowDate(""));
            today = today.replace('/', '').replace('/', '');
        
        var row = me.getViewModel().getStore('ds_Ing').getCount();
        var data = {
        	 BULSA_CD   : record.get("BULSA_CD")
        	,ACPT_FDATE : today
        	,USE_YN     : true
        	,ACPT_CLOSE : false
        	,SQL_MODE   : "I"
        };
        
        console.log('data = ', data);
        
        me.getViewModel().getStore('ds_Ing').add(data);
    	me.lookupReference('rec002w_11_c').getView().select(row);
    	me.lookupReference('rec002w_11_c').plugins[0].startEditByPosition({
            row    : row,
            column : 3
        });
        
    },
    onDel3 : function(){
    	var me = this;
    	
    	exCommon.gridRemove(me, 'rec002w_11_c' , 'ds_Ing');
    },
    onSave3 : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_Ing').getCount();
    	for(var i = 0 ; i < row ; i++){
    		var ACPT_EDATE = exCommon.getRepVal( me.getViewModel().getStore('ds_Ing').getAt(i).get("ACPT_EDATE") );
    		var ACPT_FDATE = exCommon.getRepVal( me.getViewModel().getStore('ds_Ing').getAt(i).get("ACPT_FDATE") );
    		
    		
    		if(ACPT_FDATE == ""){
				me.lookupReference('rec002w_11_c').getView().select(i);
				exCommon.msgAlert('게시일은 필수입력 사항입니다.');
				return false;
			}
    		
    		if(ACPT_EDATE == ""){
				me.lookupReference('rec002w_11_c').getView().select(i);
				exCommon.msgAlert('마감예정일은 필수입력 사항입니다.');
				return false;
			}
    	}// for
    	
    	exCommon.fnGridSaveAll(
 	   		 me
 	   		,'ds_Ing'
 	   		,'newData'
 	   		,'uptData'
 	   		,'delData'
 	   		,'/rec/REC002W_11/IngSave.suvila'
 	   		,me.onSave3Callback
 	   	);
    },
    onSave3Callback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_Ing');
    	
    	if(success){
    		me.onSelect3();
    	}
    },
    inCheck : function(Gbn){
    	
    	var me = this;
    	
    	if ( Gbn == "General" ) {
    		
    		var row = me.getViewModel().getStore('ds_General').getCount();
    		
    		for(var i = 0; i< row ; i++){
    			var record   = me.getViewModel().getStore('ds_General').getAt(i);
    			var bulsa_nm = exCommon.getRepVal(record.get("BULSA_NM"), "");
    			
    			if(bulsa_nm == ""){
    				me.lookupReference('rec002w_11_a').getView().select(i);
    				exCommon.msgAlert('불사명은 필수입력 사항입니다.');
    				return false;
    			}
    			
    		}// for
    	}
    	return true;
    }
})
