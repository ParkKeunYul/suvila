Ext.define('ExFrm.view.asp.asp033w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp033w_01',
	requires:[
		'ExFrm.view.asp.asp033w_01Controller',
        'ExFrm.view.asp.asp033w_01Model'
	],
	controller:'asp033w_01',
	viewModel:{
        type:'asp033w_01'
    },
    name:'asp033w_01',
    isRootView:true,
    title:'메뉴관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	layout : 'vbox',
	        	width  : '99%',
	        	items  : [{
	        		height : 10
	        	},{
	        		layout : 'hbox',
	        		width  : '100%',
	        		height : 30,
	        		items  : [{
	        			xtype        :'excombobox',
	        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;"> 사철 </span>',
	        			labelWidth   :40,
	                    valueField   :'TEMPLE_CD',
	                    displayField :'TEMPLE_NM',
	                    reference    :'lc_templeCd',
	                    name         :'V_SEARCH_TEMPLE_VALUE',                    
	                    value        : '',
	                    width         : 200,
	                    bind:{
	                     	store:'{ds_templeCd}'
	                    },
	        		},{
	        			width : 5
	        		},{
	        			xtype        :'excombobox',
	        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">구분 </span>',
	        			labelWidth   :40,
	                    valueField   :'CODE',
	                    displayField :'NAME',
	                    reference    :'search_type',
	                    width        : 150,
	                    value        : 'BUD_NAME',
	                    bind:{
	                     	store:'{ds_type}'
	                    },
	        		},{
	        			xtype           : 'extextfield',
                        reference       : 'search_value',
                        enableKeyEvents : true,
                        width           : 200 ,
                        listeners       : {
                     	   keyup : 'onSearchEnter',
                     	   blur  : 'onSearchBlur'
                        },
	        		},{
	        			width : 5
	        		},{
	        			xtype        :'excombobox',
	                    valueField   :'CODE',
	                    displayField :'NAME',
	                    reference    :'search_date',
	                    width        : 100,
	                    value        : '1',
	                    bind:{
	                     	store:'{ds_date_type}'
	                    },
	        		},{
	        			xtype          : 'exdatefield',
                        reference      : 'start_date',
                        format         : 'Y-m-d',
            		},{
            			html :'<div style="text-align:center;width:20px;line-height:25px;">~</div>',
            			width : 20
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'end_date',
                        format         : 'Y-m-d',
            		},{
	        			width : 5
	        		},{
	        			xtype        :'excombobox',
	        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">발급상태 </span>',
	        			labelWidth   :65,
	                    valueField   :'CODE',
	                    displayField :'NAME',
	                    reference    :'search_issue',
	                    width        : 180,
	                    value        : '',
	                    bind:{
	                     	store:'{ds_issue_state}'
	                    },
	        		},{
	        			width : 5
	        		},{
	        			xtype        :'excombobox',
	        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">정산유무 </span>',
	        			labelWidth   :65,
	                    valueField   :'CODE',
	                    displayField :'NAME',
	                    reference    :'search_setting',
	                    width        : 180,
	                    value        : '',
	                    bind:{
	                     	store:'{ds_setting}'
	                    },
	        		},{
	        			width : 5
	        		},{
	        			xtype     : 'exbutton',
                  		text      : '조회',
                  		handler   : 'onSelect',
	        		},{
	        			width : 5
	        		},{
	        			xtype     : 'exbutton',
                  		text      : '엑셀',
                  		handler   : 'onExcel',
	        		},{
	        			width : 5
	        		},{
	        			xtype     : 'exbutton',
                  		text      : '저장',
                  		handler   : 'onSave',
	        		},{
	        			width : 5
	        		},{
	        			xtype     : 'exbutton',
                  		text      : '발급',
                  		handler   : 'onIssue',
	        		},{
	        			width : 5
	        		},{
	        			xtype     : 'exbutton',
                  		text      : '배송처리',
                  		handler   : 'onDelivery',
	        		},{
	        			width : 0,
	        			height: 0,
	        			items : [{
	        				xtype            : 'extextfield',
                            reference        : 'txt_budNo',
                            value            : '',
                            inputType        : 'hidden',
	        			},{
	        				xtype            : 'extextfield',
                            reference        : 'uptData',
                            value            : '',
                            inputType        : 'hidden',
                            name             : 'uptData',
	        			}]
	        		}]
	        	
	        	},{
	        		height : 5
	        	},{
	        		exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec033w_02_a',
                    cls           : 'none-dirty-grid rec033w_02_a topCheckHeader',
                    height        : 450,
                    width         : '100%',
                    bind          : {
                        store:'{ds_main}'
                    },
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
                    },{
                    	ptype: 'gridexporter'
	                }],
	                listeners      : {
	                	beforeedit      : 'onBeforeedit',	    
	                	edit            : 'onEdit',
	                	selectionchange : 'onSelectionChange'
                    },
                    columns:[{
                    	text           : '선택',
	                	xtype          : 'excheckcolumn',
	                    dataIndex      : 'CHECK_P',                    
	                    exAlign        : 'center',
	                    headerCheckbox : true,
	                    width          : 90,
                    },{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center', 
                    },{
                    	text        : '신청일자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'CRT_DATE',                    
                        exAlign     : 'center',
                        width       : 105,
                        sortable    : true,
                        exType      : 'date'
                    },{
                    	text        : '정산일자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'SETTING_DATE',                    
                        exAlign     : 'center',
                        width       : 105,
                        sortable    : true,
                        exType      : 'date'
                    },{
                    	text        : '발송일자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ISSUE_DATE',                    
                        exAlign     : 'center',
                        width       : 105,
                        sortable    : true,
                        exType      : 'date'
                    },{
                    	text        : '베송일자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'DELIVERY_DATE',                    
                        exAlign     : 'center',
                        width       : 105,
                        sortable    : true,
                        exType      : 'date',
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	//meta.tdCls = 'recCellEdit';
                        	
                        	
                        	if(value == undefined || value == "" || value == null){
                        		
                        		try{
                        			if(record.previousValues.DELIVERY_DATE != null){
                        				return exCommon.getGridDateFormat(record.previousValues.DELIVERY_DATE+'','-' , 8);
                        			}
                        		}catch (e) {}
                        		
                        	//	return "";
                        	}
                        	return exCommon.getGridDateFormat(value,'-' , 8);
                        },
                        editor    : {
	                    	xtype         : 'exdatefield',
	                    	format        : 'Y-m-d'
	                    },
                        	
                    },{
                    	text        : '사찰명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'TEMPLE_NM',                    
                        exAlign     : 'left',
                        width       : 120,
                        sortable    : true,
                    },{
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BUD_NO',                    
                        exAlign     : 'left',
                        width       : 120,
                        sortable    : true,
                    },{
                    	text        : '신도증번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'CARD_NO_MASK',                    
                        exAlign     : 'center',
                        width       : 150,
                        sortable    : true,
                    },{
                    	text        : '신도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 120,
                        sortable    : true,
                    },{
                    	text        : '사진',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PHOTO_FLAG',                    
                        exAlign     : 'left',
                        width       : 90,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_issue');
                        	return exCommon.getComboVal(value,store, '' );
                        }
                    },{
                    	text        : '발급여부',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ISSUE_STATE',                    
                        exAlign     : 'center',
                        width       : 110,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_issue');
                        	return exCommon.getComboVal(value,store, '' );
                        },
                        editor        : {
                        	xtype        : 'excombobox',
                            valueField   : 'CODE',
                            displayField : 'NAME',
                            bind:{
                                store:'{ds_yn_issue}'
                            }
                        },
                    },{
                    	text        : '금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'TEMPLE_PRICE',                    
                        exAlign     : 'right',
                        width       : 120,
                        sortable    : true,
                        exType     : 'number',
                    },{
                    	text        : '삭제',
                    	xtype       : 'excolumn',
                        dataIndex   : 'DEL_YN',                    
                        exAlign     : 'center',
                        width       : 90,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_gbn');
                        	return exCommon.getComboVal(value,store, '' );
                        },
                        editor        : {
                        	xtype        : 'excombobox',
                            valueField   : 'CODE',
                            displayField : 'NAME',
                            bind:{
                                store:'{ds_yn_gbn}'
                            }
                        },
                    }]
	        	},{
	        		height : 30
	        	},{
	        		width  : '100%',
	        		layout : 'hbox',
	        		items  :[{	        			
	        			width : 300,
	        			layout:{
                            type:'vbox',
                            align:'stretch'
                        },
                        items:[{
                            xtype  : 'exblocklabel',
                            html    : '<div style="text-align:center;padding-left:5px;font-weight : 700;">사진</div>',
                            height : 30
                        },{
                            flex     : 1,
                            xtype    : 'exblockfield',
                            reference: 'imageBlock',
                            height   : 90,
                            items    : [{
                            	xtype     : 'image',
                            	reference : 'image',
                            	height    : '100%',
                                width     : '100%',
                            }]
                        }]
	        		},{
	        			width   : 650,
	        			xtype   :'exfieldsetblockbox',
	        			items   : [{
	        				xtype  :'exblockrow',
	        				hegiht : 40,
		                    items:[{
		                        xtype   : 'exblocklabel',
		                        html    : '<div style="text-align:left;padding-left:5px;font-weight : 700;">성명</div>'                           
		                    },{
		                    	xtype   : 'exblockfield',
		                    	items   : [{
		                    		xtype     : 'extextfield',
		                            reference : 'txt_name_kor',
		                            width     : '99%',
		                            exReadOnly : true,
		                    	}]		                 
		                    }]
	        			},{
	        				xtype:'exblockrow',
		                    items:[{
		                    	xtype   : 'exblocklabel',
		                        html    : '<div style="text-align:left;padding-left:5px;font-weight : 700;">신도번호</div>'                           
		                    },{
		                    	xtype   : 'exblockfield',
		                    	items   : [{
		                    		xtype     : 'extextfield',
		                            reference : 'txt_bud_no',
		                            width     : '99%',
		                            exReadOnly : true,
		                    	}]
		                    }]
	        			},{
	        				xtype:'exblockrow',
		                    items:[{
		                        xtype   : 'exblocklabel',
		                        html    : '<div style="text-align:left;padding-left:5px;font-weight : 700;">보안코드</div>'                           
		                    },{
		                    	xtype   : 'exblockfield',
		                    	items   : [{
		                    		xtype     : 'extextfield',
		                            reference : 'txt_card_code',
		                            width     : '99%',
		                            exReadOnly : true,
		                    	}]
		                    }]
	        			},{
	        				xtype:'exblockrow',
		                    items:[{
		                        xtype   : 'exblocklabel',
		                        html    : '<div style="text-align:left;padding-left:5px;font-weight : 700;">첨부파일명</div>'                           
		                    },{
		                    	xtype   : 'exblockfield',
		                    	items   : [{
		                    		xtype     : 'extextfield',
		                            reference : 'txt_file_name',
		                            width     : '99%',
		                            exReadOnly : true,
		                    	}]
		                    }]
	        			}]
	        		},{
	        			flex : 1
	        		}]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});