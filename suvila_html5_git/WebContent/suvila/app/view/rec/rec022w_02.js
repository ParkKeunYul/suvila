Ext.define('ExFrm.view.rec.rec022w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec022w_02',
    requires:['ExFrm.view.rec.rec022w_02Controller',
              'ExFrm.view.rec.rec022w_02Model'
    ],
    controller:'rec022w_02',
    viewModel:{
        type:'rec022w_02'
    },
    name:'rec022w_02',
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
            height:3
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
            		height : 341,
            		layout : 'hbox',
            		items  :[{
            			layout : 'vbox',
            			width  : 350,
            			items  :[{
            				height : 12
            			},{
            				html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">대상 및 접수항목 선택</span>',
            			},{
            				width     : 350,
                            xtype     :'exgrid',
                            height 	  : 301,
                            reference : 'rec022w_02_a',
                            cls    	  : 'none-dirty-grid rec002w_02_a ',
                            bind:{
                                store:'{ds_WBKindInfo}'
                            },
                            columns:[{
                            	text         : '선택',
                            	xtype        : 'excheckcolumn',
                                dataIndex    : 'SEL_YN',                    
                                exAlign      : 'center',
                                width        : 50,  
                                stopSelection: false,
                                listeners    : {
                               	 checkchange : 'wbCheckchange'
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
                            reference  : 'rec022w_02_b',
                            cls        : 'rec002w_02_b none-dirty-grid',
                            width      : '100%',
                            height 	   : 305,
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
                       	 	reference  : 'rec022w_02_c',
                       	 	cls        : 'rec002w_02_b none-dirty-grid',
                       	 	width      : '100%',
                       	 	height 	   : 305,
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
            		height : 5,
            	},{
            		layout : 'hbox',
            		height : 25,
            		width  : '100%',
            		items  :[{
            			flex : 1,
            			html : '<span style="color:red;font-weight:700;">가족,영가를  같은 원불에 접 수할수 없습니다.</span>'
            		},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r22_02',
            			name      : 'rdo_ApprovalGbn_r22_02',
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
    	                	reference  : 'rdo_ApprovalGbn_r22_02_2',
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
            			}]
            		},{
            			xtype     : 'exbutton',
                  		reference : 'deleteBtn',
                  		name      : 'deleteBtn',
                  		text      : '선택기도취소',
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
    	                    reference        : 'ds_WBRec',
    	                    name             : 'ds_WBRec',
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
                    height     : 308,
                    cls        : 'rec002w_02_b none-dirty-grid',
                    reference  : 'rec022w_02_d',
                    features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    bind:{
                        store:'{ds_WBRec}'
                    },
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                listeners      : {
	                	beforeedit   : 'onBeforeeditWB',	    
	                	edit         : 'onEditWB',
	                	cellclick    : 'onCellClickWB',
                    },
                    columns:[{
                    	text  :'순번',
                        xtype :'rownumberer',
                        align : 'center',
                        width : 60,
                    },{
                    	xtype        :'excolumn',
                    	text         :'원불종류',
                        dataIndex    :'LIGHT_NM',                        
                        width        : 110,
                        exAlign      : 'left',
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
                    	text         :'원불위치(팝업)',
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
                    	text         :'원불번호',
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
                    	text         :'기간(월)',
                        dataIndex    :'PERIOD_MONTH',                        
                        width        : 80,
                        exAlign      : 'center',
                        exHidden     : true,
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
                    	text         :'월납부금액',
                        dataIndex    :'BASE_PAYMENT_AMT',                        
                        width        : 105,
                        exAlign      : 'right',
                        exType       : 'number',
                        exHidden     : true,
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
                        	
                        	if(value == "*" || record.get("FAMILY_YN") == 'F'){
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
