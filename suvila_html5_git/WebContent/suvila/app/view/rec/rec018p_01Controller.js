Ext.define('ExFrm.view.rec.rec018p_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec018p_01',
    onCalled:function(params){
        var me = this;
        
        console.log('rec018p_01 = ', params);
      
        me.lookupReference('em_zip_cd').setExValue(params.ZIP_CD);
    	me.lookupReference('txt_addr1').setExValue(params.ADDR1);
    	me.lookupReference('txt_addr2').setExValue(params.ADDR2);
    	me.lookupReference('txt_addr3').setExValue(params.ADDR3);
    	me.lookupReference('txt_bldg_num').setExValue(params.BLDG_NUM);
    	
    	me.lookupReference('txt_gibu_no').setExValue(params.GIBU_NO);
    	me.lookupReference('txt_gibu_day').setExValue(params.GIBU_DAY);
    	me.lookupReference('txt_bud_no').setExValue(params.BUD_NO);
    	
    	
    },
    onInit:function(){},
    onAfterRender:function(){},
    onSelect : function(){
    	var me = this;
    	
    },
    onAddrChange : function(){
    	var me = this;
    	
    	me.openPopup('ExFrm.view.rec.rec018p_01',  params , me.onReceivePopupMouse);
    },
    onReceivePopupMouse:function(params, me){
    	/*console.log('onReceivePopupMouse = ', params);
    	var params = {
    			RESERVATION_YN : "T"
		}*/
		me.receiveTo(params , true);
    },
    onFindAddr : function(){
    	var me = this;
    	find_addr(
    		  me 
    		,'em_zip_cd'
    		,'txt_addr1'
    		,'txt_addr3'
    		,'txt_bldg_num' 
    		,'txt_addr2'
    		,'layerRec018p_01'
    	);
    },
    onFindAddrReceive : function(params, me){
    	me.lookupReference('em_zip_cd').setExValue(params.ZIPCODE);
    	me.lookupReference('txt_addr1').setExValue(params.ADDR1);
    	me.lookupReference('txt_addr3').setExValue(params.ADDR3);
    	me.lookupReference('txt_bldg_num').setExValue(params.BLDG_NUM);
    	me.lookupReference('txt_addr2').focus();
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onSaveAddr : function(){
    	var me = this;
    	Ext.MessageBox.confirm('알림', '저장하시겠습니까?', function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/rec/REC018W_01/saveAddr.suvila', me.onSaveAddrCallback , false);
    			},10);	
    		}
    	});
    },
    onSaveAddrCallback: function(me, success, form, action){
    	if(success){
    		console.log('onSaveAddrCallback = ', success);
    		V_SUC = true;
    	}
    	me.receiveTo(V_SUC , true);
    },
})