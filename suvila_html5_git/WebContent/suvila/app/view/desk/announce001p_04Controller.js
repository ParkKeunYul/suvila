Ext.define('ExFrm.view.desk.announce001p_04Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.announce001p_04',
    onCalled:function(param){
        var me = this;
        
        //console.log('onCalled param = ', param);
        
        
        param.V_PLUS_YYYYMMDD = param.yyyy+""+param.mm+""+param.day;
        
        
        me.lookupReference('yyyymmdd').setExValue(param.V_PLUS_YYYYMMDD)
        
        param.V_PLUS_YYYYMMDD
        
        setTimeout(function(){
			me.callStore(me, 'ds_main', '', param , me.dsMainCallback);    				
		},50);
        
        
        $('#announce001p_04_title').html(param.yyyy+"년"+param.mm+"월"+param.day+"일 행사일정");
    },
    dsMainCallback: function(me, success, form, action){
    	
    	var param = {
    		V_P_DAY : me.lookupReference('yyyymmdd').getExValue()
    	}
    	
    	setTimeout(function(){
			me.callStore(me, 'ds_jesa', '', param , me.dsJesaCallback);    				
		},50);
    	
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue(-1);
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row > 0){
    			me.lookupReference('announce001p_04_a').getView().select(0);
    		}else{
           	 	me.lookupReference('txt_title').setExValue( "" );
           	 	me.lookupReference('ta_contents').setExValue( "" );
    		}
    	}
    },
    dsJesaCallback: function(me, success, form, action){
    	me.lookupReference('announce001p_04_b').getView().select(0);
    	
    },
    onInit:function(){},
    onAfterRender:function(){
    	var me = this;
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		
    		if(record.length <=  0){
    			me.lookupReference('txt_sel_index').setExValue(-1);
    			return;
    		}
    		//이전값 세팅
			var preIndex    = me.lookupReference('txt_sel_index').getExValue();
			if(preIndex != -1){
				me.inSettingRecord(me, preIndex);
			}// if preIndex
			
			console.log('preIndex = ', preIndex);
			
    		var nowIndex       = me.lookupReference('announce001p_04_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
    		
    		me.lookupReference('txt_title').setExValue( record[0].get("TITLE") );
       	 	me.lookupReference('ta_contents').setExValue( record[0].get("CONTENTS") );
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onSelect : function(){
    	
    	var me  = this;
    	
    	var params = {
    		V_PLUS_YYYYMMDD : me.lookupReference('yyyymmdd').getExValue()
    	}
        
        setTimeout(function(){
			me.callStore(me, 'ds_main', '', params , me.onSelectCallback);    				
		},50);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue(-1);
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row > 0){
    			me.lookupReference('announce001p_04_a').getView().select(0);
    		}else{
           	 	me.lookupReference('txt_title').setExValue( "" );
           	 	me.lookupReference('ta_contents').setExValue( "" );
    		}
    	}
    },
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_main').getAt(index);
			
			pre_record.set("TITLE", exCommon.getRepVal(me.lookupReference('txt_title').getExValue(),''));
			pre_record.set("CONTENTS", exCommon.getRepVal(me.lookupReference('ta_contents').getExValue(),''));
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    onAdd : function(){
    	var me = this;
    	
    	var row  = me.getViewModel().getStore('ds_main').getCount();
    	
    	var nowIndex = exCommon.getRepNum(me.lookupReference('txt_sel_index').getExValue());
    	
    	if(nowIndex != -1){
    		me.inSettingRecord(me, nowIndex);
    	}
    	
    	
    	var data = {
    		 CRT_NAME      : exCommon.user.userName
    		,PLUS_YYYYMMDD : me.lookupReference('yyyymmdd').getExValue()
    	}
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('announce001p_04_a').getView().select( row );
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(
    		 me
    		,'announce001p_04_a'
    		,'ds_main'
    		, false
    		, false
    	);    
    },
    onSave : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	if(row > 0){
    		var selectedRecord = me.lookupReference('announce001p_04_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('announce001p_04_a').getStore().indexOf(selectedRecord[0]);
        	me.inSettingRecord(me, index);
    	}
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	
    	if (rowCnt == 0) {
    		exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
		}
    	
    	if(!me.inValidation(me) ) {
    		return;
    	}
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/asp/Announce001p_03/save.suvila'
    		,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    		
    		var param = {
    			aaa : 11
    		}
    		
    		me.receiveTo(null , false);
    		
    	}
    },
    inValidation : function(me){
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row; i++){
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin004w_01_a', "TITLE"  , "제목" ) ){
    			me.lookupReference('txt_title').focus();    			
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin004w_01_a', "CONTENTS"  , "일정" ) ){
    			me.lookupReference('ta_contents').focus();    			
    			return false;
    		}
    		
    	}// for i
    	return true;
    },
    onSelectionChangeJesa : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		
    		if(record.length <=  0){    			
    			return;
    		}
    		
    		var params = {
    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
    			,V_SEQ        : record[0].get("SEQ")
    			,V_ACCEPT_GBN : record[0].get("ACCEPT_GBN")
    			,V_JESA_GUBUN : record[0].get("JESA_GUBUN")
    			,V_KEY        : record[0].get("KEY")
    		}
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_jesaInfo', '', params , me.dsJesaInfoCallback);    				
    		},50);
    		
    		console.log('params =', params);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsJesaInfoCallback: function(me, success, form, action){
    	if(success && me.getViewModel().getStore('ds_jesaInfo').getCount() > 0){
    		var info = me.getViewModel().getStore('ds_jesaInfo').getAt(0);
    		
    		
    		me.lookupReference('txt_jesa').setExValue( exCommon.getRepVal(info.get("JESA_NAME"),'') );
    		me.lookupReference('txt_event_date').setExValue( exCommon.getRepVal(info.get("EVENT_DATE"),'') );
    		me.lookupReference('txt_name').setExValue( exCommon.getRepVal(info.get("NAME"),'') );
    		me.lookupReference('txt_yonga_name').setExValue( exCommon.getRepVal(info.get("YONGA_NAME"),'') );
    		me.lookupReference('txt_cel').setExValue( exCommon.getRepVal(info.get("CEL"),'') );
    		me.lookupReference('txt_number_count').setExValue( exCommon.getRepVal(info.get("NUMBER_COUNT"),'') );
    		me.lookupReference('txt_remark').setExValue( exCommon.getRepVal(info.get("REMARK"),'') );
    		me.lookupReference('txt_lunar').setExValue( exCommon.getRepVal(info.get("LUNAR_SOLAR"),'') );
    		me.lookupReference('txt_bokweja').setExValue( exCommon.getRepVal(info.get("BOKWEJA_NM"),'') );
    	//	me.lookupReference('txt_amt').setExValue( info.get("PAYMENT_AMT") );
    		
    		
    	}
    	console.log(  );
    }
})