Ext.define('ExFrm.view.cad.cad001w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cad001w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	var me = this;
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_group', '', null, me.dsGroupCallback)
    	},50);
    },
    dsGroupCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_mobile_telno', '', null, me.dsMobileCallback)
    	},50);
    },
    dsMobileCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_telno', '', null, me.dsTelCallback)
    	},50);
    },
    dsTelCallback : function (me, success, records, action){
    	me.onSelect();
    },
    onAfterRender:function(){
    	var me  = this;
    },
    onSindoAdd : function(){
    	var me = this;
    	me.openPopup('ExFrm.view.cad.cad001p_01',  null, me.onAddSindoReceive);
    },
    onAddSindoReceive : function(array, me){
    	
    	if(array.length > 0){
    		for(var i = 0; i< array.length ; i++){
    			
    			var data = {
    				 SORT_SEQ      : 0
    				,NAME_KOR      : array[i].NAME_KOR
    				,SACRED_KOR    : array[i].SACRED_KOR
    				,ZIP_CD        : array[i].ZIP_CD
    				,ADDR1         : array[i].ADDR1
    				,ADDR2         : array[i].ADDR2
    				,TELNO1        : array[i].TELNO1
    				,TELNO2        : array[i].TELNO2
    				,TELNO3        : array[i].TELNO3
    				,MOBILE_TELNO1 : array[i].MOBILE_TELNO1
    				,MOBILE_TELNO2 : array[i].MOBILE_TELNO2
    				,MOBILE_TELNO3 : array[i].MOBILE_TELNO3
    				,COMPANY_NAME  : array[i].COMPANY_NAME
    				,COMPANY_POS   : array[i].COMPANY_POS
    				,COMPANY_TEL1  : array[i].COMPANY_TEL1
    				,COMPANY_TEL2  : array[i].COMPANY_TEL2
    				,COMPANY_TEL3  : array[i].COMPANY_TEL3
    				,EMAIL         : array[i].EMAIL
    				,BLDG_NUM      : array[i].BLDG_NUM
    				,ADDR3         : array[i].ADDR3
    				,SQL_MODE      : 'I'
    			};
    			me.getViewModel().getStore('ds_main').add(data);
    			
    			
    		}//for
    		var rowCount = me.getViewModel().getStore('ds_main').getCount();
    		me.lookupReference('cad001w_01_a').getView().select(rowCount-1);
			me.lookupReference('txt_name_kor').focus();
    	}
    	
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <= 0){
    			me.lookupReference('txt_sel_index').setExValue(-1);
    			return;
    		}
    		
    		//이전값 세팅
			var preIndex    = me.lookupReference('txt_sel_index').getExValue();
			if(preIndex != -1){
				me.inSettingRecord(me, preIndex);
			}// if preIndex
    		
			
			var nowIndex       = me.lookupReference('cad001w_01_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
    		me.lookupReference('txt_name_kor').setExValue( record[0].get("NAME_KOR") );
    		me.lookupReference('txt_sacred_kor').setExValue( record[0].get("SACRED_KOR") );
    		me.lookupReference('em_zip_cd').setExValue( record[0].get("ZIP_CD") );
    		me.lookupReference('txt_addr1').setExValue( record[0].get("ADDR1") );
    		me.lookupReference('txt_addr2').setExValue( record[0].get("ADDR2") );
    		me.lookupReference('lc_telno1').setExValue( record[0].get("TELNO1") );
    		me.lookupReference('txt_telno2').setExValue( record[0].get("TELNO2") );
    		me.lookupReference('txt_telno3').setExValue( record[0].get("TELNO3") );
    		me.lookupReference('txt_addr3').setExValue( record[0].get("ADDR3") );
    		me.lookupReference('lc_mobile_telno1').setExValue( record[0].get("MOBILE_TELNO1") );
    		me.lookupReference('txt_mobile_telno2').setExValue( record[0].get("MOBILE_TELNO2") );
    		me.lookupReference('txt_mobile_telno3').setExValue( record[0].get("MOBILE_TELNO3") );
    		me.lookupReference('txt_email').setExValue( record[0].get("EMAIL") );
    		me.lookupReference('txt_sachal_nm').setExValue( record[0].get("SACHAL_NM") );
    		me.lookupReference('txt_company_name').setExValue( record[0].get("COMPANY_NAME") );
    		me.lookupReference('txt_company_pos').setExValue( record[0].get("COMPANY_POS") );
    		me.lookupReference('lc_company_tel1').setExValue( record[0].get("COMPANY_TEL1") );
    		me.lookupReference('txt_company_tel2').setExValue( record[0].get("COMPANY_TEL2") );
    		me.lookupReference('txt_company_tel3').setExValue( record[0].get("COMPANY_TEL3") );
    		me.lookupReference('lc_faxno1').setExValue( record[0].get("FAXNO1") );
    		me.lookupReference('txt_faxno2').setExValue( record[0].get("FAXNO2") );
    		me.lookupReference('txt_faxno3').setExValue( record[0].get("FAXNO3") );
    		me.lookupReference('ta_memo').setExValue( record[0].get("MEMO") );
    		
    		
    		var params = {
    			V_SORT_SEQ : record[0].get("SORT_SEQ")
    		};
    		setTimeout(function(){
        		me.callStore(me, 'ds_groupInfo', '', params, me.DsGoroupCallback);
        	},100);
    		
    	}catch(e){}
    },
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_main').getAt(index);
			
			pre_record.set("NAME_KOR"      , exCommon.getRepVal(me.lookupReference('txt_name_kor').getExValue(),''));
			pre_record.set("SACRED_KOR"    , exCommon.getRepVal(me.lookupReference('txt_sacred_kor').getExValue(),''));
			pre_record.set("ZIP_CD"        , exCommon.getRepVal(me.lookupReference('em_zip_cd').getExValue(),''));
			pre_record.set("ADDR1"         , exCommon.getRepVal(me.lookupReference('txt_addr1').getExValue(),''));
			pre_record.set("ADDR2"         , exCommon.getRepVal(me.lookupReference('txt_addr2').getExValue(),''));
			pre_record.set("TELNO1"        , exCommon.getRepVal(me.lookupReference('lc_telno1').getExValue(),''));
			pre_record.set("TELNO2"        , exCommon.getRepVal(me.lookupReference('txt_telno2').getExValue(),''));
			pre_record.set("TELNO3"        , exCommon.getRepVal(me.lookupReference('txt_telno3').getExValue(),''));
			pre_record.set("ADDR3"         , exCommon.getRepVal(me.lookupReference('txt_addr3').getExValue(),''));
			pre_record.set("MOBILE_TELNO1" , exCommon.getRepVal(me.lookupReference('lc_mobile_telno1').getExValue(),''));
			pre_record.set("MOBILE_TELNO2" , exCommon.getRepVal(me.lookupReference('txt_mobile_telno2').getExValue(),''));
			pre_record.set("MOBILE_TELNO3" , exCommon.getRepVal(me.lookupReference('txt_mobile_telno3').getExValue(),''));
			pre_record.set("EMAIL"         , exCommon.getRepVal(me.lookupReference('txt_email').getExValue(),''));
			pre_record.set("SACHAL_NM"     , exCommon.getRepVal(me.lookupReference('txt_sachal_nm').getExValue(),''));
			pre_record.set("COMPANY_NAME"  , exCommon.getRepVal(me.lookupReference('txt_company_name').getExValue(),''));
			pre_record.set("COMPANY_POS"   , exCommon.getRepVal(me.lookupReference('txt_company_pos').getExValue(),''));
			pre_record.set("COMPANY_TEL1"  , exCommon.getRepVal(me.lookupReference('lc_company_tel1').getExValue(),''));
			pre_record.set("COMPANY_TEL2"  , exCommon.getRepVal(me.lookupReference('txt_company_tel2').getExValue(),''));
			pre_record.set("COMPANY_TEL3"  , exCommon.getRepVal(me.lookupReference('txt_company_tel3').getExValue(),''));
			pre_record.set("FAXNO1"        , exCommon.getRepVal(me.lookupReference('lc_faxno1').getExValue(),''));
			pre_record.set("FAXNO2"        , exCommon.getRepVal(me.lookupReference('txt_faxno2').getExValue(),''));
			pre_record.set("FAXNO3"        , exCommon.getRepVal(me.lookupReference('txt_faxno3').getExValue(),''));
			pre_record.set("MEMO"          , exCommon.getRepVal(me.lookupReference('ta_memo').getExValue(),''));
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    DsGoroupCallback : function (me, success, records, action){
    	if(success && records.length > 0){
    		me.lookupReference('cad001w_01_b').getView().select(0);
    	}
    	
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSelect();
    	}
    },
    onSelect : function(){
    	var me  = this;
    	
    	var params ={
    		 V_KEYWORD  : encodeURI(me.lookupReference('txt_keyword').getExValue())
    		,V_CLASS_CD : me.lookupReference('lc_group').getExValue()
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.dsMainCallback)
    	},100);
    },
    dsMainCallback : function (me, success, records, action){
    	
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue(-1);
    		me.lookupReference('cad001w_01_a').getView().select(0);
    	}
    	
    },
    onAdd : function(){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	var data = {
    			 SORT_SEQ      : 0
				,NAME_KOR      : ""
				,SACRED_KOR    : ""
				,ZIP_CD        : ""
				,ADDR1         : ""
				,ADDR2         : ""
				,TELNO1        : ""
				,TELNO2        : ""
				,TELNO3        : ""
				,MOBILE_TELNO1 : ""
				,MOBILE_TELNO2 : ""
				,MOBILE_TELNO3 : ""
				,COMPANY_NAME  : ""
				,COMPANY_POS   : ""
				,COMPANY_TEL1  : ""
				,COMPANY_TEL2  : ""
				,COMPANY_TEL3  : ""
				,EMAIL         : ""
				,BLDG_NUM      : ""
				,ADDR3         : ""
				,SQL_MODE      : 'I'
    	};
    	me.getViewModel().getStore('ds_main').add(data);
    
    	
    	me.lookupReference('cad001w_01_a').getView().select(rowCount);
    },
    onDel : function(){
    	var me = this;
		
		exCommon.gridRemove(
			 me
			,'cad001w_01_a'
			,'ds_main'			
		);
		
    },
    onDelCallback : function (me, success, records, action){
    	exCommon.fnGridSaveCallback(
   			 me
   			,success
   			,action
   			,'ds_main'
	   	);
    },
    onSave : function(){
    	var me = this;
    	
    	
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	
    	
    	if(rowCount > 0){
    		var selectedRecord = me.lookupReference('cad001w_01_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('cad001w_01_a').getStore().indexOf(selectedRecord[0]);
        	me.inSettingRecord(me, index);
    	}
    	
    	
    	for(var i =0; i < rowCount ; i++){
    		var name = exCommon.getRepVal(me.getViewModel().getStore('ds_main').getAt(i).get("NAME_KOR"), '');
    		
    		if(name == ''){
    			exCommon.msgAlert('성명은 필수 입력값입니다.');
    			
    			me.lookupReference('cad001w_01_a').getView().select(i);
    			me.lookupReference('txt_name_kor').focus();
    			return false;
    		}
    	}
    	
    	exCommon.fnGridSaveAll( 
    		me
           ,'ds_main'
           ,'newData'
           ,'uptData'
           ,'delData'
           ,'/cad/CAD001W_01/onSave.suvila'
           , me.onSaveCallback
           , true
        );
    	
    },
    onSaveCallback : function (me, success, records, action){
    	
    	exCommon.fnGridSaveCallback(
	   			 me
	   			,success
	   			,action
	   			,'ds_main'
	   	);
    	
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue('-1');
    		setTimeout(function(){
    			me.onSelect();
    		},100); 
    	}
   },
    onFindAddr : function(){
    	var me = this;
    	find_addr(
	   		  me 
	   		,'em_zip_cd'
	   		,'txt_addr1'
	   		,'txt_addr3'
	   		,'txt_bldg_num' 
	   		,'txt_addr2'
	   		,'layerCad001'
	   	);
    },    
    onFindAddrReceive : function(params, me){
   		me.lookupReference('em_zip_cd').setExValue(params.ZIPCODE);
   		me.lookupReference('txt_addr1').setExValue(params.ADDR1);
   		me.lookupReference('txt_addr3').setExValue(params.ADDR3);
   		me.lookupReference('txt_bldg_num').setExValue(params.BLDG_NUM);
   		me.lookupReference('txt_addr2').focus();
    },
    onGridApply : function(){
    	var me = this;
    	
    	var selection = this.lookupReference('cad001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	selection.set("NAME_KOR"     , me.lookupReference('txt_name_kor').getExValue());
    	selection.set("SACRED_KOR"   , me.lookupReference('txt_sacred_kor').getExValue());
    	selection.set("ZIP_CD"       , me.lookupReference('em_zip_cd').getExValue());
    	selection.set("ADDR1"        , me.lookupReference('txt_addr1').getExValue());
    	selection.set("ADDR2"        , me.lookupReference('txt_addr2').getExValue());
    	selection.set("TELNO1"       , me.lookupReference('lc_telno1').getExValue());
    	selection.set("TELNO2"       , me.lookupReference('txt_telno2').getExValue());
    	selection.set("TELNO3"       , me.lookupReference('txt_telno3').getExValue());
    	selection.set("ADDR3"        , me.lookupReference('txt_addr3').getExValue());
    	selection.set("BLDG_NUM"     , me.lookupReference('txt_bldg_num').getExValue());
    	selection.set("NAME_KOR"     , me.lookupReference('txt_name_kor').getExValue());
    	selection.set("MOBILE_TELNO1", me.lookupReference('lc_mobile_telno1').getExValue());
    	selection.set("MOBILE_TELNO2", me.lookupReference('txt_mobile_telno2').getExValue());
    	selection.set("MOBILE_TELNO3", me.lookupReference('txt_mobile_telno3').getExValue());
    	selection.set("EMAIL"        , me.lookupReference('txt_email').getExValue());
    	selection.set("SACHAL_NM"    , me.lookupReference('txt_sachal_nm').getExValue());
    	selection.set("COMPANY_NAME" , me.lookupReference('txt_company_name').getExValue());
    	selection.set("COMPANY_POS"  , me.lookupReference('txt_company_pos').getExValue());
    	selection.set("COMPANY_TEL1" , me.lookupReference('lc_company_tel1').getExValue());
    	selection.set("COMPANY_TEL2" , me.lookupReference('txt_company_tel2').getExValue());
    	selection.set("COMPANY_TEL3" , me.lookupReference('txt_company_tel3').getExValue());
    	selection.set("FAXNO1"       , me.lookupReference('lc_faxno1').getExValue());
    	selection.set("FAXNO2"       , me.lookupReference('txt_faxno2').getExValue());
    	selection.set("FAXNO3"       , me.lookupReference('txt_faxno3').getExValue());
    	selection.set("MEMO"         , me.lookupReference('ta_memo').getExValue());
    	
    	console.log('onGridApply = ', selection);
    	
    },
    onExcel : function (){
    	var me = this;
    	var grid = me.lookupReference('cad001w_01_a');
    	
    	exCommon.excelDown(grid, exCommon.getNowDateTime(),'신규등록',  me.getViewModel().getStore('ds_main').getCount());
    },
   
})