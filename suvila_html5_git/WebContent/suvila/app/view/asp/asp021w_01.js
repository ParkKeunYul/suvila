Ext.define('ExFrm.view.asp.asp021w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp021w_01',
	requires:[
		'ExFrm.view.asp.asp021w_01Controller',
        'ExFrm.view.asp.asp021w_01Model'
	],
	controller:'asp021w_01',
	viewModel:{
        type:'asp021w_01'
    },
    name:'asp021w_01',
    isRootView:true,
    title:'카드PG관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
        	layout:'hbox',            
            height : 30,            
            items:[{
            	xtype:'extextfield',                	
            	labelWidth:70,
            	fieldLabel : 'PG사명 ',                
                reference:'txt_find_PgName',
                name:'SEARCH_PGNAME',
                enableKeyEvents: true,
                width : 270,  
                listeners:{
             	   keyup : 'onSearchEnter'
                }
            },{
            	width : 10
            },{
            	xtype : 'exbutton',
          		reference : 'selectBtn',
          		name : 'selectBtn',
          		handler : 'onSelect',
          		text:'조회'
            },{
            	width : 4
            },{
            	xtype : 'exbutton',
          		reference : 'addBtn',
          		name : 'addBtn',
          		handler : 'onAdd',
          		text:'신규'
            },{
            	width : 4
            },{
            	xtype : 'exbutton',
          		reference : 'saveBtn',
          		name : 'saveBtn',
          		handler : 'onSave',
          		text:'저장'
            },{
            	xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'txt_Commission_ToBase',
       	 		name      : 'COMMISSION_TO_BASE',
       	 		value     : '00000000',
       	 		width     : 0
            },{
            	xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'txt_sql_mode',
       	 		name      : 'SQL_MODE',
       	 		width     : 0
            },{
            	xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'txt_pg_code',
       	 		name      : 'PGCODE',
       	 		width     : 0
            },{
       	 		xtype : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'newData',
       	 		name : 'newData',
       	 		width : 0
       	 	},{
    	 		xtype : 'extextfield',
    	 		inputType : 'hidden',
    	 		reference : 'uptData',
    	 		name : 'uptData',
    	 		width : 0
       		},{
    	 		xtype : 'extextfield',
    	 		inputType : 'hidden',
    	 		reference : 'delData',
    	 		name : 'delData',
    	 		width : 0	
            },{
            	width : '0.5%'
            }] // container
        },{
        	layout:'hbox',
            xtype:'container',
            items:[{
            	width : '40%',
            	items:[{
            		exGroupRef:true,
                    xtype:'exgrid',
                    reference:'asp021w_01_a',
                    height:820,                              
                    bind:{
                        store:'{ds_main}'
                    },
                    cls : 'asp021w_01_a',
                    listeners: {
                    	selectionchange : 'onSelectionChange'
                    },
                    columns:[{
                    	text:'번호',                        
                        xtype:'rownumberer',
                        align:'center',
                        flex : 1
                    },{
                    	text:'PG코드',
                    	xtype:'excolumn',
                        dataIndex:'PGCODE',                    
                        exAlign:'center',
                        flex : 1,
                    },{
                    	text:'PG명',
                    	xtype:'excolumn',
                        dataIndex:'PGNAME',                    
                        exAlign:'left',
                        flex : 2,
                    },{
                    	text:'사용구분',
                    	xtype:'excolumn',
                        dataIndex:'USE_YN',                    
                        exAlign:'center',
                        flex : 2,
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_useTF');
                            var index = store.find('value',value);
                            if(index != -1){
                                return store.getAt(index).get('display');
                            }
                            else {
                                return value;
                            }                        	
                        }
                    }]
            	}]
            	
            },{
            	width : '0.5%',
            },{
            	width : '59%',
            	layout:{
                    type:'vbox',                    
                },
                items:[{
                	                
                	xtype:'exfieldsetblockbox',
                	width : '100%',
                	items:[{
                		xtype:'exblockrow',
                		items:[{
                			xtype:'exblocklabel',
                            html:'<div style="text-align:left;padding-left:5px;">PG명</div>'
                		},{
                			xtype:'exblockfield',
                			items:[{
                				 xtype:'extextfield',
                                 reference:'txt_PgName',
                                 exLabel:'PG명',
                                 exMand:true,
                                 name:'PGNAME'
                			}]
                		}]
                	},{
                		xtype:'exblockrow',
                		items:[{
                			xtype:'exblocklabel',
                            html:'<div style="text-align:left;padding-left:5px;">PG 수수료율</div>'
                		},{
                			xtype:'exblockfield',
                			items:[{
                				 xtype:'extextfield',
                                 reference:'txt_Rate_Commission',
                                 exLabel:'PG 수수료율',
                                 exMand:true,
                                 name:'RATE_COMMISSION'
                			}]
                		}]
                	},{
                		xtype:'exblockrow',
                		items:[{
                			xtype:'exblocklabel',
                            html:'<div style="text-align:left;padding-left:5px;">적용기간</div>'
                		},{
                			xtype:'exblockfield',
                			items:[{
                				xtype:'exdatefield',
                                reference:'txt_Commission_From',
                                exMand:true,
                                format : 'Y/m/d',
                                submitFormat : 'Ymd',
                                name:'COMMISSION_FROM'
                			},{
                				html : '<div style="text-align:center;">~</div>',            				
                				width : 50
                			},{
                				xtype:'exdatefield',
                                reference:'txt_Commission_To',
                                /*exMand:true,*/
                                format : 'Y/m/d',
                                name:'COMMISSION_TO'                                	
                			}]
                		}]
                	},{
                		xtype:'exblockrow',
                		items:[{
                			xtype:'exblocklabel',
                            html:'<div style="text-align:left;padding-left:5px;">비고</div>'
                		},{
                			xtype:'exblockfield',
                			items:[{
                				 xtype:'extextarea',
                    			 reference:'txt_remark',
                                 name:'REMARK',
                                 width : '100%'
                			}]
                		}]
                	},{
                		xtype:'exblockrow',
                		items:[{
                			xtype:'exblocklabel',
                            html:'<div style="text-align:left;padding-left:5px;">사용유무</div>'
                		},{
                			xtype:'exblockfield',
                			items:[{
                				xtype:'excombobox',
                				reference:'lc_use_yn',
                				value : 'T',
                				valueField:'value',
                                displayField:'display',
                                name : "USE_YN",
                				bind:{
                                 	store:'{ds_useTF}'
                                } 
                                
                			}]
                		}]
                	}] // 
                
                },{
                	exGroupRef:true,
                	xtype:'exgrid',
                    reference:'asp021w_01_b',
                    width : '100%',
                    height:300,
                    bind:{
                        store:'{ds_sub}'
                    }, 
                    cls : 'asp021w_01_b',
                    columns:[{
                    	text:'번호',                        
                        xtype:'rownumberer',
                        align:'center',
                        flex : 1
                    },{
                    	text:'PG명',
                    	xtype:'excolumn',
                        dataIndex:'PGNAME',                    
                        exAlign:'center',
                        flex : 3,
                    },{
                    	text:'수수료(%)',
                    	xtype:'excolumn',
                        dataIndex:'RATE_COMMISSION',                    
                        exAlign:'center',
                        flex : 3,
                    },{
                    	xtype:'excolumn',
                    	text:'기간 FROM',
                    	dataIndex:'COMMISSION_FROM',
                        exAlign:'center',
                        flex : 3,
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	var date = value.substr(0,4) + " / "+ value.substr(4,2) + " / " +  value.substr(6,2) 
                        	return date;
                        }
                    },{
                    	xtype:'excolumn',
                    	text:'기간 TO',
                    	dataIndex:'COMMISSION_TO',                                           
                        exAlign:'center',
                        flex : 3,
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	var date = value.substr(0,4) + " / "+ value.substr(4,2) + " / " +  value.substr(6,2) 
                        	return date;
                        }
                    }]
                }]
            },{
               width : '0.5%' 
            }]//
        }]
        
        
    }]/*exformmain*/ 
});