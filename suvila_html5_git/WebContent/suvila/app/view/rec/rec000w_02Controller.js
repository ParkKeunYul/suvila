Ext.define('ExFrm.view.rec.rec000w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000w_02',    
    onSearchDeajuCallback:function(me, success, response, record, opt ){
        console.log('arguments', arguments);
        if(success == true){
            me.lookupReference('daejuBudNo').setValue(record.data.info.daejuBudNo);
        }
    },
    onCalled:function(params){
    },
    onInit:function(me){
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('lc_acceptGbn').setExValue(me.getView().up('[isRootView=true]').getController().callSetRecType());
    	
    	var budNo = exCommon.getRepVal( exCommon.getCustBudNo() );
    	var cb_setBunga =  exCommon.getCustBunGa()     	
    	
    	
    	if(budNo != ""){
    		me.lookupReference('cb_setBudNo').setExValue(true);
    		me.lookupReference('txt_budNo').setExValue( budNo );
    		me.lookupReference('hid_bud_no').setExValue( budNo );
    		me.lookupReference('txt_stipulation').setExValue( budNo.substring(3,8) );
    		
    		if(cb_setBunga){
    			me.lookupReference('cb_setBunga').setExValue( true )
    		}
    		
    		var params = {
	    		 V_BUD_NO : budNo
	    		,V_BUNGA  : me.lookupReference('cb_setBunga').getExValue()
	    	}
	    	
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_daejuInfo', '', params ,me.dsDaejuCallback);
	    	},20);
    		
    	}else{
    		me.lookupReference('txt_stipulation').focus();
    	}
    	
    	
    	me.lookupReference('memoBtn').setHidden(true);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_acceptGbn', '', null ,me.dsAcceptCallback);
    		
    	},650);
    	
    	console.log(me.getView().up('[isRootView=true]').getController().callSetRecType());
    	
    	
    },
    dsAcceptCallback : function(me, success, form, action){
    	if(success){
    		me.getViewModel().getStore('ds_acceptGbn').getAt(0).set("NAME", "전체");
    		me.getViewModel().getStore('ds_acceptGbn').getAt(0).set("CODE", "0");
    		me.lookupReference('lc_acceptGbn').setExValue(me.getView().up('[isRootView=true]').getController().callSetRecType())
    		
    		
    		var index = me.getViewModel().getStore('ds_acceptGbn').find("CODE", '10', 0, false, true, true);
    		console.log('dsAcceptCallback = ', index);
    		me.getViewModel().getStore('ds_acceptGbn').removeAt(index);
    		
    		setTimeout(function(){
        	},150);
    	}
    },
    onCheckBudNo : function (){
    	var me = this;
    	
    	
    	var hid_bud_no  = exCommon.getRepVal(me.lookupReference('hid_bud_no').getExValue(), "");
    	var cb_setBunga = exCommon.getRepVal(me.lookupReference('cb_setBunga').getExValue(), "");
    	
    	if( me.lookupReference('cb_setBudNo').getExValue() &&  hid_bud_no != ""){
    		exCommon.setCustBudNo( hid_bud_no   );
    		if(cb_setBunga){
    			exCommon.setCustBunGa( me.lookupReference('cb_setBunga').getExValue() );
    		}else{
    			exCommon.setCustBunGa( 0 );
    		}
		}else{
			exCommon.setCustBudNo(  ""  );
			exCommon.setCustBunGa( 0 );
		}
    },
    onCheckBunga : function (){
    	
    	var me = this;
    	
    	var hid_bud_no  = exCommon.getRepVal(me.lookupReference('hid_bud_no').getExValue(), "");
    	var cb_setBunga = me.lookupReference('cb_setBunga').getExValue()
    	
    	console.log('hid_bud_no= ', hid_bud_no);
    	console.log('cb_setBunga= ', cb_setBunga);
    	
    	if( (cb_setBunga &&  hid_bud_no != "") || (!cb_setBunga &&  hid_bud_no != "")){
    		
    		var params = {
	    		 V_BUD_NO : hid_bud_no
	    		,V_BUNGA  : me.lookupReference('cb_setBunga').getExValue()
	    	}
	    	
	    	
	    	setTimeout(function(){
	    		me.callStore(me, 'ds_daejuInfo', '', params ,me.dsDaejuCallback);
	    	},20);
    		
    		if(cb_setBunga){
    			exCommon.setCustBunGa( true);
    		}else{
    			exCommon.setCustBunGa( 0 );
    		}
    	}else{
    		exCommon.setCustBunGa( 0 );
    	}
    	
    	
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearch();
    	}
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onSearchRec : function(opts , nowValue , oldValue){
    	var me  = this;
    	
    	var BUD_NO = exCommon.getRepVal(me.lookupReference('hid_bud_no').getExValue() );
    	var VALUE  = exCommon.getRepVal(me.lookupReference('lc_acceptGbn').getExValue() );
    	
    	
    	if( BUD_NO != "" && VALUE != "" && oldValue != null){
    		var params = {
	       		 V_BUD_NO     : BUD_NO
	       		,V_BUNGA      : me.lookupReference('cb_setBunga').getExValue()
	       		,V_ACCEPT_GBN : VALUE
	       	};
    		
    		
    		setTimeout(function(){
           		me.callStore(me, 'ds_recHisInfo', '', params  ,me.dsRecCallback);
           	},50);
    	}
    } ,
    onSearchRecCall : function(){
    	var me  = this;
    	
    	var BUD_NO = exCommon.getRepVal(me.lookupReference('hid_bud_no').getExValue() );
    	var VALUE  = exCommon.getRepVal(me.lookupReference('lc_acceptGbn').getExValue() );
    	var params = {
       		 V_BUD_NO     : BUD_NO
       		,V_BUNGA      : me.lookupReference('cb_setBunga').getExValue()
       		,V_ACCEPT_GBN : VALUE
       	};
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_recHisInfo', '', params  ,me.dsRecCallback);
       	},50);
    	
    },
    dsRecCallback : function(me, success, form, action){
    	
    	if(!success){
    		return false;
    	}
    	
    	
    	if( me.getViewModel().getStore('ds_recHisInfo').getCount() > 0 ){
    	} 
    	try{
			if(action._params.V_TYPE == 'init'){
        		
    			if(action._params.V_ACCEPT_GBN == '15'){
    				setTimeout(function(){
    					console.log(action._params.V_ACCEPT_GBN = '14');
    	           		me.callStore(me, 'ds_recHisInfo14', '', action._params  ,me.dsRec14Callback);
    	           	},50);
    			}
        		
        		me.getView().up('[isRootView=true]').getController().callRecHis(recArray);
			}
		}catch (e) {}	
    	
    },
    dsRec14Callback : function(me, success, form, action){
		var rFlag    = 0;
    	var recArray = new Array();
    	
    	var row      = me.getViewModel().getStore('ds_recHisInfo14').getCount();
    	for(var i = 0; i < row ; i++){
    		var record = me.getViewModel().getStore('ds_recHisInfo14').getAt(i)
			recArray[rFlag]  = record.data;
			rFlag++;
    	}
    	me.getView().up('[isRootView=true]').getController().callRecHis(recArray);
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
    	var cnt = me.getViewModel().getStore('ds_daejuInfo').getCount();
    	console.log('dsDaejuCallback = ', success);
    	if(success && cnt > 0){
    		
    		me.lookupReference('memoBtn').setHidden(false);
    		
    		
    		if( me.lookupReference('cb_setBudNo').getExValue() ){
    			exCommon.setCustBudNo(  me.lookupReference('hid_bud_no').getExValue()  );
    			exCommon.setCustBunGa( me.lookupReference('cb_setBunga').getExValue() );
    		}else{
    			exCommon.setCustBudNo(  ""  );
    			exCommon.setCustBunGa( 0 );
    		}
    		
    		var record = me.getViewModel().getStore('ds_daejuInfo').getAt(0);
    		me.lookupReference('txt_daeju_no').setExValue(record.get("BUD_NO"));
    		me.lookupReference('txt_daeju_nm').setExValue(record.get("NAME_KOR"));
    		me.lookupReference('txt_sacred_nm').setExValue(record.get("SACRED_KOR"));
    		me.lookupReference('txt_telNo1').setExValue(record.get("TELNO1"));
    		me.lookupReference('txt_telNo2').setExValue(record.get("TELNO2"));
    		me.lookupReference('txt_telNo3').setExValue(record.get("TELNO3"));
    		me.lookupReference('txt_MobiletelNo1').setExValue(record.get("MOBILE_TELNO1"));
    		me.lookupReference('txt_MobiletelNo2').setExValue(record.get("MOBILE_TELNO2"));
    		me.lookupReference('txt_MobiletelNo3').setExValue(record.get("MOBILE_TELNO3"));
    		me.lookupReference('txt_addr1').setExValue(record.get("ADDR1"));
    		me.lookupReference('txt_addr2').setExValue(record.get("ADDR2"));
    		
    		
    		var params = {
       			 V_BUD_NO : action._params.V_BUD_NO
       			,V_BUNGA  : action._params.V_BUNGA
       		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_familyInfo', '', params ,me.dsFamillyCallback);
        	},50);
    		
    		me.getView().up('[isRootView=true]').getController().onDelAll();
    		
    	}
    },
    dsFamillyCallback : function(me, success, form, action){
    	console.log('dsFamillyCallback = ', success);
    	
		if(success){
			
			var params = {
       			 V_BUD_NO : action._params.V_BUD_NO
       			,V_BUNGA  : action._params.V_BUNGA
       		};
    		
			
			var ACCEPT_GBN = me.getView().up('[isRootView=true]').getController().callSetRecType();
			
			setTimeout(function(){
				me.lookupReference('lc_acceptGbn').setExValue(ACCEPT_GBN);
        	},10);
			
    		setTimeout(function(){
        		me.callStore(me, 'ds_spiritInfo', '', params ,me.dsSpirtCallback);
        	},100);
    		
		}
		
		
	},
	dsSpirtCallback : function(me, success, form, action){
		console.log("dsSpirtCallback ");
		
		
		var BUD_NO = me.lookupReference('hid_bud_no').getExValue();
		var index = me.getViewModel().getStore('ds_familyInfo').find("BUD_NO", BUD_NO, 0, false, true, true);
		
		var params = {
			 V_BUD_NO        : action._params.V_BUD_NO
			,MEMO            : me.getViewModel().getStore('ds_daejuInfo').getAt(0).get("MEMO")
			,SMS_YN          : me.getViewModel().getStore('ds_familyInfo').getAt(index).get("SMS_TRANS")
			,MOBILE_TELNO1   : me.getViewModel().getStore('ds_familyInfo').getAt(index).get("MOBILE_TELNO1")
			,MOBILE_TELNO2   : me.getViewModel().getStore('ds_familyInfo').getAt(index).get("MOBILE_TELNO2")
			,MOBILE_TELNO3   : me.getViewModel().getStore('ds_familyInfo').getAt(index).get("MOBILE_TELNO3")
			,PROPOSAL_BUD_NM : me.getViewModel().getStore('ds_familyInfo').getAt(index).get("NAME_KOR")  
			,PROPOSAL_BUD_NO : me.getViewModel().getStore('ds_familyInfo').getAt(index).get("BUD_NO")
		}
		
		me.getView().up('[isRootView=true]').getController().onCallback002(params);
		
		try{
			var params = {
	       		 V_BUD_NO     : action._params.V_BUD_NO
	       		,V_BUNGA      : me.lookupReference('cb_setBunga').getExValue()
	       		,V_ACCEPT_GBN : me.getView().up('[isRootView=true]').getController().callSetRecType()
	       		,V_TYPE       : 'init'
	       	};
	    	
    		setTimeout(function(){
           		me.callStore(me, 'ds_recHisInfo', '', params  ,me.dsRecCallback);
           	},50);
	    	
			
			
			var array = new Array();
	    	var cnt  = me.getViewModel().getStore('ds_familyInfo').getCount();
	    	for(var i = 0; i< cnt ; i++){
	    		var record = me.getViewModel().getStore('ds_familyInfo').getAt(i)
	    		array[i] = record.data;
	    	}// for
	    	
	    	var sArray = new Array();
	    	var row  = me.getViewModel().getStore('ds_spiritInfo').getCount();
	    	for(var i = 0; i < row ; i++){
	    		var record = me.getViewModel().getStore('ds_spiritInfo').getAt(i)
	    		sArray[i]  = record.data;
	    	}// for
	    	
	    	me.getView().up('[isRootView=true]').getController().callFamilyInfo(array ,sArray);
	    	
		}catch (e) {
			console.log('가족 영가 정보가 필요한 접수가 아니다.', e);
		}
	},
	onMemo : function(){
		var me = this;
		
		var params ={
			V_BUD_NO : me.lookupReference('hid_bud_no').getExValue()				
		};
		me.openPopup('ExFrm.view.com.memo',  params, null);
	},
	inDaejuInfoCheck : function (){
		var me = this;
		console.log('inDaejuInfoCheck');
		
		try{
			if(me.getViewModel().getStore('ds_daejuInfo').getCount() == 1){
				return true;
			}
		}catch (e) {}

		setTimeout(function(){
			Ext.Msg.alert('알림',   "신도 조회후 접수 가능합니다.");    				
		},50);
		me.lookupReference('txt_stipulation').focus();
		
		return false;
	},
	onReceipt : function (){
		var me = this;
		
		var row = me.getViewModel().getStore('ds_daejuInfo').getCount();
		if(row == 0){
			setTimeout(function(){
				Ext.Msg.alert('알림',   "검색후 작업하십시오.");    				
			},50);
			return false;
		}
		
		var V_BUD_NO = me.lookupReference('txt_daeju_no').getExValue();
		var V_DAEJU  = me.lookupReference('txt_daeju_nm').getExValue();
		
		var params = {
			 V_BUD_CODE : V_BUD_NO.substring(0,10)
			,V_DAEJU    : V_DAEJU
			,V_PGM_NM   : "수납현황"
		}
		me.openPopup('ExFrm.view.rec.rec000p_05',  params, null);
	},
	onCellDbClick : function(me2 , td , cellIndex , record , tr , rowIndex , e , eOpts ){
		var me   = this;
	
	
		var getData = record.data;
		
		console.log("hid_bud_no = "+ me.lookupReference('hid_bud_no').getExValue());
		getData.sinDaejuBud_no = me.lookupReference('hid_bud_no').getExValue();
		
		console.log('getData = ', getData);
		
		
		var ACCEPT_GBN   = getData.ACCEPT_GBN;
		var LIMIT_YN     = getData.LIMIT_YN;
		var APPROVAL_GBN = getData.APPROVAL_GBN; 
		
		if( ACCEPT_GBN == 2  ||  ACCEPT_GBN == 9  ||  ACCEPT_GBN == 13  ||  ACCEPT_GBN == 15 || (ACCEPT_GBN == 4 && APPROVAL_GBN == 3) ){
			me.openPopup('ExFrm.view.rec.rec000p_02',  getData, me.onSunapReceive);
		}else{
			console.log('제사정보');
			me.openPopup('ExFrm.view.rec.rec000p_02_type1',  getData, me.onSunapReceive);
		}
    },
    onSunapReceive : function(params , me){    	
    	console.log('onSunapReceive');
    	me.onSearchRecCall();
    },
    getTxtBudNo : function(){
    	var me = this;
    	
    	
    	var params = {
    		 txt_budNo     : me.lookupReference('hid_bud_no').getExValue()
    		,cb_setBunga   : me.lookupReference('cb_setBunga').getExValue()
    		,SINDO_SEX_GBN : me.getViewModel().getStore('ds_daejuInfo').getAt(0).get("SINDO_SEX_GBN")
    		,BUD_NM 	   : me.lookupReference('txt_daeju_nm').getExValue()
    	}
    	return params;
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onIndeungSunab : function(){
    	var me = this;
    	
    	var V_BUD_NO = exCommon.getRepVal(me.lookupReference('hid_bud_no').getExValue() , '');
    	
    	if(V_BUD_NO == ''){
    		return;
    	}
    	
    	
    	console.log(me.getViewModel().getStore('ds_daejuInfo').getAt(0).data)
    	
    	var params = {
    		 V_BUNGA  : me.lookupReference('cb_setBunga').getExValue()
    		,V_BUD_NO : V_BUD_NO
    		,MOBILE_TELNO1   : me.getViewModel().getStore('ds_daejuInfo').getAt(0).get("MOBILE_TELNO1")
    		,MOBILE_TELNO2   : me.getViewModel().getStore('ds_daejuInfo').getAt(0).get("MOBILE_TELNO2")
    		,MOBILE_TELNO3   : me.getViewModel().getStore('ds_daejuInfo').getAt(0).get("MOBILE_TELNO3")
    		,BUYER_NAME      : me.getViewModel().getStore('ds_daejuInfo').getAt(0).get("NAME_KOR")
    		,PROPOSAL_BUD_NO : me.getViewModel().getStore('ds_daejuInfo').getAt(0).get("BUD_NO")
    	}
    	
    	console.log('onIndeungSunab', params);
    	me.openPopup('ExFrm.view.rec.rec000p_06',  params, null);
    },
    onPray : function(){
    	var me = this;
    	
    	var stroe = me.getViewModel().getStore('ds_familyInfo');
    	
    	var rowCnt = stroe.getCount(); 
    	if( rowCnt  == 0){
			setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색 후 작업하세요');    				
			},50);
    	}
    	
    	console.log(exCommon.user.death_type);
    	
    	var url = 'ExFrm.view.sin.sin001p_07';
    	if(exCommon.user.death_type == '2'){
    		url = 'ExFrm.view.sin.sin001p_07_000031';
    	}
    	
    	me.openPopup(url,  stroe, null);
    },
    callSetRec : function(ACCEPT_GBN){
		console.log('callSetRec = ',ACCEPT_GBN );
	},
	callDaejuInfo : function(){
		var me  = this;
		console.log('callDaejuInfo');
		console.log( me.getViewModel().getStore('ds_daejuInfo').getAt(0) );
		return me.getViewModel().getStore('ds_daejuInfo').getAt(0);
	}
})
