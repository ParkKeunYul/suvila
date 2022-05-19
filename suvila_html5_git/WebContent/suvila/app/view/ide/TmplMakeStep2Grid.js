Ext.define('ExFrm.view.ide.TmplMakeStep2Grid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.tmplmakestep2grid',
    height:200,
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
        				title:'제목',
        				kind:'',
        				ref:'',
        				prefix:'',
        				type:'',
        				itemsCls:'',
        				src:'{}',
        				req:'',
        				res:''
					};
        			this.up('grid').getStore().add(data);    
					//data.destroy(); 			
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
			viewConfig:{
		        plugins: {
		            ddGroup: 'dragtmplpartmake',
		            ptype: 'gridviewdragdrop',
		            enableDrop: true
		        },
		        selType: 'cellmodel',
		        listeners:{
		        	beforedrop:function(node, data){
		        		console.log('data.records[0]:', data.records[0]);
						var kind = data.records[0].kind;
		        		//debugger;
		        		data.records[0] = data.records[0].copy('exModelLboId' + Ext.id());
						//data.records[0].kind = kind;
						console.log('data.records[0]::', data.records[0]);
		        		//data.records[0].id = 'exModelLboId' + Ext.id(); //data.records[0].copy('id:' + this.idCount++);
		        		//dropHandler.processDrop();
		        	},
		        	drop:function(node, data,dropRec, dropPosition){
						var record = data.records[0];
						console.log('record>>', record);
						index = me.getView().indexOf(record);     		        		
		        		var models = me.getStore().getRange();
						models[index].set('title', "Title");
						models[index].set('kind', record.data.name);
						models[index].set('ref','');
						models[index].set('prefix', '');
						models[index].set('type', '');
						models[index].set('itemsCls', '');
						models[index].set('req', '');
						models[index].set('res', '');
						Ext.Ajax.request({
							type:'ajax',
							url:'./jsp/fileRead.jsp',
							params:{
								path:lboServerPath + 
									lboFileSeperator + 'lib' + 
									lboFileSeperator + 'tmpljs' + 
									lboFileSeperator + 'part' + 
									lboFileSeperator + record.data.name
							},
							success:function(res){
								console.log('응답',res.responseText);
								var obj = res.responseText.trim();
								console.log('obj', obj);
								models[index].set('src', obj);
                                var tmplTypeIndex = obj.indexOf('tmplTypeCls:');
                                if(tmplTypeIndex != -1){
                                    var tempCount = 0;
                                    var tempStartIndex = 0;
                                    var tempEndIndex = obj.length;
                                    for(var i=tmplTypeIndex; i < obj.length; i++){
                                        if(obj[i] == '\''){
                                            if(tempCount == 0){
                                                tempStartIndex = i+1;
                                            }
                                            else if(tempCount==1){
                                                tempEndIndex = i;
                                                 var itemCls = obj.substring(tempStartIndex, tempEndIndex);
                                                 models[index].set('itemsCls', itemCls);
                                                 break;
                                            }
                                            tempCount++;
                                        }
                                    }
                                }
                                /*
								if(obj.indexOf('{@+id:gridPageItem') != -1){
									models[index].set('itemsCls', 'gridPage');
								}
								else if(obj.indexOf('{@+id:gridItemGroupSummary') != -1){
									models[index].set('itemsCls', 'gridGroupSummary');
								}                                                                                              
								else if(obj.indexOf('{@+id:gridItemGroup') != -1){
									models[index].set('itemsCls', 'gridGroup');
								}    
								else if(obj.indexOf('{@+id:gridItemSummary') != -1){
									models[index].set('itemsCls', 'gridSummary');
								}   
								else if(obj.indexOf('{@+id:gridItem') != -1){
									models[index].set('itemsCls', 'grid');
								}
								else if(obj.indexOf('{@+id:imageCardItem') != -1){
									models[index].set('itemsCls', 'imageCard');
								}
 								else if(obj.indexOf('{@+id:imageCardPageItem') != -1){
									models[index].set('itemsCls', 'imageCardPage');
								}                               
								else if(obj.indexOf('{@+id:treeAjaxItem') != -1){
									models[index].set('itemsCls', 'treeAjax');
								}	
								else if(obj.indexOf('{@+id:treeItem') != -1){
									models[index].set('itemsCls', 'tree');
								}	
								else if(obj.indexOf('{@+id:viewItem') != -1){
									models[index].set('itemsCls', 'view');
								}	
								else if(obj.indexOf('{@+id:viewTableItem') != -1){
									models[index].set('itemsCls', 'viewTable');
								}	
								else if(obj.indexOf('{@+id:chartItem') != -1){
									models[index].set('itemsCls', 'chart');
								}					
                                */																		
								console.log(obj.data);
							},
							failure:function(res){
								Ext.Msg.alert("오류", res.responseText);
							}
						});							
						
		        	},
		        	notifyDrop:function(){
		        		console.log('notifydrop', arguments);
		        	}
		        }
		    },
		    store:{
		    	fields:['title','kind', 'prefix', 'type', 'itemsCls', 'src', 'req', 'res'],
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
        return [
		{
            text: getLboLangItem('이미지'),
            dataIndex:'kind',
            width:110,
			sortable:false,  
    		renderer:function(val){
    			return '<img width=100 src=./lib/tmpljs/part/img/' + val + '.png>';
    		}            
        },{
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
            hidden:true,
            dataIndex:'prefix',
            width:200,
            editor:{
            	xtype:'textfield'
            }            
        },{
            text:'타입',
            hidden:true,
            dataIndex:'type',
            width:200,
            editor:{
            	xtype:'textfield'
            }            
        },{
            text: getLboLangItem('아이템구분'),
            //hidden:true,
            dataIndex:'itemsCls',
            width:200,
            editor:{
            	xtype:'textfield'
            }            
        },{
            text:'코드',
            hidden:true,
            dataIndex:'src',
            width:200,
            editor:{
            	xtype:'textareafield'
            }            
        },{
            text: getLboLangItem('스토어요청'),
            dataIndex:'req',
			sortable:false,  
            width:100,
            editor:{
            	xtype:'textfield'
            }           
        },{
            text: getLboLangItem('스토어응답'),
            dataIndex:'res',
            width:100,
			sortable:false,  
            editor:{
            	xtype:'textfield'
            }           
        }];
    } 
});