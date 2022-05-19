Ext.define('ExFrm.view.rec.rec010w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec010w_01',
    onInit:function(){
    	
    	var me = this;
    	
    	
    	Ext.Loader.setPath('ExFrm.view.ux', '../ux');
        
       me.lookupReference('em_entry_date').setExValue( exCommon.setDateFormat( exCommon.getNowDate() ) );
       me.lookupReference('em_entry_date2').setExValue( exCommon.setDateFormat( exCommon.getNowDate() ) );
        
        setTimeout(function(){
          	me.callStore(me, 'ds_recUser', '', null ,me.dsrecUserCallback);
        },50);
    },
    dsrecUserCallback : function(me, success, form, action){
    	if(success){
    		
    		var addData = {
    			 USER_ID : ''
    			,USER_NM : '전체'
    		};
    		me.getViewModel().getStore('ds_recUser').insert(0,addData);

    		me.lookupReference('lc_recUser').setExValue( exCommon.user.userId );
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 "V_DATE"     : me.lookupReference('em_entry_date').getExValue()
    		,"VV_USER_ID" : encodeURI(me.lookupReference('lc_recUser').getExValue())
    	};
    	
    	setTimeout(function(){
    		me.getViewModel().getStore('ds_breakdown').proxy.setTimeout(1000 * 60 * 30);
    		
          	me.callStore(me, 'ds_breakdown', '', params ,me.onSelectCallback);
        },50);
    },
    onSelectCallback : function(me, success, form, action){
    	if(success){
    		var cash_amount = 0;
    		var mu_amount   = 0;
    		var card_amount = 0;
    		
    		var row = me.getViewModel().getStore('ds_breakdown').getCount();
    		for(var i =0 ; i < row ; i++){
    			var record = me.getViewModel().getStore('ds_breakdown').getAt(i);
    			
    			
    			switch (record.get("APPROVAL_GBN")) {
				case '1':
					cash_amount += exCommon.getRepNum( record.get("AMOUNT") );
					break;
				case '2':
					card_amount += exCommon.getRepNum( record.get("AMOUNT") );
					break;					
				case '4':
					mu_amount += exCommon.getRepNum( record.get("AMOUNT") );
					break;
				default:
					cash_amount += exCommon.getRepNum( record.get("AMOUNT") );
					break;
				}
    			
    		}//for
    		
    		
    		me.lookupReference('tot_amount_break').setExValue( cash_amount + mu_amount + card_amount);
    		me.lookupReference('cash_amount_break').setExValue( cash_amount );
    		me.lookupReference('mu_amount_break').setExValue( mu_amount );
    		me.lookupReference('card_amount_break').setExValue( card_amount );
    	}
    	me.lookupReference('rec010w_01').getView().select(0);
    },
    onSelectDaily : function(){
    	var me = this;
    	
    	console.log(me.lookupReference('em_entry_date2').getExValue());
    	console.log(me.lookupReference('em_entry_date2').getExValue());
    	console.log(me.lookupReference('em_entry_date2').getExValue());
    	
    	var params = {
    		 "V_DATE"     : me.lookupReference('em_entry_date2').getExValue()
    	};
    	
    	setTimeout(function(){
    		me.getViewModel().getStore('ds_dailyReport').proxy.setTimeout(1000 * 60 * 2);
          	me.callStore(me, 'ds_dailyReport', '', params ,me.onSelectDailyCallback);
        },50);
    	
    },
    onSelectDailyCallback : function(me, success, form, action){
    	console.log('form = ', form);
    	console.log('action = ', action);
    	
    	if(success){
    		var tot_amount  = 0;
    		var cash_amount = 0;
    		var mu_amount   = 0;
    		var card_amount = 0;
    		
    		var row = me.getViewModel().getStore('ds_dailyReport').getCount();
    		for(var i =0 ; i < row ; i++){
    			var record = me.getViewModel().getStore('ds_dailyReport').getAt(i);
    			
    			tot_amount  += exCommon.getRepNum( record.get("AMOUNT_SUM") );
    			cash_amount += exCommon.getRepNum( record.get("CASH_AMOUNT") );
    			mu_amount   += exCommon.getRepNum( record.get("MU_AMOUNT") );
    			card_amount += exCommon.getRepNum( record.get("CARD_AMOUNT") );
    			
    		}//for
    		
    		me.lookupReference('tot_amount').setExValue( cash_amount + mu_amount + card_amount);
    		me.lookupReference('cash_amount').setExValue( cash_amount );
    		me.lookupReference('mu_amount').setExValue( mu_amount );
    		me.lookupReference('card_amount').setExValue( card_amount );
    	}
    	
    },
    onExcel:function(){
        var grid = this.lookupReference('pivotGrid');
        grid.saveDocumentAs({
            title:      '',
            fileName:   'excelExport.xlsx',
            onlyExpandedNodes : false,
            showSummary : true,
            type : 'excel'
        });        
    },
    onExcelBreak : function(){
    	var me = this;
    	
    	var grid = me.lookupReference('rec010w_01');
    	exCommon.excelDown(
			 grid
			,''
			,me.lookupReference('lc_recUser').getRawValue()+' 일일 접수내역'
			,me.getViewModel().getStore('ds_breakdown').getCount()
    	);
    }

})