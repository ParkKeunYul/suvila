Ext.define('ExFrm.view.ide.WidgetDeployContainerListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.widgetdeploycontainerlist',
    onDblClickMain:function(dv, record, item, index, e){
    	console.log('onDblClick', record);
		ExFrm.app.getController('IdeController').readWidgetCode(
            lboServerPath + lboUserServerPath + 
            '/app/view/widget/container/' + record.data.name + '.js')//, record.data.initStr);	    	
    }
});