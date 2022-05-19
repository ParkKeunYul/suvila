Ext.define('ExFrm.view.sin.sin002w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin002w_01',
	requires:[
		'ExFrm.view.sin.sin002w_01Controller',
        'ExFrm.view.sin.sin002w_01Model'
	],
	controller:'sin002w_01',
	viewModel:{
        type:'sin002w_01'
    },
    name:'sin002w_01',
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
        		fieldLabel   : '<span style="font-weight: 700;">수여종류</span>',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_janghak_gubunAll',
                emptyText    : '전체',
                labelWidth   : 80,
                width        : 200,
                bind         : {
                	store:'{ds_janghak_gubunAll}'
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
          		text      : '신규',
          		handler   : 'onInput',
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
        		width : 5
        	},{
        		xtype     : 'exbutton',
          		text      : '엑셀',
          		handler   : 'onExcel',
        	},{
        		width            : 0,
        		height           : 0,
        		items            :[{
        			xtype            : 'extextfield',
                    reference        : 'hid_bud_no',
                    value            : '',
                    inputType        : 'hidden',
                    name             : 'V_BUD_NO'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'hid_name_kor',
                    value            : '',
                    inputType        : 'hidden',
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_budNo',
                    value            : '',
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
	    		width : 400,	    	
	    		exGroupRef : true,
                xtype      : 'exgrid',
                reference  : 'sin002w_01_a',
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
                cls       : 'sin002w_01_a  none-dirty-grid',
                columns   : [{
                	/*text      :'신도번호',
                	xtype     :'excolumn',
                    dataIndex :'BUD_NO',                    
                    exAlign   :'center',
                    width     : 120,
                },{
                	text      :'성명',
                	xtype     :'excolumn',
                    dataIndex :'NAME_KOR',                    
                    exAlign   :'left',
                    width     : 130,
                },{
                	text      :'전화번호',
                	xtype     :'excolumn',
                    dataIndex :'MOBILE_TELNO',                    
                    exAlign   :'center',
                    width     : 130,
                },{*/
                	text      :'수여종류',
                	xtype     :'excolumn',
                    dataIndex :'JANGHAK_GUBUN',                    
                    exAlign   :'center',
                    width     : 120,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_janghak_gubunAll');
                    	return exCommon.getComboVal(value,store, '' );
                    }
                },{
                	text      :'수여내역',
                	xtype     :'excolumn',
                    dataIndex :'PRESENT_CONTENTS',                    
                    exAlign   :'left',
                    width     : 260,
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
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신도명</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_name_kor',
                            exReadOnly : true,
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">개인번호</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_budNo',
                            exReadOnly : true,
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">폼의자</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_elegant',
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">지급자</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextfield',
                            reference  : 'txt_give',
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">수여종류</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype        : 'excombobox',
                            valueField   : 'CODE',
                            displayField : 'NAME',
                            reference    : 'lc_janghak_gubun',
                            emptyText    : '선택',
                            width        : '99%',                            
                            bind         : {
                            	store:'{ds_janghak_gubun}'
                            },
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">지급일</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'exdatefield',
                            reference  : 'me_sdate',
                    	}]
                    }]	    		
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">수여내역</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextarea',
                    		reference  : 'txt_present_contents',
                            width      : '99%',
                            height     : 89
                    	}]
                    }]
	    		},{
	    			xtype:'exblockrow',
                    items:[{
                        xtype   : 'exblocklabel',
                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">메모</div>'                           
                    },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                    		xtype      : 'extextarea',
                    		reference  : 'txt_memo',
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