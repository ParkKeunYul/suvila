Ext.define('ExFrm.view.sin.sin001p_08',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_08',
    requires:[
    	'ExFrm.view.sin.sin001p_08Controller',
    	'ExFrm.view.sin.sin001p_08Model'
    ],
    controller:'sin001p_08',
    viewModel:{
        type:'sin001p_08'
    },
    isModal:true,
    name:'sin001p_08',
    title:'신도번호 변경',
    closable:true,
    width:400,
    height:640,
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
        		width  : '100%',
        		items  : [{
        			xtype           : 'extextfield',
                    reference       : 'txt_startNo',
                    fieldLabel      : '<span style="font-weight: 700;">번호구간</span>',
                    labelWidth      : 70,
                    width           : 170 ,
                    maskRe          : /[0-9.]/,
                    enableKeyEvents : true,
                    maxLength       : 5,
                    //value           : 15,
                    listeners       : {
                    	   keyup : 'onSearchEnter',
                    },
        		},{
        			html : '<div style="line-height:25px;font-wegiht:700;padding: 0 3px;">~</div>'
        		},{
        			xtype           : 'extextfield',
                    reference       : 'txt_endNo',
                    width           : 100 ,
                    maskRe          : /[0-9.]/,
                    maxLength       : 5,
                    enableKeyEvents : true,
                 //   value           : 16,
                    listeners       : {
                   	   keyup : 'onSearchEnter',
                    },
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
            		handler   : 'onSearch',	            		
            		text      : '조회'
        		},{
        			width            : 0,
            		height           : 0,
            		items            :[{
            			xtype            : 'extextfield',
                        reference        : 'old_budCd',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'old_budCd'
            		},{
            			xtype            : 'extextfield',
                        reference        : 'new_budCd',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'new_budCd'
            		}]
        		}]
        	},{
        		height : 5
        	},{
        		 exGroupRef    : true,
	             xtype         : 'exgrid',
	             reference     : 'sin001p_08_a',
	             cls           : 'sin001p_08_a none-dirty-grid topCheckHeader',
	             height        : 500,
	             width         : '100%',
	             bind          : {
	                 store:'{ds_main}'
	             },
	             columns:[{
	            	 text        : '순번',
                     xtype       : 'rownumberer',
                     width       : 70,
                     align       : 'center',
	             },{
	            	 text        : '신도번호',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BUD_CODE',                    
	                 exAlign     : 'center',
	                 flex        : 1
	             }]
        	},{
        		height : 5
        	},{
        		layout: {
    	            type: 'hbox',
    	            pack: 'center'
    	        },
    	        width  : '100%',
        		items  : [{
        			xtype     : 'exbutton',
            		handler   : 'onChange',	            		
            		text      : '변경'
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
            		handler   : 'onClose',	            		
            		text      : '취소'
            			
        		}]
        		
        	}]
        },{
        	width : '0.5%'
        }]
    }]
})