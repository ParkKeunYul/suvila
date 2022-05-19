Ext.define('ExFrm.view.asp.asp022w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp022w_01',
	requires:[
		'ExFrm.view.asp.asp022w_01Controller',
        'ExFrm.view.asp.asp022w_01Model'
	],
	controller:'asp022w_01',
	viewModel:{
        type:'asp022w_01'
    },
    name:'asp022w_01',
    isRootView:true,
    title:'카드계정관리',
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
	    		flex : 1
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '저장',
	    	},{
	    		width : '0.5%'
	    	}]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{        	
	        	width : '25%',        	
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
               	 		width : 0,
	                },{
	                	xtype     : 'extextfield',
               	 		reference : 'txt_TEMPLE_CD',
               	 		name      : 'TEMPLE_CD',
               	 		width : 100
	                },{
	                	xtype     : 'extextfield',
               	 		reference : 'txt_PGCODE',
               	 		name      : 'PGCODE',
               	 		width : 100
	                },{
	                	xtype     : 'extextfield',
               	 		reference : 'txt_SMS_FORMAT',
               	 		name      : 'SMS_FORMAT',
               	 		width : 100
	                },{
          				 xtype:'extextfield',
                        reference:'hidden_TP_COMMISSION_TO',
                        exLabel:'숨김_적용기간',
                        name:'HIDDEN_TP_COMMISSION_TO',
                        value : '00000000',
                        inputType : 'hidden',
                        width : 0
               	 		
	                }]
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp022w_01_a',
	                height:820,              
	               bind:{
	                    store:'{ds_templeCd}'
	                },
	               /* selModel: {
	                    mode: 'MULTI'
	                },*/
	                cls : 'asp022w_01_a',
	                listeners: {
	                	selectionchange : 'onSelectionChange'
	                },
	                columns:[{
	                	text:'사찰코드',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_CD',                    
	                    exAlign:'left',
	                    flex : 2,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.data.USE_YN_CHAR == 'F'){
	                    		meta.style = 'background-color:#C8C8C8;';
	                    	}
	                    	return value;
	                    }
	                },{
	                	text:'사찰명',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_NM',                    
	                    exAlign:'left',
	                    flex : 3,
	                    editor:{
	                        xtype:'extextfield',
	                    },
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.data.USE_YN_CHAR == 'F'){
	                    		meta.style = 'background-color:#C8C8C8;';
	                    	}
	                    	return value;
	                    }
	                },{
	                	text:'사용',
	                	xtype:'excolumn',
	                    dataIndex:'CARD_YN',                    
	                    exAlign:'left',
	                    flex : 1.5,
	                    editor:{
	                        xtype:'extextfield',
	                    },
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.data.USE_YN_CHAR == 'F'){
	                    		meta.style = 'background-color:#C8C8C8;';
	                    	}
	                    	return value;
	                    }
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        },{
	        	width : '43%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            xtype:'exfieldsetblockbox',	            
	            items:[{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;font-weight:700;">CATID <span style="color:red;">*</span></div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextfield',
	                         reference:'txt_SUB1_TRADE_ID',
	                         exLabel  :'가맹점 대표ID',
	                         exMand   :true,
	                         width    : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;font-weight:700;">사업자등록번호<span style="color:red;">*</span></div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    : 'extextfield',
	                         reference: 'txt_SUB1_TRADE_PW',
	                         exLabel  : '가맹점대표PW',
	                         exMand   : true,	                         
	                         inputType: 'password',
	                         width    : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;font-weight:700;">Keyin MID <span style="color:red;">*</span></div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextfield',
	                         reference:'txt_SUB2_TRADE_ID',
	                         width    : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
            			html:'<div style="text-align:left;padding-left:5px;font-weight:700;">Keyin 취소비밀번호 <span style="color:red;">*</span></div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    : 'extextfield',
	                         reference: 'txt_SUB2_TRADE_PW',
	                         inputType: 'password',
	                         width    : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;font-weight:700;">Keyin 라이센스 <span style="color:red;">*</span></div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextfield',
	                         reference:'txt_KEYIN_LICENSE',
	                         width    : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;font-weight:700;">가맹점 대표ID</div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextfield',
	                         reference:'txt_REP_TRADE_ID',
	                         width    : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;font-weight:700;">가맹점대표PW</div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextfield',
	                         reference:'txt_REP_TRADE_PW',
	                         width    : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
            			html:'<div style="text-align:left;padding-left:5px;font-weight:700;">PG 수수료율  <span style="color:red;">*</span></div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextfield',
	                         reference:'txt_TP_RATE_COMMISSION',
	                         exLabel  :'PG 수수료율',
	                         exMand   :true,
	                         width    : 350,
	                         exAlign  : 'right'
	           			 },{
	           				 html :'%'
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
            			html:'<div style="text-align:left;padding-left:5px;font-weight:700;">적용기간  <span style="color:red;">*</span></div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype:'exdatefield',
	                         reference:'txt_TP_COMMISSION_FROM',
	                         exLabel:'적용기간',
	                         exMand:true,
	                         exFormat : 'Y/m/d',
	                         exSubmitFormat : 'Ymd',
	           			 },{
	           				 html :'~'
	           			 },{
	           				xtype:'exdatefield',
	                         reference:'txt_TP_COMMISSION_TO',
	                         exLabel:'적용기간',
	                         exFormat : 'Y/m/d',
	                         exSubmitFormat : 'Ymd',
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
            			html:'<div style="text-align:left;padding-left:5px;font-weight:700;">사용유무  <span style="color:red;">*</span></div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype     :'excombobox',
	                         reference :'lc_use_yn',
	                         exLabel   :'사용유무',
	                         exMand    :true,
	                         valueField:'value',
	                         displayField:'display',
	                         bind:{
	                          	store:'{ds_useYn}'
	                         },
	                         width    : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
            			html:'<div style="text-align:left;padding-left:5px;font-weight:700;">장비료  </div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextfield',
	                         reference:'txt_DEVICEPRICE',
	                         width   : 350,
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
            			html:'<div style="text-align:left;padding-left:5px;font-weight:700;">계정과목 등록  </div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextfield',
	                         reference:'txt_accname',
	                         exReadOnly:true,
	                         width    : 350,
	           			 },{
	           				 width : 5
	           			 },{
	           				 xtype : 'exbutton',
                			 text: '찾기',                			 
                			 name : 'khmFindBtn',
                			 reference : 'khmFindBtn',
                			 handler : 'onKhmFind'
	           			},{
		                	xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'txt_ACCT_GBN',
	               	 		width : 0
	           			},{
		                	xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'txt_IE_GBN',
	               	 		width : 0
	           			},{
		                	xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'txt_KWAN',
	               	 		width : 0
	           			},{
		                	xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'txt_HANG',
	               	 		width : 0
	           			},{
		                	xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'txt_MOK',
	               	 		name      : 'MOK',
	               	 		width : 0
	           			},{
		                	xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'txt_SQL_MODE',
	               	 		name      : 'SQL_MODE',
	               	 		width : 0
	                     }]
            		}]
	            },{
	            	xtype:'exblockrow',
            		items:[{
            			xtype:'exblocklabel',
            			html:'<div style="text-align:left;padding-left:5px;font-weight:700;">비고  </div>', 
                        flex : 1
            		},{
            			xtype:'exblockfield',
           			 	flex : 3,
	           			 items:[{
	                         xtype    :'extextarea',
	                         reference:'remark',
	                         exLabel  :'비고',
	                         name     :'REMARK',
	                         height   : 100,
	                         width    : 350,
	                     }]
            		}]
	            }] // exfieldsetblockbox
	        },{
	        	width : '0.5%',
	        },{
	        	width : '30%',
	        	exGroupRef:true,
                xtype:'exgrid',
                reference:'asp022w_01_b',
                height:820,              
               bind:{
                    store:'{ds_sub}'
                },
                columns:[{
                	text:'순번',
                	xtype:'rownumberer',
                    dataIndex:'TEMPLE_CD',                    
                    align:'center',
                    flex : 1,
                },{
                	text:'수수료(%)',
                	xtype:'excolumn',
                    dataIndex:'TP_RATE_COMMISSION',                    
                    exAlign:'right',
                    flex : 2,
                },{
                	text:'기간 FROM',
                	xtype:'excolumn',
                    dataIndex:'TP_COMMISSION_FROM',                    
                    exAlign:'center',
                    flex : 2
                    
                },{
                	text:'기간 TO',
                	xtype:'excolumn',
                    dataIndex:'TP_COMMISSION_TO',                    
                    exAlign:'center',
                    flex : 2
                }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});