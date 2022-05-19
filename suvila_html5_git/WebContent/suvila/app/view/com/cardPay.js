Ext.define('ExFrm.view.com.cardPay',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.cardPay',
    requires:[
    	'ExFrm.view.com.cardPayController',
    	'ExFrm.view.com.cardPayModel'
    ],
    controller:'cardPay',
    viewModel:{
        type:'cardPay'
    },
    isModal:true,
    name:'cardPay',
    title:'카드결제',
    closable:true,
    width:1029,
    height:580,
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
        	height : 5
        },{
        	layout : 'vbox',
        	width  : '99%',
        	items  : [{
        		/*layout : 'hbox',
        		width  : '100%',
        		items  : [{
        			//html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-갸홋-radius:5px;display:inline-block;padding:0 15px;">신용카드 결제</div>',
        		},{
        			flex : 1
        		},{
        			xtype     : 'exbutton',
	                handler   : 'onClose',
	                text      : '닫기',
        		}]
        	},{
        		height : 5
        	},{*/
        		width     : '100%',
        		height    : 130,
       		 	xtype     : 'tabpanel',
       		 	reference : 'cardTab',
	       		listeners:{
	                 tabChange:'onTabChange'
	            },
       		 	items     : [{
	       		 	title : '자동입력',
	       		 	layout: 'hbox',       		 		
	   		 		items : [{
	   		 			layout : 'vbox',
	   		 			items  : [{
	   		 				height : 5
	   		 			},{
	   		 				layout : 'hbox',
	   		 				items  : [{
	   		 					width  : 480,
	   		 					layout : 'vbox',
	   		 					items  : [{
	   		 						height : 35
	   		 					},{
	   		 						layout : 'hbox',
	   		 						items  : [{
		   		 						fieldLabel : '<span style="font-weight: 700;">할부 </span>',
				   		 				xtype        :'excombobox',
			            				labelWidth   : 40,
			                            width        : 120,
			                            valueField   : 'CODE',
			                            displayField : 'NAME',     
			                            reference    : 'sel_cardquota',
			                            name         : 'category',
			                            value        : '00',
			                        	bind         : {
			                            	store:'{ds_gigan}'
			                        	},
			                        	listeners       : {
			                            	focus : 'onSelFocus',
			                            	change: 'onSelChange',
			                            	focusleave : 'onSelChange'
			                            }
	   		 						},{
	   		 							width : 5
	   		 						},{
	   		 							layout : 'hbox',
	   		 							width   : 0,
	   		 							height  : 0,
	   		 							items  :[{
		   		 							xtype           : 'extextfield',
				                            reference       : 'hdn_CardRead',
				                            name            : 'hdn_CardRead',
				                            value           : '',
				                            width           : 0,
				                            enableKeyEvents : true,
				                            listeners       : {
				                          	   keyup : 'onTab1CardRead',
				                             },
	   		 							}]
		   		 					},{
	   		 							html : '<span style="color:red;">[할부개월 선택 후 카드를 리더기에 긁어주세요!]</span>'
	   		 						},{
	   		 							width : 3
	   		 						},{
	   		 							html : '<img src="./resources/img/cardPay/reading.gif" width="58" height="50"  >'
	   		 						}]
		   		 					
	   		 					}]
	   		 				},{
	   		 					width : 10
	   		 				},{
	   		 				/*
	    	       		 		xtype     : 'exbutton',
	    	              		text      : '카드결제',
	    	              		handler   : 'onCard',
	    	              		width     : 100,
	    	              		height    : 100,
	    	              		*/
	   		 				}]	   		 				
	   		 			}]
	       		 	},{
			 			width  : 10
			 		},{
	       		 		layout : 'vbox',
	   		 			items  : [{
	   		 				height : 25
	   		 			},{
	       		 			layout : 'hbox',
	       		 			items  : [{
	       		 				html : '<div style="background-color:#d0e4f3;font-size:24px;padding : 25px; 5px;display:inline-block;width:350px;">최종결제금액<span class="cardpay_tot2" style="font-size:24px;padding : 0px 5px;display:inline-block;color:red;text-decoration:underline;"></span>원</div>'
	       		 			}]
	   		 			}]
			 		},{
			 			width : 5
			 		},{
	       		 		layout : 'vbox',
	   		 			items  : [{
	   		 				height : 5
	   		 			},{
	   		 				// 결제버튼
		       		 		xtype     : 'exbutton',
		              		text      : '결제취소',
		              		handler   : 'onClose',
		              		width     : 100,
		              		height    : 100,
	   		 			}]
	       		 	}]
       		 	},{
       		 		title : '직접입력',
       		 		layout: 'hbox',       		 		
       		 		items : [{
       		 			layout : 'vbox',
       		 			width  : 390,
       		 			items  :[{
       		 				height : 25
       		 			},{
       		 				layout : 'hbox',
       		 				items  :[{
       		 					fieldLabel : '<span style="font-weight: 700;">카드번호 </span>',
       		 					labelWidth      : 65,
	       		 				xtype           : 'extextfield',
	                            reference       : 'cardNum1',
	                            name            : 'CardNo',
	                            value           : '',
	                            width           : 360,
	                            enableKeyEvents : true,
	                            listeners       : {
	                           	   keyup : 'onlyNumber'
	                             },
       		 				}]
       		 			},{
       		 				height : 10
       		 			},{
	       		 			layout : 'hbox',
	   		 				items  :[{
	   		 					fieldLabel : '<span style="font-weight: 700;">할부 </span>',
		   		 				xtype        :'excombobox',
	            				labelWidth   : 40,
	                            width        : 120,
	                            valueField   : 'CODE',
	                            displayField : 'NAME',     
	                            reference    : 'sel_cardquota2',
	                            name         : 'CardQuota',
	                            value        : '',
	                        	bind         : {
	                            	store:'{ds_gigan}'
	                        	},
	   		 				},{
	   		 					width : 5
	   		 				},{
	   		 					fieldLabel : '<span style="font-weight: 700;">유효기간 </span>',
		   		 				xtype        :'excombobox',
	            				labelWidth   : 65,
	                            width        : 135,
	                            valueField   : 'CODE',
	                            displayField : 'NAME',     
	                            reference    : 'sel_cardexpm',
	                            name         : 'expMM',
	                            value        : '',
	                        	bind         : {
	                            	store:'{ds_month}'
	                        	},  
	   		 				},{
	   		 					html :'<div style="line-height:25px;padding:0 5px;">월</div>'
	   		 				},{
		   		 				xtype        :'excombobox',
	                            width        : 80,
	                            valueField   : 'CODE',
	                            displayField : 'NAME',     
	                            reference    : 'sel_cardexpy',
	                            name         : 'expYY',
	                            value        : '22',
	                        	bind         : {
	                            	store:'{ds_year}'
	                        	},
	   		 				},{
	   		 					html :'<div style="line-height:25px;padding:0 5px;">년</div>'
	   		 				}]
       		 			}]
       		 		},{
       		 			width : 10
       		 		},{
       		 			layout : 'vbox',
       		 			items  : [{
       		 				height : 5
       		 			},{
       		 				// 결제버튼
    	       		 		xtype     : 'exbutton',
    	              		text      : '카드결제',
    	              		handler   : 'onCardKeyIn',
    	              		width     : 100,
    	              		height    : 100,
       		 			},{
	       		 			width : 0,
	       	    			heigth: 0,
	       	    			items : [{
	       	    				xtype     : 'extextfield',
	       		       	 		inputType : 'hidden',
	       		       	 		reference : 'tot_PaymentAmt',
	       		       	 		name      : 'tot_PaymentAmt',
	       		       	 		width     : 0
	       	    			},{
	       	    				
	       	    				xtype     : 'extextfield',
	       		       	 		inputType : 'hidden',
	       		       	 		reference : 'CARD_BUD_NO',
	       		       	 		name      : 'CARD_BUD_NO',
	       		       	 		width     : 0
	       	    			}]
       		 			}]
       		 		},{
       		 			width  : 15
       		 		},{
	       		 		layout : 'vbox',
	   		 			items  : [{
	   		 				height : 25
	   		 			},{
	       		 			layout : 'hbox',
	       		 			items  : [{
	       		 				html : '<div style="background-color:#d0e4f3;font-size:24px;padding : 25px; 5px;display:inline-block;width:350px;">최종결제금액<span class="cardpay_tot" style="font-size:24px;padding : 0px 5px;display:inline-block;color:red;text-decoration:underline;"></span>원</div>'
	       		 			}]
	   		 			}]
       		 		},{
       		 			width : 10
       		 		},{
	       		 		layout : 'vbox',
	   		 			items  : [{
	   		 				height : 5
	   		 			},{
	   		 				// 결제버튼
		       		 		xtype     : 'exbutton',
		              		text      : '결제취소',
		              		handler   : 'onClose',
		              		width     : 100,
		              		height    : 100,
	   		 			}]
       		 		}]
       		 		
       		 	}]
        	}]
        },{
        	height : 5
        },{
        	exGroupRef    : true,
            xtype         : 'exgrid',
            reference     : 'cardPay',
            cls           : 'none-dirty-grid topCheckHeader',
            height        : 310,
            width         : '100%',
            bind          : {
                store:'{ds_main}'
            },
            features      : [{
            	ftype : 'summary',
            	dock  : 'bottom'  // 하단 잠금
            }],
            columns:[{
            	text        : '순번',
                xtype       : 'rownumberer',
                width       : 90,
                align       : 'center',
            },{
            	text        : '접수일',
            	xtype       : 'excolumn',
                dataIndex   : 'ACCEPT_DATE',                    
                exAlign     : 'center',
                width       : 125,
                exType      : 'date'
            },{
            	text        : '접수종류',
            	xtype       : 'excolumn',
                dataIndex   : 'ACCEPT_GBNTXT',                    
                exAlign     : 'left',
                flex        : 1
            },{
            	text        : '납부금액',
            	xtype       : 'excolumn',
                dataIndex   : 'PAYMENT_AMT',                    
                exAlign     : 'right',
                width       : 150,
                exType      : 'number',
                summaryType : 'sum',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
                },
            }]
        }]
        
    }]
})