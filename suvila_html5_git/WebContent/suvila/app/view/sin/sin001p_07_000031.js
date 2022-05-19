Ext.define('ExFrm.view.sin.sin001p_07_000031',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_07_000031',
    requires:[
    	'ExFrm.view.sin.sin001p_07_000031Controller',
    	'ExFrm.view.sin.sin001p_07_000031Model'
    ],
    controller:'sin001p_07_000031',
    viewModel:{
        type:'sin001p_07_000031'
    },
    isModal:true,
    name:'sin001p_07_000031',
    title:'축원문출력',
    closable:true,
    width:1000,
    height:490,
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
        		height : 3
        	},{
        		reference   : 'bokwi_area',
        		items       : [{
        			xtype        : 'excombobox',
       		 		fieldLabel   : '<span style="font-weight: 700;">복위자명</span>',
       		 		labelWidth   : 60,
       		 		valueField   : 'FIND_VALUE',
       		 		displayField : 'DISPLAY',
    	            reference    : 'lc_bokwi',
    	            width        : 300,
    	            bind         : {
    	            	store:'{ds_bokwi}'
    	            },
    	            listeners    : {
    	            	change:'onYoungCheck'
    	            }
        		}]
        		
        	},{
	    		 exGroupRef    : true,
	             xtype         : 'exgrid',
	             reference     : 'sin001p_07_a',
	             cls           : 'sin001p_07_a none-dirty-grid topCheckHeader',
	             height        : 390,
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
	                 width       : 150,
	               //  exType      : 'date',
	             }]
        	},{
        		height : 5
        	},{        		
        		 hidden        : true ,
	    		 exGroupRef    : true,
	             xtype         : 'exgrid',
	             reference     : 'sin001p_07_b',
	             cls           : 'sin001p_07_b none-dirty-grid  topCheckHeader',
	             height        : 356,
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
	            	 text        : '복위자',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BOKWI_NAME_KOR',                    
	                 exAlign     : 'left',
	                 width       : 100,
	             },{
	            	 text        : '망관계',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DECE_REL',                    
	                 exAlign     : 'left',
	                 width       : 130,
	             },{
	            	 text        : '본/성별',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BON_SGBN',                    
	                 exAlign     : 'left',
	                 width       : 90,
	             },{
	            	 text        : '영가명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME_KOR',                    
	                 exAlign     : 'left',
	                 width       : 130,
	             },{
	            	 text        : '동일/영체',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'SPIRITUAL_GBN',                    
	                 exAlign     : 'left',
	                 width       : 120,
	             },{
	            	 text        : '구분',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DEATH_GBN',                    
	                 exAlign     : 'left',
	                 width       : 140,
	             }]
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})