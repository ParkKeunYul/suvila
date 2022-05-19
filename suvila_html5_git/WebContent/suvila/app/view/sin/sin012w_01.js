Ext.define('ExFrm.view.sin.sin012w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin012w_01',
	requires:[
		'ExFrm.view.sin.sin012w_01Controller',
        'ExFrm.view.sin.sin012w_01Model'
	],
	controller:'sin012w_01',
	viewModel:{
        type:'sin012w_01'
    },
    name:'sin012w_01',
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
             	   keyup : 'onSearchEnter'
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
        		fieldLabel   : '<span style="font-weight: 700;">구분</span>',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_sindo_gbn',
                name         : 'SINDO_GBN',	 
                emptyText    : '전체',
                labelWidth   : 40,
                width        : 120,
                bind         : {
                	store:'{ds_sindo_gbn}'
                }
        	},{
        		width : 5
        	},{
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">분류</span>',
                valueField   : 'CLASS_CD',
                displayField : 'CLASS_NAME',
                reference    : 'lc_classMgt',
                name         : 'V_CLASS_CD',	 
                emptyText    : '선택',
                labelWidth   : 40,
                width        : 220,
                value        : '0',
                bind         : {
                	store:'{ds_classMgt}'
                }
        	},{
        		 xtype         : 'excheckbox',
        		 fieldLabel    : '<span style="font-weight: 700;">우편발송</span>',
	       		 labelWidth    : 70,
        		 labelAlign    : 'right',
        		 name          : 'V_POST_TRANS',
        		 reference     : 'cb_postTrans',
        		 inputValue    : '1',
        		 uncheckedValue: '0'
        	},{
        		 xtype         : 'excheckbox',
       		 	 fieldLabel    : '<span style="font-weight: 700;">대표신도</span>',
	       		 labelWidth    : 70,
	       		 labelAlign    : 'right',
	       		 name          : 'V_DAEJU',
	       		 reference     : 'cb_daeju',
	       		 inputValue    : '1',
	       		 uncheckedValue: '0'
        	},{
        		 width : 10
        	},{
        		xtype        : 'excombobox',
        		fieldLabel    : '<span style="font-weight: 700;">우편번호</span>',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'zipType',
                name         : 'V_ZIP_TYPE',	 
                emptyText    : '우편번호전체',
                labelWidth   : 70,
                width        : 190,
                bind         : {
                	store:'{ds_zipType}'
                }
        	},{
        		width : 5
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
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		text      : '엑셀',
          		handler   : 'onExcel',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
          		reference : 'printBtn',
          		name      : 'printBtn',
          		text      : '2*7라벨지인쇄',
          		handler   : 'onPrintLabel',
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
                    name             : 'V_BUD_NO'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_budNo',
                    value            : '',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
                    name             : 'txt_budNo'
        		}]
            }]
	    },{
	    	height : 5
	    },{
	    	width   : '100%',
	    	layout  : 'hbox',
            xtype   : 'container',
            items   : [{
            	xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">성별</span>',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_sexGbn',
                name         : 'V_SEX_GBN',	 
                emptyText    : '전체',
                labelWidth   : 35,
                width        : 110,
                bind         : {
                	store:'{ds_sexGbn}'
                }
            },{
            	width : 5
            },{
            	xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">띠</span>',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_animal',
                name         : 'V_ANIMAL',	 
                emptyText    : '전체',
                labelWidth   : 20,
                width        : 100,
                bind         : {
                	store:'{ds_animal}'
                }
            },{
            	width : 5
            },{
            	xtype        : 'extextfield',            	
                reference    : 'txt_addr',
                name         : 'V_ADDR',
                fieldLabel   : '<span style="font-weight: 700;">주소</span>',
                labelWidth   : 35,
                width        : 205,
                enableKeyEvents : true,
                listeners:{
            	   keyup : 'onSearchSelect'
                }
            },{
            	width : 5
            },{
            	xtype        : 'extextfield',
                reference    : 'txt_memo',
                name         : 'V_MEMO',
                fieldLabel   : '<span style="font-weight: 700;">메모</span>',
                labelWidth   : 35,
                width        : 205,
                enableKeyEvents : true,
                listeners:{
            	   keyup : 'onSearchSelect'
                }
            },{
            	width : 5
            },{
            	xtype        : 'extextfield',
            	fieldLabel   : '<span style="font-weight: 700;">나이</span>',
                reference    : 'age',
                name         : 'V_AGE',
                labelWidth   : 35,
                width        : 75
            },{
            	width        : 2
            },{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'agefn',
                name         : 'V_AGEFN',
                labelWidth   : 0,
                width        : 70,
                bind         : {
                	store:'{ds_age}'
                }
            },{
            	widht : 10
            },{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'cb_date',
                name         : 'V_DATE_GBN',
                fieldLabel   : '<span style="font-weight: 700;">일자</span>',
                labelWidth   : 35,
                width        : 140,
                bind         : {
                	store:'{ds_date}'
                },
                listeners    : {
                	change:'onDateChange'
                }
            },{
            	width : 5
            },{
            	layout    : 'hbox',
            	reference : 'date_area',
            	items :[{
            		xtype          : 'exdatefield',
    	    		labelAlign     : 'right',
                    reference      : 'me_IssueSDate',
                    name           : 'V_ISSUE_SDATE',                                                   
                    exFormat       : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
            	},{
            		width : 20,
    	    		html  : '<div style="text-align:center;">~</div>'
            	},{
            		xtype          : 'exdatefield',
    	    		labelAlign     : 'right',
                    reference      : 'me_IssueEDate',
                    name           : 'V_ISSUE_EDATE',                                                   
                    exFormat       : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
            	}]
            }]
	    },{
	    	height  : 10,
	    },{
	    	exGroupRef    : true,
            xtype         : 'exgrid',
            reference     : 'sin012w_01_a',
            cls           : 'topCheckHeader none-dirty-grid',
            height        : 720,
            width         : '100%',
            selModel      : {
                mode: 'MULTI'
            },
            bind          : {
                store:'{ds_main}'
            },
            plugins     : [{
            	ptype:'cellediting'
            },{
            	ptype: 'gridexporter'
            }],
            listeners:{
            	itemcontextmenu : 'onMouseRightClick'
            },
            columns:[{            	
            	text           : '선택',
            	xtype          : 'excheckcolumn',
                dataIndex      : 'CHECK_P',                    
                exAlign        : 'center',
                headerCheckbox : true,
                width          : 83,                
               // locked         : true,
            },{
            	text        : '순번',
            	xtype       : 'rownumberer',                                  
                align       : 'center',
                width       : 65,
                //locked      : true,                
            },{
            	text        : '구분',
            	xtype       : 'excolumn',
                dataIndex   : 'SINDO_GBN_NM',                    
                exAlign     : 'center',
                width       : 70,
                sortable    : true
            },{
            	text        : '입회일자',
            	xtype       : 'excolumn',
                dataIndex   : 'ISSUE_DATE',                    
                exAlign     : 'center',
                width       : 120,
                sortable    : true,
                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                	if(value == undefined || value == "" || value == null){
                		return "";
                	}
                	return exCommon.getFormat(value,'dateYMD' );
                }
            },{
            	text        : '신도번호',
            	xtype       : 'excolumn',
                dataIndex   : 'BUD_NO',                    
                exAlign     : 'left',
                width       : 120,
                sortable    : true,
            },{
            	text        : '신도명',
            	xtype       : 'excolumn',
                dataIndex   : 'NAME_KOR',                    
                exAlign     : 'left',
                width       : 90,
                sortable    : true,
            },{
            	text        : '법명',
            	xtype       : 'excolumn',
                dataIndex   : 'SACRED_KOR',                    
                exAlign     : 'left',
                width       : 90,
                sortable    : true,
            },{
            	text        : '관계',
            	xtype       : 'excolumn',
                dataIndex   : 'REPRESEN_REL',                    
                exAlign     : 'left',
                width       : 90,
                sortable    : true,
            },{
            	text        : '간지',
            	xtype       : 'excolumn',
                dataIndex   : 'SEXAGENARY_NM',                    
                exAlign     : 'center',
                width       : 70,
                sortable    : true,
            },{
            	text        : '생년월일',
            	xtype       : 'excolumn',
                dataIndex   : 'BIRTHDAY',                    
                exAlign     : 'center',
                width       : 120,
                sortable    : true,
                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                	if(value == undefined || value == "" || value == null){
                		return "";
                	}
                	return exCommon.getFormat(value,'dateYMD' );
                }
            },{
            	text        : '나이',
            	xtype       : 'excolumn',
                dataIndex   : 'AGE',                    
                exAlign     : 'center',
                width       : 70,
                sortable    : true,
            },{
            	text        : '성별',
            	xtype       : 'excolumn',
                dataIndex   : 'SEX_GBN_NM',                    
                exAlign     : 'center',
                width       : 70,
                sortable    : true,
            },{
            	text        : '전화번호',
            	xtype       : 'excolumn',
                dataIndex   : 'TELNO',                    
                exAlign     : 'center',
                width       : 110,
                sortable    : true,
            },{
            	text        : '휴대전화',
            	xtype       : 'excolumn',
                dataIndex   : 'MOBILE_TELNO',                    
                exAlign     : 'center',
                width       : 110,
                sortable    : true,
            },{
            	text        : '주소1',
            	xtype       : 'excolumn',
                dataIndex   : 'ADDR1',                    
                exAlign     : 'left',
                width       : 300,
                sortable    : true,
            },{
            	text        : '주소2',
            	xtype       : 'excolumn',
                dataIndex   : 'ADDR2',                    
                exAlign     : 'left',
                width       : 270,
                sortable    : true,
            },{
            	text        : '우편번호',
            	xtype       : 'excolumn',
                dataIndex   : 'ZIP_CD',                    
                exAlign     : 'center',
                width       : 90,
                sortable    : true,
            },{
            	text        : '대표신도번호',
            	xtype       : 'excolumn',
                dataIndex   : 'DAEJU_BUD_NO',                    
                exAlign     : 'center',
                width       : 120,
                sortable    : true,
            },{
            	text        : '이메일',
            	xtype       : 'excolumn',
                dataIndex   : 'EMAIL',                    
                exAlign     : 'left',
                width       : 120,
                sortable    : true,
                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                	if(value == "@"){
                		return "";
                	}
                	return value;
                }
            },{
            	text        : '메모',
            	xtype       : 'excolumn',
                dataIndex   : 'MEMO',                    
                exAlign     : 'left',
                width       : 220,
                sortable    : true,
            }]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});