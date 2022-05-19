Ext.define('ExFrm.view.asp.asp010w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp010w_01',
	requires:[
		'ExFrm.view.asp.asp010w_01Controller',
        'ExFrm.view.asp.asp010w_01Model'
	],
	controller:'asp010w_01',
	viewModel:{
        type:'asp010w_01'
    },
    name:'asp010w_01',
    isRootView:true,
    title:'기부금영수증관리',
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
          		reference : 'inputBtn',
          		name      : 'inputBtn',
          		handler   : 'onInput',
          		text      : '신규',
	    	},{
	    		width : 5
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
	        	width : '36%',        	
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
	                reference:'asp010w_01_a',
	                height:820,              
	               bind:{
	                    store:'{ds_templeCd}'
	                },
	               /* selModel: {
	                    mode: 'MULTI'
	                },*/
	                cls : 'asp010w_01_a',
	                listeners: {
	                	selectionchange : 'onSelectionChange'
	                },
	                columns:[{
	                	text:'순번',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    flex : 1,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.data.USE_YN_CHAR == 'F'){
	                    		meta.style = 'background-color:#C8C8C8;';
	                    	}
	                    	return (rowIndex+1);
	                    }
	                },{
	                	text:'사찰번호',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_CD',                    
	                    exAlign:'center',
	                    flex : 1.5,
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
	                	text:'사용수',
	                	xtype:'excolumn',
	                    dataIndex:'USE_YN',                    
	                    exAlign:'center',
	                    flex : 1.5,
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
	        	width : '63%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'	                
	            },
	            items:[{
                	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp010w_01_b',                
	                height:220,
	                bind:{
	                    store:'{ds_main}'
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                listeners: {
	                	selectionchange : 'onSelectionCms'
	                },
	                columns:[{
	                	text:'더빌거래사코드',
	                	xtype:'excolumn',
	                    dataIndex:'NEW_CMS_TRADE_CD',                    
	                    exAlign:'left',
	                    flex : 1
	                },{
	                	text:'올더게이트 거래사코드',
	                	xtype:'excolumn',
	                    dataIndex:'CMS_TRADE_CD',                    
	                    exAlign:'left',
	                    flex : 1,
	                }]
	            },{
	            	xtype:'exfieldsetblockbox',
	            	items:[{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">더빌 계정 ID (거래사코드) <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			 xtype:'exblockfield',
	            			 flex : 2,
	            			 items:[{
	                             xtype:'extextfield',
	                             reference:'txt_new_cms_trade_cd',
	                             exLabel:'더빌 계정 ID (거래사코드)',
	                             exMand:true,
	                             name:'NEW_CMS_TRADE_CD'
	            			 },{
	            				html : '<div style="color:red;padding-left:5px;"> CMS 모듈 변경된 &quot;더빌&quot;의 숫자로만 이루어진 아이디 </div>'
	                         }]
	            		},{
	            			xtype:'extextfield',
	                       	 width : 0,
	                       	 reference:'select_temple_cd',
	                       	 name:'TEMPLE_CD',
	                       	 inputType : 'hidden'
	            		},{
	            			xtype:'extextfield',
	                       	 width : 0,
	                       	 reference:'select_customer_comment',
	                       	 name:'CMS_CUSTOMER_COMMENT',
	                       	 inputType : 'hidden'
	            		},{
	            			xtype:'extextfield',
	                       	 width : 0,
	                       	 reference:'select_sql_mode',
	                       	 name:'SQL_MODE',
	                       	 inputType : 'hidden'
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">계정 ID (거래사코드) <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			 xtype:'exblockfield',
	            			 flex : 2,
	            			 items:[{
	                             xtype:'extextfield',
	                             reference:'txt_cms_trade_cd',
	                             exLabel:'계정 ID (거래사코드)',
	                             exMand:true,
	                             name:'CMS_TRADE_CD'
	            			 },{
		            				html : '<div style="color:red;padding-left:5px;"> &quot;올더게이트&quot;에서 사용한 ID(사찰에서는 올더게이트용으로 노출됩니다.) </div>'
	                         }]
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">계정 비밀번호 <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			 xtype:'exblockfield',
	            			 flex : 2,
	            			 items:[{
	                             xtype:'extextfield',
	                             reference:'pw_cms_trade_pw',
	                             exLabel:'계정 비밀번호',
	                             exMand:true,
	                             name:'CMS_TRADE_PW',
	                             inputType: 'password',
	                         }]
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">CMS 가입비 <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			 xtype:'exblockfield',
	            			 flex : 2,
	            			 items:[{
	                             xtype:'extextfield',
	                             reference:'em_cms_entrance_fee',
	                             exLabel:'CMS 가입비',
	                             exMand:true,
	                             name:'CMS_ENTRANCE_FEE',
	                             exType : 'number'
	                         }]
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">미납 출금 방식 <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			 xtype:'exblockfield',
	            			 flex : 2,
	            			 items:[{
	                             xtype:'excombobox',
	                             reference:'lc_misu_method',	 
	                             name:'MISU_METHOD',
	                             valueField:'CODE',
	                             displayField:'NAME',
	                             bind:{
	                             	store:'{ds_misu_method}'
	                             }
	                         }]
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">월출금한도금액 <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			 xtype:'exblockfield',
	            			 flex : 2,
	            			 items:[{
	                             xtype:'extextfield',
	                             reference:'em_month_limit_amount',
	                             exLabel:'월출금한도금액',
	                             exMand:true,
	                             name:'MONTH_LIMIT_AMOUNT',
	                             exType : 'number'
	                         }]
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">건당최대이체금액 <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			 xtype:'exblockfield',
	            			 flex : 2,
	            			 items:[{
	                             xtype:'extextfield',
	                             reference:'em_once_max_amount',
	                             exLabel:'건당최대이체금액',
	                             exMand:true,
	                             name:'ONCE_MAX_AMOUNT',
	                             exType : 'number'
	                         }]
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">사용구분 <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			 xtype:'exblockfield',
	            			 flex : 2,
	            			 items:[{
	                             xtype:'excombobox',
	                             reference:'lc_use_yn',
	                             name:'USE_YN_FIELD',
	                             valueField:'value',
	                             displayField:'display',
	                             bind:{
	                             	store:'{use_yn}'
	                             }
	                         }]
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">비고</div>', 
	                        flex : 1,
	                        height : 100
	            		},{
	            			xtype:'exblockfield',
	            			flex : 2,
	                		items:[{
	                			 xtype:'extextarea',
	                			 reference:'txt_remark',
	                             name:'REMARK',
	                             width : '100%',
	                             height : 100
	                		}]
	            		}]
	            	},{
	            		xtype:'exblockrow',
	            		items:[{
	            			xtype:'exblocklabel',
	            			html:'<div style="text-align:left;padding-left:5px;">출금일 관리 <span style="color:red;">*</span></div>', 
	                        flex : 1
	            		},{
	            			xtype:'exblockfield',
	            			flex : 2,
	            			items:[{
	            				exGroupRef:true,
	        	                xtype:'exgrid',
	        	                reference:'asp010w_01_c',                
	        	                height:200,
	        	                width : '100%',
	        	                bind:{
	        	                    store:'{ds_payDay}'
	        	                },
	        	                plugins:[{
	        	                    ptype:'cellediting'
	        	                }],
	        	                listeners: {
	        	                   
	        	                },
	        	                columns:[{
	        	                	text:'출금일',
	        	                	xtype:'excolumn',
	        	                    dataIndex:'CMS_PAYMENT_DAY',                    
	        	                    exAlign:'center',
	        	                    flex : 1
	        	                },{
        	                    	text:'출금방식',
        		                	xtype:'excolumnwidgetcombo',
        		                    dataIndex:'CMS_REQUEST_GBN',                    
        		                    exAlign:'center',
        		                    exValueField:'CODE',
        		                    exDisplayField:'NAME',
        		                    flex : 1.5,
        		                    exBindStore:'ds_payment_day_gbn'	
	        	                    	
	        	                },{
	        	                	text:'비고',
	        	                	xtype:'excolumn',
	        	                    dataIndex:'REMARK',                    
	        	                    exAlign:'center',
	        	                    flex : 3
	        	                }]
	            			}]
	            		}]
	            	}]// exfieldsetblockbox
                }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});