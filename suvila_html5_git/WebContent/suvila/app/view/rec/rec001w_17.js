Ext.define('ExFrm.view.rec.rec001w_17',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec001w_17',
    requires:[
    	'ExFrm.view.rec.rec001w_17Controller'
    	,'ExFrm.view.rec.rec001w_17Model'    	
    ],
    controller:'rec001w_17',
    viewModel:{
        type:'rec001w_17'
    },
    name:'rec001w_17',
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
        	},{
    	    	html : '<div id="rec001w_17" class="find_addr_layer_pop" style="display:none;position:fixed;overflow:hidden;z-index:3;-webkit-overflow-scrolling:touch;top:400px;left:600px;" width="409" height="129"><img src="./resources/img/rec/loading.png" width="409" height="129"></div>'
    	    	//html : '<img src="./resources/img/title/new_rec002w_10_t2.gif" height="25px" width="191px" >',
        	},{
        		height : 1
        	},{
        		hidden: true,
        		width : '100%',
        		items :[{
        			xtype        : 'radiogroup',
        			reference    : 'rdo_ApprovalGbn',
        			name         : 'rdo_ApprovalGbn',
        			width        : 210,
        			listeners    : {
        				change : 'onDeungChange'
        			},
            		items     :[{
        				boxLabel   : '연등', 
        				inputValue : 4,    
                    	width      : 60,
                    	reference  : 'rdo_ApprovalGbn3',
                    	checked    : true
        			}]
        		}]
        	},{
        		height : 1,
        	},{        		
        		width  : '100%',
        		height : 400,
        		items  : [{
        			reference    : 'deungGbn',
        			layout       : 'hbox',
        			items        : [{
        				flex   : 1,        				
        				items  : [{
        					reference : 'jungakTab',
        					layout    : 'hbox',
        					width     : '100%',
        					items          :[{
        						flex     : 1,
        						//html     : '전각구분/설정',
        						html : '<img src="./resources/img/title/new_rec002w_10_t1.gif" height="25px" width="125px" >',
        					},{
        						items :[{
        		        			xtype        : 'radiogroup',
        		        			reference    : 'jungakGbn',
        		        			name         : 'jungakGbn',
        		        			width        : 150,
        		        			listeners    : {
        		        				change : 'onJungakChange'
        		        			},
        		            		items     :[{
        		        				boxLabel   : '내부등', 
        		                        inputValue : 'I',    
        		                    	width      : 75,
        		                    	reference  : 'jungakGbn1',
        		                    	checked    : true                    	
        		        			},{
        		        				boxLabel   : '외부등', 
        		        				inputValue : 'O',    
        		                    	width      : 75,
        		                    	reference  : 'jungakGbn2',
        		        			}]
        		        		}]
                		    },{
                			    width : 5	
        					}]
        					
        				},{
        					reference : 'jungakBtnArea',
        					layout    : 'hbox',
        					width     : '100%',
    						items     : [{
    							flex : 1
    						},{
                	    		xtype     : 'exbutton',
                        		handler   : 'onJungakUp',
                        		iconCls   : 'fa fa-angle-up',
                		    },{
                			    width : 5
                		    },{
                			    xtype     : 'exbutton',
                        		handler   : 'onJungakDown',	            		
                        		iconCls   : 'fa fa-angle-down',
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		handler   : 'onJungakSelectBtn',	            		
                        		text      : '조회',
                        		iconCls   : 'fa fa-search'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		handler   : 'onJungakAddBtn',	            		
                        		text      : '신규',
                        		iconCls   : 'fa fa-plus'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		handler   : 'onJungakSaveBtn',	            		
                        		text      : '저장',
                        		iconCls   : 'fa fa-save',
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		handler   : 'onJungakCancelBtn',	            		
                        		text      : '취소',
                        		iconCls   : 'fa fa-times'
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
                            height        : 330,
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
        					reference : 'deungTab',
        					layout    : 'hbox',
        					width     : '100%',
        					items     : [{
        						flex   : 1,
        						layout : 'hbox',
        						//height : 29,
        						items  : [{
        							reference : 'deungImg2',
        							html : '<img src="./resources/img/title/new_rec002w_10_t3.gif" height="25px" width="191px" >',
        						}]
                		    },{
                			    width : 5	
        					}]
        				},{
        					reference : 'deungBtnArea',
        					layout    : 'hbox',
        					width     : '100%',
    						items     : [{
    							flex : 1
    						},{
                	    		xtype     : 'exbutton',
                        		handler   : 'onDeungUp',
                        		iconCls   : 'fa fa-angle-up',
                		    },{
                			    width : 5
                		    },{
                			    xtype     : 'exbutton',
                        		handler   : 'onDeungDown',	            		
                        		iconCls   : 'fa fa-angle-down',
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		handler   : 'onDeungSelectBtn',	            		
                        		text      : '조회',
                        		iconCls   : 'fa fa-search'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		handler   : 'onDeungAddBtn',	            		
                        		text      : '신규',
                        		iconCls   : 'fa fa-plus'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		handler   : 'onDeungSaveBtn',	            		
                        		text      : '저장',
                        		iconCls   : 'fa fa-save',
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		handler   : 'onDeungCancelBtn',	            		
                        		text      : '취소',
                        		iconCls   : 'fa fa-times'
                		    }]
        				},{
        					height        : 5
        				},{
        					exGroupRef    : true,
                            xtype         : 'exgrid',
                            reference     : 'mg_grade',
                            cls           : 'none-dirty-grid',
                            height        : 330,
                           // width         : '98%',
                            bind          : {
                                store:'{ds_grade}'
                            },
                            plugins     : [{
        	                	ptype:'cellediting',
        	                	clicksToEdit: 1
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
                            	text        : '금액',
                            	exType      : 'excolumn',
                                dataIndex   : 'AMOUNT',                    
                                align       : 'right',
                                flex        : 1.2,
                                editor      : {
                                	xtype      : 'extextfield',
                                },
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	return exCommon.setNumberFormat(value);
                                }
                            },{
                            	text        : '동참',
                                xtype       : 'excheckcolumn',
                                dataIndex   : 'FAMILY_YN',
                                flex        : 1,
                                exAlign     : 'center',
                                listeners   : {
                                	beforecheckchange : 'checkGradeYn',	                                
                                }
                            },{
                            	text        : '영가',
                                xtype       : 'excheckcolumn',
                                dataIndex   : 'DEATH_YN',
                                flex        : 1,
                                exAlign     : 'center',
                                listeners   : {
                                	beforecheckchange : 'checkGradeYn',	                                
                                }
                            },{
                            	text        : '사용',
                                xtype       : 'excheckcolumn',
                                dataIndex   : 'USE_YN',
                                flex        : 1,
                                exAlign     : 'center',
                            },{
                            	text        : '기간',
                                xtype       : 'excolumn',
                                dataIndex   : 'PERIOD',
                                flex        : 1,
                                exAlign     : 'right',
                                editor      : {
                                	xtype      : 'extextfield',
                                }
                            },{
                            	text        : '계정과목',
                                xtype       : 'excolumn',
                                dataIndex   : 'ACCNAME',
                                flex        : 2,
                                exAlign     : 'left',
                            }]
        				}]
        			},{
        				width : 5
        			},{
        				flex : 1,
        				items : [{
        					html : '<img src="./resources/img/title/rec002w_10_t1.gif" height="25px" width="105px" >',
        				},{
        					reference : 'amountBtnArea',
        					layout    : 'hbox',
        					width     : '100%',
    						items     : [{
    							flex : 1
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onAmountAddBtn',
                        		name      : 'onAmountAddBtn',
                        		handler   : 'onAmountAddBtn',	            		
                        		text      : '신규',
                        		iconCls   : 'fa fa-plus'
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onAmountSaveBtn',
                        		name      : 'onAmountSaveBtn',
                        		handler   : 'onAmountSaveBtn',	            		
                        		text      : '저장',
                        		iconCls   : 'fa fa-save',
                		    },{
                			    width : 5
                		    },{
                		    	xtype     : 'exbutton',
                        		reference : 'onAmountCancelBtn',
                        		name      : 'onAmountCancelBtn',
                        		handler   : 'onAmountCancelBtn',	            		
                        		text      : '취소',
                        		iconCls   : 'fa fa-times'
                		    }]
        				},{
        					height : 5
        				},{
        					exGroupRef    : true,
                            xtype         : 'exgrid',
                            reference     : 'mg_amount',
                            cls           : 'none-dirty-grid',
                            height        : 330,
                           // width         : '98%',
                            bind          : {
                                store:'{ds_amount}'
                            },
                            plugins     : [{
        	                	ptype:'cellediting',
        	                	//clicksToEdit: 1
        	                }],
        	                listeners      : {
        	                	//celldblclick : 'onCellDbClickDeung',
                            },
                            columns:[{
                            	text        : '시작월',
                            	xtype       : 'excolumn',
                                dataIndex   : 'START_YYYYMM',                    
                                exAlign     : 'center',
                                flex        : 1.2,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	return exCommon.setDateFormat2(value);
                                }
                            },{
                            	text        : '종료월',
                            	xtype       : 'excolumn',
                                dataIndex   : 'END_YYYYMM',                    
                                exAlign     : 'center',
                                flex        : 1.2,
                                editor      : {
                                	xtype      : 'extextfield',
                                },
                            	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            		return exCommon.setDateFormat2(value);
                            	}
                            },{
                            	text        : '금액',
                            	exType      : 'excolumn',
                                dataIndex   : 'AMOUNT',                    
                                align       : 'right',
                                flex        : 1,
                                editor      : {
                                	xtype      : 'extextfield',
                                },
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	return exCommon.setNumberFormat(value);
                                }
                            },{
                            	text        : '비고',
                                xtype       : 'excolumn',
                                dataIndex   : 'REMARK',
                                flex        : 1,
                                exAlign     : 'left',
                                editor      : {
                                	xtype      : 'extextfield',
                                },
                            }]
        				}]
        			}]
        		}]
        	},{
        		height : 5,
        	},{
        		width  : '100%',
        		height : 400,
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
                		handler   : 'onExec',	            		
                		text      : '생성',
                		iconCls   : 'fa fa-plus'
            		},{
        				width : 5
            		},{
            			xtype     : 'exbutton',
                		handler   : 'onAllClear',	            		
                		text      : '전체소등',
                		iconCls   : 'fa fa-check'
            		},{
        				width : 5
        			},{
        				layout: 'hbox',
        				items :[{
        					html : '<img src="./resources/img/bg/light_gbn_popup.gif" height="19px" width="486px" >',
        				}]
        			}]
        		},{
        			layout : 'hbox',
        			width  : '100%',
        			height : 360,
        			items  : [{
        				reference : 'leftGrid',
        				flex      : 3,
        				items     : [{
        					width      : '100%',
                     		exGroupRef : true,
                            xtype      :'exgrid',
                            reference  :'rec000p_03_a',
                            cls        :'rec000p_03_a',
                            height     : 335,
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
        				flex : 1,
        				layout : 'hbox',        				
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
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">등번호</div>'
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
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">축원인</div>'
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		xtype      : 'extextfield',
        	                    		reference  : 'txt_sindo_chuk_name',
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
       	                                exNumberComma : true
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
       	                             	exNumberComma : true
        	                    	}]
        	                    }]
        					},{
        						xtype:'exblockrow',
        	                    items:[{
        	                    	xtype   : 'exblocklabel',
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신청일</div>'
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		xtype      : 'extextfield',
        	                    		reference  : 'txt_sindo_crt_date',
       	                             	width      : '100%',
       	                             	exReadOnly : true
        	                    	}]
        	                    }]
        					},{
        						xtype:'exblockrow',
        	                    items:[{
        	                        xtype   : 'exblocklabel',
        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소</div>'                           
        	                    },{
        	                    	xtype   : 'exblockfield',
        	                    	items   : [{
        	                    		 xtype      : 'extextarea',
        	                			 reference  : 'txt_sindo_addr',
        	                             width      : '100%',
        	                             height     : 92,
        	                             exReadOnly : true
        	                    	}]
        	                    }]	  
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
