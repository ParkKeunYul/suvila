Ext.define('ExFrm.view.acc.acc005w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.acc005w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onDestroy:function(){},
    loadState:[],
    loadStatePoP : function(me){
    	var row = me.loadState.length;
    	for(var i = 0; i<row; i++){
    		me.loadState.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    
    	
    	me.loadState.push(1);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('em_sDate').setExValue(today);
    	me.lookupReference('em_eDate').setExValue(today);
    	
    	
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_iegbn', '', {group_cd : "IEGBN", v_group_cd : "IEGBN"}, null);
    	},10);
    	
    	var params = {
    		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
    		,V_HANG     : "0"
    		,V_MOK      : "0"
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan', '', params, me.kwanCallback);
    	},50);
    	
    },
   /* dsIegbnCallback : function(me, success, form, action){
    	var data = {
    		 "NAME"    : "전체"
    	    ,"CODE"    : "0"
    	};
    	me.getViewModel().getStore('ds_iegbn').insert(0, data);
    	me.lookupReference('lc_iegbn').setValue("0");
    },*/
    kwanCallback : function(me, success, form, action){
    	if(success){
    		var data = {
	    		 "KWAN_NAME" : "전체"
	    	    ,"KWAN"      : "0"
	    	};
    		me.getViewModel().getStore('ds_kwan').insert(0, data);
    		me.lookupReference('lc_kwan').setValue("0");
    		
    		var dataHang = {
   	    		 "HANG_NAME" : "전체"
   	    	    ,"HANG"      : "0"
   	    	};
    		
    		me.getViewModel().getStore('ds_hang').removeAll();
    		me.getViewModel().getStore('ds_hang').insert(0, dataHang);
    		me.lookupReference('lc_hang').setValue("0");
    		
    	}
    	me.loadStatePoP(me);
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var V_ACT_DATE_01  =  me.lookupReference('em_sDate').getExValue();
    	var V_ACT_DATE_02  =  me.lookupReference('em_eDate').getExValue();
    	var DATE_GBN       =  me.lookupReference('sel_date_gbn').getExValue();
    	
    	if(V_ACT_DATE_01.length > DATE_GBN){
    		V_ACT_DATE_01 = V_ACT_DATE_01.substr(0,DATE_GBN);
    	}
    	if(V_ACT_DATE_02.length > DATE_GBN){
    		V_ACT_DATE_02 = V_ACT_DATE_02.substr(0,DATE_GBN);
    	}
    	
    	var params = {
    		 V_SDATE     : V_ACT_DATE_01   	
    		,V_EDATE     : V_ACT_DATE_02
    		,V_DATE_GBN  : me.lookupReference('sel_date_gbn').getExValue()
    		,V_ACCT_GBN  : me.lookupReference('lc_acctGbn').getExValue()
    		,V_IE_GBN    : me.lookupReference('lc_iegbn').getExValue()
    		,V_KWAN      : me.lookupReference('lc_kwan').getExValue()
    		,V_HANG      : me.lookupReference('lc_hang').getExValue()
       	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback);
    	},50);
    },
	onSelectCallback : function(me, success, form, action){
		//console.log(action);
    	if(success){
    		var IE = me.lookupReference('lc_iegbn').getExValue();
    		
    		
    		var text = "세출";
    		if(IE == "I"){
    			text = "세입";
    		}
    		$('#ieSpan').html(text);
    		
    	}
    },
    onIegbnChange : function(){
    	var me = this;
    	
    	console.log('onIegbnChange = ', me.loadState.length);
    	
    	if(me.loadState.length == 0){
    		var params = {
	       		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
	       		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
	       		,V_HANG     : "0"
	       		,V_MOK      : "0"
	       	};
	       	
	       	setTimeout(function(){
	       		me.callStore(me, 'ds_kwan', '', params, me.kwanCallback);
	       	},50);
    	}
    },
    onKwanChange : function(){
    	var me = this;
    	
    	console.log('onKwanChange = ', me.loadState.length);
    	
    	if(me.loadState.length == 0){
    		var params = {
   	       		 V_ACCT_GBN : me.lookupReference('lc_acctGbn').getExValue()
   	       		,V_IE_GBN   : me.lookupReference('lc_iegbn').getExValue()
   	       		,V_KWAN     : me.lookupReference('lc_kwan').getExValue()
   	       	};
    		setTimeout(function(){
	       		me.callStore(me, 'ds_hang', '', params, me.onKwanChangeCallback);
	       	},50);
    	}
    },
    onKwanChangeCallback : function(me, success, form, action){
    	if(success){
    		
    		var dataHang = {
  	    		 "HANG_NAME" : "전체"
  	    	    ,"HANG"      : "0"
  	    	};
    		
    		me.getViewModel().getStore('ds_hang').insert(0, dataHang);
    		me.lookupReference('lc_hang').setValue("0");
    	}
    },
    onDateField : function(){
    	var me = this;
    	
    	var DATE  = me.lookupReference('em_sDate').getExValue();
    	var DATE2 = me.lookupReference('em_eDate').getExValue();
    	
    	
    	var TYPE = me.lookupReference('sel_date_gbn').getExValue();
    	
    	if(TYPE == 8){
    		me.lookupReference('em_sDate').format = "Y-m-d";
    		me.lookupReference('em_eDate').format = "Y-m-d";
    	}else if(TYPE == 6){
    		me.lookupReference('em_sDate').format = "Y-m";
    		me.lookupReference('em_eDate').format = "Y-m";
    	}else{
    		me.lookupReference('em_sDate').format = "Y";
    		me.lookupReference('em_eDate').format = "Y";
    	}
    	
    	me.lookupReference('em_sDate').setExValue(DATE);
    	me.lookupReference('em_eDate').setExValue(DATE2);
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('acc005w_01_a');
    	    	
    	exCommon.excelDown(grid, 'cash', '결산서',  me.getViewModel().getStore('ds_main').getCount());
    },
    onSeriesLabelRender: function (v) {
        return Ext.util.Format.number(v , '0,000');
    },

    onTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml($('#ieSpan').html()+'<br/>마감일 : '+exCommon.getGridDateFormat(record.get('ACT_DATE'), ' / ') + '<br/>금액 : ' +
            Ext.util.Format.number(record.get('AMOUNT'), '0,000'));
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return Ext.util.Format.number(layoutContext.renderer(label) , '0,000');
    },
    onDownload: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('알림', '지원되지 않은 브라우저입니다.');
            return;
        }
        var chart = this.lookup('acc005w_01_graph');

        if (Ext.os.is.Desktop) {
            chart.download({
                filename: '결산서'
            });
        } else {
            chart.preview();
        }
    },

    /*onCheckFalse : function(model, record, index){
    	record.set("CHECK_P", "F");
    },
    onCheckTrue : function(model, record, index){
    	record.set("CHECK_P", "T");
    },*/
})