Ext.define('ExFrm.view.widget.column.ExColumnGroup', {
    extend: 'Ext.grid.column.Column',
    xtype:'excolumngroup',    
    exType:'',          // number, date, array, user
    exAlign:'',         // left, center, right
    exFormat:'',        // date, number, normal
    exUserString:'',    //  총 {0}개
    exUserRecords:[],   // ['test1', 'test2', 'test3']
	exColor:'',
	exFontColor:'',
	exGroupIndex:-1,
	exTopLine:true,
	exSummaryColor:'',
	exSummaryFontColor:'',
    sortable:false,     // 기본적으로 false로 변경
    style: 'text-align:center',
    exHidden:false,     //
    exSummaryType:'',   // sum, max, min, avg, count, groupsum, groupmin, groupmax, groupavg, groupcount
    //exRecord:'',
    renderer: function (value, meta, record, rowIndex, colIndex, store, view) {
        var headerCt = this.getHeaderContainer(),
        column = headerCt.getHeaderAtIndex(colIndex);
        if(column.exType=='number'){
            value = exCommon.setNumberFormat(value);
        }
        else if(column.exType=='date'){
            value = exCommon.setDateFormat(value);
        }
        else if(column.exType=='array'){
            //console.log('renderer', value);
            var ret = '';
            for(var i=0; i < value.length; i++){
                if(i != 0)
                {
                    if(value[i] != null && (value[i] == '' || value[i] == ' ')){
                        ret = ret + '<br><div>&nbsp;</div>';
                    }
                    else {
                        ret = ret + '<hr border="0.2px" style="color:gray"><div>' + value[i] + '</div>';
                    }
                }
                else {
                    ret = ret + '<div>' + value[i] + '</div>';
                }
            }
            return ret;            
        }
        else if(column.exType=='user'){
            //console.log('renderer1', column);
            //console.log('renderer2',column.exUserRecords);
            
            if(column.exUserRecords.length == 0){
                value = Ext.String.format(column.exUserString);
            }
            else if(column.exUserRecords.length == 1){
                value = Ext.String.format(column.exUserString, record.get(column.exUserRecords[0]));
            }
            else if(column.exUserRecords.length == 2){
                value = Ext.String.format(column.exUserString, record.get(column.exUserRecords[0]), record.get(column.exUserRecords[1]));
            }
            else if(column.exUserRecords.length == 3){
                value = Ext.String.format(column.exUserString, record.get(column.exUserRecords[0]), record.get(column.exUserRecords[1]), record.get(column.exUserRecords[2]));
            }
            else if(column.exUserRecords.length == 4){
                value = Ext.String.format(column.exUserString, record.get(column.exUserRecords[0]), record.get(column.exUserRecords[1]), record.get(column.exUserRecords[2]), record.get(column.exUserRecords[3]));
            }
            else if(column.exUserRecords.length == 5){
                value = Ext.String.format(column.exUserString, record.get(column.exUserRecords[0]), record.get(column.exUserRecords[1]), record.get(column.exUserRecords[2]), record.get(column.exUserRecords[3]), record.get(column.exUserRecords[4]));
            }                                               
        }
		if(column.exColor != null && column.exColor != ''){
			if(meta.style == null)
				meta.style = '';
			meta.style = 'background-color:' + column.exColor + ';';
		}

		console.log('exTopLine', column.exTopLine);
		if(column.exTopLine == true){
			meta.tdCls = 'exspanline';
		}
		else {
			meta.tdCls = 'exspanlinenone';
		}

		console.log('view.grid.exGroupFields.length', view.grid.exGroupFields.length);
		var count = -1;
		for(var i=0; i < view.grid.exGroupFields.length; i++){
			if(view.grid.exGroupFields[i] == column.dataIndex){
				count = i;
				break;
			}
		}	
		var firstAll = false;		
		console.log('count' + column.dataIndex, count);
		for(var i=0; i <= count; i++){
			//if(view.grid.exGroupFields[i] == column.exGroupField){
			console.log('dataIndex:::', column.dataIndex + ':::' + view.grid.exGroupFields[i]);
			var first = !rowIndex || store.getAt(rowIndex).get(view.grid.exGroupFields[i]) !== store.getAt(rowIndex - 1).get(view.grid.exGroupFields[i]), 
			last = rowIndex >= store.getCount() - 1 || store.getAt(rowIndex).get(view.grid.exGroupFields[i]) !== store.getAt(rowIndex + 1).get(view.grid.exGroupFields[i]); 
			//console.log('orgValue', orgValue, '>:', last, '>>:', store.getAt(rowIndex + 1).get(view.grid.exGroupFields[i]));
			//console.log('first', first, last);
			if(first == true){
				firstAll = true;
			}
			
			if(last){
				//meta.style+='border-bottom: 1px solid #ededed;';
				meta.style+=  view.grid.exBorderStyle; 
				break;
			}
			else{ 
			} 
		}
		if(count == -1){
			meta.tdCls = 'exspanline';
		}
		else {
			if(firstAll == false){
				value = '';
				meta.tdCls = 'exspanlinenone';
			}
		}
		//return firstAll ? value : ''; 

		//meta.tdCls = 'exspanline';



		var orgValue = value;
		if(column.exFontColor != null && column.exFontColor != ''){
			value = '<font color="' + column.exFontColor + '">' + value + '</font>';
		}
		value = column.onRenderer(orgValue, value, meta, record, rowIndex, colIndex, store, view);
        return value;
    },
	onRenderer:function (orgValue, value, meta, record, rowIndex, colIndex, store, view){
		return value;
	},

    summaryRenderer:function(value, meta, data ){
    	
        var fieldName = this.dataIndex;
    	if(this.exSummaryType == 'sum'){
            console.log('summaryRenderer');
            
    		var ret=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			if(record.get(fieldName) != ''){
    				var val = Number(record.get(fieldName));
    				ret += val;
    			}
    		});
    		return exCommon.setNumberFormat(ret);
    	}
    	else if(this.exSummaryType == 'max'){
    		var ret=0;
    		var i=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			if(record.get(fieldName) != ''){
    				var val = Number(record.get(fieldName));
    				if(i==0)
    					ret = val;
    				if(val > ret)
    					ret = val;
    				i++;
    			}
    		});
    		return exCommon.setNumberFormat(ret);
    	}
    	else if(this.exSummaryType == 'min'){
    		var ret=0;
    		var i=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			if(record.get(fieldName) != ''){
    				var val = Number(record.get(fieldName));
    				if(i==0)
    					ret = val;
    				if(val < ret)
    					ret = val;
    				i++;
    			}
    		});
    		return exCommon.setNumberFormat(ret);
    	}
    	else if(this.exSummaryType == 'count'){
    		var ret=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			ret++;
    		});
            return exCommon.setNumberFormat(ret);
    	}
		/*
    	else if(this.exSummaryType == 'groupsum'){
    		return exCommon.setNumberFormat(value);
    	}
    	else if(this.exSummaryType == 'groupmax'){
    		return exCommon.setNumberFormat(value);
    	}
    	else if(this.exSummaryType == 'groupmin'){
    		return exCommon.setNumberFormat(value);
    	}
    	else if(this.exSummaryType == 'groupcount'){
    		return exCommon.setNumberFormat(value);
    	}
    	else if(this.exSummaryType == 'groupavg'){
    		return exCommon.setNumberFormat(value);
    	}
		*/
		/*
    	else if(this.exSummaryType == 'groupmax'){
    		var ret=0;
    		var i=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			if(record.get(fieldName) != ''){
    				var val = Number(record.get(fieldName));
    				if(i==0)
    					ret = val;
    				if(val > ret)
    					ret = val;
    				i++;
    			}
    		});
    		return exCommon.setNumberFormat(ret);
    	}
    	else if(this.exSummaryType == 'groupmin'){
    		var ret=0;
    		var i=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			if(record.get(fieldName) != ''){
    				var val = Number(record.get(fieldName));
    				if(i==0)
    					ret = val;
    				if(val < ret)
    					ret = val;
    				i++;
    			}
    		});
    		return exCommon.setNumberFormat(ret);
    	}
    	else if(this.exSummaryType == 'groupcount'){
    		var ret=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			ret++;
    		});
            return exCommon.setNumberFormat(ret);
    	}
        */
        /*        
        
        if( this.exSummaryType=='groupsum' ||
            this.exSummaryType=='groupavg' ||
            this.exSummaryType=='groupcount' ||
            this.exSummaryType=='groupmin' ||
            this.exSummaryType=='groupmax' ){
               return exCommon.setNumberFormat(value); 
        }
        */
        return value;
    },
    summaryType:function(records){

		console.log('1...중요....', records);
		/*
        var me = this;
        var fieldName = me.dataIndex;
    	if(this.exSummaryType == 'groupsum'){
    		var ret=0;
    		records.each(function(record){
    			if(record.get(fieldName) != ''){
					console.log('...중요....', record.get(fieldName));
					var temp = record.get(fieldName).replace(',','');
    				var val = Number(record.get(temp));
    				ret += val;
    			}
    		});
    		return ret;
    	}
    	else if(this.exSummaryType == 'groupmax'){
    		var ret=0;
    		var i=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			if(record.get(fieldName) != ''){
    				var val = Number(record.get(fieldName));
    				if(i==0)
    					ret = val;
    				if(val > ret)
    					ret = val;
    				i++;
    			}
    		});
    		return ret;
    	}
    	else if(this.exSummaryType == 'groupmin'){
    		var ret=0;
    		var i=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			if(record.get(fieldName) != ''){
    				var val = Number(record.get(fieldName));
    				if(i==0)
    					ret = val;
    				if(val < ret)
    					ret = val;
    				i++;
    			}
    		});
    		return ret;
    	}
    	else if(this.exSummaryType == 'groupcount'){
    		var ret=0;
    		this.up('[exIsGridView=true]').getStore().each(function(record){
    			ret++;
    		});
    		return ret;
    	}    
		*/
    },   
    initComponent:function(){
        if(this.exType == 'number' ||
           this.exSummaryType == 'sum' ||
           this.exSummaryType == 'max' ||
           this.exSummaryType == 'min' ||
           this.exSummaryType == 'count' ||
           this.exSummaryType == 'avg' ||
           this.exSummaryType == 'groupsum' ||
           this.exSummaryType == 'groupmax' ||
           this.exSummaryType == 'groupmin' ||
           this.exSummaryType == 'groupcount' ||
           this.exSummaryType == 'groupavg'            
           ){
            this.align='right';
        }
        else if(this.exType=='date'){
            this.align="center";
        }
        else if(this.exType=='string'){
            this.align="left";
        }
        else {
            this.align="center";
        }
        if(this.exAlign != null && this.exAlign != '' && this.exAlign != ' '){
            this.align= this.exAlign;
        }
        if(this.exHidden != null && this.exHidden != '' && this.exHidden != ' '){
            this.hidden= this.exHidden;
        }
        
        if(this.exSummaryType == 'groupsum'){
            this.summaryType = 'sum';
        }
        else if(this.exSummaryType == 'groupcount'){
            this.summaryType = 'count';
        }
        else if(this.exSummaryType == 'groupmax'){
            this.summaryType = 'max';
        }
        else if(this.exSummaryType == 'groupmin'){
            this.summaryType = 'min';
        }
        else if(this.exSummaryType == 'groupavg'){
            this.summaryType = 'avg';
        }                                
        this.callParent(arguments);
    }
})