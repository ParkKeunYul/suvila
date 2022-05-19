Ext.define('ExFrm.view.rec.rec013w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec013w_02',
    requires:['ExFrm.view.rec.rec013w_02Controller',
              'ExFrm.view.rec.rec013w_02Model',
          //    'ExFrm.view.rec.rec000w_03',
          //    'ExFrm.view.rec.rec000w_02'              
              ],
    controller:'rec013w_02',
    viewModel:{
        type:'rec013w_02'
    },
    name:'rec013w_02',
    isRootView:true,
    //title:'기도접수',
    header:false,
    //closable:true,
    closable:false,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',     
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
            xtype:'rec000w_02'
        },{
            xtype:'container',
            height:1
        },{
            height:335,
            layout:{
                type:'hbox',
                align:'stretch'
            },
            items:[{            	
            	width    : 600,
            	layout   : 'vbox',
            	items    :[{
            		//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">대상 및 접수항목 선택</div>',
            		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택</div>',
            		//height : 30
            	},{
            		layout : 'hbox',
            		items  :[{
            			xtype     :'exgrid',
                        width     : 220,
                        height    : 300,
                        reference : 'rec013w_02_a',
                        cls       : 'rec013w_02 none-dirty-grid',
                        bind   :{
                            store:'{ds_manageMgt}'
                        },
                        columns:[{
                        	text         : '선택',
                        	xtype        : 'excheckcolumn',
                            dataIndex    : 'SEL_YN',                    
                            exAlign      : 'center',
                            width        : 55,  
                            stopSelection: false,
                            listeners    : {
                              	 checkchange : 'manageCheckchange'
                            }
                        },{
                        	text         :'납부명',
                        	xtype        :'excolumn',
                            dataIndex    :'MANAGE_NM',
                            width        : 160,
                            exAlign      : 'left'
                        }]
            		},{
            			width : 10
            		},{
            			xtype     :'exgrid',
                        width     : 370,
                        height    : 300,
                        reference : 'rec013w_02_b',
                        cls       : 'rec013w_02 none-dirty-grid',
                        bind:{
                            store:'{ds_recHisInfo2}'
                        },
                        columns:[{
                        	text         : '선택',
                        	xtype        : 'excheckcolumn',
                            dataIndex    : 'SEL_YN',                    
                            exAlign      : 'center',
                            width        : 55,  
                            stopSelection: false,
                            listeners    : {
                             	 checkchange : 'recCheckchange'
                           }
                        },{
                        	text         :'접수일',
                        	xtype        :'excolumn',
                            dataIndex    :'ACCEPT_DATE',
                            width        : 100,
                            exAlign      : 'center',
                        	renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                              	return exCommon.getGridDateFormat(value, '/' , 8);
                           },
                        },{
                        	text         :'접수종류',
                        	xtype        :'excolumn',
                            dataIndex    :'PROD_NAME',
                            width        : 195,
                            exAlign      : 'left'
                        }]
            		}]
            		
            	}]
            },{
            	width : 5	
            },{
                layout:{
                    type:'vbox',
                    align:'center',
                    pack:'center'
                },
                items:[{
                    xtype   : 'exbutton',
                    iconCls : 'fa fa-caret-right',
                    handler : 'onShift'
                }]
            },{
            	width : 5
            },{
            	flex    : 1,
            	layout  : 'vbox',
            	items :[{
            		layout : 'hbox',
            		height : 30,
            		width  : '100%',
            		items  :[{
            			flex : 1,
            			//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">접수버튼 영역</div>',
            		},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r13_02',
            			name      : 'rdo_ApprovalGbn_r13_02',
            			/*listeners: {
        					change : 'onRadioChange',
        				},*/
            			items     :[{
            				boxLabel   : '현금', 
    	                	inputValue : 1,    
    	                	width      : 60,
    	                	reference  : 'rdo_ApprovalGbn1',
    	                	checked    : true
            			},{
            				boxLabel   : '카드', 
    	                	inputValue : 2,    
    	                	width      : 60,
    	                	reference  : 'rdo_ApprovalGbn2',
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
    	                	reference  : 'rdo_ApprovalGbn3',
            			}]
            		},{
            			xtype     : 'exbutton',
                  		reference : 'deleteBtn',
                  		name      : 'deleteBtn',
                  		text      : '삭제',
                  		handler   : 'onDelete',
            		},{
            			width : 3
            		},{
            			xtype     : 'exbutton',
                  		reference : 'delAllBtn',
                  		name      : 'delAllBtn',
                  		text      : '전체취소',
                  		handler   : 'onDelAll',
            		},{
            			width : 3
            		},{
            			xtype     : 'exbutton',
                  		reference : 'saveBtn',
                  		name      : 'saveBtn',
                  		text      : '접수완료',
                  		handler   : 'onSave',
            		},{
            			width : 0,
            			items : [{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_ManageRec',
    	                    name             : 'ds_ManageRec',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_acceptRecAmt',
    	                    name             : 'ds_acceptRecAmt',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_sms',
    	                    name             : 'ds_sms',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_pgCardInfo',
    	                    name             : 'ds_pgCardInfo',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			}]
            		}]
            		
            	},{
            		xtype      : 'exgrid',
                    width      : '99.9%',
                    height     : 300,
                    reference  : 'rec013w_02_c',
                    cls        : 'none-dirty-grid',
                    bind       : {
                        store:'{ds_ManageRec}'
                    },
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                listeners      : {
	                	//beforeedit   : 'onBeforeedit',	    
	                	edit         : 'onEdit'
                    },
                    columns:[{
                    	text  :'순번',
                        xtype :'rownumberer',
                        align : 'center',
                        width : 80,
                    },{
                    	text         :'납부명',
                    	xtype        :'excolumn',
                        dataIndex    :'MANAGE_NM',
                        width        : 120,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	text         :'신도명',
                    	xtype        :'excolumn',
                        dataIndex    :'NAME_KOR',
                        width        : 100,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	text         :'입금시작월',
                    	xtype        :'excolumn',
                        dataIndex    :'FIRST_PAYMENT_YYYYMM',
                        width        : 100,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	if(value == undefined || value == "" || value == null){
                        		return "";
                        	}
                        	return exCommon.getGridDateFormat(value,'/' , 6);
                        },
                        editor    : {
	                    	xtype         : 'extextfield',
	                    	format        : 'Y/m'
	                    },
                    },{
                        text         :'기간',
                        xtype        :'excolumn',
                        dataIndex    :'MANAGE_PERIOD',
                        width        : 70,
                        //exHidden     : true,
                        exType       : 'number',
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(value);
                        },
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
                    },{
                        text         :'납부예정금액',
                        xtype        :'excolumn',
                        dataIndex    :'BASE_AMT',
                        width        : 120,
                        exType       : 'number',
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(value);
                        },
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
                    },{
                        text         :'납부금액',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_AMT',
                        width        : 120,
                        exType       : 'number',
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(value);
                        },
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
                    },{
                        text         :'동참금',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_PLAN_AMT',
                        width        : 120,
                        exType       : 'number',
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return exCommon.setNumberFormat(value);
                        },
                    },{
                        text         :'미수금',
                        xtype        :'excolumn',
                        dataIndex    :'MISU_AMT',
                        width        : 120,
                        exType       : 'number',
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return exCommon.setNumberFormat(value);
                        },
                    },{
                        text         :'비고',
                        xtype        :'excolumn',
                        dataIndex    :'REMARK',
                        width        : 220,
                        exAlign      : 'left',
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellEdit';
                        	return value;
                        },
                    }]
            	}]
            }]
        },{          
            height:1
        },{
            xtype:'rec000w_03'
        }]
    }]
});
