Ext.define('ExFrm.view.ide.WidgetDeployListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.widgetdeploylist',
    onDblClickMain:function(dv, record, item, index, e){
    	console.log('onDblClick', record);
//		ExFrm.app.getController('IdeController').readWidgetCode(record.data.name)//, record.data.initStr);
		ExFrm.app.getController('IdeController').readWidgetCode(
            lboServerPath + lboUserServerPath + 
            '/app/view/widget/' + 
            record.data.name + '.js')//, record.data.initStr);	    	
			    	
    }
});