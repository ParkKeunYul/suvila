Ext.define('ExFrm.view.rec.rec000w_03',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec000w_03',
    requires:[
    	 'ExFrm.view.rec.rec000w_03Controller'
    	,'ExFrm.view.rec.rec000w_03Model'
    ],
    controller:'rec000w_03',
    viewModel:{
        type:'rec000w_03'
    },
    //id:'rec000w_03',
    xtype : 'rec000w_03',
    isRootView:false,
    scrollable:false,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        layout:'hbox',
        items:[{
        	//html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">접수합계 비용 및 수납현황</div>',
        	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">접수합계 비용 및 수납현황</div>',
        	//html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">접수합계 비용 및 수납현황</span>',
            flex    : 1
        },{
            layout:{
                type:'hbox',
                align:'center'
            },
            items:[{
            	fieldLabel      : '<span style="font-weight: 700;">접수일</span>',
            	labelWidth      : 60,
                xtype           : 'exdatefield',
                format          : 'Y/m/d',
                reference       :'me_acceptDate',
                name            :'ACCEPT_DATE',
            },{ 
            	hidden          : true,
                xtype           :'extextfield',
                fieldLabel      : '<span style="font-weight: 700;">모연인</span>',
                labelWidth      : 60,
                exReadOnly      : true,
                width           : 250,
                reference       :'txt_whajubosalNm',
                name            :'WHAJUBOSAL_NM',
            },{
                hidden          : true,
                xtype           :'extextfield',
                fieldLabel      : '<span style="font-weight: 700;">권선문번호</span>',
                width           : 250,
                reference       :'txt_kwonsunNo',
                name            :'KWONSUN_NO',
                exReadOnly      : true,
            },{
            	width  : 0,
            	height : 0,
            	items  :[{
            		xtype            : 'extextfield',
                    reference        : 'txt_whajubosal',
                    name             : 'WHAJUBOSAL',
                    value            : '',
                    inputType        : 'hidden',
            	}]
            },{
            	width : 5
            },{       
            	hidden    : true,
            	xtype     : 'exbutton',
          		reference : 'kwonSunBtn',
          		name      : 'kwonSunBtn',
          		handler   : 'onKwonSunNo',          		
                iconCls   : 'fa fa-search'
            }]
        }]
    },{
        xtype:'exfieldsetblockbox',
        style : 'margin-top:3px;',
        items:[{
            xtype:'exblockrow',
            items:[{
                xtype   : 'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신청인</div>',
                width   : 100
            },{
                xtype  : 'exblockfield',
                items  :  [{
                    xtype       : 'extextfield',
                    exReadOnly  : true,
                    reference   : 'txt_proposalBudNm',
                    name        : 'PROPOSAL_BUD_NM',
                },{
                	width  : 0,
                	height : 0,
                	items :[{
                		xtype       : 'extextfield',
                        reference   : 'txt_proposalBudNo',
                        name        : 'PROPOSAL_BUD_NO',
                        inputType   : 'hidden',
                	}]
                }]
            },{
                xtype       : 'exblocklabel',
                html        : '<div style="text-align:left;padding-left:5px;font-weight:700;">총 접수금액</div>',
                width       : 100,                
            },{
            	xtype  : 'exblockfield',
                items  :  [{
                    xtype       : 'extextfield',
                    exReadOnly  : true,
                    reference   : 'me_totPaymentPlanAmt',
                    name        : 'TOT_PAYMENT_PLAN_AMT',
                    exType      : 'number',
                    exAlign     : 'right',
                    value       : 0
                }]
            },{
                xtype   : 'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">납부금액</div>',
                width   : 100
            },{
            	xtype  : 'exblockfield',
                items  :  [{
                    xtype       : 'extextfield',
                    exReadOnly  : true,
                    reference   : 'me_totPaymentAmt',
                    name        : 'TOT_PAYMENT_AMT',
                    exType      : 'number',
                    exAlign     : 'right',
                    value       : 0
                }]
            },{
                xtype   :'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">미수금액</div>',
                width   : 100
            },{
            	xtype  : 'exblockfield',
                items  :  [{
                    xtype       : 'extextfield',
                    exReadOnly  : true,
                    reference   : 'me_misuAmt',
                    name        : 'MISU_AMT',
                    exType      : 'number',
                    exAlign     : 'right',
                    value       : 0
                }]
            }]
        },{
            xtype       :'exblockrow',            
            items:[{
                xtype   :'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">CMS 신청</div>',
                width   : 100
            },{
                xtype:'exblockfield',
                items:[{
                    xtype      : 'excheckbox',
                    fieldLabel : '<span style="font-weight: 700;">CMS 이체</span>',
                    labelWidth : 75,
            		labelAlign : 'right',
            		width      : 110,
            		reference  : 'chk_UseCms',
                    name       : 'chk_UseCms',
                    listeners  : {
                    	change:'onCheckCms'
                    }
                },{
            		xtype        :'excombobox',
                    valueField   :'DISPLAY',
                    displayField :'DISPLAY',
                    reference    :'lc_sindoCmsInfo',
                    name         :'lc_sindoCmsInfo',   
                    emptyText    : '선택',                    
                    width        : 430,
                    bind:{
                     	store:'{ds_sindo_cms_info}'
                    },
                    /*listConfig: {
                        itemTpl: [                        	
                            '<div data-qtip="{BANK_NM}: {IF_PAYMENT_ACCOUNT}">' +
                        		'<span style="width:100px;display:inline-block;">{BANK_NM}</span>'+ 
                        		'<span style="width:130px;display:inline-block;">{IF_PAYMENT_ACCOUNT}</span>'+
                        		'<span style="width:20px;display:inline-block;text-align:centger;">{ACCOUNT_SEQ}</span>'+
                        		'<span style="width:40px;display:inline-block;text-align:centger;">{CMS_PAYMENT_DAY_TEMP}</span>'+
                        		'<span style="width:110px;display:inline-block;">{CMS_CUSTOMER_COMMENT}</span>'+
                            '</div>'
                        ]
                    },*/
                    listeners       : {
                    	change:'onChoiceCms'
                    }
            	},{
            		html:'<div style="padding:4px 0 0 10px;color:red;">CMS 이체 접수일 경우 체크해 주십시오.</div>'
                }]
            },{
                xtype   :'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">접수문자</div>',
                width   : 100
            },{
                xtype:'exblockfield',
                items:[{
                    xtype        :'excombobox',
                    reference    :'cb_smsYn',
                    name         :'SMS_YN',
                    valueField   :'CODE',
                    displayField :'NAME',
                    width        : 90,
                    bind:{
                     	store:'{ds_smsYn}'
                    },
                    listeners  : {
                    	change:'onChangeSms'
                    }
                },{
                	width : 5,
                },{
                    layout       :'hbox',
                    reference    :'pannel_sms',
                	items :[{
                		html : "<div style='color:red;padding:3px 5px; 0 5px;'>발송전화번호 </div>"
                	},{
                		xtype        : 'excombobox',
                        valueField   : 'CODE',
                        displayField : 'NAME',
                        reference    : 'lc_mobile_telno1',
                        name         : 'MOBILE_TELNO1',
                        emptyText    : '선택',
                        width        : 60,
                        bind         : {
                        	store:'{ds_mobile_telno1}'
                        },
                	},{
                		width : 20,
                		html  : '<div style="width:20px;text-align:center;"> - </div>'
                	},{
                		xtype     : 'extextfield',
                        reference : 'txt_recMobiletelNo2',
                        name      : 'MOBILE_TELNO2',
                        width     : 60,
                	},{
                		width : 20,
                		html  : '<div style="width:20px;text-align:center;"> - </div>'
                	},{
                		xtype     : 'extextfield',
                        reference : 'txt_recMobiletelNo3',
                        name      : 'MOBILE_TELNO3',
                        width     : 60,
                	}]
                }]
            }]
        },{
        	xtype       : 'exblockrow',
        	reference   : 'panel_cms_row',
        	items:[{
        		xtype   : 'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">생년월일</div>',
                width   : 100
        	},{
        		xtype:'exblockfield',
                items:[{
                     xtype        : 'extextfield', 
                     exReadOnly   : true,
                     reference    :'me_juminNo',
                     name         :'JUMIN_NO',
                }]
        	},{
        		xtype   : 'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">계좌번호</div>',
                width   : 100
        	},{
        		 xtype:'exblockfield',
                 items:[{
                     xtype        : 'extextfield', 
                     exReadOnly   : true,
                     reference    :'txt_accountNumber',
                     name         :'ACCOUNT_NUMBER',
                 },{
                 	width : 3
                 },{
                 	xtype        : 'extextfield', 
                     exReadOnly   : true,
                     width        : 30,
                     reference    :'txt_accountSeq',
                     name         :'ACCOUNT_SEQ',
                 }]
        	},{
        		xtype   : 'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">결재일</div>',
                width   : 100
        	},{
                xtype:'exblockfield',
                items:[{
                	html   : '<span>매월</span>',
                	width  : 30
                },{
                    xtype        : 'extextfield',
                    width        : 30,
                    exReadOnly   : true,
                    reference    : 'me_bunnabDay',
                    name         : 'BUNNAB_DAY',
                },{
                	html   : '<span>일<span>',
                	width  : 15
                }]
        	},{
        		xtype   : 'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">은행</div>',
                width   : 100
        	},{
                xtype:'exblockfield',
                items:[{
                	xtype        : 'extextfield',
                    reference    : 'lc_bankNm',
                    name         : 'BANK_NM',
                    exReadOnly   : true,
                },{
                	width : 0,
                	height: 0,
                	items :[{
                		xtype            : 'extextfield',
	                    reference        : 'lc_bankNo',
	                    name             : 'BANK_NO',
	                    value            : '',
	                    inputType        : 'hidden',
                	},{
                		xtype            : 'extextfield',
	                    reference        : 'txt_cms_trade_cd',
	                    name             : 'txt_cms_trade_cd',
	                    value            : '',
	                    inputType        : 'hidden',
                	}]
                }]
        	}]
        },{
            xtype:'exblockrow',
            items:[{
                xtype   :'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">접수메모</div>',
                width   : 100
            },{
                xtype:'exblockfield',
                items:[{
                    xtype        : 'extextarea',
                    rows         : 3,
                    width        : '99.9%',
                    reference    : 'ta_memo',
                    name         : 'MEMO',
                }]
            },{
                xtype   : 'exblocklabel',
                html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">대표신도메모</div>',
                width   : 100
            },{
                xtype:'exblockfield',
                items:[{
                	xtype        : 'extextarea',
                    rows         : 3,
                    width        : '99.9%',
                    reference    : 'ta_daeju_memo',
                    name         : 'ta_daeju_memo',
                    exReadOnly   : true,
                }]
            }]
        }]
    }]
});
