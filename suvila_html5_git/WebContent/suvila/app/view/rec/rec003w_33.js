Ext.define('ExFrm.view.rec.rec003w_33',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec003w_33',
    requires:[
    	'ExFrm.view.rec.rec003w_33Controller',
        'ExFrm.view.rec.rec003w_33Model'
    ],
    controller:'rec003w_33',
    viewModel:{
        type:'rec003w_33'
    },
    name:'rec003w_33',
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
        		},{
        			width : 5
        		},{
           			xtype     : 'exbutton',
              		reference : 'saveList',
              		name      : 'saveList',
              		text      : '저장',
              		handler   : 'onSave',
        		}]
        	
        	},{
        		height : 10,
        	},{
        		exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec003w_33_a',
                cls           : 'rec003w_33_a',
                height        : 520,
                width         : '100%',
                bind          : {
                    store:'{ds_giJae}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                },{
                	ptype: 'gridexporter'
                }],
                listeners      : {
                      selectionchange : 'onSelectionChange'
                     ,edit         : 'onEdit'
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
                    	
                    	if(record.get("APPROVAL_GBN") == 3){
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
                    width       : 160,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
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
                    dataIndex   : 'PROPOSAL_BUD_NM',                    
                    exAlign     : 'left',
                    width       : 100,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '음력/양력',
                	xtype       : 'excolumn',
                    dataIndex   : 'LUNAR_SOLAR_NM',                    
                    exAlign     : 'center',
                    width       : 90,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '제사일',
                	xtype       : 'excolumn',
                    dataIndex   : 'EVENT_DATE',                    
                    exAlign     : 'center',
                    width       : 90,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = "recCellEdit";
                    	return exCommon.getGridDateFormat(value, '/' , 8);
                    },
                    editor: {
                    	xtype         : 'exdatefield',
                    	format        : 'Y/m/d'
                    },
                },{
                	text        : '제사시간',
                	xtype       : 'excolumn',
                    dataIndex   : 'EVENT_TIME',                    
                    exAlign     : 'center',
                    width       : 90,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = "recCellEdit";
                    	
                    	if(isNaN(value)){
                    		return "";
                    	}
                    	
                    	var EVENT_TIME = value;
                    	
                    	if(EVENT_TIME.length == 1){
                			EVENT_TIME ="0"+ EVENT_TIME + ":00"; 
                		}else if(EVENT_TIME.length == 2){
                			EVENT_TIME = EVENT_TIME + ":00";
                		}else if(EVENT_TIME.length == 3){
                			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2) +"0";
                		}else if(EVENT_TIME.length == 4){
                			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2);
                		}else if(EVENT_TIME.length > 4){
                			console.log(EVENT_TIME.substr(2,4));
                			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2,2);
                		}
                    	return EVENT_TIME;
                    	
                    },
                    editor        : {
	                   xtype        : 'extextfield',
	                }
                /*},{
                	text        : '참여인원',
                	xtype       : 'excolumn',
                    dataIndex   : 'NUMBER_COUNT',                    
                    exAlign     : 'right',
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
                	text        : '담당스님',
                	xtype       : 'excolumn',
                    dataIndex   : 'DAMDANG_MONK_NM',                    
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
                	text        : '전화번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'TELNO',                    
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
                	text        : '휴대번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'MOBILE_TELNO',                    
                    exAlign     : 'center',
                    width       : 120,
                    exType      : 'number',
                	renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("APPROVAL_GBN") == 3){
                    		meta.tdCls = 'cmsline'
                    	}else{
                    		meta.tdCls = 'recCellNotEdit'
                    	}
                    	return value;
                    }*/
                },{
                	text        : '동참금',
                	xtype       : 'excolumn',
                    dataIndex   : 'PAYMENT_PLAN_AMT',                    
                    exAlign     : 'right',
                    width       : 120,
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
                    width       : 120,
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
                    width       : 120,
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
                	text        : '상세메모',
                	xtype       : 'excolumn',
                    dataIndex   : 'REMARK',                    
                    exAlign     : 'left',
                    width       : 300,
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
        		width  : '100%',
        		layout : 'hbox',
        		items  : [{
        			flex   : 6,
        			layout : 'vbox',
        			items  : [{        		
        				width  : '100%',
        				layout : {
	               			 type : 'hbox'
	               			//,pack : 'end'
	               		},
	               		items :[{
	               			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">영가</span>'
	               		},{
	               			flex : 1
	               		},{
	               			xtype     : 'exbutton',
		              		reference : 'saveYounBtn',
		              		name      : 'saveYounBtn',
		              		text      : '저장',
		              		handler   : 'onSaveYoungga',
	               		}]
        			/*},{
        				height : 5*/
        			},{
        				exGroupRef    : true,
                        xtype         : 'exgrid',
                        reference     : 'rec003w_33_c',
                        cls           : 'none-dirty-grid',
                        height        : 180,
                        width         : '100%',
                        bind          : {
                            store:'{ds_giJaeSpirit}'
                        },
                        plugins    : [{
        	                	ptype:'cellediting',
        	                	clicksToEdit: 1
        	           }],
        	           columns:[{
        	        	   text        : '순번',
                       	   xtype       : 'excolumn',
                           dataIndex   : 'SORT_SEQ',                    
                           exAlign     : 'center',
                           flex        : 2,
                           renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                           		meta.tdCls = 'cmsline'
                           		return value;
                           }
        	           },{
        	        	   text        : '본',
                       	   xtype       : 'excolumn',
                           dataIndex   : 'BON_NM',                    
                           exAlign     : 'center',
                           flex        : 2,
                           renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                           		meta.tdCls = 'cmsline'
                           		return value;
                           }
        	           },{
        	        	   text        : '망관계',
                       	   xtype       : 'excolumn',
                           dataIndex   : 'DECE_REL',                    
                           exAlign     : 'center',
                           flex        : 2,
                           renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	   meta.tdCls = 'recCellEdit'
                           	   return value;
                           },
                           editor    : {
                           		xtype         : 'extextfield',
                           },
        	           },{
        	        	   text        : '영가자명',
                       	   xtype       : 'excolumn',
                           dataIndex   : 'DECE_BUD_NM',                    
                           exAlign     : 'center',
                           width       : 140,
                           renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                           		meta.tdCls = 'cmsline'
                           		return value;
                           }
        	           },{
        	        	   text        : '음력/양력',
                       	   xtype       : 'excolumn',
                           dataIndex   : 'LUNAR_SOLAR_NM',                    
                           exAlign     : 'center',
                           flex        : 2.4,
                           renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                           		meta.tdCls = 'cmsline'
                           		return value;
                           }
        	           },{
        	        	   text        : '기일',
                       	   xtype       : 'excolumn',
                           dataIndex   : 'DEATH_DAY',                    
                           exAlign     : 'center',
                           flex        : 2.4,
                           renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                           		meta.tdCls = 'cmsline'
                           		return exCommon.getGridDateFormat(value, '-' , 8);                           		
                           }
        	           },{
        	        	   text        : '시간',
                       	   xtype       : 'excolumn',
                           dataIndex   : 'DEATH_TIME',                    
                           exAlign     : 'center',
                           flex        : 2.4,
                           renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                           		meta.tdCls = 'cmsline'
                       			if( exCommon.getLength(value) == 4 ){
        	                   		return value.substr(0,2) + ":" + value.substr(2); 
        	                   	}
        	                   	return value;
                           }
        	           }]
        			}]
        		},{
        			width : 5
        		},{
        			flex   : 4,
        			layout : 'vbox',
        			items  : [{
        				width  : '100%',
        				layout : {
	               			 type : 'hbox'
	               			//,pack : 'end'
	               		},
	               		items :[{
	               			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">복위자</span>'
	               		},{
	               			flex : 1
	               		},{
            	    		xtype     : 'exbutton',
                    		reference : 'oBokUp',
                    		name      : 'oBokUp',
                    		handler   : 'oBokUp',
                    		iconCls   : 'fa fa-angle-up',
            		    },{
            			    width : 5
            		    },{
            			    xtype     : 'exbutton',
                    		reference : 'oBokDown',
                    		name      : 'oBokDown',
                    		handler   : 'oBokDown',	            		
                    		iconCls   : 'fa fa-angle-down',
	               		},{
	               			width : 5
	               		},{
	               			xtype     : 'exbutton',
		              		reference : 'addBokBtn',
		              		name      : 'addBokBtn',
		              		text      : '신규 ',
		              		handler   : 'onAddBok',
		              		iconCls   : 'fa fa-plus'
	               		},{
	               			width : 5
	               		},{
	               			xtype     : 'exbutton',
		              		reference : 'delBokBtn',
		              		name      : 'delBokBtn',
		              		text      : '삭제',
		              		handler   : 'onDelBok',
		              		iconCls   : 'fa fa-times'
	               		},{
	               			width : 5
	               		},{
	               			xtype     : 'exbutton',
		              		reference : 'saveBokBtn',
		              		name      : 'saveBokBtn',
		              		text      : '저장',
		              		handler   : 'onSaveBok',
		              		iconCls   : 'fa fa-save',
	               		},{
	               			width : 5
	               		},{
	               			xtype     : 'exbutton',
		              		reference : 'printBokBtn',
		              		name      : 'printBokBtn',
		              		text      : '인쇄',
		              		handler   : 'onPrintBok',
		              		iconCls   : 'fa fa-print',
	               		}]
        			},{
        				exGroupRef    : true,
                        xtype         : 'exgrid',
                        reference     : 'rec003w_33_d',
                        cls           : 'none-dirty-grid',
                        height        : 180,
                        width         : '100%',
                        bind          : {
                            store:'{ds_giJaeBokwi}'
                        },
                        plugins    : [{
        	                	ptype:'cellediting',
        	                	clicksToEdit: 1
        	            }],
        	            columns:[{
        	        	   text        : '대표',
                       	   xtype       : 'excheckcolumn',
                           dataIndex   : 'MAIN_BOKWI',                    
                           exAlign     : 'center',
                           flex        : 1,   
                           listeners   : {
   		                	   checkchange : 'bokwiCheckChange'
   		                   },
        	            },{
        	            	text        : '행관계',
                        	xtype       : 'excolumn',
                            dataIndex   : 'HYO_REL',                    
                            exAlign     : 'center',
                            flex        : 1.2,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                         	   	   meta.tdCls = 'recCellEdit'
                            	   return value;
                            },
                            editor    : {
                            		xtype         : 'extextfield',
                            },
        	            },{
        	            	text        : '복위자명',
                        	xtype       : 'excolumn',
                            dataIndex   : 'BOKWEJA_NM',                    
                            exAlign     : 'center',
                            flex        : 1.5,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                         	     meta.tdCls = 'recCellEdit'
                            	 return value;
                            },
                            editor    : {
                            		xtype         : 'extextfield',
                            },
        	            },{
        	            	text        : '복위/기부',
                        	xtype       : 'excolumn',
                            dataIndex   : 'BOKWI_KIBU_GBN',                    
                            exAlign     : 'center',
                            flex        : 1.7,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                         	   	meta.tdCls = 'recCellEdit'
                         	   	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_bokwigibu');
       		                	return exCommon.getComboVal(value,store, '' );
                            },
                            editor        : {
       	                    	xtype        : 'excombobox',
       	                        valueField   : 'CODE',
       	                        displayField : 'NAME',
       	                        bind:{
       	                            store:'{ds_bokwigibu}'
       	                        }
       	                    },
        	            }]
        			}]
        		}]
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
