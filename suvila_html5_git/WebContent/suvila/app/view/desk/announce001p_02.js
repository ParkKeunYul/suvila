Ext.define('ExFrm.view.desk.announce001p_02',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.desk.announce001p_02Controller',
    	'ExFrm.view.desk.announce001p_02Model'
    ],
    controller:'announce001p_02',
    viewModel:{
        type:'announce001p_02'
    },
    isModal:true,
    name:'announce001p_02',
    title:'연락처정보',
    closable:true,
    width:480,
    height:320,
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
        	/*html   : '<div style="width:100%;height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">연락처정보</div>',
        	width  : '100%',
        },{*/
        	height : 5
        },{
        	layout : 'hbox',
        	width  : '100%',
        	items  : [{
        		flex : 1 
        	},{
        		xtype     : 'exbutton',
          		text      : '저장',
          		handler   : 'onSave',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
          		text      : '닫기',
          		handler   : 'onClose',
        	},{
        		width   : 0,
        		height  : 0,
        		items   : [{
        			xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'ds_sms',
           	 		name      : 'ds_sms',
    		     },{
                	xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'ds_main',
           	 		name      : 'ds_main',
        		}]
        	}]       
        },{
        	height : 5
        },{
        	xtype   :'exfieldsetblockbox',
        	items   : [{
        		xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">성명</div>',
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		xtype      : 'extextfield',
                        reference  : 'txt_name_kor',
                        width      : 320,
                        exReadOnly : true,
                	}]
                }]
        	},{
        		xtype:'exblockrow',
                items:[{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">전화번호</div>'
                },{
                	xtype   : 'exblockfield',
                	items:[{
                		 xtype        : 'excombobox',
                         valueField   : 'CODE',
                         displayField : 'NAME',
                         reference    : 'lc_telno',
                         name         : 'TELNO1',
                         emptyText    : '선택',
                         bind         : {
                         	store:'{ds_telno1}'
                         },
                         width : 60
                	},{
                		width : 20,
                		html  : '<div style="width:20px;text-align:center;"> - </div>'
                	},{
                		 xtype      : 'extextfield',
                         reference  : 'txt_telno2',
                         name       : 'TELNO2',
                         exLabel    : '전화2',	                             
                         width     : 60,
                         enableKeyEvents : true,
                         listeners       : {
                       	   keyup : 'onKeyUpTel'
                         },	                        
                	},{
                		width : 20,
                		html  : '<div style="width:20px;text-align:center;"> - </div>'
                	},{
                		xtype       : 'extextfield',
                         reference  : 'txt_telno3',
                         name       : 'TELNO3',
                         exLabel    : '전화3',
                         maxLength  : 4,
                         width     : 60,
                         enableKeyEvents : true,
                         listeners       : {
                       	   keyup : 'onKeyUpTel'
                         },
                	}]
                }]
        	},{
        		xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">핸드폰</div>'                           
                },{
                	xtype   : 'exblockfield',
                	items   : [{
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
                        reference : 'txt_mobile_telno2',
                        name      : 'MOBILE_TELNO2',
                        width     : 60,
                        enableKeyEvents : true,
                         listeners       : {
                       	   keyup : 'onKeyUpTel'
                         },
                       // cls       : 'sin001w_01_number',
                	},{
                		width : 20,
                		html  : '<div style="width:20px;text-align:center;"> - </div>'
                	},{
                		xtype     : 'extextfield',
                        reference : 'txt_mobile_telno3',
                        name      : 'MOBILE_TELNO3',
                        width     : 60,
                        enableKeyEvents : true,
                         listeners       : {
                       	   keyup : 'onKeyUpTel'
                         },
                       // cls       : 'sin001w_01_number',
                	}]
                }]
        	},{
        		xtype:'exblockrow',
                items:[{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">비고</div>'
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      : 'extextarea',
            			 reference  : 'txt_remark',
                         name       : 'MEMO',
                         height     : 89,
                         width      : 310
                	}]
                }]
        	},{
        		xtype:'exblockrow',
                items:[{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">문자발송확인</div>'
                },{
                	xtype        : 'excombobox',
                    valueField   : 'CODE',
                    displayField : 'NAME',
                    reference    : 'lc_accept_yn',
                    emptyText    : '선택',
                    width        : 130,
                    bind         : {
                    	store:'{ds_accept_yn}'
                    },                    
                }]
        	}]
        }]
        
    }]
})