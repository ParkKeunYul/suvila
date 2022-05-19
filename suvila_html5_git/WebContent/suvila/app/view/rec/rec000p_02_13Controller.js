Ext.define('ExFrm.view.rec.rec000p_02_13Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_02_13',
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
    	
    	
    	var jsonPrayData   = [];
    	var jsonYoungcData = [];
    	var jsonBasicData  = {
    		 FDATE    : ''
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