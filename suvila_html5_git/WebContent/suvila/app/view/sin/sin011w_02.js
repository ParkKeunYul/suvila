Ext.define('ExFrm.view.sin.sin011w_02',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin011w_02',
	requires:[
		'ExFrm.view.sin.sin011w_02Controller',
        'ExFrm.view.sin.sin011w_02Model'
	],
	controller:'sin011w_02',
	viewModel:{
        type:'sin011w_02'
    },
    name:'sin011w_02',
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
                width           : 150 ,
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
        		hidden       : true,
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
                    //name             : 'V_BUD_NO'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_budNo',
                    value            : '',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
                    //name             : 'txt_budNo'
    		     },{
                	xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'uptData',
           	 		name      : 'uptData',
           	 		width     : 0
    	         },{
     				xtype     : 'extextfield',
        	 		inputType : 'hidden',
        	 		reference : 'ds_card_detail',
        	 		name      : 'ds_card_detail',
        	 		width     : 0
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
	    	width  : '100%',
	    	items  : [{
		    	flex      :  1,
	    		exGroupRef : true,
	            xtype      : 'exgrid',
	            reference  : 'sin011w_02_a',
	            cls        : 'none-dirty-grid topCheckHeader',
	            height     : 700,
	            multiSelect: true, 	            
	            plugins    :[{
	            	ptype: 'gridexporter'
	            }],
	            bind       : {
	                store:'{ds_main}'
	            },
	            listeners      : {
	            	itemcontextmenu : 'onMouseRight'
	            },
	            columns   : [{
	            	headerCheckbox : true,
	            	text      :'선택',
	            	xtype     :'excheckcolumn',
	                dataIndex :'SEL_YN',                    
	                exAlign   :'center',
	                width     : 90,
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
	                flex      : 1,
	            
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
	    		width  : 300,
	    		items  :[{
	    			fieldLabel       : '<span style="font-weight: 700;">기도명</span>',
					xtype            : 'extextfield',
                    reference        : 'me_goodsNm',
                    width            : 185,	         
                    labelWidth   : 50,
                    name             : 'V_BUD_NO',
				},{
					height : 5
				},{
					layout : 'hbox',
					items  :[{
						fieldLabel       : '<span style="font-weight: 700;">동참비</span>',
						xtype            : 'extextfield',
	                    reference        : 'me_goodsAmt',
	                    width            : 185,
	                    labelWidth   : 50,
					},{
						html : '<div style="padding-left:5px;">(숫자만입력하세요)</div>'
					}]
					
					
				}]
	    	}]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});