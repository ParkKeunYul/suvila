Ext.define('ExFrm.view.ide.WidgetGroupList', {
    extend: 'Ext.panel.Panel',
    alias:'widget.widgetgrouplist',
    requires:['ExFrm.view.ide.WidgetGroupListController',
    		  'ExFrm.view.ide.WidgetGroupListModel'
    ], 
    controller:'widgetgrouplist',
    viewModel:{
    	type:'widgetgrouplist'
    }, 
    listeners:{
        afterrender:function(){
            this.down('form').setHeight('100%');
            this.updateLayout();
        }
    },    
    height:'100%',
    items: [
    {
		height:'100%',
        xtype:'form',
        reference:'regform',
        scrollable:true,	    	
        items:[
        {
	    	xtype:'grid',
	    	height:'100%',
	    	reference:'mainGrid',
	    	scrollable:true,
	    	bind:{
	    		store:'{searchInfo}'
	    	},    
	    	viewConfig:{
		        plugins: {
		            ddGroup: 'dragtmplpartmake',
		            ptype: 'gridviewdragdrop',
		            //enableDrop: true
		        },
		        copy:true
		    },   	
	    	columns:[
	    	{
	    		width:72,
	    		text: getLboLangItem('이미지'),
	    		dataIndex:'name',
	    		renderer:function(val){
	    			return '<img width=60 src=./lib/tmpljs/groupwidget/img/' + val + '.png>';
	    		}
	    	},
	    	{
	    		text: getLboLangItem('타입'),
	    		dataIndex:'type',
	    		hidden:true
	    	},	    	
	        {
                text: getLboLangItem('템플릿명'),
                dataIndex:'name',
                flex:1
            },{
            	text:'문자열',
            	dataIndex:'initStr',
            	hidden:true,
            	flex:1
            }],
			listeners:{
				itemdblclick:'onDblClickMain',
				afterrender:function(){
					console.log('afterrender********************');
				}
			},
	    }]
    }]
});
