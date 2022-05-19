Ext.define('ExFrm.view.rec.rec024w_06',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec024w_06',
    requires:[
    	'ExFrm.view.rec.rec024w_06Controller',
        'ExFrm.view.rec.rec024w_06Model',
    ],
    controller :'rec024w_06',
    viewModel:{
        type   :'rec024w_06'
    },
    name       : 'rec024w_06',
    isRootView : true,
    title      :'상시접수 통계',
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
        		layout : 'hbox',
        		items  :[{
        			xtype       : 'excheckbox',
                	reference   : 'cb_setBudNo',
                	listeners   : {
                		change : 'setBudNo'
                    }
        		},{
        			width : 5
        		},{
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
                    width           : 130 ,
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
                    handler  : 'onBudSearch',
                    reference: 'budSearchBtn',
        		},{
                	width            : 0,
            		height           : 0,
            		items            :[{
            			xtype            : 'extextfield',
                        reference        : 'hid_bud_no',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_BUD_NO'
            		},{
            			xtype            : 'extextfield',
                        reference        : 'txt_budNo',
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
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">기도종류</span>',
                    width        : 300,
                    valueField   : 'PRAY_CODE',
                    displayField : 'PRAY_NM',     
                    reference    : 'lc_aprayMgt',
                    emptyText    : '선택',
                	bind         : {
                    	store:'{ds_aprayMgt}'
                	}
        		},{
        			width : 10
        		},{
        			xtype        :'excombobox',
                    width        : 80,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    : 'cb_date',
                    value        : 1,
                	bind         : {
                    	store:'{ds_date}'
                	},
                	listeners    : {
                    	change : 'onDateField'
                    }
        		},{
        			width : 10
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptSDate',
                    name           : 'ACCEPT_S_DATE',                                                   
                    format         : 'Y-m-d',
        		},{
        			html :'<div style="text-align:center;width:20px;">~</div>',
        			width : 20
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptEDate',
                    name           : 'ACCEPT_E_DATE',                                                   
                    format         : 'Y-m-d',
        		},{
        			width : 5,
        		},{
        			xtype     : 'exbutton',
              		text      : '조회',
              		handler   : 'onSelect',
        		},{
        			width : 5,
        		},{
        			xtype     : 'exbutton',
              		text      : '인쇄',
              		handler   : 'onPrint',
        		}]
        	},{
        		height : 10
        	},{
        		exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec024w_06_a',
                cls           : 'topCheckHeader none-dirty-grid',
                height        : 720,
                width         : '100%',
                /*selModel      : {
                    mode: 'MULTI'
                },*/
                bind          : {
                    store:'{ds_main}'
                },
                plugins     : [{
                	ptype: 'gridexporter'
                }],
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
                    align       : 'center',
                    width       : 70,
                },{
                	text        : '접수번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCEPT_SEQ',                    
                    exAlign     : 'center',                    
                    sortable    : true,
                    width       : 190,
                },{
                	text        : '신도번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'PROPOSAL_BUD_NO',                    
                    exAlign     : 'center',                    
                    sortable    : true,
                    width       : 160,
                },{
                	text        : '신청자명',
                	xtype       : 'excolumn',
                    dataIndex   : 'NAME_KOR',                    
                    exAlign     : 'left',                    
                    sortable    : true,
                    width       : 140,
                },{
                	text        : '기도종류',
                	xtype       : 'excolumn',
                    dataIndex   : 'PRAY_NM',                    
                    exAlign     : 'left',                    
                    sortable    : true,
                    width       : 240,
                },{
                	text        : '시작월',
                	xtype       : 'excolumn',
                    dataIndex   : 'START_YYYYMM',                    
                    exAlign     : 'center',                    
                    sortable    : true,
                    width       : 130,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.getFormat(value,'dateYMD' );
                    }
                    
                }]
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
