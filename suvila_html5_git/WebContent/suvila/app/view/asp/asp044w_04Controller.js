Ext.define('ExFrm.view.asp.asp044w_04Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp044w_04',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_yn_gbn', '', null , me.dsYnCallbak);
    	},50);
    	
    },
    dsYnCallbak : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeCd', '', null , me.dsTempleCallbak);
    	},50);
    },
    dsTempleCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_04_a').getView().select(8);
    	}
	},
	dsAcceptCallbak : function(me, success, form, action){
	},
	onSelectionTemple : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		me.getViewModel().getStore('ds_main').removeAll();
    		
    		var selection = me.lookupReference('asp044w_04_a').getView().getSelectionModel().getSelection()[0];

    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    	
    	
    },
    onSelect : function(){
    	var me = this;
    	
    	
    	var selection = me.lookupReference('asp044w_04_a').getView().getSelectionModel().getSelection()[0];
    	
    	var params = {
    		 V_DEL_YN     : ''
    		,V_BUD_NO     : me.lookupReference('bud_no').getExValue()
    		,V_BUD_CODE   : me.lookupReference('bud_no').getExValue()
    		,V_NAME_KOR   : ''
    		,VV_TEMPLE_CD : selection.get("TEMPLE_CD") 
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params , me.dsMainCallbak);
    	},50);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_branch', '', params , me.dsMainCallbak);
    	},500);
    	
    },
    dsMainCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_04_b').getView().select(0);
    	}
    },
    onSelectionMain : function( me2 , record , selections , eOpts ) {
		var me = this;
    	try{
    		
    		if(record.length <=  0) return false;
    		
    		me.getViewModel().getStore('ds_young').removeAll();
    		
    		var selection = me.lookupReference('asp044w_04_b').getView().getSelectionModel().getSelection()[0];
    		
    		var params = {
    			 V_BOKWI_BUD_NO: selection.get("BUD_NO")    			
    			,VV_TEMPLE_CD : selection.get("TEMPLE_CD")
    		}
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_young', '', params , me.dsYoungCallbak);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
	},
	dsYoungCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_04_c').getView().select(8);
    	}
    },
    onDel : function (){
    	var me = this;
    	
    	var selections = me.lookupReference('asp044w_04_b').getView().getSelectionModel().getSelection()
    	
    	console.log(selections);
    	var cmsCnt = 0;
    	
    	Ext.MessageBox.confirm('알림', '선택된 신도들은 DB에서 완전삭제됩니다.<br/> 신도삭제를 위한 합가용 가족에서만 삭제하세요.',function(btn) {
    		if (btn == 'yes') {
		    	for(var i = 0; i< selections.length ; i++){
		    		var record = selections[i];
		    		
		    		var DEL_YN   = record.get('DEL_YN');
		    		var CMS_CNT  = record.get('CMS_CNT');
		    		var DAEJU_YN = record.get('DAEJU_YN');
		    		
		    		if(DAEJU_YN == 1){
		    			exCommon.msgAlert('대주는 삭제할수 없습니다.');
		    			return;
		    		}
		    		
		    		
		    		if(DEL_YN != 'T'){
		    			exCommon.msgAlert('삭제여부 [예] 저장된 신도만 삭제가능합니다.');
		    			return;
		    		}
		    		
		    		if(CMS_CNT > 0){
		    			cmsCnt++;
		    		}
		    		
		    	}//
		    	
		    	
		    	var flag = false;
		    	
		    	if(cmsCnt > 0){
		    		Ext.MessageBox.confirm('알림', 'CMS가 등록된 신도정보가 있습니다. 삭제하겠습니까?',function(btn) {
		        		if (btn == 'yes') {
		        			exCommon.gridRemoveDetail(
		           				 me
		           				,'asp044w_04_b'
		           				,'ds_main'    				
		        			);
		        			flag = true;
		        		}
		        	});
		    		
		    	}else{
		    		exCommon.gridRemoveDetail(
		    				 me
		    				,'asp044w_04_b'
		    				,'ds_main'    				
		    		);
		    		flag = true;
		    	}
		    	
		    	if(flag){
		    		
		    		exCommon.fnGridSaveAll( me
 			               ,'ds_main'
 			               ,'newData'
 			               ,'uptData'
 			               ,'delData'
 			               ,'/asp/ASP044W_04/saveSindoInfo.suvila'
 			               , me.onDelCallback
 			               ,true
 			        );
		    	}
		    	
    		}
    	});
    },
    onDelCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_main');
    },
    onSave : function (){
    	var me =this;
		exCommon.fnGridSaveAll( me
               ,'ds_main'
               ,'newData'
               ,'uptData'
               ,'delData'
               ,'/asp/ASP044W_04/saveSindoInfo.suvila'
               , me.onDelCallback
        );
    },
    onDelBranch : function(){
    	var me = this;
    	
    	me.getViewModel().getStore('ds_branch').removeAll();
    	
    	exCommon.fnGridSaveAll( me
                ,'ds_branch'
                ,'newData'
                ,'uptData'
                ,'delData'
                ,'/asp/ASP044W_04/delete_branch.suvila'
                , me.onBranchDelCallback
         );
    },
    onBranchDelCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success, action,'ds_branch');
    },
    onSelectCms : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('asp044w_04_a').getView().getSelectionModel().getSelection()[0];
    	
    	var params= {
    		 V_DEL_YN      : ''
    		,V_NAME_KOR    : me.lookupReference('name_kor').getExValue(  )
    		,VV_TEMPLE_CD  : selection.get("TEMPLE_CD")
    		,V_BUD_NO      : ''
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_name', '', params , me.dsNameCallbak);
    	},50);
    },
    dsNameCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_04_d').getView().select(0);
    	}
    }
	
})