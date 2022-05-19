Ext.define('ExFrm.view.ide.ModelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modelview',
    folderName:'',
    fileName:'',
    calledByOther:function(params){
    	this.folderName = params.folderName;
    	this.fileName = params.fileName;
    },
    onSave:function(){
    	var me = this;
		var strContent = 'Ext.define(\'' + lboApplicationName + '.view.' + this.folderName + '.' + this.fileName + 'Model\', {\n' + 
				'    extend: \'Ext.app.ViewModel\',\n' + 
				'    alias: \'viewmodel.' + this.fileName.toLowerCase() + '\', \n' + 
				'    stores:{ \n';
		for(var i=0; i < this.lookupReference('viewModelListCount').getValue(); i++){
			var storeName = this.lookupReference('storeName' + i).getValue();
			var proxyType = this.lookupReference('proxyType' + i).getValue();
			var url = this.lookupReference('url' + i).getValue();
			var readerType = this.lookupReference('readerType' + i).getValue();
			var rootProperty = this.lookupReference('rootProperty' + i).getValue();
			var pageSize = this.lookupReference('pageSize' + i).getValue();
			var autoLoad = this.lookupReference('autoLoad' + i).getValue();
			
			if(i != 0 )
			{
				strContent = strContent + ',\n';
			}

		    strContent = strContent + '    ' + storeName + ':{\n' + 
		                 '        fields:[\'field1\'],\n' + 
		            	 '        proxy:{\n' + 
		                 '            type:' + proxyType + ',\n' + 
		                 '            url:' + url + ',\n' + 
		                 '            reader:{ \n' + 
		                 '                type:' + readerType + ',\n' + 
		                 '                rootProperty:' + rootProperty + ',\n' + 
		                 ' 	              keepRawData:true \n' + 
		                 '            }\n' + 
		                 '        }, \n' + 
		                 '        autoLoad:' + autoLoad + ' \n';
		    if(pageSize !=0){
		    	strContent = strContent + '        pageSize:' + pageSize + '\n';
		    }            
		                 
		    strContent = strContent + '    }\n';
    	}            
		strContent = strContent +          
			'    }\n' +    
			'});\n'
		console.log('모델코드:' + strContent);	
 		var me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					lboFileSeperator + 'view' + 
					lboFileSeperator + me.folderName + 
					lboFileSeperator + me.fileName + 'Model.js',
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
                exCommon.saveHistory(
                    lboServerPath + '' + 
						lboFileSeperator + 'lib' + 
						lboFileSeperator + 'tmpljs' + 
						lboFileSeperator + 'history' + 
						lboFileSeperator + 'app' + 
						lboFileSeperator + 'view' + 
						lboFileSeperator + me.folderName + 
						lboFileSeperator + me.fileName + '.' + exCommon.getNowDateTime(), 
                    strContent);                
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});    
    },
    onNewStore:function(){
    	var me = this;
 		var panel = Ext.create('Ext.panel.Panel',{
			reference:'storeList' + lboModelIdCount,
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
					fieldLabel:'storeName',
					reference:'storeName' + lboModelIdCount,
					value:''
				},{
					xtype:'textfield',
					fieldLabel:'type',
					reference:'proxyType' + lboModelIdCount,
					value:''
					
				},{
					xtype:'textfield',
					fieldLabel:'url',
					reference:'url' + lboModelIdCount,
					value:''
				},{
					xtype:'textfield',
					fieldLabel:'type(reader)',
					reference:'readerType' + lboModelIdCount,
					value:''
				},{
					xtype:'textfield',
					fieldLabel:'rootProperty',
					reference:'rootProperty' + lboModelIdCount,
					value:''
				},{
					xtype:'textfield',
					fieldLabel:'pageSize',
					reference:'pageSize' + lboModelIdCount,
					value:''
				},{
					xtype:'textfield',
					fieldLabel:'autoLoad',
					reference:'autoLoad' + lboModelIdCount,
					value:''
				}]
			},{

				layout:'vbox',
				flex:1,
				items:[
				{
					xtype:'textarea',
					reference:'responseText'+lboModelIdCount,
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
						text:'연결테스트',
						refNo:lboModelIdCount,
						handler:'onTestStore'
					},{
						xtype:'tbspacer',
						width:10
					},{
						xtype:'button',
						text:'삭제1',
						refNo:lboModelIdCount,
						handler:'onDeleteStore'
					}]
				}]
			}]
		});
		lboModelIdCount++;
		this.getView().down('[name=viewModelList]').add(panel);
		this.getView().down('[name=viewModelListCount]').setValue(lboModelIdCount);   	
    	
    },
    onTestStore:function(obj){
    	var me  = this;
		//ExFrm.app.getController('IdeController').selectedViewPanel.getController().getViewModel().getStore(
		var refNo = obj.refNo;
		var url =  this.lookupReference('url' + refNo).getValue();
		var startIndex = url.indexOf('\'');
		var endIndex  = url.lastIndexOf('\'');
		if(startIndex != -1 && endIndex != -1){
			url = url.substring(startIndex + 1, endIndex);
			console.log(url);
		}
		Ext.Ajax.request({
			type:'ajax',
			url:url,
			success:function(res){
				me.lookupReference('responseText' + refNo).setValue(res.responseText);
				Ext.decode(res.responseText);
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});	
		//this.up('textarea[name=responseText]').setValue(
    
    },
    onDeleteStore:function(obj){
    	console.log(arguments);
		this.getView().down('[name=viewModelList]').remove(this.lookupReference('storeList' + obj.refNo), true);
		lboModelIdCount--;
		this.getView().down('[name=viewModelListCount]').setValue(lboModelIdCount); 
    },
    onCreate:function(){
    	var me = this;
		var strContent ='Ext.define(\'' + lboApplicationName + '.view.' + this.folderName.replace('/','.') + '.' + this.fileName + 'Model\', {\n' + 
						'    extend: \'Ext.app.ViewModel\',\n' + 
						'    alias: \'viewmodel.' + this.fileName.toLowerCase() + '\', \n' + 
						'    stores:{ \n'+   
						'    }\n' +  	
						'})';
						
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					//lboFileSeperator + 'view' + 
					lboFileSeperator + me.folderName + 
					lboFileSeperator + me.fileName + 'Model.js',
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
                exCommon.saveHistory(
                    lboServerPath + 
						lboFileSeperator + 'lib' + 
						lboFileSeperator + 'tmpljs' + 
						lboFileSeperator + 'history' + 
						lboFileSeperator + 'app' + 
						//lboFileSeperator + 'view' + 
						lboFileSeperator + me.folderName + 
						lboFileSeperator + me.fileName + 'Model.' + exCommon.getNowDateTime(), 
                    strContent);                
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});						
    }
});