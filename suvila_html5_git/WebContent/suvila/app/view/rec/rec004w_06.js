Ext.define('ExFrm.view.rec.rec004w_06',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec004w_06',
    requires:[
    	'ExFrm.view.rec.rec004w_06Controller',
        'ExFrm.view.rec.rec004w_06Model'
    ],
    controller:'rec004w_06',
    viewModel:{
        type:'rec004w_06'
    },
    name:'rec004w_06',
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
        			html : '<div style="font-weight:700;padding-right:5px;line-height:25px;">용지 :</div>'
        		},{
        			xtype       :'radiogroup',
        			reference   : 'rd_gidoGbn',
        			name        : 'rd_gidoGbn', 			
        			items     :[{
        				boxLabel   : '천혼문', 
	                	inputValue : 1,    
	                	width      : 70,
	                	reference  : 'rd_gidoGbn1',
	                	checked    : true
        			},{
        				boxLabel   : '축원',
	                	inputValue : 2,    
	                	width      : 50,
	                	reference  : 'rd_gidoGbn2',
        			},{
        				boxLabel   : '축원+천혼', 
	                	inputValue : 3,    
	                	width      : 80,
	                	reference  : 'rd_gidoGbn3',
        			},{
        				boxLabel   : '위패', 
	                	inputValue : 4,    
	                	width      : 50,
	                	reference  : 'rd_gidoGbn4',
        			}]
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		text      : '조회',
              		handler   : 'onSelect',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		text      : '인쇄',
              		handler   : 'onPrint',
        		},{
        			width : 5
        		},{
        			/*xtype     : 'exbutton',
              		text      : '홍법사인쇄',
              		handler   : 'onPrint',*/
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
        			width : 5
        		},{
        			xtype        :'excombobox',
                    width        : 80,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    : 'cb_date',
                    value        : 'accept',
                	bind         : {
                    	store:'{ds_date}'
                	},
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
        			width : 5,
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
	                reference     : 'rec004w_06_a',
	                cls           : 'topCheckHeader none-dirty-grid',
	                height        : 520,
	                width         : '100%',
	                bind          : {
	                    store:'{ds_main}'
	                },
	                plugins     : [{
	                	ptype: 'gridexporter'
	                }],
	                listeners      : {
	                    selectionchange : 'onSelectionChange'	
	                   ,itemcontextmenu : 'onRightClick'
	                },
	                selModel      : {
	                    mode: 'MULTI'
	                },
	                features      : [{
	                	ftype : 'summary',
	                	dock  : 'bottom'  // 하단 잠금
	                }],
	                columns:[{
	                	text           : '선택',
	                	xtype          : 'excheckcolumn',
	                    dataIndex      : 'CHECK_P',                    
	                    exAlign        : 'center',
	                    headerCheckbox : true,
	                    width          : 90,
	                },{
	                	text        : '순번',
	                    xtype       : 'rownumberer',
	                    width       : 60,
	                    align       : 'center',
	                },{
	                	text        : '접수번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'ACCEPT_SEQ',                    
	                    exAlign     : 'center',
	                    width       : 160,
	                    sortable    : true,	                    
	                },{
	                	text        : '신도번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'PROPOSAL_BUD_NO',                    
	                    exAlign     : 'center',
	                    width       : 120,
	                    sortable    : true,
	                },{
	                	text        : '신청자',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'PRO_NAME_KOR',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                },{
	                	text        : '행사명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_NAME',                    
	                    exAlign     : 'left',
	                    width       : 250,
	                    sortable    : true,
	                },{
	                	text        : '입제일',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_DATE',                    
	                    exAlign     : 'center',
	                    width       : 100,
	                    sortable    : true,
	                    exType      : 'date'
	                },{
	                	text        : '행사시간',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_TIME',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
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
	                	text        : '위패번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'EVENT_SEQ',                    
	                    exAlign     : 'center',
	                    width       : 120,
	                    sortable    : true,
	                },{
	                	text        : '위패',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'WEPAECNT',                    
	                    exAlign     : 'right',
	                    width       : 70,
	                    sortable    : true,
	                },{
	                	text        : '비고',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'MEMO',                    
	                    exAlign     : 'center',
	                    width       : 250,
	                    sortable    : true,
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
	    				reference    : 'rec004w_06_b',
		                height : 185,
		                cls    : 'rec004w_06_b',
		                width  : '100%',
		                bind   :{
		                    store:'{ds_sub}'
		                },
		                exGroupFields:['WEPAE_SEQ'],
		                columns:[{
		                	text  :'순번',
		                    xtype :'rownumberer',
		                    align : 'center',
		                    width : 60,
		                },{
		                	text         :'동참구분',
		                	xtype        :'excolumn',
		                    dataIndex    :'WEPAE_SEQ',
		                    exAlign      : 'center',
		                    width        : 110,
		                },{
		                	text         :'복위자명',
		                	xtype        :'excolumn',
		                    dataIndex    :'BOKWIJA_NM',
		                    width        : 110,
		                    exAlign      : 'left',
		                },{
		                	text         :'관계',
		                	xtype        :'excolumn',
		                    dataIndex    :'BOKWIJA_NM',
		                    width        : 110,
		                    exAlign      : 'left',
		                },{
		                	text         :'본',
		                	xtype        :'excolumn',
		                    dataIndex    :'BON_NM',
		                    width        : 90,
		                    exAlign      : 'left',
		                },{
		                	text         :'영가자명',
		                	xtype        :'excolumn',
		                    dataIndex    :'NAME_KOR',
		                    width        : 110,
		                    exAlign      : 'left',
		                },{
		                	text         :'복위/기부',
		                	xtype        :'excolumn',
		                    dataIndex    :'BOKWI_NM',
		                    width        : 110,
		                    exAlign      : 'center',
		                },{
		                	text         :'음력/양력',
		                	xtype        :'excolumn',
		                    dataIndex    :'LR_NM',
		                    width        : 110,
		                    exAlign      : 'center',
		                },{
		                	text         :'기일',
		                	xtype        :'excolumn',
		                    dataIndex    :'DEATH_DAY',
		                    width        : 110,
		                    exAlign      : 'center',
		                    exType       : 'date'
		                },{
		                	text         :'시간',
		                	xtype        :'excolumn',
		                    dataIndex    :'DEATH_TIME',
		                    exAlign      : 'center',
		                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
		                    	if(isNaN(value)){
	    	                   		return "";
	    	                   	}
		                   	
	    	                   	var DEATH_TIME = value;
	    	                   	if(DEATH_TIME.length == 1){
	    	                   		DEATH_TIME ="0"+ DEATH_TIME + ":00"; 
	    	               		}else if(DEATH_TIME.length == 2){
	    	               			DEATH_TIME = DEATH_TIME + ":00";
	    	               		}else if(DEATH_TIME.length == 3){
	    	               			DEATH_TIME = DEATH_TIME.substr(0,2) + ":" + DEATH_TIME.substr(2) +"0";
	    	               		}else if(DEATH_TIME.length == 4){
	    	               			DEATH_TIME = DEATH_TIME.substr(0,2) + ":" + DEATH_TIME.substr(2);
	    	               		}else if(DEATH_TIME.length > 4){
	    	               			DEATH_TIME = DEATH_TIME.substr(0,2) + ":" + DEATH_TIME.substr(2,2);
	    	               		}
	    	                   	return DEATH_TIME;
		                    }
		                }]
	    			}]
	        	}]
        		
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
