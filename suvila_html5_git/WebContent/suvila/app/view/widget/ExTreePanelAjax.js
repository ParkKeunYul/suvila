Ext.define('ExFrm.view.widget.ExTreePanelAjax', {
    extend: 'Ext.tree.Panel',
    xtype:'extreepanelajax',
    cls:'extreepanelajax',
    exInitStr:"{    \n        xtype:'extreepanelajax',\n        displayField:'display',\n        height:200,\n        width:200,\n        border:1,\n        exFieldData:['display','value']    }",
	header:false,
	border:1,
    rootVisible:false,
    displayField:'display',
    exFieldData:['display', 'value'],
	store:{
		type:'tree',
		fields:['display','value'],
		reader:{
			type:'json',
			root:{
				expanded:true
			}
		}
	},
	setData:function(record){
		var me = this;
  		var node = me.getRootNode();
  		//console.log(node);
	    while (node.hasChildNodes()) {
	    	console.log(node);
	        node.removeChild(node.childNodes[0]);
	    }
        me.getRootNode().appendChild(record.children);
        me.getRootNode().expand();		
	},
	regData:function(record){
		var me = this;
  		var node = me.getRootNode();
  		//console.log(node);
	    while (node.hasChildNodes()) {
	    	console.log(node);
	        node.removeChild(node.childNodes[0]);
	    }
        me.getRootNode().appendChild(record.children);
        me.getRootNode().expand();		
	},
    readData:function(treeObj){
		var me = this;
    	var tree = treeObj;
    	//console.log(tree.getStore().getData());
    	var list1 = tree.getStore().getData();
    	var recList = [];
    	
    	for(var i=0; i <list1.items.length && list1.items[i].data.depth==1; i++){  //
    		var myData = list1.items[i].data;
    		//console.log('myData',myData);
    		var rec= [];
    		rec.push(myData);
    		recList.push(rec);
    		if(myData.hasOwnProperty('children') && myData.children != null){
    			for(var j=0; j<myData.children.length; j++){
    				var myData1 =myData.children[j];
    				//console.log('myData1',myData1);
    				var rec= [];
		    		rec.push(myData);
		    		rec.push(myData1);
		    		recList.push(rec);    				
		    		if(myData1.hasOwnProperty('children') && myData1.children != null){
		    			for(var k=0; k<myData1.children.length; k++){
		    				var myData2 =myData1.children[k];
		    				//console.log('myData2',myData2);
		    				var rec= [];
				    		rec.push(myData);
				    		rec.push(myData1);
				    		rec.push(myData2);
				    		recList.push(rec);		    				
				    		if(myData2.hasOwnProperty('children')  && myData2.children != null){
				    			for(var l=0; l<myData2.children.length; l++){
				    				var myData3 =myData2.children[l];
				    				//console.log('myData3',myData3);
						    		rec.push(myData);
						    		rec.push(myData1);
						    		rec.push(myData2);
						    		rec.push(myData3);
						    		recList.push(rec);				    				
						    		if(myData3.hasOwnProperty('children') && myData3.children != null){
						    			for(var m=0; m<myData3.children.length; m++){
						    				var myData4 =myData3.children[m];
						    				//console.log('myData4',myData4);
								    		rec.push(myData);
								    		rec.push(myData1);
								    		rec.push(myData2);
								    		rec.push(myData3);
								    		rec.push(myData4);
								    		recList.push(rec);							    				
						    			}
						    		}				    				
				    			}
				    		}		    				
		    			}
		    		}    				
    			}
    		}
    		//var obj = {id0:name:list1[i].data.id, name0:list1[i].data.name, code0:list1[i].data.code, id1:'', name1:'', id2:'', name2:''}
    	}
    	for(var i=0; i< recList.length; i++){
    		console.log('recList : '+recList[i]);
    	}
    	return recList;
    },
    readTreeData:function(treeObj){
    	//var me.exFieldData = ['name', 'code'];
    	var me=this;
    	var tree = treeObj;
    	//console.log(tree.getStore().getData());
    	var list1 = tree.getStore().getData();
    	
    	//console.log('list1', list1);
    	var ret = '{\n    id:"rootNode",\n    children:[';
    	for(var i=0; i<list1.items.length  ; i++){
    		var myData = list1.items[i].data;
    		console.log('myData',myData);
			if(i==0){
				ret = ret+ '    {\n';
			}
			else {
				ret = ret+ ',{\n';
			}    		
    		for(var x=0; x< me.exFieldData.length; x++){
    			var val = myData[me.exFieldData[x]];
    			if(val == 'undefined'){
    				val = '';
    			}
	    		ret = ret+ '    ' + me.exFieldData[x] + ':"' + val+ '"';
	    		if(x != me.exFieldData.length-1){
	    			ret = ret + ',\n';
	    		}
	    	}
    		if(myData.hasOwnProperty('children') && myData.children != null){
    			ret = ret+ ',\n    ' + 'children:[\n';
    			for(var j=0; j<myData.children.length; j++){
    				var myData1 =myData.children[j];
    				//console.log('myData1',myData1);
    				//ret = ret+ '    {\n';
					if(j==0){
    					ret = ret+ '    {\n';
    				}
    				else {
	    				ret = ret+ ',{\n';
	    			}		    				    				
		    		for(var x=0; x< me.exFieldData.length; x++){
		    			var val = myData1[me.exFieldData[x]];
		    			if(val == 'undefined'){
		    				val = '';
		    			}
			    		ret = ret+ '        ' + me.exFieldData[x] + ':"' + val+ '"';
			    		if(x != me.exFieldData.length-1){
			    			ret = ret + ',\n';
			    		}
			    	}  				
		    		if(myData1.hasOwnProperty('children') && myData1.children != null){
		    			ret = ret+ ',\n        ' + 'children:[\n';
		    			for(var k=0; k<myData1.children.length; k++){
		    				var myData2 =myData1.children[k];
		    				//console.log('myData2',myData2);
		    				if(k==0){
		    					ret = ret+ '        {\n';
		    				}
		    				else {
			    				ret = ret+ ',{\n';
			    			}		    				
				    		for(var x=0; x< me.exFieldData.length; x++){
				    			var val = myData2[me.exFieldData[x]];
				    			if(val == 'undefined'){
				    				val = '';
				    			}
					    		ret = ret+ '        ' + me.exFieldData[x] + ':"' + val+ '"';
					    		if(x != me.exFieldData.length-1){
					    			ret = ret + ',\n';
					    		}
					    	}  		    				
				    		if(myData2.hasOwnProperty('children') && myData2.children != null ){
				    			ret = ret+ ',\n            ' + 'children:[\n';
				    			for(var l=0; l<myData2.children.length; l++){
				    				var myData3 =myData2.children[l];				    				
				    				//console.log('myData3',myData3);
				    				if(l==0){
				    					ret = ret+ '            {\n';
				    				}
				    				else {
					    				ret = ret+ ',{\n';
					    			}
						    		for(var x=0; x< me.exFieldData.length; x++){
						    			var val = myData3[me.exFieldData[x]];
						    			if(val == 'undefined'){
						    				val = '';
						    			}
							    		ret = ret+ '        ' + me.exFieldData[x] + ':"' + val+ '"';
							    		if(x != me.exFieldData.length-1){
							    			ret = ret + ',\n';
							    		}
							    	}
							    	///////
						    		if(myData3.hasOwnProperty('children') && myData3.children != null ){
						    			ret = ret+ ',\n                ' + 'children:[\n';
						    			for(var m=0; m<myData3.children.length; m++){
						    				var myData4 =myData3.children[m];				    				
						    				//console.log('myData4',myData4);
						    				if(m==0){
						    					ret = ret+ '                {\n';
						    				}
						    				else {
							    				ret = ret+ ',{\n';
							    			}
								    		for(var x=0; x< me.exFieldData.length; x++){
								    			var val = myData4[me.exFieldData[x]];
								    			if(val == 'undefined'){
								    				val = '';
								    			}
									    		ret = ret+ '            ' + me.exFieldData[x] + ':"' + val+ '"';
									    		if(x != me.exFieldData.length-1){
									    			ret = ret + ',\n';
									    		}
									    	}  				    				
						    			}
						    			ret = ret+ ']\n            ' + '}';
						    		}
						    		else {
						    			ret = ret+ '\n            ' + '}';
						    		}
							    	///////		    				
				    			}
				    			ret = ret+ ']\n        ' + '}';
				    		}
				    		else {
				    			ret = ret+ '\n        ' + '}';
				    		}
		    			}
		    			ret = ret+ ']\n    ' + '}';
		    		}
		    		else {
		    			ret = ret+ '\n    ' + '}';
		    		} 
    			}
    			ret = ret+ ']\n' + '}';
    		}
    		else {
    			ret = ret+ '\n' + '}';
    		}
    	}
    	ret = ret+ ']\n' + '}';
    	console.log('ret', ret);
    	return ret;
    },
    treeDataToJson:function(){
    	var me = this;
    	var treeStore = me.getStore();
    	var treeDataArray = new Array();
    	var nodeData;
    	
    	treeStore.data.items.forEach(function(obj){
    		nodeData = new Object();
    		nodeData.id = obj.data.id;
    		nodeData.name = obj.data.name;
    		nodeData.depth = obj.data.depth;
    		nodeData.parent_id = obj.data.parentId;
    		nodeData.opt1 = obj.data.opt1;
    		nodeData.opt2 = obj.data.opt2;
    		nodeData.opt3 = obj.data.opt3;
    		treeDataArray.push(nodeData);
    	})
    	return JSON.stringify(treeDataArray);
    }
})