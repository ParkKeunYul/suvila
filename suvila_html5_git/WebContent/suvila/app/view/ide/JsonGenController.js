Ext.define('ExFrm.view.ide.JsonGenController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jsongen',

	folderName:'',
	fileName:'',
    calledByOther:function(params){
		this.folderName = params.folder;
		this.fileName = params.fileName;
		this.lookupReference('folder').setValue(params.folder);
		this.lookupReference('fileName').setValue(params.fileName);
		this.onShowGrid();
    },
	onShowGrid:function(){
    
		var grid = Ext.create('ExFrm.view.ide.JsonGenGrid',{
				reference:'tmplStoreGrid0',
				height:300
		});

		this.lookupReference('gridStoreContent').add(grid);    		
    }, 
    makeGridToObject:function (grid){
    	var gridItems = grid.getStore().getRange();
    	var objProperty = [];
    	console.log('★★★★★★★★★★★★★★★★★makeGridToOjbect', grid.ref);
    	for(var i in gridItems){
    		objProperty.push({
    			fieldName:gridItems[i].get('fieldName'),
    			fieldKorName: gridItems[i].get('fieldKorName'),
    			fieldType:gridItems[i].get('fieldType'),
    			fromTo:gridItems[i].get('fromTo')
    		});
    	}
    	return objProperty;
    },	
    makeStoreGridToObject:function (grid){
    	var gridItems = grid.getStore().getRange();
    	var objProperty = [];
    	console.log('★★★★★★★★★★★★★★★★★makeGridToOjbect', grid.ref);
    	for(var i in gridItems){
    		objProperty.push({
    			fieldName:gridItems[i].get('fieldName'),
    			fieldKorName: gridItems[i].get('fieldKorName'),
    			fieldType:gridItems[i].get('fieldType'),
    			fieldLength:gridItems[i].get('fieldLength')
    		});
    	}
    	return objProperty;
    },
	onCreateFiles:function(){
		// 파일을 생성하기 위한 기본처리.
		//var gridObj = [];
		var me = this;

		var writeJsonGenGridInfo = [];
		//console.log('개수' + this.lookupReference('gridCount').getValue());
		//for(var i=0; i < Number(this.lookupReference('gridStoreCount').getValue()); i++){
		var gridObj = this.makeGridToObject(this.lookupReference('tmplStoreGrid' + '0'));
		if(gridObj.length == 0){
			if(getLboLang() == 'english')
				alert('There is no data at grid');
			else 
				alert('그리드에 입력된 항목이 없습니다.');
			return;
		}
		//}	  	        
		//for(var i=0; i < Number(this.lookupReference('gridStoreCount').getValue()); i++){
		writeJsonGenGridInfo.push({
			//ref:this.lookupReference('tmplStoreGrid' + i).ref,
			list:this.makeStoreGridToObject(this.lookupReference('tmplStoreGrid' + '0'))
		});  
		//}	
		var writeCont = createJsonGenTmplFiles(
			writeJsonGenGridInfo,
			this.lookupReference('kind').getValue()
		);
  
		console.log('JSON데이터 만들기');
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'extra' + 
					lboFileSeperator + me.folderName + 
					lboFileSeperator + me.fileName,
				content:writeCont
			},
			success:function(res){
				console.log('res', res);
				var obj = Ext.decode(res.responseText);
				if(obj.success == true)
					Ext.Msg.alert( getLboLangItem("확인"),  getLboLangItem("파일을 생성했습니다."));
				else 
					Ext.Msg.alert( getLboLangItem("오류"), obj.msg);
			},
			failure:function(res){
				if(getLboLang() == 'english')
					Ext.Msg.alert("Error", 'Your must create folder ( ' + me.lookupReference('folderName') + ') at folder(json/view/) before make Json data. - ' + res.responseText.replace(/\'/g,' '));
				else 
					Ext.Msg.alert("오류", 'json/view/ 폴더에 ' + me.lookupReference('folderName') + ' 폴더를 먼저 생성하세요. - ' + res.responseText.replace(/\'/g,' '));
				return;
			}
		}); 		
	},
	onSearchTemplate:function(){
		var menucontroller = ExFrm.app.getController('MemberController');     	
 		menucontroller.openPopup('ExFrm.view.screen.ScreenTmpPop',  getLboLangItem('템플릿'), {}, this);
	},
	receiveFromPopup:function(params){
		console.log('응답옴:', params);
		this.lookupReference('templateCode').setValue(params.tmpName);
	}
});