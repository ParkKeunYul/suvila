Ext.define('ExFrm.view.rec.rec002w_34',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_34',
    requires:[
    	'ExFrm.view.rec.rec002w_34Controller',
        'ExFrm.view.rec.rec002w_34Model'
    ],
    controller:'rec002w_34',
    viewModel:{
        type:'rec002w_34'
    },
    name:'rec002w_34',
    isRootView:true,
    //title:'상시접수조회',
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
        		width  : '100%',
        		//style  : 'background:#e3e3e3;',
        		items  : [{
        			hidden       : true,
        			xtype        :'radiogroup',
        			reference    : 'rd_acceptGbn',
        			name         : 'rd_acceptGbn',
        			labelStyle   : 'width:70px',
        			fieldLabel   : '<span style="font-weight: 700;">접수상태</span>',
        			width        : 170,
        			listeners    : {
                    	change:'onRecSearch'
                    },
        			items        :[{
        				boxLabel   : '불사', 
        				inputValue : "BS",    
	                	width      : 50,
	                	reference  : 'rd_acceptGbn2',
	                	checked    : true
        			}]
        		},{
        			width : 10
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">납부구분</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'lc_payState',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_payState}'
                    },
        		},{
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">접수구분</span>',
                    width        : 180,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'lc_approv',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_approv}'
                	}
        		},{
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 50,
                    fieldLabel   : '<span style="font-weight: 700;">접수자</span>',
                    width        : 250,
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',     
                    reference    :'lc_templeUser',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_templeUser}'
                	}
        		},{
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">신도분류</span>',
                    width        : 300,
                    valueField   : 'CLASS_CD',
                    displayField : 'CLASS_NAME',     
                    reference    : 'lc_classMgt',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_classMgt}'
                	}
        		},{
        			width : 10,
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		name      : 'selectBtn',
              		text      : '조회',
              		handler   : 'onSelect',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'excelBtn',
              		name      : 'excelBtn',
              		text      : '엑셀',
              		handler   : 'onExcel',
        		}]
        	},{
        		height : 10
        	},{
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
                   // value           : '',
                    enableKeyEvents : true,
                    width           : 130 ,
                    listeners       : {
                 	   keyup : 'onSearchEnter',
                 	   blur  : 'onSearchBlur'
                    },
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    text     : '검색',
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
               	 		reference : 'ds_MisuAmt',
               	 		name      : 'ds_MisuAmt',
               	 		width     : 0
        		     },{
                    	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'ds_sms',
               	 		name      : 'ds_sms',
               	 		width     : 0
            		}]
        		},{
        			width : 10
        		},{        			
        			reference  : 'search_tab_bs',
        			layout     : 'hbox',
        			items      :[{
        				xtype        :'excombobox',
                        width        : 80,
                        valueField   : 'CODE',
                        displayField : 'NAME',     
                        reference    : 'cb_dateBS',
                        value        : 1,
                    	bind         : {
                        	store:'{ds_dateBS}'
                    	},
        			},{
            			width : 10
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
            			width : 10
            		},{
            			xtype        : 'excombobox',
            			reference    : 'lc_BSKindInfo',
                    	labelWidth   : 50,
                        fieldLabel   : '<span style="font-weight: 700;">불사명</span>',
                        width        : 260,
                        valueField   : 'BULSA_CD',
                        displayField : 'BULSA_NM',                             
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_BSKindInfo}'
                    	}
        			}]
        		}]
        	
        	},{
        		height : 10,
        	},{
        		layout : 'vbox',
        		height : 470,
        		width  : '100%',
        		items  :[{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_34_b',
                    cls           : 'none-dirty-grid rec002w_34_a',
                    height        : 470,
                    width         : '100%',
                    bind          : {
                        store:'{ds_BSRec}'
                    },
                    plugins     : [{
                    	ptype: 'gridexporter'
                    }],
                    listeners      : {
                    	selectionchange : 'onSelectionChangeBS'
                    },
                    features      : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    columns:[{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',                    
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	
                        	return (rowIndex+1);
                        }
                    },{
                    	text        : '접수번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACCEPT_SEQ',                    
                        exAlign     : 'center',
                        width       : 160,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '접수일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACCEPT_DATE',                    
                        exAlign     : 'center',
                        width       : 105,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.getFormat(value,'dateYMD' );
                        }
                    },{
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_BUD_NO',                    
                        exAlign     : 'center',
                        width       : 120,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '신청자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_NAME_KOR',                    
                        exAlign     : 'center',
                        width       : 100,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '접수종류',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_NM',                    
                        exAlign     : 'center',
                        width       : 130,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '신도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 90,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '접수내역',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_DETAIL',                    
                        exAlign     : 'left',
                        width       : 160,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '시작일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACPT_FDATE',                    
                        exAlign     : 'center',
                        width       : 105,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.getFormat(value,'dateYMD' );
                        }
                    },{
                    	text        : '종료일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACPT_EDATE',                    
                        exAlign     : 'center',
                        width       : 105,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.getFormat(value,'dateYMD' );
                        }
                    },{
                    	text        : '동참금',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PAYMENT_PLAN_AMT',                    
                        exAlign     : 'right',
                        width       : 90,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
                    },{
                    	text        : '납부금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PAYMENT_AMT',                    
                        exAlign     : 'right',
                        width       : 90,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
                    },{
                    	text        : '미수금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MISU_AMT',                    
                        exAlign     : 'right',
                        width       : 90,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
                    },{
                    	text        : '상세메모',
                    	xtype       : 'excolumn',
                        dataIndex   : 'REMARK',                    
                        exAlign     : 'left',
                        width       : 300,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    }]
        		}] 
        	},{
        		height : 10
        	},{
        		layout : 'hbox',
        		width  : '100%',
        		items  : [{
        			flex : 1,
        			html : '납부내역',        			
        		},{
        			xtype     : 'exbutton',
              		text      : '현금수납',
              		handler   : 'onAdd',
              		width     : 70,
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		text      : '취소',
              		handler   : 'onCancel',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		text      : '엑셀',
              		handler   : 'onExcelSub',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		text      : '저장',
              		handler   : 'onSaveMisu',
        		},{
        			width : 3
        		}]  
        	},{
        		height : 5
        	},{
        		layout : 'vbox',
        		width  : '100%',
        		height : 230,
        		items  :[{
        			xtype      : 'exgrid',
                    width      : '99.9%',
                    height     : 230,
                    cls        : 'rec002w_34_d none-dirty-grid',
                    reference  : 'rec002w_34_d',
                    bind       : {
                        store:'{ds_MisuAmtBS}'
                    },
                    plugins     : [{
                    	ptype:'cellediting',
                    	clicksToEdit: 1
                    },{
                    	ptype: 'gridexporter'
                    }],
                    listeners      : {
                    	beforeedit   : 'onBeforeeditMisu',	    
                    },
                    columns:[{
                    	text  :'순번2',
                        xtype :'rownumberer',
                        align : 'center',
                        width : 60,
                    },{
                    	text         :'접수자',
                    	xtype        :'excolumn',
                        dataIndex    :'CRT_USER',
                        width        : 150,
                    },{
                    	text         :'수납일',
                    	xtype        :'excolumn',
                        dataIndex    :'SUB_DATE',
                        width        : 150,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getFormat(value,'dateYMD' );
                        },
                    },{
                    	text         :'납부금액',
                    	xtype        :'excolumn',
                        dataIndex    :'AMOUNT',
                        width        : 150,
                        exType       : 'number',
                        exAlign      : 'right',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        editor       : {
                        	xtype         : 'extextfield',
                        },
                    },{
                    	text         :'비고',
                    	xtype        :'excolumn',
                        dataIndex    :'REMARK',
                        exAlign      : 'left',
                        flex         : 1,
                        editor       : {
                        	xtype         : 'extextfield',
                        },
                    }]
        		}]
        		
        		
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
