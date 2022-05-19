Ext.define('ExFrm.view.rec.rec002w_03',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_03',
    requires:[
    	'ExFrm.view.rec.rec002w_03Controller',
        'ExFrm.view.rec.rec002w_03Model'
    ],
    controller:'rec002w_03',
    viewModel:{
        type:'rec002w_03'
    },
    name:'rec002w_03',
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
        			items        :[{
        				boxLabel   : '기도', 
	                	inputValue : "GD",    
	                	width      : 50,
	                	reference  : 'rd_acceptGbn1',
	                	checked    : true
        			}],
        			hidden : true 
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
              		text      : '조회',
              		handler   : 'onSelect',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
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
            		},{
            			width : 10
            		},{
            			xtype     : 'exbutton',
                  		reference : 'saveBtn',
                  		name      : 'saveBtn',
                  		text      : '저장',
                  		handler   : 'onSaveGD',
        			}]
        		}]
        	
        	},{
        		height : 5,
        	},{
        		layout : 'vbox',
        		height : 720,
        		width  : '100%',
        		items  :[{        	        			
            		exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_03_a',
                    cls           : 'none-dirty-grid rec002w_03_a',
                    height        : 710,
                    width         : '100%',
                    bind          : {
                        store:'{ds_GDRec}'
                    },
                    selModel      : {
                        mode: 'MULTI'
                    },
                    plugins     : [{
                    	ptype:'cellediting',
                    	clicksToEdit: 1
                    },{
                    	ptype: 'gridexporter'
                    }],
                    listeners      : {
                    	beforeedit      : 'onBeforeeditGD',	    
                    	itemcontextmenu : 'onMouseRightClickGD'
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
                    	text        : '대주명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'DAEJU_NM',                    
                        exAlign     : 'left',
                        width       : 110,
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
                    	text        : '양음력',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LUNAR_SOLAR',                    
                        exAlign     : 'center',
                        width       : 70,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	
                        	var rtn = "음력";
                        	if(value == 'F') rtn = "양력";
                        	
                        	return rtn;
                        }
                    },{
                    	text        : '생년월일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BIRTHDAY',                    
                        exAlign     : 'center',
                        width       : 105,
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
                    	text        : '관계',
                    	xtype       : 'excolumn',
                        dataIndex   : 'REPRESEN_REL',                    
                        exAlign     : 'center',
                        width       : 100,
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
                        exAlign     : 'left',
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
                    	text        : '축원신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PER_BUD_NO',                    
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
                    	text        : '축원신도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PER_BUD_NM',                    
                        exAlign     : 'left',
                        width       : 100,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3  ){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '발원내용',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ORGINATE',                    
                        exAlign     : 'left',
                        width       : 200,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3 && exCommon.getRepVal(record.get("PER_BUD_NO") ,"") == ""){
                        		meta.tdCls = 'cmsline';
                        	}if(exCommon.getRepVal(record.get("PER_BUD_NO") ,"") != ""){
                        		meta.tdCls = 'recCellEdit';
                        	}else{
                        		meta.tdCls = 'recCellNotEdit';
                        	}
                        	return value;
                        },
                        editor       : {
                        	xtype         : 'extextfield',
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
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
