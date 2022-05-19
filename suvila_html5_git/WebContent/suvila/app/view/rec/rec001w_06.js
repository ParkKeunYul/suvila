Ext.define('ExFrm.view.rec.rec001w_06',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec001w_06',
    requires:[
    	'ExFrm.view.rec.rec001w_06Controller',
        'ExFrm.view.rec.rec001w_06Model',
    ],
    controller :'rec001w_06',
    viewModel:{
        type   :'rec001w_06'
    },
    name       : 'rec001w_06',
    isRootView : true,
    title      :'기도접수 출력',
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
        		//	width        : 200,
        			style        : 'background-color: #E3E3E3 !important;padding : 0 10px;',
            		items     :[{
        				boxLabel   : '인등', 
                    	inputValue : 1,    
                    	width      : 55,
                    	reference  : 'rdo_ApprovalGbn2',
                    	checked    : true
        			},{
        				boxLabel   : '인등(축원/천혼)', 
                    	inputValue : 2,    
                    	width      : 115,
                    	reference  : 'rdo_ApprovalGbn3',
        			}]
        		},{
        			width : 10
        		},{
        			layout       : 'hbox',
        			reference    : 'rdTab1',
        			items        : [{
	        			xtype        : 'radiogroup',
	        			reference    : 'rd_IDGbn',
	        			name         : 'rd_IDGbn',
	            		items     :[{
	        				boxLabel   : '인등(개인)', 
	                    	inputValue : 0,    
	                    	width      : 90,
	                    	reference  : 'rd_IDGbn1',
	                    	checked    : true
	        			},{
	        				boxLabel   : '인등(가족)', 
	                    	inputValue : 1,    
	                    	width      : 90,
	                    	reference  : 'rd_IDGbn2',
	        			}]
        			},{
            			width : 10
            		},{
            			xtype     : 'exbutton',
                  		text      : '조회',
                  		handler   : 'onSelectID',
            		},{
            			width : 5
            		},{
            			xtype     : 'exbutton',
                  		text      : '인쇄',
                  		handler   : 'onPrintID',
        			}]
        		},{
        			layout       : 'hbox',
        			hidden       : true,
        			reference    : 'rdTab2',
        			items        : [{
        				xtype        : 'radiogroup',
            			reference    : 'rd_ID_CHGbn',
            			name         : 'rd_ID_CHGbn',
                		items     :[{
            				boxLabel   : '축원(개인)', 
                        	inputValue : 0,    
                        	width      : 90,
                        	reference  : 'rd_ID_CHGbn1',
                        	checked    : true
            			},{
            				boxLabel   : '축원(가족)', 
                        	inputValue : 1,    
                        	width      : 90,
                        	reference  : 'rd_ID_CHGbn2',
            			},{
            				boxLabel   : '천혼(개인)', 
                        	inputValue : 2,    
                        	width      : 90,
                        	reference  : 'rd_ID_CHGbn3',
            			},{
            				boxLabel   : '천혼(가족)', 
                        	inputValue : 3,    
                        	width      : 90,
                        	reference  : 'rd_ID_CHGbn4',
            			}]
            		},{
            			xtype     : 'exbutton',
                  		text      : '조회',
                  		handler   : 'onSelectID_CH',
            		},{
            			width : 5
            		},{
            			xtype     : 'exbutton',
                  		text      : '인쇄',
                  		handler   : 'onPrintID_CH',
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
        			reference      : 'area_1',
        			items  : [{
            			html :'<div style="text-align:center;width:60px;line-height:25px;font-weight:700;">접수일 : </div>',
            			width : 60
        			},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptSDateID',
                        format         : 'Y-m-d',
            		},{
            			html :'<div style="text-align:center;width:20px;">~</div>',
            			width : 20
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptEDateID',
                        format         : 'Y-m-d',
            		},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_IDJungakInfo',
                    	labelWidth   : 45,
                        fieldLabel   : '<span style="font-weight: 700;">전각</span>',
                        value        : 0,
                        width        : 170,
                        valueField   : 'JUNGAK_CD',
                        displayField : 'JUNGAK_NM',                             
                    	bind         : {
                        	store:'{ds_IDJGKindInfo}'
                    	},
                    	emptyText    : '전체'
            		},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_IDKindInfo',
                    	labelWidth   : 45,
                        fieldLabel   : '<span style="font-weight: 700;">인등</span>',
                        value        : 0,
                        width        : 170,
                        valueField   : 'LIGHT_CODE',
                        displayField : 'LIGHT_NM',                             
                    	bind         : {
                        	store:'{ds_IDKindInfo}'
                    	},
                    	emptyText    : '전체'
            		},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_templeUserID',
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
        				reference    : 'lc_IDCloseYn',
                    	labelWidth   : 45,
                        fieldLabel   : '<span style="font-weight: 700;">마감</span>',
                        //value        : 'F',
                        width        : 170,
                        valueField   : 'CODE',
                        displayField : 'NAME',                             
                    	bind         : {
                        	store:'{ds_IDCloseYn}'
                    	},
                    	emptyText    : '전체'
        			}]
        		},{
        			hidden         : true,
        			layout         : 'hbox',
        			reference      : 'area_2',
        			items          : [{
        				xtype        : 'excombobox',
        				reference    : 'lc_ID_CHJungakInfo',
                    	labelWidth   : 45,
                        fieldLabel   : '<span style="font-weight: 700;">전각</span>',
                        value        : 0,
                        width        : 170,
                        valueField   : 'JUNGAK_CD',
                        displayField : 'JUNGAK_NM',                             
                    	bind         : {
                        	store:'{ds_IDJGKindInfo}'
                    	},
                    	emptyText    : '전체'
        			},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_ID_CHKindInfo',
                    	labelWidth   : 45,
                        fieldLabel   : '<span style="font-weight: 700;">인등</span>',
                        value        : 0,
                        width        : 170,
                        valueField   : 'LIGHT_CODE',
                        displayField : 'LIGHT_NM',                             
                    	bind         : {
                        	store:'{ds_IDKindInfo}'
                    	},
                    	emptyText    : '전체'
            		},{
            			width : 5
            		},{
            			xtype        : 'excombobox',
        				reference    : 'lc_templeUserID_CH',
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
                    reference     : 'rec001w_06_a',
                    cls           : 'none-dirty-grid topCheckHeader',
                    height        : 720,
                    width         : '100%',
                    multiSelect: true, 	   
                    bind          : {
                        store:'{ds_IDRec_sel}'
                    },
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
                    	text        : '인등위치',
                    	xtype       : 'excolumn',
                        dataIndex   : 'JUNGAK_NM',                    
                        exAlign     : 'left',
                        width       : 125,
                    },{
                    	text        : '인등종류',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NM',                    
                        exAlign     : 'left',
                        width       : 110,
                    },{
                    	text        : '마감여부',
                    	xtype       : 'excolumn',
                        dataIndex   : 'CLOSE_YN',                    
                        exAlign     : 'center',
                        width       : 90,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_IDCloseYn');
                        	return exCommon.getComboVal(value,store, '' );
                        }
                    },{
                    	text        : '인등번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NO',                    
                        exAlign     : 'center',
                        width       : 90,
                        sortable    : true,
                    },{
                    	text        : '년',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_YEAR',                    
                        exAlign     : 'center',
                        width       : 70,
                        sortable    : true,
                    },{
                    	text        : '월',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_MONTH',                    
                        exAlign     : 'right',
                        width       : 70,
                        sortable    : true,
                    },{
                    	text        : '기간',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_PERIOD',                    
                        exAlign     : 'right',
                        width       : 70,
                        sortable    : true,
                    },{
                    	text        : '메모',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MEMO',                    
                        exAlign     : 'left',
                        width       : 250,
                        sortable    : true,
                    }]
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec001w_06_b',
                    cls           : 'none-dirty-grid topCheckHeader',
                    height        : 720,
                    width         : '100%',
                    multiSelect: true, 	   
                    bind          : {
                        store:'{ds_ID_CHRec_grd}'
                    },
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
                    	text        : '인등위치',
                    	xtype       : 'excolumn',
                        dataIndex   : 'JUNGAK_NM',                    
                        exAlign     : 'left',
                        width       : 125,
                    },{
                    	text        : '인등종류',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NM',                    
                        exAlign     : 'left',
                        width       : 110,
                    },{
                    	text        : '인등번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NO',                    
                        exAlign     : 'center',
                        width       : 90,
                        sortable    : true,
                    },{
                    	text        : '년',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_YEAR',                    
                        exAlign     : 'center',
                        width       : 70,
                        sortable    : true,
                    },{
                    	text        : '월',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_MONTH',                    
                        exAlign     : 'right',
                        width       : 70,
                        sortable    : true,
                    },{
                    	text        : '기간',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_PERIOD',                    
                        exAlign     : 'right',
                        width       : 70,
                        sortable    : true,
                    },{
                    	text        : '접수메모',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MEMO',                    
                        exAlign     : 'left',
                        width       : 250,
                        sortable    : true,
                    }]
        		}]
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
