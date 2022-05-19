Ext.define('ExFrm.view.rec.rec013w_03',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec013w_03',
    requires:[
    	'ExFrm.view.rec.rec013w_03Controller',
        'ExFrm.view.rec.rec013w_03Model'
    ],
    controller:'rec013w_03',
    viewModel:{
        type:'rec013w_03'
    },
    name:'rec013w_03',
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
                    width        : 200,
                    valueField   : 'CLASS_CD',
                    displayField : 'CLASS_NAME',     
                    reference    : 'lc_classMgt',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_classMgt}'
                	}
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 70,
                    fieldLabel   : '<span style="font-weight: 700;">납부명</span>',
                    width        : 250,
                    valueField   : 'MANAGE_CODE',
                    displayField : 'MANAGE_NM',     
                    reference    : 'lc_KindInfo',
                    emptyText    : '전체',
                    value        : '',
                	bind         : {
                    	store:'{ds_manageMgt}'
                	},                	
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		text      : '조회',
              		handler   : 'onSelect',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'excelBtn',
              		text      : '엑셀',
              		handler   : 'onExcel',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'saveBtn',
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
        		}]
        	
        	},{
        		height : 10,
        	},{        		
        		layout : 'vbox',
        		height : 735,
        		width  : '100%',
        		items  :[{
	        		exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'rec013w_03_a',
	                cls           : 'rec013w_03_a none-dirty-grid',
	                height        : 720,
	                width         : '100%',
	                bind          : {
	                    store:'{ds_detail}'
	                },
	                plugins     : [{
	                	ptype: 'gridexporter',
	                },{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                features      : [{
	                	ftype : 'summary',
	                	dock  : 'bottom'  // 하단 잠금
	                }],
	                columns:[{
	                	text        : '순번',
	                    xtype       : 'rownumberer',
	                    width       : 60,
	                    align       : 'center',
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return (rowIndex+1);
	                    },                    
	                },{
	                	text        : '신도번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'PROPOSAL_BUD_NO',                    
	                    exAlign     : 'center',
	                    width       : 120,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '납부자',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MANAGE_BUD_NAME',                    
	                    exAlign     : 'left',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '납부명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MANAGE_NM',                    
	                    exAlign     : 'left',
	                    width       : 150,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '시작월',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'FIRST_PAYMENT_YYYYMM',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return exCommon.getGridDateFormat(value, '/' , 6);
	                    }
	                },{
	                	text        : '종료월',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'FINAL_PAYMENT_YYYYMM',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return exCommon.getGridDateFormat(value, '/' , 6);
	                    }
	                },{
	                	text        : '월납부예정금액 ',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'PAYMENT_AMT',                    
	                    exAlign     : 'right',
	                    width       : 130,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
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
	                    dataIndex   : 'AMOUNT',                    
	                    exAlign     : 'right',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
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
	                	text        : 'CMS',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'CMS_TRADE_CD',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '회차',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MANAGE_PERIOD',                    
	                    exAlign     : 'right',
	                    width       : 70,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	
	                    	var AMOUNT      = exCommon.getRepNum(record.get("AMOUNT"));
	                    	var PAYMENT_AMT = exCommon.getRepNum(record.get("PAYMENT_AMT"));
	                    	return Math.ceil((AMOUNT / PAYMENT_AMT))+'회';
	                    	
	                    }
	                },{
	                	text        : '납부기간',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MANAGE_PERIOD',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	
	                    	if(value == 0){
	                    		return '무한';
	                    	}
	                    	
	                    	return value +'개월';
	                    }
	                },{
	                	text        : '납부종료',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MANAGE_END_YN',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	//return value;
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_gbn');
   		                	return exCommon.getComboVal(value,store, '' );
	                    },
	                    editor        : {
   	                    	xtype        : 'excombobox',
   	                        valueField   : 'CODE',
   	                        displayField : 'NAME',
   	                        bind:{
   	                            store:'{ds_yn_gbn}'
   	                        }
   	                    },
	                },{
	                	text        : '납부종료월',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MANAGE_END_DATE',                    
	                    exAlign     : 'center',
	                    width       : 110,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return exCommon.getGridDateFormat(value, '/' , 6);
	                    },
	                    editor: {
	                    	xtype         : 'exdatefield',
	                    	format        : 'Y/m'
	                    },
	                },{
	                	text        : '납부자 휴대번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MANAGE_MOBILE_TELNO',                    
	                    exAlign     : 'left',
	                    width       : 120,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : 'MEMO',
	                	xtype       : 'excolumn',
	                    dataIndex   : '접수메모',                    
	                    exAlign     : 'center',
	                    width       : 200,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
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
	                    exAlign     : 'center',
	                    width       : 200,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '접수번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ACCEPT_SEQ',                    
	                    exAlign     : 'center',
	                    width       : 160,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}else if(record.get("APPROVAL_GBN") == 3){
	                    		meta.tdCls = 'cmsline'
	                    	}else{
	                    		meta.tdCls = 'recCellNotEdit'
	                    	}
	                    	return value;
	                    }
	                }]
	        	}]
        		
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
