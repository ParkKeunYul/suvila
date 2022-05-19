Ext.define('ExFrm.view.pgc.pgc001w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.pgc001w_01',
	requires:[
		'ExFrm.view.pgc.pgc001w_01Controller',
        'ExFrm.view.pgc.pgc001w_01Model'
	],
	controller:'pgc001w_01',
	viewModel:{
        type:'pgc001w_01'
    },
    name:'pgc001w_01',
    isRootView:true,
    title:'카드수수료',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30
	    	
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            xtype:'exfieldsetblockbox',
	            items:[{
	            	xtype:'exblockrow',
                    items:[{
                        xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">계정 ID</div>'
                    },{
                    	xtype:'exblockfield',
                        items:[{
                            xtype:'extextfield',
                            reference:'txt_REP_TRADE_ID',                       
                            value : '',
                            exMand:true,
                            exReadOnly:true
                        }]
                    }]
	            },{
	            	xtype:'exblockrow',
                    items:[{
                        xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">수수료율</div>'
                    },{
                    	xtype:'exblockfield',
                        items:[{
                            xtype:'extextfield',
                            reference:'txt_TP_RATE_COMMISSION',
                            value : '',
                            exMand:true,
                            exReadOnly:true
                        },{
                        	width : 3
                        },{
                        	html :'%'
                        }]
                    }]
	            
	            },{
	            	xtype:'exblockrow',
                    items:[{
                        xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">수수료 계정과목</div>'
                    },{
                    	xtype:'exblockfield',
                        items:[{
                            xtype:'extextfield',
                            reference:'txt_accname',
                            value : '',
                            exLabel:'대표ID',
                            exMand:true,
                            exReadOnly:true
                        }]
                    }]
	            },{
	            	xtype:'exblockrow',
                    items:[{
                        xtype:'exblocklabel',
                        html:'<div style="text-align:left;padding-left:5px;">설명</div>'
                    },{
                    	xtype:'exblockfield',
                        items:[{
                        	html:'<img src="./resources/img/card_ex.png" width="900" height="168" >',
                        	height : 170
                        }]
                    }]
	            	
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});