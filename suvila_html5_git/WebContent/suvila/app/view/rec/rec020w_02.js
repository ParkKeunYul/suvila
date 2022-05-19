Ext.define('ExFrm.view.rec.rec020w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec020w_02',
    requires:['ExFrm.view.rec.rec020w_02Controller',
              'ExFrm.view.rec.rec020w_02Model',
          //    'ExFrm.view.rec.rec000w_03',
          //    'ExFrm.view.rec.rec000w_02'              
              ],
    controller:'rec020w_02',
    viewModel:{
        type:'rec020w_02'
    },
    name:'rec020w_02',
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
            	width : 600,
            	layout : 'vbox',
            	items  : [{
            		layout : 'hbox',
            		width  : '100%',
            		items  : [{
            			//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:30px;">대상 및 접수항목 선택</div>',
            			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택</div>',
                		height : 30
            		},{
            			width : 10
            		},{
            			xtype        : 'excombobox',
                        valueField   : 'TEMPLE_STAY_CD',
                        displayField : 'TEMPLE_STAY_NM',
                        reference    : 'lc_TSKindInfo',
                        name         : '',	 
                        emptyText    : '전체',                    
                        width        : 200,
                        bind         : {
                        	store:'{ds_TSKindInfo}'
                        },
                        listeners    : {
                        	change : 'onEventChange'
                        }
            		}]
            	},{
            		layout : 'hbox',
            		width  : '100%',
            		items  : [{
            			flex       : 1,
            			xtype      :'exgrid',                        
                        height     : 304,
                        cls        : 'rec020w_02_a none-dirty-grid',
                        reference  : 'rec020w_02_a',
                        bind:{
                            store:'{ds_TSKindDetail}'
                        },
                        columns:[{
                        	text         : '선택',
                        	xtype        : 'excheckcolumn',
                            dataIndex    : 'SEL_YN',                    
                            exAlign      : 'center',
                            flex         : 0.8,  
                          //  stopSelection: false
                        },{
                        	text         :'게시일',
                        	xtype        :'excolumn',
                            dataIndex    :'FDATE',
                            flex         : 1.2,
                            exAlign      : 'center',
                        	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
        	                    return exCommon.getGridDateFormat(value, '/' , 8);
        	                },
                        },{
                            text         :'프로그램',
                            xtype        :'excolumn',
                            dataIndex    :'TEMPLE_STAY_NM',
                            flex         : 1.6,
                            exAlign      : 'left',
                        }]
            		},{
            			width : 5
            		},{
            			flex       : 1,
            			xtype      :'exgrid',                        
                        height     : 304,
                        cls        : 'rec020w_02_b none-dirty-grid',
                        reference  : 'rec020w_02_b',
                        bind:{
                            store:'{ds_familySelInfo}'
                        },
                        columns:[{
                        	text         : '선택',
                        	xtype        : 'excheckcolumn',
                            dataIndex    : 'SEL_YN',                    
                            exAlign      : 'center',
                            flex         : 0.8,  
                          //  stopSelection: false
                        },{
                        	text         :'관계',
                        	xtype        :'excolumn',
                            dataIndex    :'REPRESEN_REL',
                            flex         : 1,
                            exAlign      : 'center'
                        },{
                            text         :'신도명',
                            xtype        :'excolumn',
                            dataIndex    :'NAME_KOR',
                            flex         : 1.6,
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
            	flex : 1,
            	layout : 'vbox',
            	items  : [{
            		layout : 'hbox',
            		height : 30,
            		width  : '100%',
            		items  :[{
            			flex : 1,
            			//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">접수버튼 영역</div>',
            		},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r20_02',
            			name      : 'rdo_ApprovalGbn_r20_02',
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
    	                	reference  : 'rdo_ApprovalGbn_r20_02_2',
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
    	                    reference        : 'ds_TSRec',
    	                    name             : 'ds_TSRec',
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
            		width : '100%',
        			xtype      :'exgrid',                        
                    height     : 304,
                    cls        : 'rec020w_02_c none-dirty-grid',
                    reference  : 'rec020w_02_c',
                    bind:{
                        store:'{ds_TSRec}'
                    },
                    listeners      : {
                    	 edit            : 'onEdit'
                    	,selectionchange : 'onSelectionChange'
                    },
                    plugins     : [{
                    	ptype:'cellediting',
                    	clicksToEdit: 1
                    }],
                    columns:[{
                    	text  :'순번',
                        xtype :'rownumberer',
                        align : 'center',
                        width : 80,
                    },{
                    	text         :'접수종류 ',
                    	xtype        :'excolumn',
                        dataIndex    :'TEMPLE_STAY_NM',
                        width        : 120,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	//meta.tdCls = 'recCellEdit';
                        	return value;
                        },
                    },{
                    	text         :'신도명 ',
                    	xtype        :'excolumn',
                        dataIndex    :'NAME_KOR',
                        width        : 100,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	//meta.tdCls = 'recCellEdit';
                        	return value;
                        },
                    },{
                    	text         :'시작월 ',
                    	xtype        :'excolumn',
                        dataIndex    :'FDATE',
                        width        : 100,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	//meta.tdCls = 'recCellEdit';
                        	return exCommon.getGridDateFormat(value, '/' , 8);
                        },
                    },{
                    	text         :'종료월 ',
                    	xtype        :'excolumn',
                        dataIndex    :'RDATE',
                        width        : 100,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	//meta.tdCls = 'recCellEdit';
                        	return exCommon.getGridDateFormat(value, '/' , 8);
                        },
                    },{
                    	text         :'접수금액',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_PLAN_AMT',
                        width        : 100,
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                           	 meta.tdCls = "recCellEdit";
                           	 return exCommon.setNumberFormat(value);
                        },
                        editor        : {
                        	xtype         : 'extextfield',
                        },
                    },{
                    	text         :'납부금액',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_AMT',
                        width        : 100,
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                           	 meta.tdCls = "recCellEdit";
                           	 return exCommon.setNumberFormat(value);
                        },
                        editor        : {
                        	xtype         : 'extextfield',
                        },
                    
                    },{
                    	text         :'미수금액',
                        xtype        :'excolumn',
                        dataIndex    :'MISU_AMT',
                        width        : 100,
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                           	 meta.tdCls = "recCellNotEdit";
                           	 return exCommon.setNumberFormat(value);
                        },
                    },{
                    	text         :'참가경로',
                        xtype        :'excolumn',
                        dataIndex    :'JOIN_PATH_CD',
                        width        : 165,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_joinPath');
                        	return exCommon.getComboVal(value,store);
                        },
                        editor        : {
                        	xtype        : 'excombobox',
                            valueField   : 'CODE',
                            displayField : 'NAME',
                            bind:{
                                store:'{ds_joinPath}'
                            }
                        },
                    },{
                    	text         :'참가동기',
                        xtype        :'excolumn',
                        dataIndex    :'JOIN_REMARK',
                        width        : 220,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                           	 meta.tdCls = "recCellEdit";
                           	 return value;
                        },
                        editor        : {
                        	xtype         : 'extextfield',
                        },
                    },{
                    	text         :'비고',
                        xtype        :'excolumn',
                        dataIndex    :'REMARK',
                        width        : 220,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                           	 meta.tdCls = "recCellEdit";
                           	 return value;
                        },
                        editor        : {
                        	xtype         : 'extextfield',
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
