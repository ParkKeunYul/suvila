Ext.define('ExFrm.view.sin.sin008w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin008w_01',
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
    		me.callStore(me, 'ds_main', '', null ,me.onSelectCallback);
    	},50);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('sin008w_01_a').getView().select(0);
    	}
    	
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0){
    			return;
    		}
    		
    		var params = {
    			 V_GROUP_CD : record[0].get("GROUP_CD")
    			,V_CODE     : record[0].get("CODE")
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_smsDoc', '', params ,me.dsSmsDocCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsSmsDocCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('sin008w_01_b').getView().select(0);
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_smsItem', '', action._params ,me.dsSmsItemCallback);
    	},50);
    	
    },
    dsSmsItemCallback : function(me, success, form, action){
    	me.lookupReference('txt_sel_index').setExValue(-1);
    	if(success){
    		me.lookupReference('lc_smsItem').setExValue('');
    	}
    },
    onSave : function(){
    	var me  = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < row ; i++){
    		var record     = me.getViewModel().getStore('ds_main').getAt(i);
    		var ALARM_TIME = exCommon.getRepVal( record.get("ALARM_TIME") , '');
    		var ALARM_DAY  = exCommon.getRepVal( record.get("ALARM_DAY") , '0');
    		
    		record.set('ALARM_DAY', ALARM_DAY)    	
    		
    		if(ALARM_DAY == ''){
    			me.lookupReference('sin008w_01_a').getView().select(i);
    			exCommon.msgAlert('발송일은 필수 입력 사항입니다.');
    			return;
    		}
    		
    		if(ALARM_TIME == ''){
    			me.lookupReference('sin008w_01_a').getView().select(i);
    			exCommon.msgAlert('발송시간은 필수 입력 사항입니다.');
    			return;
    		}
    	}// for i
    	
    	exCommon.fnGridSaveAll(
     		 me
     		,'ds_main'
     		,'newData'
     		,'uptData'
     		,'delData'
     		,'/sin/SIN008W_01/saveMgt.suvila'
     		,me.onSaveCallback
     	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success, action ,'ds_main' );
    	
    	if(success) me.onSelect();
    },
    onEdit : function(editor, context, eOpts) {
    	var me = this;
    	
    	var record = me.getViewModel().getStore('ds_main').getAt(context.rowIdx);
    	
    	if(context.field == 'ALARM_TIME' ){
    		var ALARM_TIME = exCommon.getRepVal( record.get("ALARM_TIME"), '');
    		var roop       = ALARM_TIME.length;

    		
    		if( isNaN( ALARM_TIME ) ){
    			ALARM_TIME = record.previousValues.ALARM_TIME;
    		}else{
    			for(var i=0 ; i < 4-roop; i++ ){
            		ALARM_TIME = "0"+ ALARM_TIME;                		
            	}//
    		}
    		
        	//
        	
        	record.set("ALARM_TIME", ALARM_TIME)
    		
    	}else if( context.field == 'ALARM_DAY' ){
    		var ALARM_DAY = exCommon.getRepVal( record.get("ALARM_DAY"), '0');
    		
    		if( isNaN( ALARM_DAY ) ){
    			ALARM_DAY = record.previousValues.ALARM_DAY;
    		}
    		record.set("ALARM_DAY", ALARM_DAY)
    	}// if
    	
    },
    onSelectionChangeSMS : function( me2 , record , selections , eOpts ) {
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
			
    		var nowIndex       = me.lookupReference('sin008w_01_b').getStore().indexOf(record[0]);
			me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
    		
    		me.lookupReference('ta_memo').setExValue( record[0].get("CONTENTS") );
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_smsDoc').getAt(index);
			
			pre_record.set("CONTENTS", exCommon.getRepVal(me.lookupReference('ta_memo').getExValue(),''));
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    onChangeSmsItem : function (now, newValue, oldValue, eOpts ){
    	var me = this;
    	
    	var sel_item = exCommon.getRepVal(newValue, '');
    	var ta_memo   = exCommon.getRepVal(me.lookupReference('ta_memo').getRawValue(), '');
    	
    	if(sel_item != ''){
    		ta_memo = ta_memo +""+ me.lookupReference('lc_smsItem').getRawValue();
    		me.lookupReference('ta_memo').setExValue( ta_memo );
    	}
    },
    onAddDoc : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_smsDoc').getCount();
    	
    	var selectedRecord = me.lookupReference('sin008w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var data = {
    		 GROUP_CD : selectedRecord.get("GROUP_CD")
    		,CODE     : selectedRecord.get("CODE")
    	};
    	me.getViewModel().getStore('ds_smsDoc').add(data );
    	me.lookupReference('txt_sel_index').setExValue(-1);
    	me.lookupReference('sin008w_01_b').getView().select(row);
    	
    },
    onDeleteDoc : function(){
    	var me = this;
    	
    	exCommon.gridRemove(
       		 me
       		,'sin008w_01_b'
       		,'ds_smsDoc'
       		, false
       		, false
       	);  
    },
    onSaveDoc : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_smsDoc').getCount();
    	if(row > 0){
	    	var selectedRecord = me.lookupReference('sin008w_01_b').getView().getSelectionModel().getSelection();
			var index          = me.lookupReference('sin008w_01_b').getStore().indexOf(selectedRecord[0]);
			me.inSettingRecord(me, index);
    	}// if row
		
    	for(var i = 0; i < row; i++){
    		var record = me.getViewModel().getStore('ds_smsDoc').getAt(i);
    		
    		var CONTENTS = record.get("CONTENTS");
    		var bytes    = gf_calBytes(CONTENTS);
    		
    		if(bytes > 70){
    			me.lookupReference('sin008w_01_b').getView().select(i);
    			exCommon.msgAlert('내용이 70Byte를 초과할 수 없습니다.');
    			me.lookupReference('ta_memo').focus();
    			return false;
    		}
    	}// for i
    	
    	exCommon.fnGridSaveAll(
      		 me
      		,'ds_smsDoc'
      		,'newData'
      		,'uptData'
      		,'delData'
      		,'/sin/SIN008W_01/saveDoc.suvila'
      		,me.onSaveDocCallback
      	);
    },
    onSaveDocCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_smsDoc');
    	if(success){
    		var selectedRecord = me.lookupReference('sin008w_01_a').getView().getSelectionModel().getSelection()[0];
    		
        	var params = {
        		 V_GROUP_CD : selectedRecord.get("GROUP_CD")
        		,V_CODE     : selectedRecord.get("CODE")
        	};
        	
        	setTimeout(function(){
        		me.callStore(me, 'ds_smsDoc', '', params ,me.dsSmsDocCallback);
        	},50);
    	}
    },
    onChangeCheckYn : function(comp, rowIndex, checked, eOpts){
    	var me  = this;
    	
    	
    	var row = me.getViewModel().getStore('ds_smsDoc').getCount();
    	
    	for(var i = 0; i< row; i++){
    		if(i != rowIndex){
    			me.getViewModel().getStore('ds_smsDoc').getAt(i).set("CHECK_YN", false);
    		}
    	}// for i
    },
    onCheckRowSelect : function(comp, rowIndex, checked, eOpts){
    	var me = this;
    	me.lookupReference('sin008w_01_a').getView().select(rowIndex);
    }
})
