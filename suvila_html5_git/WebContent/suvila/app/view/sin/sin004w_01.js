Ext.define('ExFrm.view.sin.sin004w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin004w_01',
	requires:[
		'ExFrm.view.sin.sin004w_01Controller',
        'ExFrm.view.sin.sin004w_01Model'
	],
	controller:'sin004w_01',
	viewModel:{
        type:'sin004w_01'
    },
    name:'sin004w_01',
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
             	   blur  : 'onSearchBlur'
                },
        	},{
        		width : 5
        	},{
        		xtype           : 'exbutton',
                cls             : 'exbuttonsrch',
                text            : '신도조회',                
                listeners       : [{
                	click:'onSindoSearch'
                }]
        	},{
        		width : 5
        	},{
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">수계</span>',
                valueField   : 'CONF_CODE',
                displayField : 'CONF_NAME',
                reference    : 'lc_buddhismAll',
                emptyText    : '선택',
                labelWidth   : 50,
                width        : 250,
                value        : '0',
                bind         : {
                	store:'{ds_buddhismAll}'
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
          		text      : '신규등록',
          		handler   : 'onAddSindo',
    		},{
    			width : 5
    		},{
    			xtype     : 'exbutton',
          		text      : '추가',
          		handler   : 'onPlus',
    		},{
    			width : 5
    		},{
    			xtype     : 'exbutton',
          		text      : '삭제',
          		handler   : 'onDelete',
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
                    inputType        : 'hidden',
                    //name             : 'V_BUD_NO'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_budNo',
                    value            : '',
                    inputType        : 'hidden',
                   // name             : 'txt_budNo'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_card_no',
                    value            : '',
                    inputType        : 'hidden',
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_sel_index',
                    value            : '-1',
                    inputType        : 'hidden',
        		},{
        			xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'newData',
           	 	//	name      : 'newData',
    		     },{
                	xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'uptData',
           	 	//	name      : 'uptData',
    	         },{
                	xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'delData',
           	 	//	name      : 'delData',
        		}]
            }]
	    },{
	    	height  : 15,
	    },{	    	
	    	height  : 25,
	    	layout  : 'hbox',
	    	width   : '100%',
	    	items   : [{
	    		html : '<div style="line-height:25px;font-weight:700;font-size:16px;">신도증 발급정보</div>'	    		    		
	    	}]
	    },{
	    	layout : 'hbox',
	    	width  : '100%',
	    	items  :[{
	    		width : 560,	    	
	    		exGroupRef : true,
                xtype      : 'exgrid',
                reference  : 'sin004w_01_a',
                height     : 700,
                plugins    :[{
                	ptype: 'gridexporter'
                }],
                bind       : {
                    store:'{ds_main}'
                },
                listeners      : {
                	selectionchange : 'onSelectionChange'
                },
                cls       : 'sin004w_01_a  none-dirty-grid',
                columns   : [{
                	text      :'성명',
                	xtype     :'excolumn',
                    dataIndex :'NAME_KOR',                    
                    exAlign   :'left',
                    width     : 100,
                },{
                	text      :'신도번호',
                	xtype     :'excolumn',
                    dataIndex :'BUD_NO',                    
                    exAlign   :'center',
                    width     : 120,
                },{
                	text      :'법명',
                	xtype     :'excolumn',
                    dataIndex :'SACRED_KOR',                    
                    exAlign   :'left',
                    width     : 100,
                },{
                	text      :'계사',
                	xtype     :'excolumn',
                    dataIndex :'GAESA',                    
                    exAlign   :'left',
                    width     : 100,
                },{
                	text      :'수계일',
                	xtype     :'excolumn',
                    dataIndex :'PREC_DATE',                    
                    exAlign   :'center',
                    width     : 110,
                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.getFormat(value,'dateYMD' );
                    }
                }]
	    	},{
	    		width : 20
	    	},{
	    		flex : 1,
	    		xtype   :'exfieldsetblockbox',
	    		items   : [{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">신도명</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_name_kor',
                            name       : 'NAME_KOR',
                            exReadOnly : true,
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">신도번호</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_bud_no',
                            name       : 'BUD_NO',
                            exReadOnly : true,
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">법명</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_sacred_kor',
                            name       : 'SACRED_KOR',
                            width      : '99%'
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">법명(한자)</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_sacred_han',
                            name       : 'SACRED_HAN',
                            width      : '99%'
                    	}]
                    }]	    		
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">수계종류</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype        : 'excombobox',
                            valueField   : 'CONF_CODE',
                            displayField : 'CONF_NAME',
                            reference    : 'lc_buddhismSelect',
                            emptyText    : '전체',
                            labelWidth   : 50,
                            width        : '99%',
                            value        : '0',
                            bind         : {
                            	store:'{ds_buddhismSelect}'
                            },
                    		name         : 'CONF_CODE' 
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">수계일</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype     : 'exdatefield',
                            reference : 'em_prec_date',
                            exLabel   : '수계일',                            
                            name      : 'PREC_DATE',	                            
                            format    : 'Y/m/d',
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">계사</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_gaesa',
                            name       : 'GAESA',
                            width      : '99%',
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">내역</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextarea',
                    		reference  : 'ta_memo',
                            name       : 'MEMO',
                            width      : '99%',
                            height     : 89
                    	}]
                    }]
	    		}]
	    	}]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});