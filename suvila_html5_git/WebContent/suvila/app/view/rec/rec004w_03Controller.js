Ext.define('ExFrm.view.rec.rec004w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec004w_03',
    onSearch:function(params){
        var me = this;
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_payState', '', null ,me.dspayStateCallback);
    	},50);
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
		
		fn_getBudNo(me, '' , "all");
    	
    },
    dspayStateCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_approv', '', null ,me.dsapprovCallback);
    	},50);
    	
    	if(success){
    		me.getViewModel().getStore('ds_payState').getAt(0).set("NAME", "전체");
    	}    	
    },
    dsapprovCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null ,me.dstempleUserCallback);
    	},50);
    	
    	
    	if(success){
    		me.getViewModel().getStore('ds_approv').getAt(0).set("NAME", "전체");
    	}
    },
    dstempleUserCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.dsclassMgtCallback);
    	},50);
    },
    dsclassMgtCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_chonhonKind', '', null ,me.dsChonhonCallback);
    	},50);
    },
    dsChonhonCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_bokwigibu', '', null ,null);
        },50);
    	
    	if(success){
    	}
    },
    onRadioClick : function(field, newValue, oldValue, options) {
    	var me = this;
    	
    	console.log('onRadioClick = ', newValue.rd_selectGbn);
    	console.log('onRadioClick = ', oldValue.rd_selectGbn);
    	
    	
    	
    	me.lookupReference('WEPAE_'+oldValue.rd_selectGbn).setHeight(0);
    	me.lookupReference('WEPAE_'+oldValue.rd_selectGbn).setHidden(true);
    	
    	
    	me.lookupReference('WEPAE_'+newValue.rd_selectGbn).setHeight(730);
    	me.lookupReference('WEPAE_'+newValue.rd_selectGbn).setHidden(false);
    	
    	
    	if(newValue.rd_selectGbn == "CHECK"){
    		me.lookupReference('WEPAE_SEARCH_CHECK').setHidden(false);
    	}else{
    		me.lookupReference('WEPAE_SEARCH_CHECK').setHidden(true);
    	}
    	
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onDateField : function(){
    	
    	var me = this;
    	
    	var cb_date = me.lookupReference('cb_date').getExValue();
    	
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	
    	if(cb_date == 1){
    		me.lookupReference('me_AcceptSDate').format = "Y-m-d";
    		me.lookupReference('me_AcceptEDate').format = "Y-m-d";
    	}else{
    		me.lookupReference('me_AcceptSDate').format = "Y-m";
    		me.lookupReference('me_AcceptEDate').format = "Y-m";
    	}
    	
    	me.lookupReference('me_AcceptSDate').setExValue( me_AcceptSDate );
		me.lookupReference('me_AcceptEDate').setExValue( me_AcceptEDate );
    },    
    onSelect : function(){
    	
    	var me = this;
    	
    	console.log(me.lookupReference('rd_selectGbn').getValue().rd_selectGbn);
    	
    	
    	var rd_selectGbn = me.lookupReference('rd_selectGbn').getValue().rd_selectGbn;
    	
    	var params ="";
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	var params = {
    		 V_PAY_STATE    	: me.lookupReference('lc_payState').getExValue()
    		,V_PROPOSAL_BUD_NO  : me.lookupReference('hid_bud_no').getExValue()
       		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
       		,V_SDATE 			: me_AcceptSDate
       		,V_EDATE 			: me_AcceptEDate
       		,V_EVENT_CD  	    : me.lookupReference('lc_KindInfo').getExValue()       		
       		,VV_USER_ID    		: me.lookupReference('lc_templeUser').getExValue()
       		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
       		,V_APPROV       	: me.lookupReference('lc_approv').getExValue()     
       		,V_CLOSE_YN         : me.lookupReference('lc_IDCloseYn').getExValue()
       		,V_EVENT_FSEQ       : me.lookupReference('event_fseq').getExValue()
       		,V_EVENT_ESEQ       : me.lookupReference('event_eseq').getExValue()
       	};
    	
    	if(rd_selectGbn == "SELECT"){
    		setTimeout(function(){
        		me.callStore(me, 'ds_detail', '', params ,me.onSelectCallback);
        	},50);
    	}else{
    		
    		var lc_KindInfo =  me.lookupReference('lc_KindInfo').getExValue()  
    		if(lc_KindInfo == 0 || lc_KindInfo == '' || lc_KindInfo == null ){
    			exCommon.msgAlert('행사명은 필수 검색 조건입니다.');
    			me.lookupReference('lc_KindInfo').focus();
    			return;
    		}
    		
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_eventSeq', '', params ,null);
        	},50);
    	}
    	    	
    },
    onSelectCallback : function(me, success, form, action){
    	console.log('onSelectCallback');
    	if(success){
    		me.lookupReference('rec004w_03_a').getView().select(0);
    		console.log('onSelectCallback2');
    		me.getViewModel().getStore('ds_dongChamJa').removeAll();
    	}
    },    
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	console.log('onSelectionChange');
    	try{
    		if(record.length <=  0) return;
    		
    		console.log('onSelectionChange = ', record[0]);
    		
    		var params = {
    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
    			,V_SEQ        : record[0].get("SEQ")
    			,V_EVENT_CD   : record[0].get("EVENT_CD")
    			,V_EVENT_DATE : record[0].get("EVENT_DATE")
    			,V_WEPAECNT   : record[0].get("WEPAECNT")
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_dongChamJa', '', params ,me.dsDongCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    dsDongCallback : function(me, success, form, action){
    	me.lookupReference('rec004w_03_b').getView().select(0);
    },    
    dsSaguBokwiCallback : function(me, success, form, action){
    	me.lookupReference('rec003w_43_d').getView().select(0);
    },
    
    inFnValidate : function(me){
    	
    	
    	var row = me.getViewModel().getStore('ds_giJaeBokwi').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_giJaeBokwi').getAt(i);
    		
    		if( !exCommon.gridFormVal(me , i , 'ds_giJaeBokwi' , 'rec003w_33_d' , "BOKWEJA_NM"    , '복위자명' ) ){
				return false;
			}
    		
    	}// row_kd
    	
    	
    	return true;
    },
    onSave : function(){
    	var me = this;
    	
    	var cnt = exCommon.ChangeCount('ds_eventSeq', me);
    	if(cnt == 0){
    		Ext.Msg.alert('알림', '변경된 자료가 없습니다.');
    		return;
    	}
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_eventSeq'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC004W_03/saveEventSeq.suvila'
    		,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	console.log('onSaveBokCallback = ', success);
    	exCommon.fnGridSaveCallback( me, success , action , 'ds_eventSeq' );    	
    },
    onEdit : function(editor, context, eOpts) {
    	var me = this;
    	
    	if(context.field == 'EVENT_TIME'){
    		var EVENT_TIME = exCommon.getRepVal(me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).get("EVENT_TIME"),"");
    		
    		
    		if(isNaN(EVENT_TIME)){
    			
    			me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("EVENT_TIME","");
    			
        		return;
        	}
    		
    		if(EVENT_TIME.length == 1){
    			EVENT_TIME ="0"+ EVENT_TIME + "00"; 
    		}else if(EVENT_TIME.length == 2){
    			EVENT_TIME = EVENT_TIME + "00";
    		}else if(EVENT_TIME.length == 3){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + "" + EVENT_TIME.substr(2) +"0";
    		}else if(EVENT_TIME.length == 4){
    			EVENT_TIME = EVENT_TIME.substr(0,2) + "" + EVENT_TIME.substr(2);
    		}else if(EVENT_TIME.length > 4){
    			console.log(EVENT_TIME.substr(2,4));
    			EVENT_TIME = EVENT_TIME.substr(0,2) + "" + EVENT_TIME.substr(2,2);
    		}
    		me.getViewModel().getStore('ds_giJae').getAt(context.rowIdx).set("EVENT_TIME",EVENT_TIME);
    	}
    },
    onSaveBok : function(){
    	var me = this;
    	
    	
    	var cnt = exCommon.ChangeCount('ds_giJaeBokwi', me);
    	if(cnt == 0){
    		Ext.Msg.alert('알림', '변경된 자료가 없습니다.');
    		return;
    	}
    	
    	if(me.inFnValidate(me)){
    		var row = me.getViewModel().getStore('ds_giJaeBokwi').getCount();
        	
        	var jsonNewData = [];
        	me.lookupReference('newData').setExValue("");
        	for(var i = 0; i < row ; i++){
        		jsonNewData.push(me.getViewModel().getStore('ds_giJaeBokwi').getAt(i).data);
        		
        		if(i == 0){
        			me.lookupReference('ACCEPT_SEQ').setExValue( me.getViewModel().getStore('ds_giJaeBokwi').getAt(i).data.ACCEPT_SEQ );
        			me.lookupReference('SEQ').setExValue( me.getViewModel().getStore('ds_giJaeBokwi').getAt(i).data.SEQ );
        		}
        	}// for i    	
        	
        	console.log('newData = ', me.lookupReference('newData').getExValue() );
        	
        	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
        		if (btn == 'yes') {
        			
        			me.lookupReference('newData').setExValue("");
        			me.lookupReference('newData').setExValue(Ext.encode(jsonNewData));
        			
        			setTimeout(function(){
        				me.callForm(me, '/rec/REC003W_43/saveBokwi.suvila', me.onSaveBokCallback , false);
        			},50);	
        		}
        	});
        	
        	
    	}    	
    },
    onSaveBokCallback : function(me, success, form, action){
    	console.log('onSaveBokCallback = ', success);
    	exCommon.fnGridSaveCallback( me, success , action , 'ds_giJaeBokwi' );    	
    },
    onDelBok : function(){
    	var me = this;
    	
    	exCommon.gridRemove(
    		 me
    		,'rec003w_43_d'
    		,'ds_giJaeBokwi'    		
    	);
    	
    },
    onAddBok : function (){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('rec003w_43_a').getView().getSelectionModel().getSelection()[0];
    	
    	console.log(selectedRecord);
    	
    	var bokCnt = me.getViewModel().getStore('ds_giJaeBokwi').getCount();
    	
    	var data = {
    		 ACCEPT_SEQ     : selectedRecord.data.ACCEPT_SEQ
    		,SEQ 		    : selectedRecord.data.SEQ
    		,BOKWI_KIBU_GBN : me.getViewModel().getStore('ds_bokwigibu').getAt(0).get("CODE")
    		,SORT_SEQ 	    : me.getViewModel().getStore('ds_giJaeBokwi').getAt(bokCnt-1).get("SORT_SEQ") + 1
    	};
    	    	
    	
    	me.getViewModel().getStore('ds_giJaeBokwi').add(data);
    	me.lookupReference('rec003w_43_d').getView().select(bokCnt);
    },
    oBokUp : function(){
    	var me = this;
    	
    	
    	var rowCnt = me.getViewModel().getStore('ds_giJaeBokwi').getCount();
    	if(rowCnt == 0 || rowCnt == 1){
    		return false;
    	}
    	var selection = me.lookupReference('rec003w_43_d').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec003w_43_d').getStore().indexOf(selection);
    	
    	if(_idx == 0){
			return false;
		}
    	
    	var upRecord    = me.lookupReference('rec003w_34_d').getStore().getAt(_idx-1);
    	var upSortSeq   = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_giJaeBokwi').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    },
    oBokDown : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_giJaeBokwi').getCount();
    	if(_tCnt == 0 || _tCnt == 1){
    		return false;
    	}
    	var selection = me.lookupReference('rec003w_43_d').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec003w_43_d').getStore().indexOf(selection);
    	
    	
    	if(_tCnt == (_idx+1) ){
    		return false;
    	}
    	
    	var downRecord   = me.lookupReference('rec003w_43_d').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_giJaeBokwi').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    },
    onPrintBok : function(){
    	exCommon.msgAlert('준비중입니다.');
    },
    onExcel : function(){
    	var me = this;
    	
    	var rd_selectGbn = me.lookupReference('rd_selectGbn').getValue().rd_selectGbn;
    	if(rd_selectGbn == "SELECT"){
    		var grid = me.lookupReference('rec004w_03_a');
        	exCommon.excelDown(grid, 'wepae', '위패현황',  me.getViewModel().getStore('ds_detail').getCount());
    	}else{
    		var grid = me.lookupReference('rec004w_03_c');
        	exCommon.excelDown(grid, 'wepae', '위패번호현황',  me.getViewModel().getStore('ds_eventSeq').getCount());
    	}
    	
    },
    onBudSearch : function(){
    	var me = this;
    	
    	var searchValue = "";
    	var searchgbn   =  me.lookupReference('cb_Stipulation').getExValue();
    	var searchword  =  me.lookupReference('txt_stipulation').getExValue();
    	var flag        = false;
    	
    	if(searchword == ""){
    		setTimeout(function(){
				Ext.Msg.alert('알림',  me.lookupReference('cb_Stipulation').getRawValue() +"를 입력 후 조회 버튼을 눌러주세요.");    				
			},50);
    		me.lookupReference('txt_stipulation').focus();
    		return false;
    	}
    	
    	if(searchgbn == "BUD_NO" && searchword.length < 5){
			for(var a=searchword.length; a<5; a++){
				searchword = "0" + searchword;
			}					
			me.lookupReference('txt_stipulation').setExValue(searchword);
		}
    	
    	
    	searchValue = me.lookupReference('txt_stipulation').getExValue();
		
		var pos   = searchValue.indexOf('5243350001313266');		
		var fCard = searchValue.indexOf('=');
		var bCard = searchValue.lastIndexOf('=');
		var cNum  = searchValue.indexOf('=1234567');
    	
		if( !flag ){
			exCommon.setCustCardNo("");
			
			exCommon.onSindoSearch(
	    		 me.lookupReference('cb_Stipulation')
	    		,me.lookupReference('txt_stipulation')
	    		,me
	    		,me.onBudSearchReceive
	    	);
		}
    },
    onBudSearchReceive : function(params, me){
 
    	var stipulation = me.lookupReference('cb_Stipulation').getExValue();
    	
    	
    	gf_SetBudFind (params, 
			      me.lookupReference('cb_Stipulation'), 
			      me.lookupReference('txt_stipulation'), 
			      me.lookupReference('hid_bud_no'),
			      me.lookupReference('txt_budNo') );
		
		if(stipulation == "BUD_NO"){
    		me.lookupReference('txt_stipulation').setExValue(params.BUD_NO);
    		me.lookupReference('txt_budNo').setExValue(params.BUD_NO);
		}
    },
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onMouseRightClick:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec004w_03_a').getView().getSelectionModel().getSelection();
    	
    	for(var i = 0; i < selectedRecord.length ; i++){
    		var record = selectedRecord[i];
    		var BUD_NO   = record.get("PROPOSAL_BUD_NO");
    		record.set("BUD_NO"  ,BUD_NO);
    	}// for i
    	
    	
    	exCommon.groupPopUp(
       		 me
       		,selectedRecord
       		,me.onReceivePopupYD
       	);
    },
    onReceivePopup:function(params, me){
    	console.log('onReceivePopupID = ');
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearch();
    	}
    },
})
