Ext.define('ExFrm.view.asp.asp005w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp005w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	me.getViewModel().getStore('ds_templeMenu').sort([{
            property: 'MENU_SEQ',
            direction: 'ASC'
        }]);
    },   
    onInit:function(me){
    	var params = {};    	
    },
    onGetPath: function (param){
    	if ( param == 1 ) 		return "rec" ;
    	else if ( param == 2 ) 	return "sin" ;
    	else if ( param == 3 ) 	return "tem" ;
    	else if ( param == 4 ) 	return "acc" ;
    	else if ( param == 5 ) 	return "sta" ;
    	else if ( param == 6 ) 	return "ser" ;
    	else if ( param == 7 ) 	return "asp" ;
    },
    onMenuChange : function(){
    	var me = this;
    	console.log('onMenuChange', me.lookupReference('lc_SysGroup').getExValue() );
    	
    	var params = {
    		V_SERVICE_GBN_L : me.lookupReference('lc_SysGroup').getExValue()
    	};
    	me.callStore(me, 'ds_main', '', params, me.onMenuChangeCallback)
    },
    onMenuChangeCallback : function (me, success, records, operation){
    	
    	if( exCommon.callStoreCallback(success, records) ){
    		var params={
    			V_SERVICE_GBN_L : me.lookupReference('lc_SysGroup').getExValue(),
    			V_SEAR_TEMPLECD : me.lookupReference('lc_templeCd').getExValue()	
    		}
    		me.callStore(me, 'ds_templeMenu', '', params, null)
    	}
    	
    },
    onTempleChange : function (){
    	var me = this;
    	var params={
			V_SERVICE_GBN_L : me.lookupReference('lc_SysGroup').getExValue(),
			V_SEAR_TEMPLECD : me.lookupReference('lc_templeCd').getExValue()	
		}
    	me.callStore(me, 'ds_templeMenu', '', params, null)
    },
    onLeftAdd : function(){
    	var me = this;
    	var lc_SysGroup_l = me.lookupReference('lc_SysGroup').getExValue();
    	var rowCount  = me.getViewModel().getStore('ds_main').getCount();
    	var addData = {
    			 PGM_ID : ""
    			,MENU_LVL : "1"
    			,MENU_GBN : "P"
    			,USE_YN : "Y"
    			,SERVICE_GBN : lc_SysGroup_l
    			,MENU_SEQ : 0
    	};
    	me.getViewModel().getStore('ds_main').add(addData);
    	me.lookupReference('asp005w_01_a').plugins[0].startEditByPosition({
            row: rowCount,
            column: 0
        });
    },
    onLeftDel : function(){
    	var me = this;
    	Ext.MessageBox.confirm('알림', '삭제하시겠습니까?', function(btn){  
 	        if (btn == 'yes') {  
 	        	var selectedRecord = me.lookupReference('asp005w_01_a').getView().getSelectionModel().getSelection();
 	        	for(var i = 0; i < selectedRecord.length ; i++){
 	        		var removeRowIndex = me.getViewModel().getStore('ds_main').indexOf(selectedRecord[i]);
 	 	            me.lookupReference('asp005w_01_a').getStore().remove(selectedRecord[i]);
 	        	}
 	            
 	        }
    	});
    	
    },
    leftSave : function(){
    	var me = this;
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	
    	
    	for(var i =0; i < rowCount ; i++){
    		var PGM_ID   =  me.getViewModel().getStore('ds_main').getAt(i).get("PGM_ID");
    		var MENU_NM  =  me.getViewModel().getStore('ds_main').getAt(i).get("MENU_NM");
    		var MENU_LVL =  me.getViewModel().getStore('ds_main').getAt(i).get("MENU_LVL");
    		var CODE     =  me.getViewModel().getStore('ds_main').getAt(i).get("CODE");    		
    		
    		console.log(MENU_LVL , ' = '+PGM_ID + " : " + CODE );
    		
    		if( !exCommon.gridValidation(PGM_ID, '프로그램ID를') ) return;
    		if( !exCommon.gridValidation(MENU_NM, '메뉴명을') ) return;
    		if( !exCommon.gridValidation(MENU_LVL, '순서를') ) return;
    		
    		if(MENU_LVL == 3 || MENU_LVL == "3") {
    			me.lookupReference('asp005w_01_a').getView().select(i);
    			
    			if( !exCommon.gridValidation(CODE, '경로를') ) return;
    		}
    		
    	}// for
    	
    	
    	exCommon.fnGridSaveAll(me
				             ,'ds_main'
				             ,'leftNewData'
				             ,'leftUptData'
				             ,'leftDelData'
				             ,'/asp/asp005w_01/baseTempleMenuSave.suvila'
				             , me.leftSaveCallback);
    },
    leftSaveCallback : function(me, success, form, action){
    	console.log('leftSaveCallback', 'leftSaveCallback');
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_main');
    },
    onLeftALL : function (){
    	var me  = this;
    	
    	var lc_SysGroup_l = me.lookupReference('lc_SysGroup').getExValue();
    	var lc_templeCd   = me.lookupReference('lc_templeCd').getExValue();
    	if(lc_SysGroup_l.BindColVal != "7" || (lc_SysGroup_l.BindColVal == "7" && lc_templeCd.BindColVal == "000000")){
    		
    		var leftRowCount  = me.getViewModel().getStore('ds_main').getCount();
    		for(var i = 0; i<leftRowCount ; i++){
    			var PGM_ID    = me.getViewModel().getStore('ds_main').getAt(i).get("PGM_ID");
        		var MENU_NM   = me.getViewModel().getStore('ds_main').getAt(i).get("MENU_NM");
        		var MENU_LVL  = me.getViewModel().getStore('ds_main').getAt(i).get("MENU_LVL");
        		var MENU_SEQ  = me.getViewModel().getStore('ds_main').getAt(i).get("MENU_SEQ");
        		var MENU_GBN  = me.getViewModel().getStore('ds_main').getAt(i).get("MENU_GBN");
        		var addData = {
        			PGM_ID   : PGM_ID,
        			MENU_NM  : MENU_NM,
        			MENU_LVL : MENU_LVL,
        			MENU_GBN : MENU_GBN,
        			MENU_SEQ : MENU_SEQ,
        			TEMPLE_CD : lc_templeCd
        		};
        		
        		var rowCount  = me.getViewModel().getStore('ds_templeMenu').getCount();
            	var dupleFlag = true;
            	for(var j =0; j < rowCount ; j++){
            		var targetPgmId = me.getViewModel().getStore('ds_templeMenu').getAt(j).get("PGM_ID");
            		if(targetPgmId == PGM_ID){
            			dupleFlag = false;
            			break;
            		}    		
            	}// j for
            	/*-- 왼쪽 그리드에서 오른쪽 그리드로 이동 --*/
            	if(dupleFlag){
            		me.getViewModel().getStore('ds_templeMenu').add(addData);            		
            	}
        		
    		}
    		
    	}// if 7
    },
    onLeftOne : function(){
    	var me  = this;
    	
    	var selection = this.lookupReference('asp005w_01_a').getView().getSelectionModel().getSelection();
    	
    	var lc_SysGroup_l = me.lookupReference('lc_SysGroup').getExValue();
    	var lc_templeCd   = me.lookupReference('lc_templeCd').getExValue();
    
    	
    	if(lc_SysGroup_l.BindColVal != "7" || (lc_SysGroup_l.BindColVal == "7" && lc_templeCd.BindColVal == "000000")){
    		for(var i = 0; i<selection.length ; i++){
        		var PGM_ID    = selection[i].get("PGM_ID");
        		var MENU_NM   = selection[i].get("MENU_NM");
        		var MENU_LVL  = selection[i].get("MENU_LVL");
        		var MENU_SEQ  = selection[i].get("MENU_SEQ");
        		var MENU_GBN  = selection[i].get("MENU_GBN");
        		
        		var addData = {
        			PGM_ID   : PGM_ID,
        			MENU_NM  : MENU_NM,
        			MENU_LVL : MENU_LVL,
        			MENU_GBN : MENU_GBN,
        			MENU_SEQ : MENU_SEQ,
        			TEMPLE_CD : lc_templeCd
        		};
        		
        		
        		var rowCount  = me.getViewModel().getStore('ds_templeMenu').getCount();
            	var dupleFlag = true;
            	for(var j =0; j < rowCount ; j++){
            		var targetPgmId = me.getViewModel().getStore('ds_templeMenu').getAt(j).get("PGM_ID");
            		if(targetPgmId == PGM_ID){
            			dupleFlag = false;
            			break;
            		}    		
            	}// j for
        		
            	if(dupleFlag){
            		me.getViewModel().getStore('ds_templeMenu').add(addData);            		
            	}
            	var menuExist = true;
            	for ( var j=0; j< me.getViewModel().getStore('ds_templeMenu').getCount(); j++ ) {
            		var targetMenuGbn = me.getViewModel().getStore('ds_templeMenu').getAt(j).get("MENU_GBN");
					if ( targetMenuGbn == "M" ) menuExist = false;
				}
            	
            	if(menuExist){
            		var addMenuData = {
            			PGM_ID   : me.getViewModel().getStore('ds_main').getAt(0).get("PGM_ID"),
            			MENU_NM  : me.lookupReference('lc_SysGroup').getRawValue(),
            			MENU_LVL : 1,
            			MENU_GBN : 'M',
            			MENU_SEQ : 1,
            		};
            		me.getViewModel().getStore('ds_templeMenu').add(addMenuData);
            	}
        	}//for
		}// if
    	
    },
    onRightDel : function(){
    	var me = this;
    	Ext.MessageBox.confirm('알림', '삭제하시겠습니까?', function(btn){  
 	        if (btn == 'yes') {  
 	        	var selectedRecord = me.lookupReference('asp005w_01_b').getView().getSelectionModel().getSelection();
 	        	for(var i = 0; i < selectedRecord.length ; i++){
 	        		var removeRowIndex = me.getViewModel().getStore('ds_templeMenu').indexOf(selectedRecord[i]);
 	 	            me.lookupReference('asp005w_01_b').getStore().remove(selectedRecord[i]);
 	        	}
 	        }
    	});
    },
    onRightSave : function(){
    	var me = this;
    	exCommon.fnGridSaveAll(me
				             ,'ds_templeMenu'
				             ,'rightNewData'
				             ,'rightUptData'
				             ,'rightDelData'
				             ,'/asp/asp005w_01/leftMenuSave.suvila'
				             , me.onRightSaveCallback);
    },
    onRightSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me , success, action ,'ds_templeMenu');
    }
    
})