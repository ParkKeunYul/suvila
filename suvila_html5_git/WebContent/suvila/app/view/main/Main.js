
Ext.define('ExFrm.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        //'ExFrm.view.main.MainPanel',
        'ExFrm.view.login.Login',
    ],
    xtype: 'main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout:'fit',
    items: [
    {
    	xtype:'login'
    }]
 
});
