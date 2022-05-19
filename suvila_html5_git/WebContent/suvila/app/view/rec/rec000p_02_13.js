Ext.define('ExFrm.view.rec.rec000p_02_13',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.rec000p_02_13',
    requires:[
    	'ExFrm.view.rec.rec000p_02_13Controller',
    	'ExFrm.view.rec.rec000p_02_13Model'
    ],
    controller:'rec000p_02_13',
    viewModel:{
        type:'rec000p_02_13'
    },
    isModal:true,
    name:'rec000p_02_13',
    title:'상시출력',
    closable:true,
    width:760,
    height:600,
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
                //	 'BUD_NO'
                //	,'NAME_KOR'
                //	,'ACCEPT_NAME'
                	 'NAME'
                	,'EVENT_DATE'
                	,'BOKWEJA_NM'
                ],
	             columns:[{
	            	 text           : '선택',
	                 xtype          : 'excheckcolumn',
	                 dataIndex      : 'CHECK_P',                    
	                 exAlign        : 'center',
	                 headerCheckbox : true,
	                 width          : 90, 
	             },{
	            	 text        : '신도번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DAEJU_BUD_NO',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '대표자명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DAEJU_NM1',                    
	                 exAlign     : 'left',
	                 width       : 120,
	             /*},{
	            	 text        : '종류',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'PRAY_GBN_NAME',                    
	                 exAlign     : 'left',
	                 width       : 90,*/
	             },{
	            	 text        : '기도/법회명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'PRAY_NM',                    
	                 exAlign     : 'left',
	                 width       : 150,
	            /* },{
	            	 text        : '입제일',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'FDATE',                    
	                 exAlign     : 'center',
	                 width       : 110,
	                 exType      : 'date',
	             },{
	            	 text        : '회향일',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'RDATE',                    
	                 exAlign     : 'center',
	                 width       : 110,
	                 exType      : 'date',*/
	             /*},{
	            	 text        : '기간',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'YEONDEUNG_YEAR',                    
	                 exAlign     : 'left',
	                 width       : 80,*/
	             },{
	            	 text        : '신도명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME_KOR',                    
	                 exAlign     : 'left',
	                 flex        : 1,
	             }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})