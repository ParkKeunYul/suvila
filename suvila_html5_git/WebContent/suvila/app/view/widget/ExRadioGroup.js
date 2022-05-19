Ext.define('ExFrm.view.widget.ExRadioGroup', {
    extend: 'Ext.form.RadioGroup',
    xtype:'exradiogroup',
    layout:'hbox',
    formfind:'formfind',
    cls:'exradiogroup',
	labelAlign:'right',	
    exInitStr:"{    \n" + 
    "    xtype:'exradiogroup'\n" +  
    //"    items:[\n" + 
    //"        {boxLabel: 'Item 1', name: 'rb', inputValue: '1'},\n"+
    //"        {boxLabel: 'Item 2', name: 'rb', inputValue: '2', checked: true},\n"+
    //"        {boxLabel: 'Item 3', name: 'rb', inputValue: '3'}\n"+
    //"    ]\n"+
    "}",
	exCommonType:'radio', 
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
    getExValue:function(){
		var items = this.items.items;
		var ret='';
		var retCnt = 0;
		for(var i=0; i < items.length; i++){
			console.log(items[i]);
			if(items[i].checked == true){
				ret = items[i].inputValue;
				break;
			}
		}
		console.log(ret);
		return ret;
    },
    setExValue:function(value){
		var items = this.items.items;
		for(var i=0; i < items.length; i++){
			
			console.log(items[i].inputValue + '::' + value);
			if(items[i].inputValue == value){	
				console.log('..들어옴');
				items[i].setRawValue(true);
				break;
			}
		}
    },
	setExReadOnly:function(val){
		if(val==true){
			//this.setDisable(true);
			var buttons = this.items.length;
			for(var i=0; i<buttons; i++){
				this.items.get(i).setReadOnly(true);
				//this.setFieldStyle('background:lightgray');
			}
		}
		else {
			var buttons = this.items.length;
			for(var i=0; i<buttons; i++){
				this.items.get(i).setReadOnly(false);
				//this.setFieldStyle('background:lightgray');
			}
		}
	},     
    initComponent:function(){
		this.callParent(arguments);
		if(this.exReadOnly==true){
			var buttons = this.items.length;
			for(var i=0; i<buttons; i++){
				this.items.get(i).setReadOnly(true);
				//this.setFieldStyle('background:lightgray');
			}
		}
		else{
			var buttons = this.items.length;
			for(var i=0; i<buttons; i++){
				this.items.get(i).setReadOnly(false);
				//this.setFieldStyle('background:lightgray');
			}
		}    

		
    }
    /*
    config:{
    	value:''
	},
	applyValue:function(oldValue, newValue){
		console.log('oldValue', oldValue);
		console.log('newValue', newValue);
		this.down(this.childName)
	},
	initComponent:function(){
		this.callParent(arguments);
		this.setValue = function(value){	// 배열로받음
			console.log(value);
			var count =value.length;
			for(var i=0; i< count; i++){
				console.log('-----------',value[0]);
				console.log('-----------',this.childName);
				var a = this.down('checkboxfield[name=' + this.childName + ']');
				console.log('a',a);
				var loop = true;
				while(loop){
					if(a != null){	
						if(a.inputValue == value[i]){
							console.log('...들어왔음',a);
							//a.set({checked:true});	
									
						}
					}					
					else{
						break;
					}					
					a = a.nextSibling('checkboxfield[name=' + this.childName + ']');
					console.log('a',a);
				}
			}
		}
		
		this.getValue = function(){
		}
		
		this.setValue(['check1','check2']);
		
	}
*/
})