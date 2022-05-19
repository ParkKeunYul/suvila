Ext.define('ExFrm.view.asp.asp011w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp011w_01',
	requires:[
		'ExFrm.view.asp.asp011w_01Controller',
        'ExFrm.view.asp.asp011w_01Model'
	],
	controller:'asp011w_01',
	viewModel:{
        type:'asp011w_01'
    },
    name:'asp011w_01',
    isRootView:true,
    title:'영업일관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
	    	items:[{
	    		xtype:'exdatefield',
            	fieldLabel:'년월',
            	fieldStyle: 'text-align: right;',
            	labelWidth:50,
                reference:'em_date',
                name:'V_DATE',                                   
                width : 100,
                format : 'Y/m',
                submitFormat : 'Ym',
	    	},{
	    		width : 10	    	
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',
	    	},{
	    		width : 5	    	
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '저장',
	    	}]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{        	
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout:'hbox',
	                xtype:'container',
	                height : 0,
	                items:[{                 
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'addData',
               	 		name      : 'addData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'uptData',
               	 		name      : 'uptData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'delData',
               	 		name      : 'delData',
               	 		width : 0
	                }]
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp011w_01_a',
	                height:820,              
	               bind:{
	                    store:'{ds_main}'
	                },
	               /* selModel: {
	                    mode: 'MULTI'
	                },*/
	                plugins:[{
                        ptype:'cellediting'
                    }],
	                cls : 'asp011w_01_a',	                
	                columns:[{
	                	text:'년월일',
	                	xtype:'excolumn',
	                    dataIndex:'PLUS_YYYYMMDD',                    
	                    exAlign:'center',
	                    width : 200 ,
	                    exType:'date'
	                },{
	                	text:'영업일구분',
	                	xtype: 'excolumn',
	                    dataIndex:'ETC4',                    
	                    align:'center',
	                    width : 150,
	                    editor:{
                            xtype:'excombobox',
                            valueField:'value',
                            displayField:'display',
                            bind:{
                                store:'{use_yn}'
                            }
                        },
                        onRenderer:function(orgValue,value){
                            var store = this.up('[isRootView=true]').getViewModel().getStore('use_yn');
                            var index = store.find('value',value)
                            if(index != -1){
                                return store.getAt(index).get('display');
                            }
                            else {
                                return value;
                            }
                        }
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});