Ext.define('ExFrm.view.asp.asp022w_02',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp022w_02',
	requires:[
		'ExFrm.view.asp.asp022w_02Controller',
        'ExFrm.view.asp.asp022w_02Model'
	],
	controller:'asp022w_02',
	viewModel:{
        type:'asp022w_02'
    },
    name:'asp022w_02',
    isRootView:true,
    title:'카드수수료',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
	    	items:[{
	    		xtype:'exdatefield',
            	fieldLabel:'년월',
            	fieldStyle: 'text-align: right;',
            	labelWidth:50,
                reference:'em_date',
                name:'YMDATE',                                   
                width : 100,
                format : 'Y/m',
                submitFormat : 'Ym',
                enableKeyEvents: true,
                listeners:{
            	   keyup : 'onSearchEnter'
                }
	    	},{
	    		width : 10	    	
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',
	    	},{
	    		width : 5	    	
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
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout:'hbox',
	                xtype:'container',
	                height : 0	                
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp022w_02_a',
	                height:820,              
	               bind:{
	                    store:'{ds_main}'
	                },
		            features: [{
	                	ftype : 'summary'
	                }],
	                plugins:[{
                        ptype:'gridexporter'
                    }],
	                cls : 'asp022w_02_a',	                
	                columns:[{
	                	text:'사찰명',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE',                    
	                    exAlign:'center',
	                    exType:'date',
	                    flex : 2
	                },{
	                	text:'승인건수',
	                	xtype: 'excolumn',
	                    dataIndex:'AUTHCNT',                    
	                    exAlign:'right',
	                    exType:'number',
	                    flex : 1,
	                    summaryType: 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	if(value > 0){
	                    		return exCommon.setNumberFormat(value)+' 건';
	                    	}                        
	                    }
	                },{
	                	text:'거래금액',
	                	xtype: 'excolumn',
	                    dataIndex:'AMOUNT',                    
	                    exAlign:'right',
	                    exType:'number',
	                    flex : 1,
	                    summaryType: 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	if(value > 0){
	                    		return exCommon.setNumberFormat(value)+' 원';
	                    	}                        
	                    }
	                },{
	                	text:'사찰수수료',
	                	xtype: 'excolumn',
	                    dataIndex:'TP_RATE_COMMISSION',                    
	                    exAlign:'right',
	                    exType:'number',
	                    flex : 1
	                },{
	                	text:'수비라수수료',
	                	xtype: 'excolumn',
	                    dataIndex:'RATE_COMMISSION',                    
	                    exAlign:'right',
	                    exType:'number',
	                    flex : 1
	                },{
	                	text:'이익	',
	                	xtype: 'excolumn',
	                    dataIndex:'SA_COMMISSION',                    
	                    exAlign:'right',
	                    exType:'number',
	                    flex : 1,
	                    summaryType: 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	if(value > 0){
	                    		return exCommon.setNumberFormat(value)+' 원';
	                    	}                        
	                    }
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});