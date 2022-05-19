Ext.define('ExFrm.view.rec.rec003w_24',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec003w_24',
    requires:[
    	'ExFrm.view.rec.rec003w_24Controller',
        'ExFrm.view.rec.rec003w_24Model'
    ],
    controller:'rec003w_24',
    viewModel:{
        type:'rec003w_24'
    },
    name:'rec003w_24',
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
        		/*},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'saveBtn',
              		name      : 'saveBtn',
              		text      : '저장',
              		handler   : 'onSave',*/
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
                    value : '01-00001-0-01'
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
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'SEQ',
    	       	 		name      : 'SEQ',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'ACCEPT_SEQ',
    	       	 		name      : 'ACCEPT_SEQ',
    	       	 		width     : 0
            		}]
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
                	/*listeners    : {
                    	change : 'onDateField'
                    }*/
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
        			width : 10
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">담당스님</span>',
                    width        : 300,
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',     
                    reference    : 'lc_damdangMonkNameSagu',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_monk}'
                	}
        		}]
        	
        	},{
        		height : 10,
        	},{
        		exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec003w_24_a',
                cls           : 'rec003w_24_a',
                height        : 450,
                width         : '100%',
                bind          : {
                    store:'{ds_RecSagu}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                },{
                	ptype: 'gridexporter'
                }],
                listeners      : {
                      selectionchange : 'onSelectionChange'
                },
                features      : [{
                	ftype : 'summary',
                	dock  : 'bottom'  // 하단 잠금
                }],
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    flex        : 1,
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
                    flex        : 2.8,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '신도번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'PROPOSAL_BUD_NO',                    
                    exAlign     : 'center',
                    flex        : 2,
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
                    dataIndex   : 'PROPOSAL_BUD_NM',                    
                    exAlign     : 'left',
                    flex        : 1.4,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '담당스님',
                	xtype       : 'excolumn',
                    dataIndex   : 'DAMDANG_MONK_NM',                    
                    exAlign     : 'left',
                    flex        : 2,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '전화번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'TELNO',                    
                    exAlign     : 'center',
                    flex        : 1.7,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '휴대번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'MOBILE_TELNO',                    
                    exAlign     : 'center',
                    flex        : 1.7,
                    exType      : 'number',
                	renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '동참금',
                	xtype       : 'excolumn',
                    dataIndex   : 'PAYMENT_PLAN_AMT',                    
                    exAlign     : 'right',
                    flex        : 1.6,
                    exType      : 'number',
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return exCommon.setNumberFormat(value,0 );
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
                    flex        : 1.6,
                    exType      : 'number',
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return exCommon.setNumberFormat(value,0 );
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
                    flex        : 1.6,
                    exType      : 'number',
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return exCommon.setNumberFormat(value,0 );
                    },
                    summaryType  : 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
                    },
                },{
                	text        : '접수메모',
                	xtype       : 'excolumn',
                    dataIndex   : 'MEMO',                    
                    exAlign     : 'left',
                    flex        : 3,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '상시메모',
                	xtype       : 'excolumn',
                    dataIndex   : 'REMARK',                    
                    exAlign     : 'left',
                    flex        : 3,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    },
                    editor        : {
                    	xtype        : 'extextfield',
                    },
                }]
        	},{
        		height : 5
        	},{
        		layout : {
        			 type : 'hbox'        		
        		},
        		width  : '100%',
        		items  : [{
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">납부내역</span>'
        		},{
        			flex : 1
        		},{
        			xtype     : 'exbutton',
              		reference : 'misuExcelBtn',
              		name      : 'misuExcelBtn',
              		text      : '엑셀',
              		handler   : 'onMisuExcel',
        		}]
        	},{
        		xtype      : 'exgrid',
                width      : '99.9%',
                height     : 230,
                cls        : 'rec003w_04_d none-dirty-grid',
                reference  : 'rec003w_04_d',
                bind       : {
                    store:'{ds_MisuAmtSagu}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                },{
                	ptype: 'gridexporter'
                }],
                /*listeners      : {
                	beforeedit   : 'onBeforeeditMisu',	    
                },*/
                columns:[{
                	text  :'순번',
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
        },{
        	width : '0.5%'
        }]
        
    }]
});
