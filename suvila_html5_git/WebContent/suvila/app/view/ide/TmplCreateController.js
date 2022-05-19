Ext.define('ExFrm.view.ide.TmplCreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tmplcreate',
    onReset:function(){
        console.log(this);
        console.log(this.lookupReference('formreg'));
        console.log(this.lookupReference('screenId'));
        this.redirectTo('ScreenShow/' + this.lookupReference('screenId').getValue());
        this.lookupReference('fieldsetreg').up('form').getForm().reset();
    },
    calledByOther:function(params){
		this.lookupReference('prjPath').setValue(params.prjPath);
		this.lookupReference('tmplName').setValue(params.tmplName);
		this.lookupReference('appName').setValue(params.appName);
		this.lookupReference('folderName').setValue(params.folderName);
		this.lookupReference('viewName').setValue(params.viewName);
		this.lookupReference('xtypeName').setValue(params.xtypeName);
		this.lookupReference('panelType').setValue(params.panelType);
		
		console.log('params.chkViewController', params.chkViewController );
		this.lookupReference('chkViewController').setValue(params.chkViewController);
		this.lookupReference('chkViewModel').setValue(params.chkViewModel);
		
		console.log('2>>>>>>>>>' + params.chkViewModel);
		this.lookupReference('tmplImg').setSrc('./resources/tmpljs/link/img/' + params.tmplName + '.png');
		this.gridInfo = params.gridInfo;
		this.tmplViewCode = params.tmplViewCode;
		this.tmplControllerCode = params.tmplControllerCode;
		this.tmplModelCode = params.tmplModelCode;
		
		lboTmplGridInfo = params.gridInfo;
		lboTmplViewCode = params.tmplViewCode;
		lboTmplControllerCode = params.tmplControllerCode;
		lboTmplModelCode = params.tmplModelCode;		
				
		this.onShowGrid();
    },
	onShowGrid:function(){
		var me = this;
    	console.log('onShowGrid');
    	
    	this.removeGrids();
    	var gridCount = 0;
    	console.log('lboTmplGridInfo', lboTmplGridInfo);
    	
    	console.log('계산1');
    	var gridArrayHaveItems = [];
    	for(var i=0; i < lboTmplGridInfo.gridGroup.length; i++){
    		console.log('계산1:' + i);
    		for(var j=0; j < lboTmplGridInfo.gridGroup[i].gridArray.length; j++){
    			console.log('계산2:' + i);	
    			if(lboTmplGridInfo.gridGroup[i].gridArray[j].itemsCls != ''){
    				console.log('들어왔음');
    				//lboTmplGridInfo.gridGroup[i].gridArray[j].ref = 
    				gridArrayHaveItems.push(lboTmplGridInfo.gridGroup[i].gridArray[j]);
    				gridCount++;
    			}
    		}
    	}

    	this.lookupReference('gridCount').setValue(gridCount);
    	
    	for(var i=0; i < gridArrayHaveItems.length; i++){
    		var gridArrayIn = gridArrayHaveItems[i];
    		this.lookupReference('gridPrefix' + i).setValue(gridArrayIn.prefix);
    		console.log('.....', gridArrayIn);
    		var grid = Ext.create('ExFrm.view.ide.TmplGrid',{
    				title: gridArrayIn.title + ' [' + gridArrayIn.ref + ']' ,
    			    reference:'tmplGrid' + i,
    			    height:300,
    			    itemsCls:gridArrayIn.itemsCls,
    			    ref:gridArrayIn.ref});
    		//this.getView().add(grid);
    		this.lookupReference('gridContent').add(grid);    		
    	}
		
		//modelArray
    	var gridStoreCount = 0;
    	//console.log('lboTmplGridInfo', lboTmplGridInfo);
    	
    	console.log('계산1');
    	var gridStoreArrayHaveItems = [];
		setTimeout(function(){
			for(var i=0; i < lboTmplGridInfo.modelArray.length; i++){
				console.log('계산1:' + i);
				if(lboTmplGridInfo.modelArray[i].fieldName != ''){
					console.log('들어왔음');
					gridStoreArrayHaveItems.push(lboTmplGridInfo.modelArray[i]);
					gridStoreCount++;
				}
			}
			me.lookupReference('gridStoreCount').setValue(gridStoreCount);
			for(var i=0; i < gridStoreArrayHaveItems.length; i++){
				var gridArrayIn = gridStoreArrayHaveItems[i];
				console.log('gridArrayIn.....', gridArrayIn);
				var grid = Ext.create('ExFrm.view.ide.TmplStoreGrid',{
						title: gridArrayIn.storeName + ' [' + gridArrayIn.kind + ']' ,
						reference:'tmplStoreGrid' + i,
						height:300,
						kind:gridArrayIn.kind,
						storeName:gridArrayIn.storeName,
						ref:gridArrayIn.ref});
				//this.getView().add(grid);
				me.lookupReference('gridStoreContent').add(grid);    		
			}
		}, 500)
    	// 그리드
    	/*
		for(var i=0; i< gridCount; i++){
    		this.lookupReference('gridPrefix' + i).setValue(lboTmplGridInfo.gridArray[i].prefix);
    		var grid = Ext.create('ExFrm.view.ide.TmplGrid',{
    				title: lboTmplGridInfo.gridArray[i].title,
    			    reference:'tmplGrid' + i});
    		this.getView().add(grid);			
		}
		*/
    }, 
	removeGrids:function(){
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid9')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid8')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid7')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid6')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid5')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid4')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid3')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid2')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid1')); }catch(e){}
		try{this.lookupReference('gridContent').remove(this.lookupReference('tmplGrid0')); }catch(e){}

		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid9')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid8')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid7')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid6')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid5')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid4')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid3')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid2')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid1')); }catch(e){}
		try{this.lookupReference('gridStoreContent').remove(this.lookupReference('tmplStoreGrid0')); }catch(e){}		
	},
    makeGridToObject:function (grid){
    	var gridItems = grid.getStore().getRange();
    	var objProperty = [];
    	
    	console.log('★★★★★★★★★★★★★★★★★makeGridToOjbect', grid.ref);
    	for(var i in gridItems){
    		objProperty.push({
                itemsCls:gridItems[0].get('itemsCls'),
    			ref:grid.ref,
    			fieldName:gridItems[i].get('fieldName'),
    			fieldKorName: gridItems[i].get('fieldKorName'),
    			fieldType:gridItems[i].get('fieldType'),
    			fromTo:gridItems[i].get('fromTo')
    		});
    	}
    	return objProperty;
    },	
    makeStoreGridToObject:function (grid){
    	var gridItems = grid.getStore().getRange();
    	var objProperty = [];
    	
    	console.log('★★★★★★★★★★★★★★★★★makeGridToOjbect', grid.ref);
    	for(var i in gridItems){
    		objProperty.push({
                kind:gridItems[0].get('kind'),
    			ref:grid.ref,
				storeName:gridItems[i].get('storeName'),
    			fieldName:gridItems[i].get('fieldName'),
    			fieldKorName: gridItems[i].get('fieldKorName'),
    			fieldType:gridItems[i].get('fieldType'),
    			fieldLength:gridItems[i].get('fieldLength'),
				groupField:gridItems[i].get('groupField')
    		});
    	}
    	return objProperty;
    },
	onCreateFiles:function(){
		// 파일을 생성하기 위한 기본처리.
		//var gridObj = [];
		var me = this;
		var writeGridInfo = [];
		//console.log('개수' + this.lookupReference('gridCount').getValue());
		for(var i=0; i < Number(this.lookupReference('gridCount').getValue()); i++){
			var gridObj = this.makeGridToObject(this.lookupReference('tmplGrid' + i));
            if(gridObj.length == 0){
                alert(getLboLangItem('그리드에 입력된 항목이 없습니다.'));
                return;
            }
		}	  	        
        
		for(var i=0; i < Number(this.lookupReference('gridCount').getValue()); i++){
			console.log('i',this.lookupReference('tmplGrid' + i).columnCount);
			writeGridInfo.push({
				columnCount:this.lookupReference('tmplGrid' + i).columnCount,
				ref:this.lookupReference('tmplGrid' + i).ref,
				list:this.makeGridToObject(this.lookupReference('tmplGrid' + i))
			});  
		}	
		
		var writeStoreGridInfo = [];
		//console.log('개수' + this.lookupReference('gridCount').getValue());
		for(var i=0; i < Number(this.lookupReference('gridStoreCount').getValue()); i++){
			var gridObj = this.makeGridToObject(this.lookupReference('tmplStoreGrid' + i));
            if(gridObj.length == 0){
                alert(getLboLangItem('그리드에 입력된 항목이 없습니다.'));
                return;
            }
		}	  	        
        
		for(var i=0; i < Number(this.lookupReference('gridStoreCount').getValue()); i++){
			//console.log('i', i);
			writeStoreGridInfo.push({
				ref:this.lookupReference('tmplStoreGrid' + i).ref,
				list:this.makeStoreGridToObject(this.lookupReference('tmplStoreGrid' + i))
			});  
		}	
		
		//console.log('writeGridInfo', writeGridInfo);

		createTmplFiles(
			writeGridInfo,
			writeStoreGridInfo,
			this.lookupReference('appName').getValue(),
			this.lookupReference('folderName').getValue(),
			this.lookupReference('viewName').getValue(),
			this.lookupReference('xtypeName').getValue(),
			this.lookupReference('panelType').getValue()
		);
		
		// 스토어 파일 만들기...
        //lboStoreDataName[i] = stroeName[i];
        //lboStoreDataFileWriteCont[i] = "";    
		console.log('스토어 만들기');
		for(var i=0; i < lboStoreDataName.length; i++){
		    console.log('fileName',lboUserJsonPath + 
						lboFileSeperator + 'view' + 
						lboFileSeperator + this.lookupReference('folderName') + 
						lboFileSeperator + this.lookupReference('xtypeName').getValue() + '_' + lboStoreDataName[i].toLowerCase() + '.json' );
			console.log('lboStoreDataFileWriteCont[i]', lboStoreDataFileWriteCont[i]);
			
			// 프로세스방지 변수
			var tempAjaxPass = true;

			Ext.Ajax.request({
				type:'ajax',
				url:'./jsp/fileWrite.jsp',
				async: false ,
				params:{
					path: lboServerPath + lboUserServerPath + 
						lboFileSeperator + 'extra' + 
						lboFileSeperator + 'json' + 
						lboFileSeperator + 'view' + 
						lboFileSeperator + this.lookupReference('folderName').getValue() + 
						lboFileSeperator + this.lookupReference('xtypeName').getValue() + '_' + lboStoreDataName[i].toLowerCase() + '.json',
					content:lboStoreDataFileWriteCont[i]
				},
				success:function(res){
					var obj = JSON.parse(res.responseText);
					console.log('obj', obj);
					if(obj.success == false) {
						tempAjaxPass = false;
						Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
						return;
					}
				},
				failure:function(res){
					tempAjaxPass = false;
					if(getLboLang() == 'english')
						Ext.Msg.alert("Error", 'You must make folder (' + me.lookupReference('folderName') + ') at folder json/view/ before make JSON file. - ' + res.responseText.replace(/\'/g,' '));
					else 
						Ext.Msg.alert("오류", 'json/view/ 폴더에 ' + me.lookupReference('folderName') + ' 폴더를 먼저 생성하세요. - ' + res.responseText.replace(/\'/g,' '));

					alert('hi error');
					return;
				}
			}); 
			// 다음 프로세스 방지
			if(tempAjaxPass == false)
				return;			
		}
		
		//consolelog('22222');
		console.log('템플릿뷰코드최종:', lboTmplViewCode);
		console.log('템플릿컨트롤러코드최종:', lboTmplControllerCode);
		console.log('템플릿모델코드최종:', lboTmplModelCode);
        
        if(this.lookupReference('panelType').getValue() == 'ExWindowMain' ||
           this.lookupReference('panelType').getValue() == 'ExPanelSub'){
            console.log('ExWindowMain');
            lboTmplViewCode = lboTmplViewCode.replace('exformmain', 'exform');
        }
		
		for(var i=0; i < 10; i++){
			lboTmplViewCode = lboTmplViewCode.replace('{@+id:items' + i +'}','');
		}
		                                   
		//console.log("this.lookupReference('chkViewController').checked", this.lookupReference('chkViewController').checked);
		//console.log("this.lookupReference('chkViewController').getValue", this.lookupReference('chkViewController').getValue());
		
		if(this.lookupReference('chkViewController').getValue() == false ||
			this.lookupReference('chkViewController').getValue() == 'false'){
			lboTmplControllerCode = '';
		}
		console.log(this.lookupReference('chkViewModel').getValue());
		if(this.lookupReference('chkViewModel').getValue() == false ||
			this.lookupReference('chkViewModel').getValue() == 'false'){
			lboTmplModelCode = '';
		}
		console.log('lboTmplControllerCode', lboTmplControllerCode);
		console.log('lboTmplModelCode', lboTmplModelCode);


		if((this.lookupReference('chkViewController').getValue() == false ||
			this.lookupReference('chkViewController').getValue() == 'false') && 
		   (this.lookupReference('chkViewModel').getValue() == false ||
			this.lookupReference('chkViewModel').getValue() == 'false')){
				lboTmplViewCode = lboTmplViewCode.replace('    requires:[\'ExFrm.view.'+ this.lookupReference('folderName').getValue() +'.' + this.lookupReference('viewName').getValue() + 'Controller\',\n    		  \'ExFrm.view.test.' + this.lookupReference('viewName').getValue() + 'Model\'\n    ],','');
				lboTmplViewCode = lboTmplViewCode.replace('    controller:\'' + this.lookupReference('viewName').getValue().toLowerCase() + '\',', '');
				lboTmplViewCode = lboTmplViewCode.replace('    viewModel:{\n    	type:\'' + this.lookupReference('viewName').getValue().toLowerCase() + '\'\n    }, ', '');
			
		}
		else if(this.lookupReference('chkViewController').getValue() == false ||
			this.lookupReference('chkViewController').getValue() == 'false'){
				lboTmplViewCode = lboTmplViewCode.replace('\'ExFrm.view.' + this.lookupReference('folderName').getValue() + '.' + this.lookupReference('viewName').getValue() + 'Controller\',','');
				lboTmplViewCode = lboTmplViewCode.replace('    controller:\'' + this.lookupReference('viewName').getValue().toLowerCase() + '\',', '');
				
		}	
		else if(this.lookupReference('chkViewModel').getValue() == false ||
			this.lookupReference('chkViewModel').getValue() == 'false'){
				lboTmplViewCode = lboTmplViewCode.replace('\'ExFrm.view.' + this.lookupReference('folderName').getValue() + '.' + this.lookupReference('viewName').getValue() + 'Model\'','');
				lboTmplViewCode = lboTmplViewCode.replace('    viewModel:{\n    	type:\'' + this.lookupReference('viewName').getValue().toLowerCase() + '\'\n    }, ', '');
		}		
		// 뷰코드정렬
        lboTmplViewCode = lboArrangeCode(lboTmplViewCode);
							
		// 여기 	
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWriteMVC.jsp',
			params:{
				pathView: lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					lboFileSeperator + 'view' + 
					lboFileSeperator + this.lookupReference('folderName').getValue() + 
					lboFileSeperator + this.lookupReference('viewName').getValue() + '.js',
				contentView:lboTmplViewCode,
				pathController: lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					lboFileSeperator + 'view' + 
					lboFileSeperator + this.lookupReference('folderName').getValue() + 
					lboFileSeperator + this.lookupReference('viewName').getValue() + 'Controller.js',
				contentController:lboTmplControllerCode,
				pathModel: lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					lboFileSeperator + 'view' + 
					lboFileSeperator + this.lookupReference('folderName').getValue() + 
					lboFileSeperator + this.lookupReference('viewName').getValue() + 'Model.js',
				contentModel:lboTmplModelCode
			},
			success:function(res){
				console.log('res', res);

				alert( getLboLangItem('파일을 생성했습니다.'));
                // History저장시작
				try{
					exCommon.saveHistoryMvc(
						lboServerPath + 
							lboFileSeperator + 'lib' + 
							lboFileSeperator + 'tmpljs' + 
							lboFileSeperator + 'history' + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + folderName + 
							lboFileSeperator + fileName + '.' + exCommon.getNowDateTime(), 
						lboTmplViewCode,
						lboServerPath + 
							lboFileSeperator + 'lib' + 
							lboFileSeperator + 'tmpljs' + 
							lboFileSeperator + 'history' + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + folderName + 
							lboFileSeperator + fileName + 'Controller.' + exCommon.getNowDateTime(), 
						lboTmplControllerCode,
						lboServerPath + 
							lboFileSeperator + 'lib' + 
							lboFileSeperator + 'tmpljs' + 
							lboFileSeperator + 'history' + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + folderName + 
							lboFileSeperator + fileName + 'Model.' + exCommon.getNowDateTime(), 
						lboTmplModelCode);    
				}catch(e){}               
			},
			failure:function(res){
				Ext.Msg.alert( getLboLangItem("오류"), res.responseText);
			}
		});			
	},
	onSearchTemplate:function(){
		var menucontroller = ExFrm.app.getController('MemberController');     	
 		menucontroller.openPopup('ExFrm.view.screen.ScreenTmpPop',  getLboLangItem('템플릿'), {}, this);
	},
	receiveFromPopup:function(params){
		console.log('응답옴:', params);
		this.lookupReference('templateCode').setValue(params.tmpName);
	}
});