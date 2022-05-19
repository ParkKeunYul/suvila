Ext.define('ExFrm.view.ide.TmplGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.tmplgrid',
    width:700,
    height:200,
    bodyBorder:true,
    border:true,
    itemsCls:'',
	columnCount:0,
    isRootComp:true,
    initComponent:function(){
        var me = this;
        Ext.apply(this, {
			columns:this.getColumnConfig(),
        	tools:[
			{
				xtype:'combobox',
				fieldLabel:'컬럼수',
				labelAlign:'right',
				displayField:'display',
				valueField:'value',
				queryMode:'local',
				value:0,
				store:{
					fields:['value',' display'],
					data:[
						{value:0, display:'해당무'},
						{value:1, display:'1'},
						{value:2, display:'2'},
						{value:3, display:'3'},
						{value:4, display:'4'},
						{value:5, display:'5'}
					]
				},
				listeners:{
					select:function(){
						this.up('grid').columnCount = this.getValue();
					}
				}
			},{
        		type:'plus',
        		tooltip:'add data',
        		handler:function(event, toolEL, panel){
        			var data = {
                        itemsCls:this.up('[isRootComp=true]').itemsCls,
						fieldName:'field',
						fieldKorName:'label name', 
						fieldType:'text',
						fromTo:'N'
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
		    plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 2
		    },
		    /*
			viewConfig:{
		        plugins: [{
		            ddGroup: 'dragGroup1',
		            ptype: 'gridviewdragdrop',
		            enableDrop: true
		        }],
		        selType: 'cellmodel',
		        listeners:{
		        	drop:function(node, data,dropRec, dropPosition){
						var record = data.records[0],
						index = me.getView().indexOf(record);     		        		
		        		var models = me.getStore().getRange();
						models[index].set('fieldType', "텍스트");
						models[index].set('fromTo', "N");
		        	},
		        	notifyDrop:function(){
		        		console.log('notifydrop', arguments);
		        	}
		        }
		    },
		    */
		    store:{
		    	fields:['fieldName','fieldKorName', 'fieldType', 'fromTo'],
		    	autoLoad:false,
		    },
	        enableDragDrop: true       
            
        });
        me.callParent(arguments);
    },
    getColumnConfig:function(){
		if( this.itemsCls == 'chartCandleStick'){
	        return [
            {
	            text: getLboLangItem('필드명'),
	            dataIndex:'fieldName',
	            width:150,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }            
	        },{
	            text: getLboLangItem('타이틀명'),
	            dataIndex:'fieldKorName',
	            width:200,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
	        },{
	            text: getLboLangItem('타입'),
	            dataIndex:'fieldType',
	            name:'fieldType',
				sortable:false,  
	            editor:{
	            	xtype:'combobox',
	            	queryMode:'local',
	            	editable:false,
	            	allowBlank:false,
					
	            	displayField: 'typeName',
	    			valueField: 'typeName',
				    store:{
			            fields:['typeName', 'typeValue'],
			            data:[
			            {
			            	typeName:'x',
			            	typeValue:'x'
			        	},{
			            	typeName:'open',
			            	typeValue:'open'
			        	},{
			            	typeName:'high',
			            	typeValue:'high'
			        	},{
			            	typeName:'low',
			            	typeValue:'low'
			        	},{
			            	typeName:'close',
			            	typeValue:'close'
			        	}]
				    }
	            },
	            width:200,
	        },{
                text: getLboLangItem('아이템구분'),
                dataIndex:'itemsCls',
                width:100,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }                 
            },{
	        	//xtype:'widgetcolumn',
	            text:'기간여부',
	            name:'fromTo',
	            hidden:true,
	            dataIndex:'fromTo',
	            width:60,
				sortable:false,  
	 			editor:{
	            	xtype:'combobox',
	            	displayField: 'name',
	    			valueField: 'value',
				    store:{
			            fields:['name', 'value'],
			            data:[
			            {
			            	name:'N',
			            	value:'N'
			        	},{
			            	name:'Y',
			            	value:'Y'
			        	}]
			        }
			    }        
	        }];	
		}
		else if( this.itemsCls == 'chart' ||
            this.itemsCls == 'chartPie' ){
	        return [
            {
	            text: getLboLangItem('필드명'),
	            dataIndex:'fieldName',
	            width:150,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }            
	        },{
	            text: getLboLangItem('타이틀명'),
	            dataIndex:'fieldKorName',
	            width:200,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
	        },{
	            text: getLboLangItem('타입'),
	            dataIndex:'fieldType',
	            name:'fieldType',
				sortable:false,  
	            editor:{
	            	xtype:'combobox',
	            	queryMode:'local',
	            	editable:false,
	            	allowBlank:false,
	            	displayField: 'typeName',
	    			valueField: 'typeName',
				    store:{
			            fields:['typeName', 'typeValue'],
			            data:[
			            {
			            	typeName:'x',
			            	typeValue:'x'
			        	},{
			            	typeName:'y',
			            	typeValue:'y'
			        	}]
				    }
	            },
	            width:200,
	        },{
                text: getLboLangItem('아이템구분'),
                dataIndex:'itemsCls',
                width:100,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }                 
            },{
	        	//xtype:'widgetcolumn',
	            text:'기간여부',
	            name:'fromTo',
	            hidden:true,
	            dataIndex:'fromTo',
	            width:60,
				sortable:false,  
	 			editor:{
	            	xtype:'combobox',
	            	displayField: 'name',
	    			valueField: 'value',
				    store:{
			            fields:['name', 'value'],
			            data:[
			            {
			            	name:'N',
			            	value:'N'
			        	},{
			            	name:'Y',
			            	value:'Y'
			        	}]
			        }
			    }        
	        }];			
    	}else if(this.itemsCls == 'tree' || this.itemsCls == 'treeGrid'){
	        return [
            {
	            text: getLboLangItem('필드명'),
	            dataIndex:'fieldName',
	            width:150,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }            
	        },{
	            text: getLboLangItem('타이틀명'),
	            dataIndex:'fieldKorName',
	            width:200,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
	        },{
	            text: getLboLangItem('타입'),
	            dataIndex:'fieldType',
	            name:'fieldType',
				sortable:false,  
	            editor:{
	            	xtype:'combobox',
	            	queryMode:'local',
	            	editable:false,
	            	allowBlank:false,
	            	displayField: 'typeName',
	    			valueField: 'typeName',
				    store:{
			            fields:['typeName', 'typeValue'],
			            data:[
			            {
			            	typeName:'display',
			            	typeValue:'display'
			        	},{
			            	typeName:'none',
			            	typeValue:'none'
			        	}]
				    }
	            },
	            width:200,
	        },{
                text: getLboLangItem('아이템구분'),
                dataIndex:'itemsCls',
                width:100,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
                  
            },{
	        	//xtype:'widgetcolumn',
	            text:'기간여부',
	            name:'fromTo',
	            hidden:true,
	            dataIndex:'fromTo',
	            width:60,
				sortable:false,  
	 			editor:{
	            	xtype:'combobox',
	            	displayField: 'name',
	    			valueField: 'value',
				    store:{
			            fields:['name', 'value'],
			            data:[
			            {
			            	name:'N',
			            	value:'N'
			        	},{
			            	name:'Y',
			            	value:'Y'
			        	}]
			        }
			    }        
	        }];			
    	}else if(this.itemsCls == 'treeAjax'){
	        return [
            {
	            text: getLboLangItem('필드명'),
	            dataIndex:'fieldName',
	            width:150,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }            
	        },{
	            text: getLboLangItem('타이틀명'),
	            dataIndex:'fieldKorName',
	            width:200,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
	        },{
	            text: getLboLangItem('타입'),
	            dataIndex:'fieldType',
	            name:'fieldType',
				sortable:false,  
	            editor:{
	            	xtype:'combobox',
	            	queryMode:'local',
	            	editable:false,
	            	allowBlank:false,
	            	displayField: 'typeName',
	    			valueField: 'typeName',
				    store:{
			            fields:['typeName', 'typeValue'],
			            data:[
			            {
			            	typeName:'display',
			            	typeValue:'display'
			        	},{
			            	typeName:'none',
			            	typeValue:'none'
			        	}]
				    }
	            },
	            width:200,
	        },{
                text: getLboLangItem('아이템구분'),
                dataIndex:'itemsCls',
                width:100,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
                  
            },{
	        	//xtype:'widgetcolumn',
	            text:'기간여부',
	            name:'fromTo',
	            hidden:true,
	            dataIndex:'fromTo',
	            width:60,
	 			editor:{
	            	xtype:'combobox',
	            	displayField: 'name',
	    			valueField: 'value',
				    store:{
			            fields:['name', 'value'],
			            data:[
			            {
			            	name:'N',
			            	value:'N'
			        	},{
			            	name:'Y',
			            	value:'Y'
			        	}]
			        }
			    }        
	        }];			
    	}
        else if(
            this.itemsCls == 'grid' ||
            this.itemsCls == 'gridPage' ||
			this.itemsCls == 'gridPageArrow' ||
			this.itemsCls == 'gridPageArrowEdit' ||
            this.itemsCls == 'gridPageEdit' ||
            this.itemsCls == 'gridSummary' ||
            this.itemsCls == 'gridGroup' ||
            this.itemsCls == 'gridGroupSummary'
        ){
	        return [
            {
	            text: getLboLangItem('필드명'),
	            dataIndex:'fieldName',
	            width:150,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }            
	        },{
	            text: getLboLangItem('타이틀명'),
	            dataIndex:'fieldKorName',
	            width:200,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
	        },{
	            text: getLboLangItem('타입'),
	            dataIndex:'fieldType',
	            name:'fieldType',
				sortable:false,  
	            editor:{
	            	xtype:'combobox',
	            	queryMode:'local',
	            	editable:false,
	            	allowBlank:false,
	            	displayField: 'typeName',
	    			valueField: 'typeName',
				    store:{
			            fields:['typeName', 'typeValue'],
			            data:[
			            {
			            	typeName:'group',
			            	typeValue:'group'
			        	},{
			            	typeName:'sum',
			            	typeValue:'sum'
			        	},{
			            	typeName:'avg',
			            	typeValue:'avg'
			        	},{
			            	typeName:'max',
			            	typeValue:'max'
			        	},{
			            	typeName:'min',
			            	typeValue:'min'
			        	},{
                            typeName:'none',
                            typeValue:'none'
                        }]
				    }
	            },
	            width:200,
	        },{
                text: getLboLangItem('아이템구분'),
                dataIndex:'itemsCls',
				sortable:false,  
                width:100,
	            editor:{
	            	xtype:'textfield'
	            }
                  
            },{
	        	//xtype:'widgetcolumn',
	            text:'기간여부',
	            name:'fromTo',
	            hidden:true,
	            dataIndex:'fromTo',
	            width:60,
	 			editor:{
	            	xtype:'combobox',
	            	displayField: 'name',
	    			valueField: 'value',
				    store:{
			            fields:['name', 'value'],
			            data:[
			            {
			            	name:'N',
			            	value:'N'
			        	},{
			            	name:'Y',
			            	value:'Y'
			        	}]
			        }
			    }        
	        }];			
    	} else if(
            this.itemsCls == 'pivot'){
	        return [
            {
	            text: getLboLangItem('필드명'),
	            dataIndex:'fieldName',
	            width:150,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }            
	        },{
	            text: getLboLangItem('타이틀명'),
	            dataIndex:'fieldKorName',
	            width:200,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
	        },{
	            text: getLboLangItem('타입'),
	            dataIndex:'fieldType',
	            name:'fieldType',
				sortable:false,  
	            editor:{
	            	xtype:'combobox',
	            	queryMode:'local',
	            	editable:false,
	            	allowBlank:false,
	            	displayField: 'typeName',
	    			valueField: 'typeName',
				    store:{
			            fields:['typeName', 'typeValue'],
			            data:[
			            {
			            	typeName:'left',
			            	typeValue:'left'
			        	},{
			            	typeName:'top',
			            	typeValue:'top'
			        	},{
			            	typeName:'sum',
			            	typeValue:'sum'
			        	},{
			            	typeName:'max',
			            	typeValue:'max'
			        	},{
			            	typeName:'min',
			            	typeValue:'min'
			        	},{
                            typeName:'count',
                            typeValue:'count'
                        }]
				    }
	            },
	            width:200,
	        },{
                text: getLboLangItem('아이템구분'),
                dataIndex:'itemsCls',
                width:100,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
                  
            },{
	        	//xtype:'widgetcolumn',
	            text:'기간여부',
	            name:'fromTo',
	            hidden:true,
	            dataIndex:'fromTo',
	            width:60,
	 			editor:{
	            	xtype:'combobox',
	            	displayField: 'name',
	    			valueField: 'value',
				    store:{
			            fields:['name', 'value'],
			            data:[
			            {
			            	name:'N',
			            	value:'N'
			        	},{
			            	name:'Y',
			            	value:'Y'
			        	}]
			        }
			    }        
	        }];			
    	}else if(
            this.itemsCls == 'imageCard' ||
            this.itemsCls == 'imageCardPage'
        ){
	        return [
            {
	            text: getLboLangItem('필드명'),
	            dataIndex:'fieldName',
	            width:150,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }            
	        },{
	            text: getLboLangItem('타이틀명'),
	            dataIndex:'fieldKorName',
	            width:200,
	            editor:{
	            	xtype:'textfield'
	            }
	        },{
	            text: getLboLangItem('타입'),
	            dataIndex:'fieldType',
	            name:'fieldType',
				sortable:false,  
	            editor:{
	            	xtype:'combobox',
	            	queryMode:'local',
	            	editable:false,
	            	allowBlank:false,
	            	displayField: 'typeName',
	    			valueField: 'typeName',
				    store:{
			            fields:['typeName', 'typeValue'],
			            data:[
			            {
			            	typeName:'primaryValue',
			            	typeValue:'primaryValue'
			        	},{
			            	typeName:'image',
			            	typeValue:'image'
			        	},{
			            	typeName:'subject',
			            	typeValue:'subject'
			        	},{
			            	typeName:'content',
			            	typeValue:'content'
			        	},{
			            	typeName:'date',
			            	typeValue:'date'
			        	},{
                            typeName:'writer',
                            typeValue:'writer'
                        }]
				    }
	            },
	            width:200,
	        },{
                text: getLboLangItem('아이템구분'),
                dataIndex:'itemsCls',
                width:100,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }
                  
            },{
	        	//xtype:'widgetcolumn',
	            text:'기간여부',
	            name:'fromTo',
	            hidden:true,
	            dataIndex:'fromTo',
	            width:60,
				sortable:false,  
	 			editor:{
	            	xtype:'combobox',
	            	displayField: 'name',
	    			valueField: 'value',
				    store:{
			            fields:['name', 'value'],
			            data:[
			            {
			            	name:'N',
			            	value:'N'
			        	},{
			            	name:'Y',
			            	value:'Y'
			        	}]
			        }
			    }        
	        }];			
    	} else {
	        return [
            {
	            text: getLboLangItem('필드명'),
	            dataIndex:'fieldName',
	            width:150,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            }            
	        },{
	            text: getLboLangItem('타이틀명'),
	            dataIndex:'fieldKorName',
	            width:200,
	            editor:{
	            	xtype:'textfield'
	            }
	        },{
	        	//xtype:'widgetcolumn',
	            text: getLboLangItem('타입'),
	            dataIndex:'fieldType',
	            name:'fieldType',
				sortable:false,  
	            editor:{
	            	xtype:'combobox',
	            	queryMode:'local',
	            	editable:false,
	            	allowBlank:false,
	            	displayField: 'typeName',
	    			valueField: 'typeName',
	    			
	    			//triggerAction: 'all',
				    store:{
			            fields:['typeName', 'typeValue'],
			            data:[
			            {
			            	typeName:'textfield',
			            	typeValue:'textfield'
			        	},{
			            	typeName:'textfield_alphanum',
			            	typeValue:'textfield_alphanum'
			        	},{
			            	typeName:'textfield_alpha',
			            	typeValue:'textfield_alpha'
			        	},{
			            	typeName:'textfield_email',
			            	typeValue:'textfield_email'
			        	},{
			            	typeName:'textfield_url',
			            	typeValue:'textfield_url'
			        	},{
			            	typeName:'datefield',
			            	typeValue:'datefield'
			        	},/*{
			            	typeName:'timefield',
			            	typeValue:'timefield'
			        	},*/{
			            	typeName:'searchfield',
			            	typeValue:'searchfield'
			        	},{
			            	typeName:'numberfield',
			            	typeValue:'numberfield'
			        	},{
			            	typeName:'combobox',
			            	typeValue:'combobox'
			        	},{
			            	typeName:'checkboxgroup',
			            	typeValue:'checkboxgroup'
			        	},{
			            	typeName:'checkboxfield',
			            	typeValue:'checkboxfield'
			        	},{
			            	typeName:'radiogroup',
			            	typeValue:'radiogroup'
			        	},{
			            	typeName:'radiofield',
			            	typeValue:'radiofield'
			        	},{
			            	typeName:'spinnerfield',
			            	typeValue:'spinnerfield'
			        	},{
			            	typeName:'textarea',
			            	typeValue:'textarea'
			        	},{
			            	typeName:'filefield',
			            	typeValue:'filefield'
			        	},/*{
			            	typeName:'filemultifield',
			            	typeValue:'filemultifield'
			        	},*/{
			            	typeName:'hiddenfield',
			            	typeValue:'hiddenfield'
			        	},/*{
			            	typeName:'tagfield',
			            	typeValue:'tagfield'
			        	},*/{
			            	typeName:'htmleditor',
			            	typeValue:'htmleditor'
			        	}]
				    }
	            },
	            width:200,
	        },{
                text: getLboLangItem('아이템구분'),
                dataIndex:'itemsCls',
                width:100,
				sortable:false,  
	            editor:{
	            	xtype:'textfield'
	            } 
            },{
	        	//xtype:'widgetcolumn',
	            text:'기간여부',
	            name:'fromTo',
	            hidden:true,
	            dataIndex:'fromTo',
	            width:60,
	 			editor:{
	            	xtype:'combobox',
	            	displayField: 'name',
	    			valueField: 'value',
				    store:{
			            fields:['name', 'value'],
			            data:[
			            {
			            	name:'N',
			            	value:'N'
			        	},{
			            	name:'Y',
			            	value:'Y'
			        	}]
			        }
			    }        
	        }];
	    }
    },
    /*
    onBoxReady:function(){
    	console.log('onBoxReady', arguments);
    	
    	//var form = this; //this.down('form');
    	//console.log('form', form);
    	console.log('this', this);
        //var body = form.body;    	
		this.panelDropTarget = new Ext.dd.DropTarget(this, {
            ddGroup: 'dragGroup1',   // 'grid-to-grid',
            notifyEnter: function(ddSource, e, data) {
            	console.log('...notifyEnter');
                //Add some flare to invite drop.
                //body.stopAnimation();
                //body.highlight();
            },
            notifyDrop: function(ddSource, e, data) {
            	console.log('...notifiyDrop');
                // Reference the record (single selection) for readability
                var selectedRecord = ddSource.dragData.records[0];
				console.log('selectedRecord', selectedRecord);
                // Delete record from the source store.  not really required.
                //ddSource.view.store.remove(selectedRecord);
                return true;
            }
        });	
    }   
    */ 
    selectedCol:-1,
    selectedRow:-1,
    getCvsDataFromRecs:function(records){
    	console.log('엑셀복사',records);
    	var clipText = '';
    	var currRow = 0;	// 스토어에서 가져옴.
    	for(var i=0;i <records.length; i++){
    		var r = i;
    		var rec= records[i];
    		var cv = this.initialConfig.columns;
    		console.log('cv',cv);
    		for(var j=0; j < cv.length; j++){
    			var val = rec.data[cv[j].dataIndex];
    			console.log('...' ,val);
    			if(r === currRow){
    				clipText = clipText.concat(val,'\t');
    			}
    			else{
    				currRow = r;
    				clipText = clipText.concat('\n', val, '\t');
    			}
    		}
    		
    	}
    	console.log('엑셀복사결과',clipText);
    	return clipText
    	
    },
    getRecsFromCsv:function(obj, record,ta){
    	//document.body.removeChild(ta);
    	
    	console.log('getRecsFromCsv', obj, record, ta, ta.value);
    	

    	console.log('--->',obj.selectedCol, obj.columns);
;
    	//models[0].set('field1','하하하2');
    	console.log('변환이안된다.');
    	
    	
    	var del = '';
    	if(ta.value.indexOf('\r\n')){
    		del = '\r\n';
    	}
    	else if (ta.value.indexOf('\n')){
    		del = '\n';
    	}
    	var rows = ta.value.trim().split('\n');
   
    	console.log('row',rows);
		console.log(obj.selectedRow +',' +  rows.length + ',' + obj.getStore().getCount());
		console.log(obj.selectedRow + rows.length - obj.getStore().getCount());
		var count = obj.getStore().getCount();
		for(var i=0; i < Number(obj.selectedRow + rows.length - count); i++){
			console.log('추가' + i);
			var data = {
				fieldName:'field',
				fieldKorName:'label name', 
				fieldType:'text',
				fromTo:'N'
			};
			obj.getStore().add(data);
		}    
    	var colLength = obj.columns.length;
    	var models = obj.getStore().getRange();
    	console.log(models);
    	//models[obj.selectedRow].set(obj.columns[obj.selectedCol].dataIndex,'하하하')    	
    	
    	for(var i=0;i <rows.length; i++){
    		var cols = rows[i].split('\t');
    		console.log('cols',cols);
    		
   		
    		for(var j=0; j <cols.length; j++){
    			console.log('exel',obj.columns[obj.selectedCol + j]);
    			if( obj.selectedCol + j >= colLength ){
    				Ext.Msg.alert('확인','복사하려는 엑셀 컬럼수가 그리드의 컬럼수보다 큽니다.');
    				return;
    			}
    			models[this.selectedRow + i].set(obj.columns[obj.selectedCol + j].dataIndex,cols[j]);
    		}
    	}  
    },  
    listeners:{
    	cellClick:function(grid, cell, col,obj, grid2, row){
    		console.log('itemclick',arguments);
    		this.selectedCol = col;
    		this.selectedRow = row;
    	},
    	viewready:function(grid){
    		var me = this;
    		console.log('viewready', grid);
    		var map = new Ext.KeyMap(grid.getEl(),
    			[{
    				key:'c',
    				ctrl:true,
    				fn:function(keyCode, e){
    					var recs = grid.getSelectionModel().getSelection();
    					if(recs && recs.length != 0){
    						var clipText = grid.getCvsDataFromRecs(recs);
    						console.log('처리중', clipText);
    						var ta = document.createElement('textarea');
    						ta.id = 'cliparea';
    						ta.style.position = 'absolute';
    						ta.style.left = '-1000px';
    						ta.style.top = '-1000px';
    						ta.value = clipText;
    						document.body.appendChild(ta);
    						ta.focus();
    						ta.select();
    						console.log('처리중완료');
    						setTimeout(function(){
    							document.body.removeChild(ta);
    						},100);
    					}
    				}
    			},{
    				key:'v',
    				ctrl:true,
    				fn:function(){
    					var ta = document.createElement('textarea');
    					ta.id = 'cliparea',
    					ta.style.position = 'absolute';
    					ta.style.left = '-1000px';
    					ta.style.right = '-1000px';
    					ta.value = '';
    					document.body.appendChild(ta);
    					document.designMode = 'off';
        				setTimeout(function(){
        					grid.getRecsFromCsv(me,grid,ta);
        				},100);
        				ta.focus();
        				ta.select();
    				}
    			}]
    		);
    	}
    }    
});