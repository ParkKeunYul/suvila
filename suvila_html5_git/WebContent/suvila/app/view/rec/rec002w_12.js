Ext.define('ExFrm.view.rec.rec002w_12',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec002w_12',
	requires:[
		'ExFrm.view.rec.rec002w_12Controller',
        'ExFrm.view.rec.rec002w_12Model'
	],
	controller:'rec002w_12',
	viewModel:{
        type:'rec002w_12'
    },
    name:'rec002w_12',
    isRootView:true,
    title:'기부금출력관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout : 'hbox',
	    	    	width  : '100%',
	    	    	height : 30,
	    	    	items  : [{
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
	        			width : 5
	    	    	},{
	                	xtype           : 'extextfield',
	                    reference       : 'txt_stipulation',
	                   // value           : '',
	                    enableKeyEvents : true,
	                    width           : 110 ,
	                    listeners       : {
	                 	   keyup : 'onSearchEnter'
	                    },
	                    value : '01-00002-0-01'
	    	    	},{
	        			width : 5
	        		},{
	               	 	xtype    : 'exbutton',
	                    iconCls  : 'fa fa-search',
	                    text     : '검색',
	                    handler  : 'onBudSearch',
	                    reference: 'budSearchBtn',
	    	    	},{
            			width : 5
            		},{
	        			xtype        :'excombobox',
	                    width        : 80,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'cb_date',
	                    value        : 1,
	                	bind         : {
	                    	store:'{ds_date_type}'
	                	},
            		},{
            			width : 5
	    	    	},{
	    	    		xtype          : 'exdatefield',
                        reference      : 'me_SDate',
                        format         : 'Y-m-d',
                        width          : 100
            		},{
            			html :'<div style="text-align:center;width:20px;font-weight:700;line-height:24px;">~</div>',
            			width : 20
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'me_EDate',
                        format         : 'Y-m-d',
                        width          : 100
            		
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 50,
	                    fieldLabel   : '<span style="font-weight: 700;">불사명</span>',
	                    width        : 170,
	                    valueField   : 'BULSA_CD',
	                    displayField : 'BULSA_NM',     
	                    reference    :'lc_BSKindInfo',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_BSKindInfo}'
	                	}
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 60,
	                    fieldLabel   : '<span style="font-weight: 700;">신도분류</span>',
	                    width        : 220,
	                    valueField   : 'CLASS_CD',
	                    displayField : 'CLASS_NAME',     
	                    reference    : 'lc_classMgt',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_classMgt}'
	                	}
	        		
	        		},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',
	              		reference : 'selectBtn',
	              		name      : 'selectBtn',
	              		text      : '조회',
	              		handler   : 'onSelect',
	    	    	},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',	              		
	              		text      : '파일 저장 및 출력',
	              		handler   : 'onExcel',
	        		},{
	        			width : 0,
	        			heigth: 0,
	        			items : [{
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
	    	        		xtype            : 'extextfield',
	                        reference        : 'hid_bud_no',
	                        value            : '',
	                        inputType        : 'hidden',
	                        name             : 'V_BUD_NO'
	            		},{
	            			xtype            : 'extextfield',
	                        reference        : 'txt_budNo',
	    	    		}]
	    	    	}]
	            },{
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'rec002w_12_a',
	                height     : 800,
	                cls        : 'rec002w_12_a  none-dirty-grid',
	                features      : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    bind       : {
	                    store:'{ds_main}'
	                },
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
                    exGroupFields:[
                    	 'ACCEPT_SEQ'
                    	,'PROPOSAL_BUD_NO'
                    	,'PROPOSAL_NAME_KOR'
                    	,'BULSA_NM'
                    	,'BULSA_DETAIL'
                    	,'ACPT_FDATE1'
                    	,'ACPT_EDATE1'
                    	,'PAYMENT_PLAN_AMT'
                    	,'PAYMENT_AMT'
                    	,'MISU_AMT'
                    ],
	                columns   : [{
	                	text      :'접수번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_SEQ',                    
	                    exAlign   :'center',
	                    width     : 160,
	                    sortable  : true,
	                },{
	                	text      :'신도번호',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 120,
	                    sortable  : true,
	                },{
	                	text      :'신청자',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_NAME_KOR',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                },{
	                	text      :'접수종류',
	                	xtype     :'excolumn',
	                    dataIndex :'BULSA_NM',                    
	                    exAlign   :'left',
	                    width     : 130,
	                    sortable  : true,
	                },{
	                	text      :'접수내역',
	                	xtype     :'excolumn',
	                    dataIndex :'BULSA_DETAIL',                    
	                    exAlign   :'left',
	                    width     : 110,
	                    sortable  : true,
	                },{
	                	text      :'시작일',
	                	xtype     :'excolumn',
	                    dataIndex :'ACPT_FDATE1',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                },{
	                	text      :'종료일',
	                	xtype     :'excolumn',
	                    dataIndex :'ACPT_EDATE1',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                },{
	                	text      :'접수금액1',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_PLAN_AMT',                    
	                    exAlign   :'right',
	                    width     : 110,
	                    sortable  : true,
	                    exType    : 'number',
	                    //exType    : 'number',
	                    summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
	                },{
	                	text      :'납부금액',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_AMT',                    
	                    exAlign   :'right',
	                    width     : 110,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
	                },{
	                	text      :'미수금액',
	                	xtype     :'excolumn',
	                    dataIndex :'MISU_AMT',                    
	                    exAlign   :'right',
	                    width     : 110,
	                    sortable  : true,
	                    exType    : 'number',
	                    /*renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
	                    },*/
	                    summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
	                },{
	                	text      :'신도명',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME_KOR',                    
	                    exAlign   :'left',
	                    width     : 110,
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 210,
	                }],
	                viewConfig: {
	                	getRowClass: function(record, index) {
	                        return 'recCellNotEdit';
	                    }
	                }
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546