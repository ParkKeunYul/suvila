Ext.define('ExFrm.view.rec.rec000p_02_8',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.rec000p_02_8',
    requires:[
    	'ExFrm.view.rec.rec000p_02_8Controller',
    	'ExFrm.view.rec.rec000p_02_8Model'
    ],
    controller:'rec000p_02_8',
    viewModel:{
        type:'rec000p_02_8'
    },
    isModal:true,
    name:'rec000p_02_8',
    title:'위패출력',
    closable:true,
    width:1060,
    height:650,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype   : 'exformmain',
        width   : '100%',
        height  : '100%',
        cls     : 'exformmain',
        layout  : {
            type  : 'hbox',
            align : 'stretch'
        },
        items:[{
            width : '0.5%'
        },{        	
        	width  : '99%',
        	layout : 'vbox',
        	items  : [{
        		layout : 'hbox',
        		items  : [{
        			xtype       :'radiogroup',
        			reference   : 'rd_gidoGbn',
        			name        : 'rd_gidoGbn',
        			fieldLabel  : '<span style="font-weight: 700;">출력선택 </span>',
        			labelStyle  : 'width:70px',
        			cls         : 'x-form-radio-group60',
        			items     :[{
        				boxLabel   : '천혼문', 
	                	inputValue : 1,    
	                	width      : 60,
	                	reference  : 'rd_gidoGbn1',
	                	checked    : true
        			},{
        				boxLabel   : '축원문', 
	                	inputValue : 2,    
	                	width      : 60,
	                	reference  : 'rd_gidoGbn2',
        			},{
        				boxLabel   : '축원문 + 천혼문', 
	                	inputValue : 3,    
	                	width      : 120,
	                	reference  : 'rd_gidoGbn3',
	                	
        			},{
        				boxLabel   : '위패', 
	                	inputValue : 4,    
	                	width      : 50,
	                	reference  : 'rd_gidoGbn3',
	                	
        			}]
        		},{
            		xtype           : 'extextfield',
                    reference       : 'txt_wish',
                    fieldLabel      : '<span style="font-weight: 700;">제목</span>',
                    labelWidth      : 40,
                    width           : 300 ,
                    listeners       : {
                  	   //keyup : 'onSearchEnter'
                    },
        		},{
    			    width : 5
    		    },{
    			    xtype     : 'exbutton',
            		handler   : 'onPrint',	            		
            		text      : '인쇄'
    		    },{
    			    width : 5
    		    },{
    			    xtype     : 'exbutton',
            		handler   : 'onClose',	            		
            		text      : '닫기'
        		}]
        	},{
        		height : 10
        	},{
	    		 exGroupRef    : true,
	             xtype         : 'exgrid',
	             reference     : 'rec003p_22_1',
	             cls           : 'rec003p_22_1 none-dirty-grid topCheckHeader',
	             height        : 500,
	             width         : '100%',
	             bind          : {
	                 store:'{ds_list}'
	             },
	             exGroupFields:[
                	 'PROPOSAL_BUD_NO'
                	,'PRO_NAME_KOR'
                	,'EVENT_DATE'
                	,'BOKWIJA_NM'
                ],
	             columns:[{
	            	 text           : '선택',
	                 xtype          : 'excheckcolumn',
	                 dataIndex      : 'CHECK_P',                    
	                 exAlign        : 'center',
	                 headerCheckbox : true,
	                 width          : 90, 
	             },{
	            	 text        : '신청신도번호 ',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'PROPOSAL_BUD_NO',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '신청자',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'PRO_NAME_KOR',                    
	                 exAlign     : 'left',
	                 width       : 120,
	             /*},{
	            	 text        : '접수종류',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'ACCEPT_NAME',                    
	                 exAlign     : 'left',
	                 width       : 150,*/
	             },{
	            	 text        : '행사일',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'EVENT_DATE',                    
	                 exAlign     : 'center',
	                 width       : 110,
	                 exType      : 'date',
	             },{
	            	 text        : '대표복위자',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BOKWIJA_NM',                    
	                 exAlign     : 'center',
	                 width       : 110,
	            /* },{
	            	 text        : '위패CNT',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'WEPAECNT',                    
	                 exAlign     : 'left',
	                 width       : 80,
	             },{
	            	 text        : '위패순서',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'WEPAE_SEQ',                    
	                 exAlign     : 'left',
	                 width       : 80,
	             },{
	            	 text        : '동참SEQ',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'JOIN_SEQ',                    
	                 exAlign     : 'left',
	                 width       : 80,*/
	             },{
	            	 text        : '영가자명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DECE_BUD_NM',                    
	                 exAlign     : 'left',
	                 flex        : 1,
	             },{
	            	 text        : '',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'HYO_REL',                    
	                 exAlign     : 'left',
	                 width       : 80,
	             },{
	            	 text        : '',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BOKWI_NM',                    
	                 exAlign     : 'left',
	                 width       : 80,
	             }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})