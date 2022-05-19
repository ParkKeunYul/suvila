Ext.define('ExFrm.view.acc.acc022w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc022w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){},
    loadState:[],
    loadStatePoP : function(me){
    	var row = me.loadState.length;
    	for(var i = 0; i<row; i++){
    		me.loadState.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_Month').setExValue(today);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acctGbn', '', null, me.dsAcctCallback);
    	},50);
    	
    	
    },
    dsAcctCallback : function(me, success, form, action){
    	
    	var data = {
    		 "NAME"      : "전체"
    	    ,"CODE"      : "0"
    	};
   		me.getViewModel().getStore('ds_acctGbn').insert(0, data);
   		me.lookupReference('lc_acctGbn').setValue("0");
   		
   		setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', {group_cd : "IEGBN", v_group_cd : "IEGBN"}, me.dsIeGbnCallback);
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
    onSelect : function(){
    	var me = this;
    	
    	var MONTH 		 =  me.lookupReference('em_Month').getExValue();
    	
    	if(MONTH.length > 6) MONTH = MONTH.substr(0,6);
    	
    	if( MONTH.length  != 6  ){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_Month').focus();
    		return;
    	}
    	
    	var params = {
    		 V_MONTH      : MONTH   	
    		,V_ACCT_GBN   : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN     : me.lookupReference('lc_iegbn').getExValue()
       	};
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		if( success ){
			
		}
    },
    onPrint : function(){
    	var me = this;
    	
    	
    	if( me.getViewModel().getStore('ds_main').getCount() <= 0 ){
    		exCommon.msgAlert( '검색 후 작업하십시요.' );
    		return;
    	}
    	
    	var APPROVAL_TITLE = new Array("","","","","") ;
    	for(i=0; i<me.getViewModel().getStore('ds_approval').getCount(); i++){
			if(i>5){break;}
			APPROVAL_TITLE[i] = me.getViewModel().getStore('ds_approval').getAt(i).get("APPROVAL_TITLE");
		}
    	
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	var baseData      = {};
    	var listData      = [];
    	
    	var A_ACCT_GBN;
    	var A_IE_GBN;
    	
    	
    	var pageNumber = 0;
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var ACCT_GBN = exCommon.getRepVal(g_record.get("ACCT_GBN"));
    		var IE_GBN   = exCommon.getRepVal(g_record.get("IE_GBN"))
    		var subData  = g_record.data;
		    subData.RATE_NOW = ''+g_record.data.RATE_NOW+'';
		    subData.RATE_SUM = ''+g_record.data.RATE_SUM+'';
    		
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
           			,TEMPLE_NM       : me.getViewModel().getStore('ds_main').getAt(0).get("TEMPLE_NM")
       			}
    		}
    		
    		if(A_ACCT_GBN == ACCT_GBN  && A_IE_GBN == IE_GBN){
    			listData.push(subData);
    			pageNumber++;
    		}
    		
    		if(A_ACCT_GBN != ACCT_GBN  || A_IE_GBN != IE_GBN){
    			
    			baseData.listData = listData;
    			jsonPrintData.push(baseData);
    			
    			baseData ={
      				 TITLE           : subData.TITLE
      				,APPROVAL_TITLE1 : exCommon.getRepVal(APPROVAL_TITLE[0], '')
          			,APPROVAL_TITLE2 : exCommon.getRepVal(APPROVAL_TITLE[1], '')
          			,APPROVAL_TITLE3 : exCommon.getRepVal(APPROVAL_TITLE[2], '')
          			,APPROVAL_TITLE4 : exCommon.getRepVal(APPROVAL_TITLE[3], '')
          			,APPROVAL_TITLE5 : exCommon.getRepVal(APPROVAL_TITLE[4], '')
          			,TEMPLE_NM       : me.getViewModel().getStore('ds_main').getAt(0).get("TEMPLE_NM")
      			}
    			
    			baseData.
    			listData;
    			listData = [];
    			listData.push(subData);
    			
    			A_ACCT_GBN = ACCT_GBN;
    			A_IE_GBN   = IE_GBN;
    			
    			pageNumber = 1;
    			
    		}
    		
    		if(i  == (g_row -1)){
    			baseData.listData = listData;
    			jsonPrintData.push(baseData);
    			listData = [];
    		}else{
    			if(pageNumber > 11){
    				
    				baseData.listData = listData;
    				jsonPrintData.push(baseData);
    				baseData.
        			listData;
        			listData = [];  
        			baseData ={
         				 TITLE           : subData.TITLE
         				,APPROVAL_TITLE1 : exCommon.getRepVal(APPROVAL_TITLE[0], '')
             			,APPROVAL_TITLE2 : exCommon.getRepVal(APPROVAL_TITLE[1], '')
             			,APPROVAL_TITLE3 : exCommon.getRepVal(APPROVAL_TITLE[2], '')
             			,APPROVAL_TITLE4 : exCommon.getRepVal(APPROVAL_TITLE[3], '')
             			,APPROVAL_TITLE5 : exCommon.getRepVal(APPROVAL_TITLE[4], '')
             			,TEMPLE_NM       : me.getViewModel().getStore('ds_main').getAt(0).get("TEMPLE_NM")
         			}
        			pageNumber = 0;
    			}
    		}
    		
    	}//for i
    	
    	
    	jsonAllData = {       		
       		"info" : jsonPrintData
       	};
    	
    	
    	var params = {
 			 FILE_PATH  : '/acc022w_01_rp_print.ozr' 
 			,PRINT_DATA : jsonAllData
     	};
   		
   		setTimeout(function(){
   			me.openPopup('ExFrm.view.com.print',  params, null);
   		},100);
    	
    },
})