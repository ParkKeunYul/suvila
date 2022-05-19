Ext.define('ExFrm.view.sin.sin001p_04Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_04',
    loadBudNo:[],
    loadBudNoPoP : function(me){
    	var cnt = me.loadBudNo.length ;
    	for(var i = 0; i< cnt ; i++){
    		me.loadBudNo.pop();
    	}
    },
    ondestroy:function(){
    	var me = this;
    	
    	console.log('onDestroy');
    	me.loadBudNoPoP(me);
    },
    onCalled:function(params){
        var me = this;
        console.log('onCalled', params);
       
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', {V_BUD_CODE : params.V_BUD_CODE} ,null);
    	},10);
    	
    	me.loadBudNo.push(params.V_BUD_CODE);
        
        me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
	    me.lookupReference('txt_stipulation').focus();
    },
	onInit:function(me){
		
		console.log('onInit = ', me.loadBudNo.length);
		
		me.loadBudNoPoP(me);
		
		setTimeout(function(){
    		me.callStore(me, 'ds_ganjiMaster', '', null ,null);
    	},10);
		
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
    		this.onSindoSearch();
    	}
    },
    onSelectSindo : function(){
    	var me = this;
    	
    	if(me.lookupReference('txt_stipulation').getExValue() == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		return;
    	}
    	
    	var params ={
    		V_BUD_CODE : me.lookupReference('hid_bud_no').getExValue().substr(0,10)
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_slave', '', params ,me.onSelectSindoCallback);
    	},10);
    },
    onSelectSindoCallback : function(me, success, form, action){
    	if(success && me.getViewModel().getStore('ds_slave').getCount() > 0){
    		me.getViewModel().getStore('ds_main').rejectChanges(); 
    		    		
    	}
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSindoSearch : function(){
    	
    	var me = this;
    	var searchgbn   =  exCommon.getRepVal( me.lookupReference('cb_Stipulation').getExValue()  );
    	var searchword  =  exCommon.getRepVal( me.lookupReference('txt_stipulation').getExValue() );
    	
    	
    	if(searchword == ""){
    	
    		setTimeout(function(){
				Ext.Msg.alert('알림',  me.lookupReference('cb_Stipulation').getRawValue() +"를 입력 후 조회 버튼을 눌러주세요.");    				
			},50);
    		me.lookupReference('txt_stipulation').focus();
    		return false;
    	}    	
    	
    	if(searchgbn == "BUD_NO" && searchword.length < 5 ){
			for(var a=searchword.length; a<5; a++){
				searchword = "0" + searchword;
			}// for
			me.lookupReference('txt_stipulation').setExValue( searchword ); 
		}
    	exCommon.onSindoSearch(
    		 me.lookupReference('cb_Stipulation')
    		,me.lookupReference('txt_stipulation')
    		,me
    		,me.onSindoSearchReceive
    	);
    },
    onSindoSearchReceive : function(params, me){
    	var sel_BudSearchGbn = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_stipulation  = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_budNo        = me.lookupReference('hid_bud_no').getExValue( );
    	
    	
    	gf_SetBudFind(params, 
    			      me.lookupReference('cb_Stipulation'), 
    			      me.lookupReference('txt_stipulation'), 
    			      me.lookupReference('hid_bud_no') );
    	
    	
    	txt_budNo = me.lookupReference('hid_bud_no').getExValue();
    	
    	if( me.loadBudNo[0] == txt_budNo.substr(0,10) ){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', "합가 대상 가족과,분가 대상 가족은 같을 수 없습니다.");
    		},50);
    		return false;
    	}
    	me.onSelectSindo();
    },
    onUnionAll : function(){
    	var me = this;
    	me.lookupReference('sin001p_04_b').getSelectionModel().selectAll();
    	me.onUnion();
    	
    	me.lookupReference('sin001p_04_b').getView().getSelectionModel().clearSelections();
    },
    onUnion : function(){
    	var me = this;
    	
    	
    	var selection = me.lookupReference('sin001p_04_b').getView().getSelectionModel().getSelection();
    	if(selection.length == 0){
    		return  false;
    	}
    	
    	var mainCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	var BASE_DAEJU_BUD_NO = me.getViewModel().getStore('ds_main').getAt(0).get("DAEJU_BUD_NO");
    	var BASE_DAEJU_RECORD = me.getViewModel().getStore('ds_main').findRecord('DAEJU_BUD_NO', BASE_DAEJU_BUD_NO, 0, false, true, true);
    	
    	for(var i=0; i<selection.length ;i++){
    		
    		var data = {
    			 DAEJU_YN         : false
    			,DAEJU_BUD_NO     : BASE_DAEJU_RECORD.get("DAEJU_BUD_NO")
    			,BUD_CODE         : BASE_DAEJU_RECORD.get("BUD_CODE")
    			,ZIP_CD           : BASE_DAEJU_RECORD.get("ZIP_CD")
    			,ADDR1            : BASE_DAEJU_RECORD.get("ADDR1")
    			,ADDR2            : BASE_DAEJU_RECORD.get("ADDR2")
    			,ADDR2            : BASE_DAEJU_RECORD.get("ADDR2")
    			,BLDG_NUM         : BASE_DAEJU_RECORD.get("BLDG_NUM")
    			,TELNO1           : BASE_DAEJU_RECORD.get("TELNO1")
    			,TELNO2           : BASE_DAEJU_RECORD.get("TELNO2")
    			,TELNO3           : BASE_DAEJU_RECORD.get("TELNO3")
    			,TELNO3           : BASE_DAEJU_RECORD.get("TELNO3")
    			,BIRTHDAY         : selection[i].get("BIRTHDAY")
    			,BRANCH_CODE      : selection[i].get("BRANCH_CODE")
    			,CARD_ISSUE_CNT   : selection[i].get("CARD_ISSUE_CNT")
    			,EMAIL1           : selection[i].get("EMAIL1")
    			,EMAIL2           : selection[i].get("EMAIL2")
    			,EMAIL_TRANS      : selection[i].get("EMAIL_TRANS")
    			,GBN_CODE         : selection[i].get("GBN_CODE")
    			,HWAJU_BUD_NAME   : selection[i].get("HWAJU_BUD_NAME")
    			,HWAJU_BUD_NO     : selection[i].get("HWAJU_BUD_NO")
    			,HWAJU_YN         : selection[i].get("HWAJU_YN")
    			,ISSUE_DATE       : selection[i].get("ISSUE_DATE")
    			,LUNAR_SOLAR      : selection[i].get("LUNAR_SOLAR")
    			,MEMO             : selection[i].get("MEMO")
    			,MOBILE_TELNO1    : selection[i].get("MOBILE_TELNO1")
    			,MOBILE_TELNO2    : selection[i].get("MOBILE_TELNO2")
    			,MOBILE_TELNO3    : selection[i].get("MOBILE_TELNO3")
    			,NAME_KOR         : selection[i].get("NAME_KOR")
    			,NEWS_YN          : selection[i].get("NEWS_YN")
    			,POST_TRANS       : selection[i].get("POST_TRANS")
    			,REPRESEN_REL     : selection[i].get("REPRESEN_REL")
    			,SACRED_KOR       : selection[i].get("SACRED_KOR")
    			,SEXAGENARY       : selection[i].get("SEXAGENARY")
    			,SEX_GBN          : selection[i].get("SEX_GBN")
    			,SINDO_GBN        : selection[i].get("SINDO_GBN")
    			,SMS_BIRTH_TRANS  : selection[i].get("SMS_BIRTH_TRANS")
    			,SMS_GROUP_TRANS  : selection[i].get("SMS_GROUP_TRANS")
    			,SMS_TRANS        : selection[i].get("SMS_TRANS")
    			,SORT_SEQ         : me.getViewModel().getStore('ds_main').getCount() + 1
    			,TEMPLE_CD        : selection[i].get("TEMPLE_CD")
    			,BUD_NO        	  : selection[i].get("BUD_NO")
    			,SQL_MODE         : "I"
    		}
    		
    		me.lookupReference('slave_bud_code').setExValue( selection[i].get("BUD_CODE") );
    		
    		
    		me.getViewModel().getStore('ds_main').add(data);
    		exCommon.gridRemove(me , 'sin001p_04_b', 'ds_slave' , false , true );
    	}// for
    	
    	me.lookupReference('sin001p_04_b').getView().getSelectionModel().deselectAll();
    	me.lookupReference('sin001p_04_b').getView().getSelectionModel().clearSelections();
    },
    onSave : function(){
    	var me = this;
    	
    	me.lookupReference('branch_bud_code').setExValue("");
    	me.lookupReference('selectAll').setExValue("");
    	me.lookupReference('daeju_bud_no').setExValue("");
    	me.lookupReference('bud_code').setExValue("");
    	
    	
    	var selectAll       = false;
    	var branch_bud_code = "";
    	var slaveCnt        = me.getViewModel().getStore('ds_slave').getCount();
    	
    	var daeju_bud_no       = me.getViewModel().getStore('ds_main').getAt(0).get("DAEJU_BUD_NO");
    	var BUNGA_DAEJU_RECORD = me.getViewModel().getStore('ds_slave').findRecord('DAEJU_YN', "1", 0, false, true, true);
    	
    	if(slaveCnt > 0 &&  (BUNGA_DAEJU_RECORD == null || BUNGA_DAEJU_RECORD == undefined) ){
    		console.log('BUNGA_DAEJU_1');
    		branch_bud_code = me.getViewModel().getStore('ds_slave').getAt(0).get("BUD_CODE");
    	}else{
    		console.log('BUNGA_DAEJU_2');
    	}
    	
    	if( slaveCnt == 0){
    		selectAll = true;
    	}
    	var MAIN_DAEJU_RECORD = me.getViewModel().getStore('ds_main').findRecord('DAEJU_YN', "1", 0, false, true, true);
    	var MAIN_BUD_CODE     = MAIN_DAEJU_RECORD.get("BUD_CODE");

    	
    	me.lookupReference('branch_bud_code').setExValue(branch_bud_code);
    	me.lookupReference('selectAll').setExValue(selectAll);
    	me.lookupReference('daeju_bud_no').setExValue(daeju_bud_no);
    	me.lookupReference('bud_code').setExValue(MAIN_BUD_CODE);
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/sin/SIN001P_04/saveUnionFam.suvila'
    		,me.onSaveCallback
    		,false
    		,'저장 하시겠습니까?<br/> <span style="color:red;font-weight:700;">(작업완료 알림이 나오기전,<br/> 합가처리 창을 종료시 에러가 발생 할 수 있습니다.)<br/>'
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	
    	try{
    		var callback = Ext.decode(action.response.responseText);	
    		if(success){
    			me.getViewModel().getStore('ds_main').commitChanges();
    		}
    		
    		Ext.MessageBox.confirm('알림', callback.msg, function(btn){
    			me.loadBudNoPoP(me);
    	    	
    	    	me.receiveTo(null, false);
    	    	me.onClose();
        	});
    		
    	}catch (e) {
    		console.log(e);
    		setTimeout(function(){
    			Ext.Msg.alert('경고', '오류가 발생하였습니다.<br>관련문의 : 070-7860-7902<br>(주)오투아이 수비라담당자.');    				
    		},50); 
    	}
    	
    },
    onClose : function(){
    	var me = this;
    	me.loadBudNoPoP(me);
    	me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	me.loadBudNoPoP(me);
    	me.getView().destroy();
    }
    
})