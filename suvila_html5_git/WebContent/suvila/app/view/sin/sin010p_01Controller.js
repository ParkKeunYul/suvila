Ext.define('ExFrm.view.sin.sin010p_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin010p_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },
    onCalled:function(params){
        var me = this;
        
        me.lookupReference('sel_BudSearchGbn').setExValue(exCommon.user.searchGbn);
    }, 
    onInit:function(me){
    	var me = this;
    	
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSearch();
    	}
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSearch : function(){
    	var me = this;
    	
    	var sel_BudSearchGbn = me.lookupReference('sel_BudSearchGbn').getValue();
    	var txt_stipulation  = me.lookupReference('txt_stipulation').getValue();
    	
    	if(txt_stipulation == ""){
        	
    		setTimeout(function(){
				Ext.Msg.alert('알림',  me.lookupReference('sel_BudSearchGbn').getRawValue() +"를 입력 후 조회 버튼을 눌러주세요.");    				
			},50);
    		me.lookupReference('txt_stipulation').focus();
    		return false;
    	}
    	
    	if(sel_BudSearchGbn == "BUD_NO"){
    		if(txt_stipulation.length < 5){
				for(var a=txt_stipulation.length; a<5; a++){
					txt_stipulation = "0" + txt_stipulation;
				}
			}
    	}
    	
    	if(sel_BudSearchGbn == "TELNO" || sel_BudSearchGbn == "MOBILE_TELNO"){
    		txt_stipulation = txt_stipulation.replace(/-/g, '');
    	}
    	
    	me.lookupReference('txt_stipulation').setValue(txt_stipulation);
    	
    	var params = {
  			  V_SEARCH_GBN  :sel_BudSearchGbn
  			 ,V_SEARCH_WORD :encodeURI(txt_stipulation)
  			 ,V_TEMPLE_CD   :exCommon.user.templeCd
         };
	   	if(exCommon.checkValidation( me.lookupReference('txt_stipulation') ,'검색어',true)){    	
	       	me.callStore(me, 'ds_main', '', params, me.onSearchCallback)
	   	}
    },
    onSearchCallback:function(me, success, records, operation){
    	if(success != true){
    		me.getViewModel().getStore('ds_main').removeAll();
    	}
    },
    onReturn : function(){
    	var me = this;
    	
    	var cnt = me.getViewModel().getStore('ds_main').getCount();

    	if(cnt == 0){
    		me.getView().destroy();
    		return;
    	}
    	
    	var data   = new Array();
    	var datCnt = 0;
    	for(var i = 0; i< cnt ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		if( record.data.CHECK_P ){
    			data[datCnt] = record.data;
    			datCnt ++;
    		}
    	}
    	if(datCnt == 0){
    		me.getView().destroy();
    		return;
    	}
    	this.receiveTo(data, true);
    },
    onClose : function(){
    	this.getView().destroy();
    },
    
     
})