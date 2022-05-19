Ext.define('ExFrm.view.com.sindoController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sindo',
    onCalled:function(params){
        var me = this;
       // console.log('onCalled', params);
        
        var OPEN_SEARCH_WORD = params.V_SEARCH_WORD;
        var OPEN_SEARCH_GBN  = params.V_SEARCH_GBN;
        
        
        if(OPEN_SEARCH_GBN != null && OPEN_SEARCH_GBN != ""){
        	me.lookupReference('sel_BudSearchGbn').setExValue(OPEN_SEARCH_GBN);
        }else{
        	me.lookupReference('sel_BudSearchGbn').setExValue(exCommon.user.searchGbn);
        }
        
        
        
        me.lookupReference('txt_name').setExValue(OPEN_SEARCH_WORD);
        me.lookupReference('V_gbn').setExValue(params.V_gbn);
        
        
		me.lookupReference('sindo_b').setHidden(true);
        
        if(OPEN_SEARCH_WORD != null && OPEN_SEARCH_WORD != ""){
        	me.onSearch();
        }// 
        
        if(OPEN_SEARCH_GBN == "DUPI"){
        }
        
        
        var V_gbn  = params.V_gbn;
        
        
        if( V_gbn == 'HWAJU'){
        	me.loadStorDate.push( V_gbn );
        	this.getView().setTitle('화주검색');
        	console.log( me.loadStorDate[0] );
        }
        
        if( V_gbn == 'DONGCHAM_DECE' ||  V_gbn == 'DONGCHAM'){
        	console.log('sindoController params = ', params);
        	me.lookupReference('txt_name').setReadOnly(true);
        	me.lookupReference('sel_BudSearchGbn').setReadOnly(true);
        }
        
    },
    onDestroy:function(){
    	me.loadStorDatekPoP(me);
    },
    loadStorDate:[],
    loadStorDatekPoP : function(me){
    	var cnt = me.loadStorDate.length;
    	for(var i = 0; i<cnt ; i++){
    		me.loadStorDate.pop();
    	}
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
    	this.receiveTo(record.data , true);
    },
    onSearch:function(){
    	var me = this;
    	
    	var sel_BudSearchGbn = me.lookupReference('sel_BudSearchGbn').getValue();
    	var txt_name         = me.lookupReference('txt_name').getValue();
    	

    	
    	
    	if( me.loadStorDate.length != 0 ){
    		
    		var params = {};
    		
    		if(sel_BudSearchGbn == "BUD_NO" && txt_name.length <5 && txt_name.length > 0 ){
    			for(var a=txt_name.length; a<5; a++){
    				txt_name = "0" + txt_name;
				}//for
    			me.lookupReference('txt_name').setExValue(txt_name);
    		}
    		
    		    
    		me.getViewModel().getStore('ds_main').proxy.extraParams={
       			 V_SEARCH_GBN  : sel_BudSearchGbn
   				,V_SEARCH_WORD : encodeURI(txt_name)
       		};
    		    
    		me.getViewModel().getStore('ds_main').load({
    			url   : '/asp/BudSearch/hwaju.suvila',
    		});
    		
    		return;
    	}
    	
    	
    	var msg = " 입력 후 조회 버튼을 눌러주세요.";
    	if(txt_name == null || txt_name == ""){
    		
    		if(sel_BudSearchGbn == "BUD_NO" ){
    			msg = "신도번호를"+msg;
    		}
    		else if(sel_BudSearchGbn == "NAME_KOR" ){
    			msg = "신도명을"+msg;
    		}
    		else if(sel_BudSearchGbn == "SACRED_KOR" ){
    			msg = "법명을"+msg;
    		}
    		else if(sel_BudSearchGbn == "CARD_NO" ){
    			msg = "카드번호를"+msg;
    		}
    		else if(sel_BudSearchGbn == "YOUNGGA" ){
    			msg = "영가명을"+msg;
    		}
    		else {
    			msg = "전화번호를"+msg;
    		}
    		
    		setTimeout(function(){
        		Ext.Msg.alert('확인',  msg);
    		},50);
    		me.lookupReference('txt_name').focus();
    		return false;
    	}
    	
    	
    	if(sel_BudSearchGbn == "BUD_NO"){
    		if(txt_name.length < 5){
				for(var a=txt_name.length; a<5; a++){
					txt_name = "0" + txt_name;
				}
				
			}
    	}
    	else if(sel_BudSearchGbn == "TELNO" || sel_BudSearchGbn == "MOBILE_TELNO"){
    		txt_name = txt_name.replace(/-/g, '');
    	}
    	
    	me.lookupReference('txt_name').setValue(txt_name);
    	
    	 var params = {
   			  V_SEARCH_GBN  :sel_BudSearchGbn
   			 ,V_SEARCH_WORD :encodeURI(txt_name)
   			 ,V_TEMPLE_CD   :exCommon.user.templeCd
         };
    	 
    	 console.log('YOUNGGA = ', me.lookupReference('V_gbn').getExValue());
    	 
    	 if( me.lookupReference('V_gbn').getExValue() == 'DONGCHAM_DECE' ){
    		 me.getViewModel().getStore('ds_main').proxy.extraParams={
       			 V_SEARCH_GBN  : sel_BudSearchGbn
   				,V_SEARCH_WORD : encodeURI(txt_name)
       		};
    		 me.getViewModel().getStore('ds_main').load({
     			url   : '/asp/BudSearch/death.suvila',
     		});
    		return;
    	 }
    	 
    	
    	if(exCommon.checkValidation( me.lookupReference('txt_name') ,'검색어',true)){    	
        	me.callStore(me, 'ds_main', '', params, me.onSearchCallback)
    	}
    	
    },   
    onSearchCallback:function(me, success, records, operation){
    	if(success != true){
    		me.getViewModel().getStore('ds_main').removeAll();
    		return;
    	}
    	
    	var sel_BudSearchGbn = me.lookupReference('sel_BudSearchGbn').getValue();
    	if(sel_BudSearchGbn == "YOUNGGA"){
    		me.lookupReference('sindo_a').setHidden(true);
    		me.lookupReference('sindo_b').setHidden(false);
		}else{
			me.lookupReference('sindo_a').setHidden(false);
			me.lookupReference('sindo_b').setHidden(true);
			
		}
    },
    onChange :function(){
    	var me  = this;
    	me.lookupReference('txt_name').focus();
    },
    onFocusCallback:function(){
    	console.log('onFocusCallback');
    },
    onSearchEnter : function(e,t){
    	var me = this;
    	if(t.keyCode == 13){
    		me.onSearch();
    	}
    },
    onClose : function(){
    	var me = this;
    	this.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	this.getView().destroy();
    }
})