Ext.define('ExFrm.view.rec.rec004w_07',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec004w_07',
    requires:[
    	'ExFrm.view.rec.rec004w_07Controller',
        'ExFrm.view.rec.rec004w_07Model',
    ],
    controller :'rec004w_07',
    viewModel:{
        type   :'rec004w_07'
    },
    name       : 'rec004w_07',
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
        	width  : '62%',
        	layout : 'vbox',
        	items  : [{
        		width  : '100%',
        		layout : 'hbox',
        		height : 30,
        		items  : [{
        			flex : 1,
        			html : '<div style="font-weight:700;line-height:30px;">대상정보</div>',
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
                reference     : 'rec004w_07_a',
                cls           : 'rec004w_07_a none-dirty-grid',
                height        : 820,
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
                    dataIndex   : 'EVENT_NAME',                    
                    exAlign     : 'left',
                    flex        : 3,
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '시간설정',
                	xtype       : 'excheckcolumn',
                    dataIndex   : 'SET_YN',                    
                    exAlign     : 'center',                    
                    flex        : 1.5,
                    
                },{
                	text        : '계정과목',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCNAME',                    
                    exAlign     : 'left',                    
                    flex        : 2.8
                },{
                	text        : '비고',
                	xtype       : 'excolumn',
                    dataIndex   : 'REMARK',                    
                    exAlign     : 'left',                                        
                    flex        : 2, 
                    editor      : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '정렬순위',
                	xtype       : 'excolumn',
                    dataIndex   : 'SORT_SEQ',                    
                    exAlign     : 'center',                                        
                    flex        : 1.5, 
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
        			//html : '<div style="font-weight:700;line-height:30px;">금액관리/수정</div>',
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectRightBtn',
              		name      : 'selectRightBtn',
              		handler   : 'onSelectRight',
              		text      : '조회',
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
                reference     : 'rec004w_07_b',
                cls           : 'rec004w_07_b none-dirty-grid',
                height        : 820,
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
                	text        : '입제일',
                	xtype       : 'excolumn',
                    dataIndex   : 'EVENT_DATE',                    
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
                    	return exCommon.getGridDateFormat(value,'/' , 8);
                    },
                    editor    : {
                    	xtype         : 'exdatefield',
                    	format        : 'Y/m/d'
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
                	text        : '완료여부',
                	xtype       : 'excheckcolumn',
                    dataIndex   : 'COMPLET_YN',                    
                    exAlign     : 'center',                    
                    flex        : 2.4,
                }]
            	
            }]
        },{
        	width : '0.5%',
        	
        }]
        
    }]
});
