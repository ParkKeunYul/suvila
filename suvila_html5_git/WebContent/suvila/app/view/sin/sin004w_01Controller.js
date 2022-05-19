Ext.define('ExFrm.view.sin.sin004w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin004w_01',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    onHelp:function(){},
    onDestroy:function(me){},
    onInit:function(me){},
    onAfterRender:function(){
    	var me = this;
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('txt_stipulation').focus();
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_buddhismAll', '', null ,me.dsBudhisAllCallback);
    	},50);
    	
		
    },
    dsBudhisAllCallback : function (me, success, records, action){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_buddhismSelect', '', null ,me.dsBudhisSelectCallback);
    	},50);
    	    	
    },
    dsBudhisSelectCallback  : function (me, success, records, action){
    	me.onSelect();
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
    		,V_CONF_CODE   : me.lookupReference('lc_buddhismAll').getExValue()
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
    			me.lookupReference('sin004w_01_a').getView().select(0);
    		}else{
           	 	me.lookupReference('txt_name_kor').setExValue( "" );
           	 	me.lookupReference('txt_bud_no').setExValue( "" );
           	 	me.lookupReference('em_prec_date').setExValue( "");
           	 	me.lookupReference('ta_memo').setExValue( "" );
           	 	me.lookupReference('txt_card_no').setExValue( "" );
    		}
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin004w_01_a');
    	    	
    	exCommon.excelDown(grid, 'sindoCard', '수계등록현황',  me.getViewModel().getStore('ds_main').getCount());
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
    	me.lookupReference('sin004w_01_a').getView().select( row );
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
			
    		var nowIndex       = me.lookupReference('sin004w_01_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
       	 	me.lookupReference('txt_name_kor').setExValue( record[0].get("NAME_KOR") );
       	 	me.lookupReference('txt_bud_no').setExValue( record[0].get("BUD_NO") );
       	 	me.lookupReference('txt_sacred_kor').setExValue( record[0].get("SACRED_KOR") );
       	 	me.lookupReference('txt_sacred_han').setExValue( record[0].get("SACRED_HAN") );
       	 	me.lookupReference('lc_buddhismSelect').setExValue( record[0].get("CONF_CODE") );
       	 	me.lookupReference('em_prec_date').setExValue( record[0].get("PREC_DATE") );
       	    me.lookupReference('txt_gaesa').setExValue( record[0].get("GAESA") );
       	    me.lookupReference('ta_memo').setExValue( record[0].get("MEMO") );
    		
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
    		 PREC_DATE  : today
       		,BUD_NO     : record.get("BUD_NO")
       		,NAME_KOR   : record.get("NAME_KOR")
       		,CONF_CODE  : '0'
       		,SACRED_KOR : record.get("SACRED_KOR")
       		,SACRED_HAN : record.get("SACRED_HAN")
       	}
       	me.getViewModel().getStore('ds_main').insert(nowIndex+1,data);
    	
    	console.log( nowIndex+1 );
    	me.lookupReference('sin004w_01_a').getView().select( nowIndex+1 );
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(
    		 me
    		,'sin004w_01_a'
    		,'ds_main'
    		, false
    		, false
    	);    
    }, 
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_main').getAt(index);
			
			pre_record.set("SACRED_KOR", exCommon.getRepVal(me.lookupReference('txt_sacred_kor').getExValue(),''));
			pre_record.set("SACRED_HAN", exCommon.getRepVal(me.lookupReference('txt_sacred_han').getExValue(),''));
			pre_record.set("CONF_CODE" , exCommon.getRepVal(me.lookupReference('lc_buddhismSelect').getExValue(),''));
			pre_record.set("PREC_DATE" , exCommon.getRepVal(me.lookupReference('em_prec_date').getExValue(),''));
			pre_record.set("GAESA"     , exCommon.getRepVal(me.lookupReference('txt_gaesa').getExValue(),''));
			pre_record.set("MEMO"      , exCommon.getRepVal(me.lookupReference('ta_memo').getExValue(),''));
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    inValidation : function(me){
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row; i++){
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin004w_01_a', "CONF_CODE"  , "수계종류" ) ){
    			me.lookupReference('lc_buddhismSelect').focus();    			
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin004w_01_a', "PREC_DATE"  , "수계일" ) ){
    			me.lookupReference('em_prec_date').focus();    			
    			return false;
    		}
    		
    		if( !exCommon.gridFormValDate(me, i ,'ds_main' , 'sin004w_01_a', "PREC_DATE"  , "수계일" ) ){
    			me.lookupReference('em_prec_date').focus();    			
    			return false;
    		}
    		
    	}// for i
    	
    	
    	/* 수계정보 중복체크 */
    	for(i=0 ; i<row-1 ; i++){
    		var CONF_CODE = me.getViewModel().getStore('ds_main').getAt(i).get("CONF_CODE") + me.getViewModel().getStore('ds_main').getAt(i).get("BUD_NO");    		
    		
    		for(j=i+1 ;j <row; j++){
    			DUPLE_CONF_CODE = me.getViewModel().getStore('ds_main').getAt(j).get("CONF_CODE") + me.getViewModel().getStore('ds_main').getAt(j).get("BUD_NO");
    			
    			if(CONF_CODE == DUPLE_CONF_CODE){
    				me.lookupReference('sin004w_01_a').getView().select( j );
    				exCommon.msgAlert('수계종류는 중복입력이 불가능 합니다.');
    				return false;
    			}
    			
    		}// for j
    	}// for i
    	
    	return true;
    },
    onSave : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	if(row > 0){
    		var selectedRecord = me.lookupReference('sin004w_01_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('sin004w_01_a').getStore().indexOf(selectedRecord[0]);
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
    		,'/sin/SIN004W_01/saveBuddhismInfo.suvila'
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


