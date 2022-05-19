Ext.define('ExFrm.view.ser.ser023w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.ser023w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    
    	me.onSelect();
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
       		 V_FIND_CONFNAME :  me.lookupReference('txt_find_confNm').getExValue("")   		
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
    	
    	if(success){
    		me.lookupReference('ser023w_01_a').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('ser023w_01_a');
    	    	
    	exCommon.excelDown(grid, 'Info', '수계정보',  me.getViewModel().getStore('ds_main').getCount());
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <= 0){
    			return;
    		}
    		
    		me.lookupReference('txt_confNm').setExValue(record[0].get("CONF_NAME"));
    		me.lookupReference('lc_UseYn').setExValue(record[0].get("USE_YN"));
    		me.lookupReference('txt_memo').setExValue(record[0].get("MEMO"));
    		me.lookupReference('txt_conf_contents').setExValue(record[0].get("CONF_CONTENTS"));
    		
    	}catch (e) {
			console.log('e = ', e);
		}
    },
    onAdd : function(){
    	var me = this;
    	
    	var data = {
    		USE_YN : "T"	
    	};
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('ser023w_01_a').getView().select(rowCnt);
    	me.lookupReference('txt_confNm').focus();
    	
    },
    onGridApply : function(){
    	var me = this;
    	
    	me.onSettingStore(me);
    	
    },
    onSettingStore(me){
    	var selection = me.lookupReference('ser023w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	selection.set("CONF_NAME"           , me.lookupReference('txt_confNm').getExValue());
    	selection.set("USE_YN"           	, me.lookupReference('lc_UseYn').getExValue());
    	selection.set("MEMO"           		, me.lookupReference('txt_memo').getExValue());
    	selection.set("CONF_CONTENTS"       , me.lookupReference('txt_conf_contents').getExValue());
    },
    onSave : function(){
    	var me = this;
    	
    	me.onSettingStore(me);
    	
    	var changeCnt = exCommon.ChangeCount('ds_main', me);
    	console.log('changeCnt = '+ changeCnt);
    	
    	if(changeCnt > 0){
    		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    		for(var i =0; i < rowCnt ; i++){
    			var CONF_NAME = me.lookupReference('ser023w_01_a').getStore().getAt(i).get("CONF_NAME");
    			
    			if(CONF_NAME == null || CONF_NAME == "" || CONF_NAME == undefined ){
    				setTimeout(function(){
    					Ext.Msg.alert('알림', ' 계율명은 필수 입력 사항입니다.');    				
    				},50);
    				
    				me.lookupReference('ser023w_01_a').getView().select(i);
    				
    				me.lookupReference('txt_confNm').focus();
    				return;
    			}
    			
    		}// for
    		
    		exCommon.fnGridSaveAll(
  	    		  me
  	    		,'ds_main'
  	    		,'newData'
  	    		,'uptData'
  	    		,'delData'
  	    		,'/ser/SER023W_01/confCodeSave.suvila'
  	    		,me.onSaveCallback
  	    	);
    		
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '변동된 내역이 없습니다.');
    		},50);
    	}
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    	}
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(me , 'ser023w_01_a' , 'ds_main' , false);
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('ser023w_01_a');
    	    
    	grid.getColumns()[2].show();
    	grid.getColumns()[3].show();
    	
    	exCommon.excelDown(grid, 'BUDDHISM', '계율정보',  me.getViewModel().getStore('ds_main').getCount());
    	
    	setTimeout(function(){
    		grid.getColumns()[2].hide();
        	grid.getColumns()[3].hide();
    	},50);
    	
    	
    },
    
})