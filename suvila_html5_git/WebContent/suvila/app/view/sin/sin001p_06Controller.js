Ext.define('ExFrm.view.sin.sin001p_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_06',
    onCalled:function(store){
        var me = this;
        console.log('onCalled', store);
      
        
        setTimeout(function(){
	        var cnt =   store.getCount();
	        for(i = 0 ; i < cnt ; i++){
	        	var record = store.getAt(i);
	        	var data = {
	       			 REPRESEN_REL  : record.get("REPRESEN_REL")
	       			,SEX_GBN       : record.get("SEX_GBN")
	       			,NAME_KOR      : record.get("NAME_KOR")
	       			,SACRED_KOR    : record.get("SACRED_KOR")
	       			,LUNAR_SOLAR   : record.get("LUNAR_SOLAR")
	       			,BIRTHDAY      : record.get("BIRTHDAY")
	       			,SEXAGENARY    : record.get("SEXAGENARY")
	       			,LEAP_MONTH    : record.get("LEAP_MONTH")
	       	    }
	        	me.getViewModel().getStore('ds_main').add(data);
	        }// for
	        
	        if(cnt > 0){
	        	me.lookupReference('sin001p_06_a').getView().select(0);
	        }
        },800);
    },
    onInit:function(me){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sex_gbn', '', null ,me.sexCallback);
    	},10);
    },
    sexCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', null ,me.lunarCallback);
    	},10);
    },
    lunarCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_ganjiMaster', '', null ,null);
    	},10);
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onConfirm : function(){
    	var me = this;
    	
    	if(!me.isValidation(me)){
    		return false;
    	}

    	var store = new Array();
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	for(var i = 0; i < row; i++){  
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var data = {
    			 REPRESEN_REL  : record.get("REPRESEN_REL")
    			,SEX_GBN       : record.get("SEX_GBN")
    			,NAME_KOR      : record.get("NAME_KOR")
    			,SACRED_KOR    : record.get("SACRED_KOR")
    			,LUNAR_SOLAR   : record.get("LUNAR_SOLAR")
    			,BIRTHDAY      : record.get("BIRTHDAY")
    			,SEXAGENARY    : record.get("SEXAGENARY")
    			,LEAP_MONTH    : record.get("LEAP_MONTH")
    		}
    		store[i] = data;
    	}// for
    	me.receiveTo(store, true);
    	
    },
    onRelBlur : function(m, e, eOpts ){
    	var me = this;
    	
    	var rel = me.lookupReference('txt_represen_rel').getExValue();
    	
    	if(rel == "건명" || rel == "장남" || rel == "차남" || rel == "서랑" || rel == "사위" || rel == "아들" || rel == "장손" || rel == "아버지" || rel == "청신사" || rel == "비구"){
    		me.lookupReference('lc_sex_gbn').setExValue("T");
    	}
    	else if(rel == "곤명" || rel == "장녀" || rel == "차녀" || rel == "손녀"  || rel == "어머니" || rel == "자부" || rel == "며느리" || rel == "청신녀" || rel == "비구니"){
    		me.lookupReference('lc_sex_gbn').setExValue("F");
    	}
    	else if(rel.indexOf("자부")>=0){
    		me.lookupReference('lc_sex_gbn').setExValue("F");
    	}
    	else if(rel.indexOf("부")>=0 || rel.indexOf("남")>=0 || rel.indexOf("손자")>=0){
    		me.lookupReference('lc_sex_gbn').setExValue("T");
    	}
    	else if(rel.indexOf("모")>=0 || rel.indexOf("녀")>=0 || rel.indexOf("여")>=0 || rel.indexOf("딸")>=0){
    		me.lookupReference('lc_sex_gbn').setExValue("F");
    	}
    	
    },
    onExpand : function(field, eOpts){
    	var me = this;

    	var SEX_GBN = exCommon.getReferVal(me , 'lc_lunar_solar' , ""); 
    	
    	if(SEX_GBN == ""){
    		me.lookupReference('em_birthday').collapse();
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '[양력][음력] 구분을 먼저 선택 하셔야 합니다.');    				
    		},50);
    		return;
    		me.lookupReference('lc_lunar_solar').focus();
    	}
    	return false;
    },
    onBirthChange : function(){
    	var me = this;
    	
    	var BIRTHDAY = me.lookupReference('em_birthday').getExValue();
    	
    	if(BIRTHDAY.length == 8){
    		me.inGetGangi(me);
    	}
    },
    inGetGangi : function(me){
    	
    	var params ={
    		 V_GANJI        : me.lookupReference('em_birthday').getExValue()
    		,V_LUNAR_SOLAR  : me.lookupReference('lc_lunar_solar').getExValue()
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_ganji', '', params ,me.inGetGangiCallbak);
    	},50);
    },
    inGetGangiCallbak : function(me, success, form, action){
    	if(success &&  me.getViewModel().getStore('ds_ganji').getCount() ){
    		
    		var data = me.getViewModel().getStore('ds_ganji').getAt(0);
    		me.lookupReference('lc_sexagenary').setExValue( data.get("SEXAGENARY") );
    		me.lookupReference('txt_leap_month').setExValue( data.get("LEAP_MONTH") );
    	}
    },
    onGanji : function(){
    	var me = this;
    	if(me.getViewModel().getStore('ds_main').getCount() == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', ' 추가후 작업하세요.');    				
    		},50);
    		return;
    	}
    	
    	var params = {};
        this.openPopup('ExFrm.view.sin.sin001p_09',  params, this.onGanjiReceive);
    },
    onGanjiReceive : function(param , me){
    	me.lookupReference('lc_sexagenary').setExValue(param.CODE);
    	me.lookupReference('em_birthday').setExValue(param.YEAR+"0101");
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0){
    			return;
    		}
    		
    		me.lookupReference('txt_represen_rel').setExValue( record[0].get("REPRESEN_REL") );
    		me.lookupReference('lc_sex_gbn').setExValue( record[0].get("SEX_GBN") );
    		me.lookupReference('txt_name_kor').setExValue( record[0].get("NAME_KOR") );
    		me.lookupReference('txt_sacred_kor').setExValue( record[0].get("SACRED_KOR") );
    		me.lookupReference('lc_lunar_solar').setExValue( record[0].get("LUNAR_SOLAR") );
    		me.lookupReference('em_birthday').setExValue( record[0].get("BIRTHDAY") );
    		me.lookupReference('lc_sexagenary').setExValue( record[0].get("SEXAGENARY") );
    		me.lookupReference('txt_leap_month').setExValue( record[0].get("LEAP_MONTH") );
    		
    	}catch (e) {
    		console.log('e = ', e);
		}
    },
    onAdd : function(){
    	var me = this;
    	console.log('onAdd1');
    	
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	if(!me.isValidation(me)){
    		return false;
    	}
    	
    	console.log('onAdd2');
    	
    	var data ={
    		 SEX_GBN 	   : ""
    		,NAME_KOR      : ""
    		,SACRED_KOR    : ""
    		,LUNAR_SOLAR   : "F"
    		,SACRED_KOR    : ""
    		,BIRTHDAY      : ""
    		,SEXAGENARY    : ""
    		,LEAP_MONTH    : ""
    		,SORT_SEQ      : row+1
    	};
    	
    	me.lookupReference('lc_lunar_solar').setExValue('F');
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('sin001p_06_a').getView().select(row);
    	
    	me.lookupReference('txt_represen_rel').focus();
    	
    },
    onTempSave : function(){
    	var me = this;
    	
    	var me = this;
    	if(me.getViewModel().getStore('ds_main').getCount() == 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', ' 추가후 작업하세요.');    				
    		},50);
    		return;
    	}
    	
    	/*if(!me.isValidation(me)){
    		return;
    	}*/
    	
    	var selection = me.lookupReference('sin001p_06_a').getView().getSelectionModel().getSelection()[0];
    	
    	selection.set("REPRESEN_REL"        , me.lookupReference('txt_represen_rel').getExValue());
    	selection.set("SEX_GBN"             , me.lookupReference('lc_sex_gbn').getExValue());
    	selection.set("NAME_KOR"            , me.lookupReference('txt_name_kor').getExValue());
    	selection.set("SACRED_KOR"          , me.lookupReference('txt_sacred_kor').getExValue());
    	selection.set("LUNAR_SOLAR"         , me.lookupReference('lc_lunar_solar').getExValue());
    	selection.set("BIRTHDAY"            , me.lookupReference('em_birthday').getExValue());
    	selection.set("SEXAGENARY"          , me.lookupReference('lc_sexagenary').getExValue());
    	selection.set("LEAP_MONTH"          , me.lookupReference('txt_leap_month').getExValue());
    	
    	
    	
    },
    isValidation : function(me){
    	var row = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i = 0; i < row; i++){  
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001p_06_a', "NAME_KOR"  , "성명" ) ){
    			me.lookupReference('txt_name_kor').focus();
    			return false;
    		}
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_main' , 'sin001p_06_a', "REPRESEN_REL"  , "관계" ) ){
    			me.lookupReference('txt_represen_rel').focus();
    			return false;
    		}
    	}// for
    	return true;
    }
})