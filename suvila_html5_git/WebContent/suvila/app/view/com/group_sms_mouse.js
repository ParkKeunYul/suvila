Ext.define('ExFrm.view.com.group_sms_mouse',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.group_sms_mouseController',
    	'ExFrm.view.com.group_sms_mouseModel'
    ],
    controller:'group_sms_mouse',
    viewModel:{
        type:'group_sms_mouse'
    },
    isModal:true,
    name:'group_sms_mouse',
    title:'SMS 발송',
    closable:true,
    width:1010,
    height:900,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        width  : '99.8%',
        layout : {
            type:'vbox',
            align:'center'
        },
        items  :[{
        	hidden : true,
    		layout : 'hbox',
    		items  : [{
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
        	 	reference : 'ds_sms',
        	 	name      : 'ds_sms',
        	 	width     : 0
	         },{
              	xtype     : 'extextfield',
         	 	inputType : 'hidden',
         	 	reference : 'max_length_sms',
         	 	name      : 'max_length_sms',
         	 	value     : 80
	         },{
              	xtype     : 'extextfield',
         	 	inputType : 'hidden',
         	 	reference : 'max_length_lms',
         	 	name      : 'max_length_lms',
         	 	value     : 1000
	         },{
               	xtype     : 'extextfield',
          	 	inputType : 'hidden',
          	 	reference : 'TR_MSGTYPE',
          	 	name      : 'TR_MSGTYPE',
	         },{
     			xtype            : 'extextfield',
                reference        : 'txt_sel_index',
                value            : '-1',
                inputType        : 'hidden',
          	 	value     : 0
    		}]
        },{
        	layout : 'hbox',
        	items  : [{
        		width : 5
        	},{
        		width  : 525,
        		layout : 'vbox',
        		items  : [{
        			html   : "<div style='color:red;'>*휴대전화번호가 등록되지 않은 신도는 선택할수 없습니다.<br/>중복발송의 방지를 위해 발송시 휴대번호 중복체크를 합니다.</div>",
        			height : 35
        		},{
        			height : 5
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'group_sms_mouse_a',
                    cls           : 'none-dirty-grid topCheckHeader',
                    height        : 770,
                    width         : '100%',
                    bind          : {
                        store:'{ds_main}'
                    },
                    columns:[{
                    	text           : '선택',
	                	xtype          : 'excheckcolumn',
	                    dataIndex      : 'SEL_YN',                    
	                    exAlign        : 'center',
	                    headerCheckbox : true,
	                    width          : 90,
                    },{
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BUD_NO',                    
                        exAlign     : 'center',
                        width       : 140,
                    },{
                    	text        : '성명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 140,                  
                    },{
                    	text        : '핸드폰',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MOBILE_TELNO',                    
                        exAlign     : 'center',
                        width       : 140,                       
                    }]
        		}],
        		
        	},{
        		width : 10
        	},{        		
        		layout : 'vbox',
        		items  :[{
        			layout : 'hbox',
	    			width  : '100%',
	    			items  :[{
	    				flex : 1
	    			},{
	        			xtype     : 'exbutton',
	              		text      : '발송',
	              		handler   : 'onSmsSend',
	    			},{
	    				width : 5
	    			},{
	    				xtype     : 'exbutton',
	              		text      : '닫기',
	              		handler   : 'onClose',
	    			}]
        		},{
        			layout : 'hbox',
	    			width  : '100%',
	    			items  : [{
	    				html   :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:26px;padding-right:5px;">발송날짜 : </div>',
	    			},{
	    				xtype     : 'radiogroup',
            			reference : 'rd_sendDate',
            			name      : 'rd_sendDate',        
            			style     : 'background-color: #E3E3E3 !important;padding : 0 0 0 0px;',
            			listeners : {
    						change : 'onRadioClick',
    					},        			
            			items     : [{
            				boxLabel   : '즉시발송', 
    	                	inputValue : 1,    
    	                	width      : 90,
    	                	reference  : 'rd_sendDate1',
    	                	checked    : true
            			},{
            				boxLabel   : '예약발송', 
    	                	inputValue : 2,    
    	                	width      : 90,
    	                	reference  : 'rd_sendDate2',
            			}]
	    			},{	    
	    				layout     : 'hbox',
	    				reference  : 'td_sendDate',
	    				hidden     : true,
	    				items      : [{
	    					xtype            : 'exdatefield',
	                        reference        : 'me_sendDate',
	                        width            : 140,	                        	                        
	                        name             : 'V_BUD_NO',
	                        minValue         : new Date(),
	    				},{
	    					width : 5
	    				},{
	    					xtype            : 'extextfield',
	                        reference        : 'me_sendTimeT',
	                        width            : 30,	                        	                        
	                        maxLength        : 2,
	                        minLength        : 2,
	    				},{
	    					html   :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:26px;padding:0 3px;">:</div>',
	    				},{
	    					xtype            : 'extextfield',
	                        reference        : 'me_sendTimeM',
	                        width            : 30,	                        	                        
	                        maxLength        : 2,
	                        minLength        : 2,
	    				}]
	    			}]
        		},{
	    			height : 5
	    		},{
	    			layout : 'hbox',
	    			items  :[{
	    				html   :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:26px;padding-right:5px;font-size:16px;">SMS내용 : </div>',
	    			},{
	    				xtype        : 'excombobox',
	                    valueField   : 'CODE',
	                    displayField : 'VALUE',
	                    reference    : 'lc_smsItem',
	                    emptyText    : '전체',
	                    width        : 140,
	                    value        : '',
	                    bind         : {
	                    	store:'{ds_smsItem}'
	                    },
	                    listeners       : [{
	                    	 change: 'onChangeSmsItem'	                    	
	                    }]
	    			}]
	    		},{
	    			height : 5
	    		},{
	    			xtype      : 'extextarea',
       			 	reference  : 'ta_msg',
                    name       : 'MEMO',
                    width      : 440,
                    height     : 189,
                    listeners  : [{
                    	change: 'onCheckSmsByte'
                       ,blur  : 'onCheckSmsByte'
                       ,focus : 'onCheckSmsByte'
                    }]
	    		},{
	    			html : '<div style="width:440px;text-align:center;"><span id="sp_byte">0</span> / <span id="sp_max">80 bytes (단문)</span></div>'
	    		},{
	    			height : 3
	    		},{
	    			layout : 'hbox',
	    			width  : 440,
	    			items  : [{
	    				width : 30
	    			},{
	    				html : '<span style="font-weight:700;padding-right:5px;line-height:22px;">연락처 : </span>'
	    			},{
	    				xtype      :'extextfield',
	    				name       : 'me_telno',
	    				reference  : 'me_telno',
	    			},{
	    				width : 3
	    			},{
	    				html : '<span style="padding-right:5px;line-height:22px;">(숫자만입력하세요.)</span>'
	    			}]
	    		},{
	    			height : 10
	    		},{
	    			html : '<div style="color:red;">즐겨사용하는 SMS문장들을 등록/수정합니다<br/>더블클릭으로 상단의 SMS내용에 적용합니다 </div>'
	    		},{
	    			height : 5
	    		},{
	    			layout : 'hbox',
	    			width  : '100%',
	    			items  : [{
	    				width : 300
	    			},{
	    				xtype   : 'exbutton',
                        text    : '추가',
                        handler : 'onAdd'
	    			},{
	    				width : 5
	    			},{
	    				xtype   : 'exbutton',
                        text    : '삭제',
                        handler : 'onDel'
	    			},{
	    				width : 5
	    			},{
	    				xtype   : 'exbutton',
                        text    : '저장',
                        handler : 'onSave'
	    			}]
	    		},{
	    			height : 5
	    		},{
	    			xtype      : 'exgrid',
                    width      : 440,
                    height     : 200,
                    cls        : 'none-dirty-grid',
                    reference  : 'group_sms_mouse_b',
                    bind:{
                        store:'{ds_sms_doc}'
                    },
                    listeners      : {
                    	selectionchange : 'onSelectionChange',
                    	itemdblclick    : 'onSmsDbClick'
                    },
                    columns:[{
                    	text         :'SMS문구',
                    	xtype        :'excolumn',
                        dataIndex    :'DOC_TEXT',
                        flex         : 1,
                        exAlign      : 'left',                        
                    }]
	    		},{
	    			height : 5
	    		},{
	    			xtype      : 'extextarea',
       			 	reference  : 'ta_sms_doc',
                    width      : 440,
                    height     : 189
	    		}]
        	}]
        }]
        
    }]
})