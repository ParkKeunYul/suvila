Ext.define('ExFrm.view.ide.UpdEvent', {
    extend: 'Ext.window.Window',
    alias:'widget.updevent',
    requires:[
    	'ExFrm.view.ide.UpdEventController'
    ], 
    controller:'updevent',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('이벤트 수정'),
    width:800,
    height:600,
    modal:true,
    isModel:true,
    items: [
    {
		xtype:'textarea',
		reference:'propName',
		width:200
	},{
		xtype:'tbspacer',
		width:10
	},{
		xtype:'textarea',
		reference:'propValue',
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
	    	text: getLboLangItem('저장'),
	    	handler:'onSave'
		},{
			xtype:'tbspacer',
			width:10
		},{
			xtype:'button',
			text: getLboLangItem('취소'),
			handler:'onCancel'
		}]
	}]
});
