Ext.define('ExFrm.controller.IdeController', { 
    extend: 'Ext.app.Controller',
    config:{
	    refs:{
	    	mainSize:'idemain [name=mainSize]',
	    	mainBar: 'idemain tabpanel[name=mainbar]',
	    	mainTemplate:'idemain panel[name=mainTemplate]',
	    	mainContainer:'idemain panel[name=mainLboContainer]',
	    	objectTree :'idemain treepanel[name=structure]',
	    	propertyList :'idemain grid[name=property]',
	    	eventList :'idemain grid[name=event]',
	    	//controllerCodeView:'controllerview exhtmleditor[name=fileCont]',
	    	controllerCodeView:'controllerview panel[name=fileCont]',
	    	viewView:'viewview',
	    	modelView:'modelview',
	    	modelCodeView:'modelcodeview',
            widgetDeployImage:'idemain [name=widgetDeployImage]',
	    	widgetDeployPath:'idemain [name=widgetDeployPath]',
	    	widgetDeployFile:'idemain [name=widgetDeployFile]',
	    	widgetDeployCont:'idemain [name=widgetDeployCont]',
            ideMain:'idemain'
	    }
	},
	init:function(){
		//console.log('init called Wo');
		connectorView = this;
	},	
	selectedViewPanel:{},
	selectedViewModelPanel:{},
	selectedViewControllerPanel:{},
	selectedViewOnlyCodePanel:{},
	selectedViewModelCodePanel:{},
	selectedViewCode:'',
	selectedViewModelCode:'',
	selectedViewControllerCode:'',
	selectedViewOnlyCode:'',
	selectedFileName:'',
	selectedCode:'',
    setTmplMainBar:function(url, menuName, path){
    	var me = this;

    	var mainBar = this.getMainBar();
    	var findTitle = false;
    	var panel;
    	////console.log(mainBar);
  		for(i=0; i < mainBar.getTabBar().items.items.length; i++){
  			////console.log(mainBar.getTabBar(i));
			if(menuName == mainBar.getTabBar(i).items.items[i].title){
				mainBar.getLayout().setActiveItem(i);
				panel = mainBar.getLayout().getActiveItem();
				findTitle = true;
				break;
			}
		}  	
    	if(findTitle == false){

			panel = Ext.create(url,{
	    		autoShow:true,
	 		});	
	    	mainBar.add(panel);
	    	mainBar.getLayout().setActiveItem(panel);
    	}
		Ext.Ajax.request(
		{
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + 
				lboServerPath + 
				lboFileSeperator + 'lib'+ 
				lboFileSeperator + 'tmpljs' + 
				lboFileSeperator + menuName,
			callback:function(obj, success, resObj){
		    	var strCont = resObj.responseText;
		    	var params = {
		    		tmplName:menuName,
		    		gridObj:Ext.decode(resObj.responseText),
		    		strCont:strCont
		    	}
			    panel.getController().calledByOther(params);
			
			    var strtDefine = 0;
			    var endDefine = 0;
			}
		});	    	
    	return;		

    },
    readWidgetCode:function(url){//, intStr){
    	var me = this;
    	////console.log('url', url);
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + url,
			callback:function(obj, success, resObj){
				////console.log(arguments);
				////console.log(resObj.responseText);
	    	
		    	////console.log('setMainBar', url, menuName);
		    	//parseTot();
		    	var strCont = resObj.responseText;
		    	//var startIndex = strCont.indexOf('/*')+2;
		    	//var endIndex = strCont.indexOf('*/');
		    	//var intStr = strCont.substring(startIndex-2, endIndex);
		    	/*
		    	var params = {
		    		tmplName:menuName,
		    		gridObj:Ext.decode(resObj.responseText),
		    		strCont:strCont
		    	}
			    panel.getController().calledByOther(params);
			    */
			    //me.getWidgetDeployPath().setValue(url);
				// 이것이 뭘까..
                try{
                    var imageName = url.replace(''+ lboFileSeperator + 'app'+ lboFileSeperator + 'view'+ lboFileSeperator + 'widget'+ lboFileSeperator + 'container'+ lboFileSeperator + '', './lib/tmpljs/widget/img/');
                    imageName = imageName.replace(''+ lboFileSeperator + 'app'+ lboFileSeperator + 'view'+ lboFileSeperator + 'widget'+ lboFileSeperator + '', './lib/tmpljs/widget/img/');
                    imageName = imageName.replace(''+ lboFileSeperator + 'app'+ lboFileSeperator + 'view'+ lboFileSeperator + 'widget'+ lboFileSeperator + '', './lib/tmpljs/widget/img/');
                    imageName = imageName.replace(''+ lboFileSeperator + 'lib'+ lboFileSeperator + 'tmpljs'+ lboFileSeperator + 'groupwidget'+ lboFileSeperator + '', './lib/tmpljs/groupwidget/img/')
                    imageName = imageName.replace(lboFileSeperator, '/');
                    imageName = imageName.replace('.js','.png');
                    console.log(imageName);
                    me.getWidgetDeployImage().setSrc(imageName);
                }catch(e){}
			    me.getWidgetDeployFile().setValue(url);
			    me.getWidgetDeployCont().setValue(strCont.trim());
			    //me.getWidgetDeployIntStr().setValue(intStr);
			}
		});
    },
    // 템플릿생성
    setTmplMainStep2Bar:function(url, menuName, path){
    	////console.log('setTmplMainStep2Bar:::::::::::::::', menuName, path);
    	// 테스트용
    	url = 'ExFrm.view.ide.TmplMakeStep2';
    	var me = this;
    	var mainBar = this.getMainBar();
    	var findTitle = false;
    	var panel;
    	////console.log(mainBar);
  		for(i=0; i < mainBar.getTabBar().items.items.length; i++){
  			////console.log(mainBar.getTabBar(i));
			if(menuName == mainBar.getTabBar(i).items.items[i].title){
				mainBar.getLayout().setActiveItem(i);
				panel = mainBar.getLayout().getActiveItem();
				findTitle = true;
				break;
			}
		}  	
    	if(findTitle == false){

			panel = Ext.create(url,{
	    		autoShow:true,
	 		});	
	    	mainBar.add(panel);
	    	mainBar.getLayout().setActiveItem(panel);
    	}
    	////console.log('menuName:' + menuName);
    	
    	if(menuName.length > 5 && menuName.substring(menuName.length-5, menuName.length)!='.link'){
			if(getLboLang() == 'english')
    			Ext.Msg.alert('error','Template filename extension is .link');
			else 
				Ext.Msg.alert('확인','템플릿파일은 확장자가 .link 입니다.');
    		return;
    	}
    	
    	if(menuName != 'undefined' && menuName != null && menuName != '' &&
    		menuName.length > 5 && menuName.substring(menuName.length-5, menuName.length)=='.link'){
			Ext.Ajax.request({
				type:'ajax',
				url:'./jsp/fileRead.jsp?path=' + lboServerPath + 
					lboFileSeperator + 'lib'+ 
					lboFileSeperator + 'tmpljs'+ 
					lboFileSeperator + 'link'+ 
					lboFileSeperator + menuName,
				callback:function(obj, success, resObj){
			    	var strCont = resObj.responseText;
			    	var params = {
			    		tmplName:menuName,
			    		gridObj:Ext.decode(resObj.responseText),
			    		strCont:strCont
			    	}
				    panel.getController().calledByOther(params);
				
				    var strtDefine = 0;
				    var endDefine = 0;
				}
			});	
		}    	
    	return;		
    },
    setMainBarWindow:function(){
		////console.log(mainBar);
		var mainBar = this.getMainBar();
		var panel= Ext.create('Ext.panel.Panel',{
    		autoShow:true,
    		title:'윈도우',
    		
 		});	
    	mainBar.add(panel);
    	mainBar.getLayout().setActiveItem(panel);
    	
    	var win = Ext.create('Ext.window.Window',{
    		width:400,
    		height:200,
    		title:'윈도우',
    		//renderTo:panel.el,
    		closable:true });
    	//mainBar.add(win);
    	//win.show();
    	//win.renderTo(panel.el);
    	//win.center();
    	win.render(panel.el);
    	win.show();
    	win.setX(panel.getX());
    	win.setY(panel.getY());
    	win.addListener('move',function(comp, x, y){
	    	win.setX(panel.getX());
	    	win.setY(panel.getY());
    	});
    	/*

    	*/
    },
    // 읽어오기
    url:'',
    menuName:'',
    path:'',
    setMainBar:function(url, menuName, path){
    	var me = this;
    	this.url = url;
    	this.menuName = menuName;
    	this.path = path;
    	console.log('path::::', url, menuName, path);
		console.log('ajax folderName', folderName);
		
		console.log('setTmplMainBar>>>>>>>', url, menuName, path);
		// 뷰가 아닐경우 일반코드로 처리
		var dotIndex = path.lastIndexOf('.');
		var fileExtName = path.substring(dotIndex + 1, path.length);

		if(	fileExtName.toLowerCase() == 'png' || 
			fileExtName.toLowerCase() == 'jpg' || 
			fileExtName.toLowerCase() == 'jpeg' ||
			fileExtName.toLowerCase() == 'gif' ||
			fileExtName.toLowerCase() == 'tiff' ||
			fileExtName.toLowerCase() == 'tif' ||
			fileExtName.toLowerCase() == 'bmp') {
			var divIndex = path.indexOf(lboFileSeperator);
			var folderName = path.substring(0,divIndex);
			var fileName = path.substring(divIndex + 1, path.length);

			lboFolderName = folderName;
			lboFileName = fileName;
			var params = {
				fileName: fileName,
				folderName: folderName
			};   
			var imageViewer = Ext.create('ExFrm.view.ide.ImageViewer',{
				autoShow:true,
				title:getLboLangItem('이미지뷰어'),
				name:'panelCode'
			});
			console.log(params);
			var mainBar = me.getMainBar();
			mainBar.add(imageViewer);	
			imageViewer.getController().calledByOther(params);
			return;
		}


		if(	url.indexOf('ExFrm.view') == -1 || 
			url.indexOf('ExFrm.view.widget') != -1 ||
			url.indexOf('ExFrm.view.base') != -1){
			var divIndex = path.indexOf(lboFileSeperator);
			var folderName = path.substring(0,divIndex);
			var fileName = path.substring(divIndex + 1, path.length);
			
	
			lboFolderName = folderName;
			lboFileName = fileName;
			
			console.log('lboFolderName', lboFolderName);
			console.log('lboFileName', lboFileName);
			
			var params = {
				fileName: fileName,
				folderName: folderName
			};   
			//일반 화면을 보여줌.
			var tempUrl = '';
			if(lboFileType=='app'){
				tempUrl = './jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app'+ 
					//lboFileSeperator + 'view'+ 
					lboFileSeperator + folderName + 
					lboFileSeperator + fileName + '.js';
			}
			else if(lboFileType=='server'){
				tempUrl = './jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'extra'+ 
					//lboFileSeperator + 'view'+ 
					lboFileSeperator + folderName + 
					lboFileSeperator + fileName;
			}
			else if(lboFileType=='application'){
				tempUrl = './jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					lboFileSeperator + fileName;
			}
			console.log('경로>>>>>>', tempUrl);
			Ext.Ajax.request({
				type:'ajax',
				url:tempUrl,
				callback:function(obj, success, resObj){
					console.log('응답',success, resObj);
					if(success == true){
						
						var strCodeCont = resObj.responseText;
						var panelCode = Ext.create('ExFrm.view.ide.NormalCode',{
							autoShow:true,
							title:getLboLangItem('코드'),
							name:'panelCode'
						});
						
						var mainBar = me.getMainBar();
			 			mainBar.add(panelCode);	
						me.selectedCode = strCodeCont.trim(); 
						panelCode.down('[name=fileCont]').setExValue(strCodeCont.trim());
						panelCode.getController().calledByOther(params);
					}
				}
			});
			return;
		}		

    	if(path.length > 10 &&
    		path.substring(path.length-10, path.length) ==  'Controller'){
    		path = path.substring(0, path.length-10);
    	}
    	else if(path.length > 8 &&
    		path.substring(path.length -5, path.length) == 'Model'){
  			path = path.substring(0, path.length-5);
    	}
    	else {
    		
    	}

    	var divIndex = path.indexOf(lboFileSeperator);
    	var folderName = path.substring(0,divIndex);
    	var fileName = path.substring(divIndex + 1, path.length);
    	
 
    	lboFolderName = folderName;
    	lboFileName = fileName;
 		var params = {
 			fileName: fileName,
 			folderName: folderName
 		};    	
		

		// 뷰컨트롤러 호출
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app'+ 
				//lboFileSeperator + 'view'+ 
				lboFileSeperator + folderName + 
				lboFileSeperator + '' + fileName + 'Controller.js',
			async:false,						
			callback:function(obj, success, resObj){
				if(success == true){
					var controllerViewCont = resObj.responseText.trim();
					var strContLen = controllerViewCont.length;
					var strtDefine = 0;
					var endDefine = 0;
	
					var mainBar = me.getMainBar();
					// 윈도우, 패널등을 모두 보여주기 위해 중간에 패널을 둠.
					var panelControllerView = Ext.create('ExFrm.view.ide.ControllerView',{
						autoShow:true,
						title: getLboLangItem('뷰컨트롤러')
					});
					// 글로벌 컨트롤러에 등록
					me.selectedViewControllerPanel = panelControllerView;	
					me.selectedViewControllerCode = controllerViewCont;	 		
					mainBar.add(panelControllerView);
					panelControllerView.getController().calledByOther(params);	
					panelControllerView.down('[reference=fileCont]').setExValue(controllerViewCont);//controllerViewContSub);					
					panelControllerView.down('[name=new]').setVisible(false);
					panelControllerView.down('[name=save]').setVisible(true);
				}
				else {
					var mainBar = me.getMainBar();
					// 윈도우, 패널등을 모두 보여주기 위해 중간에 패널을 둠.
					var panelControllerView = Ext.create('ExFrm.view.ide.ControllerView',{
						autoShow:true,
						title: getLboLangItem('뷰컨트롤러')
					});
					// 글로벌 컨트롤러에 등록
					me.selectedViewControllerPanel = panelControllerView;	
					me.selectedViewControllerCode = '';	 		
					mainBar.add(panelControllerView);
					panelControllerView.getController().calledByOther(params);	
					panelControllerView.down('[name=new]').setVisible(true);
					panelControllerView.down('[name=save]').setVisible(false);										
				}
			}
		});

		// 모델호출
    	Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app'+ 
				//lboFileSeperator + 'view'+ 
				lboFileSeperator + folderName + 
				lboFileSeperator + fileName + 'Model.js',
			async:false,	
			callback:function(obj, success, resObj){
				////console.log('응답',success);
				if(success == true){
					var strModelCont = resObj.responseText;
					var panelModelView = Ext.create('ExFrm.view.ide.ModelCodeView',{
			    		autoShow:true,
			    		title: getLboLangItem('뷰모델'),
			    		name:'panelModelView'
			 		});
			 		me.selectedViewModelPanel = panelModelView;
			 		me.selectedViewModelCode = strModelCont.trim(); 
			 		panelModelView.down('[name=fileCont]').setExValue(strModelCont.trim());
			 		panelModelView.getController().calledByOther(params);
			 		var mainBar = me.getMainBar();
			 		//mainBar.add(panelModelView);		
					setTimeout(function(){			
						mainBar.insert(0, panelModelView);				
						panelModelView.down('[name=new]').setVisible(false);
						panelModelView.down('[name=save]').setVisible(true);	
						parsingModelStores(strModelCont);
						console.log('lboModelIdCount', lboModelIdCount);
					}, 500);
				}
				else {
					var strModelCont = resObj.responseText;
					var panelModelView = Ext.create('ExFrm.view.ide.ModelCodeView',{
			    		autoShow:true,
			    		title: getLboLangItem('뷰모델'),
			    		name:'panelModelView'
			 		});
			 		me.selectedViewModelPanel = panelModelView;
			 		me.selectedViewModelCode = '';//strModelCont.trim(); 
			 		panelModelView.down('[name=fileCont]').setValue('');//strModelCont.trim());
			 		panelModelView.getController().calledByOther(params);
			 		var mainBar = me.getMainBar();
			 		//mainBar.add(panelModelView);
					setTimeout(function(){
						mainBar.insert(0, panelModelView);										
						panelModelView.down('[name=new]').setVisible(true);
						panelModelView.down('[name=save]').setVisible(false);	
					}, 500);											
					/*
					var panelModelView = Ext.create('ExFrm.view.ide.ModelView',{
			    		autoShow:true,
			    		title:'뷰모델',
			    		name:'panelModelView'
			 		});
			 		me.selectedViewModelPanel = panelModelView;
			 		me.selectedViewModelCode = '';//strModelCont; 
			 		panelModelView.getController().calledByOther(params);
			 		var mainBar = me.getMainBar();
			 		mainBar.add(panelModelView);					
					
					panelModelView.down('[name=new]').setVisible(true);
					panelModelView.down('[name=save]').setVisible(false);
					*/
				}
			}
		});

		// 뷰호출시작
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app'+ 
				//lboFileSeperator + 'view'+ 
				lboFileSeperator + folderName + 
				lboFileSeperator + fileName + '.js',
			async:false,								
			callback:function(obj, success, resObj){
				var strCont = resObj.responseText;
				var strContLen = strCont.length;
				var strtDefine = 0;
				var endDefine = 0;
				for (var i = 0; i < strContLen -10; i++)
				{
					if (strCont.substring(i, i+10) == "Ext.define")
					{
						for(var j=i+1; j< strContLen; j++)
						{
							if(strCont.substring(j,j+1) == '\'')
							{
								strtDefine = j;
								i = j;
								break;
							}
						}
						for (var j = i + 1; j < strContLen; j++)
						{
							if (strCont.substring(j,j+1) == '\'')
							{
								endDefine = j;
								i = j;
								break;
							}
						}
					}
				}
				lboStrDefine = strCont.substring(strtDefine, endDefine + 1);
				lboIdCount = 0;
				lboItem[lboIdCount] = new LboItem();
				//lboItem[lboIdCount].init(); 중요...
				lboItem[lboIdCount].lboId = lboIdCount;
				lboItem[lboIdCount].strCont = strCont;
				lboItem[lboIdCount].name = lboStrDefine;
				lboIdCount++;
				parsingStr(lboItem[0].strCont, 0);    	
				var objCode = getExtObject(lboItem[0]);
				var obj = {};
				
				// 콘솔모드는 try catch를 잡지 않는다. 
				if(exCommon.getDebugMode() =='console'){
					obj = Ext.decode(objCode);
				}
				else {
					try{ 
						obj = Ext.decode(objCode);
					}catch(e){
						console.log('decode오류',objCode);
						
						if(getLboLang() == 'english')
							Ext.Msg.alert('error','Error occurr when transform view code to object ' + e);
						else 
							Ext.Msg.alert('오류','객체변환 중 오류가 있습니다.' + e);

						me.setMainBarViewCode();
						return;
					}
				}
				
				lboViewModelExist = true;
				if(obj.viewModel == undefined || obj.viewModel == null){
					lboViewModelExist  = false;
				}
				
				
				lboItem[0].name = lboItem[0].name.replace('\'','');
				lboItem[0].name = lboItem[0].name.replace('\'','');
				//console.log('obj', obj, lboItem[0].name);
				var panelRoot = {};
				var controllerName = '';
				// 콘솔모드는 try catch를 잡지 않는다. 
				if(exCommon.getDebugMode() =='console'){
						exCommon.initReady = false;
						panelRoot = Ext.create(lboItem[0].name, obj);                                    
				}
				else {
					try{
						//console.log(objCode);
						//console.log(obj);
						//requireFunc(lboItem[0].name);
						//console.log('1');
						//panelRoot = Ext.create(lboItem[0].name, obj);
						//console.log(lboItem[0].name);
						// 이벤트를 방지하기 위함(초기이벤트 제외)
						
						//console.log('obj', obj);
						exCommon.initReady = false;
						console.log("..............................0!!");
						controllerName = obj.controller;
						delete obj['controller'];
						panelRoot = Ext.create(lboItem[0].name, obj);
						console.log("..............................00!!");
						//console.log('2');
					}
					catch(e){
						
						// 오류잡아내기. 
						console.log('>>>>', e);
						var errMsg = '';
						/*
						console.log('me.selectedViewModelCode',me.selectedViewModelCode);
						
						if(me.selectedViewModelCode.trim() != ''){
							try{
								
								Ext.decode(me.selectedViewModelCode)
							}
							catch(e){
								errMsg += '뷰모델이 객체형식이 아님<br>';
							}
						}

						console.log('me.selectedViewControllerCode',me.selectedViewControllerCode);
						if(me.selectedViewControllerCode.trim() != ''){
							try{
								Ext.decode(me.selectedViewControllerCode)
								console.log('controller정상');
							}
							catch(e){
								errMsg += '뷰컨트롤러가 객체형식이 아님<br>';
							}
						}
						console.log('me.selectedViewCode',strCont);
						try{
							Ext.decode(strCont)
						}
						catch(e){
							errMsg += '뷰가 객체형식이 아님<br>';
						}
						*/       
						if(getLboLang() == 'english')                            
							Ext.Msg.alert('error','Can\'t show the view as this error!! - <br>' + errMsg + '<br>' + e);
						else 
							Ext.Msg.alert('변환오류','다음과 같은 이유로 화면을 구성할 수 없습니다.<br>' + errMsg + '<br>' + e);

						me.setMainBarViewCode();
						return;
						// 오류잡아내기 종료
					}
				}
				console.log("..............................1!!");
				me.selectedViewPanel = panelRoot;
				me.selectedViewCode = strCont;
				lboItem[0].extId = panelRoot.id;
				//console.log('panel', panelRoot, panelRoot.id);
				var mainBar = me.getMainBar();
				// 윈도우, 패널등을 모두 보여주기 위해 중간에 패널을 둠.
				
				// 로그인은 회사의 역할에 맞게 처리한다. 
				// 로그인 처리.
				// 공통코드 로딩. 
				Ext.getStore('CommonStore').getProxy().url=lboUserJsonPath + '/common/common.json';
				Ext.getStore('CommonStore').load({
					callback:function(){
						console.log('arguments load', arguments);
						//mainBar.add(panelRoot);
						
						var panel= Ext.create('Ext.panel.Panel',{
							autoShow:true,
							name:'mainLboContainer',
							//scrollable:true,
							//width:lboScreenWidth,
							layout:'fit',
							height:lboScreenHeight,
							width:'100%',
							title: getLboLangItem('화면'),                                            
							items:[{
								name:'renderArea' 
							}],
							dockedItems: {
								xtype: 'toolbar',
								dock: 'top',
								style:'background-color:orange',
								items:[
								{
									xtype:'button',
									text:getLboLangItem('저장'),
									handler:function(){
										var strContent = getStringAll();
										//console.log('뷰코드:' + strContent);	
										Ext.Ajax.request({
											type:'ajax',
											url:'./jsp/fileWrite.jsp',
											params:{
												path: lboServerPath + lboUserServerPath + 
													lboFileSeperator + 'app'+ 
													//lboFileSeperator + 'view'+ 
													lboFileSeperator + lboFolderName + 
													lboFileSeperator + lboFileName + '.js',
												content:strContent
											},
											success:function(res){
												var obj = JSON.parse(res.responseText);
												console.log('obj', obj);
												if(obj.success == false) {
													Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
													return;
												}
												if(getLboLang() == 'english')
													Ext.Msg.alert("info", 'Saved !!');
												else 
													Ext.Msg.alert("확인", '저장하였습니다.');
												
												// History저장시작
												exCommon.saveHistory(
													lboServerPath + 
														lboFileSeperator + 'lib'+ 
														lboFileSeperator + 'tmpljs'+ 
														lboFileSeperator + 'history'+ 
														lboFileSeperator + 'app'+ 
														//lboFileSeperator + 'view'+ 
														lboFileSeperator + lboFolderName  + 
														lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime(), 
													strContent); 
											},
											failure:function(res){

												if(getLboLang() == 'english')
													Ext.Msg.alert("error", res.responseText);
												else 
													Ext.Msg.alert("오류", res.responseText);
											}
										});		    				
									}
								},{
									xtype:'button',
									text: getLboLangItem('코드 보기'),
									handler:function(){
										var meBtn = this;
										if(getLboLang() == 'english'){
											Ext.Msg.confirm('Confirm', 'It will not be saved if you don\'t click the Save button!', function(btn){
												if(btn == 'yes'){
													ExFrm.app.getController('IdeController').setMainBarViewCode();
													meBtn.up('[name=mainbar]').remove(meBtn.up('[name=mainLboContainer]'),true);
												}
											})
										}
										else {
											Ext.Msg.confirm('Confirm', '저장하지 않은 정보는 삭제될 수 있습니다!', function(btn){
												if(btn == 'yes'){
													ExFrm.app.getController('IdeController').setMainBarViewCode();
													meBtn.up('[name=mainbar]').remove(meBtn.up('[name=mainLboContainer]'),true);
												}
											})
										}
									}
								},{
									xtype:'button',
									text: getLboLangItem('파라미터 관리'),
									receiveParams:{},
									openReceiveMethod:function(params, openPanel){
										console.log('====>openReceiveMethod', params);
										openPanel.receiveParams = params;
									},                                                
									handler:function(){
										var panel = Ext.create('ExFrm.view.ide.ParamView');
										panel.show();  
										panel.getController().calledByOther(this, this.openReceiveMethod, this.receiveParams );
									}
								},{
									xtype:'tbspacer',
									flex:1  
								}]
							}
						});	
						mainBar.add(panel);
						console.log("..............................2!!");
						mainBar.getLayout().setActiveItem(panel);
						console.log("..............................3!!");
						if(panelRoot.height == null || panelRoot.height == 'undefined'){
							try{
								panelRoot.setHeight(lboScreenHeight);
							}catch(e){}
						}
						if(panelRoot.width == null || panelRoot.width == 'undefined'){
							try{
								panelRoot.setWidth(lboScreenWidth);
							}catch(e){}
						}
						
						//panel.add(panelRoot);
						// 콘솔모드는 try catch를 잡지 않는다. 
						if(exCommon.getDebugMode() =='console'){
								//panelRoot.render(panel.el);
							console.log('확인', panel.down('[name=renderArea]'));
							//debugger;           panel.down('[name=renderArea]')
							//panelRoot.render(panel.down('[name=renderArea]').el);           
							panel.down('[name=renderArea]').add(panelRoot);                             
						}
						else {
							try{
								//panelRoot.render(panel.el);
								console.log('확인', panel.down('[name=renderArea]'));
								//debugger;           panel.down('[name=renderArea]')
								//panelRoot.render(panel.down('[name=renderArea]').el);
								panel.down('[name=renderArea]').add(panelRoot);  
								
							}catch(e){
								if(getLboLang() == 'english')
									Ext.Msg.alert('Error','I Can\'t show this View as like this. ' + e);
								else 
									Ext.Msg.alert('변환오류','다음과 같은 이유로 화면을 구성할 수 없습니다.' + e);
								me.setMainBarViewCode();
								return;                                           
							}
						}
						panelRoot.show();
						
						for (var i=1; i < lboIdCount; i++)
						{
							//for(ii=0; ii< lboIdCount; ii++){
							//   console.log('bbbbbbbbbbbbb lboIdCount' + lboIdCount + ":" + ii, lboItem[ii].strCont); 
							//}
							//console.log('aaaaaaaaaaaaaa lboIdCount' + lboIdCount + ":" + i, lboItem[i].strCont);
							//////try{
								parsingStr(lboItem[i].strCont, i);
								//console.log(i, lboItem[i], lboItem[i].parentLboId);
								var objCodeTemp = getExtObject(lboItem[i]);
								var objTemp = Ext.decode(objCodeTemp);
								lboItem[i].parentExtId = lboItem[lboItem[i].parentLboId].extId;
								//console.log('찾기:' + lboItem[i].parentLboId + ',' + lboItem[i].parentExtId);
								
								// ViewModel Bind 여부 체크 
								console.log('lboViewModelExist',lboViewModelExist);
								if(lboViewModelExist == false){
									if(objTemp.bind != undefined && objTemp.bind != null){
										objTemp.bind = null;
										console.log('objTemp.bind',objTemp.bind);
									}
								}
								
								var extObj = Ext.getCmp(lboItem[i].parentExtId).add(objTemp);
								lboItem[i].extId = extObj.id;
							//////}
							/*
							catch(e){
								console.log('eeeeeee',e);
								
								if(getLboLang() == 'english')
									alert('Error','I Can\'t be show this View as this reason!! - ' + e);
								else 
									alert('변환오류','다음과 같은 이유로 화면을 구성할 수 없습니다! - ' + e);
								
								me.setMainBarViewCode();
								return;
							}
							*/
						}	
						me.showTreeItems();
						exCommon.initReady = true;
						console.log("..............................!!", controllerName);
						
						if(controllerName != ''){
							//Ext.apply(panelRoot, { controller: controllerName});
							try {
								var a = Ext.create(lboItem[0].name + 'Controller');
								
								panelRoot.getController().init(panelRoot);
								panelRoot.getController().afterRender(panelRoot);
	
							}
							catch(e){
								console.log(e);
							}	
						}						    	
					},
					scope:me,
				});							
			}
		}); 							 		
    },
    setMainBarViewIde:function(){			
    	var me = this;
		me.getObjectTree().setDisabled(false);
    	var url = this.url;
    	var menuName = this.menuName;
    	var path = this.path;
 		var params = {
 			fileName: lboFileName,
 			folderName: lboFolderName
 		}; 	    	
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app'+ 
				//lboFileSeperator + 'view'+ 
				lboFileSeperator + lboFolderName + 
				lboFileSeperator + lboFileName + '.js',
			callback:function(obj, success, resObj){
				//console.log('99999',arguments);
				//console.log('99998',resObj.responseText);
		    	//console.log('99997setMainBar', url, menuName);
		    	var strCont = resObj.responseText;
			    var strContLen = strCont.length;
			    var strtDefine = 0;
			    var endDefine = 0;
			    for (var i = 0; i < strContLen -10; i++)
			    {
			        if (strCont.substring(i, i+10) == "Ext.define")
			        {
			            for(var j=i+1; j< strContLen; j++)
			            {
			                if(strCont.substring(j,j+1) == '\'')
			                {
			                    strtDefine = j;
			                    i = j;
			                    break;
			                }
			            }
			            for (var j = i + 1; j < strContLen; j++)
			            {
			                if (strCont.substring(j,j+1) == '\'')
			                {
			                    endDefine = j;
			                    i = j;
			                    break;
			                }
			            }
			        }
			    }
				lboStrDefine = strCont.substring(strtDefine, endDefine + 1);
			    lboIdCount = 0;
			    lboItem[lboIdCount] = new LboItem();
			    lboItem[lboIdCount].init();
			    lboItem[lboIdCount].lboId = lboIdCount;
			    lboItem[lboIdCount].strCont = strCont;
			    lboItem[lboIdCount].name = lboStrDefine;
			    lboIdCount++;
			    parsingStr(lboItem[0].strCont, 0);    	
				var objCode = getExtObject(lboItem[0]);
				var obj = {};
                // 콘솔모드는 try catch를 잡지 않는다. 
                if(exCommon.getDebugMode() =='console'){
                    obj = Ext.decode(objCode);
                }
                else {
                    try{ 
                        obj = Ext.decode(objCode);
                    }catch(e){
                        consoel.log('decode오류');
						if(getLboLang() == 'english')
                        	Ext.Msg.alert('Error','There is an error when I change the View Code to object!! - ' + e);
						else 
							Ext.Msg.alert('오류','객체변환 중 오류가 있습니다!!' + e);
                        me.setMainBarViewCode();
                        return;
                    }
                }
				lboItem[0].name = lboItem[0].name.replace('\'','');
				lboItem[0].name = lboItem[0].name.replace('\'','');
				//console.log('obj', obj, lboItem[0].name);
				var panelRoot = {};
				//풀어
                // 콘솔모드는 try catch를 잡지 않는다. 
                if(exCommon.getDebugMode() =='console'){        
                    exCommon.initReady = false;
                    console.log('>>>>>>>>>>>>>>>>>>>', lboItem[0].name);
                    panelRoot = Ext.create(lboItem[0].name, obj);                    
                }
                else {        
                    try{
                        //console.log('=========================');
                        //console.log(lboItem[0].name);
                        //console.log(obj);
                        //console.log('=========================');
                        exCommon.initReady = false;
                        console.log('>>>>>>>>>>>>>>>>>>>', lboItem[0].name);
                        panelRoot = Ext.create(lboItem[0].name, obj);
                        //Ext.apply(panelRoot, obj);
                    }
                    catch(e){
                        console.log(e);
						if(getLboLang() == 'english')
                        	Ext.Msg.alert('Error','I Can\'t be show this View. Correct the Code and click the file which is in the Project Structure! - ' + e);
						else 
							Ext.Msg.alert('변환오류','다음과 같은 이유로 화면을 구성할 수 없습니다. 코드를 수정하고 왼쪽의 파일을 클릭하여 다시 읽어와야 합니다.' + e);
                        me.setMainBarViewCode();
                        return;
                    }	
                }			
				
				me.selectedViewPanel = panelRoot;
				me.selectedViewCode = strCont;
				lboItem[0].extId = panelRoot.id;
				//console.log('panel', panelRoot, panelRoot.id);
				var mainBar = me.getMainBar();
				// 윈도우, 패널등을 모두 보여주기 위해 중간에 패널을 둠.
				var panel= Ext.create('Ext.panel.Panel',{
		    		autoShow:true,
		    		layout:'fit',
		    		name:'mainLboContainer',
					title: getLboLangItem('화면'),
                    items:[{
                        name:'renderArea' 
                    }],                    
		    		dockedItems: {
                        xtype: 'toolbar',
                        dock: 'top',
                        style:'background-color:orange',
                        items:[
                        {
                            xtype:'button',
							text:getLboLangItem('저장'),
                            handler:function(){
                                var strContent = getStringAll();
                                //console.log('ㅁㅁㅁㅁㅁㅁ 뷰코드:' + strContent);	
                                Ext.Ajax.request({
                                    type:'ajax',
                                    url:'./jsp/fileWrite.jsp',
                                    params:{
                                        path: lboServerPath + lboUserServerPath + 
											lboFileSeperator + 'app'+ 
											//lboFileSeperator + 'view'+ 
											lboFileSeperator + lboFolderName + 
											lboFileSeperator + lboFileName + '.js',
                                        content:strContent
                                    },
                                    success:function(res){
										var obj = JSON.parse(res.responseText);
										console.log('obj', obj);
										if(obj.success == false) {
											Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
											return;
										}
										if(getLboLang() == 'english')
                                        	Ext.Msg.alert("Info", 'Saved.');
										else 
											Ext.Msg.alert("확인", '저장하였습니다.');
                                        // History저장시작
                                        exCommon.saveHistory(
                                            lboServerPath +
											lboFileSeperator + 'lib'+ 
											lboFileSeperator + 'tmpljs'+ 
											lboFileSeperator + 'history'+ 
											lboFileSeperator + 'app'+ 
											//lboFileSeperator + 'view'+ 
											lboFileSeperator + lboFolderName + 
											lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime(), 
                                            strContent);                                 
                                    },
                                    failure:function(res){
										if(getLboLang() == 'english')
                                        	Ext.Msg.alert("Error", res.responseText);
										else 
											Ext.Msg.alert("오류", res.responseText);
                                    }
                                });		    				
                            }
                        },{
                            xtype:'button',
							text:getLboLangItem('코드 보기'),
                            handler:function(){
                                var meBtn = this;
								if(getLboLang() == 'english'){
									Ext.Msg.confirm('Confirm', 'Codes will not be Saved if you don\'t click the Save button', function(btn){
										if(btn == 'yes'){
											ExFrm.app.getController('IdeController').setMainBarViewCode();
											meBtn.up('[name=mainbar]').remove(meBtn.up('[name=mainLboContainer]'),true);
										}
									})
								}
								else {
									Ext.Msg.confirm('확인', '저장하지 않은 정보는 삭제될 수 있습니다', function(btn){
										if(btn == 'yes'){
											ExFrm.app.getController('IdeController').setMainBarViewCode();
											meBtn.up('[name=mainbar]').remove(meBtn.up('[name=mainLboContainer]'),true);
										}
									})
								} 

                            }
                        },{
                            xtype:'button',
							text: getLboLangItem('파라미터'),
                            receiveParams:{},
                            openReceiveMethod:function(params, openPanel){
                                console.log('====>openReceiveMethod', params);
                                openPanel.receiveParams = params;
                            },                                                
                            handler:function(){
                                var panel = Ext.create('ExFrm.view.ide.ParamView');
                                panel.show();  
                                panel.getController().calledByOther(this, this.openReceiveMethod, this.receiveParams );
                            }
                        },{
                            xtype:'tbspacer',
                            flex:1  
                        }]
                    }
		 		});	
		 		
		 		//mainBar.add(panelRoot);
		 	
		    	mainBar.add(panel); // 수정사항
		    	mainBar.getLayout().setActiveItem(panel);
		    	if(panelRoot.height == null || panelRoot.height == 'undefined'){
			    	panelRoot.setHeight(lboScreenHeight);
			    }
			    if(panelRoot.width == null || panelRoot.width == 'undefined'){
			    	panelRoot.setWidth(lboScreenWidth);
			    }		    	
		    	//panelRoot.render(panel.el);
                // 콘솔모드는 try catch를 잡지 않는다. 
                if(exCommon.getDebugMode() =='console'){  
                    //panelRoot.render(panel.down('[name=renderArea]').el);    
					panel.down('[name=renderArea]').add(panelRoot);
                }
                else {            
                    try{
                        //panelRoot.render(panel.el);
                        //panelRoot.render(panel.down('[name=renderArea]').el);
						panel.down('[name=renderArea]').add(panelRoot);
                    }catch(e){
                        try{
                            mainBar.remove(panel); // 수정사항
                        }
                        catch(e){
                            console.log(e);
                        }
						if(getLboLang() == 'english')
							Ext.Msg.alert('Error','I can\'t show this view as this error - ' + e);
						else 
                        	Ext.Msg.alert('변환오류','다음과 같은 이유로 화면을 구성할 수 없습니다.' + e);
                        me.setMainBarViewCode();
                        return;                                           
                    }
                }
                panelRoot.show();
				/*
		    	panelRoot.setX(panel.getX());
		    	panelRoot.setY(panel.getY());
		    	panelRoot.addListener('move',function(comp, x, y){
			    	panelRoot.setX(panel.getX());
			    	panelRoot.setY(panel.getY());
		    	});
		    	*/
				/*
		    	panelRoot.add({
	    			xtype:'button',
	    			text:'테스트',
	    			handler:function(){
	    				//panelRoot.destroy();
				    	//panelRoot.getController().destroy();
				    	//panelRoot.setController(null);
				    	////console.log('>>>', panelRoot.getController());	    				
				    	//Ext.undefine('Ext.view.test.Test005');
				    	//Ext.undefine('Ext.view.test.Test005Model');
				    	//Ext.undefine('Ext.view.test.Test005Controller');
				    	
				    	////console.log('bbb', Ext.define('Ext.view.test.Test005Controller',{}));	   
						//panelRoot.getController().initConfig({    extend: 'Ext.app.ViewController',    alias: 'controller.test005',    onSearchItems:function(params){alert('hi122');}});
						//console.log('::::::::',panelRoot.getController());

						Ext.Loader.loadScript({
							url:'.//app//view//test//Test005Model.js',
							onLoad:function(){	
								Ext.Loader.loadScript({
									url:'.//app//view//test//Test005Controller.js',
									onLoad:function(){	
										Ext.Loader.loadScript({
											url:'.//app//view//test//Test005.js',
											onLoad:function(){	
												////console.log('2::::::::',panelRoot.getController());
												Ext.apply(panelRoot.getController(),{    extend: 'Ext.app.ViewController',    alias: 'controller.test005',    onSearchItems:function(params){alert('hi122');}});
						
												alert('hi1');
											},
											onError:function(){
												//console.log('푸하하2', arguments);
												testAAA();    			
											}
										}); 		
									},
									onError:function(){
										//console.log('푸하하2', arguments);
										testAAA();    			
									}
								}); 
							},
							onError:function(){
								//console.log('푸하하2', arguments);
								testAAA();    			
							}
						});  		    				
	    			}
	    		});	  
	    		*/  	
                // 콘솔모드는 try catch를 잡지 않는다. 
                if(exCommon.getDebugMode() =='console'){ 
                    for (var i=1; i < lboIdCount; i++){
                        parsingStr(lboItem[i].strCont, i);
                        //console.log(i, lboItem[i], lboItem[i].parentLboId);
                        var objCodeTemp = getExtObject(lboItem[i]);                       
                        var objTemp = Ext.decode(objCodeTemp);
                        lboItem[i].parentExtId = lboItem[lboItem[i].parentLboId].extId;
                        //console.log('찾기:' + lboItem[i].parentLboId + ',' + lboItem[i].parentExtId);               
                        // ViewModel Bind 여부 체크 
                        console.log('lboViewModelExist',lboViewModelExist);
                        if(lboViewModelExist == false){
                            if(objTemp.bind != undefined && objTemp.bind != null){
                                objTemp.bind = null;
                                console.log('objTemp.bind',objTemp.bind);
                            }
                        }                       
                        var extObj = Ext.getCmp(lboItem[i].parentExtId).add(objTemp);
                        lboItem[i].extId = extObj.id;
                    }
                }
                else {
                    for (var i=1; i < lboIdCount; i++)
                    {
                        try{
                            parsingStr(lboItem[i].strCont, i);
                            //console.log(i, lboItem[i], lboItem[i].parentLboId);
                            var objCodeTemp = getExtObject(lboItem[i]);                       
                            var objTemp = Ext.decode(objCodeTemp);
            
                            lboItem[i].parentExtId = lboItem[lboItem[i].parentLboId].extId;
                            //console.log('찾기:' + lboItem[i].parentLboId + ',' + lboItem[i].parentExtId);
                                                    
                            // ViewModel Bind 여부 체크 
                            console.log('lboViewModelExist',lboViewModelExist);
                            if(lboViewModelExist == false){
                                if(objTemp.bind != undefined && objTemp.bind != null){
                                    objTemp.bind = null;
                                    console.log('objTemp.bind',objTemp.bind);
                                }
                            }                       
                            
                            var extObj = Ext.getCmp(lboItem[i].parentExtId).add(objTemp);
                            lboItem[i].extId = extObj.id;
                        }
                        catch(e){
                            console.log('eeeeeee',e);
							if(getLboLang() == 'english')
                            	Ext.Msg.alert('Error',e);
							else 
								Ext.Msg.alert('오류',e);
                            //me.setMainBarViewCode();
                            return;
                        }                    
                    }	
                }
		    	me.showTreeItems();
		    	exCommon.initReady = true;
		    	try{
		    		panelRoot.getController().init();
		    	}catch(e){}
		    	try{
		    		panelRoot.getController().afterRender(panelRoot);
		    	}catch(e){
		    		console.log('error afterRender', e);
		    	}
			}
		});	
		me.getMainBar().remove(me.getViewView(),true);
    },
    setMainBarViewCode:function(){
    	var me = this;
    	var url = this.url;
    	var menuName = this.menuName;
    	var path = this.path;
 		var params = {
 			fileName: lboFileName,
 			folderName: lboFolderName
 		}; 			
    	Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app' + 
				//lboFileSeperator + 'view' + 
				lboFileSeperator + lboFolderName + 
				lboFileSeperator + lboFileName + '.js',
			callback:function(obj, success, resObj){
				if(success == true){

					//여기 

					me.getObjectTree().setDisabled(true);
					me.getPropertyList().getStore().removeAll();
					me.getEventList().getStore().removeAll();

			    	var viewViewCont = resObj.responseText.trim();
				    var strContLen = viewViewCont.length;
				    var strtDefine = 0;
				    var endDefine = 0;
	
					var mainBar = me.getMainBar();
					// 윈도우, 패널등을 모두 보여주기 위해 중간에 패널을 둠.
					var panelViewView = Ext.create('ExFrm.view.ide.ViewView',{
			    		autoShow:true,
						title: getLboLangItem('뷰코드')
			 		});
					// 글로벌 컨트롤러에 등록
					me.selectedViewOnlyCodePanel = panelViewView;	
					me.selectedViewOnlyCode = viewViewCont;	 		
			 		mainBar.add(panelViewView);
					panelViewView.getController().calledByOther(params);	
			    	//var startIndex = me.selectedViewControllerCode.indexOf('//CodeStart_DoNotModify//') + 25;
			    	//var endIndex = 	 me.selectedViewControllerCode.indexOf('//CodeEnd_DoNotModify//');
			    	//var controllerViewContSub = controllerViewCont.substring(startIndex, endIndex);
			    	
			    	
			 		panelViewView.down('[reference=fileCont]').setExValue(viewViewCont);//parsingToHtmlEditor(viewViewCont));//controllerViewContSub);	
					//panelViewView.down('[name=new]').setVisible(false);
					panelViewView.down('[name=save]').setVisible(true);
				}
			}
		});
    },
    setMainBarModelView:function(){
    	var me = this;
    	var url = this.url;
    	var menuName = this.menuName;
    	var path = this.path;
 		var params = {
 			fileName: lboFileName,
 			folderName: lboFolderName
 		}; 	    	
    	Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app' + 
				//lboFileSeperator + 'view'+ 
				lboFileSeperator + lboFolderName + 
				lboFileSeperator + lboFileName + 'Model.js',
			callback:function(obj, success, resObj){
				if(success == true){
			    	var strModelCont = resObj.responseText;
				    var strContLen = strModelCont.length;
				    var strtDefine = 0;
				    var endDefine = 0;
				    for (var i = 0; i < strContLen -10; i++)
				    {
				        if (strModelCont.substring(i, i+10) == "Ext.define")
				        {
				            for(var j=i+1; j < strContLen; j++)
				            {
				                if(strModelCont.substring(j,j+1) == '\'')
				                {
				                    strtDefine = j;
				                    i = j;
				                    break;
				                }
				            }
				            for (var j = i + 1; j < strContLen; j++)
				            {
				                if (strModelCont.substring(j,j+1) == '\'')
				                {
				                    endDefine = j;
				                    i = j;
				                    break;
				                }
				            }
				        }
				    }
					//strDefine = strModelCont.substring(strtDefine, endDefine + 1);
					lboModelIdCount=0;
					parsingModelStores(strModelCont);
					var mainBar = me.getMainBar();
					// 윈도우, 패널등을 모두 보여주기 위해 중간에 패널을 둠.
					var panelModelView = Ext.create('ExFrm.view.ide.ModelView',{
			    		autoShow:true,
						title: getLboLangItem('모델뷰'),
			    		name:'panelModelView'
			 		});
			 		me.selectedViewModelPanel = panelModelView;
			 		me.selectedViewModelCode = strModelCont; 
	
			 		
	
			 		panelModelView.getController().calledByOther(params);
			 		
			 		mainBar.add(panelModelView);					
					for(var i=0; i < lboModelIdCount; i++){
						var panel = Ext.create('Ext.panel.Panel',{
							reference:'storeList' + i,
							padding:'10 10 10 10',
							border:1,
							layout:{
								type:'hbox',
								align:'stretch'
							},
							items:[
							{
								layout:'vbox',						
								items:[
								{
									xtype:'textfield',
									fieldLabel: getLboLangItem('스토어명'),
									reference:'storeName' + i,
									value:lboModelStore[i].name
								},{
									xtype:'textfield',
									fieldLabel:'type',
									reference:'proxyType' + i,
									value:lboModelStore[i].proxyType
									
								},{
									xtype:'textfield',
									fieldLabel:'url',
									reference:'url' + i,
									value:lboModelStore[i].url
								},{
									xtype:'textfield',
									fieldLabel:'type(reader)',
									reference:'readerType' + i,
									value:lboModelStore[i].readerType
								},{
									xtype:'textfield',
									fieldLabel:'rootProperty',
									reference:'rootProperty' + i,
									value:lboModelStore[i].rootProperty
								},{
									xtype:'textfield',
									fieldLabel:'pageSize',
									reference:'pageSize' + i,
									value:lboModelStore[i].pageSize
								},{
									xtype:'textfield',
									fieldLabel:'autoLoad',
									reference:'autoLoad' + i,
									value:lboModelStore[i].autoLoad
								}]
							},{
								layout:'vbox',
								flex:1,
								items:[
								{
									xtype:'textarea',
									reference:'responseText'+i,
									flex:1
								},	
								{							
									layout:'hbox',
									items:[
									{
										xtype:'tbspacer',
										flex:1
									},{
										xtype:'button',
										text: getLboLangItem('연결테스트'),
										refNo:i,
										handler:'onTestStore'
									},{
										xtype:'tbspacer',
										width:10
									},{
										xtype:'button',
										text: getLboLangItem('삭제'),
										refNo:i,
										handler:'onDeleteStore'
									}]
								}]
							}]
						});
						panelModelView.down('[name=viewModelList]').add(panel);
						panelModelView.down('[name=viewModelListCount]').setValue(lboModelIdCount);
					}
					panelModelView.down('[name=new]').setVisible(false);
					panelModelView.down('[name=save]').setVisible(true);
					
				}
				else {
					var panelModelView = Ext.create('ExFrm.view.ide.ModelView',{
			    		autoShow:true,
						title: getLboLangItem('뷰모델'),
			    		name:'panelModelView'
			 		});
			 		me.selectedViewModelPanel = panelModelView;
			 		me.selectedViewModelCode = '';//strModelCont; 
	
			 		
	
			 		panelModelView.getController().calledByOther(params);
			 		var mainBar = me.getMainBar();
			 		mainBar.add(panelModelView);					
					
					panelModelView.down('[name=new]').setVisible(true);
					panelModelView.down('[name=save]').setVisible(false);
				}	
				me.getMainBar().remove(me.getModelCodeView(),true);		 		
			}
		});
    },
    setMainBarModelCodeView:function(){
    	var me = this;
    	var url = this.url;
    	var menuName = this.menuName;
    	var path = this.path;
 		var params = {
 			fileName: lboFileName,
 			folderName: lboFolderName
 		}; 			
    	Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath +  
				lboFileSeperator + 'app'+ 
				//lboFileSeperator + 'view'+ 
				lboFileSeperator + lboFolderName + 
				lboFileSeperator + lboFileName + 'Model.js',
			callback:function(obj, success, resObj){
				if(success == true){
			    	var modelViewCont = resObj.responseText.trim();
				    var strContLen = modelViewCont.length;
				    var strtDefine = 0;
				    var endDefine = 0;
	
					var mainBar = me.getMainBar();
					// 윈도우, 패널등을 모두 보여주기 위해 중간에 패널을 둠.
					var panelModelCodeView = Ext.create('ExFrm.view.ide.ModelCodeView',{
			    		autoShow:true,
						title: getLboLangItem('뷰모델') + ' ' + getLboLangItem('코드')
			 		});
					// 글로벌 컨트롤러에 등록
					me.selectedViewModelCodePanel = panelModelCodeView;	
					me.selectedViewModelCode = modelViewCont;	 		
			 		mainBar.add(panelModelCodeView);
			 		
					panelModelCodeView.getController().calledByOther(params);	
			    	//var startIndex = me.selectedViewControllerCode.indexOf('//CodeStart_DoNotModify//') + 25;
			    	//var endIndex = 	 me.selectedViewControllerCode.indexOf('//CodeEnd_DoNotModify//');
			    	//var controllerViewContSub = controllerViewCont.substring(startIndex, endIndex);
			 		panelModelCodeView.down('[reference=fileCont]').setExValue(modelViewCont);//controllerViewContSub);					
					//panelModelCodeView.down('[name=new]').setVisible(false);
					//panelModelCodeView.down('[name=save]').setVisible(true);
					//name:'panelModelView'
					me.getMainBar().remove(me.getModelView(),true);
				}
			}
		});
    },  
    movePage:function(url, menuName, params){
    	var mainBar = this.getMainTemplate();
    	var findTitle = false;
    	var panel;
    	console.log('movePage', mainBar);
		for(var i=mainBar.items.items.length-1; i>=0; i--){
			mainBar.remove(mainBar.items.items[i],true);
		}
		panel = Ext.create(url,{
    		autoShow:true,
 		});	
    	mainBar.add(panel);
    	
    	panel.getController().calledByOther(params);
    },    
 
    openPopup:function(url, menuName, params, openPanel){
    	var mainBar = this.getMainBar();
    	var findTitle = false;
    	var panel = Ext.create(url,{
	    	autoShow:true,
	 	});	
    	panel.getController().calledByOtherPopup(params, openPanel);
    	//console.log('----------3');
    },    
    beforeSelectedWidget:null, 
    //selectedWidget:null,
    oldTime:0,
    // 선택했을 경우
    selectWidget:function(obj, beforeObj){
    	//console.log('selectWidget:', obj);
    	//var d = new Date();
    	////console.log('gap:' + d.getTime() + "," + this.oldTime + "," + (d.getTime() - this.oldTime));
    	//if(d.getTime() - this.oldTime > 100){
        lboSelectedInfo.widget = obj;
        try{ obj.addCls('selected'); }catch(e){}
        if(this.beforeSelectedWidget != null && this.beforeSelectedWidget != undefined){
            try{ this.beforeSelectedWidget.removeCls('selected'); }catch(e){}
        }
        this.beforeSelectedWidget = lboSelectedInfo.widget;
        //console.log('lboSelectedInfo.widget:', lboSelectedInfo.widget);
        getSelectedInfoByWidget(lboSelectedInfo.widget);
        
        // 선택했을 경우 
        this.showProperty(obj);
	    //}
    	//this.oldTime = d.getTime();
    },
    selectScreen:function(){
    	mainBar.add(panel);
    },
    drawView:function(obj){
    	//console.log('drawview' , obj);
    },
    addItem:function(objStr){
    	/*
    	var parentLboId = -1;
    	
    	for(var i=0; i< lboIdCount; i++){
    		//console.log('selectedWidget.id' + lboSelectedInfo.widget.id + ','+lboItem[i].extId );
    		if(lboSelectedInfo.widget.id == lboItem[i].extId){
    			parentLboId = lboItem[i].lboId;
    			break;	
    		}
    	}
    	*/
    	var obj = Ext.decode(objStr)
    	var tmpLboItem = lboSelectedInfo.lboItem;
    	
    	//console.log('addItem tmpLboItem', tmpLboItem);
    	if(lboSelectedInfo.extId != ''){
    		var index = lboIdCount;
		    lboItem[index] = new LboItem();
		    lboItem[index].init();
		    lboItem[index].lboId = lboIdCount;
		    lboItem[index].strCont = objStr;
		    lboItem[index].name = obj.xtype;	// xcode
		    lboItem[index].depth = tmpLboItem.depth+1;
		    lboItem[index].itemsIndex = getItemsIndex(tmpLboItem);
		    lboIdCount++;
			parsingStr(lboItem[index].strCont, index);
			////console.log(i, lboItem[i], lboItem[i].parentLboId);
			
			//var objCodeTemp = getExtObject(lboItem[i]);
			//var objTemp = Ext.decode(objCodeTemp);
			
			lboItem[index].parentExtId = lboSelectedInfo.extId;// 01/04 lboSelectedInfo.widget.id;
			lboSelectedInfo.hasChild = true;
			////console.log('찾기:' + parentLboId + ',' + lboSelectedInfo.widget.id);
			//var extObj = lboSelectedInfo.widget.add(obj);
			var extObj = {};
			try{
				extObj = lboSelectedInfo.widget.add(obj);
			}
			catch(e){
				console.log(e);
				var tempMsg = '다음과 같은 이유로 위젯을 추가할 수 없습니다. 마지막 성공한 단계까지 저장하시고 다시 불러오겠습니까?';
				if(getLboLang() == 'english'){
					tempMsg = 'I can\'t add widget. May I reload code?'
				}
				if(confirm(tempMsg + '.\n' + e)== true){
					lboItem[index].parentExtId = '';
					lboItem[index].parentLboId = '';
					lboItem[index].delYn = 'Y';
					var strContentTemp = getStringAll();	
					Ext.Ajax.request({
						type:'ajax',
						url:'./jsp/fileWrite.jsp',
						params:{
							path: lboServerPath + lboUserServerPath + 
								lboFileSeperator + 'app'+ 
								//lboFileSeperator + 'view'+ 
								lboFileSeperator + lboFolderName + 
								lboFileSeperator + lboFileName + '.js',
							content:strContentTemp
						},
						success:function(res){
							var obj = JSON.parse(res.responseText);
							console.log('obj', obj);
							if(obj.success == false) {
								Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
								return;
							}
							if(getLboLang() == 'english')
								alert('Saved.');
							else 
								alert('저장하였습니다.');
                            
                            // History저장시작
                            exCommon.saveHistory(
                                lboServerPath + 
								lboFileSeperator + 'lib'+ 
								lboFileSeperator + 'tmpljs'+ 
								lboFileSeperator + 'history'+ 
								lboFileSeperator + 'app'+ 
								//lboFileSeperator + 'view'+ 
								lboFileSeperator + lboFolderName + 
								lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime(), 
                                strContentTemp);
							location.reload();
						},
						failure:function(res){
							if(getLboLang() == 'english')
								alert("Error occurr!! - " + res.responseText);
							else 
								alert("저장 중 오류가 발생하였습니다.:" + res.responseText);
						}
					});
				}
				//this.showTreeItems();
				return;
			}			
			
			lboItem[index].extId = extObj.id;   
			//lboIdCount++;	
			this.showTreeItems();
		}
    },
    addItemGroup:function(objStr){
    	/*
    	var parentLboId = -1;
    	
    	for(var i=0; i< lboIdCount; i++){
    		//console.log('selectedWidget.id' + lboSelectedInfo.widget.id + ','+lboItem[i].extId );
    		if(lboSelectedInfo.widget.id == lboItem[i].extId){
    			parentLboId = lboItem[i].lboId;
    			break;	
    		}
    	}
    	*/
    	var objCount = Ext.decode('[' + objStr + ']');
    	var obj;
    	// 여러개가 설정되는 경우
    	var arrayInput = false;
    	var delWidgetIndex;
    	var moveWidgetIndex = [];
    	console.log('>>>' + objCount.length);
		if(objCount.length == 1){
			arrayInput = false;
			obj = Ext.decode(objStr);
		}else if(objCount.length > 1){
			arrayInput = true;
			objStr = '{ items:[' + objStr + ']}';
			obj = Ext.decode(objStr);
		}else {
			Ext.Msg.alert('확인','오류');
			return;
		}
		
    	var tmpLboItem = lboSelectedInfo.lboItem;
    	
    	//console.log('addItem tmpLboItem', tmpLboItem);
    	if(lboSelectedInfo.extId != ''){
    		var index = lboIdCount;
		    lboItem[index] = new LboItem();
		    lboItem[index].init(); //중요
		    lboItem[index].lboId = lboIdCount;
		    lboItem[index].strCont = objStr;
		    lboItem[index].name = obj.xtype;	// xcode
		    lboItem[index].depth = tmpLboItem.depth+1;
		    var itemsIndex = getItemsIndex(tmpLboItem);
		    delWidgetIndex = index;
		    lboItem[index].itemsIndex = itemsIndex;
		    lboIdCount++;
		    var tempCount = lboIdCount;
			parsingStr(lboItem[index].strCont, index);
			lboItem[index].parentExtId = lboSelectedInfo.extId;// 01/04 lboSelectedInfo.widget.id;
			lboSelectedInfo.hasChild = true;			
			////////////////////////////////////
			/*
				lboStrDefine = strCont.substring(strtDefine, endDefine + 1);
			    lboIdCount = 0;
			    lboItem[lboIdCount] = new LboItem();
			    lboItem[lboIdCount].init();
			    lboItem[lboIdCount].lboId = lboIdCount;
			    lboItem[lboIdCount].strCont = strCont;
			    lboItem[lboIdCount].name = lboStrDefine;
			    lboIdCount++;
			    parsingStr(lboItem[0].strCont, 0);			
			*/
			/////////////////////////////////////
			//console.log('1',lboItem[index-1]);
			//console.log('2',lboItem[index]);
			var objCodeTemp = getExtObject(lboItem[index]);
			//console.log('objCodeTemp', objCodeTemp);
			var obj1 = {};
			try{ 
				obj1 = Ext.decode(objCodeTemp);
			}catch(e){
				//console.log('decode오류');
				if(getLboLang() == 'english')
					Ext.Msg.alert('Error','Error occurr when transform code to object!! - ' + e);
				else 
					Ext.Msg.alert('오류','객체변환 중 오류가 있습니다.' + e);
				me.setMainBarViewCode();
				return;
			}			
			var extObj = {};
			try{
				extObj = lboSelectedInfo.widget.add(obj1);
			}
			catch(e){
				console.log(e);
				var tempMsg = '다음과 같은 이유로 위젯을 추가할 수 없습니다. 마지막 성공한 단계까지 저장하시고 다시 불러오겠습니까?';
				if(getLboLang() == 'english'){
					tempMsg = 'I can\'t add widget. May I reload code?'
				}
				if(confirm(tempMsg + '.\n' + e)== true){
					lboItem[index].parentExtId = '';
					lboItem[index].parentLboId = '';
					lboItem[index].delYn = 'Y';
					var strContentTemp = getStringAll();	
					Ext.Ajax.request({
						type:'ajax',
						url:'./jsp/fileWrite.jsp',
						params:{
							path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app'+ 
							//lboFileSeperator + 'view'+ 
							lboFileSeperator + lboFolderName + 
							lboFileSeperator + lboFileName + '.js',
							content:strContentTemp
						},
						success:function(res){
							var obj = JSON.parse(res.responseText);
							console.log('obj', obj);
							if(obj.success == false) {
								Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
								return;
							}
							if(getLboLang() == 'english')
								alert('Saved.');
							else 
								alert('저장하였습니다.');

                            // History저장시작
                            exCommon.saveHistory(
                                lboServerPath + 
								lboFileSeperator + 'lib'+ 
								lboFileSeperator + 'tmpljs'+ 
								lboFileSeperator + 'history'+ 
								lboFileSeperator + 'app'+ 
								//lboFileSeperator + 'view'+ 
								lboFileSeperator + lboFolderName + 
								lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime(), 
                                strContentTemp);
                                
							location.reload();
						},
						failure:function(res){
							if(getLboLang() == 'english')
								alert("Error occurr!! - " + res.responseText);
							else 
								alert("저장 중 오류가 발생하였습니다.:" + res.responseText);
						}
					});						
				}
				//this.showTreeItems();
				return;
			}
			lboItem[index].extId = extObj.id;   
			//console.log('>>>>', tempCount,lboIdCount );
			
			for (var i=tempCount; i < lboIdCount; i++)
	    	{
				parsingStr(lboItem[i].strCont, i);
				//console.log(i, lboItem[i], lboItem[i].parentLboId);
				var objCodeTemp = getExtObject(lboItem[i]);
				var objTemp = Ext.decode(objCodeTemp);
				lboItem[i].parentExtId = lboItem[lboItem[i].parentLboId].extId;
				//console.log('찾기:' + lboItem[i].parentLboId + ',' + lboItem[i].parentExtId);


				var extObjTemp = Ext.getCmp(lboItem[i].parentExtId).add(objTemp);
				lboItem[i].extId = extObjTemp.id;

	    	}		
	    	if(arrayInput == true){
	    		console.log('........................' + lboItem[delWidgetIndex]);
	    		lboItem[delWidgetIndex].parentExtId = '';
	    		lboItem[delWidgetIndex].parentLboId = '';
	    		lboItem[delWidgetIndex].itemsIndex = 9999;
	    		console.log('........................' + delWidgetIndex, lboItem[delWidgetIndex]);
	    		var countTemp = 0;
		    	for(var i=delWidgetIndex + 1; i < delWidgetIndex + 1 + objCount.length; i++){
		    		console.log('........................' + i);
		    		lboItem[i].parentExtId = lboSelectedInfo.extId;
		    		lboItem[i].parentLboId = lboSelectedInfo.lboId;
		    		lboItem[i].itemsIndex = countTemp + itemsIndex;
		    		console.log('........................',lboItem[i]);
		    		countTemp++;
		    		lboSelectedInfo.widget.add(Ext.getCmp(lboItem[i].extId));
		    		
		    	}
		    	for(var i=delWidgetIndex + 1; i<delWidgetIndex + 1 + objCount.length; i++){
		    		extObj.remove(Ext.getCmp(lboItem[i].extId),false);
		    		lboSelectedInfo.widget.add(Ext.getCmp(lboItem[i].extId));
		    	}	
		    	lboSelectedInfo.widget.remove(extObj, false);	    	
		    }
			this.showTreeItems();
		}
    },    
    showProperty:function(obj){
        // 타이틀을 수정한다.
        
        var tmpText='';
        try{
            if(obj.text != 'undefined' && obj.text != null && obj.text != ''){
                tmpText = obj.text;
            }
        }catch(e){}
        if(tmpText == ''){
            try{
                if(obj.html != 'undefined' && obj.html != null && obj.html != ''){
                    tmpText = obj.html;
                }
            }catch(e){}
        }
        if(tmpText == ''){
            try{
                if(obj.reference != 'undefined' && obj.reference != null && obj.reference != ''){
                    tmpText = obj.reference;
                }	
            }catch(e){}
        }
        if(tmpText == ''){
            try{
                if(obj.name != 'undefined' && obj.name != null && obj.name != ''){
                    tmpText = obj.name;
                }
            }catch(e){}
        }
        this.getPropertyList().setTitle('속성 ' + tmpText);
        this.getEventList().setTitle('이벤트 ' + tmpText);
        
        // 코드 
    	var extId = obj.id;
    	var selectedIndex = -1;
    	////console.log('extId',extId);
    	for(var i=0; i < lboIdCount; i++){
    		////console.log('lboItem[i].extId:' + lboItem[i].extId + ',' + extId);
    		if(lboItem[i].extId == extId){
    			selectedIndex = i;
    			break;
    		}
    	}
    	////console.log('selectedIndex', selectedIndex);
    	if(selectedIndex != -1){
    		this.getPropertyList().getStore().removeAll();
    		this.getEventList().getStore().removeAll(); 
	    	for(var i=0; i <lboItem[selectedIndex].lboPropertyLen; i++){
	    		////console.log('.......들어' + lboItem[selectedIndex].lboPropertyName[i]);
	    		
	    		if(lboItem[selectedIndex].lboPropertyName[i] == 'handler'){
	    			// 이벤트 리스터를 속성창에 넣을 위치. 
    				this.getEventList().getStore().add(
    					{propertyName:lboItem[selectedIndex].lboPropertyName[i], propertyValue:lboItem[selectedIndex].lboPropertyValue[i]});
	    		}
	    		else if(lboItem[selectedIndex].lboPropertyName[i] == 'listeners'){
	    			// 이벤트 리스터를 속성창에 넣을 위치. 
	    			parsingPropertyStr(lboItem[selectedIndex].lboPropertyValue[i]);
	    			console.log('lboProperty', lboProperty);
	    			for(var j=0; j<lboProperty.lboPropertyLen; j++){
	    				this.getEventList().getStore().add({propertyName:lboProperty.lboPropertyName[j],propertyValue:lboProperty.lboPropertyValue[j]});
					}
	    		}
	    		else{
	    			this.getPropertyList().getStore().add({propertyName:lboItem[selectedIndex].lboPropertyName[i],propertyValue:lboItem[selectedIndex].lboPropertyValue[i]});
	    		}
	    	}
    	}
    },
    showTreeItems:function(){
    	var root = this.getObjectTree().getRootNode();
		root.removeAll();


		
		
		root.appendChild({ text: lboItem[0].name,extId:lboItem[0].extId, leaf: true });
		
		////console.log('================');
		////console.log('================');
		////console.log('================');
		////console.log('================');
		////console.log('================');
		////console.log('================');
		////console.log('================');
		////console.log('================');

		var arrangeObj = [];
	
		
		var arrangeCount = 0;// 전체순서 
		var arrangeIndex = 0;// 아이템중 순서
		arrangeObj[arrangeCount] = lboItem[0];
		arrangeCount++;

		for(var i=0; i<arrangeCount; i++){
			arrangeIndex = 0;
			for(var j=1; j<lboIdCount; j++){
				if(lboItem[j].parentExtId == arrangeObj[i].extId){
					if(lboItem[j].itemsIndex == arrangeIndex){
						arrangeObj[arrangeCount] = lboItem[j];
						arrangeCount++;
						arrangeIndex++;
						j=1;
					}
				}			
			}
		}
	
		for(var i=1; i < arrangeCount; i++){
			////console.log('....'  + i + ',' + lboItem[i].xtype + ',' + lboItem[i].extId);
			var tempWidget = Ext.getCmp(arrangeObj[i].extId);
			////console.log('lboItem[i].xtype', Ext.getCmp(lboItem[i].extId));
			if(arrangeObj[i].parentExtId == ''){
				continue;
			}
			var cn = root.findChild('extId', arrangeObj[i].parentExtId, true);
			////console.log('cn',cn);
			var tmpText='';
			try{
				if(tempWidget.text != 'undefined' && tempWidget.text != null && tempWidget.text != ''){
					tmpText = tempWidget.text;
				}
			}catch(e){}
			if(tmpText == ''){
				try{
					if(tempWidget.html != 'undefined' && tempWidget.html != null && tempWidget.html != ''){
						tmpText = tempWidget.html;
					}
				}catch(e){}
			}
			if(tmpText == ''){
				try{
					if(tempWidget.reference != 'undefined' && tempWidget.reference != null && tempWidget.reference != ''){
						tmpText = tempWidget.reference;
					}	
				}catch(e){}
			}
			if(tmpText == ''){
				try{
					if(tempWidget.name != 'undefined' && tempWidget.name != null && tempWidget.name != ''){
						tmpText = tempWidget.name;
					}
				}catch(e){}
			}
			if(Ext.getCmp(arrangeObj[i].extId) != null && Ext.getCmp(arrangeObj[i].extId).items != null){
				cn.appendChild({text: arrangeObj[i].xtype + ' (' + tmpText + ')', extId:arrangeObj[i].extId, leaf:false});
			}
			else {
				cn.appendChild({text: arrangeObj[i].xtype + ' (' + tmpText + ')', extId:arrangeObj[i].extId, leaf:true});
			}
		}
		root.expand(true);	
		/*
		for(var i=1; i< lboIdCount; i++){
			////console.log('....'  + i + ',' + lboItem[i].xtype + ',' + lboItem[i].extId);
			var tempWidget = Ext.getCmp(lboItem[i].extId);
			////console.log('lboItem[i].xtype', Ext.getCmp(lboItem[i].extId));
			if(lboItem[i].parentExtId == ''){
				continue;
			}
			var cn = root.findChild('extId', lboItem[i].parentExtId, true);
			//console.log('cn',cn);
			var tmpText='';
			try{
				if(tempWidget.text != 'undefined' && tempWidget.text != null && tempWidget.text != ''){
					tmpText = tempWidget.text;
				}
			}catch(e){}
			if(tmpText == ''){
				try{
					if(tempWidget.html != 'undefined' && tempWidget.html != null && tempWidget.html != ''){
						tmpText = tempWidget.html;
					}
				}catch(e){}
			}
			if(tmpText == ''){
				try{
					if(tempWidget.reference != 'undefined' && tempWidget.reference != null && tempWidget.reference != ''){
						tmpText = tempWidget.reference;
					}	
				}catch(e){}
			}
			if(tmpText == ''){
				try{
					if(tempWidget.name != 'undefined' && tempWidget.name != null && tempWidget.name != ''){
						tmpText = tempWidget.name;
					}
				}catch(e){}
			}
						
			//cn.appendChild({text: items[i].xtype + ' (' + items[i].itemsIndex + ')', extId:items[i].extId, leaf:true});
			//cn.appendChild({text: items[i].xtype + ' (' + tmpText + ')', extId:items[i].extId, leaf:true});			
			
			if(Ext.getCmp(lboItem[i].extId) != null && Ext.getCmp(lboItem[i].extId).items != null){
				cn.appendChild({text: lboItem[i].xtype + ' (' + tmpText + ')', extId:lboItem[i].extId, leaf:false});
			}
			else {
				cn.appendChild({text: lboItem[i].xtype + ' (' + tmpText + ')', extId:lboItem[i].extId, leaf:true});
			}
		}
		root.expand(true);
		*/
		/*
    	for(var i=1; i< lboIdCount; i++){
    		//console.log('lboItem[i].extId:' + lboItem[i].extId + ',' + extId);
    		if(lboItem[i].extId == extId){
    			selectedIndex = i;
    			break;
    		}
    	} 
    	*/   	
    },
    showTreeItemsOrder:function(){
    	var items = arrangeitems();
    	var root = this.getObjectTree().getRootNode();
		root.removeAll();
		root.appendChild({ text: items[0].name,extId:items[0].extId, leaf: true });
		for(var i=1; i < items.length; i++){
			//console.log('....'  + i + ',' + items[i].xtype + ',' + items[i].extId);
			var cn = root.findChild('extId', items[i].parentExtId, true);
			var tmpText='';
			if(items[i].text != null && items[i].text != ''){
				tmpText = items[i].text;
			}
			else if(items[i].html != null && items[i].html != ''){
				tmpText = items[i].html;
			}
			else if(items[i].reference != null && items[i].reference != ''){
				tmpText = items[i].reference;
			}			
			//cn.appendChild({text: items[i].xtype + ' (' + items[i].itemsIndex + ')', extId:items[i].extId, leaf:true});
			cn.appendChild({text: items[i].xtype + ' (' + tmpText + ')', extId:items[i].extId, leaf:true});
		}    	
    },
    // RegController
    regViewController:function(itemName, url){
    	//console.log('item' + itemName + ',' + url);
    	//console.log('this.getMainBar().down(' + itemName + ')',this, this.getMainBar().down(itemName));
    	this.getMainBar().down(itemName).setController(url + 'Controller');
    },
    // 이벤트 등록
    regEvent:function(contoller, functionCode, eventName, codeExclude, areaMappingCls, fromArea, toArea, functionCallbackCode){
		/*
		var mappingCode = '    // 요건에 맞게 수정하세요\n';
		if(areaMappingCls == true){
			var fromArea = this.selectedViewPanel.query('[reference=' + fromArea + ']')[0];
			var toArea = this.selectedViewPanel.query('[reference=' + toArea + ']')[0];
			
			//console.log(fromArea, toArea);
			
			var fromAreaWidgets = fromArea;//.query('[reference]');
			//console.log(fromAreaWidgets);
			var toAreaWidgets = toArea.query('[reference]');
			//console.log(toAreaWidgets);	
			for(var i=0; i< fromAreaWidgets.columns.length; i++){
				for(var j=0;j< toAreaWidgets.length; j++){
					//console.log(i + ':' + fromAreaWidgets.columns[i].dataIndex);
					//console.log(i + ':' + toAreaWidgets[i].reference);
					if(fromAreaWidgets.columns[i].dataIndex == toAreaWidgets[i].reference){
						mappingCode = mappingCode + 
						'        this.lookupReference(\'' + toAreaWidgets[i].reference + '\').setValue(record[i].data.' + reference + ');\n';
					}
					
				}
			}		
		}
		*/

    	//var startIndex = this.selectedViewControllerCode.lastIndexOf('})');
    	
    	console.log('functionCallbackCode', functionCallbackCode);
    	if(codeExclude != true){
	    	var addIndex = this.getControllerCodeView().getExValue().lastIndexOf('\n\n})');
	    	if(addIndex == -1){
	    		addIndex = this.getControllerCodeView().getExValue().lastIndexOf('\n})');
	    	}    	
	    	if(addIndex == -1){
	    		addIndex = this.getControllerCodeView().getExValue().lastIndexOf('})');
	    	}    	
	    	if(functionCallbackCode == null || functionCallbackCode == ''){
		    	this.getControllerCodeView().setExValue(
		    		this.getControllerCodeView().getExValue().substring(0,addIndex) + ',\n    ' + 
		    		functionCode + '\n})');	
	    	}
	    	else {
	    		
	    		console.log('...functionCallbackCode',functionCallbackCode);
		    	this.getControllerCodeView().setExValue(
		    		this.getControllerCodeView().getExValue().substring(0,addIndex) + ',\n    ' + 
		    		functionCode + ',\n' + functionCallbackCode + '\n})');	    		
	    	}
	    	this.selectedViewControllerCode = this.getControllerCodeView().getExValue();
	    }
    	
    	/*
    		this.selectedViewControllerCode.substring(0,addIndex) + '\n,    ' + 
    		this.getControllerCodeView().getValue() + '\n' + 
    		this.selectedViewControllerCode.substring(addIndex,this.selectedViewControllerCode.length);
    	*/
    	var commaIndex = functionCode.indexOf(':');
    	var propertyName = eventName;
    	var propertyValue = functionCode.substring(0, commaIndex);
        
        /*
        var prop = {
            propertyName: propertyName.trim(),
            propertyValue:"'" + propertyValue.trim() + "'",
            propertyButton:''
        }    	
        this.getEventList().getStore().add(prop);	        
        */
        
        if(propertyName.indexOf('el.') != -1){
            /*
            var prop = {
                propertyName:propertyName.trim(),
                propertyValue:"'" + propertyValue.trim() + "'",
                propertyButton:''
            }    	
            this.getEventList().getStore().add(prop);	
            */
            var records = this.getEventList().getStore().getRange();
            var selectedRecord = {};
            var isExist = false;
            for(var i=0; i < records.length; i++){
                // 데이터가 있을 경우 
                if(records[i].data.propertyName == 'el'){
                    isExist= true;
                    selectedRecord = records[i];
                }
                
            }
            console.log(records, isExist,selectedRecord);
            // 데이터가 없을 경우 
            if(isExist== true){
                console.log('isExist', selectedRecord);
                //var indexTemp = propertyName.trim().lastIndexOf('}');
                var bfPropertyValue = selectedRecord.data.propertyValue.trim().substring(0,selectedRecord.data.propertyValue.length-1);
                bfPropertyValue = bfPropertyValue.trim();
                // 마지막 , 제거 
                if(bfPropertyValue.substring(bfPropertyValue.length-1, bfPropertyValue.length) == ','){
                    bfPropertyValue = bfPropertyValue.substring(0, bfPropertyValue-1);
                }
                console.log('bfPropertyValue', bfPropertyValue);
                /*
                var prop = {
                    propertyName:'el',
                    propertyValue:  bfPropertyValue + ',\n' + propertyName.replace('el.','')  + ":'" + propertyValue.trim() + "'}",
                    propertyButton:''
                } 
                */
                selectedRecord.data['propertyValue'] = bfPropertyValue + ',\n' + propertyName.replace('el.','')  + ":'" + propertyValue.trim() + "'\n}";   	
                selectedRecord.commit();
                //this.getEventList().getStore().add(prop);	 
            }
            else {
                var prop = {
                    propertyName:'el',
                    propertyValue: '{\n' + propertyName.trim().replace('el.','') + ":'" + propertyValue.trim() + "'\n}",
                    propertyButton:''
                }    	
                this.getEventList().getStore().add(prop);	                
            }
            
            
        }
        else {
            var prop = {
                propertyName:propertyName.trim(),
                propertyValue:"'" + propertyValue.trim() + "'",
                propertyButton:''
            }    	
            this.getEventList().getStore().add(prop);	            
        }

        

    	this.regProperty('','');
    },
    updEvent:function(propName, propValue){
    	this.getEventList().getStore().each(function(record){						
			//console.log('record', record);
			if(record.get('propName') == propName){	
				record.set('propValue',propValue);				    									    				
			}
		});
		this.regProperty('','');    	
    },
    // 이벤트 등록
    removeEvent:function(){
    	this.removeProperty();
    },    
    regProperty:function(propName, propValue, dockedProp){
		//console.log('..', lboSelectedInfo.widget);
        var strContentTemp = getStringAll();
		
		//openObj.selectedRecord.set('propertyName', propName);
		//openObj.selectedRecord.set('propertyValue', propValue);
		
		//openObj.lookupReference('gridProperty').getStore().commitChanges();
		// 위젯의 정보, 위젯의 부모정보를 읽어온다.
		
		if(propName == 'requires'){
			var reqs = [];
			try{
				reqs = Ext.decode(propValue);
			}
			catch(e){
				if(getLboLang() == 'english')
					xt.Msg.alert('Error', 'Proerty has the wrong format');
				else 
					Ext.Msg.alert('오류', '속성이 객체 형식이 아닙니다.');
				return;
			}

			for(var i=0; i < reqs.length; i++){
				try{
					requireFunc(reqs[i]);
				}
				catch(e){
					if(getLboLang() == 'english')
						Ext.Msg.alert('Error', 'Error occurr!! when read this file\\n' + reqs[i]);
					else 
						Ext.Msg.alert('오류', '다음파일을 호출하는 중 오류가 발생하였습니다.\\n' + reqs[i]);
					return;
				}
			}
			
			//*****requireFunc('ExFrm.view.test.Test005');
			//console.log('........................................................');
			//console.log('........................................................');
			/*
			Ext.apply(lboSelectedInfo.widget, { 
				requires:propValue
			});
			*/
		}

		console.log('선택된 위젯========================================',lboSelectedInfo.widget)
		getSelectedInfoByWidget(lboSelectedInfo.widget);

		var propList = this.getPropertyList();
		var record = propList.getStore().getRange();
		////console.log('record', record);
		var eventList = this.getEventList();
		var eRecord = eventList.getStore().getRange();
		////console.log('eRecord', eRecord);
		////console.log('lboItem[lboSelectedInfo.index]', lboItem[lboSelectedInfo.index]);
		////console.log('lboSelectedInfo.index', lboSelectedInfo.index);
		var extObj = setInfoPropertyByRecord(lboItem[lboSelectedInfo.index], record, eRecord);
		////console.log('extObj', extObj);
		
		// 선택된 위젯정보를 읽어온다.
		getSelectedItemsIndex();
		////console.log('.selectedItemsIndex:',lboSelectedInfo.itemsIndex);
		var newWidget = {};
		////console.log('extObj::::::::',extObj);
		if(lboSelectedInfo.index == 0){
			lboSelectedInfo.parentWidget = this.getMainContainer().down('[name=renderArea]');
			//extObj = Ext.create(lboSelectedInfo.lboItem.name, extObj);
			newWidget = Ext.create(lboSelectedInfo.lboItem.name, extObj);
			//lboSelectedInfo.parentWidget = this.getMainContainer();
		}
		
		////console.log('extObj::', extObj);
		// 아이템들을 읽어온다. 
		var itemList = getChildArrayByExtId(lboSelectedInfo.extId);
		////console.log('itemList========================' + lboSelectedInfo.extId, itemList);

		console.log('remove::::', lboSelectedInfo.parentWidget,lboSelectedInfo.widget );
        
        try{
		    lboSelectedInfo.parentWidget.remove(lboSelectedInfo.widget,false);
        }
        catch(e){
            console.log('에러체크에러체크에러체크에러체크에러체크에러체크에러체크에러체크에러체크에러체크', e);
        }
		////console.log('>>>>',lboSelectedInfo.parentWidget, extObj, lboSelectedInfo.itemsIndex);
		// 루트는 파일을 읽어오기때문에 별도 관리가 필요하다. 

		if(lboSelectedInfo.index == 0){
			console.log('========================0000');
			
			//debugger;
			var itemLen = newWidget.items.items.length;
			console.log(itemLen);
			
			for(var i = itemLen-1; i >= 0; i--)
			{
				console.log('========================1111:' + i,newWidget.items.items[i]);
				newWidget.remove(newWidget.items.items[i], true);
			}	
			
		}	



		console.log('========================2222');


		console.log('>>>>========================2');
		try{
			console.log('>>', extObj.bind);
			if(lboViewModelExist == false){
				if(extObj.bind != undefined && extObj.bind != null){
					extObj.bind = null;
				}
			}
			console.log('extObj*****************************************************', extObj);
			if(lboSelectedInfo.index == 0){
				lboSelectedInfo.parentWidget.add(newWidget);
				newWidget.show();
				//debugger;
				//console.log('...');
				//extObj.render(lboSelectedInfo.parentWidget);
				//console.log('......');
			}
			else {
				console.log('extObj', extObj);
				console.log('lboSelectedInfo.parentWidget', lboSelectedInfo.parentWidget);

				//newWidget.suspendLayouts();
				//newWidget = Ext.create(extObj);
				//newWidget.show();
				//newWidget.resumeLayouts(true);
				//lboSelectedInfo.parentWidget.suspendLayouts();
				newWidget = lboSelectedInfo.parentWidget.insert(lboSelectedInfo.itemsIndex, extObj);
				//lboSelectedInfo.parentWidget.insert(lboSelectedInfo.itemsIndex, newWidget);
				//lboSelectedInfo.parentWidget.resumeLayouts(true);
			}

			if(propName == 'dockedItems'){
				console.log('dockedItems=================================');
				try{
					newWidget.addDocked(Ext.decode(dockedProp));
				}
				catch(e){
					
					if(getLboLang() == 'english')
						alert('Remove Property. Because the widget has no ability to dock.');
					else 
						alert('해당 위젯에는 dock 시킬수 없습니다. 속성을 삭제하세요.');
					return;
				}
			}			
			
		}
		catch(e){
			if(e.sourceClass != null && e.sourceClass == 'Ext.mixin.Bindable'){
				var tempMsg = 'Bind 오류가 발생하였습니다.\\n뷰모델의 바인드 객체가 유효하지 않을 수 있습니다.\\n무시하고 계속 진행하시겠습니까?';
				if(getLboLang() == 'english'){
					tempMsg = 'Bind Error occurr!!. ViewModel Bind Object may not be valid. Ignore error and continue?'
				}

				if(confirm('Bind 오류가 발생하였습니다.\\n뷰모델의 바인드 객체가 유효하지 않을 수 있습니다.\\n무시하고 계속 진행하시겠습니까?')== true){
					
					lboSelectedInfo.parentWidget.remove(extObj);
					delete extObj['bind'];
					console.log('extObj', extObj);
					if(lboSelectedInfo.index == 0){
						newWidget = lboSelectedInfo.parentWidget.add(extObj);
					}
					else {
						newWidget = lboSelectedInfo.parentWidget.insert(lboSelectedInfo.itemsIndex, extObj);
					}
					console.log('newWidget', newWidget);
				}
				else {
					var tempMsg = '다음과 같은 이유로 위젯을 추가할 수 없습니다. 마지막 성공한 단계까지 저장하시고 다시 불러오겠습니까?';
					if(getLboLang() == 'english'){
						tempMsg = 'I can\'t add widget. May I reload code?'
					}

					if(confirm(tempMsg + ' ' + e)== true){  
						Ext.Ajax.request({
							type:'ajax',
							url:'./jsp/fileWrite.jsp',
							params:{
								path: lboServerPath + lboUserServerPath + 
								lboFileSeperator + 'app'+ 
								//lboFileSeperator + 'view'+ 
								lboFileSeperator + lboFolderName + 
								lboFileSeperator + lboFileName + '.js',
								content:strContentTemp
							},
							success:function(res){
								var obj = JSON.parse(res.responseText);
								console.log('obj', obj);
								if(obj.success == false) {
									Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
									return;
								}
								if(getLboLang() == 'english')
									alert('Saved.');
								else 
									alert('저장하였습니다.');
								// History저장시작
								exCommon.saveHistory(
									lboServerPath + 
									lboFileSeperator + 'lib'+ 
									lboFileSeperator + 'tmpljs'+ 
									lboFileSeperator + 'history'+ 
									lboFileSeperator + 'app'+ 
									lboFileSeperator + lboFolderName + 
									lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime(), 
									strContentTemp);
								location.reload();
							},
							failure:function(res){
								if(getLboLang() == 'english')
									alert("Error occurr when saved!! - " + res.responseText);
								else 
									alert("저장 중 오류가 발생하였습니다.:" + res.responseText);
							}
						});
					}
					else {
						location.reload();
					}
				}
			}
			else { 
				var tempMsg = '다음과 같은 이유로 위젯을 추가할 수 없습니다. 마지막 성공한 단계까지 저장하시고 다시 불러오겠습니까?\\n취소시 마지막 저장상태로 복구합니다.';
				if(getLboLang() == 'english'){
					tempMsg = 'I can\'t add widget. May I reload code?'
				}
				if(confirm(tempMsg + '\\n' + e)== true){  
					Ext.Ajax.request({
						type:'ajax',
						url:'./jsp/fileWrite.jsp',
						params:{
							path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app'+ 
							//lboFileSeperator + 'view'+ 
							lboFileSeperator + lboFolderName + 
							lboFileSeperator + lboFileName + '.js',
							content:strContentTemp
						},
						success:function(res){
							var obj = JSON.parse(res.responseText);
							console.log('obj', obj);
							if(obj.success == false) {
								Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
								return;
							}
							if(getLboLang() == 'english')
								alert('Saved.');
							else 
								alert('저장하였습니다.');
							
							// History저장시작
							exCommon.saveHistory(
								lboServerPath + 
								lboFileSeperator + 'lib' + 
								lboFileSeperator + 'tmpljs'+ 
								lboFileSeperator + 'history'+ 
								lboFileSeperator + 'app'+ 
								//lboFileSeperator + 'view'+ 
								lboFileSeperator + lboFolderName + 
								lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime(), 
								strContentTemp);                               
							
							location.reload();
						},
						failure:function(res){
							if(getLboLang() == 'english')
								alert("Error occurr when saved!! - " + res.responseText);
							else 
								alert("저장 중 오류가 발생하였습니다.:" + res.responseText);
						}
					});						
				}
				else {
					location.reload();
				}
				//this.showTreeItems();
				return;
			}
			//else{
			//    console.log('e:::', e);
			//    throw e;
			//}
		}
		
		// lboItem을 정렬한다. 
		propertyCopyByWidget(newWidget);
		

		console.log('==========================================');
		console.log(newWidget);
		if(lboSelectedInfo.index != 0){
			for(i=0; i <itemList.length; i++){
				console.log(i+':',itemList[i] );
				newWidget.add(Ext.getCmp(itemList[i].extId));
			}
		}
		else {
			for(i=0; i <itemList.length; i++){
				console.log(i+':',itemList[i] );
				try{
				newWidget.add(Ext.getCmp(itemList[i].extId));
				}
				catch(e){
					console.log('왜그럴까',e);
				}
			}
		}
		
		if(propName == 'defaults'){
			var objProp = Ext.decode(propValue);
			//console.log('');
			var keys = Object.keys(objProp);
			for(var i=0; i < keys.length; i++){
				//console.log(objProp[keys[i]]);
				//debugger;
				for(j=0; j <itemList.length; j++){
					try{
						//var applyStr = Ext.decode('{' + keys[i] + ':' + objProp[keys[i]] + '}');
						Ext.apply(Ext.getCmp(itemList[j].extId),objProp);
						console.log(Ext.getCmp(itemList[j].extId), objProp);
					}
					catch(e){
						console.log('err..' + e);
					}
				}
			}
		}		
		
		//}
		console.log(lboSelectedInfo);
		console.log(lboSelectedInfo.widget);
		
		if(lboSelectedInfo.index != 0){
			try{
				lboSelectedInfo.widget.destroy();
			}
			catch(e){
				console.log('destory오류' + e);
			}
			////console.log('1111');
			//lboSelectedInfo.widget = newWidget;
		}
		else {
			/*
			try{
				lboSelectedInfo.widget.destroy();
			}
			catch(e){
				console.log('destory오류' + e);
			}
			*/
			////console.log('1111');
			//lboSelectedInfo.widget = newWidget;
		}
		////console.log('2222');
		//debugger;
		//getSelectedInfoByWidget(lboSelectedInfo.widget);
		console.log('선택된 위젯2========================================',lboSelectedInfo.widget)
		//getSelectedInfoByWidget(lboSelectedInfo.widget);


		getSelectedInfoByWidget(newWidget);
		
		//debugger;
		this.showTreeItems();    	
		
		console.log('선택된 위젯3========================================',lboSelectedInfo.widget)
		//getSelectedInfoByWidget(lboSelectedInfo.widget);		
    },   
    removeProperty:function(){
		//console.log('..', lboSelectedInfo.widget);
		var strContentTemp = getStringAll();
		getSelectedInfoByWidget(lboSelectedInfo.widget);

		var propList = this.getPropertyList();
		var record = propList.getStore().getRange();
		//console.log('record', record);
		var eventList = this.getEventList();
		var eRecord = eventList.getStore().getRange();
		//console.log('eRecord', eRecord);
		//console.log('lboItem[lboSelectedInfo.index]', lboItem[lboSelectedInfo.index]);
		//console.log('lboSelectedInfo.index', lboSelectedInfo.index);
		var extObj = setInfoPropertyByRecord(lboItem[lboSelectedInfo.index], record, eRecord);
		//console.log('extObj', extObj);
		// 선택된 위젯정보를 읽어온다.
		getSelectedItemsIndex();
		//console.log('.selectedItemsIndex:',lboSelectedInfo.itemsIndex);
		
		//console.log('extObj::::::::',extObj);
		var newWidget = {};
		if(lboSelectedInfo.index == 0){
			lboSelectedInfo.parentWidget = this.getMainContainer().down('[name=renderArea]');
			newWidget = Ext.create(lboSelectedInfo.lboItem.name, extObj);
			//panel.down('[name=renderArea]')
			console.log('if 0일경우', extObj, lboSelectedInfo.parentWidget);
		}
		
		//console.log('extObj::', extObj);
		// 아이템들을 읽어온다. 
		var itemList = getChildArrayByExtId(lboSelectedInfo.extId);
		//console.log('itemList========================' + lboSelectedInfo.extId, itemList);

		//console.log('remove::::', lboSelectedInfo.parentWidget,lboSelectedInfo.widget );
        try{
		    lboSelectedInfo.parentWidget.remove(lboSelectedInfo.widget,false);
        }
        catch(e){
            console.log('에러체크에러체크에러체크에러체크에러체크에러체크에러체크에러체크에러체크에러체크', e);
        }
		////console.log('>>>>',lboSelectedInfo.parentWidget, extObj, lboSelectedInfo.itemsIndex);
		// 루트는 파일을 읽어오기때문에 별도 관리가 필요하다. 

		if(lboSelectedInfo.index == 0){
			console.log('========================0000');
			
			//debugger;
			var itemLen = newWidget.items.items.length;
			console.log(itemLen);
			
			for(var i = itemLen-1; i >= 0; i--)
			{
				console.log('========================1111:' + i,newWidget.items.items[i]);
				newWidget.remove(newWidget.items.items[i], true);
			}	
			
		}
		console.log('0000', lboSelectedInfo.parentWidget);
		//debugger;
		//console.log('========================2222',extObj ,'------');
		
		try{
			if(lboSelectedInfo.index == 0){
				lboSelectedInfo.parentWidget.add(newWidget);
				newWidget.show();
				//newWidget = lboSelectedInfo.parentWidget.add(extObj);
				//console.log(extObj, lboSelectedInfo.parentWidget);
				//newWidget = lboSelectedInfo.widget;
				//lboSelectedInfo.widget.render(lboSelectedInfo.parentWidget);
			}
			else {
				newWidget = lboSelectedInfo.parentWidget.insert(lboSelectedInfo.itemsIndex, extObj);
			}
		}
		catch(e){
			console.log(e);
			var tempMsg = '다음과 같은 이유로 위젯을 추가할 수 없습니다. 마지막 성공한 단계까지 저장하시고 다시 불러오겠습니까?\\n취소시 마지막 저장상태로 복구합니다.';
			if(getLboLang() == 'english'){
				tempMsg = 'I can\'t add widget. May I reload code?'
			}
			if(confirm(tempMsg + ' - ' + e)== true){
					
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					params:{
						path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app'+ 
							//lboFileSeperator + 'view'+ 
							lboFileSeperator + lboFolderName + 
							lboFileSeperator + lboFileName + '.js',
						content:strContentTemp
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						if(getLboLang() == 'english')
							alert('Saved.');
						else 
							alert('저장하였습니다.');
                        
                        // History저장시작
                        exCommon.saveHistory(
                            lboServerPath + 
							lboFileSeperator + 'lib'+ 
							lboFileSeperator + 'tmpljs'+ 
							lboFileSeperator + 'history'+ 
							lboFileSeperator + 'app'+ 
							//lboFileSeperator + 'view'+ 
							lboFileSeperator + lboFolderName + 
							lboFileSeperator + lboFileName + '.' + exCommon.getNowDateTime(), 
                            strContentTemp);                       
                        
						location.reload();
					},
					failure:function(res){
						if(getLboLang() == 'english')
							alert("Error occurr when saved  - " + res.responseText);
						else 
							alert("저장 중 오류가 발생하였습니다.:" + res.responseText);
					}
				});						
			}
			//this.showTreeItems();
			return;
		}
		console.log('1111', lboSelectedInfo.parentWidget);
		//debugger;

		//propertyCopyByWidget(newWidget);
		propertyCopyByWidget(newWidget);
		// 2015.05.19
		if(lboSelectedInfo.index != 0){
			for(i=0; i <itemList.length; i++){
				//console.log(i+':',itemList[i] );
				newWidget.add(Ext.getCmp(itemList[i].extId));
			}
		}
		else {
			//console.log('newWidget',newWidget);
			for(i=0; i <itemList.length; i++){
				console.log(i+':',itemList[i] );
				try{
					newWidget.add(Ext.getCmp(itemList[i].extId));
				}catch(e){
					console.log(e, '-------------->');
				}
			}
		}
		
		console.log('222', lboSelectedInfo.parentWidget);
		// 2015.05.19
		if(lboSelectedInfo.index != 0){		
			try{
				lboSelectedInfo.widget.destroy();
			}
			catch(e){
				console.log('destory오류' + e);
			}
			//console.log('1111');
			//lboSelectedInfo.widget = newWidget;
		}
		else {
			//lboSelectedInfo.widget.destroy();
			//lboSelectedInfo.widget = newWidget;
		}
		//console.log('2222');
		//debugger;
		/*
		console.log('3333', lboSelectedInfo.parentWidget);
		if(lboSelectedInfo.index == 0){
			//lboSelectedInfo.widget.refresh();
			console.log('lboSelectedInfo.parentWidget111', lboSelectedInfo.parentWidget);
			lboSelectedInfo.parentWidget.remove(lboSelectedInfo.widget, false);
			
			console.log('lboSelectedInfo.parentWidget222', lboSelectedInfo.parentWidget,lboSelectedInfo.widget);
			
			//lboSelectedInfo.parentWidget.updateLayout();
			lboSelectedInfo.widget.render(lboSelectedInfo.parentWidget);
			//lboSelectedInfo.widget.updateLayout();
			console.log('update layout');
			//this.getMainBar().getLayout().setActiveItem(lboSelectedInfo.parentWidget);	
		}	
		*/	
		getSelectedInfoByWidget(newWidget);
		console.log('4444', lboSelectedInfo.parentWidget);

		//debugger;
		this.showTreeItems();    	
    }         
});