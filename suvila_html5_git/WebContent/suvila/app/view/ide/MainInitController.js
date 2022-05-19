
Ext.define('ExFrm.view.ide.MainInitController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.idemain',
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
    	ExFrm.app.getController('IdeController').setTmplMainStep2Bar('ExFrm.view.ide.TmplMakeStep2','',''); 
    },
    onCss:function(){
    	ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.CssMaker','CSS수정','');
    },
    onSaveFile:function(){
    	// 뷰 파일을 읽어와 생성한다.
    	getStringAll();
    },
    onSearch:function(){
		var selectType = this.lookupReference('selectType').getValue();
		if(selectType == '1'){
			this.lookupReference('loginPanel').setVisible(false);
			this.lookupReference('initPanel').setVisible(false);
			this.lookupReference('menuPanel').setVisible(true);
		}
		else if(selectType == '2'){
			this.lookupReference('loginPanel').setVisible(false);
			this.lookupReference('initPanel').setVisible(true);
			this.lookupReference('menuPanel').setVisible(true);
		}
		else if(selectType == '3'){
			this.lookupReference('loginPanel').setVisible(true);
			this.lookupReference('initPanel').setVisible(true);
			this.lookupReference('menuPanel').setVisible(true);
		}
    },
    onCreate:function(){
    	
    	var selectType = this.lookupReference('selectType').getValue();
    	var menuType = this.lookupReference('menuType').getValue();
    	
    	// Main
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' +  lboServerPath + 
				lboFileSeperator + 'lib' + 
				lboFileSeperator + 'tmpljs' + 
				lboFileSeperator + 'init' + 
				lboFileSeperator + selectType + 
				lboFileSeperator + 'Main.js',
			callback:function(obj, success, resObj){
				console.log(resObj.responseText);
		    	var strCont = resObj.responseText.trim();
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					params:{
						path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + 'main' + 
							lboFileSeperator + 'Main.js' ,
						content:strContent
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						var strApplyContent = {};
						try{
							strApplyContent =  
								Ext.decode("{\n" + 
								"    extend:'Ext.app.ViewController',\n" + 
								"    alias:'controller." + lboFileName.toLowerCase() + "',\n" +
								me.lookupReference('fileCont').getValue() + "\n" + 
								"}"); 
						}
						catch(e){
							if(getLboLang()=='english')
								Ext.Msg.alert('Error', 'File is saved. but changed code is not applied. because ViewController has not object form');
							else 
								Ext.Msg.alert('오류', '파일을 저장했습니다. 뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.');
							return;
						}
						Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
						console.log('strApplyContent', strApplyContent);
						console.log('..', ExFrm.app.getController('IdeController').selectedViewPanel.getController());
						Ext.apply(ExFrm.app.getController('IdeController').selectedViewPanel.getController(),
							strApplyContent);
					},
					failure:function(res){
						Ext.Msg.alert("오류", res.responseText);
					}
				});
			}
		});

    	// MainController
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' +  lboServerPath + 
				lboFileSeperator + 'lib' + 
				lboFileSeperator + 'tmpljs' + 
				lboFileSeperator + 'init' + 
				lboFileSeperator + selectType + '' + 
				lboFileSeperator + 'MainController.js',
			callback:function(obj, success, resObj){
				console.log(resObj.responseText);
		    	var strCont = resObj.responseText.trim();
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					params:{
						path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + 'main' + 
							lboFileSeperator + 'MainController.js' ,
						content:strContent
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						var strApplyContent = {};
						try{
							strApplyContent =  
								Ext.decode("{\n" + 
								"    extend:'Ext.app.ViewController',\n" + 
								"    alias:'controller." + lboFileName.toLowerCase() + "',\n" +
								me.lookupReference('fileCont').getValue() + "\n" + 
								"}"); 
						}
						catch(e){
							if(getLboLang()=='english')
								Ext.Msg.alert('Error', 'File is saved. but changed code is not applied. because ViewController has not object form');
							else 
								Ext.Msg.alert('오류', '파일을 저장했습니다. 뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.');
							return;
						}
						Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
						console.log('strApplyContent', strApplyContent);
						console.log('..', ExFrm.app.getController('IdeController').selectedViewPanel.getController());
						Ext.apply(ExFrm.app.getController('IdeController').selectedViewPanel.getController(),
							strApplyContent);
					},
					failure:function(res){
						Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
					}
				});
			}
		});
		   
		// 초기화면
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' +  lboServerPath + 
				lboFileSeperator + 'lib' + 
				lboFileSeperator + 'tmpljs' + 
				lboFileSeperator + 'init' + 
				lboFileSeperator + '' + selectType + 
				lboFileSeperator + 'MainPanelController.js',
			callback:function(obj, success, resObj){
				console.log(resObj.responseText);
		    	var strCont = resObj.responseText.trim();
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					params:{
						path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + 'main' + 
							lboFileSeperator + 'MainPanelController.js' ,
						content:strContent
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						var strApplyContent = {};
						try{
							strApplyContent =  
								Ext.decode("{\n" + 
								"    extend:'Ext.app.ViewController',\n" + 
								"    alias:'controller." + lboFileName.toLowerCase() + "',\n" +
								me.lookupReference('fileCont').getValue() + "\n" + 
								"}"); 
						}
						catch(e){
							if(getLboLang()=='english')
								Ext.Msg.alert('Error', 'File is saved. but changed code is not applied. because ViewController has not object form');
							else 
								Ext.Msg.alert('오류', '파일을 저장했습니다. 뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.');
							return;
						}
						Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
						console.log('strApplyContent', strApplyContent);
						console.log('..', ExFrm.app.getController('IdeController').selectedViewPanel.getController());
						Ext.apply(ExFrm.app.getController('IdeController').selectedViewPanel.getController(),
							strApplyContent);
					},
					failure:function(res){
						Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
					}
				});
			}
		});
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' +  lboServerPath + 
				lboFileSeperator + 'lib' + 
				lboFileSeperator + 'tmpljs' + 
				lboFileSeperator + 'init' + 
				lboFileSeperator + selectType + '' + 
				lboFileSeperator + 'MainPanel.js',
			callback:function(obj, success, resObj){
				console.log(resObj.responseText);
		    	var strCont = resObj.responseText.trim();
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					params:{
						path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + 'main' + 
							lboFileSeperator + 'MainPanel.js' ,
						content:strContent
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						var strApplyContent = {};
						try{
							strApplyContent =  
								Ext.decode("{\n" + 
								"    extend:'Ext.app.ViewController',\n" + 
								"    alias:'controller." + lboFileName.toLowerCase() + "',\n" +
								me.lookupReference('fileCont').getValue() + "\n" + 
								"}"); 
						}
						catch(e){
							if(getLboLang()=='english')
								Ext.Msg.alert('Error', 'File is saved. but changed code is not applied. because ViewController has not object form');
							else 
								Ext.Msg.alert('오류', '파일을 저장했습니다. 뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.');
							return;
						}
						Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
						console.log('strApplyContent', strApplyContent);
						console.log('..', ExFrm.app.getController('IdeController').selectedViewPanel.getController());
						Ext.apply(ExFrm.app.getController('IdeController').selectedViewPanel.getController(),
							strApplyContent);
					},
					failure:function(res){
						Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
					}
				});
			}
		});		
		
		// 로그인
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' +  lboServerPath + 
				lboFileSeperator + 'lib' + 
				lboFileSeperator + 'tmpljs' + 
				lboFileSeperator + 'init' + 
				lboFileSeperator + selectType + 
				lboFileSeperator + 'LoginController.js',
			callback:function(obj, success, resObj){
				console.log(resObj.responseText);
		    	var strCont = resObj.responseText.trim();
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					params:{
						path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + 'login' + 
							lboFileSeperator + 'LoginController.js' ,
						content:strContent
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						var strApplyContent = {};
						try{
							strApplyContent =  
								Ext.decode("{\n" + 
								"    extend:'Ext.app.ViewController',\n" + 
								"    alias:'controller." + lboFileName.toLowerCase() + "',\n" +
								me.lookupReference('fileCont').getValue() + "\n" + 
								"}"); 
						}
						catch(e){
							if(getLboLang()=='english')
								Ext.Msg.alert('Error', 'File is saved. but changed code is not applied. because ViewController has not object form');
							else 
								Ext.Msg.alert('오류', '파일을 저장했습니다. 뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.');
							return;
						}
						Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
						console.log('strApplyContent', strApplyContent);
						console.log('..', ExFrm.app.getController('IdeController').selectedViewPanel.getController());
						Ext.apply(ExFrm.app.getController('IdeController').selectedViewPanel.getController(),
							strApplyContent);
					},
					failure:function(res){
						Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
					}
				});
			}
		});
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' +  lboServerPath + 
				lboFileSeperator + 'lib' + 
				lboFileSeperator + 'tmpljs' + 
				lboFileSeperator + 'login' + 
				lboFileSeperator + selectType + 
				lboFileSeperator + 'LoginPanel.js',
			callback:function(obj, success, resObj){
				console.log(resObj.responseText);
		    	var strCont = resObj.responseText.trim();
				Ext.Ajax.request({
					type:'ajax',
					url:'./jsp/fileWrite.jsp',
					params:{
						path: lboServerPath + lboUserServerPath + 
							lboFileSeperator + 'app' + 
							lboFileSeperator + 'view' + 
							lboFileSeperator + 'login' + 
							lboFileSeperator + 'LoginPanel.js' ,
						content:strContent
					},
					success:function(res){
						var obj = JSON.parse(res.responseText);
						console.log('obj', obj);
						if(obj.success == false) {
							Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
							return;
						}
						var strApplyContent = {};
						try{
							strApplyContent =  
								Ext.decode("{\n" + 
								"    extend:'Ext.app.ViewController',\n" + 
								"    alias:'controller." + lboFileName.toLowerCase() + "',\n" +
								me.lookupReference('fileCont').getValue() + "\n" + 
								"}"); 
						}
						catch(e){
							if(getLboLang()=='english')
								Ext.Msg.alert('Error', 'File is saved. but changed code is not applied. because ViewController has not object form');
							else 
								Ext.Msg.alert('오류', '파일을 저장했습니다. 뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.');
							return;
						}
						Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
						console.log('strApplyContent', strApplyContent);
						console.log('..', ExFrm.app.getController('IdeController').selectedViewPanel.getController());
						Ext.apply(ExFrm.app.getController('IdeController').selectedViewPanel.getController(),
							strApplyContent);
					},
					failure:function(res){
						Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
					}
				});
			}
		});			
    }
});
