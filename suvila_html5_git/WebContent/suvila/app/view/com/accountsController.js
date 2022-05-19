Ext.define('ExFrm.view.com.accountsController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.accounts',    
    onCalled:function(params){
        var me = this;
        console.log('onCalled', params);
       
        
        setTimeout(function(){
        	if(params.ACCT_GBN == null || params.ACCT_GBN == "" || params.ACCT_GBN == undefined){
        		me.lookupReference('lc_acctGbn').setExValue(1);
        	}else{
        		me.lookupReference('lc_acctGbn').setExValue(params.ACCT_GBN);
        	}
        	
        },10);
        
        
        me.lookupReference('call_kwan').setExValue(params.KWAN);
		me.lookupReference('call_hang').setExValue(params.HANG);
        
		
		if(params.IE_GBN == null || params.IE_GBN == "" || params.IE_GBN == undefined){
			me.lookupReference('lc_ieGbn').setExValue('I');
		}else{
			me.lookupReference('lc_ieGbn').setExValue(params.IE_GBN);
		}
		
    	
		me.lookupReference('txt_mok_name').setExValue(params.MOK_NAME);
		
		me.loadState.push(1);
		
		var ROWIDX = params.ROWIDX;
		
		me.saveRowIdxPoP(me);
		me.loadState.push(ROWIDX);
    },
    onDestroy:function(){
    	console.log('onDestroy');
    	me.saveRowIdxPoP(me);
    },
    saveRowIdx:[],
    saveRowIdxPoP : function(me){
    	for(var i = 0; i<me.saveRowIdx.length ; i++){
    		me.saveRowIdx.pop();
    	}
    },
    loadState:[],
    loadStatePoP : function(me){
    	for(var i = 0; i<me.loadState.length ; i++){
    		me.loadState.pop();
    	}
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_acctGbn', '', null, me.ds_acctGbnInitCallback);
       	},50);
    },
    onInit:function(me){
    	
    },
    ds_acctGbnInitCallback : function (me, success, records, operation){
    	console.log('ds_acctGbnCallback')
    	var params = {
       		 V_ACCT_GBN  : "1"
       		,V_IE_GBN    : me.lookupReference('lc_ieGbn').getExValue()
       		,V_HANG      : 0
       		,V_MOK       : 0
       	};
    	
    	console.log('kwan = ', params);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan'   , '', params, me.dsKwanInitCallback);
       	},50);
    },
    dsKwanInitCallback : function (me, success, records, operation){
    	
    	var selParam = {
    		V_KWAN : me.lookupReference('call_kwan').getExValue()
    	}
    	
    	me.onSelectKwan(me,selParam  );
    	
    	var params = {
      		 V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
      		,V_IE_GBN    : me.lookupReference('lc_ieGbn').getExValue()
      		,V_KWAN      : me.lookupReference('call_kwan').getExValue()
      	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_hang'   , '', params,  me.dsHangInitCallback);
       	},50);
    },
    
    dsHangInitCallback : function (me, success, records, operation){
    	
    	if(success){
    		var params = {
	      		 V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
	      		,V_IE_GBN    : me.lookupReference('lc_ieGbn').getExValue()
	      		,V_MOK_NAME  : encodeURI(me.lookupReference('txt_mok_name').getExValue())
	      	};
	    	
	    	var hang = me.lookupReference('call_hang').getExValue()
			for(var i = 0; i < records.length ; i++ ){
				var rowData = records[i];
				if( rowData.get("HANG") == hang ){
					rowData.set("USE_YN", true);
					me.lookupReference('accounts_b').getView().select(i);
				}else{
				}
			}//
			me.getViewModel().getStore('ds_hang').commitChanges();
	    	me.onSearch();
	    	me.loadStatePoP(me);
    	}
    	
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSearch();
    	}
    },
    onSearch : function(){
    	var me = this;
    	var params = {
    		V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
           ,V_IE_GBN    : me.lookupReference('lc_ieGbn').getExValue()
           ,V_MOK_NAME  : encodeURI(me.lookupReference('txt_mok_name').getExValue())
    	};
    	
    	/*console.log('onSearch', params);*/
    	
    	me.callStore(me, 'ds_mok'   , '', params, me.onSearchCallback);
    },
    onSearchCallback : function (me, success, records, operation){
    	/*console.log('onSearchCallback',success );*/
    	if( success && records.length > 0  ){
    		me.lookupReference('accounts_a').getView().select(0);
    	}
    },
    onSelectionChangeMok : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	    	
    	/*console.log('onSelectionChangeMok');*/
    	if(record.length > 0){
    		var params = {
    				V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
    		       ,V_IE_GBN    : me.lookupReference('lc_ieGbn').getExValue()
    		       ,V_KWAN      : record[0].get("KWAN")
    		       ,V_HANG      : record[0].get("HANG")
    		};
    		setTimeout(function(){
    			me.callStore(me, 'ds_hang'   , '', params, me.ds_hangCallback);
    		},50);
    		setTimeout(function(){
    			me.onSelectKwan(me , params);
    		},50);
    		
    	}
    },
    onSelectKwan : function(me , params){
    	var kwanCnt = me.getViewModel().getStore('ds_kwan').getCount();
    	
    	for(var i = 0; i < kwanCnt ; i++){
    		var kwanData = me.getViewModel().getStore('ds_kwan').getAt(i);
    		
    		if(params.V_KWAN == kwanData.get("KWAN")){
    			kwanData.set("USE_YN", true);
    			me.lookupReference('accounts_c').getView().select(i);
    		}else{
    			kwanData.set("USE_YN", false);
    		}
    		me.getViewModel().getStore('ds_kwan').commitChanges();
    	}
    },
    ds_hangCallback: function (me, success, records, operation){
    	if(success){
    		
    		var hang = operation._params.V_HANG;
    		
    		for(var i = 0; i < records.length ; i++ ){
    			var rowData = records[i];
    			if( rowData.get("HANG") == hang ){
    				rowData.set("USE_YN", true);
    				me.lookupReference('accounts_b').getView().select(i);
    			}else{
    			}
    			
    		}//
    		me.getViewModel().getStore('ds_hang').commitChanges();
    	}
    },
    onKhmChange : function(opt, newValue, oldValue){
    	var me = this;
    	
    	
    	console.log('me.loadState.length = ', me.loadState.length);
    	console.log('opt = ', opt);
    	console.log('newValue = ', newValue);
    	console.log('oldValue = ', oldValue);
    	
    	if( (newValue == 1 && oldValue  == 1) ||  (newValue == 'I'  && oldValue  == null) ){
    		return;
    	}
    	
    	var lc_acctGbn = me.lookupReference('lc_acctGbn').getExValue();
    	var lc_ieGbn   = me.lookupReference('lc_ieGbn').getExValue();
    	
    	if(lc_acctGbn != null && lc_acctGbn != "" && lc_ieGbn != null && lc_ieGbn !=""){
    		
    		var V_MOK_NAME = me.lookupReference('txt_mok_name').getExValue();
    		
    			me.lookupReference('txt_mok_name').setExValue("");
    			V_MOK_NAME = "";
    		
    		
    		
        	var params = {
        		V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
               ,V_IE_GBN    : me.lookupReference('lc_ieGbn').getExValue()
               ,V_MOK_NAME  : encodeURI(V_MOK_NAME)
        	};
        	/*console.log('onKhmChange', params);*/
        	
        	setTimeout(function(){
        		me.callStore(me, 'ds_mok'   , '', params, me.onKhmChangeCallback);
        	},10);
    	}
    },
    onKhmChangeCallback : function (me, success, records, operation){
    	/*console.log('onKhmChangeCallback');*/
    	me.lookupReference('txt_init_value').setExValue(0);
    	
    	if(success && records.length > 0){
    		var params = {
	       		 V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
	       		,V_IE_GBN    : me.lookupReference('lc_ieGbn').getExValue()
	       		,V_HANG      : 0
	       		,V_MOK       : 0
	       	};
    		setTimeout(function(){
    			me.callStore(me, 'ds_kwan'   , '', params, me.ds_kwanCallback);
    		},10);
    		
    		me.lookupReference('accounts_a').getView().select(0);
    		
    	}
    	
    	
    },
    ds_kwanCallback  : function(me, success, records, operation){
    	
    	//console.log('ds_kwanCallback', records);
    	
    	var mokRecord = me.lookupReference('accounts_a').getView().getSelectionModel().getSelection();
    	
    	if(mokRecord.length > 0){
    		
    		/*console.log('mokRecord KWAN', mokRecord[0].get("KWAN"));*/
        	
        	var kwanRowCnt = records.length;
        	for(var i = 0; i < kwanRowCnt ; i++ ){
        		var kwan = records[i].get("KWAN");
        		//console.log("kwan", kwan);
        		
        		if( mokRecord[0].get("KWAN") == kwan ){
        			records[i].set("USE_YN", true);
        			me.lookupReference('accounts_c').getView().select(i);
        		}
        		
        	}
        	me.getViewModel().getStore('ds_kwan').commitChanges();
    	}
    },
    onConfirm : function(){
    	var me = this;
    	var mokRecord = me.lookupReference('accounts_a').getView().getSelectionModel().getSelection();
    	
    	if(mokRecord.length == 0){
    		Ext.Msg.alert('알림', '목을 선택하세요.');
    		return;
    	}
    	    	    	
    	console.log(mokRecord[0]);
    	
    	var ACCT_GBN = mokRecord[0].get("ACCT_GBN");
    	var IE_GBN   = mokRecord[0].get("IE_GBN");
    	var KWAN     = mokRecord[0].get("KWAN");
    	var MOK      = mokRecord[0].get("MOK");
    	var MOK_NAME = mokRecord[0].get("MOK_NAME");
    	var HANG     = mokRecord[0].get("HANG");
    	var HANG_NAME= mokRecord[0].get("HANG_NAME");
    	var ROWIDX   = me.saveRowIdx[0];
    
    	
    	var ACCT_NM = me.lookupReference('lc_acctGbn').getRawValue();
    	
    	var params  =  {
    		 ACCT_GBN  : ACCT_GBN
    		,IE_GBN    : IE_GBN
    		,KWAN      : KWAN
    		,MOK       : MOK
    		,MOK_NAME  : MOK_NAME
    		,HANG      : HANG
    		,HANG_NAME : HANG_NAME
    		,ROWIDX    : ROWIDX
    		,ACCT_NM   : ACCT_NM
    	}
    	this.receiveTo(params, true);
    },
    onCellDbClick : function(){
    	var me = this;
    	me.onConfirm();
    },
    onCancel : function(){
    	this.getView().destroy();
    }
    
    
})