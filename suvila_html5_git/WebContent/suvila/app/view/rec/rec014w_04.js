Ext.define('ExFrm.view.rec.rec014w_04',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec014w_04',
    requires:[
    	'ExFrm.view.rec.rec014w_04Controller',
        'ExFrm.view.rec.rec014w_04Model'
    ],
    controller:'rec014w_04',
    viewModel:{
        type:'rec014w_04'
    },
    name:'rec014w_04',
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
                    width           : 90,
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
                    width           : 100 ,
                    listeners       : {
                    	keyup : 'onSearchEnter',
                   	    blur  : 'onSearchBlur'
                    },
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    //text     : '검색',
                    handler  : 'onBudSearch',
                    reference: 'budSearchBtn',
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                    width        : 90,
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
        			width : 5
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
        			xtype        :'excombobox',
                	labelWidth   : 50,
                    fieldLabel   : '<span style="font-weight: 700;">접수자</span>',
                    width        : 150,
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',     
                    reference    :'lc_templeUser',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_templeUser}'
                	}
        		},{
        			width : 5,
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
        			xtype           : 'extextfield',
                    reference       : 'txt_young_memo',
                    labelWidth      : 60,
                    fieldLabel      : '<span style="font-weight: 700;">대장메모</span>',                    
                    width           : 200 ,
        		},{
        			width : 5
        		},{
        			xtype           : 'extextfield',
                    reference       : 'txt_cntr_nmbr_search',
                    labelWidth      : 60,
                    fieldLabel      : '<span style="font-weight: 700;">계약번호</span>', 
                    width           : 150 ,
        		},{
        			width : 5
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
        			xtype        :'excombobox',
                	labelWidth   : 35,
                    fieldLabel   : '<span style="font-weight: 700;">위치</span>',
                    width        : 160,
                    valueField   : 'JUNGAK_CD',
                    displayField : 'JUNGAK_NM',     
                    reference    :'lc_jungak',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_jungak}'
                    },
        		},{
        			width : 5
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
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">약정서</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_agree_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">가족증명</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_family_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">호적등본</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_hojuk_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">주민등본</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_jumin_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">제적등본</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_jejuk_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">반출여부:</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_export_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">취소여부</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_cancel_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
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
        		}]
        	
        	},{
        		height : 10,
        	},{        		
        		layout : 'vbox',
        		height : 500,
        		width  : '100%',
        		items  :[{
	        		exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'rec014w_04_a',
	                cls           : 'rec014w_04_a',
	                height        : 500,
	                width         : '100%',
	                bind          : {
	                    store:'{ds_detail}'
	                },
	                plugins     : [{
	                	ptype: 'gridexporter'
	                }],	                
	                features      : [{
	                	ftype : 'summary',
	                	dock  : 'bottom'  // 하단 잠금
	                }],
	                listeners      : {
                    	selectionchange : 'onSelectionChange'
                    },
	                columns:[{
	                	text        : '순번',
	                    xtype       : 'rownumberer',
	                    width       : 60,
	                    align       : 'center',
	                   // locked      : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return (rowIndex+1);
	                    },      
	                },{
	                	text        : '계약번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'CNTR_NMBR',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                   // locked      : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '접수번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ACCEPT_SEQ',                    
	                    exAlign     : 'center',
	                    width       : 160,
	                    sortable    : true,
	                   // locked      : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '신도번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'BUD_NO',                    
	                    exAlign     : 'center',
	                    width       : 120,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '탐주명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'BUD_NM',                    
	                    exAlign     : 'left',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '전각명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'JUNGAK_NM',                    
	                    exAlign     : 'left',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '탑번',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'LIGHT_NO',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '동참금',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'PAYMENT_PLAN_AMT',                    
	                    exAlign     : 'right',
	                    width       : 110,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
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
	                    width       : 110,
	                    sortable    : true,
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
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
	                    width       : 110,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
	                    },
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text        : '봉탑건수',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'BONGTOP_COUNT',                    
	                    exAlign     : 'center',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '접수일',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ACCEPT_DT',                    
	                    exAlign     : 'center',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value, '-' , 8);
	                    }
	                },{
	                	text        : '불사일',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'BULSA_DT',                    
	                    exAlign     : 'center',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value, '-' , 8);
	                    }
	                },{
	                	text        : '봉안일',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'BONGAN_DT',                    
	                    exAlign     : 'center',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value, '-' , 8);
	                    }
	                },{
	                	text        : '재봉안일',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'REBONG_DT',                    
	                    exAlign     : 'center',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value, '-' , 8);
	                    }
	                },{
	                	text        : '약정서',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'AGREE_SHEET_YN',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_submit');
   		                	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text        : '가족증명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'FAMILY_SHEET_YN',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_submit');
   		                	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text        : '호적등본',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'HOJUK_SHEET_YN',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_submit');
   		                	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text        : '주민등본',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'JUMIN_SHEET_YN',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_submit');
   		                	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text        : '제적등본',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'JEJUK_SHEET_YN',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_submit');
   		                	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text        : '조상영가',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ACENST_YN',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var rtn = "예";
	                    	if(value != 'T'){
	                    		 rtn = "";
	                    	}
	                    	return rtn;
	                    }
	                },{
	                	text        : '무명영가',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'NAMELESS_YN',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var rtn = "예";
	                    	if(value != 'T'){
	                    		 rtn = "";
	                    	}
	                    	return rtn;
	                    }
	                },{
	                	text        : '본',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'HYO_BON_NAME',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '효관계',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'HYO_REL',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '탑관리자',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'TOP_MNG_NM',                    
	                    exAlign     : 'left',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '전화번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'TEL_NO',                    
	                    exAlign     : 'left',
	                    width       : 110,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '휴대전화',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MOBILE_TELNO',                    
	                    exAlign     : 'left',
	                    width       : 120,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '주소1',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ADDR1',                    
	                    exAlign     : 'left',
	                    width       : 220,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '주소2',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ADDR2',                    
	                    exAlign     : 'left',
	                    width       : 220,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '우편번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ZIP_CD',                    
	                    exAlign     : 'center',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '종료',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'CLOSE_YN',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var rtn = "아니오";
	                    	if(value == 'T'){
	                    		 rtn = "예";
	                    	}
	                    	return rtn;
	                    }
	                },{
	                	text        : '접수메모',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'REC_MEMO',                    
	                    exAlign     : 'left',
	                    width       : 300,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '대장메모',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'YOUNGTOP_MEMO',                    
	                    exAlign     : 'left',
	                    width       : 300,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                }]
	        	}]
        	},{
        		height : 1
        	},{
        		width  : '100%',
				layout : {
           			 type : 'hbox'
           		},
           		items :[{
           			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">납부내역</span>'
           		},{
           			flex : 1
           		},{
        			xtype     : 'exbutton',
              		reference : 'excelMisuBtn',
              		name      : 'excelMisuBtn',
              		text      : '엑셀',
              		handler   : 'onExcelMisu'
           		}]
        	},{
        		xtype  :'exgrid',
				reference    : 'rec014w_04_b',
                height : 185,
                cls    : 'rec014w_04_b',
                width  : '100%',
                bind   :{
                    store:'{ds_MisuAmt}'
                },
                plugins     : [{
                	ptype: 'gridexporter'
                }],
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
