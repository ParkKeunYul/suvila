Ext.define('ExFrm.view.com.postController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.post',
    onCalled:function(params){
        var me = this;
        console.log('onCalled', params);
       // me.lookupReference('searchInput').setValue(params.custId);
       // me.callStore(me, 'popInfo', '', params);
    },
    onGridDbClick:function(grid, record, item, index, e){
        var params = {
        	ZIPCODE:record.get('ZIPCODE'),
        	ADDR1:record.get('ADDR1'),
        	ADDR2:record.get('ADDR2'),
        	ADDR3:record.get('ADDR3'),
        	BLDG_NUM:record.get('BLDG_NUM')
        };
        console.log('params',params);
        this.receiveTo(params, true);
    },
    onCellDbClick : function(me , td , cellIndex , record , tr , rowIndex , e , eOpts ){
    	console.log('cellIndex',cellIndex);
    	if(cellIndex ==1 || cellIndex == 2){
    		var addr1 = record.get('ADDR1');
    		if(cellIndex == 1) addr1 = record.get('ADDR2');
    		var params = {
	        	ZIPCODE:record.get('ZIPCODE'),
	        	ADDR1:addr1,
	        	ADDR3:record.get('ADDR3'),
	        	BLDG_NUM:record.get('BLDG_NUM')
	        };
	        this.receiveTo(params, true);
    	}else{
    		Ext.Msg.alert('확인', '지번,도로명주소만 선택가능합니다.');
    	}
    },
    refs:{
    	vPostNm : 'post extextfield[name=V_POSTNM]',
    },
    onFindAddr:function(){
    	var me = this;
    	
    	var searchArea = me.lookupReference('V_ADDR_GBN').getValue();
    	var searchText = me.lookupReference('V_POSTNM').getValue();
    	
    	 var params = {
     			V_ADDR_GBN:searchArea,
     			V_POSTNM:encodeURI(searchText)
         };
    	 
    	 console.log('onFindAddr',exCommon.checkValidation( me.lookupReference('V_POSTNM') ,'주소',true));
    	 
    	 
    	if(exCommon.checkValidation( me.lookupReference('V_POSTNM') ,'주소',true)){
    		console.log('searchArea', searchArea + " : "+ searchText);
        	me.callStore(me, 'addrInfo', '', params, me.onFindAddrCallback)
    	}
    	
    },   
    onFindAddrCallback:function(me, success, records, operation){
    	if(success != true){
    		me.getViewModel().getStore('addrInfo').removeAll();
    	}
    },
    onFocusCallback:function(){
    	console.log('onFocusCallback');
    },
    onKeyDown : function(e,t){
    	var me = this;
    	if(t.keyCode == 13){
    		me.onFindAddr();
    	}
    }
})