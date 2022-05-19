Ext.define('ExFrm.view.ide.ControllerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.controllerview',
    folderName:'',
    fileName:'',
    calledByOther:function(params){
    	this.folderName = params.folderName;
    	this.fileName = params.fileName;
    },
    onSave:function(){
    
		var strContent = this.lookupReference('fileCont').getExValue();
		console.log('컨트롤러코드:' + strContent);	
		ExFrm.app.getController('IdeController').selectedViewControllerCode = strContent;
		var controllerCode = ExFrm.app.getController('IdeController').selectedViewControllerCode;
	
    	//var startIndex = controllerCode.indexOf('//CodeStart_DoNotModify//') + 25;
    	//var endIndex = 	 controllerCode.indexOf('//CodeEnd_DoNotModify//');
    	var startIndex = strContent.indexOf('{');
    	var endIndex = 	 strContent.lastIndexOf('}') + 1;
    	//var controllerViewHeader = controllerCode.substring(0, startIndex);
    	//var controllerViewFooter = controllerCode.substring(endIndex, controllerCode.length);
    	var strObjContent = strContent.substring(startIndex, endIndex);
    	console.log('ㅁㅁㅁㅁㅁㅁㅁㅁㅁ strObjContent', startIndex, endIndex, strObjContent);
 		/*
 		strContent = 
 			controllerViewHeader + '\n' + 
 			strContent	+ '\n' + 
 			controllerViewFooter;
		*/
		
		
 		var me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app' + 
				//lboFileSeperator + 'view' + 
				lboFileSeperator + me.folderName + 
				lboFileSeperator + me.fileName + 'Controller.js' ,
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
						Ext.decode(strObjContent);
					/*
						Ext.decode("{\n" + 
						"    extend:'Ext.app.ViewController',\n" + 
						"    alias:'controller." + lboFileName.toLowerCase() + "',\n" +
						me.lookupReference('fileCont').getValue() + "\n" + 
						"}"); 
					*/
				}
				catch(e){
					if(getLboLang()=='english')
						Ext.Msg.alert('Error', 'File is saved. but changed code is not applied. because ViewController has not object form');
					else 
						Ext.Msg.alert('오류', '파일을 저장했습니다. 뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.');
					return;
				}
				Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
                
                // History저장시작
                exCommon.saveHistory(
                    lboServerPath + 
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'history' + 
					lboFileSeperator + 'app' + 
					//lboFileSeperator + 'view' + 
					lboFileSeperator + me.folderName  + 
					lboFileSeperator + me.fileName + 'Controller.' + exCommon.getNowDateTime(), 
                    strContent);                   
                
				console.log('strApplyContent', strApplyContent);
				console.log('..', ExFrm.app.getController('IdeController').selectedViewPanel);
				Ext.apply(ExFrm.app.getController('IdeController').selectedViewPanel.getController(),
					strApplyContent);
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});    
    },/*,
    onRegViewController:function(){
		var me = this;
		Ext.Loader.loadScript({
			url:'.//app//view//' + me.folderName + '//' + me.fileName + 'Controller.js',
			onLoad:function(){
				ExFrm.app.getController('IdeController').regViewController('test005','Ext.view.test.Test005');
				//me.getView().setController('Ext.view.test.Test005');
		
			},
			onError:function(){
				console.log('푸하하2', arguments);
				//testAAA();    			
			}
		});    	
    }*/
    onCreate:function(){
    	var me = this;
		var strContent ='Ext.define(\'' + lboApplicationName + '.view.' + this.folderName.replace('/','.') + '.' + this.fileName + 'Controller\', {\n' + 
						'    extend: \'' + lboApplicationName + '.view.base.ViewController\',\n' + 
						'    alias: \'controller.' + this.fileName.toLowerCase() + '\'\n' + 	
						'})';
						
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app' + 
				//lboFileSeperator + 'view' + 
				lboFileSeperator + me.folderName + 
				lboFileSeperator + me.fileName + 'Controller.js',
				content:strContent
			},
			success:function(res){
				var obj = JSON.parse(res.responseText);
				console.log('obj', obj);
				if(obj.success == false) {
					Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
					return;
				}
				Ext.Msg.alert(getLboLangItem("확인"), getLboLangItem('파일을 저장했습니다.'));
                // History저장시작
                exCommon.saveHistory(
                    lboServerPath + 
					lboFileSeperator + 'lib' + 
					lboFileSeperator + 'tmpljs' + 
					lboFileSeperator + 'history' + 
					lboFileSeperator + 'app' + 
					//lboFileSeperator + 'view' + 
					lboFileSeperator + me.folderName  + 
					lboFileSeperator + me.fileName + 'Controller.' + exCommon.getNowDateTime(), 
                    strContent);                   
			},
			failure:function(res){
				Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
			}
		});						
    },
    onBigFont:function(){
		this.lookupReference('fileCont').increaseFontSize();   
	},
	onSmallFont:function(){
		this.lookupReference('fileCont').decreaseFontSize();   
	}      
});