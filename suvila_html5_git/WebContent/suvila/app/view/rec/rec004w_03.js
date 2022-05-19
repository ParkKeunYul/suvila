

Ext.define('ExFrm.view.rec.rec004w_03',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec004w_03',
    requires:[
    	'ExFrm.view.rec.rec004w_03Controller',
        'ExFrm.view.rec.rec004w_03Model'
    ],
    controller:'rec004w_03',
    viewModel:{
        type:'rec004w_03'
    },
    name:'rec004w_03',
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
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">소등분류</span>',
                    width        : 200,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    : 'lc_IDCloseYn',
                    emptyText    : '전체',
                    value        : '',
                	bind         : {
                    	store:'{ds_closeYn}'
                	}
        		},{
        			width : 10,
        		},{
        			layout : 'hbox',
        			items :[{
            			xtype        : 'radiogroup',
            			reference    : 'rd_selectGbn',
            			name         : 'rd_selectGbn',
            			width        : 180,
            			listeners    : {
            				change : 'onRadioClick'
            			},
                		items     :[{
            				boxLabel   : '조회', 
                        	inputValue : 'SELECT',    
                        	width      : 60,
                        	reference  : 'rd_selectGbn1',
                        	checked    : true                    	
            			},{
            				boxLabel   : '위패번호 변경', 
            				inputValue : 'CHECK',    
                        	width      : 120,
                        	reference  : 'rd_selectGbn2',
            			}]
            		}]
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
        		},{
        			width : 10
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
        			layout    : 'hbox',
        			reference :'WEPAE_SEARCH_CHECK',
        			hidden    : true,
        			items     : [{
        				width : 10
        			},{
        				xtype        :'extextfield',
        				exType       : 'number',
                    	labelWidth   : 60,
                        fieldLabel   : '<span style="font-weight: 700;">위패번호</span>',
                        width        : 110,     
                        reference    : 'event_fseq',
        			},{
        				html : '<span style="display:inline-block;width:30px;text-align:center;line-height:22px;">~</span>'
        			},{
        				xtype        :'extextfield',                    	                       
                        width        : 50,
                        exType       : 'number',
                        reference    : 'event_eseq',
        			},{
        				width     : 5
        			},{
        				xtype     : 'exbutton',
                  		reference : 'saveList',
                  		name      : 'saveList',
                  		text      : '저장',
                  		handler   : 'onSave',
        			}]
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
	                reference     : 'rec004w_03_a',
	                cls           : 'rec004w_03_a',
	                height        : 520,
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
	                listeners      : {
	                      selectionchange : 'onSelectionChange'
	                     ,edit            : 'onEdit'
	                     ,itemcontextmenu : 'onMouseRightClick'
	                },
	                selModel      : {
                        mode: 'MULTI'
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
	                    exAlign     : 'center',
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
	                    width       : 90,
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
	                    width       : 90,
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
	                    width       : 90,
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
	                	text        : '접수메모',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MEMO',                    
	                    exAlign     : 'center',
	                    width       : 240,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("CLOSE_YN") == "T"){
	                    		meta.tdCls = 'useYnBack'
	                    	}
	                    	return value;
	                    }
	                },{
	                	text        : '상세메모',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'REMARK',                    
	                    exAlign     : 'center',
	                    flex        : 1,
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
	               			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">영가</span>'
	               		}]
	    			/*},{
	    				height : 5*/
	    			},{
	    				xtype  :'exgrid',
	    				reference    : 'rec004w_03_b',
		                height : 185,
		                cls    : 'rec004w_03_b',
		                width  : '100%',
		                bind   :{
		                    store:'{ds_dongChamJa}'
		                },		                
		                //cls : 'grid-group',
		                columns:[{
		                    text  :'No',
		                    xtype :'rownumberer',
		                    align : 'center',
		                    flex  : 1
		                },{
		                	text         :'동참구분',
		                	xtype        :'excolumn',
		                    dataIndex    :'WEPAE_SEQ',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                },{
		                	text         :'위패번호',
		                	xtype        :'excolumn',
		                    dataIndex    :'EVENT_SEQ',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                    sortable     : true,
		                },{
		                	text         :'복위자명',
		                	xtype        :'excolumn',
		                    dataIndex    :'BOKWIJA_NM',
		                    flex         : 1.6,
		                    exAlign      : 'left',
		                },{
		                	text         :'관계',
		                	xtype        :'excolumn',
		                    dataIndex    :'DECE_REL',
		                    flex         : 1.6,
		                    exAlign      : 'left',
		                },{
		                	text         :'본',
		                	xtype        :'excolumn',
		                    dataIndex    :'DECE_BONE_NM',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                },{
		                	text         :'영가자명',
		                	xtype        :'excolumn',
		                    dataIndex    :'DECE_BUD_NM',
		                    flex         : 1.6,
		                    exAlign      : 'left',
		                },{
		                	text         :'복위/기부',
		                	xtype        :'excolumn',
		                    dataIndex    :'BOKWI_KIBU_GBN_NM',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                },{
		                	text         :'음력/양력',
		                	xtype        :'excolumn',
		                    dataIndex    :'LUNAR_SOLAR_NM',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                },{
		                	text         :'기일',
		                	xtype        :'excolumn',
		                    dataIndex    :'DEATH_DAY',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
		                    	return exCommon.getGridDateFormat(value, '-' , 8);
		                    }
		                },{
		                	text         :'시간',
		                	xtype        :'excolumn',
		                    dataIndex    :'DEATH_TIME',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
		                      	 
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
		                }]
	    			}]
	        	}]
        	},{
        		reference: 'WEPAE_CHECK',
        		hidden   : true,
        		layout   : 'vbox',
        		width    : '100%',
        		height   : 720,
        		items    :[{
        			exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'rec004w_03_c',
	                cls           : 'rec004w_03_c none-dirty-grid',
	                height        : 720,
	                width         : '100%',
	                bind          : {
	                    store:'{ds_eventSeq}'
	                },
	                plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                },{
	                	ptype: 'gridexporter'
	                }],
	                columns:[{
	                	text        : '순번',
	                    xtype       : 'rownumberer',
	                    width       : 60,
	                    align       : 'center',
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return (rowIndex+1);
	                    },
	                },{
	                    text        : '접수번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ACCEPT_SEQ',                    
	                    exAlign     : 'center',
	                    width       : 160,
	                },{
	                	text        : '신청자',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'PROPOSAL_BUD_NM',                    
	                    exAlign     : 'center',
	                    width       : 120,
	                },{
	                	text        : '행사명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_NAME',                    
	                    exAlign     : 'center',
	                    width       : 200,
	                },{
	                	text        : '행사일',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_DATE',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value, '-' , 8);
	                    }
	                },{
	                	text        : '위패번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_SEQ',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellEdit'
	                    	return value;
	                    },
	                    editor        : {
	                	   xtype   : 'extextfield',
	                	   exType  : 'number'    
	                    }
	                },{
	                	text        : '소등여부',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'CLOSE_YN',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_closeYn');
	                    	return exCommon.getComboVal(value,store);
	                    }
	                },{
	                	text        : '복위자명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'BOKWIJA_NM',                    
	                    exAlign     : 'center',
	                    width       : 120,
	                },{
	                	text        : '영가자명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'DECE_BUD_NM',                    
	                    exAlign     : 'center',
	                    width       : 120,
	                },{
	                	text        : '접수메모',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MEMO',                    
	                    exAlign     : 'left',
	                    width       : 220,
	                },{
	                	text        : '상세메조',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'REMARK',                    
	                    exAlign     : 'left',
	                    width       : 220,
	                }]
        		}]     
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
