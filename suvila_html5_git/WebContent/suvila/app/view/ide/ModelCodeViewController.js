Ext.define('ExFrm.view.ide.ModelCodeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modelcodeview',
    folderName:'',
    fileName:'',
    calledByOther:function(params){
    	this.folderName = params.folderName;
    	this.fileName = params.fileName;
    },
    onSave:function(){
    	var me =this;
		var strContent = this.lookupReference('fileCont').getExValue();
		console.log('뷰코드:' + strContent);	
 		var me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					//lboFileSeperator + 'view' + 
					lboFileSeperator + me.folderName + 
					lboFileSeperator + me.fileName + 'Model.js' ,
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
					var strCont = me.lookupReference('fileCont').getExValue();
					var startIndex = strCont.indexOf('{');
					var endIndex = strCont.lastIndexOf('}');
					var strCont = strCont.substring(startIndex, endIndex + 1);
					console.log(strCont);
					strApplyContent = 
						Ext.decode(strCont);
					/*
					strApplyContent =  
						Ext.decode("{\n" + 
						"    extend:'Ext.app.ViewController',\n" + 
						"    alias:'controller." + lboFileName.toLowerCase() + "',\n" +
						me.lookupReference('fileCont').getValue() + "\n" + 
						"}");
					*/ 
					Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
                    
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
					
				}
				catch(e){
					console.log('>>>>', e);
					Ext.Msg.alert('오류1', '뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.' + e);
					return;
				}
				try{
					console.log('strApplyContent', strApplyContent);
					//console.log('..', ExFrm.app.getController('IdeController').selectedViewPanel.getController());
					Ext.apply(ExFrm.app.getController('IdeController').selectedViewPanel.getViewModel(),
						strApplyContent);	
				}
				catch(e){
					console.log('>>>>>', e);
					Ext.Msg.alert('오류2', '뷰컨트롤러 코드가 객체 형식이 아니므로 실시간 반영되지는 않습니다.' + e);
				}			

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
    onViewDesigner:function(){
    	ExFrm.app.getController('IdeController').setMainBarModelView();
    	
    },
    onCreate:function(){
    	var me = this;
		var strContent ='Ext.define(\'' + lboApplicationName + '.view.' + this.folderName.replace('/','.') + '.' + this.fileName + 'Model\', {\n' + 
						'    extend: \'Ext.app.ViewModel\',\n' + 
						'    alias: \'viewmodel.' + this.fileName.toLowerCase() + '\',\n' + 
                        '    stores:{\n' + 
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
						lboFileSeperator + me.fileName + '.' + exCommon.getNowDateTime(), 
                    strContent);                   
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
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