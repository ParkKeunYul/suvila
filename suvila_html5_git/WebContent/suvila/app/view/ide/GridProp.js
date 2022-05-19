Ext.define('ExFrm.view.ide.GridProp', {
    extend: 'Ext.window.Window',
    alias:'widget.gridprop',
    requires:['ExFrm.view.ide.GridPropController',
    		  'ExFrm.view.ide.GridPropModel'
    ], 
    controller:'gridprop',
    viewModel:{
    	type:'gridprop'
    }, 
    layout:'hbox',
    title: getLboLangItem('그리드 설정'),
    width:800,
    height:600,
    //isModal:true,
    items: [
    {
    	reference:'mainGrid',
    	xtype:'grid',
    	flex:1,
    	height:'100%',
    	bind:{
    		store:'{searchInfo}'
    	},
    	viewConfig:{
    	},
    	listeners:{
    		cellclick:'onCellClickMain'
    	}
    },{
    	xtype:'grid',
    	reference:'propertyList',
    	store:{
    		fields:['propertyName', 'propertyValue']
    	},
    	width:200,
    	columns:[{
    		dataIndex:'propertyName'
    	},{
    		dataIndex:'propertyValue'
    	}]
    	//data:[]
    }]
});
