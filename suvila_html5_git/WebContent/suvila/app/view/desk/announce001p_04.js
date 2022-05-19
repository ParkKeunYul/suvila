Ext.define('ExFrm.view.desk.announce001p_04',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.desk.announce001p_04Controller',
    	'ExFrm.view.desk.announce001p_04Model'
    ],
    controller:'announce001p_04',
    viewModel:{
        type:'announce001p_04'
    },
    isModal:true,
    name:'announce001p_04',
    title:'',
    closable:true,
    width:1180,
    height:570,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        width  : '99.8%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'center'
        },
        items  :[{
        	html   : '<div id="announce001p_04_title" style="width:100%;height : 40px;background-color:#fffff;color:#3892d4;font-weight:700;line-height:40px;text-align:center;display:inline-block;font-size:20px;">행사일정</div>',
        	width  : '100%',
        },{
        	layout : 'hbox',
        	width  : '100%',
        	items  : [{
        		width : 5
        	},{
        		flex   : 1,
        		layout : 'vbox',
        		items  : [{        			        		
        			html   : '<div style="width:100%;height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">사찰일정</div>',
        			width  : '100%'	
        		},{
        			layout : 'hbox',
        			width  : '100%',
        			items  : [{
        				xtype      : 'exgrid',
        	            width      : 270,
        	            height     : 400,
        	            cls        : 'none-dirty-grid',
        	            reference  : 'announce001p_04_a',
        	            bind       : {
        	                store:'{ds_main}'
        	            },
        	            listeners      : {
        	            	selectionchange : 'onSelectionChange',
        	            },
        	            columns:[{
        	            	text        : 'No',
                            xtype       : 'rownumberer',
                            width       : 45,
                            align       : 'center',
        	            },{
        	            	xtype        :'excolumn',
        	            	text         :'등록자',
        	                dataIndex    :'CRT_NAME',                        
        	                width        : 90,
        	                exAlign      : 'center',
        	            },{
        	            	xtype        :'excolumn',
        	            	text         :'제목',
        	                dataIndex    :'TITLE',                        
        	                width        : 120,
        	                exAlign      : 'left',        	                    	            	
        	            }]
        			},{
        				width : 5
        			},{
        				layout : 'vbox',
        				flex   : 1,
        				items  : [{
        					xtype   :'exfieldsetblockbox',
                    		//width   : 290,
            	    		items   : [{
            	    			xtype:'exblockrow',
                                items:[{
                                    xtype   : 'exblocklabel',
                                    html    : '<div style="text-align:left;padding-left:5px;">제목</div>',
                                    width   : 60,
                                },{
                                	xtype   : 'exblockfield',
                                	items   : [{
                                		xtype      : 'extextfield',
                                        reference  : 'txt_title',
                                        width      : 220,
                                	}]
                                }]
            	    		},{
            	    			xtype:'exblockrow',
                                items:[{
                                    xtype   : 'exblocklabel',
                                    html    : '<div style="text-align:left;padding-left:5px;">일정</div>',
                                    width   : 60,
                                },{
                                	xtype   : 'exblockfield',
                                	items   : [{
                                		xtype      : 'extextarea',
                                		reference  : 'ta_contents',
                                        width      : 220,
                                        height     : 330
                                	}]
                                }]
            	    		}]
        				},{
        					layout : 'hbox',
                			height : 24,
                			width  : '100%',
                			items  : [{        				
                				flex : 1
                			},{
                				xtype     : 'exbutton',
                          		text      : '조회',
                          		handler   : 'onSelect',
                			},{
                				width     : 5
                			},{
                				xtype     : 'exbutton',
                          		text      : '추가',
                          		handler   : 'onAdd',
                			},{
                				width     : 5
                			},{
                				xtype     : 'exbutton',
                          		text      : '삭제',
                          		handler   : 'onDelete',
                			},{
                				width     : 5
                			},{
                				xtype     : 'exbutton',
                          		text      : '저장',
                          		handler   : 'onSave',
                			},{
                				width            : 0,
                        		height           : 0,
                        		items            : [{
                        			xtype     : 'extextfield',
                                    reference : 'txt_sel_index',
                                    value     : '-1',
                                    inputType : 'hidden',
                        		},{
                        			xtype     : 'extextfield',
                           	 		inputType : 'hidden',
                           	 		reference : 'yyyymmdd',                   	 		
                        		 },{
                        			xtype     : 'extextfield',
                           	 		inputType : 'hidden',
                           	 		reference : 'newData',
                           	 		name      : 'newData',
                    		     },{
                                	xtype     : 'extextfield',
                           	 		inputType : 'hidden',
                           	 		reference : 'uptData',
                           	 		name      : 'uptData',
                    	         },{
                                	xtype     : 'extextfield',
                           	 		inputType : 'hidden',
                           	 		reference : 'delData',
                           	 		name      : 'delData',
                        		}]
                			}]
        				}]
        			}]
        		}]
        	},{
        		width : 15
        	},{
        		flex  : 1,
        		layout : 'vbox',
        		items  : [{
        			html   : '<div style="width:100%;height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">제사일정</div>',
        			width  : '100%',
        		},{
        			layout : 'hbox',
        			width  : '100%',
        			items  : [{
        				xtype      : 'exgrid',
        	            width      : 250,
        	            height     : 400,
        	            cls        : 'none-dirty-grid',
        	            reference  : 'announce001p_04_b',
        	            bind       : {
        	                store:'{ds_jesa}'
        	            },
        	            listeners      : {
        	            	selectionchange : 'onSelectionChangeJesa',
        	            },
        	            columns:[{        	            	
        	            	xtype        :'excolumn',
        	            	text         :'제사명',
        	                dataIndex    :'NAME',                        
        	                width        : 90,
        	                exAlign      : 'left',
        	            },{
        	            	xtype        :'excolumn',
        	            	text         :'신청자',
        	                dataIndex    :'NAME_KOR',                        
        	                width        : 90,
        	                exAlign      : 'left',
        	            },{
        	            	xtype        :'excolumn',
        	            	text         :'시간',
        	                dataIndex    :'EVENT_TIME',            
        	                width        : 60,          
        	                exAlign      : 'center',
        	            }]
        			},{
        				width : 5
        			},{
        				flex  : 1,
                		xtype   :'exfieldsetblockbox',
                		//width   : 290,
        	    		items   : [{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">제사종류</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextfield',
                                    reference  : 'txt_jesa',
                                    width      : 320,
                            	}]
                            }]
        	    		},{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">음력양력</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextfield',
                                    reference  : 'txt_lunar',
                                    width      : 230,
                            	}]
                            }]
        	    		},{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">제사일시</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextfield',
                                    reference  : 'txt_event_date',
                                    width      : 230,
                            	}]
                            }]
        	    		},{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">참여인원</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextfield',
                                    reference  : 'txt_number_count',
                                    width      : 230,
                            	}]
                            }]
        	    		},{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">신청자</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextfield',
                                    reference  : 'txt_name',
                                    width      : 230,
                            	}]
                            }]
        	    		},{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">복위자</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextfield',
                                    reference  : 'txt_bokweja',
                                    width      : 230,
                            	}]
                            }]
        	    		},{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">영가명</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextfield',
                                    reference  : 'txt_yonga_name',
                                    width      : 230,
                            	}]
                            }]
        	    		},{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">연락처</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextfield',
                                    reference  : 'txt_cel',
                                    width      : 230,
                            	}]
                            }]
        	    		},{
        	    			xtype:'exblockrow',
                            items:[{
                                xtype   : 'exblocklabel',
                                html    : '<div style="text-align:left;padding-left:5px;">메모</div>',
                                width   : 65,
                            },{
                            	xtype   : 'exblockfield',
                            	items   : [{
                            		xtype      : 'extextarea',
                            		reference  : 'txt_remark',
                                    width      : 230,
                                    height     : 157
                            	}]
                            }]
        	    		}]
        			}]
        			
        		}]
        	},{
        		width : 5
        	}]
        },{
        	height : 5
        },{
        	xtype     : 'exbutton',
      		text      : '닫기',
      		handler   : 'onClose',
      		width     : '100%'
        }]
        
    }]
})