Ext.define('ExFrm.view.rec.rec002w_32',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_32',
    requires:['ExFrm.view.rec.rec002w_32Controller',
              'ExFrm.view.rec.rec002w_32Model'
          //    'ExFrm.view.rec.rec000w_03',
           //   'ExFrm.view.rec.rec000w_02'              
              ],
    controller:'rec002w_32',
    
    viewModel:{
        type:'rec002w_32'
    },
    name:'rec002w_32',
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
            			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-갸홋-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택</div>',
            		},{
            			width : 20
            		},{
            			reference    : 'bulsa_select',            			
            			items :[{
            				xtype        :'excombobox',
                        	labelWidth   : 60,
                            fieldLabel   : '<span style="font-weight: 700;">불사종류</span>',
                            width        : 260,
                            valueField   : 'BULSA_CD',
                            displayField : 'BULSA_NM',     
                            reference    :'lc_BSKindInfo',
                            emptyText    : '전체',
                        	bind         : {
                            	store:'{ds_BSKindInfo}'
                            },
                            listeners:{
                            	change : 'onBschange'
                            }
            			}]
            		}]
            	},{
            		height : 1,
            	},{
            		height : 300,
            		width  : 710,
            		layout : 'hbox',
                	items : [{
               		 	flex      : 1,
                        xtype     :'exgrid',
                        height 	  : 300,
                        reference : 'rec002w_32_c',
                        cls    	  : 'none-dirty-grid rec002w_32_a ',
                        bind:{
                            store:'{ds_BSKindDetail}'
                        },
                        columns:[{
                        	text         : '선택',
                        	xtype        : 'excheckcolumn',
                            dataIndex    : 'SEL_YN',                    
                            exAlign      : 'center',
                            width        : 50,  
                            stopSelection: false,
                        },{
                        	text         :'게시일',
                        	xtype        :'excolumn',
                            dataIndex    :'ACPT_FDATE',
                            width        : 90,
                            exAlign      : 'center',
                            renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                            	meta.tdCls = 'recCellNotEdit';
                            	return exCommon.getGridDateFormat(value, '/', 8 );
                            },
                            
                        },{
                        	text         :'불사내역',
                        	xtype        :'excolumn',
                            dataIndex    :'BULSA_DETAIL',
                            width        : 120,
                            exAlign      : 'left',
                        },{
                        	text         :'불사금액',
                        	xtype        :'excolumn',
                            dataIndex    :'PROD_AMT',
                            exType       : 'number',
                            flex         : 1,
                            exAlign      : 'right',
                        }]
                	},{
                		width : 5
                	},{
                		width     : 350,
               		 	xtype     : 'tabpanel',
               		 	reference : 'familyTab',
               		 	cls       : 'selectTab',
                        items:[{
                        	title      :'가족',
                        	xtype      :'exgrid',
                            reference  : 'rec002w_02_e',
                            cls        : 'rec002w_02_b none-dirty-grid',
                            width      : '100%',
                            height 	   : 269,
                            bind       : {
                                store:'{ds_familySelInfo}'
                            },
                            columns:[{
                           	 	 text          : '선택',
                            	 xtype         : 'excheckcolumn',
                                 dataIndex     : 'SEL_YN',                    
                                 exAlign       : 'center',
                                 width         : 60,  
                                 stopSelection : false,    
                             },{
                            	 text         :'관계',
                            	 xtype        :'excolumn',
                                 dataIndex    :'REPRESEN_REL',
                                 width        : 90,
                                 exAlign      :'left',
                                 renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                                   	 
                                   	 var BUNGA_YN  = record.get("BUNGA_YN");
                                   	 var ONESELF_YN = record.get("ONESELF_YN");
                                   	 
                                   	 var color = "color_depth_1";
                                   	 
                                   	 if(BUNGA_YN == "T"){
                                   		 color = "color_depth_3";
                                   	 }else{
                                   		 if(ONESELF_YN == "T"){
                                   			color = "color_depth_2";
                                   		 }
                                   	 }
                                   	 meta.tdCls = color;
                                   	 
                                   	 return value;
                                  }
                             },{
                             	 text         :'신도명',
                             	 xtype        :'excolumn',
                                 dataIndex    :'NAME_KOR',
                                 flex         : 1,
                                 exAlign      : 'left',
                                 renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                                   	 
                                   	 var BUNGA_YN  = record.get("BUNGA_YN");
                                   	 var ONESELF_YN = record.get("ONESELF_YN");
                                   	 
                                   	 var color = "color_depth_1";
                                   	 
                                   	 if(BUNGA_YN == "T"){
                                   		 color = "color_depth_3";
                                   	 }else{
                                   		 if(ONESELF_YN == "T"){
                                   			color = "color_depth_2";
                                   		 }
                                   	 }
                                   	 meta.tdCls = color;
                                   	 
                                   	 return value;
                                  }
                            }]
                        },{
                        	title      :'영가',
                        	xtype      :'exgrid',
	                   	 	reference  : 'rec002w_32_f',
	                   	 	cls        : 'rec002w_32_b none-dirty-grid',
	                   	 	width      : 350,
	                   	 	height     : 269,
	                        bind:{
	                            store:'{ds_spiritSelInfo}'
	                        },
	                        columns:[{
	                       	 text         : '선택',
	                        	 xtype        : 'excheckcolumn',
	                            dataIndex    : 'SEL_YN',                    
	                            exAlign      : 'center',
	                            width        : 50,  
	                            stopSelection: false,    
	                         },{
	                        	 text         :'복위자명',
	                        	 xtype        :'excolumn',
	                            dataIndex    :'BOKWIJA_NM',
	                            width        : 80,
	                            exAlign      : 'left',
	                         },{
	                       	 text         :'관계',
	                         	 xtype        :'excolumn',
	                            dataIndex    :'DECE_REL',
	                            width        : 60,
	                            exAlign      : 'left',
	                         },{
	                        	 text         :'영가명',
	                          	 xtype        :'excolumn',
	                            dataIndex    :'NAME_KOR',
	                            width        : 78,
	                            exAlign      : 'left',
	                         },{
	                         	 text         :'본',
	                            xtype        :'excolumn',
	                            dataIndex    :'BON_NM',
	                            width        : 60,
	                            exAlign      : 'center',
	                        }]
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
            			//flex : 1,
            		//	html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">접수버튼 영역</div>',
            		//},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r02_032',
            			name      : 'rdo_ApprovalGbn_r02_032',
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
    	                    reference        : 'ds_GDRec',
    	                    name             : 'ds_GDRec',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_BSRec',
    	                    name             : 'ds_BSRec',
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
                    cls        : 'rec002w_32_b none-dirty-grid',
                    reference  : 'rec002w_32_d',
                    features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    bind:{
                        store:'{ds_BSRec}'
                    },
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                listeners      : {
	                	/*beforeedit   : 'onBeforeedit',*/	    
	                	edit         : 'onBsEdit'
                    },
                    columns:[{
                    	text  :'순번',
                        xtype :'rownumberer',
                        align : 'center',
                        width : 60,
                        
                    },{
                    	xtype        :'excolumn',
                    	text         :'접수종류',
                        dataIndex    :'BULSA_NM',                        
                        width        : 110,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'접수내역',
                        dataIndex    :'BULSA_DETAIL',                        
                        width        : 110,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'신도명',
                        dataIndex    :'NAME_KOR',                        
                        width        : 90,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'시작일',
                        dataIndex    :'ACPT_FDATE',                        
                        width        : 110,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return exCommon.getFormat(value,'dateYMD');
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'종료일',
                        dataIndex    :'ACPT_EDATE',                        
                        width        : 110,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return exCommon.getFormat(value,'dateYMD');
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'동참금',
                        dataIndex    :'PAYMENT_PLAN_AMT',                        
                        width        : 90,
                        exAlign      : 'right',
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat( exCommon.getRepNum(value) )+' 원';
	                    },
	                    editor        : {
	                    	xtype         : 'numberfield',
	                    },
                    },{
                    	xtype        :'excolumn',
                    	text         :'납부금액',
                        dataIndex    :'PAYMENT_AMT',                        
                        width        : 90,
                        exAlign      : 'right',
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat( exCommon.getRepNum(value) )+' 원';
	                    },
	                    editor        : {
	                    	xtype         : 'numberfield',
	                    },
                    },{
                    	xtype        :'excolumn',
                    	text         :'미수금액',
                        dataIndex    :'MISU_AMT',                        
                        width        : 90,
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
                    	xtype        :'excolumn',
                    	text         :'비고',
                        dataIndex    :'REMARK',                        
                        width        : 200,
                        exAlign      : 'center',
                        editor       : {
	                    	xtype         : 'numberfield',
	                    },
                    }]
            	}]
            }]
        },{
            xtype:'rec000w_03'
        }]
    }]
});
