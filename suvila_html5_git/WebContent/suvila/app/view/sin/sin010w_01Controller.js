Ext.define('ExFrm.view.sin.sin010w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin010w_01',    
    onCalled:function(params){
    },
    /*onAfterRender:function(){
    	var params = {};
    },*/
    onHelp:function(){},
    onDestroy:function(me){},
    remarkRow:[],
    remarkPoP : function(me){
    	var cnt = me.remarkRow.length;
    	for(var i = 0; i< cnt; i++){
    		me.remarkRow.pop();
    	}
    },
    onAfterRender:function(me){
    	/*me.lookupReference('cb_Stipulation').setExValue(exCommon.user.searchGbn);
    	me.lookupReference('txt_stipulation').focus();
    	
    	
    	me.lookupReference('date_area').setHidden(true);*/
    },
    onInit:function(me){
    	
    	console.log('onInit', me.remarkRow.length);
    	me.remarkPoP(me);
    	
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_com_classMgt', '', null, me.dsComClassCallback)
       	},50);
    	
    	setTimeout(function(){
       	},400);
    },
    dsComClassCallback : function (me, success, records, action){
    	setTimeout(function(){
       		me.callStore(me, 'ds_classMgt', '', null, me.dsClassCallback)
       	},50);
    },
    dsClassCallback : function (me, success, records, action){
    	if(success && records.length > 0){
    		for(var i = 0; i < records.length ; i++){
    			records[i].set("SORT_SEQ", i+1);
    		}
    	}
    	me.lookupReference('sin010w_01_a').getView().select(0);
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record == undefined || record.length <= 0){
    			return;
    		}
    		
    		if(me.remarkRow.length > 0 ){
        		var preRowData = me.lookupReference('sin010w_01_a').store.getAt( me.remarkRow[0]);
    			preRowData.set("REMARK", me.lookupReference('ta_remark').getExValue());
    			me.remarkPoP(me);
        	}
    		var row            = me.lookupReference('sin010w_01_a').store.indexOf(record[0]);
        	me.remarkRow.push(row);
        	
        	
        	me.lookupReference('ta_remark').setExValue(record[0].get("REMARK"));
    		me.lookupReference('txt_className').setExValue(record[0].get("CLASS_NAME"));
        	
    		var params = {
				V_CLASS_CD : record[0].get("CLASS_CD")
			};
			
			setTimeout(function(){
	    		me.callStore(me, 'ds_sindo', '', params, me.dsSinCallback)
	    	},100);
    		
    	}catch(e){
    		console.log(e);
    	}
    },
    dsSinCallback : function (me, success, records, action){
    	if(success && records.length > 0){
    		me.lookupReference('sin010w_01_b').getView().select(0);
    	}
    },
    onSortUp : function(){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_classMgt').getCount();
    	
    	if(rowCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin010w_01_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('sin010w_01_a').getStore().indexOf(selection);
    	
    	if(selection.length > 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '신도 한명씩 선택후 정렬할수 있습니다.');    				
    		},50);
    		return;
    	}
    	
    	if(_idx == 0){
			return false;
		}
    	
    	var upRecord    = me.lookupReference('sin010w_01_a').getStore().getAt(_idx-1);
    	var upSortSeq  = upRecord.get("SORT_SEQ");
    	
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , upSortSeq);
    	upRecord.set("SORT_SEQ"  , selectSortSeq);
    	
    	me.getViewModel().getStore('ds_classMgt').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    	
    },
    onDownUp : function(){
    	var me = this;
    	
    	var _tCnt = me.getViewModel().getStore('ds_classMgt').getCount();
    	
    	if(_tCnt == 0){
    		setTimeout(function(){
				Ext.Msg.alert('알림', ' 검색후 작업하세요.');    				
			},50);
    		return false;
    	}
    	
    	var selection = me.lookupReference('sin010w_01_a').getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference('sin010w_01_a').getStore().indexOf(selection);
    	
    	if(selection.length > 1){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '신도 한명씩 선택후 정렬할수 있습니다.');    				
    		},50);
    		return;
    	}
    	
    	if(_tCnt == (_idx+1) ){
    		return false;
    	}
    	var downRecord   = me.lookupReference('sin010w_01_a').getStore().getAt(_idx+1);
    	var downSortSeq  = downRecord.get("SORT_SEQ");
    	
    	var selectSortSeq = selection.get("SORT_SEQ");
    	
    	selection.set("SORT_SEQ" , downSortSeq);
    	downRecord.set("SORT_SEQ", selectSortSeq);
    	
    	me.getViewModel().getStore('ds_classMgt').sort([{
            property: 'SORT_SEQ',
            direction: 'ASC'
        }]);
    	
    },
    onSaveLeft : function(){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_classMgt').getCount();
    	for(var i =0; i < rowCount ; i++){
    		var className = me.getViewModel().getStore('ds_classMgt').getAt(i).get("CLASS_NAME");
    		if(className == undefined || className == "" || className == null){
    			setTimeout(function(){
            		Ext.Msg.alert('확인',  '그룹명은  항목은 필수입력 항목입니다.');
				},50);
    			me.lookupReference('sin010w_01_a').getView().select(i);    			
    			return false;
    		}
    	}// for
    	
    	if(me.remarkRow.length > 0 ){
    		var preRowData = me.lookupReference('sin010w_01_a').store.getAt( me.remarkRow[0]);
			preRowData.set("REMARK", me.lookupReference('ta_remark').getExValue());
			me.remarkPoP(me);
    	}
    	
    	exCommon.fnGridSaveAll( me
				               ,'ds_classMgt'
				               ,'newData'
				               ,'uptData'
				               ,'delData'
				               ,'/sin/SIN010W_01/saveMgt.suvila'
				               , me.onSaveLeftCallback
				               , false);
    },
    onSaveLeftCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_classMgt');
    	
    	if(success){
    		me.remarkPoP(me);
    		setTimeout(function(){
    			me.lookupReference('ta_remark').getExValue("");
        		me.callStore(me, 'ds_classMgt', '', null, me.dsClassCallback, null );
        	},50);
    		setTimeout(function(){
        		me.callStore(me, 'ds_com_classMgt', '', null, null, null );
        	},250);
    	}
    },
    onLeftDel : function(){
    	var me = this;
    	exCommon.gridRemove(me , 'sin010w_01_a','ds_classMgt' );
    },
    onLeftAdd : function(){
    	var me = this;
    	
    	var recordAdd  = me.getViewModel().getStore('ds_classMgt').getNewRecords().length;
    	
    	if(recordAdd > 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '기존에 추가된 데이터를 저장후 추가할수 있습니다.');
    		},50);
    		return false;
    	}
    	
    	var rowCount = me.getViewModel().getStore('ds_classMgt').getCount();
    	var data = {
    		 USE_YN   : true
    		,SQL_MODE : 'I'
    		,SORT_SEQ : me.getViewModel().getStore('ds_classMgt').getCount()+1
    	};
    	
    	me.getViewModel().getStore('ds_classMgt').add(data);
    	me.lookupReference('sin010w_01_a').getView().select(rowCount);
    	
    	me.lookupReference('sin010w_01_a').plugins[0].startEditByPosition({
            row: rowCount,
            column: 2
        });
    },
    onRightAdd : function(){
    	var me = this;
    	
    	var recordAdd  = me.getViewModel().getStore('ds_classMgt').getNewRecords().length;
    	
    	if(recordAdd > 0){
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '기존에 추가된 데이터를 저장후 추가할수 있습니다.');
    		},50);
    		return false;
    	}
    	
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.sin.sin010p_01',  null, me.onAddRightReceive);
    	},100);
    },
    onAddRightReceive : function(array, me){
    	var selectedRecord = me.lookupReference('sin010w_01_a').getView().getSelectionModel().getSelection()[0];
    
    	if(array.length <= 0 || array == undefined || array == ""){
    		return false;
    	}
    	
    	for(var i = 0; i< array.length ; i++){
    		var record = array[i];
    		
    		
    		var findRecord = me.getViewModel().getStore('ds_sindo').findRecord('BUD_NO', record.BUD_NO, 0, false, true, true);
    		
    		if(findRecord == null){
    			var data ={
					 CLASS_CD 		: selectedRecord.get("CLASS_CD")
					,BUD_NO      	: record.BUD_NO
					,NAME_KOR   	: record.NAME_KOR
					,SACRED_KOR     : record.SACRED_KOR
					,AGE   			: record.AGE
					,TELNO          : record.TELNO
					,MOBILE_TELNO   : record.MOBILE_TELNO
					,ADDR1          : record.ADDR1
					,ADDR2          : record.ADDR2
					,ZIP_CD   	    : record.ZIP_CD
					,TEMPLE_CD   	: record.TEMPLE_CD
    			}
    			me.getViewModel().getStore('ds_sindo').add(data);
    		}
    	}// for
    },
    onDelRight : function(){
    	var me = this;
    	exCommon.gridRemove(me , 'sin010w_01_b','ds_sindo' );
    },
    onSaveRight : function(){
    	var me = this;
    	exCommon.fnGridSaveAll( me
				               ,'ds_sindo'
				               ,'newData'
				               ,'uptData'
				               ,'delData'
				               ,'/sin/SIN010W_01/saveSindo.suvila'
				               , me.onSaveRightCallback
				               , false);
    },
    onSaveRightCallback  : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_sindo');
    },
    onExcelRight : function(){
    	var me = this;
    	var grid = me.lookupReference('sin010w_01_b');
    	    	
    	exCommon.excelDown(grid, 'SindoInfo', '그룹신도',  me.getViewModel().getStore('ds_sindo').getCount());
    },
    onCopyGroup : function(){
    	var me = this;
    	
    	var leftSelectedRecord = me.lookupReference('sin010w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var LC_GROUP  = me.lookupReference('lc_group').getExValue();
    	var CLASS_CD  = leftSelectedRecord.get("CLASS_CD"); 
    	
    	if(LC_GROUP == "0" ){
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '복사하고자 하는 폴더를 선택하세요.');
			},50);
    		me.lookupReference('lc_group').focus();
    		return false;
    	}
    	
    	if(CLASS_CD == LC_GROUP){
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '복사하고자 하는 폴더가 동일합니다.');
			},50);
    		me.lookupReference('lc_group').focus();
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_CopyClassSindo').removeAll();
    	
    	var rightSelectedRecord = me.lookupReference('sin010w_01_b').getView().getSelectionModel().getSelection();
    	
    	var copyRow = rightSelectedRecord.length;
    	if(copyRow == 0){
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '복사하고자 하는 신도를 선택하세요.');
			},50);
    		return false;
    	}
    	
    	for(var i = 0; i< copyRow ; i++){
    		console.log('rightSelectedRecord['+i+'] = ', rightSelectedRecord[i]);
    		
    		var data = {
    			 CLASS_CD    : LC_GROUP
    			,TEMPLE_CD   : rightSelectedRecord[i].get("TEMPLE_CD")
    			,BUD_NO      : rightSelectedRecord[i].get("BUD_NO")
    		};
    		me.getViewModel().getStore('ds_CopyClassSindo').add(data);
    	}//for
    	
    	exCommon.fnGridSaveAll( me
				               ,'ds_CopyClassSindo'
				               ,'newData'
				               ,'uptData'
				               ,'delData'
				               ,'/sin/SIN010W_01/saveSindo.suvila'
				               , me.onCopyGroupCallback
				               , false);    
    	
    },
    onCopyGroupCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_CopyClassSindo');
    	if(success){
    		me.getViewModel().getStore('ds_CopyClassSindo').removeAll();
    	}
    },
    onMoveGroup : function(){
    	var me = this;
    	
    	var leftSelectedRecord = me.lookupReference('sin010w_01_b').getView().getSelectionModel().getSelection()[0];
    	
    	var LC_GROUP  = me.lookupReference('lc_group').getExValue();
    	var CLASS_CD  = leftSelectedRecord.get("CLASS_CD"); 
    	
    	if(LC_GROUP == "0" ){
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '이동하고자 하는 폴더를 선택하세요.');
			},50);
    		me.lookupReference('lc_group').focus();
    		return false;
    	}
    	
    	if(CLASS_CD == LC_GROUP){
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '이동하고자 하는 폴더가 동일합니다.');
			},50);
    		me.lookupReference('lc_group').focus();
    		return false;
    	}
    	
    	me.getViewModel().getStore('ds_CopyClassSindo').removeAll();
    	
    	
    	var rightSelectedRecord = me.lookupReference('sin010w_01_b').getView().getSelectionModel().getSelection();
    	var leftSelectedRecord  = me.lookupReference('sin010w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var copyRow = rightSelectedRecord.length;
    	if(copyRow == 0){
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '이동하고자 하는 신도를 선택하세요.');
			},50);
    		return false;
    	}
    	
    	
    	for(var i = 0; i< rightSelectedRecord.length ; i++){
    		
    		var data = {
       			 CLASS_CD    : LC_GROUP
       			,TEMPLE_CD   : rightSelectedRecord[i].get("TEMPLE_CD")
       			,BUD_NO      : rightSelectedRecord[i].get("BUD_NO")
       		};
       		me.getViewModel().getStore('ds_CopyClassSindo').add(data);
       		
       		var moveData = {
       			 CLASS_CD    : leftSelectedRecord.get("CLASS_CD")
           		,TEMPLE_CD   : rightSelectedRecord[i].get("TEMPLE_CD")
           		,BUD_NO      : rightSelectedRecord[i].get("BUD_NO")
           		,STORE_STATUS: 2
       		}
       		me.getViewModel().getStore('ds_CopyClassSindo').add(moveData);
    	}// for
    	
    	
    	exCommon.fnGridSaveAll( me
				               ,'ds_CopyClassSindo'
				               ,'newData'
				               ,'uptData'
				               ,'delData'
				               ,'/sin/SIN010W_01/saveSindo.suvila'
				               , me.onMoveGroupCallback
				               , false);    
    	
    },
    onMoveGroupCallback : function(me, success, form, action){
    	if(success){
    		
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '이동되었습니다.');
			},50);
    		
    		var leftSelectedRecord = me.lookupReference('sin010w_01_a').getView().getSelectionModel().getSelection()[0];
    		
    		var params = {
				V_CLASS_CD : leftSelectedRecord.get("CLASS_CD")
			};
			
			setTimeout(function(){
				me.callStore(me, 'ds_sindo', '', params, me.dsSinCallback)
	    	},50);
    	}
    },
})


