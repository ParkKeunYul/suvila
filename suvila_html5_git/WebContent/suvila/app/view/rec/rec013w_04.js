Ext.define('ExFrm.view.rec.rec013w_04',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec013w_04',
    requires:[
    	'ExFrm.view.rec.rec013w_04Controller',
        'ExFrm.view.rec.rec013w_04Model'
    ],
    controller:'rec013w_04',
    viewModel:{
        type:'rec013w_04'
    },
    name:'rec013w_04',
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
        		height : 755,
        		width  : '100%',
        		items  :[{
	        		exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'rec013w_04_a',
	                cls           : 'rec013w_04_a none-dirty-grid',
	                height        : 350,
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
	                	text        : '접수번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ACCEPT_SEQ',                    
	                    exAlign     : 'center',
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
	                	text        : '신청자',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'PROPOSAL_BUD_NM',                    
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
	                	text        : '영탑정보',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'YOUNG_TOP',                    
	                    exAlign     : 'center',
	                    width       : 95,
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
	                	text        : '미수금액',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MISU_TOTAL',                    
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
	                	text        : '비고',
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
	                }]
        		},{
        			height : 5
        		},{
        			layout :'hbox',
    				width  : '100%',
    				height : 30,
        			items  : [{
        				html : '<div style="height : 30px;width: 90px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;">수납현황</div>',	        				
        				flex : 1,	        				
        			},{
        				html       : '<img src="./resources/img/rec/rec000p_02.png" height="31px" width="432px" >',
        			}]
        		},{
        			exGroupRef : true,
                    xtype      : 'exgrid',
                    reference  : '',
                    cls        : '',
                    height     : 150,
                    width      : '100%',
                    align      : 'center',                    
                    bind:{
                        store:'{ds_payMonth}'
                    },
                    selModel: {
                        type                    : 'spreadsheet',
                        columnSelect            : true,
                        pruneRemoved            : false,
                        rowNumbererHeaderWidth  : 0
                    },
                    listeners:{
                    //	celldblclick:'onCellDbClickSunap3',
                    },
                    columns:[{                   
                    	xtype       : 'excolumn',
                        text        : '년도',
                        dataIndex   : 'YEAR',
                        exAlign     : 'center',
                        flex        : 1.5,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.style = 'background-color:#ffffff;';
                        	return value;
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '1월',
                        dataIndex   : 'M_STATUS_01',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_01"))+" </div>";
                        },
                        listeners:{
                        	focus : 'onFocus'
                        },
                    },{
                    	xtype       : 'excolumn',
                        text        : '2월',
                        dataIndex   : 'M_STATUS_02',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_02"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '3월',
                        dataIndex   : 'M_STATUS_03',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_03"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '4월',
                        dataIndex   : 'M_STATUS_04',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_04"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '5월',
                        dataIndex   : 'M_STATUS_05',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_05"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '6월',
                        dataIndex   : 'M_STATUS_06',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_06"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '7월',
                        dataIndex   : 'M_STATUS_07',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_07"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '8월',
                        dataIndex   : 'M_STATUS_08',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_08"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '9월',
                        dataIndex   : 'M_STATUS_09',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_09"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '10월',
                        dataIndex   : 'M_STATUS_10',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_10"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '11월',
                        dataIndex   : 'M_STATUS_11',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_11"))+" </div>";
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '12월',
                        dataIndex   : 'M_STATUS_12',
                        exAlign     : 'center',
                        flex        : 1,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
                        	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
                        	
                        	meta.style = 'background-color:'+color+' !important;';
                        	
                        	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_12"))+" </div>";
                        }
                    }]
        		},{
        			height : 5
        		},{
        			html : '<div style="height : 30px;width: 90px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;">납부내역</div>',
        		},{
        			xtype      : 'exgrid',
                    reference  : 'tr_sunab3_b',
                    cls        : 'tr_sunab3_b',
                    height     : 185,
                    width      : '100%',
                    align      : 'center',                    
                    bind:{
                        store:'{ds_MisuAmt}'
                    },
	                features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    columns:[{                   
                    	text  :'No',
                        xtype :'rownumberer',
                        width : 60,
                        align : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	meta.tdCls = 'recCellNotEdit'
                        	return (rowIndex+1);
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '접수자',
                        dataIndex   : 'CRT_USER',
                        exAlign     : 'center',
                        flex        : 1.6,
                        editor      : {
	                        xtype    : 'extextfield',
                        },
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	xtype       : 'excolumn',
                        text        : '수납일',
                        dataIndex   : 'SUB_DATE',
                        exAlign     : 'center',
                        flex        : 1.6, 
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getFormat(value,'dateYMD' );
                        },
                    },{
                    	xtype       : 'excolumn',
                        text        : '납부월',
                        dataIndex   : 'PAYMENT_YYYYMM',
                        exAlign     : 'center',
                        flex        : 1.6, 
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getFormat(value,'dateYMD' );
                        },
                    },{
                    	xtype       : 'excolumn',
                        text        : '납부금액',
                        dataIndex   : 'AMOUNT',
                        exAlign     : 'right',
                        exType      : 'number',
                        flex        : 1.8,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value), 0);
                        },
                        summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
                    },{
                    	xtype       : 'excolumn',
                        text        : '결제방법',
                        dataIndex   : 'APPROVAL_GBN',
                        exAlign     : 'center',
                        flex        : 1.8,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_approv');
                        	return exCommon.getComboVal(value,store, '' );
                        },
                    },{
                    	xtype       : 'excolumn',
                        text        : '비고',
                        dataIndex   : 'REMARK',
                        exAlign     : 'left',
                        flex        : 3,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
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
