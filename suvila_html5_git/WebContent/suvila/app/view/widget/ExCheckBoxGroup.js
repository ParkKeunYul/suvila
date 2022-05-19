Ext.define('ExFrm.view.widget.ExCheckBoxGroup', {
    extend: 'Ext.form.CheckboxGroup',
    xtype:'excheckboxgroup',
    cls:'excheckboxgroup',
    exInitStr:"{    xtype:'excheckboxgroup',\n" + 
 	//"    items: [\n" + 
    //"        {boxLabel: 'Item 1', name: 'rb', inputValue: '1'},\n"+
    //"        {boxLabel: 'Item 2', name: 'rb', inputValue: '2', checked: true},\n"+
    //"        {boxLabel: 'Item 3', name: 'rb', inputValue: '3'}\n"+
    //"    ]\n"+     
    "}",
    layout:'hbox',
    formfind:'formfind',
	labelAlign:'right',	
    exCompName:'',
	exCommonType:'checkbox',
	exValueType:'array', //'array, comma'
	addItem:function(data){
		var value = data['code'];
		var display = data['name'];
		this.add({
			boxLabel:display,
			name:this.name,
			inputValue:value,
			padding:'0 10 0 0'
		});
	},
    getExValue:function(count){
		var items = this.items.items;
		if(this.exValueType=='comma'){
			var retValue = '';
			for(var i=0; i < items.length; i++){
				var c2 = this.items.items[i];
				if(c2.getValue() == true){
					console.log('...', c2);
					if(commaCount == 0){
						retValue = c2.inputValue;
						commaCount++;
					}
					else {
						retValue = retValue + ',' + c2.inputValue;
						commaCount++;
					}
				} 
			}
			return retValue;
		} else if(this.exValueType=='array'){
			var ret = [];
			var retCnt = 0;
			for(var i=0; i < items.length; i++){
				console.log(items[i]);
				if(items[i].checked == true){
					ret.push(items[i].inputValue);
				}
			}
			console.log(ret);
			return ret;
		}
    }, 
    setExValue:function(value){
    	console.log(input);
		var items = this.items.items;
		if(this.exValueType == 'array'){
			var arry = [];
			if (value instanceof Array) {
				arry = value;
			}
			else {
				arry.push(value);
			}
			for(var i=0; i < items.length; i++){
				for(var j=0; j < arry.length; j++){
					console.log(items[i].inputValue + '::' + arry[j]);
					if(items[i].inputValue == arry[j]){	
						console.log('...');
						items[i].setRawValue(true);
					}
				}
			}
		} else if(this.exValueType == 'comma'){
			var input = value.split(',');
			for(var i=0; i < items.length; i++){
				for(var j=0; j < input.length; j++){
					if(items[i].inputValue == input[j]){	
						items[i].setRawValue(true);
					}
				}
			}
		}
		  	
    },
    setExReadOnly:function(val){
		if(val==true){
			//this.setDisable(true);
			var buttons = this.items.length;
			for(var i=0; i <buttons; i++){
				this.items.get(i).setReadOnly(true);
				//this.setFieldStyle('background:lightgray');
			}
		}
		else {
			var buttons = this.items.length;
			for(var i=0; i <buttons; i++){
				this.items.get(i).setReadOnly(false);
				//this.setFieldStyle('background:lightgray');
			}
		}
    },    
    initComponent:function(){
    	this.callParent(arguments);
	    if(this.exReadOnly==true){
			try{
				if(this.items != undefined && this.items.lnegth != null){
					var buttons = this.items.length;
					for(var i=0; i <buttons; i++){
						this.items.get(i).setReadOnly(true);
						//this.setFieldStyle('background:lightgray');
					}
				}
			}catch(e){}
	    }
	    else{
			try {
				if(this.items != undefined && this.items != null){
					var buttons = this.items.length;
					//console.log(this.items);
					for(var i=0; i <buttons; i++){
						//console.log('this.items.get(i)',this.items.get(i));
						this.items.get(i).setReadOnly(false);
						//this.setFieldStyle('background:lightgray');
					}
				}
			}catch(e){}
		}  	
    }
})