Ext.define('ExFrm.view.sin.sin006w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin006w_01',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    onHelp:function(){},
    onDestroy:function(me){
    },
    onAfterRender:function(){
    	var me = this;
    	
    	
    	setTimeout(function(){
    		console.log(exCommon.user.searchGbn);
    		me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
        	me.lookupReference('txt_stipulation').focus();
        	
        	var today = exCommon.setDateFormat( exCommon.getNowDate() );
        	me.lookupReference('me_SDate').setExValue( exCommon.getMinusDay(365) );
    		me.lookupReference('me_EDate').setExValue( today );
    		
    		me.onSelect();
    	},50);
    },
    onInit:function(me){
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSindoSearch();
    	}
    },
    onSindoSearch : function(){
    	
    	var me = this;
    	
    	var searchValue = "";
    	var searchgbn   =  me.lookupReference('cb_Stipulation').getExValue();
    	var searchword  =  me.lookupReference('txt_stipulation').getExValue();
    	
    	if(searchword == "" || searchword == null || searchword == undefined){
    		
    		var msg = "신도명을 입력 후 조회 버튼을 눌러주세요.";
    		if(searchgbn == "BUD_NO"){
    			msg = "신도번호를 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "CARD_NO"){
    			msg = "카드번호을 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "SACRED_KOR"){
    			msg = "법명을 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "MOBILE_TELNO"){
    			msg = "핸드폰번호를 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "TELNO"){
    			msg = "전화번호를 입력 후 조회 버튼을 눌러주세요.";
    		}else if(searchgbn == "YOUNGGA"){
    			msg = "영가명을 입력 후 조회 버튼을 눌러주세요.";
    		}	
    		setTimeout(function(){
				Ext.Msg.alert('알림', msg);    				
			},50);
    		
    		me.lookupReference('txt_stipulation').focus();
    		
    		return;
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
    	
    	
    	me.onSelect();
    },
    onSearchSelect: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onSelect : function (){
    	var me = this;
    	
    	var V_POST_TRANS = 0;
    	var V_DAEJU      = 0;
    	
    	
    	var params = {
    		 V_BUD_NO      : me.lookupReference('hid_bud_no').getExValue()
    		,V_CLASS_CD    : me.lookupReference('lc_classMgt').getExValue()
    		,V_S_DATE      : me.lookupReference('me_SDate').getExValue()
    		,V_E_DATE      : me.lookupReference('me_EDate').getExValue()
    	}
    	
    	console.log('parmas = ', params);
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue(-1);
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row > 0){
    			me.lookupReference('sin006w_01_a').getView().select(0);
    		}else{
           	 	me.lookupReference('txt_name_kor').setExValue( "" );
           	 	me.lookupReference('txt_bud_no').setExValue( "" );
           	 	me.lookupReference('em_entry_date').setExValue( "");
           	 	me.lookupReference('ta_memo').setExValue( "" );
           	 	me.lookupReference('txt_card_no').setExValue( "" );
    		}
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin006w_01_a');
    	    	
    	exCommon.excelDown(grid, 'sindoCard', '신도카드신청현황',  me.getViewModel().getStore('ds_main').getCount());
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onAddSindo : function(){
    	var me = this;
    	
    	var params = {
  	   		 V_SEARCH_GBN : me.lookupReference('cb_Stipulation').getExValue()
  	   		,V_SEARCH_WORD: ""    		
  	   	};
      	me.openPopup('ExFrm.view.com.sindo',  params, me.onAddSindoReceive);
    },
    onAddSindoReceive : function(params, me){
    	console.log('onSindoSearchReceive ',params);

    	
    	var row  = me.getViewModel().getStore('ds_main').getCount();
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() ).replace(/-/gi, ""); 
    	
    	
    	var data = {
    		 ENTRY_DATE : today
    		,BUD_NO     : params.BUD_NO
    		,NAME_KOR   : params.NAME_KOR
    	}
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('sin006w_01_a').getView().select( row );
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) {
    			me.lookupReference('txt_sel_index').setExValue(-1);    			
    			return false;
    		}
    		
    		//이전값 세팅
			var preIndex    = me.lookupReference('txt_sel_index').getExValue();
			if(preIndex != -1){
				me.inSettingRecord(me, preIndex);
			}// if preIndex

			
    		var nowIndex       = me.lookupReference('sin006w_01_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
       	 	me.lookupReference('txt_name_kor').setExValue( record[0].get("NAME_KOR") );
       	 	me.lookupReference('txt_bud_no').setExValue( record[0].get("BUD_NO") );
       	 	me.lookupReference('em_entry_date').setExValue( record[0].get("ENTRY_DATE") );
       	 	me.lookupReference('ta_memo').setExValue( record[0].get("MEMO") );
       	 	me.lookupReference('txt_card_no').setExValue( record[0].get("CARD_NO") );
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onPlus : function(){
    	var me = this;
    	
    	var row  = me.getViewModel().getStore('ds_main').getCount();
    	if(row <= 0){
    		exCommon.msgAlert('추가시킬 신도정보가 없습니다.');
    		return;
    	}
    	
    	var nowIndex = exCommon.getRepNum(me.lookupReference('txt_sel_index').getExValue());
    	
    	var record = me.getViewModel().getStore('ds_main').getAt(nowIndex);
    	var today = exCommon.setDateFormat( exCommon.getNowDate() ).replace(/-/gi, "");
    	
    	var data = {
       		 ENTRY_DATE : today
       		,BUD_NO     : record.get("BUD_NO")
       		,NAME_KOR   : record.get("NAME_KOR")
       	}
       	me.getViewModel().getStore('ds_main').insert(nowIndex+1,data);
    	
    	console.log( nowIndex+1 );
    	me.lookupReference('sin006w_01_a').getView().select( nowIndex+1 );
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(
    		 me
    		,'sin006w_01_a'
    		,'ds_main'
    		, false
    		, false
    	);    
    }, 
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_main').getAt(index);
			
			pre_record.set("ENTRY_DATE", exCommon.getRepVal(me.lookupReference('em_entry_date').getExValue(),''));
			pre_record.set("MEMO"      , exCommon.getRepVal(me.lookupReference('ta_memo').getExValue(),''));
			pre_record.set("CARD_NO"   , exCommon.getRepVal(me.lookupReference('txt_card_no').getExValue(),''));
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    inValidation : function(me){
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row; i++){
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin006w_01_a', "CARD_NO"  , "카드번호" ) ){
    			me.lookupReference('txt_card_no').focus();    			
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin006w_01_a', "ENTRY_DATE"  , "발급일자" ) ){
    			me.lookupReference('em_entry_date').focus();    			
    			return false;
    		}
    		
    		if( !exCommon.gridFormValDate(me, i ,'ds_main' , 'sin006w_01_a', "ENTRY_DATE"  , "발급일자" ) ){
    			me.lookupReference('em_entry_date').focus();    			
    			return false;
    		}
    		
    	}// for i
    	
    	return true;
    },
    onSave : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	if(row > 0){
    		var selectedRecord = me.lookupReference('sin006w_01_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('sin006w_01_a').getStore().indexOf(selectedRecord[0]);
        	me.inSettingRecord(me, index);
    	}
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	
    	if (rowCnt == 0) {
    		exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
		}
    	
    	if(!me.inValidation(me) ) {
    		return;
    	}
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/sin/SIN006W_01/saveSindoCard.suvila'
    		,me.onSindoSaveCallback
    	);
    },
    onSindoSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    	}
    }
})


