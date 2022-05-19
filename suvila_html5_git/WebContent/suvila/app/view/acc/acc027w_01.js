Ext.define('ExFrm.view.acc.acc027w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc027w_01',
	requires:[
		'ExFrm.view.acc.acc027w_01Controller',
        'ExFrm.view.acc.acc027w_01Model'
	],
	controller:'acc027w_01',
	viewModel:{
        type:'acc027w_01'
    },
    name:'acc027w_01',
    isRootView:true,
    title:'계정과목별현계표',
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
	    		fieldLabel     : '<span style="font-weight: 700;">년월</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 40,	    		            	
                reference      : 'em_Month',
                name           : 'V_MONTH',                                                   
                format         : 'Y-m',
        	},{
        		width     : 5
	    	},{
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
          		handler   : 'onPrint',
          		text      : '인쇄',
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
	                reference    : 'acc027w_01_a',
	                height       : 820,
	                plugins      :[{
	                	ptype: 'gridexporter',
	                }],
	                bind          :{
	                    store:'{ds_main}'
	                },
	                viewConfig    : {
	                    enableTextSelection: true
	                },
	                exGroupFields : ['ACCT_NM','IE_GBN_NAME', 'IE_GBN' , 'KWAN_NAME', 'HANG_NAME'],
	                cls : 'grid-group acc027w_01_a',
	                columns:[{		                
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    width     : 110,
	                },{
	                	text      :'수입지출',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN_NAME',                    
	                    exAlign   :'left',
	                    width     : 100,
	                },{
	                	text      :'과목',
	                	columns:[{	
	                		text      :'관',
		                	xtype     :'excolumn',
		                    dataIndex :'KWAN_NAME',                    		                    
		                    width     : 130,
		   	             	exAlign   : 'left'
	                	},{
	                		text      :'항',
		                	xtype     :'excolumn',
		                    dataIndex :'HANG_NAME',                    
		                    width     : 160,
		   	             	exAlign   : 'left'	                	
	                	},{
	                		text      :'목',
		                	xtype     :'excolumn',
		                    dataIndex :'MOK_NAME',                    
		                    width     : 170,
		   	             	exAlign   : 'left'
	                	}]	  
	                },{
	                	text      :'예산액',
	                	xtype     :'excolumn',
	                    dataIndex :'BUDGET',                    
	                    flex      : 1.4,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	   	             		
	                },{
	                	text      :'전월까지의총액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT_BEF',                    
	                    flex      : 1.8,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	   	             		
	                },{
	                	text      :'당월',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT_NOW',                    
	                    flex      : 1.4,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	   	             		
	                },{
	                	text      :'총액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT_SUM',                    
	                    flex      : 1.4,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	   	             		
	                },{
	                	text      :'잔액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT_BAL',                    
	                    flex      : 1.4,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	   	             		
	                },{
	                	text      :'당월비율(%)',
	                	xtype     :'excolumn',
	                    dataIndex :'RATE_NOW',                    
	                    width     : 115,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	                },{
	                	text      :'누계비율(%)',
	                	xtype     :'excolumn',
	                    dataIndex :'RATE_SUM',                    
	                    width     : 115,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	                }]
	            }]// 가운데	     
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});