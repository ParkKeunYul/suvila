Ext.define('ExFrm.view.cms.cms004w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cms004w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	
    	var me = this;
    	var nowDate = exCommon.getNowDate();
    	if(new Number( nowDate.substr(0,2) ) < 8 ){
    		me.lookupReference('em_sDate').setDateValue( exCommon.getDateAddDate(-7, null, nowDate ));
    	}else{
    		me.lookupReference('em_sDate').setDateValue( exCommon.getNowMonth() + "01"  );
    	}
    	me.lookupReference('em_eDate').setDateValue( nowDate );
    	
    	
    },
    onSelect : function (){
    	var me =this;
    	
    	var params = {
    		 V_CMS_TRADE_CD : me.lookupReference('lc_cms_trade_cd').getExValue()
    		,V_DATE_GBN     : me.lookupReference('sel_date_gbn').getExValue()
    		,V_SDATE        : me.lookupReference('em_sDate').getDateValue(  )
    	    ,V_EDATE        : me.lookupReference('em_eDate').getDateValue(  )
    	};
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onSelectCallback)
		},100);  
    	
    },
    onSelectCallback : function(me, success, res, record){
    	
    	console.log('success = ', success);
    	console.log('res.length', res.length);
    	
    	if(success && res.length > 0){
    		
    		console.log('1');
    		
    		var vSA=0;
    		var vSC=0;
    		var vFA=0;
    		var vFC=0;
    		for(var i =0; i<res.length ; i++){
    			
    			if(res[i].get("AMOUNT1") != undefined){
    				vSA += new Number(res[i].get("AMOUNT1"));
    			}
    			if(res[i].get("COUNT1") != undefined){
    				vSC += new Number(res[i].get("COUNT1"));
    			}
    			
    			if(res[i].get("AMOUNT2") != undefined){
    				vFA += res[i].get("AMOUNT2");
    			}
    			if(res[i].get("COUNT2") != undefined){
    				vFC += new Number(res[i].get("COUNT2"));
    			}
    		}// for
    		
    		me.lookupReference('em_SAsum').setExValue( vSA );
    		me.lookupReference('em_SCsum').setExValue( vSC );
    		me.lookupReference('em_FAsum').setExValue( vFA );
    		me.lookupReference('em_FCsum').setExValue( vFC );
    		
    		
    		me.lookupReference('em_SAave').setExValue( parseInt(Ext.util.Format.number(vSA / res.length) ,10)   , '0,000');
    		me.lookupReference('em_SCave').setExValue( parseInt(Ext.util.Format.number(vSC / res.length) ,10)   , '0,000');
    		me.lookupReference('em_FAave').setExValue( parseInt(Ext.util.Format.number(vFA / res.length ),10)   , '0,000');
    		me.lookupReference('em_FCave').setExValue( parseInt(Ext.util.Format.number(vFC / res.length ),10)   , '0,000');
    		
    	}else{
    		
    		console.log('2');
    		
    		me.lookupReference('em_SAave').setExValue(0);
    		me.lookupReference('em_SAsum').setExValue(0);
    		me.lookupReference('em_SCave').setExValue(0);
    		me.lookupReference('em_SCsum').setExValue(0);
    		me.lookupReference('em_FAave').setExValue(0);
    		me.lookupReference('em_FAsum').setExValue(0);
    		me.lookupReference('em_FCave').setExValue(0);
    		me.lookupReference('em_FCsum').setExValue(0);
    	}
    	
    },
    onAxisLabelRender: function (axis, label, layoutContext) {
        var value = layoutContext.renderer(label) / 1000;
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
        
        var cntNm = "COUNT1";
        var nm    = "성공";
        
        if(onField == "AMOUNT2"){
        	cntNm = "COUNT2";
            nm    = "실패";
        }
        
        var cmsTypeTot = record.get(onField);
        if(cmsTypeTot == undefined){
        	cmsTypeTot = 0;
        }
        
        var yyyymmdd = record.get('SUB_DATE').substr(0,4) + "년" + record.get('SUB_DATE').substr(4,2)+"월" + record.get('SUB_DATE').substr(6,2) +"일";
        
        
        
    	tooltip.setHtml(nm + "<br/>날짜 : " +yyyymmdd+ '<br/>금액 : ' + Ext.util.Format.number(cmsTypeTot, '0,000') +"<br/>건수 : "+Ext.util.Format.number(record.get(cntNm), '0,000')+"건"  );
    },
    onStackedToggle: function (segmentedButton, button, pressed) {
        var chart = this.lookupReference('cms004w_01_a'),
            series = chart.getSeries()[0],
            value = segmentedButton.getValue();
        series.setStacked(value === 0);
        chart.redraw();
    },
    
})