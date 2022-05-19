Ext.define('ExFrm.view.rec.rec011w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec011w_02',
    requires:['ExFrm.view.rec.rec011w_02Controller',
              'ExFrm.view.rec.rec011w_02Model',
          //    'ExFrm.view.rec.rec000w_03',
          //    'ExFrm.view.rec.rec000w_02'              
              ],
    controller:'rec011w_02',
    viewModel:{
        type:'rec011w_02'
    },
    name:'rec011w_02',
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
            			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">대상 및 접수항목 선택</span>',
            			height : 25,
            		}]
            	},{
            		layout : 'hbox',
            		width  : '100%',
            		items  : [{
            			flex       : 1,
            			xtype      :'exgrid',                        
                        height     : 284,
                        cls        : 'rec011w_02_a none-dirty-grid',
                        reference  : 'rec011w_02_a',
                        bind:{
                            store:'{ds_supportMgt}'
                        },
                        columns:[{
                        	text         : '선택',
                        	xtype        : 'excheckcolumn',
                            dataIndex    : 'SEL_YN',                    
                            exAlign      : 'center',
                            flex         : 0.8,  
                        },{
                            text         :'후원명',
                            xtype        :'excolumn',
                            dataIndex    :'SUPPORT_NM',
                            flex         : 1.6,
                            exAlign      : 'left',
                        }]
            		},{
            			width : 5
            		},{
            			flex       : 1,
            			xtype      :'exgrid',                        
                        height     : 284,
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
                            exAlign      : 'center',
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
                            flex         : 1.6,
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
            		height : 25,
            		width  : '100%',
            		items  :[{
            			flex : 1,
            			//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">접수버튼 영역</div>',
            			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">접수버튼 영역</span>',
            		},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r11_02',
            			name      : 'rdo_ApprovalGbn_r11_02',
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
    	                    reference        : 'ds_SupportRec',
    	                    name             : 'ds_SupportRec',
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
                    height     : 284,
                    cls        : 'rec011w_02_c none-dirty-grid',
                    reference  : 'rec011w_02_c',
                    bind:{
                        store:'{ds_SupportRec}'
                    },
                    listeners      : {
                    	 edit            : 'onEdit'
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
                    	text         :'후원명 ',
                    	xtype        :'excolumn',
                        dataIndex    :'SUPPORT_NM',
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
                    	text         :'후원시작월 ',
                    	xtype        :'excolumn',
                        dataIndex    :'FIRST_PAYMENT_YYYYMM',
                        width        : 100,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	//meta.tdCls = 'recCellEdit';
                        	//return value;
                        	return exCommon.getGridDateFormat(value,'/' , 6);
                        },
                        editor        : {
                        	xtype         : 'extextfield',
                        },
                    },{
                    	text         :'기간(달) ',
                    	xtype        :'excolumn',
                        dataIndex    :'SUPPORT_PERIOD',
                        width        : 90,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(value);
                        },
                        editor        : {
                        	xtype         : 'extextfield',
                        },
                    },{
                    	text         :'월납입예정금액',
                        xtype        :'excolumn',
                        dataIndex    :'BASE_AMT',
                        width        : 140,
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
                    	text         :'동참금',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_PLAN_AMT',
                        width        : 100,
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                           	 meta.tdCls = "recCellNotEdit";
                           	 return exCommon.setNumberFormat(value);
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
