Ext.define('ExFrm.view.rec.rec014w_05Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec014w_05',
    onSearch:function(params){
        var me = this;
       // console.log('rec024w_02 alias');
    },
    onCalled:function(params){
    },
    onInit:function(){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_jungak', '', null ,me.dsJungakCallback);
    	},50);
    	
    },
    onAfterRender:function(){
    	var me = this;
    	
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('me_AcceptSDate').setExValue( exCommon.getMinusDay(365) );
		me.lookupReference('me_AcceptEDate').setExValue( today );
		
		// 체크박스
		fn_getBudNo(me, '' , "all");
    	
    },
    dsJungakCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_death_gender', '', null ,me.dsGenderCallback);
    	},50);
    },
    dsGenderCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_death_equal', '', null ,me.dsEqualCallback);
    	},50);
    },
    dsEqualCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_death_spiritual', '', null ,null);
    	},50);
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no')  , me.lookupReference('txt_budNo'));
    },
    onDateField : function(){
    	
    	var me = this;
    	
    	var cb_date = me.lookupReference('cb_date').getExValue();
    	
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	
    	if(cb_date == 1){
    		me.lookupReference('me_AcceptSDate').format = "Y-m-d";
    		me.lookupReference('me_AcceptEDate').format = "Y-m-d";
    	}else{
    		me.lookupReference('me_AcceptSDate').format = "Y-m";
    		me.lookupReference('me_AcceptEDate').format = "Y-m";
    	}
    	
    	me.lookupReference('me_AcceptSDate').setExValue( me_AcceptSDate );
		me.lookupReference('me_AcceptEDate').setExValue( me_AcceptEDate );
    },    
    onSelect : function(){
    	
    	var me = this;
    	
    	var me_AcceptSDate = me.lookupReference('me_AcceptSDate').getExValue();
    	var me_AcceptEDate = me.lookupReference('me_AcceptEDate').getExValue();
    	var cb_date        = me.lookupReference('cb_date').getExValue();
    	
    	var params = {
    		 V_SEARCH_BUD_NO    : me.lookupReference('hid_bud_no').getExValue()
       		,V_DATE_GBN      	: me.lookupReference('cb_date').getExValue()
       		,V_ACCEPT_SDATE 	: me_AcceptSDate
       		,V_ACCEPT_EDATE 	: me_AcceptEDate
       		,V_AGREE_SHEET_YN	: me.lookupReference('cb_agree_sheet_yn').getExValue()
       		,V_FAMILY_SHEET_YN	: me.lookupReference('cb_family_sheet_yn').getExValue()
       		,V_HOJUK_SHEET_YN	: me.lookupReference('cb_hojuk_sheet_yn').getExValue()
       		,V_JUMIN_SHEET_YN	: me.lookupReference('cb_jumin_sheet_yn').getExValue()
       		,V_JEJUK_SHEET_YN	: me.lookupReference('cb_jejuk_sheet_yn').getExValue()
       		,V_JUNGAK_CD        : me.lookupReference('lc_jungak').getExValue()
       	};
    	
		setTimeout(function(){
    		me.callStore(me, 'ds_detail', '', params ,me.onSelectCallback);
    	},50);
    		
    	    	
    },
    onSelectCallback : function(me, success, form, action){
    	console.log('onSelectCallback');
    	if(success){
    		me.lookupReference('rec014w_05_a').getView().select(0);    		
    	}
    },
    onSearchBonEnter : function(me2, e, eOpts ){
    	var me = this;
    	console.log('onSearchBonEnter = ', e.keyCode);
    	if(e.keyCode == 13){
    		me.onSearchBon();
    	}
    },
    onSearchBon : function(){
    	var me = this;
    	
    	var params = {
    		 group_cd  : "BON"
    		,remark    : encodeURI(me.lookupReference('txt_hyo_bon').getExValue())
    	}
    	
    	setTimeout(function(){
          	me.callStore(me, 'ds_hyo_bon', '', params , me.dshyobonCallback);
        },50);
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		
    		me.lookupReference('txt_jungak_nm').setExValue(record[0].get("JUNGAK_NM"));
    		me.lookupReference('txt_light_no').setExValue(record[0].get("LIGHT_NO"));
    		me.lookupReference('txt_bud_no').setExValue(record[0].get("BUD_NO"));
    		me.lookupReference('txt_bud_nm').setExValue(record[0].get("BUD_NM"));
    		me.lookupReference('txt_addr1').setExValue(record[0].get("ADDR1"));
    		me.lookupReference('txt_addr2').setExValue(record[0].get("ADDR2"));
    		me.lookupReference('em_zip_cd').setExValue(record[0].get("ZIP_CD"));
    		me.lookupReference('cbx_agree_sheet_yn').setExValue(record[0].get("AGREE_SHEET_YN"));
    		me.lookupReference('cbx_family_sheet_yn').setExValue(record[0].get("FAMILY_SHEET_YN"));
    		me.lookupReference('cbx_hojuk_sheet_yn').setExValue(record[0].get("HOJUK_SHEET_YN"));
    		me.lookupReference('cbx_jumin_sheet_yn').setExValue(record[0].get("JUMIN_SHEET_YN"));
    		me.lookupReference('cbx_jejuk_sheet_yn').setExValue(record[0].get("JEJUK_SHEET_YN"));
    		me.lookupReference('txt_hyo_bon').setExValue(record[0].get("HYO_LAST_NAME"));
    		me.lookupReference('lc_hyo_bon').setExValue(record[0].get("HYO_BON"));
    		me.lookupReference('cbx_acenst_yn').setExValue(record[0].get("ACENST_YN"));
    		me.lookupReference('cbx_nameless_yn').setExValue(record[0].get("NAMELESS_YN"));
    		me.lookupReference('txt_tel_no').setExValue(record[0].get("TEL_NO"));
    		me.lookupReference('txt_mobile_telno').setExValue(record[0].get("MOBILE_TELNO"));
    		me.lookupReference('em_accept_dt').setExValue(record[0].get("ACCEPT_DT"));
    		me.lookupReference('em_bulsa_dt').setExValue(record[0].get("BULSA_DT"));
    		me.lookupReference('em_bongan_dt').setExValue(record[0].get("BONGAN_DT"));
    		me.lookupReference('em_rebong_dt').setExValue(record[0].get("REBONG_DT"));
    		me.lookupReference('me_PaymentPlanAmt').setExValue(record[0].get("PAYMENT_PLAN_AMT"));
    		me.lookupReference('me_PaymentAmt').setExValue(record[0].get("PAYMENT_AMT_RESULT"));
    		me.lookupReference('me_MisuAmt').setExValue(record[0].get("MISU_AMT_RESULT"));
    		me.lookupReference('txt_top_mng_nm').setExValue(record[0].get("YOUNGTOP_MEMO"));
    		me.lookupReference('ta_youngtop_memo').setExValue(record[0].get("YOUNGTOP_MEMO"));
    		
    		
    		var HYO_BON = exCommon.getRepVal(record[0].get("HYO_BON") , "");
    		me.lookupReference('lc_hyo_bon').setExValue(HYO_BON);
    		
    		var params = {
       			 V_TEMPLE_CD  		 : record[0].get("TEMPLE_CD")
       			,V_BUD_NO     		 : record[0].get("BUD_NO")
       			,V_BUNGA      		 : false
       			,V_SEARCH_ACCEPT_SEQ : record[0].get("ACCEPT_SEQ")
       		}
       		
       		setTimeout(function(){
           		me.callStore(me, 'ds_youngtop_youngga', '', params ,me.dsYoungTopCallback);
           	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsYoungTopCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec014w_05_b').getView().select(0);
    	}
    	
    	var params = {
       		 group_cd  : "BON"
       		,remark    : encodeURI(me.lookupReference('txt_hyo_bon').getExValue())
       	}
       	
       	setTimeout(function(){
         	me.callStore(me, 'ds_hyo_bon', '', params , me.dhbCallback);
       },50);
    },
    dhbCallback : function(me, success, form, action){
    	var HYO_BON = me.lookupReference('lc_hyo_bon').getExValue();
    	me.lookupReference('lc_hyo_bon').setExValue(HYO_BON);
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onBudSearch();
    	}
    },
    onSortUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_youngtop_youngga').getCount();
    	if(_tCnt == 0) return false;
    	
    	
    	var fir_record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(0);
    	
    	
    	var selection = me.lookupReference('rec014w_05_b').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec014w_05_b').getStore().indexOf(selection);
    	
    	
    	if(_idx == 0) return false;
    	
    	var upRecord      = me.lookupReference('rec014w_05_b').getStore().getAt(_idx-1);
    	var upSortSeq     = upRecord.get("BONGTOP_SEQ");
    	var selectSortSeq = selection.get("BONGTOP_SEQ");
    	
    	selection.set("BONGTOP_SEQ" , upSortSeq);
    	upRecord.set("BONGTOP_SEQ"  , selectSortSeq);

    	me.getViewModel().getStore('ds_youngtop_youngga').sort([{
            property  : 'BONGTOP_SEQ',
            direction : 'ASC'
        }]);
    },
    onDownUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_youngtop_youngga').getCount();
    	if(_tCnt == 0) return false;
    	
    	var fir_record = me.getViewModel().getStore('ds_youngtop_youngga').getAt(0);
    	
    	
    	var selection = me.lookupReference('rec014w_05_b').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('rec014w_05_b').getStore().indexOf(selection);
    	if(_tCnt == (_idx+1) ) return false;
    	
    	var downRecord   = me.lookupReference('rec014w_05_b').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("BONGTOP_SEQ");
    	
    	var selectSortSeq = selection.get("BONGTOP_SEQ");
    	
    	selection.set("BONGTOP_SEQ" , downSortSeq);
    	downRecord.set("BONGTOP_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_youngtop_youngga').sort([{
            property  : 'BONGTOP_SEQ',
            direction : 'ASC'
        }]);
    },
    onAddYoung : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('rec014w_05_a').getView().getSelectionModel().getSelection()[0];
    	
    	if(selection == undefined){
    		return;
    	}
    	
    	console.log('selection = ', selection);
    	
    	var bud_no = exCommon.getRepVal( selection.get("BUD_NO") , "");
    		bud_no = bud_no.substr(0, bud_no.length-3);
    	
    	var params = {
    		 mode       : 'add'
    		,V_BUD_CODE : bud_no
    		,Grant      : ''
    		,today      : '' 
    	}
    	
    	me.openPopup('ExFrm.view.sin.sin001p_03_000033',  params, me.onAddYoungReceive);
    },
    onAddYoungReceive : function(params, me){
    	
    	var ds_youngtop_detail = me.lookupReference('rec014w_05_a').getView().getSelectionModel().getSelection()[0];
    	
    	for(var i = 0; i < params.length ; i++){
    		var YOUNGGA_BUD_NO = params[i].get("BUD_NO");
    	
    		var findRecord = me.getViewModel().getStore('ds_youngtop_youngga').findRecord('YOUNGGA_BUD_NO', YOUNGGA_BUD_NO, 0, false, true, true);
    		var cnt        = me.getViewModel().getStore('ds_youngtop_youngga').getCount();
    		
    		
    		var maxBONGTOP_SEQ = me.getViewModel().getStore('ds_youngtop_youngga').getAt(0).get("BONGTOP_SEQ");
    		
    		me.getViewModel().getStore('ds_youngtop_youngga').each(function(rec){
    			maxBONGTOP_SEQ = Math.max(maxBONGTOP_SEQ, rec.get('BONGTOP_SEQ'));
    		});
    		
    		console.log('maxBONGTOP_SEQ = ', maxBONGTOP_SEQ);
    		
    		if(findRecord == undefined){
    			var data ={
    				 TEMPLE_CD         : exCommon.user.templeCd
    				,ACCEPT_SEQ        : ds_youngtop_detail.get("ACCEPT_SEQ")
    				,SEQ               : ds_youngtop_detail.get("SEQ")
    				,BUD_NO            : ds_youngtop_detail.get("BUD_NO")
    				,BONGTOP_SEQ       : maxBONGTOP_SEQ + 1 
    				,BONGTOP_DT        : exCommon.getNowDate()
    				,YOUNGGA_BUD_NO    : params[i].get("BUD_NO")
    				,YOUNGGA_REL       : params[i].get("DECE_REL")
    				,YOUNGGA_BON       : params[i].get("YOUNGGA_BON")
    				,YOUNGGA_BUD_NM    : params[i].get("NAME_KOR")
    				,YOUNGGA_GENDER    : params[i].get("SEX_GBN")
    				,YOUNGGA_EQUAL     : params[i].get("EQUAL_GBN")
    				,YOUNGGA_SPIRITUAL : params[i].get("SPIRITUAL_GBN")
    			};
    			me.getViewModel().getStore('ds_youngtop_youngga').add(data);
    			
    		}// findRecord
    	}// for i
    },
    onDeleteYoung : function(){
    	var me = this;
    	exCommon.gridRemove(
    		 me
    		,'rec014w_05_b'
    		,'ds_youngtop_youngga'
    	);
    },
    onSaveYoung : function(){
    	var me = this;
    	
    	var flagCnt = exCommon.ChangeCount('ds_youngtop_youngga' , me);
    	if(flagCnt == 0){
    		exCommon.msgAlert('변경된 자료가 없습니다.');
    		return false;
    	}
    	
    	var jsonNewData = [];
    	var row = me.getViewModel().getStore('ds_youngtop_youngga').getCount();    	
    	for(var i = 0; i < row ; i++ ){
    		var record         = me.getViewModel().getStore('ds_youngtop_youngga').getAt(i);
    		var BONGTOP_SEQ    = exCommon.getRepVal(record.get("BONGTOP_SEQ"),"" );
    		var BONGTOP_DT     = exCommon.getRepVal(record.get("BONGTOP_DT"),"" );
    		var YOUNGGA_BUD_NM = exCommon.getRepVal(record.get("YOUNGGA_BUD_NM"),"" );
    		
    		if(BONGTOP_SEQ == ""){
				exCommon.msgAlert('봉탑순번은 필수입력 사항입니다.');
				me.lookupReference('rec014w_05_b').getView().select(i);
				return false;
			}
    		if(BONGTOP_DT == ""){
				exCommon.msgAlert('봉탑일은 필수입력 사항입니다.');
				me.lookupReference('rec014w_05_b').getView().select(i);
				return false;
			}
    		if(YOUNGGA_BUD_NM == ""){
				exCommon.msgAlert('영가자명은 필수입력 사항입니다.');
				me.lookupReference('rec014w_05_b').getView().select(i);
				return false;
			}
    		jsonNewData.push(record.data);
    		
    	}// for i
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    		if (btn == 'yes') { 
    			me.lookupReference('newData').setExValue( Ext.encode(jsonNewData) );
    			me.callForm(me, '/rec/REC014W_00/saveYoungTopListInfo.suvila', me.onSaveYoungCallback , false);
    		}
    	});
    },
    onSaveYoungCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(
    		 me
    		,success
    		,action
    		,'ds_youngtop_youngga'
    	);
    },
    onSave : function(){
    	var me = this;
    	
    	var selRecord = me.lookupReference('rec014w_05_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	Ext.MessageBox.confirm('알림', '저장 하시겠습니가?', function(btn){
    		if (btn == 'yes') {
    			selRecord.set("ACCEPT_DT", exCommon.getRepVal( me.lookupReference('em_accept_dt').getExValue(), ""));
    			selRecord.set("BULSA_DT" , exCommon.getRepVal( me.lookupReference('em_bulsa_dt').getExValue(), ""));
    			selRecord.set("BONGAN_DT", exCommon.getRepVal( me.lookupReference('em_bongan_dt').getExValue(), ""));
    			selRecord.set("REBONG_DT", exCommon.getRepVal( me.lookupReference('em_rebong_dt').getExValue(), ""));
    			
    			selRecord.set("AGREE_SHEET_YN", exCommon.getCheckVal( me.lookupReference('cbx_agree_sheet_yn').getExValue() , 'T' , 'F'));
    			selRecord.set("FAMILY_SHEET_YN", exCommon.getCheckVal( me.lookupReference('cbx_family_sheet_yn').getExValue() , 'T' , 'F'));
    			selRecord.set("HOJUK_SHEET_YN", exCommon.getCheckVal( me.lookupReference('cbx_hojuk_sheet_yn').getExValue() , 'T' , 'F'));
    			selRecord.set("JUMIN_SHEET_YN", exCommon.getCheckVal( me.lookupReference('cbx_jumin_sheet_yn').getExValue() , 'T' , 'F'));
    			selRecord.set("JEJUK_SHEET_YN", exCommon.getCheckVal( me.lookupReference('cbx_jejuk_sheet_yn').getExValue() , 'T' , 'F'));
    			selRecord.set("ACENST_YN", exCommon.getCheckVal( me.lookupReference('cbx_acenst_yn').getExValue() , 'T' , 'F'));
    			selRecord.set("NAMELESS_YN", exCommon.getCheckVal( me.lookupReference('cbx_nameless_yn').getExValue() , 'T' , 'F'));
    			
    			selRecord.set("HYO_BON", exCommon.getRepVal( me.lookupReference('lc_hyo_bon').getExValue(), ""));
    			selRecord.set("HYO_REL", exCommon.getRepVal( me.lookupReference('sel_hyo_rel').getExValue(), ""));
    			selRecord.set("TOP_MNG_NM", exCommon.getRepVal( me.lookupReference('txt_top_mng_nm').getExValue(), ""));
    			selRecord.set("YOUNGTOP_MEMO", exCommon.getRepVal( me.lookupReference('ta_youngtop_memo').getExValue(), ""));
    			
    			//saveYoungTopList
    			exCommon.fnGridSaveAll(
    				 me
    				,'ds_detail'
    				,'newData'
    				,'uptData'
    				,'delData'
    				,'/rec/REC014W_00/saveYoungTopList.suvila'
    				,me.onSaveCallbck
    				,true
    			);
    			
    			
    		}
    	});
    },
    onSaveCallbck : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(
    		 me
    		,success
    		,action
    		,'ds_detail'
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
    setBudNo : function(){
    	var me = this;
    	fn_setBudNo(me, '');
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
})
