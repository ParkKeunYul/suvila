Ext.define('ExFrm.view.rec.rec000p_02_type1',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec000p_02_type1Controller',
    	'ExFrm.view.rec.rec000p_02_type1Model'
    ],
    controller:'rec000p_02_type1',
    viewModel:{
        type:'rec000p_02_type1'
    },
    isModal:true,
    name:'rec000p_02',
    title:'수납현황_기도',
    closable:true,
    isRootView : true,
    width:1200,
    height:950,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        width  : '99.8%',
        cls    : 'exformmain',
        xtype  : 'exformmain',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	layout : 'hbox',
        	width  : '100%',
        	items  : [{
        		width : '0.5%'
        	},{
        		width  : '99%',
        		layout : 'vbox',
        		items  : [{
        			layout : 'hbox',
        			width  : '100%',
        			height : 30,
        			items  :[{
        				flex       : 1,
        				//html       : '<div style="text-align:left;padding-left:5px;font-weight:700;line-height:26px;">수납현황</div>',
        				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">수납현황type1</div>',
        			},{
        				xtype     : 'exbutton',
        	          	reference : 'closeBtn',
        	          	name      : 'closeBtn',
        	          	handler   : 'onClose',
        	          	text      : '닫기',
        			}]
        		},{
        			layout : 'hbox',
        			width  : '100%',
        			height : 30,
        			items  : [{
        				xtype        : 'extextfield',
	                    reference    : 'txt_prodName',
	                    name         : 'txt_prodName',
	                    exReadOnly   : true,
        			},{
        				width : 10
        			},{
        				xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_p',
            			name      : 'rdo_ApprovalGbn_p',
            			items     :[{
            				boxLabel   : '현금', 
    	                	inputValue : 1,    
    	                	width      : 60,
    	                	reference  : 'rdo_ApprovalGbn1',
    	                	checked    : true
            			},{
            				boxLabel   : '카드', 
    	                	inputValue : 2,    
    	                	width      : 60,
    	                	reference  : 'rdo_ApprovalGbn2',
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
    	                	reference  : 'rdo_ApprovalGbn3',
            			}]
        			},{
        				
    					xtype     : 'exbutton',
                  		reference : 'addBtn',
                  		name      : 'addBtn',
                  		text      : '수납',
                  		handler   : 'onAdd',
    				},{
        				width : 3
    				},{
    					xtype     : 'exbutton',
                  		reference : 'saveBtn',
                  		name      : 'saveBtn',
                  		text      : '저장',
                  		handler   : 'onSave',
    				},{
        				width : 3
        			
        			},{
        				xtype     : 'exbutton',
                  		reference : 'canCelBtn',
                  		name      : 'canCelBtn',
                  		text      : '취소',
                  		handler   : 'on_cancel',
        			},{
        				width : 3
        			},{
        				xtype     : 'exbutton',
                  		reference : 'recCancelBtn',
                  		name      : 'recCancelBtn',
                  		text      : '접수취소',
                  		handler   : 'onRecCancel',
        			},{
        				width : 3
        			},{
        				xtype     : 'exbutton',
                  		reference : 'printBtn',
                  		name      : 'printBtn',
                  		text      : '인쇄',
                  		handler   : 'onPrint',
        			},{
        				width : 0,
        				items : [{
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
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_misuRec',
        	       	 		name      : 'ds_misuRec',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_misuRecUpt',
        	       	 		name      : 'ds_misuRecUpt',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_sms',
        	       	 		name      : 'ds_sms',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_pgCardInfo',
        	       	 		name      : 'ds_pgCardInfo',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_recCancel',
        	       	 		name      : 'ds_recCancel',
        	    		}]
        			}]
        		},{
        			layout     : 'vbox',
        			width      : '100%',
        			reference  : 'tr_sunab3',
        			items  :[{
        				exGroupRef :true,
                        xtype      :'exgrid',
                        reference  :'tr_sunab3_a',
                        cls        : 'tr_sunab3_a',
                        height     : 280,
                        width      : '100%',
                        align      : 'center',                    
                        bind:{
                            store:'{ds_misuRec}'
                        },
                        plugins     : [{
    	                	ptype:'cellediting'
    	                }],
    	                listeners      : {
    	                	beforeedit   : 'onBeforeedit',	    
    	                	edit         : 'onAfteredit',
    	                	celldblclick : 'onCellDbClick',
                        },
                        columns:[{                   
                        	text  :'No',
                            xtype :'rownumberer',
                            width : 60,
                            align : 'center',
                        },{
                        	xtype       : 'excolumn',
                            text        : '접수자',
                            dataIndex   : 'CRT_USER',
                            exAlign     : 'center',
                            flex        : 1.6,
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '수납일',
                            dataIndex   : 'SUB_DATE',
                            exAlign     : 'center',
                            flex        : 1.6, 
                            renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.getFormat(value,'dateYMD' );
                            },
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '납부금액',
                            dataIndex   : 'AMOUNT',
                            exAlign     : 'right',
                            exType      : 'number',
                            flex        : 1.8,
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                            renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '결제방법',
                            dataIndex   : 'APPROVAL_GBN',
                            exAlign     : 'center',
                            flex        : 1.8,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_approvalGbn');
                            	return exCommon.getComboVal(value,store, '' );
                            },
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '비고',
                            dataIndex   : 'REMARK',
                            exAlign     : 'left',
                            flex        : 3,
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '취소',
                            dataIndex   : 'CANCELGBN ',
                            exAlign     : 'left',
                            flex        : 1.8,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	
                            	if(record.get("APPROVAL_GBN") == "2" && new Number( record.get("AMOUNT") ) > 0){
                            		return '<div style="width:100%;text-align:center;cursor:pointer;">[카드-취소]</div>';
                            	}
                            	return value;
                            }
                        }]
        			}]
        		},{
        			height : 10,
        		},{
        			hidden     : true,
        			layout     : 'vbox',
        			width      : '100%',
        			reference  : 'perPrayArea',
        			items  :[{
        				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">개인축원</div>',
        			},{
        				xtype      : 'exfieldsetblockbox',
            			width      : '100%',            			
            			items      : [{
            				xtype:'exblockrow',
            				items:[{
            					xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">축원신도명</div>'
            				},{
            					xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'per_nm',
    	                            exReadOnly : true,
    	                    	}]
            				},{
            					xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">축원신도번호</div>'
            				},{
            					xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'per_no',
    	                            exReadOnly : true,
    	                    	}]
            				}]
            			},{
            				xtype:'exblockrow',
            				items:[{
            					xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">발원내용</div>'
            				},{
            					xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextarea',
    	                            reference  : 'per_memo',
    	                            height     : 60,
    	                            width      : '99.9%'
    	                    	}]
            				}]
            			}]
        			}]
        		},{
        			layout : 'vbox',
        			width  : '100%',
        			items  :[{
        				layout : 'hbox',
        				width  : '100%',
        				items  : [{
        					//html : '<div style="font-weight: 700;">접수합계 비용 및 수납현황</div>',
        					html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">접수합계 비용 및 수납현황</div>',
        					flex : 1,
        				},{
        					hidden     : true,
        					xtype      : 'extextfield',
        					fieldLabel : '<span style="font-weight:700;">모연인</span>',        					
                            reference  : 'txt_whajubosalNm',
                            exReadOnly : true,
                            labelWidth : 55,
                            width      : 180,                            
        				},{
        					width : 3
        				},{
        					hidden     : true,
        					xtype      : 'extextfield',
        					fieldLabel : '<span style="font-weight:700;">권선문번호</span>',
                            reference  : 'txt_kwonsunNo',
                            exReadOnly : true,
                            labelWidth : 75,
                            width      : 200,                            
        				},{
        					width : 3 
        				}]
        			}]
        		/*},{
        			height : 10,*/	
        		},{
        			xtype      : 'exfieldsetblockbox',
        			width      : '100%',
        			reference  : 'sunapArea',
        			items      : [{
        				xtype:'exblockrow',
        				items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">총 접수금액</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'me_totPaymentPlanAmt',
	                            exType     : 'number',
	                            exAlign    : 'right',
	                            exReadOnly : true,
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신청자</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_proposalBudNm',
	                            exReadOnly : true,
	                    	}]
	                    }]
        			},{
        				xtype:'exblockrow',
        				items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">총 납부금액</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'me_totPaymentAmt',
	                            exType     : 'number',
	                            exAlign    : 'right',
	                            exReadOnly : true,
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">미수금액</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'me_misuAmt',
	                            exAlign    : 'right',
	                            exType     : 'number',
	                            exReadOnly : true,
	                    	}]
	                    }]
        			
        			},{
        				xtype:'exblockrow',
        				items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">결재구분</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_approvalGbn',
	                            exReadOnly : true,
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">SMS설정</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'cb_smsYn',
	                     //       name         : 'cb_smsYn',	                            
	                            width        : 75,
	                            value        : '0',
	                            emptyText    : '선택',
	                            bind         : {
	                            	store:'{ds_smsYn}'
	                            },
	                            listeners:{
	                            	change:'onSmsChange',
	                            },
	                    	},{
	                    		width : 3,
	                    	},{
	                    		layout    : 'hbox',
	                    		reference : 'mobileArea',
	                    		items     :[{
	                    			xtype     : 'extextfield',
		                            reference : 'txt_MobiletelNo1',
		                        //    name      : 'MOBILE_TELNO1',
		                            width     : 50,
	                    		},{
	                    			width : 20,
		                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
	                    		},{
	                    			xtype     : 'extextfield',
		                            reference : 'txt_MobiletelNo2',
		                      //      name      : 'MOBILE_TELNO2',
		                            width     : 60,
	                    		},{
	                    			width : 20,
		                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
	                    		},{
	                    			xtype     : 'extextfield',
		                            reference : 'txt_MobiletelNo3',
		                    //        name      : 'MOBILE_TELNO3',
		                            width     : 60,
	                    		},{
	                    			width : 3	
	                    		}]
	                    	},{
                    			xtype     : 'exbutton',
	    	              		reference : 'smsBtn',
	    	              		name      : 'smsBtn',
	    	              		handler   : 'onCellSave',
	    	              		text      : '접수문자상태변경',
	                    	},{
	                    		width  : 0,
	                    		height : 0,
	                    		items  :[{
	                    			xtype            : 'extextfield',
				                    reference        : 'txt_smsYn',
				                    inputType        : 'hidden',
	                    		}]	
	                    	}]
	                    }]
        			},{
        				reference : 'bulsa_area',
        				hidden    : true,
        				xtype     :'exblockrow',
        				items     : [{
        					xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">동참자</div>'
        				},{
        					xtype   : 'exblockfield',
        					items   : [{
        						xtype     : 'extextfield',
	                            reference : 'txt_bul_donchamja',
	                         //   name      : 'MOBILE_TELNO3',
	                            exReadOnly : true,
        					}]
        				}]
        				
        			},{
        				// 위패문자 발송
        				reference : 'wepae_sms',
        				hidden    : true,
        				xtype     :'exblockrow',
        				items     : [{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">안내문자</div>'
        				},{
        					xtype   : 'exblockfield',
        					items   : [{
        						xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'smsGuide',
	                            name         : 'smsGuide',	                            
	                            width        : 125,
	                            value        : '0',
	                            emptyText    : '선택',
	                            bind         : {
	                            	store:'{ds_smsGide}'
	                            },	                            
        					},{
        						width : 5
        					},{
        						xtype     : 'exbutton',
	    	              		reference : 'smsGuideBtn',
	    	              		name      : 'smsGuideBtn',
	    	              		handler   : 'onSmsGuide',
	    	              		text      : '문자발송',
        					}]
        				}]
        				
        			},{
        				reference : 'jesaInfo',
        				hidden    : true,
        				xtype     :'exblockrow',
        				items     :[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">제사정보</div>'
        				},{
        					xtype   : 'exblockfield',
        					items   : [{
        						xtype:'exgrid',
            	                height : 135,
            	                width  : '100%',
            	                bind:{
            	                    store:'{ds_jesaday}'
            	                },
            	                columns:[{
            	                    text  :'No',
            	                    xtype :'rownumberer',
            	                    align : 'center',
            	                    flex  : 1
            	                },{
            	                	text         :'제사명',
            	                	xtype        :'excolumn',
            	                    dataIndex    :'JESA_NAME',
            	                    flex         : 1.6,
            	                    exAlign      : 'left',
            	                },{
            	                	text         :'제사일',
            	                	xtype        :'excolumn',
            	                    dataIndex    :'EVENT_DATE',
            	                    flex         : 1.6,
            	                    exAlign      : 'center',
            	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){            		                  
            	                    	return exCommon.getGridDateFormat(value, '-' , 8);
            		                },
            	                },{
            	                	text         :'제사시간',
            	                	xtype        :'excolumn',
            	                    dataIndex    :'EVENT_TIME',
            	                    flex         : 1.4,
            	                    exAlign      : 'center',
            	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){     
            	                    	try{
            	                    		return value.substr(0,2) + ":" + value.substr(2,2);
            	                    	}catch (e) {
											return value;
										}
            		                },
            	                },{
            	                	text         :'복위자',
            	                	xtype        :'excolumn',
            	                    dataIndex    :'BOK_NM',
            	                    flex         : 1.8,
            	                    exAlign      : 'left',
            	                },{
            	                	text         :'관계',
            	                	xtype        :'excolumn',
            	                    dataIndex    :'YOUNG_REL',
            	                    flex         : 1.8,
            	                    exAlign      : 'left',
            	                },{
            	                	text         :'영가',
            	                	xtype        :'excolumn',
            	                    dataIndex    :'YOUNG_NM',
            	                    flex         : 1.8,
            	                    exAlign      : 'left',
            	                }]
        					}]
        	                
        				}]
        				
        			},{
        				xtype:'exblockrow',
        				items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">접수메모</div>'
        				},{
        					xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextarea',
	                            reference  : 'ta_memo',
	                            height     : 120,
	                            width      : '99.9%'
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">상세메모</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextarea',
	                            reference  : 'ta_remark',
	                            height     : 120,
	                            width      : '99.9%'
	                    	}]
	                    }]
        			},{
        				xtype     : 'exbutton',
	              		reference : 'saveRemarkBtn',
	              		name      : 'saveRemarkBtn',
	              		handler   : 'onSaveRemark',	              		
	              		text      : '메모저장',
	              		style     : {
	              			'margin'  : '5px' 
	              		}
        			}] //exfieldsetblockbox
        		},{
        			layout    : 'vbox',
        			width     : '100%',
        			reference : 'wepae_area',
        			hidden    : true,
        			height    : 210,
        			items     : [{
        				height : 1
        			},{
        				xtype:'exgrid',
    	                height : 205,
    	                width  : '100%',
    	                bind:{
    	                    store:'{ds_dongChamJa}'
    	                },
    	                exGroupFields : ['WEPAE_SEQ', 'EVENT_SEQ'],
    	                cls : 'grid-group',
    	                columns:[{
    	                    text  :'No',
    	                    xtype :'rownumberer',
    	                    align : 'center',
    	                    flex  : 1
    	                },{
    	                	text         :'동참구분',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'WEPAE_SEQ',
    	                    flex         : 1.6,
    	                    exAlign      : 'center',
    	                },{
    	                	text         :'위패번호',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'EVENT_SEQ',
    	                    flex         : 1.6,
    	                    exAlign      : 'center',
    	                },{
    	                	text         :'복위자명',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'BOKWIJA_NM',
    	                    flex         : 1.6,
    	                    exAlign      : 'left',
    	                },{
    	                	text         :'관계',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'DECE_REL',
    	                    flex         : 1.6,
    	                    exAlign      : 'left',
    	                },{
    	                	text         :'본',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'DECE_BONE_NM',
    	                    flex         : 1.6,
    	                    exAlign      : 'center',
    	                },{
    	                	text         :'영가자명',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'DECE_BUD_NM',
    	                    flex         : 1.6,
    	                    exAlign      : 'left',
    	                },{
    	                	text         :'복위/기부',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'BOKWI_KIBU_GBN_NM',
    	                    flex         : 1.6,
    	                    exAlign      : 'center',
    	                },{
    	                	text         :'음력/양력',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'LUNAR_SOLAR_NM',
    	                    flex         : 1.6,
    	                    exAlign      : 'center',
    	                },{
    	                	text         :'기일',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'DEATH_DAY',
    	                    flex         : 1.6,
    	                    exAlign      : 'center',
    	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
    	                    	return exCommon.getGridDateFormat(value, '-' , 8);
    	                    }
    	                },{
    	                	text         :'시간',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'DEATH_TIME',
    	                    flex         : 1.6,
    	                    exAlign      : 'center',
    	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
    	                      	 
    	                      	if(isNaN(value)){
	    	                   		return "";
	    	                   	}
    	                   	
	    	                   	var EVENT_TIME = value;
	    	                   	
	    	                   	if(EVENT_TIME.length == 1){
	    	               			EVENT_TIME ="0"+ EVENT_TIME + ":00"; 
	    	               		}else if(EVENT_TIME.length == 2){
	    	               			EVENT_TIME = EVENT_TIME + ":00";
	    	               		}else if(EVENT_TIME.length == 3){
	    	               			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2) +"0";
	    	               		}else if(EVENT_TIME.length == 4){
	    	               			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2);
	    	               		}else if(EVENT_TIME.length > 4){
	    	               			console.log(EVENT_TIME.substr(2,4));
	    	               			EVENT_TIME = EVENT_TIME.substr(0,2) + ":" + EVENT_TIME.substr(2,2);
	    	               		}
	    	                   	return EVENT_TIME;
    	                   },
    	                }]
        			}]
        		}]
        	},{
        		width : '0.5%'
        	}]
        }]
        
    }]
})