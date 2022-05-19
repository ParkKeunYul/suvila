Ext.define('ExFrm.view.ide.GridPropController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridprop',
    obj:[],
    selectedColumn:-1,
    calledByOther:function(params){
    	console.log('params',params);
    	this.obj = Ext.decode(params.columnProperty);
    	debugger;
    	this.gridRedraw(this.obj);   		
    },
    onCellClickMain:function(v,c,columnIndex){
    	console.log('..',arguments, this.obj);
    	//console.log('onDblClick', record);
    	var selectedColumn = this.obj[columnIndex];
    	console.log('this.obj[columnIndex]',this.obj[columnIndex]);
    	this.selectedColumnIndex = columnIndex;
    	this.showProperty(selectedColumn);
    	
		//ExFrm.app.getController('IdeController').addItem(record.data.initStr);	    	
    },
    gridRedraw:function(obj){
    	for(var i=0; i< obj.length; i++){
			var column = Ext.create('Ext.grid.column.Column', obj[i]);
			this.lookupReference('mainGrid').headerCt.add(column);
    	}
		this.lookupReference('mainGrid').getView().refresh();      	
    },
    showProperty:function(selectedColumn){
		this.lookupReference('propertyList').getStore().removeAll();
		console.log('obj',Ext.encode(selectedColumn));
		parsingColumnStr(Ext.encode(selectedColumn));
		console.log(columnItem);
		for(var i=0; i<columnItem.columnPropertyLen; i++){
			this.lookupReference('propertyList').getStore().add(
				{
					propertyName:columnItem.columnPropertyName[i],
					propertyValue:columnItem.columnPropertyValue[i]
				}
			);
    	}
    }  
});