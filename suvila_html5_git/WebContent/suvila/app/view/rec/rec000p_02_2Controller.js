Ext.define('ExFrm.view.rec.rec000p_02_2Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_02_2',
    onCalled:function(data){
        var me = this;
        console.log('onCalled', data);
      
        var params = {
    		 V_TEMPLE_CD  : data.TEMPLE_CD
    		,V_ACCEPT_SEQ : data.ACCEPT_SEQ
    		,V_SEQ        : data.SEQ
    		,V_ACCEPT_GBN : data.ACCEPT_GBN
    		,V_JUNGAK_CD  : data.JUNGAK_CD
    		,V_LIGHT_NO   : data.LIGHT_NO
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
    	
    	var record = me.getViewModel().getStore('ds_list').getAt(0).data;
    	
    	var INDEUNG_GBN    = exCommon.getRepVal(record.INDEUNG_GBN , '');
    	var FAMILY_GBN_NO  = exCommon.getRepVal(record.LIGHT_NM2 , '')+'-' + exCommon.getRepVal(record.LIGHT_NO , '');
    	var varchar2       = exCommon.getRepVal(me.lookupReference('txt_wish').getExValue(), '');
    	var SEXAGENARY_NM  = exCommon.getRepVal(record.DONG_GJNM , '');
    	var NAME_KOR       = exCommon.getRepVal(record.NAME_KOR , '');
    	
    	console.log('record = ', record);
    	console.log('INDEUNG_GBN = ', INDEUNG_GBN);
    	
    	if(INDEUNG_GBN == 'T'){
    		SEXAGENARY_NM  = exCommon.getRepVal(record.PROPOSAL_DAEJU_GJNM , '');
        	NAME_KOR       = exCommon.getRepVal(record.PROPOSAL_DAEJU_KOR , '');
    	}
    	
    	var data = {
    		 FAMILY_GBN_NO : FAMILY_GBN_NO
    		,varchar2      : varchar2
    		,SEXAGENARY_NM : SEXAGENARY_NM
    		,NAME_KOR      : NAME_KOR
    	};
    	
    	var jsonAllData = {
    		"info" : data
    	};
    	
    	var	params = {
       		 FILE_PATH  : '/rec001w_06_rp_IDRec.ozr' 
       		,PRINT_DATA : jsonAllData
       	};
    	
    	
   		
   		setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    
})