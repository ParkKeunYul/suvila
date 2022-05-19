Ext.define('ExFrm.view.ide.IdeLeftMenu', {
    extend: 'Ext.tree.TreePanel',
    alias:'widget.ideleftmenu',
    requires:['ExFrm.view.ide.IdeLeftMenuController'],
    controller:'ideleftmenu',
    width:250,
    title:getLboLangItem('프로젝트 창'),
    collapsible:true,
    rootVisible:false,
    displayField:'name',
    preloadChildren: true,
    split:true,
    useArrows:true,
    isRootView:true,
	dockedItems:[
	{
		xtype:'toolbar',
		style:'background-color:orange',
		items:[
		{
			xtype:'tbspacer',
			flex:1
		},
		{
			xtype:'button',
			iconCls:'x-fa fa-folder',
			handler:'onCreateFolder'
		},{
			xtype:'button',
			iconCls:'x-fa fa-file',
			handler:'onCreateFile'
		},{
			xtype:'button',
			iconCls:'x-fa fa-pencil',
			handler:'onUpdate'
		},{
			xtype:'button',
			iconCls:'x-fa fa-trash',
			handler:'onDelete'
		},{
			xtype:'button',
			iconCls:'x-fa fa-upload',
			handler:'onUpload'
		},{
			xtype:'button',
			iconCls:'x-fa fa-download',
			handler:'onDownload'
		},{
			xtype:'button',
			iconCls:'x-fa fa-refresh',
			handler:function(){
				this.up('[isRootView=true]').getStore().load();
			}
		},{
			xtype:'tbspacer',
			flex:1
		}]
	}],
	viewConfig:{
		plugins: {
			ptype: 'treeviewdragdrop',
			ddGroup: 'dragtmplpartmake',              
		},
		copy:true
	},	
    store:{
    	type:'tree',
    	fields:['name', 'url'],
	 	proxy:{
			type:'ajax', 
			//url:'./resources/menu/LeftMenu.json',
			url:'./jsp/fileListAll.jsp?path=' + lboServerPath + lboUserServerPath,
			reader:{
				type:'json',
			}
		},
		autoload:true,
    },
    listeners:{
		itemclick:'onTreeClick',
    	itemdblclick:function(obj, selObj){
            //this.setCollapsed(true);
            //this.up('[isRootView=true]').setCollapsed(true);
            console.log('itemdblclick', selObj);
			if(selObj.data.leaf == false){
				return;
			}
			
            var fileName = "";
			if(selObj.data.type == 'app'){
			 	fileName = selObj.data.name.replace('Controller.js', '').replace('Model.js', '').replace('.js','');
			}
			else {
				fileName = selObj.data.name;
			}
            console.log('ideLeftMenu>>>>>', exCommon );
			var panel= Ext.create('Ext.panel.Panel',{
				closable:true,
	    		autoShow:true,
	    		idePanel:true,
	    		title:selObj.data.name,
				html:"<input type='hidden' id='fileUrl' value='" + selObj.data.url + "'>" + 
					 "<input type='hidden' id='fileName' value='" + selObj.data.name + "'>" + 
					 "<input type='hidden' id='filePath' value='" + selObj.data.path + "'>" + 
					 "<input type='hidden' id='filePathBf' value='" + selObj.data.pathBf + "'>" + 
					 "<input type='hidden' id='fileType' value='" + selObj.data.type + "'>" + 
					 "<iframe src=\'./indexide.jsp?lboLoadingMode=" + exCommon.getLoadingMode()  + 
					 	"&lboDebugMode=" + exCommon.getDebugMode() + 
						 "&lboFileUrl=" + selObj.data.url + 
						 "&lboFileName=" + selObj.data.name + 
						 "&lboFilePath=" + selObj.data.path + 
						 "&lboFilePathBf=" + selObj.data.pathBf + 
						 "&lboFileType=" + selObj.data.type +  "\'" +
						 " width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen>" + 
					 "</iframe>"
			});

			console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);		
			/*  		
			console.log(arguments);
	    	console.log('>>>>', selObj.data.url, selObj.data.name);
			var gController = ExFrm.app.getController('IdeController');
	 		gController.setMainBar(selObj.data.url,selObj.data.name,selObj.data.path);
	 		*/
   		},
   		afterrender:function(){
 			var me = this;
         	me.el.addListener('contextmenu', function (e){
         		console.log(arguments);
			    //e.stopPropagation();
			    /*
			    e.preventDefault();
			    e.cancelBubble = true;
				Ext.Msg.confirm('확인', '모든메뉴를 닫겠습니까?', function(btn,msg,obj){
					if(btn == 'yes'){
			    		for(var i= me.items.items.length-1; i>0; i--){
			    			me.items.items[i].destroy();
			    		}							
					}
				});
			    return false;
			    */
        	}); 	 			
		}
    }
});