Ext.define('ExFrm.view.com.group_list_mouseController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.group_list_mouse',
    onCalled:function(store){
        var me = this;
                
        var row = store.getCount();
        
        console.log('group_list_mouse = ', store);
        console.log('group_list_mouse row= ', row);
        
        for(var i = 0; i < row ; i++){
        	me.getViewModel().getStore('ds_temp').add( store.getAt(i).data );
        	
        }
    },
    onInit:function(){
    	var me =this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.onClassMgtCallback);
    	},50);
    },
    onClassMgtCallback : function(me, success, form, action){
    	me.lookupReference('group_list_mouse_a').getView().select(0);
    },
    onAfterRender:function(){
    	var me = this;
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onGroupListSave : function(){
    	var me = this;
    	
    	
    	var selectedRecord = me.lookupReference('group_list_mouse_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	me.lookupReference('newData').setExValue("");
    	
    	var rowCnt = me.getViewModel().getStore('ds_temp').getCount();
    	var jsonNewData = [];
    	
    	for(var i =0; i < rowCnt ; i++){
    		me.getViewModel().getStore('ds_temp').getAt(i).set("CLASS_CD", selectedRecord.get("CLASS_CD"))
    		console.log(me.getViewModel().getStore('ds_temp').getAt(i).data);
    		jsonNewData.push(me.getViewModel().getStore('ds_temp').getAt(i).data);
    	}
    	
    	me.lookupReference('newData').setExValue( Ext.encode(jsonNewData) );
    	
    	setTimeout(function(){
			me.callForm(me ,'/asp/CodeSearch/sindoClassSave.suvila', me.onGroupSaveCallback , false);
		},10);	
    	
    
    },
    onGroupSaveCallback  : function(me, success, form, action){
    	
    	if(success){
    		exCommon.msgAlert('저장되었습니다.');
    		me.receiveTo(true , true);
    	}else{
    		exCommon.msgAlert('오류가 발생했습니다.<br/>다시 시도해주세요.');
    	}
    	
    },
})