Ext.define('ExFrm.view.rec.rec014w_05',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec014w_05',
    requires:[
    	'ExFrm.view.rec.rec014w_05Controller',
        'ExFrm.view.rec.rec014w_05Model'
    ],
    controller:'rec014w_05',
    viewModel:{
        type:'rec014w_05'
    },
    name:'rec014w_05',
    isRootView:true,
    //title:'상시접수조회',
    header:false,
    //closable:true,
    closable:false,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',     
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items :[{
        	width : '0.5%'
        },{
        	width  : '99%',
        	layout : 'vbox',
        	items  : [{
        		layout : 'hbox',
        		width  : '100%',
        		//style  : 'background:#e3e3e3;',
        		items  : [{
        			xtype       : 'excheckbox',
                	reference   : 'cb_setBudNo',
                	listeners   : {
                		change : 'setBudNo'
                    }
        		},{
        			width : 5
        		},{
        			xtype           : 'excombobox',                		
            		labelAlign      : 'left',
                    reference       : 'cb_Stipulation',
                    displayField    : 'name',
                    valueField      : 'code',
                    exCommonDmnCode : '001',    
                    width           : 90,
                    store           : {},
                    listeners       : {
                    	change:'onSearchTypeChange'
                    }
        		},{
        			width : 10
        		},{
                	xtype           : 'extextfield',
                    reference       : 'txt_stipulation',
                   // value           : '',
                    enableKeyEvents : true,
                    width           : 100 ,
                    listeners       : {
                    	keyup : 'onSearchEnter',
                   	    blur  : 'onSearchBlur'
                    },
                    value : '01-00001-0-01'
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    //text     : '검색',
                    handler  : 'onBudSearch',
                    reference: 'budSearchBtn',
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                    width        : 90,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    : 'cb_date',
                    value        : 1,
                	bind         : {
                    	store:'{ds_date}'
                	},
                	/*listeners    : {
                    	change : 'onDateField'
                    }*/
        		},{
        			width : 5
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptSDate',
                    name           : 'ACCEPT_S_DATE',                                                   
                    format         : 'Y-m-d',
        		},{
        			html :'<div style="text-align:center;width:20px;">~</div>',
        			width : 20
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptEDate',
                    name           : 'ACCEPT_E_DATE',                                                   
                    format         : 'Y-m-d',
        		},{
        			width : 5,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 35,
                    fieldLabel   : '<span style="font-weight: 700;">위치</span>',
                    width        : 160,
                    valueField   : 'JUNGAK_CD',
                    displayField : 'JUNGAK_NM',     
                    reference    :'lc_jungak',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_jungak}'
                    },
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		name      : 'selectBtn',
              		text      : '조회',
              		handler   : 'onSelect',
        		}]
        	},{
        		height : 10
        	},{
        		layout : 'hbox',        		
        		items  :[{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">약정서</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_agree_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">가족증명</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_family_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">호적등본</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_hojuk_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">주민등본</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_jumin_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">제적등본</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'cb_jejuk_sheet_yn',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_submit}'
                    },
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
                        reference        : 'txt_budNo',
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
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'SEQ',
    	       	 		name      : 'SEQ',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'ACCEPT_SEQ',
    	       	 		name      : 'ACCEPT_SEQ',
    	       	 		width     : 0
            		}]
        		}]
        	
        	},{
        		height : 10,
        	},{
        		layout : 'hbox',
        		height : 25,
        		width  : '100%',
        		items  :[{
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">영탑내역</span>',
        			width : 400
        		},{
        			width : 10
        		},{
        			layout : 'hbox',
        			flex : 1,
        			items :[{
        				html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">영탑대장</span>',
            			flex : 1
        			},{
            			xtype     : 'exbutton',
                  		reference : 'excelBtn',
                  		name      : 'excelBtn',
                  		text      : '저장',
                  		handler   : 'onSave',
        			}]
        			
        		}]
        	},{        		
        		layout : 'hbox',
        		height : 400,
        		width  : '100%',
        		items  :[{
	        		exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'rec014w_05_a',
	                cls           : 'rec014w_05_a',
	                height        : 400,
	                width         : 400,
	                bind          : {
	                    store:'{ds_detail}'
	                },
	                listeners      : {
                    	selectionchange : 'onSelectionChange'
                    },
	                columns:[{
	                	text        : '위치',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'JUNGAK_NM',                    
	                    exAlign     : 'left',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '탑번',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'LIGHT_NO',                    
	                    exAlign     : 'center',
	                    width       : 80,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '신도번호',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'BUD_NO',                    
	                    exAlign     : 'center',
	                    width       : 120,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                },{
	                	text        : '탑주명',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'BUD_NM',                    
	                    exAlign     : 'left',
	                    width       : 100,
	                    sortable    : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value;
	                    }
	                }]
        		},{
        			width : 10
        		},{
        			flex : 1,
        			xtype   :'exfieldsetblockbox',
        			items   : [{
            			xtype:'exblockrow',
                        items:[{
                        	xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">탑번</div>'
                        },{
                        	xtype   : 'exblockfield',
                        	items   : [{
                        		xtype     : 'extextfield',
                                reference : 'txt_jungak_nm',
                                name      : 'JUNGAK_NM',
                                width     : 80,
                                exReadOnly: true
                        	},{
                        		html    : '<div style="text-align:center;font-weight:700;width:15px;">~</div>',
                        		width   : 15, 
                        	},{
                        		xtype     : 'extextfield',
                                reference : 'txt_light_no',
                                name      : 'LIGHT_NO',
                                width     : 40,
                                exReadOnly: true
                        	}]
                        },{
                        	xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">탑주</div>'
                        },{
                        	xtype   : 'exblockfield',
                        	items   : [{
                        		xtype     : 'extextfield',
                                reference : 'txt_bud_no',
                                name      : 'BUD_NO',
                                width     : 100,
                                exReadOnly: true
                        	},{                        		
                        		width   : 5, 
                        	},{
                        		xtype     : 'extextfield',
                                reference : 'txt_bud_nm',
                                name      : 'BUD_NM',
                                width     : 100,
                                exReadOnly: true
                        	}]
                        }]
        			},{
        				xtype:'exblockrow',
                        items:[{
                        	xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소</div>'
                        },{
                        	xtype   : 'exblockfield',
                        	items   : [{
                        		xtype     : 'extextfield',
                                reference : 'txt_addr1',
                                name      : 'ADDR1',
                                width     : 250,
                                exReadOnly: true
                        	},{                        		
                        		width   : 5, 
                        	},{
                        		xtype     : 'extextfield',
                                reference : 'txt_addr2',
                                name      : 'ADDR2',
                                width     : 250,
                                exReadOnly: true
                        	},{                        		
                        		width   : 5, 
                        	},{
                        		html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">(우)</div>'
                        	},{                        		
                        		width   : 5, 
                        	},{
                        		xtype     : 'extextfield',
                                reference : 'em_zip_cd',
                                name      : 'ZIP_CD',
                                width     : 50,
                                exReadOnly: true
                        	}]
                        }]
        			},{
        				xtype:'exblockrow',
        				items:[{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">제출서류</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items   : [{
	                        	 xtype         : 'excheckbox',
	   	                   		 fieldLabel    : '<span style="font-weight: 700;">약정서</span>',
	   	           	       		 labelWidth    : 50,
	   	                   		 labelAlign    : 'right',
	   	                   		 name          : 'AGREE_SHEET_YN',
	   	                   		 reference     : 'cbx_agree_sheet_yn',
	   	                   		 inputValue    : 'T',
	   	                   		 uncheckedValue: 'F'
	                       	},{
	                       		 xtype         : 'excheckbox',
	   	                   		 fieldLabel    : '<span style="font-weight: 700;">가족증명서</span>',
	   	           	       		 labelWidth    : 80,
	   	                   		 labelAlign    : 'right',
	   	                   		 name          : 'FAMILY_SHEET_YN',
	   	                   		 reference     : 'cbx_family_sheet_yn',
	   	                   		 inputValue    : 'T',
	   	                   		 uncheckedValue: 'F'
	                       	},{
	                       		 xtype         : 'excheckbox',
	   	                   		 fieldLabel    : '<span style="font-weight: 700;">호적등본</span>',
	   	           	       		 labelWidth    : 70,
	   	                   		 labelAlign    : 'right',
	   	                   		 name          : 'HOJUK_SHEET_YN',
	   	                   		 reference     : 'cbx_hojuk_sheet_yn',
	   	                   		 inputValue    : 'T',
	   	                   		 uncheckedValue: 'F'
	                       	},{
	                       		 xtype         : 'excheckbox',
	   	                   		 fieldLabel    : '<span style="font-weight: 700;">주민등록등본</span>',
	   	           	       		 labelWidth    :100,
	   	                   		 labelAlign    : 'right',
	   	                   		 name          : 'JUMIN_SHEET_YN',
	   	                   		 reference     : 'cbx_jumin_sheet_yn',
	   	                   		 inputValue    : 'T',
	   	                   		 uncheckedValue: 'F'
	                       	},{
	                       		width : 5
	                       	},{
	                       		 xtype         : 'excheckbox',
	   	                   		 fieldLabel    : '<span style="font-weight: 700;">제적등본</span>',
	   	           	       		 labelWidth    : 70,
	   	                   		 labelAlign    : 'right',
	   	                   		 name          : 'JEJUK_SHEET_YN',
	   	                   		 reference     : 'cbx_jejuk_sheet_yn',
	   	                   		 inputValue    : 'T',
	   	                   		 uncheckedValue: 'F'
	                        }]
            			}]
        			},{
        				xtype:'exblockrow',
        				items:[{
                        	xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">본</div>'
                        },{
                        	xtype   : 'exblockfield',
                        	items:[{
                        		xtype      : 'extextfield',
    	                        reference  : 'txt_hyo_bon',
    	                        exLabel    : 'HYO_LAST_NAME',
    	                        name       : '',
    	                        width      : 30,
    	                        enableKeyEvents : true,
    	                        listeners       : {
    	                      	   keyup : 'onSearchBonEnter'
    	                        },
                        	},{
                        		width : 1
                        	},{
                        		xtype        : 'excombobox',
                                valueField   : 'CODE',
                                displayField : 'NAME',
                                reference    : 'lc_hyo_bon',
                                name         : 'HYO_BON',	 
                                emptyText    : '선택',                    
                                width        : 70,
                                bind         : {
                                	store:'{ds_hyo_bon}'
                                },
                        	}]
                        },{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">효관계</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items:[{
                        		xtype        : 'excombobox',
                                valueField   : 'CODE',
                                displayField : 'NAME',
                                reference    : 'sel_hyo_rel',
                                name         : 'HYO_REL',	 
                                emptyText    : '선택',                    
                                width        : 90,
                                bind         : {
                                	store:'{ds_hyo_rel}'
                                }, 
                        	}]
            			},{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">영가구분</div>'
            			},{
            				xtype   : 'exblockfield',
            				items:[{
	                       		 xtype         : 'excheckbox',
	   	                   		 fieldLabel    : '<span style="font-weight: 700;">조상영가</span>',
	   	           	       		 labelWidth    : 70,
	   	                   		 labelAlign    : 'right',
	   	                   		 name          : 'ACENST_YN',
	   	                   		 reference     : 'cbx_acenst_yn',
	   	                   		 inputValue    : 'T',
	   	                   		 uncheckedValue: 'F'
	                       	},{
	                       		width : 5
	                       	},{
	                       		 xtype         : 'excheckbox',
	   	                   		 fieldLabel    : '<span style="font-weight: 700;">무명영가</span>',
	   	           	       		 labelWidth    : 70,
	   	                   		 labelAlign    : 'right',
	   	                   		 name          : 'NAMELESS_YN',
	   	                   		 reference     : 'cbx_nameless_yn',
	   	                   		 inputValue    : 'T',
	   	                   		 uncheckedValue: 'F'
	                       	}]
                        }]
        			},{
        				xtype:'exblockrow',
                        items:[{
                        	xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">연락처</div>'
                        },{
                        	xtype   : 'exblockfield',
                        	items   : [{
                        		xtype     : 'extextfield',
                                reference : 'txt_tel_no',
                                name      : 'TEL_NO',
                                width     : 150,
                                exReadOnly: true
                        	}]
                        },{
                        	xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">휴대전화</div>'
                        },{
                        	xtype   : 'exblockfield',
                        	items   : [{
                        		xtype     : 'extextfield',
                                reference : 'txt_mobile_telno',
                                name      : 'MOBILE_TELNO',
                                width     : 150,
                                exReadOnly: true
                        	}]
                        }]
        			},{
        				xtype:'exblockrow',
        				items:[{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">접수일</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items:[{
    	        				xtype     : 'exdatefield',
    	                        reference : 'em_accept_dt',
    	                        exLabel   : '',                            
    	                        name      : 'ACCEPT_DT',
    	                        format    : 'Y/m/d',
    	                        width     : '95%',
                        	}]
            			},{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">불사일</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items:[{
    	        				xtype     : 'exdatefield',
    	                        reference : 'em_bulsa_dt',
    	                        exLabel   : '',                            
    	                        name      : 'BULSA_DT',
    	                        format    : 'Y/m/d',
    	                        width     : '95%',
                        	}]
            			},{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">봉안일</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items:[{
    	        				xtype     : 'exdatefield',
    	                        reference : 'em_bongan_dt',
    	                        exLabel   : '',                            
    	                        name      : 'BONGAN_DT',
    	                        format    : 'Y/m/d',
    	                        width     : '95%',
                        	}]
            			},{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">재봉안일</div>'
            			},{
            				xtype   : 'exblockfield',
            				items:[{
            					xtype     : 'exdatefield',
                                reference : 'em_rebong_dt',
                                exLabel   : '',                            
                                name      : 'REBONG_DT',
                                format    : 'Y/m/d',
                                width     : '95%',
            				}]
            			}]
        			},{
        				xtype:'exblockrow',
        				items:[{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">접수금액</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items   : [{
	            				xtype       : 'extextfield',
	                            exReadOnly  : true,
	                            reference   : 'me_PaymentPlanAmt',
	                            name        : 'PAYMENT_PLAN_AMT',
	                            exType      : 'number',
	                            exAlign     : 'right',
	                            value       : 0,
	                            width       : '95%'
                        	}]
            			},{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">납부금액</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items   : [{
	            				xtype       : 'extextfield',
	                            exReadOnly  : true,
	                            reference   : 'me_PaymentAmt',
	                            name        : 'PAYMENT_AMT_RESULT',
	                            exType      : 'number',
	                            exAlign     : 'right',
	                            value       : 0,
	                            width       : '95%'
                        	}]
            			},{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">미수금액</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items   : [{
	            				xtype       : 'extextfield',
	                            exReadOnly  : true,
	                            reference   : 'me_MisuAmt',
	                            name        : 'MISU_AMT_RESULT',
	                            exType      : 'number',
	                            exAlign     : 'right',
	                            value       : 0,
	                            width       : '95%'
                        	}]
            			},{
            				xtype   : 'exblocklabel',
                            html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">영탑관리자</div>'
            			},{
            				xtype   : 'exblockfield',
                        	items   : [{
	            				xtype       : 'extextfield',
	                            reference   : 'txt_top_mng_nm',
	                            name        : 'YOUNGTOP_MEMO',
	                            width       : '95%'
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
                        		xtype     : 'extextarea',
                        		height    : 187,
                                reference : 'ta_youngtop_memo',
                                exLabel   : '',                            
                                name      : 'YOUNGTOP_MEMO',
                                width     : '99.2%',
                        	}]
            			}]
        			}]
	        	}]
        	},{
        		height : 1
        	},{
        		width  : '100%',
				layout : {
           			 type : 'hbox'
           		},
           		items :[{
           			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">납부내역</span>'
           		},{
           			flex : 1
           		},{
        			xtype     : 'exbutton',
            		reference : 'upBtn',
            		name      : 'upBtn',
            		handler   : 'onSortUp',
            		iconCls   : 'fa fa-angle-up',
    		    },{
    			    width : 5
    		    },{
    			    xtype     : 'exbutton',
            		reference : 'downBtn',
            		name      : 'downBtn',
            		handler   : 'onDownUp',	            		
            		iconCls   : 'fa fa-angle-down',
    		    },{
    			    width : 5
           		},{
           			xtype     : 'exbutton',
              		reference : 'addYoungBtn',
              		name      : 'addYoungBtn',
              		text      : '추가',
              		handler   : 'onAddYoung'
           		},{
           			width : 5
           		},{
           			xtype     : 'exbutton',
              		reference : 'deleteYoungBtn',
              		name      : 'deleteYoungBtn',
              		text      : '삭제',
              		handler   : 'onDeleteYoung'
           		},{
           			width : 5
           		},{
        			xtype     : 'exbutton',
              		reference : 'saveYoungBtn',
              		name      : 'saveYoungBtn',
              		text      : '저장',
              		handler   : 'onSaveYoung'
           		}]
        	},{
        		exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec014w_05_b',
                cls           : 'rec014w_05_b  none-dirty-grid',
                height        : 230,
                width         : '100%',
                bind          : {
                    store:'{ds_youngtop_youngga}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                }],
                columns:[{
                	text        : '순번',
                	xtype       : 'excolumn',
                    dataIndex   : 'BONGTOP_SEQ',
                    width       : 70,
                    exAlign     : 'center',                    
                },{
                	text        : '망관계',
                	xtype       : 'excolumn',
                    dataIndex   : 'YOUNGGA_REL',
                    width       : 100,
                    exAlign     : 'left',
                },{
                	text        : '본',
                	xtype       : 'excolumn',
                    dataIndex   : 'YOUNGGA_BON',
                    width       : 90,
                    exAlign     : 'left',
                },{
                	text        : '후인/유인',
                	xtype       : 'excolumn',
                    dataIndex   : 'YOUNGGA_GENDER',
                    width       : 85,
                    exAlign     : 'center',
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_death_gender');
                   		return exCommon.getComboVal(value,store, '' );
                    }
                },{
                	text        : '영가자명',
                	xtype       : 'excolumn',
                    dataIndex   : 'YOUNGGA_BUD_NM',
                    width       : 130,
                    exAlign     : 'left',
                },{
                	text        : '봉탑일',
                	xtype       : 'excolumn',
                    dataIndex   : 'BONGTOP_DT',
                    width       : 110,
                    exAlign     : 'center',
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = 'recCellEdit';
                    	return exCommon.getGridDateFormat(value, '/' , 8);
                    },
                    editor       : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text        : '봉탑구분',
                	xtype       : 'excolumn',
                    dataIndex   : 'BONGTOP_GBN',
                    width       : 150,
                    exAlign     : 'center',
                    editor       : {
                    	xtype         : 'extextfield',
                    },
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = 'recCellEdit';
                    	return value;
                    },
                },{
                	text        : '동일',
                	xtype       : 'excolumn',
                    dataIndex   : 'YOUNGGA_EQUAL',
                    width       : 90,
                    exAlign     : 'center',
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_death_equal');
                   		return exCommon.getComboVal(value,store, '' );
                    }
                },{
                	text        : '영가',
                	xtype       : 'excolumn',
                    dataIndex   : 'YOUNGGA_SPIRITUAL',
                    width       : 90,
                    exAlign     : 'center',
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_death_spiritual');
                   		return exCommon.getComboVal(value,store, '' );
                    }
                }]
                    
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
