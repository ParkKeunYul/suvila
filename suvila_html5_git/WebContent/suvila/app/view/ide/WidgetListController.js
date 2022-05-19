Ext.define('ExFrm.view.ide.WidgetListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.widgetlist',
    onDblClickMain:function(dv, record, item, index, e){
    	console.log('onDblClick', record);
		//ExFrm.app.getController('IdeController').addItemGroup(record.data.initStr);	    	
    }	
});