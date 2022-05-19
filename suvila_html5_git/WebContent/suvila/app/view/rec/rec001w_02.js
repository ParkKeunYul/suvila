Ext.define('ExFrm.view.rec.rec001w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec001w_02',
    requires:[
    	 'ExFrm.view.rec.rec001w_02Controller'
        ,'ExFrm.view.rec.rec001w_02Model'
    ],
    controller:'rec001w_02',
    viewModel:{
        type:'rec001w_02'
    },
    name:'rec001w_02',
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
            height:370,
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
            		items  :[{
            			//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;padding-top:5px;">대상 및 접수항목 선택</div>',
            			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택</div>',
            		},{
            			width : 10,
            		},{
                    	xtype        :'excombobox',
                    	labelWidth   : 60,
                        fieldLabel   : '<span style="font-weight: 700;">복위자</span>',
                        width        : 200,
                        style        : 'padding-top:5px;',
                        valueField   : 'FIND_VALUE',
                        displayField : 'DISPLAY',     
                        reference    :'lc_bokwi',
                    	bind         : {
                        	store:'{ds_bokwi}'
                        },
                        listeners       : {
                        	change:'onSearchBokWi'
                        },
                        /*listConfig: {
                            itemTpl: [                        	
                                '<div data-qtip="{NAME_KOR} - {NAME}"><span>{NAME_KOR} - {NAME}</span></div>'
                            ]
                        },*/
                        hidden : true
            		}]
            	},{
            		layout : 'hbox',
            		items  :[{
            			xtype    : 'tabpanel',
                		reference: 'recTYpe',
                		cls      : 'selectTab',
                		width    : 350,
                        listeners:{
                            tabChange:'onTabChange'
                        },
                        items:[{
                        	title  :'인등',
                        	layout : 'hbox',
                        	items : [{
                        		width     : 350,
                                xtype     :'exgrid',
                                height 	  : 300,
                                reference : 'rec002w_02_c',
                                cls    	  : 'none-dirty-grid rec002w_02_a ',
                                bind:{
                                    store:'{ds_IDKindInfo}'
                                },
                                columns:[{
                                	text         : '선택',
                                	xtype        : 'excheckcolumn',
                                    dataIndex    : 'SEL_YN',                    
                                    exAlign      : 'center',
                                    width        : 50,  
                                    stopSelection: false,
                                    listeners    : {
                                   	 checkchange : 'idCheckchange'
                                    }
                                },{
                                	text         :'등종류',
                                	xtype        :'excolumn',
                                    dataIndex    :'LIGHT_NM',
                                    flex         : 1.6,
                                    exAlign      : 'left',
                                },{
                                	text         :'금액',
                                	xtype        :'excolumn',
                                    dataIndex    :'PROD_AMT',
                                    flex         : 1,
                                    exType       : 'number',
                                },{
                                	text         :'기간',
                                	xtype        :'excolumn',
                                    dataIndex    :'PERIOD',
                                    flex         : 0.8,
                                    exType       : 'number',
                                }]
                        	}]
                        }]
            		},{
            			width : 10
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
                            height 	   : 300,
                            bind       : {
                                store:'{ds_familySelInfo}'
                            },
                            columns:[{
                           	 	 text          : '선택',
                            	 xtype         : 'excheckcolumn',
                                 dataIndex     : 'SEL_YN',                    
                                 exAlign       : 'center',
                                 width         : 50,  
                                 stopSelection : false,    
                             },{
                            	 text         :'관계',
                            	 xtype        :'excolumn',
                                 dataIndex    :'REPRESEN_REL',
                                 flex         : 0.4,
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
                                 flex         : 0.8,
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
                       	 	title      : '영가',
                       	 	xtype      : 'exgrid',
                       	 	reference  : 'rec002w_02_f',
                       	 	cls        : 'rec002w_02_b none-dirty-grid',
                       	 	width      : '100%',
                       	 	height 	   : 300,
                            bind       : {
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
                                 renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                                	 
                                	 var DEATH_YN = record.get("DEATH_YN");
                                	 
                                	 var color = "recCellEdit";
                                	 
                                	 if(DEATH_YN == 1){
                                		 color = "recCellNotEdit";
                                	 }else if(DEATH_YN == 2){
                                		 color = "cmsline";
                                	 }
                                	 meta.tdCls = color;
                                	 
                                	 return value;
                                 }
                             },{
                            	 text         :'관계',
                             	 xtype        :'excolumn',
                                 dataIndex    :'DECE_REL',
                                 width        : 60,
                                 exAlign      : 'left',
                                 renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                                	 
                                	 var DEATH_YN = record.get("DEATH_YN");
                                	 
                                	 var color = "recCellEdit";
                                	 
                                	 if(DEATH_YN == 1){
                                		 color = "recCellNotEdit";
                                	 }else if(DEATH_YN == 2){
                                		 color = "cmsline";
                                	 }
                                	 meta.tdCls = color;
                                	 
                                	 return value;
                                 }
                             },{
                            	 text         :'영가명',
                              	 xtype        :'excolumn',
                                 dataIndex    :'NAME_KOR',
                                 width        : 78,
                                 exAlign      : 'left',
                                 renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                                	 
                                	 var DEATH_YN = record.get("DEATH_YN");
                                	 
                                	 var color = "recCellEdit";
                                	 
                                	 if(DEATH_YN == 1){
                                		 color = "recCellNotEdit";
                                	 }else if(DEATH_YN == 2){
                                		 color = "cmsline";
                                	 }
                                	 meta.tdCls = color;
                                	 
                                	 return value;
                                 }
                             },{
                             	 text         :'본',
                                 xtype        :'excolumn',
                                 dataIndex    :'BON_NM',
                                 width        : 60,
                                 exAlign      : 'center',
                                 renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                                	 
                                	 var DEATH_YN = record.get("DEATH_YN");
                                	 
                                	 var color = "recCellEdit";
                                	 
                                	 if(DEATH_YN == 1){
                                		 color = "recCellNotEdit";
                                	 }else if(DEATH_YN == 2){
                                		 color = "cmsline";
                                	 }
                                	 meta.tdCls = color;
                                	 
                                	 return value;
                                 }
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
            			//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">접수버튼 영역</div>',
            		},{
            		//	width : 5
            		},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r01_02',
            			name      : 'rdo_ApprovalGbn_r01_02',
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
    	                    reference        : 'ds_IDRec',
    	                    name             : 'ds_IDRec',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_YDRec',
    	                    name             : 'ds_YDRec',
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
                    height     : 335,
                    cls        : 'rec002w_02_b none-dirty-grid',
                    reference  : 'rec002w_02_b',
                    features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    bind:{
                        store:'{ds_IDRec}'
                    },
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                listeners      : {
	                	beforeedit   : 'onBeforeeditID',	    
	                	edit         : 'onEditID',
	                	cellclick    : 'onCellClickID',
                    },
                    columns:[{
                    	text  :'순번',
                        xtype :'rownumberer',
                        align : 'center',
                        width : 60,
                      //  locked: true,
                    },{
                    	xtype        :'excolumn',
                    	text         :'인등종류',
                        dataIndex    :'LIGHT_NM',                        
                        width        : 110,
                        exAlign      : 'left',
               //         locked       : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = "color_depth_1";
                        	return value;
                        }
                    },{
                    	xtype        :'excolumn',
                    	text         :'신도명',
                        dataIndex    :'NAME_KOR',                        
                        width        : 80,
                        exAlign      : 'center',
                   //     locked       : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = "color_depth_1";
                        	return value;
                        }
                    },{
                    	xtype        :'excolumn',
                    	text         :'복위자명',
                        dataIndex    :'BOKWIJA_NM',                        
                        width        : 80,
                        exAlign      : 'center',
                     //   locked       : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = "color_depth_1";
                        	return value;
                        }
                    
                    },{
                    	xtype        :'excolumn',
                    	text         :'전각구분',
                        dataIndex    :'JUNGAK_GBN',                        
                        width        : 90,
                        exAlign      : 'center',
                        editor    : {
	                        xtype         : 'excombobox',
	                        valueField    : 'CODE',
	                        displayField  : 'NAME',
	                        exAlign       : 'center',
	                        bind          : {
	                            store:'{ds_jungakGbn}'
	                        }
                        },
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if( record.get("DONGCHAMJA_GBN") == "*" ){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_jungakGbn');
                        	return exCommon.getComboVal(value,store, '' );
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'인등위치(팝업)',
                        dataIndex    :'JUNGAK_NM',                        
                        width        : 120,
                        exAlign      : 'center',
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if( record.get("DONGCHAMJA_GBN") == "*" ){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	
                        	return value;
                        }
                    },{
                    	xtype        :'excolumn',
                    	text         :'일반',
                        dataIndex    :'IMG_NORMAL',                        
                        width        : 50,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = "color_depth_1";
                        	return "";
                        }
                    },{
                    	xtype        :'excolumn',
                    	text         :'상세',
                        dataIndex    :'IMG_DETAIL',                        
                        width        : 50,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = "color_depth_1";
                        	return "";
                        }
                    },{
                    	xtype        :'excolumn',
                    	text         :'인등번호',
                        dataIndex    :'LIGHT_NO',                        
                        width        : 90,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if( record.get("DONGCHAMJA_GBN") == "*" ){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	
                        	return exCommon.setNumberFormat(value , "");
                        },
                        editor:{
	                        xtype    : 'extextfield',
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'년',
                        dataIndex    :'INDEUNG_YEAR',                        
                        width        : 50,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if( record.get("DONGCHAMJA_GBN") == "*" ){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	return value;
                        },
                        editor:{
	                        xtype    : 'extextfield',
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'월',
                        dataIndex    :'INDEUNG_MONTH',                        
                        width        : 50,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if( record.get("DONGCHAMJA_GBN") == "*" ){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	return value;
                        },
                        editor:{
	                        xtype    : 'extextfield',
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'기간',
                        dataIndex    :'INDEUNG_PERIOD',                        
                        width        : 50,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if( record.get("DONGCHAMJA_GBN") == "*" ){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	return value;
                        },
                        editor:{
	                        xtype    : 'extextfield',
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'동참금',
                        dataIndex    :'PAYMENT_PLAN_AMT',                        
                        width        : 90,
                        exAlign      : 'right',
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if( record.get("DONGCHAMJA_GBN") == "*" ){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	return exCommon.setNumberFormat(value);
                        },
                        editor:{
	                        xtype    : 'extextfield',
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'납부금액',
                        dataIndex    :'PAYMENT_AMT',                        
                        width        : 90,
                        exAlign      : 'right',
                        exType       : 'integer',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if( record.get("DONGCHAMJA_GBN") == "*" ){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	return exCommon.setNumberFormat(value);
                        },
                        editor:{
	                        xtype    : 'extextfield',
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'미수금액',
                        dataIndex    :'MISU_AMT',                        
                        width        : 90,
                        exAlign      : 'right',
                        exType       : 'number',
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = "color_depth_1";
                        	return exCommon.setNumberFormat(value);
                        }
                    },{
                    	xtype        :'excolumn',
                    	text         :'기간구분',
                        dataIndex    :'LIMIT_YN',                        
                        width        : 90,
                        exAlign      : 'center',
                        exHidden     : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = "color_depth_1";
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_limit_yn');
                        	return exCommon.getComboVal(value,store, '' );
                        }
                    },{
                    	xtype        :'excolumn',
                    	text         :'월납부금액',
                        dataIndex    :'BASE_PAYMENT_AMT',                        
                        width        : 105,
                        exAlign      : 'right',
                        exType       : 'number',
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = "color_depth_1";
                        	return exCommon.setNumberFormat(value);
                        }
                    },{
                    	xtype        :'excolumn',
                    	text         :'동참자',
                        dataIndex    :'DONGCHAMJA_GBN',                        
                        width        : 75,
                        exAlign      : 'center',
                        editor:{
	                        xtype    : 'extextfield',
                        },
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if(value == "*"){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	
                        	return value;
                        },
                    },{
                    	xtype        :'excolumn',
                    	text         :'비고',
                        dataIndex    :'REMARK',                        
                        width        : 200,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if(record.get("DONGCHAMJA_GBN") == "*"){
                        		meta.tdCls = "color_depth_1";
                        	}else{
                        		meta.tdCls = "recCellEdit";
                        	}
                        	
                        	return value;
                        },
                        editor:{
	                        xtype    : 'extextfield',
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
