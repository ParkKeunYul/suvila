Ext.define('ExFrm.view.acc.acc028w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc028w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){},
    loadState:[],
    loadStatePoP : function(me){
    	for(var i = 0; i<me.loadState.length ; i++){
    		me.loadState.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_Date').setExValue(today);
    	
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, me.dsAcctCallback);
    	},50);
    	
    	
    	var data = {
    		 "KWAN_NAME" : "전체"
    	    ,"KWAN"      : "0"
    	};
   		me.getViewModel().getStore('ds_kwan').insert(0, data);
   		me.lookupReference('lc_kwan').setValue("0");
    	
    },
    dsAcctCallback : function(me, success, form, action){
    	
    	var data = {
    		 "NAME"      : "전체"
    	    ,"CODE"      : "0"
    	};
   		me.getViewModel().getStore('ds_acctGbn').insert(0, data);
   		me.lookupReference('lc_acctGbn').setValue("0");
   		
   		setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', {group_cd : "IEGBN"}, me.dsIeGbnCallback);
    	},80);
    },
    dsIeGbnCallback : function(me, success, form, action){
    	var data = {
       		 "NAME"      : "전체"
       	    ,"CODE"      : "0"
       	};
  		me.getViewModel().getStore('ds_iegbn').insert(0, data);
  		me.lookupReference('lc_iegbn').setValue("0");
  		
  		setTimeout(function(){
    		me.callStore(me, 'ds_approval', '', null, null);
    	},50);
    },
    onSelectChange : function(){
    	var me = this;
    	
    	var V_ACCT_GBN = me.lookupReference('lc_acctGbn').getExValue();
    	var V_IE_GBN   = me.lookupReference('lc_iegbn').getExValue();
    	
    	var params = {
      		 V_ACCT_GBN : V_ACCT_GBN
      		,V_IE_GBN   : V_IE_GBN
      		,V_HANG     : "0"
      		,V_MOK      : "0"
      		,V_TYPE     : 'bogo'
      	};
    	setTimeout(function(){
       		me.callStore(me, 'ds_kwan', '', params, me.onSelectChangeCallback);
       	},50);
    },
    onSelectChangeCallback : function(me, success, form, action){
    	if(success){
    		var data = {
	    		 "KWAN_NAME" : "전체"
	    	    ,"KWAN"      : "0"
	    	};
    		me.getViewModel().getStore('ds_kwan').insert(0, data);
    		me.lookupReference('lc_kwan').setValue("0");
    	}    	
    },
    onSelect : function(){
    	var me = this;
    	
    	var V_DATE 		 =  me.lookupReference('em_Date').getExValue();
    	
    	if(V_DATE.length > 8) V_DATE = V_DATE.substr(0,8);
    	
    	if( V_DATE.length  != 8  ){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_Date').focus();
    		return;
    	}
    		
    	
    	var params = {
    		 V_DATE       : V_DATE   	
    		,V_ACCT_GBN   : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN     : me.lookupReference('lc_iegbn').getExValue()
    		,V_KWAN       : me.lookupReference('lc_kwan').getExValue()
       	};
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		if( success ){
			
		}
    },
    onPrint1 : function(){
    	var me = this;
    	
    	if( me.getViewModel().getStore('ds_main').getCount() <= 0 ){
    		exCommon.msgAlert( '검색 후 작업하십시요.' );
    		return;
    	}
    	
    	
    	var jsonAllData   = me.inPrintData(me);
    	//return;
    	var params = {
   			 FILE_PATH  : '/acc023w_01_rp_print1.ozr' 
   			,PRINT_DATA : jsonAllData
       	};
     		
 		setTimeout(function(){
 			me.openPopup('ExFrm.view.com.print',  params, null);
    	},100);
    	
    	
    },
    onPrint : function(){
    	var me = this;
    	
    	var jsonAllData   = me.inPrintData(me);
    	//return;
    	var params = {
  			 FILE_PATH  : '/acc023w_01_rp_print.ozr' 
  			,PRINT_DATA : jsonAllData
      	};
    		
		setTimeout(function(){
			me.openPopup('ExFrm.view.com.print',  params, null);
		},100);
    	
    },
    inPrintData : function(me){
    	
    	var APPROVAL_TITLE = new Array("","","","","") ;
    	for(i=0; i<me.getViewModel().getStore('ds_approval').getCount(); i++){
			if(i>5){break;}
			APPROVAL_TITLE[i] = me.getViewModel().getStore('ds_approval').getAt(i).get("APPROVAL_TITLE");
		}
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	var baseData = {};
    	var listData = [];
    	
    	var pageFlag = 0;
    	var A_ACCT_GBN;
    	var A_IE_GBN;
    	console.log('g_row = ', g_row);
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var ACCT_GBN = exCommon.getRepVal(g_record.get("ACCT_GBN"));
    		var IE_GBN   = exCommon.getRepVal(g_record.get("IE_GBN"))
    		var subData  = g_record.data;
    		
    		
    		if(i == 0){
    			A_ACCT_GBN = ACCT_GBN;
    			A_IE_GBN   = IE_GBN;
    			
    			baseData ={
       				 TITLE           : subData.TITLE
       				,APPROVAL_TITLE1 : exCommon.getRepVal(APPROVAL_TITLE[0], '')
           			,APPROVAL_TITLE2 : exCommon.getRepVal(APPROVAL_TITLE[1], '')
           			,APPROVAL_TITLE3 : exCommon.getRepVal(APPROVAL_TITLE[2], '')
           			,APPROVAL_TITLE4 : exCommon.getRepVal(APPROVAL_TITLE[3], '')
           			,APPROVAL_TITLE5 : exCommon.getRepVal(APPROVAL_TITLE[4], '')
           			,REPORT_NO       : exCommon.getRepVal(me.lookupReference('txt_report_no').getExValue(), '')
           			,DEPT_NAME       : exCommon.getRepVal(me.lookupReference('txt_dept_name').getExValue(), '')
           			,USER_NAME       : exCommon.getRepVal(me.lookupReference('txt_user_name').getExValue(), '')
           			,NOW_DATE        : me.getViewModel().getStore('ds_main').getAt(0).get("NOW_DATE")
           			,TEMPLE_NM       : me.getViewModel().getStore('ds_main').getAt(0).get("TEMPLE_NM")
       			}
    		}
    		pageFlag ++;
    		
    		
    		if(A_ACCT_GBN == ACCT_GBN  && A_IE_GBN == IE_GBN){
    			listData.push(subData);
    		}
    		
    		
    		
    		if(A_ACCT_GBN != ACCT_GBN  || A_IE_GBN != IE_GBN){
    			pageFlag = 0;
    			
    			baseData.listData = listData;
    			jsonPrintData.push(baseData);
    			
    			
    			baseData ={
    				 TITLE           : subData.TITLE
    				,APPROVAL_TITLE1 : exCommon.getRepVal(APPROVAL_TITLE[0], '')
        			,APPROVAL_TITLE2 : exCommon.getRepVal(APPROVAL_TITLE[1], '')
        			,APPROVAL_TITLE3 : exCommon.getRepVal(APPROVAL_TITLE[2], '')
        			,APPROVAL_TITLE4 : exCommon.getRepVal(APPROVAL_TITLE[3], '')
        			,APPROVAL_TITLE5 : exCommon.getRepVal(APPROVAL_TITLE[4], '')
        			,REPORT_NO       : exCommon.getRepVal(me.lookupReference('txt_report_no').getExValue(), '')
        			,DEPT_NAME       : exCommon.getRepVal(me.lookupReference('txt_dept_name').getExValue(), '')
        			,USER_NAME       : exCommon.getRepVal(me.lookupReference('txt_user_name').getExValue(), '')
        			,NOW_DATE        : me.getViewModel().getStore('ds_main').getAt(0).get("NOW_DATE")
        			,TEMPLE_NM       : me.getViewModel().getStore('ds_main').getAt(0).get("TEMPLE_NM")
    			}
    			
    			baseData.
    			listData;
    			listData = [];
    			listData.push(subData);
    			
    			A_ACCT_GBN = ACCT_GBN;
    			A_IE_GBN   = IE_GBN;
    		}
    		
    		if(i  == (g_row -1)){
    			baseData.listData = listData;
    			jsonPrintData.push(baseData);
    			listData = [];
    		}
    		
    		
    	}// for
    	
    	jsonAllData = {       		
       		"info" : jsonPrintData
       	};
    	
    	console.log( Ext.encode(jsonAllData) );
    	
    	return jsonAllData;
    }
})