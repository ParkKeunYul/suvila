Ext.define('ExFrm.view.rec.rec000p_02_2',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.rec000p_02_2',
    requires:[
    	'ExFrm.view.rec.rec000p_02_2Controller',
    	'ExFrm.view.rec.rec000p_02_2Model'
    ],
    controller:'rec000p_02_2',
    viewModel:{
        type:'rec000p_02_2'
    },
    isModal:true,
    name:'rec000p_02_2',
    title:'인등출력',
    closable:true,
    width:1200,
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
        			width : 0,
        			heigth: 0,
        			items : [{
        				xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'allData',
    	       	 		name      : 'allData',
    	       	 		width     : 0
        			}]
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
	             height        : 700,
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
                exGroupFields:[
                	 'PROPOSAL_DAEJU_NO'
                	,'PROPOSAL_DAEJU_KOR'
                	,'LIGHT_NM'
                	,'LIGHT_NO'
                	,'JUNGAK_NM'
                	,'INDEUNG_YEAR'
                	,'INDEUNG_MONTH'
                	,'INDEUNG_PERIOD'
        		],
	             columns:[{
	            	 text        : '신도번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'PROPOSAL_DAEJU_NO',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '대표자명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'PROPOSAL_DAEJU_KOR',                    
	                 exAlign     : 'center',
	                 width       : 110,
	             },{
	            	 text        : '인등종류',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'LIGHT_NM',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '인등번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'LIGHT_NO',                    
	                 exAlign     : 'center',
	                 width       : 90,
	             },{
	            	 text        : '인등위치',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'JUNGAK_NM',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '년',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'INDEUNG_YEAR',                    
	                 exAlign     : 'center',
	                 width       : 70,
	             },{
	            	 text        : '월',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'INDEUNG_MONTH',                    
	                 exAlign     : 'center',
	                 width       : 60,
	             },{
	            	 text        : '기간',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'INDEUNG_PERIOD',                    
	                 exAlign     : 'center',
	                 width       : 70,
	             },{
	            	 text        : '신도명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME_KOR',                    
	                 exAlign     : 'left',
	                 width       : 100,
	             },{
	            	 text        : '비고',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'REMARK',                    
	                 exAlign     : 'left',
	                 flex        : 1,
	             }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})