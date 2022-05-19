Ext.define('ExFrm.view.rec.rec013w_06',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec013w_06',
    requires:[
    	'ExFrm.view.rec.rec013w_06Controller',
        'ExFrm.view.rec.rec013w_06Model',
    ],
    controller :'rec013w_06',
    viewModel:{
        type   :'rec013w_06'
    },
    name       : 'rec013w_06',
    isRootView : true,
    title      :'위패접수 관리',
    header     : false,
    closable   : false,
    scrollable : true,
    layout     : {
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',     
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items :[{
        	width : '0.5%'
        },{
        	width  : '99%',
        	layout : 'vbox',
        	items  : [{
        		height : 10
        	},{
        		width  : '100%',
        		layout : 'hbox',
        		height : 25,
        		items  : [{
        			flex : 1,
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">관리항목</span>',
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		name      : 'selectBtn',
              		handler   : 'onSelect',
              		text      : '조회',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'addBtn',
              		name      : 'addBtn',
              		handler   : 'onAdd',
              		text      : '신규',
        		},{
            		width     : 5
    	    	},{
    	    		xtype     : 'exbutton',
              		reference : 'saveBtn',
              		name      : 'saveBtn',
              		handler   : 'onSave',
              		text      : '저장',
    	    	},{
    	    		width : 0,
    	    		height : 0,
    	    		items : [{
    	    			xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'newData',
    	       	 		name      : 'newData',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'uptData',
    	       	 		name      : 'uptData',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'delData',
    	       	 		name      : 'delData',
    	       	 		width     : 0
    	    		}]
        		}]
        	
        	},{
        		exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec013w_06_a',
                cls           : 'rec013w_06_a none-dirty-grid',
                height        : 820,
                width         : '100%',
                /*selModel      : {
                    mode: 'MULTI'
                },*/
                bind          : {
                    store:'{ds_manageMgt}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                }],
                listeners      : {
                	celldblclick    : 'onCellDbClick',
                },
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 60,
                    align       : 'center',
                },{
                	text        : '관리비명',
                	xtype       : 'excolumn',
                    dataIndex   : 'MANAGE_NM',                    
                    exAlign     : 'left',
                    width       : 250,
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '계정과목',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCNAME',                    
                    exAlign     : 'left',                    
                    width       : 220,
                },{
                	text        : '사용유무',
                	xtype       : 'excheckcolumn',
                    dataIndex   : 'USE_YN',                    
                    exAlign     : 'center',                    
                    width       : 100,
                },{
                	text        : '비고',
                	xtype       : 'excolumn',
                    dataIndex   : 'REMARK',                    
                    exAlign     : 'left',                                        
                    width       : 400,
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                }]
        	}]
        },{
        	width : '0.5%',
        	
        }]
        
    }]
});
