Ext.define('ExFrm.view.ide.RegEventController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.regevent',
	retMethod:{},
	openerObj:{}, 
	init:function(){
		
		console.log("ExFrm.app.getController('IdeController').selectedViewPanel", ExFrm.app.getController('IdeController').selectedViewPanel);
		var exGroupRef = Ext.ComponentQuery.query('[exGroupRef=true]', ExFrm.app.getController('IdeController').selectedViewPanel);
		var exGridRef = Ext.ComponentQuery.query('[exIsGridView=true]', ExFrm.app.getController('IdeController').selectedViewPanel);

		console.log('exGroupRef', exGroupRef);
        console.log('exGridRef', exGridRef);
        
        // 그리드를 설정한다. 
        for(var i=0; i < exGridRef.length; i++){
			this.lookupReference('ajaxGridCallFrom').getStore().add(
				{name:exGridRef[i].reference, value:exGridRef[i].reference}
			);
			this.lookupReference('gridToStoreFromGrid').getStore().add(
				{name:exGridRef[i].reference, value:exGridRef[i].reference}
			);     
			this.lookupReference('gridAllRef').getStore().add(
				{name:exGridRef[i].reference, value:exGridRef[i].reference}
			);  
            this.lookupReference('gridToAjaxFromGrid').getStore().add(
				{name:exGridRef[i].reference, value:exGridRef[i].reference}
			);    
 			this.lookupReference('fromArea').getStore().add(
				{name:exGridRef[i].reference, value:exGridRef[i].reference}
			);           
            
        }
        
		// 화면에 있는 그룹레퍼런스의 레퍼런스 목록을 가져온다.
		for(var i=0; i < exGroupRef.length; i++){

			this.lookupReference('toArea').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);	
			this.lookupReference('ajaxToItemRef').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);	
           /*
			this.lookupReference('gridAllRef').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);	
            */
			this.lookupReference('areaToStoreFromArea').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);
            /*	
			this.lookupReference('gridToStoreFromGrid').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);
	
			this.lookupReference('gridToAjaxFromGrid').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);		
            */		
			
			
			this.lookupReference('itemAjaxItemFromRef').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);	
			this.lookupReference('itemAjaxItemToRef').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);				
			this.lookupReference('gridToAjaxToArea').getStore().add(
				{name:exGroupRef[i].reference, value:exGroupRef[i].reference}
			);	
			
						
		}
		// 스토어를 호출한다. gridToStoreToStore
		for(var i=0; i < lboModelIdCount; i++){
			this.lookupReference('storeLoadingStoreList').getStore().add(
				{name:lboModelStore[i].name, value:lboModelStore[i].name}
			);		
			this.lookupReference('areaToStoreToStore').getStore().add(
				{name:lboModelStore[i].name, value:lboModelStore[i].name}
			);				
			this.lookupReference('gridToStoreToStore').getStore().add(
				{name:lboModelStore[i].name, value:lboModelStore[i].name}
			);				
				
		}
		console.log('lboSelectedInfo.widget',lboSelectedInfo.widget);
		//debugger;
		//console.log(lboSelectedInfo.widget.managedListeners);
		//var len = lboSelectedInfo.widget.managedListeners.length;
		//console.log(lboSelectedInfo.widget.hasListener('click'),'............');
		var len = lboEventList.length;
		var data = [];
		var count = 0;
		console.log('길이', len);
		var w;
		while(count < 10){
			console.log('w' + count,w);
			if(count == 0){
				w = lboSelectedInfo.widget;
				for(var i=0; i < len;i++){
					//console.log('lboSelectedInfo.widget.managedListeners[i]',lboSelectedInfo.widget.managedListeners[i]);
					//data.push({code:lboSelectedInfo.widget.managedListeners[i].ename, value:lboSelectedInfo.widget.managedListeners[i].ename, help:''});
					if(w.xtype == lboEventList[i].c){
						data.push({code:lboEventList[i].n, value:'function' + lboEventList[i].f.replace('this', lboEventList[i].c) , help:''});
					}
					//console.log('..',Ext.event.Event(lboSelectedInfo.widget.managedListeners[i]).getInitialConfig());
					//debugger;
					//console.log(lboEventList[i].code);
					//if(lboSelectedInfo.widget.hasListener(lboEventList[i].code)==true){
					//	console.log('들어옴');
					//	data.push({code:lboEventList[i].code, value:lboEventList[i].code, help:''});
					//}
				}				
			}
			else if( w.superclass != 'undefined' && w.superclass != null){
				w = w.superclass;
				console.log('superclass', w);
				for(var i=0; i < len;i++){
					//console.log('lboSelectedInfo.widget.managedListeners[i]',lboSelectedInfo.widget.managedListeners[i]);
					//data.push({code:lboSelectedInfo.widget.managedListeners[i].ename, value:lboSelectedInfo.widget.managedListeners[i].ename, help:''});
					if(w.xtype == lboEventList[i].c){
						console.log(w.xtype, lboEventList[i]);
						data.push({code:lboEventList[i].n, value:'function' + lboEventList[i].f.replace('this', lboEventList[i].c) , help:''});
					}
					//console.log('..',Ext.event.Event(lboSelectedInfo.widget.managedListeners[i]).getInitialConfig());
					//debugger;
					//console.log(lboEventList[i].code);
					//if(lboSelectedInfo.widget.hasListener(lboEventList[i].code)==true){
					//	console.log('들어옴');
					//	data.push({code:lboEventList[i].code, value:lboEventList[i].code, help:''});
					//}
				}
			}
			else {
				console.log('out' + count);
				count = 10;
			}
			count++;

		}
		console.log('data',data);
		this.lookupReference('eventKind').getStore().add(data);
		
		
	},
    calledByOther:function(kind, propName, propValue,openerMethod,openerObj){
    	/*
    	this.openerObj = openerObj
		this.retMethod = openerMethod;
		this.lookupReference('propName').setValue(propName);
		this.lookupReference('propValue').setValue(propValue);
    	*/
    },  
    onSave:function(){
    	this.retMethod(
    		this.lookupReference('propName').getValue(),
    		this.lookupReference('propValue').getValue(),
    		this.openerObj);
    	this.getView().destroy();
    },
    onCancel:function(){
    	this.getView().destroy();
    },
    onRegEventCheck:function(){
    	var eventKind = this.lookupReference('eventKind').getValue();
    	console.log(eventKind);
    	/*
 		var count=0;
 		var selectedEvent=[];
 		if(eventKind != ''){
	 		for(var i =0; i< lboEventList.length; i++){
	 			if(lboEventList[i].code == eventKind){
	 				selectedEvent.push(lboEventList[i]);
	 				count++;
	 			}
	 		}
	 	}
	 	console.log('count', count);
	 	*/
        if(eventKind != null && eventKind != ''){
	 	    this.onRegEvent(eventKind);
        }
        else{
            this.onRegEvent(this.lookupReference('eventElKind').getValue());
        }
	 	
	 	/*
	 	if( count > 1){
	 		var panel = Ext.create('ExFrm.view.ide.EventFunctionList');
	 		panel.getController().calledByOther(selectedEvent, this.onRegEventCheckReceive, this);
	 	}
	 	else if(count == 1){
	 		this.onRegEvent(selectedEvent[0].value);
	 	}
	 	else{
	 		this.onRegEvent('function()');
	 	}
	 	*/
    },
    onRegEventCheckReceive:function(eventList, openerObj){
    	openerObj.onRegEvent(eventList.value);
    },
    onRegEvent:function(eventList){
    	var me = this;
		var mappingCode = '        var me = this;\n';
		var mappingCodeCallback = '';
    	var areaMappingCls = this.lookupReference('areaMappingCls').checked;

    	var eventCode = '';
    	var eventKindRet = '';
    	var eventFuncStr = '';
    	var eventKindName = '';
    	var eventKind = this.lookupReference('eventKind');
    	var eventElKind = this.lookupReference('eventElKind');
    	var eventFuncName = this.lookupReference('eventFuncName').getValue();
    	if(eventFuncName.indexOf('\'') != -1){
			if(getLboLang() == 'english')
				Ext.Msg.alert('Error', ' Do not use charactor \'');
			else 
    			Ext.Msg.alert('오류', '\'를 사용하지 마십시오');

    		return;
    	}
    	if(eventFuncName.indexOf('"') != -1){
			if(getLboLang() == 'english')
				Ext.Msg.alert('오류', 'Do not use charactor "');
			else 
    			Ext.Msg.alert('오류', '"를 사용하지 마십시오');
    		return;
    	}
        if(eventFuncName == '' || eventFuncName == ' '){
			if(getLboLang() == 'english')
				Ext.Msg.alert('Error', 'Input Event Name');
			else 
    			Ext.Msg.alert('오류', '이벤트명을 입력하십시오');
    		return;            
        }
    	if(eventKind.getValue() != null && eventKind.getValue() != ''){
            
    		eventKindRet = eventKind;
    		eventFuncStr = eventKind.getValue();
    		eventKindName = eventKind.getRawValue();
    	}
    	else{
    		eventKindRet = eventElKind;
    		eventFuncStr = eventElKind.getValue();
    		eventKindName = eventElKind.getRawValue();
    	}
        //debugger;
        
		var controllerCodeExclude = me.lookupReference('chkControllerExclude').checked;
		if(controllerCodeExclude == true){
			if(	this.lookupReference('storeLoadingCls').checked == true ||
                this.lookupReference('ajaxCallCls').checked== true ||
				this.lookupReference('formSubmitCls').checked == true ||
				this.lookupReference('ajaxGridCallCls').checked == true || 
				this.lookupReference('gridToStoreCls').checked == true || 
				
                this.lookupReference('areaMappingCls').checked== true ||
				this.lookupReference('ajaxToItemCls').checked == true || 
				this.lookupReference('itemAjaxItemCls').checked == true || 
				this.lookupReference('gridAllCls').checked == true 
				
			){
				if(getLboLang() == 'english')
					Ext.msg.Alert('Error','If ViewController is not created. Additional Code can\'t be use.');
				else 
					Ext.msg.Alert('확인','컨트롤러 코드를 추가하지 않을 경우 부가코드를 등록할 수 없습니다.');
				return;
			}
		}
 		// 스토어 호출
		if(this.lookupReference('storeLoadingCls').checked == true){
			mappingCode = mappingCode + '    var params = {};\n ';
			mappingCode = mappingCode + 
			'        me.callStore(me, \'' + this.lookupReference('storeLoadingStoreList').getValue() +'\', \'\', params, me.' + me.lookupReference('storeLoadingStoreList').getValue() + 'Callback);\n';
			
			mappingCodeCallback = mappingCodeCallback + 
			'    ' + me.lookupReference('storeLoadingStoreList').getValue() + 'Callback:function(me, success, records, operation){\n' + 
            '        // add your code\n' + 
			'    }';
		}         
        // Ajax Call
        else if(this.lookupReference('ajaxCallCls').checked == true){
			mappingCode = mappingCode + 
                '        var params = {};\n' + 	
				'        me.callAjax(me,  lboUserJsonPath +  \'/view/sample/JsonFileName.json\', params, me.' + eventFuncName + 'Callback );\n'; 		
			mappingCodeCallback = '    ' + eventFuncName + 'Callback:function(me, success, res, record){\n' +
			    '        if(success==true){\n' +  		
                '            // add your code\n' +
				'        }\n' +  	
			    '    }';           
        }
        
		// 폼서밋
		else if(this.lookupReference('formSubmitCls').checked == true){
			mappingCode = mappingCode + 
			'        me.callForm(me, \'./test/sampleSubmit.jsp\', me.' + eventFuncName + 'Callback);\n';
			mappingCodeCallback = '    ' + eventFuncName + 'Callback:function(me, success, form, action){\n' ;
			mappingCodeCallback = mappingCodeCallback + '        console.log(\'action\', action);\n' ;	
            mappingCodeCallback = mappingCodeCallback + '        // add your code;\n' ;			
			mappingCodeCallback = mappingCodeCallback + '    }';
			
		}	
        // 그리드 to Ajax
        else if(this.lookupReference('ajaxGridCallCls').checked == true){
    		var fromArea = this.lookupReference('ajaxGridCallFrom').getValue();
			var fromArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + fromArea + ']')[0];
			
			console.log(fromArea);
			var fromAreaWidgets = fromArea;//.query('[reference]');
			console.log(fromAreaWidgets);

            if(fromAreaWidgets == null){
				if(getLboLang() == 'english')
					Ext.Msg.alert('Error', 'Selecting grid is invalid');
				else 
                	Ext.Msg.alert('확인', '그리드 선택이 잘못되었습니다.');
                return;
            }
            if(fromAreaWidgets.columns == null || fromAreaWidgets.columns == 'undefined' ||  
                fromAreaWidgets.columns.length == null || fromAreaWidgets.columns.length == 'undefined'){
				if(getLboLang() == 'english')
					Ext.Msg.alert('Error', 'Column is not exist. Add column first.');
				else 
                	Ext.Msg.alert('확인', '그리드 컬럼이 존재하지 않습니다.');
                return;                
            }	
			mappingCode = mappingCode + 
                '        if(this.lookupReference(\'' + fromArea.reference + '\').getSelectionModel()== null ||\n' + 
                '            this.lookupReference(\'' + fromArea.reference + '\').getSelectionModel().getSelection().length ==0){\n'+
                '            Ext.Msg.alert(\'Error\',\'Select grid\');\n' + 
                '        }\n' + 
                '        var record = this.lookupReference(\'' + fromArea.reference + '\').getSelectionModel().getSelection()[0];\n' +
                '        var row = this.lookupReference(\'' + fromArea.reference + '\').store.indexOf(record);\n' +  
                '        var params = {\n';
                
			for(var i=0; i < fromAreaWidgets.columns.length; i++){
                if(i!= fromAreaWidgets.columns.length -1){
                    mappingCode = mappingCode + 
                    '            ' + fromAreaWidgets.columns[i].dataIndex + ': record.data.' + fromAreaWidgets.columns[i].dataIndex + ',\n';
                } else  {
                    mappingCode = mappingCode + 
                    '            ' + fromAreaWidgets.columns[i].dataIndex + ': record.data.' + fromAreaWidgets.columns[i].dataIndex + '\n';               
                }
			}   
            mappingCode = mappingCode +              
                '        };\n' + 
				'        me.callAjax(me,  lboUserJsonPath +  \'/view/sample/YourJsonFileName.json\', params, me.' + eventFuncName + 'Callback );\n'; 		
                
			mappingCodeCallback = 
                '    ' + eventFuncName + 'Callback:function(me, success, res, record){\n' +
				'        if(success==true){ \n' + 	
                '            // add your code \n' + 	
				'        }\n' + 
			    '    }';
        }
        // 그리드  To 스토어
		else if(this.lookupReference('gridToStoreCls').checked == true){
    		var fromArea = this.lookupReference('gridToStoreFromGrid').getValue();
    		//var toArea = this.lookupReference('gridToStoreToStore').getValue();	
   			//fromArea가 그리드일 경우 
			var fromArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + fromArea + ']')[0];
			//var toArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + toArea + ']')[0];
			
			console.log(fromArea, toArea);
			
			mappingCode = mappingCode +  
                '        if(me.lookupReference(\'' + fromArea.reference + '\').getSelectionModel()== null ||\n' + 
                '            me.lookupReference(\'' + fromArea.reference + '\').getSelectionModel().getSelection().length ==0){\n'+
                '            Ext.Msg.alert(\'Error\',\'Select Grid\');\n' + 
                '        }\n' +             
                '        var record = me.lookupReference(\'' + fromArea.reference + '\').getSelectionModel().getSelection()[0];\n' +
                '        var row = me.lookupReference(\'' + fromArea.reference + '\').store.indexOf(record);\n' +              
                '        var params = {\n';
			var fromAreaWidgets = fromArea;//.query('[reference]');
			console.log(fromAreaWidgets);
			//var toAreaWidgets = toArea.query('[reference]');
			console.log(toAreaWidgets);	
			for(var i=0; i < fromAreaWidgets.columns.length; i++){
				console.log(i + ':' + fromAreaWidgets.columns[i].dataIndex);
				//console.log(i + ':' + toAreaWidgets[j].reference);
				if(i != fromAreaWidgets.columns.length -1){
					mappingCode = mappingCode + 
					'            ' + fromAreaWidgets.columns[i].dataIndex + ':record.data.' + fromAreaWidgets.columns[i].dataIndex + ',\n';
				}
				else {
					mappingCode = mappingCode + 
					'            ' + fromAreaWidgets.columns[i].dataIndex + ':record.data.' + fromAreaWidgets.columns[i].dataIndex +'\n';
				}
			}
			mappingCode =  mappingCode + '        };\n';	
			mappingCode = mappingCode + 
			'     	me.callStore(me, \'' + me.lookupReference('gridToStoreToStore').getValue() + '\', \'\', params, me.' + me.lookupReference('gridToStoreToStore').getValue() + 'Callback);\n';
			
			mappingCodeCallback = mappingCodeCallback + 
			'    ' + me.lookupReference('gridToStoreToStore').getValue() + 'Callback:function(me, success, records, operation){\n' + 
			'        if(success==true){ \n' + 	
			'            // add your code \n' + 	
			'        }\n' + 
            '    }';			
		}
		// 그리드 데이터 가져오기
		else if(this.lookupReference('gridAllCls').checked == true){
    		var gridAllRef = this.lookupReference('gridAllRef').getValue();
    		
    		var gridDataWidget = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + gridAllRef + ']')[0];
			mappingCode = mappingCode + 
	        '        var records = this.lookupReference(\''+ gridAllRef + '\').getStore().getRange();\n'+
	        '        var myJson = [];\n'+
	        '        for(var i=0; i< records.length; i++){\n'+
	        '            myJson.push({\n';
	        for(var i=0; i < gridDataWidget.columns.length; i++){
				console.log(i + ':' + gridDataWidget.columns[i].dataIndex);
				//console.log(i + ':' + toAreaWidgets[j].reference);
				if(i != gridDataWidget.columns.length){
					mappingCode = mappingCode + 
					'            ' + gridDataWidget.columns[i].dataIndex + ':records[i].data.' + gridDataWidget.columns[i].dataIndex + ',\n';
				}
				else {
					mappingCode = mappingCode + 
					'            ' + gridDataWidget.columns[i].dataIndex + ':records[i].data.' + gridDataWidget.columns[i].dataIndex +'\n';
				}
			}
			mappingCode = mappingCode + 
	        '            });\n'+
	        '        }\n'+
	        '        var strGridItems = Ext.encode(myJson);\n' + 
            '        // add your code\n';				
		}        
		// 그리드  To 영역
		else if(this.lookupReference('areaMappingCls').checked == true){
    		var fromArea = this.lookupReference('fromArea').getValue();
    		var toArea = this.lookupReference('toArea').getValue();	
   			//fromArea가 그리드일 경우 
			var fromArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + fromArea + ']')[0];
			var toArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + toArea + ']')[0];
			
			console.log(fromArea, toArea);
			mappingCode = '        var me = this;\n';
			var fromAreaWidgets = fromArea;//.query('[reference]');
			console.log(fromAreaWidgets);
			var toAreaWidgets = toArea.query('[reference]');
			console.log(toAreaWidgets);
            if(fromAreaWidgets == null){
				if(getLboLang() == 'english')
					Ext.Msg.alert('Error', 'Select the Grid');
				else 
                	Ext.Msg.alert('확인', '그리드 선택이 잘못되었습니다.');
                return;
            }
            if(fromAreaWidgets.columns == null || fromAreaWidgets.columns == 'undefined' ||  
                fromAreaWidgets.columns.length == null || fromAreaWidgets.columns.length == 'undefined'){
				if(getLboLang() == 'english')
					Ext.Msg.alert('Error', 'Add columns to Grid first.');
				else 
                	Ext.Msg.alert('확인', '그리드 컬럼이 존재하지 않습니다.');
                return;                
            }	
			for(var i=0; i < fromAreaWidgets.columns.length; i++){
				var isExist = false;
				var widgetRef = '';
				for(var j=0;j < toAreaWidgets.length; j++){
					console.log(i + ':' + fromAreaWidgets.columns[i].dataIndex);
					console.log(i + ':' + toAreaWidgets[j].reference);
					widgetRef =  toAreaWidgets[j].reference;
					if(fromAreaWidgets.columns[i].dataIndex == toAreaWidgets[j].reference){
						isExist = true;
						mappingCode = mappingCode + 
						'        this.lookupReference(\'' + toAreaWidgets[j].reference + '\').setExValue(record.data.' + toAreaWidgets[j].reference + ');  // mapping field  \n';
					}
				} 
				if(isExist == false){
					mappingCode = mappingCode + 
					'        // this.lookupReference(\'' + fromAreaWidgets.columns[i].dataIndex + '\').setExValue(record.data.' + fromAreaWidgets.columns[i].dataIndex + ');  // unmapping field \n';
				}
			}		
		}
		// 영역 To 스토어
		else if(this.lookupReference('areaToStoreCls').checked == true){
    		var fromArea = this.lookupReference('areaToStoreFromArea').getValue();
    		//var toArea = this.lookupReference('gridToStoreToStore').getValue();	
   			//fromArea가 그리드일 경우 
               
            console.log('fromArea***', fromArea);
			var fromArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + fromArea + ']')[0];
			//var toArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + toArea + ']')[0];
			
			console.log(fromArea, toArea);
            //debugger;
			
			mappingCode = '        var me = this;\n        var params = {\n';
			var fromAreaWidgets = fromArea.query('[reference]');
			console.log('...',fromAreaWidgets);
			//var toAreaWidgets = toArea.query('[reference]');
			console.log(toAreaWidgets);	
			for(var i=0; i < fromAreaWidgets.length; i++){
				console.log(i + ':' + fromAreaWidgets[i].reference);
				//console.log(i + ':' + toAreaWidgets[j].reference);
				if(i != fromAreaWidgets.length){
					mappingCode = mappingCode + 
					'            ' + fromAreaWidgets[i].reference + ': this.lookupReference(\'' + fromAreaWidgets[i].reference + '\').getExValue(),\n';
				}
				else {
					mappingCode = mappingCode + 
					'            ' + fromAreaWidgets[i].reference + ': this.lookupReference(\'' + fromAreaWidgets[i].reference + '\').getExValue()\n';
				}
			}
			mappingCode =  mappingCode + '        };\n';	
			mappingCode = mappingCode + 
			'     	me.callStore(me, \'' + me.lookupReference('areaToStoreToStore').getValue() + '\', \'\', params, me.' + me.lookupReference('areaToStoreToStore').getValue() + 'Callback);\n';
			
			mappingCodeCallback = mappingCodeCallback + 
			'    ' + me.lookupReference('areaToStoreToStore').getValue() + 'Callback:function(me, success, records, operation){\n' + 
			'        if(success == true){\n' + 
			'            // add your code\n' + 
			'        }\n' + 
            '    }';			
		}        

		// 그리드 To Ajax -> 영역 
		else if(this.lookupReference('gridToAjaxCls').checked == true){
    		var fromArea = this.lookupReference('gridToAjaxFromGrid').getValue(); //gridToAjaxFromGrid
    		var toArea = this.lookupReference('gridToAjaxToArea').getValue(); //gridToAjaxToArea
   			//fromArea가 그리드일 경우 
			var fromArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + fromArea + ']')[0];
			var toArea = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + toArea + ']')[0];
			
			console.log(fromArea, toArea);
			
			mappingCode = '\n        var me = this;\n        var params = {\n';
			var fromAreaWidgets = fromArea;//.query('[reference]');
			console.log(fromAreaWidgets);
			for(var i=0; i < fromAreaWidgets.columns.length; i++){
				console.log(i + ':' + fromAreaWidgets.columns[i].dataIndex);
				//console.log(i + ':' + toAreaWidgets[j].reference);
				if(i != fromAreaWidgets.columns.length-1){
					mappingCode = mappingCode + 
					'            ' + fromAreaWidgets.columns[i].dataIndex + ':record.data.' + fromAreaWidgets.columns[i].dataIndex + ',\n';
				}
				else {
					mappingCode = mappingCode + 
					'            ' + fromAreaWidgets.columns[i].dataIndex + ':record.data.' + fromAreaWidgets.columns[i].dataIndex +'\n';
				}
			}
			mappingCode = mappingCode + '        };\n';	
			mappingCode = mappingCode + '        me.callAjax(me,  lboUserJsonPath +  \'/view/sample/YourJsonFileName.json\', params, me.' + eventFuncName + 'Callback );\n'; 		

			var toAreaWidgets = toArea.query('[reference]');
			console.log(toAreaWidgets);	
			mappingCodeCallback = '    ' + eventFuncName + 'Callback:function(me, success, res, record){\n';
			mappingCodeCallback = mappingCodeCallback + '        if(success== true){\n';
			for(var i=0; i < toAreaWidgets.length; i++){
				mappingCodeCallback = mappingCodeCallback + 
				'        me.lookupReference(\'' + toAreaWidgets[i].reference + '\').setExValue(record.data.info.' + toAreaWidgets[i].reference + ');\n';
			}
			mappingCodeCallback = mappingCodeCallback + '        }\n';
			mappingCodeCallback = mappingCodeCallback + '    }';

		}		
		// Ajax To 영역
		else if(this.lookupReference('ajaxToItemCls').checked == true){
			var  ajaxToItemRef = this.lookupReference('ajaxToItemRef').getValue();
			var ajaxToItemWidgets = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + ajaxToItemRef + ']')[0];
			mappingCode = mappingCode + 	
			'        var params = {}\n' + 
			'        me.callAjax(me,  lboUserJsonPath +  \'/view/sample/YourJsonFileName.json\', params, me.' + eventFuncName + 'Callback );\n'; 	
	
			console.log('테스트', ajaxToItemWidgets);
			mappingCodeCallback = '    ' + eventFuncName + 'Callback:function(me, success, res, record){\n';
			mappingCodeCallback = mappingCodeCallback + '        if(success==true){\n';	
			var toAreaWidgets = ajaxToItemWidgets.query('[reference]');		
			for(var i=0; i < toAreaWidgets.length; i++){
				console.log('loop', toAreaWidgets);
					mappingCodeCallback = mappingCodeCallback + 
					'            me.lookupReference(\'' + toAreaWidgets[i].reference + '\').setExValue(record.data.info.' + toAreaWidgets[i].reference + ');\n';
			}
			mappingCodeCallback = mappingCodeCallback + '        }\n';
			mappingCodeCallback = mappingCodeCallback + '    }';
			console.log('>>>', mappingCode, mappingCodeCallback)
		}	
		// 영억 To Ajax To 영역
		else if(this.lookupReference('itemAjaxItemCls').checked == true){
			
			
			var  ajaxFromItemRef = this.lookupReference('itemAjaxItemFromRef').getValue();
			var  ajaxToItemRef = this.lookupReference('itemAjaxItemToRef').getValue();
			var ajaxFromItemWidgets = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + ajaxFromItemRef + ']')[0];
			var ajaxToItemWidgets = ExFrm.app.getController('IdeController').selectedViewPanel.query('[reference=' + ajaxToItemRef + ']')[0];
			mappingCode = mappingCode + 	
			'        var params = {\n';	
			var fromAreaWidgets = ajaxFromItemWidgets.query('[reference]');		
			for(var i=0; i < fromAreaWidgets.length; i++){
				console.log('loop', fromAreaWidgets);
					if(i != fromAreaWidgets.length -1) {
						mappingCode = mappingCode + 
						'            ' + fromAreaWidgets[i].reference + ': me.lookupReference(\'' + fromAreaWidgets[i].reference  + '\').getExValue(),\n';
					} else {
						mappingCode = mappingCode + 
						'            ' + fromAreaWidgets[i].reference + ': me.lookupReference(\'' + fromAreaWidgets[i].reference + '\').getExValue()\n';
					}					
			}	
				
			mappingCode = mappingCode + 
			'        };\n' + 	
			'        me.callAjax(me,  lboUserJsonPath +  \'/view/sample/JsonFileName.json\', params, me.' + eventFuncName + 'Callback );\n'; 
	
			//console.log('테스트', ajaxToItemWidgets);
			mappingCodeCallback = '   ' + eventFuncName + 'Callback:function(me, success, res, record){\n';
			mappingCodeCallback = mappingCodeCallback + '        if(success==true){\n';	
			var toAreaWidgets = ajaxToItemWidgets.query('[reference]');		
			for(var i=0; i < toAreaWidgets.length; i++){
				console.log('loop', toAreaWidgets);
					mappingCodeCallback = mappingCodeCallback + 
					'            me.lookupReference(\'' + toAreaWidgets[i].reference + '\').setExValue(record.data.info.' + toAreaWidgets[i].reference + ');\n';
			}
			mappingCodeCallback = mappingCodeCallback + '        }\n';
			mappingCodeCallback = mappingCodeCallback + '    }';
			console.log('>>>', mappingCode, mappingCodeCallback);
		}	

			
		console.log('mappingCode',mappingCode);

    	//if(eventList != null && eventList != ''){
    	eventFuncStr = eventList;
    	//}
    	var eventCodes  = eventFuncName + ':' + eventFuncStr + '{\n' + mappingCode + '    }';
 		//var eventCallbackCodes  = eventFuncStr + 'Callback:function(me, success, res, record){\n' + mappingCodeCallback + '    }';
 	
		console.log('mappingCodeCallback',mappingCodeCallback);
    	ExFrm.app.getController('IdeController').regEvent(
			this, eventCodes, eventKindName , controllerCodeExclude, areaMappingCls, fromArea, toArea, mappingCodeCallback);
		this.getView().destroy();
    } 
});