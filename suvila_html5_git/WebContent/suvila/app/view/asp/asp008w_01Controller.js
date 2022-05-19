Ext.define('ExFrm.view.asp.asp008w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp008w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },
    onSelect: function(){
    	var me = this;
    	var params = {
    		 V_SEARCH_TEMPLE_CD : encodeURI(me.lookupReference('lc_templeCd').getExValue())
    		,V_IE_GBN    : encodeURI(me.lookupReference('lc_iegbn').getExValue())
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan', '', params, me.onSelectCallback);    		
    	},10);
    },
    onSelectCallback : function (me, success, records, operation){
    	
    	if(success){
    		if(records.length > 0){
    			me.lookupReference('asp008w_01_a').getView().select(0);
    		}
    		me.lookupReference('txt_left_templeCd').setExValue(me.lookupReference('lc_templeCd').getExValue());    	
    		me.lookupReference('txt_left_iegbn').setExValue(me.lookupReference('lc_iegbn').getExValue());
    	}else{
    		me.lookupReference('txt_left_templeCd').setExValue("");
    		me.lookupReference('txt_left_iegbn').setExValue("");
    	}
    	
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	
    	var me = this;
    	try{
    		console.log('onSelectionChange', record[0]);
    		var params={
    			 V_SEARCH_TEMPLE_CD :  record[0].get("TEMPLE_CD")
    			,V_IE_GBN    :  record[0].get("IE_GBN")
    			,V_KWAN      :  record[0].get("KWAN")
    		};
    		me.callStore(me, 'ds_hang', '', params, null);
    		
    	}catch(Exception){}
    }, 
    onAddLeft : function(){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_kwan').getCount();
    	if( me.lookupReference('txt_left_templeCd').getExValue()  == "" ){
    		Ext.Msg.alert('경고', '조회 후 작업하세요.');
    		return;
    	}
    	
    	for(var i =0; i < rowCount ; i++){
    		var kwanNm = me.lookupReference('asp008w_01_a').getStore().getAt(i).data.KWAN_NAME;
    		if( kwanNm == null || kwanNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '계정명(관)을 입력하세요.');
    			return;    			
    		}    		
    	}
    	
    	var data = {
    		 TEMPLE_CD : me.lookupReference('txt_left_templeCd').getExValue()
    		,KWAN      : rowCount + 1    
    		,KWAN_NAME : ""
    		,HANG      : "0"
    		,MOK       : "0"
    		,ACCT_NM   : "사찰회계"
    		,ACCT_GBN  : "5"
    		,IE_GBN    : me.lookupReference('txt_left_iegbn').getExValue()
    		,SQL_MODE  : 'I'
    	};
    	me.getViewModel().getStore('ds_kwan').add(data);
    	me.lookupReference('asp008w_01_a').getView().select(rowCount);
    	me.lookupReference('asp008w_01_a').plugins[0].startEditByPosition({
            row: rowCount,
            column: 1
        });
    }, 
    onAddRight : function(){
    	var me = this;
    	if( me.lookupReference('txt_left_templeCd').getExValue()  == "" ){
    		Ext.Msg.alert('경고', '조회 후 작업하세요.');
    		return;
    	}
    	
    	var selectedRecord = this.lookupReference('asp008w_01_a').getView().getSelectionModel().getSelection()[0];
    	var rowCount       = me.getViewModel().getStore('ds_hang').getCount();
    	
    	
    	if(selectedRecord.get("SQL_MODE") == "I"){
    		Ext.Msg.alert('경고', '추가한 계정명(관)을<br/>저장후 항을 추가 할수 있습니다.');
    		return;
    	}
    	
    	
    	for(var i =0; i < rowCount ; i++){
    		var hangNm = me.lookupReference('asp008w_01_b').getStore().getAt(i).data.HANG_NAME;
    		if( hangNm == null || hangNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '계정명(항)을 입력하세요.');
    			return;    			
    		}    		
    	}
    
    	var data = {
    		 TEMPLE_CD : me.lookupReference('txt_left_templeCd').getExValue()
    		,KWAN      : selectedRecord.get("KWAN")
    		,KWAN_NAME : selectedRecord.get("KWAN_NAME")
    		,HANG      : rowCount + 1
    		,HANG_NAME : ""
    		,MOK       : "0"
    		,ACCT_GBN  : "5"
    		,ACCT_NM   : "사찰회계"
    		,IE_GBN    : me.lookupReference('txt_left_iegbn').getExValue()
    	};
    	me.getViewModel().getStore('ds_hang').add(data);
    	me.lookupReference('asp008w_01_b').plugins[0].startEditByPosition({
            row: rowCount,
            column: 1
        });
    	
    },
    onSaveLeft : function(){
    	var me = this;
    	var rowCount = me.getViewModel().getStore('ds_kwan').getCount();
    	if( me.lookupReference('txt_left_templeCd').getExValue()  == "" ){
    		Ext.Msg.alert('경고', '조회 후 작업하세요.');
    		return;
    	}
    	
    	exCommon.fnGridSaveAll(me
				             ,'ds_kwan'
				             ,'leftNewData'
				             ,'leftUptData'
				             ,'leftDelData'
				             ,'/asp/asp008w_01/leftSave.suvila'
				             , me.onSaveLeftCallback);
    },
    onSaveLeftCallback : function(me, success, form, action){
    	var params = {
       		 V_TEMPLE_CD : encodeURI(me.lookupReference('txt_left_templeCd').getExValue())
       		,V_IE_GBN    : encodeURI(me.lookupReference('txt_left_iegbn').getExValue())
       	};
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_kwan' ,params );
    },
    onSaveRight : function(){
    	var me = this;
    	exCommon.fnGridSaveAll(me
				             ,'ds_hang'
				             ,'rightNewData'
				             ,'rightUptData'
				             ,'rightDelData'
				             ,'/asp/asp008w_01/rightSave.suvila'
				             , me.onSaveRightCallback);
    },
    onSaveRightCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_hang' ,null );
    }
})