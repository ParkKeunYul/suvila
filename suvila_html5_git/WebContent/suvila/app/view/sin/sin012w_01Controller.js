Ext.define('ExFrm.view.sin.sin012w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin012w_01',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    onHelp:function(){},
    onDestroy:function(me){
    },
    onAfterRender:function(me){
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('txt_stipulation').focus();
    	
    	
    	me.lookupReference('me_IssueEDate').setExValue(exCommon.getNowDate());
		me.lookupReference('me_IssueSDate').setExValue(exCommon.getMinusDate(12));
    	
    	
    	me.lookupReference('date_area').setHidden(true);
    	
    },
    onInit:function(me){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_sexGbn', '', null ,me.dsSexGbnCallback);
    	},10);

    },
    dsSexGbnCallback : function(me, success, record, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_animal', '', null ,me.dsAnimalCallback);
    	},10);
    },
    dsAnimalCallback : function(me, success, record, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sindo_gbn', '', null ,me.dsSindoCallback);
    	},10);
    },
    dsSindoCallback : function(me, success, record, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,null);
    	},10);
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
    	
    	if( me.lookupReference('cb_postTrans').checked ) V_POST_TRANS = 1;
    	if( me.lookupReference('cb_daeju').checked )     V_DAEJU = 1;
    	
    	
    	var params = {
    		 V_BUD_NO      : me.lookupReference('hid_bud_no').getExValue()
    		,V_SINDO_GBN   : me.lookupReference('lc_sindo_gbn').getExValue()
    		,V_DATE_GBN    : me.lookupReference('cb_date').getExValue()
    		,V_CLASS_CD    : me.lookupReference('lc_classMgt').getExValue()
    		,V_ANIMAL      : me.lookupReference('lc_animal').getExValue()
    		,V_SEX_GBN     : me.lookupReference('lc_sexGbn').getExValue()
    		,V_ADDR        : encodeURI(me.lookupReference('txt_addr').getExValue())
    		,V_POST_TRANS  : V_POST_TRANS
    		,V_DAEJU       : V_DAEJU
    		,V_AGE         : me.lookupReference('age').getExValue()
    		,V_AGEFN       : me.lookupReference('agefn').getExValue()
    		,V_MEMO        : encodeURI(me.lookupReference('txt_memo').getExValue())
    		,V_ZIP_TYPE    : me.lookupReference('zipType').getExValue()
    		,V_ISSUE_SDATE : me.lookupReference('me_IssueSDate').getExValue()
    		,V_ISSUE_EDATE : me.lookupReference('me_IssueEDate').getExValue()
    		,V_FBIRTHDAY   : me.lookupReference('me_IssueSDate').getExValue()
    		,V_EBIRTHDAY   : me.lookupReference('me_IssueEDate').getExValue()
    		,V_FBIRTHMONTH : me.lookupReference('me_IssueSDate').getRawValue()
    		,V_EBIRTHMONTH : me.lookupReference('me_IssueEDate').getRawValue()
    	}
    	console.log('parmas = ', params);
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){    		
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    },
    onDateChange : function( me2 , nowValue){
    	var me = this;
    	console.log('nowValue = ', nowValue);
    	
    	
    	var me_IssueSDate = me.lookupReference('me_IssueSDate').getExValue();
    	var me_IssueEDate = me.lookupReference('me_IssueEDate').getExValue();
    		
    	me.lookupReference('me_IssueSDate').format = "Y/m/d";
		me.lookupReference('me_IssueEDate').format = "Y/m/d";
    	
    	if(nowValue == 1 || nowValue == 2 || nowValue == 3){
    		me.lookupReference('date_area').setHidden(false);
    		
    		if(nowValue == 3){
    			me.lookupReference('me_IssueSDate').format = "m";
        		me.lookupReference('me_IssueEDate').format = "m";
    		}
    	}else{
    		me.lookupReference('date_area').setHidden(true);
    	}
    	
    	me.lookupReference('me_IssueSDate').setExValue(me_IssueSDate);
    	me.lookupReference('me_IssueEDate').setExValue(me_IssueEDate);
    },
    onPrintLabel : function(){
    	var me = this;
    	
    	var checkRecord = me.getViewModel().getStore('ds_main').findRecord('CHECK_P', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	var jsonAllData    = {};
    	var jsonPrintData  = [];
    	
    	
    	var g_row        = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			
    			var ZIP_CD =  exCommon.getRepVal(g_record.get("ZIP_CD"), '');
    			if(ZIP_CD!= null && ZIP_CD !="" && ZIP_CD.length == 6){
    				ZIP_CD = ZIP_CD.substring(0,3)+"-"+ZIP_CD.substring(3,6);
				}
    			
				if(ZIP_CD != null && ZIP_CD.length > 0){
					var roop = "";
					for(var j = 0; j< ZIP_CD.length ; j++){
						roop += "   "+ZIP_CD.charAt(j);
					}
					ZIP_CD = roop;
				} 
    			
    			
    			var jsonData = {
    				 ADDR1    : exCommon.getRepVal(g_record.get("ADDR1"), '') + ' ' + exCommon.getRepVal(g_record.get("ADDR2"), '')
    				,ZIP_BAE  : exCommon.getRepVal(g_record.get("ZIP_BAE"), '')
    				,NAME_KOR : exCommon.getRepVal(g_record.get("NAME_KOR"), '')
    				,ZIP_CD   : ZIP_CD
    			};
    			jsonPrintData.push(jsonData);
    		}
    	}// for
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
		
    	var params = {
     		 FILE_PATH  : '/sin012w_01_ds_print.ozr' 
     		,PRINT_DATA : jsonAllData
     	};
   		
   		
   		setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    	
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin012w_01_a');
    	    	
    	exCommon.excelDown(grid, 'SindoSearch', '신도검색',  me.getViewModel().getStore('ds_main').getCount());
    },
    onMouseRightClick:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var dataIndex = eOpts.position.colIdx -1;
    	
    		var selectedRecord = me.lookupReference('sin012w_01_a').getView().getSelectionModel().getSelection();
    		
    		me.openPopup('ExFrm.view.com.group_mouse',  selectedRecord , me.onReceivePopup);
    		
    		
    },
    onReceivePopup:function(params, me){
    	console.log('params = ', params);
    	
    	if(params.type == 'group'){
    		
    		var ex_data = {
    			PARAM_CLASS_CD : me.lookupReference('lc_classMgt').getExValue()
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_classMgt', '', ex_data ,me.afterPopCallback);
        	},10);
    	}
    },
    afterPopCallback : function(me, success, record, action){

    	console.log('action = ', action);
    },
    
})


