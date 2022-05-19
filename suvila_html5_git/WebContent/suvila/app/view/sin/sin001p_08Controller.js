Ext.define('ExFrm.view.sin.sin001p_08Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_08',
    onCalled:function(params){
        var me = this;
        console.log('onCalled = ', params.old_budCd);
      
        
        me.lookupReference('old_budCd').setExValue( params.old_budCd );
        
    },
    onInit:function(me){},
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onAfterRender:function(me){
    	
    	
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSearch();
    	}
    },
    onSearch : function(){
    	var me = this;
    	
    	
    	var txt_startNo = parseInt(me.lookupReference('txt_startNo').getExValue());
    	var txt_endNo   = parseInt( me.lookupReference('txt_endNo').getExValue());
    	
    	if(txt_endNo - txt_startNo < 0){
    		exCommon.msgAlert('검색 시작번호가 끝번호보다 작을 수 없습니다.');
    		return;
    	}
    	
    	if(txt_endNo - txt_startNo > 10000){
    		exCommon.msgAlert('검색범위가 10,000을 초과할수 없습니다.');
    		return;
    	}
    	
    	
    	var params = {
    		V_START_NO	: txt_startNo
    	   ,V_END_NO    : txt_endNo
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.dsMainCallback);
    	},50);
    },
    dsMainCallback:function(me, success, form, action){
    	
    	if(me.getViewModel().getStore('ds_main').getCount() <= 0){
    		exCommon.msgAlert('조회된 신규 번호가 없습니다.');
    		return;
    	}else{
    		me.lookupReference('sin001p_08_a').getView().select(0);
    	}
    	
    	
    },
    onChange : function(){
    	var me = this;
    	
    	
    	var selectedRecord = me.lookupReference('sin001p_08_a').getView().getSelectionModel().getSelection()[0];
    	
    	if(selectedRecord == null){
    		exCommon.msgAlert('선택된 번호가 없습니다.');
    		return;
    	}
    	console.log(selectedRecord);
    	me.lookupReference('new_budCd').setExValue( selectedRecord.data.BUD_CODE );
    	
    	Ext.MessageBox.confirm('알림', '신도번호를 변경하시겠습니까', function(btn){
    		if (btn == 'yes') {
    			
    			me.callForm(me, '/sin/SIN001P_08/save.suvila', me.onChangeCallback , false);
    		}
    	});
    },
    onChangeCallback:function(me, success, form, action){
    	console.log('form = ', form);
    	console.log('action = ',action);
    	if(success){
    		var new_budCd = me.lookupReference('new_budCd').getExValue();
    		
    		var rtnInfo = {
    			 suc       : true
    			,BUD_CODE  :  new_budCd
    		}
    		
    		console.log('rtnInfo = ', rtnInfo);
    		
    		me.receiveTo(rtnInfo, true);
    	}else{
    		exCommon.msgAlert(action.result.msg);
    	}
    }
})