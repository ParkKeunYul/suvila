Ext.define('ExFrm.view.sin.sin013w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin013w_01',
	requires:[
		'ExFrm.view.sin.sin013w_01Controller',
        'ExFrm.view.sin.sin013w_01Model'
	],
	controller:'sin013w_01',
	viewModel:{
        type:'sin013w_01'
    },
    name:'sin013w_01',
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
                width           : 120 ,
                listeners       : {
              	   keyup : 'onSearchEnter',
                },        	
        	},{
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">항목</span>',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_org_NmAll',
                name         : 'V_CLASS_CD',	 
                emptyText    : '전체',
                labelWidth   : 40,
                width        : 220,
                bind         : {
                	store:'{ds_smsrec}'
                }
        	},{
    			width : 5,	    	
        	},{
        		xtype     : 'exbutton',
          		text      : '조회',
          		handler   : 'onSelect',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
          		text      : '삭제',
          		handler   : 'onDel',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
          		text      : '저장',
          		handler   : 'onSave',
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
        		}]
            }]
	    },{
	    	height  : 10,
	    },{
	    	layout : 'hbox',
	    	items  : [{
		    	width :  720,
	    		exGroupRef : true,
	            xtype      : 'exgrid',
	            reference  : 'sin013w_01_a',
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
	            },
	            cls       : 'none-dirty-grid',
	            columns   : [{
	            	text        : '순번',
	            	xtype       : 'rownumberer',                                  
	                align       : 'center',
	                width       : 65,
	            },{
	            	text      :'항목',
	            	xtype     :'excolumn',
	                dataIndex :'REC_NAME',                    
	                exAlign   :'center',
	                width     : 130,
	            },{
	            	text      :'발송일자',
	            	xtype     :'excolumn',
	                dataIndex :'DAY',                    
	                exAlign   :'center',
	                width     : 130,
	                exType    : 'date'
	            },{
	            	text      :'시간',
	            	xtype     :'excolumn',
	                dataIndex :'TIME',                    
	                exAlign   :'center',
	                width     :70,
	                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	
	                	return value.substr(0,2) + ":" + value.substr(2,2);
	                }
	            },{
	            	text      :'성명',
	            	xtype     :'excolumn',
	                dataIndex :'NAME_KOR',                    
	                exAlign   :'center',
	                width     : 110,
	            },{
	            	text      :'신도번호',
	            	xtype     :'excolumn',
	                dataIndex :'BUD_NO',                    
	                exAlign   :'center',
	                width     : 130,
	            },{
	            	text      :'휴대전화번호',
	            	xtype     :'excolumn',
	                dataIndex :'TR_PHONE',
	                exAlign   :'center',
	                width     : 130,
	                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	if(value == undefined || value == null){
	                		return "";
	                	}
	                	
	                	if(value.length == 11 ){
	                		return value.substr(0,3) + "-" +value.substr(3,4) + "-" +value.substr(7);
	                	}
	                	
	                	if(value.length == 10 ){
	                		return value.substr(0,3) + "-" +value.substr(3,3) + "-" +value.substr(6);
	                	}
	                	return value;
	                	
	                }
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
	    		xtype   :'exfieldsetblockbox',
	    		items   : [{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신도명</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                    		reference  : 'txt_name_kor',
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
                    		reference  : 'txt_card_no',
                            exReadOnly : true
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">핸드폰번호</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                    		reference  : 'txt_phone',                            
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">발송일</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'exdatefield',
                    		reference  : 'em_day',
                    		format     : 'Y-m-d',
                    		minValue   : new Date(),
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">발송시간</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                    		reference  : 'em_time',
                    		width      : 30,	                        	                        
	                        maxLength  : 2,
	                        minLength  : 2,
                    	},{
                    		html    : '<div style="padding:0 2px;font-weight:700;">:</div>'
                    	},{
                    		xtype      : 'extextfield',
	                        reference  : 'em_timeM',
	                        width      : 30,	                        	                        
	                        maxLength  : 2,
	                        minLength  : 2,
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">문자내용</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype            : 'extextarea',
	                        reference        : 'tx_tr_msg',
	                        width            : 340,	   
	                        height           : 300,
	                        listeners  : [{
	                        	change: 'onCheckSmsByte'
	                           ,blur  : 'onCheckSmsByte'
	                           ,focus : 'onCheckSmsByte'
	                        }]
                    	}]
                    }]
	    		},{
	    			html : '<div style="width:440px;text-align:center;padding:5px 0;"><span id="sp_byte">0</span> / <span id="sp_max">80 bytes (단문)</span></div>'
	    		}]
	    	}]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});