Ext.define('ExFrm.view.rec.rec015w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec015w_01',
    onDestroy : function() {
        console.log('onSearch0044422Des');
    },
    onInit:function(){
    	var me = this;
    //	Ext.Loader.setPath('ExFrm.view.ux', 'http://dmaps.daum.net/map_js_init/postcode.v2.js');
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('cb_Stipulation_bill').setExValue(exCommon.user.searchGbn);
    	
    	
    	var params = {V_RANK : 'T'};
    	
    	if(exCommon.user.templeCd == '000127'){
    		params.V_RANK = 'F';
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_year', '', params ,me.dsYearCallback);
    	},50);
    	
    },
    dsYearCallback : function(me, success, form, action){
    	if(success && me.getViewModel().getStore('ds_year').getCount() > 0){
    		var GIBU_DAY_CODE = me.getViewModel().getStore('ds_year').getAt(0).get("GIBU_DAY_CODE");
    		me.lookupReference('lc_year').setExValue(GIBU_DAY_CODE);
    	}// if
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_temple_info', '', null ,me.dsTempleCallback);
    	},50);
    },
    dsTempleCallback : function(me, success, form, action){
    	console.log('dsTempleCallback')
    	console.log( me.getViewModel().getStore('ds_temple_info').getAt(0).data );
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	var record = me.getViewModel().getStore('ds_temple_info').getAt(0).data;
    	
    	var DEPU_CODE           = exCommon.getRepVal(record.DEPU_CODE , '');
    	var TEMPLE_NAME         = exCommon.getRepVal(record.TEMPLE_NAME , '');
    	var TEMPLE_ADDR         = exCommon.getRepVal(record.TEMPLE_ADDR , '');
    	var TEMPLE_CD         	= exCommon.getRepVal(record.TEMPLE_CD , '');
    	var TEMPLE_REG_NO       = exCommon.getRepVal(record.TEMPLE_REG_NO , '');
    	var SOJAE_TEMPLE_NAME   = '공란';
    	var SOJAE_TEMPLE_ADDR   = '공란';
    	var SOJAE_TEMPLE_REG_NO = '공란';
    	var YYYY 				= today.substring(0,4);
    	var MM   				= today.substring(5,7);
    	var DD   				= today.substring(8);
    	
    	if(DEPU_CODE == 13){
    		SOJAE_TEMPLE_NAME   = exCommon.getRepVal(record.TEMPLE_NAME , '');
        	SOJAE_TEMPLE_ADDR   = exCommon.getRepVal(record.TEMPLE_ADDR , '');
        	SOJAE_TEMPLE_REG_NO = exCommon.getRepVal(record.TEMPLE_REG_NO , '');
        	TEMPLE_ADDR         = exCommon.getRepVal(record.DEPU_ADDR , '');
        	
        	if(TEMPLE_CD == '000116'){
        		TEMPLE_NAME         = exCommon.getRepVal(record.DEPU_NAME , '');
        	}
    	}
    	var data ={
    		 DEPU_CODE 		     : DEPU_CODE
    		,TEMPLE_NAME 		 : TEMPLE_NAME
    		,TEMPLE_ADDR 		 : TEMPLE_ADDR 
    		,TEMPLE_CD 			 : TEMPLE_CD
    		,TEMPLE_REG_NO 		 : TEMPLE_REG_NO
    		,SOJAE_TEMPLE_NAME   : SOJAE_TEMPLE_NAME
    		,SOJAE_TEMPLE_ADDR   : SOJAE_TEMPLE_ADDR
    		,SOJAE_TEMPLE_REG_NO : SOJAE_TEMPLE_REG_NO
    		,YYYY 				 : YYYY
    		,MM 				 : MM
    		,DD 				 : DD
    	};
    	console.log(data);
    	me.getViewModel().getStore('ds_print_master').add(data);
    	
    	
    	var params ={
    		V_TEMPLE_CD : exCommon.user.templeCd
    	};
    	
    	setTimeout(function(){
    	},50);
    },
    dsImgCallback : function(me, success, form, action){
    	console.log('dsImgCallback = ', success);
    	console.log( me.getViewModel().getStore('ds_img').getAt(0) );
    },
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSearchTypeChangeBill : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation_bill'), me.lookupReference('hid_bud_no_bill'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearch();
    	}
    },
    onYearChange : function(){
    	var me = this;
    	
    	var txt_budNo = exCommon.getRepVal( me.lookupReference('hid_bud_no').getExValue( ) , "");
    	
    	if(txt_budNo == ""){
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_Detail').removeAll();
    	
    	var params = {
   			 V_YEAR   : me.lookupReference('lc_year').getExValue()
   			,V_BUD_NO : me.lookupReference('txt_budNo').getExValue()
   			,V_BUNGA  : me.lookupReference('cb_setBunga').getExValue()
   		}
   		
   		setTimeout(function(){
   			me.callStore(me, 'ds_recHisInfo', '', params , me.dsRecHisCallback);
       	},50);
    	
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
    	var sel_BudSearchGbn = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_stipulation  = me.lookupReference('txt_stipulation').getExValue( );
    	var txt_budNo        = me.lookupReference('hid_bud_no').getExValue( );
    	
    	me.lookupReference('txt_budNo').setExValue( params.BUD_NO );
    	
    	var txt_budNo_bill = exCommon.getRepVal( me.lookupReference('txt_budNo_bill').getExValue(), ''); 
    	
    	if( !me.lookupReference('cb_setAdd').getExValue()  && txt_budNo_bill == ''){
    		me.lookupReference('txt_budNo_bill').setExValue( exCommon.getRepVal(params.BUD_NO,"") );
        	me.lookupReference('txt_name_kor').setExValue( exCommon.getRepVal(params.NAME_KOR,"") );
        	me.lookupReference('me_bill_postno').setExValue( exCommon.getRepVal(params.ZIP_CD,"") );
        	me.lookupReference('txt_bill_addr1').setExValue( exCommon.getRepVal(params.ADDR1,"") );
        	me.lookupReference('txt_bill_addr2').setExValue( exCommon.getRepVal(params.ADDR2,"") );
        	me.lookupReference('txt_bill_addr3').setExValue( exCommon.getRepVal(params.ADDR3,"") );
        	me.lookupReference('txt_bill_bldg_num').setExValue( exCommon.getRepVal(params.BLDG_NUM,"") );
    	}
    	
    	
    	me.inGeneRal(me, params);
    	
    	gf_SetBudFind (params, 
			      me.lookupReference('cb_Stipulation'), 
			      me.lookupReference('txt_stipulation'), 
			      me.lookupReference('hid_bud_no'),
			      me.lookupReference('txt_budNo') );
    	
    	var params = {
    		 V_BUD_NO : params.BUD_NO
    		,V_BUNGA  : me.lookupReference('cb_setBunga').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_daejuInfo', '', params ,me.dsDaejuCallback);
    	},20);
    },
    dsDaejuCallback : function(me, success, form, action){
    	var row = me.getViewModel().getStore('ds_daejuInfo').getCount();
    	
    	console.log('dsDaejuCallback row = ', row+" -->"+ me.lookupReference('cb_setBunga').getExValue());
    	
    	if(success && row > 0){
    		var record = me.getViewModel().getStore('ds_daejuInfo').getAt(0);
    		
    		me.lookupReference('txt_bud_code').setExValue( exCommon.getRepVal(record.get("BUD_NO"),"") );
    		me.lookupReference('txt_daeju_nm').setExValue( exCommon.getRepVal(record.get("NAME_KOR"),"") );
    		me.lookupReference('txt_sacred_nm').setExValue( exCommon.getRepVal(record.get("SACRED_KOR"),"") );
    		me.lookupReference('txt_TelNo1').setExValue( exCommon.getRepVal(record.get("TELNO1"),"") );
    		me.lookupReference('txt_TelNo2').setExValue( exCommon.getRepVal(record.get("TELNO2"),"") );
    		me.lookupReference('txt_TelNo3').setExValue( exCommon.getRepVal(record.get("TELNO3"),"") );
    		me.lookupReference('txt_MobiletelNo1').setExValue( exCommon.getRepVal(record.get("MOBILE_TELNO1"),"") );
    		me.lookupReference('txt_MobiletelNo2').setExValue( exCommon.getRepVal(record.get("MOBILE_TELNO2"),"") );
    		me.lookupReference('txt_MobiletelNo3').setExValue( exCommon.getRepVal(record.get("MOBILE_TELNO3"),"") );
    		me.lookupReference('txt_addr1').setExValue( exCommon.getRepVal(record.get("ADDR1"),"") );
    		me.lookupReference('txt_addr2').setExValue( exCommon.getRepVal(record.get("ADDR2"),"") );
    		me.lookupReference('txt_addr3').setExValue( exCommon.getRepVal(record.get("ADDR3"),"") );
    		
    		
    		var params = {
    			 V_YEAR   : me.lookupReference('lc_year').getExValue()
    			,V_BUD_NO : me.lookupReference('txt_budNo').getExValue()
    			,V_BUNGA  : me.lookupReference('cb_setBunga').getExValue()
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_recHisInfo', '', params , me.dsRecHisCallback);
        	},50);
    	}
    	    	
     },
     dsRecHisCallback : function(me, success, form, action){
    	 if(!me.lookupReference('cb_setAdd').getExValue()){
    		 me.getViewModel().getStore('ds_Detail').removeAll();
    	 }
    	 me.lookupReference('txt_stipulation').setExValue('');
     },
     typeGbnChange : function(){
     	var me = this;
     	
     	if( me.lookupReference('sel_gbn').getExValue() == 'T' ){
     		me.lookupReference('birth_area').setHidden(false);
     		me.lookupReference('biz_area').setHidden(true);
     		
     		me.lookupReference('me_rep_saup_no').setExValue('');
     	}else{
     		me.lookupReference('birth_area').setHidden(true);
     		me.lookupReference('biz_area').setHidden(false);
     		me.lookupReference('me_rep_juminno').setExValue('');
     	}
     },
     /*onFindAddr : function(){
     	var params = {};
         this.openPopup('ExFrm.view.com.post',  params, this.onFindAddrReceive);
     },
     onFindAddrReceive : function(params, me){
     	me.lookupReference('me_bill_postno').setExValue(params.ZIPCODE);
     	me.lookupReference('txt_bill_addr1').setExValue(params.ADDR1);
     	me.lookupReference('txt_bill_addr3').setExValue(params.ADDR3);
     	me.lookupReference('txt_bill_bldg_num').setExValue(params.BLDG_NUM);
     	me.lookupReference('txt_bill_addr2').focus();
     },*/
     onFindAddr : function(){
     	var me = this;
     	find_addr(
     		  me 
     		,'me_bill_postno'
     		,'txt_bill_addr1'
     		,'txt_bill_addr3'
     		,'txt_bill_bldg_num' 
     		,'txt_bill_addr2'
     		,'layerRec015'
     	);
     	
     },
     onSearchEnterBill: function(me2, e, eOpts ){
     	var me = this;
     	if(e.keyCode == 13){
     		me.onBudSearchBill();
     	}
     },
     onBudSearchBill : function(){
     	var me = this;
     	
     	var searchValue = "";
     	var searchgbn   =  me.lookupReference('cb_Stipulation_bill').getExValue();
     	var searchword  =  me.lookupReference('txt_stipulation_bill').getExValue();
     	var flag        = false;
     	
     	if(searchword == ""){
     		setTimeout(function(){
 				Ext.Msg.alert('알림',  me.lookupReference('cb_Stipulation_bill').getRawValue() +"를 입력 후 조회 버튼을 눌러주세요.");    				
 			},50);
     		me.lookupReference('txt_stipulation_bill').focus();
     		return false;
     	}
     	
     	if(searchgbn == "BUD_NO" && searchword.length < 5){
 			for(var a=searchword.length; a<5; a++){
 				searchword = "0" + searchword;
 			}					
 			me.lookupReference('txt_stipulation_bill').setExValue(searchword);
 		}
     	
     	
     	searchValue = me.lookupReference('txt_stipulation_bill').getExValue();
 		
 		var pos   = searchValue.indexOf('5243350001313266');		
 		var fCard = searchValue.indexOf('=');
 		var bCard = searchValue.lastIndexOf('=');
 		var cNum  = searchValue.indexOf('=1234567');
     	
 		if( !flag ){
 			exCommon.setCustCardNo("");
 			
 			exCommon.onSindoSearch(
 	    		 me.lookupReference('cb_Stipulation_bill')
 	    		,me.lookupReference('txt_stipulation_bill')
 	    		,me
 	    		,me.onBudSearchBillReceive
 	    	);
 		}
     },
     onBudSearchBillReceive : function(params, me){
     	
     	me.lookupReference('txt_budNo_bill').setExValue( exCommon.getRepVal(params.BUD_NO,"") );
     	me.lookupReference('txt_name_kor').setExValue( exCommon.getRepVal(params.NAME_KOR,"") );
     	me.lookupReference('me_bill_postno').setExValue( exCommon.getRepVal(params.ZIP_CD,"") );
     	me.lookupReference('txt_bill_addr1').setExValue( exCommon.getRepVal(params.ADDR1,"") );
     	me.lookupReference('txt_bill_addr2').setExValue( exCommon.getRepVal(params.ADDR2,"") );
     	me.lookupReference('txt_bill_addr3').setExValue( exCommon.getRepVal(params.ADDR3,"") );
     	me.lookupReference('txt_bill_bldg_num').setExValue( exCommon.getRepVal(params.BLDG_NUM,"") );
     	
     	me.getViewModel().getStore('ds_Detail').removeAll();
     	
     	me.inGeneRal(me, params);
     	
     	me.lookupReference('txt_stipulation_bill').setExValue('');
     },
     inRightMove:function(){
     	var me = this;
     	
     	var selection = me.lookupReference('rec015w_01_a').getView().getSelectionModel().getSelection();    	
     	
     	
     	if(selection.length  <= 0){
     		return false;
     	}
         		
		for(var i = 0; i < selection.length ; i++){
			var GIBU_CNT = selection[i].get("GIBU_CNT");
			if(GIBU_CNT == 0){
	     		var data ={
	     		 	 "TEMPLE_CD"   : selection[i].get("TEMPLE_CD")
	     	        ,"BUD_NO"      : me.lookupReference('txt_budNo_bill').getExValue()
	     	        ,"ACCEPT_SEQ"  : selection[i].get("ACCEPT_SEQ")
	     	        ,"SEQ"         : selection[i].get("SEQ")
	     	        ,"REC_NM"      : selection[i].get("REC_NM")
	     	        ,"GIBU_AMT"    : selection[i].get("GIBU_AMT")
	     	        ,"RECEIPT_DATE": selection[i].get("RECEIPT_DATE")
	     	        ,"GIBU_DAY"    : selection[i].get("GIBU_DAY")
	     	        ,"ACCEPT_GBN"  : selection[i].get("ACCEPT_GBN")
	     	        ,"APPROVAL_GBN": selection[i].get("APPROVAL_GBN")
	     	        ,"SKIP"   	   : selection[i].get("SKIP")
	     	        ,"BULJUNHAM"   : 'F'
	     	        ,"GIBU_TYPE"   : '1'
	     	        ,'TYPE'        : 'REC'
	     		}
	     		
	     		var findRecord = me.getViewModel().getStore('ds_Detail').findRecord('SKIP', selection[i].get("SKIP"), 0, false, true, true);
	     		
	     		
	     		if(findRecord == null){
	     			me.getViewModel().getStore('ds_Detail').add(data);
	     		}// if findRecord
			}
		}// for
     	
     },
     inRightAllMove : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_recHisInfo').getCount();
    	for(var i = 0; i < row ; i++){
    		
    		var record = me.getViewModel().getStore('ds_recHisInfo').getAt(i);
    		
    		var GIBU_CNT = record.get("GIBU_CNT");
    		if(GIBU_CNT == 0){
	     		var data ={
	     		 	 "TEMPLE_CD"   : record.get("TEMPLE_CD")
	     	        ,"BUD_NO"      : me.lookupReference('txt_budNo_bill').getExValue()
	     	        ,"ACCEPT_SEQ"  : record.get("ACCEPT_SEQ")
	     	        ,"SEQ"         : record.get("SEQ")
	     	        ,"REC_NM"      : record.get("REC_NM")
	     	        ,"GIBU_AMT"    : record.get("GIBU_AMT")
	     	        ,"RECEIPT_DATE": record.get("RECEIPT_DATE")
	     	        ,"GIBU_DAY"    : record.get("GIBU_DAY")
	     	        ,"ACCEPT_GBN"  : record.get("ACCEPT_GBN")
	     	        ,"APPROVAL_GBN": record.get("APPROVAL_GBN")
	     	        ,"SKIP"   	   : record.get("SKIP")
	     	        ,"BULJUNHAM"   : 'F'
	     	        ,"GIBU_TYPE"   : '1'
	     	        ,'TYPE'        : 'REC'
	     		}
	     		me.getViewModel().getStore('ds_Detail').add(data);
			}
    	}// for
    	
     },
     inLeftMove : function(){
    	 var me = this;
    	 
    	 exCommon.gridRemove(
    		 me
    		,'rec015w_01_b'
    		,'ds_Detail'
    		,false
    		,true
    	 );
     },
     inLeftAllMove : function (){
    	 var me = this;
    	 
    	 exCommon.gridRemove(
    		 me
    		,'rec015w_01_b'
    		,'ds_Detail'
    		,true
    		,true
    	 );
     },
     onAddBul : function(){
    	 var me = this;
    	 
    	 if(me.getViewModel().getStore('ds_General').getCount() == 0){
    		 exCommon.msgAlert('검색 후 작업하십시요.');
    		return;
    	 }

    	 
    	 if(!me.inAddVal(me , 'bul')){
    		 return;
    	 }
    	 
    	 var findRecord = me.getViewModel().getStore('ds_Detail').findRecord('BULJUNHAMFLAG', 'T', 0, false, true, true);
    	 if(findRecord != null ){
    		 exCommon.msgAlert('불전함은 한건만 입력 할 수 있습니다.');
        	 return;
    	 }
    	 
    	 var row = me.getViewModel().getStore('ds_Detail').getCount();
     	 for(var i = 0; i < row ; i++){
     		
     		var record    = me.getViewModel().getStore('ds_Detail').getAt(i);
     		var BULJUNHAM = record.get("BULJUNHAM");
     		var GIBU_TYPE = record.get("GIBU_TYPE");
     		var REC_NM    = exCommon.getRepVal(record.get("REC_NM"),'');
     		
     		/*if(BULJUNHAM == 'T' && GIBU_TYPE == '2' && REC_NM == ''){
     			exCommon.msgAlert('현물종류를 입력하세요.');
     			me.lookupReference('rec015w_01_b').getView().select(0);
     			return;
     		}*/
     	 }// for
     	 
     	 
     	 var data  = {
     		 TEMPLE_CD    : exCommon.user.templeCd
     		,BUD_NO       : me.lookupReference('txt_budNo_bill').getExValue()
     		,ACCEPT_SEQ   : ''
     		,SEQ          : '1'
     		,REC_NM       : '불전함'
     		,GIBU_AMT     : ''
     		,RECEIPT_DATE : ''
     		,GIBU_DAY     : me.lookupReference('lc_year').getExValue()
     		,ACCEPT_GBN   : '10'
     		,BULJUNHAM    : 'T'
     		,SKIP         : ''
     		,GIBU_TYPE    : '1'
     		,APPROVAL_GBN : '1'
     		,BULJUNHAMFLAG: 'T'
     	 };
     	me.getViewModel().getStore('ds_Detail').add(data);
     },
     onAddHyun : function(){
    	var me = this;
    	
    	if(!me.inAddVal(me , 'hyun')){
   		 	return;
    	}
    	
    	var data  = {
    		 TEMPLE_CD    : exCommon.user.templeCd
    		,BUD_NO       : me.lookupReference('txt_budNo_bill').getExValue()
    		,ACCEPT_SEQ   : ''
    		,SEQ          : '1'
    		,REC_NM       : ''
    		,GIBU_AMT     : ''
    		,RECEIPT_DATE : ''
    		,GIBU_DAY     : me.lookupReference('lc_year').getExValue()
    		,ACCEPT_GBN   : '9999'
    		,BULJUNHAM    : 'T'
    		,SKIP         : ''
    		,GIBU_TYPE    : '2'
    		,APPROVAL_GBN : '5'
    	 };
    	
    	 me.getViewModel().getStore('ds_Detail').add(data);
     },
     inAddVal : function(me , type){
    	 var row = me.getViewModel().getStore('ds_Detail').getCount();
		 for(var i = 0; i < row ; i++){
    		 
			 var record       = me.getViewModel().getStore('ds_Detail').getAt(i);
			 var BULJUNHAM    = exCommon.getRepVal(record.get("BULJUNHAM"), "");
			 var RECEIPT_DATE = exCommon.getRepVal(record.get("RECEIPT_DATE"), "");
			 
			 var REC_NM       = exCommon.getRepVal(record.get("REC_NM"), "");
			 
			 if(BULJUNHAM == 'T' && RECEIPT_DATE == ""){
				 exCommon.msgAlert('접수일자를 입력하세요.');
				 return false;
			 }
			 
			 if(BULJUNHAM == 'T' && REC_NM == "" && type ==  'hyun' ){
				 exCommon.msgAlert('현물 종류를 입력하세요.');
				 return false;
			 }
    	 }// for
		 
    	 return true;
    	 
     },
     onBeforeedit : function( editor, context, eOpts ){
     	var me = this;
     	
     	var BULJUNHAM = exCommon.getRepVal(me.getViewModel().getStore('ds_Detail').getAt(context.rowIdx).get("BULJUNHAM"),"");
     	var GIBU_TYPE = exCommon.getRepVal(me.getViewModel().getStore('ds_Detail').getAt(context.rowIdx).get("GIBU_TYPE"),"");
     	
     	if(BULJUNHAM == 'F'){
     		return false;
     	}
     	
     	if(GIBU_TYPE == '2'){
     		return true;
     	}
     	
     	
     	if(context.field == "RECEIPT_DATE" || context.field == "GIBU_AMT"){
     		return true;
     	}
     	return false;
     },
     onEdit : function( editor, context, eOpts ){
    	 var me = this;
    	 
    	 
    	 var record = me.getViewModel().getStore('ds_Detail').getAt(context.rowIdx);
    	 if(context.field == "EA" || context.field == "PRICE"){
    		 var EA       = parseInt(exCommon.getRepNum(record.get("EA")));
    		 var PRICE    = parseInt(exCommon.getRepNum(record.get("PRICE")));
    		 var GIBU_AMT = EA * PRICE;
    		 
    		 record.set("GIBU_AMT", GIBU_AMT);
    	 }
    	 else if(context.field == "GIBU_AMT"){
    		 
    		 var GIBU_AMT = parseInt(exCommon.getRepNum(record.get("GIBU_AMT")));
    		 
    		 record.set("GIBU_AMT", GIBU_AMT);
    	 }
    	 
    	 
     },
     onSaveBill : function(){
    	var me = this;
    	
    	
    	if(! me.inCheck(me) ){
    		console.log('onSaveBill');
   		 	return;
   	 	}
    	
    	exCommon.fnGridSaveAll(
   			 me
   			,'ds_Detail'
   			,'newData'
   			,'uptData'
   			,'delData'
   			,'/rec/REC015W_01/DetailSave.suvila'
   			,me.onSaveBillCallback
    	);
     },
     onPrintBill : function(){
    	 var me = this;
    	 
    	 if(!me.inCheck(me) ){
    		 console.log('onPrintBill');
    		 return;
    	 }
    	 
    	 exCommon.fnGridSaveAll(
   			 me
   			,'ds_Detail'
   			,'newData'
   			,'uptData'
   			,'delData'
   			,'/rec/REC015W_01/DetailSave.suvila'
   			,me.onSaveBilPrintlCallback
    	);
    	 
     },
     onSaveBilPrintlCallback  : function(me, success, form, action){
    	 exCommon.fnGridSaveCallback( me, success , action , 'ds_Detail' );
    	 
    	 console.log('onSaveBilPrintlCallback');
    	 
       	 if( success ){
      		var GIBU_NO = action.result.GIBU_NO;
      		console.log('GIBU_NO = ', action.result.GIBU_NO);
      		
      		var params = {
      			 V_BUD_NO   : action.result.BUD_NO
      			,V_YEAR     : action.result.GIBU_DAY
      			,V_GIBU_NO  : action.result.GIBU_NO   
      		};
      		
      		
      		setTimeout(function(){
        		me.callStore(me, 'ds_print_detail', '', params ,me.dsPrintDetailCallback);
        	},50);
       	}
     },
     dsPrintDetailCallback : function(me, success, form, action){
    	 if(success){
    		 me.inAfterReset(me);
    		 
    		 var jsonAllData    = {};
    	     var jsonPrintData  = [];
    	     
    	     
    	     var row  = me.getViewModel().getStore('ds_print_detail').getCount();
    	     
    	     
    	     var mainData ={
	    		 DEPU_CODE 		     : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('DEPU_CODE') , '')
	    		,TEMPLE_NAME 		 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_NAME') , '')
	    		,TEMPLE_ADDR 		 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_ADDR') , '')
	    		,TEMPLE_CD 			 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_CD') , '')
	    		,TEMPLE_REG_NO 		 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_REG_NO') , '')
	    		,SOJAE_TEMPLE_NAME   : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('SOJAE_TEMPLE_NAME') , '')
	    		,SOJAE_TEMPLE_ADDR   : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('SOJAE_TEMPLE_ADDR') , '')
	    		,SOJAE_TEMPLE_REG_NO : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('SOJAE_TEMPLE_REG_NO') , '')
	    		,YYYY 				 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('YYYY') , '')
	    		,MM 				 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('MM') , '')
	    		,DD 				 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('DD') , '')
	    		,IMG_URL             : exCommon.user.imgIP+'/rec/REC015W_01/selectImage.suvila?TEMPLE_CD='+exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_CD') , '')
	    	};
    	     
    	     var jsonGibuData = [];
    	     for(var i = 0; i < row ; i++){
    	    	 var record = me.getViewModel().getStore('ds_print_detail').getAt(i);
    	    	 
    	    	 if( exCommon.getRepVal(record.get("EA"), '')  == ''){
    	    		 record.set("EA",'');
    	    	 }
    	    	 
    	    	 if( exCommon.getRepVal(record.get("PRICE"), '')  == ''){
    	    		 record.set("PRICE",'');
    	    	 }
    	    	 jsonPrintData.push(record.data);
    	    	 
    	    	 
    	    	 if(i == 0){
    	    		 mainData.NO         = exCommon.getRepVal(record.get("NO"), '');
    	    		 mainData.BUD_NAME   = exCommon.getRepVal(record.get("BUD_NAME"), '');
    	    		 mainData.BUD_REG_NO = exCommon.getRepVal(record.get("BUD_REG_NO"), '');
    	    		 mainData.BUD_ADDR   = exCommon.getRepVal(record.get("BUD_ADDR"), '');
    	    	 }
    	    	 jsonGibuData.push( record.data );
    	     }// for
    		 
    	     if(mainData.TEMPLE_CD == '000060' && mainData.BUD_REG_NO.length == 6){
    	    	 mainData.BUD_REG_NO = mainData.BUD_REG_NO + "  - *******";
    		 }
    	     mainData.gibuList = jsonGibuData;
    	     jsonPrintData.push(mainData);

    	     jsonAllData = {
	 	     	'info' : mainData
	 	    };
    	     
    	    /* 
    	     jsonAllData = {
    	         'main' : mainData
	     		,'info' : jsonPrintData
	     	 };
    		 */
    		 
    		 var params = {
    			 FILE_PATH  : '/rec018w_01_rp_main.ozr'
    			,PRINT_DATA : jsonAllData
    		 };
    		 console.log(jsonAllData);
    		/* 
    		
    		 console.log(Ext.encode(jsonAllData));
    		*/ 
    		 
    	    setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.print',  params, null);
	       	},100);
    		 
    	 }else{
    		 
    	 }
     },
     inCheck : function (me){
    	 
    	 var  cnt = exCommon.ChangeCount('ds_Detail' , me);
     	
     	if(cnt == 0){
     		exCommon.msgAlert('기부금 신청내역이 한건이라도 존재해야 합니다.');
     		return false;
     	}
     	
     	var sel_gbn  = exCommon.getRepVal( me.lookupReference('sel_gbn').getExValue() , "");
     	var JUMIN_NO = exCommon.getRepVal( me.lookupReference('me_rep_juminno').getExValue() , "");
     	var SAUP_NO  = exCommon.getRepVal( me.lookupReference('me_rep_saup_no').getExValue() , "");
     	
     	
     	if(sel_gbn == 'T' && JUMIN_NO == ""){
     		exCommon.msgAlert('주민등록번호 앞6자리는 필수 입력입니다.');
     		me.lookupReference('me_rep_juminno').focus();
     		return false;
     	}else if(sel_gbn == 'F' && SAUP_NO == ""){
     		exCommon.msgAlert('사업자등록번호는 필수 입력입니다.');
     		me.lookupReference('me_rep_saup_no').focus();
     		return false;
     	}
     	
     	
     	var row          = me.getViewModel().getStore('ds_Detail').getCount();
     	var GIBU_AMT     = 0;
     	
     	
 		for(var i = 0; i < row ; i++){
 			 var record       = me.getViewModel().getStore('ds_Detail').getAt(i);
 			 
 			 
 			 var BULJUNHAM    = exCommon.getRepVal(record.get("BULJUNHAM"), "");
 			 var RECEIPT_DATE = exCommon.getRepVal(record.get("RECEIPT_DATE"), "");
 			 var REC_NM       = exCommon.getRepVal(record.get("REC_NM"), "");
 			 var GIBU_TYPE    = exCommon.getRepVal(record.get("GIBU_TYPE"), "");
 			 var GIBU_DAY     = exCommon.getRepVal(record.get("GIBU_DAY"), "");
 			 
 			 GIBU_AMT     += new Number(record.get("GIBU_AMT"));
 			 
 			 if(RECEIPT_DATE == ""){
 				 me.lookupReference('rec015w_01_b').getView().select(i);
 				 exCommon.msgAlert('접수일자를 입력하세요.');
 				return false;
 			 }
 			 
 			 console.log('RECEIPT_DATE = ', RECEIPT_DATE);
 			 console.log('GIBU_DAY = ', GIBU_DAY);
 			 
 			 try{
 				 RECEIPT_DATE.substring(0,4);
 			 }catch (e) {
 				 RECEIPT_DATE = Ext.util.Format.date(RECEIPT_DATE, 'Ymd');
 				 record.set("RECEIPT_DATE", RECEIPT_DATE);
 			 }
 			 
 			 if(RECEIPT_DATE.substring(0,4) != GIBU_DAY){
 				 exCommon.msgAlert('발행 년도와 접수일자는 동일한 년도여야 합니다.');
 				return false;
 			 }
 			 
 			 console.log('BULJUNHAM = ', BULJUNHAM);
 			console.log('GIBU_TYPE = ', GIBU_TYPE);
 			 
 			 if(BULJUNHAM == 'T' && GIBU_TYPE == "2" && REC_NM == "" ){
 				 me.lookupReference('rec015w_01_b').getView().select(i);
 				 exCommon.msgAlert('현물 종류를 입력하세요.');
 				return false;
 			 }
    	}// for
 		me.lookupReference('GIBU_AMT').setExValue(GIBU_AMT);
    	 
    	return true;
     },
     onTempbill : function(){
    	 var me = this;
    	 
    	 var params = {
  			 V_BUD_NO   : '01-00003-0-01'
  			,V_GIBU_NO  : '6'
  			,V_YEAR     : '2019'
  		};
  		
  		console.log('param = ', params);
  		
  		setTimeout(function(){
    		me.callStore(me, 'ds_print_detail', '', params ,me.dsPrintDetailCallback);
    	},50);
    	 
     },
     onSaveBillCallback : function(me, success, form, action){
     	exCommon.fnGridSaveCallback( me, success , action , 'ds_Detail' );
     	
      	if( success ){
     		me.inAfterReset(me);
     		var GIBU_NO = action.result.GIBU_NO;
      	}
      },
     inAfterReset : function(me){
    	me.getViewModel().getStore('ds_recHisInfo').removeAll();
   		me.getViewModel().getStore('ds_Detail').removeAll();
   		
   		
   		me.lookupReference('txt_budNo_bill').setExValue( "" );
       	me.lookupReference('txt_name_kor').setExValue( "" );
       	me.lookupReference('me_bill_postno').setExValue( "" );
       	me.lookupReference('txt_bill_addr1').setExValue( "" );
       	me.lookupReference('txt_bill_addr2').setExValue( "" );
       	me.lookupReference('txt_bill_addr3').setExValue( "" );
       	me.lookupReference('txt_bill_bldg_num').setExValue( "" );
       	
       	
       	me.lookupReference('txt_bud_code').setExValue( "" );
  		me.lookupReference('txt_daeju_nm').setExValue( "" );
  		me.lookupReference('txt_sacred_nm').setExValue( "" );
  		me.lookupReference('txt_TelNo1').setExValue( "" );
  		me.lookupReference('txt_TelNo2').setExValue( "" );
  		me.lookupReference('txt_TelNo3').setExValue( "" );
  		me.lookupReference('txt_MobiletelNo1').setExValue( "");
  		me.lookupReference('txt_MobiletelNo2').setExValue( "" );
  		me.lookupReference('txt_MobiletelNo3').setExValue( "" );
  		me.lookupReference('txt_addr1').setExValue( "" );
  		me.lookupReference('txt_addr2').setExValue( "" );
  		me.lookupReference('txt_addr3').setExValue( "" );
  		
  		me.lookupReference('hid_bud_no').setExValue( "" );
  		me.lookupReference('txt_budNo').setExValue( "" );
  		me.lookupReference('hid_bud_no_bill').setExValue( "" );
  		
  		me.lookupReference('sel_gbn').setExValue( "T" );
  		me.lookupReference('me_rep_juminno').setExValue( "" );
  		me.lookupReference('me_rep_saup_no').setExValue( "" );
  		me.lookupReference('txt_remark').setExValue( "" );
     },
     inGeneRal : function(me, param){
    	 
    	console.log('inGeneRal = ', param); 
    	 
    	me.getViewModel().getStore('ds_General').removeAll();
    	var data = {
    		 BUD_NO       : param.BUD_NO
    		,NAME_KOR     : param.NAME_KOR
    		,JUMIN_NO     : param.JUMIN_NO
    		,ZIP_CD       : param.ZIP_CD
    		,ADDR1        : param.ADDR1
    		,ADDR2        : param.ADDR2
    		,BLDG_NUM     : param.BLDG_NUM
    		,ADDR3        : param.ADDR3
    		,GIBU_DAY     : me.lookupReference('lc_year').getExValue()
    		,REISUE_YN    : 'F'
    		,APPROVAL_GBN : 'F'
    	};
    	me.getViewModel().getStore('ds_General').add(data);
     },
     onKeyUp : function(me2, e, eOpts ){
     	var me = this;
     	
     	try{
     		var  textNm = me2.reference;
     		
     		var txtTelno = exCommon.getRepVal(me.lookupReference(textNm).getExValue(),"");
         	
     		
     		txtTelno = txtTelno.replaceAll(/\D/g, "");
     		
     		
     		/*
         	if( !(e.keyCode >= 48 && e.keyCode<= 57)){
         		txtTelno = txtTelno.substr(0, txtTelno.length-1)
         	}
         	*/
         	me.lookupReference(textNm).setExValue( txtTelno );
         	
         	if(txtTelno.length > 6 &&  textNm == 'me_rep_juminno'){
         		me.lookupReference(textNm).setExValue( txtTelno.substr(0,6) );
         	}
         	
         	if(txtTelno.length > 10 &&  textNm == 'me_rep_saup_no'){
         		me.lookupReference(textNm).setExValue( txtTelno.substr(0,10) );
         	}
         	
     	}catch (e) {}
     },
     
})
