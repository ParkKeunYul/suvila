Ext.define('ExFrm.view.rec.rec014w_07',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec014w_07',
    requires:[
    	'ExFrm.view.rec.rec014w_07Controller'
    	,'ExFrm.view.rec.rec014w_07Model'    	
    ],
    controller:'rec014w_07',
    viewModel:{
        type:'rec014w_07'
    },
    name:'rec014w_07',
    isRootView:true,
    header:false,
    closable:false,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{ 
    	xtype:'exformmain',
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items :[{
        	width : '0.5%'
        },{
        	width  : '99%',
        	layout : 'vbox',
        	items  : [{
        		height : 1
        	},{
        		height : 1,
        	},{        		
        		width  : '100%',
        		height : 330,
        		items  : [{
        			height : 10
        		},{
        			reference    : 'deungGbn',
        			layout       : 'hbox',
        			items        : [{
        				flex   : 2,        				
        				items  : [{
        					reference : 'jungakBtnArea',
        					layout    : 'hbox',
        					width     : '100%',
    						items     : [{
    							html : '<img src="./resources/img/title/new_rec002w_10_t1.gif" height="25px" width="125px" >',
    						},{
    							flex : 1,
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onJungakSelectBtn',
                        		name      : 'onJungakSelectBtn',
                        		handler   : 'onJungakSelectBtn',	            		
                        		text      : '조회',
                        		iconCls   : 'fa fa-search'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onJungakAddBtn',
                        		name      : 'onJungakAddBtn',
                        		handler   : 'onJungakAddBtn',	            		
                        		text      : '신규',
                        		iconCls   : 'fa fa-plus'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onJungakSaveBtn',
                        		name      : 'onJungakSaveBtn',
                        		handler   : 'onJungakSaveBtn',	            		
                        		text      : '저장',
                        		iconCls   : 'fa fa-save',
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
        					height        : 5
        				},{
        					exGroupRef    : true,
                            xtype         : 'exgrid',
                            reference     : 'mg_jungak',
                            cls           : 'none-dirty-grid',
                            height        : 280,
                           // width         : '98%',
                            bind          : {
                                store:'{ds_jungak}'
                            },
                            plugins     : [{
        	                	ptype:'cellediting',
        	               // 	clicksToEdit: 1
        	                }],
        	                listeners   : {
                                selectionchange : 'onSelectionJungak',
                            },
                            columns:[{
                            	text        : '순번',
                                xtype       : 'rownumberer',
                                flex        : 1.5,
                                align       : 'center', 
                            },{
                            	text        : '전각명',
                            	xtype       : 'excolumn',
                                dataIndex   : 'JUNGAK_NM',                    
                                exAlign     : 'left',
                                flex        : 5,
                                editor      : {
                                	xtype      : 'extextfield',
                                }
                            },{
                            	text        : '사용유무',
                                xtype       : 'excheckcolumn',
                                dataIndex   : 'USE_YN',
                                width       : 90,
                                align       : 'center',
                                flex        : 2.5,
                            }]
        				}]
        			},{
        				width : 5
        			},{
        				flex : 2,        				
        				items : [{
        					reference : 'deungBtnArea',
        					layout    : 'hbox',
        					width     : '100%',
    						items     : [{
    							html : '<img src="./resources/img/title/new_rec002w_10_t2.gif" height="25px" width="191px" >',
    						},{
    							flex : 1
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onDeungSelectBtn',
                        		name      : 'onDeungSelectBtn',
                        		handler   : 'onDeungSelectBtn',	            		
                        		text      : '조회',
                        		iconCls   : 'fa fa-search'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onDeungAddBtn',
                        		name      : 'onDeungAddBtn',
                        		handler   : 'onDeungAddBtn',	            		
                        		text      : '신규',
                        		iconCls   : 'fa fa-plus'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onDeungSaveBtn',
                        		name      : 'onDeungSaveBtn',
                        		handler   : 'onDeungSaveBtn',	            		
                        		text      : '저장',
                        		iconCls   : 'fa fa-save',
                		    }]
        				},{
        					height        : 5
        				},{
        					exGroupRef    : true,
                            xtype         : 'exgrid',
                            reference     : 'mg_grade',
                            cls           : 'none-dirty-grid',
                            height        : 280,
                           // width         : '98%',
                            bind          : {
                                store:'{ds_grade}'
                            },
                            plugins     : [{
        	                	ptype:'cellediting',
        	                //	clicksToEdit: 1
        	                }],
        	                listeners      : {
        	                	celldblclick    : 'onCellDbClickDeung',
        	                	selectionchange : 'onSelectionDeung',
                            },
                            columns:[{
                            	text        : '순번',
                                xtype       : 'rownumberer',
                                flex        : 1,
                                align       : 'center', 
                            },{
                            	text        : '등급명',
                            	xtype       : 'excolumn',
                                dataIndex   : 'LIGHT_NM',                    
                                exAlign     : 'left',
                                flex        : 2,
                                editor      : {
                                	xtype      : 'extextfield',
                                }
                            },{
                            	text        : '사용',
                                xtype       : 'excheckcolumn',
                                dataIndex   : 'USE_YN',
                                flex        : 1,
                                exAlign     : 'center',
                            
                            },{
                            	text        : '계정과목',
                                xtype       : 'excolumn',
                                dataIndex   : 'ACCNAME',
                                flex        : 2,
                                exAlign     : 'left',
                            }]
        				}]
        			}]
        		}]
        	},{
        		height : 5,
        	},{
        		width  : '100%',
        		height : 465,
        		items  : [{        			
        			height : 30,
        			layout : 'hbox',
        			items  : [{
        				xtype           : 'extextfield',
                        reference       : 'txt_find_user_nm',
                        value           : '',
                        enableKeyEvents : true,
                        width           : 200 ,
                        fieldLabel      : '<span style="font-weight: 700;">신도명</span>',
                		labelWidth      : 60,
                        listeners       : {
                     	   keyup : 'onMovingEnter'
                        }
        			},{
        				width : 5
        			},{
        				xtype     : 'exbutton',
                		reference : 'onMovingSelectBtn',
                		name      : 'onMovingSelectBtn',
                		handler   : 'onMoving',	            		
                		text      : '찾기',
                		iconCls   : 'fa fa-search'
        			}]
        		},{
        			height : 30,
        			layout : 'hbox',
        			items  : [{
        				xtype           : 'extextfield',
                        reference       : 'txt_jungak_nm',
                        value           : '',
                        enableKeyEvents : true,
                        width           : 200 ,
                        fieldLabel      : '<span style="font-weight: 700;">전각명</span>',
                		labelWidth      : 60,
                		exReadOnly      : true  
        			},{
        				width : 5
        			},{
        				xtype           : 'extextfield',
                        reference       : 'me_verti',
                        value           : '',
                        enableKeyEvents : true,
                        width           : 130 ,
                        fieldLabel      : '<span style="font-weight: 700;color:red;">열겟수</span>',
                		labelWidth      : 60,
                		exType          : 'number'
                		//exReadOnly      : true
        			},{
        				width : 5
        			},{
        				xtype           : 'extextfield',
                        reference       : 'me_horiz',
                        value           : '',
                        enableKeyEvents : true,
                        width           : 130 ,
                        fieldLabel      : '<span style="font-weight: 700;color:blue;">행겟수</span>',
                		labelWidth      : 60,
                		exType          : 'number'
                		//exReadOnly      : true
        			},{
        				width : 5
            		},{
            			xtype     : 'exbutton',
                		reference : 'onExecBtn',
                		name      : 'onExecBtn',
                		handler   : 'onExec',	            		
                		text      : '생성',
                		iconCls   : 'fa fa-plus'
            		},{
        				width : 5
            		},{
            			xtype     : 'exbutton',
                		reference : 'onAllClearBtn',
                		name      : 'onAllClearBtn',
                		handler   : 'onAllClear',	            		
                		text      : '전체소등',
                		iconCls   : 'fa fa-check'
            		},{
        				flex : 1
        			},{
        				
        				layout: 'hbox',
        				items :[{
        					html : '<img src="./resources/img/bg/light_gbn_popup.gif" height="19px" width="486px" >',
        				}]
        			}]
        		},{
        			layout : 'hbox',
        			width  : '100%',
        			height : 425,
        			items  : [{
        				reference : 'leftGrid',
        				flex      : 3,
        				items     : [{
        					width      : '100%',
                     		exGroupRef : true,
                            xtype      :'exgrid',
                            reference  :'rec000p_03_a',
                            cls        :'rec000p_03_a',
                            height     : 400,
                            align      : 'center',                    
                            bind:{
                                store:'{ds_crossLight}'
                            },                 
                            listeners:{
                            	cellclick      :  'onLightClick',
                            	//celldblclick : 'onCellDbClick',
                            	itemcontextmenu : 'onCrossLineClick'
                            },
                            columns:[{                   
                            	text  :'행/열',
                                xtype :'rownumberer',
                                width : 70,
                                align : 'center',
                            }]   
        				}]
        			},{
        				width : 5
        			},{
        				flex   : 2,
        				layout : 'vbox',
        				items  : [{
        					xtype    :'exfieldsetblockbox',
        					width    : '100%',
        					items    : [{
        						xtype:'exblockrow',
        	                    items:[{
        	                    	xtype   : 'exblocklabel',
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">전각명</div>'
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		xtype      : 'extextfield',
        	                    		reference  : 'txt_sindo_jungak_nm',
       	                             	width      : '100%',
       	                             	exReadOnly : true
        	                    	}]
        	                    }]
        					},{
        						xtype:'exblockrow',
        	                    items:[{
        	                    	xtype   : 'exblocklabel',
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">탑번</div>'
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		xtype      : 'extextfield',
        	                    		reference  : 'txt_sindo_light_no',
       	                             	width      : '100%',
       	                             	exReadOnly : true
        	                    	}]
        	                    }]
        					},{
        						xtype:'exblockrow',
        	                    items:[{
        	                    	xtype   : 'exblocklabel',
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신도번호</div>'
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		xtype      : 'extextfield',
        	                    		reference  : 'txt_sindo_proposal_bud_no',
       	                             	width      : '100%',
       	                             	exReadOnly : true
        	                    	}]
        	                    }]
        					},{
        						xtype:'exblockrow',
        	                    items:[{
        	                    	xtype   : 'exblocklabel',
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신청자</div>'
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		xtype      : 'extextfield',
        	                    		reference  : 'txt_sindo_bud_name',
       	                             	width      : '100%',
       	                             	exReadOnly : true
        	                    	}]
        	                    }]
        					},{
        						xtype:'exblockrow',
        	                    items:[{
        	                    	xtype   : 'exblocklabel',
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">납부금액</div>'
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		xtype      : 'extextfield',
        	                    		reference  : 'me_payment_amt',
       	                             	width      : '100%',
       	                             	exReadOnly : true,
       	                             	exAlign     : 'right',
       	                                exNumberComma : true,
       	                                
        	                    	}]
        	                    }]
        					},{
        						xtype:'exblockrow',
        	                    items:[{
        	                    	xtype   : 'exblocklabel',
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">미수금액</div>'
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		xtype      : 'extextfield',
        	                    		reference  : 'me_misu_amt',
       	                             	width      : '100%',
       	                             	exReadOnly : true,
       	                             	exAlign     : 'right',
       	                             	exNumberComma : true
        	                    	}]
        	                    }]
        					}]
        				},{
        					width      : '100%',
                     		exGroupRef : true,
                            xtype      :'exgrid',
                            reference  :'rec000p_03_c',
                            cls        :'rec000p_03_a',
                            height     : 210,
                            align      : 'center',                    
                            bind:{
                                store:'{ds_sindoInfo}'
                            },                 
                            columns:[{                   
                            	text        : '위치',
                            	xtype       : 'excolumn',
                                dataIndex   : 'JUNGAK_NM',                    
                                exAlign     : 'left',
                                width       : 100            
                            },{
                            	text        : '탑번',
                            	xtype       : 'excolumn',
                                dataIndex   : 'LIGHT_NO',                    
                                exAlign     : 'center',
                                width       : 80 
                            },{
                            	text        : '신도번호',
                            	xtype       : 'excolumn',
                                dataIndex   : 'PROPOSAL_BUD_NO',                    
                                exAlign     : 'center',
                                width       : 120 
                            },{
                            	text        : '신도명',
                            	xtype       : 'excolumn',
                                dataIndex   : 'BUD_NAME',                    
                                exAlign     : 'left',
                                width       : 100 
                            },{
        	                	text        : '접수금액',
        	                	xtype       : 'excolumn',
        	                    dataIndex   : 'PAYMENT_PLAN_AMT',                    
        	                    exAlign     : 'right',
        	                    width       : 110,
        	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
        	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
        	                    },
        	                },{
        	                	text        : '납부금액',
        	                	xtype       : 'excolumn',
        	                    dataIndex   : 'PAYMENT_AMT',                    
        	                    exAlign     : 'right',
        	                    width       : 110,
        	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
        	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
        	                    },
        	                },{
        	                	text        : '미수금액',
        	                	xtype       : 'excolumn',
        	                    dataIndex   : 'MISU_AMT',                    
        	                    exAlign     : 'right',
        	                    width       : 110,
        	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
        	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
        	                    },
                            }]
        				}]
        			}]
        		}]
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
