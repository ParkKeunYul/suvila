Ext.define('ExFrm.view.sin.sin001p_03_01',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_03_01',
    requires:[
    	'ExFrm.view.sin.sin001p_03_01Controller',
    	'ExFrm.view.sin.sin001p_03_01Model'
    ],
    controller:'sin001p_03_01',
    viewModel:{
        type:'sin001p_03_01'
    },
    isModal:true,
    name:'sin001p_03_01',
    title:'영가호칭 및 망관계',
    closable:true,
    width:550,
    height:650,
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
        		 reference : 'MangTab',
    		    // height    : 500,
    		     width     : 520,
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
	                items :[{
    		        	height   : 10
    		        },{
    		        	exGroupRef  : true,
    	                xtype       : 'exgrid',
    	                reference   : 'acc001p_03_01_a',
    	                height      : 490,
    	                width       : 515,
    	                plugins     : [{
    	                	ptype:'cellediting'
    	                }], 
    	                bind:{
    	                    store:'{ds_man}'
    	                },
    	                selModel: {
    	                	selType        : 'checkboxmodel',
                    	    mode           : 'SINGLE', // 상단 체크박스 나오지 않음	                	    
                    	    allowDeselect  : true  ,  // row 선택시 자동체크 해제
                    	    checkOnly      : false,
                    	    headerText     : '선택',
                            headerWidth    : 60,
                            injectCheckbox : 0,  // last
                            showHeaderCheckbox : false,
    	                },
    	                columns:[{
	                		text      :'관계',
		                	xtype     :'excolumn',
		                    dataIndex :'A',
		                    flex      :1,
		                    exAlign   : 'left'
    	                },{
	                		text      :'망관계',
		                	xtype     :'excolumn',
		                    dataIndex :'B',
		                    flex      :1
    	                },{
	                		text      :'복위/기부',
		                	xtype     :'excolumn',
		                    dataIndex :'C',
		                    flex      :1
    	                },{
	                		text      :'후인/유인',
		                	xtype     :'excolumn',
		                    dataIndex :'D',
		                    flex      :1
    	                },{
	                		text      : '',
		                	xtype     :'excolumn',
		                    dataIndex :'E',
		                    flex      :1,
		                    exHidden  : true
    	                }]
    		        }]
    		     },{
    		        title: '여',
    		        items :[{
    		        	height   : 10
    		        },{
    		        	exGroupRef  : true,
    	                xtype       : 'exgrid',
    	                reference   : 'acc001p_03_01_b',
    	                height      : 490,
    	                width       : 515,
    	                plugins     : [{
    	                	ptype:'cellediting'
    	                }],
    	                bind:{
    	                    store:'{ds_woman}'
    	                },
    	                selModel: {
    	                	selType        : 'checkboxmodel',
                    	    mode           : 'SINGLE', // 상단 체크박스 나오지 않음	                	    
                    	    allowDeselect  : true  ,  // row 선택시 자동체크 해제
                    	    checkOnly      : false,
                    	    headerText     : '선택',
                            headerWidth    : 60,
                            injectCheckbox : 0,  // last
                            showHeaderCheckbox : false,
                            listeners      : {
                            	 //deselect : 'onCheckFalse'
                            	//,select   : 'onCheckTrue'
                            },
    	                },
    	                columns:[{
	                		text      :'관계',
		                	xtype     :'excolumn',
		                    dataIndex :'A',
		                    flex      : 1,
		                    exAlign   : 'left'
    	                },{
	                		text      :'망관계',
		                	xtype     :'excolumn',
		                    dataIndex :'B',
		                    flex      :1
    	                },{
	                		text      :'복위/기부',
		                	xtype     :'excolumn',
		                    dataIndex :'C',
		                    flex      :1
    	                },{
	                		text      :'후인/유인',
		                	xtype     :'excolumn',
		                    dataIndex :'D',
		                    flex      :1,
    	                },{
	                		text      : '',
		                	xtype     :'excolumn',
		                    dataIndex :'E',
		                    flex      :1,
		                    exHidden  : true
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
               		handler   : 'onConfirm',
               		text      : '확인',
    	        },{
    	        	width : 5
    	        },{
    	        	xtype     : 'exbutton',
               		handler   : 'onClose',
               		text      : '닫기',
    	        }]
        	 }]
        },{
        	width : '0.5%'
        }]
    }]
})