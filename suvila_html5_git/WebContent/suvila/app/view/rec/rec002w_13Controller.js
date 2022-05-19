Ext.define('ExFrm.view.rec.rec002w_13Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_13',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('me_SDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_EDate').setExValue( today );
		
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null ,me.dsaJkindnCallback);
    	},50);
    	
    },
    dsaJkindnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_GDKindInfo', '', null ,me.dsGdKindCallback);
    	},50);   	    	
    },
    dsGdKindCallback : function(me, success, form, action){
    	
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
    onSelect : function (){
    	var me = this;
    	
    	var txt_stipulation = exCommon.getRepVal(me.lookupReference('txt_stipulation').getExValue(), '');
    	if(txt_stipulation == ''){
    		me.lookupReference('txt_budNo').setExValue('');
    	}
    	
    	var param = {
    		 V_PROPOSAL_BUD_NO : me.lookupReference('txt_budNo').getExValue()
    		,V_CLASS_CD        : me.lookupReference('lc_classMgt').getExValue()
    		,V_DATE_GBN 	   : me.lookupReference('cb_date').getExValue()
    		,V_CODE   		   : me.lookupReference('lc_GDKindInfo').getExValue()
    		,V_SDATE  	  	   : me.lookupReference('me_SDate').getExValue()
    		,V_EDATE  	       : me.lookupReference('me_EDate').getExValue()
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', param , me.dsDetailCallback);
    	},50);
    },
    dsDetailCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec002w_13_a').getView().select(0);
    	}
    },
    onExcel : function (){
    	var me = this;
    	
    	var g_row         = me.getViewModel().getStore('ds_main').getCount();
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	var baseData;
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		jsonPrintData.push(g_record.data);
    	}// for
    	
    	
    	jsonAllData = {
        	 "list" : jsonPrintData
        };
          	
      	var params = {
  			 FILE_PATH  : '/rec002w_13_excel.ozr' 
  			,PRINT_DATA : jsonAllData
      	};
    		
		setTimeout(function(){
			me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    }
})