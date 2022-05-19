Ext.define('ExFrm.view.asp.asp044w_05Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp044w_05',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	
    	me.lookupReference('search_type').setExValue( 'bud_no' );    	
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeCd', '', null , me.dsTempleCallbak);
    	},50);
    },
    dsTempleCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_05_a').getView().select(3);
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_cms_account_status', '', null , me.dsCmsCallbak);
    	},50);
	},
	dsCmsCallbak : function(me, success, form, action){
		console.log('dsAcceptCallbak');
		
		me.getViewModel().getStore('ds_cms_account_status').getAt(0).set('CODE','');
		me.lookupReference('lc_cms_account_status').setExValue( '' )
		
		setTimeout(function(){
    		me.callStore(me, 'ds_cms_account_status2', '', null , me.dsCms2Callbak);
    	},50);
		
	},
	dsCms2Callbak : function(me, success, form, action){
		setTimeout(function(){
    		me.callStore(me, 'ds_if_payment_bank_cd', '', null , me.dsPayBankCallbak);
    	},50);
	},
	dsPayBankCallbak : function(me, success, form, action){
		
	},
	onSelectionTemple : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		
    		me.getViewModel().getStore('ds_main').removeAll();
    		
    		var selection = me.lookupReference('asp044w_05_a').getView().getSelectionModel().getSelection()[0];
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onSelect : function (){
    	var me = this;
    	
    	var selection = me.lookupReference('asp044w_05_a').getView().getSelectionModel().getSelection()[0];
    	
    	var params = {
    		 VV_TEMPLE_CD : selection.get("TEMPLE_CD")
    		,V_DEL_YN     : me.lookupReference('del_yn').getExValue( '' )
    		,V_SIN_DEL_YN : me.lookupReference('sin_del_yn').getExValue( '' )
    		,V_BUD_NO     : me.lookupReference('bud_no').getExValue( '' )
    		,V_STATUS     : me.lookupReference('lc_cms_account_status').getExValue( '' )
    		,V_SEARCH_TYPE: me.lookupReference('search_type').getExValue( '' )    	
    		,V_SDATE      : '20071001'
    		,V_EDATE      : exCommon.setDateFormat( exCommon.getNowDate() )
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params , me.dsMainCallbak);
    	},50);
    },
    dsMainCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_05_b').getView().select(0);
    	}
    },
    onSelection : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		
    		var selection = me.lookupReference('asp044w_05_b').getView().getSelectionModel().getSelection()[0];
    		
    		var params = {
    			 'VV_TEMPLE_CD'     : selection.get("TEMPLE_CD")
    			,'V_ACCEPT_GBN'     : '99'
    			,'V_SUB_ACCEPT_GBN' : ''
    			,'V_REC_SDATE'      : '20080101'
    			,'V_REC_EDATE'      :  exCommon.getNowDate()
    			,'V_BANK_NO'        : selection.get("IF_PAYMENT_BANK_CD")
    			,'V_ACCOUNT_NUMBER' : selection.get("IF_PAYMENT_ACCOUNT")
    			,'V_ACCOUNT_SEQ'    : selection.get("ACCOUNT_SEQ")
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_rec', '', params , me.dsRecCallbak);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsRecCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_05_c').getView().select(0);
    	}
    },
    onSave : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll( me
                ,'ds_main'
                ,'newData'
                ,'uptData'
                ,'delData'
                ,'/asp/ASP044W_05/saveCmsInfo.suvila'
                , me.onSaveCallback
         );
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_main');
    },
})