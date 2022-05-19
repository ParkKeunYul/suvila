Ext.define('ExFrm.view.sin.sin013w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin013w_01',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    onHelp:function(){},
    onDestroy:function(me){},
    onInit:function(me){},
    onAfterRender:function(){
    	var me = this;
    
    	me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('txt_stipulation').focus();
    	
    	
    	var today = exCommon.getNowDate('');
    	
    	
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_smsrec', '', null ,me.smsRecCallback);
    	},50);
    },
    smsRecCallback : function (me, success, records, action){
    	
    },
    smsDocCallback  : function (me, success, records, action){
    	me.lookupReference('sin013w_01_b').getView().select( 0 );
    	me.onSelect();
    	
    	
    	me.inSmsSetting();
    	
    },
    onSearchTypeChange : function(){
    	var me = this;
    	on_resetBud(me.lookupReference('txt_stipulation'), me.lookupReference('hid_bud_no'));
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelect();
    	}
    },
    onSelect : function (){
    	var me = this;
    	
    	var V_POST_TRANS = 0;
    	var V_DAEJU      = 0;
    	
    	var params = {
    		 V_SEARCH_GBN  : me.lookupReference('cb_Stipulation').getExValue()
    		,V_SEARCH_WORD : encodeURI(me.lookupReference('txt_stipulation').getExValue())
    		,lc_org_NmAll  : me.lookupReference('lc_org_NmAll').getExValue()
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params ,me.onSelectCallback);
    	},10);
    },
    onSelectCallback: function(me, success, form, action){
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue(-1);
    		
    		
    		var row  = me.getViewModel().getStore('ds_main').getCount();
    		if(row > 0){
    			me.lookupReference('sin013w_01_a').getView().select(0);
    		}
    	}
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('sin013w_01_a');
    	    	
    	exCommon.excelDown(grid, 'sindoSms', '단체신도 명단',  me.getViewModel().getStore('ds_main').getCount());
    },
    onSearchBlur : function(m2, event, eOpts ){
    	var me = this;
    	var txt_budNo = exCommon.getRepVal( m2.value, "" );
    	
    	if(txt_budNo == ""){
    		me.lookupReference('hid_bud_no').setExValue("");
    		me.lookupReference('txt_budNo').setExValue("");
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) {
    			me.lookupReference('txt_sel_index').setExValue(-1);
    			return false;
    		}
    		
    		//이전값 세팅
			var preIndex    = me.lookupReference('txt_sel_index').getExValue();
			
			if(preIndex != -1){
				me.inSettingRecord(me, preIndex);
			}// if preIndex
    		
			var nowIndex       = me.lookupReference('sin013w_01_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
			
    		
    		me.lookupReference('txt_name_kor').setExValue(record[0].get("NAME_KOR"));
    		me.lookupReference('txt_card_no').setExValue(record[0].get("BUD_NO"));
    		me.lookupReference('txt_phone').setExValue(record[0].get("TR_PHONE"));
    		me.lookupReference('em_day').setExValue(record[0].get("DAY"));
    		me.lookupReference('em_time').setExValue( record[0].get("TIME").substr(0,2) );
    		me.lookupReference('em_timeM').setExValue( record[0].get("TIME").substr(2,2) );
    		me.lookupReference('tx_tr_msg').setExValue(record[0].get("TR_MSG"));
    		
    		
    		me.onCheckSmsByte();
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_main').getAt(index);
    		
    		pre_record.set("NAME_KOR" , me.lookupReference('txt_name_kor').getExValue());
    		pre_record.set("BUD_NO"   , me.lookupReference('txt_card_no').getExValue());
    		pre_record.set("TR_PHONE" , me.lookupReference('txt_phone').getExValue());
    		pre_record.set("DAY"      , me.lookupReference('em_day').getExValue());
    		pre_record.set("TIME"     , me.lookupReference('em_time').getExValue()+""+me.lookupReference('em_timeM').getExValue());
    		pre_record.set("TR_MSG"   , me.lookupReference('tx_tr_msg').getExValue());
    		
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    onCheckSmsByte : function(){
    	
    	var me = this;
    	
    	var nowIndex = me.lookupReference('txt_sel_index').getExValue(nowIndex);
    	
    	if(nowIndex == -1) return false;
    	
    	
    	var max_length_sms = me.lookupReference('max_length_sms').getExValue();
    	var max_length_lms = me.lookupReference('max_length_lms').getExValue();
    	var tx_tr_msg      = me.lookupReference('tx_tr_msg').getExValue();
    	var bytes          = gf_calBytes(tx_tr_msg);
    	
    	
    	if(bytes<=max_length_sms) {
    		me.getViewModel().getStore('ds_main').getAt(nowIndex).set("TR_MSG_GB", "SMS");
    		$('#sp_byte').html(bytes);
    		$('#sp_max').html(max_length_sms+" bytes (단문)");
    		return "SMS";
    	}else if(bytes<=max_length_lms) {
    		me.getViewModel().getStore('ds_main').getAt(nowIndex).set("TR_MSG_GB", "LMS");
    		$('#sp_byte').html(bytes);
    		$('#sp_max').html(max_length_lms+" bytes (<b>장문</b>)");
    		return "LMS";
        }else{
        	me.getViewModel().getStore('ds_main').getAt(nowIndex).set("TR_MSG_GB", "SMS");
        	$('#sp_max').html(max_length_lms+" bytes (글자수초과)");
    		return "";
    	}
    	
    },
    onSave : function (){
    	var me  = this;
    	
    	//이전값 세팅
		var preIndex    = me.lookupReference('txt_sel_index').getExValue();
    	if(preIndex != -1){
			me.inSettingRecord(me, preIndex);
		}// if preIndex
    	
    	
    	var rowCnt = exCommon.ChangeCount('ds_main', me);
    	if (rowCnt == 0) {
    		exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
		}
    	
    	if(!me.inValidation(me)) return false;
    	
    	
    	exCommon.fnGridSaveAll(
       		 me
       		,'ds_main'
       		,'newData'
       		,'uptData'
       		,'delData'
       		,'/sin/SIN013W_01/save.suvila'
       		,me.onSaveCallback
       	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    	if(success){
    		me.onSelect();
    	}
    },       
    inValidation : function(me){
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	
    	for(var i = 0; i < row; i++){
    		var record         = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin013w_01_a', "TR_PHONE"  , "핸드폰 번호" ) ){
    			me.lookupReference('txt_phone').focus();
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin013w_01_a', "DAY"  , "발송일" ) ){
    			me.lookupReference('em_day').focus();
    			return false;
    		}
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin013w_01_a', "NAME_KOR"  , "성명" ) ){
    			me.lookupReference('txt_name_kor').focus();
    			return false;
    		}
    		
    		var TIME = exCommon.getRepVal( record.get("TIME") , "");
    		var me_sendTimeT = parseInt(TIME.substr(0,2));
    		var me_sendTimeM = parseInt(TIME.substr(2,2));
    		
    		console.log('me_sendTimeT =', me_sendTimeT);
    		console.log('me_sendTimeM =', me_sendTimeM);
    		
    		
    		if( TIME == "" ){
    			exCommon.msgAlert('발송시간은 필수 입력 항목입니다.');
    			me.lookupReference('em_time').focus();
    			me.lookupReference('sin013w_01_a').getView().select(i);    			
    			return false;
    		}
    		
    		if( !(TIME.length == 4 || TIME.length == 6) ){
    			exCommon.msgAlert('발송시간을 올바르게 입력하세요.');
    			me.lookupReference('em_time').focus();
    			me.lookupReference('sin013w_01_a').getView().select(i);
    			return false;
    		}
    		
    		if( me_sendTimeT >23  || me_sendTimeT < 0 ){
    			exCommon.msgAlert('시간은 0 ~ 23 사이로 입력하세요.');
    			me.lookupReference('em_time').focus();
    			me.lookupReference('sin013w_01_a').getView().select(i);
    			return false;
    		}
    		
    		if( me_sendTimeM > 60  || me_sendTimeM < 0 ){
    			exCommon.msgAlert('분은 0 ~ 59 사이로 입력하세요.');
    			me.lookupReference('em_timeM').focus();
    			me.lookupReference('sin013w_01_a').getView().select(i);
    			return false;    		
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin013w_01_a', "TR_MSG"  , "문자내용" ) ){
    			me.lookupReference('em_time').focus();
    			me.lookupReference('sin013w_01_a').getView().select(i);
    			return false;
    		}
    	}// for i
    	return true;
    },
    onDel : function(){
    	var me = this;
    	
    	exCommon.gridRemove(
    		 me
    		,'sin013w_01_a'
    		,'ds_main'    		    	
    	);
    	
    }
    
   
})


