Ext.define('ExFrm.view.ide.NormalCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.normalcode',
    folderName:'',
    fileName:'',
    calledByOther:function(params){
    	this.folderName = params.folderName;
    	this.fileName = params.fileName;

		if(this.fileName.indexOf('.json') != -1){
			this.lookupReference('normalCodeToolbar').add({
				xtype:'button',
				text:getLboLangItem('JSON 데이터 생성'),
				handler:'onCreateJson'
			})
		}
    },
	onCreateJson:function(){
		var panel = Ext.create('ExFrm.view.ide.JsonGen');
		//panel.show();
		var params = {
			folder:this.folderName,
			fileName:this.fileName
		};
		panel.getController().calledByOther(params);
		this.getView().add(panel);
		this.getView().remove(this.lookupReference('fileCont'));
		this.getView().remove(this.lookupReference('normalCodeToolbar'));
	},
    onSave:function(){
		var strContent = this.lookupReference('fileCont').getExValue();
		console.log('Normal 코드:' + strContent);	
		ExFrm.app.getController('IdeController').selectedCode = strContent;
		var code = ExFrm.app.getController('IdeController').selectedCode;
 		var me = this;
		
		var tempPath = '';
		if(lboFileType == 'app'){
			tempPath = lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app' + 
				//lboFileSeperator + 'view' + 
				lboFileSeperator + me.folderName + 
				lboFileSeperator + me.fileName + '.js';				
		} 
		else if(lboFileType == 'server'){
			tempPath = lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'extra' + 
				//lboFileSeperator + 'view' + 
				lboFileSeperator + me.folderName + 
				lboFileSeperator + me.fileName 
		}
		else if(lboFileType == 'application'){
			tempPath = lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app' + 
				lboFileSeperator + me.fileName 
		}
		 
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path:tempPath,
				content:strContent
			},
			success:function(res){
				console.log(res);
				var obj = JSON.parse(res.responseText);
				console.log('obj', obj);
				if(obj.success == false) {
					Ext.Msg.alert(getLboLangItem('확인'), obj.msg);
					return;
				}
				Ext.Msg.alert(getLboLangItem('확인'), getLboLangItem('파일을 저장했습니다.'));
                // History저장시작
				if(lboFileType == 'app'){
					try{
						exCommon.saveHistory(
							lboServerPath + 
							lboFileSeperator + 'lib' + 
							lboFileSeperator + 'tmpljs' + 
							lboFileSeperator + 'history' + 
							lboFileSeperator + 'app' + 
							//lboFileSeperator + 'view' + 
							lboFileSeperator + me.folderName  + 
							lboFileSeperator + me.fileName + '.' + exCommon.getNowDateTime(), 
							strContent);                   
					}catch(e){}
				}
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