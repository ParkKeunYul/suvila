Ext.define('ExFrm.view.ser.ser025w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.ser025w_01',
	requires:[
		'ExFrm.view.ser.ser025w_01Controller',
        'ExFrm.view.ser.ser025w_01Model'
	],
	controller:'ser025w_01',
	viewModel:{
        type:'ser025w_01'
    },
    name:'ser025w_01',
    isRootView:true,
    title:'본관_등록',
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
        		html      : '<div style="font-weight: 700;line-height:25px;padding:0 5px 0 10px;">접수일 : </div>',
        	},{
	    		xtype          : 'exdatefield',
                reference      : 'me_AcceptSDate',
                name           : 'V_ACCEPT_SDATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
	    		width : 20,
	    		html : '<div style="text-align:center;line-height:25px;font-weight:700;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'me_AcceptEDate',
                name           : 'V_ACCEPT_EDATE',                                   
                width          : 170,
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
        		width     : 5
	    	},{
            	xtype        : 'excombobox',                	
            	labelWidth   : 70,
            	fieldLabel   : '<span style="font-weight:700;">접수구분</span>',
            	labelAlign   : 'right',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_recKind',
                name         : 'V_ACCEPT_GBN',                                    
                width        : 200,
                emptyText    : '전체',
                value        : "",
                bind:{
                 	store:'{ds_recKind}'
                },
                listeners : {
                	//change : 'onSmsChange'
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
          		text      : '엑셀',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'recoverBtn',
          		name      : 'recoverBtn',
          		handler   : 'onRecover',
          		text      : '복원',
	    	},{
	    		layout    : 'hbox',
	    		hidden    : true,
	    		items     : [{
	    			xtype     : 'extextfield',
	       	 		inputType : 'hidden',
	       	 		reference : 'newData',
	       	 		name      : 'newData',
			     },{
	            	xtype     : 'extextfield',
	       	 		inputType : 'hidden',
	       	 		reference : 'uptData',
	       	 		name      : 'uptData',
		         },{
	            	xtype     : 'extextfield',
	       	 		inputType : 'hidden',
	       	 		reference : 'delData',
	       	 		name      : 'delData',
	    		}]
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
	                reference   : 'ser025w_01_a',
	                cls         : 'ser025w_01_a topCheckHeader',
	                height      : 450,              
	                plugins     : [{
	                	ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter'
	                }],
	                features: [{
	                	ftype : 'summary',
	                	dock  : 'bottom'  // 하단 잠금
	                }],
	                bind:{
	                    store:'{ds_detail}'
	                },
	                /*selModel: {
	                	selType        : 'checkboxmodel',
                	    //mode: 'SINGLE', // 상단 체크박스 나오지 않음	                	    
                	    allowDeselect  : false  ,  // row 선택시 자동체크 해제
                	    checkOnly      : false,
                	    headerText     : '선택',
                        headerWidth    : 90,
                        injectCheckbox : 1,
                        listeners      : {
                        	 deselect : 'onCheckFalse'
                        	,select   : 'onCheckTrue'
                        }
	                },*/
	                listeners      : {
	                	selectionchange : 'onSelectionChange'
                    },
	                columns:[{
	                	text  : 'No',                        
	                    xtype :'rownumberer',
	                    align :'center',
	                    width : 50
	                },{
	                	text           : '선택',
	                	xtype          : 'excheckcolumn',
	                    dataIndex      : 'SEL_YN',                    
	                    exAlign        : 'center',
	                    headerCheckbox : true,
	                    width          : 90,
	                },{
	                	text      :'접수번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_SEQ',                    
	                    exAlign   :'center',
	                    width     : 170,
	                    sortable  : true,
	                },{
	                	text      :'접수일',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_DATE',                    
	                    exAlign   :'left',
	                    width     : 110,
	                    sortable  : true,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value , ' / ');
	                    }
	                },{
	                	text      :'신청자',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BUD_NM',                    
	                    exAlign   :'left',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'접수종류',
	                	xtype     :'excolumn',
	                    dataIndex :'PROD_NAME',                    
	                    exAlign   :'left',
	                    width     : 160,
	                    sortable  : true,
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	var cnt = this.up('[isRootView=true]').getViewModel().getStore('ds_detail').getCount();
                        	
                        	return cnt+' 건';
                        }
	                },{
	                	text      :'미수금',
	                	xtype     :'excolumn',
	                    dataIndex :'MISU_AMT',                    
	                    exAlign   :'right',
	                    width     : 120,
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        }
	                },{
	                	text      :'총납입금',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_AMT',                    
	                    exAlign   :'right',
	                    width     : 120,
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        }
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 470,
	                }]
	            },{
	            	height : 10
	            },{
            		layout : 'hbox',
            		items : [{
            			flex : 1
            		},{
            			xtype     : 'exbutton',
                  		reference : 'excelBotBtn',
                  		name      : 'excelBotBtn',
                  		handler   : 'onExcelBot',
                  		text      : '엑셀',
            		}]
	            },{
	            	height : 10
	            },{
	            	exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'ser025w_01_b',
	                height      : 360,              	                	               
	                cls         : 'ser025w_01_b',
	                features    : [{
	                	ftype : 'summary',
	                	dock  : 'bottom'  // 하단 잠금
	                }],
	                plugins     : [{
	                    ptype: 'gridexporter'
	                },{
	                    ptype:'cellediting'
	                }],
	                bind        : {
	                    store:'{ds_MisuAmt}'
	                },
	                listeners:{
	                	beforeedit      : 'beforeedit' 
		            },
	                columns     : [{
	                	text  : '순번',                        
	                    xtype :'rownumberer',
	                    align :'center',
	                    width : 50
	                },{
	                	text      :'접수자',
	                	xtype     :'excolumn',
	                    dataIndex :'CRT_USER',                    
	                    exAlign   :'center',
	                    flex      : 2,	   
	                },{
	                	text      :'접수일',
	                	xtype     :'excolumn',
	                    dataIndex :'SUB_DATE',                    
	                    exAlign   :'center',
	                    flex      : 2,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getFormat(value,'dateYMD' );
	                    }
	                },{
	                	text      :'납부금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT',                    
	                    exAlign   :'right',
	                    flex      : 2.5,	  
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	//if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	//}                        
                        }
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    flex      : 8,	  
	                    editor    : {
	                        xtype:'extextfield'
	                    }
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});