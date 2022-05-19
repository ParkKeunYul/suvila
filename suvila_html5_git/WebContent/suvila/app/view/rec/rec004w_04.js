Ext.define('ExFrm.view.rec.rec004w_04',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec004w_04',
    requires:[
    	'ExFrm.view.rec.rec004w_04Controller',
        'ExFrm.view.rec.rec004w_04Model'
    ],
    controller:'rec004w_04',
    viewModel:{
        type:'rec004w_04'
    },
    name:'rec004w_04',
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
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">행사명</span>',
                    width        : 250,
                    valueField   : 'EVENT_CD',
                    displayField : 'EVENT_NAME',     
                    reference    : 'lc_KindInfo',
                    emptyText    : '전체',
                    value        : '',
                	bind         : {
                    	store:'{ds_chonhonKind}'
                	}
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
                 	   keyup : 'onSearchEnter'
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
        		}]
        	
        	},{
        		height : 10,
        	},{        		
        		reference : 'WEPAE_SELECT',
        		layout : 'vbox',
        		height : 735,
        		width  : '100%',
        		items  :[{
	        		exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'rec004w_04_a',
	                cls           : 'rec004w_04_a',
	                height        : 520,
	                width         : '100%',
	                bind          : {
	                    store:'{ds_detail}'
	                },
	                plugins     : [{
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
	                    width       : 60,
	                    align       : 'center',
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
	                    	return (rowIndex+1);
	                    },                    
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
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '행사명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_NAME',                    
	                    exAlign     : 'left',
	                    width       : 200,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '입제일',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_DATE',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
	                    	return exCommon.getGridDateFormat(value, '-' , 8);
	                    }
	                },{
	                	text        : '행사시간',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_TIME',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
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
	                    }
	                },{
	                	text        : '위패',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'WEPAECNT',                    
	                    exAlign     : 'right',
	                    width       : 70,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '소등여부',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'CLOSE_YN',                    
	                    exAlign     : 'center',
	                    width       : 90,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_closeYn');
	                    	return exCommon.getComboVal(value,store);
	                    }
	                },{
	                	text        : '동참금',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'PAYMENT_PLAN_AMT',                    
	                    exAlign     : 'right',
	                    width       : 110,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
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
	                    width       : 110,
	                    sortable    : true,
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
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
	                    width       : 110,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
	                    },
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text        : '비고',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MEMO',                    
	                    exAlign     : 'center',
	                    width       : 140,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
	                    	return value;
	                    }
	                }]
	        	},{
	        		height : 5        	       
	        	},{
	    			width  : '100%',
	    			layout : 'vbox',
	    			items  : [{        		
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
	    			/*},{
	    				height : 5*/
	    			},{
	    				xtype  :'exgrid',
	    				reference    : 'rec004w_04_b',
		                height : 185,
		                cls    : 'rec004w_04_b',
		                width  : '100%',
		                bind   :{
		                    store:'{ds_MisuAmtWipae}'
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
	        	}]
        		
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
