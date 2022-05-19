Ext.define('ExFrm.view.rec.rec019w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec019w_01',
    onSearch003:function(me, params){
    	console.log('onSearch004444 = '+ me);
    	console.log('onSearch00444 = '+ params);
    },
    onDestroy : function() {
        console.log('onSearch0044422Des');
    },
    onInit:function(){
    	var me  = this;
    },
    onAfterRender:function(){
    	var me = this;

    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null ,me.dsTempleCallback);
    	},50);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
		me.lookupReference('me_AcceptSDate').setExValue( today );
		me.lookupReference('me_AcceptEDate').setExValue( today );
    },
    dsTempleCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_mgt', '', null ,me.dsMgtCallback);
    	},50);
    },
    dsMgtCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.onSelect();
    	},50);
    },
    onMgtAdd : function(){
    	var me = this;
    	
    	var data = {
    		USE_YN : true
    	};
    	
    	me.getViewModel().getStore('ds_mgt').add(data);
    },
    onMgtSave : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
      		 me
      		,'ds_mgt'
      		,'newData'
      		,'uptData'
      		,'delData'
      		,'/rec/REC019W_01/saveMgt.suvila'
      		,me.onMgtSaveCallback
      	);
    },
    onMgtSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_mgt');
    	
    	if(success){
    		setTimeout(function(){
        		me.callStore(me, 'ds_mgt', '', null ,null);
        	},50);
    	}
    },
    onSelect : function(){
    	var me  = this;
    	
    	console.log('onSelect = ' );
    	
    	var params = {
    		 VV_USER_ID : exCommon.getRepVal(me.lookupReference('lc_templeUser').getExValue())
    		,V_SDATE    : me.lookupReference('me_AcceptSDate').getExValue()
    		,V_EDATE    : me.lookupReference('me_AcceptEDate').getExValue()
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_detail', '', params ,me.onSelectCallback);
    	},50);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec019w_01_a').getView().select(0);
    		
    		if(me.getViewModel().getStore('ds_detail').getCount() > 0){
    			
    			var record = me.getViewModel().getStore('ds_detail').getAt(0)
    			
    			var params = {
    				 V_SEQ_NO     : record.get("SEQ_NO")
    				,V_ACCEPT_SEQ : record.get("ACCEPT_SEQ")
    				,V_SEQ        : record.get("SEQ")    				
    			}
    			
    			setTimeout(function(){
    				console.log('onSelectCallback');
    	    		me.callStore(me, 'ds_user', '', params , null);
    	    	},50);
    			
    		}
    	}
    },
    onAdd : function(){
    	var me = this;
    	
    	var data = {
    		 AMOUNT     : 0
    		,SEQ_NO     : ''
    		,ACCEPT_SEQ : ''
    		,SQL_MODE   : 'I'
    	}
    	me.getViewModel().getStore('ds_detail').add(data);
    	
    	/*가우스 로직은 조금 이상해서 다른식으로 수정*/
    	/*if(me.getViewModel().getStore('ds_user').getCount() == 0){
    		data = {
	    		 USER_ID : exCommon.user.userId
	    		,USER_NM : exCommon.user.userName
	    		,USE_YN  : 'T'
	    	}
	    	me.getViewModel().getStore('ds_user').add(data);
    	}*/
    	
    },
    onBeforeEdit : function( editor, context, eOpts ){
    	var me = this;
    	if(context.field == "SEQ_NO" || context.field == "AMOUNT" || context.field == "REMARK"){
    		var SQL_MODE = me.getViewModel().getStore('ds_detail').getAt(context.rowIdx).get("SQL_MODE");
    		
    		if(SQL_MODE == "I"){
    			return true;
    		}
    	}
    	return false;
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	
    	var me = this;
    	
    	try{
    		if(record.length <=  0) return;
    		
    		var params = {
  				 V_SEQ_NO     : record[0].get("SEQ_NO")
  				,V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
  				,V_SEQ        : record[0].get("SEQ")    				
  			}
  			
  			setTimeout(function(){
  	    		me.callStore(me, 'ds_user', '', params , null);
  	    	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    onSave : function(){
    	var me = this;
    	
    	exCommon.addParamSetting(me , 'ds_user' , 'ds_user');
    	
    	exCommon.fnGridSaveAll(
     		 me
     		,'ds_detail'
     		,'newData'
     		,'uptData'
     		,'delData'
     		,'/rec/REC019W_01/saveDetail.suvila'
     		,me.onDetailSaveCallback
     	);
    },
    onDetailSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_detail');
    	
    	if(success){
    		setTimeout(function(){
        		me.onSelect();
        	},50);
    	}
    },
    onConfirm : function(){
    	var me = this;
    	
    	var record   = me.lookupReference('rec019w_01_a').getView().getSelectionModel().getSelection()[0];
    	var SQL_MODE = record.get("SQL_MODE");
    	
    	if( me.getViewModel().getStore('ds_user').getCount() == 0  && SQL_MODE == 'S'){
    		var data = {
    			 ACCEPT_SEQ : record.get("ACCEPT_SEQ")
    			,SEQ_NO     : record.get("SEQ_NO")
    			,USER_ID    : exCommon.user.userId
    			,USER_NM    : exCommon.user.userName
    		}
    		me.getViewModel().getStore('ds_user').add(data);
    		exCommon.fnGridSaveAll(
	     		 me
	     		,'ds_user'
	     		,'newData'
	     		,'uptData'
	     		,'delData'
	     		,'/rec/REC019W_01/saveUser.suvila'
	     		,me.onSaveUserCallback	     		
	     	);
    	}
    },
    onSaveUserCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_user');
    	
    	if(success){
    		var record   = me.lookupReference('rec019w_01_a').getView().getSelectionModel().getSelection()[0];
    		var params = {
   				 V_SEQ_NO     : record.get("SEQ_NO")
   				,V_ACCEPT_SEQ : record.get("ACCEPT_SEQ")
   				,V_SEQ        : record.get("SEQ")    				
   			}
   			
   			setTimeout(function(){
   	    		me.callStore(me, 'ds_user', '', params , null);
   	    	},50);
    	}
    },
    onExcel : function(){
    	var me = this;
    	
    	var grid = me.lookupReference('rec019w_01_a');
        exCommon.excelDown(grid, 'bul', '불전',  me.getViewModel().getStore('ds_detail').getCount());
    	
    },
    
})
