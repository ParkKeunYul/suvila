Ext.define('ExFrm.view.rec.rec002w_14',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec002w_14',
	requires:[
		'ExFrm.view.rec.rec002w_14Controller',
        'ExFrm.view.rec.rec002w_14Model'
	],
	controller:'rec002w_14',
	viewModel:{
        type:'rec002w_14'
    },
    name:'rec002w_14',
    isRootView:true,
    title:'기부금출력관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout : 'hbox',
	    	    	width  : '100%',
	    	    	height : 30,
	    	    	items  : [{
	    	    		xtype           : 'excombobox',                		
	            		labelAlign      : 'left',
	                    reference       : 'cb_Stipulation',
	                    displayField    : 'name',
	                    valueField      : 'code',
	                    exCommonDmnCode : '001',    
	                    width           : 100,
	                    store           : {},
	                    listeners       : {
	                    	change:'onSearchTypeChange'
	                    }
	    	    	},{
	        			width : 5
	    	    	},{
	                	xtype           : 'extextfield',
	                    reference       : 'txt_stipulation',
	                   // value           : '',
	                    enableKeyEvents : true,
	                    width           : 110 ,
	                    listeners       : {
	                 	   keyup : 'onSearchEnter'
	                    },
	                    value : '01-00002-0-01'
	    	    	},{
	        			width : 5
	        		},{
	               	 	xtype    : 'exbutton',
	                    iconCls  : 'fa fa-search',
	                    text     : '검색',
	                    handler  : 'onBudSearch',
	                    reference: 'budSearchBtn',
	    	    	},{
            			width : 5
            		},{
	        			xtype        :'excombobox',
	                    width        : 80,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'cb_date',
	                    value        : 1,
	                	bind         : {
	                    	store:'{ds_date_type}'
	                	},
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
	        			xtype        :'excombobox',
	                	labelWidth   : 50,
	                    fieldLabel   : '<span style="font-weight: 700;">행사명</span>',
	                    width        : 200,
	                    valueField   : 'EVENT_CD',
	                    displayField : 'EVENT_NAME',     
	                    reference    : 'lc_WPKindInfo',
	                    emptyText    : '전체',
	                    value        : 0,
	                	bind         : {
	                    	store:'{ds_chonhonKind}'
	                	}
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 60,
	                    fieldLabel   : '<span style="font-weight: 700;">신도분류</span>',
	                    width        : 220,
	                    valueField   : 'CLASS_CD',
	                    displayField : 'CLASS_NAME',     
	                    reference    : 'lc_classMgt',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_classMgt}'
	                	}
	        		
	        		},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',
	              		text      : '조회',
	              		handler   : 'onSelect',
	    	    	},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',	              		
	              		text      : '파일 저장 및 출력',
	              		handler   : 'onExcel',
	        		},{
	        			width : 0,
	        			heigth: 0,
	        			items : [{
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
	    	        		xtype            : 'extextfield',
	                        reference        : 'hid_bud_no',
	                        value            : '',
	                        inputType        : 'hidden',
	                        name             : 'V_BUD_NO'
	            		},{
	            			xtype            : 'extextfield',
	                        reference        : 'txt_budNo',
	    	    		}]
	    	    	}]
	            },{
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'rec002w_14_a',
	                height     : 800,
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
	                bind       : {
	                    store:'{ds_main}'
	                },
                    exGroupFields:[
                    	 'ACCEPT_SEQ'
                    	,'EVENT_NAME'
                    	,'ADDR'
                    	,'PROPOSAL_BUD_NO'
                    	,'BOKWI_BUD_NAME'
                    	,'EVENT_SEQ'
                    	,'PROPOSAL_BUD_NAME'
                    	,'DAEJU_BUD_NO'
                    ],
	                cls       : 'rec002w_14_a  none-dirty-grid',
	                columns   : [{
	                	text      :'접수번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_SEQ',                    
	                    exAlign   :'center',
	                    width     : 160,
	                    sortable  : true,
	                },{
	                	text      :'행사명',
	                	xtype     :'excolumn',
	                    dataIndex :'EVENT_NAME',                    
	                    exAlign   :'left',
	                    width     : 230,
	                    sortable  : true,
	                },{
	                	text      :'주소',
	                	xtype     :'excolumn',
	                    dataIndex :'ADDR',                    
	                    exAlign   :'left',
	                    width     : 360,
	                    sortable  : true,
	                },{
	                	text      :'신도번호',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 130,
	                },{
	                	text      :'행관계',
	                	xtype     :'excolumn',
	                    dataIndex :'HYO_REL',                    
	                    exAlign   :'center',
	                    width     : 110,
	                },{
	                	text      :'신도명',
	                	xtype     :'excolumn',
	                    dataIndex :'BOKWI_BUD_NAME',                    
	                    exAlign   :'left',
	                    width     : 110,
	                },{
	                	text      :'복위기부',
	                	xtype     :'excolumn',
	                    dataIndex :'BOKWI_KIBU_GBN_NM',                    
	                    exAlign   :'center',
	                    width     : 100,
	                },{
	                	text      :'망관계',
	                	xtype     :'excolumn',
	                    dataIndex :'DECE_REL',                    
	                    exAlign   :'center',
	                    width     : 100,
	                },{
	                	text      :'본',
	                	xtype     :'excolumn',
	                    dataIndex :'BON_NM',                    
	                    exAlign   :'center',
	                    width     : 110,
	                },{
	                	text      :'영가명',
	                	xtype     :'excolumn',
	                    dataIndex :'DECEL_BUD_NAME',                    
	                    exAlign   :'left',
	                    width     : 110,
	                },{
	                	text      :'위패번호',
	                	xtype     :'excolumn',
	                    dataIndex :'EVENT_SEQ',                    
	                    exAlign   :'center',
	                    width     : 110,
	                },{
	                	text      :'소등여부',
	                	xtype     :'excolumn',
	                    dataIndex :'CLOSE_YN_NM',                    
	                    exAlign   :'center',
	                    width     : 110,
	                },{
	                	text      :'신청자',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BUD_NAME',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                },{
	                	text      :'대주번호',
	                	xtype     :'excolumn',
	                    dataIndex :'DAEJU_BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 120,
	                    sortable  : true,
	                }],
	                viewConfig: {
	                	getRowClass: function(record, index) {
	                        var CLOSE_YN = record.get('CLOSE_YN');
	                        console.log('CLOSE_YN =', CLOSE_YN);
	                        if(CLOSE_YN == 'T'){
	                        	return 'useYnBack';
	                        }else{
	                        	return 'recCellNotEdit';
	                        }
	                    }
	                }
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546