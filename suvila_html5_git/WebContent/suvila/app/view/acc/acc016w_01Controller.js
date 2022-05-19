Ext.define('ExFrm.view.acc.acc016w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc016w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){
    	
    },
    onAfterRender:function(){
    	var me  = this;
    
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_sDate').setExValue(today);
    	me.lookupReference('em_eDate').setExValue(today);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan', '', null ,me.dsKwanCallback);
    	},50);
    },
    dsKwanCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_approval', '', null , null);
    	},50);
    },
    onSelect : function(){
    	var me = this;
    	
    	var V_SACT_DATE  =  me.lookupReference('em_sDate').getExValue();
    	var V_EACT_DATE  =  me.lookupReference('em_eDate').getExValue();
    	
    	if( V_SACT_DATE.length != 8  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_sDate').focus();
    		return;
    	}
    	if( V_EACT_DATE.length != 8  ){
    		
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색일자를 정확하게 선택하세요.');    				
			},50);
    		me.lookupReference('em_eDate').focus();
    		return;
    	}
    	
    	var params = {
    		 V_SACT_DATE : V_SACT_DATE   	
    		,V_EACT_DATE : V_EACT_DATE
    		,V_ACCT_GBN  : 99
    		,V_IE_GBN    : "0"
    		,V_KWAN      : me.lookupReference('lc_kwan').getExValue()
    		,V_REMARK    : encodeURI(me.lookupReference('txt_remark').getExValue())
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('acc016w_01_a').getSelectionModel().selectAll();
    		
    	}
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onPrint : function(){
    	var me = this;
    	
    	var APPROVAL_TITLE = new Array("","","","","") ;
    	for(i=0; i<me.getViewModel().getStore('ds_approval').getCount(); i++){
			if(i>5){break;}
			APPROVAL_TITLE[i] = me.getViewModel().getStore('ds_approval').getAt(i).get("APPROVAL_TITLE");
		}
    	
    	var checkRecord = me.getViewModel().getStore('ds_main').findRecord('CHECK_P', 'T', 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		console.log('CHECK_P= ', CHECK_P);
    		if(CHECK_P == 'T' || CHECK_P){
    			
    			var IE_GBN  = g_record.get("IE_GBN");
    			var IE_GBN1 = '지 출';
    			var IE_GBN2 = '세 출';
    			var IE_GBN3 = '청 구';
    			var IE_GBN4 = '영 수';
    			
    			if(IE_GBN == "I"){
    				IE_GBN1 = '수 입';
        			IE_GBN2 = '세 입';
        			IE_GBN3 = '납 부';
        			IE_GBN4 = '수 입';
    			}
    			
    			var amountkor = g_record.get("AMOUNT").toString();
    			if(amountkor.indexOf("-")!=-1){
					amountkor = "-" + gf_number2Hangeul(amountkor.replace('-',''));
				}else{
					amountkor = gf_number2Hangeul(amountkor);
				}
    			
    			var data = {
    				 IE_GBN1          : IE_GBN1
    				,IE_GBN2          : IE_GBN2
    				,IE_GBN3          : IE_GBN3
    				,IE_GBN4          : IE_GBN4
    				,APPROVAL_TITLE1  : exCommon.getRepVal(APPROVAL_TITLE[0], '')
    				,APPROVAL_TITLE2  : exCommon.getRepVal(APPROVAL_TITLE[1], '')
    				,APPROVAL_TITLE3  : exCommon.getRepVal(APPROVAL_TITLE[2], '')
    				,APPROVAL_TITLE4  : exCommon.getRepVal(APPROVAL_TITLE[3], '')
    				,APPROVAL_TITLE5  : exCommon.getRepVal(APPROVAL_TITLE[5], '')
    				,KWAN_NAME        : exCommon.getRepVal(g_record.get("KWAN_NAME"), '')
    				,HANG_NAME        : exCommon.getRepVal(g_record.get("HANG_NAME"), '')
    				,MOK_NAME         : exCommon.getRepVal(g_record.get("MOK_NAME"), '')
    				,YYYY             : exCommon.getRepVal(g_record.get("ACT_DATE").substring(0,4), '')
    				,MM               : exCommon.getRepVal(g_record.get("ACT_DATE").substring(4,6), '')
    				,DD               : exCommon.getRepVal(g_record.get("ACT_DATE").substring(6), '')
    				,AMOUNT           : g_record.get("AMOUNT")
    				,AMOUNT_KOR       : amountkor
    				,REMARK           : exCommon.getRepVal(g_record.get("REMARK"), '')
    				,USER_NAME        : g_record.get("USER_NM")
    				,PAGE_SKIP        : exCommon.getRepVal(g_record.get("PAGE_SKIP"), '')
    			}
    			jsonPrintData.push(data);
    		}
    	}// for g_row
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	var params = {
 			 FILE_PATH  : '/acc006w_01_rp_print.ozr' 
 			,PRINT_DATA : jsonAllData
     	};
   		
   		setTimeout(function(){
   			me.openPopup('ExFrm.view.com.print',  params, null);
      	},100);
    	
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc016w_01_a');
    	    	
    	exCommon.excelDown(grid, 'cash', '현금출납장',  me.getViewModel().getStore('ds_main').getCount());
    },
    onCheckFalse : function(model, record, index){
    	record.set("CHECK_P", "F");
    },
    onCheckTrue : function(model, record, index){
    	record.set("CHECK_P", "T");
    },
})