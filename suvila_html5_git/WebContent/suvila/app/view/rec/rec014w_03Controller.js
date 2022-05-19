Ext.define('ExFrm.view.rec.rec014w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec014w_03',
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
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
		
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
    		me.callStore(me, 'ds_jungak', '', null ,me.dsJungakCallback);
    	},50);
    },     
    dsJungakCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_death_gender', '', null ,null);
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
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	var params = {
    		 V_SEARCH_BUD_NO    : me.lookupReference('hid_bud_no').getExValue()
       		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
       		,V_ACCEPT_SDATE 	: me_AcceptSDate
       		,V_ACCEPT_EDATE 	: me_AcceptEDate
       		,V_REC_USER_ID      : me.lookupReference('lc_templeUser').getExValue()
       		,V_PAY_STATE        : me.lookupReference('lc_payState').getExValue()
       		,V_CLASS_CD     	: me.lookupReference('lc_classMgt').getExValue()
       		,V_AGREE_SHEET_YN	: me.lookupReference('cb_agree_sheet_yn').getExValue()
       		,V_FAMILY_SHEET_YN	: me.lookupReference('cb_family_sheet_yn').getExValue()
       		,V_HOJUK_SHEET_YN	: me.lookupReference('cb_hojuk_sheet_yn').getExValue()
       		,V_JUMIN_SHEET_YN	: me.lookupReference('cb_jumin_sheet_yn').getExValue()
       		,V_JEJUK_SHEET_YN	: me.lookupReference('cb_jejuk_sheet_yn').getExValue()
       		,V_JUNGAK_CD        : me.lookupReference('lc_jungak').getExValue()
       		,V_YOUNG_MEMO       : encodeURI(me.lookupReference('txt_young_memo').getExValue())
       		,V_CANCEL_YN        : me.lookupReference('cb_cancel_sheet_yn').getExValue()
       		,V_EXPORT_YN        : me.lookupReference('cb_export_sheet_yn').getExValue()
       		,V_CNTR_NMBR        : encodeURI(me.lookupReference('txt_cntr_nmbr_search').getExValue())
       	};
    	
		setTimeout(function(){
    		me.callStore(me, 'ds_detail', '', params ,me.onSelectCallback);
    	},50);
    		
    	    	
    },
    onSelectCallback : function(me, success, form, action){
    	console.log('onSelectCallback');
    	if(success){
    		me.lookupReference('rec014w_03_a').getView().select(0);    		
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		var selection = me.lookupReference('rec014w_03_a').getView().getSelectionModel().getSelection()[0];
    		var ACCEPT_SEQ = selection.get("ACCEPT_SEQ"); 
    		var SEQ        = selection.get("SEQ");
    		
    		
    		var params = {
    			 V_TEMPLE_CD  		 : selection.get("TEMPLE_CD")
    			,V_BUD_NO     		 : selection.get("BUD_NO")
    			,V_BUNGA      		 : false
    			,V_SEARCH_ACCEPT_SEQ :selection.get("ACCEPT_SEQ")
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_youngtop_youngga', '', params ,me.dsYoungTopCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsYoungTopCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec014w_03_b').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	
    	var grid = me.lookupReference('rec014w_03_a');
    	exCommon.excelDown(grid, '영탐접수', '영탑접수 접수내역',  me.getViewModel().getStore('ds_detail').getCount());    	
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
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
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
