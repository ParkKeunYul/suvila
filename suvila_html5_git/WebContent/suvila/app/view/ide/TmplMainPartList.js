Ext.define('ExFrm.view.ide.TmplMainPartList', {
    extend: 'Ext.panel.Panel',
    alias:'widget.tmplmainpartlist',
    requires:['ExFrm.view.ide.TmplMainPartListController',
    		  'ExFrm.view.ide.TmplMainPartListModel'
    ], 
    controller:'tmplmainpartlist',
    viewModel:{
    	type:'tmplmainpartlist'
    }, 
    flex:1,
    items: [
    {
    	flex:1,
        xtype:'form',
        reference:'regform',	    	
        items:[
        {
        	flex:1,
	    	xtype:'grid',
	    	//height:400,
	    	reference:'mainGrid',
	    	bind:{
	    		store:'{searchInfo}'
	    	},    
	    	viewConfig:{
		        plugins: {
		            ddGroup: 'dragtmplmake',
		            ptype: 'gridviewdragdrop',
		            enableDrop: true,
		            
		        },
		        copy:true
		    },   	
	    	columns:[
	    	{
	    		width:110,
	    		text: getLboLangItem('이미지'),
	    		dataIndex:'name',
	    		renderer:function(val){
	    			return '<img width=100 src=./lib/tmpljs/main/img/' + val + '.png>';
	    		}
	    	},{
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
