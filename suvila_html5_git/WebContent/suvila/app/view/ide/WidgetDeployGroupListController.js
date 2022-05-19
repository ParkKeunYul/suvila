Ext.define('ExFrm.view.ide.WidgetDeployGroupListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.widgetdeploygrouplist',
    onDblClickMain:function(dv, record, item, index, e){
    	console.log('onDblClick', record);
//		ExFrm.app.getController('IdeController').readWidgetCode(record.data.name)//, record.data.initStr);	
		ExFrm.app.getController('IdeController').readWidgetCode( lboServerPath + '/lib/tmpljs/groupwidget/' + record.data.name +  '.js')//, record.data.initStr);	    	
    	
    }
});