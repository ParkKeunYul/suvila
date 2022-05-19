Ext.define('ExFrm.view.ide.MainTemplate', {
    extend: 'Ext.panel.Panel',
    requires: [
		'ExFrm.view.ide.IdeLeftMenu',
		'ExFrm.view.ide.IdeToolsMenu',
		'ExFrm.view.ide.TmplLeftMenu',
		//'ExFrm.view.user.UserShowList',
		'ExFrm.view.ide.MainTemplateController',
		'ExFrm.view.ide.TmplPartList',
		'ExFrm.view.ide.TmplMainPartList'
    ],
    xtype: 'idemain',
    controller: 'idemain',
    layout: 'border',
    items: [
    {
    	height:'100%',
        region:'west',
        xtype:'tmplleftmenu',
        width:200,
        split:true
    },{
    	height:'100%',
    	region:'east',
    	width:300,
    	layout:'border',
    	items:[{
    		region:'north',
    		xtype:'tmplmainpartlist',
    		//height:350,
    		scrollable:true,
    		split: true, 
    	},{
    		scrollable:true,
    		region:'center',
    		xtype:'tmplpartlist'
    	}]
    },{
        region: 'center',
        height:'100%',
        xtype: 'tabpanel',
        name: 'mainbar',
        scrollable:true,
        layout:{
        	type:'vbox',
        	align:'stretch'
        },
        items:[]
    }]
});
