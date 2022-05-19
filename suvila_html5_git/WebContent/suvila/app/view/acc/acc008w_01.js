Ext.define('ExFrm.view.acc.acc008w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc008w_01',
	requires:[
		'ExFrm.view.acc.acc008w_01Controller',
        'ExFrm.view.acc.acc008w_01Model'
	],
	controller:'acc008w_01',
	viewModel:{
        type:'acc008w_01'
    },
    name:'acc008w_01',
    isRootView:true,
    title:'현금출납장',
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
	    		fieldLabel     : '<span style="font-weight: 700;">마감일자</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 80,	    		            	
                reference      : 'em_sDate',
                name           : 'V_SACT_DATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
        	},{
	    		width : 20,
	    		html : '<div style="text-align:center;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'V_EACT_DATE',                                   
                width          : 170,
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
        		width     : 10
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
        		width     : 10
	    	},{
	    		xtype          : 'extextfield',
                fieldLabel     : '<span style="font-weight: 700;">적요</span> ',
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
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
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
	                reference   : 'acc008w_01_a',
	                cls         : 'topCheckHeader',
	                height      : 820,              
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
                	    //mode: 'SINGLE', // 상단 체크박스 나오지 않음	                	    
                	    allowDeselect  : false  ,  // row 선택시 자동체크 해제
                	    checkOnly      : true,
                	    headerText     : '선택',
                        headerWidth    : 90,
                        injectCheckbox : 0,  // last
                        showHeaderCheckbox : true,
                        listeners      : {
                        	 deselect : 'onCheckFalse'
                        	,select   : 'onCheckTrue'
                        }
	                },
	                listeners      : {
                    },
	                cls : 'acc008w_01_a',
	                columns:[{	
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    flex      : 1.6,
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
	                    flex      : 1.3,
	                },{
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    flex      : 1.8,
	                    sortable  : true,
	                    exAlign   : 'center',
	                },{
	                	text      :'관',
	                	xtype     :'excolumn',
	                    dataIndex :'KWAN_NAME',                    
	                    exAlign   :'left',
	                    flex      : 2,
	                    exHidden  : true
	                },{
	                	text      :'항',
	                	xtype     :'excolumn',
	                    dataIndex :'HANG_NAME',                    
	                    exAlign   :'left',
	                    sortable  : true,
	                    flex      : 2,
	                    exHidden  : true
	                },{
	                	text      :'계정과목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    sortable  : true,
	                    flex      : 2,
	                },{
	                	text      :'수입',
	                	xtype     :'excolumn',
	                    dataIndex :'I_AMOUNT',                    
	                    exAlign   :'left',
	                    flex      : 1.8,
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
	                    flex      : 1.8,
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
	                    flex      : 2,
	                    sortable  : true,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_NM',                    
	                    exAlign   :'left',
	                    flex      : 1.4,
	                    sortable  : true,
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    flex      : 2.4,
	                    sortable  : true,
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});