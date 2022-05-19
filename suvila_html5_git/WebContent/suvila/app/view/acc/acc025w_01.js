Ext.define('ExFrm.view.acc.acc025w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc025w_01',
	requires:[
		'ExFrm.view.acc.acc025w_01Controller',
        'ExFrm.view.acc.acc025w_01Model'
	],
	controller:'acc025w_01',
	viewModel:{
        type:'acc025w_01'
    },
    name:'acc025w_01',
    isRootView:true,
    title:'계정별원장',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
	    		xtype          : 'exdatefield',
	    		fieldLabel     : '<span style="font-weight: 700;">년도</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 40,	    		            	
                reference      : 'em_sDate',
                name           : 'V_SACT_DATE',                                                   
                format         : 'Y',
                submitFormat   : 'Y',
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
                labelWidth   : 70,
                width        : 200,
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
                name         : 'V_IE_GBN',                    
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
          		handler   : 'onSelect',
          		text      : '조회',	    	
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		handler   : 'onExcel',
          		text      : '파일 저장 및 출력',
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
	                reference    : 'acc025w_01_a',
	                height       : 820,
	                plugins      :[{
	                    ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter',
	                }],
	                bind          :{
	                    store:'{ds_main}'
	                },
	                viewConfig    : {
	                    enableTextSelection: true
	                },
	                features: [{
	                	id                 : 'group',
	                    ftype              : 'groupingsummary',
	                    hideGroupedHeader  : true,
	                    enableGroupingMenu : false,
	                    groupHeaderTpl     : '작성월 : {name} ',
	                },{
	                	ftype              : 'summary',
	                	dock               : 'bottom'  // 하단 잠금
	                }],
	                exGroupFields : ['ACCT_NM', 'IE_GBN' , 'KWAN_NAME', 'HANG_NAME'],
	                cls : 'grid-group acc025w_01_a',
	                columns:[{		                
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    flex      : 1.4,
	                    summaryType: 'count',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return '총 '+exCommon.setNumberFormat(value)+' 건';
                        },
                        renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value , ' / ');
	                    }
	                },{
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    flex      : 2.2,
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN',                    
	                    exAlign   :'center',
	                    flex      : 1,
	                },{
	                	text      :'관',
	                	xtype     :'excolumn',
	                    dataIndex :'KWAN_NAME',                    
	                    exAlign   :'left',
	                    flex      : 2,
	                },{
	                	text      :'항',
	                	xtype     :'excolumn',
	                    dataIndex :'HANG_NAME',                    
	                    exAlign   :'left',
	                    flex      : 2 ,
	                },{
	                	text      :'목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    flex      : 2 ,
	                    summaryType: 'count',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return "총 계"
                        }
	                },{
	                	text      :'수입',
	                	xtype     :'excolumn',
	                    dataIndex :'I_AMOUNT',                    	                    
	                    flex      : 2 ,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
                        exportStyle: {
                            alignment: {
                                horizontal: 'Right'
                            },
                            font: {
                                bold: true
                            },
                            format: 'Number'
                        },
                        /*exportRenderer: function(value){
                        	console.log("222222222222");
                        }*/
	                },{
	                	text      :'지출',
	                	xtype     :'excolumn',
	                    dataIndex :'O_AMOUNT',                    	                    
	                    flex      : 2 ,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
                        /*exportStyle:[{
                        	format : 'Number'
                        }]*/
	                },{
	                	text      :'누적금액',
	                	xtype     :'excolumn',
	                    dataIndex :'TOTAL',                    	                    
	                    flex      : 2,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_NM',                    	                    
	                    flex      : 1.4,
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',
	                    exAlign   : 'left',
	                    flex      : 3.2,
	                }]
	            }]// 가운데	     
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});