Ext.define('ExFrm.view.ide.ColumnPropController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.columnprop',
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
    	lboParginsArrays(propValue);
    	console.log('lboArrayItemParse', lboArrayItemParse);
    	for(var i=0; i <lboArrayIdCountParse; i++){
    		var columnText = '';
    		var columnDataIndex = '';
    		//var columnType = '';
    		var columnWidth = '';
    		var columnFlex = '';
            var columnXtype = '';
            var columnExType = '';
            var columnExSummaryType = '';
            //var columnExFormat = '';
            var columnExUserString = '';
            var columnExUserRecords = '';
			var columnExGroupField = '';
            var columnExAlign = '';
			var columnExColor = '';
			var columnExFontColor = '';
            var columnExHidden = ''; 
    		var columnRenderer = '';
    		var columnSummaryRenderer = '';
            var columnWidget = '';
            var columnOnWidgetAttach = '';
    		var columnEditor = '';
            //var columnGrouping = '';
            var columnEtc = '';

            var columnLocked = '';
            var columnSortable = '';
            var columnResizable = '';
            var columnColumnWidth = '';
            var columnEmptyCellText = ''; 
            
            var columnExDisplayField = '';
            var columnExValueField = '';
            var columnExBindStore = '';
			var columnExDataColumn = '';


            var columnEtcCount = 0;
            console.log('lboArrayItemParse[i]', lboArrayItemParse[i]);                                  
			for(var j=0; j < lboArrayItemParse[i].arrayPropertyLen; j++){
				if(lboArrayItemParse[i].arrayPropertyName[j] == 'text'){
					columnText = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'dataIndex'){
					columnDataIndex = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                /*
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'type'){
					columnType = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}*/
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'width'){
					columnWidth = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'flex'){
					columnFlex = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'xtype'){
					columnXtype = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exType'){
					columnExType = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exSummaryType'){
					columnExSummaryType = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}/*
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exFormat'){
					columnExFormat = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}*/
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exUserString'){
					columnExUserString = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exUserRecords'){
					columnExUserRecords = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exGroupField'){
					columnExGroupField = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exAlign'){
					columnExAlign = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}  
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exColor'){
					columnExColor = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}    
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exFontColor'){
					columnExFontColor = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}    								                                                                                                              
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exHidden'){
					columnExHidden = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}                 

				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exDisplayField'){
					columnExDisplayField = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exValueField'){
					columnExValueField = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exBindStore'){
					columnExBindStore = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}    
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'exDataColumn'){
					columnExDataColumn = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}                                                
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'renderer'){
					columnRenderer = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'summaryRenderer'){
					columnSummaryRenderer = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                else if(lboArrayItemParse[i].arrayPropertyName[j] == 'widget'){
					columnWidget = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                else if(lboArrayItemParse[i].arrayPropertyName[j] == 'onWidgetAttach'){
					columnOnWidgetAttach = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                else if(lboArrayItemParse[i].arrayPropertyName[j] == 'editor'){
					columnEditor = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                /*
				else if(lboArrayItemParse[i].arrayPropertyName[j] == 'grouping'){
					columnGrouping = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}*/
                else if(lboArrayItemParse[i].arrayPropertyName[j] == 'locked'){
					columnLocked = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                else if(lboArrayItemParse[i].arrayPropertyName[j] == 'sortable'){
					columnSortable = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                else if(lboArrayItemParse[i].arrayPropertyName[j] == 'resizable'){
					columnResizable = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                else if(lboArrayItemParse[i].arrayPropertyName[j] == 'columnWidth'){
					columnColumnWidth = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                else if(lboArrayItemParse[i].arrayPropertyName[j] == 'emptyCellText'){
					columnEmptyCellText = lboArrayItemParse[i].arrayPropertyValue[j]; 
				}
                else {
                    if(columnEtcCount == 0){
                        columnEtc = columnEtc + lboArrayItemParse[i].arrayPropertyName[j] + ':' + lboArrayItemParse[i].arrayPropertyValue[j]
                    }
                    else {
                        columnEtc = columnEtc + ',\n' + lboArrayItemParse[i].arrayPropertyName[j] + ':' + lboArrayItemParse[i].arrayPropertyValue[j]
                    }
                    columnEtcCount++;
                }
			}
			console.log('등록');
                        
			var data = {
				text:columnText,
				dataIndex:columnDataIndex,
				//type:columnType,
				width:columnWidth,
				flex:columnFlex,
                xtype:columnXtype,
                exType:columnExType,
                exSummaryType:columnExSummaryType,
                //exFormat:columnExFormat,
                exUserString:columnExUserString,
                exUserRecords:columnExUserRecords,
				exGroupField:columnExGroupField,
                exAlign:columnExAlign,
				exColor:columnExColor,
				exFontColor:columnExFontColor,
                exHidden:columnExHidden,
                exDisplayField:columnExDisplayField,
                exValueField:columnExValueField,
                exBindStore:columnExBindStore,
				exDataColumn:columnExDataColumn,
				renderer:columnRenderer,
				summaryRenderer:columnSummaryRenderer,
                widget:columnWidget,
                onWidgetAttach:columnOnWidgetAttach,
                editor:columnEditor,
				//grouping:columnGrouping,
                locked:columnLocked,
                sortable:columnSortable,
                resizable:columnResizable,
                columnWidth:columnColumnWidth,
                emptyCellText:columnEmptyCellText,
                etc:columnEtc
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
    	//console.log('onDblClick', record);
    	this.selectedColumn = rowIndex;
    	
    	/*
    	var selectedColumn = this.obj[columnIndex];
    	console.log('this.obj[columnIndex]',this.obj[columnIndex]);
    	this.selectedColumnIndex = columnIndex;
    	*/
    	//this.showProperty(rowIndex);
    	
		//ExFrm.app.getController('IdeController').addItem(record.data.initStr);	    	
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

		for(var j=0; j < lboArrayItemParse[selectedRowIndex].arrayPropertyLen; j++){
			this.lookupReference('propertyList').getStore().add(
				{
					propertyName:lboArrayItemParse[selectedRowIndex].arrayPropertyName[j],
					propertyValue:lboArrayItemParse[selectedRowIndex].arrayPropertyValue[j]
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
		lboArrayItemParse[openObj.selectedColumn].arrayPropertyName[openObj.selectedPropertyIndex] = propName;
		lboArrayItemParse[openObj.selectedColumn].arrayPropertyValue[openObj.selectedPropertyIndex] = propValue;

    	records[openObj.selectedColumn].set(propName,propValue);
        /*
		if(propName== 'text'){
	    	records[openObj.selectedColumn].set(propName,propValue);
		}
		else if(propName == 'dataIndex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
		else if(propName == 'type'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
		else if(propName == 'width'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
		else if(propName == 'flex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        
		else if(propName == 'xtype'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        else if(propName == 'flex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        else if(propName == 'flex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        else if(propName == 'flex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        else if(propName == 'flex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        else if(propName == 'flex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        else if(propName == 'flex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        else if(propName == 'flex'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
        
                
'',
'exType',
'exSummaryType',
'exFormat',
'exUserString',
'exUserRecord',
'exAlign',
'exHidden',         
        
		else if(propName == 'renderer'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
		else if(propName == 'summaryRenderer'){
			records[openObj.selectedColumn].set(propName,propValue);
		}
		else if(propName == 'grouping'){
			records[openObj.selectedColumn].set(propName,propValue);
		} 
        */   	
    	
    },
    onSaveProp:function(){
    	var me = this;
    	me.refelectGrid(
    		me.regCls, 
    		me.lookupReference('propName').getValue(), 
    		this.lookupReference('propValue').getValue()
        );
		if(getLboLang()=='english')
			Ext.Msg.alert('Info', 'Click "Apply to Properties button.');
		else 
        	Ext.Msg.alert('확인', '속성반영 버튼을 클릭하여 반영하십시오');
    }, 
    onSaveColumn:function(){
    	console.log('onEdit', me);
    	//this.lookupReference('propValue').setValue(getStringFromArrays());
    	
    	var me = this;
		var myItems = this.lookupReference('mainGrid').getStore().getRange();
		var propValue='[\n';
		for(var i = 0; i < myItems.length; i++){
			if( myItems[i].get('text')!= null && 
				myItems[i].get('text')!= '' &&
				myItems[i].get('text')!= ' '){
		    	propValue = propValue + 
		    		'{    text: ' + myItems[i].get('text') ;		        
		    }else {
				if(getLboLang()=='english')
					Ext.Msg.alert('Error','text is not allowed blank.');
				else 
		    		Ext.Msg.alert('확인','text는 공백이어서는 안됩니다.');
		    	return;
		    }		    
			if( myItems[i].get('dataIndex')!= null && 
				myItems[i].get('dataIndex')!= '' &&
				myItems[i].get('dataIndex')!= ' '){
		    	propValue = propValue + 
		    		',\n    dataIndex: ' + myItems[i].get('dataIndex');		        
		    }
            /*
			if( myItems[i].get('type')!= null && 
				myItems[i].get('type')!= '' &&
				myItems[i].get('type')!= ' '){
		    	propValue = propValue + 
		    		',\n    type: ' + myItems[i].get('type');		        
		    }
            */
			if( myItems[i].get('width')!= null && 
				myItems[i].get('width')!= '' &&
				myItems[i].get('width')!= ' '){
		    	propValue = propValue + 
		    		',\n    width: ' + myItems[i].get('width');		        
		    }
		    if( myItems[i].get('flex')!= null && 
				myItems[i].get('flex')!= '' &&
				myItems[i].get('flex')!= ' '){
		    	propValue = propValue + 
		    		',\n    flex: ' + myItems[i].get('flex');		        
		    }
            // 추가부분
            if( myItems[i].get('xtype')!= null && 
				myItems[i].get('xtype')!= '' &&
				myItems[i].get('xtype')!= ' '){
		    	propValue = propValue + 
		    		',\n    xtype: ' + myItems[i].get('xtype');		        
		    }
            if( myItems[i].get('exType')!= null && 
				myItems[i].get('exType')!= '' &&
				myItems[i].get('exType')!= ' '){
		    	propValue = propValue + 
		    		',\n    exType: ' + myItems[i].get('exType');		        
		    }
            if( myItems[i].get('exSummaryType')!= null && 
				myItems[i].get('exSummaryType')!= '' &&
				myItems[i].get('exSummaryType')!= ' '){
		    	propValue = propValue + 
		    		',\n    exSummaryType: ' + myItems[i].get('exSummaryType');		        
		    }     
            /*
            if( myItems[i].get('exFormat')!= null && 
				myItems[i].get('exFormat')!= '' &&
				myItems[i].get('exFormat')!= ' '){
		    	propValue = propValue + 
		    		',\n    exFormat: ' + myItems[i].get('exFormat');		        
		    } 
            */ 
            if( myItems[i].get('exAlign')!= null && 
				myItems[i].get('exAlign')!= '' &&
				myItems[i].get('exAlign')!= ' '){
		    	propValue = propValue + 
		    		',\n    exAlign: ' + myItems[i].get('exAlign');		        
		    } 
            if( myItems[i].get('exUserString')!= null && 
				myItems[i].get('exUserString')!= '' &&
				myItems[i].get('exUserString')!= ' '){
		    	propValue = propValue + 
		    		',\n    exUserString: ' + myItems[i].get('exUserString');		        
		    }     
            if( myItems[i].get('exUserRecords')!= null && 
				myItems[i].get('exUserRecords')!= '' &&
				myItems[i].get('exUserRecords')!= ' '){
		    	propValue = propValue + 
		    		',\n    exUserRecords: ' + myItems[i].get('exUserRecords');		        
		    } 
            if( myItems[i].get('exGroupField')!= null && 
				myItems[i].get('exGroupField')!= '' &&
				myItems[i].get('exGroupField')!= ' '){
		    	propValue = propValue + 
		    		',\n    exGroupField: ' + myItems[i].get('exGroupField');		        
		    }  
            if( myItems[i].get('exColor')!= null && 
				myItems[i].get('exColor')!= '' &&
				myItems[i].get('exColor')!= ' '){
		    	propValue = propValue + 
		    		',\n    exColor: ' + myItems[i].get('exColor');		        
		    } 
            if( myItems[i].get('exFontColor')!= null && 
				myItems[i].get('exFontColor')!= '' &&
				myItems[i].get('exFontColor')!= ' '){
		    	propValue = propValue + 
		    		',\n    exFontColor: ' + myItems[i].get('exFontColor');		        
		    }                   
            if( myItems[i].get('exHidden')!= null && 
				myItems[i].get('exHidden')!= '' &&
				myItems[i].get('exHidden')!= ' '){
		    	propValue = propValue + 
		    		',\n    exHidden: ' + myItems[i].get('exHidden');		        
		    }                 
 
            if( myItems[i].get('exDisplayField')!= null && 
				myItems[i].get('exDisplayField')!= '' &&
				myItems[i].get('exDisplayField')!= ' '){
		    	propValue = propValue + 
		    		',\n    exDisplayField: ' + myItems[i].get('exDisplayField');		        
		    }  
            if( myItems[i].get('exValueField')!= null && 
				myItems[i].get('exValueField')!= '' &&
				myItems[i].get('exValueField')!= ' '){
		    	propValue = propValue + 
		    		',\n    exValueField: ' + myItems[i].get('exValueField');		        
		    }  
            if( myItems[i].get('exBindStore')!= null && 
				myItems[i].get('exBindStore')!= '' &&
				myItems[i].get('exBindStore')!= ' '){
		    	propValue = propValue + 
		    		',\n    exBindStore: ' + myItems[i].get('exBindStore');		        
		    }                                     
            // 추가부분
		    if( myItems[i].get('renderer')!= null && 
				myItems[i].get('renderer')!= '' &&
				myItems[i].get('renderer')!= ' '){
		    	propValue = propValue + 
		    		',\n    renderer: ' + myItems[i].get('renderer');		        
		    }
		    if( myItems[i].get('summaryRenderer')!= null && 
				myItems[i].get('summaryRenderer')!= '' &&
				myItems[i].get('summaryRenderer')!= ' '){
		    	propValue = propValue + 
		    		',\n    summaryRenderer: ' + myItems[i].get('summaryRenderer');		        
		    }
		    if( myItems[i].get('widget')!= null && 
				myItems[i].get('widget')!= '' &&
				myItems[i].get('widget')!= ' '){
		    	propValue = propValue + 
		    		',\n    widget: ' + myItems[i].get('widget');		        
		    }
 		    if( myItems[i].get('onWidgetAttach')!= null && 
				myItems[i].get('onWidgetAttach')!= '' &&
				myItems[i].get('onWidgetAttach')!= ' '){
		    	propValue = propValue + 
		    		',\n    onWidgetAttach: ' + myItems[i].get('onWidgetAttach');		        
		    }           
            
		    if( myItems[i].get('editor')!= null && 
				myItems[i].get('editor')!= '' &&
				myItems[i].get('editor')!= ' '){
		    	propValue = propValue + 
		    		',\n    editor: ' + myItems[i].get('editor');		        
		    }            
		    if( myItems[i].get('locked')!= null && 
				myItems[i].get('locked')!= '' &&
				myItems[i].get('locked')!= ' '){
		    	propValue = propValue + 
		    		',\n    locked: ' + myItems[i].get('locked');		        
		    }
  		    if( myItems[i].get('sortable')!= null && 
				myItems[i].get('sortable')!= '' &&
				myItems[i].get('sortable')!= ' '){
		    	propValue = propValue + 
		    		',\n    sortable: ' + myItems[i].get('sortable');		        
		    }
		    if( myItems[i].get('resizable')!= null && 
				myItems[i].get('resizable')!= '' &&
				myItems[i].get('resizable')!= ' '){
		    	propValue = propValue + 
		    		',\n    resizable: ' + myItems[i].get('resizable');		        
		    }
		    if( myItems[i].get('columnWidth')!= null && 
				myItems[i].get('columnWidth')!= '' &&
				myItems[i].get('columnWidth')!= ' '){
		    	propValue = propValue + 
		    		',\n    columnWidth: ' + myItems[i].get('columnWidth');		        
		    }                                              
		    if( myItems[i].get('emptyCelltext')!= null && 
				myItems[i].get('emptyCelltext')!= '' &&
				myItems[i].get('emptyCelltext')!= ' '){
		    	propValue = propValue + 
		    		',\n    emptyCelltext: ' + myItems[i].get('emptyCelltext');		        
		    }            

            
            if( myItems[i].get('etc')!= null && 
				myItems[i].get('etc')!= '' &&
				myItems[i].get('etc')!= ' '){
		    	propValue = propValue + 
		    		',\n    ' + myItems[i].get('etc');		        
		    }            
		    if(i==myItems.length-1){
		    	propValue = propValue + '}';
		    }
		    else {
		    	propValue = propValue + '},\n';	
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
    		'columns',
    		strReturn,
    		this.openerObj);
    	this.getView().destroy();    	
    },
    onAddRow:function(){
        var data = {
            dataIndex:'', 
            width:'',
            xtype:'',
            exType:'',
            exSummaryType:'',
            exUserString:'',
            exUserRecords:'',
			exGroupField:'',
            exAlign:'',
			exColor:'',
			exGroupColor:'',
            exHidden:'',
            renderer:'',
            summaryRenderer:'',
            widget:'',
            onWidgetAttach:'',
            editor:'',
            widgetHelp:'',
            locked:'',
            sortable:'',
            resizable:'',
            columnWidth:'',
            emptyCellText:'',
            etc:''
        };
        this.lookupReference('mainGrid').getStore().add(data); 
    },
    onMinusRow:function(){
        var selection = this.lookupReference('mainGrid').getView().getSelectionModel().getSelection();
        console.log('selection', selection);
        if(selection != null){
            this.lookupReference('mainGrid').getStore().remove(selection[0]);
        }
        else {
			if(getLboLang()=='english')
				Ext.Msg.alert('Error', 'Select the grid row which will be deleted.');
			else 
            	Ext.Msg.alert('확인', '그리드의 삭제하려는 행을 선택하세요');
            return;
        }        
    }    
});