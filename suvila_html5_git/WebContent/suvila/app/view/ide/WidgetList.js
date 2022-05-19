Ext.define('ExFrm.view.ide.WidgetList', {
    extend: 'Ext.panel.Panel',
    alias:'widget.widgetlist',
    requires:['ExFrm.view.ide.WidgetListController',
    		  'ExFrm.view.ide.WidgetListModel'
    ], 
    controller:'widgetlist',
    viewModel:{
    	type:'widgetlist'
    }, 
    //height:'100%',
    listeners:{
        afterrender:function(){
            this.down('form').setHeight('100%');
            this.updateLayout();
        }
    },
    items: [
    {
		//height:'100%',
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
	    			return '<img width=60 src=./lib/tmpljs/widget/img/' + val + '.png>';
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
			},
	    }]
    }]
});
