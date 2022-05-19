Ext.define('ExFrm.view.sin.sin001p_01',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_01',
    requires:[
    	'ExFrm.view.sin.sin001p_01Controller',
    	'ExFrm.view.sin.sin001p_01Model'
    ],
    controller:'sin001p_01',
    viewModel:{
        type:'sin001p_01'
    },
    isModal:true,
    name:'sin001p_01',
    title:'분가처리',
    closable:true,
    width:1350,
    height:800,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',
        width:'100%',
        height:'100%',
        cls : 'exformmain',
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items:[{
            width : '0.5%'
        },{
        	 width  : '99%',
        	 items  :[{
        		 layout : 'hbox',
        		 height : 30,
        		 items : [{
        			 html : '',
        			 flex : 1
        		 },{
     	    		xtype     : 'exbutton',
               		reference : 'tempSaveBtn',
               		name      : 'tempSaveBtn',
               		handler   : 'onTempSave',
               		text      : '임시저장',
        		 },{
     				width : 5
        		 },{
        			xtype     : 'exbutton',
               		reference : 'saveBtn',
               		name      : 'saveBtn',
               		handler   : 'onSave',
               		text      : '저장',
    			 },{
    				width : 5
    			 },{
    				 xtype     : 'exbutton',
                	 reference : 'closeBtn',
                	 name      : 'closeBtn',
                	 handler   : 'onClose',
                	 text      : '닫기',
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
		    		}]
        		 }]
        	 },{
        		 layout  : 'hbox',
     	    	items   : [{
     	    		width   : '48.8%',
     	    		items   : [{
     	    			height  : 30,
     	    			html    : '가족기본정보',
     	    		},{
     	    			xtype   :'exfieldsetblockbox',
     		    		items   : [{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                        xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">종류</div>'                           
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype        : 'excombobox',
     	                            valueField   : 'CODE',
     	                            displayField : 'NAME',
     	                            reference    : 'lc_sindo_gbn',
     	                            name         : 'SINDO_GBN',	 
     	                            emptyText    : '선택',
     	                            width        : 70,
     	                            bind         : {
     	                            	store:'{ds_sindo_gbn}'
     	                            }
     	                    	},{
     	                    		width : 2
     	                    	},{
     	                    		xtype      : 'extextfield',
     	                            reference  : 'txt_bud_code',
     	                            exLabel    : '가족코드',                            
     	                            name       : 'BUD_CODE',
     	                            exReadOnly : true
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">우편번호</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items:[{
     	                             xtype      :'extextfield',
     	                             reference  : 'em_zip_cd',
     	                             name       : 'ZIP_CD',
     	                             exLabel    : '우편번호',
     	                             width      : 70,
     	                             exReadOnly : true,
     	                             exFormat   : 'zip',
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
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">주소</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items:[{
     	                    		 xtype      : 'extextfield',
     	                             width      : '100%',
     	                             reference  : 'txt_addr1',
     	                             name       : 'ADDR1',
     	                             exLabel    : '주소',
     	                             /*exReadOnly : true*/     
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">상세주소</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items:[{
     	                    		 xtype      : 'extextfield',
     	                             width      : '59%',
     	                             reference  : 'txt_addr2',
     	                             name       : 'ADDR2',
     	                             exLabel    : '상세주소',
     	                    	},{
     	                    		width       : '1%'
     	                    	},{
     	                    		 xtype      : 'extextfield',
     	                             width      : '40%',
     	                             reference  : 'txt_addr3',
     	                             name       : 'ADDR3',
     	                             exReadOnly : true
     	                    	},{
     	                    		 xtype      : 'extextfield',
     	                             width      : '40%',
     	                             reference  : 'txt_bldg_num',
     	                             inpytType  : 'hidden'
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">전화번호</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items:[{
     	                    		 xtype        : 'excombobox',
     	                             valueField   : 'CODE',
     	                             displayField : 'NAME',
     	                             reference    : 'lc_telno',
     	                             name         : 'TELNO1',
     	                             emptyText    : '선택',
     	                             bind         : {
     	                             	store:'{ds_telno1}'
     	                             },
     	                             width : 80
     	                    	},{
     	                    		width : 20,
     	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
     	                    	},{
     	                    		 xtype      : 'extextfield',
     	                             reference  : 'txt_telno2',
     	                             name       : 'TELNO2',
     	                             exLabel    : '전화2',
     	                             width      : 70,
     	                             /*cls        : 'sin001w_01_number',
     	                             maxLength  : 4,
     	                             minValue   : 0,
     	                             allowNegative: false,
     	                             validator  : function(val) {
     	                            	 try{
     	                            		 if(val > 0){
     		                            		 return true;
     		                            	 }
     	                            	 }catch (e) {
     	                            		 return "숫자만 입력가능합니다.";
     									 }
     	                            	 return "숫자만 입력가능합니다.";
     	                             }*/
     	                    	},{
     	                    		width : 20,
     	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
     	                    	},{
     	                    		xtype       : 'extextfield',
     	                             reference  : 'txt_telno3',
     	                             name       : 'TELNO3',
     	                             exLabel    : '전화3',
     	                             width      : 70,
     	                             //inputType  : 'number',	                             
     	                             //cls        : 'sin001w_01_number',
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">인도인</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items:[{
     	                    		 xtype      : 'extextfield',
     	                             width      : 100,
     	                             reference  : 'txt_hwaju_bud_name',
     	                             name       : 'HWAJU_BUD_NAME',
     	                             exLabel    : '인도인',	           
     	                             exReadOnly : true
     	                    	},{
     	                    		width       : 3
     	                    	},{
     	                    		xtype     : 'exbutton',
     	                      		reference : 'searchHwaajuBtn',
     	                      		name      : 'searchHwaajuBtn',
     	                      		text      : '찾기',
     	                      		handler   : 'onSearchHwaju',
     	                    	},{
     	                    		height    : 0,
     	                    		width     : 0,
     	                    		items     : [{
     	                    			 xtype      : 'extextfield',
     		                             reference  : 'txt_hwaju_bud_no',
     		                             name       : 'HWAJU_BUD_NO',
     		                             inputType  : 'hidden',	           
     		                             exReadOnly : true
     	                    		}]
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">우편</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items:[{
     	                    		 xtype      : 'excheckbox',
     	                    		 fieldLabel : 'DM',
     	                    		 labelWidth : 30,
     	                     		 labelAlign : 'left',
     	                     		 name       : 'POST_TRANS',
     	                     		 reference  : 'cb_post_trans',
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">문자</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items:[{
     	                    		 xtype      : 'excheckbox',
     	                    		 fieldLabel : '전체',
     	                    		 labelWidth : 40,
     	                     		 labelAlign : 'left',
     	                     		 name       : 'ALL_SMS',
     	                     		 reference  : 'all_sms',
     	                     		 listeners: {
     	                                click: {
     	                                    element: 'el', 
     	                                    fn: function (id) {
     	                                    	 var ALL_SMS = Ext.getCmp(this.id);
     	                                    	 var SMS     = this.component.up('[isRootView=true]').lookupReference('cb_sms_trans');
     	                                    	 var BIRTH   = this.component.up('[isRootView=true]').lookupReference('cb_birth_trans');
     	                                    	 var GROUP   = this.component.up('[isRootView=true]').lookupReference('cb_group_trans');
     	                                    
     	                                    	 if(!ALL_SMS.checked){
     	                                    		 SMS.setExValue(1);
     	                                    		 BIRTH.setExValue(1);
     	                                    		 GROUP.setExValue(1);
     	                                    	 }else{
     	                                    		 SMS.setExValue(0);
     	                                    		 BIRTH.setExValue(0);
     	                                    		 GROUP.setExValue(0);
     	                                    	 }
     	                                    }
     	                                }
     	                            },
     	                    	},{
     	                    		width : 20,
     	                    		html  : '<div style="width:100%;text-align:center;padding-top:1px;">|</div>'
     	                    	},{
     	                    		 xtype      : 'excheckbox',
     	                    		 fieldLabel : '접수',
     	                    		 labelWidth : 40,
     	                     		 labelAlign : 'left',
     	                     		 name       : 'SMS_TRANS',
     	                     		 cls        : 'sin001w_01_cb_sms_trans' ,
     	                     		 reference  : 'cb_sms_trans',
     	                     		 listeners      : {
     	                            	change     : 'onSmsChange'
     	                             },
     	                    	},{
     	                    		width : 20,
     	                    		html  : '<div style="width:100%;text-align:center;padding-top:1px;">|</div>'
     	                    	},{
     	                    		 xtype      : 'excheckbox',
     	                    		 fieldLabel : '생일',
     	                    		 labelWidth : 40,
     	                     		 labelAlign : 'left',
     	                     		 name       : 'SMS_BIRTH_TRANS',
     	                     		 cls        : 'sin001w_01_cb_birth_trans' ,
     	                     		 reference  : 'cb_birth_trans',
     	                     		 listeners  : {
     	                            	change    : 'onSmsChange'
     	                             },
     	                    	},{
     	                    		width : 20,
     	                    		html  : '<div style="width:100%;text-align:center;padding-top:1px;">|</div>'
     	                    	},{
     	                    		 xtype      : 'excheckbox',
     	                    		 fieldLabel : '단체',
     	                    		 labelWidth : 40,
     	                     		 labelAlign : 'left',
     	                     		 name       : 'SMS_GROUP_TRANS',
     	                     		 cls        : 'sin001w_01_cb_group_trans' ,
     	                     		 reference  : 'cb_group_trans',
     	                     		listeners  : {
     	                            	change    : 'onSmsChange'
     	                             },
     	                    	}]
     	                    }]
     		    		/*},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">정렬순서</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items:[{
     	                    		xtype        : 'numberfield',
      	                            reference    : 'txt_sort_seq',
      	                            name         : 'SORT_SEQ',	 
      	                            minValue      : '1',
      	                            width         : 50,
     	                    	}]
     	                    }]*/
     		    		
     		    		}]
     	    		}]
     	    	},{
     	    		width   : '2%'
     	    	},{
     	    		width   : '48.8%',
     	    		items   : [{
     	    			height  : 30,
     	    			layout  : 'hbox',
     	    			items : [{
     	    				html    : '가족상세정보',
     	    				flex    : 1
     	    				
     	    			}]
     	    		},{
     	    			xtype   :'exfieldsetblockbox',
     		    		items   : [{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                        xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">관계</div>'                           
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype     : 'extextfield',
     	                            reference : 'txt_represen_rel',
     	                            exLabel   : '종류',                            
     	                            name      : 'REPRESEN_REL',
     	                            width     : '99%',
     	                            listeners : {
     	                            	blur : 'onRelBlur'
     	                            }
     	                    	}]
     	                    },{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">성별</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
                                 	xtype        : 'excombobox',
     	                            valueField   : 'CODE',
     	                            displayField : 'NAME',
     	                            reference    : 'lc_sex_gbn',
     	                            name         : 'SEX_GBN',
     	                            emptyText    : '선택',
     	                            bind         : {
     	                            	store:'{ds_sex_gbn}'
     	                            },
     	                            width : 80	
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                        xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">성명</div>'                           
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype     : 'extextfield',
     	                            reference : 'txt_name_kor',
     	                            exLabel   : '종류',                            
     	                            name      : 'NAME_KOR',
     	                            width     : '99%'
     	                    	}]
     	                    },{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">법명</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype     : 'extextfield',
     	                            reference : 'txt_sacred_kor',
     	                            exLabel   : '종류',                            
     	                            name      : 'SACRED_KOR',
     	                            width     : '99%'
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                        xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">생년월일</div>'                           
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype        : 'excombobox',
     	                            valueField   : 'CODE',
     	                            displayField : 'NAME',
     	                            reference    : 'lc_lunar_solar',
     	                            name         : 'SEX_GBN',
     	                            emptyText    : '선택',
     	                            bind         : {
     	                            	store:'{ds_lunar_solar}'
     	                            },
     	                            width : '35%'	
     	                    	},{
     	                    		width : '1%'
     	                    	},{
     	                    		xtype     : 'exdatefield',
     	                            reference : 'em_birthday',
     	                            exLabel   : '종류',                            
     	                            name      : 'BIRTHDAY',
     	                            width     : '64%',
     	                            format    : 'Y/m/d',
     	                            listeners : {
     	                            	 expand     : 'onExpand'
     	                            	,change     : 'onBirthChange'
     	                            },
     	                    	}]
     	                    },{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">간지</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
                                 	xtype        : 'excombobox',
     	                            valueField   : 'CODE',
     	                            displayField : 'NAME',
     	                            reference    : 'lc_sexagenary',
     	                            name         : 'SEXAGENARY',
     	                            emptyText    : '선택',
     	                            width        : 80,
     	                            exReadOnly   : true,
     	                            bind         : {
     	                            	store:'{ds_ganjiMaster}'
     	                            },
     	                    	},{
     	                    		width : '1%'
     	                    	},{
     	                    		xtype    : 'button',
     	                            text     : '간지',
     	                            handler  : 'onGanji'
     	                    	},{
     	                    		height : 0,
     	                    		width  : 0,
     	                    		items  : [{
     	                    			xtype     : 'extextfield',
     		                            reference : 'txt_leap_month',
     		                            name      : 'LEAP_MONTH',
     		                            inputType : 'hidden',
     		                            width     : 0,
     		                            height    : 0
     	                    		}]
     	                    		
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                        xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">핸드폰</div>'                           
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype        : 'excombobox',
     	                            valueField   : 'CODE',
     	                            displayField : 'NAME',
     	                            reference    : 'lc_mobile_telno1',
     	                            name         : 'MOBILE_TELNO1',
     	                            emptyText    : '선택',
     	                            width        : 60,
     	                            bind         : {
     	                            	store:'{ds_mobile_telno1}'
     	                            },
     	                    	},{
     	                    		width : 20,
     	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
     	                    	},{
     	                    		xtype     : 'extextfield',
     	                            reference : 'txt_mobile_telno2',
     	                            name      : 'MOBILE_TELNO2',
     	                            width     : 60,
     	                           // cls       : 'sin001w_01_number',
     	                    	},{
     	                    		width : 20,
     	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
     	                    	},{
     	                    		xtype     : 'extextfield',
     	                            reference : 'txt_mobile_telno3',
     	                            name      : 'MOBILE_TELNO3',
     	                            width     : 60,
     	                           // cls       : 'sin001w_01_number',
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                        xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">E-mail</div>'                           
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype     : 'extextfield',
     	                            reference : 'txt_email1',
     	                            exLabel   : 'E-mail',                            
     	                            name      : 'EMAIL1',
     	                            width     : 120
     	                    	},{
     	                    		width : 20,
     	                    		html  : '<div style="width:20px;text-align:center;"> @ </div>'
     	                    	},{
     	                    		xtype        : 'extextfield',
     	                            reference    : 'txt_email2',
     	                            name         : 'EMAIL2',
     	                            width        : 130,
     	                            exReadOnly   : true,
     	                    	},{
     	                    		width : 5
     	                    	},{
     	                    		xtype        : 'excombobox',
     	                            valueField   : 'CODE',
     	                            displayField : 'NAME',
     	                            reference    : 'sel_mobile_telno',
     	                            name         : 'sel_mobile_telno',
     	                            emptyText    : '선택',
     	                            width        : 130,
     	                            bind         : {
     	                            	store:'{ds_email}'
     	                            },
     	                            listeners : {
     	                            	change     : 'onEmailChange'
     	                            },
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                        xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">입회일</div>'                           
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype     : 'exdatefield',
     	                            reference : 'em_issue_date',
     	                            exLabel   : '입회일',                            
     	                            name      : 'ISSUE_DATE',	                            
     	                            format    : 'Y/m/d',
     	                    	}]
     	                    },{
     	                    	xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">대표신도</div>'
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		xtype          : 'excheckbox',
     	                    		fieldLabel     : '대표신도',
     	                    		labelWidth     : 60,
     	                     		labelAlign     : 'left',
     	                     		name           : 'DAEJU_YN',
     	                     		reference      : 'cb_daeju_yn',	                     		
     	                     		nputValue      : '1',
     	                     		uncheckedValue : '0',
     	                     		listeners      : {
     	                            	change     : 'onDaeJuChange'
     	                            },
     	                    	}]
     	                    }]
     		    		},{
     		    			xtype:'exblockrow',
     	                    items:[{
     	                        xtype   : 'exblocklabel',
     	                        html    : '<div style="text-align:left;padding-left:5px;">메모</div>'                           
     	                    },{
     	                    	xtype   : 'exblockfield',
     	                    	items   : [{
     	                    		 xtype      : 'extextarea',
     	                			 reference  : 'ta_memo',
     	                             name       : 'MEMO',
     	                             width      : '99%',
     	                             height     : 58
     	                    	}]
     	                    }]	                    	
     		    		}] // block
     	    		}]
     	    	}]
        	 },{
        		 exGroupRef    : true,
                 xtype         : 'exgrid',
                 reference     : 'sin001p_01_a',
                 cls           : 'sin001p_01_a',
                 height        : 350,
                 width         : '100%',
                 bind          : {
                     store:'{ds_main}'
                 },
                 plugins     : [{
                 	ptype:'cellediting'
                 }],
                 listeners      : {
                      selectionchange : 'onSelectionChange'
                 },
                 columns:[{
                 	 text        : '순번',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SORT_SEQ',                    
                     exAlign     : 'center',
                     flex        : 1,
                 },{
                 	 text        : '관계',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'REPRESEN_REL',                    
                     exAlign     : 'left',
                     flex        : 1.4,
                 },{
                 	 text        : '성명',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'NAME_KOR',                    
                     exAlign     : 'left',
                     flex        : 1.6,
                 },{
                 	 text        : '법명',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SACRED_KOR',                    
                     exAlign     : 'left',
                     flex        : 1.6,
                 },{
                 	 text        : '성별',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SEX_GBN',                    
                     exAlign     : 'center',
                     flex        : 1.4,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	//meta.style = 'background-color:#F6F9FD;';
                     	
                     	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_sex_gbn');
                     	return exCommon.getComboVal(value,store, '' );
                     }
                 },{
                 	 text        : '생년월일',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'BIRTHDAY',                    
                     exAlign     : 'center',
                     flex        : 2,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	if(value == undefined || value == "" || value == null){
                     		return "";
                     	}
                     	return exCommon.getFormat(value,'dateYMD' );
                     }
                 },{
                 	 text        : '양력음력',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'LUNAR_SOLAR',                    
                     exAlign     : 'center',
                     flex        : 1.4,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	
                     	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_lunar_solar');
                     	return exCommon.getComboVal(value,store, '' );
                     }
                 },{
                 	 text        : '간지',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SEXAGENARY',                    
                     exAlign     : 'center',
                     flex        : 1.4,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	
                     	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_ganjiMaster');
                     	return exCommon.getComboVal(value,store, '' );
                     }
                 },{
                 	 text        : '핸드폰',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'MOBILE_TELNO',                    
                     exAlign     : 'left',
                     flex        : 2.4,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	var MOBILE_TELNO1 = record.get("MOBILE_TELNO1");
                     	var MOBILE_TELNO2 = record.get("MOBILE_TELNO2");
                     	var MOBILE_TELNO3 = record.get("MOBILE_TELNO3");
                     	
                     	if(MOBILE_TELNO1 == undefined || MOBILE_TELNO1 == null){
                     		MOBILE_TELNO1 = "";
                     	}
                     	if(MOBILE_TELNO2 == undefined || MOBILE_TELNO2 == null){
                     		MOBILE_TELNO2 = "";
                     	}
                     	if(MOBILE_TELNO3 == undefined || MOBILE_TELNO3 == null){
                     		MOBILE_TELNO3 = "";
                     	}
                     	
                     	var MOBILE_TELNO = MOBILE_TELNO1 + MOBILE_TELNO2 + MOBILE_TELNO3;
                     	
                     	if(MOBILE_TELNO.length == 11 || MOBILE_TELNO.length == 10){
                     		return MOBILE_TELNO1 + "-"+ MOBILE_TELNO2 + "-"+ MOBILE_TELNO3;
                     	}
                     	else if( MOBILE_TELNO.length == 7 ){
                     		return MOBILE_TELNO.substr(0,3) + "-"+MOBILE_TELNO.substr(3,7);
                     	}
                     	else if( MOBILE_TELNO.length == 8 ){
                         	return MOBILE_TELNO.substr(0,4) + "-"+MOBILE_TELNO.substr(4,8);
                     	}else{
                     		return MOBILE_TELNO;
                     	}
                     	
                     }
                 },{
                 	 text        : 'E-MAIL ',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'EMAILtemp',                    
                     exAlign     : 'left',
                     flex        : 3.4,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	
                     	var email1 = record.get("EMAIL1") 
                     	if(email1 == undefined || email1 == null){
                     		email1 = "";
                     	}
                     	
                     	var email2 = record.get("EMAIL2") 
                     	if(email2== undefined  || email2 == null){
                     		email2 = "";
                     	}
                     	
                     	if(email1 == "" || email2 == ""){
                     		return "";
                     	}else{
                     		return email1 +"@" + email2 ;
                     	}
                     	                	
                     	
                     }
                 },{
                 	 text        : '대표신도',
                 	 xtype       : 'excheckcolumn',
                     dataIndex   : 'DAEJU_YN',                    
                     exAlign     : 'center',
                     flex        : 1.4,
                     listeners   : {
                         beforecheckchange: function() {
                             return false; // HERE
                         }
                     }
                 }]
        			
        	 },{
        		 height : 20
        	 }]
        },{
        	width : '0.5%'
        }]
    }]
})