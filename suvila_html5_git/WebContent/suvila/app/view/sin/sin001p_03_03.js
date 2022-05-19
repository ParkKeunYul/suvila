Ext.define('ExFrm.view.sin.sin001p_03_03',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_03_03',
    requires:[
    	'ExFrm.view.sin.sin001p_03_03Controller',
    	'ExFrm.view.sin.sin001p_03_03Model'
    ],
    controller:'sin001p_03_03',
    viewModel:{
        type:'sin001p_03_03'
    },
    isModal:true,
    name:'sin001p_03_03',
    title:'행 도움',
    closable:true,
    width:150,
    height:400,
    closeToolText : "닫기",
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        width:'100%',
        height:'100%',
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items:[{
            width : '0.5%'
        },{
        	 width  : '99%',
        	 items  :[{
        		 xtype     : 'plain-tabs',
        		 reference : 'hangTab',
    		     height    : 300,
    		     width     : 148,
    		     plain     : true,
    		     defaults: {
    		        bodyPadding: 0,
    		        scrollable: false,
    		     },
    		     listeners: {
     		        tabchange: 'onTabChange'
     		     },
    		     items: [{
    		        title     : '남',    		        
	                layout    : 'vbox',
	                items     : [{
	                	height: 10,
	                },{
	                	xtype     : 'radiogroup',
		                reference : 'man',
		                layout    : 'vbox',
	    		        items     : [{
	    		        	 boxLabel   : '행효자', 
	                    	 inputValue : '행효자',    
	                    	 width      : 80,
	                    	 checked    : true                    	 
	    		        },{
	    		        	 boxLabel   : '행효손', 
		                   	 inputValue : '행효손',    
		                   	 width      : 80,
	    		        },{
	   		        	 	 boxLabel   : '행효손자', 
		                   	 inputValue : '행효손자',    
		                   	 width      : 80,
	    		        },{
	   		        	 	 boxLabel   : '행효제', 
		                   	 inputValue : '행효제',    
		                   	 width      : 80,
	    		        },{
	   		        	 	 boxLabel   : '행효조카', 
		                   	 inputValue : '행효조카',    
		                   	 width      : 80,
	    		        },{
	   		        	 	 boxLabel   : '행부군', 
		                   	 inputValue : '행부군',    
		                   	 width      : 80,
	    		        },{
	   		        	 	 boxLabel   : '행사형', 
		                   	 inputValue : '행사형',    
		                   	 width      : 80,
	    		        },{
	   		        	 	 boxLabel   : '행사제', 
		                   	 inputValue : '행사제',    
		                   	 width      : 80,
	    		        },{
	  		        	 	 boxLabel   : '행시사형', 
		                   	 inputValue : '행시사형',    
		                   	 width      : 80,
	    		        },{
	  		        	 	 boxLabel   : '행시사제', 
		                   	 inputValue : '행시사제',    
		                   	 width      : 80,    		      
	    		        }]
	                }]
    		     },{
    		        title: '여',
    		        items :[{
    		        	height   : 10
    		        },{
        		        xtype     :'radiogroup',
    	                reference :'woman',
    	                layout    :'vbox',
    	                layout    : 'vbox',
        		        items     : [{
        		        	 boxLabel   : '행효녀', 
                        	 inputValue : '행효녀',    
                        	 width      : 80,
                        	 checked    : true
        		        },{
        		        	boxLabel   : '행효손', 
                       	 	inputValue : '행효손',    
                       	 	width      : 80
        		        },{
        		        	boxLabel   : '행효손녀', 
                       	 	inputValue : '행효손녀',    
                       	 	width      : 80
        		        },{
        		        	boxLabel   : '행효질녀', 
                       	 	inputValue : '행효질녀',    
                       	 	width      : 80
        		        },{
        		        	boxLabel   : '행실인', 
                       	 	inputValue : '행실인',    
                       	 	width      : 80
        		        },{
        		        	boxLabel   : '행사형', 
                       	 	inputValue : '행사형',    
                       	 	width      : 80
        		        },{
        		        	boxLabel   : '행사매', 
                       	 	inputValue : '행사매',    
                       	 	width      : 80
        		        }]
    		        }]
    		     }],
        	 },{
        		 height : 10
        	 },{
        		 layout: {
    	            type: 'hbox',
    	            pack: 'center'
    	        },
    	        items : [{
    	        	xtype     : 'exbutton',
               		reference : 'confirmBtn',
               		name      : 'confirmBtn',
               		handler   : 'onConfirm',
               		text      : '확인',
    	        },{
    	        	width : 5
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