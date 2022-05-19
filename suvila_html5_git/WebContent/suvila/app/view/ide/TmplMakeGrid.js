Ext.define('ExFrm.view.ide.TmplMakeGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.tmplmakegrid',
    width:'100%',
    height:200,
    bodyBorder:true,
    border:true,
    idCount:100,
	kind:'',
    initComponent:function(){
        var me = this;
        Ext.apply(this, {
			columns:this.getColumnConfig(this.kind),
        	tools:[/*{
        		type:'plus',
        		tooltip:'add data',
        		handler:function(event, toolEL, panel){
        			var data = {
        				title:'제목',
        				kind:'',
        				prefix:'',
        				columns:0,
        				rows:0,
        				src:'{}',
					};
        			this.up('grid').getStore().add(data);     			
        		}
        	},*/{
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
			viewConfig:{
		        plugins: {
		            ddGroup: 'dragtmplmake',
		            ptype: 'gridviewdragdrop',
		            enableDrop: true
		        },
		        selType: 'cellmodel',
		        listeners:{
		        	beforedrop:function(node, data){
		        		console.log('data.records[0]', data.records[0]);
		        		//debugger;
		        		data.records[0] = data.records[0].copy('exModelLboId' + Ext.id());
		        		//data.records[0].id = 'exModelLboId' + Ext.id(); //data.records[0].copy('id:' + this.idCount++);
		        		//dropHandler.processDrop();
		        	},
		        	drop:function(node, data,dropRec, dropPosition){
						var record = data.records[0];
						console.log('record', record);
						index = me.getView().indexOf(record);     		        		
		        		var models = me.getStore().getRange();
						models[index].set('title', "Title");
						models[index].set('kind', record.data.name);
						models[index].set('prefix', '');
						models[index].set('columns', 0);
						models[index].set('rows', 0);
						Ext.Ajax.request({
							type:'ajax',
							url:'./jsp/fileRead.jsp',
							params:{
								path:lboServerPath + 
									lboFileSeperator + 'lib' + 
									lboFileSeperator + 'tmpljs' + 
									lboFileSeperator + 'main' + 
									lboFileSeperator + record.data.name
							},
							success:function(res){
								console.log('응답',res.responseText);
								var obj = res.responseText.trim();
								console.log('obj', obj);
								models[index].set('src', obj);
								console.log(obj.data);
							},
							failure:function(res){
								Ext.Msg.alert("오류", res.responseText.replace(/\'/g,' '));
							}
						});							
						
		        	},
		        	notifyDrop:function(){
		        		console.log('notifydrop', arguments);
		        	}
		        }
		    },
		    store:{
		    	fields:['title','kind', 'prefix', 'columns', 'rows', 'src'],
		    	autoLoad:false,
		    },
	        enableDragDrop: true,       
		    plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 1
		    }             
        });
        me.callParent(arguments);
    },
    getColumnConfig:function(){
		if(this.kind=='main'){
			return [
			{
				text: getLboLangItem('이미지'),
				dataIndex:'kind',
				width:110,
				sortable:false,  
				renderer:function(val){
					return '<img width=100 src=./lib/tmpljs/main/img/' + val + '.png>';
				}            
			},        
			{
				text: getLboLangItem('제목'),
				dataIndex:'title',
				width:150,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}            
			},{
				text: getLboLangItem('템플릿'),
				dataIndex:'kind',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}
			},{
				hidden:true,
				text:'레퍼런스',
				dataIndex:'ref',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}
			},{
				hidden:true,
				text:'접두어',
				dataIndex:'prefix',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}            
			},{
				hidden:true,
				text:'컬럼수',
				dataIndex:'columns',
				width:200,
				editor:{
					xtype:'textfield'
				}            
			},{
				hidden:true,
				text:'로우수',
				dataIndex:'rows',
				width:200,
				editor:{
					xtype:'textfield'
				}            
			},{
				hidden:true,
				text:'코드',
				dataIndex:'src',
				width:200,
				editor:{
					xtype:'textareafield'
				}            
			},{
				hidden:true,
				text:'요청',
				dataIndex:'req',
				//hidden:true,
				width:200           
			},{
				hidden:true,
				text:'응답',
				dataIndex:'res',
				//hidden:true,
				width:200           
			}];
		}
		else {
			return [
			{
				text: getLboLangItem('이미지'),
				dataIndex:'kind',
				sortable:false,  
				width:110,
				renderer:function(val){
					return '<img width=100 src=./lib/tmpljs/main/img/' + val + '.png>';
				}            
			},        
			{
				text: getLboLangItem('제목'),
				dataIndex:'title',
				width:150,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}            
			},{
				text: getLboLangItem('템플릿'),
				dataIndex:'kind',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}
			},{
				text: getLboLangItem('레퍼런스'),
				dataIndex:'ref',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}
			},{
				text:'접두어',
				dataIndex:'prefix',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}            
			},{
				text:'컬럼수',
				dataIndex:'columns',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}            
			},{
				text:'로우수',
				dataIndex:'rows',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textfield'
				}            
			},{
				text:'코드',
				dataIndex:'src',
				width:200,
				sortable:false,  
				editor:{
					xtype:'textareafield'
				}            
			},{
				text:'요청',
				dataIndex:'req',
				sortable:false,  
				//hidden:true,
				width:200           
			},{
				text:'응답',
				dataIndex:'res',
				sortable:false,  
				//hidden:true,
				width:200           
			}];
		}
    } 
});