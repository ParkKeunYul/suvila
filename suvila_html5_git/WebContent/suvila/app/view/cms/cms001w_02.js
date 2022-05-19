Ext.define('ExFrm.view.cms.cms001w_02',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cms001w_02',
	requires:[
		'ExFrm.view.cms.cms001w_02Controller',
        'ExFrm.view.cms.cms001w_02Model'
	],
	controller:'cms001w_02',
	viewModel:{
        type:'cms001w_02'
    },
    name:'cms001w_02',
    isRootView:true,
    title:'CMS회원',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
            items:[{
            	layout:'hbox',
            	flex : 1,
            	items:[{
            		xtype:'excombobox',
            		fieldLabel:'신도검색',
            		labelWidth:70,
                	fieldStyle: 'text-align: right;',
                    reference:'sel_BudSearchGbn',
                    displayField:'name',
                    valueField:'code',
                    exCommonDmnCode:'001',    
                    width : 170,
                    store:{},
                    listeners:{
                    	change:'onSearchTypeChange'
                    }
                    
            	},{
            		width : 2
            	},{
            		xtype:'extextfield',
                    reference:'txt_stipulation',
                    value : '',
                    enableKeyEvents: true,
                    listeners:{
                 	   keyup : 'onSearchEnter'
                    },
                    width : 130
            	},{
            		width : 2
            	},{
            		xtype:'exbutton',
                    cls:'exbuttonsrch',
                    text:'신도조회',                
                    listeners:[{
                    	click:'onSindoSearch'
                    }]
            	},{
            		width : 2
            	},{
            		xtype:'extextfield',
                    reference:'hid_bud_no',
                    value : '',
                    width : 0,
                    height : 0,
                    inputType: 'hidden',
                    name : 'V_BUD_NO'            		
            	}]
            
            },{
            	xtype     : 'exbutton',
          		reference : 'selectCmsBtn',
          		name      : 'selectCmsBtn',
          		handler   : 'onSelect',
          		text      : '조회',    
            },{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		handler   : 'onExcel',
          		text      : '엑셀',
        	},{
        		width : '0.5%'
            }]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	 layout:'vbox',
	        	 width:'99%',
	             items:[{
	        		//html : '그리드'
		        	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'cms001w_02_a',
	                height:820,
	                width:'100%',
	                bind:{
	                    store:'{ds_main}'
	                },
	                plugins:[{	                
	                	ptype: 'gridexporter'
	                }],
	                listeners:{},
	                columns:[{
	                    text:'번호',
	                    xtype:'rownumberer',
	                    width :50,
	                    align:'center',
	                    sortable: true	                    
	                },{
	                	text:'신도번호',
	                	xtype:'excolumn',
	                    dataIndex:'BUD_NO',
	                    width : 108,
	                    exAlign:'left',
	                    sortable: true	                    
	                },{
	                	text:'신도명',
	                	xtype:'excolumn',
	                    dataIndex:'NAME_KOR',
	                    width : 90,
	                    exAlign:'left',
	                    sortable: true	                    
	                },{
	                	text:'은행',
	                	xtype:'excolumn',
	                    dataIndex:'IF_PAYMENT_BANK_CD',
	                    width:100,
	                    exAlign:'left',
	                    sortable: true	                   
	                },{
	                	text:'계좌번호',
	                	xtype:'excolumn',
	                    dataIndex:'IF_PAYMENT_ACCOUNT',
	                    width:125,
	                    exAlign:'left',
	                    sortable: true	                    
	                },{
	                	text:'출금예정일',
	                	xtype:'excolumn',
	                    dataIndex:'CMS_PAYMENT_DAY',
	                    width:90,
	                    exAlign:'center',
	                    sortable: true	                 
	                },{
	                	text:'사찰계좌정보',
	                	xtype:'excolumn',
	                    dataIndex:'CMS_TRADE_CD',
	                    width:100,
	                    exAlign:'center',
	                    sortable: true,	                   
	                },{
	                	text:'휴대전화',
	                	xtype:'excolumn',
	                    dataIndex:'MOBILE_TELNO',
	                    width:100,
	                    exAlign:'center',
	                    sortable: true,	                   
	                },{
	                	text:'등록일',
	                	xtype:'excolumn',
	                    dataIndex:'CRT_DATE',
	                    width:90,
	                    exAlign:'center',
	                    sortable: true,	    
	                },{
	                	text:'삭제일',
	                	xtype:'excolumn',
	                    dataIndex:'UPT_DATE',
	                    width:90,
	                    exAlign:'center',
	                    sortable: true,	   
	                },{
	                	text:'삭제자',
	                	xtype:'excolumn',
	                    dataIndex:'UPT_USER',
	                    width:90,
	                    exAlign:'center',
	                    sortable: true,	   
	                },{
	                	text:'비고',
	                	xtype:'excolumn',
	                    dataIndex:'REMARK',
	                    width:200,
	                    exAlign:'left',
	                    sortable: true,	                   
	                },{
	                	text:'사용번호',
	                	xtype:'excolumn',
	                    dataIndex:'ACCOUNT_SEQ',
	                    width:90,
	                    exAlign:'center',
	                    sortable: true	                    
	                }]
	             }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});