Ext.define('ExFrm.view.rec.rec002w_04',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_04',
    requires:[
    	'ExFrm.view.rec.rec002w_04Controller',
        'ExFrm.view.rec.rec002w_04Model'
    ],
    controller:'rec002w_04',
    viewModel:{
        type:'rec002w_04'
    },
    name:'rec002w_04',
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
        			xtype        :'radiogroup',
        			reference    : 'rd_acceptGbn',
        			name         : 'rd_acceptGbn',
        			labelStyle   : 'width:70px',
        			fieldLabel   : '<span style="font-weight: 700;">접수상태</span>',
        			width        : 170,
        			hidden       : true,
        			items        :[{
        				boxLabel   : '기도', 
	                	inputValue : "GD",    
	                	width      : 50,
	                	reference  : 'rd_acceptGbn1',
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
        			reference  : 'search_tab_gd',
        			layout     : 'hbox',
        			items      : [{
        				xtype        :'excombobox',
                        width        : 80,
                        valueField   : 'CODE',
                        displayField : 'NAME',     
                        reference    : 'cb_dateGD',
                        value        : 1,
                    	bind         : {
                        	store:'{ds_dateGD}'
                    	},
        			},{
            			width : 10
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
            			width : 10
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 60,
                        fieldLabel   : '<span style="font-weight: 700;">기도구분</span>',
                        width        : 160,
                        valueField   : 'CODE',
                        displayField : 'NAME',     
                        reference    : 'lc_prayGBN',
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_praygbn}'
                    	}
            		},{
            			width : 10
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 60,
                        fieldLabel   : '<span style="font-weight: 700;">기도종류</span>',
                        width        : 260,
                        valueField   : 'PRAY_CODE',
                        displayField : 'PRAY_NM',     
                        reference    : 'lc_GDKindInfo',
                        emptyText    : '선택',
                    	bind         : {
                        	store:'{ds_GDKindInfo}'
                    	}
        			}]
        		}]
        	
        	},{
        		height : 5,
        	},{
        		layout : 'vbox',
        		height : 480,
        		width  : '100%',
        		items  :[{
            		exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_04_a',
                    cls           : 'none-dirty-grid rec002w_04_a',
                    height        : 480,
                    width         : '100%',
                    features      : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    bind          : {
                        store:'{ds_GDRec}'
                    },
                    plugins     : [{
                    	ptype:'cellediting'
                    },{
                    	ptype: 'gridexporter'
                    }],
                    listeners      : {
                    	selectionchange : 'onSelectionChangeGD'
                    },
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
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_BUD_NO',                    
                        exAlign     : 'right',
                        width       : 110,
                        exType      : 'number',
                    	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
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
                        exAlign     : 'left',
                        width       : 80,
                    	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '종류',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRAY_GBN_NAME',                    
                        exAlign     : 'center',
                        width       : 70,
                    	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '기도/법회명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRAY_NM',                    
                        exAlign     : 'left',
                        width       : 175,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '입제일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'FDATE',                    
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
                    	text        : '회향일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'RDATE',                    
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
                    	text        : '기간',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PERIOD',                    
                        exAlign     : 'center',
                        width       : 60,
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
                    	text        : '동참금',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PAYMENT_PLAN_AMT',                    
                        exAlign     : 'right',
                        width       : 120,
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
                        width       : 120,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
                    },{
                    	text        : '미수금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MISU_AMT',                    
                        exAlign     : 'right',
                        width       : 120,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
                    },{
                    	text        : '접수메모',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MEMO',                    
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
        		height : 5
        	},{
        		layout : 'hbox',
        		width  : '100%',
        		items  : [{
        			flex : 1,
        			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-갸홋-radius:5px;display:inline-block;padding:0 15px;">납부내역</div>',
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
        		layout : 'vbox',
        		width  : '100%',
        		height : 230,
        		items  :[{
        			xtype      : 'exgrid',
                    width      : '99.9%',
                    height     : 230,
                    cls        : 'rec002w_04_c none-dirty-grid',
                    reference  : 'rec002w_04_c',
                    bind       : {
                        store:'{ds_MisuAmtGD}'
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
                    	text  :'순번1',
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
