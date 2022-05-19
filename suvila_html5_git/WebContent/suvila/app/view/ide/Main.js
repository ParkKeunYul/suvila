Ext.define('ExFrm.view.ide.Main', {
    extend: 'Ext.panel.Panel',

    requires: [
    	'ExFrm.view.widget.WidgetGroup',
    	'ExFrm.view.ide.WidgetList',
    	'ExFrm.view.ide.WidgetContainerList',
    	'ExFrm.view.ide.WidgetGroupList',    	//'ExFrm.view.widget.ExComponent',
		'ExFrm.view.ide.IdeLeftMenu',
		'ExFrm.view.ide.IdeToolsMenu',
		'ExFrm.view.ide.TmplLeftMenu',
		//'ExFrm.view.user.UserShowList',
		'ExFrm.view.ide.MainController',
		'ExFrm.view.ide.TmplPartList',
		'ExFrm.view.ide.GridProp'
    ],
    xtype: 'idemain',
    controller: 'idemain',
    layout: 'border',
    items: [
    /*
    {
    	region:'north',
    	layout:'hbox',
    	items:[
    	{
    		xtype:'button',
    		text:'새로운 파일',
    		handler:'onNewFile'
    	},{
    		xtype:'button',
    		text:'새로운 파일(윈도우)',
    		handler:'onNewFileWindow'
    	},{
    		xtype:'button',
    		text:'새로운 파일(목록)',
    		handler:'onNewFileList'
    	},{
    		xtype:'button',
    		text:'파일저장',
    		handler:'onSaveFile'
    	},{
    		flex:1
    	},{
    		xtype:'button',
    		text:'환경설정'
    	}]
    },
    {
        region:'west',
        xtype:'ideleftmenu',
        width:200,
    },{
    	region:'west',
    	xtype:'tabpanel',
    	width:100,
    	collapsible:true,
    	items:[
    	{
	    	xtype:'idetoolsmenu'
	    }]
    },*/{
    	region:'east',
    	xtype:'tabpanel',
    	//height:'100%',
        collapsed:true,
    	width:250,
    	layout:{
    		type:'vbox',
    		align:'stretch'
    	},
    	bodyStyle:'background:red',
    	collapsible:true,
    	title:getLboLangItem('도구상자'),
    	split:true,
		tools:[{
			type:'help',
			handler:function(){
				Ext.Msg.alert('도움말', '<font color="bule">위젯을 사용하려면...</font><br>위젯을 드래그앤 드롭하여 왼쪽의 파일구조창에 드롭하여 사용한다.<br><font color="bule">위젯을 추가하려면...</font><br>왼쪽의 프로젝트 구조창에서 view->widget 폴더에 새로만든 위젯을 추가하고 WidgetGroup.js 파일에 위젯 URL을 추가한다. 추가 후 화면을 갱신하면 도구상자에 위젯목록이 추가된다. 위젯 이미지는 용량 관리상 개인이 추가할 수 없으며 관리자에게 이미지와 위젯명을 회원가입시 등록된 이메일로 보낼 경우 등록이 가능하다');	
			}
		}], 
	 	listeners: {
	        resize: Ext.Function.bind(function(comp, width, height,oldWidth, oldHeight, eOpts) {
	            comp.setWidth(width);
	            comp.setHeight(height);
	            //comp.doLayout();
	        }, this),
			afterrender:function(){
				var a = this.add({
					title:getLboLangItem('화면구성'),
					scrollable:true,
					xtype:'widgetcontainerlist',
					flex:1,
					listeners:{
						click:function(){
							this.updateLayout();
						}
					}	    	
				});
				a.updateLayout();
				
				var b = this.add({
					title:getLboLangItem('위젯그룹'),
					scrollable:true,
					xtype:'widgetgrouplist',
					flex:1,
					listeners:{
						click:function(){
							this.updateLayout();
						}
					}	    	
				});	
				b.updateLayout();			
			}
	    },    	
    	items:[
    	{
    		title:getLboLangItem('단일위젯'),
    		scrollable:true,
	    	xtype:'widgetlist',
			flex:1,
            listeners:{
                click:function(){
                    this.updateLayout();
                }
            }
	    }]
    },{
    	region:'center',
    	name:'mainSize',
    	bodyStyle:'background:darkgray',
    	//width:960,
    	//height:700,
    	scrollable:true,
		layout:'vbox',
    	items:[
    	{
	        //region: 'center',
			flex:1,
	        xtype: 'tabpanel',
	        name: 'mainbar',
	        isIde:true,
	        width:1024,//'98%',
	        height: 768,//'98%',
			//scrollable:true,
	        items:[
	        ]
    	}]
    },{
    	region:'east',
    	width:250,
    	collapsible:true,
    	title:getLboLangItem('파일구조'),
		tools:[
		{
			type:'minus',
			handler:'onDeleteItem'
		}], 
    	split:true,
	 	listeners: {
	        resize: Ext.Function.bind(function(comp, width, height,oldWidth, oldHeight, eOpts) {
	            //comp.doLayout();
	            comp.setWidth(width);
	            comp.setHeight(height);
	        }, this)
	    },  
	    layout:'border',  	
    	items:[
    	/*
    	{
    		layout:'hbox',
    		items:[
    		{
    			xtype:'button',
    			text:'UP',
    			handler:function(){
    				console.log('up:',selectedInfo.itemsIndex, selectedInfo.parentWidget, selectedInfo.widget);
    				selectedInfo.parentWidget.insert(selectedInfo.itemsIndex-1,selectedInfo.widget);
    			}
    		},{
    			xtype:'button',
    			text:'DOWN',
    			handler:function(){
    				console.log('up:',selectedInfo.itemsIndex, selectedInfo.parentWidget, selectedInfo.widget);
    				selectedInfo.parentWidget.insert(selectedInfo.itemsIndex+1,selectedInfo.widget);
    			}
    		},{
    			xtype:'button',
    			text:'테스트',
    			handler:function(){
    				for(var i=0; i< lboIdCount; i++){
    					console.log('i:' + i + ' -----------------------------------');
    					console.log('extId:' + lboItem[i].extId);
    					console.log('parentExtId:' + lboItem[i].parentExtId);
    					console.log('itemsIndex:' + lboItem[i].itemsIndex);
    					console.log('depth:' + lboItem[i].depth);
    					console.log('extId:' + lboItem[i].extId);
    				}
    			}
    		},{
    			xtype:'button',
    			text:'삭제'
    		},{
    			xtype:'button',
    			text:'새로고침',
    			handler:function(){
    				ExFrm.app.getController('IdeController').showTreeItemsOrder();
    			}
    		},{
    			xtype:'button', 
    			text:'새로고침2',
    			handler:function(){
    				ExFrm.app.getController('IdeController').showTreeItems();
    			}
    		}]
    	},*/
    	{
    		xtype:'treepanel',
    		name:'structure', 
    		region:'north',
    		store:{
    			root:{
					expanded:true,
				    children: [
				        { text: '프로젝트', leaf: true }
				    ]
				}
    		},
    		height:300,
    		width:'100%',
			rootVisible: false,
            viewConfig:{
	            plugins: {
	                ptype: 'treeviewdragdrop',
	                ddGroup: 'dragtmplpartmake',              
	            },
                listeners:{
                    itemclick:function(view, dataObj, item, index,eventObj){
                        console.log('onItemClick', arguments);
                        selectedInfoItemNode = dataObj;
                        selectedFolderNode = dataObj.parentNode;
                        ExFrm.app.getController('IdeController').selectWidget(Ext.getCmp(dataObj.data.extId));
                    },
                    drop:function(before,afterObj,beforeObj, direction ){
                    	console.log('.................', arguments);
                    	//debugger;
                    	console.log('before.className', afterObj.copy);
                    	//div.x-grid-dd-wrap ddel
                    	if(afterObj.copy != null && 
                    	   afterObj.copy == true){
                    	   	console.log('beforeObj', beforeObj);
							//selectedInfoItemNode = beforeObj;
	                        //selectedFolderNode = beforeObj.parentNode;
	                        //debugger;
	                        console.log('이름을가져옴',afterObj.records[0].data.name);
	                       	// 여기
	                       	ExFrm.app.getController('IdeController').selectWidget(Ext.getCmp(beforeObj.data.extId));
	                       	if(afterObj.records[0].data.type=='widget'){
								Ext.Ajax.request(
								{
									type:'ajax',
									url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
										lboFileSeperator + 'app' + 
										lboFileSeperator + 'view' + 
										lboFileSeperator + 'widget' + 
										lboFileSeperator + afterObj.records[0].data.name + '.js',
									callback:function(obj, success, resObj){
										console.log(arguments);
										console.log(resObj.responseText);
							    	
								    	//console.log('setMainBar', url, menuName);
								    	//parseTot();
								    	var strCont = resObj.responseText;
								    	var startIndex = strCont.indexOf('{');
								    	var endIndex = strCont.lastIndexOf('}');
								    	console.log('strCont.substring(startIndex, endIndex+1)', strCont.substring(startIndex, endIndex+1));
								    	var widget = Ext.decode(strCont.substring(startIndex, endIndex+1));
								    	console.log('>>>', widget);
								    	console.log('str>>>', widget.exInitStr);
								    	setTimeout(function(){                   	   	
	                    					ExFrm.app.getController('IdeController').addItem(
	                    					widget.exInitStr);
	                    				}, 500);
									}
								});	   
							}     
	                       	else if(afterObj.records[0].data.type=='containerwidget'){
								Ext.Ajax.request(
								{
									type:'ajax',
									url:'./jsp/fileRead.jsp?path=' + lboServerPath + lboUserServerPath + 
										lboFileSeperator + 'app' + 
										lboFileSeperator + 'view' + 
										lboFileSeperator + 'widget' + 
										lboFileSeperator + 'container' + 
										lboFileSeperator + afterObj.records[0].data.name + '.js',
									callback:function(obj, success, resObj){
										console.log(arguments);
										console.log(resObj.responseText);
							    	
								    	//console.log('setMainBar', url, menuName);
								    	//parseTot();
								    	var strCont = resObj.responseText;
								    	var startIndex = strCont.indexOf('{');
								    	var endIndex = strCont.lastIndexOf('}');
								    	console.log('strCont.substring(startIndex, endIndex+1)', strCont.substring(startIndex, endIndex+1));
								    	var widget = Ext.decode(strCont.substring(startIndex, endIndex+1));
								    	console.log('>>>', widget);
								    	console.log('str>>>', widget.exInitStr);
								    	setTimeout(function(){                   	   	
	                    					ExFrm.app.getController('IdeController').addItem(
	                    					widget.exInitStr);
	                    				}, 500);
									}
								});	   
							} 							
							else if(afterObj.records[0].data.type=='groupwidget'){   
								Ext.Ajax.request(
								{
									type:'ajax',
									url:'./jsp/fileRead.jsp?path=' + lboServerPath + 
										lboFileSeperator + 'lib' + 
										lboFileSeperator + 'tmpljs' + 
										lboFileSeperator + 'groupwidget' + 
										lboFileSeperator + afterObj.records[0].data.name + '.js',
									callback:function(obj, success, resObj){
										console.log(arguments);
										console.log(resObj.responseText);
							    	
								    	//console.log('setMainBar', url, menuName);
								    	//parseTot();
								    	var strCont = resObj.responseText.trim();
								    	//var startIndex = strCont.indexOf('{');
								    	//var endIndex = strCont.lastIndexOf('}');
								    	//console.log('strCont.substring(startIndex, endIndex+1)', strCont);
								    	//var widget = Ext.decode(strCont);
								    	//console.log('>>>', widget);
								    	//console.log('str>>>', widget.exInitStr);
								    	setTimeout(function(){                   	   	
	                    					ExFrm.app.getController('IdeController').addItemGroup(
	                    					strCont);
	                    				}, 500);
									}
								});	
							}             
	                        /*
	                        console.log('afterObj.records[0].data.initStr', afterObj.records[0].data.initStr);
	                        //debugger; 
	                        
	                        setTimeout(function(){                   	   	
                    				ExFrm.app.getController('IdeController').addItem(
                    					afterObj.records[0].data.initStr);
                    				}, 500);
                    		*/
                    		//debugger;
                    	}
                    	else
                    	{
	                    	if(direction == 'before'){
		                    	console.log('beforeObj.data.extId',beforeObj.data.extId);
		                    	console.log('tmpLboItemAf',tmpLboItemAf);
		                    	// 새롭게 드롭할 건
		                    	var tmpLboItemAf = getInfoByExtId(afterObj.records[0].data.extId);
		                    	var tmpIndexAf = tmpLboItemAf.itemsIndex;  
		                    	var tmpLboItemsListAf = getChildArrayByExtId(tmpLboItemAf.parentExtId);
		                    	for(var i=0; i <tmpLboItemsListAf.length; i++){
		                    		if(tmpLboItemsListAf[i].itemsIndex > tmpLboItemAf.itemsIndex ){
		                    			tmpLboItemsListAf[i].itemsIndex--;
		                    		}
		                    	} 	                    	
		                    	// 기존건..
		                    	var tmpLboItemBf = getInfoByExtId(beforeObj.data.extId);
		                    	console.log('tmpLboItemBf',tmpLboItemBf); // 이전건. 
		                    	console.log('afterObj',afterObj); // 이전건
		                    	console.log('tmpLboItemBf',tmpLboItemBf); 
		                    	var itemIndex = tmpLboItemBf.itemsIndex;
		                    	var tmpLboItemsListBf = getChildArrayByExtId(tmpLboItemBf.parentExtId);
		                    	for(var i=0; i <tmpLboItemsListBf.length; i++){
		                    		if(tmpLboItemsListBf[i].itemsIndex >= tmpLboItemBf.itemsIndex ){
		                    			tmpLboItemsListBf[i].itemsIndex++;
		                    		}
		                    	}
		                    	console.log('tmpLboItemBf.parentExtId', tmpLboItemBf.parentExtId, itemIndex);
		                    	// 옮기려고하는데상에서
		                    	/*
		                    	try{
		                    		Ext.getCmp(afterObj.records[0].data.extId).destroy();
		                    	}catch(e){
		                    		console.log(e);
		                    	}
		                    	*/
		                    	try{
		                    		Ext.getCmp(tmpLboItemAf.parentExtId).remove(Ext.getCmp(afterObj.records[0].data.extId),false);
		                    	}
		                    	catch(e){
		                    		console.log('::::::::::::', e);
		                    	}
		                    	// 옮긴후의 대상으로
		                    	//console.log('위치;' + tmpIndexBf.itemsIndex);
		                    	Ext.getCmp(tmpLboItemBf.parentExtId).insert(itemIndex, Ext.getCmp(afterObj.records[0].data.extId));
		                    	Ext.getCmp(tmpLboItemBf.parentExtId).updateLayout();
		                    	tmpLboItemAf.parentExtId = tmpLboItemBf.parentExtId;
		                    	tmpLboItemAf.itemsIndex = itemIndex;
		                    }
		                    else if(direction == 'after'){
		                    	console.log('beforeObj.data.extId',beforeObj.data.extId);
		                    	
		                    	// 새롭게 드롭할 건
		                    	var tmpLboItemAf = getInfoByExtId(afterObj.records[0].data.extId);
		                    	console.log(':::>' + afterObj.records[0].data.extId);
		                    	var tmpIndexAf = tmpLboItemAf.itemsIndex;  
		                    	var tmpLboItemsListAf = getChildArrayByExtId(tmpLboItemAf.parentExtId);
		                    	console.log(':::>>' + tmpLboItemsListAf);
		                    	for(var i=0; i < tmpLboItemsListAf.length; i++){
		                    		console.log(tmpLboItemsListAf[i].itemsIndex +'>' +  tmpLboItemAf.itemsIndex )
		                    		if(tmpLboItemsListAf[i].itemsIndex > tmpLboItemAf.itemsIndex ){
		                    			tmpLboItemsListAf[i].itemsIndex--;
		                    		}
		                    	} 	 
		                    	for(var i=0; i <tmpLboItemsListAf.length; i++){
		                    		if(tmpLboItemsListAf[i].itemsIndex >= tmpLboItemsListAf.itemsIndex ){
		                    			console.log('1>>>>' + tmpLboItemsListAf[i].itemsIndex);
		                    		}
		                    	}	                    	                   	
		                    	// 기존건..
		                    	var tmpLboItemBf = getInfoByExtId(beforeObj.data.extId);
		                    	console.log('tmpLboItemBf',tmpLboItemBf); // 이전건. 
		                    	console.log('afterObj',afterObj); // 이전건
		                    	console.log('tmpLboItemBf',tmpLboItemBf); 
		                    	var itemIndex = tmpLboItemBf.itemsIndex;
		                    	var tmpLboItemsListBf = getChildArrayByExtId(tmpLboItemBf.parentExtId);
		                    	for(var i=0; i <tmpLboItemsListBf.length; i++){
		                    		if(tmpLboItemsListBf[i].itemsIndex >= tmpLboItemBf.itemsIndex +1 ){
		                    			tmpLboItemsListBf[i].itemsIndex++;
		                    		}
		                    	}
		                    	for(var i=0; i <tmpLboItemsListBf.length; i++){
		                    		if(tmpLboItemsListBf[i].itemsIndex >= tmpLboItemBf.itemsIndex+1 ){
		                    			console.log('2>>>>' + tmpLboItemsListBf[i].itemsIndex);
		                    		}
		                    	}	                    	
		                    	console.log('tmpLboItemBf.parentExtId', tmpLboItemBf.parentExtId, itemIndex);
		                    	// 옮기려고하는데상에서
		                    	try{
		                    		Ext.getCmp(tmpLboItemAf.parentExtId).remove(Ext.getCmp(afterObj.records[0].data.extId),false);
		                    	}
		                    	catch(e){
		                    		console.log('::::::::::::', e);
		                    	}
		                    	// 옮긴후의 대상으로
		                    	//console.log('위치;' + tmpIndexBf.itemsIndex);
		                    	Ext.getCmp(tmpLboItemBf.parentExtId).insert(itemIndex+1, Ext.getCmp(afterObj.records[0].data.extId));
		                    	Ext.getCmp(tmpLboItemBf.parentExtId).updateLayout();
		                    	tmpLboItemAf.parentExtId = tmpLboItemBf.parentExtId;
		                    	tmpLboItemAf.itemsIndex = itemIndex+1;             	
		                    }
		                    else if(direction == 'append'){
		                    	console.log('beforeObj.data.extId',beforeObj.data.extId);
		                    	
		                    	// 새롭게 드롭할 건
		                    	var tmpLboItemAf = getInfoByExtId(afterObj.records[0].data.extId);
		                    	console.log(':::>' + afterObj.records[0].data.extId);
		                    	var tmpIndexAf = tmpLboItemAf.itemsIndex;  
		                    	var tmpLboItemsListAf = getChildArrayByExtId(tmpLboItemAf.parentExtId);
		                    	console.log(':::>>' + tmpLboItemsListAf);
		                    	for(var i=0; i <tmpLboItemsListAf.length; i++){
		                    		console.log(tmpLboItemsListAf[i].itemsIndex +'>' +  tmpLboItemAf.itemsIndex )
		                    		if(tmpLboItemsListAf[i].itemsIndex > tmpLboItemAf.itemsIndex ){
		                    			tmpLboItemsListAf[i].itemsIndex--;
		                    		}
		                    	} 	 
		                    	for(var i=0; i <tmpLboItemsListAf.length; i++){
		                    		if(tmpLboItemsListAf[i].itemsIndex >= tmpLboItemsListAf.itemsIndex ){
		                    			console.log('1>>>>' + tmpLboItemsListAf[i].itemsIndex);
		                    		}
		                    	}	                    	                   	
		                    	// 기존건..
		                    	var tmpLboItemBf = getInfoByExtId(beforeObj.data.extId);
		                    	console.log('tmpLboItemBf',tmpLboItemBf); // 이전건. 
		                    	console.log('afterObj',afterObj); // 이전건
		                    	console.log('tmpLboItemBf',tmpLboItemBf); 
		                    	var itemIndex = tmpLboItemBf.itemsIndex;
		                    	var tmpLboItemsListBf = getChildArrayByExtId(tmpLboItemBf.extId);
		                    	var countItems = 0;
		                    	for(var i=0; i <tmpLboItemsListBf.length; i++){
		                    		countItems++;
		                    	}	                    	
		                    	console.log('tmpLboItemBf.parentExtId', tmpLboItemBf.parentExtId, itemIndex);
		                    	console.log('Ext.getCmp(afterObj.records[0].data.extId)', afterObj.records[0].data.extId, Ext.getCmp(afterObj.records[0].data.extId));
		                    	// 옮기려고하는데상에서
		                    	try{
		                    		Ext.getCmp(tmpLboItemAf.parentExtId).remove(Ext.getCmp(afterObj.records[0].data.extId),false);
		                    	}
		                    	catch(e){
		                    		console.log(':::::::::::::::::::::::::',e);
		                    	}
		                    	// 옮긴후의 대상으로
		                    	//console.log('위치;' + tmpIndexBf.itemsIndex);
		                    	Ext.getCmp(tmpLboItemBf.extId).add(Ext.getCmp(afterObj.records[0].data.extId));
		                    	Ext.getCmp(tmpLboItemBf.extId).updateLayout();
		                    	tmpLboItemAf.parentExtId = tmpLboItemBf.extId;
		                    	tmpLboItemAf.itemsIndex = countItems;  	                    	
		                    }
		                }
                    },
                    beforedrop:function( node, data, overModel, dropPosition, dropHandlers, eOpts ){
                    	
                    	if(data.copy != null && 
                    	   data.copy == true){
                    	   	dropHandlers.wait = true;
                    	   	if(dropPosition == 'append'){
                    	   		dropHandlers.processDrop();
                    	   	}
                    	   	else {
                    	   		Ext.Msg.alert('오류', '정확히 폴더에 드롭하십시오');
                    	   		dropHandlers.cancelDrop();
                    	   	}
                    	}
                    }                     
                }
            },
	    	split:true,
		 	listeners: {
		        resize: Ext.Function.bind(function(comp, width, height,oldWidth, oldHeight, eOpts) {
		            //comp.doLayout();
		            comp.setWidth(width);
		            comp.setHeight(height);		            
		        }, this)
		    },                      
    	},{
    		xtype:'tabpanel',
    		flex:2,
    		width:'100%', 
    		region:'center',   		
    		items:[
    		{
    			title:getLboLangItem('속성'),
    			layout:'vbox',   			
    			items:[
				{    			
	    			title:getLboLangItem('속성'),
		    		xtype:'grid',
		    		name:'property',
		    		reference:'gridProperty',
		    		tools:[
                    {
                        type:'gear',
                        handler:'onSpecialProperty'
                    },{
                        type:'help',
                        handler:'onHelpProperty'                         
                    },{
                        type:'help',
                        handler:'onHelpDocument'  
                    },
		    		{
		    			type:'plus',
		    			handler:'onAddProperty'
		    		}], 		    		
		    		flex:2,
		    		width:'100%',
		    		//store:Ext.getStore('PropertyStore'),
		    		store:{
		    			fields:['propertyName', 'propertyValue', 'propertyButton'],
						//data:[{propertyName:'aa', propertyValue:'bb'}],
		    		},
		            //plugins: {
		            //    ptype: 'cellediting',
		            //    clicksToEdit: 2
		            //},         		
		    		columns:[{
		    			text:'name',
		    			dataIndex:'propertyName',
		    			width:100
		    		},{
		    			text:'value',
		    			dataIndex:'propertyValue',
		    			flex:1,
		    		},{
						xtype:'actioncolumn',
						text:getLboLangItem('삭제'),
						align:'center',
						width:80,
						items:[{
							icon:'./lib/tmpljs/resources/img/icon_delete.png',
							handler:'onDeleteProperty'
						}]
		    		}],
		         	listeners:{
			    		celldblclick:'onCellClickProperty'
			    	} 
			    }]      
	    	},{
	    		title:getLboLangItem('이벤트'),
   				layout:'vbox',  				
    			items:[
				{ 	    		
	    			title:getLboLangItem('이벤트'),
		    		xtype:'grid',
		    		name:'event',
		    		reference:'gridEvent',	   
		    		tools:[
		    		{
		    			type:'plus',
		    			handler:'onAddEvent'
		    		}],	 		    		 		
		    		flex:2,
		    		width:'100%',
		    		//store:Ext.getStore('PropertyStore'),
		    		store:{
		    			fields:['propertyName', 'propertyValue', 'propertyButton'],
						//data:[{propertyName:'aa', propertyValue:'bb'}],
		    		},
		            //plugins: {
		            //    ptype: 'cellediting',
		            //    clicksToEdit: 2
		            //},         		
		    		columns:[{
		    			text:'name',
		    			dataIndex:'propertyName',
		    			width:100
		    		},{
		    			text:'value',
		    			dataIndex:'propertyValue',
		    			flex:1,
		    		},{
						xtype:'actioncolumn',
						text:'삭제',
						align:'center',
						width:80,
						items:[{
							icon:'./lib/tmpljs/resources/img/icon_delete.png',
							handler:'onDeleteEvent'
						}]
		    		}],
		         	listeners:{
			    		celldblclick:'onCellClickEvent'
			    	} 	
			    }]    		
	    	},{
				title:getLboLangItem('추가기능'),
				scrollable:true,
				layout:{
					type:'vbox',
					align:'stretch'	
				},
				padding:'10 10 10 10',
				items:[
				{
					html:getLboLangItem('아이템이 아닌 속성을 관리합니다.')
				},{
					xtype:'button',
					text:getLboLangItem('컬럼') + getLboLangItem('추가'),
					handler:'onSpecialProperty'
				},{
					xtype:'tbspacer',
					height:20
				},{
					xtype:'button',
					text:'docked ' + getLboLangItem('추가'),
					handler:'onToolBarProperty'
				}]
			}]	
	    }]
    }],
    listeners:{
    	afterrender:function(){
    		//setTimeout(function(){
    			ExFrm.app.getController('IdeController').setMainBar( lboFileUrl,lboFileName,lboFilePath);
    		//},1000);
    	}
	}
});
