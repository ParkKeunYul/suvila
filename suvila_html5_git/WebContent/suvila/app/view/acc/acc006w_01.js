Ext.define('ExFrm.view.acc.acc006w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc006w_01',
	requires:[
		'ExFrm.view.acc.acc006w_01Controller',
        'ExFrm.view.acc.acc006w_01Model'
	],
	controller:'acc006w_01',
	viewModel:{
        type:'acc006w_01'
    },
    name:'acc006w_01',
    isRootView:true,
    title:'현금출납장',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 15,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
        		width : '0.5%'
        	},{
	    		html : '<div style="text-align:center;font-weight: 700;line-height:24px;padding-right:5px;">마감일자 : </div>'
        	},{
	    		xtype          : 'exdatefield',
	    		/*fieldLabel     : '<span style="font-weight: 700;">마감일자</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 80,*/	    		            	
                reference      : 'em_sDate',
                name           : 'V_SACT_DATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
        	},{
	    		width : 20,
	    		html : '<div style="text-align:center;line-height:24px;font-weight: 700;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'V_EACT_DATE',                                   
                width          : 170,
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
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
                labelWidth   : 80,
                width        : 250,
                bind         : {
                 	store:'{ds_acctGbn}'
                },
	    	},{
        		width     : 5
	    	},{
	    		xtype          : 'extextfield',
                fieldLabel     : '비고 ',
                reference      : 'txt_remark',
                name           : 'V_REMARK',
                labelAlign     : 'left',                        
                labelWidth     : 50,
                exLabel        : '검색어',
                enableKeyEvents: true,
                width          : 250,
                listeners:{
            	   keyup : 'onSearchEnter'
                }
	    	},{
	    		width     : 5
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
          		text      : '파일 저장 및 출력',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'printBtn',
          		name      : 'printBtn',
          		handler   : 'onPrint',
          		text      : '결의서출력',
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
	        		exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'acc006w_01_a',
	                cls         : 'topCheckHeader',
	                height      : 770,              
	                plugins     : [{
	                	ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter'
	                }],
	                features   : [{
	                	ftype : 'summary',
	                	dock  : 'bottom'  // 하단 잠금
	                }],
	                bind:{
	                    store:'{ds_main}'
	                },
	                selModel: {
	                	selType        : 'checkboxmodel',
                	    allowDeselect  : false  , 
                	    checkOnly      : true,
                	    headerText     : '선택',
                        headerWidth    : 95,
                        injectCheckbox : 0, 
                        showHeaderCheckbox : true,
                        cls         : 'topCheckHeaderAuto',
                        listeners      : {
                        	 deselect : 'onCheckFalse'
                        	,select   : 'onCheckTrue'
                        }
	                },
	              
	                columns:[{	
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value , ' / ');
	                    }
	                },{
	                	text      :'결의서번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_NO',                    
	                    exAlign   :'center',
	                    sortable  : true,
	                    width     : 90,
	                },{
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    sortable  : true,
	                    exAlign   : 'center',
	                },{
	                	text      :'관',
	                	xtype     :'excolumn',
	                    dataIndex :'KWAN_NAME',                    
	                    exAlign   :'left',
	                    width     : 130,
	                },{
	                	text      :'항',
	                	xtype     :'excolumn',
	                    dataIndex :'HANG_NAME',                    
	                    exAlign   :'left',
	                    sortable  : true,
	                    width     : 130,
	                },{
	                	text      :'목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    sortable  : true,
	                    width     : 130,
	                },{
	                	text      :'수입',
	                	xtype     :'excolumn',
	                    dataIndex :'I_AMOUNT',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    sortable  : true,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        }
	                },{
	                	text      :'지출',
	                	xtype     :'excolumn',
	                    dataIndex :'O_AMOUNT',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    sortable  : true,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    summaryType: 'sum',
	                    summaryAlign : 'center',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        }
	                },{
	                	text      :'누적금액',
	                	xtype     :'excolumn',
	                    dataIndex :'TOTAL',                    
	                    exAlign   :'left',
	                    width     : 130,
	                    sortable  : true,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_NM',                    
	                    exAlign   :'left',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 150,
	                    sortable  : true,
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});