Ext.define('ExFrm.view.com.group_add_mouseController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.group_add_mouse',
    onCalled:function(store){
        var me = this;
        
                
        
        
        var row = store.getCount();
        
        console.log('group_add_mouse = ', store);
        console.log('group_add_mouse row= ', row);
        
        for(var i = 0; i < row ; i++){
        	me.getViewModel().getStore('ds_temp').add( store.getAt(i).data );
        	
        }
    },
    onInit:function(){},
    onAfterRender:function(){
    	var me = this;
    	me.lookupReference('txt_group_nm').focus();
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onGroupSave : function(){
    	
    	var me = this;
    	
    	var group_nm = exCommon.getRepVal( me.lookupReference('txt_group_nm').getExValue(), '' )  
    	
    	if(group_nm == ''){
    		exCommon.msgAlert('분류 그룹명을 입력하세요.');
    		me.lookupReference('txt_group_nm').focus();
    		return false;
    	}
    	
    	me.lookupReference('newData').setExValue("");
    	
    	var rowCnt = me.getViewModel().getStore('ds_temp').getCount();
    	var jsonNewData = [];
    	
    	for(var i =0; i < rowCnt ; i++){
    		jsonNewData.push(me.getViewModel().getStore('ds_temp').getAt(i).data);
    	}
    	
    	me.lookupReference('newData').setExValue( Ext.encode(jsonNewData) );
    	
    	setTimeout(function(){
			me.callForm(me ,'/asp/CodeSearch/sindoClassMgtSave.suvila', me.onGroupSaveCallback , false);
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