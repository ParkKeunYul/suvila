Ext.define('ExFrm.view.asp.asp007w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp007w_01',
	requires:[
		'ExFrm.view.asp.asp007w_01Controller',
        'ExFrm.view.asp.asp007w_01Model'
	],
	controller:'asp007w_01',
	viewModel:{
        type:'asp007w_01'
    },
    name:'asp007w_01',
    isRootView:true,
    title:'계정관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{        	
	        	width : '56%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	height : 30
	            },{
	            	layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{                 
	                },{
	                	flex : 1,
	                	html : '사찰명',
	                }]
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp007w_01_a',
	                height:820,              
	                bind:{
	                    store:'{ds_templeCd}'
	                },
	                listeners: {
	                	selectionchange : 'onSelectionChange'
	                },
	                cls : 'asp007w_01_a',	                
	                columns:[{	                	
	                	text:'사찰코드',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'TEMPLE_CD',
	                    flex : 1,
	              
	                },{
	                	text:'사찰명',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_NM',                    
	                    exAlign:'left',
	                    flex : 1,	                
	                }]
	            }]
	        },{
	        	width : '0.5%'
	        },{
	        	width : '43%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{            	
	            	height : 30
	            },{
	        		layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{
	                	html : '사용자명',
	                	flex : 1 ,                            
	                }]
	            },{
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp007w_01_b',                
	                height:820,
	                width : '70%',
	                bind:{
	                    store:'{ds_templeUser}'
	                },
	                listeners: {
	                	itemdblclick : 'onTempleLogin'
	                },
	                columns:[{
	                	text:'이름',                        
	                    xtype:'excolumn',
	                    exAlign:'left',
	                    dataIndex: 'NAME',
	                    flex : 1,
	              
	                },{
	                	text:'ID',
	                	xtype:'excolumn',
	                    dataIndex:'USER_ID',                    
	                    exAlign:'left',
	                    flex : 1,
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});