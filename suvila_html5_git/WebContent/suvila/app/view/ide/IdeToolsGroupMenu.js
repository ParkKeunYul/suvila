Ext.define('ExFrm.view.ide.IdeToolsGroupMenu', {
    extend: 'Ext.panel.Panel',
    alias:'widget.idetoolsgroupmenu',
    //requires:['ExFrm.view.menu.LeftMenuController'],
    //controller:'leftmenu',
    width:100,
    title:getLboLangItem('템플릿'),
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
	items:[{
		xtype:'button',
		text:getLboLangItem('템플릿 구성'),
		handler:function(){
			//console.log('selectedWidget...', selectedWidget);
			ExFrm.app.getController('IdeController').addItem(
				"{xtype:'expanel', reference:'', name:'', layout:'hbox', items:[{xtype:'textfield'}, {xtype:'tbspacer'}, {xtype:'button'}]}");
		}
	}]
});