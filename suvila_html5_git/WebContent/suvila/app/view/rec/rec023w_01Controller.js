Ext.define('ExFrm.view.rec.rec023w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec023w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.getNowDate()+'';
    	
    	console.log('onAfterRender = ',(today+'').substring(0,6)+'01');
    	
    	
    	me.lookupReference('em_sDate').setExValue( (today+'').substring(0,6)+'01' );
    	me.lookupReference('em_eDate').setExValue( today );
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_rec', '', null ,me.dsChangeCallback);
    	},50);
    	
    },    
    dsChangeCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_approv', '', null ,null);
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
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	console.log('onSearchBlur = ');
    	exCommon.onSearchBlur(
    		 me
    		,m2
    		,'hid_bud_no'
    		,'txt_budNo'
    	);
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
    	
    	var txt_budNo = exCommon.getRepVal( me.lookupReference('txt_stipulation').getExValue() );
    	if(me.lookupReference('cb_setBunga').getExValue()){
    		txt_budNo = txt_budNo.substring(0,8);
    	}else{
    		txt_budNo = txt_budNo.substring(0,10);
    	}
    	
    	console.log('cb_setBunga = ',  me.lookupReference('cb_setBunga').getExValue() );
    	
    	var params ={
    		 V_SDATE        : exCommon.getRepVal( me.lookupReference('em_sDate').getExValue() )
    		,V_EDATE        : exCommon.getRepVal( me.lookupReference('em_eDate').getExValue() )
    		,V_APPROVAL_GBN : exCommon.getRepVal( me.lookupReference('lc_approv').getExValue() )
    		,V_BUD_NO       : txt_budNo
    		,V_ACCEPT_GBN   : exCommon.getRepVal( me.lookupReference('lc_rec').getExValue() )
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.dsMainCallback);
    	},50);
    	
    },
    onExcel : function(){
    	var me = this;
    	
    	var grid = me.lookupReference('rec023w_01_a');
    	exCommon.excelDown(grid, 'rec023', '결산내역',  me.getViewModel().getStore('ds_main').getCount());
    },
  
})