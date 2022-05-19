Ext.define('ExFrm.view.ide.MainSimpleMaker', {
    extend: 'Ext.panel.Panel',
    requires: [
		'ExFrm.view.ide.IdeLeftMenu',
		'ExFrm.view.ide.IdeToolsMenu',
		'ExFrm.view.ide.TmplLeftMenu',
		'ExFrm.view.ide.TmplSelect',
		'ExFrm.view.ide.MainSimpleMakerController',
		'ExFrm.view.ide.TmplPartList'
    ],
    xtype: 'idemain',
    controller: 'idemain',
    layout: 'border',
    items: [
    {
        region: 'center',
        name: 'mainbar',
        layout:{
        	type:'hbox',
        	align:'stretch'
        },
        items:[{
        	width:350,
        	xtype:'tmplselect',
        	split:true,
        	collapsable:true
        },{
        	flex:1,
        	xtype:'panel',
        	name:'mainTemplate',
	        layout:'fit',       	
        	items:[]
        }]
    }]
});
