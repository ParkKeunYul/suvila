Ext.define('ExFrm.view.com.moyeonmunController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.moyeonmun',
    onCalled:function(params){
        var me = this;
        
        console.log('moyeonmun = '+ params);
        me.lookupReference('txt_daeju').setExValue(params.V_DAEJU);
        me.lookupReference('txt_bud_code').setExValue(params.V_BUD_CODE);
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_Moyeon', '', null ,me.dsMoyeonnCallback);
    	},50);
    },
    dsMoyeonnCallback : function(me, success, form, action){
    	
    	if(success){
    		var record = me.getViewModel().getStore('ds_Moyeon').getAt(0);
    		
    		var data = {
    			 MOYEONMUN_CODE : "0"
    			,MOYEONMUN_NM   : "전체"
    		}
    		me.getViewModel().getStore('ds_Moyeon').insert(0 , data);
    		me.lookupReference('lc_Moyeon').setExValue( 0 );
    	}
    	
    },
    onCellDbClick : function(me , td , cellIndex , record , tr , rowIndex , e , eOpts ){
    	this.receiveTo(record.data , true);
    },
    onConfirm : function(){
    	var me = this;
    	
    	try{
    		var data = me.lookupReference('moyeonmun_a').getView().getSelectionModel().getSelection()[0].data;
    		console.log('data = ', data);
    		
    		this.receiveTo(data , true);
    	}catch (e) {
    		
    		setTimeout(function(){
    			Ext.Msg.alert('알림',  "선택 되어진 데이턱라 없습니다.");    				
    		},50);
    		return false;
    	}
    	
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 V_MOYEON       : me.lookupReference('lc_Moyeon').getExValue()
    		,V_SEARCH_GBN   : me.lookupReference('sel_BudSearchGbn').getExValue()
    		,V_SEARCH_WORD  : encodeURI(me.lookupReference('txt_name').getExValue())
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},50);
    },
    /*onSelectCallback : function(me, success, form, action){ 
    	if(success){
    		me.lookupReference('moyeonmun_a').getView().select(0);
        }
    },*/
    onDestroy:function(){
        console.log('memoController', 'onDestroy');
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    
})