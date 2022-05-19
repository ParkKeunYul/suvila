Ext.define('ExFrm.view.asp.asp009w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp009w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    },   
    onInit:function(me){
    	me.lookupReference('em_date').setExValue( exCommon.getNowDate() );
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 V_DATE           : me.lookupReference('em_date').getExValue()
    		,TEMP_V_TEMPLE_CD : me.lookupReference('lc_templeCd').getExValue()
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main'   , '', params, me.onSelectCallback);
    		
    	},10);
    },
    onSelectCallback : function (me, success, records, operation){
    	console.log('onSelectCallback', success);
    	if(success && records.length  == 0){
    		Ext.Msg.alert('알림', '검색된 데이터가 없습니다.');
    	}
    },
    onDelete : function(){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(rowCount > 0){
    		
    		var templeNm = me.lookupReference('lc_templeCd').getRawValue();
    		var date     = me.lookupReference('em_date').getExValue();
    		
    		Ext.MessageBox.confirm('경고', templeNm +" "+ date + ' 삭제하시겠습니까?', function(btn){  
    			if (btn == 'yes') { 
    	    		me.callForm(me, '/asp/asp009w_01/deleteAcc.suvila', me.onDeleteCallback , false);
    			}
    		});
    	}else{
    		Ext.Msg.alert('경고', '검색 후 작업하세요.');
    	}
    },
    onDeleteCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_main').removeAll();
    		exCommon.fnGridSaveCallback(me,success ,action , 'ds_main');
    	}
    	
    }
})