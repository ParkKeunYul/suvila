Ext.define('ExFrm.view.sin.sin006w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin006w_01',
	requires:[
		'ExFrm.view.sin.sin006w_01Controller',
        'ExFrm.view.sin.sin006w_01Model'
	],
	controller:'sin006w_01',
	viewModel:{
        type:'sin006w_01'
    },
    name:'sin006w_01',
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
    			width : 5,
	    	},{
	    		width : 65,
	    		html  :'<div style="text-align:center;width:65px;font-weight:700;line-height:24px;">발급일자: </div>',
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'me_SDate',
                format         : 'Y-m-d',
                width          : 100
    		},{
    			html :'<div style="text-align:center;width:20px;font-weight:700;line-height:24px;">~</div>',
    			width : 20
    		},{
    			xtype          : 'exdatefield',
                reference      : 'me_EDate',
                format         : 'Y-m-d',
                width          : 100 
        	},{
        		width : 5
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
                reference  : 'sin006w_01_a',
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
                cls       : 'sin006w_01_a  none-dirty-grid',
                columns   : [{
                	text      :'순번',
                    xtype     :'rownumberer',
                    align     : 'center',
                    width     : 55,
                },{
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
                	text      :'카드번호',
                	xtype     :'excolumn',
                    dataIndex :'CARD_NO',                    
                    exAlign   :'center',
                    width     : 160,
                },{
                	text      :'발급일',
                	xtype     :'excolumn',
                    dataIndex :'ENTRY_DATE',                    
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
                        html    : '<div style="text-align:left;padding-left:5px;">카드번호</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_card_no',
                            name       : 'CARD_NO',
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;">발급일자</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype     : 'exdatefield',
                            reference : 'em_entry_date',
                            exLabel   : '입회일',                            
                            name      : 'ENTRY_DATE',	                            
                            format    : 'Y/m/d',
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