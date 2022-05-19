Ext.define('ExFrm.view.widget.ExFileMultiGrid', {
    extend: 'Ext.panel.Panel',
    xtype:'exfilemultigrid',
    exInitStr:"{    \n        xtype:'exfilemultigrid' }",
    layout:'hbox',
    height:120,	
    cls:'exfilemultigrid',
    setExReadOnly:function(val){
		if(val==true){
			//this.setReadOnly(true);
			//this.down('[name=fieldFile]').disabled = true;
			//this.setFieldStyle('background:lightgray');
			for(var i =0; i< 10; i++){
				this.down('filefield[name=fieldFile' + i +']').hide();
			}
		}
		else{
			this.setReadOnly(false);
			//this.setFieldStyle('background:white');
			for(var i =0; i< 10; i++){
				if(this.down('filefield[name=fieldFile' + i +']').getValue() == ''){
					this.down('filefield[name=fieldFile' + i +']').show();
				}
			}			
		}
    },	
    showFileList:function(fileName){
		if(fileName == null || fileName == ''){
			this.down('grid').getStore().removeAll();
			return;
		}
		this.down('grid').getStore().removeAll();
		for(var i =0; i< 10; i++){
			this.down('filefield[name=fieldFile' + i +']').reset();			
		}		
		this.down('[name=pefAtchMngmNo]').setValue(fileName);
		this.down('[name=fileMdfcYn]').setValue('N');
		this.down('grid').getStore().load({
			params:{
				pefAtchMngmNo:fileName
			},
			callback:function(records, operation, success){
				if(success == false){
					Ext.Msg.alert('오류','첨부파일을 읽기 도중 오류가 발생했습니다.');
				}
			}
		});		
	},
	setMulti:function(){
		/*
		this.down('filefield').cmp.fileInputEl.set({
            multiple:'multiple'
        });
        */
        // 강제로제거
        /*
		for(var i =0; i< 10; i++){
			this.down('filefield[name=fieldFile' + i +']').cmp.fileInputEl.set({
				multiple:'multiple'
			});
		} 
		*/       
	},
	setReset:function(){
		this.down('grid').getStore().removeAll();
		for(var i =0; i< 10; i++){
			this.down('filefield[name=fieldFile' + i +']').reset();			
		}
	},
	setEncode:function(){
		var me = this;
    	var myItems = this.down('grid').getStore().getRange();
    	var myJson = [];
    	for(var i in myItems){     		
			// 삭제여부가 체크된 항목을 보냄.
			if(myItems[i].get('delCls')==true){
				if(myItems[i].get('newCls') == 'A'){
					//Ext.Msg.confirm('확인', '해당파일을 삭제하시겠습니까?', function);
					Ext.Msg.confirm('확인', '해당 파일을 삭제하시겠습니까?', function(btn){
						if(btn == 'yes'){
							console.log('yes');
							var j=0;
							me.down('grid').getStore().each(function(record){
								if(j == 0){								
									console.log('record', record);
									console.log('A', record.get('newCls'));
					    			if(record.get('newCls') == 'A'){					    				
					    				if(record.get('delCls') == true){
					    					me.down('filefield[name=fieldFile' + record.get('filefieldSeq') +']').reset();
					    					me.down('grid').getStore().remove(record);
					    					me.selectFileField();
											j++;
					    				}					    				
					    			}
				    			}
				    		});
						}
						else{
							console.log('no');
							me.down('grid').getStore().each(function(record){
				    			if(record.get('newCls') == 'A'){					    				
				    				if(record.get('delCls') == true){
				    					record.set('delCls', false);
				    				}					    				
				    			}
				    		});
						}
					});
					break;
				}
				else{
		    		myJson.push({
		    			'pefAtchMngmNo':myItems[i].get('pefAtchMngmNo'),
		    			'pefAtchDtlSrn': myItems[i].get('pefAtchDtlSrn'),
		    			'delCls': myItems[i].get('delCls')
		    		});
	    		}
	    	}
    	}
    	if(myJson.length > 0){
    		console.log(Ext.encode(myJson));
    		this.down('[name=pefAtchMngmGridCont]').setValue(Ext.encode(myJson));
    	}
    	else {
    		this.down('[name=pefAtchMngmGridCont]').setValue('');
    	}
	},
	items:[ 
	{
		xtype:'hidden',
		name:'pefAtchMngmNo',
		reference:'pefAtchMngmNo',		      
		value:'' 
	},{
		xtype:'hidden',
		name:'fileMdfcYn',
		value:'N'
	},{
		xtype:'hidden',
		name:'pefAtchMngmGridCont',
		reference:'pefAtchMngmGridCont',
		value:'N'
	},{
    	xtype:'grid',
    	height:118,
    	width:600,
    	//hideHeaders:true,
    	store:{
            fields:['pefAtchMngmNo','pefAtchDtlSrn','pefAtchDcd','pefAtchNm','pefOrglFileNm','pefAdfsVl','dnldNbt'],
            config:{
                proxy:{
                    type:'ajax',
                    url:'/cmmn/AtachFileList.do',
                    reader:{
                        type:'json',
                        rootProperty:'data.list1',
                        keepRawData:true
                    }
                },
                autoLoad:false
            }
    	},
    	columns:[
        {
            text:'첨부파일관리번호',
            dataIndex:'pefAtchMngmNo',
            //flex:1,
            value:true,
            hidden:true,            
        },{
            text:'일련번호',
            dataIndex:'pefAtchDtlSrn',
            //flex:1,
            hidden:true,
        },{
        	xtype:'checkcolumn',
        	text:'삭제구분',
        	width:60,
        	//cls:'btn_basic',
        	dataIndex:'delCls',
        	listeners:{
        		checkchange:function(){
        			console.log('change', arguments);
        			this.up('grid').up('panel').setEncode();
        		}
        	}
        },{
        	text:'추가구분',
        	width:60,
        	hidden:true,
        	dataIndex:'newCls'
        	/*
        	renderer:function(val){
        		if(val == '추가'){
        			return '추가';
        		}
        		return ' '
        	}
        	*/
        },{
            text:'파일구분',
            dataIndex:'pefAtchDcd',
            //flex:1,
            hidden:true,
        },
        {
            text:'파일명',
            dataIndex:'pefAtchNm',
            //flex:1,
            hidden:true,
        },
        {
            text:'파일명',
            dataIndex:'pefOrglFileNm',
            width:400,
            //flex:10,
        },{
        	text:'다운로드',
        	dataIndex:'pefAtchNm',
        	width:50,
        	flex:3,
        	align:'center',
            renderer:function(val, meta, record){
            	if(record.data.newCls == 'A'){
            		return '추가';
            	}
            	else {
            		return '<a href="/cmmn/fileDownload.do?pefAtchMngmNo=' + record.data.pefAtchMngmNo + '&pefAtchDtlSrn='+ record.data.pefAtchDtlSrn + '" target="_blank"><img src="./resources/img/ico_file.png"></a>';
            	}
            }
        }],
		listeners:{
			itemdblclick:function(){
				
			},
			itemclick:function(){
				console.log('...1');
				this.up('panel').setEncode();
			},
			itemchanged:function(){
				console.log('...2');
			},
			checkchanged:function(){
				console.log('...2233');
			},
			itemselected:function(){
				console.log('...');
			}	
		}
    },{
    	xtype:'tbspacer',
    	width:30
    },{
    	width:100,
    	layout:'vbox',
    	items:[
		{
            xtype:'filefield', 
            name:'fieldFile0',
            reference:'fieldFile0',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',			
		    buttonOnly:true,
		    buttonText:'파일',
			cmp:{}, 
			setMulti:function(){
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile1',
            reference:'fieldFile1',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
		    buttonOnly:true,
		    hidden:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile2',
            reference:'fieldFile2',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
		    buttonOnly:true,
		    hidden:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile3',
            reference:'fieldFile3',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
			hidden:true,
		    buttonOnly:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
			},
		    listeners:{
		        afterrender:function(cmp){

		        	console.log('cmp',cmp);
		        	this.cmp = cmp;
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });

		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile4',
            reference:'fieldFile4',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
			hidden:true,
		    buttonOnly:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
		        
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;		        
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile5',
            reference:'fieldFile5',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
			hidden:true,
		    buttonOnly:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
		        
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;		        
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile6',
            reference:'fieldFile6',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
			hidden:true,
		    buttonOnly:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
		        
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;		        
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile7',
            reference:'fieldFile7',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
			hidden:true,
		    buttonOnly:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
		        
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;		        
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile8',
            reference:'fieldFile8',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
			hidden:true,
		    buttonOnly:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
		        
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;		        
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
            xtype:'filefield', 
            name:'fieldFile9',
            reference:'fieldFile9',
            buttonConfig:{
            	baseCls:'btn_file_sel',
            },
			labelSeparator : '',
			hidden:true,
		    buttonOnly:true,
		    buttonText:'',
			cmp:{}, 
			setMulti:function(){
				
				this.cmp.fileInputEl.set({
		            multiple:'multiple'
		        });
		        
			},
		    listeners:{
		        afterrender:function(cmp){
		        	console.log('cmp',cmp);
		        	this.cmp = cmp;		        
		            cmp.fileInputEl.set({
		                multiple:'multiple'
		            });
		        },
		        change:function(){
		        	this.up('exfilemultigrid').selectFileField();
		        }
		    }                    
        },{
        	xtype:'tbspacer',
        	height:5
        },{
        	xtype:'button',
        	width:66,
        	cls:'btn_reloading',
        	handler:function(){      
				for(var i =0; i< 10; i++){
					this.up('panel').down('filefield[name=fieldFile' + i +']').reset();			
				}        		  		
        		this.up('panel').previousSibling('[name=fileMdfcYn]').setValue('N');
        		if(this.up('panel').previousSibling('[name=pefAtchMngmNo]').getValue() == ''){
        			this.up('panel').previousSibling('grid').getStore().removeAll();
        		}
        		else {
        			this.up('panel').previousSibling('grid').getStore().load({
	        			params:{
	        				pefAtchMngmNo:this.up('panel').previousSibling('[name=pefAtchMngmNo]').getValue()
	        			},
	        			callback:function(records, operation, success){
	        				if(success == false){
	        					Ext.Msg.alert('오류','첨부파일을 읽기 도중 오류가 발생했습니다.');
	        				}
	        			}
	        		});
        		}
        	}		                	
        }/*,{
        	xtype:'button',
        	text:'삭제',
        	width:60,
        	handler:function(){
        		this.up('panel').previousSibling('[name=fileMdfcYn]').setValue('Y');
        		this.up('panel').previousSibling('grid').getStore().loadData([], false);

        	}
        }*/
   		        
        ]
    }],
    initComponent:function(){
    	this.callParent(arguments);
    	if(this.exGridWidth != null && this.exGridWidth != ''){
    		this.down('grid').setWidth(this.exGridWidth);
    	}
    },
    selectFileField:function(){
    	var me = this;
    	for(var i=0; i<10;i++){
    		this.down('filefield[name=fieldFile' + i +']').hide();
    	}
    	for(var i=0; i<10;i++){
    		console.log('>>>' + i,this.down('filefield[name=fieldFile' + i +']').getValue());
	    	if(this.down('filefield[name=fieldFile' + i +']').getValue() == ''){
	    		this.down('filefield[name=fieldFile' + i +']').show();
	    		break;
	    	}
    	}
    	//this.down('grid').getStore().removeAll();
		var count = 0;
		var r = new Array();
		me.down('grid').getStore().each(function(record){
			if(record.get('newCls') == 'A'){
				r[count] = record;
				count++;
			}
		});    	
		for(var i=0; i<count; i++){
			me.down('grid').getStore().remove(r[i]);
		}    	
    	for(var i=0; i<10; i++){    		
    		var ff = this.down('filefield[name=fieldFile' + i +']');
    		console.log('i:', i);    		
    		if(ff.getValue() != ''){
    			console.log('공백이아닌i:', i);
				this.down('[name=fileMdfcYn]').setValue('Y');				
				console.log('isIE9', Ext.isIE9);
				if(Ext.isIE9 == true){
		        	var files = ff.getValue().replace(/C:\\fakepath\\/g,'');
			    	var data = {
			    		newCls:'A',
			    		delCls:false,
			    		filefieldSeq:i,
			    		pefAtchMngmNo:'',
			    		pefOrglFileNm:files,
			    	};
			    	console.log('data' + i, temp)
					this.down('grid').getStore().add(data);     								
				}
				else {
		        	var files = ff.fileInputEl.dom.files;
		        	console.log(ff.fileInputEl);
		        	var temp = "";
		        	for(j=0; j<files.length; j++){
		        		temp = temp + files[j].name + '\n';
		        	}
			    	var data = {
			    		newCls:'A',
			    		delCls:false,
			    		filefieldSeq:i,
			    		pefAtchMngmNo:'',
			    		pefOrglFileNm:temp,
			    	};
			    	console.log('data' + i, temp)
					this.down('grid').getStore().add(data);     			
				}
    		}
    	}
    }
})