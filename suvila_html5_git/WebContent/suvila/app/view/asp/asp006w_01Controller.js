Ext.define('ExFrm.view.asp.asp006w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp006w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    },   
    onInit:function(me){
    	var params = {
    		V_CODE       : '1',
    		V_TABLE_NAME : 'ASP_ANNOUNCE'
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_alarmItem', '', null, me.dsAlamCallback);    		
    	},50);
    	
    },
    dsAlamCallback : function(me, success, form, action) {
    	var params = {
    		V_CODE       : '1',
    		V_TABLE_NAME : 'ASP_ANNOUNCE'
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_column', '', params, me.dsColCallback);    		
    	},50);
    },
    dsColCallback : function(me, success, form, action) {
    	setTimeout(function(){
    		me.callStore(me, 'ds_table', '', null, me.dsTableCallback);    		
    	},50);
    },
    dsTableCallback : function(me, success, form, action) {
    	var params = {
    		V_CODE       : '1',
    		V_TABLE_NAME : 'ASP_ANNOUNCE'
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_alarmItemMgt', '', params, null);    		
    	},50);
    },
    onSmsChange : function(){
    	var me = this;
    	
    	var params = {
    		V_CODE : me.lookupReference('lc_alarm').getExValue()  		
    	};
    	me.callStore(me, 'ds_alarmItemMgt', '', params, null);
    },
    onTableChange : function(){
    	var me = this;
    	
    	var params = {
    			V_TABLE_NAME : me.lookupReference('lc_table').getExValue()  		
    	};
    	me.callStore(me, 'ds_column', '', params, null);
    },
    onAdd : function(){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_column').getCount();
    	var checkFlag = false;
    	var colFlag = true;
    	for(var i =0; i < rowCount ; i++){
    		var SEL_YN      = me.getViewModel().getStore('ds_column').getAt(i).get("SEL_YN");
    		var COLUMN_NAME = me.getViewModel().getStore('ds_column').getAt(i).get("COLUMN_NAME");
    		if(SEL_YN){
    			
    			checkFlag = true;
    			colFlag   = true;
    			for(var j = 0; j < me.getViewModel().getStore('ds_alarmItemMgt').getCount() ; j++  ){
    				var COL_ID = me.getViewModel().getStore('ds_alarmItemMgt').getAt(j).get("COL_ID");
    				
    				if(COL_ID == COLUMN_NAME){
    					colFlag = false;
    					break;
    				}
    			}// for j
    			
    			if(colFlag){
    				var data = {
    					"USE_YN"   : "T",
    	    			"COL_ID"   : COLUMN_NAME,
    	    			"CODE"     : me.lookupReference('lc_alarm').getExValue(),
    	    			"GROUP_CD" : "SMSREC"
    				};
    				me.getViewModel().getStore('ds_alarmItemMgt').add(data);
    			}
    		}// if
    	}// for i
    	
    	if(!checkFlag){
    		Ext.Msg.alert('경고', '오른쪽 테이블명의<br/>데이터를 최소 1개 이상 선택후 가능합니다.');
    		return;
    	}
    },    
    onDel : function(){
    	 var me = this;
    	 
         Ext.MessageBox.confirm('경고', '삭제하시겠습니까?', function(btn){  
 	        if (btn == 'yes') {  
 	        	for(var i = me.getViewModel().getStore('ds_alarmItemMgt').getCount(); i > 0 ; i-- ){ 	        		
 	        		var SEL_YN  = me.getViewModel().getStore('ds_alarmItemMgt').getAt((i-1)).get("SEL_YN");
 	        		if(SEL_YN){
 	        			me.getViewModel().getStore('ds_alarmItemMgt').removeAt((i-1));
 	        		}
 	        	}// for
 	        }// if  
         });
    },
    onSave : function(){
    	var me = this;
    	exCommon.fnGridSaveAll(me
				              ,'ds_alarmItemMgt'
				              ,'leftNewData'
				              ,'leftUptData'
				              ,'leftDelData'
				              ,'/asp/asp006w_01/save.suvila'
				              , me.onSaveCallback);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me , success, action ,'ds_alarmItemMgt');
    	
    	if(success){
    		for(var i = 0; i < me.getViewModel().getStore('ds_column').getCount() ; i++ ){
    			var models = me.getViewModel().getStore('ds_column').getRange();
    			models[i].set('SEL_YN', false);
    		}// for
    	}// if
    }
})