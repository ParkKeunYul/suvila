Ext.define('ExFrm.view.widget.ExGrid', {
    extend: 'Ext.grid.Panel',
    xtype:'exgrid',
    columnLines:true,
    exIsGridView:true,
    isRootComp:true,
	border:1,
    exInitStr:"{    \n        xtype:'exgrid',\n       width:'100%',        height:250,        store:{ data:[{test1:'가', test2:'A', test3:3},{test1:'나', test2:'2', test3:3},{test1:'다', test2:'2', test3:3}]},\n        columns:[{text:'컬럼1', dataIndex:'test1'},{text:'컬럼2', dataIndex:'test2'},{text:'컬럼3', dataIndex:'test3'}]\n    }",
    viewConfig: {
        stripeRows: true,
		preserveScrollOnRefresh:true
    },
	selModel: {
	    //type: 'spreadsheet',
	    columnSelect: true  // replaces click-to-sort on header
	},	
	plugins: 'clipboard',
	//trailingBufferZone:1000,
	emptyText:'<center>데이터가 존재하지 않습니다.</center>',
    getExcelFile:function(title){
    	if(window.btoa){
    		if(Ext.isIE11p == true){
				// Explorer 테스트
				var ta = document.createElement('textarea');
				//ta.id = 'cliparea';
				ta.style.position = 'absolute';
				ta.style.left = '-1000px';
				ta.style.top = '-1000px';
				var str = this.getHtmlTable(title);
	           	var a = window.open("application/vnd.ms-excel;charset=UTF-8", "_blank", "width=1px,height=1px");
	           	a.document.write(str);
	            a.document.execCommand("SaveAs",true,"엑셀저장.xls");
				setTimeout(function(){
					a.close();
				},100);
				return;	    		
    		}
    		else {
				var models = this.getStore().getRange();
				var modelLength = models.length;
				var columnLength = this.columns.length;
				if(modelLength == 0){
					Ext.Msg.alert('확인','엑셀로 변환할 데이터가 없습니다.');
					return;
				}
				var table = document.createElement('table');
				table.style.position = 'absolute';
				table.style.left = '-1000px';
				table.style.right = '-1000px';
	
				var row = table.insertRow(0);
					var cell = row.insertCell(0);
					cell.innerHTML = title;
				row = table.insertRow(1);
				for(var j=0; j < columnLength; j++){
					var cell = row.insertCell(j);
					//console.log('....',this.columns[j]);
					cell.innerHTML = this.columns[j].text;
				}					
				for(var i=0; i < modelLength; i++){
					row = table.insertRow(i+2);
					for(var j=0; j < columnLength; j++){
						var cell = row.insertCell(j);
						cell.innerHTML = models[i].get(this.columns[j].dataIndex);
					}
				}		
	        	var uri = 'data:application/vnd.ms-excel;base64,';
	        	var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"'+
	        	'xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
	        	'<meta http-equiv="content-type" content="application/vnd.ms-excel;charset=UTF-8"/>' +
	        	'<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>' +        	
	        	'<x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions>' +
	        	'<x:DisplayGridlines/></x:WorkseetOptions></x:ExcelWorksheet></x:ExcelWorksheets>' +
	        	'<x:ExcelWorkbook></xml><![endif]--></head><body><table cellspacing="0" rules="rows"'+
	        	'border="1" style="color:Black;background-color:White;border-color:#CCCCCC;border-width:1px;' +
	        	'border-style:None;width:100%;border-collapse:collapse;font-size:9pt;text-align:left;">' +
	        	'{table}</table></body></html>';
	        	var base64 = function(s){
	       			return window.btoa(unescape(encodeURIComponent(s)));
	        	};
	        	console.log(ctx, '1>>>', window.location.href, template);
	        	var format = function(s,c){
	        		return s.replace(/{(\w+)}/g, function(m,p){return c[p]; });
	        	};
	        	console.log(ctx, '1>>>', window.location.href, template);
				var ctx = {worksheet:name || 'Worksheet', table:table.innerHTML}
				console.log(ctx, '2>>>', window.location.href, template);
				window.location.href = uri + base64(format(template, ctx))
	    		try{
	    			table.remove();
	    		}catch(e){
	    			console.log(e);
	    		}
	    	}
    	}
    	else {
    		
			var models = this.getStore().getRange();
			var modelLength = models.length;
			var columnLength = this.columns.length;
			if(modelLength == 0){
				Ext.Msg.alert('확인','엑셀로 변환할 데이터가 없습니다.');
				return;
			}		
			var ExcelApp = new ActiveXObject('Excel.Application');
			var ExcelSheet = new ActiveXObject('Excel.Sheet');
			ExcelSheet.Application.Visible = true;
			
			ExcelSheet.ActiveSheet.Cells(1,1).Value = title;			
			for(var j=0; j < columnLength; j++){
				ExcelSheet.ActiveSheet.Cells(2,j+1).Value = this.columns[j].text;
			}					
			for(var i=0; i < modelLength; i++){
				for(var j=0; j < columnLength; j++){
					ExcelSheet.ActiveSheet.Cells(i+3,j+1).Value = models[i].get(this.columns[j].dataIndex);
				}
			}
			ExcelSheet.SaveAs('C:\\download.xls');
			ExcelApp.Workbooks.Open('C:\\download.xls');
    	}
    },
    getHtmlTable:function(title){
    	console.log('html:',this);
    	//debugger;
		var models = this.getStore().getRange();
		console.log('this.getStore()',this.getStore());

		var modelLength = models.length;
		var columnLength = this.columns.length;
		var strReturn = '<div>' + title + '</div><br>\n';
		strReturn += '<table width="100%" border="1">\n<tr>';
		for(var j=0; j < columnLength; j++){
			//ExcelSheet.ActiveSheet.Cells(2,j+1).Value = this.columns[j].text;
			strReturn = strReturn + '<th>' + this.columns[j].text + '</th>';
		}					
		strReturn += '</tr>\n';
		console.log('modelLength' + modelLength);
		for(var i=0; i < modelLength; i++){
			strReturn += '<tr>';
			for(var j=0; j < columnLength; j++){
				//ExcelSheet.ActiveSheet.Cells(i+3,j+1).Value = models[i].get(this.columns[j].dataIndex);
				strReturn = strReturn + '<td>' + models[i].get(this.columns[j].dataIndex) + '</td>';
			}
			strReturn += '</tr>\n';
		}
		strReturn += '</table><br/>\n';
		return strReturn;
    },    
	initComponent:function(config){
		this.callParent(arguments);
		/*
		this.on('viewready',function(grid){
			var me = this;
			console.log('viewready', grid);
			var map = new Ext.KeyMap(grid.getEl(),
				[{
					key:'c',
					ctrl:true,
					fn:function(keyCode, e){
						console.log('keyCode', keyCode);
						var recs = grid.getSelectionModel().getSelection();
						console.log('recs', grid.getSelectionModel(),recs);
						console.log('recs2', grid.getSelectionModel().getSelection(),recs);
											
												
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
							Ext.toast({
					             html: 'Copy complete',
					             title: 'copy',
					             width: 200,
					             align: 'br'
					         }).show();
						}
					}
				}]
			);
			
		});	
		*/	
	},
    setNumberFormat:function(val){
    	var valc = (val + "").replace('/,/g','') + '';
		var n = valc.indexOf('.');
		var fval = valc.substring(0,n);
		var rval = valc.substring(n+1);
		//console.log('fval, rval', fval, rval, n);
		if(n == null || n== -1){
			console.log('superclass' + this.superclass);
			return Ext.util.Format.number(valc, '0,000');
		}
		else{
			return Ext.util.Format.number(fval, '0,000') + '.' + rval;
		}
    },	
    setExSummaryGrid:function(gridType, fieldName, plusminus1, fieldName1, plusminus2, fieldName2, plusminus3, fieldName3, plusminus4, fieldName4, plusminus5, fieldName5){
    	if(gridType == 'sum'){
    		console.log('gridType = ', gridType);
    		var ret=0;
    		this.getStore().each(function(record){
    			if(record.get(fieldName) != ''){
    				var val = Number(record.get(fieldName));
    				ret += val;
    			}
    		});
    		return ret;
    	}
    	else if(gridType == 'max'){
    		var ret=0;
    		var i=0;
    		this.getStore().each(function(record){
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
    	else if(gridType == 'min'){
    		var ret=0;
    		var i=0;
    		this.getStore().each(function(record){
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
    	else if(gridType == 'count'){
    		var ret=0;
    		this.getStore().each(function(record){
    			ret++;
    		});
    		return ret;
    	}
    }	
})