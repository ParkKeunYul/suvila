Ext.define('ExFrm.view.rec.rec000p_02_14',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.rec000p_02_14',
    requires:[
    	'ExFrm.view.rec.rec000p_02_14Controller',
    	'ExFrm.view.rec.rec000p_02_14Model'
    ],
    controller:'rec000p_02_14',
    viewModel:{
        type:'rec000p_02_14'
    },
    isModal:true,
    name:'rec000p_02_14',
    title:'영탑출력',
    closable:true,
    width:900,
    height:450,
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
        			xtype        : 'radiogroup',
        			reference    : 'rd_YTGbn',
        			name         : 'rd_YTGbn',        			      		
        			width        : 300,
            		items     :[{
        				boxLabel   : '영탑대장',
                    	inputValue : 1,    
                    	width      : 90,
                    	checked    : true
                    	
            		},{
            			boxLabel   : '영탑천혼문',
                    	inputValue : 2,  
                    	width      : 100,
            		},{
            			boxLabel   : '영탑등', 
                    	inputValue : 4,  
                    	width      : 70,
                    	
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
	             reference     : 'rec000p_02_14',
	             cls           : 'rec000p_02_14 none-dirty-grid',
	             height        : 350,
	             width         : '100%',
	             bind          : {
	                 store:'{ds_youngtop_detail}'
	             },
	             columns:[{
	            	 text        : '위치',
	                 xtype       : 'excolumn',
	                 dataIndex   : 'JUNGAK_NM',                    
	                 exAlign     : 'center',
	                 width       : 110,
	             },{
	            	 text        : '탑번',
	                 xtype       : 'excolumn',
	                 dataIndex   : 'LIGHT_NO',                    
	                 exAlign     : 'center',
	                 width       : 90,
	             },{
	            	 text        : '탑주명',
	                 xtype       : 'excolumn',
	                 dataIndex   : 'BUD_NM',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '신도번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BUD_NO',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '봉탑건수',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BONGTOP_COUNT',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '접수일',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'ACCEPT_DT',                    
	                 exAlign     : 'left',
	                 width       : 100,	       
	                 renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.getGridDateFormat(value, '-' , 8);
                    }
	             },{
	            	 text        : '접수번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'ACCEPT_SEQ',                    
	                 exAlign     : 'center',
	                 flex        : 1,
	             }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})