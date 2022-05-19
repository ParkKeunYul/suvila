Ext.define('ExFrm.view.ser.ser032w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.ser032w_01',
	requires:[
		'ExFrm.view.ser.ser032w_01Controller',
        'ExFrm.view.ser.ser032w_01Model'
	],
	controller:'ser032w_01',
	viewModel:{
        type:'ser032w_01'
    },
    name:'ser032w_01',
    isRootView:true,
    title:'발송건수',
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
        		html           : '<div style="font-weight: 700;padding : 0 10px;line-height:25px;">발송일 : </div>',
        	},{
	    		xtype          : 'exdatefield',
	    		labelAlign     : 'right',
	    		labelWidth     : 60,	    		            	
                reference      : 'em_sDate',
                name           : 'em_sDate',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
	    		width : 20,
	    		html : '<div style="text-align:center;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'em_eDate',                                   
                width          : 170,
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
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
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'ser032w_01_a',
	                height     : 790,              
	                plugins    :[{
	                	ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter'
	                }],
	                features   : [{
	                	ftype : 'summary',
	                	dock  : 'bottom'  // 하단 잠금
	                }],
	                bind      : {
	                    store:'{ds_main}'
	                },
	                listeners : {
	                //	selectionchange : 'onSelectionChange'
                    },
	                cls       : 'ser032w_01_a',
	                columns   : [{
	                	text      :'발송자',
	                	xtype     :'excolumn',
	                    dataIndex :'TEMPLE_NM',                    
	                    exAlign   :'center',
	                    width     : 200,
	                    sortable  : true,
	                },{
	                	text      :'발송내역',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME',                    
	                    exAlign   :'left',
	                    width     : 270,
	                    sortable  : true,
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'TR_MSG_GB',                    
	                    exAlign   :'center',
	                    width     : 120,
	                    sortable  : true,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(value == "LMS"){
	                    		return "장문";
	                    	}else{
	                    		return "단문";
	                    	}
	                    }
	                },{
	                	text      :'발송건수',
	                	xtype     :'excolumn',
	                    dataIndex :'COUNT',                    
	                    exAlign   :'right',
	                    width     : 120,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 건';
                        	}   
                        }
	                },{
	                	text      :'금액',
	                	xtype     :'excolumn',
	                    dataIndex :'COST',                    
	                    exAlign   :'right',
	                    width     : 170,
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        }
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546