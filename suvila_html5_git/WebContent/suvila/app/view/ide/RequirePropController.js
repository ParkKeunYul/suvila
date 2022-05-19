Ext.define('ExFrm.view.ide.RequirePropController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requireprop',
    selectedColumn:-1,
    selectedPropertyIndex:-1,
	retMethod:{},
	openerObj:{},
	regCls:'',
    
    refelectGrid:function(regCls, propName, propValue){
        console.log('retMethod', this.retMethod);
		this.lookupReference('propName').setValue(propName);
		this.lookupReference('propValue').setValue(propValue);
		this.lookupReference('mainGrid').getStore().removeAll();
    	lboParsingStrArrays(propValue);
    	console.log('lboParginsStrArrays', lboParsingStrArraysItems);
    	for(var i=0; i <lboArrayIdCountParse; i++){
			console.log('등록');
                        
			var data = {
				list:lboParsingStrArraysItems[i]
			};
  
			console.log('data', data);
			this.lookupReference('mainGrid').getStore().add(data);			
    	} 	        
    },
    calledByOther:function(regCls, propName, propValue,openerMethod,openerObj){
        
        console.log('calledByOther::::::::::::::::::::::::::::::');
    	//console.log('params',params);
    	this.regCls = regCls;
    	this.openerObj = openerObj;
		this.retMethod = openerMethod;
	    this.refelectGrid(regCls, propName, propValue);

    },
    onEdit: function (editor, e, eOpts){

    },
    onCellClickMain:function(p1,p2,p3,p4,p5,rowIndex){
    	console.log('..',arguments, this.obj);
    	this.selectedColumn = rowIndex;    	
    },
    gridRedraw:function(obj){
    	for(var i=0; i < obj.length; i++){
			var column = Ext.create('Ext.grid.column.Column', obj[i]);
			this.lookupReference('mainGrid').headerCt.add(column);
    	}
		this.lookupReference('mainGrid').getView().refresh();      	
    },
    showProperty:function(selectedRowIndex){
		this.lookupReference('propertyList').getStore().removeAll();

		for(var j=0; j < lboParsingStrArraysItems[selectedRowIndex].arrayPropertyLen; j++){
			this.lookupReference('propertyList').getStore().add(
				{
					propertyName:lboParsingStrArraysItems[selectedRowIndex].arrayPropertyName[j],
					propertyValue:lboParsingStrArraysItems[selectedRowIndex].arrayPropertyValue[j]
				}
			);
    	}
    },
    selectedRecord:{
    	
    },
    onCellClickProperty:function(p1, p2, p3, record, p5, rowIndex){
    	console.log('onCellClickProperty', arguments);
    	this.selectedRecord = record;
    	record['propertyValue'] =3;
    	this.selectedPropertyIndex = rowIndex;
    	var panel = Ext.create('ExFrm.view.ide.RegProp');
    	panel.show();
    	panel.getController().calledByOther(
                            this.regCls,
                            record.data.propertyName,
    						record.data.propertyValue,
    						this.onRetRegProp,
    						this);
    	console.log('record', record);					
    },
    onRetRegProp:function(propName, propValue, openObj){
    	console.log(propName, propValue, openObj.selectedRecord);
    	
    	openObj.selectedRecord.set('propertyName',propName);
    	openObj.selectedRecord.set('propertyValue', propValue);
    	
    	console.log('>>>>>>>>>>>>>', openObj.selectedRecord['propertyValue']);
    	
    	var records = openObj.lookupReference('mainGrid').getStore().getRange();
		lboParsingStrArraysItems[openObj.selectedColumn].arrayPropertyName[openObj.selectedPropertyIndex] = propName;
		lboParsingStrArraysItems[openObj.selectedColumn].arrayPropertyValue[openObj.selectedPropertyIndex] = propValue;

    	records[openObj.selectedColumn].set(propName,propValue);
    },
    onSaveProp:function(){
    	var me = this;
    	me.refelectGrid(
    		me.regCls, 
    		me.lookupReference('propName').getValue(), 
    		this.lookupReference('propValue').getValue()
        );
        if(getLboLang()=='english')
            Ext.Msg.alert('Info', '"Apply to Properties" button click.');
        else 
            Ext.Msg.alert('확인', '속성반영 버튼을 클릭하여 반영하십시오');
    }, 
    onSaveColumn:function(){
    	console.log('onEdit', me);
    	
    	var me = this;
		var myItems = this.lookupReference('mainGrid').getStore().getRange();
		var propValue='[\n';
		for(var i = 0; i < myItems.length; i++){
			if( myItems[i].get('list')!= null && 
				myItems[i].get('list')!= '' &&
				myItems[i].get('list')!= ' '){
		    	propValue = propValue + 
		    		myItems[i].get('list') ;		        
		    }else {
                if(getLboLang()=='english')
                    Ext.Msg.alert('Error','Required file is not allowd blank.');
                else 
		    	    Ext.Msg.alert('확인','Required 파일은 공백이어서는 안됩니다.');
		    	return;
		    }		    
		    
            if(myItems[i].get('list').trim().substring(0,1) != '\'' && 
            myItems[i].get('list').trim().substring(0,1) != '"'){
                if(getLboLang()=='english')
                    Ext.Msg.alert('Error','Required File must be start with  charactor \' or "');
                else 
		    	    Ext.Msg.alert('확인','Required 파일은 \' or " (작은 따옴표 또는 큰 따옴표)로 시작해야 합니다.');
		    	return;    
            }
            if(myItems[i].get('list').trim().substring(myItems[i].get('list').trim().length-1 ,myItems[i].get('list').trim().length) != '\'' && 
                myItems[i].get('list').trim().substring(myItems[i].get('list').trim().length-1 ,myItems[i].get('list').trim().length) != '"'){
                if(getLboLang()=='english')
                    Ext.Msg.alert('Error','Required File must be ended with  charactor \' or " ');
                else 
		    	    Ext.Msg.alert('확인','Required 파일은 \' or " (작은 따옴표 또는 큰 따옴표)로 종료해야 합니다.');
		    	return;    
            }
            
            
            var requiredFile = '';
            
            if (myItems[i].get('list').indexOf('\'') != -1){
                requiredFile = myItems[i].get('list').replace('\'', '').replace('\'', '');
            }
            else {
                requiredFile = myItems[i].get('list').replace('"', '').replace('"', '');
            }
            
            console.log('requiredFile', requiredFile);
            if(requiredFile.indexOf('ExFrm.') == -1){
                if(getLboLang()=='english')
                    Ext.Msg.alert('Error','Required file must be start with "ExFrm."');
                else 
		    	    Ext.Msg.alert('확인','Required 파일은 ExFrm. 으로 시작해야 합니다. ');
		    	return;
            }
            if(requiredFile.indexOf('ExFrm.view.') != -1){
                requiredFile = requiredFile.replace('ExFrm.view.', '');
                var tempPoint = requiredFile.indexOf('.');
                
                var tempFolderName = requiredFile.substring(0, tempPoint);
                var tempFileName = requiredFile.substring(tempPoint+1, requiredFile.length);
                console.log('tempFolderName', tempFolderName, tempFileName)
                Ext.Ajax.request({
                    type:'ajax',
                    url:'./jsp/isExist.jsp',
                    params:{
                        path: lboServerPath +lboUserServerPath + '/app/view/' + tempFolderName + '/' + tempFileName + '.js'
                    },
                    success:function(res){     
                        console.log('res', res);
                        var obj = Ext.decode(res.responseText);
                        console.log('obj', obj);
                        if(obj.success == false){
                            if(getLboLang()=='english')
                                Ext.Msg.alert('Error', 'Your required File (' + tempFileName + ') may not valid.\\n Check your file \\n Write code at Code tab to process if outer library.');
                            else 
                                Ext.Msg.alert('경로', 'required한 파일 (' + tempFileName + ') 파일이 유효하지 않을 수 있습니다.\\n 다시 한번 확인하십시오. \\n 외부라이브러리일 경우 코드탭에서 직접 입력하십시오.');
                        
                            return;
                        }
                    },
                    failure:function(){
                        //alert('파일체크오류 -- 오류는 무시하셔도 됩니다.')
                    }
                });
            }
            
            
            
		    if(i==myItems.length-1){
		    	propValue = propValue + '';
		    }
		    else {
		    	propValue = propValue + ',\n';	
		    } 			    		    
		}
		propValue = propValue + ']';
		me.lookupReference('propValue').setValue(propValue);
		if(getLboLang()=='english')
			Ext.Msg.alert('info','Add to Properties button click and apply grid code.');
		else 
        	Ext.Msg.alert('확인','하단의 속성반영 버튼을 클릭하여 반영하십시오');
    },
    onReturnProperty:function(){
    	var strReturn = this.lookupReference('propValue').getValue();	//getStringFromArrays();
        console.log('strReturn', strReturn);
        console.log(this, this.retMethod);
        try{
            Ext.decode('{code:' + strReturn + '}');
        }catch(e){
			if(getLboLang()=='english')
				Ext.Msg.alert('Error', 'Your Grid Value is not JSON format. confirm your code like (", \')' + e);
			else
            	Ext.Msg.alert('오류', '입력값이 JSON형태가 아닙니다. 입력값중 따옴표나 콤마등이 누락되었는지 확인하십시오' + e);
            return;
        }
        
    	this.retMethod(
    		'requires',
    		strReturn,
    		this.openerObj);
    	this.getView().destroy();    	
    },
    onAddRow:function(){
        var data = {
            list:''
        };
        this.lookupReference('mainGrid').getStore().add(data); 
    },
    onRemoveRow:function(){
        var selection = this.lookupReference('mainGrid').getView().getSelectionModel().getSelection();
        if(selection != null){
            this.lookupReference('mainGrid').getStore().remove(selection[0]);
        }
    },
    onMinusRow:function(){
        var selection = this.lookupReference('mainGrid').getView().getSelectionModel().getSelection();
        console.log('selection', selection);
        if(selection != null){
            this.lookupReference('mainGrid').getStore().remove(selection[0]);
        }
        else {
            if(getLboLang()=='english')
                Ext.Msg.alert('error', 'Select grid first.');
            else 
                Ext.Msg.alert('확인', '그리드를 선택하세요');
            return;
        }        
    }
});