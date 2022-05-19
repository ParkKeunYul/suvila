Ext.define('ExFrm.view.ide.SelectLayoutController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.selectlayout',
    selectedColumn:-1,
    selectedPropertyIndex:-1,
	retMethod:{},
	openerObj:{},
    calledByOther:function(propName, propValue,openerMethod,openerObj){
    	this.openerObj = openerObj
		this.retMethod = openerMethod;
		this.lookupReference('propName').setValue(propName);
		this.lookupReference('propValue').setValue(propValue);

    	parginsArrays(propValue);
    	console.log('arrayItemParse', arrayItemParse);
    	for(var i=0; i<arrayIdCountParse; i++){
    		var columnText = '';
    		var columnDataIndex = '';
    		var columnType = '';
    		var columnWidth = '';
    		var columnFlex = '';
    		var columnRenderer = '';
    		var columnSummaryRenderer = '';
    		var columnGrouping = '';

            console.log('arrayItemParse[i]', arrayItemParse[i]);                                  
			for(var j=0; j< arrayItemParse[i].arrayPropertyLen; j++){
				if(arrayItemParse[i].arrayPropertyName[j] == 'text'){
					columnText = arrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(arrayItemParse[i].arrayPropertyName[j] == 'dataIndex'){
					columnDataIndex = arrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(arrayItemParse[i].arrayPropertyName[j] == 'type'){
					columnType = arrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(arrayItemParse[i].arrayPropertyName[j] == 'width'){
					columnWidth = arrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(arrayItemParse[i].arrayPropertyName[j] == 'flex'){
					columnFlex = arrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(arrayItemParse[i].arrayPropertyName[j] == 'renderer'){
					columnRenderer = arrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(arrayItemParse[i].arrayPropertyName[j] == 'summaryRenderer'){
					columnSummaryRenderer = arrayItemParse[i].arrayPropertyValue[j]; 
				}
				else if(arrayItemParse[i].arrayPropertyName[j] == 'grouping'){
					columnGrouping = arrayItemParse[i].arrayPropertyValue[j]; 
				}
			}
			console.log('등록');
			var data = {
				text:columnText,
				dataIndex:columnDataIndex,
				type:columnType,
				width:columnWidth,
				flex:columnFlex,
				renderer:columnRenderer,
				summaryRenderer:columnSummaryRenderer,
				grouping:columnGrouping
			};
			console.log('data', data);
			this.lookupReference('mainGrid').getStore().add(data);			
    	} 		
    },
    onChangeLayout:function(){
    	var type = this.lookupReference('type').getValue();
    	var align = this.lookupReference('align').getValue();
    	var pack = this.lookupReference('pack').getValue();
    	var strReturn = '';
    	if(type == 'hbox' || type=='vbox'){
    		strReturn = '{\n' +
    					'    type:\'' + type + '\''; 
    		if(align != ''){
    			strReturn = strReturn + ',\n' + '    align:\'' + align + '\'';
    		} 
    		if(pack != ''){
    			strReturn = strReturn + ',\n' + '    pack:\'' + pack + '\'';
    		} 
    		strReturn = strReturn + '\n}';
    	}

    	//var strReturn = getStringFromArrays();
    	this.retMethod(
    		'layout',
    		strReturn,
    		this.openerObj);	
    	this.getView().destroy();
    }  
});