Ext.define('ExFrm.view.cms.cms001w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cms001w_01',
	requires:[
		'ExFrm.view.cms.cms001w_01Controller',
        'ExFrm.view.cms.cms001w_01Model'
	],
	controller:'cms001w_01',
	viewModel:{
        type:'cms001w_01'
    },
    name:'cms001w_01',
    isRootView:true,
    title:'CMS회원',
    closable:true,
    scrollable:true,
    items:[{
    	height : 15
    },{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
            items:[{
            	layout:'hbox',
            	items:[{
            		xtype           : 'excombobox',
            		fieldLabel      : '신도검색',
            		labelWidth      : 70,
                	fieldStyle      : 'text-align: right;font-weight:700;',
                    reference       : 'sel_BudSearchGbn',
                    displayField    : 'name',
                    valueField      : 'code',
                    exCommonDmnCode : '001',    
                    width           : 170,
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
                    width           : 130,
                    listeners       : {
                 	   keyup : 'onSearchEnter'
                    },
            	},{
            		width : 2
            	},{
            		xtype      : 'exbutton',
                    cls        : 'exbuttonsrch',
                    text       : '신도조회',                
                    listeners  : [{
                    	click:'onSindoSearch'
                    }]
            	},{
            		width : 2
            	},{
            		xtype        : 'excombobox',
                    valueField   : 'CODE',
                    displayField : 'NAME',
                    reference    : 'lc_cms_account_status2',
                    fieldLabel   : '계좌상태',
                    fieldStyle   : 'text-align: right;font-weight:700;',
                    labelWidth   : 70,
                    emptyText    : '전체',
                    bind         : {
                    	store : '{ds_cms_account_status}'
                    },
                    width : 150
            	},{
        			width : 10
            	},{
        			html :'<div style="text-align:center;padding:0 5px;font-weight:700;line-height:25px;">등록기간 :</div>',
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptSDate',
                    format         : 'Y-m-d',
        		},{
        			html :'<div style="text-align:center;width:20px;">~</div>',
        			width : 20
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptEDate',
                    format         : 'Y-m-d',    
            	}]
            },{
            	width : 10
            },{
            	xtype     : 'exbutton',
          		handler   : 'onSelectCms',
          		text      : '조회',
            },{
            	width : 3
            },{
            	xtype     : 'exbutton',
          		handler   : 'onAddSindo',
          		text      : '신도추가',
            },{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		handler   : 'onAdd',
          		text      : '추가',
        	},{
        		width : 3
        	},{
        		xtype     : 'exbutton',
          		handler   : 'onDel',
          		text      : '삭제',
            },{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		handler   : 'onExcel',
          		text      : '엑셀',
        	},{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		handler   : 'onSave',
          		text      : '저장',
        	},{
        		layout : 'hbox',
        		width  : 0 ,
        		items  : [{
        			xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'newData',
           	 		name      : 'newData',
            	},{
           	 		xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'uptData',
           	 		name      : 'uptData',
           	 	
            	},{
           	 		xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'delData',
           	 		name      : 'delData',
            	},{
           	 		xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'txt_addHiden',       	 		
            	},{
            		xtype:'extextfield',
                    reference:'hid_bud_no',
                    value : '',
                    inputType: 'hidden',
                    name : 'V_BUD_NO'   
        		}]
            }]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	 layout:'vbox',
	        	 width : 1200,
	             items:[{
		        	exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'cms001w_01_a',
	                height      : 790,
	                width       : '100%',
	                bind        : {
	                    store:'{ds_main}'
	                },
	                plugins:[{	                
	                	 ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter'
	                }],
	                listeners:{
	                    selectionchange : 'onSelectionChange'
	                },
	                columns:[{
	                    text     : '번호',
	                    xtype    : 'rownumberer',
	                    width    : 50,
	                    align    :'center',
	                    sortable : true,	                    
	                },{
	                	text       : '신도번호',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'BUD_NO',
	                    width      : 108,
	                    exAlign    : 'left',
	                    sortable   : true,
	                },{
	                	text       : '신도명',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'NAME_KOR',
	                    width      : 90,
	                    exAlign    :'left',
	                    sortable   : true,
	                },{
	                	text:'은행',
	                	xtype:'excolumn',
	                    dataIndex:'IF_PAYMENT_BANK_CD',
	                    width:100,
	                    exAlign:'left',
	                    sortable: true,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_if_payment_bank_cd');
	                    	var index = store.find('CODE',value);
	                    	
	                    	if(index != -1){
                                return store.getAt(index).get('NAME');
                            }
                            else {
                                return value;
                            }  
	                    },
	                },{
	                	text      : '계좌번호',
	                	xtype     : 'excolumn',
	                    dataIndex :'IF_PAYMENT_ACCOUNT',
	                    width     :125,
	                    exAlign   :'left',
	                    sortable  : true,
	                },{
	                	text      : '출금예정일',
	                	xtype     :'excolumn',
	                    dataIndex : 'CMS_PAYMENT_DAY',
	                    width     : 90,
	                    exAlign   : 'center',
	                    sortable  : true,
	                },{
	                	text      : '계좌상태',
	                	xtype     : 'excolumn',
	                    dataIndex :'CMS_ACCOUNT_STATUS',
	                    width     : 80,
	                    exAlign   : 'center',
	                    sortable  : true,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_cms_account_status');
	                    	var index = store.find('CODE',value);
	                    	
	                    	if(index != -1){
                                return store.getAt(index).get('NAME');
                            }
                            else {
                                return value;
                            }  
	                    }
	                },{
	                	text      : '사찰계좌정보',
	                	xtype     : 'excolumn',
	                    dataIndex : 'CMS_TRADE_CD',
	                    width     : 130,
	                    exAlign   : 'center',
	                    sortable  :  true,
	                },{
	                	text       : '휴대전화',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'MOBILE_TELNO',
	                    width      : 130,
	                    exAlign    : 'center',
	                    sortable   : true,	                    
	                },{
	                	text       : '등록일',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'CRT_DATE',
	                    width      : 90,
	                    exAlign    : 'center',
	                    sortable   :  true,
	                },{
	                	text:'사용여부',
	                	xtype:'excolumn',
	                    dataIndex:'USE_YN',
	                    width:75,
	                    exAlign:'center',
	                    sortable: true,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(value == 'T'){
	                    		return '예';
	                    	}else{
	                    		return '아니오';
	                    	}
	                    	
	                    },
	                },{
	                	text       : '사용번호',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'ACCOUNT_SEQ',
	                    width      : 75,
	                    exAlign    : 'center',
	                    sortable   : true,
	                },{
	                	text       : '비고',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'REMARK',
	                    width      : 200,
	                    exAlign    : 'left',
	                    sortable   :  true,	               
	                }],
	                
	                viewConfig: {
    	            	getRowClass: function(record, index) {
    	            		if(record.data.ORG_CMS_ACCOUNT_STATUS == '1'){
	                    		return 'suvila_green_bg';
	                    	}else if(record.data.ORG_CMS_ACCOUNT_STATUS == '3'){
	                    		return  'useYnBack';
	                    	}else if(record.data.ORG_CMS_ACCOUNT_STATUS == '4'){
	                    		return  'suvila_error_bg';
	                    	}else{
	                    		return  'suvila_grid_bg';
	                    	}
    	                }
    	            }
	                
	                /*
	                ,bbar:{
	                	xtype: 'pagingtoolbar',
	                    reference : 'cmsPagingtoolbar',
	                    displayInfo: true,	                    	                    
	                    listeners: {
	                    	beforechange : 'pageingChange'	                    	
	                    },
	                    items:[{
	                    	xtype:'excombobox',
	                        valueField:'value',
	                        displayField:'display',
	                        reference:'txt_limit',
	                        name:'limit',
	                        emptyText : '100',
	                      //  value : 100,
	                        bind:{
	                       	 store : '{ds_pageSize}'
	                        },
	                        listeners: {
	                        	change : 'onPagesizeChange'
	    	                },
	                        width : 80
		                
	                    }]
	                }
	                */
	             }]
	        },{
	        	width : '0.5%'
	        },{
	        	flex : 1,
	        	xtype:'exfieldsetblockbox',
	        	items:[{
	        		xtype:'exblockrow',
	                items:[{
	                	xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">성명</div>'
	                },{
                        xtype:'exblockfield',
                        items:[{
                            xtype:'extextfield',
                            reference:'txt_name_kor',
                            exLabel:'성명',
                            exMand:true,
                            name:'NAME_KOR'
                        }]
	                },{
	                	xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">신도번호</div>'
	                },{
	                	xtype:'exblockfield',
                        items:[{
                            xtype:'extextfield',
                            reference:'txt_bud_no',
                            exLabel:'신도번호',
                            exMand:true,
                            name:'BUD_NO'
                        }]
	                }] 
	        	},{
	        		xtype:'exblockrow',
	        		height : 50,
	        		items:[{
	        			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">주민번호 6자리<br/>사업자번호</div>'
	        		},{
	        			xtype:'exblockfield',
	        			height : 50,
                        items:[{
                        	xtype        : 'excombobox',
                            valueField   : 'CODE',
                            displayField : 'NAME',
                            reference    : 'lc_reg_gbn',
                            name         : 'REG_GBN',
                            exLabel      : '주민번호 사업자번호',
                            emptyText    : '선택',
                            bind:{
                           	 store : '{ds_reg_gbn}'
                            }
                        },{
                        	width : 10
                        },{
                        	 xtype:'extextfield',
                             reference:'em_reg_no',
                             exLabel:'주민번호 사용자등록번호',
                             exMand:true,
                             name:'REG_NO'
                        }]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">출금은행</div>',
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				 xtype:'excombobox',
                             valueField:'CODE',
                             displayField:'NAME',
                             reference:'lc_if_payment_bank_cd',
                             name:'IF_PAYMENT_BANK_CD',
                             exLabel:'출금은행',
                             emptyText: '선택',
                             bind:{
                            	 store : '{ds_if_payment_bank_cd}'
                             },
                             exMand:true
	        			},{
	        				width : 5
	        			},{
	        				xtype:'exbutton',
                            cls:'exbuttonsrch',
                            text:'변경내역',
                            listeners:[{
                            	click:'onCmsUptHis'
                            }]
	        			}]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">출금계좌번호</div>',
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				 xtype:'extextfield',
                             reference:'em_if_payment_account',
                             name:'IF_PAYMENT_ACCOUNT',
                             exLabel:'출금계좌번호',
                             exMand:true,
                             exType : 'number',
                             exNumberComma : false,
                             exAlign : 'left'
	        			},{
	        				width : 5
	        			},{
	        				html : '(숫자만 입력하세요)'
	        			}]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">출금예정일</div>',
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				 xtype:'excombobox',
                             valueField:'CODE',
                             displayField:'NAME',
                             reference:'lc_cms_payment_day',
                             name:'CMS_PAYMENT_DAY',
                             exLabel:'출금예정일',
                             emptyText: '선택',
                             exMand:true,
                             bind:{
                            	 store : '{ds_cms_payment_day}'
                             }
	        			}]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">계좌상태</div>',
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				xtype:'excombobox',
                            valueField:'CODE',
                            displayField:'NAME',
                            reference:'lc_cms_account_status',
                            name:'CMS_ACCOUNT_STATUS',
                            exLabel:'계좌상태',
                            emptyText: '선택',
                            bind:{
                            	 store : '{ds_cms_account_status}'
                            }
	        			},{
	        				width : 5
	        			},{
	        				xtype:'exbutton',
	        				reference: 'terminationBtn',
                            text:'해지',
                            listeners:[{
                            	click:'onTerminate'
                            }]
	        			},{
	        				html : '<div style="color:red;width:100%;">[저장버튼을 클릭후 해지 등록됩니다.] </div>'
	        			}]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">사찰계좌정보</div>',
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				 xtype:'excombobox',
                             valueField:'CMS_TRADE_CD',
                             displayField:'CMS_TRADE_CD',
                             reference:'lc_cms_trade_cd',
                             name:'CMS_TRADE_CD',
                             exLabel:'사용자계좌정보',
                             emptyText: '선택',
                             exMand:true,
                             bind:{
                            	 store : '{ds_temple_CMS_info}'
                             },
                             listConfig: {
                            	 itemTpl: [
                            		 '<div data-qtip="{CMS_TRADE_CD}">{CMS_CUSTOMER_COMMENT}[{CMS_TRADE_CD}]{CMS_PAYMENT_MISU_DAY}</div>'
                            	 ]
                             }
	        			}]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">사용구분</div>',
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				 xtype:'excombobox',
                             valueField:'value',
                             displayField:'display',
                             reference:'lc_use_yn',
                             name:'USE_YN',
                             exLabel:'사용구분',
                             emptyText: '선택',
                             bind:{
                            	 store : '{ds_use_yn}'
                             }
	        			}]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">핸드폰</div>',
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				 xtype:'excombobox',
                             valueField:'CODE',
                             displayField:'NAME',
                             reference:'lc_mobile_telno1',
                             name:'MOBILE_TELNO1',
                             emptyText: '선택',
                             bind:{
                            	 store : '{ds_mobile_telno1}'
                             },
                             width : 60,
                             exMand:true
	        			},{
	        				width : 15,
	        				html : '<div style="text-align:center;width : 100%;">-</div>'
	        			},{
                       	 xtype:'extextfield',
                            reference:'txt_mobile_telno2',
                            exLabel:'핸드폰',
                            exMand:true,
                            name:'MOBILE_TELNO2',
                            width : 60
	        			},{
	        				width : 15,
	        				html : '<div style="text-align:center;width : 100%;">-</div>'
	        			},{
	                       	 xtype:'extextfield',
	                         reference:'txt_mobile_telno3',
	                         exLabel:'핸드폰',
	                         exMand:true,
	                         name:'MOBILE_TELNO3',
	                         width : 60
	        			}]
	        		}]
	        	},{
	               	 xtype:'exblockrow',
	               	 items:[{
	                   	 xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">등록일</div> '
	               	 },{
	               		 xtype:'exblockfield',
	               		 items:[{
	               			 xtype:'extextfield',
	               			 reference:'em_crt_date',	                         
	                         width : '100%',
	                         exReadOnly:true,
	                         name : 'CRT_DATE'
	               		 }]
	               	}]
	        	
	        	},{
	               	 xtype:'exblockrow',
	               	 items:[{
	                   	 xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">비고</div> '
	               	 },{
	               		 xtype:'exblockfield',
	               		 items:[{
	               			 xtype:'extextarea',
	               			 reference:'ta_memo',
	                         name:'REMARK',
	                         width : '100%'
	               		 }]
	               	}]
	        	
	        	},{
	        		 xtype:'exblockrow',
	               	 items:[{
	               		 xtype:'exblocklabel',
	                     html:'<div style="text-align:left;padding-left:5px;">CMS 동의 서류<br/>(동의 스캔/녹취)</div>',
	                     height : 50
	               	 },{
	               		 xtype:'exblockfield',
	               		height : 50,
	               		 items:[{
	               			 xtype: 'filefield',
	               			 buttonText: '첨부',
	               			 name : 'FILE_NAME',
	               			 reference : 'ds_File',                			
	               			 width : 250,
	               			//inputType: 'file',
	               			 listeners: {
	                            change: 'fileChange' ,	                          
	                         } 	               		
	               		 },{
	               			 xtype:'extextfield',
	               			 width : 0,
	               			 inputType : 'hidden',
	               			 name : 'FILE_CNT',
	               			 reference : 'txt_file_cnt',
	               		},{
	               			 xtype:'extextfield',
	               			 width : 0,
	               			 inputType : 'hidden',
	               			 name : 'SQL_MODE',
	               			 reference : 'txt_sql_mode'
	               		 }]
	               	 }]
	        	
	        	},{
	        		
	        		 html:' <div style="color:red;"><p>* CMS 신청은 반드시 CMS출금동의서를 받으셔야 합니다.</p><p>* 계좌번호가 변경되면 반드시 추가 버튼을 눌러 신규로 다시 등록하셔야 합니다.</p><p>* 회원정보 등록에 실패한계좌로 접수가 있는 경우 오류내용중 개인정보나 계좌정보를 수정하여 저장을 하면 재신청이 자동으로 이루어집니다. 또한 계좌번호를 수정하면 접수등록된 계좌도 자동으로 변경되니 별도로 재접수처리 하실 필요가 없습니다. </p></div><img src="./resources/img/cms/cms001.png" >',
	                 height:358,
	        	
	        	}]// exfieldsetblockbox
	        	
	        		
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});