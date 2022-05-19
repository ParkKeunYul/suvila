Ext.define('ExFrm.view.rec.rec000p_02_1Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_02_1',
    onCalled:function(data){
        var me = this;
        console.log('onCalled', data);
      
        var params = {
    		 V_TEMPLE_CD  : data.TEMPLE_CD
    		,V_ACCEPT_SEQ : data.ACCEPT_SEQ
    		,V_SEQ        : data.SEQ
    		,V_PRAY_GBN   : data.PRAY_GBN
    		,V_PRAY_CODE  : data.PROD_CODE
    		,V_FDATE      : data.FDATE
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_list', '', params ,me.dsListCallback);
    	},50);
    	
    	me.lookupReference('fdate').setExValue(data.FDATE);
    	me.lookupReference('rdate').setExValue(data.ACPT_FDATE);
    	
    	/*
    	me.getViewModel().getStore('ds_temp').removeAll();
    	me.getViewModel().getStore('ds_temp').add(data);
    	*/
    },
    dsListCallback : function(me, success, form, action){
    	
    },
    onInit:function(me){},
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onAfterRender:function(me){
    },
    onPrint : function(){
    	var me = this;
    	//sin001p_07_rp_main
    	
    	var FDATE = '';
    	console.log(me.lookupReference('printC').getExValue());
    	if(me.lookupReference('printC').getExValue() ){
    		var sdate = me.lookupReference('fdate').getExValue();
    		var edate = me.lookupReference('rdate').getExValue();
    		
    		FDATE  = sdate.substring(0,4)+"년"+sdate.substring(4,6)+"월"+sdate.substring(6,8)+"일" + " ~ ";
    		FDATE += edate.substring(0,4)+"년"+edate.substring(4,6)+"월"+edate.substring(6,8)+"일"
    		
    		//FDATE = me.lookupReference('fdate').getRawValue() + " ~ " + me.lookupReference('rdate').getRawValue();
    	}
    	console.log('FDATE = ', FDATE);
    	
    	var jsonPrayData   = [];
    	var jsonYoungcData = [];
    	var jsonBasicData  = {
    		 FDATE    : FDATE
    		,BUD_CODE : me.getViewModel().getStore('ds_list').getAt(0).get("PROP_BUD_CODE")
    		,TELNO    : me.getViewModel().getStore('ds_list').getAt(0).get("TELNO")
    		,ADDR     : me.getViewModel().getStore('ds_list').getAt(0).get("DAEJU_ADDR1")
    		,ZIP_CD   : me.getViewModel().getStore('ds_list').getAt(0).get("ZIP_CD").replace('-', '')
    		,WISH     : me.lookupReference('txt_wish').getExValue()
    	};
    	
    	var row = me.getViewModel().getStore('ds_list').getCount();
    	
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_list').getAt(i);
    		if(record.get("CHECK_P") || record.get("CHECK_P") == 'true'){
    			var data ={
    				 REPRESEN_REL    :  exCommon.getRepVal(record.get("REPRESEN_REL"), '')
    				,FMLY_SEXAGENARY :  exCommon.getRepVal(record.get("SEXAGENARY"), '')
    				,NAME_KOR        :  exCommon.getRepVal(record.get("NAME_KOR"), '')
    				,FMLY_BIRTHDAY   :  exCommon.getRepVal(record.get("BIRTHDAY"), '')
    				,BIRTHDAY        :  exCommon.getRepVal(record.get("AGE"), '')	   
    			}
    			jsonPrayData.push(data);
    		}
    	}//
    	
    	
    	
    	var jsonAllData = {
			"base"  : jsonBasicData    			 
			,"fInfo" : jsonPrayData
			,"YInfo" : jsonYoungcData
    	}
    	
    	console.log( Ext.encode(jsonAllData));
    	
    	var	params = {
       		 FILE_PATH  : '/sin001p_07_rp_main.ozr' 
       		,PRINT_DATA : jsonAllData
       	};
    		
    	
    	console.log(params );
    	
   		
   		setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    
})