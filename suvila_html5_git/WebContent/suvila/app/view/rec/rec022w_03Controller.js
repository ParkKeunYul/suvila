Ext.define('ExFrm.view.rec.rec022w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec022w_03',
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
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(7) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
		
		// 체크박스
		fn_getBudNo(me, '' , "all");
    	
    },
    dspayStateCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null ,me.dstempleUserCallback);
    	},50);
    	
    	if(success){
    		me.getViewModel().getStore('ds_payState').getAt(0).set("NAME", "전체");
    	}    	
    },
    dstempleUserCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.dsclassMgtCallback);
    	},50);
    },
    dsclassMgtCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_JGKindInfo', '', null ,me.dsJgCallback);
    	},50);
    	//ds_yn_gbn
    },
    dsJgCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_KindInfo', '', null ,me.dsKCallback);
    	},50);
    },
    dsKCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_yn_gbn', '', null ,null);
    	},50);
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
    	
    	var params ="";
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	
    	var params = {
    		 V_PAY_STATE    	: me.lookupReference('lc_payState').getExValue()
    		,V_PROPOSAL_BUD_NO  : me.lookupReference('hid_bud_no').getExValue()
       		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
       		,V_ACCEPT_SDATE 	: me_AcceptSDate
       		,V_ACCEPT_EDATE 	: me_AcceptEDate
       		,V_JUNGAK_CD      	: me.lookupReference('lc_JungakInfo').getExValue()
       		,V_CODE      		: me.lookupReference('lc_KindInfo').getExValue()
       		,VV_USER_ID    		: me.lookupReference('lc_templeUser').getExValue()
       		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
       	};
    	
		setTimeout(function(){
    		me.callStore(me, 'ds_detail', '', params ,me.onSelectCallback);
    	},50);
    		
    	    	
    },
    onSelectCallback : function(me, success, form, action){
    	console.log('onSelectCallback');
    	if(success){
    		me.lookupReference('rec022w_03_a').getView().select(0);    		
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
       			,V_SEQ 		  : record[0].get("SEQ")
       			,V_ACCEPT_GBN : record[0].get("ACCEPT_GBN")
       			,V_JUNGAK_CD  : record[0].get("JUNGAK_CD")
       			,V_LIGHT_NO   : record[0].get("LIGHT_NO")
       		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_DongChamJa', '', params ,me.dsDongCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    dsDongCallback : function(me, success, form, action){
    	me.lookupReference('rec022w_03_b').getView().select(0);
    },
    onExcel : function(){
    	var me = this;
    	
    	var grid = me.lookupReference('rec022w_03_a');
    	exCommon.excelDown(grid, 'wonbul', '월불/봉안 접수내역',  me.getViewModel().getStore('ds_detail').getCount());    	
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
    onDongchamUp : function(){
    	var me = this;
    	
    	var store_nm = "ds_DongChamJa";
    	var grid_nm  = "rec022w_03_b";
    	
    	
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
    	
    	
    	var store_nm = "ds_DongChamJa";
    	var grid_nm  = "rec022w_03_b";
    	
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
    onAdd : function(){
    	var me = this;
    	
    	var store_nm     = "ds_DongChamJa";
    	var grid_nm      = "rec022w_03_b";
    	var store_nm_rec = "ds_detail";
    	var grid_nm_rec  = "rec022w_03_a"; 
    	
    	if( me.getViewModel().getStore(store_nm_rec).getCount() <= 0 ){
    		return false;
    	}// if rec count
    	    	
    	var selection       = me.lookupReference(grid_nm_rec).getView().getSelectionModel().getSelection()[0];    	
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
		
		console.log('PROPOSAL_BUD_NO = ', PROPOSAL_BUD_NO.substring(3,8));
		
		
		exCommon.onSindoSearch(
		     search_type
    		,PROPOSAL_BUD_NO.substring(3,8)
    		,me
    		,me.onAddReceive
    		,v_gbn   
    	);
    },
    onAddReceive : function(params, me){
    	
    	var store_nm     = "ds_DongChamJa";
    	var grid_nm      = "rec022w_03_b";
    	var store_nm_rec = "ds_detail";
    	var grid_nm_rec  = "rec022w_03_a"; 
    	
    	
    	var findRecord = me.getViewModel().getStore(store_nm).findRecord('DONGCHAM_BUD_NO', params.BUD_NO, 0, false, true, true);
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
    onDelete : function(){
    	var me 		= this;
    	var row     = me.getViewModel().getStore('ds_DongChamJa').getCount();
    	
    	if(row <= 0){
    		return;
    	}
    	
    	if(row  == 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '마지막 동참자는 삭제 할 수 없습니다.');    				
    		},50);
    		return;
    	}else{
    		exCommon.gridRemove(me ,'rec022w_03_b' , 'ds_DongChamJa' );
    	}
    	
    },
    onSave : function(){
    	var me = this;
    	
    	if( exCommon.ChangeCount('ds_DongChamJa' , me) <=0 ){
    		exCommon.msgAlert("변경된 자료가 없습니다.");
    		return;
    	}
    	
    	var rowCnt = me.getViewModel().getStore('ds_DongChamJa').getCount();
    	var jsonNewData = [];
    	for(var i =0; i < rowCnt ; i++){
    		jsonNewData.push(me.getViewModel().getStore('ds_DongChamJa').getAt(i).data );
    	}// for
    	
    	me.lookupReference('newData').setExValue(Ext.encode(jsonNewData));   
    	var selection = me.lookupReference('rec022w_03_a').getView().getSelectionModel().getSelection()[0];
    	
    	var params = "V_ACCEPT_GBN="  + selection.get("ACCEPT_GBN")
			       + "&V_ACCEPT_SEQ=" + selection.get("ACCEPT_SEQ")
			       + "&V_SEQ="        + selection.get("SEQ")
			       + "&V_JUNGAK_CD="  + selection.get("JUNGAK_CD")
			       + "&V_LIGHT_NO="   + selection.get("LIGHT_NO");
    	
    	Ext.MessageBox.confirm('알림', "저장 하시겠습니까?" , function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/rec/REC001W_03/save.suvila?'+params, me.onSaveCallback , false);
    			},10);	
    		}
    	});
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action, 'ds_DongChamJa');
    	
    	if( success ){
    		var selection = me.lookupReference('rec022w_03_a').getView().getSelectionModel().getSelection()[0];
    		var params = {
       			 V_ACCEPT_SEQ : selection.get("ACCEPT_SEQ")
       			,V_SEQ 		  : selection.get("SEQ")
       			,V_ACCEPT_GBN : selection.get("ACCEPT_GBN")
       			,V_JUNGAK_CD  : selection.get("JUNGAK_CD")
       			,V_LIGHT_NO   : selection.get("LIGHT_NO")
       		};
    		setTimeout(function(){
    			me.callStore(me, 'ds_DongChamJa', '', params ,null);
			},50);	
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
