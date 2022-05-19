Ext.define('ExFrm.view.acc.acc011w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc011w_01',    
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
    
    	
    	me.loadState.push(1);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_yyyy').setExValue(today);
    	
    	
    	var params = {
    		 V_ACCT_GBN : '1'
    		,V_IE_GBN   : 'I'
    		,V_HANG     : "0"
    		,V_MOK      : "0"
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan', '', params, me.kwanInitCallback);
    	},50);
    	
    	
    },
    kwanInitCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', {group_cd : "IEGBN", v_group_cd : "IEGBN"}, me.dsIeGbnCallback);
    	},50);
    	
    	if(success){
    		var data = {
	    		 "KWAN_NAME" : "전체"
	    	    ,"KWAN"      : "0"
	    	};
    		me.getViewModel().getStore('ds_kwan').insert(0, data);
    		me.lookupReference('lc_kwan').setValue("0");
    		
    		var dataHang = {
   	    		 "HANG_NAME" : "전체"
   	    	    ,"HANG"      : "0"
   	    	};
    		
    		me.getViewModel().getStore('ds_hang').removeAll();
    		me.getViewModel().getStore('ds_hang').insert(0, dataHang);
    		me.lookupReference('lc_hang').setValue("0");
    		
    	}
    	me.loadStatePoP(me);
    },
    dsIeGbnCallback : function(me, success, form, action){
    	console.log('dsIeGbnCallback');
    	setTimeout(function(){
    		me.callStore(me, 'ds_approval', '', null, null);
    	},50);
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var V_YEAR  =  me.lookupReference('em_yyyy').getExValue();
    	
    	if(V_YEAR.length > 4) V_YEAR = V_YEAR.substr(0,4);
    	
    	if( V_YEAR.length != 4  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_yyyy').focus();
    		return;
    	}
    	
    	
    	var params = {
    		 V_YEAR     : V_YEAR   	
    		,V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN    : me.lookupReference('lc_iegbn').getExValue()
    		,V_KWAN      : me.lookupReference('lc_kwan').getExValue()
    		,V_HANG      : me.lookupReference('lc_hang').getExValue()
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		
    	if(success){
    		
    	}
    },
    onIegbnChange : function(){
    	var me = this;
    	
    	console.log('onIegbnChange = ', me.loadState.length);
    	
    	if(me.loadState.length == 0){
    		var params = {
	       		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
	       		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
	       		,V_HANG     : "0"
	       		,V_MOK      : "0"
	       	};
    		
	       	
	       	setTimeout(function(){
	       		me.callStore(me, 'ds_kwan', '', params, me.kwanInitCallback);
	       	},50);
    	}
    },
    onKwanChange : function(){
    	var me = this;
    	
    	if(me.loadState.length == 0){
    		var params = {
   	       		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
   	       		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
   	       		,V_KWAN     : me.lookupReference('lc_kwan').getExValue()
   	       	};
    		setTimeout(function(){
	       		me.callStore(me, 'ds_hang', '', params, me.onKwanChangeCallback);
	       	},50);
    	}
    },
    onKwanChangeCallback : function(me, success, form, action){
    	if(success){
    		
    		var dataHang = {
  	    		 "HANG_NAME" : "전체"
  	    	    ,"HANG"      : "0"
  	    	};
    		me.getViewModel().getStore('ds_hang').insert(0, dataHang);
    		me.lookupReference('lc_hang').setValue("0");
    		
    	}
    },
    onHangChange : function(){
    	var me = this;    	

    	console.log('onHangChange = ', me.loadState.length);
    	
    	if(me.loadState.length == 0){
    		
    	}
    },
    onHangChangeCallback : function(me, success, form, action){
    	if(success){
    		
    	}
    },
    onSave : function(){
    	var me = this;
    	
    	me.lookupReference('newData').setExValue("");
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	var jsonNewData = [];
    	
    	for(var i =0; i < rowCnt ; i++){
    		jsonNewData.push(me.lookupReference('acc011w_01_a').getStore().getAt(i).data);
    	}// for
    	
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			
    			me.lookupReference('newData').setExValue( Ext.encode(jsonNewData) );
    			
    			console.log('jsonNewData = ', me.lookupReference('newData').getExValue());
    			
    			
    			setTimeout(function(){
    				me.callForm(me, '/acc/acc011w_01/save.suvila', me.onSaveCallback , false);
    			},10);	
    		}
    	});
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    },
    onEdit : function( ){
    	var me = this;
    	
    	/*var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	var tot_amount = 0;
    	for(var i =0; i < rowCnt ; i++){

    		var AMOUNT = me.lookupReference('acc011w_01_a').getStore().getAt(i).get("AMOUNT1");
    		if(AMOUNT == undefined || AMOUNT == "" || AMOUNT == null){
    			AMOUNT = 0;
    		}
    		
    		tot_amount  = tot_amount + new Number(AMOUNT);
    	} // for 
    	
    	console.log('tot_amount = ', tot_amount);*/
    	
    	me.getViewModel().getStore('ds_main').commitChanges();
    	
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
           			,TEMPLE_NM       : g_record.get("TEMPLE_NM")
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
          			,TEMPLE_NM       : g_record.get("TEMPLE_NM")
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
    			if(pageNumber > 21){
    				
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
             			,TEMPLE_NM       : g_record.get("TEMPLE_NM")
         			}
        			pageNumber = 0;
    			}
    		}
    		
    	}//for i
    	
    	jsonAllData = {       		
       		"info" : jsonPrintData
       	};
    	/*
    	console.log(jsonAllData);
    	console.log( Ext.encode(jsonAllData) );
    	*/
    	var params = {
			 FILE_PATH  : '/acc011w_01_rp_print.ozr' 
			,PRINT_DATA : jsonAllData
    	};
  		
  		setTimeout(function(){
  			me.openPopup('ExFrm.view.com.print',  params, null);
  		},100);
    },
    onExcel : function(){
    	var me = this;
    	
    	
    	var baseData = {
    		 TITLE    : '재무회계 '+me.lookupReference('em_yyyy').getRawValue()+'년도 예산서'        		
    	}
    	
    	var jsonPrintData = [];
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		jsonPrintData.push(g_record.data);
    	}// for
    	
    	
    	jsonAllData = {
       		 "base" : baseData
       		,"list" : jsonPrintData
       	};
       	
       	var params = {
   			 FILE_PATH  : '/acc011w_01_excel.ozr' 
   			,PRINT_DATA : jsonAllData
       	};
     		
 		setTimeout(function(){
 			me.openPopup('ExFrm.view.com.print',  params, null);
    	},100);
    	
    },
    
})