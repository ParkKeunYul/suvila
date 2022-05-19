Ext.define('ExFrm.view.ide.MainCss', {
    extend: 'Ext.panel.Panel',
    requires: [
		'ExFrm.view.ide.IdeLeftMenu',
		'ExFrm.view.ide.IdeToolsMenu',
		'ExFrm.view.ide.TmplLeftMenu',
		//'ExFrm.view.user.UserShowList',
		'ExFrm.view.ide.MainCssController',
		'ExFrm.view.ide.CssMaker'
    ],
    xtype: 'idemain',
    controller: 'idemain',
    layout: 'border',
    items: [
    {
        region: 'center',
        xtype: 'tabpanel',
        name: 'mainbar',
        items:[{
        	xtype:'cssmaker'
        }]
    }]
});
