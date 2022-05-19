Ext.define('ExFrm.view.rec.rec003w_23Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec003w_23',
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
    		me.callStore(me, 'ds_monk', '', null ,me.dsMonkCallback);
    	},50);
    },
    dsMonkCallback : function(me, success, form, action){
    	setTimeout(function(){
          	me.callStore(me, 'ds_bokwigibu', '', null ,null);
        },50);
    	
    	if(success){
    		me.getViewModel().getStore('ds_monk').getAt(0).set("USER_NM", "전체");
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
    bokwiCheckChange : function (comp, rowIndex, checked, eOpts ){
    	var me = this;
    	
    	var cnt = me.getViewModel().getStore('ds_saguJaeBokwi').getCount();
    	
    	for(var i = 0; i < cnt ; i++){
    		
    		if(rowIndex != i){
    			me.getViewModel().getStore('ds_saguJaeBokwi').getAt(i).set("MAIN_BOKWI", false);
    		}else{
    			me.getViewModel().getStore('ds_saguJaeBokwi').getAt(i).set("MAIN_BOKWI", true);
    		}
    		
    	}// for
    },
    onSelect : function(){
    	
    	var me = this;
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	var params = {
    		 V_PAY_STATE    	: me.lookupReference('lc_payState').getExValue()
    		,V_PROPOSAL_BUD_NO  : me.lookupReference('hid_bud_no').getExValue()
       		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
       		,V_ACCEPT_SDATE 	: me_AcceptSDate
       		,V_ACCEPT_EDATE 	: me_AcceptEDate
       		,V_DAMDANG_MONK_ID  : me.lookupReference('lc_damdangMonkNameSagu').getExValue()       		
       		,VV_USER_ID    		: me.lookupReference('lc_templeUser').getExValue()
       		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
       		,V_APPROV       	: me.lookupReference('lc_approv').getExValue()       		
       	};
    	
    	console.log('onSelect = ', params);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_saguJae', '', params ,me.onSelectCallback);
    	},50);    	
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec003w_23_a').getView().select(0);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return;
    		
    		console.log('onSelectionChange = ', record[0]);
    		
    		var params = {
    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
    			,V_SEQ        : record[0].get("SEQ")
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_saguJaeKind', '', params ,me.dsSaguCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    dsSaguCallback : function(me, success, form, action){
    	if(success){
    		setTimeout(function(){
        		me.callStore(me, 'ds_saguJaeSpirit', '', action._params ,me.dsSaguDeathCallback);
        	},50);
    	}
    },
    dsSaguDeathCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_saguJaeBokwi', '', action._params ,me.dsSaguBokwiCallback);
    	},50);
    },
    dsSaguBokwiCallback : function(me, success, form, action){
    	me.lookupReference('rec003w_23_d').getView().select(0);
    },
    onEditKind : function(editor, context, eOpts) {
    	var me = this;
    	if(context.field == 'EVENT_TIME'){
    		var EVENT_TIME = exCommon.getRepVal(me.getViewModel().getStore('ds_saguJaeKind').getAt(context.rowIdx).get("EVENT_TIME"),"");
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
    		me.getViewModel().getStore('ds_saguJaeKind').getAt(context.rowIdx).set("EVENT_TIME",EVENT_TIME);
    	}
    },
    onSaveKind : function(){
    	
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    			 me
    			,'ds_saguJaeKind'
    			,'newData'
    			,'uptData'
    			,'delData'
    			,'/rec/REC003W_23/saveSaguJaeKind.suvila'
    			,me.onSaveKindCallback
    	);
    },
    onSaveKindCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success , action , 'ds_saguJaeKind' );
    	if( success ){
    		
    	}
    },
    onSaveYoungga : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    			 me
    			,'ds_saguJaeSpirit'
    			,'newData'
    			,'uptData'
    			,'delData'
    			,'/rec/REC003W_23/saveYoungga.suvila'
    			,me.onSaveYounggaCallback
    	);
    },
    onSaveYounggaCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success , action , 'ds_saguJaeSpirit' );    	
    },
    inFnValidate : function(me){
    	
    	
    	var row = me.getViewModel().getStore('ds_saguJaeBokwi').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_saguJaeBokwi').getAt(i);
    		
    		if( !exCommon.gridFormVal(me , i , 'ds_saguJaeBokwi' , 'rec003w_23_d' , "BOKWEJA_NM"    , '복위자명' ) ){
				return false;
			}
    		
    	}// row_kd
    	
    	
    	return true;
    },
    onSaveBok : function(){
    	var me = this;
    	
    	
    	var cnt = exCommon.ChangeCount('ds_saguJaeBokwi', me);
    	if(cnt == 0){
    		Ext.Msg.alert('알림', '변경된 자료가 없습니다.');
    		return;
    	}
    	
    	if(me.inFnValidate(me)){
    		var row = me.getViewModel().getStore('ds_saguJaeBokwi').getCount();
        	
        	var jsonNewData = [];
        	me.lookupReference('newData').setExValue("");
        	for(var i = 0; i < row ; i++){
        		jsonNewData.push(me.getViewModel().getStore('ds_saguJaeBokwi').getAt(i).data);
        		
        		if(i == 0){
        			me.lookupReference('ACCEPT_SEQ').setExValue( me.getViewModel().getStore('ds_saguJaeBokwi').getAt(i).data.ACCEPT_SEQ );
        			me.lookupReference('SEQ').setExValue( me.getViewModel().getStore('ds_saguJaeBokwi').getAt(i).data.SEQ );
        		}
        	}// for i    	
        	
        	
        	console.log('newData = ', me.lookupReference('newData').getExValue() );
        	
        	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
        		if (btn == 'yes') {
        			
        			me.lookupReference('newData').setExValue("");
        			me.lookupReference('newData').setExValue(Ext.encode(jsonNewData));
        			
        			setTimeout(function(){
        				me.callForm(me, '/rec/REC003W_23/saveBokwi.suvila', me.onSaveCallback , false);
        			},50);	
        		}
        	});
        	
        	
    	}
    	/*exCommon.fnGridSaveAll(
    			 me
    			,'ds_saguJaeBokwi'
    			,'newData'
    			,'uptData'
    			,'delData'
    			,'/rec/REC003W_23/saveBokwi.suvila'
    			,me.onSaveBokCallback
    	);*/
    },
    onSaveBokCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback( me, success , action , 'ds_saguJaeBokwi' );    	
    },
    onDelBok : function(){
    	var me = this;
    	
    	exCommon.gridRemove(
    		 me
    		,'rec003w_23_d'
    		,'ds_saguJaeBokwi'    		
    	);
    	
    },
    onAddBok : function (){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('rec003w_23_a').getView().getSelectionModel().getSelection()[0];
    	
    	console.log(selectedRecord);
    	
    	var bokCnt = me.getViewModel().getStore('ds_saguJaeBokwi').getCount();
    	
    	var data = {
    		 ACCEPT_SEQ     : selectedRecord.data.ACCEPT_SEQ
    		,SEQ 		    : selectedRecord.data.SEQ
    		,BOKWI_KIBU_GBN : me.getViewModel().getStore('ds_bokwigibu').getAt(0).get("CODE")
    		,SORT_SEQ 	    : me.getViewModel().getStore('ds_saguJaeBokwi').getAt(bokCnt-1).get("SORT_SEQ") + 1
    	};
    	    	
    	
    	me.getViewModel().getStore('ds_saguJaeBokwi').add(data);
    	me.lookupReference('rec003w_23_d').getView().select(bokCnt);
    },
    oBokUp : function(){
    	var me = this;
    	
    	
    	var rowCnt = me.getViewModel().getStore('ds_saguJaeBokwi').getCount();
    	if(rowCnt == 0 || rowCnt == 1){
    		return false;
    	}
    	var selection = me.lookupReference('rec003w_23_d').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec003w_23_d').getStore().indexOf(selection);
    	
    	if(_idx == 0){
			return false;
		}
    	
    	var upRecord    = me.lookupReference('rec003w_23_d').getStore().getAt(_idx-1);
    	var upSortSeq   = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_saguJaeBokwi').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    },
    oBokDown : function(){
    	var me = this;
    	
    	
    	var _tCnt = me.getViewModel().getStore('ds_saguJaeBokwi').getCount();
    	if(_tCnt == 0 || _tCnt == 1){
    		return false;
    	}
    	var selection = me.lookupReference('rec003w_23_d').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec003w_23_d').getStore().indexOf(selection);
    	
    	
    	if(_tCnt == (_idx+1) ){
    		return false;
    	}
    	
    	var downRecord   = me.lookupReference('rec003w_23_d').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_saguJaeBokwi').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('rec003w_23_a');
    	exCommon.excelDown(grid, 'jesa49', '49재',  me.getViewModel().getStore('ds_saguJae').getCount());
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
    onPrintBok : function(){
    	var me  = this;
    	
    	if(me.getViewModel().getStore('ds_saguJae').getCount() <= 0){
    		exCommon.msgAlert('검색결과가 없습니다.');
    		return;
    	}
    	
    	var selectedRecord = me.lookupReference('rec003w_23_a').getView().getSelectionModel().getSelection()[0];
    	
    	console.log(selectedRecord.data);
    	
    	
    	me.openPopup('ExFrm.view.rec.rec000p_02_5',  selectedRecord.data, null);
    	
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearch();
    	}
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
})
