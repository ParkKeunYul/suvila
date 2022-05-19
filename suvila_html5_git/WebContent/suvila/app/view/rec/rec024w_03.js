Ext.define('ExFrm.view.rec.rec024w_03',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec024w_03',
    requires:[
    	'ExFrm.view.rec.rec024w_03Controller',
        'ExFrm.view.rec.rec024w_03Model'
    ],
    controller:'rec024w_03',
    viewModel:{
        type:'rec024w_03'
    },
    name:'rec024w_03',
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
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'saveBtn',
              		name      : 'saveBtn',
              		text      : '저장',
              		handler   : 'onSave',
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
                        inputType        : 'hidden',
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
        			width : 10
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">기도종류</span>',
                    width        : 300,
                    valueField   : 'PRAY_CODE',
                    displayField : 'PRAY_NM',     
                    reference    : 'lc_aprayMgt',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_aprayMgt}'
                	}
        		}]
        	
        	},{
        		height : 10,
        	},{
        		exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec024w_03_a',
                cls           : 'rec024w_03_a',
                height        : 720,
                width         : '100%',
                bind          : {
                    store:'{ds_detail}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                },{
                	ptype: 'gridexporter'
                }],
                selModel      : {
                    mode: 'MULTI'
                },
                listeners      : {
                	itemcontextmenu : 'onMouseRightClick'
                },
                features      : [{
                	ftype : 'summary',
                	dock  : 'bottom'  // 하단 잠금
                }],
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 60,
                    align       : 'center',
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	
                    	console.log( record.get("APPROVAL_GBN") );
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
                    width       : 170,
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
                    width       : 120,
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
                    width       : 80,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '기도명',
                	xtype       : 'excolumn',
                    dataIndex   : 'PRAY_NM',                    
                    exAlign     : 'left',
                    width       : 150,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '시작월',
                	xtype       : 'excolumn',
                    dataIndex   : 'START_YYYYMM',                    
                    exAlign     : 'center',
                    width       : 90,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return exCommon.getFormat(value,'dateYMD' );
                    }
                },{
                	text        : '월납입예정금액',
                	xtype       : 'excolumn',
                    dataIndex   : 'BASE_AMOUNT',                    
                    exAlign     : 'right',
                    width       : 130,
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
                    dataIndex   : 'AMOUNT',                    
                    exAlign     : 'right',
                    width       : 100,
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
                	text        : 'CMS',
                	xtype       : 'excolumn',
                    dataIndex   : 'CMS_TRADE_CD',                    
                    exAlign     : 'left',
                    width       : 100,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '회차',
                	xtype       : 'excolumn',
                    dataIndex   : '',                    
                    exAlign     : 'left',
                    width       : 80,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '종료',
                	xtype       : 'excolumn',
                    dataIndex   : 'END_YN',                    
                    exAlign     : 'center',
                    width       : 90,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	
                    	meta.tdCls = 'recCellEdit'
                    	
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn');
                    	return exCommon.getComboVal(value,store, '' );
                    },
                    editor        : {
                    	xtype        : 'excombobox',
                        valueField   : 'CODE',
                        displayField : 'NAME',
                        bind:{
                            store:'{ds_yn}'
                        }
                    },
                },{
                	text        : '접수메모',
                	xtype       : 'excolumn',
                    dataIndex   : 'MEMO',                    
                    exAlign     : 'left',
                    width       : 300,
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
                    flex        : 1,
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
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
