Ext.define('ExFrm.view.rec.rec000p_02_4',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.rec000p_02_4',
    requires:[
    	'ExFrm.view.rec.rec000p_02_4Controller',
    	'ExFrm.view.rec.rec000p_02_4Model'
    ],
    controller:'rec000p_02_4',
    viewModel:{
        type:'rec000p_02_4'
    },
    isModal:true,
    name:'rec000p_02_4',
    title:'연등출력',
    closable:true,
    width:1000,
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
        			xtype       :'radiogroup',
        			reference   : 'rp_acceptGbn',
        			name        : 'rp_acceptGbn',
        			fieldLabel  : '<span style="font-weight: 700;">출력선택 </span>',
        			labelStyle  : 'width:70px',
        			cls         : 'x-form-radio-group60',
        			items     :[{
        				boxLabel   : '단면', 
	                	inputValue : 0,    
	                	width      : 60,
	                	reference  : 'rp_acceptGbn1',
	                	checked    : true
        			},{
        				boxLabel   : '양면', 
	                	inputValue : 1,    
	                	width      : 60,
	                	reference  : 'rp_acceptGbn2',
        			}]
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
                	 'DAEJU_NO'
                	,'DAEJU_NM'
                	,'DEAD_DEUNG_NM'
                	,'LIGHT_NM'
                	,'JUNGAK_NM'
                	,'LIGHT_NO'
                	,'JUNGAK_NM'
                	,'YEONDEUNG_YEAR'
        		],
	             columns:[{
	            	 text        : '신도번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DAEJU_NO',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '대표자명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DAEJU_NM',                    
	                 exAlign     : 'center',
	                 width       : 110,
	             },{
	            	 text        : '연등구분',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DEAD_DEUNG_NM',                    
	                 exAlign     : 'center',
	                 width       : 120,
	                 renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	 
	                	 if(rowIndex > 0){
	                		 return '';
	                	 }
	                	 
	                	 var rtn = '연등';
	                	 if(value == 'T'){
	                		 rtn = '영가등';
	                	 }
	                	 return rtn;
	                 }
	             },{
	            	 text        : '연등종류',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'LIGHT_NM',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '연등번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'LIGHT_NO',                    
	                 exAlign     : 'center',
	                 width       : 90,
	             },{
	            	 text        : '연등위치',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'JUNGAK_NM',                    
	                 exAlign     : 'center',
	                 width       : 120,
	             },{
	            	 text        : '동참년도',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'YEONDEUNG_YEAR',                    
	                 exAlign     : 'center',
	                 width       : 100,
	             },{
	            	 text        : '신도명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME_KOR',                    
	                 exAlign     : 'left',
	                 //width       : 140,
	                 flex        : 1
	             }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})