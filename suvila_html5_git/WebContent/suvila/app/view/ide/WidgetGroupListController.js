Ext.define('ExFrm.view.ide.WidgetGroupListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.widgetgrouplist',
    onDblClickMain:function(dv, record, item, index, e){
    	console.log('onDblClick', record);
		//ExFrm.app.getController('IdeController').addItem(record.data.initStr);	    	
    }	
});