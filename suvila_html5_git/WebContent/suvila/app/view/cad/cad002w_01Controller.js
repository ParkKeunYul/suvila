Ext.define('ExFrm.view.cad.cad002w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.cad002w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    remarkRow:[],
    remarkPoP : function(me){
    	var cnt = me.remarkRow.length;
    	for(var i = 0; i< cnt; i++){
    		me.remarkRow.pop();
    	}
    },
    onAfterRender:function(){
    	var me  = this;
    	/*setTimeout(function(){
    		me.openPopup('ExFrm.view.cad.cad002p_01',  null, me.onAddRightReceive);
    	},1000);*/
    },   
    onInit:function(me){
    	
    	var me = this;
    	
    	console.log('onInit', me.remarkRow.length);
    	me.remarkPoP(me);
    	console.log('onInit===>', me.remarkRow.length);
    	
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_group', '', null, me.dsGroupCallback)
    	},50);
    	
    	
    },
    dsGroupCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_classMgt', '', null, me.dsClassMgtCallback)
    	},50);
    },
    dsClassMgtCallback : function (me, success, records, action){


    	me.lookupReference('cad002w_01_a').getView().select(0);
    	setTimeout(function(){
    		me.callStore(me, 'ds_CopyClassSindo', '', null, me.dsCopyCallback)
    	},250);
    	
    },
    dsCopyCallback : function (me, success, records, action){
    	
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	
    	var me = this;
    	
    	try{
    		
    		if(record.length > 0){
    			
    			console.log('me.remarkRow.length = ', me.remarkRow.length);
    			
    			if(me.remarkRow.length > 0 ){
    				
    				var preRowData = me.lookupReference('cad002w_01_a').store.getAt( me.remarkRow[0]);
    				preRowData.set("REMARK", me.lookupReference('ta_remark').getExValue());
    				
    				me.remarkPoP(me);
    			}
    			var selectedRecord = me.lookupReference('cad002w_01_a').getSelectionModel().getSelection()[0];
    			var row            = me.lookupReference('cad002w_01_a').store.indexOf(selectedRecord);
    			me.remarkRow.push(row);
    			
    			me.lookupReference('ta_remark').setExValue(record[0].get("REMARK"));
    			
    			
    			var params = {
    				V_CLASS_CD : selectedRecord.get("CLASS_CD")
    			};
    			
    			setTimeout(function(){
    	    		me.callStore(me, 'ds_nameCard', '', params, me.dsNameCallback)
    	    	},250);
    		}
    		
    	}catch(e){
    		console.log(e);
    	}
    },
    dsNameCallback : function (me, success, records, action){
    	if(success && records.length > 0){
    		me.lookupReference('cad002w_01_b').getView().select(0);
    	}
    },
    onCopyGroup : function(){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('cad002w_01_b').getSelectionModel().getSelection();
    	
    	console.log('selectedRecord.length = ', selectedRecord.length);
    	console.log('selectedRecord = ', selectedRecord);
    	
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
    	};
    	
    	me.getViewModel().getStore('ds_classMgt').add(data);
    	me.lookupReference('cad002w_01_a').getView().select(rowCount);
    	
    	me.lookupReference('cad002w_01_a').plugins[0].startEditByPosition({
            row: rowCount,
            column: 2
        });
    	
    },
    onLeftDel : function(){
    	var me = this;
    	
    	exCommon.gridRemove(
    		 me
    		,'cad002w_01_a'
    		,'ds_classMgt'
    	);
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
    			me.lookupReference('cad002w_01_a').getView().select(i);    			
    			return false;
    		}
    	}// for
    	
    	exCommon.fnGridSaveAll( me
           ,'ds_classMgt'
           ,'newData'
           ,'uptData'
           ,'delData'
           ,'/cad/CAD002W_01/saveGroup.suvila'
           , me.onSaveLeftCallback
           , false
	    );
    	
    },
    onSaveLeftCallback : function(me, success, form, action){
    	
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_classMgt');
    	
    	if(success){
    		me.remarkPoP(me);
    		setTimeout(function(){
        		me.callStore(me, 'ds_classMgt', '', null, me.dsMgtCallback, null );
        	},50);
    	}
    },
    /*onRightAdd : function(){
    	var me = this;
    	
    	
    	var recordChangeROW  = me.getViewModel().getStore('ds_classMgt').getNewRecords().length
    	                     + me.getViewModel().getStore('ds_classMgt').getUpdatedRecords().length
    	                     + me.getViewModel().getStore('ds_classMgt').getRemovedRecords().length;
    	
    	if(recordChangeROW > 0){
    		console.log('recordChangeROW = ', recordChangeROW);
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '그룹정보가 변경되었습니다. 저장 후 작업하십시오.');
			},50);
    		
    		return false;
    	}
    	
    },*/
    onRightAdd : function(){
    	var me = this;
    	
    	
    	var recordChangeROW  = me.getViewModel().getStore('ds_classMgt').getNewRecords().length
    						 + me.getViewModel().getStore('ds_classMgt').getUpdatedRecords().length
    						 + me.getViewModel().getStore('ds_classMgt').getRemovedRecords().length;
    	
    	if(recordChangeROW > 0){
    		console.log('recordChangeROW = ', recordChangeROW);
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '그룹정보가 변경되었습니다. 저장 후 작업하십시오.');
			},50);
    		return false;
    	}
    	
    	var selectedRecord = me.lookupReference('cad002w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var SQL_MODE = selectedRecord.get("SQL_MODE");
    	if("I" == SQL_MODE){    		
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '그룹정보를 저장후 인명관리를 추가할수 있습니다.');
			},50);
    		return false;
    	}
    	
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.cad.cad002p_01',  null, me.onAddRightReceive);
    	},100);
    	
    },
    onAddRightReceive : function(array, me){
    	
    	var selectedRecord = me.lookupReference('cad002w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	if(array.length > 0){
    		
    		for(var i = 0; i< array.length ; i++){
    			
    			console.log('SORT_SEQ = ', array[i].SORT_SEQ);
    			
    			var findRecord = me.getViewModel().getStore('ds_nameCard').findRecord("SORT_SEQ", array[i].SORT_SEQ);
    			
    			if(findRecord  == "" || findRecord  == null){
    				console.log('findRecord = ', '미존재 데이터 추가');
    				
    				var data = {
    					 ADDR1          : array[i].ADDR1
    					,ADDR2          : array[i].ADDR2
    					,CLASS_CD       : selectedRecord.get("CLASS_CD")
    					,COMPANY_NAME   : array[i].COMPANY_NAME
    					,COMPANY_POS    : array[i].COMPANY_POS
    					,COMPANY_TEL1   : array[i].COMPANY_TEL1
    					,COMPANY_TEL2   : array[i].COMPANY_TEL2
    					,COMPANY_TEL3   : array[i].COMPANY_TEL3
    					,EMAIL          : array[i].EMAIL
    					,FAXNO1         : array[i].FAXNO1
    					,FAXNO2         : array[i].FAXNO2
    					,FAXNO3         : array[i].FAXNO3
    					,MEMO           : array[i].MEMO
    					,MOBILE_TELNO   : array[i].MOBILE_TELNO
    					,MOBILE_TELNO1  : array[i].MOBILE_TELNO1
    					,MOBILE_TELNO2  : array[i].MOBILE_TELNO2
    					,MOBILE_TELNO3  : array[i].MOBILE_TELNO3
    					,NAME_KOR       : array[i].NAME_KOR
    					,SACHAL_NM      : array[i].SACHAL_NM
    					,SACRED_KOR     : array[i].SACRED_KOR
    					,SORT_SEQ       : array[i].SORT_SEQ
    					,SQL_MODE       : "I"
    					,TELNO          : array[i].TELNO
    					,TELNO1         : array[i].TELNO1
    					,TELNO2         : array[i].TELNO2
    					,TELNO3         : array[i].TELNO3
    					,TEMPLE_CD      : array[i].TEMPLE_CD
    					,USER_ID        : array[i].USER_ID
    					,ZIP_CD         : array[i].ZIP_CD
    				};
    				
    				me.getViewModel().getStore('ds_nameCard').add(data);
    			}
    			
    			
    		}// for
    		
    		
    	}// array if
    },
    onRightDel : function(){
    	var me = this;
    	
    	var selectedRecordAll = me.lookupReference('cad002w_01_b').getView().getSelectionModel().getSelection();
		
		Ext.MessageBox.confirm('경고', '자료를 삭제하시겠습니까?', function(btn){
			if (btn == 'yes') {

				for(var i = 0; i <= selectedRecordAll.length ; i++ ){
					var selectedRecord = selectedRecordAll[i];
					var selectIndex     = me.getViewModel().getStore('ds_nameCard').indexOf(selectedRecord);
					
					me.lookupReference('cad002w_01_b').getStore().remove(selectedRecord);
	    			me.lookupReference('cad002w_01_b').getView().select(selectIndex-1);
				}
				
				
			}
		});
    },
    onSaveRight : function (){
    	var me = this;
    
    	console.log( me.getViewModel().getStore('ds_nameCard') );
    	
    	exCommon.fnGridSaveAll( me
	               ,'ds_nameCard'
	               ,'newData'
	               ,'uptData'
	               ,'delData'
	               ,'/cad/CAD002W_01/saveCard.suvila'
	               , me.onSaveRightCallback
	               , false);
    },
    onSaveRightCallback : function(me, success, form, action){
    	
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_classMgt');
    	
    },
    onCopyGroup : function(){
    	var me = this;
    	
    	var leftSelectedRecord = me.lookupReference('cad002w_01_a').getView().getSelectionModel().getSelection()[0];
    	
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
    	
    	
    	var rightSelectedRecord = me.lookupReference('cad002w_01_b').getView().getSelectionModel().getSelection();
    	
    	
    	
    	for(var i = 0; i< rightSelectedRecord.length ; i++){
    		
    		console.log('rightSelectedRecord['+i+'] = ', rightSelectedRecord[i]);
    		
    		var data = {
    			 CLASS_CD    : LC_GROUP
    			,TEMPLE_CD   : rightSelectedRecord[i].get("TEMPLE_CD")
    			,USER_ID     : rightSelectedRecord[i].get("USER_ID")
    			,SORT_SEQ    : rightSelectedRecord[i].get("SORT_SEQ")    			
    		};
    		me.getViewModel().getStore('ds_CopyClassSindo').add(data);
    	}
    	
    	if(me.getViewModel().getStore('ds_CopyClassSindo').data.length == 0){
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '복사하고자 하는 신도를 선택하세요.');
			},50);
    		return false;
    	}
    	
    	exCommon.fnGridSaveAll( me
				               ,'ds_CopyClassSindo'
				               ,'newData'
				               ,'uptData'
				               ,'delData'
				               ,'/cad/CAD002W_01/saveCard.suvila'
				               , me.onCopyGroupCallback
				               , false);    	
    	
    },
    onCopyGroupCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_CopyClassSindo');
    },
    onMoveGroup : function(){
    	var me = this;
    	
    	var leftSelectedRecord = me.lookupReference('cad002w_01_a').getView().getSelectionModel().getSelection()[0];
    	
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
    	
    	
    	var rightSelectedRecord = me.lookupReference('cad002w_01_b').getView().getSelectionModel().getSelection();
    	var leftSelectedRecord  = me.lookupReference('cad002w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	
    	
    	for(var i = 0; i< rightSelectedRecord.length ; i++){
    		
    		console.log('rightSelectedRecord['+i+'] = ', rightSelectedRecord[i]);
    		
    		var data = {
    			 CLASS_CD    : LC_GROUP
    			,TEMPLE_CD   : rightSelectedRecord[i].get("TEMPLE_CD")
    			,USER_ID     : rightSelectedRecord[i].get("USER_ID")
    			,SORT_SEQ    : rightSelectedRecord[i].get("SORT_SEQ")    			
    		};
    		me.getViewModel().getStore('ds_CopyClassSindo').add(data);
    		
    		var moveData = {
    			CLASS_CD    : leftSelectedRecord.get("CLASS_CD")
        	   ,TEMPLE_CD   : rightSelectedRecord[i].get("TEMPLE_CD")
        	   ,USER_ID     : rightSelectedRecord[i].get("USER_ID")
        	   ,SORT_SEQ    : rightSelectedRecord[i].get("SORT_SEQ")	
        	   ,STORE_STATUS: 2
    		}
    		me.getViewModel().getStore('ds_CopyClassSindo').add(moveData);
    	}
    	
    	if(me.getViewModel().getStore('ds_CopyClassSindo').data.length == 0){
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '이동하고자 하는 신도를 선택하세요.');
			},50);
    		return false;
    	}
    	
    	exCommon.fnGridSaveAll( me
				               ,'ds_CopyClassSindo'
				               ,'newData'
				               ,'uptData'
				               ,'delData'
				               ,'/cad/CAD002W_01/saveCard.suvila'
				               , me.onMoveGroupCallback
				               , false);   
    	
    },
    onMoveGroupCallback : function(me, success, form, action){
    	if(success){
    		
    		setTimeout(function(){
        		Ext.Msg.alert('알림',  '이동되었습니다.');
			},50);
    		
    		var leftSelectedRecord = me.lookupReference('cad002w_01_a').getView().getSelectionModel().getSelection()[0];
    		
    		var params = {
				V_CLASS_CD : leftSelectedRecord.get("CLASS_CD")
			};
			
			setTimeout(function(){
	    		me.callStore(me, 'ds_nameCard', '', params, me.dsNameCallback)
	    	},100);
    	}
    },
    onExcelRight : function(){
    	var me = this;
    	var grid = me.lookupReference('cad002w_01_b');
    	
    	exCommon.excelDown(grid, 'Group User','인명관리',  me.getViewModel().getStore('ds_group').getCount());
    }
    
   
})