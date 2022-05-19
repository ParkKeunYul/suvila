Ext.define('ExFrm.view.asp.asp007w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp007w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeCd', '', null, me.onInitCallback);    		
    	},200);
    	
    },
    onInitCallback : function(me, success, records, operation){
    	console.log('onInitCallback',success );
    	
    	if(success) me.lookupReference('asp007w_01_a').getView().select(0);    	
    	
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me= this;
    	try{
    		var params = {
    			"O_TEMPLE_CD" : record[0].data.TEMPLE_CD
	    	};
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_templeUser', '', params, me.onSelectionChangeCallback);    		
	    	},10);
    	}catch(Exception){}
    },
    onSelectionChangeCallback : function(me, success, records, operation){
    	console.log('onSelectionChangeCallback', success + " : "+ records.length);
    	
    },
    onTempleLogin : function ( me, record, tr, rowIndex ) {
    	console.log(record.get("USER_ID"));
    	
    	var me2 = this;
    	me2.onLogin(me2 , record);
    },
    onLogin : function (me , record){
    	
    	var params  = {
    		"USER_ID"         : record.get("USER_ID"),    	
    		"V_AUTH_ADMIN_YN" : "Y"
    	};
    	
    	console.log(params);
    	
    	setTimeout(function(){
	    	me.callAjax( me 
	    			    ,'/asp/sessionLogin/login.suvila'
	    			    ,params 
	    			    ,me.onLoginCallback
	    			    ,true);
    		},10);
    	 
    },
    onLoginCallback : function(me, success , res , record , opts){
    	
    	if(success){
    		location.href='/'
    	}
    	    	
    }
})