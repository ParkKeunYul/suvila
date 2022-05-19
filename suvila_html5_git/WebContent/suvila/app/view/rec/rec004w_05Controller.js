Ext.define('ExFrm.view.rec.rec004w_05Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec004w_05',
    onSearch:function(params){
        var me = this;
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_chonhonKind', '', null ,me.dsChohonCallback);
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
    dsChohonCallback : function(me, success, form, action){
    	console.log('333');
    	if(success){
    		me.getViewModel().getStore('ds_chonhonKind').getAt(0).set("EVENT_CD", "전체");
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null, null);
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
    onDateField : function(){
    	
    	var me = this;
    	
    	var cb_date = me.lookupReference('cb_date').getExValue();
    	
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	
    	if(cb_date == 8){
    		me.lookupReference('me_AcceptSDate').format = "Y-m-d";
    		me.lookupReference('me_AcceptEDate').format = "Y-m-d";
    	}else if(cb_date == 4){
    		me.lookupReference('me_AcceptSDate').format = "Y";
    		me.lookupReference('me_AcceptEDate').format = "Y";
    	}else{
    		me.lookupReference('me_AcceptSDate').format = "Y-m";
    		me.lookupReference('me_AcceptEDate').format = "Y-m";
    	}
    	
    	me.lookupReference('me_AcceptSDate').setExValue( me_AcceptSDate );
		me.lookupReference('me_AcceptEDate').setExValue( me_AcceptEDate );
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSelect : function(){
    	var me = this;
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
   		me_AcceptSDate = me_AcceptSDate.substring(0,cb_date);
   		me_AcceptEDate = me_AcceptEDate.substring(0,cb_date);
    	
    	console.log(me_AcceptSDate , me_AcceptEDate);
    	
    	var params = {
    		 V_BUD_NO  		: me.lookupReference('hid_bud_no').getExValue()
    		,V_DATE_GBN     : me.lookupReference('cb_date').getExValue()
    		,V_SDATE 		: me_AcceptSDate
    		,V_EDATE 		: me_AcceptEDate
    		,V_EVENT_CD   	: me.lookupReference('lc_KindInfo').getExValue()
    		,VV_USER_ID   	: me.lookupReference('lc_templeUser').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		
    		var row = me.getViewModel().getStore('ds_main').getCount();
    		var totAmt = 0;
    		for(var i = 0; i < row ; i++){
    			totAmt = parseInt(totAmt) + parseInt( me.getViewModel().getStore('ds_main').getAt(i).get("AMOUNT1") ); 
    		}// 
    		
    		me.lookupReference('em_ave').setExValue( totAmt/row );
    		me.lookupReference('em_sum').setExValue( totAmt );
    		
    	}
    },    
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onSeriesLabelRender: function (v) {
    	 return Ext.util.Format.number(v, '0,000');
    },

    onTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml("위패접수 "+ exCommon.getGridDateFormat(record.get('SUB_DATE'), "/",8) + ': ' +record.get('AMOUNT1')+"원");
            
    },
    onAxisLabelRender: function (axis, label, layoutContext) {
        return Ext.util.Format.number(layoutContext.renderer(label) , '0,000');
    }
})
