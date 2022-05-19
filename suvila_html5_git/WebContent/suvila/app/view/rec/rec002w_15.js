Ext.define('ExFrm.view.rec.rec002w_15',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec002w_15',
	requires:[
		'ExFrm.view.rec.rec002w_15Controller',
        'ExFrm.view.rec.rec002w_15Model'
	],
	controller:'rec002w_15',
	viewModel:{
        type:'rec002w_15'
    },
    name:'rec002w_15',
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
	    	    		width : 50,
	    	    		html  :'<div style="text-align:center;width:50px;font-weight:700;line-height:24px;">접수일: </div>',
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
	                    fieldLabel   : '<span style="font-weight: 700;">전각명</span>',
	                    width        : 200,
	                    valueField   : 'JUNGAK_CD',
	                    displayField : 'JUNGAK_NM',     
	                    reference    : 'lc_IDJungakInfo',
	                    emptyText    : '전체',
	                    value        : 0,
	                	bind         : {
	                    	store:'{ds_IDJGKindInfo}'
	                	}
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 50,
	                    fieldLabel   : '<span style="font-weight: 700;">인등명</span>',
	                    width        : 200,
	                    valueField   : 'LIGHT_CODE',
	                    displayField : 'LIGHT_NM',     
	                    reference    : 'lc_IDKindInfo',
	                    emptyText    : '전체',
	                    value        : 0,
	                	bind         : {
	                    	store:'{ds_IDKindInfo}'
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
	              		reference : 'selectBtn',
	              		name      : 'selectBtn',
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
	            	layout : 'hbox',
	    	    	width  : '100%',
	    	    	height : 30,
	    	    	items  : [{
	    	    		xtype        :'excombobox',
	                	labelWidth   : 25,
	                    fieldLabel   : '<span style="font-weight: 700;">띠</span>',
	                    width        : 100,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'lc_animal',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_animal}'
	                	}
	    	    	},{
	                	width : 5
	                },{
	                	xtype        : 'extextfield',            	
	                    reference    : 'txt_addr1',
	                    name         : 'V_ADDR',
	                    fieldLabel   : '<span style="font-weight: 700;">주소</span>',
	                    labelWidth   : 35,
	                    width        : 300,
	                    enableKeyEvents : true,
	                    listeners:{
	                	   //keyup : 'onSearchSelect'
	                    }
	                },{
	                	width : 5
	                },{
	                	xtype        :'excombobox',
	                	labelWidth   : 35,
	                    fieldLabel   : '<span style="font-weight: 700;">소등</span>',
	                    width        : 150,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'lc_IDCloseYn',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_deung_type}'
	                	}
	    	    	}]
	            },{
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'rec002w_15_a',
	                height     : 760,
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
	                bind       : {
	                    store:'{ds_main}'
	                },
                    exGroupFields:[
                    	 'ACCEPT_SEQ'
                    	,'INDEUNG_NM'
                    	,'DAEJU_ADDR1'
                    	,'PROPOSAL_TEL'
                    	,'PROPOSAL_CEL'
                    	,'PROPOSAL_BUD_NO'
                    	,'PROPOSAL_BUD_NAME'
                    	,'LIGHT_NO'
                    	,'JUNGAK_NM'
                    	,'PROPOSAL_SEXGBN'
                    	,'PROPOSAL_BIRTHDAY'
                    	,'PROPOSAL_AGE'
                    	,'SEXGBN'
                    	,'BIRTHDAY'
                    	,'AGE'
                    	,'MEMO'
                    	,'REMARK'
                    ],
	                cls       : 'rec002w_15_a  none-dirty-grid',
	                columns   : [{
	                	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',   
	                },{
	                	text      :'접수번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_SEQ',                    
	                    exAlign   :'center',
	                    width     : 160,
	                    sortable  : true,
	                },{
	                	text      :'인등종류',
	                	xtype     :'excolumn',
	                    dataIndex :'INDEUNG_NM',                    
	                    exAlign   :'center',
	                    width     : 100,
	                },{
	                	text      :'주소',
	                	xtype     :'excolumn',
	                    dataIndex :'DAEJU_ADDR1',                    
	                    exAlign   :'left',
	                    width     : 350,
	                },{
	                	text      :'전화번호',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_TEL',                    
	                    exAlign   :'center',
	                    width     : 110,
	                },{
	                	text      :'휴대번호',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_CEL',                    
	                    exAlign   :'center',
	                    width     : 110,
	                },{
	                	text      :'관계',
	                	xtype     :'excolumn',
	                    dataIndex :'REPRESEN_REL',                    
	                    exAlign   :'center',
	                    width     : 70,
	                },{
	                	text      :'간지',
	                	xtype     :'excolumn',
	                    dataIndex :'DONGCHAM_GANJI',                    
	                    exAlign   :'center',
	                    width     : 70,
	                },{
	                	text      :'신도명',
	                	xtype     :'excolumn',
	                    dataIndex :'DONGCHAM_BUD_NAME',                    
	                    exAlign   :'left',
	                    width     : 110,
	                },{
	                	text      :'신도번호',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 110,
	                },{
	                	text      :'신청자',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BUD_NAME',                    
	                    exAlign   :'left',
	                    width     : 100,
	                },{
	                	text      :'인등<br/>번호',
	                	xtype     :'excolumn',
	                    dataIndex :'LIGHT_NO',                    
	                    exAlign   :'center',
	                    width     : 60,
	                },{
	                	text      :'인등<br/>위치',
	                	xtype     :'excolumn',
	                    dataIndex :'JUNGAK_NM',                    
	                    exAlign   :'center',
	                    width     : 100,
	                },{
	                	text      :'신청자<br/>성별',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_SEXGBN',                    
	                    exAlign   :'center',
	                    width     : 100,
	                },{
	                	text      :'신청자<br/>생년월일',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BIRTHDAY',                    
	                    exAlign   :'center',
	                    width     : 90,
	                },{
	                	text      :'신청자<br/>나이',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_AGE',                    
	                    exAlign   :'center',
	                    width     : 70,
	                },{
	                	text      :'동참자<br/>성별',
	                	xtype     :'excolumn',
	                    dataIndex :'SEXGBN',                    
	                    exAlign   :'center',
	                    width     : 70,
	                },{
	                	text      :'동참자<br/>생년월일',
	                	xtype     :'excolumn',
	                    dataIndex :'BIRTHDAY',                    
	                    exAlign   :'left',
	                    width     : 100,
	                },{
	                	text      :'동참자<br/>나이',
	                	xtype     :'excolumn',
	                    dataIndex :'AGE',                    
	                    exAlign   :'center',
	                    width     : 70,
	                },{
	                	text      :'접수메모',
	                	xtype     :'excolumn',
	                    dataIndex :'MEMO',                    
	                    exAlign   :'left',
	                    width     : 280,
	                },{
	                	text      :'상세메모',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 280,
	                }],
	                viewConfig: {
	                	getRowClass: function(record, index) {
	                        var CLOSE_YN = record.get('CLOSE_YN');
	                  //      console.log('CLOSE_YN =', CLOSE_YN);
	                        if(CLOSE_YN == 'T'){
	                        	return 'useYnBack';
	                        }else{
	                        	return 'color_depth_1';
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