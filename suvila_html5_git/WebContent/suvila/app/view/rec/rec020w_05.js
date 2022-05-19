Ext.define('ExFrm.view.rec.rec020w_05',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec020w_05',
    requires:[
    	'ExFrm.view.rec.rec020w_05Controller',
        'ExFrm.view.rec.rec020w_05Model',
    ],
    controller :'rec020w_05',
    viewModel:{
        type   :'rec020w_05'
    },
    name       : 'rec020w_05',
    isRootView : true,
    title      :'템플스테이 관리',
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
        	width  : '62%',
        	layout : 'vbox',
        	items  : [{
        		width  : '100%',
        		layout : 'hbox',
        		height : 26,
        		items  : [{
        			flex : 1,
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">프로그램 설정</span>',
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
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'cancelBtn',
              		name      : 'cancelBtn',
              		handler   : 'onCancel',
              		text      : '취소',
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
                reference     : 'rec020w_05_a',
                cls           : 'rec020w_05_a none-dirty-grid',
                height        : 770,
                width         : '100%',
                /*selModel      : {
                    mode: 'MULTI'
                },*/
                bind          : {
                    store:'{ds_General}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                }],
                listeners      : {
                	celldblclick    : 'onCellDbClick',
                	selectionchange : 'onSelectionChange',
                },
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 60,
                    align       : 'center',
                },{
                	text        : '행사명',
                	xtype       : 'excolumn',
                    dataIndex   : 'TEMPLE_STAY_NM',                    
                    exAlign     : 'left',
                    flex        : 3,
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '참가비',
                	xtype       : 'excolumn',
                    dataIndex   : 'AMT',                    
                    exAlign     : 'right',
                    flex        : 1.5,
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                    },
                },{
                	text        : '기간',
                	xtype       : 'excolumn',
                    dataIndex   : 'PERIOD',                    
                    exAlign     : 'right',
                    flex        : 1,
                    editor      : {
                    	xtype         : 'extextfield',
                    }, 
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                    },
                },{
                	text        : '계정과목',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCNAME',                    
                    exAlign     : 'left',                    
                    flex        : 2.8               
                }]
        	}]
        },{
        	width : '2%'
        },{
        	width  : '35%',
        	layout : 'vbox',
            items  : [{
            	width  : '100%',
        		layout : 'hbox',
        		height : 30,
        		items  : [{
        			flex : 1,
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">상세기간 설정</span>',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'addRightBtn',
              		name      : 'addRightBtn',
              		handler   : 'onAddRight',
              		text      : '신규',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'cancelRightBtn',
              		name      : 'cancelRightBtn',
              		handler   : 'onCancelRight',
              		text      : '취소',
        		},{
            		width     : 5
    	    	},{
    	    		xtype     : 'exbutton',
              		reference : 'saveRightBtn',
              		name      : 'saveRightBtn',
              		handler   : 'onSaveRight',
              		text      : '저장',
        		}]
            
            },{
            	exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec020w_05_b',
                cls           : 'rec020w_05_b none-dirty-grid',
                height        : 770,
                width         : '100%',
                /*selModel      : {
                    mode: 'MULTI'
                },*/
                bind          : {
                    store:'{ds_Detail}'
                },
                plugins     : [{
                	ptype:'cellediting',
                //	clicksToEdit: 1
                }],
                listeners      : {
                	/*celldblclick    : 'onCellDbClick',*/
                	/*selectionchange : 'onSelectionChange'*/
                	//beforeedit      : 'onBeforeedit',	    
                	/*edit              : 'onEdit'*/
                },
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 60,
                    align       : 'center',
                },{
                	text        : '시작일',
                	xtype       : 'excolumn',
                    dataIndex   : 'FDATE',                    
                    exAlign     : 'center',                    
                    sortable    : true,
                    width       : 120,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){                    	
                    	return exCommon.getGridDateFormat(value,'/' , 8);
                    },
                    editor    : {
                    	xtype         : 'exdatefield',
                    	format        : 'Y/m/d'
                    },
                },{
                	text        : '종료일',
                	xtype       : 'excolumn',
                    dataIndex   : 'RDATE',                    
                    exAlign     : 'center',
                    sortable    : true,
                    width       : 120,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.getGridDateFormat(value,'/' , 8);
                    },
                    editor    : {
                    	xtype         : 'exdatefield',
                    	format        : 'Y/m/d'
                    },
                },{
                	text        : '정원',
                	xtype       : 'excolumn',
                    dataIndex   : 'CAPACITY',                    
                    exAlign     : 'right',
                    width        : 90,
                    editor      : {
                    	xtype         : 'extextfield',
                    }, 
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                    },
                },{
                	text        : '마감여부',
                	xtype       : 'excheckcolumn',
                    dataIndex   : 'USE_YN',                    
                    exAlign     : 'center',                    
                    width        : 90,
                },{
                	text        : '비고',
                	xtype       : 'excolumn',
                    dataIndex   : 'REMARK',                    
                    exAlign     : 'center',                    
                    width       : 120,
                }]
            	
            }]
        },{
        	width : '0.5%',
        	
        }]
        
    }]
});
