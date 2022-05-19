Ext.define('ExFrm.view.ide.TmplMakeStep2ModelGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.tmplmakestep2modelgrid',
    bodyBorder:true,
    border:true,
    idCount:100,
    initComponent:function(){
        var me = this;
        Ext.apply(this, {
			columns:this.getColumnConfig(),
        	tools:[{
        		type:'plus',
        		tooltip:'add data',
        		handler:function(event, toolEL, panel){
        			var data = {
        				storeName:'mainInfo',
        				kind:'grid',	// kind:all, pageArrow, pageNumber, scroll
                        extaInfo:'',
        				type:'ajax',
        				url:'/test/sampleList.jsp',
        				root:'data.list',
        				total:'list1TotalSize',
        				pageSize:10
					};
        			this.up('grid').getStore().add(data);     			
        		}
        	},{
        		type:'minus',
        		tooltip:'remove data',
        		handler:function(event, toolEL, panel){
        			//var selection = this.up('grid').getSelectionModel().getSelected();
        			var selection = this.up('grid').getView().getSelectionModel().getSelection();
        			console.log('selection', selection);
        			if(selection != null){
        				console.log('삭제', this.up('grid').getStore());
        				this.up('grid').getStore().remove(selection[0]);
        			}
        		}
        	}],
        	
            selType: 'cellmodel',
		    store:{
		    	fields:['storeName','kind', 'extaInfo', 'type', 'url', 'root', 'total', 'pageSize'],
		    	autoLoad:false,
		    },
	        enableDragDrop: true,       
		    plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 2
		    }             
        });
        me.callParent(arguments);
    },
    getColumnConfig:function(){
        return [{
            text: getLboLangItem('스토어명'),
            dataIndex:'storeName',
            width:150,
			sortable:false,  
            editor:{
            	xtype:'textfield'
            }            
        },{
            text: getLboLangItem('스토어 종류'),
            dataIndex:'kind',
            width:200,
			sortable:false,  
            editor:{
            	xtype:'combobox',
            	displayField:'name',
            	valueField:'value',
            	store:{
            		fields:['name','value'],
            		data:[
            			{name:'grid', value:'grid'},
            			{name:'gridPage', value:'gridPage'},
            			{name:'gridScroll', value:'gridScroll'},
						{name:'pivot', value:'pivot'},
            			{name:'imageCard', value:'imageCard'},
            			{name:'imageCardPage', value:'imageCardPage'},
            			{name:'chart', value:'chart'},
            			{name:'chartPie', value:'chartPie'},
            			{name:'chartCandleStick', value:'chartCandleStick'},
            			{name:'tree', value:'tree'},
						{name:'treeGrid', value:'treeGrid'}
            		]
            	},
            	listeners:{
            		change:function(){
            			console.log('change', arguments);
            		}
            	}
            }
        },{
			hidden:true,
            text:'추가정보',
            dataIndex:'extraInfo',
            width:300,
            editor:{
            	xtype:'textareafield'
            }            
        },{
        	hidden:true,
            text:'타입',
            dataIndex:'type',
            width:200,
            editor:{
            	xtype:'combobox',
            	displayField:'name',
            	valueField:'value',
            	store:{
            		fields:['name','value'],
            		data:[
            			{name:'ajax', value:'ajax'}
            		]
            	}
            }          
        },{
        	hidden:true,
            text:'URL',
            dataIndex:'url',
            width:300,
            editor:{
            	xtype:'textareafield'
            }            
        },{
        	hidden:true,
            text:'ROOT',
            dataIndex:'root',
            width:200,
            editor:{
            	xtype:'textfield'
            }            
        },{
        	hidden:true,
            text:'TOTAL',
            dataIndex:'total',
            width:200,
            editor:{
            	xtype:'textfield'
            }            
        },{
        	hidden:true,
            text:'페이지크기',
            dataIndex:'pageSize',
            width:80,
            editor:{
            	xtype:'textareafield'
            }            
        }];
    } 
});