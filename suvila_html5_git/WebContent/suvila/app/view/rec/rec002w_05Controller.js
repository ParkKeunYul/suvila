Ext.define('ExFrm.view.rec.rec002w_05Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_05',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
		
		// 체크박스
		fn_getBudNo(me, '' , "all");
		
		setTimeout(function(){
    		me.callStore(me, 'ds_GDKindInfo', '', null ,me.dsGdCallback);
    	},50);
    	
    },
    dsGdCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_GDKindInfo').getAt(0).set("PRAY_CODE", "0");
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
    	
    	var cb_date = me.lookupReference('sel_date_gbn').getExValue();
    	
    	
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
    	var cb_date        = me.lookupReference('sel_date_gbn').getExValue();
    	
   		me_AcceptSDate = me_AcceptSDate.substring(0,cb_date);
   		me_AcceptEDate = me_AcceptEDate.substring(0,cb_date);
   		
   		
   		if(new Number(me_AcceptSDate) > new Number(me_AcceptEDate)){
    		exCommon.msgAlert('조회시작일이 조회 종료일보다 큽니다.');
    		me.lookupReference('me_AcceptSDate').focus();
    		return false;
    	}
    	
    	
    	var budno = me.lookupReference('hid_bud_no').getExValue();
    	if(budno != ""){
			budno = budno.substring(0,budno.length-3);
		}
    	var params = {
    		 V_BUD_NO  		: budno
    		,V_DATE_GBN     : cb_date
    		,V_SDATE 		: me_AcceptSDate
    		,V_EDATE 		: me_AcceptEDate
    		,V_PRAY_CODE   	: me.lookupReference('lc_GDKindInfo').getExValue()
    		,V_USER     	: me.lookupReference('lc_templeUser').getExValue()
    		,V_TYPE         : exCommon.getRepVal(me.lookupReference('rdo_ApprovalGbn_r02_05').getValue().rdo_ApprovalGbn_r02_05, 1)
    	}
    	
    	console.log('params= ', params);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		
    		var row = me.getViewModel().getStore('ds_main').getCount();
    		var totAmt = 0;
    		
    		var gd_cnt = 0;
    		var gd_tot = 0;
    		
    		
    		var bs_cnt = 0;
    		var bs_tot = 0;
    		
    		for(var i = 0; i < row ; i++){
    			
    			var gd_amount = me.getViewModel().getStore('ds_main').getAt(i).get("AMOUNT1");
    			var bs_amount = me.getViewModel().getStore('ds_main').getAt(i).get("AMOUNT2");
    			
    			if(gd_amount > 0 ||  (gd_amount == 0 && bs_amount == 0 ) ){
    				gd_cnt ++;
    				gd_tot = parseInt(gd_tot) + gd_amount;
    			}
    			
    			if(bs_amount > 0 ||  (gd_amount == 0 && bs_amount == 0 ) ){
    				bs_cnt ++;
    				bs_tot = parseInt(bs_tot) + bs_amount;
    			}
    			
    		} 
    		
    		me.lookupReference('em_sum_gd').setExValue( gd_tot );
    		
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
        
        var nm    = "기도접수";
        
        
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
    onSearchBlur : function(m2, event, eOpts ){
    	
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    }
})
