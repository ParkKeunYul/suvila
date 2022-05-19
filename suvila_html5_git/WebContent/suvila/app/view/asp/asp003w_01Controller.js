Ext.define('ExFrm.view.asp.asp003w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp003w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    },   
    onSelectionChange : function( me2, record , selections , eOpts){
    	
    	try{
    		var groupCd =  record[0].data.GROUP_CD;
        	var params = {
        		V_GROUP_CD : groupCd
        	};
        	var me = this;
        	me.callStore(me, 'ds_code', '', params, me.onCodeCallback);
    	}catch (e) {}
    	    	
    },
    onInit:function(me){
    	var params = {};
    	me.callStore(me, 'ds_group', '', params, me.onInitCallback)
    },
    onInitCallback : function(me, success, records, operation){
    	if(success == true){
    		me.lookupReference('asp003w_01_a').getView().select(0);
    	}
    },
    
    onCodeCallback : function(me, success, records, operation){
    	    	
    },
    onGroupSelect : function(){
    	var me =  this;
    	var params = {
    		V_SEARCH_TYPE  : me.lookupReference('txt_search_type').getExValue(),
    		V_SEARCH_VALUE : encodeURI(me.lookupReference('txt_search_value').getExValue())
        };
    	me.callStore(me, 'ds_group', '', params, me.onInitCallback)
    },
    onGroupAdd : function(){
    	var me = this;
    	var rowCount = me.getViewModel().getStore('ds_group').getCount();
    	var data = {
   			GROUP_CD : '',
   			NAME     : '',
        };
    	me.getViewModel().getStore('ds_group').add(data);
    	me.lookupReference('asp003w_01_a').getView().select(rowCount);
    	me.lookupReference('asp003w_01_a').plugins[0].startEditByPosition({
            row: rowCount,
            column: 1
        });
    },
    groupSave : function (){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_group').getCount();    	
    	for(var i =0; i < rowCount ; i++){
    		var code = me.lookupReference('asp003w_01_a').getStore().getAt(i).data.GROUP_CD;
    		var name = me.lookupReference('asp003w_01_a').getStore().getAt(i).data.NAME;
    		if( code == null || code.trim()  == "" ){
    			setTimeout(function(){
    				Ext.Msg.alert('경고', '그룹코드를 입력하세요.');    				
    			},50); 
    			return;    			
    		}
    		if( name == null || name.trim()  == "" ){
    			setTimeout(function(){
    				Ext.Msg.alert('경고', '그룹명을 입력하세요.');
    			},50); 
    			return;    			
    		} 
    	}//for
    	exCommon.fnGridSave(me
				           ,'ds_group'
				           ,'groupNewData'
				           ,'groupUptData'
				           ,'/asp/asp003w_01/groupSave.suvila'
				           , me.groupSaveCallback)
    	
    },
    groupSaveCallback : function(me, success, form, action){
    	console.log('groupSaveCallback', 'groupSaveCallback');
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_group');
    },
    onAddCode : function (){
    	var me = this;
    
    	var selectedRecord = this.lookupReference('asp003w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var groupCd = selectedRecord.data.GROUP_CD;
    	
    	if(groupCd == null || groupCd == ""){
    		Ext.Msg.alert('경고', '그룹코드를 생성후<BR/>공통코드를 추가할수 있습니다.');
    		return;
    	}
    	
    	
    	var rowCount = me.getViewModel().getStore('ds_code').getCount();
    	
    	for(var i =0; i < rowCount ; i++){
    		var code = me.lookupReference('asp003w_01_b').getStore().getAt(i).data.CODE;
    		var name = me.lookupReference('asp003w_01_b').getStore().getAt(i).data.NAME;
    		if( code == null || code.trim()  == "" ){
    			setTimeout(function(){
    				Ext.Msg.alert('경고', '코드를 입력하세요.');    				
    			},50);  
    			return;    			
    		}
    		
    		if( name == null || name.trim()  == "" ){
    			setTimeout(function(){
    				Ext.Msg.alert('경고', '코드명을 입력하세요.');
    			},50); 
    			return;    			
    		} 
    	}
    	
    	var selectedRecord = this.lookupReference('asp003w_01_a').getView().getSelectionModel().getSelection()[0];
    	console.log('selectedRecord.data.GROUP_CD', selectedRecord.data.GROUP_CD);
    	
    	var data ={
    			CODE     : '',
    			USE_YN   : 'Y',
    			SORT_SEQ : (rowCount+1),
    			ETC1     : '',
    			ETC2     : '',
    			ETC3     : '',
    			REMARK   : '', 
    			GROUP_CD : selectedRecord.data.GROUP_CD
    	};
    	me.getViewModel().getStore('ds_code').add(data);
    	me.lookupReference('asp003w_01_b').plugins[0].startEditByPosition({
            row: rowCount,
            column: 0
        });
    },
    onCodeSave : function(){
    	var me = this;
    	var rowCount = me.getViewModel().getStore('ds_code').getCount();
    	
    	var dataCnt =0;
    	
    	for(var i =0; i < rowCount ; i++){
    		var code = me.lookupReference('asp003w_01_b').getStore().getAt(i).data.CODE;
    		var name = me.lookupReference('asp003w_01_b').getStore().getAt(i).data.NAME;
    		if( code == null || code.trim()  == "" ){
    			setTimeout(function(){
    				Ext.Msg.alert('경고', '코드를 입력하세요.');    				
    			},50);  
    			return;    			
    		}
    		
    		if( name == null || name.trim()  == "" ){
    			setTimeout(function(){
    				Ext.Msg.alert('경고', '코드명을 입력하세요.');
    			},50); 
    			return;    			
    		} 
    	}//for
    	
    	exCommon.fnGridSave(me
    			           ,'ds_code'
    			           ,'codeNewData'
    			           ,'codeUptData'
    			           ,'/asp/asp003w_01/codeSave.suvila'
    			           , me.onCodeSaveCallback)
    },
    onCodeSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_code');
    }
    
    
})