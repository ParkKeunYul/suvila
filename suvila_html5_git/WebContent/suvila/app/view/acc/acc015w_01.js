Ext.define('ExFrm.view.acc.acc015w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc015w_01',
	requires:[
		'ExFrm.view.acc.acc015w_01Controller',
        'ExFrm.view.acc.acc015w_01Model'
	],
	controller:'acc015w_01',
	viewModel:{
        type:'acc015w_01'
    },
    name:'acc015w_01',
    isRootView:true,
    title:'총계정원장',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
        flex : 1,
	    items:[{
	    	height : 15,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
	    		xtype          : 'exdatefield',
	    		fieldLabel     : '<span style="font-weight: 700;">마감일자</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 70,	    		            	
                reference      : 'em_sDate',
                name           : 'V_SACT_DATE',                                                   
                format         : 'Y-m',
                submitFormat   : 'Ym',
        	},{
	    		width : 20,
	    		html : '<div style="text-align:center;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'V_EACT_DATE',                                                   
                format         : 'Y-m',
                submitFormat   : 'Ym',
	    	},{
        		width     : 5
	    	},{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_acctGbn',
                name         : 'V_ACCT_GBN',                    
                emptyText    : '전체',
                fieldLabel   : '<span style="font-weight: 700;">회계구분</span>',
                labelAlign   : 'right',
                labelWidth   : 65,
                width        : 250,
                value        : 1,
                bind         : {
                 	store:'{ds_acctGbn}'
                },
                listeners    : {
                	change : 'onIegbnChange'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_iegbn',
                name         : 'V_IE_GBN',                    
                fieldLabel   : '<span style="font-weight: 700;">세입/세출</span>',
                labelAlign   : 'right',
                labelWidth   : 70,
                width        : 150,
                value        : 'I',
                bind         : {
                 	store:'{ds_iegbn}'
                },
                listeners    : {
                	change : 'onIegbnChange'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'KWAN',
                displayField : 'KWAN_NAME',
                reference    : 'lc_kwan',
                name         : 'V_KWAN',                    
                fieldLabel   : '<span style="font-weight: 700;">관</span>',
                labelAlign   : 'right',
                labelWidth   : 30,
                width        : 150,
                bind         : {
                 	store:'{ds_kwan}'
                },
                listeners    : {
                	change : 'onKwanChange'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'HANG',
                displayField : 'HANG_NAME',
                reference    : 'lc_hang',
                name         : 'V_HANG',                    
                fieldLabel   : '<span style="font-weight: 700;">항</span>',
                labelAlign   : 'right',
                labelWidth   : 30,
                width        : 150,
                bind         : {
                 	store:'{ds_hang}'
                },
                listeners    : {
                	change : 'onHangChange'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'MOK',
                displayField : 'MOK_NAME',
                reference    : 'lc_mok',
                name         : 'V_MOK',                    
                fieldLabel   : '<span style="font-weight: 700;">목</span>',
                labelAlign   : 'right',
                labelWidth   : 30,
                width        : 150,
                bind         : {
                 	store:'{ds_mok}'
                },
	    	},{
	    		width     : 10
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',	    	
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		handler   : 'onExcel',
          		text      : '출력 및 파일저장',
        	}]
	      },{
	    	 height : 0,
	    	 items :[{
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
       	 		reference : 'txt_total',       	 		
       	 		width     : 0,
       	 		value     : 0
	         }]
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
	        		exGroupRef   : true,
	                xtype        : 'exgrid',
	                reference    : 'acc015w_01_a',
	                height       : 820,
	                plugins      :[{
	                    ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter',
	                }],
	                bind          :{
	                    store:'{ds_main}'
	                },
	                columnLines: true,
	                split: true,
	                viewConfig    : {
	                    stripeRows: true
	                },
	                features: [{
	                	id                 : 'group',
	                    ftype              : 'groupingsummary',
	                    hideGroupedHeader  : false,
	                    enableGroupingMenu : false,
	                },{
	                	ftype              : 'summary',
	                	dock               : 'bottom'  // 하단 잠금
	                }],
	                exGroupFields : ['ACCT_NM', 'IE_GBN' , 'KWAN_NAME', 'HANG_NAME'],
	                cls : 'grid-group acc015w_01_a',
	                listeners: {
	                },
	                columns:[{		                
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    width     : 130,
	                    summaryType: 'count',
	                    /*ignoreExport: true,*/ 
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return '총 '+exCommon.setNumberFormat(value)+' 건';
                        },
                        renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value , ' / ');
	                    },
	                    exportStyle: {
	                        alignment: {
	                            horizontal: 'center'
	                        },
	                        font: {
	                            bold: true
	                        },
	                        format: 'Short Date'
	                    },
	                    exportRenderer : true,
	                    exportSummaryRenderer : function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return '[총] '+exCommon.setNumberFormat(value)+' 건';
	                    }
	                },{
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    width     : 110,
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN',                    
	                    exAlign   :'center',
	                    width     : 90,
	                },{
	                	text      :'관',
	                	xtype     :'excolumn',
	                    dataIndex :'KWAN_NAME',                    
	                    exAlign   :'left',
	                    width     : 150,
	                },{
	                	text      :'항',
	                	xtype     :'excolumn',
	                    dataIndex :'HANG_NAME',                    
	                    exAlign   :'left',
	                    width     : 150,
	                },{
	                	text      :'목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    width     : 150,
	                    summaryType: 'count',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return "총 계"
                        }
	                },{
	                	text      :'수입',
	                	xtype     :'excolumn',
	                    dataIndex :'I_AMOUNT',                    	                    
	                    width     : 130,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
                        
                        
	                },{
	                	text      :'지출',
	                	xtype     :'excolumn',
	                    dataIndex :'O_AMOUNT',                    	                    
	                    width     : 130,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
                        exportStyle:[{
                        	format : 'Number'
                        }]
	                },{
	                	text      :'누적금액',
	                	xtype     :'excolumn',
	                    dataIndex :'TOTAL',                    	                    
	                    width     : 130,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    sortable  : true,
	                    summaryType: 'max',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
                        exportStyle:[{
                        	format : 'Number'
                        }]
	                }]
	            }]// 가운데	     
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});