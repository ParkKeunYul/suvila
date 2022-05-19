Ext.define('ExFrm.view.rec.rec002w_10',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_10',
    requires:[
    	'ExFrm.view.rec.rec002w_10Controller',
        'ExFrm.view.rec.rec002w_10Model'
    ],
    controller:'rec002w_10',
    viewModel:{
        type:'rec002w_10'
    },
    name:'rec002w_10',
    isRootView:true,
    //title:'상시접수조회',
    header:false,
    //closable:true,
    closable:false,
    scrollable:true,
    layout:{
        type:'hbox',
        align:'stretch'
    },
    items:[{           
    	xtype:'exformmain',     
        layout:{
            type:'vbox',
            align:'stretch',            
        },
        width : '100%',
        items :[{
        	height : 330,
        	layout : 'hbox',        	
        	items  :[{
        		width  : '49.9%',
        		layout : 'vbox',
        		items  : [{        			
        			layout : 'hbox',
        			/*width  : '100%',*/
        			items  : [{
        				flex : 1,
        				html : '불사목록/등록'
        			},{
        			    width : 5
        			},{
        				xtype     : 'exbutton',
        			    text      : '조회' ,
                		reference : 'selectBtn1',
                		name      : 'selectBtn1',
                		handler   : 'onSelect1',
        			},{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '신규' ,
                		reference : 'addBtn1',
                		name      : 'addBtn1',
                		handler   : 'onAdd1',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '삭제' ,
                		reference : 'delBtn1',
                		name      : 'delBtn1',
                		handler   : 'onDel1',
        			},{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '저장' ,
                		reference : 'saveBtn1',
                		name      : 'saveBtn1',
                		handler   : 'onSave1',
        		    },{
            			width : 0,
            			heigth: 0,
            			items : [{
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
        	    		}]
        			}]
        		},{
        			height : 5
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_10_a',
                    cls           : 'none-dirty-grid',
                    height        : 290,
                    	width         : '99%',
                    bind          : {
                        store:'{ds_General}'
                    },
                    plugins     : [{
                    	ptype:'cellediting'
                    }],
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                listeners      : {
                        celldblclick    : 'onCellDbClick1',
                    },
	                columns:[{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        flex        : 1,
                        align       : 'center', 
	                },{
                    	text        : '불사명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_NM',                    
                        exAlign     : 'left',
                        flex        : 3,
                        editor      : {
                        	xtype         : 'extextfield',
                        }
	                },{
                    	text        : '계정과목',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACCNAME',                    
                        exAlign     : 'left',
                        flex        : 3,
	                },{
                    	text        : '비고',
                    	xtype       : 'excolumn',
                        dataIndex   : 'REMARK',                    
                        exAlign     : 'left',
                        flex        : 2,
                    }]
        		}]
        	},{
        		width : '0.2%'
        	},{
        		width  : '49.9%',
        		layout : 'vbox',
        		items  : [{
        			layout : 'hbox',
        			/*width  : '100%',*/
        			items  : [{
        				flex : 1,
        				html : '불사목록/등록'
        			},{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '신규' ,
                		reference : 'addBtn2',
                		name      : 'addBtn2',
                		handler   : 'onAdd2',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '삭제' ,
                		reference : 'delBtn2',
                		name      : 'delBtn2',
                		handler   : 'onDel2',
        			},{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '저장' ,
                		reference : 'saveBtn2',
                		name      : 'saveBtn2',
                		handler   : 'onSave2',        		    
        			}]
        		},{
        			height : 5
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_10_b',
                    cls           : 'none-dirty-grid',
                    height        : 290,
                    	width         : '99%',
                    bind          : {
                        store:'{ds_Detail}'
                    },
                    plugins     : [{
                    	ptype:'cellediting'
                    }],
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],	                
	                columns:[{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        flex        : 0.8,
                        align       : 'center', 
	                },{
                    	text        : '불사명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_NM',                    
                        exAlign     : 'left',
                        flex        : 2.6,
                        editor      : {
                        	xtype         : 'extextfield',
                        }
	                },{
                    	text        : '내역',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_DETAIL',                    
                        exAlign     : 'left',
                        flex        : 2,
	                },{
                    	text        : '금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'AMOUNT',                    
                        exAlign     : 'left',
                        flex        : 1.4,
	                },{
                    	text        : '사용',
                    	xtype       : 'excolumn',
                        dataIndex   : 'USE_YN',                    
                        exAlign     : 'left',
                        flex        : 1,
	                },{
                    	text        : '비고',
                    	xtype       : 'excolumn',
                        dataIndex   : 'REMARK',                    
                        exAlign     : 'left',
                        flex        : 2.4,
                    }]
        		}]
        	}]
        },{
        	height : 5
        },{
        	layout : 'hbox',
        	items  : [{
				html : '불사목록/등록'
			},{
			    width : 5
		    },{
		    	xtype     : 'exbutton',
			    text      : '조회' ,
        		reference : 'selectBtn3',
        		name      : 'selectBtn3',
        		handler   : 'onSelect3',
			},{
			    width : 5
		    },{
			    xtype     : 'exbutton',
			    text      : '신규' ,
        		reference : 'addBtn3',
        		name      : 'addBtn3',
        		handler   : 'onAdd3',
		    },{
			    width : 5
		    },{
			    xtype     : 'exbutton',
			    text      : '삭제' ,
        		reference : 'delBtn3',
        		name      : 'delBtn3',
        		handler   : 'onDel3',
			},{
			    width : 5
		    },{
			    xtype     : 'exbutton',
			    text      : '저장' ,
        		reference : 'saveBtn3',
        		name      : 'saveBtn3',
        		handler   : 'onSave3',     		    
			}]
        },{
        	height : 5
        },{
        	//ds_Ing
        }]
        
    }]
});
