Ext.define('ExFrm.view.sin.sin001p_03_000031Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_03_000031',
    loadState:[],
    loadStatePoP : function(me){
    	var length = me.loadState.length;
    	
    	for(var i = 0; i<length ; i++){
    		me.loadState.pop();
    	}
    },
    loadMode:[],
    loadModePoP : function(me){
    	var length = me.loadMode.length;
    	for(var i = 0; i< length ; i++){
    		me.loadMode.pop();
    	}
    },
    onCalled:function(params){
    	
        var me = this;
        
        me.loadStatePoP(me);
        me.loadModePoP(me);
               
        me.loadState.push(params.V_BUD_NO);
        
        
        
        var DeathList = '';
        
        if(params.MODE == "convert"){
        	console.log(params);
        	me.loadMode.push( params.V_BUD_NO   );
        	me.loadMode.push( params.V_NAME_KOR );
        	me.loadMode.push( params.SACRED_KOR );
        	me.loadMode.push( params.SEX_GBN );
        	
        } 
        console.log('me.loadMode.length = ',me.loadMode.length);
        
        setTimeout(function(){
    		me.callStore(me, 'ds_bon_master', '', {V_BUD_CODE : params.V_BUD_CODE}  ,me.dbmCallback);
    	},10);
    },
    inGetBokwiSexGbn(){
    	
    },
    dbmCallback : function(me, success, form, action){
    	
    	console.log(action._params.V_BUD_CODE);
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_equal_gbn', '', {V_BUD_CODE : action._params.V_BUD_CODE} ,me.dsEqCallbak);
    	},50);
    	
    },
    dsEqCallbak : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_spiritual_gbn', '', {V_BUD_CODE : action._params.V_BUD_CODE} ,me.dsSpCallbak);
    	},50);
    },
    dsSpCallbak : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_bokwi', '', {V_BUD_CODE : action._params.V_BUD_CODE} ,me.dsBokwiCallbak);
    	},10);
    },
    dsBokwiCallbak : function(me, success, form, action){
    	if(success && me.loadMode.length != 0){
    		
    		console.log('dsBokwiCallbak');
    		
    		var record = me.getViewModel().getStore('ds_bokwi').findRecord('BUD_NO', me.loadMode[0], 0, false, true, true);
    		me.getViewModel().getStore('ds_bokwi').remove(record);
    		
    		setTimeout(function(){
    			me.lookupReference('lc_bokwi').setExValue( me.getViewModel().getStore('ds_bokwi').getAt(0).get("VALUE") );
    		},200);
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_sex_gbn', '', null ,me.dsSexGbnCallback);
    	},50);
    	
    },
    dsSexGbnCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', null ,me.dsLunarSolarCallback);
    	},50);
    },
    dsLunarSolarCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_kibu', '', null ,me.dsKibuCallbak);
    	},50);
    },
    dsKibuCallbak : function(me, success, form, action){
    	
    	if(me.loadMode.length == 0){
        	me.lookupReference('lc_bokwi').setExValue(me.loadState[0]+'|||1');
        	me.loadStatePoP(me);
    	}
    },
    onClose : function(){
    	var me = this;
    	
    	if(me.loadMode.length != 0){
    		me.receiveTo(null, false);
    	}
    	me.loadStatePoP(me);
    	me.loadModePoP(me);
    	me.getView().destroy();
    	
    },
    onConfirm : function(){
    	var me = this;
    	
    	if(me.loadMode.length != 0){
    		me.receiveTo(null, false);
    	}
    	me.loadStatePoP(me);
    	me.loadModePoP(me);
    	me.getView().destroy();
    	
    },
    onDestroy:function(){
    	console.log('onDestroy');
    	var me = this;
    	if(me.loadMode.length != 0){
    		me.receiveTo(null, false);
    	}
    	me.loadStatePoP(me);
    	me.loadModePoP(me);
    	
    },
    onAfterRender:function(){
    	
    },
    onInit:function(me){
    	
    },
    onSearch : function(){
    	var me  = this;
    	
    	
    	me.getViewModel().getStore('ds_main').removeAll();
    	
    	var array = me.lookupReference('lc_bokwi').getExValue().split('|||');
    	
    	var params = {
    		V_BOKWI_BUD_NO : array[0]
    	   ,V_DEATH_GBN    : array[1]
    	}
    	
    	setTimeout(function(){
     		me.callStore(me, 'ds_main', '', params ,me.onSearchCallback);
     	},10);
    },
    onSearchCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue(-1);
    		
    		me.lookupReference('sin001p_03_a').getView().select(0);
    		
    		
    		var row = me.getViewModel().getStore('ds_main').getCount();
    		
    		for(var i = 0 ; i<row ; i++){
    			me.getViewModel().getStore('ds_main').getAt(i).set("SORT_SEQ", i+1);
    		}
    		
    		if(me.loadMode.length != 0){
    			
    			var inArray = me.lookupReference('lc_bokwi').getExValue().split('|||');
    			
    			var lc_bokwi  = me.lookupReference('lc_bokwi').getExValue();
    	    	var bokRecord = me.getViewModel().getStore('ds_bokwi').findRecord('VALUE', lc_bokwi, 0, false, true, true);
    			
    			console.log('inArray = ', inArray);
    			
    			var data = {
		    		 SORT_SEQ     : row +1
		    	    ,BOKWI_BUD_NO : inArray[0]
		    	    ,DECE_BUD_NO  : me.loadMode[0]
    				,NAME_KOR     : me.loadMode[1]
		    	    ,HYO_REL      : bokRecord.get("SEX_GBN") == "T" ? "행효자" : "행효녀"
		    	    ,SACRED_KOR   : me.loadMode[2]	
    				,SEX_GBN      : me.loadMode[3]
    				,EQUAL_GBN    : '1'
    				,SPIRITUAL_GBN    : '1'
    				,BOKWI_KIBU_GBN    : 'T'
    				,DEATH_YN        : bokRecord.get("CODE")
		    	}
    			
    			//console.log(data);
    			me.getViewModel().getStore('ds_main').add(data);
    	    	me.lookupReference('sin001p_03_a').getView().select(row);
    		}
    		
    	}
    },
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_main').getAt(index);
    	
    		
			pre_record.set("NAME_KOR"       , exCommon.getRepVal(me.lookupReference('txt_death_name_kor').getExValue(),''));
			pre_record.set("SEX_GBN"        , exCommon.getRepVal(me.lookupReference('lc_sexgbn').getExValue(),''));
			pre_record.set("SACRED_KOR"     , exCommon.getRepVal(me.lookupReference('txt_sacred_kor').getExValue(),''));
			pre_record.set("DECE_REL"       , exCommon.getRepVal(me.lookupReference('txt_dece_rel').getExValue(),''));
			pre_record.set("BON"            , exCommon.getRepVal(me.lookupReference('lc_bon').getExValue(),''));
			pre_record.set("BON_NM"         , exCommon.getRepVal(me.lookupReference('lc_bon').getExValue(),''));
			pre_record.set("LUNAR_SOLAR"    , exCommon.getRepVal(me.lookupReference('lc_lunar_solar').getExValue(),''));
			pre_record.set("DEATH_DAY"      , exCommon.getRepVal(me.lookupReference('em_birthday').getExValue(),''));
			pre_record.set("LNAME"          , exCommon.getRepVal(me.lookupReference('txt_sung_kor').getExValue(),''));
			pre_record.set("SORT_SEQ"       , exCommon.getRepVal(me.lookupReference('txt_sort_seq').getRawValue(),''));
			pre_record.set("EQUAL_GBN"      , exCommon.getRepVal(me.lookupReference('lc_equal_gbn').getExValue(),''));
			pre_record.set("SPIRITUAL_GBN"  , exCommon.getRepVal(me.lookupReference('lc_spiritual_gbn').getExValue(),''));
			
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    	
    	
    		if(record[0].length <=  0 || record == null || record == undefined){
    			me.lookupReference('txt_sel_index').setExValue(-1);
    			return;
    		}
    		
    		//
			var preIndex    = me.lookupReference('txt_sel_index').getExValue();
			if(preIndex != -1){
				me.inSettingRecord(me, preIndex);
			}// if 
			
    		var nowIndex       = me.lookupReference('sin001p_03_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
    	
	    	me.lookupReference('txt_death_name_kor').setExValue(record[0].get("NAME_KOR"));
	    	me.lookupReference('lc_sexgbn').setExValue(record[0].get("SEX_GBN"));
	    	me.lookupReference('txt_sacred_kor').setExValue(record[0].get("SACRED_KOR"));
	    	me.lookupReference('txt_dece_rel').setExValue(record[0].get("DECE_REL"));
	    	me.lookupReference('lc_bon').setExValue(record[0].get("BON"));
	    	
	    
	    	me.lookupReference('lc_lunar_solar').setExValue(record[0].get("LUNAR_SOLAR"));
	    	me.lookupReference('em_birthday').setExValue(record[0].get("DEATH_DAY"));
	    	me.lookupReference('txt_sung_kor').setExValue(record[0].get("LNAME"));
	    	me.lookupReference('txt_sort_seq').setValue(record[0].get("SORT_SEQ"));
	    	
	    	me.lookupReference('lc_equal_gbn').setValue(record[0].get("EQUAL_GBN"));
	    	me.lookupReference('lc_spiritual_gbn').setValue(record[0].get("SPIRITUAL_GBN"));
	    	me.lookupReference('lc_hyo').setValue(record[0].get("HYO_REL"));
	    		
	    	
	    	var LNAME = exCommon.getRepVal(record[0].get("LNAME"));
	    	
	    	if(LNAME == ""){
	    		return;
	    	}
	    	
	    	var params = {
	    		 group_cd : "BON"
	    		,remark   : encodeURI(record[0].get("LNAME"))
	    	};
	    	
	    	setTimeout(function(){
	     		me.callStore(me, 'ds_bon', '',params ,me.dsBonCallback);
	     	},10);
    	}catch(e){}
    },
    dsBonCallback : function(me, success, form, action){
    	if(success){
    		var selection = me.lookupReference('sin001p_03_a').getView().getSelectionModel().getSelection()[0];
    		me.lookupReference('lc_bon').setExValue(selection.get("BON"));
    	}
    },
    onAdd : function(){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(row != 0){
    		if( !me.isValidation(me) ){
    			return;
    		}
    	}
    	
    	var bokwi = me.lookupReference('lc_bokwi').getExValue();
    	
    	var findRecord = me.getViewModel().getStore('ds_bokwi').findRecord('VALUE', bokwi, 0, false, true, true);
    	
    	console.log(findRecord);
    	
    	var data = {
    		 SORT_SEQ        : row+1
    	    ,BOKWI_BUD_NO    : findRecord.get("BUD_NO")
    	    ,DEATH_YN        : findRecord.get("CODE")
    	    ,HYO_REL         : me.inGetBokwiSexGbn(me) == "T" ? "행효자" : "행효녀"
    	    ,EQUAL_GBN       : 1
    	    ,SPIRITUAL_GBN   : 1
    	    ,BOKWI_KIBU_GBN  : 'T'
    	    ,A_TEMP          : 'ABC' 
    	}
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('sin001p_03_a').getView().select(row);
    	me.lookupReference('txt_dece_rel').focus();
    },
    inGetBokwiSexGbn : function(me){
    	try{
    		
    		
    		return me.loadMode[3];
    	}catch (e) {
			return 'T';
		}
    },
    isValidation : function(me){
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0 ; i< row ; i++ ){
/*    		
    		if( !exCommon.gridFormVal( me , i , 'ds_main' , 'sin001p_03_a' ,  'DECE_REL' , '망관계'  ) ){

    			me.lookupReference('txt_dece_rel').focus();
    			return false;
    		}
    		*/
    		/*
    		if( !exCommon.gridFormVal( me , i , 'ds_main' , 'sin001p_03_a' ,  'NAME_KOR' , '영가명'  ) ){
    			me.lookupReference('txt_death_name_kor').focus();
    			return false;
    		}
    		*/
    		
    		if( !exCommon.gridFormVal( me , i , 'ds_main' , 'sin001p_03_a' ,  'BOKWI_BUD_NO' , '복위자명'  ) ){

    			me.lookupReference('lc_bokwi').focus();
    			return false;
    		}
    		/*
    		if( !exCommon.gridFormVal( me , i , 'ds_main' , 'sin001p_03_a' ,  'BOKWI_KIBU_GBN' , '복위,기부'  ) ){
    			me.lookupReference('lc_kibu').focus();
    			return false;
    		}
    		zh*/
    		
    		
    	/*	if( i== 0 && !exCommon.gridFormVal( me , i , 'ds_main' , 'sin001p_03_a' ,  'HYO_REL' , '행관계'  )){
    			me.lookupReference('txt_hyo_rel').focus();
    			return false;
    		}
    		*/
    	}// for
    	
    	return true;
    },
    onDelete : function(){
    	var me = this;
    	
    	exCommon.gridRemove(me , 'sin001p_03_a' , 'ds_main');
    	
    },
    onTempSave : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('sin001p_03_a').getView().getSelectionModel().getSelection()[0];
    	
    	    	    	
    	selection.set("NAME_KOR"        , me.lookupReference('txt_death_name_kor').getExValue());
    	selection.set("SEX_GBN"         , me.lookupReference('lc_sexgbn').getExValue());
    	selection.set("SACRED_KOR"      , me.lookupReference('txt_sacred_kor').getExValue());
    	selection.set("DECE_REL"        , me.lookupReference('txt_dece_rel').getExValue());
    	selection.set("BON"             , me.lookupReference('lc_bon').getExValue());
    	selection.set("BON_NM"          , me.lookupReference('lc_bon').getRawValue());
    	
    	selection.set("LUNAR_SOLAR"     , me.lookupReference('lc_lunar_solar').getExValue());
    	selection.set("DEATH_DAY"       , me.lookupReference('em_birthday').getExValue());
    	selection.set("LNAME"           , me.lookupReference('txt_sung_kor').getExValue());
    	    	
    	selection.set("DEATH_TIME1"     , me.lookupReference('sel_deathtime1').getRawValue());
    	selection.set("DEATH_TIME2"     , me.lookupReference('sel_deathtime2').getRawValue());
    	selection.set("SORT_SEQ"        , me.lookupReference('txt_sort_seq').getRawValue());
    	
    },
    onSave : function(){
    	var me  = this;
    	
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	if(row > 0){
    		var selectedRecord = me.lookupReference('sin001p_03_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('sin001p_03_a').getStore().indexOf(selectedRecord[0]);
        	me.inSettingRecord(me, index);
    	}
    	
    	var cnt = exCommon.ChangeCount('ds_main', me);
    	
    	console.log('cnt = ', cnt);
    	
    	if(cnt == 0){
    		exCommon.msgAlert('변경된 자료가 없습니다.');
			return false;
    	}
    	
    	if( !me.isValidation(me) ){
			return;
		}
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/sin/SIN001P_03/saveSindoDeath.suvila'
    		,me.onSaveCallback
    	);
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me ,success , action , 'ds_main' );

    	
    	if(success){
    		if(me.loadMode.length != 0){
        		me.receiveTo(null, false);
        		me.loadModePoP(me);
        	}
    		me.onSearch();
    	}
    },
    onFindLname: function(me2, e, eOpts ){
    	var me = this;
    	
    	var Lname = me2.rawValue;
    	
    	var row = me.getViewModel().getStore('ds_bon').getCount();
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_bon').getAt(i);
    		if( Lname == record.get("NAME") ){
    			me.lookupReference('lc_bon').setExValue( record.get("CODE") );
    		}
    		
    	}// for
    },
    onSelectBon : function(){
    	var me = this;
    	
    	console.log('onSelectBon = ');
    	
    	var remark    = me.lookupReference('txt_sung_kor').getExValue();
    	
    	var params = {
       		 group_cd : "BON"
       		,remark   : encodeURI(remark)
       	};
    	
       	setTimeout(function(){
    		me.callStore(me, 'ds_bon', '',params ,me.dsBonCallback);
    	},10);
    },
    onSelectBonCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('lc_bon').setExValue("");
    	}
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSelectBon();
    	}
    },
    onHelp : function(){
    	this.openPopup('ExFrm.view.sin.sin001p_03_01',  null, this.onHelpReceive);
    },
    onHelpReceive : function(params , me){
    	me.lookupReference('txt_dece_rel').setExValue(params.DECE_REL);
    	me.lookupReference('lc_sexgbn').setExValue(params.SEX_GBN);
    },
    onFetch : function(){
    	var me =this;
    	
    	var V_BOKWI_BUD_NO =  me.lookupReference('lc_bokwi').getExValue();
    	
    	var row = me.getViewModel().getStore('ds_bokwi').getCount();
    	var params = new Array();
    	var q      = 0;
    	for(var i = 0; i< row ; i++){
    		var record = me.getViewModel().getStore('ds_bokwi').getAt(i);
    		
    		if(record.get("BUD_NO") != V_BOKWI_BUD_NO){
    			params[q] =  record.data;
    			q ++;
    		}
    	}
    	me.openPopup('ExFrm.view.sin.sin001p_03_02_000031',  params , this.onFetchReceive);
    },
    onFetchReceive : function(array , me){
    	console.log('onFetchReceive = ', array);
    	
    	if(array.length == 0 || array == undefined || array == null){
    		return;
    	}
    	
    	var lc_bokwi  = me.lookupReference('lc_bokwi').getExValue();
    	var bokRecord = me.getViewModel().getStore('ds_bokwi').findRecord('VALUE', lc_bokwi, 0, false, true, true);

    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i< array.length ; i++){
    		
    		var data ={
    			 BOKWI_BUD_NO   : bokRecord.get("BUD_NO")
    			,BOKWI_KIBU_GBN : array[i].BOKWI_KIBU_GBN
    			,BON            : array[i].BON
    			,BON_NM         : array[i].BON_NM
    			,BUD_NO         : array[i].BUD_NO
    			,DEATH_BON_NAME : array[i].DEATH_BON_NAME
    			,DEATH_DAY      : array[i].DEATH_DAY
    			,DEATH_TIME1    : array[i].DEATH_TIME1
    			,DEATH_TIME2    : array[i].DEATH_TIME2
    			,DECE_BUD_NO    : array[i].DECE_BUD_NO
    			,DECE_REL       : array[i].DECE_REL
    			,HYO_REL        : array[i].HYO_REL
    			,LNAME          : array[i].LNAME
    			,LUNAR_SOLAR    : array[i].LUNAR_SOLAR
    			,NAME_KOR       : array[i].NAME_KOR
    			,ORI_BON        : array[i].ORI_BON
    			,SACRED_KOR     : array[i].SACRED_KOR
    			,SEL_YN         : array[i].SEL_YN
    			,SEX_GBN        : array[i].SEX_GBN
    			,SORT_SEQ       : (row + 1 )+ i
    			,TEMPLE_CD      : array[i].TEMPLE_CD
    			,SQL_MODE       : 'I'
    			,SPIRITUAL_GBN  : array[i].SPIRITUAL_GBN
    			,EQUAL_GBN      : array[i].EQUAL_GBN
    			,DEATH_YN       : bokRecord.get("CODE")
    		}
    		me.getViewModel().getStore('ds_main').add(data);
    	}//for
    },
    onSortUp : function(){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin001p_03_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('sin001p_03_a').getStore().indexOf(selection);
    	
    	if(selection.length > 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '영가 한명씩 선택후 정렬할수 있습니다.');    				
    		},50);
    		return;
    	}
    	
    	if(_idx == 0){
			return false;
		}
    	
    	var upRecord    = me.lookupReference('sin001p_03_a').getStore().getAt(_idx-1);
    	var upSortSeq  = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_main').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    	
    	me.lookupReference('txt_sort_seq').setValue(upSortSeq);
    	me.lookupReference('txt_sel_index').setValue(-1);
    },
    onDownUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(_tCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin001p_03_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('sin001p_03_a').getStore().indexOf(selection);
    	
    	if(selection.length > 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '영가 한명씩 선택후 정렬할수 있습니다.');    				
    		},50);
    		return;
    	}
    	
    	if(_tCnt == (_idx+1) ){
    		return false;
    	}
    	var downRecord   = me.lookupReference('sin001p_03_a').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.lookupReference('txt_sort_seq').setValue(downSortSeq);
    	
    	me.getViewModel().getStore('ds_main').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    	me.lookupReference('txt_sel_index').setValue(-1);
    },
    onChangBon : function(){
    	var me  = this;
    	
    	console.log( 'onChangBon = ', me.lookupReference('lc_bon_temp').getExValue() );
    	console.log( 'onChangBon = ', me.lookupReference('lc_bon_temp').getExValue() );
    },
    onBlurDece : function(){
    	var me =this;
    	
    	var rel = me.lookupReference('txt_dece_rel').getExValue();
    	
    	if(rel.indexOf("엄부")>=0 || rel.indexOf("조부")>=0 ){
    		me.inSetComponentsValue("행효자","T","T");
    	}else if(rel.indexOf("자모")>=0 || rel.indexOf("조모")>=0 ){
    		me.inSetComponentsValue("행효자","T","F");
    	}else if(rel.indexOf("백부")>=0){
    		me.inSetComponentsValue("행효손","T","T");
    	}else if(rel.indexOf("가부")>=0){
    		me.inSetComponentsValue("행실인","T","T");
    	}else if(rel.indexOf("부인")>=0){
    		me.inSetComponentsValue("행부군","F","F");
    	}else if(rel.indexOf("사형")>=0){
    		me.inSetComponentsValue("행효제","T","T");
    	}else if(rel.indexOf("형수")>=0){
    		me.inSetComponentsValue("행시사제","T","F");
    	}else if(rel.indexOf("제수")>=0){
    		me.inSetComponentsValue("행시사형","F","F");
    	}else if(rel.indexOf("여사제")>=0){
    		me.inSetComponentsValue("행사형","F","F");
    	}else if(rel.indexOf("사제")>=0){
    		me.inSetComponentsValue("행사형","F","T");
    	}else if(rel.indexOf("남사형")>=0){
    		me.inSetComponentsValue("행사매","T","T");
    	}else if(rel.indexOf("여사형")>=0){
    		me.inSetComponentsValue("행사매","T","F");
    	}else if(rel.indexOf("매주")>=0){
    		me.inSetComponentsValue("행사제","T","F");
    	}
    },
    inSetComponentsValue : function(varHYO, varGIBU, varSEX){
    	var me = this;
    	
    	var selection = me.lookupReference('sin001p_03_a').getView().getSelectionModel().getSelection()[0];
    	
    	var lc_sexgbn   = exCommon.getRepVal(me.lookupReference('lc_sexgbn').getExValue(),'');
    	
    	if(selection.crudState == 'C' ){
    		me.lookupReference('lc_sexgbn').setExValue(varSEX);
    	}else if(txt_hyo_rel == '' && lc_kibu == '' && lc_sexgbn == ''){
    		me.lookupReference('lc_sexgbn').setExValue(varSEX);
    	}
    }
})