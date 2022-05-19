Ext.define('ExFrm.view.sin.sin015w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin015w_01',
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	
    	console.log('exCommon.user.printFormYn =', exCommon.user.printFormYn);
    	console.log('exCommon.user.printFormYn =', exCommon.user.printFormYn);
    	console.log('exCommon.user.printFormYn =', exCommon.user.printFormYn);
    	console.log('exCommon.user.printFormYn =', exCommon.user.printFormYn);
    	console.log('exCommon.user.printFormYn =', exCommon.user.printFormYn);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kibu', '', null ,me.dsKibuCallback);
    	},50);
    },
    dsKibuCallback : function(me, success, form, action){
    	var data = {
    		 CODE : ''
    		,NAME : '없음'
    	}
    	me.getViewModel().getStore('ds_kibu').add(data);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_sexgbn', '', null ,me.dsSexCallback);
    	},50);
    	
    },
    dsSexCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_equal_gbn', '', null ,me.dsEqualCallback);
    	},50);
    },
    dsEqualCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_spiritual_gbn', '', null ,me.dsSpirCallback);
    	},50);
    },
    dsSpirCallback : function(me, success, form, action){
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_StipulationSin').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('cb_StipulationYoung').setExValue(exCommon.user.searchGbn);
    	
    },
    onSearchTypeChangeSin : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulationSin'), me.lookupReference('hid_bud_no'));
    },
    onSearchEnterSin: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearch();
    	}
    },
    onBudSearch : function(){
    	var me = this;
    	
    	var searchValue = "";
    	var searchgbn   =  me.lookupReference('cb_StipulationSin').getExValue();
    	var searchword  =  me.lookupReference('txt_stipulationSin').getExValue();
    	var flag        = false;
    	
    	if(searchword == ""){
    		setTimeout(function(){
				Ext.Msg.alert('알림',  me.lookupReference('txt_stipulationSin').getRawValue() +"를 입력 후 조회 버튼을 눌러주세요.");    				
			},50);
    		me.lookupReference('txt_stipulationSin').focus();
    		return false;
    	}
    	
    	if(searchgbn == "BUD_NO" && searchword.length < 5){
			for(var a=searchword.length; a<5; a++){
				searchword = "0" + searchword;
			}					
			me.lookupReference('txt_stipulationSin').setExValue(searchword);
		}
    	
    	
    	searchValue = me.lookupReference('txt_stipulationSin').getExValue();
		
		var pos   = searchValue.indexOf('5243350001313266');		
		var fCard = searchValue.indexOf('=');
		var bCard = searchValue.lastIndexOf('=');
		var cNum  = searchValue.indexOf('=1234567');
    	
		if( !flag ){
			exCommon.setCustCardNo("");
			
			exCommon.onSindoSearch(
	    		 me.lookupReference('cb_StipulationSin')
	    		,me.lookupReference('txt_stipulationSin')
	    		,me
	    		,me.onBudSearchReceive
	    	);
		}
    },
    onBudSearchReceive : function(params, me){
    	var sel_BudSearchGbn = me.lookupReference('txt_stipulationSin').getExValue( );
    	var txt_stipulation  = me.lookupReference('txt_stipulationSin').getExValue( );
    	me.lookupReference('txt_budNoSin').setExValue( params.BUD_NO );
    	
    	
    	me.lookupReference('em_zip_cd').setExValue( params.ZIP_CD );
    	me.lookupReference('txt_addr1_sin').setExValue( params.ADDR1 );
    	me.lookupReference('txt_addr2_sin').setExValue( params.ADDR2 );
    	me.lookupReference('txt_addr3_sin').setExValue( params.ADDR3 );
    	me.lookupReference('txt_bldg_num_sin').setExValue( params.BLDG_NUM );
    	
    	
    	
    	var param = {
    		V_BUD_CODE : params.BUD_NO.substr(0,10) 
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_sindo', '', param ,me.dsSindoCallback);
    	},50);
    	
    },
    dsSindoCallback : function(me, success, form, action){
    	me.lookupReference('sin015w_01_a').getView().select(0);
    },
    onSearchTypeChangeBill : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation_bill'), me.lookupReference('hid_bud_no_bill'));
    },
    onFindAddr : function(){
    	var me = this;
    	find_addr(
    		  me 
    		,'em_zip_cd'
    		,'txt_addr1_sin'
    		,'txt_addr3_sin'
    		,'txt_bldg_num_sin' 
    		,'txt_addr3_sin'
    		,'layerSin015'
    	);
    	
    },
    onSearchTypeChangeYoung : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulationYoung'), me.lookupReference('hid_bud_noYoung'));
    },
    onSearchEnterYoung: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearchYoung();
    	}
    },
    onBudSearchYoung : function(){
    	var me = this;
    	
    	var searchValue = "";
    	var searchgbn   =  me.lookupReference('cb_StipulationYoung').getExValue();
    	var searchword  =  me.lookupReference('txt_stipulationYoung').getExValue();
    	var flag        = false;
    	
    	if(searchword == ""){
    		setTimeout(function(){
				Ext.Msg.alert('알림',  me.lookupReference('txt_stipulationYoung').getRawValue() +"를 입력 후 조회 버튼을 눌러주세요.");    				
			},50);
    		me.lookupReference('txt_stipulationYoung').focus();
    		return false;
    	}
    	
    	if(searchgbn == "BUD_NO" && searchword.length < 5){
			for(var a=searchword.length; a<5; a++){
				searchword = "0" + searchword;
			}					
			me.lookupReference('txt_stipulationYoung').setExValue(searchword);
		}
    	
    	
    	searchValue = me.lookupReference('txt_stipulationYoung').getExValue();
		
		var pos   = searchValue.indexOf('5243350001313266');		
		var fCard = searchValue.indexOf('=');
		var bCard = searchValue.lastIndexOf('=');
		var cNum  = searchValue.indexOf('=1234567');
    	
		if( !flag ){
			exCommon.setCustCardNo("");
			
			exCommon.onSindoSearch(
	    		 me.lookupReference('cb_StipulationYoung')
	    		,me.lookupReference('txt_stipulationYoung')
	    		,me
	    		,me.onBudSearchYoungReceive
	    	);
		}
    },
    onBudSearchYoungReceive : function(params, me){
    	var sel_BudSearchGbn = me.lookupReference('txt_stipulationYoung').getExValue( );
    	var txt_stipulation  = me.lookupReference('txt_stipulationYoung').getExValue( );
    	me.lookupReference('txt_budNoYoung').setExValue( params.BUD_NO );
    	
    	me.lookupReference('em_zip_cd_death').setExValue( params.ZIP_CD );
    	me.lookupReference('txt_addr1_death').setExValue( params.ADDR1 );
    	me.lookupReference('txt_addr2_death').setExValue( params.ADDR2 );
    	me.lookupReference('txt_addr3_death').setExValue( params.ADDR3 );
    	me.lookupReference('txt_bldg_num_death').setExValue( params.BLDG_NUM );
    	
    	
    	console.log('onBudSearchYoungReceive = ',params);
    	
    	
    	var param = {
    		 V_BUD_CODE : params.BUD_NO.substr(0,10) 
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_bokwi', '', param ,me.dsBokwiCallback);
    	},50);
    	
    },
    dsBokwiCallback : function(me, success, form, action){
    	me.lookupReference('lc_bokwi').setExValue("00000");
    	
    	
    	me.getViewModel().getStore('ds_bokwi').getAt(0).set("DISPLAY_TEMP", "선택");
    	
    },
    onBokChange : function(opts ,  now , old){
    	var me = this;
    	console.log('onBokChange old = ', old);
    	console.log('onBokChange now = ', now);
    	

    	
    	if(now == '00000'){
    		me.lookupReference('txt_bokwi_nm').setExValue( "" );
        	me.lookupReference('lc_kibu').setExValue( "" );
        	me.getViewModel().getStore('ds_death').removeAll();
        	
    	}else{
    		var selRecord = me.getViewModel().getStore('ds_bokwi').findRecord('FIND_VALUE_TEMP', now, 0, false, true, true);
        	
        	console.log('selRecord = ', selRecord);
        	
        	
        	me.lookupReference('txt_bokwi_nm').setExValue( selRecord.get("NAME_KOR") );
        	me.lookupReference('lc_kibu').setExValue( selRecord.get("BOKWI_KIBU_GBN") );
        	
        	var param = {
        		 V_BOKWI_BUD_NO : now.substr(0,13)
           		,V_DEATH_GBN    : now.substr(13,1)
           	}
        	
        	setTimeout(function(){
        		me.callStore(me, 'ds_death', '', param ,me.dsDeathCallback);
        	},50);
    	}
    	
    	
    },
    dsDeathCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('sin015w_01_b').getView().select(0);
    	}
    },
    onFindAddrDeath : function(){
    	var me = this;
    	find_addr(
    		  me 
    		,'em_zip_cd_death'
    		,'txt_addr1_death'
    		,'txt_addr3_death'
    		,'txt_bldg_num_death' 
    		,'txt_addr2_death'
    		,'layerSin015'
    	);
    	
    },
    onNewSin : function(){
    	var me  = this;
    	
    	
    	me.lookupReference('em_zip_cd').setExValue( "" );
    	me.lookupReference('txt_addr1_sin').setExValue( "" );
    	me.lookupReference('txt_addr2_sin').setExValue( "" );
    	me.lookupReference('txt_addr3_sin').setExValue( "" );
    	me.lookupReference('txt_bldg_num_sin').setExValue( "" );
    	me.lookupReference('txt_stipulationSin').setExValue( "" );
    	
    	
    	
    	me.onDeleteAllSin();
    	
    },
    onAddSin : function(){
    	var me  = this;
    	var data = {
    		CHECK_P : true
    	};
    	
    	var row = me.getViewModel().getStore('ds_sindo').getCount();
    	
    	me.getViewModel().getStore('ds_sindo').add(data);
    	me.lookupReference('sin015w_01_a').getView().select(row);
    	
    },
    onDeleteSin : function(){
    	var me  = this;
    	
    	exCommon.gridRemove(
    		 me
    		,'sin015w_01_a'
    		,'ds_sindo'
    	);
    },
    onDeleteAllSin : function(){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_sindo').removeAll();
    	
    	me.onAddSin();
    },
    onUpSin : function(){
    	var me  = this;
    	
    	var selectedRecord = me.lookupReference('sin015w_01_a').getView().getSelectionModel().getSelection()[0];
    	var rowIndex = me.lookupReference('sin015w_01_a').getStore().indexOf(selectedRecord);
    	
    	if(rowIndex == 0){
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_sindo').insert(rowIndex -1, selectedRecord.data );
    	
    	
    },
    onDownSin : function(){
    	var me  = this;
    	
    	var selectedRecord = me.lookupReference('sin015w_01_a').getView().getSelectionModel().getSelection()[0];
    	var rowIndex       = me.lookupReference('sin015w_01_a').getStore().indexOf(selectedRecord);
    	
    	if(me.getViewModel().getStore('ds_sindo').getCount() == (rowIndex-1)){
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_sindo').insert(rowIndex +1, selectedRecord.data );
    },
    onUpDeath : function(){
    	var me  = this;
    	
    	var selectedRecord = me.lookupReference('sin015w_01_b').getView().getSelectionModel().getSelection()[0];
    	var rowIndex = me.lookupReference('sin015w_01_b').getStore().indexOf(selectedRecord);
    	
    	if(rowIndex == 0){
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_death').insert(rowIndex -1, selectedRecord.data );
    	
    	
    },
    onDownDeath : function(){
    	var me  = this;
    	
    	var selectedRecord = me.lookupReference('sin015w_01_b').getView().getSelectionModel().getSelection()[0];
    	var rowIndex       = me.lookupReference('sin015w_01_b').getStore().indexOf(selectedRecord);
    	
    	if(me.getViewModel().getStore('ds_death').getCount() == (rowIndex-1)){
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_death').insert(rowIndex +1, selectedRecord.data );
    },
    onAddDeath : function(){
    	var me  = this;
    	var data = {
    		CHECK_P : true
    	};
    	
    	var row = me.getViewModel().getStore('ds_death').getCount();
    	
    	me.getViewModel().getStore('ds_death').add(data);
    	
    	
    	me.lookupReference('sin015w_01_b').getView().select(row);
    	
    },
    onDeleteDeath : function(){
    	var me  = this;
    	
    	exCommon.gridRemove(
    		 me
    		,'sin015w_01_b'
    		,'ds_death'
    	);
    },
    onDeleteAllDeath : function(){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_death').removeAll();
    	
    	me.onAddDeath();
    },
    onNewYoung : function(){
    	var me  = this;
    	me.getViewModel().getStore('ds_bokwi').removeAll();
    	me.lookupReference('txt_hyo').setExValue( "" );
    	me.lookupReference('txt_bokwi_nm').setExValue( "" );
    	me.lookupReference('lc_kibu').setExValue( "F" );
    	me.lookupReference('em_zip_cd_death').setExValue( "" );
    	me.lookupReference('txt_addr1_death').setExValue( "" );
    	me.lookupReference('txt_addr2_death').setExValue( "" );
    	me.lookupReference('txt_addr3_death').setExValue( "" );
    	me.lookupReference('txt_bldg_num_death').setExValue( "" );
    	me.onDeleteAllDeath();
    	
    },
    onPrintSin : function(){
    	var me = this;
    	
    	
    	var row = me.getViewModel().getStore('ds_sindo').getCount();
    	
    	if(row <= 0){
    		exCommon.msgAlert('선택후 출력하십시요.' );
    		return;
    	}
    	
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	var jsonPrayData = [];
    	
    	
    	me.lookupReference('txt_addr1_sin').getExValue(  );
    	me.lookupReference('txt_addr2_sin').getExValue(  );
    	me.lookupReference('txt_addr3_sin').getExValue(  );
    	
    	var ADDR     = gf_trim(me.lookupReference('txt_addr1_sin').getExValue() + " " +me.lookupReference('txt_addr2_sin').getExValue()+ " " +me.lookupReference('txt_addr3_sin').getExValue());
    	var FDATE    = exCommon.setDateFormat( exCommon.getNowDate() );
    	var BUD_CODE = me.getViewModel().getStore('ds_sindo').getAt(0).get("BUD_CODE");
    	for(var i = 0; i < row ; i++){
    		
    		var sel_record = me.getViewModel().getStore('ds_sindo').getAt(i);
    		
    		var BIRTHDAY = exCommon.getRepVal(sel_record.get("BIRTHDAY"), '').replace(/-/gi, ""); 
    		
    		
    		
    		if(BIRTHDAY.length == 4){
    			BIRTHDAY = BIRTHDAY + '年';
    		}
    		
    		if(BIRTHDAY.length == 6){
    			BIRTHDAY = BIRTHDAY.substr(0,4) + '年 '+BIRTHDAY.substr(4,2)+'月 ';
    		}
    		
    		if(BIRTHDAY.length == 8){
    			BIRTHDAY = BIRTHDAY.substr(0,4) + '年 '+BIRTHDAY.substr(4,2)+'月 ' +BIRTHDAY.substr(6,2)+'日生';
    		}
    		
    		var subData = {
				REPRESEN_REL    : exCommon.getRepVal(sel_record.get("REPRESEN_REL"), '')
			   ,NAME_KOR        : exCommon.getRepVal(sel_record.get("NAME_KOR"), '')
			   ,BIRTHDAY        : BIRTHDAY
    		};
    		
    		if(sel_record.get('CHECK_P') || sel_record.get('CHECK_P') == 'T'){
    			jsonPrayData.push(subData)
    		}
    		
    		
    		
    	}// for
    	
    	var jsonBasicData = {
    		 ADDR     : ADDR
    		,FDATE    : FDATE
    		,BUD_CODE : BUD_CODE
    	}
    	
    	
    	jsonAllData = {
			 "base"  : jsonBasicData    			 
 			,"fInfo" : jsonPrayData
 			,"YInfo" : null
    	};
    	
    	var FILE_PATH = '/sin001p_07_000031_rp_chukWon.ozr';
    		
    	console.log('exCommon.user.printFormYn  = ', exCommon.user.printFormYn);
    	
    	/*
    	if(exCommon.user.printFormYn != 'T'){
    		FILE_PATH = '/sin015w_01_rp_chukWon.ozr';
    	}
    	*/
    	var params = {
 			 FILE_PATH  : FILE_PATH
 			,PRINT_DATA : jsonAllData
 		};
    	
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    },
    onPrintYoung : function (){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_death').getCount();
    	
    	if(row <= 0){
    		exCommon.msgAlert('선택후 출력하십시요.' );
    		return;
    	}
    	
    	
    	var ADDR              = gf_trim(me.lookupReference('txt_addr1_death').getExValue() + " " +me.lookupReference('txt_addr2_death').getExValue()+ " " +me.lookupReference('txt_addr3_death').getExValue());
    	var BUD_CODE          = me.getViewModel().getStore('ds_death').getAt(0).get("BUD_CODE");
    	var HYO_REL           = me.lookupReference('txt_hyo').getExValue();
    	var bokwi_kibu_gbn_nm = me.lookupReference('lc_kibu').getRawValue() ;
    	var BOKWI_NAME_KOR    = me.lookupReference('txt_bokwi_nm').getExValue() ;
    	var jsonBasicData = {
    		 BUD_CODE          : BUD_CODE
       		,ADDR              : ADDR
       		,HYO_REL           : HYO_REL
       		,BOKWI_NAME_KOR    : BOKWI_NAME_KOR
       		,BOKWI_KIBU_GBN_NM : bokwi_kibu_gbn_nm
       		,HYO_REL           : HYO_REL
       	}
    	
    	console.log( jsonBasicData );
    	
    	
    	
    	var jsonYoungData = [];
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_death').getAt(i);
    		
    		var SEX_GBN    = exCommon.getRepVal(record.get("SEX_GBN"),"");
    		var SEX_GBN_NM = '';
    		var f_index = me.getViewModel().getStore('ds_sexgbn').find("CODE",SEX_GBN, 0, false, true, true);
    		if(f_index > -1){
    			SEX_GBN_NM = me.getViewModel().getStore('ds_sexgbn').getAt(f_index).get("NAME");
    		}
    		
    		var EQUAL_GBN     =  exCommon.getRepVal(record.get("EQUAL_GBN"),"");
    		var EQUAL_GBN_NM  = '';
    		if(EQUAL_GBN == 2){
    			var e_index = me.getViewModel().getStore('ds_equal_gbn').find("CODE",EQUAL_GBN, 0, false, true, true);
    			if(e_index > -1){
        			EQUAL_GBN_NM = me.getViewModel().getStore('ds_equal_gbn').getAt(f_index).get("NAME");
        		}
    		}else{
    			
    			var SPIRITUAL_GBN_CD = exCommon.getRepVal(record.get("SPIRITUAL_GBN_CD"),"");
    			var e_index = me.getViewModel().getStore('ds_equal_gbn').find("CODE",EQUAL_GBN, 0, false, true, true);
    		}
    		
    		
    		
    		var SPIRITUAL_GBN = '';
    		var data = {
    			 MANG          : exCommon.getRepVal(record.get("SPIRITUAL_GBN_CD"),"") != "2" ? "망" : ""
    			,DECE_REL      : exCommon.getRepVal(record.get("DECE_REL"),"")
    			,BON_SGBN      : exCommon.getRepVal(record.get("BON_SGBN"),"") 
    			,NAME_KOR      : exCommon.getRepVal(record.get("NAME_KOR"),"")
    			,SPIRITUAL_GBN : EQUAL_GBN_NM
    		};
    		
    		jsonYoungData.push(data);
    	}
    	
    	jsonBasicData.prayList = jsonYoungData;
      	
    	
    	console.log(jsonBasicData);
    	
    	
    	var jsonAllData = {
   			  "all"  : jsonBasicData    			 
       	};
       	
    	var FILE_PATH = '/sin001p_07_000031_rp_cheanHon.ozr';
       		
       	if(exCommon.user.printFormYn != 'T'){
       	}
       	       
       	var params = {
			 FILE_PATH  : FILE_PATH
			,PRINT_DATA : jsonAllData
		};
   	
       	setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
      	},100);
    }
})
