Ext.define('ExFrm.view.rec.rec024w_07',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec024w_07',
    requires:[
    	'ExFrm.view.rec.rec024w_07Controller',
        'ExFrm.view.rec.rec024w_07Model',
    ],
    controller :'rec024w_07',
    viewModel:{
        type   :'rec024w_07'
    },
    name       : 'rec024w_07',
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
        	width  : '62%',
        	layout : 'vbox',
        	items  : [{
        		width  : '100%',
        		layout : 'hbox',
        		height : 30,
        		items  : [{
        			flex : 1,
        			html : '<div style="font-weight:700;line-height:30px;">기도록목설정</div>',
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
                reference     : 'rec024w_07_a',
                cls           : 'rec024w_07_a',
                height        : 820,
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
                	text        : '기도명',
                	xtype       : 'excolumn',
                    dataIndex   : 'PRAY_NM',                    
                    exAlign     : 'left',                    
                    sortable    : true,
                    flex        : 3,
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '기도비',
                	xtype       : 'excolumn',
                    dataIndex   : 'AMOUNT',                    
                    exAlign     : 'right',
                    exType      : 'number',
                    sortable    : true,
                    flex        : 1.6,
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '사용',
                	xtype       : 'excheckcolumn',
                    dataIndex   : 'USE_YN',                    
                    exAlign     : 'center',                    
                    sortable    : true,
                    flex        : 1,
                    
                },{
                	text        : '계정과목',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCNAME',                    
                    exAlign     : 'left',                    
                    sortable    : true,
                    flex        : 2.8
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
        			html : '<div style="font-weight:700;line-height:30px;">금액관리/수정</div>',
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
                reference     : 'rec024w_07_b',
                cls           : 'rec024w_07_b',
                height        : 820,
                width         : '100%',
                /*selModel      : {
                    mode: 'MULTI'
                },*/
                bind          : {
                    store:'{ds_amount_mgt}'
                },
                plugins     : [{
                	ptype:'cellediting',
                //	clicksToEdit: 1
                }],
                listeners      : {
                	/*celldblclick    : 'onCellDbClick',*/
                	/*selectionchange : 'onSelectionChange'*/
                	beforeedit      : 'onBeforeedit',	    
                	/*edit              : 'onEdit'*/
                },
                columns:[{
                	text        : '시작월',
                	xtype       : 'excolumn',
                    dataIndex   : 'START_YYYYMM',                    
                    exAlign     : 'center',                    
                    sortable    : true,
                    flex        : 1.6,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if( exCommon.getRepVal(value) == "" ){
                    		meta.tdCls = 'recCellEdit'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	if(value == undefined || value == "" || value == null){
                    		return "";
                    	}
                    	return exCommon.getGridDateFormat(value,'/' , 6);
                    },
                    editor    : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '종료월',
                	xtype       : 'excolumn',
                    dataIndex   : 'END_YYYYMM',                    
                    exAlign     : 'center',                    
                    flex        : 1.6,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	
                    	if( exCommon.getRepVal(value) == "" ){
                    		meta.tdCls = 'recCellEdit'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	
                    	if(value == undefined || value == "" || value == null){
                    		return "";
                    	}
                    	return exCommon.getGridDateFormat(value,'/' , 6);
                    },
                    editor    : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '금액',
                	xtype       : 'excolumn',
                    dataIndex   : 'AMOUNT',                    
                    exAlign     : 'right',
                    exType      : 'number',                    
                    sortable    : true,
                    flex        : 1.6,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var SQL_MODE = exCommon.getRepVal(record.get("SQL_MODE"));
                    	if( SQL_MODE == "I"){
                    		meta.tdCls = 'recCellEdit'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return exCommon.setNumberFormat(value,0 );
                    },
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '비고',
                	xtype       : 'excolumn',
                    dataIndex   : 'REMARK',                    
                    exAlign     : 'left',                    
                    flex        : 2.4,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = 'recCellEdit'
                    	return value;
                    },
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
