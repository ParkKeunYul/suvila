Ext.define('ExFrm.view.widget.ExPickerRealSrch', {
    extend: 'Ext.form.field.Picker',
    xtype:'expickerrealsrch',
    exInitStr:"{    \n        xtype:'expickerrealsrch' }",
    formfind:'formfind', 
    widgetPicker:true,
    isReady:false,
    enableKeyEvents:true,
	getSubmitValue:function(){
		var val = this.getRawValue();
		console.log(val);
		var retVal = '';
		this.getPicker().getStore().clearFilter();
		this.getPicker().getStore().filter({property:'name', value:val, exactMatch: true});
		this.getPicker().getStore().each(function(record){
			retVal = record.get('code');
			console.log('retVal', retVal);
		});
		return retVal;
	},	
	setExValue:function(val){
		var me = this;
		this.getPicker().getStore().clearFilter();
		this.getPicker().getStore().filter({property:'code', value:val, exactMatch: true});	
		this.getPicker().getStore().each(function(record){
			console.log('...', record, me);
			var retVal = record.get('name');
			me.setValue(retVal);
			return;
		});						
	},
	setExName:function(val){
		var me = this;
		this.getPicker().getStore().clearFilter();
		this.getPicker().getStore().filter({property:'name', value:val, exactMatch: true});	
		this.getPicker().getStore().each(function(record){
			console.log('...', record, me);
			var retVal = record.get('name');
			me.setValue(retVal);
			return;
		});								
	},		
	getExValue:function(){
		console.log(this.getSubmitValue())
		return this.getSubmitValue();
	},
	getExName:function(){
		console.log(this.getRawValue())
		return this.getRawValue();
	},					
	store:{},
    listeners:{
		keyup:function(){
			var me = this;
			if(this.isReady == true){
    			console.log('keydown');
    			this.getPicker().getStore().filter('name', this.getValue());
    			if(me.isExpanded == false){
        			setTimeout(function(){
        				me.expand();
        			},100);
        		}
    		}
		},
		afterrender:function(){
			this.isReady=true;
		}
    },
    createPicker:function(){
    	console.log('createPicker', this.x, this.y);
    	
    	var me = this;
    	console.log('this.up([widgetPicker=true])', me);
    	var panel=  Ext.create('Ext.grid.Panel',{
			floating:true,
			autoRender:true,
			width:me.width,
			height:300,
			ownerCt: me.ownerCt,
			focusOnToFront: false,
			hideHeaders: true,
			store:me.store,
			/*
	        store:{
	        	field:['name','code'],
	        	data:[
	        		{name:'�̼���',code:'1'},
	        		{name:'ȫ�浿',code:'2'},
	        		{name:'�̸���',code:'3'},
	        		{name:'�̼���',code:'4'}
	        	],
	        },
	        */
	        columns:[{
	        	dataIndex:'name',
	        	flex:1
	        },{
	        	dataIndex:'code',
	        	hidden:true
	        }],
		    listeners:{
		    	itemclick:function(dv, record, item, index, e){
			    	console.log(this, "onDblClickMain called");
					me.setValue(record.data.name);
					this.hide();
			    }
		    }	
    	});
    	this.isReady=true;
    	return panel;
    }    
    /*
    getExDisplayText:function(param){
    	var store = this.getStore();
    	var index = store.find('value',this.getValue());
    	if(param !=null){
    		index = store.find('value',param);
    	}
    	if(index != -1){
    		var record = store.getAt(index);
    		return record.data.name;
    	}
    	return '';    	
    },
	setExReadOnly:function(val){
		this.exReadOnly = val;
		if(val==true){
			this.setReadOnly(true);
			this.setFieldStyle('background:lightgray');
		}
		else {
			this.setReadOnly(false);
			if(this.exMand == true){
				this.setFieldStyle('background-color:#dbfdc0; background-image: none');
			}
			else {
		 		this.setFieldStyle('background-color:#ffffff; background-image: none');
		 	}			
		}
	},    
	initComponent:function(){
		var me = this;
		if(this.exLength != null && this.exLength != '' && this.exLength != undefined){
			//console.log(this.name, this.fieldLabel, this.labelWidth, this.exLength);
			if(this.fieldLabel == null){
				this.labelWidth = 0;
			}
			//this.setWidth(this.exLength * 8 + 10 + this.labelWidth);
			this.setWidth(this.exLength * 7.6 + 7 + 22 + this.labelWidth);
		}
		if(this.exReadOnly==true){
			this.setReadOnly(true);
			this.setFieldStyle('background:lightgray');
		}
		else{
			this.setReadOnly(false);
			this.setFieldStyle('background:white');
		}		
		if(this.exMand == true){
		 	this.setFieldStyle('background-color:#dbfdc0; background-image: none');
		}
		me.callParent(arguments);		
	},
	listeners:{
		specialkey:function(f,e){
			if(e.getKey() == e.ENTER){
				console.log(arguments);
				f.setValue(f.getRawValue());
				var form1 = this.up('exformsub,exformmain,exformwindow');
				var b = form1.query('[formfind=formfind]');
				for(var i=0; i< b.length; i++){
					if(this.reference != null &&
						b[i].reference != null){
						if(this.reference == b[i].reference){
							try{
								setTimeout(function(){b[i+1].focus()}, 200);
							}catch(e){}
							break;
						}
					}
				}
			}
		},			
		focus:function(){
			if(this.exReadOnly != true){
			 	this.setFieldStyle('background-color:#fdfdc9; background-image: none');
			}		
		},
		blur:function(d){
			if(this.exReadOnly != true){
				if(this.exMand == true){
					this.setFieldStyle('background-color:#dbfdc0; background-image: none');
				}
				else {
			 		this.setFieldStyle('background-color:#ffffff; background-image: none');
			 	}
			}			
		}	
	}	*/
	
	    
})