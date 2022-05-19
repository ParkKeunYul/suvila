Ext.define('ExFrm.view.sin.sin017w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin017w_01',    
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
    	
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('me_SDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_EDate').setExValue( today );
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.ClassMgtCallback);
    	},50);
    },
    ClassMgtCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_yn_issue', '', null ,me.ynIssueCallback);
    	},50);
    },
    ynIssueCallback  : function (me, success, records, action){
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
    		,V_S_DATE      : me.lookupReference('me_SDate').getExValue()
    		,V_E_DATE      : me.lookupReference('me_EDate').getExValue()
    		,V_CLASS_CD    : me.lookupReference('lc_classMgt').getExValue()
    		,V_ISSUE_STATE : me.lookupReference('search_state').getExValue()
    		,V_SEARCH_DATE : me.lookupReference('search_date').getExValue()
    	}
    	
    	console.log('parmas = ', params);
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row > 0){
    			me.lookupReference('sin017w_01_a').getView().select(0);
    		}
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin017w_01_a');
    	    	
    	exCommon.excelDown(grid, 'sindoCard', '신도증신청 현황',  me.getViewModel().getStore('ds_main').getCount());
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
    	me.lookupReference('sin017w_01_a').getView().select( row );
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) {
    			return false;
    		}
    		
    		console.log('record = ', record[0].get("PHOTO"));
    		
    		me.lookupReference('memo').setExValue(record[0].get("MEMO"));
    		me.lookupReference('txt_file_name').setExValue(record[0].get("R_PHOTO"));
    		
    		
    		var IMAGE_URL = "/suvila/upload/" + record[0].get("PHOTO");
    		console.log('IMAGE_URL = ', IMAGE_URL);
    		
    		me.lookupReference('image').setSrc( IMAGE_URL );
    		
    		
    		var params = {
    			V_BUD_NO : record[0].get("BUD_NO")
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_sub', '', params ,me.dsSubCallback);
        	},10);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsSubCallback: function(me, success, form, action){
    	if(success){
    		me.lookupReference('sin017w_01_b').getView().select(0);
    	}
    },
    inValidation : function(me){
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row; i++){
    		var record         = me.getViewModel().getStore('ds_main').getAt(i);
    		var CHECK_P        = exCommon.getTF(record.get("CHECK_P"));
    		var SETTING_DATE_R = exCommon.getRepVal(record.get("R_SETTING_DATE"), '');
    		
    		if(CHECK_P == 'T' && SETTING_DATE_R != ''){
    			me.lookupReference('sin017w_01_a').getView().select(i);
    			exCommon.msgAlert('기존 정산처리된건을 제외시킨후 시도해주세요.');
    			return false;
    		}
    	}// for i
    	
    	return true;
    },
    onSettingCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    	}
    },
    onSetting : function(){
    	var me = this;
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	
    	if (rowCnt == 0) {
    		exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
		}
    	
    	if(!me.inValidation(me) ) {
    		return;
    	}
    	
    	var jsonUptData = [];
    	
    	Ext.MessageBox.confirm('알림', '정산처리 하시겠습니까?<br/>저장후 변경할수 없습니다.', function(btn){
    		if (btn == 'yes') {
    			
    			var today = exCommon.getNowDate('') ;
    			console.log('today = ',today);
    			var row = me.getViewModel().getStore('ds_main').getCount();
    			for(var i = 0; i < row; i++){
    				var record         = me.getViewModel().getStore('ds_main').getAt(i);
    	    		var CHECK_P        = exCommon.getTF(record.get("CHECK_P"));
    	    		var SETTING_DATE_R = exCommon.getRepVal(record.get("R_SETTING_DATE"), '');
    	    		
    	    		if(CHECK_P == 'T' && SETTING_DATE_R == ''){
    	    			record.set("SETTING_DATE",today );
    	    			jsonUptData.push(record.data);
    	    		}
    			}// for
    			
    			me.lookupReference('uptData').setExValue(Ext.encode(jsonUptData));
    			
    			setTimeout(function(){
    				me.callForm(me, '/sin/SIN017W_01/saveSetting.suvila', me.onSettingCallback , false);
    			},50);	
    		}
    	});
    	
    },
})


