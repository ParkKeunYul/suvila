Ext.define('ExFrm.view.rec.rec001w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec001w_03',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
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
    	
    	
    	
    	me.lookupReference('me_AcceptSDateID').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDateID').setExValue( today );
		
		// 체크박스
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
    	
    },
    dstempleUserCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.dsaJkindnCallback);
    	},50);
    },    
    dsaJkindnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDJGKindInfo', '', null ,me.dsIdJungakCallback);
    	},50);    	    	
    },
    dsIdJungakCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDKindInfo', '', null ,me.dsIDKindInfoCallback);
    	},50);
    },
    dsIDKindInfoCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_YDJGKindInfo', '', null ,me.dsYDJGKindInfoCallback);
    	},50);
    },
    dsYDJGKindInfoCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_YDKindInfo', '', null ,null);
    	},50);
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearch();
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
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSelect : function(){
    	var me = this;
    	
        	
		var V_ACCEPT_SDATE = me.lookupReference('me_AcceptSDateID').getExValue();
    	var V_ACCEPT_EDATE = me.lookupReference('me_AcceptEDateID').getExValue();
		
    	if(new Number(V_ACCEPT_SDATE) > new Number(V_ACCEPT_EDATE)){
    		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
    		me.lookupReference('me_AcceptSDateID').focus();
    		return false;
    	}
		
		
    	var params = {
    		 V_PAY_STATE     	: exCommon.getRepVal(me.lookupReference('lc_payState').getExValue(), '')
    		,V_PROPOSAL_BUD_NO  : exCommon.getRepVal(me.lookupReference('txt_budNo').getExValue(), '')
    		,V_ACCEPT_SDATE 	: exCommon.getRepVal(me.lookupReference('me_AcceptSDateID').getExValue(), '')
    		,V_ACCEPT_EDATE    	: exCommon.getRepVal(me.lookupReference('me_AcceptEDateID').getExValue(), '')
    		,V_CODE        		: exCommon.getRepVal(me.lookupReference('lc_IDKindInfo').getExValue(), '')
    		,V_JUNGAK_CD       	: exCommon.getRepVal(me.lookupReference('lc_IDJungakInfo').getExValue(), '')
    		,VV_USER_ID    		: exCommon.getRepVal(me.lookupReference('lc_templeUser').getExValue(), '')
    		,V_APPROV     		: exCommon.getRepVal(me.lookupReference('lc_approv').getExValue(), '')
    		,V_CLASS_CD     	: exCommon.getRepVal(me.lookupReference('lc_classMgt').getExValue(), '')
    		,V_CLOSE_YN     	: exCommon.getRepVal(me.lookupReference('lc_IDCloseYn').getExValue(), '')
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDRec', '', params ,me.onSelectCallback);
    	},10);
    
    	
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec001w_03_a').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	
		var grid = me.lookupReference('rec001w_03_a');
    	exCommon.excelDown(grid, 'ID', '인등접수조회',  me.getViewModel().getStore('ds_IDRec').getCount());	
    },
    onSaveGD : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(
    			 me
    			,'ds_GDRec'
    			,'newData'
    			,'uptData'
    			,'delData'
    			,'/rec/rec001w_03/saveGD.suvila'
    			,me.onSaveGDCallback
    	);
    },
    onSaveGDCallback : function(me, success, form, action){
    	if( success ){
    		exCommon.fnGridSaveCallback( me, success , action , 'ds_GDRec' );
    	}
    },
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onBeforeeditGD : function(editor, context, eOpts ){
    	var me = this;
    	
    	var PER_BUD_NO  = exCommon.getRepVal(me.lookupReference('rec001w_03_a').getStore().getAt(context.rowIdx).get("PER_BUD_NO"), "");
    	if( PER_BUD_NO != "" ){
    		return true;
    	}
    	return false;
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	
    	var me = this;
    	
    	try{
    		
    		if(record.length <=  0) return;
    		
    		
    		var V_ACCEPT_GBN = record[0].get("ACCEPT_GBN");
    		
    		var params = {
    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
    			,V_SEQ 		  : record[0].get("SEQ")
    			,V_ACCEPT_GBN : record[0].get("ACCEPT_GBN")
    			,V_JUNGAK_CD  : record[0].get("JUNGAK_CD")
    			,V_LIGHT_NO   : record[0].get("LIGHT_NO")
    		};
    		
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_DongChamJaID', '', params ,null);
        	},10);
    		
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    onDongchamUp : function(){
    	var me = this;
    	
    	
    	var store_nm = "ds_DongChamJaID";
    	var grid_nm  = "rec001w_03_aa";
    	
    	var rowCnt = me.getViewModel().getStore(store_nm).getCount();
    	if(rowCnt == 0 || rowCnt == 1){
    		return false;
    	}
    	var selection = me.lookupReference(grid_nm).getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference(grid_nm).getStore().indexOf(selection);
    	
    	if(_idx == 0){
			return false;
		}
    	
    	var upRecord    = me.lookupReference(grid_nm).getStore().getAt(_idx-1);
    	var upSortSeq   = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore(store_nm).sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    },
    onDongchamDown : function(){
    	var me = this;
    	
    	
    	var store_nm = "ds_DongChamJaID";
    	var grid_nm  = "rec001w_03_aa";
    	
    	var _tCnt = me.getViewModel().getStore(store_nm).getCount();
    	if(_tCnt == 0 || _tCnt == 1){
    		return false;
    	}
    	var selection = me.lookupReference(grid_nm).getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference(grid_nm).getStore().indexOf(selection);
    	
    	
    	if(_tCnt == (_idx+1) ){
    		return false;
    	}
    	
    	var downRecord   = me.lookupReference(grid_nm).getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore(store_nm).sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    },
    onDelete : function(){
    	var me = this;
    	
    	
    	
    	var store_nm = "ds_DongChamJaID";
    	var grid_nm  = "rec001w_03_aa";
    	
    	
    	var row        = me.getViewModel().getStore(store_nm).getCount();
    	
    	if(row <= 0){
    		return;
    	}
    	
    	if(row  == 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '마지막 동참자는 삭제 할 수 없습니다.');    				
    		},50);
    		return;
    	}else{
    		exCommon.gridRemove(me ,grid_nm , store_nm );
    	}
    	
    },
    onSave : function(){
    	var me = this;
    	
    	
    	var store_nm = "ds_DongChamJaID";
    	var grid_nm  = "rec001w_03_aa";
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,store_nm
    		,'newData'
    		,'uptData'
    		,'delData'
    		,me.onSaveCallback
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	
    	var store_nm = "ds_DongChamJaID";
    	var grid_nm  = "rec001w_03_aa";
    	
    	
    	
    	exCommon.fnGridSaveCallback(me, success , action , store_nm);
    	if(success){
    		
    		
    	}
    },
    onAdd : function(){
    	var me = this;
    	
    	
    	var store_nm = "ds_DongChamJaID";
    	var grid_nm  = "rec001w_03_aa";
    	
    	var store_nm_rec = "ds_IDRec";
    	var grid_nm_rec  = "rec001w_03_a"; 
    	
    	
    	if( me.getViewModel().getStore(store_nm_rec).getCount() <= 0 ){
    		return false;
    	}// if rec count
    	
    	
    	var selection = me.lookupReference(grid_nm_rec).getView().getSelectionModel().getSelection()[0];
    	
    	console.log('selection = ', selection);
    	
    	var FAMILY_YN 		= selection.get("FAMILY_YN");
    	var DECE_GBN  	    = selection.get("DECE_GBN");
    	var PROPOSAL_BUD_NO = selection.get("PROPOSAL_BUD_NO");
    	
    	if(FAMILY_YN != 'T'){
    		Ext.Msg.alert('알림', '해당 등은 동참자를 추가 할 수 없습니다.');
    		return  false;
    	}
    	
    	var ds_DongChamJa =  store_nm;
		var v_gbn         = "DONGCHAM";
		var search_type   = 'BUD_NO';
		
		if(DECE_GBN == "T"){
			v_gbn = "DONGCHAM_DECE";
		}
		
		exCommon.onSindoSearch(
		     search_type
    		,PROPOSAL_BUD_NO.substring(3,8)
    		,me
    		,me.onAddReceive
    		,v_gbn   
    	);
    },
    onAddReceive : function(params, me){
    	
    	console.log('onAddReceive = ', params);
    	
    	
    	var store_nm = "ds_DongChamJaID";
    	var grid_nm  = "rec001w_03_aa";
    	
    	var store_nm_rec = "ds_IDRec";
    	var grid_nm_rec  = "rec001w_03_a"; 
    	
    	
    	var findRecord = me.getViewModel().getStore(store_nm).findRecord('DONGCHAM_BUD_NO', params.BUD_NO, 0, false, true, true);
    	
    	console.log('findRecord = ', findRecord);
    	
    	if(findRecord != null){
    		exCommon.msgAlert("동일한 신도가 존재합니다.");
    		return;
    	};
    	
    	
    	
    	var selection = me.lookupReference(grid_nm_rec).getView().getSelectionModel().getSelection()[0];
    	var data = {
    		 TEMPLE_CD       : selection.get("TEMPLE_CD")
    		,ACCEPT_SEQ      : selection.get("ACCEPT_SEQ")
    		,SEQ             : selection.get("SEQ")
    		,ACCEPT_GBN      : selection.get("ACCEPT_GBN")
    		,JUNGAK_CD       : selection.get("JUNGAK_CD")
    		,LIGHT_NO        : selection.get("LIGHT_NO")
    		,SORT_SEQ        : (me.getViewModel().getStore(store_nm).getCount() +1)
    		,DONGCHAM_BUD_NO : params.BUD_NO
    		,NAME_KOR        : params.NAME_KOR
    		,BOKWIJA_NO      : params.BOKWIJA_NO
    		,BOKWIJA_NM      : params.BOKWIJA_NM
    	};
    	me.getViewModel().getStore(store_nm).add(data);
    	
    	var cnt = me.getViewModel().getStore(store_nm).getCount();     	
    	me.lookupReference(grid_nm).getView().select(cnt-1);
    },
    onSave : function(){
    	var me = this;
    	
    	var store_nm     = "ds_DongChamJaID";
    	var grid_nm      = "rec001w_03_aa";
    	var store_nm_rec = "ds_IDRec";
    	var grid_nm_rec  = "rec001w_03_a";
    	
    	
    	if( exCommon.ChangeCount(store_nm , me) <=0 ){
    		exCommon.msgAlert("변경된 자료가 없습니다.");
    		return;
    	}
    	
    	
    	var rowCnt = me.getViewModel().getStore(store_nm).getCount();
    	var jsonNewData = [];
    	
    	
    	console.log('store_nm = ', store_nm);
    	for(var i =0; i < rowCnt ; i++){
    		jsonNewData.push(me.getViewModel().getStore(store_nm).getAt(i).data );
    	}// for
    	
    	me.lookupReference('newData').setExValue(Ext.encode(jsonNewData));   
    	
    	var selection = me.lookupReference(grid_nm_rec).getView().getSelectionModel().getSelection()[0];
    	
    	
    	var params = "V_ACCEPT_GBN=" + selection.get("ACCEPT_GBN")
    		       + "&V_ACCEPT_SEQ=" + selection.get("ACCEPT_SEQ")
    		       + "&V_SEQ=" + selection.get("SEQ")
    		       + "&V_JUNGAK_CD=" + selection.get("JUNGAK_CD")
    		       + "&V_LIGHT_NO=" + selection.get("LIGHT_NO");
    	
    	console.log('params = ', params);
    	
    	Ext.MessageBox.confirm('알림', "저장 하시겠습니까?" , function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/rec/REC001W_03/save.suvila?'+params, me.onSaveCallback , false);
    			},10);	
    		}
    	});
    	
    },
    onSaveCallback : function(me, success, form, action){ 
    	
    	
    	var store_nm     = "ds_DongChamJaID";
    	var grid_nm      = "rec001w_03_aa";
    	var store_nm_rec = "ds_IDRec";
    	var grid_nm_rec  = "rec001w_03_a";
    	
    	
    	exCommon.fnGridSaveCallback(me, success, action, store_nm);
    	if(success){
    		
    		var selection = me.lookupReference(grid_nm_rec).getView().getSelectionModel().getSelection();
    		
    		var V_ACCEPT_GBN = selection[0].get("ACCEPT_GBN");
    		var params = {
    			 V_ACCEPT_SEQ : selection[0].get("ACCEPT_SEQ")
    			,V_SEQ 		  : selection[0].get("SEQ")
    			,V_ACCEPT_GBN : selection[0].get("ACCEPT_GBN")
    			,V_JUNGAK_CD  : selection[0].get("JUNGAK_CD")
    			,V_LIGHT_NO   : selection[0].get("LIGHT_NO")
    		};
    		setTimeout(function(){
    			if(V_ACCEPT_GBN == "2"){
    				me.callStore(me, 'ds_DongChamJaID', '', params ,null);
    			}else{
    				me.callStore(me, 'ds_DongChamJaYD', '', params ,null);
    			}
        	},10);
    	}
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	console.log('onSearchBlur = ');
    	exCommon.onSearchBlur(
    		 me
    		,m2
    		,'hid_bud_no'
    		,'txt_budNo'
    	);
    },
    onMouseRightClickID:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	
    	var selectedRecord = me.lookupReference('rec001w_03_a').getView().getSelectionModel().getSelection();
    	
    	for(var i = 0; i < selectedRecord.length ; i++){
    		var record = selectedRecord[i];
    		var BUD_NO   = record.get("PROPOSAL_BUD_NO");
    		
    		record.set("BUD_NO"  ,BUD_NO);
    	}// for i
    	
    	console.log(selectedRecord.length);
    	
    	exCommon.groupPopUp(
    		 me
    		,selectedRecord
    		,me.onReceivePopupID
    	);
    },
    onReceivePopupID:function(params, me){
    	console.log('onReceivePopupID = ');
    },
    onMouseRightClickYD:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var selectedRecord = me.lookupReference('rec001w_03_b').getView().getSelectionModel().getSelection();
    	
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
    onReceivePopupYD:function(params, me){
    	console.log('onReceivePopupID = ');
    },
    
})
