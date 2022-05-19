Ext.define('ExFrm.view.ide.IdeLeftMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ideleftmenu',
	onMenuClick:function(obj, selObj){
		console.log(arguments);
    	console.log('>>>>', selObj.data.url, selObj.data.name);
		var gController = ExFrm.app.getController('IdeController');
 		gController.setMainBar(selObj.data.url,selObj.data.name,selObj.data.path);
   	},
    selectedItemNode:{},
    selectedParentNode:{},    
    onTreeClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
		
		console.log('record', record);
        this.selectedItemNode = record;
        this.selectedParentNode = record.parentNode;   
		console.log('this.selectedParentNode', this.selectedParentNode); 
    },
	onCreateFile:function(){
		var me = this;
		Ext.Msg.prompt(getLboLangItem('신규'), getLboLangItem('파일명을 입력하세요.'), function(btn, text, cfg) {
			if(btn == 'ok' && Ext.isEmpty(text)) {
				var newMsg = '<span style="color:red">' + getLboLangItem('파일명을 입력하세요.') + '</span>';
				Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
			}
			else if(btn == 'ok' && !Ext.isEmpty(text)){
				
				if( me.selectedItemNode.data.type == 'app' ){
					var indexTemp = text.indexOf('.js');
					if(indexTemp == -1){
						if(getLboLang() == 'english')
							alert('File extension must be .js');
						else 
							alert('파일명은 .js로 끝나야 합니다.');
						return
					}
				}
				var tempPath = '';
				if(me.selectedItemNode.data.leaf == false){
					tempPath = me.selectedItemNode.data.path;
					console.log('1tempPath', tempPath);
				}
				else {
					tempPath = me.selectedParentNode.data.path;
					console.log('2tempPath', tempPath);
				}
				var path = ''
				if( me.selectedItemNode.data.type == 'app' ){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' +  
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;
				} else if( me.selectedItemNode.data.type == 'server' ){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'extra' +  
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;

					console.log('3path', path);		
				}else if( me.selectedItemNode.data.type == 'application' ){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;
				}
				console.log( me.selectedItemNode.data);
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					method:'POST',
					params:{
						path: path,
						content:' '
					},
					success:function(res){
						console.log('응답',res.responseText);
						var obj = Ext.decode(res.responseText.trim());
						console.log('obj', obj);
						if(obj.success== true){
							var textCodeName = text.substring(0, indexTemp);
							console.log('>>', me.selectedItemNode.data);
							if(me.selectedItemNode.data.leaf == false){
								console.log(me.selectedItemNode.data.url + '.' + textCodeName);
								me.selectedItemNode.appendChild({
									name:text,
									url:me.selectedItemNode.data.url + '.' + textCodeName,
									path:me.selectedItemNode.data.path + lboFileSeperator + textCodeName,
									pathBf:me.selectedItemNode.data.pathBf,
									type:me.selectedItemNode.data.type,
									leaf:true
								});
							}
							else {
								console.log(me.selectedParentNode.data.code + '.' + textCodeName);
								me.selectedParentNode.appendChild({
									name:text,
									url:me.selectedParentNode.data.url + '.' + textCodeName,
									path:me.selectedParentNode.data.path + lboFileSeperator + textCodeName,
									pathBf:me.selectedParentNode.data.path,
									type:me.selectedItemNode.data.type,
									leaf:true
								});
							}
						}
						else {
							Ext.Msg.alert(getLboLangItem('오류'), getLboLangItem('파일 생성중 오류가 발생했습니다.') + '[' + obj.msg + ']');
							return;
						}
									
					},
					failure:function(res){
						Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
					}
				});
			}
		});


	},
	onCreateFolder:function(){
        var me = this;
		console.log('this.selectedItemNode',this.selectedItemNode );
		Ext.Msg.prompt(getLboLangItem('신규'), getLboLangItem('폴더명을 입력하세요.'), function(btn, text, cfg) {
			if(btn == 'ok' && Ext.isEmpty(text)) {
				var newMsg = '<span style="color:red">' + getLboLangItem('폴더명을 입력하세요.') + '</span>';
				Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
			}
			else if(btn == 'ok' && !Ext.isEmpty(text)){
				
				var indexTemp = text.indexOf('.');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('/');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('\\');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('@');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('\'');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('"');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('%');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('$');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('#');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('!');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('*');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('$');
				if(indexTemp != -1){
					alert(getLboLangItem('폴더명에는 특수문자가 있어서는 않됩니다.'));
					return
				} 
				
				var tempPath = '';
				if(me.selectedItemNode.data.leaf == false){
					tempPath = me.selectedItemNode.data.path;
				}
				else {
					tempPath = me.selectedParentNode.data.path;
				}
				var path = ''
				if( me.selectedItemNode.data.type == 'app' ){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' +  
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;
				} else if( me.selectedItemNode.data.type == 'server' ){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'extra' +  
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;
				}else if( me.selectedItemNode.data.type == 'application' ){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;
				}
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/folderCreate.jsp',
					method:'POST',
					params:{
						path: path,
						content:' '
					},
					success:function(res){
						console.log('응답',res.responseText);
						var obj = Ext.decode(res.responseText.trim());
						console.log('obj', obj);
						if(obj.success== true){
							var textCodeName = text.substring(0, indexTemp);
							console.log('>>', me.selectedItemNode.data);
							if(me.selectedItemNode.data.leaf == false){
								console.log(me.selectedParentNode.data.url + '.' + text);
								me.selectedItemNode.appendChild({
									name:text,
									url:me.selectedItemNode.data.url + '.' + text,
									path:me.selectedItemNode.data.path + lboFileSeperator + text,
									pathBf:me.selectedItemNode.data.path,
									type:me.selectedItemNode.data.type,
									leaf:false
								});
							}
							else {
								console.log(me.selectedParentNode.data.code + '.' + textCodeName);
								me.selectedParentNode.appendChild({
									name:text,
									url:me.selectedParentNode.data.url + '.' + textCodeName,
									path:me.selectedParentNode.data.path + lboFileSeperator + textCodeName,
									pathBf:me.selectedParentNode.data.path,
									type:me.selectedItemNode.data.type,
									leaf:false
								});
							}
						}
						else {
							Ext.Msg.alert(getLboLangItem('오류'), getLboLangItem('폴더 생성중 오류가 발생하였습니다.') + '[' + obj.msg + ']');
							return;
						}
									
					},
					failure:function(res){
						Ext.Msg.alert("오류", res.responseText);
					}
				});
				

			}
		});		
	},
	onUpdate:function(){
		var me = this;
		Ext.Msg.prompt(getLboLangItem('변경'), getLboLangItem('변경명을 입력하세요.'), function(btn, text, cfg) {
			if(btn == 'ok' && Ext.isEmpty(text)) {
				var newMsg = '<span style="color:red">' + getLboLangItem('변경명을 입력하세요.') + '</span>';
				Ext.Msg.show(Ext.apply({}, { msg: newMsg }, cfg));
			}
			else if(btn == 'ok' && !Ext.isEmpty(text)){
				var indexTemp=-1;
				if( me.selectedItemNode.data.leaf == false){
					indexTemp = text.indexOf('.');
					if(indexTemp != -1){
						alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
						return
					}
				}
				else {
					if(me.selectedItemNode.data.type=='app'){
						indexTemp = text.indexOf('.js');
						if(indexTemp == -1){
							if(getLboLang() == 'english')
								alert('File extensioin must be .js in controller, model, store and view folders');
							else 
								alert('기본적은 controller, model, store, view 폴더의 파일은 확장자가 .js 이어야 합니다.');
							return
						}
					}
				}
				indexTemp = text.indexOf('/');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('\\');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('@');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('\'');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('"');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('%');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('$');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('#');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('!');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('*');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				indexTemp = text.indexOf('$');
				if(indexTemp != -1){
					alert(getLboLangItem('변경하려는 이름에는 특수문자가 있어서는 않됩니다.'));
					return
				}
				
				var tempPath = '';
				var tempLastIndex = me.selectedItemNode.data.path.lastIndexOf(lboFileSeperator);
				console.log('tempLastIndex',me.selectedItemNode.data.path, tempLastIndex);
				if(tempLastIndex == -1) {
					alert(getLboLangItem('경로가 유효하지 않습니다.'));
					return;
				}
				var tempFileName = me.selectedItemNode.data.path.substring(tempLastIndex +1, me.selectedItemNode.data.path.length);
				console.log('tempFileName', tempFileName);
				
				tempPath = me.selectedItemNode.data.path.substring(0, tempLastIndex);
				/*
				if(me.selectedItemNode.data.leaf == false){
					tempPath = me.selectedItemNode.data.path;
				}
				else {
					tempPath = me.selectedParentNode.data.path;
				}
				*/
				
				var pathModify = '';
				if(me.selectedItemNode.data.leaf == true){
					if(me.selectedItemNode.data.type== 'app'){
						pathModify = me.selectedItemNode.data.path + '.js';
					}
					else if(me.selectedItemNode.data.type== 'server'){
						pathModify = me.selectedItemNode.data.path;
					}
				}
				else {
					pathModify = me.selectedItemNode.data.path;
				}
				
				var path = '';
				var newPath = '';
				if(me.selectedItemNode.data.type== 'app'){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' +  
							lboFileSeperator + pathModify;
					newPath =  lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' +  
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;				
				}
				else if(me.selectedItemNode.data.type== 'server'){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'extra' +  
							lboFileSeperator + pathModify;
					newPath =  lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'extra' +  
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;	
				}
				else if(me.selectedItemNode.data.type== 'application'){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + pathModify;
					newPath =  lboServerPath + lboUserServerPath + 
							lboFileSeperator + tempPath + 
							lboFileSeperator + text;	
				}
							
				
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/folderRename.jsp',
					method:'POST',
					params:{
						path: path, 
						newPath:newPath,
						content:' '
					},
					success:function(res){
						console.log('응답',res.responseText);
						var obj = Ext.decode(res.responseText.trim());
						console.log('obj', obj);
						if(obj.success== true){
							// 디렉토리 명이 바뀌면 갱신한다. 
							if(me.selectedItemNode.data.leaf==false){
								console.log('디렉토리명이 바뀜...');
								me.getView().getStore().load();
								return;
							}
							
							var textCodeIndex = text.indexOf('.');
							var textCodeName = text.substring(0, textCodeIndex);
							console.log('>>', me.selectedItemNode.data);
							var tempUrlIndex = me.selectedItemNode.data.url.lastIndexOf('.');
							var tempUrl = me.selectedItemNode.data.url.substring(0, tempUrlIndex);
							var tempPathIndex = me.selectedItemNode.data.path.lastIndexOf(lboFileSeperator);
							var tempPath = me.selectedItemNode.data.path.substring(0, tempPathIndex);
							me.selectedItemNode.set('name',text);
							me.selectedItemNode.set('url',tempUrl + '.' + textCodeName);
							me.selectedItemNode.set('path',tempPath + lboFileSeperator + textCodeName);
						}
						else {
							Ext.Msg.alert(getLboLangItem('오류'), getLboLangItem('파일 생성중 오류가 발생하였습니다.') + '[' + obj.msg + ']');
							return;
						}
									
					},
					failure:function(res){
						Ext.Msg.alert("오류", res.responseText);
					}
				});
			}
		});		
	},
	onDelete:function(){
		var me = this;
		Ext.Msg.confirm(getLboLangItem('삭제'), getLboLangItem('파일을 삭제하시겠습니까?'), function(btn) {
			if(btn == 'yes') {
				var tempPath = '';
				if(me.selectedItemNode.data.leaf== true){
					if(me.selectedItemNode.data.type == 'app'){
						tempPath = me.selectedItemNode.data.path + '.js'; 
					}
					else if(me.selectedItemNode.data.type== 'server'){
						tempPath = me.selectedItemNode.data.path; 
					}
				}
				else{
					tempPath = me.selectedItemNode.data.path ; 
				}
				var path = '';
				if(me.selectedItemNode.data.type== 'app'){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' +  
							lboFileSeperator + tempPath;				
				}
				else if(me.selectedItemNode.data.type== 'server'){
					path = lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'extra' +  
							lboFileSeperator + tempPath;	
				}	
				else if(me.selectedItemNode.data.type== 'application'){
					if(getLboLang() == 'english')
						alert('It is not possible to remove this file');
					else 
						alert('해당 파일은 삭제할 수 없습니다.');
					return;
				}	
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileDelete.jsp',
					method:'POST',
					params:{
						path: path,
						content:' '
					},
					success:function(res){
						console.log('응답',res.responseText);
						var obj = Ext.decode(res.responseText.trim());
						console.log('obj', obj);
						if(obj.success== true){
		 					me.selectedParentNode.removeChild(me.selectedItemNode);
							Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 삭제했습니다.'));
							return;
						}
						else {
							Ext.Msg.alert(getLboLangItem('오류'), getLboLangItem('파일 삭제중 오류가 발생하였습니다.') + ' [' + obj.msg + ']');
							return;
						}
									
					},
					failure:function(res){
						Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
					}
				});
							 
			}
		});
	},
	onUpload:function(){
		var me = this;	
        var panel = Ext.create('ExFrm.view.ide.FileUpload');
        panel.show();
        panel.getController().calledByOther(
                            'upd',
                            me.selectedItemNode,
    						me.selectedParentNode,  
                            this.onReturnFileUpload,
                            this);       
	},
	onReturnFileUpload:function(path, fileName, me){
		var tempPath = '';
		if(me.selectedItemNode.data.leaf == false){
			tempPath = me.selectedItemNode.data.path;
		}
		else {
			tempPath = me.selectedParentNode.data.path;
		}
		var path = ''
		if( me.selectedItemNode.data.type == 'app' ){
			path = lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' +  
					lboFileSeperator + tempPath + 
					lboFileSeperator + fileName;
		} else if( me.selectedItemNode.data.type == 'server' ){
			path = lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'extra' +  
					lboFileSeperator + tempPath + 
					lboFileSeperator + fileName;
		}else if( me.selectedItemNode.data.type == 'application' ){
			if(getLboLang() == 'english')
				alert('It is not possible to upload this file');
			else 
				alert('해당 파일은 업로드할 수 없습니다');
			return;
		}
		var indexTemp = fileName.lastIndexOf('.js');
		var textCodeName = fileName.substring(0, indexTemp);
		console.log('>>', me.selectedItemNode.data);
		if(me.selectedItemNode.data.leaf == false){
			console.log(me.selectedItemNode.data.url + '.' + textCodeName);
			me.selectedItemNode.appendChild({
				name:fileName,
				url:me.selectedItemNode.data.url + '.' + textCodeName,
				path:me.selectedItemNode.data.path + lboFileSeperator + textCodeName,
				pathBf:me.selectedItemNode.data.pathBf,
				type:me.selectedItemNode.data.type,
				leaf:true
			});
		}
		else {
			console.log(me.selectedParentNode.data.code + '.' + textCodeName);
			me.selectedParentNode.appendChild({
				name:fileName,
				url:me.selectedParentNode.data.url + '.' + textCodeName,
				path:me.selectedParentNode.data.path + lboFileSeperator + textCodeName,
				pathBf:me.selectedParentNode.data.path,
				type:me.selectedItemNode.data.type,
				leaf:true
			});
		}
		
	},
	onDownload:function(){
		var me = this;
		var fileName = '';
		var tempPath = '';
		if(me.selectedItemNode.data.leaf== true){
			if(me.selectedItemNode.data.type == 'app'){
				fileName = me.selectedItemNode.data.name; 
				tempPath = me.selectedItemNode.data.pathBf;
			}
			else if(me.selectedItemNode.data.type== 'server'){
				fileName = me.selectedItemNode.data.name; 
				tempPath = me.selectedItemNode.data.pathBf;
			}
		}
		else{
			if(getLboLang() == 'english')
				Ext.Msg.alert('info', 'It is not possible to download folder.');
			else 
				Ext.Msg.alert('확인', '폴더를 다운로드 받을 수는 없습니다.');
		    return;
		}
		var path = '';
		if(me.selectedItemNode.data.type== 'app'){
			path = lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' +  
					lboFileSeperator + tempPath;				
		}
		else if(me.selectedItemNode.data.type== 'server'){
			path = lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'extra' +  
					lboFileSeperator + tempPath;	
		}	
		else if(me.selectedItemNode.data.type== 'application'){
			if(getLboLang() == 'english')
				alert('Application.js is difference to local and cloud server. and You can use it by copy source');
			else 
				alert('Application.js 파일은 클라우드와 로컬 환경이 다르므로 소스를 부분 복사하여 사용하십시오');
			return;	
		}	
		
		Ext.DomHelper.append(document.body, { 
		tag: 'iframe', 
		id : 'downloadIframe1',
		frameBorder: 0, 
		width: 0, 
		height: 0, 
		css: 'display:none;visibility:hidden;height:0px;', 
		src: './jsp/fileDownload.jsp?fileName=' + fileName + '&path=' + path
		});
		/*
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileDownload.jsp',
			//method:'POST',
			params:{
				path: path,
				fileName:fileName
			},
			success:function(res){
				console.log('응답',res.responseText);		
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});
		*/

	}
});