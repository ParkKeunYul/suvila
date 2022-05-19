Ext.define('ExFrm.view.rec.rec018p_01_mouseController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec018p_01_mouse',
    onCalled:function(params){
        var me = this;
        
        console.log('rec018p_01_mouse = ', params);
        
        me.lookupReference('txt_bud_no').setExValue(params.BUD_NO);
        me.lookupReference('txt_gibu_no').setExValue(params.GIBU_NO);
        me.lookupReference('txt_gibu_day').setExValue(params.GIBU_DAY);
        me.lookupReference('txt_addr1').setExValue(params.ADDR1);
        me.lookupReference('txt_addr2').setExValue(params.ADDR2);
        me.lookupReference('txt_addr3').setExValue(params.ADDR3);
        me.lookupReference('txt_bldg_num').setExValue(params.BLDG_NUM);
        me.lookupReference('txt_zip_cd').setExValue(params.ZIP_CD);
        
    },
    onInit:function(){},
    onAfterRender:function(){},
    onSelect : function(){
    	var me = this;
    	
    },
    onAddrChange : function(){
    	var me = this;
    	
    	var param = {
    		 BUD_NO   : me.lookupReference('txt_bud_no').getExValue()
    		,GIBU_NO  : me.lookupReference('txt_gibu_no').getExValue()
    		,GIBU_DAY : me.lookupReference('txt_gibu_day').getExValue()
    		,ADDR1    : me.lookupReference('txt_addr1').getExValue()
    		,ADDR2    : me.lookupReference('txt_addr2').getExValue()
    		,ADDR3    : me.lookupReference('txt_addr3').getExValue()
    		,BLDG_NUM : me.lookupReference('txt_bldg_num').getExValue()
    		,ZIP_CD   : me.lookupReference('txt_zip_cd').getExValue()
    	};
    	
    	console.log('onAddrChange= ', param);
    	
    	me.openPopup('ExFrm.view.rec.rec018p_01',  param , me.onReceivePopupMouse);
    },
    onReceivePopupMouse:function(V_SUC, me){
    	/*console.log('onReceivePopupMouse = ', params);
    	var params = {
    			RESERVATION_YN : "T"
		}*/
    	console.log('V_SUC = ', V_SUC);
		me.receiveTo(V_SUC , true);
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onCancel : function (){
    	var me =  this;
    	
    	var msg = "기부금영수증 발급내역을 삭제하시겠습니까?<br/>발급된 기부금 영수증은 반드시 회수해야합니다.";
    	
    	Ext.MessageBox.confirm('알림', msg, function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/rec/REC018W_01/saveCancel.suvila', me.onCancelCallback , false);
    			},10);	
    		}
    	});
    },
    onCancelCallback: function(me, success, form, action){
    	
    	var V_SUC = false;
    	if(success){
    		console.log('onSaveAddrCallback = ', success);
    		V_SUC = true;
    	}
    	me.receiveTo(V_SUC , true);
    },
    
})