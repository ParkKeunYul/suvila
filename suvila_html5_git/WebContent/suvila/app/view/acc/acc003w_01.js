Ext.define('ExFrm.view.acc.acc003w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc003w_01',
	requires:[
		'ExFrm.view.acc.acc003w_01Controller',
        'ExFrm.view.acc.acc003w_01Model'
	],
	controller:'acc003w_01',
	viewModel:{
        type:'acc003w_01'
    },
    name:'acc003w_01',
    isRootView:true,
    title:'계정별원장',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
    		layout : 'hbox',
    		height : 30,
        	items : [{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_acctGbn',
                name         : 'V_ACCT_GBN',                    
                fieldLabel   : '<span style="font-weight: 700;">회계구분</span>',
                labelAlign   : 'right',
                labelWidth   : 70,
                width        : 200,
                value        : 1,
                bind         : {
                 	store:'{ds_acctGbn}'
                },
        	},{
        		width     : 10
        	},{
        		xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'sel_date_gbn',
                name         : 'V_DATE_GBN',                                    
                labelAlign   : 'right',
                labelWidth   : 0,
                width        : 50,
                value        : 8,
                bind         : {
                 	store:'{ds_ymd}'
                },
                listeners    : {
                	change : 'onDateField'
                }
        	},{
	    		width     : 5
        	},{
	    		xtype          : 'exdatefield',
	    		labelAlign     : 'right',
	    		labelWidth     : 00,	    		            	
                reference      : 'em_sDate',
                name           : 'V_ACT_DATE_01',                                                   
                format         : 'Y-m-d',
        	},{
	    		width          : 20 ,
	    		html           : '<div style="text-align:center;">~</div>' 
        	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'V_ACT_DATE_02',                                                   
                format         : 'Y-m-d',
        	},{
	    		width     : 10
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',	    	
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
	        	width : '60%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items : [{
	            	height : 20,
	            	html : '세입통계'
	            },{
	            	xtype         : 'polar',
	                reference     : 'chart',
	                width         : '100%',
	                height        : 415,
	                bind          : {
	                    store:'{ds_in}'
	                },
	                innerPadding  : 10,
	                legend        : {
	                	docked: 'right'
	                },
	                interactions   : ['rotate', 'itemhighlight'],
	                /*captions       : {
	                    title    : 'Pie Charts - Custom Slice Sizing',
	                    credits  : {
	                        text: 'Data: IDC Predictions - 2017\n' +
	                            'Source: Internet',
	                        align: 'left'
	                    }
	                },*/
	                series          : [{
	                    type        : 'pie',
	                    animation   : {
	                        easing: 'easeOut',
	                        duration: 500
	                    },
	                    angleField  : 'AMOUNT',  
	                    radiusField : 'PER',
	                    clockwise   : false,
	                    highlight   : {
	                        margin: 20
	                    },
	                    label        : {
	                        field: 'NAME',      
	                        display: 'outside',
	                        fontSize: 12
	                    },
	                    style         : {
	                        strokeStyle: 'white',
	                        lineWidth: 1
	                    },
	                    tooltip       : {
	                        trackMouse: true,
	                        renderer: 'onSeriesTooltipRender'
	                    }
	                }]
	            },{
	            	height : 20,
	            	html : '세출통계' 
	            },{
	            	xtype         : 'polar',
	                reference     : 'chart_out',
	                width         : '100%',
	                height        : 400,
	                bind          : {
	                    store:'{ds_out}'
	                },
	                innerPadding  : 10,
	                legend        : {
	                    docked: 'right'
	                },
	                interactions   : ['rotate', 'itemhighlight'],	                
	                series          : [{
	                    type        : 'pie',
	                    animation   : {
	                        easing: 'easeOut',
	                        duration: 500
	                    },
	                    angleField  : 'AMOUNT', 
	                    radiusField : 'PER',
	                    clockwise   : false,
	                    highlight   : {
	                        margin: 20
	                    },
	                    label        : {
	                        field: 'NAME',      
	                        display: 'outside',
	                        fontSize: 12
	                    },
	                    style         : {
	                        strokeStyle: 'white',
	                        lineWidth: 1
	                    },
	                    tooltip       : {
	                        trackMouse: true,
	                        renderer: 'onSeriesTooltipRenderOut'
	                    }
	                }]
	            }]
	        },{
	        	width : '1%'
	        },{
	        	width : '38%' ,
	        	items:[{
	        		height : 30,
	            	width  : '100%',
	            	layout : 'hbox',
	            	items  : [{
	            		flex : 1
	            	},{
	    	    		xtype     : 'exbutton',
	              		reference : 'excelInBtn',
	              		name      : 'excelInBtn',
	              		handler   : 'onExcelIn',
	              		text      : '엑셀',
	              		width     : 50
	            	}]	
	        	},{
	        		exGroupRef   : true,
	                xtype        : 'exgrid',
	                reference    : 'acc003w_01_a',
	                height       : 415,
	                features     : [{
	                	ftype              : 'summary',
	                	dock               : 'bottom'  
	                }],
	                plugins      :[{
	                	ptype: 'gridexporter',
	                }],
	                bind          :{
	                    store:'{ds_in}'
	                },
	                columns:[{		
	                	text      :'순번',
	                	xtype     :'rownumberer',
	                    width      : 70,
	                },{
	                	text      :'계정과목',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME',                    
	                    exAlign   :'left',
	                    flex      : 6,
	                },{
	                	text      :'금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT',                    
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    flex      : 3,
	                    sortable  : true,
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
	                },{
	                	text      :'%',
	                	xtype     :'excolumn',
	                    dataIndex :'PER',                    
	                    exAlign   : 'right',
	                    flex      : 1.5,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	return value.toFixed(2);
	                    	/*var store = this.up('[isRootView=true]').getViewModel().getStore('ds_in');
	                    	
	                    	var val1 = 0;
	                    	
	                    	var tot = 0;
	                    	store.each(function(record){
	                    		var sub = 0;
	                    		try{
	                    			sub = parseInt( record.get("AMOUNT") );
	                    		}catch (e) {
	                    			sub = 0;
	                    		}
	                    		
	                    		tot = tot + sub;
	                    	});
	                    	
	                    	try{
	                    		val1 = parseInt( record.get("AMOUNT") );
	                    	}catch (e) {
	                    		val1 = 0;
	                    	}
	                    	
	                    	var per = ( val1 / tot ) * 100;
	                    	
	                    	return per.toFixed(2) + "%";*/
	                    }
	                    
	                }]
	        	},{
	            	height : 30,
	            	width  : '100%',
	            	layout : 'hbox',
	            	items  : [{
	            		flex : 1
	            	},{
	    	    		xtype     : 'exbutton',
	              		reference : 'excelOutBtn',
	              		name      : 'excelOutBtn',
	              		handler   : 'onExcelOut',
	              		text      : '엑셀',
	              		width     : 50
	            	}]
	        	},{
	        		exGroupRef   : true,
	                xtype        : 'exgrid',
	                reference    : 'acc003w_01_b',
	                height       : 400,
	                features     : [{
	                	ftype              : 'summary',
	                	dock               : 'bottom'  
	                }],
	                plugins      :[{
	                	ptype: 'gridexporter',
	                }],
	                bind          :{
	                    store:'{ds_out}'
	                },
	                columns:[{		
	                	text      :'순번',
	                	xtype     :'rownumberer',
	                	width     : 70,
	                },{
	                	text      :'계정과목',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME',                    
	                    exAlign   :'left',
	                    flex      : 6,
	                },{
	                	text      :'금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT',                    
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    flex      : 3,
	                    sortable  : true,
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
	                },{
	                	text      :'%',
	                	xtype     :'excolumn',
	                    dataIndex :'PER',                    
	                    exAlign   : 'right',
	                    flex      : 1.5,
	                	renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                		return value.toFixed(2);
	                    	/*var store = this.up('[isRootView=true]').getViewModel().getStore('ds_in');
	                    	
	                    	var val1 = 0;
	                    	
	                    	var tot = 0;
	                    	store.each(function(record){
	                    		var sub = 0;
	                    		try{
	                    			sub = parseInt( record.get("AMOUNT") );
	                    		}catch (e) {
	                    			sub = 0;
	                    		}
	                    		
	                    		tot = tot + sub;
	                    	});
	                    	
	                    	try{
	                    		console.log();
	                    		val1 = parseInt( record.get("AMOUNT") );
	                    	}catch (e) {
	                    		val1 = 0;
	                    	}
	                    	
	                    	var per = ( val1 / tot ) * 100;
	                    	
	                    	return per.toFixed(2) + "%";*/
	                    	
	                    }
	                }]
	        	}]
        		
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});