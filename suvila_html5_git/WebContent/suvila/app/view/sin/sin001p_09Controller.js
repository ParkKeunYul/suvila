Ext.define('ExFrm.view.sin.sin001p_09Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_09',
    onCalled:function(params){
        var me = this;
        console.log('onCalled', params);
    },
    onCellDbClick : function(me , td , cellIndex , record , tr , rowIndex , e , eOpts ){
    	console.log('cellIndex',cellIndex);
    	
        var params = {
        	YEAR : record.get('YEAR')
           ,CODE : record.get('CODE')
        };
        console.log('params',params);
        this.receiveTo(params, true);
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSelect();
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var V_SEARCH_WORD = me.lookupReference('txt_search').getExValue();
    	var V_SEARCH_GBN  = me.lookupReference('sel_searchgbn').getExValue()
    	
    	if(V_SEARCH_WORD == null || V_SEARCH_WORD == "" || V_SEARCH_WORD == undefined){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '검색어를 입력하세요');    		
          	},10);
    		return;
    	}
    	
    	var searchLen = V_SEARCH_WORD.length
    	
    	if(V_SEARCH_GBN == "NAME"){
    		
    		if(searchLen != 2){
    			setTimeout(function(){
        			Ext.Msg.alert('알림', '간지명은 2자리 입니다.');    		
              	},10);
    			me.lookupReference('txt_search').focus();
    			return;
    		}
    		
    	}else if(V_SEARCH_GBN == "AGE"){
    		
    		if(isNaN(V_SEARCH_WORD)){
    			setTimeout(function(){
        			Ext.Msg.alert('알림', '나이는 숫자만 입력해야 합니다.');    		
              	},10);
    			me.lookupReference('txt_search').focus();
				return;
			}
    	}else if(V_SEARCH_GBN == "YEAR"){	
    		
    		if(searchLen != 4){
    			setTimeout(function(){
        			Ext.Msg.alert('알림', '출생년도는 숫자 4자리 입니다.');    		
              	},10);
    			me.lookupReference('txt_search').focus();
				return;
    		}
    		
    		if(isNaN(V_SEARCH_WORD)){
    			setTimeout(function(){
        			Ext.Msg.alert('알림', '출생년도는 숫자 4자리 입니다.');    		
              	},10);
    			me.lookupReference('txt_search').focus();
				return;
			}
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '올바르지 않은 검색조건입니다.');    		
          	},10);
			me.lookupReference('sel_searchgbn').focus();
			return;
    		
    	}// if
    	
    	
    	var params = {
    		 V_SEARCH_GBN  : V_SEARCH_GBN
    		,V_SEARCH_WORD : encodeURI(V_SEARCH_WORD)	
    	}
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,null);
    	},50);
    	
    },
    onSelectCallback : function(me, success, form, action){
    	if(success && me.getViewModel().getStore('ds_main').getCount() > 0){
    		me.lookupReference('sin001p_09_a').getView().select(0);
    	}
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	me.getView().destroy();
    }
    
})