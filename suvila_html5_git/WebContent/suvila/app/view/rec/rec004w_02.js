Ext.define('ExFrm.view.rec.rec004w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec004w_02',
    requires:['ExFrm.view.rec.rec004w_02Controller',
              'ExFrm.view.rec.rec004w_02Model',
              ],
    controller:'rec004w_02',
    viewModel:{
        type:'rec004w_02'
    },
    name:'rec004w_02',
    isRootView:true,
    //title:'기도접수',
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
            type:'vbox',
            align:'stretch'
        },
        items:[{
            xtype:'rec000w_02'
        },{
            xtype:'container',
            height:1
        },{
            height:270,
            layout:{
                type:'hbox',
                align:'stretch'
            },
            items:[{            	
            	width    : 890,
            	layout   : 'vbox',
            	items    :[{
            		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택</div>',
            		height : 30
            	},{
                    xtype       :'exgrid',
                    width       : '99.9%',
                    height      : 235,
                    reference   : 'rec004w_02_a',
                    cls         : 'topCheckHeader  none-dirty-grid',
                    bind:{
                        store:'{ds_spiritSelInfo}'
                    },
                    columns:[{
                    	headerCheckbox : true,
                    	text         : '선택',
                    	xtype        : 'excheckcolumn',
                        dataIndex    : 'SEL_YN',                    
                        exAlign      : 'center',                        
                        width        : 90,  
                        stopSelection: false

                    },{
                    	text         :'복위자명',
                    	xtype        :'excolumn',
                        dataIndex    :'BOKWIJA_NM',
                        flex         : 1,
                        exAlign      : 'center'
                    },{
                        text         :'복위/기부',
                        xtype        :'excolumn',
                        dataIndex    :'BOKWI_KIBU_GBN_NM',
                        width        : 100,
                        exAlign      : 'center'
                    },{
                        text         :'관계',
                        xtype        :'excolumn',
                        dataIndex    :'DECE_REL',
                        width        : 100,
                        exAlign      : 'center'
                    },{
                        text         :'본',
                        xtype        :'excolumn',
                        dataIndex    :'BON_NM',
                        width        : 80,
                        exAlign      : 'center'
                    },{
                        text         :'영가자명',
                        xtype        :'excolumn',
                        dataIndex    :'NAME_KOR',
                        width        : 100,
                        exAlign      : 'center'
                    },{
                        text         :'음력/양력',
                        xtype        :'excolumn',
                        dataIndex    :'LUNAR_SOLAR_NM',
                        width        : 90,
                        exAlign      : 'center'
                    },{
                        text         :'기일',
                        xtype        :'excolumn',
                        dataIndex    :'DEATH_DAY',
                        width        : 110,
                        exAlign      : 'center',
                    	renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                          	return exCommon.getGridDateFormat(value, ' / ' , 8);
                       },
                    },{
                        text         :'사망시간',
                        xtype        :'excolumn',
                        dataIndex    :'DEATH_TIME',
                        width        : 90,
                        exAlign      : 'center',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
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
                layout:{
                    type:'vbox',
                    align:'center',
                    pack:'center'
                },
                items:[{
                    xtype   : 'exbutton',
                    iconCls : 'fa fa-caret-right',
                    handler : 'onShift'
                }]
            },{
            	width : 5
            },{
            	flex    : 1,
            	layout  : 'vbox',
            	items :[{
            		layout : 'hbox',
            		height : 30,
            		width  : '100%',
            		items  :[{
            			flex : 1,
            		//	html   :'<div style="text-align:left;padding-left:2px;font-weight:700;">접수버튼 영역</div>',
            		},{
            			xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_r04_02',
            			name      : 'rdo_ApprovalGbn_r04_02',
            			/*listeners: {
        					change : 'onRadioChange',
        				},*/
            			items     :[{
            				boxLabel   : '현금', 
    	                	inputValue : 1,    
    	                	width      : 60,
    	                	checked    : true
            			},{
            				boxLabel   : '카드', 
    	                	inputValue : 2,    
    	                	width      : 60,
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
            			}]
            		},{
            			xtype     : 'exbutton',
                  		reference : 'deleteBtn',
                  		text      : '삭제',
                  		handler   : 'onDelete',
            		},{
            			width : 3
            		},{
            			xtype     : 'exbutton',
                  		reference : 'delAllBtn',
                  		text      : '전체취소',
                  		handler   : 'onDelAll',
            		},{
            			width : 3
            		},{
            			xtype     : 'exbutton',
                  		reference : 'saveBtn',
                  		text      : '접수완료',
                  		handler   : 'onSave',
            		},{
            			width : 0,
            			items : [{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_detail',
    	                    name             : 'ds_detail',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_dongChamJa',
    	                    name             : 'ds_dongChamJa',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_acceptRecAmt',
    	                    name             : 'ds_acceptRecAmt',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_sms',
    	                    name             : 'ds_sms',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			},{
            				xtype            : 'extextfield',
    	                    reference        : 'ds_pgCardInfo',
    	                    name             : 'ds_pgCardInfo',
    	                    value            : '',
    	                    inputType        : 'hidden',
            			}]
            		}]
            		
            	},{
            		xtype       :'exgrid',
                    width       : '99.9%',
                    height      : 235,
                    reference   : 'rec004w_02_b',
                    cls         : 'rec004w_02 none-dirty-grid',
                    bind:{
                        store:'{ds_dongChamJa}'
                    },
                    plugins    : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
                    }],
                    listeners      : {
	                	edit         : 'onEdit',
                    },
                    columns:[{
                    	 text        :'순번',
                         xtype       :'excolumn',
                         dataIndex   :'SORT',
                         align       : 'center',
                         width       : 65,
                    },{
                    	 text         :'복위자',
                         xtype        :'excolumn',
                         dataIndex    :'BOKWIJA_NM',
                         width        : 120,
                         exAlign      : 'center'
                    },{
                   	 	text         :'영가자',
                        xtype        :'excolumn',
                        dataIndex    :'DECE_NAME_KOR',
                        width        : 120,
                        exAlign      : 'center'
                    },{
                   	 	text         :'동참자',
                        xtype        :'excolumn',
                        dataIndex    :'DONGCHAMJA_GBN',
                        width        : 100,
                        exAlign      : 'center',
                        editor       : {
	                    	xtype         : 'extextfield',
	                    },
                    }]
            	}]
            }]
        },{
        	xtype      : 'exgrid',
       	    reference  : 'rec004w_32_c',
       	    cls        : 'rec002w_02_b none-dirty-grid',
       	    width      : '100%',
       	    height 	   : 65,
	        plugins    : [{
              	ptype:'cellediting',
              	clicksToEdit: 1
            }],
            listeners      : {
            	 edit         : 'onEditDetail'
            	,beforeedit   : 'onBeforeEditDetail'
            },
            bind       : {
                store:'{ds_detail}'
            },
            viewConfig    : {
                enableTextSelection: false
            },
            columns:[{
            	text         :'행사명',
                xtype        :'excolumn',
                dataIndex    :'EVENT_CD',
                flex         : 4,
                exAlign      : 'left',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	 //meta.tdCls = "recCellEdit";
                   	 
                   	meta.style = 'background-color:#ffffff; !important;';
                   	
                   	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_chonhonKind');
                	return exCommon.getComboVal(value,store , 'user',"EVENT_CD" , "EVENT_NAME", "선택");
                },
                editor        : {
                	xtype        : 'excombobox',
                    valueField   : 'EVENT_CD',
                    displayField : 'EVENT_NAME',
                    emptyText    : '선택',
                    bind:{
                        store:'{ds_chonhonKind}'
                    }
                },
            },{
            	text         :'입제일',
                xtype        :'excolumn',
                dataIndex    :'EVENT_DATE',
                flex         : 2,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 // color = "recCellEdit";
                   	 // color = "recCellNotEdit";                   	 
                   	 meta.tdCls = "recCellEdit";
                   	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_chonhonKindDate');
                   	return exCommon.getComboVal(value,store , 'user',"EVENT_DATE" , "EVENT_NAME", "선택");
                },
                editor        : {
                	xtype        : 'excombobox',
                    valueField   : 'EVENT_DATE',
                    displayField : 'EVENT_NAME',
                    emptyText    : '선택',
                    bind:{
                        store:'{ds_chonhonKindDate}'
                    },
                },
            },{
            	text         :'행사시간',
                xtype        :'excolumn',
                dataIndex    :'EVENT_TIME',
                flex         : 1.6,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var SET_YN = record.get("SET_YN");
                   	 // color = "recCellEdit";
                   	 // color = "recCellNotEdit";
                   	 
                   	meta.tdCls = "recCellNotEdit";
                   	 
                   	 if(SET_YN == "T"){
                   		meta.tdCls = "recCellEdit";
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
                   	 
                   	 
                   	//return exCommon.getGridDateFormat(value, '-' , 8);
                },
                editor: {
                	xtype         : 'extextfield',
                },
            },{
            	text         :'위패',
                xtype        :'excolumn',
                dataIndex    :'WEPAECNT',
                flex         : 1.6,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	 meta.tdCls = "recCellEdit";
                   	 return value;
                },
            },{
            	text         :'기간(월)',
                xtype        :'excolumn',
                dataIndex    :'PERIOD_MONTH',
                flex         : 1.6,
                exAlign      : 'right',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 meta.tdCls = "recCellEdit";
                   	 return exCommon.setNumberFormat(value);;
                },
                editor    : {
                	xtype         : 'extextfield',
                },
                exHidden     : true,
            },{
            	text         :'동참비',
                xtype        :'excolumn',
                dataIndex    :'PAYMENT_PLAN_AMT',
                flex         : 2,
                exAlign      : 'right',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 meta.tdCls = "recCellEdit";
                   	 return exCommon.setNumberFormat(value);
                },
                editor        : {
                	xtype         : 'extextfield',
                },
            },{
            	text         :'당일납부',
                xtype        :'excolumn',
                dataIndex    :'PAYMENT_AMT',
                flex         : 2,
                exAlign      : 'right',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 meta.tdCls = "recCellEdit";
                   	 return exCommon.setNumberFormat(value);
                },
                editor        : {
                	xtype         : 'extextfield',
                },
            
            },{
            	text         :'미수금액',
                xtype        :'excolumn',
                dataIndex    :'MISU_AMT',
                flex         : 2,
                exAlign      : 'right',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 meta.tdCls = "recCellNotEdit";
                   	 return exCommon.setNumberFormat(value);
                },
                
            },{
            	text         :'비고',
                xtype        :'excolumn',
                dataIndex    :'REMARK',
                flex         : 6,
                exAlign      : 'left',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 meta.tdCls = "recCellEdit";
                   	 return value;
                },
                editor        : {
                	xtype         : 'extextfield',
                },
            }]
        },{          
            height:5
        },{
            xtype:'rec000w_03'
        }]
    }]
});
