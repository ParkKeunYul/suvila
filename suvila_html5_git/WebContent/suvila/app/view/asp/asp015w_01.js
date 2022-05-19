Ext.define('ExFrm.view.asp.asp015w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp015w_01',
	requires:[
		'ExFrm.view.asp.asp015w_01Controller',
        'ExFrm.view.asp.asp015w_01Model'
	],
	controller:'asp015w_01',
	viewModel:{
        type:'asp015w_01'
    },
    name:'asp015w_01',
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
            	fieldLabel:'통신사',
            	fieldStyle: 'text-align: right;',
            	labelWidth:60,
                valueField:'value',
                displayField:'display',
                reference:'sel_compGb',
                name:'success_Yn',                    
                value : 'KT',
                width : 115,
                bind:{
                 	store:'{ds_compGb}'
                }
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'처리',
            	labelWidth:50,
                valueField:'value',
                displayField:'display',
                reference:'sel_sendYn',
                name:'success_Yn',                                    
                width : 115,
                value : '1',
                bind:{
                 	store:'{ds_sendYn}'
                 		
                }
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'단문',
            	labelWidth:50,
                valueField:'value',
                displayField:'display',
                reference:'sel_msgGb',
                name:'success_Yn',                    
                value : '',
                width : 115,
                bind:{
                 	store:'{ds_msgGb}'
                }
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'성공',
            	labelWidth:50,
                valueField:'value',
                displayField:'display',
                reference:'sel_succesYn',
                name:'success_Yn',                    
                value : '',
                width : 115,
                bind:{
                 	store:'{ds_successYn}'
                }
	    	},{
	    		width : 10
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
	    		xtype:'excombobox',
            	fieldLabel:'항목',
            	fieldStyle: 'text-align: right;',
            	labelWidth:50,
                valueField:'CODE',
                displayField:'NAME',
                reference:'lc_org_NmAll',
                name:'success_Yn',   
                emptyText : '전체',
                value : '',
                width : 150,
                bind:{
                 	store:'{ds_smsrec}'
                }
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'사찰명',
            	fieldStyle: 'text-align: right;',
            	labelWidth:60,
                valueField:'TEMPLE_CD',
                displayField:'TEMPLE_NM',
                reference:'lc_templeCd',
                name:'success_Yn',   
                emptyText : '전체',
                value : '',
                width : 280,
                bind:{
                 	store:'{ds_temple}'
                },
                listConfig: {
                    itemTpl: [
                        '<div data-qtip="{TEMPLE_NM}: {description}"><span style="width:50px;display:inline-block;">{TEMPLE_CD}</span> {TEMPLE_NM}</div>'
                    ]
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
	            	height : 205,
	            	items:[{
	            		flex : 3,
	            		xtype:'extextfield',
	            		height : 200,
           			    reference:'txt_success',                        
                        width : '100%',
                        exReadOnly : true
	            	},{
	            		width : 1
	            	},{	            		
	            		xtype:'extextarea',
	            		height : 200,
           			    reference:'txt_msg',                        
                        width : '100%',
                        flex : 7,
                        exReadOnly : true
	            	}]
	            },{
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
	                reference:'asp015w_01_a',
	                height:600,              
	                bind:{
	                    store:'{ds_main}'
	                },
	                plugins:[{
	                	ptype: 'gridexporter'
	                },{
	                	ptype: 'bufferedrenderer',	                	
	                }],
	                listeners: {
	                	selectionchange : 'onSelectionChange'
	                },
	                cls : 'asp015w_01_a',	                
	                columns:[{
	                	text:'순번',
	                	xtype:'rownumberer',
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 0.7
	                },{
	                	text:'등록일',
	                	xtype:'excolumn',
	                    dataIndex:'NOW_DATE',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1.5,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	try{
	                    		var yy = value.substr(0,2);
		                    	var mm = value.substr(2,2);
		                    	var dd = value.substr(4,2);
		                    	var tt = value.substr(6,2);
		                    	var MM = value.substr(8,2);
		                    	var ss = value.substr(10,2);
		                    	
		                    	return yy + "/" + mm + "/" + dd + " "+tt+ ":"+MM+":"+ss;
	                    	}catch (e) {}
	                    }
	                },{
	                	text:'발송일',
	                	xtype:'excolumn',
	                    dataIndex:'TR_SENDDATE',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1.5,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	try{
	                    		var yy = value.substr(0,2);
		                    	var mm = value.substr(2,2);
		                    	var dd = value.substr(4,2);
		                    	var tt = value.substr(6,2);
		                    	var MM = value.substr(8,2);
		                    	var ss = value.substr(10,2);
		                    	return yy + "/" + mm + "/" + dd + " "+tt+ ":"+MM+":"+ss;
	                    	}catch (e) {}
	                    }
	                },{
	                	text:'실전송일',
	                	xtype:'excolumn',
	                    dataIndex:'DELIVER_DATE',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1.5,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	try{
	                    		var yy = value.substr(0,2);
		                    	var mm = value.substr(2,2);
		                    	var dd = value.substr(4,2);
		                    	var tt = value.substr(6,2);
		                    	var MM = value.substr(8,2);
		                    	var ss = value.substr(10,2);
		                    	
		                    	return yy + "/" + mm + "/" + dd + " "+tt+ ":"+MM+":"+ss;
	                    	}catch (e) {}
	                    	
	                    }
	                },{
	                	text:'',
	                	xtype:'excolumn',
	                    dataIndex:'TR_MSG_GB',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 0.2,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	try{
	                    		return value.substr(0,1);
	                    	}catch (e) {
								
							}
	                    	
	                    }
	                },{
	                	text:'상태',
	                	xtype:'excolumn',
	                    dataIndex:'TR_SENDSTAT',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex :1	
	                },{
	                	text:'번호',
	                	xtype:'excolumn',
	                    dataIndex:'TR_PHONE',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1.3,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(value.length == 11){
	                    		return value.substr(0,3) + "-" + "-" + value.substr(3,4) + "-" + value.substr(7,4)
	                    	}else if(value.length == 10){
	                    		return value.substr(0,3) + "-" + "-" + value.substr(3,3) + "-" + value.substr(6,4)
	                    	}else{
	                    		return value;
	                    	}
	                    }
	                },{
	                	text:'사찰',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_NM',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1.3,
	                },{
	                	text:'항목',
	                	xtype:'excolumn',
	                    dataIndex:'NAME',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1.2,	               
	                },{
	                	text:'신도번호',
	                	xtype:'excolumn',
	                    dataIndex:'BUD_NO',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1.3,
	                },{
	                	text:'메세지',
	                	xtype:'excolumn',
	                    dataIndex:'TR_MSG',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 2.3,
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});