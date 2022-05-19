Ext.define('ExFrm.view.asp.asp001w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp001w_01',
	requires:[
		'ExFrm.view.asp.asp001w_01Controller',
        'ExFrm.view.asp.asp001w_01Model'
	],
	controller:'asp001w_01',
	viewModel:{
        type:'asp001w_01'
    },
    name:'asp001w_01',
    isRootView:true,
    title:'사찰계정관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
        items:[{
            xtype:'container',
            layout:'hbox',
            items:[{
                xtype:'tbspacer',
                flex:1
            }]
        },{
            reference:'searchItems',
            xtype:'exfieldsetbox',
            cls:'exfieldsetboxsrch',
            items:[
            {
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                items:[{
                    layout:'hbox',
                    xtype:'container',
                    items:[{                    	
                        xtype           : 'extextfield',
                        fieldLabel      : '사찰명 ',
                        reference       : 'temple_nmSrch',
                        name            : 'temple_nmSrch',
                        labelAlign      : 'left',                        
                        labelWidth      : 50,
                        exLabel         : '사찰명',
                        enableKeyEvents : true,
                        width : '15%',
                        listeners:{
                    	   keyup : 'onSearchEnter'
                        }
                    },{
                    	width : 5
                    },{
                    	xtype:'exbutton',
                        cls:'exbuttonsrch',
                        text:'조회',
                        margin : '0 5 0 0',
                        listeners:[{
                        	click:'onSearchItems'
                        }]
                	 },{                    	                
                         xtype:'exbutton',
                         cls:'exbuttonsrch',
                         text:'신규',
                         margin : '0 5 0 0',
                         listeners:[{
                         		click:'onAddTemple'
                         }] 
                	 },{                    	                
                         xtype:'exbutton',
                         cls:'exbuttonsrch',
                         text:'저장',
                         listeners:[{
                         		click:'onSaveTemple'
                         }]
                    }]
                },{
                    layout:'hbox',
                    xtype:'container',
                    items:[{
                        labelField:'라디오그룹',
                        labelAlign:'right',
                        xtype:'exradiogroup',
                        reference:'exRadioGroup'
                    },{
                        xtype:'container',
                        flex:1                    
                    }]
                }]
            }]
        },{
            xtype:'container',
            layout:'hbox',            
            items:[{            	
            	/*flex : 1,*/
            	exGroupRef:true,
                xtype:'exgrid',
                reference:'asp001w_01_a',
                height:746,
                width:'40%',
                bind:{
                    store:'{ds_main}'
                },
                listeners:{
                    selectionchange : 'onSelectionChange'
                },
                columns:[{
                    text:'번호',
                    xtype:'rownumberer',
                    flex:2,
                    align:'center',
                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.data.USE_YN == 'F'){
                    		meta.tdCls = 'useYnBack'
                    	}
                    	return (rowIndex+1);
                    }
                },{
                    text:'사찰코드',
                    dataIndex:'TEMPLE_CD',
                    flex:3,
                    align:'center',
                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.data.USE_YN == 'F'){
                    		meta.tdCls = 'useYnBack'
                    	}
                    	return value;
                    }
                },{
                    text:'사찰명',
                    dataIndex:'TEMPLE_NM',
                    flex:5,
                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.data.USE_YN == 'F'){
                    		meta.tdCls = 'useYnBack'
                    	}
                    	return value;
                    }
                },{
                    text:'사용여부',
                    dataIndex:'USE_YN_NM',
                    flex:2,
                    exAlign:'center',
                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.data.USE_YN == 'F'){
                    		meta.tdCls = 'useYnBack'
                    	}
                    	return value;
                    }
                    /*editor:{
                        valueField:'value',
                        displayField:'display',
                        bind:{
                        	store:'{use_yn}'
                        }
                    },                    
                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.data.USE_YN == 'F'){
                    		meta.style = 'background-color:#C8C8C8;';
                    	}
                    	 var store = this.up('[isRootView=true]').getViewModel().getStore('use_yn');
                         var index = store.find('value',value);
                         
                         
                         if(index != -1){
                             return store.getAt(index).get('display');
                         }
                         else {
                             return value;
                         }
                    	                    
                    }*/
                }]
            },{
            	 exGroupRef:true,
            	 /*flex : 1,*/
            	 width : '60%',
                 reference:'detailItems',
                 xtype:'exfieldsetblockbox',
                 items:[{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">사찰명</div>'                           
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             reference:'txt_temple_nm',
                             exLabel:'사찰명',
                             exMand:true,
                             name:'TEMPLE_NM'
                         },{
                        	 xtype:'extextfield',
                        	 width : 0,
                        	 reference:'txt_temple_cd',
                        	 name:'TEMPLE_CD',
                        	 inputType : 'hidden'
                         },{
                        	 xtype:'extextfield',
                        	 width : 0,
                        	 reference:'txt_sql_mode',
                        	 name:'SQL_MODE',
                        	 inputType : 'hidden'
                         }]
                     },{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">종단</div>',
                     },{
                         xtype:'exblockfield',
                         items:[{
                        	 xtype        : 'combobox',
                             valueField   : 'CODE',
                             displayField : 'NAME',
                             reference    : 'lc_sect',
                             name         : 'SECT_CD',
                             bind         : {
                             	store:'{ds_sect}'
                             }
                         }]
                     }]
                 },{
                	 xtype:'exblockrow',
                	 items:[{
                		 xtype:'exblockfield',
                		 items:[{
                    		 flex : 1,
                    		 html : '<div style="text-align:center;color:red;height:40px;line-height:40px;">대 표 자</div>'                    	
                    	 }]
                	 }]	 
                 },{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">대표ID1</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype     : 'extextfield',
                             reference : 'txt_admin_id',
                             name      : 'ADMIN_ID',
                             value     : '',
                             exLabel   : '대표ID',
                             exMand    : true,
                             exReadOnly: true
                         }]
                     },{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">비밀번호</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             reference:'txt_passwd',
                             name:'PASSWD',
                             value : '',
                             inputType: 'password',
                             exMand:true,
                             exLabel:'비밀번호'                             
                         }]
                     }]
                 },{
                	 xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">주민번호ID</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                        	 xtype:'extextfield',
                        	 reference:'me_admin_id',
                             name:'REP_JUMINNO',
                             exLabel:'주민번호ID',
                             exMand:true,
                             //inputType: 'number',
                             enableKeyEvents: true,
                             enforceMaxLength: true,
                             maxLength : 14,
                             listeners : [{
                            	 keyup : 'onKeyUpJumin'
                             }]
                         }]
                         
                     },{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">사업자번호</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                        	 xtype:'extextfield',
                             reference:'me_reg_number',
                             name:'REG_NUMBER',                             
                             exLabel:'사업자번호',
                             exMand:true,
                             enableKeyEvents: true,
                             enforceMaxLength: true,
                             maxLength : 12,
                             listeners : [{
                            	 keyup : 'onKeyUpReg'
                             }]
                         }]
                     }]
                 },{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">성명</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             reference:'txt_rep_name',
                             name:'REP_NAME',
                             exMand:true,
                             exLabel:'성명'
                         }]
                     },{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">신도문자체크</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'checkboxfield',
                             boxLabel:'접수',   
                             name:'SIN_SMS_YN',
                             reference:'sin_sms_yn',
                             inputValue:'Y' ,
                         },{
                        	 xtype:'checkboxfield',
                             boxLabel:'생일',   
                             name:'SIN_BIRTH_YN',
                             reference:'sin_birth_yn',
                             inputValue:'Y' ,
                         },{
                        	 xtype:'checkboxfield',
                             boxLabel:'단체',   
                             name:'SIN_GROUP_YN',
                             reference:'sin_group_yn',
                             inputValue:'Y' ,
                         }]
                     }]
                 },{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">우편번호</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             reference:'em_depu_postno',
                             name:'REP_POSTNO',
                             exLabel:'우편번호',
                             exReadOnly:true
                         },{
                        	 width : 5
                         },{
                        	 xtype:'button',
                             text:'우편번호',
                             handler:'onFindAddr'
                         }]                     
                     }]
                 },{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">기본주소</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             width : '100%',
                             reference:'txt_depu_addr1',
                             name:'DEPU_ADDR1',
                             exLabel:'기본주소',
                             exReadOnly:true                        
                         }]                     
                     }]
                 },{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">상세주소</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             width : '74%',
                             reference:'txt_depu_addr2',
                             name:'DEPU_ADDR2',
                             exLabel:'상세주소1'
                         },{
                        	 width : '1%'
                         },{
                        	 xtype:'extextfield',
                             width : '25%',
                             reference:'txt_depu_addr3',
                             name:'DEPU_ADDR3',
                             exLabel:'상세주소2',
                             exReadOnly:true 
                         },{
                        	 xtype:'extextfield',
                        	 reference:'txt_depu_bldg_num',
                        	 name:'DEPU_BLDG_NUM',
                        	 type : 'hidden',
                        	 width : '0%',
                         }]                     
                     }]
                 },{                	 
                	 xtype:'exblockrow',
                	 items:[{
                		 xtype:'exblockfield',
                		 items:[{
                    		 flex : 1,
                    		 html : '<div style="text-align:center;color:blue;height:40px;line-height:40px;">소 재 </div>'                    	
                    	 }]
                	 }]
                 },{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">우편번호</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             reference:'em_soje_postno',
                             name:'POSTNO',
                             exLabel:'우편번호',
                             exReadOnly:true
                         },{
                        	 width : 5
                         },{
                        	 xtype:'button',
                             text:'우편번호',
                             handler:'onFindSojeAddr'
                         }]                     
                     }]
                 },{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">기본주소</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             width : '100%',
                             reference:'txt_soje_addr1',
                             name:'SOJE_ADDR1',
                             exLabel:'기본주소',
                             exReadOnly:true                        
                         }]  
                     }]
                 },{
                     xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">상세주소</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                             xtype:'extextfield',
                             width : '74%',
                             reference:'txt_soje_addr2',
                             name:'SOJE_ADDR2',
                             exLabel:'상세주소1'
                         },{
                        	 width : '1%'
                         },{
                        	 xtype:'extextfield',
                             width : '25%',
                             reference:'txt_soje_addr3',
                             name:'SOJE_ADDR3',
                             exLabel:'상세주소2',
                             exReadOnly:true 
                         },{
                        	 xtype:'extextfield',
                        	 reference:'txt_soje_bldg_num',
                        	 name:'SOJE_BLDG_NUM',
                        	 type : 'hidden',
                        	 width : '0%',
                         }]                     
                     }]
                 },{
                	 xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">휴대전화번호</div>'
                     },{
                         xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'CODE',
                             displayField:'NAME',
                             reference:'lc_mobile_telno',
                             name:'MOBILE_TELNO1',
                             emptyText : '선택',
                             bind:{
                             	store:'{ds_mobile_telno}'
                             },
                             width : 80
                         },{
                        	 html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',                        	 
                        	 width : 20
                         },{
                        	 xtype:'extextfield',
                             reference:'txt_mobile_telno2',
                             name:'MOBILE_TELNO2',
                             exLabel:'휴대전화번호2',
                             width : 80,
                             enforceMaxLength: true,
                             maxLength : 4,
                         },{
                        	 html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
                        	 width : 20,                        	 
                         },{
                        	 xtype:'extextfield',
                             reference:'txt_mobile_telno3',
                             name:'MOBILE_TELNO3',
                             exLabel:'휴대전화번호3',
                             width : 80 ,
                             enforceMaxLength: true,
                             maxLength : 4,
                         }]
                     }]
                 },{
                	 xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">전화번호</div>'
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'CODE',
                             displayField:'NAME',
                             reference:'lc_telno',
                             name:'TELNO1',
                             emptyText : '선택',
                             bind:{
                             	store:'{ds_telno}'
                             },
                             width : 80
                         },{
                        	 html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
                        	 width : 20
                         },{
                        	 xtype:'extextfield',
                             reference:'txt_telno2',
                             name:'TELNO2',
                             exLabel:'전화번호2',
                             width : 80,
                             enforceMaxLength: true,
                             maxLength : 4,
                         },{
                        	 html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
                        	 width : 20
                         },{
                        	 xtype:'extextfield',
                             reference:'txt_telno3',
                             name:'TELNO3',
                             exLabel:'전화번호3',
                             width : 80 ,
                             enforceMaxLength: true,
                             maxLength : 4,
                         }]
                     }]
                 },{
                	 xtype:'exblockrow',
                     items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">인원제한</div>'
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'extextfield',
                             reference:'me_user_limit',
                             name:'USER_LIMIT',
                             exLabel:'인원제한',
                             width : 80,
                             enforceMaxLength: true,
                             maxLength : 4,
                             value : 50,
                             inputType : 'number'                            	
                         }]
                     },{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">결의서제한</div>'
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'extextfield',
                             reference:'me_act_limit',
                             name:'ACT_LIMIT',
                             exLabel:'결의서제한',
                             width : 80,
                             enforceMaxLength: true,
                             maxLength : 4,
                             value : 50,
                             inputType : 'number'                            	
                         }]
                     }]
                 },{
                	 xtype:'exblockrow',
                     items:[{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">사용유무</div>'
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'value',
                             displayField:'display',
                             reference:'lc_use_yn',
                             name:'USE_YN',
                             exMand:true,
                             value : 'F',
                             bind:{
                             	store:'{use_yn}'
                             }
                         }]
                     },{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">SMS사용유무</div>'
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'value',
                             displayField:'display',
                             reference:'lc_sms_yn',
                             name:'SMS_YN',
                             value : 'F',
                             exMand:true,
                             bind:{
                             	store:'{use_yn2}'
                             }
                         }]
                     }]
                 },{
                	 xtype:'exblockrow',
                     items:[{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">영가구분</div>'
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'CODE',
                             displayField:'NAME',
                             reference:'lc_death_type',
                             name:'DEATH_TYPE',
                             exMand:true,
                             emptyText : '선택',
                             bind:{
                             	store:'{ds_death_type}'
                             }
                         }]
                     },{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">접수결과</div>'
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'value',
                             displayField:'display',
                             reference:'lc_rec_result',
                             name:'REC_RESULT_TYPE',
                             exMand:true,
                             value : 'F',                             
                             bind:{
                             	store:'{use_yn}'
                             }
                         }]
                     }]
                 },{
                	 xtype:'exblockrow',
                     items:[{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">검색구분</div>'
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'value',
                             displayField:'display',
                             reference:'lc_search_gbn',
                             exMand:true,
                             name:'SEARCH_GBN',
                             value : 'NAME_KOR',
                             bind:{
                             	store:'{ds_search_gbn}'
                             }
                         }]
                     },{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">축원문나이표시</div>'
                     },{
                    	 xtype:'exblockfield',
                    	 items:[{
                    		 xtype:'combobox',
                             valueField:'value',
                             displayField:'display',
                             reference:'lc_print_age_yn',
                             name:'PRINT_AGE_YN',
                             value : 'F',                             
                             bind:{
                             	store:'{use_yn}'
                             }
                    	 }]                    	 
                     }]
                 },{
                	 xtype:'exblockrow',
                	 items:[{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">연등사찰명출력</div>'
                	 },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'value',
                             displayField:'display',
                             reference:'lc_print_yeondeung_yn',
                             name:'PRINT_YEONDEUNG_YN',
                             value : 'F',                             
                             bind:{
                             	store:'{use_yn}'
                             }
                         }]
                	 },{
                		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">양식출력여부</div> '
                	 },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'combobox',
                             valueField:'value',
                             displayField:'display',
                             reference:'lc_print_form_yn',
                             name:'PRINT_FORM_YN',
                             value : 'F',                             
                             bind:{
                             	store:'{use_yn}'
                             }
                         }]
                	 }]
                 },{
                	 xtype:'exblockrow',
                	 items:[{
                		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">도장이미지</div>'
                	 },{
                		 xtype:'exblockfield',
                		 items:[{
                			 xtype      : 'filefield',
                			 buttonText : '첨부',
                			 name       : 'FILE_NAME',
                			 reference  : 'file_name',                			
                			 width      : 250
                		 },{
                			 xtype      : 'exbutton',
                			 text       : '다운로드',
                			 margin     : '0 0 0 5',
                			 name       : 'down_img',
                			 reference  : 'down_img',
                			 handler    : 'onDownImg'
                		 },{
                			 xtype      : 'exbutton',
                			 text       : '삭제',
                			 margin     : '0 0 0 5',
                			 name       : 'del_img',
                			 reference  : 'del_img',
                			 handler    : 'onDelImg'
                		 },{
                			 xtype      :'extextfield',
                			 width      : 0,
                			 inputType  : 'hidden',
                			 name       : 'FILE_CNT',
                			 reference  : 'txt_file_cnt',
                		 }]
                	 }]
                 },{
                	 xtype:'exblockrow',
                	 items:[{
                    	 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">사찰카드금액</div>'
                	 },{
                		 xtype:'exblockfield',
                         items:[{
	                		 xtype:'extextfield',
	                         reference:'card_price_temple',
	                         name:'PRICE_CARD_TEMPLE',
	                         exLabel:'사찰카드금액 ',
	                         width : 100,
	                         enforceMaxLength: true,
	                         maxLength : 10,
	                         value : 0,
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
                			 reference:'remark',
                             name:'REMARK',
                             width : '100%'
                		 }]
                	 }]
                 },{
                	 xtype:'exblockrow',
                	 items:[{
                		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">등록일</div>'
                	 },{
                		 xtype:'exblockfield',
                		 items:[{
                			 xtype:'extextfield',
                             reference:'crt_date',
                             name:'CRT_DATE',
                             exLabel:'등록일',
                             exReadOnly:true
                		 }]
                	 }]                                	 
                 }]
            }]
        },{ 
        	xtype:'container',
            layout:'hbox',
            items:[{
            	width : '40%',
            },{
            	width : '60%',
            	items:[{
            		layout : 'hbox',
            		items:[{
               		 	html : '결제조건관리'
            		},{
            			width : 20
               	 	},{                		
               	 		xtype : 'exbutton',
                		reference : 'appNewBtn',
                		name : 'appNewBtn',
                		handler : 'onAppNew',
                		text:'신규',
                		margin : '0 5 5 0'
               	 	},{
               	 		xtype : 'exbutton',
                 		reference : 'appDelBtn',
                 		name : 'appDelBtn',
                 		handler : 'onAppDel',
                 		text:'삭제',
                 		margin : '0 5 5 0'
               	 	},{
               	 		xtype : 'exbutton',
                  		reference : 'appSaveBtn',
                  		name : 'appSaveBtn',
                  		handler : 'onAppSave',
                  		text:'저장',
                  		margin : '0 5 5 0'
               	 	},{
               	 		xtype : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'appNewData',
               	 		name : 'appNewData',
               	 		width : 0
               	 	},{
            	 		xtype : 'extextfield',
            	 		inputType : 'hidden',
            	 		reference : 'appUptData',
            	 		name : 'appUptData',
            	 		width : 0
               	 	}]
            	},{
            		exGroupRef:true,
                    xtype:'exgrid',
                    reference:'asp001w_01_b',                    
                    minHeight : 160,
                    maxHeight : 200,
                    plugins:[{
                        ptype:'cellediting'
                    }],                    
                    bind:{
                    	store:'{ds_approval}'
                    }, 
                    columns:[{
                    	flex  : 1,
                    	text:'결재순서',
                    	dataIndex:'SORT_SEQ',
                    	xtype:'excolumn',
                        exAlign:'center'
                    },{
                    	flex  : 4,
                    	text:'결재담당자',
                    	dataIndex:'APPROVAL_TITLE',
                    	xtype:'excolumn',
                        exAlign:'left',
                        editor:{
                            xtype:'extextfield'
                        }
                    }]
            	}]
            }]
        }]
    }]
});