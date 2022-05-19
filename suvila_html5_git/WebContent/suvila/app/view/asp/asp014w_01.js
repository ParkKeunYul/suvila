Ext.define('ExFrm.view.asp.asp014w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp014w_01',
	requires:[
		'ExFrm.view.asp.asp014w_01Controller',
        'ExFrm.view.asp.asp014w_01Model'
	],
	controller:'asp014w_01',
	viewModel:{
        type:'asp014w_01'
    },
    name:'asp014w_01',
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
	    		
	    	},{
	    		xtype:'exdatefield',
	    		fieldLabel:'일시',
	    		labelWidth:30,	    		            	
                reference:'em_sDate',
                name:'em_sDate',                                                   
                exFormat : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
	    		width : 20,
	    		html : '<div style="text-align:center;">~</div>'
	    	},{
	    		xtype:'exdatefield',
                reference:'em_eDate',
                name:'em_eDate',                                   
                width : 170,
                exFormat : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    		
	    	},{
	    		width :10
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'조회구분',
            	fieldStyle: 'text-align: right;',
            	labelWidth:80,
                valueField:'value',
                displayField:'display',
                reference:'sel_SearchGbn',
                name:'search_Gbn',                    
                value : 'TEMPLE_CD',
                width : 180,
                bind:{
                 	store:'{ds_searchType}'
                }
	    	},{
	    		width :10
	    	},{
	    		xtype:'extextfield',
                reference:'txt_find_Search',
                name:'searchTxt',                    
                enableKeyEvents: true,
                width : 170,
                listeners:{
         	     keyup : 'onSearchEnter'
                }
	    	},{
	    		width : 10
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'성공여부',
            	fieldStyle: 'text-align: right;',
            	labelWidth:80,
                valueField:'value',
                displayField:'display',
                reference:'sel_successYn',
                name:'success_Yn',                    
                value : '',
                width : 180,
                bind:{
                 	store:'{ds_successYn}'
                }
	    	},{
	    		width : 10
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		handler   : 'onExcel',
          		text      : '엑셀',
	    	},{
	    		width : 5	    	
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',
	    	},{
	    		width : 10	 
	    	
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
	                reference:'asp014w_01_a',
	                height:820,              
	                bind:{
	                    store:'{ds_main}'
	                },
	                plugins:[{
	                	ptype: 'gridexporter',
	                }],
	               /* selModel: {
	                    mode: 'MULTI'
	                },*/
	                cls : 'asp014w_01_a',	                
	                columns:[{
	                	text:'로그인일시',
	                	xtype:'excolumn',
	                    dataIndex:'LOGIN_DATE',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 2.2	                 
	                },{
	                	text:'사찰코드',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_CD',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1.3
	                },{
	                	text:'사찰명',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_NM',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1.7	
	                },{
	                	text:'아이디',
	                	xtype:'excolumn',
	                    dataIndex:'USER_ID',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1.5
	                },{
	                	text:'성명',
	                	xtype:'excolumn',
	                    dataIndex:'USER_NM',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1.3	
	                },{
	                	text:'유저IP',
	                	xtype:'excolumn',
	                    dataIndex:'CLIENT_IP',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex :1.8	
	                },{
	                	text:'수비라 IP',
	                	xtype:'excolumn',
	                    dataIndex:'SERVER_IP',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1.8,
	                },{
	                	text:'성공유무',
	                	xtype:'excolumn',
	                    dataIndex:'SUCCESS_YN',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1.3,
	                },{
	                	text:'메세지',
	                	xtype:'excolumn',
	                    dataIndex:'ERROR_MESSAGE',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 3.8,
	               
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});