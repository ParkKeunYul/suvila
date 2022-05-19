Ext.define('ExFrm.view.ide.WidgetContainerListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.widgetcontainerlist',
    onDblClickMain:function(dv, record, item, index, e){
    	console.log('onDblClick', record);
		//ExFrm.app.getController('IdeController').addItemGroup(record.data.initStr);	    	
    }	
});