Ext.define('ExFrm.view.sin.sin001p_05',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_05',
    requires:[
    	'ExFrm.view.sin.sin001p_05Controller',
    	'ExFrm.view.sin.sin001p_05Model'
    ],
    controller:'sin001p_05',
    viewModel:{
        type:'sin001p_05'
    },
    isModal:true,
    name:'sin001p_05',
    title:'개인정보수정',
    closable:true,
    width:1250,
    height:800,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',
        width:'99.9%',
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
                 items  : [{
              	    width : '77%',
              	    items : [{
              	    	height : 20,
              	    	html   : '기본정보'
              	    },{
              	    	xtype   :'exfieldsetblockbox',
              	    	items   : [{
              	    		xtype :'exblockrow',
    	                    items :[{
    	                    	xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">신도번호</div>'
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
    	                            },
    	                            exMand       : true,
    	                            exLabel      :'신도구분',
    	                    	},{
    	                    		width : 1
    	                    	},{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_bud_code',
    	                            exLabel    : '가족코드',                            
    	                            name       : 'BUD_CODE',
    	                            exReadOnly : true,
    	                            width      : 100,
    	                    	},{
	                    			xtype      : 'extextfield',
	                    			reference  : 'hid_bud_no',
	                    			inpytType  : 'hidden',
	                    			name       : 'BUD_NO',
	                    			width      : 0
	                    		},{
	                    			xtype      : 'extextfield',
	                    			reference  : 'hid_daeje_bud_no',
	                    			inpytType  : 'hidden',
	                    			name       : 'DAEJU_BUD_NO',
	                    			width      : 0
	                    		},{
	                    			xtype      : 'extextfield',
	                    			reference  : 'hid_sort_seq',
	                    			inpytType  : 'hidden',
	                    			name       : 'SORT_SEQ',
	                    			width      : 0
    	                    	}]
    	                    },{
    	                    	xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">입회일</div>'
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype     : 'exdatefield',
    	                            reference : 'em_issue_date',
    	                            exLabel   : '입회일',                            
    	                            name      : 'ISSUE_DATE',	                            
    	                            format    : 'Ymd',
    	                    	}]
    	                    }]
              	    	
              	    	},{
              	    		xtype :'exblockrow',
              	    		items :[{
    	                    	xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">성명(한글)</div>'
              	    		},{
              	    			xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype     : 'extextfield',
    	                            reference : 'txt_name_kor',
    	                            exLabel   : '종류',                            
    	                            name      : 'NAME_KOR',
    	                            exMand    : true,
    	                            exLabel   : '성명',
    	                    	}]
              	    		},{
              	    			xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">성명(한문)</div>'
              	    		},{
              	    			xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype     : 'extextfield',
    	                            reference : 'txt_name_han',
    	                            exLabel   : '종류',                            
    	                            name      : 'NAME_HAN',
    	                    	}]
              	    		}]
              	    	},{
              	    		xtype :'exblockrow',
              	    		items :[{
    	                    	xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">법명(한글)</div>'
              	    		},{
              	    			xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype     : 'extextfield',
    	                            reference : 'txt_sacred_kor',
    	                            exLabel   : '종류',                            
    	                            name      : 'SACRED_KOR',    	                            
    	                    	}]
              	    		},{
              	    			xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">법명(한문)</div>'
              	    		},{
              	    			xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype     : 'extextfield',
    	                            reference : 'txt_sacred_han',
    	                            exLabel   : '종류',                            
    	                            name      : 'SACRED_HAN',    	                            
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
    	                             reference  : 'txt_addr1',
    	                             name       : 'ADDR1',
    	                             exLabel    : '주소',
    	                             width      : '99%'
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
    	                             reference  : 'txt_bldg_num',
    	                             inpytType  : 'hidden',
    	                             width      : 0
    	                    	}]
    	                    }]
              	    	
              	    	},{
              	    		xtype:'exblockrow',
    	                    items:[{
    	                    	xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">E-Mail</div>'
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
    	                        html    : '<div style="text-align:left;padding-left:5px;">생년월일</div>'                           
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype        : 'excombobox',
    	                            valueField   : 'CODE',
    	                            displayField : 'NAME',
    	                            reference    : 'lc_lunar_solar',
    	                            name         : 'LUNAR_SOLAR',
    	                            emptyText    : '선택',
    	                            width        : 65,
    	                            bind         : {
    	                            	store:'{ds_lunar_solar}'
    	                            },
    	                    	},{
    	                    		width : '1%'
    	                    	},{
    	                    		xtype     : 'exdatefield',
    	                            reference : 'em_birthday',
    	                            exLabel   : '종류',                            
    	                            name      : 'BIRTHDAY',
    	                            format    : 'Ymd',
    	                            listeners : {
    	                            	 expand     : 'onExpand'
    	                            	,change     : 'onBirthChange'
    	                            },
    	                    	},{
    	                    		width : 1,
    	                    	},{
    	                    		xtype      : 'timefield',
    	                            reference  : 'sel_birthtime1',	                            	                            
    	                            name       : 'BIRTHTIME1',
    	                            minValue   : '00',
    	                            maxValue   : '23',
    	                            format     : 'H',
    	                            altFormats : 'H',
    	                            increment  : 60,	                            
    	                            width      : 60,
    	                            emptyText  : '선택'
    	                    	},{
      	                    		width : 15,
      	                    		html  : '<div style="width:100%;text-align:center;" >시</div>'
    	                    	},{
    	                    		xtype      : 'timefield',
    	                            reference  : 'sel_birthtime2',	                            	                            
    	                            name       : 'BIRTHTIME2',
    	                            minValue   : '00',
    	                            maxValue   : '59',
    	                            format     : 'i',
    	                            altFormats : 'i',
    	                            increment  : 1,	                            
    	                            width      : 60,
    	                            emptyText  : '선택'
    	                    	},{
      	                    		width : 15,
      	                    		html  : '<div style="width:100%;text-align:center;" >분</div>'
    	                    	},{
    	                			width : 0,
    	                			heigth: 0,
    	                			items : [{
    	                				xtype     : 'extextfield',
    	            	       	 		inputType : 'hidden',
    	            	       	 		reference : 'sel_birthtime',
    	            	       	 		name      : 'BIRTHTIME',
    	            	       	 		width     : 0
    	            	    		}]
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
    	                            width        : 65,
    	                            exReadOnly   : true,
    	                            bind         : {
    	                            	store:'{ds_ganjiMaster}'
    	                            },
    	                    	},{
    	                    		width : '1%'
    	                    	/*},{
    	                    		xtype    : 'button',
    	                            text     : '간지',
    	                            handler  : 'onGanji'*/
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
    	                    },{
    	                    	xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">화주보살여부</div>'
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items:[{
    	                    		xtype      : 'excheckbox',
    	                    		name       : 'HWAJU_YN',
   	                     		    reference  : 'cb_hwaju_yn',
   	                     		    inputValue : 1,
   	                     		    uncheckedValue : '0',
    	                    	}]
    	                    }]
              	    	
              	    	},{
              	    		xtype:'exblockrow',
              	    		items:[{
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
              	    		},{
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
    	                             width      : 60,
    	                    	},{
    	                    		width : 20,
    	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
    	                    	},{
    	                    		xtype       : 'extextfield',
    	                             reference  : 'txt_telno3',
    	                             name       : 'TELNO3',
    	                             exLabel    : '전화3',
    	                             width      : 60,
    	                    	}]
              	    		}]
              	    	
              	    	},{
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
    	                            listeners : {
    	                            	blur : 'onRelBlur'
    	                            },
    	                            exMand    : true,
    	                            exLabel   : '관계',
    	                    	}]
              	    		},{
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
    	                            width        : 80,
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
    	                    	},{
    	                    		width : 20,
    	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
    	                    	},{
    	                    		xtype     : 'extextfield',
    	                            reference : 'txt_mobile_telno3',
    	                            name      : 'MOBILE_TELNO3',
    	                            width     : 60,
    	                    	}]
              	    		}]
              	    	
              	    	},{
              	    		xtype:'exblockrow',
              	    		items:[{
              	    			xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">불교신문</div>'
              	    		},{
              	    			xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype          : 'excheckbox',
    	                    		fieldLabel     : '구독',
    	                    		labelWidth     : 30,
    	                     		labelAlign     : 'left',
    	                     		name           : 'NEWS_YN',
    	                     		reference      : 'cb_news_yn',	                     		
    	                     		inputValue     : '1',
    	                     		uncheckedValue : '0',
    	                    	}]
              	    		},{
              	    			xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">카드발급일</div>'
              	    		},{
              	    			xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype     : 'exdatefield',
    	                            reference : 'em_card_issue_date',
    	                            name      : 'CARD_ISSUE_DATE',
    	                            format    : 'Ymd',
    	                    	}]
              	    		}]
              	    	
              	    	},{
              	    		xtype:'exblockrow',
              	    		items:[{
              	    			xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">발급횟수</div>'
              	    		},{
              	    			xtype   : 'exblockfield',
              	    			items   :[{
              	    				xtype        : 'extextfield',
     	                            reference    : 'txt_card_issue_cnt',
     	                            name         : 'CARD_ISSUE_CNT',	 
     	                            //minValue     : '0',
     	                            inputType    : 'number',
     	                            width        : 70
              	    			}]
              	    	   },{
              	    			xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">기도</div>'
              	    	   },{
	              	    		xtype   : 'exblockfield',
	           	    			items   :[{
	           	    				xtype     : 'extextfield',
		                            reference : 'txt_etc1',
		                            name      : 'ETC1',
		                            width     : '99%'
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
    	                     		 inputValue : 1,
    	                     		 uncheckedValue : '0',
    	                    	}]
              	    		},{
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
    	                     		 reference  : 'cb_sms_trans',
    	                     		 listeners  : {
    	                            	change     : 'onSmsChange'
    	                             },
    	                             inputValue : 1,
    	                             uncheckedValue : '0',
    	                    	},{
    	                    		width : 20,
    	                    		html  : '<div style="width:100%;text-align:center;padding-top:1px;">|</div>'
    	                    	},{
    	                    		 xtype      : 'excheckbox',
    	                    		 fieldLabel : '생일',
    	                    		 labelWidth : 40,
    	                     		 labelAlign : 'left',
    	                     		 name       : 'SMS_BIRTH_TRANS',
    	                     		 reference  : 'cb_birth_trans',
    	                     		 listeners  : {
    	                            	change    : 'onSmsChange'
    	                             },
    	                             inputValue : 1,
    	                             uncheckedValue : '0',
    	                    	},{
    	                    		width : 20,
    	                    		html  : '<div style="width:100%;text-align:center;padding-top:1px;">|</div>'
    	                    	},{
    	                    		 xtype      : 'excheckbox',
    	                    		 fieldLabel : '단체',
    	                    		 labelWidth : 40,
    	                     		 labelAlign : 'left',
    	                     		 name       : 'SMS_GROUP_TRANS',
    	                     		 reference  : 'cb_group_trans',
    	                     		 listeners  : {
    	                            	change    : 'onSmsChange'
    	                             },
    	                             inputValue : 1,
    	                             uncheckedValue : '0',
    	                    	}]
              	    		}]
              	    	}]
              	    }]
                 },{
              	    width : '0.5%'
                 },{
              	    width : '22%',              	   
              	    items  : [{
              	    	height : 20,
              	    	html   : '단체가입정보'
              	    },{
              	    	exGroupRef    : true,
                        xtype         : 'exgrid',
                        reference     : 'sin001p_05_a',
                        cls           : 'sin001p_05_a',
                        height        : 422,
                        width         : '100%',
                        bind          : {
                            store:'{ds_group}'
                        },
                        listeners:{
                        	celldblclick : 'onCellDbClick'
                        },
                        columns:[{
                        	 text        :'No',
                             xtype       :'rownumberer',
                             flex        : 1,
                        },{
                       	 	 text        : '단체명',
                        	 xtype       : 'excolumn',
                             dataIndex   : 'ORG_NAME',                    
                             exAlign     : 'left',
                             flex        : 2,
                        },{
                       	 	 text        : '가입일',
                        	 xtype       : 'excolumn',
                             dataIndex   : 'ENTRY_DATE',                    
                             exAlign     : 'center',
                             flex        : 1.6,
                             renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                             	if(value == undefined || value == "" || value == null){
                             		return "";
                             	}
                             	return exCommon.getFormat(value,'dateYMD' );
                             }
                        }]
              	    }]
                 }]
        	 },{
        		 height : 10
        	 },{
        		 height : 20,
        		 html   : '추가정보'
        	 },{
        		 xtype   :'exfieldsetblockbox',
        		 items   : [{
        			 xtype:'exblockrow',
        			 items:[{
        				 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">최종학력</div>'                           
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype        : 'excombobox',
	                         valueField   : 'CODE',
	                         displayField : 'NAME',
	                         reference    : 'lc_last_schola',
	                         name         : 'LAST_SCHOLA',	 
	                         emptyText    : '선택',
	                         width        : 100,
	                         bind         : {
	                         	store:'{ds_last_schola}'
	                         }
	                     }]
	                 },{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">취미</div>'
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype      : 'extextfield',
	                         reference  : 'txt_interest',
	                         name       : 'INTEREST',
	                     }]
	                 },{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">특기</div>'
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype      : 'extextfield',
	                         reference  : 'txt_skill',
	                         name       : 'SKILL',
	                     }]
	                 }]
        		 },{
        			 xtype:'exblockrow',
        			 items:[{
        				 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">직장명</div>'                           
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype      : 'extextfield',
	                         reference  : 'txt_company_name',
	                         name       : 'COMPANY_NAME',
	                     }]
	                 },{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">부서/직책</div>'
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype      : 'extextfield',
	                         reference  : 'txt_company_pos',
	                         name       : 'COMPANY_POS',
	                     }]
	                 },{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">직장전화</div>'
	                 },{
	                	 xtype   : 'exblockfield',
                    	 items:[{
                    		 xtype        : 'excombobox',
                             valueField   : 'CODE',
                             displayField : 'NAME',
                             reference    : 'lc_company_tel1',
                             name         : 'COMPANY_TEL1',
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
                             reference  : 'txt_company_tel2',
                             name       : 'COMPANY_TEL2',
                             width      : 60,
                    	 },{
                    		width : 20,
                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
                    	 },{
                    		xtype       : 'extextfield',
                             reference  : 'txt_company_tel3',
                             name       : 'COMPANY_TEL3',
                             width      : 60,
                    	 }]
	                 }]
        		 },{
        			 xtype:'exblockrow',
        			 items:[{
        				 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">입문동기</div>'                           
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype      : 'extextfield',
	                         reference  : 'txt_entrance_cd',
	                         name       : 'ENTRANCE_CD',
	                     }]
	                 },{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">자격증면허</div>'
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype      : 'extextfield',
	                         reference  : 'txt_qualification',
	                         name       : 'QUALIFICATION',
	                     }]
	                 },{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">재적사찰</div>'
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype      : 'extextfield',
	                         reference  : 'txt_sachal_name',
	                         name       : 'SACHAL_NAME',
	                     }]
	                 }]
        		 },{
        			 xtype:'exblockrow',
        			 items:[{
        				 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">비고</div>'
        			 },{
        				 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype      : 'extextarea',
                			 reference  : 'ta_memo',
                             name       : 'MEMO',
                             width      : '99%',
                             height     : 89
	                     }]
	                 }]
        			 
        		 }]
        	 },{
        		 layout :{
        			 type : 'hbox',
        			 pack : 'center'
        		 }, 
        		 items  : [{
        			xtype     : 'exbutton',
                	reference : 'saveBtn',
                	name      : 'saveBtn',
                	handler   : 'onSave',
                	text      : '저장',
        		 },{
        			 width : 10
        		 },{
        			xtype     : 'exbutton',
                 	reference : 'closeBtn',
                 	name      : 'closeBtn',
                 	handler   : 'onClose',
                 	text      : '닫기',
        		 }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})