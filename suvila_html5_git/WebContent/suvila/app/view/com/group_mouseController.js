Ext.define('ExFrm.view.com.group_mouseController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.group_mouse',
    onCalled:function(records){
        var me = this;
                
        //console.log('records = ', records);
        
        for(var i = 0; i < records.length ; i++){
        	me.getViewModel().getStore('ds_temp').add( records[i].data );
        }
                
    },
    onInit:function(){},
    onAfterRender:function(){},    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onGroupAdd : function(){
    	var me = this;
    	me.openPopup('ExFrm.view.com.group_add_mouse',  me.getViewModel().getStore('ds_temp') , me.onGroupAddReceivePopup);
    },
    onGroupAddReceivePopup:function(success, me){
    	console.log('onAddReceivePopup = ', success);
    	
    	var params = {
    		  suc : true
    		,type : 'group'
    	};
    	
    	if(success){
    		me.receiveTo(params , true);
    	}
    },
    onGroupList : function(){
    	var me = this;
    	me.openPopup('ExFrm.view.com.group_list_mouse',  me.getViewModel().getStore('ds_temp') , me.onGroupAddReceivePopup);
    },
    onSmsSend : function(){
    	var me = this;
    	me.openPopup('ExFrm.view.com.group_sms_mouse',  me.getViewModel().getStore('ds_temp') , me.onGroupAddReceivePopup);
    },
})