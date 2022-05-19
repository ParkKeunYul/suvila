Ext.define('ExFrm.view.rec.rec018w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec018w_01',
    onDestroy : function() {
    },
    onInit:function(){
    	var me = this;
    
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_year', '', null ,me.dsYearCallback);
    	},50);
    	
    },
    dsYearCallback : function(me, success, form, action){
    	if(success && me.getViewModel().getStore('ds_year').getCount() > 0){
    		var GIBU_DAY_CODE = me.getViewModel().getStore('ds_year').getAt(0).get("GIBU_DAY_CODE");
    		me.lookupReference('lc_year').setExValue(GIBU_DAY_CODE);
    		me.lookupReference('lc_year_end').setExValue(GIBU_DAY_CODE);
    	}// if
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_temple_info', '', null ,me.dsTempleCallback);
    	},50);
    	
    },
    dsTempleCallback : function(me, success, form, action){
    	if(success){
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
        		 DEPU_CODE 		     : DEPU_CODE+''
        		,TEMPLE_NAME 		 : TEMPLE_NAME+''
        		,TEMPLE_ADDR 		 : TEMPLE_ADDR+''
        		,TEMPLE_CD 			 : TEMPLE_CD+''
        		,TEMPLE_REG_NO 		 : TEMPLE_REG_NO+''
        		,SOJAE_TEMPLE_NAME   : SOJAE_TEMPLE_NAME+''
        		,SOJAE_TEMPLE_ADDR   : SOJAE_TEMPLE_ADDR+''
        		,SOJAE_TEMPLE_REG_NO : SOJAE_TEMPLE_REG_NO+''
        		,YYYY 				 : YYYY+''
        		,MM 				 : MM+''
        		,DD 				 : DD+''
        		,IMG_URL             : exCommon.user.imgIP+'/rec/REC015W_01/selectImage.suvila?TEMPLE_CD='+TEMPLE_CD+''
        	};
        	console.log(data);
        	me.getViewModel().getStore('ds_print_master').add(data);
    	}
    	
    	
    	setTimeout(function(){
    		me.onSelect();
    	},50);
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
    	me.lookupReference('hid_bud_no').setExValue( params.BUD_NO );
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	var params = {
    		 V_YEAR     : me.lookupReference('lc_year').getExValue()
    		,V_YEAR_END : me.lookupReference('lc_year_end').getExValue()
    		,V_BUD_NO   : me.lookupReference('txt_budNo').getExValue()
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback : function(me, success, form, action){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_excel1', '', action._params ,me.dsExcel1Callback);
    	},50);
    },
    dsExcel1Callback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_excel2', '', action._params ,me.dsExcel2Callback);
    	},50);
    },
    dsExcel2Callback : function(me, success, form, action){
    	me.lookupReference('rec018w_01_a').getView().select(0);
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		var SEQ        = record[0].get("SEQ");
    		
    		var params = {
    			 V_BUD_NO  : record[0].get("BUD_NO")
    			,V_GIBU_NO : record[0].get("GIBU_NO")
    			,V_YEAR    : record[0].get("GIBU_DAY")
    		}
    		setTimeout(function(){
        		me.callStore(me, 'ds_detail', '', params ,me.dsDetailCallback);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsDetailCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec018w_01_b').getView().select(0);
    	}
    },
    onExcel : function(){
    	var me = this;
    	exCommon.excelDown( me.lookupReference('rec018w_01_a'), 'issue', '기부금 영수증 발급대장',  me.getViewModel().getStore('ds_main').getCount());	
    },
    onIssueG : function(){
    	var me = this;
    	exCommon.excelDown( me.lookupReference('rec018w_01_p'), 'issue_p', '발급명세서 개인',  me.getViewModel().getStore('ds_excel1').getCount());	
    },
    onIssueB : function(){
    	var me = this;
    	
    	if(me.getViewModel().getStore('ds_excel2').getCount() <= 0){
    		exCommon.msgAlert("발급명세서(법인) 데이터가 존재하지 않습니다.");
    		return;
    	}
    	
    	exCommon.excelDown( me.lookupReference('rec018w_01_bz'), 'issue_b', '발급명세서 법인',  me.getViewModel().getStore('ds_excel2').getCount());	
    },
    onCrossLineClick:function(record, data, index, rowIndex, eOpts){
    	var me = this;
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	var ACCEPT_SEQ = exCommon.getRepVal( data.get("ACCEPT_SEQ") , "" );
    	if(ACCEPT_SEQ == ""){
    		exCommon.msgAlert("발행취소된 건입니다.");
    		return;
    	}
    	
    	me.openPopup('ExFrm.view.rec.rec018p_01_mouse',  data.data , me.onReceivePopup);
    },
    onReceivePopup:function(V_SUC, me){
    	console.log('onReceivePopup = ', V_SUC);
    	if( V_SUC ){
    		me.onSelect();
    	}
    },
    onRePrint : function(){
    	var me = this;
    	
    	var checkRecord = me.getViewModel().getStore('ds_main').findRecord('SEL_YN', true, 0, false, true, true);
    	if(checkRecord == null || checkRecord == undefined){
    		exCommon.msgAlert( '선택 후 출력하십시요.' );
    		return;
    	}
    	
    	
    	me.getViewModel().getStore('ds_param').removeAll();
    	me.getViewModel().getStore('ds_print_detail').removeAll();
    	
    	
    	
    	var g_row = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var Check    = exCommon.getRepVal(g_record.get("BULJUNHAM"), '');
    		var BUD_NO   = exCommon.getRepVal(g_record.get("BUD_NO"), '');
    		var GIBU_NO  = exCommon.getRepVal(g_record.get("GIBU_NO"), '');
    		var GIBU_DAY = exCommon.getRepVal(g_record.get("GIBU_DAY"), '');
    		var CRT_DATE = exCommon.getRepVal(g_record.get("CRT_DATE"), '');
    		var SEL_YN   = exCommon.getRepVal(g_record.get("SEL_YN"), '');
    		
    		
    		
    		var ACCEPT_SEQ = exCommon.getRepVal(g_record.get("ACCEPT_SEQ"), '');
    		
    		if( (SEL_YN  || SEL_YN == true || SEL_YN =='T' ) && ACCEPT_SEQ != '' ){
    			
    			var data ={
    				 BUD_NO  : BUD_NO
    				,GIBU_NO : GIBU_NO
    				,GIBU_DAY: GIBU_DAY
    			}
    			me.getViewModel().getStore('ds_param').add(data);
    		}// if SEL_YN
    	}// for g_row
    	
    	exCommon.addParamSetting(
    		 me
    		,'ds_param'
    		,'newData'
    	);
    	
    	var params = {
    		newData : me.lookupReference('newData').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_print_detail', '', params ,me.onPrintDetailCallback);
    	},10);
    },
    onPrintDetailCallback : function(me, success, form, action){
    	if(!success){
    		return;
    	}
    	
    	var g_row = me.getViewModel().getStore('ds_main').getCount();
    	var p_row = me.getViewModel().getStore('ds_print_detail').getCount();
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	for(var i = 0; i < g_row ; i++){
    		var g_record  = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var SEL_YN     = exCommon.getRepVal(g_record.get("SEL_YN"), '');
    		var ACCEPT_SEQ = exCommon.getRepVal(g_record.get("ACCEPT_SEQ"), '');
    		var CRT_DATE   = exCommon.getRepVal(g_record.get("CRT_DATE"), '');
    		var GIBU_NO    = exCommon.getRepVal(g_record.get("GIBU_NO"), '');
    		var GIBU_DAY   = exCommon.getRepVal(g_record.get("GIBU_DAY"), '');
    		var GIBU_INFO  = GIBU_DAY + ''+GIBU_NO;
    		var YYYY = '';
    		var MM   = '';
    		var DD   = '';
    		
    		if(CRT_DATE != null && CRT_DATE != ''){
    			 YYYY          = CRT_DATE.substring(0,4);
			 	 MM            = CRT_DATE.substring(5,7);
			 	 DD            = CRT_DATE.substring(8,10);	 
		    }
    		
    		
    		if( (SEL_YN  || SEL_YN == true || SEL_YN =='T' ) && ACCEPT_SEQ != '' ){
    			var findRecord  = me.getViewModel().getStore('ds_print_detail').findRecord('GIBU_INFO', GIBU_INFO, 0, false, true, true);
    			var print_index = me.getViewModel().getStore('ds_print_detail').indexOf(findRecord);
    			var data = {
    				DEPU_CODE 		     : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('DEPU_CODE') , '')
    		       ,TEMPLE_NAME 		 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_NAME') , '')
    		       ,TEMPLE_ADDR 		 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_ADDR') , '')
    		       ,TEMPLE_CD 			 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_CD') , '')
    		       ,TEMPLE_REG_NO 		 : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_REG_NO') , '')
    		       ,SOJAE_TEMPLE_NAME    : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('SOJAE_TEMPLE_NAME') , '')
    		       ,SOJAE_TEMPLE_ADDR    : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('SOJAE_TEMPLE_ADDR') , '')
    		       ,SOJAE_TEMPLE_REG_NO  : exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('SOJAE_TEMPLE_REG_NO') , '')
    		       ,YYYY 				 : YYYY
    		       ,MM 				     : MM
    		       ,DD 				     : DD
    		       ,IMG_URL              : exCommon.user.imgIP+'/rec/REC015W_01/selectImage.suvila?TEMPLE_CD='+exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_CD') , '')    		       
    		       ,NO                   : ''
    		       ,BUD_NAME             : ''
    		       ,BUD_REG_NO           : ''
    		       ,BUD_ADDR             : ''
    		       ,gibuList             : jsonGibuData
    			}
    			var jsonGibuData = [];
    			
    			for ( j=print_index; j<p_row; j++ ) {
    				var  p_record = me.getViewModel().getStore('ds_print_detail').getAt(j);
    				
    				if( exCommon.getRepVal(p_record.get("EA"), '')  == ''){
    					p_record.set("EA",'');
	       	    	}
	       	    	 
	       	    	if( exCommon.getRepVal(p_record.get("PRICE"), '')  == ''){
	       	    		p_record.set("PRICE",'');
	       	    	}
	       	    	
	       	    	if( exCommon.getRepVal(p_record.get("NO"), '')  != ''){
	       	    		data.NO = p_record.get("NO");
	       	    	}
	       	    	
    				
    				jsonGibuData.push( p_record.data );
    				
    				data.BUD_NAME   = exCommon.getRepVal(p_record.get("BUD_NAME"), '');
    				data.BUD_REG_NO = exCommon.getRepVal(p_record.get("BUD_REG_NO"), '');
    				data.BUD_ADDR   = exCommon.getRepVal(p_record.get("BUD_ADDR"), '');
    				if(data.TEMPLE_CD == '000060' && data.BUD_REG_NO.length == 6){
    	    	    	 mainData.BUD_REG_NO = mainData.BUD_REG_NO + "  - *******";
    	    		 }
    				
    				var NO = exCommon.getRepVal(p_record.get("NO"), '');
    				if(NO == ''){
    					break;
    				}
    			}// for j
    			data.gibuList = jsonGibuData;
    			//console.log(data);
    			
    			jsonPrintData.push(data);
    		
    		}// if SEL_YN
    	}// for
    	
    	jsonAllData = {
	     	'info' : jsonPrintData
	    };
   		/* 
   		console.log('jsonPrintData = ' ,jsonAllData );
   		console.log(Ext.encode(jsonAllData));
   		*/
   		var params = {
   			 FILE_PATH  : '/rec018w_01_rp_main.ozr'
   			,PRINT_DATA : jsonAllData
   		};
   		setTimeout(function(){
   			me.openPopup('ExFrm.view.com.print',  params, null);
    	},100);
   		 
   		console.log(jsonAllData);
   		console.log(Ext.encode(jsonAllData));
    },
    onPrintToT : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(row == 0){
    		exCommon.msgAlert('검색된 데이터가 없습니다.');
    		return;
    	}
    	
    	var params = {
    		V_YEAR :  me.lookupReference('lc_year').getExValue()
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_total', '', params ,me.dsTotalCallback);
    	},50);
    },
    dsTotalCallback : function(me, success, form, action){
    	if(success){
    		var ds_total        = me.getViewModel().getStore('ds_total').getAt(0);
    		var ds_print_master =  me.getViewModel().getStore('ds_print_master').getAt(0);
    		
    		if((ds_total.get("CCNT") == "0" || ds_total.get("CCNT") == 0) && (ds_total.get("PCNT") == "0" || ds_total.get("PCNT") == 0)  ){
    			exCommon.msgAlert('출력할 자료가 없습니다.');
    			return;
    		}
    		
    		if(ds_total.get("CCNT") == "0" || ds_total.get("CCNT") == 0){
    			ds_print_master.set("TYPE1", '개인'+'');
    			ds_print_master.set("TYPE2", '');
    			
    			ds_print_master.set("CEA"     , ds_total.get("PCNT")+'');
    			ds_print_master.set("CEA2"    , ds_total.get("PCNT")+'');
    			ds_print_master.set("CPRICE"  , ds_total.get("PTOTAL")+'');
    			ds_print_master.set("CPRICE2" , ds_total.get("PTOTAL")+'');
    			ds_print_master.set("PEA"     , '');
    			ds_print_master.set("PEA2"    , '');
    			ds_print_master.set("PPRICE"  , '');
    			ds_print_master.set("PPRICE2" , '');
    		}
    		else if(ds_total.get("PCNT") == "0" || ds_total.get("PCNT") == 0){
    			ds_print_master.set("TYPE1", '법인');
    			ds_print_master.set("TYPE2", '');
    			ds_print_master.set("CEA"     , ds_total.get("CCNT")+'');
    			ds_print_master.set("CEA2"    , ds_total.get("CCNT")+'');
    			ds_print_master.set("CPRICE"  , ds_total.get("CTOTAL")+'');
    			ds_print_master.set("CPRICE2" , ds_total.get("CTOTAL")+'');
    			
    			ds_print_master.set("PEA"     , '');
    			ds_print_master.set("PEA2"    , '');
    			ds_print_master.set("PPRICE"  , '');
    			ds_print_master.set("PPRICE2" , '');
    		}
    		else{
    			ds_print_master.set("TYPE1", '개인');
    			ds_print_master.set("TYPE2", '법인');
    			
    			ds_print_master.set("CEA"     , ds_total.get("CCNT")+'');
    			ds_print_master.set("CEA2"    , ds_total.get("CCNT")+'');
    			ds_print_master.set("CPRICE"  , ds_total.get("CTOTAL")+'');
    			ds_print_master.set("CPRICE2" , ds_total.get("CCTOTAL")+'');
    			
    			ds_print_master.set("PEA"     , ds_total.get("PCNT")+'');
    			ds_print_master.set("PEA2"    , ds_total.get("PCNT")+'');
    			ds_print_master.set("PPRICE"  , ds_total.get("PTOTAL")+'');
    			ds_print_master.set("PPRICE2" , ds_total.get("PTOTAL")+'');
    		}
    		
    		
    		
    		var YYYY_MM_DD      = ds_print_master.get("YYYY") + '년';
    			YYYY_MM_DD     += ds_print_master.get("MM")   + '월';
    			YYYY_MM_DD     += ds_print_master.get("DD")   + '일';
    		
    		
    		ds_print_master.set("YEAR_SDATE", me.lookupReference('lc_year').getExValue()+'-01-01');
    		ds_print_master.set("YEAR_EDATE", me.lookupReference('lc_year').getExValue()+'-12-31');
    		ds_print_master.set("YYYY_MM_DD", YYYY_MM_DD+'');
    		
    		ds_print_master.set("TEMPLE_NAME2", me.getViewModel().getStore('ds_temple_info').getAt(0).get("TEMPLE_NAME")+'');
    		ds_print_master.set("TELNO"       , me.getViewModel().getStore('ds_temple_info').getAt(0).get("TELNO")+'');
    		ds_print_master.set("REP_NAME"    , me.getViewModel().getStore('ds_temple_info').getAt(0).get("REP_NAME")+'');
    		
			
    		var jsonAllData   = {};
        	var jsonPrintData = [];
    		
    		jsonAllData = {
		     	'info' : ds_print_master.data
		    };
    		/*
    		console.log(jsonAllData);
       		console.log(Ext.encode(jsonAllData));
       		*/
       		var params = {
      			 FILE_PATH  : '/rec018w_01_rp_main3.ozr'
      			,PRINT_DATA : jsonAllData
      		};
      		setTimeout(function(){
      			me.openPopup('ExFrm.view.com.print',  params, null);
      		},100);
    		
    	}else{
    		exCommon.msgAlert('출력할 자료가 없습니다.');
			return;
    	}
    },
    onExcelSub : function(){
    	var me=  this;
    	
    	var grid = me.lookupReference('rec018w_01_b');
    	exCommon.excelDown(grid, 'GIBU DETAIL', '발급 상세내역',  me.getViewModel().getStore('ds_detail').getCount());
    },
    onPrintSub : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_detail').getCount();
    	
    	if(row == 0){
    		exCommon.msgAlert('검색된 데이터가 없습니다.');
    		return;
    	}
    	
    	var cashCnt    = 0;
    	var articleCnt = 0;
    	
    	for(var i=0;i<row; i++ ){
    		var Type =   me.getViewModel().getStore('ds_detail').getAt(i).get("APPROVAL_GBN");
    		
    		if(Type == 5){
    			articleCnt ++;
    		}else{
    			cashCnt ++;
    		}
    	}
    	
    	
    	var articleMok = parseInt(articleCnt / 3);
    	var cashMok    = parseInt(cashCnt / 7);
    	
    	
    	if( (articleCnt % 3) != 0) articleMok = articleMok+1;
    	if( (cashCnt % 7) != 0)    cashMok = cashMok+1;
    	
    	
    	var roop = cashMok;
    	if(roop < articleMok) roop = articleMok;
    	
    	
    	
    	
    	me.getViewModel().getStore('ds_print').removeAll();
    	
    	var selection = me.lookupReference('rec018w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	console.log(roop);
    	
    	for(var i = 0; i< roop ; i++){
    		
    		console.log('for');
    		
    		var TEMPLE_CD = me.getViewModel().getStore('ds_temple_info').getAt(0).get('TEMPLE_CD');
    		var JUMIN_NO  = selection.get("JUMIN_NO");
    		
    		if(JUMIN_NO == null || JUMIN_NO == "" ){
    			JUMIN_NO = selection.get("SAUP_NO");
    			JUMIN_NO = JUMIN_NO.substr(0,3)+ "-"+ JUMIN_NO.substr(3,2)+ "-"+ JUMIN_NO.substr(5);
    		}
    		
    		if(JUMIN_NO.length == 6 && TEMPLE_CD == "000060"){
    			JUMIN_NO = JUMIN_NO + " - *******";
    		}
    		
    		var data = {
    			 IMG_URL      : exCommon.user.imgIP+'/rec/REC015W_01/selectImage.suvila?TEMPLE_CD='+exCommon.getRepVal(me.getViewModel().getStore('ds_print_master').getAt(0).get('TEMPLE_CD') , '')
    			,YYYY         : me.getViewModel().getStore('ds_print_master').getAt(0).get('YYYY')             
    			,MM           : me.getViewModel().getStore('ds_print_master').getAt(0).get('MM')
    			,DD           : me.getViewModel().getStore('ds_print_master').getAt(0).get('DD')
    			,NO           : me.getViewModel().getStore('ds_detail').getAt(0).get('GIBU_DAY') + '-' + me.inTransNumberFormat( me.getViewModel().getStore('ds_detail').getAt(0).get('GIBU_NO'), 6)
    			,BUD_NAME     : selection.get("NAME_KOR")
    			,BUD_REG_NO   : JUMIN_NO
    			,TEMPLE_NAME  : me.getViewModel().getStore('ds_temple_info').getAt(0).get('TEMPLE_NAME')
    		}  
    		me.getViewModel().getStore('ds_print').add(data);
    	}
    	
    	var fCnt        = 0
    	var rowPosition = 0;
    	
    	for(var i=0;i<row; i++ ){
    		var record = me.getViewModel().getStore('ds_detail').getAt(i); 
    		
    		if(record.get("APPROVAL_GBN") != 5){
    			if(fCnt == 7){
    				rowPosition++;				
    				fCnt = 0;
    			}
    			fCnt++;
    			var RECEIPT_DATE = record.get("RECEIPT_DATE");
    		
    			var ds_print_record = me.getViewModel().getStore('ds_print').getAt(rowPosition);
    			
    			ds_print_record.set("var"+((5*fCnt)-4) , me.inTransNumberFormat( ((rowPosition)*7)+fCnt , 2 ));
    			ds_print_record.set("var"+((5*fCnt)-3) , RECEIPT_DATE.substr(0,4)+"/"+RECEIPT_DATE.substr(4,2)+"/"+RECEIPT_DATE.substr(6,2));
    			ds_print_record.set("var"+((5*fCnt)-2) , record.get("REC_NM"));
    			ds_print_record.set("var"+((5*fCnt)-1) , me.inComma( exCommon.getRepVal(record.get("GIBU_AMT"),'')) );
    		} //
    	}// for
    	
    	
    	var sCnt = 0;
    	rowPosition = 0;
    	for(var i=0;i<row; i++ ){
    		var record = me.getViewModel().getStore('ds_detail').getAt(i);
    		
    		if(record.get("APPROVAL_GBN") == 5){
    			if(sCnt == 3){
    				rowPosition++;				
    				sCnt = 0;
    			}
    			sCnt++;							
    			var RECEIPT_DATE = record.get("RECEIPT_DATE");
    			
    			console.log(i + '-->rowPosition = >', rowPosition);
    			var ds_print_record = me.getViewModel().getStore('ds_print').getAt(rowPosition);
    			
    			ds_print_record.set('var'+((7*sCnt)+29),  me.inTransNumberFormat(((rowPosition)*3)+sCnt,2) );
    			ds_print_record.set('var'+((7*sCnt)+30),  RECEIPT_DATE.substr(0,4)+"/"+RECEIPT_DATE.substr(4,2)+"/"+RECEIPT_DATE.substr(6,2) );
    			ds_print_record.set('var'+((7*sCnt)+31),  record.get("REC_NM") );
    			ds_print_record.set('var'+((7*sCnt)+32),  record.get("EA") );
    			ds_print_record.set('var'+((7*sCnt)+33),  me.inComma( exCommon.getRepVal(record.get("PRICE"),'') ) ) ;
    			ds_print_record.set('var'+((7*sCnt)+34),  me.inComma( exCommon.getRepVal(record.get("GIBU_AMT"),'') ) );		
    		} //
    	}// for
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	for(var i = 0; i< me.getViewModel().getStore('ds_print').getCount(); i++){
    		var data = me.getViewModel().getStore('ds_print').getAt(i).data;
    		
    		jsonPrintData.push(data);
    	}// for
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	console.log( Ext.encode(jsonAllData) );
    	
    	var params = {
    		 FILE_PATH  : '/rec018w_01_rpTest_n.ozr' 
			,PRINT_DATA : jsonAllData
		};
   	
   	setTimeout(function(){
   		me.openPopup('ExFrm.view.com.print',  params, null);
      	},100);
    	
    },
    inTransNumberFormat : function(_date, num){
    	 var zero = '';
	   	  _date = _date + "";
	
	   	 if (_date.length < num) {
	   	   for (i = 0; i < num - _date.length; i++)
	   	    zero += '0';
	   	  }
	   	  return zero + _date;
    },
    inComma : function (num){
    	var len, point, str; 
        
        num = num + ""; 
        point = num.length % 3 ;
        len = num.length; 
       
        str = num.substring(0, point); 
        while (point < len) { 
            if (str != "") str += ","; 
            str += num.substring(point, point + 3); 
            point += 3; 
        } 
         
        return str;
    }
    
})
