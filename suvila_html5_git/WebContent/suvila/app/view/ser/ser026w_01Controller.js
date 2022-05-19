Ext.define('ExFrm.view.ser.ser026w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.ser026w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },
    onSelect: function (){
    	var me  = this;
    	
    	var params = {
    		 V_BON  : encodeURI(me.lookupReference('txt_bon').getExValue())
    		,V_SUNG : encodeURI( me.lookupReference('txt_sung').getExValue() )
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
    onSelectCallback : function(me, success, form, action){
    	
    	console.log('onSelectCallback= ' , success);
    	
    	if(success){
    		me.lookupReference('ser026w_01_a').getView().select(0);
    	}
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    beforeedit : function  ( editor, context, eOpts ) {
    	var me = this;
    	if(me.lookupReference('ser026w_01_a').getStore().getAt(context.rowIdx).get("SQL_MODE") != "I"){
    		return false;
    	}
    },
    onAdd : function(){
    	var me = this;
    	
    	var data = {
    		 "REMARK"	: ""
    		,"ETC1"	    : ""
    		,"NAME"	    : ""
    		,"ETC2"	    : ""
    	    ,"SQL_MODE" : "I"
    	}
    	me.getViewModel().getStore('ds_main').insert(0, data);    	
    	me.lookupReference('ser026w_01_a').getView().select(0);
    	
    	me.lookupReference('ser026w_01_a').plugins[0].startEditByPosition({
            row    : 0,
            column : 0
        });
    	
    },
    onDelete : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('ser026w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	console.log("selection = " , selection.get("SQL_MODE"));
    	
    	var SQL_MODE = selection.get("SQL_MODE");
    	
    	if(SQL_MODE == "I"){
    		exCommon.gridRemove(me , 'ser026w_01_a' , 'ds_main' , false)
    	}else{
    		Ext.Msg.alert('알림', '이미 저장된 자료입니다.<br>저장되지 않은 자료만 취소 가능합니다.');
    	}
    },
    onSave : function(){
    	var me = this;
    	
    	var changeCnt = exCommon.ChangeCount('ds_main', me);
    	console.log('changeCnt = '+ changeCnt);
    	
    	if(changeCnt > 0){
    		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    		
    		for(var i =0; i < rowCnt ; i++){
    			var REMARK    = me.lookupReference('ser026w_01_a').getStore().getAt(i).get("REMARK");
    			var NAME      = me.lookupReference('ser026w_01_a').getStore().getAt(i).get("NAME");
    			
    			
    			if(!exCommon.gridValidation(REMARK , '성(한글)' , null )   ){
    				me.lookupReference('ser026w_01_a').getView().select(i);
    				me.lookupReference('ser026w_01_a').plugins[0].startEditByPosition({
    		            row    : i,
    		            column : 0
    		        });
    				return;
    			}
    			
    			if(!exCommon.gridValidation(NAME , '본(한글)' , null )   ){
    				me.lookupReference('ser026w_01_a').getView().select(i);
    				me.lookupReference('ser026w_01_a').plugins[0].startEditByPosition({
    		            row    : i,
    		            column : 2
    		        });
    				return;
    			}
    			
    			
    			if(i== 0){
    				var remarkFound = 0;
        			var anmeFound   = 0;
        			
    				me.getViewModel().getStore('ds_main').each(function(record){
    					if(record.get("REMARK")==REMARK){
    						remarkFound ++;
    					}
    				});
    				
    				me.getViewModel().getStore('ds_main').each(function(record){
    					if(record.get("NAME")==NAME){
    						anmeFound ++;
    					}
    				});
    				
    				console.log("remarkFound = ", remarkFound );
    				console.log("anmeFound = ", anmeFound);
        			
    				if(remarkFound > 1  && anmeFound > 1){
    					setTimeout(function(){
        	    			Ext.Msg.alert('알림', '같은 성과 본이 존재합니다.');
        	    		},50);
    					me.lookupReference('ser026w_01_a').getView().select(i);
    					return;
    				}
    			}
    			
    		}// for
    		
    		exCommon.fnGridSaveAll(
  	    		  me
  	    		,'ds_main'
  	    		,'newData'
  	    		,'uptData'
  	    		,'delData'
  	    		,'/ser/SER026W_01/save.suvila'
  	    		,me.onSaveCallback
  	    	);
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '변동된 내역이 없습니다.');
    		},50);
    	}
    },
    onSaveCallback : function (me, success, records, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_main');
    	
    	if(success){
    		me.onSelect();
    	}
    },
   
    
})