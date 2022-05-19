Ext.define('ExFrm.view.rec.rec003w_25Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec003w_25',
    onSearch:function(params){
        var me = this;
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeUser', '', null ,me.dstempleUserCallback);
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
    dstempleUserCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_monk', '', null ,me.dsMonkCallback);
    	},50);
    },  
    dsMonkCallback : function(me, success, form, action){    	
    	
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
    	
    	if(cb_date == 8){
    		me.lookupReference('me_AcceptSDate').format = "Y-m-d";
    		me.lookupReference('me_AcceptEDate').format = "Y-m-d";
    	}else if(cb_date == 6){
    		me.lookupReference('me_AcceptSDate').format = "Y-m";
    		me.lookupReference('me_AcceptEDate').format = "Y-m";
    	}else{
    		me.lookupReference('me_AcceptSDate').format = "Y";
    		me.lookupReference('me_AcceptEDate').format = "Y";
    	}
    	
    	me.lookupReference('me_AcceptSDate').setExValue( me_AcceptSDate );
		me.lookupReference('me_AcceptEDate').setExValue( me_AcceptEDate );
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
    onAxisLabelRender: function (axis, label, layoutContext) {
    	var value = layoutContext.renderer(label);
        return value === 0 ? '0' : Ext.util.Format.number(value, '0,000');
    },

    onSeriesLabelRender: function (value) {
    	return '';
    },
    onGridColumnRender: function (v) {
        return Ext.util.Format.number(v, '0,000');
    },
    onTooltipRender: function (tooltip, record, item) {
        var onField = item.field;
        
        var nm    = "49재";
              
        
        
        
        var cmsTypeTot = record.get(onField);
        if(cmsTypeTot == undefined){
        	cmsTypeTot = 0;
        }
        
        var yyyymmdd = record.get('SUB_DATE').substr(0,4) + "년" + record.get('SUB_DATE').substr(4,2)+"월" + record.get('SUB_DATE').substr(6,2) +"일";
        
        
    	tooltip.setHtml(nm + "<br/>수납일 : " +yyyymmdd+ '<br/>금<span style="display:inline-block;width:10px;"> </span> 액 : ' + Ext.util.Format.number(cmsTypeTot, '0,000') );
    },
    onStackedToggle: function (segmentedButton, button, pressed) {
        var chart = this.lookupReference('rec002w_05_a'),
            series = chart.getSeries()[0],
            value = segmentedButton.getValue();
        series.setStacked(value === 0);
        chart.redraw();
    },
    onSelect : function(){
    	var me = this;
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	var params = {
    		 V_BUD_NO  			: me.lookupReference('hid_bud_no').getExValue()
       		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
       		,V_SDATE 			: me_AcceptSDate
       		,V_EDATE 			: me_AcceptEDate
       		,V_MONK_ID          : me.lookupReference('lc_damdangMonkNameSagu').getExValue()       		
       		,VV_USER    		: me.lookupReference('lc_templeUser').getExValue()
       	};
    	
    	setTimeout(function(){    		
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},50);
    	
    },
    onSelectCallback : function(me, success, form, action){
    	var row = me.getViewModel().getStore('ds_main').getCount();
		var totAmt = 0;
		for(var i = 0; i < row ; i++){
			totAmt = parseInt(totAmt) + parseInt( me.getViewModel().getStore('ds_main').getAt(i).get("AMOUNT1") ); 
		}//
		
		me.lookupReference('em_sum').setExValue( totAmt );
    }
})
