Ext.define('ExFrm.view.rec.rec024w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec024w_02',
    requires:['ExFrm.view.rec.rec024w_02Controller',
              'ExFrm.view.rec.rec024w_02Model',
          //    'ExFrm.view.rec.rec000w_03',
          //    'ExFrm.view.rec.rec000w_02'              
              ],
    controller:'rec024w_02',
    viewModel:{
        type:'rec024w_02'
    },
    name:'rec024w_02',
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
            height:330,
            layout:{
                type:'hbox',
                align:'stretch'
            },
            items:[{            	
            	width    : 420,
            	layout   : 'vbox',
            	items    :[{
            		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택</div>',
            		height : 30
            	},{
                    xtype:'exgrid',
                    width : '99.9%',
                    height : 290,
                    cls  : 'rec024w_02',
                    bind:{
                        store:'{ds_PrayMgt}'
                    },
                    columns:[{
                    	text         : '선택',
                    	xtype        : 'excheckcolumn',
                        dataIndex    : 'SEL_YN',                    
                        exAlign      : 'center',
                        width        : 65,  
                        stopSelection: false

                    },{
                    	text         :'기도/법회명',
                    	xtype        :'excolumn',
                        dataIndex    :'PRAY_NM',
                        flex         : 1,
                        exAlign      : 'left'
                    },{
                        text         :'기도/법회비',
                        xtype        :'excolumn',
                        dataIndex    :'AMOUNT',
                        width        : 140,
                        exType       : 'number',
                        exAlign      : 'right'
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
            	//		html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">접수버튼 영역</div>',
            		},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r24_02',
            			name      : 'rdo_ApprovalGbn_r24_02',
            			/*listeners: {
        					change : 'onRadioChange',
        				},*/
            			items     :[{
            				boxLabel   : '현금', 
    	                	inputValue : 1,    
    	                	width      : 60,
    	                	checked    : true
            			},{
            				boxLabel   : '카드', 
    	                	inputValue : 2,    
    	                	width      : 60,
    	                	reference  : 'rdo_ApprovalGbn_r24_02_2',
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
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
    	                    reference        : 'ds_PrayRec',
    	                    name             : 'ds_PrayRec',
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
                    height     : 290,
                    cls        : 'rec024w_02_b',
                    reference  : 'rec024w_02_b',
                    features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    bind:{
                        store:'{ds_PrayRec}'
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
                    	text         :'기도/법회명',
                    	xtype        :'excolumn',
                        dataIndex    :'PRAY_NM',
                        width        : 180,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                        text         :'월납입예정금액',
                        xtype        :'excolumn',
                        dataIndex    :'BASE_AMT',
                        width        : 130,
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(value);
                        },
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(value)+' 원';
	                    },
	                    editor        : {
	                    	xtype         : 'numberfield',
	                    },
                    },{
                        text         :'시작월',
                        xtype        :'excolumn',
                        dataIndex    :'START_YYYYMM',
                        width        : 150,
                        exType       : 'date',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	meta.tdCls = 'recCellEdit';
                        	
                        	if(value == undefined || value == "" || value == null){
                        		try{
                        			if(record.previousValues.DELIVERY_DATE != null){
                        				return exCommon.getGridDateFormat(record.previousValues.START_YYYYMM+'','/' , 6);
                        			}
                        		}catch (e) {}
                        	}
                        	return exCommon.getGridDateFormat(value,'/' , 6);
                        },
                        editor    : {
	                    	xtype         : 'exdatefield',
	                    	format        : 'Ym',	                    	
	                    },
                    },{
                        text         :'접수금액',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_PLAN_AMT',
                        width        : 130,
                        exHidden     : true,
                        exType       : 'number',
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(value);
                        },
                    },{
                        text         :'납부금액',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_AMT',
                        width        : 130,
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(value);
                        },
                        summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(new Number(value))+' 원';
	                    },
	                    editor        : {
	                    	xtype         : 'numberfield',
	                    	allowBlank: false
	                    },
                    },{
                        text         :'미수금액',
                        xtype        :'excolumn',
                        dataIndex    :'MISU_AMT',
                        width        : 130,
                        exType       : 'number',
                        inputType    : 'hidden',
                        exHidden     : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.setNumberFormat(value);
                        },
                    },{
                        text         :'비고',
                        xtype        :'excolumn',
                        dataIndex    :'REMARK',
                        flex         : 1,
                        exAlign      : 'left',
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellEdit';
                        	return value;
                        },
                    },{
                        text         :'기본기도비',
                        xtype        :'excolumn',
                        dataIndex    :'BASE_PLAN_AMT',
                        flex         : 4.6,
                        exHidden     : true
                    }]
            	}]
            }]
        },{          
            height:5
        },{
            xtype:'rec000w_03'
        }]
    }]
});
