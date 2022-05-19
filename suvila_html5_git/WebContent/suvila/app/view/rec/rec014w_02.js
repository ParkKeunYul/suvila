Ext.define('ExFrm.view.rec.rec014w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec014w_02',
    requires:['ExFrm.view.rec.rec014w_02Controller',
              'ExFrm.view.rec.rec014w_02Model',
    ],
    controller:'rec014w_02',
    viewModel:{
        type:'rec014w_02'
    },
    name:'rec014w_02',
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
            height:10
        },{
            height:230,
            layout:{
                type:'hbox',
                align:'stretch'
            },
            items:[{            	
            	width    : 500,
            	layout   : 'vbox',
            	items    :[{
            		layout : 'hbox',
            		width  : '100%',
            		height : 25,
            		items  : [{
            			//html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">대상 및 접수항목 선택</span>',
            			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택</div>',
            		},{
            			width : 5
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
            		}]            		
            	},{
                    xtype  :'exgrid',
                    width  : '99.9%',
                    height : 200,
                    cls    : 'rec014w_02 none-dirty-grid',
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
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                       	 
                       	 var DEATH_YN = record.get("DEATH_YN");
                       	 var color    = "recCellEdit";
                       	 
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
                       	 var color    = "recCellEdit";
                       	 
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
                       	 var color    = "recCellEdit";
                       	 
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
                       	 var color    = "recCellEdit";
                       	 
                       	 if(DEATH_YN == 1){
                       		 color = "recCellNotEdit";
                       	 }else if(DEATH_YN == 2){
                       		 color = "cmsline";
                       	 }
                       	 meta.tdCls = color;
                       	 
                       	 return value;
                        }
                    },{
                   	 	text         :'음력/양력',
                        xtype        :'excolumn',
                        dataIndex    :'LUNAR_SOLAR_NM',
                        width        : 80,
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
                    },{
                   	 	text         :'기일',
                        xtype        :'excolumn',
                        dataIndex    :'DEATH_DAY',
                        width        : 90,
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
                      	 
                      	return exCommon.getGridDateFormat(value, '/' , 8);
                       }
                    },{
                   	 	text         :'사망시간',
                        xtype        :'excolumn',
                        dataIndex    :'DEATH_TIME',
                        width        : 80,
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
                      	 
                      	 
                      	 if(isNaN(value)){
                      		 return value;
                    	 }
                    	
                    	 var D_TIME = value+'';
                    	 if(D_TIME.length == 1){
                    		 D_TIME ="0"+ D_TIME + ":00"; 
                		 }else if(D_TIME.length == 2){
                			 D_TIME = D_TIME + ":00";
                		 }else if(D_TIME.length == 3){
                			 D_TIME = D_TIME.substr(0,2) + ":" + D_TIME.substr(2) +"0";
                		 }else if(D_TIME.length == 4){
                			 D_TIME = D_TIME.substr(0,2) + ":" + D_TIME.substr(2);
                		 }else if(D_TIME.length > 4){
                			 D_TIME = D_TIME.substr(0,2) + ":" + D_TIME.substr(2,2);
                		 }
                      	 return D_TIME;
                       }
                    },{
                   	 	text         :'동일',
                        xtype        :'excolumn',
                        dataIndex    :'EQUAL_GBN_NM',
                        width        : 80,
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
                    },{
                   	 	text         :'영가',
                        xtype        :'excolumn',
                        dataIndex    :'SPIRITUAL_GBN_NM',
                        width        : 80,
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
            		height : 25,
            		width  : '100%',
            		items  :[{
            			flex : 1,
            			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">접수버튼 영역</span>',
            		},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r14_02',
            			name      : 'rdo_ApprovalGbn_r14_02',
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
    	                	reference : 'rdo_ApprovalGbn_r14_02_2',
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
            			}]
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
            		    	width : 5
            		    },{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_youngtop_youngga',
    	                    name             : 'ds_youngtop_youngga',
    	                    value            : '',
    	                    inputType        : 'hidden',
            		    },{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_youngtop_detail',
    	                    name             : 'ds_youngtop_detail',
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
                    height     : 200,
                    cls        : 'rec014w_02_b none-dirty-grid',
                    reference  : 'rec014w_02_b',
                    /*features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],*/
                    bind:{
                        store:'{ds_youngtop_youngga}'
                    },
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                listeners      : {
	                	beforeedit   : 'onBeforeedit',	    
	                	edit         : 'onEdit',
	                	cellclick    : 'onCellClick',
                    },
                    columns:[{
                    	text         :'순번',
                    	xtype        :'excolumn',
                        dataIndex    :'BONGTOP_SEQ',
                        width        : 60,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	text         :'망관계',
                    	xtype        :'excolumn',
                        dataIndex    :'YOUNGGA_REL',
                        width        : 90,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	text         :'본',
                    	xtype        :'excolumn',
                        dataIndex    :'YOUNGGA_BON',
                        width        : 60,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	text         :'후인',
                    	xtype        :'excolumn',
                        dataIndex    :'YOUNGGA_GENDER',
                        width        : 60,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	text         :'영가자',
                    	xtype        :'excolumn',
                        dataIndex    :'YOUNGGA_BUD_NM',
                        width        : 80,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                    	text         :'위치',
                    	xtype        :'excolumn',
                        dataIndex    :'JUNGAK_NM',
                        width        : 80,
                        exAlign      : 'left',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(rowIndex != 0){
                        		meta.tdCls = 'recCellNotEdit';
                        	}else{
                        		meta.tdCls = 'recCellEdit';
                        	}
                        	return value;
                        },
                    },{
                    	text         :'탑번',
                    	xtype        :'excolumn',
                        dataIndex    :'LIGHT_NO',
                        width        : 80,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(rowIndex != 0){
                        		meta.tdCls = 'recCellNotEdit';
                        	}else{
                        		meta.tdCls = 'recCellEdit';
                        	}
                        	return value;
                        },
                    },{
                        text         :'동참금',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_PLAN_AMT',
                        width        : 90,
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(rowIndex != 0){
                        		meta.tdCls = 'recCellNotEdit';
                        	}else{
                        		meta.tdCls = 'recCellEdit';
                        	}
                        	return exCommon.setNumberFormat(value);
                        },
	                    /*summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(value)+' 원';
	                    },*/
	                    editor        : {
	                    	xtype         : 'numberfield',
	                    },
                    },{
                        text         :'납부금액',
                        xtype        :'excolumn',
                        dataIndex    :'PAYMENT_AMT',
                        width        : 90,
                        exType       : 'number',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(rowIndex != 0){
                        		meta.tdCls = 'recCellNotEdit';
                        	}else{
                        		meta.tdCls = 'recCellEdit';
                        	}
                        	return exCommon.setNumberFormat(value);
                        },
                        /*summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(new Number(value))+' 원';
	                    },*/
	                    editor        : {
	                    	xtype         : 'numberfield',
	                    	allowBlank: false
	                    },
                    },{
                        text         :'미수금액',
                        xtype        :'excolumn',
                        dataIndex    :'MISU_AMT',
                        width        : 90,
                        exType       : 'number',
                        exHidden     : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(rowIndex != 0){
                        		meta.tdCls = 'recCellNotEdit';
                        	}else{
                        		meta.tdCls = 'recCellEdit';
                        	}
                        	return exCommon.setNumberFormat(value);
                        },
                    },{
                        text         :'비고',
                        xtype        :'excolumn',
                        dataIndex    :'REMARK',
                        width        : 100,
                        exAlign      : 'left',
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(rowIndex != 0){
                        		meta.tdCls = 'recCellNotEdit';
                        	}else{
                        		meta.tdCls = 'recCellEdit';
                        	}
                        	return value;
                        },
                    },{
                        text         :'봉탑일',
                        xtype        :'excolumn',
                        dataIndex    :'BONGTOP_DT',
                        width        : 100,
                        exAlign      : 'center',
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellEdit';
	                    	return exCommon.getGridDateFormat(value, '/' , 8);
                        },
                    },{
                        text         :'봉탑구분',
                        xtype        :'excolumn',
                        dataIndex    :'BONGTOP_GBN',
                        width        : 100,
                        exAlign      : 'left',
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellEdit';
                        	return value;
                        },
                    },{
                        text         :'동일',
                        xtype        :'excolumn',
                        dataIndex    :'YOUNGGA_EQUAL',
                        width        : 60,
                        exAlign      : 'center',
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    },{
                        text         :'영가',
                        xtype        :'excolumn',
                        dataIndex    :'YOUNGGA_SPIRITUAL',
                        width        : 60,
                        exAlign      : 'center',
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellNotEdit';
                        	return value;
                        },
                    }]
            	}]
            }]
        },{
        	width  : '100%',
        	layout : 'hbox',
        	items  :[{
        		flex : 5,
        		xtype   :'exfieldsetblockbox',
        		items   : [{
        			xtype:'exblockrow',
                    items:[{
                    	xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">제출서류</div>'
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		 xtype         : 'excheckbox',
	                   		 fieldLabel    : '<span style="font-weight: 700;">약정서</span>',
	           	       		 labelWidth    : 50,
	                   		 labelAlign    : 'right',
	                   		 name          : 'AGREE_SHEET_YN',
	                   		 reference     : 'cbx_agree_sheet_yn',
	                   		 inputValue    : 'T',
	                   		 uncheckedValue: 'F'
                    	},{
                    		 xtype         : 'excheckbox',
	                   		 fieldLabel    : '<span style="font-weight: 700;">가족증명서</span>',
	           	       		 labelWidth    : 80,
	                   		 labelAlign    : 'right',
	                   		 name          : 'FAMILY_SHEET_YN',
	                   		 reference     : 'cbx_family_sheet_yn',
	                   		 inputValue    : 'T',
	                   		 uncheckedValue: 'F'
                    	},{
                    		 xtype         : 'excheckbox',
	                   		 fieldLabel    : '<span style="font-weight: 700;">호적등본</span>',
	           	       		 labelWidth    : 70,
	                   		 labelAlign    : 'right',
	                   		 name          : 'HOJUK_SHEET_YN',
	                   		 reference     : 'cbx_hojuk_sheet_yn',
	                   		 inputValue    : 'T',
	                   		 uncheckedValue: 'F'
                    	},{
                    		 xtype         : 'excheckbox',
	                   		 fieldLabel    : '<span style="font-weight: 700;">주민등록등본</span>',
	           	       		 labelWidth    :100,
	                   		 labelAlign    : 'right',
	                   		 name          : 'JUMIN_SHEET_YN',
	                   		 reference     : 'cbx_jumin_sheet_yn',
	                   		 inputValue    : 'T',
	                   		 uncheckedValue: 'F'
                    	},{
                    		width : 5
                    	},{
                    		 xtype         : 'excheckbox',
	                   		 fieldLabel    : '<span style="font-weight: 700;">제적등본</span>',
	           	       		 labelWidth    : 70,
	                   		 labelAlign    : 'right',
	                   		 name          : 'JEJUK_SHEET_YN',
	                   		 reference     : 'cbx_jejuk_sheet_yn',
	                   		 inputValue    : 'T',
	                   		 uncheckedValue: 'F'
                    	}]
                    }]
        		},{
        			xtype:'exblockrow',
        			items:[{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">탑주</div>'
        			},{
        				xtype   : 'exblockfield',
                    	items:[{
                    		xtype      : 'extextfield',
	                        reference  : 'txt_topju_nm',
	                        exLabel    : '',
	                        name       : 'BUD_NM',
	                        width      : '95%', 
	                        exReadOnly : true
                    	}]
        			},{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">본</div>'
        			},{
        				xtype   : 'exblockfield',
                    	items:[{
                    		xtype      : 'extextfield',
	                        reference  : 'txt_hyo_bon',
	                        exLabel    : '',
	                        name       : '',
	                        width      : 30,
	                        enableKeyEvents : true,
	                        listeners       : {
	                      	   keyup : 'onSearchBonEnter'
	                         },
                    	},{
                    		width : 1
                    	},{
                    		xtype        : 'excombobox',
                            valueField   : 'CODE',
                            displayField : 'NAME',
                            reference    : 'lc_hyo_bon',
                            name         : 'HYO_BON',	 
                            emptyText    : '선택',                    
                            width        : 70,
                            bind         : {
                            	store:'{ds_hyo_bon}'
                            },
                    	}]    	
        			},{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">효관계</div>'
        			},{
        				xtype   : 'exblockfield',
                    	items:[{
                    		xtype        : 'excombobox',
                            valueField   : 'CODE',
                            displayField : 'NAME',
                            reference    : 'sel_hyo_rel',
                            name         : 'HYO_REL',	 
                            emptyText    : '선택',                    
                            width        : '95%',
                            bind         : {
                            	store:'{ds_hyo_rel}'
                            }, 
                    	}]
        			}]
        		},{
        			xtype  :'exblockrow',
        			height : 30, 
        			items:[{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">접수일</div>'
        			},{
        				xtype   : 'exblockfield',
                    	items:[{
	        				xtype     : 'exdatefield',
	                        reference : 'em_accept_dt',
	                        exLabel   : '',                            
	                        name      : 'ACCEPT_DT',
	                        format    : 'Y/m/d',
	                        width     : '95%',
                    	}]
        			},{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">불사일</div>'
        			},{
        				xtype   : 'exblockfield',
                    	items:[{
	        				xtype     : 'exdatefield',
	                        reference : 'em_bulsa_dt',
	                        exLabel   : '',                            
	                        name      : 'BULSA_DT',
	                        format    : 'Y/m/d',
	                        width     : '95%',
                    	}]
        			},{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">봉안일</div>'
        			},{
        				xtype   : 'exblockfield',
                    	items:[{
	        				xtype     : 'exdatefield',
	                        reference : 'em_bongan_dt',
	                        exLabel   : '',                            
	                        name      : 'BONGAN_DT',
	                        format    : 'Y/m/d',
	                        width     : '95%',
                    	}]
        			}]
        		}]
        	},{
        		flex : 2,
        		xtype   :'exfieldsetblockbox',
        		items   : [{
        			xtype:'exblockrow',
        			items:[{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">영탑관리자</div>'
        			},{
        				xtype   : 'exblockfield',
                    	items:[{
                    		xtype      : 'extextfield',
	                        reference  : 'txt_top_mng_nm',
	                        name       : 'TOP_MNG_NM',
	                        exLabel    : '',
	                        width      : '95%', 
                    	}]
        			}]
        		},{
        			xtype:'exblockrow',
        			items:[{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">영가구분</div>'
        			},{
        				xtype   : 'exblockfield',
                    	items:[{
                    		 xtype         : 'excheckbox',
	                   		 fieldLabel    : '<span style="font-weight: 700;">조상영가</span>',
	           	       		 labelWidth    : 60,
	                   		 labelAlign    : 'right',
	                   		 name          : 'ACENST_YN',
	                   		 reference     : 'cbx_acenst_yn',
	                   		 inputValue    : 'T',
	                   		 uncheckedValue: 'F'
                    	},{
                    		width : 5
                    	},{
                    		 xtype         : 'excheckbox',
	                   		 fieldLabel    : '<span style="font-weight: 700;">무명영가</span>',
	           	       		 labelWidth    : 60,
	                   		 labelAlign    : 'right',
	                   		 name          : 'NAMELESS_YN',
	                   		 reference     : 'cbx_nameless_yn',
	                   		 inputValue    : 'T',
	                   		 uncheckedValue: 'F'
                    	}]
        			}]
        		},{
        			xtype:'exblockrow',
        			items:[{
        				xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">재봉안일</div>'
        			},{
        				xtype   : 'exblockfield',
        				items:[{
        					xtype     : 'exdatefield',
                            reference : 'em_rebong_dt',
                            exLabel   : '',                            
                            name      : 'REBONG_DT',
                            format    : 'Y/m/d',
                            width     : '95%',
        				}]
        			}]
        		}]
        	},{
        		flex : 3,
        		xtype   :'exfieldsetblockbox',
        		items   : [{
        			xtype:'exblockrow',
                    items:[{
                    	xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">대장메모2</div>'
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype     : 'extextarea',
                    		height    : 89,
                            reference : 'ta_youngtop_memo',
                            exLabel   : '',                            
                            name      : 'REMARK',
                            width     : '95%',
                    	}]
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
