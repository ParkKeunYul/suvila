Ext.define('ExFrm.view.sin.sin017w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin017w_01',
	requires:[
		'ExFrm.view.sin.sin017w_01Controller',
        'ExFrm.view.sin.sin017w_01Model'
	],
	controller:'sin017w_01',
	viewModel:{
        type:'sin017w_01'
    },
    name:'sin017w_01',
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
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">발급여부</span>',
                valueField   : 'value',
                displayField : 'display',
                reference    : 'search_state',
                emptyText    : '선택',
                labelWidth   : 70,
                width        : 165,
                value        : '',
                bind         : {
                	store:'{ds_issue_type}'
                }
        	},{
        		xtype        : 'excombobox',
                valueField   : 'value',
                displayField : 'display',
                reference    : 'search_date',
                emptyText    : '선택',
                width        : 100,
                value        : '1',
                bind         : {
                	store:'{ds_date_type}'
                }
        	},{
        		width : 5
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
          		text      : '정산처리',
          		handler   : 'onSetting',
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
    		width : '100%',	    	
    		exGroupRef : true,
            xtype      : 'exgrid',
            reference  : 'sin017w_01_a',
            height     : 400,
            plugins    :[{
            	ptype: 'gridexporter'
            }],
            bind       : {
                store:'{ds_main}'
            },
            listeners      : {
            	selectionchange : 'onSelectionChange'
            },
            cls       : 'sin017w_01_a  none-dirty-grid',
            columns   : [{
            	headerCheckbox : true,
            	text      :'선택',
            	xtype     :'excheckcolumn',
                dataIndex :'CHECK_P',                    
                exAlign   :'center',
                width     : 75,
            },{
            	text      :'순번',
                xtype     :'rownumberer',
                align     : 'center',
                width     : 55,
            },{
            	text      :'신도번호',
            	xtype     :'excolumn',
                dataIndex :'BUD_NO',                    
                exAlign   :'center',
                width     : 120,
            },{
            	text      :'성명',
            	xtype     :'excolumn',
                dataIndex :'NAME_KOR',                    
                exAlign   :'center',
                width     : 100,
            },{
            	text      :'카드번호',
            	xtype     :'excolumn',
                dataIndex :'CARD_NO',                    
                exAlign   :'center',
                width     : 160,
            },{
            	text      :'발급상태',
            	xtype     :'excolumn',
                dataIndex :'ISSUE_STATE',                    
                exAlign   :'center',
                width     : 100,
                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_issue');
                	return exCommon.getComboVal(value,store, '' );
                }
            },{
            	text      :'접수일',
            	xtype     :'excolumn',
                dataIndex :'REC_DATE',                    
                exAlign   :'center',
                width     : 120,
                exType    : 'date'
            },{
            	text      :'신청일',
            	xtype     :'excolumn',
                dataIndex :'CRT_DATE',                    
                exAlign   :'center',
                width     : 120,
                exType    : 'date'
            },{
            	text      :'정산금액',
            	xtype     :'excolumn',
                dataIndex :'TEMPLE_PRICE',                    
                exAlign   :'left',
                width     : 100,
                exType    : 'number',
                exAlign   : 'right'
            },{
            	text      :'정산일',
            	xtype     :'excolumn',
                dataIndex :'SETTING_DATE',                    
                exAlign   :'center',
                width     : 120,
                exType    : 'date'
            },{
            	text      :'배송일',
            	xtype     :'excolumn',
                dataIndex :'DELIVERY_DATE',                    
                exAlign   :'center',
                width     : 120,
                exType    : 'date'
            }],
            viewConfig: {
            	getRowClass: function(record, index) {
                    var ISSUE_STATE = record.get('ISSUE_STATE');	                   
                    if(ISSUE_STATE == '2'){
                    	return 'color_depth_1';
                    }else{
                    	return 'recCellEdit';
                    }
                }
            }
	    },{
	    	layout : 'hbox',
	    	width  : '100%',
	    	items  : [{
	    		width  : 600,
	    		xtype:'exfieldsetblockbox',
                height:230,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                items:[{
                	
                    xtype:'exblockrow',
                    flex:1,
                    layout:{
                        type:'hbox',
                        align:'stretch'
                    },
                    items:[{
                        xtype:'exblockrow',
                        width:140,
                        layout:{
                            type:'vbox',
                            align:'stretch'
                        },
                        items:[{
                            xtype  : 'exblocklabel',
                            html   : '사진',
                            height : 30
                        },{
                            flex     : 1,
                            xtype    : 'exblockfield',
                            reference: 'imageBlock',
                            items    : [{
                            	xtype     : 'image',
                            	reference : 'image',
                            	height    : '100%',
                                width     : '100%',
                            }]
                        }]
                    },{
                        xtype:'exblocklabel',
                        width:80,
                        html:'메모'
                    },{
                        flex:1,
                        xtype:'exblockfield',
                        reference:'memoBlock',
                        items:[{
                        	xtype     : 'extextarea',
                        	rows      : 6,
                            width     :'100%',
                            height    :'100%',
                            reference : 'memo',
                            name      : 'memo',
                            exReadOnly : true
                        }]
                    }]

                },{
                    xtype:'exblockrow',
                    items:[{
                        xtype : 'exblocklabel',
                        width : 220,
                        html  : '첨부파일명'
                    },{
                        flex      :1,
                        xtype     :'exblockfield',
                        items:[{
                        	 xtype      : 'extextfield',
                             reference  : 'txt_file_name',
                             exReadOnly : true,
                             width      :'100%',
                        }]
                    }]
                }]
	    	},{
	    		width : '100%',	    	
	    		exGroupRef : true,
	            xtype      : 'exgrid',
	            reference  : 'sin017w_01_b',
	            height     : 230,
	            plugins    :[{
	            	ptype: 'gridexporter'
	            }],
	            bind       : {
	                store:'{ds_sub}'
	            },
	            cls       : 'sin017w_01_a  none-dirty-grid',
	            columns   : [{
	            	text      :'순번',
	                xtype     :'rownumberer',
	                align     : 'center',
	                width     : 55,
	            },{
	            	text      :'신도번호',
	            	xtype     :'excolumn',
	                dataIndex :'BUD_NO',                    
	                exAlign   :'center',
	                width     : 120,
	            },{
	            	text      :'성명',
	            	xtype     :'excolumn',
	                dataIndex :'NAME_KOR',                    
	                exAlign   :'center',
	                width     : 100,
	            },{
	            	text      :'카드번호',
	            	xtype     :'excolumn',
	                dataIndex :'CARD_NO',                    
	                exAlign   :'center',
	                width     : 160,
	            },{
	            	text      :'발급상태',
	            	xtype     :'excolumn',
	                dataIndex :'ISSUE_STATE',                    
	                exAlign   :'center',
	                width     : 100,
	                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_issue');
	                	return exCommon.getComboVal(value,store, '' );
	                }
	            }]
	    	}]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});