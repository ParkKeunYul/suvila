Ext.define('ExFrm.view.acc.acc017w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc017w_01',
	requires:[
		'ExFrm.view.acc.acc017w_01Controller',
        'ExFrm.view.acc.acc017w_01Model'
	],
	controller:'acc017w_01',
	viewModel:{
        type:'acc017w_01'
    },
    name:'acc017w_01',
    isRootView:true,
    title:'현금출납삭제',
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
        		width : '0.5%',
        	},{
        		html : '<span style="font-weight: 700;line-height:25px;">마감일 : </span>'
        	},{
	    		xtype          : 'exdatefield',
                reference      : 'me_ActDate',
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
          		reference : 'deleteBtn',
          		name      : 'deleteBtn',
          		handler   : 'onDelete',
          		text      : '삭제',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		handler   : 'onExcel',
          		text      : '파일 저장 및 출력',
        	}]
	      },{
	    	 height : 0,
	    	 items :[{
            	xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'hidden_act_date',
       	 		name      : 'HIDDEN_ACT_DATE',
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
	                reference   : 'acc017w_01_a',
	                height      : 820,              
	                plugins     : [{
	                	ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter'
	                }],
	                bind:{
	                    store:'{ds_main}'
	                },	                
	                cls : 'acc017w_01_a',
	                columns:[{	                	
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    flex      : 1.8,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getGridDateFormat(value , ' / ');
	                    }
	                },{
	                	text      :'결의서번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_NO',                    
	                    exAlign   :'left',
	                    flex      : 2,
	                    exAlign   : 'center',
	                },{
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    flex      : 2,
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
	                    flex      : 2,
	                },{
	                	text      :'목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    flex      : 2,
	                },{
	                	text      :'수입',
	                	xtype     :'excolumn',
	                    dataIndex :'I_AMOUNT',                    
	                    exAlign   :'right',
	                    flex      : 2,
	                    exType    : 'number'
	                },{
	                	text      :'지출',
	                	xtype     :'excolumn',
	                    dataIndex :'O_AMOUNT',                    
	                    exAlign   :'right',
	                    flex      : 2,
	                    exType    : 'number'
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_NM',                    
	                    exAlign   :'left',
	                    flex      : 1.4,
	                    exAlign   : 'center',
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    flex      : 2.4,
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});