Ext.define('ExFrm.view.acc.acc026w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc026w_01',
	requires:[
		'ExFrm.view.acc.acc026w_01Controller',
        'ExFrm.view.acc.acc026w_01Model'
	],
	controller:'acc026w_01',
	viewModel:{
        type:'acc026w_01'
    },
    name:'acc026w_01',
    isRootView:true,
    title:'월계표(보고)',
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
	                reference    : 'acc026w_01_a',
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
	                cls : 'grid-group acc026w_01_a',
	                columns:[{		                
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    flex      : 3,
	                },{
	                	text      :'수입부',
	                	flex      : 8,
	                	columns:[{	
	                		text      :'예산액',
		                	xtype     :'excolumn',
		                    dataIndex :'BUDGET_I',                    		                    
		                    flex      : 2,
		                    exType    : 'number',
		   	             	exAlign   : 'right'
	                	},{
	                		text      :'금월중수입액',
		                	xtype     :'excolumn',
		                    dataIndex :'MONTH_I',                    
		                    flex      : 2,
		                    exType    : 'number',
		   	             	exAlign   : 'right'	                	
	                	},{
	                		text      :'수입총액',
		                	xtype     :'excolumn',
		                    dataIndex :'YEAR_I',                    
		                    flex      : 2,
		                    exType    : 'number',
		   	             	exAlign   : 'right'
	                	},{
	                		text      :'집행율',
		                	xtype     :'excolumn',
		                    dataIndex :'RATE_I',                    
		                    flex      : 2,
		                    exType    : 'number',
		   	             	exAlign   : 'right'
	                	}]	  
	                },{
	                	text      :'지출부',
	                	flex      : 8,
	                	columns:[{	
	                		text      :'예산액',
		                	xtype     :'excolumn',
		                    dataIndex :'BUDGET_O',                    		                    
		                    flex      : 2,
		                    exType    : 'number',
		   	             	exAlign   : 'right'
	                	},{
	                		text      :'금월중지출액',
		                	xtype     :'excolumn',
		                    dataIndex :'MONTH_O',                    
		                    flex      : 2,
		                    exType    : 'number',
		   	             	exAlign   : 'right'	                	
	                	},{
	                		text      :'지출총액',
		                	xtype     :'excolumn',
		                    dataIndex :'YEAR_O',                    
		                    flex      : 2,
		                    exType    : 'number',
		   	             	exAlign   : 'right'
	                	},{
	                		text      :'집행율',
		                	xtype     :'excolumn',
		                    dataIndex :'RATE_O',                    
		                    flex      : 2,
		                    exType    : 'number',
		   	             	exAlign   : 'right'
	                	}]
	                },{
	                	text      :'차인잔고',
	                	xtype     :'excolumn',
	                    dataIndex :'YEAR_BALANCE',                    
	                    flex      : 2,
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