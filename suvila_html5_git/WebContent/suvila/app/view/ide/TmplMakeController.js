Ext.define('ExFrm.view.ide.TmplMakeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tmplmake',
    onReset:function(){
        console.log(this.lookupReference('formreg'));
        console.log(this.lookupReference('screenId'));
        this.redirectTo('ScreenShow/' + this.lookupReference('screenId').getValue());
        this.lookupReference('fieldsetreg').up('form').getForm().reset();
    },
    gridObj:{},
    gridInfo:{},
    gridGroup:[],
    gridGroupLength:0,
    gridGroupCount:0,
    gridArray:[],
    gridArrayCount:0,
    onSearchScreen:function(){
    	
    },    
    calledByOther:function(params){
    	this.lookupReference('tmplName').setValue(params.tmplName);
		this.lookupReference('linkContent').setValue(params.strCont);
		this.gridObj = params.gridObj;
		this.gridInfo = params.gridObj.gridInfo;
		this.gridGroup = params.gridObj.gridInfo.gridGroup;
		this.onShowMainGrid(params.gridObj.gridInfo);
    },
	onShowMainGrid:function(gridInfo){ //gridArray
    	console.log('onShowMainGrid');
    	me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp',
			params:{
				serverPath:lboServerPath,
				fileName: lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'part' + 
					lboFileSeperator + gridInfo.kind
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				console.log('obj', obj);
				//models[index].set('src', Ext.encode(obj));
				//console.log(obj.data);
		    	var gridData = {
		    		title:gridInfo.title,
		    		kind:gridInfo.kind,
		    		ref:gridInfo.ref,
		    		prefix:gridInfo.prefix,
		    		columns:gridInfo.columns,
		    		rows:gridInfo.rows,
		    		src:obj,
		    		req:gridInfo.req,
		    		res:gridInfo.res
		    	};
		    	me.lookupReference('tmplMakeMainGrid').getStore().add(gridData);
		    	// items
		    	me.removeGrids();
		    	for(var i=7; i>=0; i--){
		    		console.log('...' + i);
			    	var index = obj.indexOf('{@id:items' + i + '}');
			    	if(index != -1){
			    		me.gridGroupLength = i+1;
			    		break;
			    	}
			    }
			    console.log('그리드 그룹갯수:' + me.gridGroupLength); 
			    for(var i=0; i< Number(me.gridGroupLength); i++){
					var grid = Ext.create('ExFrm.view.ide.TmplMakeGrid',{
	    				title: getLboLangItem('그리드') + ' ' + i,
	    				width:'100%',
	    			    reference:'tmplMakeGrid' + i});			    				    	
			    	me.lookupReference('panelMake').add(grid);		    	
			    }
		    	me.gridArray = me.gridInfo.gridGroup[0].gridArray;
		    	me.gridGroupCount = 0;			    	
			    me.onShowGrid(0);
		    				
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText.replace(/\'/g,' '));
			}
		});
    }, 
	removeGrids:function(){
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeGrid7')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeGrid6')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeGrid5')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeGrid4')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeGrid3')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeGrid2')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeGrid1')); }catch(e){}
		try{this.lookupReference('panelMake').remove(this.lookupReference('tmplMakeGrid0')); }catch(e){}
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
				serverPath:lboServerPath,
				fileName: lboFileSeperator + 'lib' + 
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
		    	var gridData = {
		    		title:me.gridArray[i].title,
		    		kind:me.gridArray[i].kind,
		    		ref:me.gridArray[i].ref,
		    		prefix:me.gridArray[i].prefix,
		    		columns:me.gridArray[i].columns,
		    		rows:me.gridArray[i].rows,
		    		src:obj,
		    		req:me.gridArray[i].req,
		    		res:me.gridArray[i].res
		    	};
		    	me.lookupReference('tmplMakeGrid' + me.gridGroupCount).getStore().add(gridData);
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
				Ext.Msg.alert("오류", res.responseText);
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
    			kind:gridItems[i].get('kind'),
    			ref:gridItems[i].get('ref'),
    			prefix:gridItems[i].get('prefix'),
    			columns:gridItems[i].get('columns'),
    			rows:gridItems[i].get('rows'),
    			src:gridItems[i].get('src'),
    			req:gridItems[i].get('req'),
    			res:gridItems[i].get('res')
    		});
    	}
    	return objProperty;
    },	
	onCreateFiles:function(){
		// 뷰 만들기
		var writeMainGridInfo = this.makeGridToObject(this.lookupReference('tmplMakeMainGrid'))
		console.log('writeMainGridInfo', writeMainGridInfo);
		
		var strMainPanel=writeMainGridInfo[0].src;
		var strLinkItems = '';
		for(var i=0; i < this.gridGroupLength; i++){
			var writeGridInfo = this.makeGridToObject(this.lookupReference('tmplMakeGrid' + i))
			var strItems='';
			if(i!=0){
				strLinkItems = strLinkItems + ',{\n';
			}
			else{
				strLinkItems = strLinkItems + '        {\n';
			}
			
			strLinkItems = strLinkItems + '            gridArray:[\n';
			for(var j=0; j <writeGridInfo.length; j++){
				if(j!=0){
					strItems = strItems + ',';
					strLinkItems = strLinkItems + ',{\n';
				}
				else{
					strLinkItems = strLinkItems + '            {\n';
				}
				strItems = strItems + writeGridInfo[j].src;
				strLinkItems = strLinkItems + 
					
					'                explain:"템플릿설명",\n' +
					'                title:\'' + writeGridInfo[j].title + '\',\n' +
					'                kind:\'' + writeGridInfo[j].kind + '\',\n' +
					'                ref:\'' + writeGridInfo[j].ref + '\',\n' + 
					'                prefix:\'' + writeGridInfo[j].prefix + '\',\n' +
					'                columns:' + writeGridInfo[j].columns + ',\n' +
					'                rows:' + writeGridInfo[j].rows + ',\n' +
					'                src:\'\',\n' +
					'                req:' + writeGridInfo[j].req + ',\n' + 
					'                res:' + writeGridInfo[j].res + '\n' + 
					'            }';				
			}
			strLinkItems = strLinkItems + ']\n' + 
		                                  '        }';
			console.log('변환전:', strMainPanel);
			strMainPanel = strMainPanel.replace('{@id:items' + i + '}', strItems);
		}
		console.log('변환후:', strMainPanel);
		
		// 링크만들기
		var strLink = 
		    '{\n' +
			'    gridInfo:{\n' +
			'        explain:"템플릿설명",\n' +
			'        title:\'' + writeMainGridInfo[0].title + '\',\n' +
			'        kind:\'' + writeMainGridInfo[0].kind + '\',\n' +
			'        ref:\'' + writeMainGridInfo[0].ref + '\',\n' +
			'        prefix:\'' + writeMainGridInfo[0].prefix + '\',\n' +
			'        columns:' + writeMainGridInfo[0].columns + ',\n' +
			'        rows:' + writeMainGridInfo[0].rows + ',\n' +
			'        src:\'\',\n' +
			'        req:' + writeMainGridInfo[0].req + ',\n' + 
			'        res:' + writeMainGridInfo[0].res + ',\n' + 
			'        gridGroup:[\n'+strLinkItems + ']\n' + 
			'    }\n'+
			'}';
		console.log('링크:', strLink);
 		var me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: lboServerPath + 
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
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
					params:{
						path: lboServerPath + 
							lboFileSeperator + 'lib' + 
							lboFileSeperator + 'tmpljs' + 
							lboFileSeperator + me.lookupReference('tmplName').getValue().replace('.link','_view.js'),
						content:strMainPanel
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						Ext.Msg.alert( getLboLangItem('확인'), getLboLangItem('파일을 생성했습니다.'));
						// 두번째 단계로 이동
					    var gController = ExFrm.app.getController('IdeController');
					    console.log('lboApplicationName', applicationName);
		 				gController.setTmplMainStep2Bar(lboApplicationName + '.view.ide.TmplMakeStep2', me.lookupReference('tmplName').getValue());
					},
					failure:function(res){
						Ext.Msg.alert("오류", res.responseText.replace(/\'/g,' '));
					}
				});
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText.replace(/\'/g,' '));
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