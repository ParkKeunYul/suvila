Ext.define('ExFrm.view.sin.sin011w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin011w_01',
	requires:[
		'ExFrm.view.sin.sin011w_01Controller',
        'ExFrm.view.sin.sin011w_01Model'
	],
	controller:'sin011w_01',
	viewModel:{
        type:'sin011w_01'
    },
    name:'sin011w_01',
    isRootView:true,
    title:'신도검색',
    closable:true,
    scrollable:true,
    layout  : 'hbox',
    items:[{
    	width  : '0.5%'
    },{
    	width  : '98.5%',
        xtype:'exformmain',
	    items:[{
	    	height  : 10,
	    },{
	    	width   : '100%',
	    	layout  : 'hbox',
            xtype   : 'container',
            items   : [{
            	xtype           : 'excombobox',
        		//fieldLabel      : '<span style="font-weight: 700;">신도검색</span>',        		
        		labelAlign      : 'left',
                reference       : 'cb_Stipulation',
                displayField    : 'name',
                valueField      : 'code',
                exCommonDmnCode :'001',    
                width           : 110,
                store           : {},
                listeners       : {
                	change:'onSearchTypeChange'
                }
            },{
        		width : 2
        	},{
        		xtype           : 'extextfield',
                reference       : 'txt_stipulation',
                value           : '',
                enableKeyEvents : true,
                width           : 110 ,
                listeners       : {
              	   keyup : 'onSearchEnter',
                },
        	},{
        		width : 5
        	},{
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">신도분류</span>',
                valueField   : 'CLASS_CD',
                displayField : 'CLASS_NAME',
                reference    : 'lc_classMgt',
                name         : 'V_CLASS_CD',	 
                emptyText    : '선택',
                labelWidth   : 70,
                width        : 220,
                value        : '0',
                bind         : {
                	store:'{ds_classMgt}'
                }
        	},{
        		hidden     : true,
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">단체명</span>',
                valueField   : 'ORG_CD',
                displayField : 'ORG_NAME',
                reference    : 'lc_org_NmAll',
                emptyText    : '전체',
                labelWidth   : 60,
                width        : 200,
                value        : 0,
                bind         : {
                	store:'{ds_org_NmAll}'
                }
        	},{
    			width : 5,	    	
        	},{
        		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		text      : '조회',
          		handler   : 'onSelect',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		text      : '엑셀',
          		handler   : 'onExcel',
        	},{
    			width : 5
    		},{
    			xtype     : 'exbutton',
          		text      : '발송',
          		handler   : 'onSmsSend',
        	},{
        		width            : 0,
        		height           : 0,
        		items            :[{
        			xtype            : 'extextfield',
                    reference        : 'hid_bud_no',
                    value            : '',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
                    name             : 'V_BUD_NO'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_budNo',
                    value            : '',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
                    name             : 'txt_budNo'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_sel_index',
                    value            : '-1',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
        		},{
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
              	 	value     : 0
        		}]
            }]
	    },{
	    	height  : 15,
	    },{	    	
	    	width   : '100%',
	    	items   : [{
	    		html : '<div style="line-height:25px;font-weight:700;font-size:12px;color:red;">* Shift,Ctrl 키조합으로 신도를 다중 선택한 다음, 마우스우클릭으로 발송대상자 선택이 가능합니다. </div>'	    		    		
	    	}]
	    },{
	    	layout : 'hbox',
	    	items  : [{
		    	width :  920,
	    		exGroupRef : true,
	            xtype      : 'exgrid',
	            reference  : 'sin011w_01_a',
	            height     : 700,
	            multiSelect: true, 	            
	            plugins    :[{
	            	ptype: 'gridexporter'
	            }],
	            bind       : {
	                store:'{ds_main}'
	            },
	            listeners      : {
	            	 selectionchange : 'onSelectionChange'
	            	,itemcontextmenu : 'onMouseRight'
	            },
	            cls       : 'none-dirty-grid',
	            columns   : [{
	            	headerCheckbox : true,
	            	text      :'선택',
	            	xtype     :'excheckcolumn',
	                dataIndex :'SEL_YN',                    
	                exAlign   :'center',
	                width     : 75,
	            },{
	            	text      :'신도번호',
	            	xtype     :'excolumn',
	                dataIndex :'BUD_NO',                    
	                exAlign   :'center',
	                width     : 120,
	            },{
	            	text      :'신도명',
	            	xtype     :'excolumn',
	                dataIndex :'NAME_KOR',                    
	                exAlign   :'center',
	                width     : 100,
	            },{
	            	text      :'전화번호',
	            	xtype     :'excolumn',
	                dataIndex :'TELNO_M',                    
	                exAlign   :'center',
	                width     : 160,
	            },{
	            	text      :'휴대전화',
	            	xtype     :'excolumn',
	                dataIndex :'MOBILE_TELNO_M',                    
	                exAlign   :'center',
	                width     : 160,
	
	            },{
	            	text      :'주소',
	            	xtype     :'excolumn',
	                dataIndex :'ADDR',                    
	                exAlign   :'left',
	                width     : 300,
	            
	            }],
	            viewConfig: {
	            	/*getRowClass: function(record, index) {
	                    var ISSUE_STATE = record.get('ISSUE_STATE');	                   
	                    if(ISSUE_STATE == '2'){
	                    	return 'color_depth_1';
	                    }else{
	                    	return 'recCellEdit';
	                    }
	                }*/
	            }
	    	},{
	    		width  : 5
	    	},{
	    		layout : 'vbox',
	    		flex   : 1,
	    		items  :[{
	    			layout : 'hbox',
	    			width  : '100%',
	    			items  : [{
	    				html   :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:26px;padding-right:5px;">발송날짜 : </div>',
	    			},{
	    				xtype     : 'radiogroup',
            			reference : 'rd_sendDate',
            			name      : 'rd_sendDate',
            			listeners: {
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
	    				exReadOnly : true 
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
                    reference  : 'sin011w_01_b',
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
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});