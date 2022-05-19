Ext.define('ExFrm.view.ide.IdeToolsMenu', {
    extend: 'Ext.panel.Panel',
    alias:'widget.idetoolsmenu',
    width:100,
    title:getLboLangItem('도구바'),
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
	items:[{
		xtype:'button',
		text:getLboLangItem('패널'),
		handler:function(){
			ExFrm.app.getController('IdeController').addItem(
				"{xtype:'expanel', reference:'', name:'', html:'패널'}");
		}
	},{
		xtype:'button',
		text:getLboLangItem('버튼'),
		handler:function(){
			ExFrm.app.getController('IdeController').addItem(
				"{xtype:'exbutton', reference:'', name:'', text:'button'}");
		}
	},{
		xtype:'button',
		text:getLboLangItem('텍스트'),
		handler:function(){
			ExFrm.app.getController('IdeController').addItem(
				"{xtype:'extextfield', reference:'', name:'', fieldLabel:'텍스트1'}");
		}
	},{
		xtype:'button',
		text:getLboLangItem('공백'),
		handler:function(){
			ExFrm.app.getController('IdeController').addItem(
				"{xtype:'extbspacer', flex:1}");
		}
	},{
		xtype:'button',
		text:getLboLangItem('날짜'),
		handler:function(){
			ExFrm.app.getController('IdeController').addItem(
				"{xtype:'exdatefield', reference:'', name:'', fieldLabel:'날짜1'}");
		}
	}]
});