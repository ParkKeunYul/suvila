Ext.define('ExFrm.view.ide.TmplMakeStep2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tmplmakestep2',
    onReset:function(){
        console.log(this.lookupReference('formreg'));
        console.log(this.lookupReference('screenId'));
        this.redirectTo('ScreenShow/' + this.lookupReference('screenId').getValue());
        this.lookupReference('fieldsetreg').up('form').getForm().reset();
    },
    gridInfo:{},
    gridModelArray:[],
    gridGroup:[],
    gridGroupLength:0,
    gridGroupCount:0,
    gridArray:[],
    gridArrayCount:0,
    onSearchScreen:function(){
    },    
    calledByOther:function(params){
    	var me = this;
    	me.lookupReference('tmplName').setValue(params.tmplName);
		me.lookupReference('linkContent').setValue(params.strCont);
		me.gridInfo = params.gridObj.gridInfo;
		me.gridModelArray = params.gridObj.gridInfo.modelArray;
		me.gridGroup = params.gridObj.gridInfo.gridGroup;
		me.onShowMainGrid(params.gridObj.gridInfo);
		for(var i=0; i < me.gridModelArray.length; i++){
			var gridData = {
	    		storeName:me.gridModelArray[i].storeName,
	    		kind:me.gridModelArray[i].kind,
	    		type:me.gridModelArray[i].type,
	    		url:me.gridModelArray[i].url,
	    		root:me.gridModelArray[i].root,
	    		pageSize:me.gridModelArray[i].pageSize
	    	};
	    	me.lookupReference('tmplMakeStep2ModelGrid').getStore().add(gridData);			
		}
    },
    // 재조회할 경우.
    onSearch:function(){
    	var me = this;
    	
    	if(this.lookupReference('tmplName').getValue() == ''){
			if(getLboLang() == 'english')
				Ext.Msg.alert('Error','Input Template Name(OOO.link).');
			else 
    			Ext.Msg.alert('확인','템플릿명(OOO.link)을 입력하여주세요');
    		
			return;
    	}
    	
    	var writeMainGridInfo = this.makeGridToObject(this.lookupReference('tmplMakeMainGrid'))
    	var src = writeMainGridInfo[0].src;
    	me.removeGrids();
    	for(var i=7; i>=0; i--){
    		console.log('...' + i);
	    	var index = src.indexOf('{@+id:items' + i + '}');
	    	if(index != -1){
	    		me.gridGroupLength = i+1;
	    		break;
	    	}
	    }
	    console.log('그리드 그룹갯수:' + me.gridGroupLength); 
	    for(var i=0; i < Number(me.gridGroupLength); i++){
			var grid = Ext.create('ExFrm.view.ide.TmplMakeStep2Grid',{
				title: getLboLangItem('그리드') + ' ' + i,
				width:'100%',
				height:500,
			    reference:'tmplMakeStep2Grid' + i});			    				    	
	    	me.lookupReference('panelMake').add(grid);		    	
	    }		    	    
    },
	onShowMainGrid:function(gridInfo){ //gridArray
    	console.log('onShowMainGrid', gridInfo);
    	me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp',
			params:{
				path:lboServerPath + 
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'main' + 
					lboFileSeperator + gridInfo.kind
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				//console.log('obj', obj);
				//models[index].set('src', Ext.encode(obj));
				//console.log('뭘까요', obj);
                var tmplTypeIndex = obj.indexOf('tmplTypeCls:');
                if(tmplTypeIndex != -1){
                    var tempCount = 0;
                    var tempStartIndex = 0;
                    var tempEndIndex = obj.length;
                    for(var i=tmplTypeIndex; i < obj.length; i++){
                        if(obj[i] == '\''){
                            if(tempCount == 0){
                                tempStartIndex = i+1;
                            }
                            else if(tempCount==1){
                                tempEndIndex = i;
                                    var itemCls = obj.substring(tempStartIndex, tempEndIndex);
                                    gridInfo.itemsCls = itemCls;
                                    break;
                            }
                            tempCount++;
                        }
                    }
                }  
                // 템플릿 아이템추가
                /*
                if(obj.indexOf('{@+id:gridItemGroupSummary') != -1){
					gridInfo.itemsCls = 'gridGroupSummary';
				}
				else if(obj.indexOf('{@+id:gridItemSummary') != -1){
					gridInfo.itemsCls = 'gridSummary';
				}
                else if(obj.indexOf('{@+id:gridItemGroup') != -1){
					gridInfo.itemsCls = 'gridGroup';
				}
				else if(obj.indexOf('{@+id:gridPageItem') != -1){
					gridInfo.itemsCls = 'gridPage';
				}
				else if(obj.indexOf('{@+id:gridItem') != -1){
					gridInfo.itemsCls = 'grid';
				}
				else if(obj.indexOf('{@+id:imageCardItem') != -1){
					gridInfo.itemsCls = 'imageCard';
				}
				else if(obj.indexOf('{@+id:imageCardPageItem') != -1){
					gridInfo.itemsCls = 'imageCardPage';
				}                                
                else if(obj.indexOf('{@+id:treeAjaxItem') != -1){
					gridInfo.itemsCls = 'treeAjax';
				}					
                else if(obj.indexOf('{@+id:treeItem') != -1){
					gridInfo.itemsCls = 'tree';
				}					
				else if(obj.indexOf('{@+id:viewItem') != -1){
					gridInfo.itemsCls = 'view';
				}					
				else if(obj.indexOf('{@+id:viewTableItem') != -1){
					gridInfo.itemsCls = 'viewTable';
				}	
				else if(obj.indexOf('{@+id:chartItem') != -1){
					gridInfo.itemsCls = 'chart';
				}	
                */			
				console.log('gridInfo.itemsCls', gridInfo.itemsCls);			
		    	var gridData = {
		    		title:gridInfo.title,
		    		kind:gridInfo.kind,
		    		ref:gridInfo.ref,
		    		prefix:gridInfo.prefix,
		    		type:gridInfo.type,
		    		itemsCls:gridInfo.itemsCls,
		    		src:obj,
		    		req:gridInfo.req,
		    		res:gridInfo.res
		    	};
		    	me.lookupReference('tmplMakeMainGrid').getStore().add(gridData);
		    	// items 메인화면의 그리드 item이므로 item0, item1 으로 설정한다. 
		    	me.removeGrids();
		    	for(var i=7; i>=0; i--){
		    		console.log('...' + i);
			    	var index = obj.indexOf('{@+id:items' + i + '}');
			    	if(index != -1){
			    		me.gridGroupLength = i+1;
			    		break;
			    	}
			    }
			    console.log('그리드 그룹갯수:' + me.gridGroupLength); 
			    for(var i=0; i < Number(me.gridGroupLength); i++){
					var grid = Ext.create('ExFrm.view.ide.TmplMakeStep2Grid',{
	    				title: getLboLangItem('그리드') + ' ' + i,
	    				width:'100%',
	    				height:400,
	    			    reference:'tmplMakeStep2Grid' + i});			    				    	
			    	me.lookupReference('panelMake').add(grid);		    	
			    }
		    	me.gridArray = me.gridInfo.gridGroup[0].gridArray;
		    	me.gridGroupCount = 0;			    	
			    me.onShowGrid(0);
		    				
			},
			failure:function(res){
				Ext.Msg.alert( getLboLangItem("오류"), res.responseText);
			}
		});
    }, 
	removeGrids:function(){
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeStep2Grid7')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeStep2Grid6')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeStep2Grid5')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeStep2Grid4')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeStep2Grid3')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeStep2Grid2')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeStep2Grid1')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeStep2Grid0')); }catch(e){}
	},    
	onShowGrid:function(){ //gridArray
    	console.log('onShowGrid');
    	me = this;
    	//for(var i=0; i< gridArray.length; i++){
    	var i = me.gridArrayCount;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp',
			params:{
				path:lboServerPath + 
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'part' + 
					lboFileSeperator + me.gridArray[i].kind
			},
			success:function(res){
				//console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				//console.log('obj', obj);
				//models[index].set('src', Ext.encode(obj));
				//console.log(obj.data);
                var tmplTypeIndex = obj.indexOf('tmplTypeCls:');
                if(tmplTypeIndex != -1){
                    var tempCount = 0;
                    var tempStartIndex = 0;
                    var tempEndIndex = obj.length;
                    for(var j=tmplTypeIndex; j < obj.length; j++){
                        if(obj[j] == '\''){
                            if(tempCount == 0){
                                tempStartIndex = j+1;
                            }
                            else if(tempCount==1){
                                tempEndIndex = j;
                                var itemCls = obj.substring(tempStartIndex, tempEndIndex);
                                me.gridArray[i].itemsCls = itemCls;
                                break;
                            }
                            tempCount++;
                        }
                    }
                }                
                // 아이템을 추가한다. 
                /*
				if(obj.indexOf('{@+id:gridPageItem') != -1){
					me.gridArray[i].itemsCls = 'gridPage';
				}
				else if(obj.indexOf('{@+id:gridItemGroupSummary') != -1){
					me.gridArray[i].itemsCls = 'gridGroupSummary';
				}                                               
				else if(obj.indexOf('{@+id:gridItemSummary') != -1){
					me.gridArray[i].itemsCls = 'gridSummary';
				}
				else if(obj.indexOf('{@+id:gridItemGroup') != -1){
					me.gridArray[i].itemsCls = 'gridGroup';
				}   
				else if(obj.indexOf('{@+id:gridItem') != -1){
					me.gridArray[i].itemsCls = 'grid';
				}
				else if(obj.indexOf('{@+id:imageCardItem') != -1){
					me.gridArray[i].itemsCls = 'imageCard';
				}
 				else if(obj.indexOf('{@+id:imageCardPageItem') != -1){
					me.gridArray[i].itemsCls = 'imageCardPage';
				}                               
				else if(obj.indexOf('{@+id:treeAjaxItem') != -1){ 
					me.gridArray[i].itemsCls = 'treeAjax';
				}
				else if(obj.indexOf('{@+id:treeItem') != -1){ 
					me.gridArray[i].itemsCls = 'tree';
				}
				else if(obj.indexOf('{@+id:viewItem') != -1){ 
					me.gridArray[i].itemsCls = 'view';
				}
				else if(obj.indexOf('{@+id:viewTableItem') != -1){ 
					me.gridArray[i].itemsCls = 'viewTable';
				}	
				else if(obj.indexOf('{@+id:chartItem') != -1){ 
					me.gridArray[i].itemsCls = 'chart';
				}	
                */									
		    	var gridData = {
		    		title:me.gridArray[i].title,
		    		kind:me.gridArray[i].kind,
		    		ref:me.gridArray[i].ref,
		    		prefix:me.gridArray[i].prefix,
		    		type:me.gridArray[i].type,
		    		itemsCls:me.gridArray[i].itemsCls,
		    		src:obj,
		    		req:me.gridArray[i].req,
		    		res:me.gridArray[i].res
		    	};
		    	console.log('me.gridGroupCount', me.gridGroupCount);
		    	console.log('me.gridGroupCount', me.lookupReference('tmplMakeStep2Grid' + me.gridGroupCount));
		    	me.lookupReference('tmplMakeStep2Grid' + me.gridGroupCount).getStore().add(gridData);
		    	me.gridArrayCount++;
		    	if(me.gridArrayCount < me.gridArray.length){
		    		console.log('데이터 있음');
		    		me.onShowGrid();
		    	}
		    	else if(me.gridArrayCount == me.gridArray.length){
		    		console.log('데이터 없음');
		    		me.gridGroupCount++;
		    		if(me.gridGroupCount < me.gridGroup.length){
		    			console.log('그리드 있음');
			    		me.gridArrayCount = 0;
			    		me.gridArray = me.gridGroup[me.gridGroupCount].gridArray;
			    		me.onShowGrid();			    		
		    		}
		    	}				
			},
			failure:function(res){
				Ext.Msg.alert( getLboLangItem("오류"), res.responseText);
			}
		});	    		

    	//}
    	//this.lookupReference('gridCount').setValue(gridArray.length);
    	//this.removeGrids();
    	// 그리드
    	/*
		for(var i=0; i< Number(gridArray.length); i++){
    		var grid = Ext.create('ExFrm.view.ide.TmplMakeGrid',{
    				title: gridArray[i].title,
    			    reference:'tmplMakeGrid' + i});
    		this.lookupReference('panelMake').add(grid);			
		}
		*/
    }, 
    makeGridToObject:function (grid){
    	var gridItems = grid.getStore().getRange();
    	var objProperty = [];
    	for(var i in gridItems){
    		objProperty.push({
    			title:gridItems[i].get('title'),
    			kind: gridItems[i].get('kind'),
    			ref:gridItems[i].get('ref'),
    			prefix:gridItems[i].get('prefix'),
    			type:gridItems[i].get('type'),
    			itemsCls:gridItems[i].get('itemsCls'),
    			src:gridItems[i].get('src'),
    			req:gridItems[i].get('req'),
    			res:gridItems[i].get('res')
    		});
    	}
    	return objProperty;
    },	
    //'storeName','kind', 'type', 'url', 'root', 'pageSize'
    makeModelGridToObject:function (grid){ 
    	var gridItems = grid.getStore().getRange();
    	var objProperty = [];
    	for(var i in gridItems){
    		objProperty.push({
    			storeName:gridItems[i].get('storeName'),
    			kind: gridItems[i].get('kind'),
                extraInfo: gridItems[i].get('extraInfo'),
    			type:gridItems[i].get('type'),
    			url:gridItems[i].get('url'),
    			root:gridItems[i].get('root'),
    			total:gridItems[i].get('total'),
    			pageSize:gridItems[i].get('pageSize')
    		});
    	}
    	return objProperty;
    },    
	onCreateFiles:function(){
 		var me = this;		
 		
 		// 유효성 검증
 		var tmplName = this.lookupReference('tmplName').getValue();
 		if(tmplName.length < 5){
			if(getLboLang() == 'english')
				Ext.Msg.alert('Error','Template Name is invalid!');
			else 
 				Ext.Msg.alert('오류','템플릿명이 유효하지 않습니다.');
 			this.lookupReference('tmplName').focus();
 			return;
 		}
 		if(tmplName.substring(tmplName.length-5, tmplName.length) != '.link'){
			if(getLboLang() == 'english')
 				Ext.Msg.alert('Error','Template Extension must be .link');
		    else 
				Ext.Msg.alert('오류','템플릿명의 확장자는 .link로 끝나야 합니다.');
		    
 			this.lookupReference('tmplName').focus();
 			return;
 		}
 		// 그리드의 데이터를 모두 입력해야 함.
		for(var i=0; i < this.gridGroupLength; i++){
			var writeGridInfo = this.makeGridToObject(this.lookupReference('tmplMakeStep2Grid' + i))
			// 유효성검증 
			for(var j=0; j <writeGridInfo.length; j++){
				console.log('writeGridInfo[i].itemsCls', writeGridInfo[j].itemsCls);
				if(writeGridInfo[j].itemsCls != ''){
					console.log('writeGridInfo[j].ref', writeGridInfo[j].ref);
					if(writeGridInfo[j].ref == '' || writeGridInfo[j].ref == 'undefined'){
						if(getLboLang() == 'english')
							Ext.Msg.alert('Error', 'Grid ' + i + ' must have Reference name when Item Type is not blank.');
						else 
							Ext.Msg.alert('확인', i + '번째 그리드에서 아이템구분에 값이 있을 경우 레퍼런스를 입력해야 합니다.');
						return;
					}
				}
			}
		} 		

		// 뷰 만들기
		var writeMainGridInfo = this.makeGridToObject(this.lookupReference('tmplMakeMainGrid'))
		console.log('writeMainGridInfo', writeMainGridInfo);
		if(writeMainGridInfo.length == 0){
			if(getLboLang() == 'english')
				Ext.Msg.alert('Error', 'Select Main View');
			else 
				Ext.Msg.alert('확인', '메인화면을 선택하지 않았습니다.');
			
			return;
		}
		else if(writeMainGridInfo.length != 1){
			if(getLboLang() == 'english')
				Ext.Msg.alert('Error', 'Main View must be one');
			else 
				Ext.Msg.alert('확인', '메인화면은 하나만 선택하십시오');
			
			return;
		}


		// 모델 만들기
		var writeModelGridInfo = this.makeModelGridToObject(this.lookupReference('tmplMakeStep2ModelGrid'))
		console.log('writeModelGridInfo', writeModelGridInfo);
		var strModelLinkItems = '';
		for(var i=0; i <writeModelGridInfo.length; i++){
			if(i!=0){
				strModelLinkItems = strModelLinkItems + ',{\n';
			}
			else{
				strModelLinkItems = strModelLinkItems + '        {\n';
			}
			
			if(	writeModelGridInfo[i].kind == 'grid' ||
                writeModelGridInfo[i].kind == 'gridSummary' || 
                writeModelGridInfo[i].kind == 'gridGroupSummary' ||
                writeModelGridInfo[i].kind == 'gridGroup' 
                ){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleList.jsp';
                //writeModelGridInfo[i].extraInfo ='';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '';
				
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +                   
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\'\n' +
					'        }';				
			}
			else if(writeModelGridInfo[i].kind == 'pivot' ){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/samplePivot.jsp';
                //writeModelGridInfo[i].extraInfo ='';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '';
				
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +                   
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\'\n' +
					'        }';				
			}
			else if(writeModelGridInfo[i].kind == 'gridPage' ||
                writeModelGridInfo[i].kind == 'gridPageEditor'
                ){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleList.jsp';
                //writeModelGridInfo[i].extraInfo ='';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '10';	
					
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\',\n' +
					'            pageSize:' + writeModelGridInfo[i].pageSize + '\n' +
					'        }';					
			}
			else if(writeModelGridInfo[i].kind == 'gridPageTool'){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleList.jsp';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '10';			
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\',\n' +
					'            pageSize:' + writeModelGridInfo[i].pageSize + '\n' +
					'        }';				
			}			
			else if(writeModelGridInfo[i].kind == 'gridScroll'){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleList.jsp';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '10';			
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\',\n' +
					'            pageSize:' + writeModelGridInfo[i].pageSize + '\n' +
					'        }';				
			}
			else if(writeModelGridInfo[i].kind == 'treeGrid' ||
					writeModelGridInfo[i].kind == 'treeGridEditor' 
                ){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleTreeGrid.jsp';
                //writeModelGridInfo[i].extraInfo ='';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '';
				
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +                   
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\'\n' +
					'        }';				
			}
			else if( writeModelGridInfo[i].kind == 'treeGridpage' || 
					writeModelGridInfo[i].kind == 'treeGridPage' 
                ){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleTreeGrid.jsp';
                //writeModelGridInfo[i].extraInfo ='';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '10';	
					
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\',\n' +
					'            pageSize:' + writeModelGridInfo[i].pageSize + '\n' +
					'        }';				
			}
			else if(writeModelGridInfo[i].kind == 'imageCard'){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleCardList.jsp';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '';			
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\',\n' +
					'            pageSize:\' \'\n' +
					'        }';				
			}   
 			else if(writeModelGridInfo[i].kind == 'imageCardPage'){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleCardList.jsp';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '10';			
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\',\n' +
					'            pageSize:' + writeModelGridInfo[i].pageSize + '\n' +
					'        }';				
			}                    
			else if(writeModelGridInfo[i].kind == 'tree' ){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleTree.jsp';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '';
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\'\n' +
					'        }';				
			}
			else if(writeModelGridInfo[i].kind == 'chart'){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleChartBar.jsp';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '';
				
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\'\n' +
					'        }';
			}
			else if(	writeModelGridInfo[i].kind == 'chartPie'){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleChartPie.jsp';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '';
				
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\'\n' +
					'        }';
			}   
			else if(	writeModelGridInfo[i].kind == 'chartCandleStick'){
				writeModelGridInfo[i].type='ajax';
				writeModelGridInfo[i].url='./test/sampleChartCandleStick.jsp';
				writeModelGridInfo[i].root='data.list';
				writeModelGridInfo[i].total='listTotalSize';
				writeModelGridInfo[i].pageSize = '';
				
				strModelLinkItems = strModelLinkItems + 
					'            storeName:\'' + writeModelGridInfo[i].storeName + '\',\n' +
					'            kind:\'' + writeModelGridInfo[i].kind + '\',\n' +
                    '            extaInfo:\'' + writeModelGridInfo[i].extraInfo + '\',\n' +      
					'            type:\'' + writeModelGridInfo[i].type + '\',\n' +
					'            url:\'' + writeModelGridInfo[i].url + '\',\n' + 
					'            root:\'' + writeModelGridInfo[i].root + '\',\n' +
					'            total:\'' + writeModelGridInfo[i].total + '\'\n' +
					'        }';
			}                     
			else {
				if(getLboLang() == 'english')
					Ext.Msg.alert('Error', 'Select View Model\'s Store Kind with ComboBox ');
				else 
					Ext.Msg.alert('확인', '스토어의 타입을 임의로 등록할 수 없습니다. 콤보박스에서 선택하십시오');
				return
			}
		}
		
		// 모델 관리
		var strModelItems  = '';
		console.log('modelGrid',writeModelGridInfo.length);
		for(var i=0; i < writeModelGridInfo.length; i++){
			
			console.log('modelGrid', writeModelGridInfo[i]);
			if(writeModelGridInfo[i].kind == 'grid' ||
                writeModelGridInfo[i].kind == 'imageCard'){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            fields:[\'field1\'],\n';
                if( writeModelGridInfo[i].extraInfo != null && writeModelGridInfo[i].extraInfo != '' ){
                    strModelItems = strModelItems + 
                    '            ' + writeModelGridInfo[i].extraInfo + ',\n';    // 하단에서 수정.
                }
                strModelItems = strModelItems +  
				'            {@+id:groupField' + getFirstUpper(writeModelGridInfo[i].storeName) + '}\n' +
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기 
			    '                reader:{\n' + 
			    '                    type:\'json\',\n' + 
			    '                    rootProperty:\'' + writeModelGridInfo[i].root +'\',\n';
			    if( writeModelGridInfo[i].total != null &&
			    	writeModelGridInfo[i].total != '' && 
			    	writeModelGridInfo[i].total != 0) {
			    	strModelItems = strModelItems +		
			    	'                    totalProperty:\'' + writeModelGridInfo[i].total +'\',\n';
			    }		    
			    strModelItems = strModelItems +	
			    '                    keepRawData:true\n' + 
			    '                }\n' + 
			    '            },\n' + 
			    '            autoLoad:false\n';
			    /*
			    if( writeModelGridInfo[i].pageSize != null &&
			    	writeModelGridInfo[i].pageSize != '' && 
			    	writeModelGridInfo[i].pageSize.trim() != '' &&
			    	writeModelGridInfo[i].pageSize != 0) {
			    	strModelItems = strModelItems +		
			    	'            pageSize:' + writeModelGridInfo[i].pageSize +'\n';
			    }
			    */
	  			strModelItems = strModelItems +
			    '        }';
			}
			else if(writeModelGridInfo[i].kind == 'pivot' ){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            fields:[\'field1\'],\n';
                if( writeModelGridInfo[i].extraInfo != null && writeModelGridInfo[i].extraInfo != '' ){
                    strModelItems = strModelItems + 
                    '            ' + writeModelGridInfo[i].extraInfo + ',\n';    // 하단에서 수정.
                }
                strModelItems = strModelItems +  
				'            {@+id:groupField' + getFirstUpper(writeModelGridInfo[i].storeName) + '}\n' +
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기 
			    '                reader:{\n' + 
			    '                    type:\'json\',\n' + 
			    '                    rootProperty:\'' + writeModelGridInfo[i].root +'\',\n';
			    if( writeModelGridInfo[i].total != null &&
			    	writeModelGridInfo[i].total != '' && 
			    	writeModelGridInfo[i].total != 0) {
			    	strModelItems = strModelItems +		
			    	'                    totalProperty:\'' + writeModelGridInfo[i].total +'\',\n';
			    }		    
			    strModelItems = strModelItems +	
			    '                    keepRawData:true\n' + 
			    '                }\n' + 
			    '            },\n' + 
			    '            autoLoad:false\n';
			    /*
			    if( writeModelGridInfo[i].pageSize != null &&
			    	writeModelGridInfo[i].pageSize != '' && 
			    	writeModelGridInfo[i].pageSize.trim() != '' &&
			    	writeModelGridInfo[i].pageSize != 0) {
			    	strModelItems = strModelItems +		
			    	'            pageSize:' + writeModelGridInfo[i].pageSize +'\n';
			    }
			    */
	  			strModelItems = strModelItems +
			    '        }';
			}
			else if( writeModelGridInfo[i].kind == 'chart' ||
                     writeModelGridInfo[i].kind == 'chartPie' || 
                     writeModelGridInfo[i].kind == 'chartCandleStick'){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            {@+id:groupField' + getFirstUpper(writeModelGridInfo[i].storeName) + '}\n' +
				'            fields:[\'field1\'],\n' + 
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기
			    '                reader:{\n' + 
			    '                    type:\'json\',\n' + 
			    '                    rootProperty:\'' + writeModelGridInfo[i].root +'\',\n';
			    if( writeModelGridInfo[i].total != null &&
			    	writeModelGridInfo[i].total != '' && 
			    	writeModelGridInfo[i].total != 0) {
			    	strModelItems = strModelItems +		
			    	'                    totalProperty:\'' + writeModelGridInfo[i].total +'\',\n';
			    }		    
			    strModelItems = strModelItems +	
			    '                    keepRawData:true\n' + 
			    '                }\n' + 
			    '            },\n' + 
			    '            autoLoad:false\n';
			    /*
			    if( writeModelGridInfo[i].pageSize != null &&
			    	writeModelGridInfo[i].pageSize != '' && 
			    	writeModelGridInfo[i].pageSize.trim() != '' &&
			    	writeModelGridInfo[i].pageSize != 0) {
			    	strModelItems = strModelItems +		
			    	'            pageSize:' + writeModelGridInfo[i].pageSize +'\n';
			    }
			    */
	  			strModelItems = strModelItems +
			    '        }';
			}			
			else if(writeModelGridInfo[i].kind == 'gridPage' || 
                writeModelGridInfo[i].kind == 'imageCardPage'){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            fields:[\'field1\'],\n';
                
                if( writeModelGridInfo[i].extraInfo != null && writeModelGridInfo[i].extraInfo != '' ){
                    strModelItems = strModelItems + 
                    '            ' + writeModelGridInfo[i].extraInfo + ',\n';    // 하단에서 수정.
                }
                
                strModelItems = strModelItems + 
				'            {@+id:groupField' + getFirstUpper(writeModelGridInfo[i].storeName) + '}\n' + 
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기
			    '                reader:{\n' + 
			    '                    type:\'json\',\n' + 
			    '                    rootProperty:\'' + writeModelGridInfo[i].root +'\',\n';
			    if( writeModelGridInfo[i].total != null &&
			    	writeModelGridInfo[i].total != '' && 
			    	writeModelGridInfo[i].total != 0) {
			    	strModelItems = strModelItems +		
			    	'                    totalProperty:\'' + writeModelGridInfo[i].total +'\',\n';
			    }		    
			    strModelItems = strModelItems +	
			    '                    keepRawData:true\n' + 
			    '                }\n' + 
			    '            },\n' + 
			    '            autoLoad:false,\n';
			    if( writeModelGridInfo[i].pageSize != null &&
			    	writeModelGridInfo[i].pageSize != '' && 
			    	writeModelGridInfo[i].pageSize != 0) {
			    	strModelItems = strModelItems +		
			    	'            pageSize:' + writeModelGridInfo[i].pageSize +'\n';
			    }
	  			strModelItems = strModelItems +
			    '        }';				
			}
			else if(writeModelGridInfo[i].kind == 'gridPageTool'){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            fields:[\'field1\'],\n';
                
                if( writeModelGridInfo[i].extraInfo != null && writeModelGridInfo[i].extraInfo != '' ){
                    strModelItems = strModelItems + 
                    '            ' + writeModelGridInfo[i].extraInfo + ',\n';    // 하단에서 수정.
                }
                
                strModelItems = strModelItems +         
				'            {@+id:groupField' + getFirstUpper(writeModelGridInfo[i].storeName) + '}\n' +    
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기
			    '                reader:{\n' + 
			    '                    type:\'json\',\n' + 
			    '                    rootProperty:\'' + writeModelGridInfo[i].root +'\',\n';
			    if( writeModelGridInfo[i].total != null &&
			    	writeModelGridInfo[i].total != '' && 
			    	writeModelGridInfo[i].total != 0) {
			    	strModelItems = strModelItems +		
			    	'                    totalProperty:\'' + writeModelGridInfo[i].total +'\',\n';
			    }		    
			    strModelItems = strModelItems +	
			    '                    keepRawData:true\n' + 
			    '                }\n' + 
			    '            },\n' + 
			    '            autoLoad:false,\n';
			    if( writeModelGridInfo[i].pageSize != null &&
			    	writeModelGridInfo[i].pageSize != '' && 
			    	writeModelGridInfo[i].pageSize != 0) {
			    	strModelItems = strModelItems +		
			    	'            pageSize:' + writeModelGridInfo[i].pageSize +'\n';
			    }
	  			strModelItems = strModelItems +
			    '        }';				
			}	
			else if(writeModelGridInfo[i].kind == 'gridPageScroll'){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            fields:[\'field1\'],\n';
                
                if( writeModelGridInfo[i].extraInfo != null && writeModelGridInfo[i].extraInfo != '' ){
                    strModelItems = strModelItems + 
                    '            ' + writeModelGridInfo[i].extraInfo + ',\n';    // 하단에서 수정.
                }
                
                strModelItems = strModelItems + 
				'            {@+id:groupField' + getFirstUpper(writeModelGridInfo[i].storeName) + '}\n' +               
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기
			    '                reader:{\n' + 
			    '                    type:\'json\',\n' + 
			    '                    rootProperty:\'' + writeModelGridInfo[i].root +'\',\n';
			    if( writeModelGridInfo[i].total != null &&
			    	writeModelGridInfo[i].total != '' && 
			    	writeModelGridInfo[i].total != 0) {
			    	strModelItems = strModelItems +		
			    	'                    totalProperty:\'' + writeModelGridInfo[i].total +'\',\n';
			    }		    
			    strModelItems = strModelItems +	
			    '                    keepRawData:true\n' + 
			    '                }\n' + 
			    '            },\n' + 
			    '            autoLoad:false,\n';
			    if( writeModelGridInfo[i].pageSize != null &&
			    	writeModelGridInfo[i].pageSize != '' && 
			    	writeModelGridInfo[i].pageSize != 0) {
			    	strModelItems = strModelItems +		
			    	'            pageSize:' + writeModelGridInfo[i].pageSize +'\n';
			    }
	  			strModelItems = strModelItems +
			    '        }';				
			}	
			else if(writeModelGridInfo[i].kind == 'tree'){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            type:\'tree\', \n' + 
				'            fields:[\'field1\'],\n' + 
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기 
			    '                reader:{\n' + 
			    '                    type:\'json\'\n' + 
//			    '                    root:\'' + writeModelGridInfo[i].root +'\'\n' + 
			    '                }\n' + 
			    '            },\n' + 
			    '            autoLoad:false,\n' +
			    '        }';				
			}
			else if(writeModelGridInfo[i].kind == 'treeGrid'){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            fields:[\'field1\'],\n';
                if( writeModelGridInfo[i].extraInfo != null && writeModelGridInfo[i].extraInfo != '' ){
                    strModelItems = strModelItems + 
                    '            ' + writeModelGridInfo[i].extraInfo + ',\n';    // 하단에서 수정.
                }
                strModelItems = strModelItems + 
				'            type:\'tree\', \n' +  
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기
			    '                reader:\'json\'\n' + 
			    '            },\n' + 
			    '            autoLoad:false\n';
			    /*
			    if( writeModelGridInfo[i].pageSize != null &&
			    	writeModelGridInfo[i].pageSize != '' && 
			    	writeModelGridInfo[i].pageSize.trim() != '' &&
			    	writeModelGridInfo[i].pageSize != 0) {
			    	strModelItems = strModelItems +		
			    	'            pageSize:' + writeModelGridInfo[i].pageSize +'\n';
			    }
			    */
	  			strModelItems = strModelItems +
			    '        }';
			}
			else if(writeModelGridInfo[i].kind == 'chart'){
				if(i!=0){
					strModelItems = strModelItems + ',\n        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				else{
					strModelItems = strModelItems + '        ' + writeModelGridInfo[i].storeName + ':{\n';
				}
				strModelItems = strModelItems + 
				'            {@+id:groupField' + getFirstUpper(writeModelGridInfo[i].storeName) + '}\n' +
				'            fields:[\'field1\'],\n' + 
				'            proxy:{\n' + 
			    '                type:\'' + writeModelGridInfo[i].type + '\',\n' + 
			    "                url:lboUserJsonPath + '/view/{@+id:pathOrg}/{@+id:url" + getFirstUpper(writeModelGridInfo[i].storeName) + "}',\n" +  // 여기
			    '                reader:{\n' + 
			    '                    type:\'json\',\n' + 
			    '                    rootProperty:\'' + writeModelGridInfo[i].root +'\',\n';
			    if( writeModelGridInfo[i].total != null &&
			    	writeModelGridInfo[i].total != '' && 
			    	writeModelGridInfo[i].total != 0) {
			    	strModelItems = strModelItems +		
			    	'                    totalProperty:\'' + writeModelGridInfo[i].total +'\',\n';
			    }		    
			    strModelItems = strModelItems +	
			    '                    keepRawData:true\n' + 
			    '                }\n' + 
			    '            },\n' + 
			    '            autoLoad:false\n';
			    /*
			    if( writeModelGridInfo[i].pageSize != null &&
			    	writeModelGridInfo[i].pageSize != '' && 
			    	writeModelGridInfo[i].pageSize.trim() != '' &&
			    	writeModelGridInfo[i].pageSize != 0) {
			    	strModelItems = strModelItems +		
			    	'            pageSize:' + writeModelGridInfo[i].pageSize +'\n';
			    }
			    */
	  			strModelItems = strModelItems +
			    '        }';
			}	
		}
		

		var strModel = ''+		
			'Ext.define(\'{@+id:appName}.view.{@+id:path}.{@+id:code}Model\', {\n' + 
			'    extend:\'Ext.app.ViewModel\', \n'+ 
			'    alias: \'viewmodel.{@+id:codeLowercase}\', \n'+ 
			'    stores:{ \n' + 
			strModelItems +  '\n' + 
			'    }\n' +     
			'});';
		// 프로세스방지 변수
		var tempAjaxPass = true;

		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			async:false,
			params:{
				path: lboServerPath + 
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'tmpl' + 
					lboFileSeperator + me.lookupReference('tmplName').getValue().replace('.link','_model.js'),
				content:strModel
			},
			success:function(res){
				var obj = JSON.parse(res.responseText);
				console.log('obj', obj);
				if(obj.success == false) {
					tempAjaxPass = false; //오류로인한 방지
					Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
					return;
				}
				if(getLboLang() == 'english')
					Ext.Msg.alert('Info','File was created');
				else
					Ext.Msg.alert( getLboLangItem('확인'), getLboLangItem('파일을 생성했습니다.'));
			},
			failure:function(res){
				tempAjaxPass = false; //오류로인한 방지
				Ext.Msg.alert( getLboLangItem("오류"), res.responseText);
			}
		});
        
		if(tempAjaxPass == false) // 다음 프로세스 방지
			return;

		//뷰만들기
		var strMainPanel=writeMainGridInfo[0].src;		


		
		var strLinkItems = '';
		for(var i=0; i < this.gridGroupLength; i++){
			var writeGridInfo = this.makeGridToObject(this.lookupReference('tmplMakeStep2Grid' + i))
			// 유효성검증
			/* 
			for(var i=0; i<writeGridInfo.length; i++){
				console.log('writeGridInfo[i].itemsCls', writeGridInfo[i].itemsCls);
				if(writeGridInfo[i].itemsCls != ''){
					console.log('writeGridInfo[i].ref', writeGridInfo[i].ref);
					if(writeGridInfo[i].ref == '' || writeGridInfo[i].ref == 'undefined'){
						Ext.Msg.alert('확인', '아이템구분에 값이 있을 경우 레퍼런스를 입력해야 합니다.');
						return;
					}
				}
			}	
			*/		
			var strItems='';
			if(i!=0){
				strLinkItems = strLinkItems + ',{\n';
			}
			else{
				strLinkItems = strLinkItems + '        {\n';
			}
			console.log('view:' + i);
			strLinkItems = strLinkItems + '            gridArray:[\n';

            var tmplTabStartCls = false;
            var tmplTabEndCls = false;
            var tmplTabPageStartCls = false;
            var tmplTabPageEndCls = false;
            var tmplTabStartClsBf = false;
            var tmplTabEndClsBf = false;
            var tmplTabPageStartClsBf = false;
            var tmplTabPageEndClsBf = false;             
            
			for(var j=0; j <writeGridInfo.length; j++){
				console.log('view::' + j);
				var commentStartIndex = writeGridInfo[j].src.indexOf('/*');
				var commentEndIndex = writeGridInfo[j].src.indexOf('*/');
                tmplTabStartCls = false;
                tmplTabEndCls = false;
                tmplTabPageStartCls = false;
                tmplTabPageEndCls = false;
            
				if(commentEndIndex !=-1){
 					var objInfo = Ext.decode(writeGridInfo[j].src.substring(commentStartIndex + 2, commentEndIndex));
					if(objInfo.tmplTabStartCls != null){
						tmplTabStartCls = objInfo.tmplTabStartCls;
                    }                   
 					if(objInfo.tmplTabEndCls != null){
						tmplTabEndCls = objInfo.tmplTabEndCls;
                    } 
 					if(objInfo.tmplTabPageStartCls != null){
						tmplTabPageStartCls = objInfo.tmplTabPageStartCls;
                    }                    
 					if(objInfo.tmplTabPageEndCls != null){
						tmplTabPageEndCls = objInfo.tmplTabPageEndCls;
                    } 
                    
					writeGridInfo[j].src = writeGridInfo[j].src.substring(commentEndIndex + 2, writeGridInfo[j].src.length);				
				}
                if(tmplTabStartCls == true ||
                    tmplTabEndCls == true ||
                    tmplTabPageStartCls == true ||
                    tmplTabPageEndCls == true
                ){
                    if(tmplTabPageEndClsBf == true && 
                        tmplTabPageStartCls == true){
                        strItems = strItems + ',';
                    }
                    else if(tmplTabEndClsBf == true &&
                        tmplTabStartCls == true){
                        strItems = strItems + ',';
                    }
					else if(tmplTabStartCls == true && 
						tmplTabEndClsBf == false){
						strItems = strItems + ',';
					}
                }
                else {
                    if( tmplTabStartClsBf == true ||
                        tmplTabPageStartClsBf == true){
                        // 통과.. 텝 시작이기 때문에 콤마 생략. 
                    }
                    else {
                        if(j!=0){
                            strItems = strItems + ',';
                        }
                    }
                }
                tmplTabStartClsBf = tmplTabStartCls;
                tmplTabEndClsBf = tmplTabEndCls;
                tmplTabPageStartClsBf = tmplTabPageStartCls;
                tmplTabPageEndClsBf = tmplTabPageEndCls;                
                
				if(j!=0){
				    //strItems = strItems + ',';
					strLinkItems = strLinkItems + ',{\n';
				}
				else{
					strLinkItems = strLinkItems + '            {\n';
				}
				//그리드의 경우 스토어를 설정한다.
				console.log('writeGridInfo[j].res::' + writeGridInfo[j].res); 
				if(writeGridInfo[j].res != ''){
					console.log('writeGridInfo[j].res::>>'); 
					while(writeGridInfo[j].src.indexOf('{@+tmpl:storeName}') != -1){
						console.log('writeGridInfo[j].res::>>들어옴'); 
						writeGridInfo[j].src = writeGridInfo[j].src.replace('{@+tmpl:storeName}',writeGridInfo[j].res);
					}
				}
				console.log('writeGridInfo[j].ref::' + writeGridInfo[j].ref); 
				if(writeGridInfo[j].ref != ''){
					console.log('writeGridInfo[j].res::>>');
					while(writeGridInfo[j].src.indexOf('{@+tmpl:ref}') != -1){
						console.log('writeGridInfo[j].res::>>들어옴');
						writeGridInfo[j].src = writeGridInfo[j].src.replace('{@+tmpl:ref}', writeGridInfo[j].ref);
					}
					while(writeGridInfo[j].src.indexOf('{@+tmpl:refFUpper}') != -1){
						console.log('writeGridInfo[j].res::>>들어옴');
						writeGridInfo[j].src = writeGridInfo[j].src.replace('{@+tmpl:refFUpper}', getFirstUpper(writeGridInfo[j].ref));
					}					
				}
				strItems = strItems + writeGridInfo[j].src;
							
				strLinkItems = strLinkItems + 
					'                explain:\'템플릿설명\',\n' +
					'                title:\'' + writeGridInfo[j].title + '\',\n' +
					'                kind:\'' + writeGridInfo[j].kind + '\',\n' +
					'                ref:\'' + writeGridInfo[j].ref + '\',\n' + 
					'                prefix:\'' + writeGridInfo[j].prefix + '\',\n' +
					'                type:\'' + writeGridInfo[j].type + '\',\n' +
					'                itemsCls:\'' + writeGridInfo[j].itemsCls + '\',\n' +
					'                src:\'\',\n' +
					'                req:\'' + writeGridInfo[j].req + '\',\n' + 
					'                res:\'' + writeGridInfo[j].res + '\'\n' + 
					'            }';				
			}
			strLinkItems = strLinkItems + ']\n' + 
		                                  '        }';
			console.log('변환전:', strMainPanel);
			strMainPanel = strMainPanel.replace('{@+id:items' + i + '}', strItems);
		}
		console.log('변환후:', strMainPanel);
		
		// 한건도 없을 경우를 대비해 0은 초기화함.
		if(this.gridGroupLength == 0){
			strMainPanel = strMainPanel.replace('{@+id:items0}', '');
		}
		// 링크만들기 (메인.link)
		var strLink = 
		    '{\n' +
			'    gridInfo:{\n' +
			'        explain:"템플릿설명",\n' +
			'        title:\'' + writeMainGridInfo[0].title + '\',\n' +
			'        kind:\'' + writeMainGridInfo[0].kind + '\',\n' +
			'        ref:\'' + writeMainGridInfo[0].ref + '\',\n' +
			'        prefix:\'' + writeMainGridInfo[0].prefix + '\',\n' +
			'        type:\'' + writeMainGridInfo[0].type + '\',\n' +
			'        itemsCls:\'' + writeMainGridInfo[0].itemsCls + '\',\n' +
			'        src:\'\',\n' +
			'        req:\'' + writeMainGridInfo[0].req + '\',\n' + 
			'        res:\'' + writeMainGridInfo[0].res + '\',\n' + 
			'        modelArray:[\n' + strModelLinkItems + '],\n' + 
			'        gridGroup:[\n'+strLinkItems + ']\n' + 
			'    },\n'+
			'    success:true,\n' + 
			'    msg:\'\'\n' + 			
			'}';
		console.log('링크:', strLink);

		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			async:false, // 비동기
			params:{
				path: lboServerPath + 
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'link' + 
					lboFileSeperator + me.lookupReference('tmplName').getValue(),
				content:strLink
			},
			success:function(res){
				var obj = JSON.parse(res.responseText);
				console.log('obj', obj);
				if(obj.success == false) {
					Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
					return;
				}
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					async:false, // 비동기
					params:{
						path: lboServerPath + 
							lboFileSeperator + 'lib' + 
							lboFileSeperator + 'tmpljs' + 
							lboFileSeperator + 'tmpl' + 
							lboFileSeperator + me.lookupReference('tmplName').getValue().replace('.link','_view.js'),
						content:strMainPanel
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							tempAjaxPass = false; //오류로인한 방지
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						Ext.Msg.alert( getLboLangItem('확인'), getLboLangItem('파일을 생성했습니다.'));
					},
					failure:function(res){
						tempAjaxPass = false; //오류로인한 방지
						Ext.Msg.alert( getLboLangItem("오류"), res.responseText);
					}
				});
			},
			failure:function(res){
				tempAjaxPass = false; //오류로인한 방지
				Ext.Msg.alert( getLboLangItem("오류"), res.responseText);
			}
		}); 


		if(tempAjaxPass == false) // 다음 프로세스 방지
			return;

		// 컨트롤러 만들기
		console.log('컨트롤러 만들기1...');
        
        // 모델기준으로 만들고 res 로 사용하는 위젯에서 해당 메소드의 reference를 수정하여 처리한다. 
		var strModelMethod = '';
		for(var i=0; i <writeModelGridInfo.length; i++){
			console.log('modelGrid', writeModelGridInfo[i]);	
			
            if( writeModelGridInfo[i].itemsCls == 'imageCard'){
                strModelMethod = strModelMethod +  
                '    on' + getFirstUpper(writeModelGridInfo[i].storeName) + ':function(params){\n' +
                '        var me = this;\n' +
                '        {@+tmpl:req_' + writeModelGridInfo[i].storeName + '}\n' + 
                '        me.callStore(me, \'' + writeModelGridInfo[i].storeName + '\', \'' + '' +'\', params, me.on' + getFirstUpper(writeModelGridInfo[i].storeName) + 
                            'Callback, null, \'{@+tmpl:widget_' +writeModelGridInfo[i].storeName + '}\')\n' + 		
                '    },\n' + 
                '    on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback:function(me, success, records, operation){\n' +
                '        if(success == true){\n' + 
				'           /*\n' + 
                '			{@+tmpl:res_' + writeModelGridInfo[i].storeName + '}\n' + 
				'           */\n' + 		
                '        }\n' + 
                '    },\n';            
            }
            else if( writeModelGridInfo[i].itemsCls == 'imageCardPage'){
                 strModelMethod = strModelMethod +  
                '    on' + getFirstUpper(writeModelGridInfo[i].storeName) + ':function(params){\n' +
                '        var me = this;\n' +
                '        {@+tmpl:req_' + writeModelGridInfo[i].storeName + '}\n' + 
                '        me.callStore(me, \'' + writeModelGridInfo[i].storeName + '\', \'' + 
                            '{@+tmpl:page_' + writeModelGridInfo[i].storeName + 'Arrows}' +'\', params,'+
                            'me.on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback, null, \'{@+tmpl:widget_' +writeModelGridInfo[i].storeName + '}\')\n' +  		
                '    },\n' + 
                '    on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback:function(me, success, records, operation){\n' +
                '        if(success == true){\n' + 
				'           /*\n' + 
                '			{@+tmpl:res_' + writeModelGridInfo[i].storeName + '}\n' + 	
				'           */\n' + 	
                '        }\n' + 
                '    },\n';               
            }
            else {
                strModelMethod = strModelMethod +  
                '    on' + getFirstUpper(writeModelGridInfo[i].storeName) + ':function(params){\n' +
                '        var me = this;\n' +
                '        {@+tmpl:req_' + writeModelGridInfo[i].storeName + '}\n' + 
                '        me.callStore(me, \'' + writeModelGridInfo[i].storeName + '\', \'' + '{@+tmpl:page_' + writeModelGridInfo[i].storeName + 'Arrows}' +'\', params,'+
                            ' me.on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback)\n' + 		
                '    },\n' + 
                '    on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback:function(me, success, records, operation){\n' +
                '        if(success == true){\n' + 
				'           /*\n' + 
                '			{@+tmpl:res_' + writeModelGridInfo[i].storeName + '}\n' + 
				'           */\n' + 		
                '        }\n' + 
                '    },\n';
            }			
			/* 구방식			
			strModelMethod = strModelMethod +  
			'    on' + getFirstUpper(writeModelGridInfo[i].storeName) + ':function(params){\n' +
			'        var me = this;\n' +
			'        {@+tmpl:req_' + writeModelGridInfo[i].storeName + '}\n' + 
			'        this.getViewModel().getStore(\'' + writeModelGridInfo[i].storeName +'\').load({\n' +
			'            params:params,\n' +
			'            callback:this.on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback,\n' +
			'            scope:this\n' +
			'        });\n' +		
			'    },\n' + 
			'    on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback:function(records, operation, success){\n' +
			'        var me = this;\n' +
			'        if(success == true){\n' + 
			'			{@+tmpl:res_' + writeModelGridInfo[i].storeName + '}\n' + 		
			'        }\n' + 
			'        else if(success == false){\n' + 
			'            try{\n' + 
			'                Ext.Msg.alert(\'오류\', this.getViewModel().getStore(\'' + writeModelGridInfo[i].storeName + '\').getProxy().getReader().rawData.msg);\n' + 
			'            }\n' + 
			'            catch(e){\n' + 
			'                Ext.Msg.alert(\'오류\', operation.error.response.responseText);\n' + 
			'            }\n' + 
			'        }\n' + 
			'    },\n';
			*/
			
			// 페이지형태일 경우
			/*	
			if(writeModelGridInfo[i].kind == 'pageArrow'){
				strModelMethod = strModelMethod +  
				'    on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'PrevPage:function(params){\n' +
				'        var me = this;\n' +
				'        this.getViewModel().getStore(\'' + writeModelGridInfo[i].storeName +'\').previousPage({\n' +
				'            params:params,\n' +
				'            callback:this.on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback,\n' +
				'            scope:this\n' +
				'        });\n' +
				'    },\n' + 
				'    on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'NextPage:function(params){\n' +
				'        var me = this;\n' +
				'        this.getViewModel().getStore(\'' + writeModelGridInfo[i].storeName +'\').nextPage({\n' +
				'            params:params,\n' +
				'            callback:this.on' + getFirstUpper(writeModelGridInfo[i].storeName) + 'Callback,\n' +
				'            scope:this\n' +
				'        });\n' +
				'    },\n';
			}	
			*/		
			
		}
		
		// 페이지관련 메소드 추가
		var pageMethod = '';
		var scrollMethod = '';
		// 현재 페이지
		var currentPage = 0;
		// 총 레코드수
		var totCount = 0;
        // 추가메소드
        var strAddMethod = '';
        
		// 그리드의 req를 읽어들여 메소드를 생성한다.		 
		for(var i=0; i < this.gridGroupLength; i++){
			var writeGridInfo = this.makeGridToObject(this.lookupReference('tmplMakeStep2Grid' + i))
			for(var j=0; j <writeGridInfo.length; j++){
				console.log('....>>>>' + i);
				if(writeGridInfo[j].req != '' && writeGridInfo[j].ref != ''){
					// 조회처리
					strModelMethod = strModelMethod + 
					'    on' + getFirstUpper(writeGridInfo[j].ref) + ':function(){\n' +
					'       {@+id:refToVal_' + writeGridInfo[j].ref + '}\n' + 
					'        var params = {\n' + 
					'            {@+id:valToParam_' + writeGridInfo[j].ref + '}\n' + 
					'        };\n';
					var reqs = writeGridInfo[j].req.split(',');
					for(var k=0; k < reqs.length; k++){
						strModelMethod = strModelMethod + 
						'        this.on' + getFirstUpper(reqs[k].trim()) + '(params);\n';
					}  
					strModelMethod= strModelMethod + '    },\n';
				}
				console.log('여기는 누가 들어오나 kind' + writeGridInfo[j].kind);
				if(writeGridInfo[j].itemsCls.length >= 4 && writeGridInfo[j].itemsCls.substring(0,4) != 'grid'){
					console.log('여기는 누가 들어오나');
					if(writeGridInfo[j].res != ''){
						strModelMethod = 
							strModelMethod.replace('{@+tmpl:res_' + writeGridInfo[j].res + '}', 
							'{@+id:storeToRef_' + writeGridInfo[j].ref + '}\n            ' + 
							'{@+tmpl:res_' + writeGridInfo[j].res + '}');
                        

					}
				}
                strModelMethod =
                    strModelMethod.replace('{@+tmpl:widget_' + writeGridInfo[j].res + '}', 
                        writeGridInfo[j].ref);
  
                
				// 그리드의 추가항목을 넣는다. 
				// 페이지이동처리
				// 뷰소스를 이용하여 컨트롤러에 들어갈 변수를 제어한다.(수정필요!!!)

				var commentStartIndex = writeGridInfo[j].src.indexOf('/*');
				var commentEndIndex = writeGridInfo[j].src.indexOf('*/');
				console.log('...1');
				var tmplTypeCls = '';
				//var tmplCurPageCount = false;
				var tmplTotCount = false;
				var tmplRowControl = false;
				var tmplNodeControl = false;
                
				if(commentEndIndex !=-1){
					var objInfo = Ext.decode(writeGridInfo[j].src.substring(commentStartIndex + 2, commentEndIndex));
					if(objInfo.tmplTypeCls != null)
						tmplTypeCls = objInfo.tmplTypeCls;
					//if(objInfo.tmplCurPageCount != null)
					//	tmplCurPageCount = objInfo.tmplCurPageCount;
					if(objInfo.tmplTotCount != null)
						tmplTotCount = objInfo.tmplTotCount;
					
                    if(objInfo.tmplRowControl != null)
						tmplRowControl = objInfo.tmplRowControl;
                    if(objInfo.tmplNodeControl != null)
						tmplNodeControl = objInfo.tmplNodeControl;

					writeGridInfo[j].src = writeGridInfo[j].src.substring(commentEndIndex, strMainPanel.length);
					
					console.log('시작이구나tmplRowControl:' + tmplRowControl);
					//console.log(tmplTypeCls + ',' + tmplCurPageCount + ',' + tmplTotCount);
					
					// 페이지계산 시작
					/*
					if(tmplTypeCls == 'pageArrow'){
						console.log('pageArrow');
						pageMethod = pageMethod +  
						'    on' + getFirstUpper(writeGridInfo[j].ref) + 'PrevPage:function(){\n';
						if(writeGridInfo[j].res != '' && writeGridInfo[j].ref != ''){
							pageMethod = pageMethod + 
							'        this.on' + getFirstUpper(writeGridInfo[j].res) + 'PrevPage();\n'
						}
						pageMethod = pageMethod +  
						'    },\n';						
						pageMethod = pageMethod +  
						'    on' + getFirstUpper(writeGridInfo[j].ref) + 'NextPage:function(){\n';
						if(writeGridInfo[j].res != '' && writeGridInfo[j].ref != ''){
							pageMethod = pageMethod + 
							'        this.on' + getFirstUpper(writeGridInfo[j].res) + 'NextPage();\n'
						}
						pageMethod = pageMethod +  
						'    },\n';	
						*/
						/*
						if(writeGridInfo[j].res != '' && writeGridInfo[j].ref != ''){
							// 조회처리
							pageMethod = pageMethod + 
								'       {@+id:refToVal_' + writeGridInfo[j].ref + '}\n' + 
								'        var params = {\n' + 
								'            {@+id:valToParam_' + writeGridInfo[j].ref + '}\n' + 
								'        };\n';
							var res = writeGridInfo[j].res;
							pageMethod = pageMethod + 
								'        var me = this;\n' +
								'        this.getViewModel().getStore(\'' + res +'\').previous({\n' +
								'            params:params,\n' +
								'            callback:this.on' + getFirstUpper(res) + 'Callback,\n' +
								'            scope:me\n' +
								'        });\n';
							
						}
						pageMethod = pageMethod + '    },\n';
						pageMethod = pageMethod +  
						'    on' + getFirstUpper(writeGridInfo[j].ref) + 'Next:function(){\n';
						
						if(writeGridInfo[j].res != '' && writeGridInfo[j].ref != ''){
							// 조회처리
							pageMethod = pageMethod + 
								'       {@+id:refToVal_' + writeGridInfo[j].ref + '}\n' + 
								'        var params = {\n' + 
								'            {@+id:valToParam_' + writeGridInfo[j].ref + '}\n' + 
								'        };\n';
							var res = writeGridInfo[j].res;
							pageMethod = pageMethod + 
								'        var me = this;\n' +
								'        this.getViewModel().getStore(\'' + res +'\').next({\n' +
								'            params:params,\n' +
								'            callback:this.on' + getFirstUpper(res) + 'Callback,\n' +
								'            scope:me\n' +
								'        });\n';
						}
						pageMethod = pageMethod + '    },\n';						
						console.log('pageMethod', pageMethod);
						*/
					//}
					// 페이지계산 종료
                    if( tmplTypeCls == 'gridPageArrow' ||
                        tmplTypeCls == 'gridPageArrowEdit'
                    ){
                        strModelMethod = 
                            strModelMethod.replace('{@+tmpl:page_' + writeGridInfo[j].res + 'Arrows}', 
                            writeGridInfo[j].ref + 'Arrows');// 
                    }
                    if( tmplTypeCls == 'imageCard' ||
                        tmplTypeCls == 'imageCardPage'
                    ){
                        strModelMethod = 
                            strModelMethod.replace('{@+tmpl:widget_' + writeGridInfo[j].res + '}', 
                            writeGridInfo[j].ref);
                    }                    
                    /*
					if( tmplTypeCls == 'gridPageArrow' ||
                        tmplTypeCls == 'gridPageArrowEdit'
                    ){
						//if(writeGridInfo[j].itemsCls.length >= 4 && writeGridInfo[j].itemsCls == 'grid'){
                        if(writeGridInfo[j].res != ''){
                            console.log('변경...........');
                            strModelMethod = 
                                strModelMethod.replace('{@+tmpl:page_' + writeGridInfo[j].res + 'Arrows}', 
                                writeGridInfo[j].ref + 'Arrows');// +
                                //'{@+tmpl:page_' + writeGridInfo[j].res + 'Arrows}');
                            ///*
                            // 응답부분
                            ///strModelMethod = 
                            //    strModelMethod.replace('{@+tmpl:res_' + writeGridInfo[j].res + '}', 
                            //    'me.lookupReference(\'' + writeGridInfo[j].ref + '\').initInfo();' +
                            //    '{@+tmpl:res_' + writeGridInfo[j].res + '}');
                            // 요청부분
                            //strModelMethod = 
                            //    strModelMethod.replace('{@+tmpl:req_' + writeGridInfo[j].res + '}', 
                            //    'me.lookupReference(\'' + writeGridInfo[j].ref + 'Arrows\').setParams(params);' + 
                            //    '{@+tmpl:req_' + writeGridInfo[j].res + '}');
                            ///////
                        }
						//}
					} 
                    */               
					// 총카운트
                    /*
					else if(tmplTotCount == true){ 
						console.log('tmplTotCount' + tmplTotCount + "," + writeGridInfo[j].kind);
						//if(writeGridInfo[j].itemsCls.length >= 4 && writeGridInfo[j].itemsCls == 'grid'){
							if(writeGridInfo[j].res != ''){
								console.log('변경...........');
								strModelMethod = 
									strModelMethod.replace('{@+tmpl:res_' + writeGridInfo[j].res + '}', 
									'this.lookupReference(\'[' + writeGridInfo[j].ref + 'TotCount\').setHtml( this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').getProxy().getReader().rawData.data.' + 'me.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').config.proxy.reader.totalProperty' + '\'] 건\');\n            ' + 
									'{@+tmpl:res_' + writeGridInfo[j].res + '}');                                                                                                         
							}
						//}	
					}
                    */
              
                    // 행추가,삭제 포함
                    if(tmplRowControl == true){
 					    console.log('추가메소드...........');
                        strAddMethod = strAddMethod + 
                        '    selectedRecord' + getFirstUpper(writeGridInfo[j].ref) + ':{},\n' + 
                        '    selectedIndex' + getFirstUpper(writeGridInfo[j].ref) + ':-1,\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'Click:function(grid, record, item, index, e){\n' + 
                        '        this.selectedRecord' + getFirstUpper(writeGridInfo[j].ref) + '= record;\n' + 
                        '        this.selectedIndex' + getFirstUpper(writeGridInfo[j].ref) + '= index;\n' + 
                        '    },\n' +                             
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'AddRow:function(){\n' +  
                        '        if(this.seletedIndex' + getFirstUpper(writeGridInfo[j].ref)  + '== undefined || this.seletedIndex' + getFirstUpper(writeGridInfo[j].ref)  + '== -1){\n' + 
                        '            Ext.Msg.alert(\'' + getLboLangItem('오류') + '\',\'' + getLboLangItem('그리드의 행을 먼저 클릭하여 선택하십시오') + '\');\n' +
                        '            retrurn;\n' +  
                        '        }\n' + 
                        '        var data = {\n' + 
                        '            {@+id:blankToField_' + writeGridInfo[j].ref + '}\n' + 
                        '        };\n' +
                        '        this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').add(data);\n' + 
                        '    },\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'InsertRow:function(){\n' +  
                        '        if(this.seletedIndex' + getFirstUpper(writeGridInfo[j].ref)  + '== undefined || this.seletedIndex' + getFirstUpper(writeGridInfo[j].ref)  + '== -1){\n' + 
                        '            Ext.Msg.alert(\'' + getLboLangItem('오류') + '\',\'' + getLboLangItem('그리드의 행을 먼저 클릭하여 선택하십시오') + '\');\n' +
                        '            retrurn;\n' +  
                        '        }\n' + 
                        '        var data = {\n' + 
                        '            {@+id:blankToField_' + writeGridInfo[j].ref + '}\n' + 
                        '        };\n' +
                        '        this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').insert(1+this.selectedIndex' + getFirstUpper(writeGridInfo[j].ref) + ', data);\n' + 
                        '    },\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'CopyRow:function(){\n' +  
                        '        if(this.seletedIndex' + getFirstUpper(writeGridInfo[j].ref)  + '== undefined || this.seletedIndex' + getFirstUpper(writeGridInfo[j].ref)  + '== -1){\n' + 
                        '            Ext.Msg.alert(\'' + getLboLangItem('오류') + '\',\'' + getLboLangItem('그리드의 행을 먼저 클릭하여 선택하십시오') + '\');\n' +
                        '            retrurn;\n' +  
                        '        }\n' + 
                        '        var data = this.selectedRecord' + getFirstUpper(writeGridInfo[j].ref) + '.copy();\n' + 
                        '        this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').add(data);\n' + 
                        '    },\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'DeleteRow:function(){\n' +  
                        '        if(this.seletedIndex' + getFirstUpper(writeGridInfo[j].ref)  + '== undefined || this.seletedIndex' + getFirstUpper(writeGridInfo[j].ref)  + '== -1){\n' + 
                        '            Ext.Msg.alert(\'' + getLboLangItem('오류') + '\',\'' + getLboLangItem('그리드의 행을 먼저 클릭하여 선택하십시오') + '\');\n' +
                        '            retrurn;\n' +  
                        '        }\n' + 
                        '        this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').remove(this.selectedRecord' + getFirstUpper(writeGridInfo[j].ref) +');\n' + 
                        '    },\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'Send:function(){\n' + 
                        '        var tempModify = this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').getModifiedRecords();\n' + 
                        '        var tempNewRecord = this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').getNewRecords();\n' + 
                        '        var tempRemoved = this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').getRemovedRecords();\n' + 
                        '    },';
                    }	
                    if(tmplNodeControl == true){
 					    console.log('추가메소드...........');
                        strAddMethod = strAddMethod + 
                        '    selectedNode' + getFirstUpper(writeGridInfo[j].ref) + ':null,\n' + 
                        '    selectedParentNode' + getFirstUpper(writeGridInfo[j].ref) + ':null,\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'Click:function(tree, record, item, index, e){\n' + 
                        '        this.selectedNode' + getFirstUpper(writeGridInfo[j].ref) + '= record;\n' + 
                        '        this.selectedParentNode' + getFirstUpper(writeGridInfo[j].ref) + '= record.parentNode;\n' + 
                        '    },\n' +                             
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'Append:function(){\n' +  
                        '        if(this.selectedNode' + getFirstUpper(writeGridInfo[j].ref)  + '== null){\n' + 
                        '            Ext.Msg.alert(\'확인\',\'트리를 먼저 클릭하여 선택하십시오\');\n' +
                        '            retrurn;\n' +  
                        '        }\n' + 
                        '        var data = {\n' + 
                        '            {@+id:blankToField_' + writeGridInfo[j].ref + '}\n' + 
                        '        };\n' +
						'        if(this.selectedNode' + getFirstUpper(writeGridInfo[j].ref) + '.data.leaf == true)\n' + 
                        '            this.selectedParentNode' + getFirstUpper(writeGridInfo[j].ref) + '.appendChild(data);\n' + 
						'        else \n' + 
						'            this.selectedNode' + getFirstUpper(writeGridInfo[j].ref) + '.appendChild(data);\n' + 
                        '    },\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'CopyNode:function(){\n' +  
                        '        if(this.selectedNode' + getFirstUpper(writeGridInfo[j].ref)  + '== null){\n' + 
                        '            Ext.Msg.alert(\'' + getLboLangItem('오류') + '\',\'' + getLboLangItem('그리드의 행을 먼저 클릭하여 선택하십시오') + '\');\n' +
                        '            retrurn;\n' +  
                        '        }\n' + 
                        '        var node = this.selectedNode' + getFirstUpper(writeGridInfo[j].ref) + '.copy();\n' + 
                        '        this.selectedParentNode' + getFirstUpper(writeGridInfo[j].ref) + '.appendChild(node.data);\n' + 
                        '    },\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'DeleteNode:function(){\n' +  
                        '        if(this.selectedNode' + getFirstUpper(writeGridInfo[j].ref)  + '== null){\n' + 
                        '            Ext.Msg.alert(\'' + getLboLangItem('오류') + '\',\'' + getLboLangItem('그리드의 행을 먼저 클릭하여 선택하십시오') + '\');\n' +
                        '            retrurn;\n' +  
                        '        }\n' + 
                        '        this.selectedParentNode' + getFirstUpper(writeGridInfo[j].ref) + '.removeChild(this.selectedNode' + getFirstUpper(writeGridInfo[j].ref) +');\n' + 
                        '    },\n' + 
                        '    on' + getFirstUpper(writeGridInfo[j].ref) + 'Send:function(){\n' + 
                        '        var tempModify = this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').getModifiedRecords();\n' + 
                        '        var tempNewRecord = this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').getNewRecords();\n' + 
                        '        var tempRemoved = this.getViewModel().getStore(\'' + writeGridInfo[j].res + '\').getRemovedRecords();\n' + 
						'        console.log(tempModify, tempNewRecord, tempRemoved);\n' + 
                        '    },';
                    }											
				}
			}		
		}
		console.log('...2');


		// 컨틀로러에 스토어 변경변수를 초기화시킴
		for(var i=0; i <writeModelGridInfo.length; i++){
			strModelMethod = strModelMethod.replace('{@+tmpl:res_' + writeModelGridInfo[i].storeName + '}', '');
			strModelMethod = strModelMethod.replace('{@+tmpl:req_' + writeModelGridInfo[i].storeName + '}', '');
			strModelMethod = strModelMethod.replace('{@+tmpl:page_' + writeModelGridInfo[i].storeName + 'Arrows}', '');
			strModelMethod = strModelMethod.replace('{@+tmpl:widget_' + writeModelGridInfo[i].storeName, '');
		}		 
		/*
		for(var i=0; i< this.gridGroupLength; i++){
			var writeGridInfo = this.makeGridToObject(this.lookupReference('tmplMakeStep2Grid' + i))
			for(var j=0; j<writeGridInfo.length; j++){		
				strModelMethod = strModelMethod.replace('{@+tmpl:res_' + writeGridInfo[j].res + '}', '');
			}
		}	
		*/
		console.log('...4');
		// 컨트롤러 최종	
		var strController = ''+ 
			'Ext.define(\'{@+id:appName}.view.{@+id:path}.{@+id:code}Controller\', {\n' + 
			'    extend: \'ExFrm.view.base.ViewController\',\n' + 
			'    alias: \'controller.{@+id:codeLowercase}\',\n' +
			strModelMethod + 
			//pageMethod + '\n' + 
            strAddMethod + 
			'    onCalled:function(params){\n' + 
		    '    },\n' + 
			'    onInit:function(me){\n' +
			'    },\n' + 
			'    onHelp:function(){}\n' +   
			'})\n'; 		
		console.log('...5');
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			async:false, // 비동기
			params:{
				path: lboServerPath +  
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'tmpl' + 
					lboFileSeperator + me.lookupReference('tmplName').getValue().replace('.link','_controller.js'),
				content:strController
			},
			success:function(res){
				var obj = JSON.parse(res.responseText);
				console.log('obj', obj);
				if(obj.success == false) {
					tempAjaxPass = false; //오류로인한 방지
					Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
					return;
				}
				Ext.Msg.alert( getLboLangItem('확인'), getLboLangItem('뷰컨트롤러') +  getLboLangItem('파일을 생성했습니다.'));
			},
			failure:function(res){
				tempAjaxPass = false; //오류로인한 방지
				Ext.Msg.alert( getLboLangItem("오류"), res.responseText.replace(/\'/g,' '));
			}
		});		
		console.log('...6');		
	},
	onSearchTemplate:function(){
		var menucontroller = ExFrm.app.getController('MemberController');     	
 		menucontroller.openPopup('ExFrm.view.screen.ScreenTmpPop',  getLboLangItem('템플릿'), {}, this);
	},
	onSaveProp:function(){
	
	},
	receiveFromPopup:function(params){
		console.log('응답옴:', params);
		this.lookupReference('templateCode').setValue(params.tmpName);
	}
});