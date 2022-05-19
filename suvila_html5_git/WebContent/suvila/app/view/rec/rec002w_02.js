Ext.define('ExFrm.view.rec.rec002w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_02',
    requires:['ExFrm.view.rec.rec002w_02Controller',
              'ExFrm.view.rec.rec002w_02Model'
          //    'ExFrm.view.rec.rec000w_03',
           //   'ExFrm.view.rec.rec000w_02'              
              ],
    controller:'rec002w_02',
    
    viewModel:{
        type:'rec002w_02'
    },
    name:'rec002w_02',
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
            height:5
        },{
            height:340,
            layout:{
                type:'hbox',
                align:'stretch'
            },
            items:[{            	
            	width    : 710,
            	layout   : 'vbox',
            	items    :[{
            		height : 30,
            		layout : 'hbox',
            		items  : [{
            			//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;padding-top:5px;">대상 및 접수항목 선택</div>',
            			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택</div>',
            		},{
            			width : 20
            		}]
            	},{
                    xtype  		  :'exgrid',
                    width  		  : '99.9%',
                    height 	      : 300,
                    cls    		  : 'none-dirty-grid rec002w_02_a ',
                    reference     : 'rec002w_02_a',
                    bind:{
                        store:'{ds_GDKindInfo}'
                    },
                    columns:[{
                    	text         : '선택',
                    	xtype        : 'excheckcolumn',
                        dataIndex    : 'SEL_YN',                    
                        exAlign      : 'center',
                        flex         : 0.8,  
                        stopSelection: false,                        
                    },{
                    	text         :'종류',
                    	xtype        :'excolumn',
                        dataIndex    :'PRAY_GBN_NM',
                        flex         : 0.8,
                        exAlign      : 'center',
                        sortable     : true
                    },{
                    	text         :'기도/법회명',
                    	xtype        :'excolumn',
                        dataIndex    :'PRAY_NM',
                        flex         : 2,
                        exAlign      : 'left',
                        sortable     : true
                    },{
                    	text         :'입제일',
                    	xtype        :'excolumn',
                        dataIndex    :'FDATE',
                        flex         : 1.5,
                        exAlign      : 'left',
                        sortable     : true,
                        renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getGridDateFormat(value , ' / ' , 8);
                        },
                    },{
                    	text         :'회향일',
                    	xtype        :'excolumn',
                        dataIndex    :'RDATE',
                        flex         : 1.5,
                        exAlign      : 'left',
                        sortable     : true,
                        renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getGridDateFormat(value , ' / ' , 8);
                        },
                    },{
                    	text         :'기간',
                    	xtype        :'excolumn',
                        dataIndex    :'PERIOD',
                        flex         : 0.9,
                        exAlign      : 'left',
                        exType       : 'number',
                        exAlign      : 'right',
                        sortable     : true
                    },{
                        text         :'기도/법회비',
                        xtype        :'excolumn',
                        dataIndex    :'PROD_AMT',
                        flex         : 1.8,
                        exType       : 'number',
                        exAlign      : 'right',
                        sortable     : true
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
            			//flex : 1,
            		//	html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">접수버튼 영역</div>',
            		//},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r02_02',
            			name      : 'rdo_ApprovalGbn_r02_02',
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
    	                	
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
            			}]
            		},{
            			xtype     : 'exbutton',
                  		text      : '삭제',
                  		handler   : 'onDelete',
            		},{
            			width : 3
            		},{
            			xtype     : 'exbutton',
                  		text      : '전체취소',
                  		handler   : 'onDelAll',
            		},{
            			width : 3
            		},{
            			xtype     : 'exbutton',
                  		text      : '접수완료',
                  		handler   : 'onSave',
            		},{
            			width : 0,
            			items : [{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_GDRec',
    	                    name             : 'ds_GDRec',
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
                    cls        : 'rec002w_02_b none-dirty-grid',
                    reference  : 'rec002w_02_b',
                    features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    bind:{
                        store:'{ds_GDRec}'
                    },
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                listeners      : {
	                	beforeedit   : 'onBeforeedit',	    
	                	edit         : 'onEdit'
                    },
                    columns:[{
                    	text  :'순번',
                        xtype :'rownumberer',
                        align : 'center',
                        width : 60,
                    },{
                    	text         :'기도/법회명',
                    	xtype        :'excolumn',
                        dataIndex    :'PRAY_NM',
                        //flex         : 2,
                        width        : 140,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	text         :'입제일',
                    	xtype        :'excolumn',
                        dataIndex    :'FDATE',
                        ///flex         : 1.6,
                        width        : 110,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return exCommon.getFormat(value,'dateYMD');
                        },
                    },{
                    	text         :'회향일',
                    	xtype        :'excolumn',
                        dataIndex    :'FDATE',
                        //flex         : 1.6,
                        width        : 110,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return exCommon.getFormat(value,'dateYMD');
                        },
                    },{
                        text         :'동참금',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_PLAN_AMT',
                        //flex         : 1.6,
                        width        : 100,
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                    editor        : {
	                    	xtype         : 'numberfield',
	                    },
                    },{
                    	
                        text         :'납부금액',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_AMT',
                        //flex         : 1.6,
                        width        : 100,
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                    editor        : {
	                    	xtype         : 'numberfield',
	                    },
                    },{
                        text         :'미수금액',
                        xtype        :'excolumn',
                        dataIndex    :'MISU_AMT',
                        //flex         : 1.6,
                        width        : 100,
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return exCommon.setNumberFormat( exCommon.getRepNum(record.get("MISU_AMT")));
                        },
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat( exCommon.getRepNum(value) )+' 원';
	                    }
                    },{
                    	text         :'개인축원',
                    	xtype        :'excolumn',
                        dataIndex    :'PER_BUD_NO',
                        //flex         : 1.6,
                        width        : 110,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('body_FamilyInfo');
                        	return exCommon.getComboVal(value,store, 'user' , 'BUD_NO' , 'NAME_KOR' );
                        	
                        },
                        editor        : {
                        	xtype        : 'excombobox',
                            valueField   : 'BUD_NO',
                            displayField : 'NAME_KOR',
                            bind:{
                                store:'{body_FamilyInfo}'
                            }
                        },
                    },{
                        text         :'개인발원',
                        xtype        :'excolumn',
                        dataIndex    :'ORGINATE',
                        //flex         : 3,
                        width        : 150,
                        exAlign      : 'left',
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellEdit';
                        	return value;
                        }, 
                    },{
                        text         :'비고',
                        xtype        :'excolumn',
                        dataIndex    :'REMARK',
                        //flex         : 3,
                        width        : 170,
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
            xtype:'rec000w_03'
        }]
    }]
});
