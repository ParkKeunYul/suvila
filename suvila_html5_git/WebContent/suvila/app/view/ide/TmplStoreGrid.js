Ext.define('ExFrm.view.ide.TmplStoreGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.tmplstoregrid',
    width:700,
    height:200,
    bodyBorder:true,
    border:true,
    kind:'',
	storeName:'',
    isRootComp:true,
    initComponent:function(){
        var me = this;
        Ext.apply(this, {
			columns:this.getColumnConfig(),
        	tools:[{
        		type:'plus',
        		tooltip:'add row',
        		handler:function(event, toolEL, panel){
        			var data = {
                        kind:this.up('[isRootComp=true]').kind, // storeKind
						storeName:this.up('[isRootComp=true]').storeName, // storeKind
						fieldName:'field',      // 필드명
						fieldKorName:'',        // 한글명 - 미사용
						fieldType:'text',      // 텍스트, 숫자 
                        fieldLength:'1',        // 필드길이  (미입력시 임의)
                        groupField:'N'          //'':일반 Y:그룹필드 
					};
        			this.up('grid').getStore().add(data);
					  
					//data.destroy();
					   			
        		}
        	},{
        		type:'minus',
        		tooltip:'remove row',
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
		    store:{
		    	fields:['fieldName','fieldKorName', 'fieldType', 'fieldLength', 'groupField', 'kind', 'storeName'],
		    	autoLoad:false,
		    },
	        enableDragDrop: true       
            
        });
        me.callParent(arguments);
    },
/*
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

*/
    
    getColumnConfig:function(){

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
            text: getLboLangItem('타입'),
            width:100,
            dataIndex:'fieldType',
            name:'fieldType',
			sortable:false,  
            editor:{
                xtype:'combobox',
                queryMode:'local',
                editable:false,
                allowBlank:false,
                displayField: 'typeName',
                valueField: 'typeValue',
                store:{
                    fields:['typeName', 'typeValue'],
                    data:[
                   {
                        typeName:'text',
                        typeValue:'text'
                    },{
                        typeName:'text(kor)',
                        typeValue:'text(kor)'
                    },{
                        typeName:'text(date)',
                        typeValue:'text(date)'
                    },{
                        typeName:'text(name)',
                        typeValue:'text(name)'
                    },{
                        typeName:'text(address)',
                        typeValue:'text(address)'
                    },{
                        typeName:'text(tel)',
                        typeValue:'text(tel)'
                    },{
                        typeName:'text(mobile)',
                        typeValue:'text(mobile)'
                    },{
                        typeName:'text(email)',
                        typeValue:'text(email)'
                    },{
                        typeName:'text(zip)',
                        typeValue:'text(zip)'
                    },{
                        typeName:'number',
                        typeValue:'number'
                    },{
                        typeName:'number(money)',
                        typeValue:'number(money)'
                    },{
                        typeName:'number(percent)',
                        typeValue:'number(percent)'
                    },{
                        typeName:'number(point)',
                        typeValue:'number(point)'
                    },{
                        typeName:'boolean',
                        typeValue:'booolean'
                    }]
                }
            },
            width:200,
        },{
            text: getLboLangItem('길이'),
            name:'fieldLength',
            dataIndex:'fieldLength',
            width:100,
			sortable:false,  
            editor:{
                xtype:'textfield',
                value:''
            }       
        },{
            text: getLboLangItem('그룹필드'),
            dataIndex:'groupField',
            name:'groupField',
			sortable:false,  
            editor:{
                xtype:'combobox',
                queryMode:'local',
                editable:false,
                allowBlank:false,
                displayField: 'display',
                valueField: 'value',
                store:{
                    fields:['display', 'value'],
                    data:[
                    {
                        display:'N',
                        value:'N'
                    },{
                        display:'Y',
                        value:'Y'
                    }]
                }
            },
            width:100,
        },{
            text: getLboLangItem('스토어 종류'),
            dataIndex:'kind',
            width:100,
			sortable:false,  
            editor:{
                xtype:'textfield'
            }                 
        },{
            text: getLboLangItem('스토어명'),
            dataIndex:'storeName',
            width:100,
			sortable:false,  
            editor:{
                xtype:'textfield'
            }                 
        },{
            text: getLboLangItem('타이틀명'),
            dataIndex:'fieldKorName',
            width:200,
            hidden:true,
			sortable:false,  
            editor:{
                xtype:'textfield'
            }
        }];			
 
    },
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
				fieldType:'text',
				fieldLength:'1',
                groupField:'N',
                //kind:this.up('[isRootComp=true]').kind, // storeKind  여기
                fieldKorName:'필드명'
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