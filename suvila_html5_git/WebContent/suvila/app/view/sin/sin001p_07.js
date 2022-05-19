Ext.define('ExFrm.view.sin.sin001p_07',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_07',
    requires:[
    	'ExFrm.view.sin.sin001p_07Controller',
    	'ExFrm.view.sin.sin001p_07Model'
    ],
    controller:'sin001p_07',
    viewModel:{
        type:'sin001p_07'
    },
    isModal:true,
    name:'sin001p_07',
    title:'축원문출력',
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
        			reference   : 'rd_gidoGbn',
        			name        : 'rd_gidoGbn',
        			fieldLabel  : '<span style="font-weight: 700;">기도선택 </span>',
        			labelStyle  : 'width:70px',
        			cls         : 'x-form-radio-group60',
        			listeners: {
    					change : 'onRadioClick',
    				},
        			items     :[{
        				boxLabel   : '축원', 
	                	inputValue : 1,    
	                	width      : 50,
	                	reference  : 'rd_gidoGbn1',
	                	checked    : true
        			},{
        				boxLabel   : '천혼문', 
	                	inputValue : 2,    
	                	width      : 70,
	                	reference  : 'rd_gidoGbn2',
        			},{
        				boxLabel   : '축원+천혼', 
	                	inputValue : 3,    
	                	width      : 80,
	                	reference  : 'rd_gidoGbn3',
        			}]        		
        		},{
            		xtype           : 'extextfield',
                    reference       : 'txt_wish',
                    fieldLabel      : '<span style="font-weight: 700;">제목</span>',
                    labelWidth      : 40,
                    width           : 200 ,
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
        			layout    : 'hbox',
        			reference : 'upDownArea',
        			items     : [{
	            		width : 5
            		},{
        	    		xtype     : 'exbutton',
                		handler   : 'onFamilyUp',
                		iconCls   : 'fa fa-angle-up',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
                		handler   : 'onFamilyDown',	            		
                		iconCls   : 'fa fa-angle-down',
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
	             reference     : 'sin001p_07_a',
	             cls           : 'sin001p_07_a none-dirty-grid topCheckHeader',
	             height        : 240,
	             width         : '100%',
	             bind          : {
	                 store:'{ds_pray_temp}'
	             },
	             columns:[{
	            	 text           : '선택',
	             	 xtype          : 'excheckcolumn',
	                 dataIndex      : 'CHECK_P',                    
	                 exAlign        : 'center',
	                 headerCheckbox : true,
	                 width          : 95,  
	             },{
	            	 text        : '신도번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BUD_NO',                    
	                 exAlign     : 'center',
	                 width       : 160,
	             },{
	            	 text        : '관계',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'REPRESEN_REL',                    
	                 exAlign     : 'left',
	                 width       : 130,
	             },{
	            	 text        : '성명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME_KOR',                    
	                 exAlign     : 'left',
	                 width       : 160,
	             },{
	            	 text        : '생년월일',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BIRTHDAY',                    
	                 exAlign     : 'center',
	                 width       : 100,
	                 exType      : 'date',
	             },{
	            	 text        : '주소',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'ADDR1',                    
	                 exAlign     : 'left',
	                 flex        : 1,
	             }]
        	},{
        		height : 5
        	},{        		
        		 hidden        : true ,
	    		 exGroupRef    : true,
	             xtype         : 'exgrid',
	             reference     : 'sin001p_07_b',
	             cls           : 'sin001p_07_b none-dirty-grid  topCheckHeader',
	             height        : 240,
	             width         : '100%',
	             bind          : {
	                 store:'{ds_cheanHon}'
	             },
	             columns:[{
	            	 text           : '선택',
	             	 xtype          : 'excheckcolumn',
	                 dataIndex      : 'CHECK_P',                    
	                 exAlign        : 'center',
	                 headerCheckbox : true,
	                 width          : 95,  
	             },{
	            	 text        : '효관계',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'HYO_REL',                    
	                 exAlign     : 'left',
	                 width       : 100,
	             },{
	            	 text        : '복위자',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BOK_NAME_KOR',                    
	                 exAlign     : 'left',
	                 width       : 130,
	             },{
	            	 text        : '구분',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BOKWI_NM',                    
	                 exAlign     : 'left',
	                 width       : 90,
	             },{
	            	 text        : '망관계',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DECE_REL',                    
	                 exAlign     : 'left',
	                 width       : 130,
	             },{
	            	 text        : '본',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BON_NM',                    
	                 exAlign     : 'left',
	                 width       : 90,
	             },{
	            	 text        : '영가',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME_KOR',                    
	                 exAlign     : 'left',
	                 width       : 140,
	             }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})