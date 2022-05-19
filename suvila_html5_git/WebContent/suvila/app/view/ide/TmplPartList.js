Ext.define('ExFrm.view.ide.TmplPartList', {
    extend: 'Ext.panel.Panel',
    alias:'widget.tmplpartlist',
    requires:['ExFrm.view.ide.TmplPartListController',
    		  'ExFrm.view.ide.TmplPartListModel'
    ], 
    controller:'tmplpartlist',
    viewModel:{
    	type:'tmplpartlist'
    }, 
    flex:1,
    items: [
    {
    	flex:1,
        xtype:'form',
        reference:'regform',	    	
        items:[
        {
	    	xtype:'grid',
	    	//height:400,
	    	reference:'mainGrid',
	    	bind:{
	    		store:'{searchInfo}'
	    	},    
	    	viewConfig:{
		        plugins: {
		            ddGroup: 'dragtmplpartmake',
		            ptype: 'gridviewdragdrop',
		            enableDrop: true
		        },
		        copy:true
		    },   	
	    	columns:[
	    	{
	    		width:110,
	    		text: getLboLangItem('이미지'),
	    		dataIndex:'name',
	    		renderer:function(val){
	    			return '<img width=100 src=./lib/tmpljs/part/img/' + val + '.png>';
	    		}
	    	},
	        {
                text: getLboLangItem('템플릿명'),
                dataIndex:'name',
                flex:1
            }],
			listeners:{
				itemdblclick:'onDblClickMain'
			},
	    }]
    }]
});
