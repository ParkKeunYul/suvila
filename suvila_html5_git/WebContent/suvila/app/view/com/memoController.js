Ext.define('ExFrm.view.com.memoController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.memo',
    onCalled:function(params){
        var me = this;
        
        me.lookupReference('bud_no').setExValue( params.V_BUD_NO );
        
        setTimeout(function(){
    		me.callStore(me, 'ds_memoHis', '', params ,me.onSelectCallback);
    	},50);
    },
    
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 V_BUD_NO       : me.lookupReference('bud_no').getExValue()
    		,V_SEARCH_GBN   : me.lookupReference('lc_searchGbn').getExValue()
    		,V_SEARCH_PARAM : encodeURI(me.lookupReference('txt_searchWord').getExValue())
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_memoHis', '', params ,me.onSelectCallback);
    	},50);
    },
    onSelectCallback : function(me, success, form, action){ 
    	if(success){
    		me.lookupReference('memo_a').getView().select(0);
        }
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0){
    			return;
    		}
    		
    		me.lookupReference('txt_title').setExValue( record[0].get("TITLE") );
    		me.lookupReference('ta_contents').setExValue( record[0].get("CONTENTS") );
    		
    	}catch (e) {}
    },
    onAdd : function(){
    	var me  = this;
    	
    	var row = me.getViewModel().getStore('ds_memoHis').getCount();
 
    	for(var i = 0; i < row; i++){ 
    		
    		var record = me.getViewModel().getStore('ds_memoHis').getAt(i);
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_memoHis' , 'memo_a', "TITLE"  , "제목" ) ){
    			me.lookupReference('txt_title').focus();
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_memoHis' , 'memo_a', "CONTENTS"  , "내용" ) ){
    			me.lookupReference('ta_contents').focus();
    			return false;
    		}
    	}// for
    	
    	var data = {
    		 TITLE    : ""
    		,CONTENTS : ""
    		,BUD_NO   : me.lookupReference('bud_no').getExValue() 
    	}
    	me.getViewModel().getStore('ds_memoHis').add(data);
    	me.lookupReference('memo_a').getView().select(row);
    },
    onDelete :function(){
    	var me = this;
    	exCommon.gridRemove(me , 'memo_a', 'ds_memoHis');
    },
    onTempSave : function (){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_memoHis').getCount();
    	
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('memo_a').getView().getSelectionModel().getSelection()[0];
    	selection.set("TITLE", me.lookupReference('txt_title').getExValue() );
    	selection.set("CONTENTS", me.lookupReference('ta_contents').getExValue() );
    	
    },
    onSave : function(){
    	var me  = this;
    	
    	var cnt = exCommon.ChangeCount('ds_memoHis', me);
    	
    	if(cnt == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', ' 변경된 자료가 없습니다.');    				
    		},50);
    		return;
    	}
    	
    	var TITLE    = exCommon.getRepVal( me.lookupReference('txt_title').getExValue() , "");
    	var CONTENTS = exCommon.getRepVal( me.lookupReference('ta_contents').getExValue() , "");
    	
    	
    	var selection = me.lookupReference('memo_a').getView().getSelectionModel().getSelection()[0];
    	var D_TITLE      = exCommon.getRepVal( selection.get("TITLE") , "");
    	var D_CONTENTS   = exCommon.getRepVal( selection.get("CONTENTS") , "");
    	
    	if(cnt  >= 1 && (TITLE != "" || CONTENTS != "" ) && (D_TITLE == "" ||  D_CONTENTS == "") ){
    		selection.set("TITLE"   , TITLE);
    		selection.set("CONTENTS", CONTENTS);
    	}// if
    	
    	var row = me.getViewModel().getStore('ds_memoHis').getCount();
    	
    	for(var i = 0; i < row; i++){ 
    		
    		var record = me.getViewModel().getStore('ds_memoHis').getAt(i);
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_memoHis' , 'memo_a', "TITLE"  , "제목" ) ){
    			me.lookupReference('txt_title').focus();
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_memoHis' , 'memo_a', "CONTENTS"  , "내용" ) ){
    			me.lookupReference('ta_contents').focus();
    			return false;
    		}
    		
    	}// for
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_memoHis'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/asp/MemoHis/save.suvila'
    		,me.onSaveCallback
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_memoHis' );
    	
    	if(success) me.onSelect();
    },
    onDestroy:function(){
        console.log('memoController', 'onDestroy');
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    
})