Ext.define('ExFrm.view.sin.sin009w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin009w_01',
	requires:[
		'ExFrm.view.sin.sin009w_01Controller',
        'ExFrm.view.sin.sin009w_01Model'
	],
	controller:'sin009w_01',
	viewModel:{
        type:'sin009w_01'
    },
    name:'sin009w_01',
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
        		width : 5
        	},{
        		html   :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:26px;padding-right:5px;">발송여부 : </div>',
			},{
				xtype     : 'radiogroup',
    			reference : 'tb_Radio',
    			name      : 'tb_Radio',
    			width     : 140,
    			listeners : {
					change : 'onRadioClick',
				},        			
    			items     : [{
    				boxLabel   : '발송', 
                	inputValue : 1,    
                	width      : 60,
                	reference  : 'tb_Radio1',
                	checked    : true
    			},{
    				boxLabel   : '미발송', 
                	inputValue : 2,    
                	width      : 70,
                	reference  : 'tb_Radio2',
    			}]
			},{
				width : 5
			},{
				html   :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:26px;padding-right:5px;">발송일 : </div>',
			},{
    			xtype          : 'exdatefield',
                reference      : 'em_sDate',
                format         : 'Y-m-d',
    		},{
    			html   :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:26px;padding:0 5px;"> ~ </div>',
    		},{
    			xtype          : 'exdatefield',
                reference      : 'em_eDate',
                format         : 'Y-m-d',
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
        		}]
            }]
	    },{
	    	height  : 10,
	    },{
	    	layout : 'hbox',
	    	items  : [{
		    	width :  920,
	    		exGroupRef : true,
	            xtype      : 'exgrid',
	            reference  : 'sin009w_01_a',
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
	                dataIndex :'NAME',                    
	                exAlign   :'center',
	                width     : 120,
	            },{
	            	text      :'발송일자',
	            	xtype     :'excolumn',
	                dataIndex :'TR_SENDDATE',                    
	                exAlign   :'center',
	                width     : 120,
	                exType    : 'date'
	            },{
	            	text      :'성명',
	            	xtype     :'excolumn',
	                dataIndex :'NAME_KOR',                    
	                exAlign   :'center',
	                width     : 100,
	            },{
	            	text      :'신도번호',
	            	xtype     :'excolumn',
	                dataIndex :'BUD_NO',                    
	                exAlign   :'center',
	                width     : 120,
	            },{
	            	text      :'휴대전화번호',
	            	xtype     :'excolumn',
	                dataIndex :'TR_PHONE',
	                exAlign   :'center',
	                width     : 120,
	            },{
	            	text      :'구분',
	            	xtype     :'excolumn',
	                dataIndex :'TR_MSG_GB',
	                exAlign   :'center',
	                width     : 70,
	                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	
	                	if(value == 'LMS'){
	                		return "장문";
	                	}
	                	return "단문"
	                	
	                }
	            },{
	            	text      :'상태',
	            	xtype     :'excolumn',
	                dataIndex :'TR_SENDSTAT',
	                exAlign   :'left',
	                width     : 120,
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
                        html    : '<div style="text-align:left;padding-left:5px;">내용</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextarea',
                    		reference  : 'tr_tr_msg',
                            width      : 340 ,
                            height     : 300,
                            exReadOnly : true
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">상태</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype            : 'extextfield',
	                        reference        : 'tr_tr_sendstat',
	                        width            : 340,	                        	                        
	                        exReadOnly       : true
                    	}]
                    }]
	    		}]
	    	}]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});