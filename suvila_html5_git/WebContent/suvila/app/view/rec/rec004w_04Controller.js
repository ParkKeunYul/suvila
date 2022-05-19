Ext.define('ExFrm.view.rec.rec004w_04Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec004w_04',
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
    		me.callStore(me, 'ds_chonhonKind', '', null ,null);
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
       		,V_SDATE 			: me_AcceptSDate
       		,V_EDATE 			: me_AcceptEDate
       		,V_EVENT_CD  	    : me.lookupReference('lc_KindInfo').getExValue()       		
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
    		me.lookupReference('rec004w_04_a').getView().select(0);
    		me.getViewModel().getStore('ds_MisuAmtWipae').removeAll();
    	}
    },    
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	console.log('onSelectionChange');
    	try{
    		if(record.length <=  0) return;
    		
    		var params = {
    			 V_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
    			,V_SEQ        : record[0].get("SEQ")
    			,V_EVENT_CD   : record[0].get("EVENT_CD")
    			,V_EVENT_DATE : record[0].get("EVENT_DATE")
    			,V_WEPAECNT   : record[0].get("WEPAECNT")
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_MisuAmtWipae', '', params ,me.misuCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    misuCallback : function(me, success, form, action){
    	me.lookupReference('rec004w_04_b').getView().select(0);
    },        
    onExcel : function(){
    	var me = this;
    	
    	var grid = me.lookupReference('rec004w_04_a');
    	exCommon.excelDown(grid, 'wepae', '위패/천혼문 접수내역',  me.getViewModel().getStore('ds_detail').getCount());    	
    },
    onExcelMisu : function(){
    	
    	var me = this;
    	
    	var grid = me.lookupReference('rec004w_04_b');
    	var record = me.lookupReference('rec004w_04_a').getView().getSelectionModel().getSelection()[0];
    	exCommon.excelDown(grid, 'wepae', '위패/천혼문 납부내역('+record.get("PROPOSAL_BUD_NM")+")",  me.getViewModel().getStore('ds_MisuAmtWipae').getCount());
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
})
