Ext.define('ExFrm.view.ide.NewFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.newfile',
    selectedColumn:-1,
    selectedPropertyIndex:-1,
	retMethod:{},
	openerObj:{},
	init:function(){
		this.getViewModel().getStore('mainPartInfo').load();
	},
    onDblClickMain:function(dv, record, item, index, e){
    	console.log(arguments);
    	me = this;
    	//var fileName = record.data.name.substring(0,record.data.name.length - 5); 
    	this.lookupReference('path').setValue(lboServerPath);
    	this.lookupReference('panelLayout').setValue(record.data.name);	    	
    },
    onCreateFile:function(){
    	var panelLayout = this.lookupReference('panelLayout').getValue();
    	
    	var panelType = this.lookupReference('panelType').getValue();
    	var path = this.lookupReference('path').getValue();
    	var folderName = this.lookupReference('folderName').getValue();
    	var fileName = this.lookupReference('fileName').getValue();
    	var chkViewOnly = this.lookupReference('chkViewOnly').checked;
    	console.log('chkViewOnly', chkViewOnly);
    	
    	var me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp',
			params:{
				path:lboServerPath + 
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'main' + 
					lboFileSeperator + panelLayout
			},
			success:function(res){
				console.log('응답',res.responseText);
		    	var strPanel = res.responseText.trim();
		    	console.log('strPanel',strPanel);
		    	
		    	for(var i=0; i < 10; i++){
			    	strPanel = strPanel.replace('{@+id:appName}', lboApplicationName);
			    	strPanel = strPanel.replace('{@+id:path}', folderName.replace('/','.'));
			    	strPanel = strPanel.replace('{@+id:code}', fileName);
			    	strPanel = strPanel.replace('{@+id:panelType}', panelType);
			    	strPanel = strPanel.replace('{@+id:codeLowercase}', fileName.toLowerCase());
			    	strPanel = strPanel.replace('{@+id:items' + i + '}', '');
			    }
		    	
		    	
		    	/*
		    	if(panelType == 'ExPanelMain'){
					strPanel = "Ext.define('" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"',{\n" + 
							    "    extend: '" + lboApplicationName + ".widget.ExPanelMain',\n" + 
								"    alias:'widget."+ fileName.toLowerCase() + "',\n" + 
								"    requires:['" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"Controller',\n" + 
								"    		  '" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"Model'\n" + 
								"    ], \n" + 
								"    controller:'" + fileName.toLowerCase() + "',\n" + 
								"    viewModel:{\n" + 
								"    	type:'" + fileName.toLowerCase() + "'\n" + 
								"    }, \n" + 
								"    name:'" + fileName + "',\n" + 
								"    isRoot:true, \n" + 
								"    title:'타이틀',\n" + 
								"	 closable:true \n" +
								"});\n";    		
		    	}
		    	else if(panelType == 'ExWindowMain'){
					strPanel = "Ext.define('" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"',{\n" + 
							    "    extend: '" + lboApplicationName + ".widget.ExWindowMain',\n" +
								"    alias:'widget."+ fileName.toLowerCase() + "',\n" + 
								"    requires:['" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"Controller',\n" + 
								"    		  '" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"Model'\n" + 
								"    ], \n" + 
								"    controller:'" + fileName.toLowerCase() + "',\n" + 
								"    viewModel:{\n" + 
								"    	type:'" + fileName.toLowerCase() + "'\n" + 
								"    }, \n" + 
								"    name:'" + fileName + "',\n" + 
								"    title:'타이틀',\n" + 
								"    isRoot:true,\n" + 
								"    width:300,\n" + 
								"    height:200,\n"+ 
								"	 closable:true \n" +
								"});\n";     	
		    	}
		    	else if(panelType == 'ExPanelSub'){
					strPanel = "Ext.define('" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"',{\n" + 
							    "    extend: '" + lboApplicationName + ".widget.ExPanelSub',\n" +
								"    alias:'widget."+ fileName.toLowerCase() + "',\n" + 
								"    requires:['" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"Controller',\n" + 
								"    		  '" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName +"Model'\n" + 
								"    ], \n" + 
								"    controller:'" + fileName.toLowerCase() + "',\n" + 
								"    viewModel:{\n" + 
								"    	type:'" + fileName.toLowerCase() + "'\n" + 
								"    }, \n" + 
								"    name:'" + fileName + "',\n" + 
								"    title:'타이틀',\n" + 
								"	 closable:true \n" +
								"});\n";     	
		    	}
		    	*/
		    	var strPanelController ="Ext.define('" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName + "Controller', {\n" + 
									    "	extend: 'Ext.app.ViewController',\n" + 
									    "	alias: 'controller."+ fileName.toLowerCase() + "'\n" + 
									    "});\n";
		
		    	var strPanelModel = 	"Ext.define('" + lboApplicationName + ".view." + folderName.replace('/','.') + "." + fileName + "Model', {\n" + 
									    "	extend: 'Ext.app.ViewModel',\n" + 
									    "	alias: 'viewmodel."+ fileName.toLowerCase() + "',\n" +
									    "   stores:{\n" + 
									    "   }\n" +  
									    "});\n";
		    	var tempAjaxPass = true;
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					async:false,
					params:{
						path: lboServerPath + lboUserServerPath +  
							lboFileSeperator + 'app' + 
							//lboFileSeperator + 'view' + 
							lboFileSeperator + folderName + 
							lboFileSeperator + fileName + '.js',
						content:strPanel
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							tempAjaxPass = false;
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						Ext.Msg.alert(getLboLangItem('확인'),getLboLangItem('파일을 생성했습니다.'));
                        
                        // History저장시작
                        exCommon.saveHistory(
                            lboServerPath + 
								lboFileSeperator + 'lib' + 
								lboFileSeperator + 'tmpljs' + 
								lboFileSeperator + 'history' + 
								lboFileSeperator + 'app' + 
								//lboFileSeperator + 'view' + 
								lboFileSeperator + folderName + 
								lboFileSeperator + fileName + '.' + exCommon.getNowDateTime(), 
                            strPanel);      
                                                    
					},
					failure:function(res){
						tempAjaxPass = false;
						Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
					}
				});	
				
				// 다음 프로세스 방지
				if(tempAjaxPass == false)
					return;

				if(chkViewOnly != true){
					Ext.Ajax.request({
						type:'ajax',
						url:'./jsp/fileWrite.jsp',
						async:false,
						params:{
							path: lboServerPath + lboUserServerPath + 
								lboFileSeperator + 'app' + 
								//lboFileSeperator + 'view' + 
								lboFileSeperator + folderName + 
								lboFileSeperator + fileName + 'Controller.js',
							content:strPanelController
						},
						success:function(res){
							var obj = JSON.parse(res.responseText);
							console.log('obj', obj);
							if(obj.success == false) {
								tempAjaxPass = false;
								Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
								return;
							}
							Ext.Msg.alert(getLboLangItem('확인'),getLboLangItem('파일을 생성했습니다.'));
                            // History저장시작
                            exCommon.saveHistory(
                                lboServerPath + 
									lboFileSeperator + 'lib' + 
									lboFileSeperator + 'tmpljs' + 
									lboFileSeperator + 'history' + 
									lboFileSeperator + 'app' + 
									//lboFileSeperator + 'view' + 
									lboFileSeperator + folderName + 
									lboFileSeperator + fileName + 'Controller.' + exCommon.getNowDateTime(), 
                                strPanelController);                              
						},
						failure:function(res){
							tempAjaxPass = false;
							Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
						}
					});	

					// 다음 프로세스 방지
					if(tempAjaxPass == false)
						return;

					Ext.Ajax.request({
						type:'ajax',
						url:'./jsp/fileWrite.jsp',
						params:{
							path: lboServerPath + lboUserServerPath +  
								lboFileSeperator + 'app' + 
								//lboFileSeperator + 'view' + 
								lboFileSeperator + folderName + 
								lboFileSeperator + fileName + 'Model.js',
							content:strPanelModel
						},
						success:function(res){
							var obj = JSON.parse(res.responseText);
							console.log('obj', obj);
							if(obj.success == false) {
								Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
								return;
							}
							Ext.Msg.alert(getLboLangItem('확인'),getLboLangItem('파일을 생성했습니다.'));
                            // History저장시작
                            exCommon.saveHistory(
                                lboServerPath + 
									lboFileSeperator + 'lib' + 
									lboFileSeperator + 'tmpljs' + 
									lboFileSeperator + 'history' + 
									lboFileSeperator + 'app' + 
									//lboFileSeperator + 'view' + 
									lboFileSeperator + folderName + 
									lboFileSeperator + fileName + 'Model.' + exCommon.getNowDateTime(), 
                                strPanelModel);                               
						},
						failure:function(res){
							Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
						}
					});			
			    	this.getView().destroy();
			    }						
			},
			failure:function(res){
				Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
			}
		});    	
    },
    onCreateNewStore:function(){
    	var storeName = this.lookupReference('storeName').getValue();
    	var proxyType = this.lookupReference('proxyType').getValue();
    	var url = this.lookupReference('url').getValue();
    	var readerType = this.lookupReference('readerType').getValue();
    	var rootProperty = this.lookupReference('rootProperty').getValue();
    	var pageSize = this.lookupReference('pageSize').getValue();
    	var totalProperty = this.lookupReference('totalProperty').getValue();
    	
    	var autoLoad = this.lookupReference('autoLoad').getValue();
		var strCont = '';     	
		    strCont = strCont + '    ' + storeName + ':{\n'; 
		    strCont = strCont + '        fields:[\'field1\'],\n' ; 
		    strCont = strCont + '        proxy:{\n' ;
		    strCont = strCont + '            type:\'' + proxyType + '\',\n' ; 
		    strCont = strCont + '            url:\'' + url + '\',\n' ;
		    strCont = strCont + '            reader:{\n' ;
		    strCont = strCont + '                type:\'' + readerType +'\',\n'; 
		    strCont = strCont + '                rootProperty:\'' + rootProperty +'\',\n' ; 
		    strCont = strCont + '                totalProperty:\'' + totalProperty + '\',\n' ; 
		    strCont = strCont + '                keepRawData:true\n' ;
		    strCont = strCont + '            }\n' ;
		    strCont = strCont + '        },\n' ;
		    strCont = strCont + '        autoLoad:' + autoLoad + ',\n' ; 
		    strCont = strCont + '        pageSize:' + pageSize + '\n' ;
		    strCont = strCont + '    }\n';

	
		var panel = Ext.create('Ext.panel.Panel',{
			reference:'storeList' + lboModelIdCount,
			padding:'10 10 10 10',
			items:[
			{
				xtype:'textfield',
				fieldLabel:getLboLangItem('스토어명'),
				reference:'storeName' + lboModelIdCount,
				value:lboModelStore[lboModelIdCount].name
			},{
				xtype:'textfield',
				fieldLabel:'type',
				reference:'proxyType' + lboModelIdCount,
				value:lboModelStore[lboModelIdCount].proxyType
				
			},{
				xtype:'textfield',
				fieldLabel:'url',
				reference:'url' + lboModelIdCount,
				value:lboModelStore[lboModelIdCount].url
			},{
				xtype:'textfield',
				fieldLabel:'type(reader)',
				reference:'readerType' + lboModelIdCount,
				value:lboModelStore[lboModelIdCount].readerType
			},{
				xtype:'textfield',
				fieldLabel:'rootProperty',
				reference:'rootProperty' + lboModelIdCount,
				value:lboModelStore[lboModelIdCount].rootProperty
			},{
				xtype:'textfield',
				fieldLabel:'pageSize',
				reference:'pageSize' + lboModelIdCount,
				value:lboModelStore[lboModelIdCount].pageSize
			},{
				xtype:'textfield',
				fieldLabel:'autoLoad',
				reference:'autoLoad' + lboModelIdCount,
				value:lboModelStore[lboModelIdCount].autoLoad
			}]
		});
		lboModelIdCount++;
		panelModelView.down('[name=viewModelList]').add(panel);
		panelModelView.down('[name=viewModelListCount]').setValue(lboModelIdCount);
    }
});