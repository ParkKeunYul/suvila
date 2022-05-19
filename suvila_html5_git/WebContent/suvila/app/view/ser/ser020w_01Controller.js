Ext.define('ExFrm.view.ser.ser020w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.ser020w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	/*me.getViewModel().getStore('ds_templeMenu').sort([{
            property: 'MENU_SEQ',
            direction: 'ASC'
        }]);*/
    
    	me.lookupReference('em_sDate').setExValue("20010101");
    	me.lookupReference('em_eDate').setExValue( exCommon.getNowDate() );
    	
    	me.onSelect();
    	
    	
    	var TEMPLE_CD = exCommon.user.templeCd;
    	
    	if(TEMPLE_CD != "000000"){
    		me.lookupReference('row_type').setHidden(true);
    		
    		var column = me.lookupReference('ser020w_01_a').getColumns()[1];
        	column.hide();
    	}
    	
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSelect();
    	}
    },
    onSelect : function(){
    	var me = this;
    	
    	console.log('onSelect');
    	
    	var params = {
       		 SDATE 		   : me.lookupReference('em_sDate').getExValue()
       		,EDATE 		   : me.lookupReference('em_eDate').getExValue()
       		,V_SEARCH_GBN  : me.lookupReference('lc_searchGbn').getExValue()
       		,V_SEARCH_WORD : encodeURI(me.lookupReference('txt_searchWord').getExValue())
       	};
       	
       	setTimeout(function(){
       		me.callStore(me, 'ds_Main', '', params, me.onSelectCallback);
       	},50);
    },
    onSelectCallback : function (me, success, records, action){
    	if(success){
    		me.lookupReference('ser020w_01_a').getView().select(0);
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
			
    		var nowIndex       = me.lookupReference('ser020w_01_a').getStore().indexOf(record[0]);
    		me.lookupReference('txt_sel_index').setExValue(nowIndex);
    		
    		
    		me.lookupReference('txt_type').setExValue( record[0].get("TYPE") );
    		me.lookupReference('sel_UseYn').setExValue( record[0].get("USE_YN") );
    		me.lookupReference('txt_title').setExValue( record[0].get("TITLE") );
    		me.lookupReference('txt_contents').setExValue( record[0].get("CONTENTS") );
    		me.lookupReference('txt_remark').setExValue( record[0].get("REMARK") );
    		me.lookupReference('txt_seqNo').setExValue( record[0].get("SEQ_NO") );
    		me.lookupReference('txt_no').setExValue( record[0].get("NO") );
    		
    	}catch (e) {
			console.log('e = ', e);
		}
    },
    inSettingRecord : function(me , index){
    	try{
    		var pre_record = me.getViewModel().getStore('ds_Main').getAt(index);
			
			pre_record.set("TYPE"        , exCommon.getRepVal(me.lookupReference('txt_type').getExValue(),''));
			pre_record.set("USE_YN"      , exCommon.getRepVal(me.lookupReference('sel_UseYn').getExValue(),''));
			pre_record.set("TITLE"       , exCommon.getRepVal(me.lookupReference('txt_title').getExValue(),''));
			pre_record.set("CONTENTS"    , exCommon.getRepVal(me.lookupReference('txt_contents').getExValue(),''));
			pre_record.set("REMARK"      , exCommon.getRepVal(me.lookupReference('txt_remark').getExValue(),''));
			pre_record.set("SEQ_NO"      , exCommon.getRepVal(me.lookupReference('txt_seqNo').getExValue(),''));
			pre_record.set("NO"          , exCommon.getRepVal(me.lookupReference('txt_no').getExValue(),''));
			
    	}catch (e) {
			console.log('inSettingRecord error', e);
		}
    },
    onAdd : function(){
    	var me = this;
    	
		var data = {
    		 SQL_MODE : "I"
    		,USE_YN   : "T"
    		,TYPE     : "N"
    		,SEQ_NO   : ""
    		,NO       : ""
    	}
    	me.getViewModel().getStore('ds_Main').insert(0, data);
		me.lookupReference('txt_sel_index').setExValue('-1');
		
    	me.lookupReference('ser020w_01_a').getView().select(0);
    	me.lookupReference('txt_title').focus();
    },
    onApplyGrid : function(){
    	var me = this;
    	
    	var TITLE    = me.lookupReference('txt_title').getExValue();
    	var CONTENTS = me.lookupReference('txt_contents').getExValue();
    	
    	if(!exCommon.gridValidation(TITLE , '제목을' , me.lookupReference('txt_title') )   ) return;
    	if(!exCommon.gridValidation(CONTENTS , '내용을', me.lookupReference('txt_contents') ) ) return;
    	
    	
    	me.onSettingStore(me);
    },
    onSettingStore : function(me){
    	
    	var selection = me.lookupReference('ser020w_01_a').getView().getSelectionModel().getSelection()[0];
    	selection.set("TYPE"         , me.lookupReference('txt_type').getExValue());
    	selection.set("USE_YN"       , me.lookupReference('sel_UseYn').getExValue());
    	selection.set("TITLE"        , me.lookupReference('txt_title').getExValue());
    	selection.set("CONTENTS"     , me.lookupReference('txt_contents').getExValue());
    	selection.set("REMARK"       , me.lookupReference('txt_remark').getExValue());
    },
    onDelete : function(){
    	var me = this;
    	exCommon.gridRemove(me , 'ser020w_01_a' , 'ds_Main' , false);
    },
    onSave : function(){
    	var me = this;
    	
    	
    	
    	var row = me.getViewModel().getStore('ds_Main').getCount();
    	if(row > 0){
    		var selectedRecord = me.lookupReference('ser020w_01_a').getView().getSelectionModel().getSelection();
        	var index          = me.lookupReference('ser020w_01_a').getStore().indexOf(selectedRecord[0]);
        	me.inSettingRecord(me, index);
    	}
    	
    	me.onSettingStore(me);
    	
    		
		var rowCnt = me.getViewModel().getStore('ds_Main').getCount();
		for(var i =0; i < rowCnt ; i++){
			var TITLE    = me.lookupReference('ser020w_01_a').getStore().getAt(i).get("TITLE");
			var CONTENTS = me.lookupReference('ser020w_01_a').getStore().getAt(i).get("CONTENTS");
			
			
			if(!exCommon.gridValidation(TITLE , '제목을' , me.lookupReference('txt_title') )   ){
				me.lookupReference('ser020w_01_a').getView().select(i);
				return;
			}
			
			if(!exCommon.gridValidation(CONTENTS , '내용을' , me.lookupReference('txt_contents') )   ){
				me.lookupReference('ser020w_01_a').getView().select(i);
				return;
			}
		}// for
		
		exCommon.fnGridSaveAll(
    		  me
    		,'ds_Main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/ser/SER020W_01/announceSave.suvila'
    		,me.onSaveCallback
    	);
		
    },
    onSaveCallback : function (me, success, records, action){
    	if(success){
    		me.lookupReference('txt_sel_index').setExValue('-1');
    	}
    	
    	exCommon.fnGridSaveCallback(me, success, action,'ds_Main')
    },
    onExcel : function(){
    	var me = this;
    	var grid = me.lookupReference('ser020w_01_a');
    	
    	exCommon.excelDown(grid, 'ser020w_01' , 'ser020w_01' , me.getViewModel().getStore('ds_Main').getCount());
    }
    
})