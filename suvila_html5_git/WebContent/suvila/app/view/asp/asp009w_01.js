Ext.define('ExFrm.view.asp.asp009w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp009w_01',
	requires:[
		'ExFrm.view.asp.asp009w_01Controller',
        'ExFrm.view.asp.asp009w_01Model'
	],
	controller:'asp009w_01',
	viewModel:{
        type:'asp009w_01'
    },
    name:'asp009w_01',
    isRootView:true,
    title:'현금출납대장관리',
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
	    		xtype:'excombobox',
            	fieldLabel:'사찰명',
            	fieldStyle: 'text-align: right;',
            	labelWidth:50,
                valueField:'TEMPLE_CD',
                displayField:'TEMPLE_NM',
                reference:'lc_templeCd',
                name:'lc_templeCd',                    
                value : '000000',
                width : 200,
                bind:{
                 	store:'{ds_templeCd}'
                }
	    	},{
	    		width :10
	    	},{
	    		xtype:'exdatefield',
            	fieldLabel:'마감일',
            	fieldStyle: 'text-align: right;',
            	labelWidth:50,
                reference:'em_date',
                name:'V_DATE',                                   
                width : 120,
                exFormat : 'Y-m-d',
                exSubmitFormat : 'Ym-d',
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
          		reference : 'delBtn',
          		name      : 'delBtn',
          		handler   : 'onDelete',
          		text      : '삭제',
	    	},{
	    		width : 10	 
	    	},{
	    		html : '<span style="color:red;display:inline-block;height:27px;line-height:27px;">삭제된 데이터는 복구가 불가능합니다.</span>'
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
	                height : 0,
	                items:[{                 
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'newData',
               	 		name      : 'newData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'uptData',
               	 		name      : 'uptData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'delData',
               	 		name      : 'delData',
               	 		width : 0
	                }]
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp009w_01_a',
	                height:820,              
	               bind:{
	                    store:'{ds_main}'
	                },
	               /* selModel: {
	                    mode: 'MULTI'
	                },*/
	                cls : 'asp009w_01_a',	                
	                columns:[{
	                	text:'작성일자',
	                	xtype:'excolumn',
	                    dataIndex:'ACT_DATE',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1	                 
	                },{
	                	text:'결의서번호',
	                	xtype:'excolumn',
	                    dataIndex:'ACT_NO',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1
	                },{
	                	text:'회계구분',
	                	xtype:'excolumn',
	                    dataIndex:'ACCT_NM',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1	
	                },{
	                	text:'관',
	                	xtype:'excolumn',
	                    dataIndex:'KWAN_NAME',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1	
	                },{
	                	text:'항',
	                	xtype:'excolumn',
	                    dataIndex:'HANG_NAME',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1	
	                },{
	                	text:'목',
	                	xtype:'excolumn',
	                    dataIndex:'MOK_NAME',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1	
	                },{
	                	text:'수입',
	                	xtype:'excolumn',
	                    dataIndex:'I_AMOUNT',                    
	                    exAlign:'right',
	                    sortable: true,
	                    flex : 1,
	                    exType:'number',
	                },{
	                	text:'지출',
	                	xtype:'excolumn',
	                    dataIndex:'O_AMOUNT',                    
	                    exAlign:'right',
	                    sortable: true,
	                    flex : 1,
	                    exType:'number',
	                },{
	                	text:'누적금액',
	                	xtype:'excolumn',
	                    dataIndex:'TOTAL',                    
	                    exAlign:'right',
	                    sortable: true,
	                    flex : 1,
	                    exType:'number',
	                },{
	                	text:'영수인',
	                	xtype:'excolumn',
	                    dataIndex:'USER_NM',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1
	                },{
	                	text:'적요',
	                	xtype:'excolumn',
	                    dataIndex:'REMARK',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});