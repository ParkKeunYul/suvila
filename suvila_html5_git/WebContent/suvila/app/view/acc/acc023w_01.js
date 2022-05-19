Ext.define('ExFrm.view.acc.acc023w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc023w_01',
	requires:[
		'ExFrm.view.acc.acc023w_01Controller',
        'ExFrm.view.acc.acc023w_01Model'
	],
	controller:'acc023w_01',
	viewModel:{
        type:'acc023w_01'
    },
    name:'acc023w_01',
    isRootView:true,
    title:'계정별원장',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
        		width : '0.5%',
        	},{
        		html : '<div style="text-align:center;font-weight: 700;line-height:24px;padding-right:5px;">년월 : </div>'
        	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_Date',
                name           : 'V_DATE',                                                   
                format         : 'Y-m-d',
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
                listeners    : {
                	change : 'onSelectChange'
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
                	change : 'onSelectChange'
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
                }                
	    	},{
	    		width     : 20
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
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		handler   : 'onPrint1',
          		text      : '인쇄1',
        	}]
	    },{
	    	height : 30,
	    	layout : 'hbox',
	    	items  : [{
	    		width : '0.5%'
	    	},{
	    		html : '<span style="font-weight: 700;display:inline-block;height:25px;padding:5px 0 0 5px;">&lt;인쇄용입력란&gt;</span>'
	    	},{
    		    xtype          : 'extextfield',
 	    	    fieldLabel     : '<span style="font-weight: 700;">번호</span>',
 	    	    labelAlign     : 'right',
 	    	    labelWidth     : 50,	    		            	
                reference      : 'txt_report_no',
                name           : 'txt_report_no',
	    	},{
	    		xtype          : 'extextfield',
 	    	    fieldLabel     : '<span style="font-weight: 700;">청구부서</span>',
 	    	    labelAlign     : 'right',
 	    	    labelWidth     : 80,	    		            	
                reference      : 'txt_dept_name',
                name           : 'txt_dept_name',
	    	},{
	    		xtype          : 'extextfield',
 	    	    fieldLabel     : '<span style="font-weight: 700;">작성자</span>',
 	    	    labelAlign     : 'right',
 	    	    labelWidth     : 80,	    		            	
                reference      : 'txt_user_name',
                name           : 'txt_user_name',
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
	                reference    : 'acc023w_01_a',
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
	                cls : 'grid-group acc023w_01_a',
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
	                    width     : 110,
	                },{
	                	text      :'과목',
	                	columns:[{	
	                		text      :'관',
		                	xtype     :'excolumn',
		                    dataIndex :'KWAN_NAME',                    		                    
		                    width     : 140,
		   	             	exAlign   : 'left'
	                	},{
	                		text      :'항',
		                	xtype     :'excolumn',
		                    dataIndex :'HANG_NAME',                    
		                    width     : 140,
		   	             	exAlign   : 'left'	                	
	                	},{
	                		text      :'목',
		                	xtype     :'excolumn',
		                    dataIndex :'MOK_NAME',                    
		                    width     : 180,
		   	             	exAlign   : 'left'
	                	}]	  
	                },{
	                	text      :'적요',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_REMARK',                    
	                    width     : 180,
	                    exAlign   : 'left',
	                },{
	                	text      :'금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT_NOW',                    
	                    width     : 110,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	                },{
	                	text      :'예산액',
	                	xtype     :'excolumn',
	                    dataIndex :'BUDGET',                    
	                    width     : 110,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	                },{
	                	text      :'집행금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT_SUM',                    
	                    width     : 110,
	                    exType    : 'number',
	   	             	exAlign   : 'right'
	                },{
	                	text      :'누계비율(%)',
	                	xtype     :'excolumn',
	                    dataIndex :'RATE_SUM',                    
	                    width     : 110,
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