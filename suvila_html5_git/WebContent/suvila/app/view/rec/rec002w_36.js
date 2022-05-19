Ext.define('ExFrm.view.rec.rec002w_36',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_36',
    requires:[
    	'ExFrm.view.rec.rec002w_36Controller',
        'ExFrm.view.rec.rec002w_36Model',
    ],
    controller :'rec002w_36',
    viewModel:{
        type   :'rec002w_36'
    },
    name       : 'rec002w_36',
    isRootView : true,
    title      :'불사접수 출력',
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
        			reference    : 'rdo_ApprovalGbn_r02_36',
        			name         : 'rdo_ApprovalGbn_r02_36',
        			labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">접수상태</span>',
        			width        : 200,
        			style        : 'background-color: #E3E3E3 !important;padding : 0 10px;',
        			hidden       : true,
            		items     :[{
        				boxLabel   : '기도', 
                    	inputValue : 1,    
                    	width      : 55,
                    	reference  : 'rdo_ApprovalGbn2',
        			},{
        				boxLabel   : '불사', 
                    	inputValue : 2,    
                    	width      : 55,
                    	reference  : 'rdo_ApprovalGbn3',
                    	checked    : true
        			}]
        		},{
        			width : 5
        		},{
        			layout       : 'hbox',
        			reference    : 'rd_BSGbnTab',
        			items        : [{
        				xtype        : 'radiogroup',
            			reference    : 'rd_BSGbn',
            			name         : 'rd_BSGbn',        			      		
            			width        : 110,
                		items     :[{
            				boxLabel   : '축원', 
                        	inputValue : 0,    
                        	width      : 50,
                        	reference  : 'rd_BSGbn1',
                        	checked    : true
            			},{
            				boxLabel   : '천혼', 
                        	inputValue : 1,    
                        	width      : 50,
                        	reference  : 'rd_BSGb2',            			
            			}]
        			},{
            			//width : 260
        				width : 5
            		},{
            			xtype     : 'exbutton',
                  		text      : '조회',
                  		handler   : 'onSelectBS',
            		},{
            			width : 5
            		},{
            			xtype     : 'exbutton',
                  		text      : '인쇄',
                  		handler   : 'onPrintBS',
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
            		},{
            			xtype            : 'extextfield',
                        reference        : 'select_gido_type',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'select_bs_type',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'txt_budNoGD',
            		},{
            			xtype            : 'extextfield',
                        reference        : 'praygbn',
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
    				/*
        			layout         : 'hbox',        			
        			reference      : 'area_GD',
        			items  : [{
        				xtype        :'excombobox',
        				labelWidth   : 40,
                        fieldLabel   : '<span style="font-weight: 700;">기간</span>',
                        width        : 125,
                        valueField   : 'CODE',
                        displayField : 'NAME',     
                        reference    : 'cb_dateGD',
                        value        : 1,
                    	bind         : {
                        	store:'{ds_dateGD}'
                    	},    					
            		},{
            			width : 5
        			},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptSDateGD',
                        format         : 'Y-m-d',
            		},{
            			html :'<div style="text-align:center;width:20px;">~</div>',
            			width : 20
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptEDateGD',
                        format         : 'Y-m-d',
        			},{
            			width : 5,
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 50,
                        fieldLabel   : '<span style="font-weight: 700;">접수자</span>',
                        width        : 200,
                        valueField   : 'USER_ID',
                        displayField : 'USER_NM',     
                        reference    :'lc_templeUserGD',
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_templeUser}'
                    	}
        			}]
    			*/
        		},{
        			layout         : 'hbox',
        			reference      : 'area_BS',
        			items          : [{
            			width : 5
        			},{
            			html :'<div style="text-align:center;width:60px;line-height:25px;font-weight:700;">접수일 : </div>',
            			width : 60
        			},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptSDateBS',
                        format         : 'Y-m-d',
            		},{
            			html :'<div style="text-align:center;width:20px;">~</div>',
            			width : 20
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptEDateBS',
                        format         : 'Y-m-d',
            		},{
        				xtype        : 'excombobox',
        				reference    : 'lc_BSKindInfo',
                    	labelWidth   : 65,
                        fieldLabel   : '<span style="font-weight: 700;">불사명</span>',
                        value        : 0,
                        width        : 220,
                        valueField   : 'BULSA_CD',
                        displayField : 'BULSA_NM',                             
                    	bind         : {
                        	store:'{ds_BSKindInfo}'
                    	},
                    	emptyText    : '전체'
        			}]
        		}]
        	},{
        		layout : 'vbox',
        		width  : '100%',
        		height : 730,
        		items  : [{
        			height : 5,
            		width  : '100%',
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_06_b',
                    cls           : 'none-dirty-grid topCheckHeader',
                    height        : 720,
                    width         : '100%',
                    multiSelect: true,
                    bind          : {
                        store:'{ds_BSRec}'
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
                        width       : 190,
                        sortable    : true,
                    },{
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_BUD_NO',                    
                        exAlign     : 'center',
                        width       : 160,
                        sortable    : true,
                    },{
                    	text        : '신청자명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_NAME_KOR',                    
                        exAlign     : 'center',
                        width       : 140,
                        sortable    : true,
                    },{
                    	text        : '신도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'center',
                        width       : 140,
                        sortable    : true,
                    },{
                    	text        : '불사명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_BASE_NM',                    
                        exAlign     : 'left',
                        width       : 250,
                        sortable    : true,
                    },{
                    	text        : '접수내역',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_DETAIL_NM',                    
                        exAlign     : 'left',
                        width       : 250,
                        sortable    : true,                   
                    }],
                    viewConfig: {
                    	getRowClass: function(record, index) {
                    		if(record.get("APPROVAL_GBN") == 3){
                        		return 'cmsline';
                        	}else{
                        		return 'recCellNotEdit';
                        	}
                        }
                    }
        		}]
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
