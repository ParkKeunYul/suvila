Ext.define('ExFrm.view.ide.JsonGen', {
    extend: 'Ext.form.Panel',
    alias:'widget.jsongen',
    requires:[
    	'ExFrm.view.ide.JsonGenController',
    	'ExFrm.view.ide.JsonGenGrid'],
    controller:'jsongen',
    closable: true,
    title: getLboLangItem('JSON 데이터 생성'),
    scrollable:true,
    flex:1,
	layout:{
		type:'vbox',
		align:'stretch'
	},    
    items: [
	{
		hidden:true,
		xtype:'textfield',
		reference:'folder',
		fieldLabel:'경로'   
	},{
		hidden:true,
		xtype:'textfield',
		reference:'fileName',
		fieldLabel:'파일명'   
	},{
		xtype:'combobox',
		reference:'kind',
		fieldLabel: getLboLangItem('데이터 구분'),
		displayField:'display',
		valueField:'value',
		queryMode:'local',
		store:{
			fields:['value','display'],
			data:[
				{value:'info', display:'info - one data'}, 
				{value:'list', display:'list - array data'}, 
				{value:'tree', display:'tree - tree'},
				{value:'treeAjax', display:'tree - tree called by ajax'}
			]
		}   
    },{
		xtype:'tabpanel',
		items:[{
			title: getLboLangItem('데이터 레이아웃'),
			reference:'gridStoreContent',
			scrollable:true,
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[]
		}]
	}],
    buttons: [{
        text:  getLboLangItem('초기화'),
        handler: 'onReset'
    },{
        text:  getLboLangItem('파일생성'),
        //formBind: true,
        //disabled: true,
        handler: 'onCreateFiles'
    }]
});