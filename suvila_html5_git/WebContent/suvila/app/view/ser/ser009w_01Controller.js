Ext.define('ExFrm.view.ser.ser009w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.ser009w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_SysGroup', '', null, me.SysGroupCallback);
    	},50);
    	
    },
    SysGroupCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_AuthGroup', '', null, me.AuthGroupCallback);
    	},50);
    },
    AuthGroupCallback : function(me, success, form, action){
    	me.lookupReference('lc_SysGroup').setExValue(1);
    	me.lookupReference('lc_AuthGroup').setExValue('8S');
    	
    },
    onSearchLeft: function (){
    	
    	var me = this;
    	
    	var params  = {
    		 V_SERVICE_GBN : me.lookupReference('lc_SysGroup').getExValue()
    		,V_AUTH_GROUP  : me.lookupReference('lc_AuthGroup').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.dsMainCallback);
    	},50);
    	
    },
    dsMainCallback : function(me, success, form, action){
    	
    	
    	var params  = {
       		 V_SERVICE_GBN : me.lookupReference('lc_SysGroup').getExValue()
       		,V_AUTH_GROUP  : me.lookupReference('lc_AuthGroup').getExValue()
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_authmenu', '', params, null);
    	},50);
    },
    onSelChange : function(){
    	var me = this;
    	me.onSearchLeft();
    },
    inRightMove:function(){
    	var me = this;
    	
    	var selection = me.lookupReference('ser009w_01_a').getView().getSelectionModel().getSelection();    	
    	
    	if(selection.length  > 0){
    		for(var i = 0; i < selection.length ; i++){
        		
        		var data ={
        		 	 "TEMPLE_CD"   : selection[i].data.TEMPLE_CD
        	        ,"AUTH_GROUP"  : selection[i].data.AUTH_GROUP
        	        ,"MENU_NM"     : selection[i].data.MENU_NM
        	        ,"MENU_GBN"    : selection[i].data.MENU_GBN
        	        ,"MENU_SEQ"    : selection[i].data.MENU_SEQ
        	        ,"SERVICE_GBN" : selection[i].data.SERVICE_GBN
        	        ,"PGM_ID"      : selection[i].data.PGM_ID
        		}
        		
        		console.log("PGM_ID = ", selection[i].data.PGM_ID);
        		var findRecord = me.getViewModel().getStore('ds_authmenu').findRecord('PGM_ID', selection[i].data.PGM_ID, 0, false, true, true);
        		
        		if(findRecord == null){
        			//console.log('if');
        			me.getViewModel().getStore('ds_authmenu').add(data);
        			
        			if( selection[i].data.MENU_GBN == "P" ){
        				me.lookupReference('ser009w_01_a').getStore().remove(selection[i]);
        			}
        		}// if findRecord
        		
        	}// for
    	}// if
    	
    	
    	me.getViewModel().getStore('ds_authmenu').sort([{
            property: 'SERVICE_GBN',
            direction: 'ASC'
    	},{
    		property: 'MENU_SEQ',
            direction: 'ASC'
        }]);
    	
    },
    inRightAllMove : function(){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	
    	
    	if(rowCount > 0){
    		
    		for(var i = (rowCount-1) ; i  >= 0  ; i--){
    			
    			
    			var  record =  me.getViewModel().getStore('ds_main').getAt(i);
    			
    			me.lookupReference('ser009w_01_a').getView().select(i);
    			
    			var data ={
           		 	 "TEMPLE_CD"   : record.get("TEMPLE_CD")
           	        ,"AUTH_GROUP"  : record.get("AUTH_GROUP")
           	        ,"MENU_NM"     : record.get("MENU_NM")
           	        ,"MENU_GBN"    : record.get("MENU_GBN")
           	        ,"MENU_SEQ"    : record.get("MENU_SEQ")
           	        ,"SERVICE_GBN" : record.get("SERVICE_GBN")
           	        ,"PGM_ID"      : record.get("PGM_ID")
           		}
    			
    			var findRecord = me.getViewModel().getStore('ds_authmenu').findRecord('PGM_ID', record.get("PGM_ID"), 0, false, true, true);
    			
    			
    			if(findRecord == null){
        			me.getViewModel().getStore('ds_authmenu').add(data);
        			
        			if( record.get("MENU_GBN") == "P" ){
        				var selectedRecord = me.lookupReference('ser009w_01_a').getView().getSelectionModel().getSelection()[0];
    	        		me.lookupReference('ser009w_01_a').getStore().remove(selectedRecord);
        			}
        		}// if findRecord
    			
    		}// for
    		
    		me.getViewModel().getStore('ds_authmenu').sort([{
                property: 'SERVICE_GBN',
                direction: 'ASC'
        	},{
        		property: 'MENU_SEQ',
                direction: 'ASC'
            }]);
    		
    	}// if rowCount
    	
    },
    inLeftMove : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('ser009w_01_b').getView().getSelectionModel().getSelection();
    	
    	if(selection.length  > 0){
    		for(var i = 0; i < selection.length ; i++){
        		
        		//console.log('i = ', i);
        		var data ={
        		 	 "TEMPLE_CD"   : selection[i].data.TEMPLE_CD
        	        ,"AUTH_GROUP"  : selection[i].data.AUTH_GROUP
        	        ,"MENU_NM"     : selection[i].data.MENU_NM
        	        ,"MENU_GBN"    : selection[i].data.MENU_GBN
        	        ,"MENU_SEQ"    : selection[i].data.MENU_SEQ
        	        ,"SERVICE_GBN" : selection[i].data.SERVICE_GBN
        	        ,"PGM_ID"      : selection[i].data.PGM_ID
        		}
        		
        		var findRecord = me.getViewModel().getStore('ds_main').findRecord('PGM_ID', selection[i].data.PGM_ID, 0, false, true, true);
        		
        		if(findRecord == null){
        			//console.log('if');
        			if( selection[i].data.MENU_GBN == "P" ){
        				me.getViewModel().getStore('ds_main').add(data);
        			}        			
        		}// if 
        		me.lookupReference('ser009w_01_b').getStore().remove(selection[i]);
        	}// for
    	}// if
    	
    	
    	me.getViewModel().getStore('ds_main').sort([{
            property: 'SERVICE_GBN',
            direction: 'ASC'
    	},{
    		property: 'MENU_SEQ',
            direction: 'ASC'
        }]);
    	
    	me.getViewModel().getStore('ds_authmenu').sort([{
            property: 'SERVICE_GBN',
            direction: 'ASC'
    	},{
    		property: 'MENU_SEQ',
            direction: 'ASC'
        }]);
    	
    },
    inLeftAllMove : function(){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_authmenu').getCount();
    	
    	//console.log('inLeftAllMove = ', rowCount);
    	
    	if(rowCount > 0){
    		
    		for(var i = 0 ; i  <  rowCount  ; i++){    			
    			me.lookupReference('ser009w_01_b').getView().select(i);
    			
    			var selection = me.lookupReference('ser009w_01_b').getView().getSelectionModel().getSelection()[0];
    			
    			var data ={
           		 	 "TEMPLE_CD"   : selection.get("TEMPLE_CD")
           	        ,"AUTH_GROUP"  : selection.get("AUTH_GROUP")
           	        ,"MENU_NM"     : selection.get("MENU_NM")
           	        ,"MENU_GBN"    : selection.get("MENU_GBN")
           	        ,"MENU_SEQ"    : selection.get("MENU_SEQ")
           	        ,"SERVICE_GBN" : selection.get("SERVICE_GBN")
           	        ,"PGM_ID"      : selection.get("PGM_ID")
           		}
    			
    			var findRecord = me.getViewModel().getStore('ds_main').findRecord('PGM_ID', selection.get("PGM_ID"), 0, false, true, true);
    			if(findRecord == null){
        			if( selection.get("MENU_GBN") == "P" ){
        				me.getViewModel().getStore('ds_main').add(data);
        			}        			
        		}// if findRecord
    		}// for
    		
    		me.getViewModel().getStore('ds_authmenu').removeAll();
    		
    		me.getViewModel().getStore('ds_main').sort([{
                property: 'SERVICE_GBN',
                direction: 'ASC'
        	},{
        		property: 'MENU_SEQ',
                direction: 'ASC'
            }]);
        	
        	me.getViewModel().getStore('ds_authmenu').sort([{
                property: 'SERVICE_GBN',
                direction: 'ASC'
        	},{
        		property: 'MENU_SEQ',
                direction: 'ASC'
            }]);
    		
    	}// if rowCount
    },
    onSave : function(){
    	var me = this;
    	
    	var flag =   exCommon.ChangeCount('ds_authmenu', me);
    	
    	
    	me.lookupReference('newData').setExValue("");
    	me.lookupReference('delData').setExValue("");
    	
    	if(flag > 0){
    		var rowCount = me.getViewModel().getStore('ds_authmenu').getCount();
        	
        	
        	var jsonNewData = [];
        	var dataCnt =0;
        	for(var i = 0; i< rowCount ; i++){
        		var record = me.getViewModel().getStore('ds_authmenu').getAt(i).data;
        		jsonNewData.push(record);
        		dataCnt ++;
        	}
        	console.log(Ext.encode(jsonNewData));
        	me.lookupReference('newData').setExValue(Ext.encode(jsonNewData));
        	
        	
        	var jsonDelData = [];
        	var records = me.getViewModel().getStore('ds_authmenu').getRemovedRecords();
        	for (var i=0; i < records.length; i++){       
            	jsonDelData.push(records[i].data);            	
            }
        	console.log(Ext.encode(jsonDelData));
        	me.lookupReference('delData').setExValue(Ext.encode(jsonDelData));
        	
        	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
        		if (btn == 'yes') {
        			setTimeout(function(){
        				me.callForm(me, '/ser/SER009W_01/authMenuSave.suvila', me.onSaveCallback , false);
        			},10);	
        		}
        	});
        	
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert('알림', "변경된 자료가 없습니다.");
    		},50);
    	}
    	
    },
    onSaveCallback : function (me, success, records, action){
    	if(success){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', "자료 처리가 성공적으로 수행되었습니다.");
    		},50);
    		me.onSearchLeft();
    	}
    }
    
})