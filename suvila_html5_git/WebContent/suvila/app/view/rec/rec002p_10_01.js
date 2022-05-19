Ext.define('ExFrm.view.rec.rec002p_10_01',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec002p_10_01Controller',
    	'ExFrm.view.rec.rec002p_10_01Model'
    ],
    controller:'rec002p_10_01',
    viewModel:{
        type:'rec002p_10_01'
    },
    isModal:true,
    name:'rec002p_10_01',
    title:'인등연장',
    closable:true,
    width:570,
    height:495,
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
            align:'stretch'
        },
        items  :[{
        	height : 5        
        },{
        	layout : 'hbox',
        	items  : [{
                width : '0.5%'
            },{
            	 width  : '99%',
            	 layout : 'vbox',
            	 items  :[{
            		 layout : 'hbox',
            		 width  : '100%',
            		 items  :[{
            			 html : '<span style="font-weight:700;">인등연장<span>',
            			 flex : 1
            		 },{
             			 xtype     : 'exbutton',
                         reference : 'saveBtn',
                         name      : 'saveBtn',
                         handler   : 'onSave',
                         text      : '저장',
             		},{
             			width : 10
             		},{
             			xtype     : 'exbutton',
                        handler   : 'onClose',
                        text      : '닫기',
             		 },{
             			height : 0,
                    	width  : 0,
                    	items  :[{
                    		xtype      : 'extextfield',
                    		reference  : 'txt_jungak_cd',
                    	},{
                    		xtype      : 'extextfield',
                    		reference  : 'txt_accept_gbn',
                    	},{
                    		xtype      : 'extextfield',
                    		reference  : 'txt_accept_seq',
                    	},{
                    		xtype      : 'extextfield',
                    		reference  : 'txt_accept_gbn',
                    	},{
                    		xtype      : 'extextfield',
                    		reference  : 'txt_light_no',
                    	},{
                    		xtype      : 'extextfield',
                    		reference  : 'txt_state',
                    		value      : 0,
                    	},{
                    		xtype      : 'extextfield',
                    		reference  : 'uptData',
                    		name       : 'uptData',
                    		value      : 0,
                    	}]
            		 }]
            	},{
            		
             	}]            	 	
            },{
            	width : '0.5%'
            }]
        },{
        	height : 5
        },{
        	xtype   :'exfieldsetblockbox',
    		items:[{
    			xtype:'exblockrow',
    			height : 30, 
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:center;padding-left:5px;font-weight:700;">내역</div>',
                    flex    : 1
                },{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:center;padding-left:5px;font-weight:700;">변경전</div>',
                    flex    : 1
                },{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:center;padding-left:5px;font-weight:700;">변경후</div>',
                    flex    : 1
                }]      
    		},{
    			xtype:'exblockrow',
    			items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">총 접수 금액</div>',
                    flex    : 1
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_payment_plan_amt',
                        exReadOnly : true,
                        exType     : 'number',
                        exAlign    : 'right',
                	}]
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_total_plan_amt',
                        exReadOnly : true,
                        exType     : 'number',
                        exAlign    : 'right',
                	}]
                }]
    		},{
    			xtype:'exblockrow',
    			items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">총 납부 금액</div>',
                    flex    : 1
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_payment_amt',
                        exReadOnly : true,
                        exType     : 'number',
                        exAlign    : 'right',
                	}]
                },{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;"></div>',
                    flex    : 1
                }]
    		},{
    			xtype:'exblockrow',
    			items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">미수 금액</div>',
                    flex    : 1
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_misu_amt',
                        exReadOnly : true,
                        exType     : 'number',
                        exAlign    : 'right',
                	}]
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_total_misu_amt',
                        exReadOnly : true,
                        exType     : 'number',
                        exAlign    : 'right',
                	}]
                }]
    		},{
    			xtype:'exblockrow',
    			items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">월 납부 금액</div>',
                    flex    : 1
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_default_amt',
                        exReadOnly : true,
                        exType     : 'number',
                        exAlign    : 'right',
                	}]
                },{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;"></div>',
                    flex    : 1
                }]
    		},{
    			xtype:'exblockrow',
    			items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">시작년월</div>',
                    flex    : 1
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_start_month',
                        exReadOnly : true,
                      //  exType     : 'number',
                        exAlign    : 'right',
                	}]
                },{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:center;padding-left:5px;"></div>',
                    flex    : 1
                }]
    		},{
    			xtype:'exblockrow',
    			items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">기간</div>',
                    flex    : 1
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_indeung_period',
                        exReadOnly : true,
                        exType     : 'number',
                        exAlign    : 'right',
                	}]
                },{
                	xtype   : 'exblockfield',
                	flex    : 1,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_total_period',
                        exReadOnly : true,
                        exType     : 'number',
                        exAlign    : 'right',
                	}]
                }]
    		},{
    			xtype:'exblockrow',
    			items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">추가 기간</div>',
                    flex    : 1
                },{
                	xtype   : 'exblockfield',
                	flex    : 2,
                	items   : [{
                		xtype      :'extextfield',
                        reference  : 'em_add_period',
                        exType     : 'number',
                        exAlign    : 'right',
                	},{
                		width : 10
                	},{
                		xtype     : 'exbutton',
                        reference : 'applyBtn',
                        name      : 'applyBtn',
                        handler   : 'onApply',
                        text      : '적용',
                	}]
                }]
            }]
        },{
        	height : 5
        },{
        	height : 38,
        	html   : '* 기간만 추가 가능하며 접수 금액 변경은 불가능 합니다.<br/>&nbsp;&nbsp;&nbsp;(금액도 변경되는 경우는 재 접수 받아야 합니다.)'
        },{
        	height : 5
        },{
        	height : 30,
        	html   : '* 36개월 ->48 개월로 하실려면  추가 기간에 12를 입력하면 됩니다.'
        }]
        
    }]
})