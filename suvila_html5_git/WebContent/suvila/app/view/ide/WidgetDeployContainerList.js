Ext.define('ExFrm.view.ide.WidgetDeployContainerList', {
    extend: 'Ext.panel.Panel',
    alias:'widget.widgetdeploycontainerlist',
    requires:['ExFrm.view.ide.WidgetDeployContainerListController',
    		  'ExFrm.view.ide.WidgetDeployContainerListModel'
    ], 
    controller:'widgetdeploycontainerlist',
    viewModel:{
    	type:'widgetdeploycontainerlist'
    }, 
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    width:200,
    items: [
    {
	    flex:1,
	    layout:{
	    	type:'vbox',
	    	align:'stretch'
	    },
        xtype:'form',
        reference:'regform',
        scrollable:true,	
        width:200,    	
        items:[
        {
        	width:200,
	    	xtype:'grid',
	    	flex:1,
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
	    		width:75,
	    		text:'이미지',
	    		dataIndex:'name',
	    		renderer:function(val){
	    			return '<img width=65 src=./lib/tmpljs/widget/img/' + val + '.png>';
	    		}
	    	},
	        {
	        	width:200,
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
