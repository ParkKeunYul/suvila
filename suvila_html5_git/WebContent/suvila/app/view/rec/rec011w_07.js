Ext.define('ExFrm.view.rec.rec011w_07',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec011w_07',
    requires:[
    	'ExFrm.view.rec.rec011w_07Controller',
        'ExFrm.view.rec.rec011w_07Model',
    ],
    controller :'rec011w_07',
    viewModel:{
        type   :'rec011w_07'
    },
    name       : 'rec011w_07',
    isRootView : true,
    title      :'상시접수 관리',
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
        		height : 5
        	},{
        		width  : '100%',
        		layout : 'hbox',
        		height : 30,
        		items  : [{
        			flex : 1,
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">후원명등록</span>',
        		},{
    				width : 5
    			},{
    	    		xtype     : 'exbutton',
            		reference : 'upBtn',
            		name      : 'upBtn',
            		handler   : 'onSortUp',
            		iconCls   : 'fa fa-angle-up',
    		    },{
    			    width : 5
    		    },{
    			    xtype     : 'exbutton',
            		reference : 'downBtn',
            		name      : 'downBtn',
            		handler   : 'onDownUp',	            		
            		iconCls   : 'fa fa-angle-down',
        		},{
        			width : 5
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
                reference     : 'rec011w_07_a',
                cls           : 'rec011w_07_a',
                height        : 720,
                width         : '100%',
                /*selModel      : {
                    mode: 'MULTI'
                },*/
                bind          : {
                    store:'{ds_main}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                }],
                listeners      : {
                	celldblclick    : 'onCellDbClick',
                	selectionchange : 'onSelectionChange',
                	/*beforeedit      : 'onPrayBeforeedit',*/	    
                	/*edit            : 'onEdit'*/
                },
                columns:[{
                	text  :'순번',
                    xtype :'rownumberer',
                    align : 'center',
                    width : 80,
                },{
                	text        : '후원명',
                	xtype       : 'excolumn',
                    dataIndex   : 'SUPPORT_NM',                    
                    exAlign     : 'left',                    
                    sortable    : true,
                    flex        : 3,
                    editor      : {
                    	xtype         : 'extextfield',
                    },                
                },{
                	text        : '계정과목',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCNAME',                    
                    exAlign     : 'left',                    
                    sortable    : true,
                    flex        : 2.8
                },{
                	text        : '사용유무',
                	xtype       : 'excheckcolumn',
                    dataIndex   : 'USE_YN',                    
                    exAlign     : 'center',                    
                    sortable    : true,
                    flex        : 1,
                },{
                	text        : '비고',
                	xtype       : 'excolumn',
                    dataIndex   : 'REMARK',                    
                    exAlign     : 'left',                    
                    sortable    : true,
                    flex        : 4, 
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '정렬순위',
                	xtype       : 'excolumn',
                    dataIndex   : 'SORT_SEQ',                    
                    exAlign     : 'center',                    
                    sortable    : true,
                    flex        : 1,
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
