
Ext.define('ExFrm.view.ide.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.idemain',
	init:function(){
		/*
		if(exCommon.getMode() == 'dev'){
			console.log('..dev');
			Ext.require('ExFrm.view.widget.container.ExWindowDev');
    		Ext.require('ExFrm.view.widget.container.ExWindowMainDev');	
		} else {
			console.log('..real');
			Ext.require('ExFrm.view.widget.container.ExWindow');
    		Ext.require('ExFrm.view.widget.container.ExWindowMain');
		}		
		*/
	},
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    onNewFile:function(){
 		ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.TmplSelect','템플릿선택','');    	
    },
    onNewTmpl:function(){
    	ExFrm.app.getController('IdeController').setTmplMainStep2Bar('ExFrm.view.ide.TmplMakeStep2','템플릿생성',''); 
    },
    onCss:function(){
    	ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.CssMaker','CSS수정','');
    },
    selectedPropertyIndex:-1,
    selectedRecord:{},
    onSpecialProperty:function(){
        
        var store = this.lookupReference('gridProperty').getStore();
        var records = store.getRange();
        var tempFind = false;
        for(i=0; i < records.length; i++){
            if(records[i].data.propertyName == 'columns'){
                this.selectedRecord = records[i];
                tempFind = true;
                break;
            }
        }
        if(tempFind == false){
            Ext.Msg.alert('확인', 'columns 속성이 없습니다. 그리드가 맞는지 확인하고 column을 추가하십시오.');
            return;
        }
        console.log('선택된레코드', this.selectedRecord);
              
        
        
        var panel = Ext.create('ExFrm.view.ide.ColumnProp');
        panel.show();
        panel.getController().calledByOther(
                            'upd',
                            this.selectedRecord.data.propertyName,
                            this.selectedRecord.data.propertyValue,
                            this.onRetUpdProp,
                            this);       
    },
    onCellClickProperty:function(p1, p2, p3, record, p5, rowIndex){
    	console.log('onCellClickProperty', arguments);
    	this.selectedRecord = record;
    	this.selectedPropertyIndex = rowIndex;
        /*
    	if(record.data.propertyName == 'columns'){
			var panel = Ext.create('ExFrm.view.ide.ColumnProp');
			panel.show();
			panel.getController().calledByOther(
								'upd',
								record.data.propertyName,
	    						record.data.propertyValue,
	    						this.onRetUpdProp,
	    						this);

	    } 
        */
	    /*
	    else if(record.data.propertyName == 'layout'){
			var panel = Ext.create('ExFrm.view.ide.SelectLayout');
			panel.show();
			panel.getController().calledByOther(
								'upd',
								record.data.propertyName,
	    						record.data.propertyValue,
	    						this.onRetUpdProp,
	    						this);

	    }
	    */
        if(record.data.propertyName=='requires'){
			var panel = Ext.create('ExFrm.view.ide.RequireProp');
	    	panel.show();
	    	panel.getController().calledByOther(
	    						'upd',
	    						record.data.propertyName,
	    						record.data.propertyValue,
	    						this.onRetUpdProp,
	    						this); 
        }
	    else {
			var panel = Ext.create('ExFrm.view.ide.RegProp');
	    	panel.show();
	    	panel.getController().calledByOther(
	    						'upd',
	    						record.data.propertyName,
	    						record.data.propertyValue,
	    						this.onRetUpdProp,
	    						this);
	    }
    	console.log('record', record);					
    },  
    onCellClickEvent:function(p1, p2, p3, record, p5, rowIndex){
    	console.log('onCellClickProperty', arguments);
    	this.selectedRecord = record;
    	this.selectedPropertyIndex = rowIndex;
   
		var panel = Ext.create('ExFrm.view.ide.UpdEvent');
    	panel.show();
    	panel.getController().calledByOther(
    						'upd',
    						record.data.propertyName,
    						record.data.propertyValue,
    						this.onRetUpdEvent,
    						this);
    						
    	console.log('record', record);    
    },
    onRetAddProp:function(propName, propValue, openObj){
		console.log('..', lboSelectedInfo.widget);
		var prop = {
			propertyName:propName,
			propertyValue:propValue,
			propertyButton:''
		};  
		console.log('prop', prop);  	
    	openObj.lookupReference('gridProperty').getStore().add(prop);	
    	openObj.lookupReference('gridProperty').getStore().commitChanges();
		// 위젯의 정보, 위젯의 부모정보를 읽어온다.
		//getSelectedInfoByWidget(lboSelectedInfo.widget);
		
		ExFrm.app.getController('IdeController').regProperty(propName, propValue); 
	},    
    onRetUpdProp:function(propName, propValue, openObj){
		console.log('..', lboSelectedInfo.widget);
		
		openObj.selectedRecord.set('propertyName', propName);
		openObj.selectedRecord.set('propertyValue', propValue);
		
		openObj.lookupReference('gridProperty').getStore().commitChanges();
		// 위젯의 정보, 위젯의 부모정보를 읽어온다.
		//getSelectedInfoByWidget(lboSelectedInfo.widget);
		
		ExFrm.app.getController('IdeController').regProperty(propName, propValue); 
		/*
		var propList = openObj.lookupReference('gridProperty');
		var record = propList.getStore().getRange();
		console.log('record', record);
		var eventList = openObj.lookupReference('gridEvent');
		var eRecord = eventList.getStore().getRange();
		console.log('eRecord', eRecord);
		var extObj = setInfoPropertyByRecord(lboItem[lboSelectedInfo.index], record, eRecord);
		console.log('extObj', extObj);
		
		// 선택된 위젯정보를 읽어온다.
		getSelectedItemsIndex();
		console.log('.selectedItemsIndex:',lboSelectedInfo.itemsIndex);
		
		if(lboSelectedInfo.index == 0){
			extObj = Ext.create(lboSelectedInfo.lboItem.name, extObj);
		}
		console.log('extObj::', extObj);
		// 아이템들을 읽어온다. 
		var itemList = getChildArrayByExtId(lboSelectedInfo.extId);
		console.log('itemList', itemList);

		console.log('remove::::', lboSelectedInfo.parentWidget,lboSelectedInfo.widget );
		lboSelectedInfo.parentWidget.remove(lboSelectedInfo.widget,false);
		
		console.log('>>>>',lboSelectedInfo.parentWidget, extObj, lboSelectedInfo.itemsIndex);
		
		var newWidget = lboSelectedInfo.parentWidget.insert(lboSelectedInfo.itemsIndex, extObj);
		propertyCopyByWidget(newWidget);
		
		
		for(i=0; i<itemList.length; i++){
			console.log(i+':',itemList[i] );
			newWidget.add(Ext.getCmp(itemList[i].extId));
		}                    		
		lboSelectedInfo.widget.destroy();
		console.log('1111');
		lboSelectedInfo.widget = newWidget;
		console.log('2222');
		
		getSelectedInfoByWidget(lboSelectedInfo.widget);
		if(lboSelectedInfo.index == 0){
			openObj.getView().up('main').down('tabpanel[name=mainbar]').getLayout().setActiveItem(lboSelectedInfo.widget);	
		}
		
		ExFrm.app.getController('IdeController').showTreeItems(); 
		*/   	
    },
    onRetUpdEvent:function(propName, propValue, openObj){
		console.log('..', lboSelectedInfo.widget);
		openObj.selectedRecord.set('propertyName', propName);
		openObj.selectedRecord.set('propertyValue', propValue);
		openObj.lookupReference('gridProperty').getStore().commitChanges();
		// 위젯의 정보, 위젯의 부모정보를 읽어온다.
		ExFrm.app.getController('IdeController').updEvent(propName, propValue);    	
    },    
    onAddProperty:function(){
        console.log(lboSelectedInfo);
        if(lboSelectedInfo == null || lboSelectedInfo == 'undefeind' || lboSelectedInfo.index == -1){
            Ext.Msg.alert('확인','위젯을 먼저 선택하십시오');
            return;
        }
        
   		var panel = Ext.create('ExFrm.view.ide.RegProp');
   		panel.getController().calledByOther('add', '','', this.onRetAddProp, this);
    	panel.show();    
    },
    onAddEvent:function(){
        if(lboSelectedInfo == null || lboSelectedInfo == 'undefeind'  || lboSelectedInfo.index == -1){
            Ext.Msg.alert('확인','위젯을 먼저 선택하십시오');
            return;
        }       
   		var panel = Ext.create('ExFrm.view.ide.RegEvent');
    	panel.show();
    	panel.getController().calledByOther('add', '','', this.onRetAddProp, this);
    },
    onSaveFile:function(){
    	// 뷰 파일을 읽어와 생성한다.
		var strContent = getStringAll();
		console.log('뷰코드:' + strContent);	
 		var me = this;
		var tempPath = '';
		if(lboFileType == 'app'){
			tempPath = lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					//lboFileSeperator + 'view' + 
					lboFileSeperator + lboFolderName + 
					lboFileSeperator + lboFileName + '.js';
		}
		else if(lboFileType == 'server'){
			tempPath = lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'extra' + 
					//lboFileSeperator + 'view' + 
					lboFileSeperator + lboFolderName + 
					lboFileSeperator + lboFileName;
		}else if(lboFileType == 'application'){
			tempPath = lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					lboFileSeperator + lboFileName;
		}
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: tempPath,
				content:strContent
			},
			success:function(res){
				var obj = JSON.parse(res.responseText);
				console.log('obj', obj);
				if(obj.success == false) {
					Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
					return;
				}
				Ext.Msg.alert("확인", '저장하였습니다.');
                // History저장시작
				var tempHistoryPath = '';
				if(lboFileType == 'app'){
					tempHistoryPath =  lboServerPath + 
						lboFileSeperator + 'lib' + 
						lboFileSeperator + 'tmpljs' + 
						lboFileSeperator + 'history' + 
						lboFileSeperator + 'app' + 
						//lboFileSeperator + 'view' + 
						lboFileSeperator + lboFolderName  + 
						lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime()
				}
				else if(lboFileType == 'server'){
					tempHistoryPath =  lboServerPath + 
						lboFileSeperator + 'lib' + 
						lboFileSeperator + 'tmpljs' + 
						lboFileSeperator + 'history' + 
						lboFileSeperator + 'extra' + 
						//lboFileSeperator + 'view' + 
						lboFileSeperator + lboFolderName  + 
						lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime()
				}
				else if(lboFileType == 'application'){
					tempHistoryPath =  lboServerPath + 
						lboFileSeperator + 'lib' + 
						lboFileSeperator + 'tmpljs' + 
						lboFileSeperator + 'history' + 
						lboFileSeperator + 'app' + 
						lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime()
				}
                exCommon.saveHistory(
                    tempHistoryPath, 
                    strContent);                   
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});    	
    },
    onNewFileWindow:function(){
    	ExFrm.app.getController('IdeController').setMainBarWindow();
    },
    onNewFileList:function(){
    	var panel = Ext.create('ExFrm.view.ide.NewFile');
    	panel.show();
    },
    onDeleteProperty:function(arg1, row,col, temp, tmp2, obj){
		console.log(arguments); 
		console.log(obj);
		console.log(obj.data);
    	this.lookupReference('gridProperty').getStore().remove(obj);
 		ExFrm.app.getController('IdeController').removeProperty();
    		
 	},  
    onDeleteEvent:function(arg1, row,col, temp, tmp2, obj){
		console.log(arguments); 
		console.log(obj);
		console.log(obj.data);
    	//
    	this.lookupReference('gridEvent').getStore().remove(obj);
    	ExFrm.app.getController('IdeController').removeEvent();
 	},  
 	onDeleteItem:function(){
 		console.log('삭제함', lboSelectedInfo.parentWidget,lboSelectedInfo.widget );
 		try{
 			lboSelectedInfo.parentWidget.remove(lboSelectedInfo.widget);
 		}
 		catch(e){
 			console.log(e);
 			alert('다음과 같은 오류가 발생하였습니다만 무시하고 진행합니다.' + e);
 		}

    	console.log('beforeObj.data.extId',lboSelectedInfo.extId);
    	
    	// 새롭게 드롭할 건
    	var tmpLboItemAf = getInfoByExtId(lboSelectedInfo.extId);

    	console.log('tmpLboItemAf',tmpLboItemAf);
    	var tmpIndexAf = tmpLboItemAf.itemsIndex;  
    	var tmpLboItemsListAf = getChildArrayByExtId(tmpLboItemAf.parentExtId);
    	for(var i=0; i <tmpLboItemsListAf.length; i++){
    		if(tmpLboItemsListAf[i].itemsIndex > tmpLboItemAf.itemsIndex ){
    			tmpLboItemsListAf[i].itemsIndex--;
    		}
    	} 	 
    	tmpLboItemAf.parentExtId = '';
    	tmpLboItemAf.parentLboId = '';
    	tmpLboItemAf.itemsIndex = 9999;
    	
    	var deleteItem = [];
    	deleteItem.push(tmpLboItemAf);
		for(var i=0; i <deleteItem.length; i++){
			console.log(':::' + i, deleteItem);
			for(var j=1; j < lboIdCount; j++){
				var isDelete = false;
				for(var k=1;k < deleteItem.length; k++){
					if(deleteItem[k].extId == lboItem[j].extId){
						isDelete = true;
					}
				}
				if(isDelete == false){
					if(	lboItem[j].parentExtId!= '' && 
						lboItem[j].parentExtId == deleteItem[i].extId){
						deleteItem.push(lboItem[j]);
						console.log('삭제대상',lboItem[j]);
					}
				}
			}	
			if(i>100){
				break;
			}
		}
		for(var i=1; i < deleteItem.length; i++){
	    	deleteItem[i].parentExtId = '';
	    	deleteItem[i].parentLboId = '';
	    	deleteItem[i].itemsIndex = 9999;			
		}
    	console.log(':::종료');
    	/*		
    	for(var i=0; i<lboIdCount; i++){
    		if(lboItem[i].parentExtId == tmpLboItemAf.extId ){
    			lboItem[i].delYn = 'Y';
    		}
    	} 
    	*/
    	ExFrm.app.getController('IdeController').showTreeItems();  		
 	},
 	onAfterRender:function(){
 		console.log('...mainController');
 	},
    onHelpProperty:function(){
        //var w = getLboFindFromWidget(lboSelectedInfo.widget, 'ExFrm.view.test.ExGrid');
        if(lboSelectedInfo == null ||
            lboSelectedInfo.widget == null){
            Ext.Msg.alert('확인', '위젯을 먼저 선택하세요');
        }
        openHelpDocument(lboSelectedInfo.widget);
    },
	onToolBarProperty:function(){
		var toolbarProp = Ext.create('ExFrm.view.ide.ToolBarProp');	
		toolbarProp.show();
        toolbarProp.getController().calledByOther(
					this.onRetToolBarReg,
					this); 		
	},
	/*
    onRetAddProp:function(propName, propValue, openObj){
		console.log('..', lboSelectedInfo.widget);
		var prop = {
			propertyName:propName,
			propertyValue:propValue,
			propertyButton:''
		};  
		console.log('prop', prop);  	
    	openObj.lookupReference('gridProperty').getStore().add(prop);	
    	openObj.lookupReference('gridProperty').getStore().commitChanges();
		// 위젯의 정보, 위젯의 부모정보를 읽어온다.
		//getSelectedInfoByWidget(lboSelectedInfo.widget);
		
		ExFrm.app.getController('IdeController').regProperty(propName, propValue); 
	},	
	*/
	onRetToolBarReg:function(propName, propValue, openObj){
		console.log('들어옴');
        var store = openObj.lookupReference('gridProperty').getStore();
        var records = store.getRange();
        var tempFind = false;
        for(i=0; i < records.length; i++){
            if(records[i].data.propertyName == 'dockedItems'){
				//records[i].set(propName, propValue);
				console.log('로그...');
                openObj.selectedRecord = records[i];
				openObj.selectedRecord.set('propertyName', propName);
				openObj.selectedRecord.set('propertyValue', propValue);
				openObj.lookupReference('gridProperty').getStore().commitChanges();
                tempFind = true;
				console.log('console.log();', openObj.selectedRecord);
                break;
            }
        }
        if(tempFind == false){
			console.log('없음console.log()22;', openObj.selectedRecord);
			var prop = {
				propertyName:propName,
				propertyValue:propValue,
				propertyButton:''
			};  
			console.log('prop 추가', prop,openObj );  	
			openObj.lookupReference('gridProperty').getStore().add(prop);	
			openObj.lookupReference('gridProperty').getStore().commitChanges();
			
        }
		ExFrm.app.getController('IdeController').regProperty(propName, propValue); 
	},
    onHelpDocument:function(){
        if(lboSelectedInfo == null ||
            lboSelectedInfo.widget == null){
            Ext.Msg.alert('확인', '위젯을 먼저 선택하세요');
        }        
        openSenchaDocument(lboSelectedInfo.widget);
    }
});
