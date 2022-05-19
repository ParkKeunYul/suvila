Ext.define('ExFrm.view.sin.sin002w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin002w_01',    
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
    		me.callStore(me, 'ds_janghak_gubunAll', '', null ,me.dsJangHakAllCallback);
    	},50);
    	
		
    },
    dsJangHakAllCallback : function (me, success, records, action){
    	
    	if(success){
    		
    		var row = me.getViewModel().getStore('ds_janghak_gubunAll').getCount();
    		
    		for(var i = 0; i < row ; i++){
    			
    			var data = {
    				 CODE : me.getViewModel().getStore('ds_janghak_gubunAll').getAt(i).get("CODE")
    				,NAME : me.getViewModel().getStore('ds_janghak_gubunAll').getAt(i).get("NAME")
    			}
    			me.getViewModel().getStore('ds_janghak_gubun').add(data);
    		}// for 
    		
    		
    		var data ={
    			 CODE : ''
    			,NAME : '전체'
    		}
    		me.getViewModel().getStore('ds_janghak_gubunAll').insert(0, data);
    	}
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
    	
    	me.lookupReference('hid_bud_no').setExValue( params.BUD_NO );
    	me.lookupReference('txt_stipulation').setExValue( params.BUD_NO );
    	me.lookupReference('hid_name_kor').setExValue( params.NAME_KOR );
    	
    	
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
    	
    	if(exCommon.getRepVal(me.lookupReference('hid_bud_no').getExValue(), '' ) ==  ''){
    		exCommon.msgAlert('신도 검색후 작업하십시요.');
    		me.lookupReference('txt_stipulation').focus();
    		return;
    	}
    	
    	var params = {
    		 V_BUD_NO        : me.lookupReference('hid_bud_no').getExValue()
    		,V_JANGHAK_GUBUN : me.lookupReference('lc_janghak_gubunAll').getExValue()
    	}
    	
    	console.log('parmas = ', params);
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row ==  0){
    			
    			var data = {
    				 BUD_NO           : me.lookupReference('hid_bud_no').getExValue()
    				,JANGHAK_GUBUN    : '1'
    				,SDATE            : exCommon.getNowDate('')
    				,NAME_KOR         : me.lookupReference('hid_name_kor').getExValue()
    			};
    			me.getViewModel().getStore('ds_main').add(data);
    		}
    		me.lookupReference('sin002w_01_a').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin002w_01_a');
    	    	
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
			
    		var nowIndex       = me.lookupReference('sin002w_01_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
    		me.lookupReference('txt_name_kor').setExValue( record[0].get("NAME_KOR") );
       	 	me.lookupReference('txt_budNo').setExValue( record[0].get("BUD_NO") );
       	 	me.lookupReference('lc_janghak_gubun').setExValue( record[0].get("JANGHAK_GUBUN") );
       	 	me.lookupReference('me_sdate').setExValue( record[0].get("SDATE") );
       	 	me.lookupReference('txt_elegant').setExValue( record[0].get("ELEGANT") );
       	 	me.lookupReference('txt_give').setExValue( record[0].get("GIVE") );
       	 	me.lookupReference('txt_present_contents').setExValue( record[0].get("PRESENT_CONTENTS") );
       	 	me.lookupReference('txt_memo').setExValue( record[0].get("MEMO") );
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onInput : function(){
    	var me = this;
    	
    	var row  = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(exCommon.getRepVal(me.lookupReference('hid_bud_no').getExValue(), '' ) ==  ''){
    		exCommon.msgAlert('신도번호를 입력 후 조회 버튼을 눌러주세요.');
    		me.lookupReference('txt_stipulation').focus();
    		return;
    	}
    	
    	var data = {
			 BUD_NO           : me.lookupReference('hid_bud_no').getExValue()
			,JANGHAK_GUBUN    : '1'
			,SDATE            : exCommon.getNowDate('')
			,NAME_KOR         : me.lookupReference('hid_name_kor').getExValue()
		};
    	
    	console.log(data);
		me.getViewModel().getStore('ds_main').add(data);
		me.lookupReference('sin002w_01_a').getView().select(row);
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(
    		 me
    		,'sin002w_01_a'
    		,'ds_main'
    		, false
    		, false
    	);    
    }, 
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_main').getAt(index);
			pre_record.set("NAME_KOR"        , exCommon.getRepVal(me.lookupReference('txt_name_kor').getExValue(),''));
			pre_record.set("BUD_NO"          , exCommon.getRepVal(me.lookupReference('txt_budNo').getExValue(),''));
			pre_record.set("JANGHAK_GUBUN"   , exCommon.getRepVal(me.lookupReference('lc_janghak_gubun').getExValue(),''));
			pre_record.set("SDATE"           , exCommon.getRepVal(me.lookupReference('me_sdate').getExValue(),''));
			pre_record.set("ELEGANT"         , exCommon.getRepVal(me.lookupReference('txt_elegant').getExValue(),''));
			pre_record.set("GIVE"            , exCommon.getRepVal(me.lookupReference('txt_give').getExValue(),''));
			pre_record.set("PRESENT_CONTENTS", exCommon.getRepVal(me.lookupReference('txt_present_contents').getExValue(),''));
			pre_record.set("MEMO"            , exCommon.getRepVal(me.lookupReference('txt_memo').getExValue(),''));
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    inValidation : function(me){
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row; i++){
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin002w_01_a', "ELEGANT"  , "품의자" ) ){
    			me.lookupReference('txt_elegant').focus();    			
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin002w_01_a', "GIVE"  , "지급자" ) ){
    			me.lookupReference('txt_give').focus();    			
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin002w_01_a', "PRESENT_CONTENTS"  , "수여내역" ) ){
    			me.lookupReference('txt_present_contents').focus();    			
    			return false;
    		}
    		
    		/*if( !exCommon.gridFormValDate(me, i ,'ds_main' , 'sin002w_01_a', "PRESENT_CONTENTS"  , "수여내역" ) ){
    			me.lookupReference('txt_present_contents').focus();    			
    			return false;
    		}*/
    		
    	}// for i
    	
    	return true;
    },
    onSave : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	if(row > 0){
    		var selectedRecord = me.lookupReference('sin002w_01_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('sin002w_01_a').getStore().indexOf(selectedRecord[0]);
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
    		,'/sin/SIN002W_01/scholarshipFundHisSave.suvila'
    		,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    	}
    },
  
})


