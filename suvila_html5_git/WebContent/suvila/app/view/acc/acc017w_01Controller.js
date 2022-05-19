Ext.define('ExFrm.view.acc.acc017w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc017w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){
    	me.loadStorDatekPoP(me);
    	console.log('onDestroy');
    },
    onAfterRender:function(){
    	var me  = this;
    
    	me.loadStorDatekPoP(me);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate());
    	me.lookupReference('me_ActDate').setExValue(today);
    	
    	
    },
    loadStorDate:[],
    loadStorDatekPoP : function(me){
    	for(var i = 0; i<me.loadStorDate.length ; i++){
    		me.loadStorDate.pop();
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var V_ACT_DATE  =  me.lookupReference('me_ActDate').getExValue();
    	
    	if( V_ACT_DATE.length != 8  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('me_ActDate').focus();
    		return;
    	}
    	
    	var params = {
       		 V_SACT_DATE : V_ACT_DATE
       		,V_EACT_DATE : V_ACT_DATE
       		,V_ACCT_GBN  : ""
       		,V_IE_GBN    : 0
        	,V_KWAN      : 0
        	,V_REMARK    : ""
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('acc017w_01_a').getView().select(0);
    		
    		if(me.getViewModel().getStore('ds_main').getCount() == 0){
    			setTimeout(function(){
    				Ext.Msg.alert('알림', ' 검색된 데이터가 없습니다.');    				
    			},50);
    		}
    	}
    },
    onExcel : function(){
    	var me = this;
    	
    	if(me.getViewModel().getStore('ds_main').getCount() <= 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 출력 자료가 없습니다.');    				
			},50);
    		return;
		}
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		jsonPrintData.push(g_record.data);
    	}// for
    	
    	
    	var baseData = {
       		 TITLE    : "현금출납삭제("+me.lookupReference('me_ActDate').getRawValue()+")"
       	}
    	
    	jsonAllData = {
    		  "base" : baseData
        	 ,"list" : jsonPrintData
        };
          	
      	var params = {
  			 FILE_PATH  : '/acc017w_01_excel.ozr' 
  			,PRINT_DATA : jsonAllData
      	};
    		
		setTimeout(function(){
			me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    },
    onDelete : function(){
    	var me = this;
    	
    	
    	if(me.getViewModel().getStore('ds_main').getCount() == 0){
			setTimeout(function(){
				Ext.Msg.alert('알림', ' 삭제할 데이터가 없습니다.');    				
			},50);
			return false;
		}
    	
    	setTimeout(function(){
    		Ext.MessageBox.confirm('경고', '삭제하시겠습니까?', function(btn){  
    			if (btn == 'yes') {
    				
    				me.lookupReference('hidden_act_date').setExValue("");
    				var ACT_DATE = me.getViewModel().getStore('ds_main').getAt(0).get("ACT_DATE");
    				
    				/*console.log('ACT_DATE = ', ACT_DATE);*/
    				me.lookupReference('hidden_act_date').setExValue(ACT_DATE);
    				me.lookupReference('acc017w_01_a').getStore().removeAll();
    				
    				me.callForm(me, '/acc/ACC009W_01/deleteAcc.suvila', me.onDeleteCallback , false);
    				
    			}
    		});
    	},50);
    },
    onDeleteCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.getViewModel().getStore('ds_main').commitChanges();
    	}
    },
    
})