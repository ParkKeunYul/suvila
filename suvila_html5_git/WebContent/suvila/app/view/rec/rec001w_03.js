Ext.define('ExFrm.view.rec.rec001w_03',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec001w_03',
    requires:[
    	'ExFrm.view.rec.rec001w_03Controller',
        'ExFrm.view.rec.rec001w_03Model'
    ],
    controller:'rec001w_03',
    viewModel:{
        type:'rec001w_03'
    },
    name:'rec001w_03',
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
        			listeners    : {
                    	change:'onRecSearch'
                    },
        			items        :[{
        				boxLabel   : '인등', 
	                	inputValue : "ID",    
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
              		iconCls   : 'fa fa-search'
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'excelBtn',
              		name      : 'excelBtn',
              		text      : '엑셀',
              		handler   : 'onExcel',
              		iconCls   : 'fa fa-file'
        		}]
        	},{
        		height : 5
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
            		},{
            			xtype            : 'extextfield',
                        reference        : 'txt_budNo',
            		},{
            			xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'newData',
               	 		name      : 'newData',
               	 		width     : 0        		     
            		}]
        		},{
        			width : 10
        		},{
        			reference  : 'search_tab_id',
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
            			width : 10
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 50,
                        fieldLabel   : '<span style="font-weight: 700;">전각명</span>',
                        width        : 200,
                        valueField   : 'JUNGAK_CD',
                        displayField : 'JUNGAK_NM',     
                        reference    : 'lc_IDJungakInfo',
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_IDJGKindInfo}'
                    	}
            		},{
            			width : 10
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 50,
                        fieldLabel   : '<span style="font-weight: 700;">인등명</span>',
                        width        : 170,
                        valueField   : 'LIGHT_CODE',
                        displayField : 'LIGHT_NM',     
                        reference    : 'lc_IDKindInfo',
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_IDKindInfo}'
                    	}
            		},{
            			width : 10
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 40,
                        fieldLabel   : '<span style="font-weight: 700;">마감</span>',
                        width        : 120,
                        valueField   : 'CODE',
                        displayField : 'NAME',     
                        reference    : 'lc_IDCloseYn',
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_IDCloseYn}'
                    	}
        			}]
        		}]
        	
        	},{
        		height : 5,
        	},{
        		layout : 'vbox',
        		height : 770,
        		width  : '100%',
        		items  :[{        	        			
            		exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec001w_03_a',
                    cls           : 'none-dirty-grid rec001w_03_a',
                    height        : 500,
                    width         : '100%',
                    bind          : {
                        store:'{ds_IDRec}'
                    },                 
                    plugins     : [{
                    	ptype: 'gridexporter'
                    }],
                    selModel      : {
                        mode: 'MULTI'
                    },
                    listeners      : {
                    	selectionchange : 'onSelectionChange',
                    	itemcontextmenu : 'onMouseRightClickID'
                    },
                    features   : [{
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
                        exAlign     : 'left',
                        width       : 110,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
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
                        width       : 105,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	//return exCommon.getFormat(value,'dateYMD' );
                        	return value;
                        }
                    },{
                    	text        : '인등종류',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NM',                    
                        exAlign     : 'center',
                        width       : 120,
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
                    	text        : '신도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 90,
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
                    	text        : '인등번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NO',                    
                        exAlign     : 'center',
                        width       : 90,
                    	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '마감여부',
                    	xtype       : 'excolumn',
                        dataIndex   : 'CLOSE_YN',                    
                        exAlign     : 'center',
                        width       : 100,
                    	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_IDCloseYn');
                        	return exCommon.getComboVal(value,store, '' );
                        }
                    },{
                    	text        : '인등위치',
                    	xtype       : 'excolumn',
                        dataIndex   : 'JUNGAK_NM',                    
                        exAlign     : 'left',
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
                    	text        : '년',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_YEAR',                    
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
                    	text        : '월',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_MONTH',                    
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
                    	text        : '기간',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_PERIOD',                    
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
                        width       : 110,
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
                    	text        : '납부금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PAYMENT_AMT',                    
                        exAlign     : 'right',
                        width       : 110,
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
                        width       : 110,
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
                    	text        : 'CMS',
                    	xtype       : 'excolumn',
                        dataIndex   : 'CMS_TRADE_CD',                    
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
        		},{
        			height     : 5,
        			reference  : 'id_space',
        		},{
        			reference  : 'dongcham_tab_id',
        			width  : '100%',
        			height : 30,
        			layout : 'hbox',        			
        			items  : [{
        				html : '<div style="height : 30px;width: 90px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;">동참자 정보</div>',
        				flex : 1        				
        			},{
        	    		xtype     : 'exbutton',
                		reference : 'upBtn',
                		name      : 'upBtn',
                		handler   : 'onDongchamUp',
                		iconCls   : 'fa fa-angle-up',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
                		reference : 'downBtn',
                		name      : 'downBtn',
                		handler   : 'onDongchamDown',	            		
                		iconCls   : 'fa fa-angle-down',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
                		reference : 'addBtn',
                		name      : 'addBtn',
                		handler   : 'onAdd',	            		
                		text      : '추가',
                		iconCls   : 'fa fa-plus'
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
                		reference : 'deleteBtn',
                		name      : 'deleteBtn',
                		handler   : 'onDelete',	            		
                		text      : '삭제',
                		iconCls   : 'fa fa-minus'
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
                		reference : 'saveBtn',
                		name      : 'saveBtn',
                		handler   : 'onSave',	            		
                		text      : '저장',
                		iconCls   : 'fa fa-save',
        			}]
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec001w_03_aa',
                    cls           : 'none-dirty-grid rec001w_03_aa',
                    height        : 200,
                    width         : '100%',
                    bind          : {
                        store:'{ds_DongChamJaID}'
                    },                                     
                    columns:[{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        flex        : 1,
                        align       : 'center',                    
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return (rowIndex+1);
                        }
                    /*
                    },{
                    	text        : '정렬순서',
                    	xtype       : 'excolumn',
                        dataIndex   : 'SORT_SEQ',                    
                        exAlign     : 'left',
                        flex        : 1,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    */
                    },{
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'DONGCHAM_BUD_NO',                    
                        exAlign     : 'left',
                        flex        : 1.8,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '성명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'left',
                        flex        : 1.6,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '법명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'SACRED_KOR',                    
                        exAlign     : 'left',
                        flex        : 1.6,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '복위자명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BOKWIJA_NM',                    
                        exAlign     : 'left',
                        flex        : 1.6,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '음력/양력',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LUNAR_SOLAR_NM',                    
                        exAlign     : 'center',
                        flex        : 1.4,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '성별',
                    	xtype       : 'excolumn',
                        dataIndex   : 'SEX_GBN_NM',                    
                        exAlign     : 'center',
                        flex        : 1.4,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '우편번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ZIP_CD',                    
                        exAlign     : 'center',
                        flex        : 1.6,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '주소',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ADDR',                    
                        exAlign     : 'left',
                        flex        : 5.4,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '전화번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'TELNO',                    
                        exAlign     : 'left',
                        flex        : 1.8,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return value;
                        }
                    },{
                    	text        : '휴대전화번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MOBILE_TELNO',                    
                        exAlign     : 'left',
                        width       : 1.8,
                        sortable    : true,
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
