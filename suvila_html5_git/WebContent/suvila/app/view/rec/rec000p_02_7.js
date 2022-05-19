Ext.define('ExFrm.view.rec.rec000p_02_7',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.rec000p_02_7',
    requires:[
    	'ExFrm.view.rec.rec000p_02_7Controller',
    	'ExFrm.view.rec.rec000p_02_7Model'
    ],
    controller:'rec000p_02_7',
    viewModel:{
        type:'rec000p_02_7'
    },
    isModal:true,
    name:'rec000p_02_7',
    title:'천도재출력',
    closable:true,
    width:1000,
    height:800,
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
        			reference   : 'rd_paperGbn',
        			name        : 'rd_paperGbn',
        			fieldLabel  : '<span style="font-weight: 700;">기도선택 </span>',
        			labelStyle  : 'width:70px',
        			cls         : 'x-form-radio-group60',
        			items     :[{
        				boxLabel   : '영가천혼문', 
	                	inputValue : 0,    
	                	width      : 90,
	                	reference  : 'rd_paperGbn1',
	                	checked    : true
        			},{
        				boxLabel   : '위패', 
	                	inputValue : 1,    
	                	width      : 50,
	                	reference  : 'rd_paperGbn2',
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
	             columns:[{
	            	 text        : '신도번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BUD_NO',                    
	                 exAlign     : 'center',
	                 width       : 160,
	             },{
	            	 text        : '대표자명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME_KOR',                    
	                 exAlign     : 'left',
	                 width       : 120,
	             },{
	            	 text        : '접수종류',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'ACCEPT_NAME',                    
	                 exAlign     : 'left',
	                 width       : 120,
	             },{
	            	 text        : '제사종류',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME',                    
	                 exAlign     : 'left',
	                 width       : 120,
	             },{
	            	 text        : '행사일',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'EVENT_DATE',                    
	                 exAlign     : 'center',
	                 width       : 130,
	                 exType      : 'date',
	             },{
	            	 text        : '대표복위자',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BOKWEJA_NM',                    
	                 exAlign     : 'left',
	                 width       : 120,
	             },{
	            	 text        : '영가자명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DECE_BUD_NM',                    
	                 exAlign     : 'left',
	                 flex        : 1,
	             }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})