Ext.define('ExFrm.view.ide.EventFunctionList', {
    extend: 'Ext.window.Window',
    alias:'widget.eventfunctionlist',
    requires:[
    	'ExFrm.view.ide.EventFunctionListController'
    ], 
    controller:'eventfunctionlist',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('이벤트 선택'),
    width:800,
    height:600,
    isModel:true,
    items: [
    {
		xtype:'grid',
		reference:'eventList',
		store:'',
		columns:[
		{
			dataIndex:'code',
			width:200
		},{
			dataIndex:'value',
			flex:1
		}],
		listeners:{
			itemdblclick:'onSelectEventFunc'
		},
		flex:1
	},{
    	xtype:'tbspacer',
    	width:10
    },{
    	layout:'hbox',
    	items:[
    	{
    		xtype:'tbspacer',
    		flex:1
    	},{
			xtype:'button',
			text: getLboLangItem('취소'),
			handler:'onCancel'
		}]
	}]
});
