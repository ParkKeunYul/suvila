Ext.define('ExFrm.view.asp.asp044w_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp044w_03',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('me_AcceptSDateID').setExValue( exCommon.getMinusDay(730) );
		me.lookupReference('me_AcceptEDateID').setExValue( today );
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeCd', '', null , me.dsTempleCallbak);
    	},50);
    },
    dsTempleCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_03_a').getView().select(0);
    	}
    	setTimeout(function(){
    		me.callStore(me, 'ds_acceptGbn', '', null , me.dsAcceptCallbak);
    	},50);
	},
	dsAcceptCallbak : function(me, success, form, action){
		console.log('dsAcceptCallbak');
		
		setTimeout(function(){
    		me.callStore(me, 'ds_approvalGbn', '', null , me.dsAppCallbak);
    	},50);
		
		if(success){
			me.getViewModel().getStore('ds_acceptGbn').getAt(0).set('CODE', '');
			me.lookupReference('lc_acceptGbn').setExValue( '' );
			
		}
	},
	dsAppCallbak : function(me, success, form, action){
		
	},
	onSelectionTemple : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		
    		me.getViewModel().getStore('ds_main').removeAll();
    		
    		var selection = me.lookupReference('asp044w_03_a').getView().getSelectionModel().getSelection()[0];
    		me.lookupReference('lc_acceptGbn').setExValue( '' );
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsIdKindCallbak : function(me, success, form, action){
		setTimeout(function(){
    	},50);
	},
	onAcceptChange : function(opts , nowValue , oldValue){
		var me = this;
	
		var params = {
			V_ACCEPT_GBN : me.lookupReference('lc_acceptGbn').getExValue(  )
		}
		
		setTimeout(function(){
    		me.callStore(me, 'ds_subacceptGbn', '', params , me.subAcceptCallback);
    	},50);
	},
	subAcceptCallback : function(me, success, form, action){
		me.lookupReference('lc_subacceptGbn').setExValue('0');
	},
	onSelect(){
		var me = this;

		
		var selection = me.lookupReference('asp044w_03_a').getView().getSelectionModel().getSelection()[0];
		
		var params = {
			 V_ACCEPT_GBN     : me.lookupReference('lc_acceptGbn').getExValue(  )
			,V_SUB_ACCEPT_GBN : me.lookupReference('lc_subacceptGbn').getExValue(  )
			,VV_TEMPLE_CD     : selection.get("TEMPLE_CD")
			,V_BUD_NO         : me.lookupReference('bud_no').getExValue(  )
			,V_REC_SDATE      : me.lookupReference('me_AcceptSDateID').getExValue(  )
			,V_REC_EDATE      : me.lookupReference('me_AcceptEDateID').getExValue(  )
			,V_DEL_YN         : me.lookupReference('del_yn').getExValue(  )
			,V_BANK_NO        : ''
			,V_ACCOUNT_NUMBER : ''
			,V_ACCOUNT_SEQ    : ''
				
		}
		setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params , me.dsMainCallbak);
    	},50);
		
	},
	dsMainCallbak : function(me, success, form, action){
		if(success){
			me.lookupReference('asp044w_03_b').getView().select(0);
		}
	},
	onSelectionMain : function( me2 , record , selections , eOpts ) {
		var me = this;
    	try{
    		
    		if(record.length <=  0) return false;
    		
    		me.getViewModel().getStore('ds_misuRec').removeAll();
    		
    		var selection = me.lookupReference('asp044w_03_b').getView().getSelectionModel().getSelection()[0];
    		
    		var params = {
    			 V_ACCEPT_SEQ : selection.get("ACCEPT_SEQ")
    			,V_SEQ        : selection.get("SEQ")
    			,VV_TEMPLE_CD : selection.get("TEMPLE_CD")
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_misuRec', '', params , me.dsMisuCallbak);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
	},
	dsMisuCallbak : function(me, success, form, action){
		if(success){
			me.lookupReference('asp044w_03_c').getView().select(0);
		}
	},
	onSave : function(){
		var me = this;
		
		var cnt = exCommon.ChangeCount('ds_main', me);
    	
    	if(cnt <=0){
    		exCommon.msgAlert('변동내역이 없습니다.');
    		return false;
    	}
    	exCommon.uptParamSetting(me, 'ds_main', 'uptData');
    	
    	exCommon.fnGridSaveAll( me
    			               ,'ds_main'
    			               ,'newData'
    			               ,'uptData'
    			               ,'delData'
    			               ,'/asp/ASP044W_03/save.suvila'
    			               , me.onSaveCallback);
		
	},
	onSaveCallback : function(me, success, form, action) {
    	exCommon.fnGridSaveCallback(me, success, action,'ds_main');
    	if(success){
    	}
    },
    onSaveMisu : function(){
		var me = this;
		
		var cnt = exCommon.ChangeCount('ds_misuRec', me);
    	
    	if(cnt <=0){
    		exCommon.msgAlert('변동내역이 없습니다.');
    		return false;
    	}
    	exCommon.uptParamSetting(me, 'ds_misuRec', 'uptData');
    	
    	exCommon.fnGridSaveAll( me
    			               ,'ds_misuRec'
    			               ,'newData'
    			               ,'uptData'
    			               ,'delData'
    			               ,'/asp/ASP044W_03/savePayHis.suvila'
    			               , me.onSaveMisuCallback);
		
	},
	onSaveMisuCallback : function(me, success, form, action) {
    	exCommon.fnGridSaveCallback(me, success, action,'ds_misuRec');
    	if(success){
    	}
    }
    
	
})