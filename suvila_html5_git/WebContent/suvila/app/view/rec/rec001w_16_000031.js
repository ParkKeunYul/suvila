Ext.define('ExFrm.view.rec.rec001w_16_000031',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec001w_16_000031',
    requires:[
    	'ExFrm.view.rec.rec001w_16_000031Controller',
        'ExFrm.view.rec.rec001w_16_000031Model',
    ],
    controller :'rec001w_16_000031',
    viewModel:{
        type   :'rec001w_16_000031'
    },
    name       : 'rec001w_16_000031',
    isRootView : true,
    title      :'연등접수 출력',
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
        	width  : '99%',
        	layout : 'vbox',
        	items  : [{
        		height : 5
        	},{
        		layout : 'hbox',
        		width  : '100%',
        		items  :[{        			
        			xtype        : 'radiogroup',
        			reference    : 'rdo_ApprovalGbn',
        			name         : 'rdo_ApprovalGbn',
        			listeners    : {
        				change : 'onRadioClick'
        			},
        			labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">접수상태</span>',
        			width        : 270,
        			style        : 'background-color: #E3E3E3 !important;padding : 0 10px;',
            		items     :[{
        				boxLabel   : '연등(생축)', 
                    	inputValue : 1,    
                    	width      : 100,
                    	reference  : 'rdo_ApprovalGbn4',
                    	
        			},{
        				boxLabel   : '연등(영가)', 
                    	inputValue : 2,    
                    	width      : 100,
                    	reference  : 'rdo_ApprovalGbn5',
                    	checked    : true
        			}]
        		},{
        			width : 10
        		},{
        			layout       : 'hbox',
        			reference    : 'rdTab3',
        			items        : [{
        				xtype        : 'radiogroup',
            			reference    : 'rd_YDGbn',
            			name         : 'rd_YDGbn',
            			listeners    : {
            				//change : 'inGetYdPrintType'
            			},
                		items     :[{
            				boxLabel   : '등', 
                        	inputValue : 0,    
                        	width      : 50,
                        	reference  : 'rd_YDGbn1',
                        	checked    : true
            			},{
            				boxLabel   : '축원/천혼', 
                        	inputValue : 1,    
                        	width      : 100,
                        	reference  : 'rd_YDGbn2',
            			},{
            				boxLabel   : '작은', 
                        	inputValue : 2,    
                        	width      : 60,
                        	reference  : 'rd_YDGbn3',
                        	hidden     : true,
            			},{
            			//	hidden     : true,
            				boxLabel   : '일반', 
                        	inputValue : 3,    
                        	width      : 60,
                        	reference  : 'rd_YDGbn4',
            			}]
        			},{
        				
            		},{
            			xtype     : 'exbutton',
                  		text      : '조회',
                  		handler   : 'onSelectYD',
            		},{
            			width : 5
            		},{
            			xtype     : 'exbutton',
                  		text      : '인쇄',
                  		handler   : 'onPrintYD',
        			}]
        		},{
                	width            : 0,
            		height           : 0,
            		items            :[{
            			xtype            : 'extextfield',
                        reference        : 'hid_bud_no',
                        value            : '',
                        name             : 'V_BUD_NO'
            		},{
            			xtype            : 'extextfield',
                        reference        : 'txt_budNo',
                        inputType        : 'hidden',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'select_gido_type',
                        inputType        : 'hidden',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'select_yd_type',
                        inputType        : 'hidden',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'txt_budNoGD',
                        inputType        : 'hidden',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'praygbn',
                        inputType        : 'hidden',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'famgbn',
                        inputType        : 'hidden',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'deathgbn',
                        inputType        : 'hidden',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'rp_mode',
                        inputType        : 'hidden',
                        value            : 1,
            		},{
            			xtype            : 'extextfield',
                        reference        : 'drp_mode',
                        inputType        : 'hidden',
                        value            : 1,
            		},{
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
        		},{
        			width : 10
        		}]
        	},{
        		height : 10,
        	},{
        		layout : 'hbox',
        		width  : '100%',
        		items  : [{
        			xtype           : 'excombobox',                		
            		labelAlign      : 'left',
                    reference       : 'cb_Stipulation',
                    displayField    : 'name',
                    valueField      : 'code',
                    exCommonDmnCode : '001',    
                    width           : 100,
                    store           : {},
                    listeners       : {
                    	change:'onSearchTypeChange'
                    }
        		},{
        			width : 10
        		},{
        			xtype           : 'extextfield',
                    reference       : 'txt_stipulation',
                    enableKeyEvents : true,
                    width           : 150 ,
                    listeners       : {
                  	   keyup : 'onSearchEnter',
                  	   blur  : 'onSearchBlur'
                     },
                    value : '01-00001-0-01'
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    //text     : '검색',
                    handler  : 'onBudSearch',
    			},{
        			width : 5
        		},{
        			layout         : 'hbox',
        			reference      : 'area_3',
        			width          : 1510,
        			items  : [{
            			html :'<div style="text-align:center;width:60px;line-height:25px;font-weight:700;">접수일 : </div>',
            			width : 60
        			},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptSDateYD',
                        format         : 'Y-m-d',
            		},{
            			html :'<div style="text-align:center;width:20px;">~</div>',
            			width : 20
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptEDateYD',
                        format         : 'Y-m-d',
            		},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_YDJungakInfo',
                    	labelWidth   : 45,
                        fieldLabel   : '<span style="font-weight: 700;">전각</span>',
                        value        : 0,
                        width        : 170,
                        valueField   : 'JUNGAK_CD',
                        displayField : 'JUNGAK_NM',                             
                    	bind         : {
                        	store:'{ds_YDJGKindInfo}'
                    	},
                    	emptyText    : '전체'
            		},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_YDKindInfo',
                    	labelWidth   : 45,
                        fieldLabel   : '<span style="font-weight: 700;">연등</span>',
                        value        : 0,
                        width        : 170,
                        valueField   : 'LIGHT_CODE',
                        displayField : 'LIGHT_NM',                             
                    	bind         : {
                        	store:'{ds_YDKindInfo}'
                    	},
                    	emptyText    : '전체'
            		},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_templeUserYD',
                    	labelWidth   : 60,
                        fieldLabel   : '<span style="font-weight: 700;">접수자</span>',
                        value        : 0,
                        width        : 185,
                        valueField   : 'USER_ID',
                        displayField : 'USER_NM',                             
                    	bind         : {
                        	store:'{ds_templeUser}'
                    	},
                    	emptyText    : '전체'
            		},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_YDCloseYn',
                    	labelWidth   : 45,
                        fieldLabel   : '<span style="font-weight: 700;">소등</span>',
                        value        : 0,
                        width        : 170,
                        valueField   : 'CODE',
                        displayField : 'NAME',                             
                    	bind         : {
                        	store:'{ds_YDCloseYn}'
                    	},
                    	emptyText    : '전체'
            		},{
            			width : 5
            		},{
            			hidden       : true,
            			xtype        : 'excombobox',
        				reference    : 'lc_PrintSort',
                    	labelWidth   : 65,
                        fieldLabel   : '<span style="font-weight: 700;">출력순서</span>',
                        value        : 1,
                        width        : 170,
                        valueField   : 'CODE',
                        displayField : 'NAME',                             
                    	bind         : {
                        	store:'{ds_PrintSort}'
                    	},
                    	emptyText    : '전체'
        			}]
        		}]
        	},{
        		layout : 'vbox',
        		width  : '100%',
        		height : 730,
        		items  : [{
        			height : 10,
            		width  : '100%',
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec001w_16_c',
                    cls           : 'none-dirty-grid topCheckHeader',
                    height        : 720,
                    width         : '100%',
                    bind          : {
                        store:'{ds_YDRec_grd}'
                    },
                    multiSelect: true,
                    listeners:{
                    	itemcontextmenu : 'onMouseRightClick_A'
                    },
                    columns:[{
                    	text           : '선택',
	                	xtype          : 'excheckcolumn',
	                    dataIndex      : 'CHECK_P',                    
	                    exAlign        : 'center',
	                    headerCheckbox : true,
	                    width          : 90,
                    },{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',                    
                    },{
                    	text        : '접수번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACCEPT_SEQ',                    
                        exAlign     : 'center',
                        width       : 160,
                        sortable    : true,
                    },{
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_BUD_NO',                    
                        exAlign     : 'center',
                        width       : 110,
                    },{
                    	text        : '신청자명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRO_NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 110,
                    },{
                    	text        : '신도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 110,
                    },{
                    	text        : '연등위치',
                    	xtype       : 'excolumn',
                        dataIndex   : 'JUNGAK_NM',                    
                        exAlign     : 'left',
                        width       : 125,
                    },{
                    	text        : '연등종류',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NM',                    
                        exAlign     : 'left',
                        width       : 110,
                    
                    },{
                    	text        : '연등번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NO',                    
                        exAlign     : 'center',
                        width       : 90,
                        sortable    : true,
                    },{
                    	text        : '동참년도',
                    	xtype       : 'excolumn',
                        dataIndex   : 'YEONDEUNG_YEAR',                    
                        exAlign     : 'center',
                        width       : 90,
                        sortable    : true,
                    },{
                    	text        : '접수메모',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MEMO',                    
                        exAlign     : 'left',
                        width       : 250,
                        sortable    : true,
                    }]
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec001w_16_d',
                    cls           : 'none-dirty-grid topCheckHeader',
                    height        : 720,
                    width         : '100%',
                    bind          : {
                        store:'{ds_YDRec_CH}'
                    },
                    multiSelect: true,
                    listeners:{
                    	itemcontextmenu : 'onMouseRightClick_B'
                    },
                    columns:[{
                    	text           : '선택',
	                	xtype          : 'excheckcolumn',
	                    dataIndex      : 'CHECK_P',                    
	                    exAlign        : 'center',
	                    headerCheckbox : true,
	                    width          : 90,
                    },{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',                    
                    },{
                    	text        : '접수번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACCEPT_SEQ',                    
                        exAlign     : 'center',
                        width       : 160,
                        sortable    : true,
                    },{
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_BUD_NO',                    
                        exAlign     : 'center',
                        width       : 110,
                    },{
                    	text        : '신청자명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRO_NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 110,
                    },{
                    	text        : '신도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 110,
                    },{
                    	text        : '연등위치',
                    	xtype       : 'excolumn',
                        dataIndex   : 'JUNGAK_NM',                    
                        exAlign     : 'left',
                        width       : 125,
                    },{
                    	text        : '연등종류',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NM',                    
                        exAlign     : 'left',
                        width       : 110,
                    
                    },{
                    	text        : '연등번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NO',                    
                        exAlign     : 'center',
                        width       : 90,
                        sortable    : true,
                    },{
                    	text        : '동참년도',
                    	xtype       : 'excolumn',
                        dataIndex   : 'YEONDEUNG_YEAR',                    
                        exAlign     : 'center',
                        width       : 90,
                        sortable    : true,
                    }]
        		}]
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
