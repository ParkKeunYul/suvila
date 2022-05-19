Ext.define('ExFrm.view.widget.ExComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'excombobox',
    formfind:'formfind',
    queryMode:'local',
    editable:false,
	labelAlign:'right',	
    exCommonType:'combobox',
    exInitStr:"{    \n        xtype:'excombobox',\n        fieldLabel:'콤보박스',\n        displayField:'display',\n        valueField:'value',\n" + 
              "        store:{ data:[\n            \n{display:'name1', value:'value1'},\n            {display:'name2', value:'value2'}\n        ]}\n    }",
    getDisplayText:function(param){
    	var store = this.getStore();
    	var index = store.find(this.valueField,this.getValue());
    	if(param !=null){
    		index = store.find(this.valueField,param);
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
			this.setFieldStyle('background:#d0e4f3');
		}
		else {
			this.setReadOnly(false);
			if(this.exMand == true){
				//this.setFieldStyle('background-color:#dbfdc0; background-image: none');
				this.setFieldStyle('background-color:#ffffff; background-image: none');
			}
			else {
		 		this.setFieldStyle('background-color:#ffffff; background-image: none');
		 	}			
		}
	},    
	setExValue:function(val){
		this.setValue(val);
	},
	getExValue:function(){
		return this.getValue();
	},
	initComponent:function(){
		var me = this;
        /*
		if(this.exLength != null && this.exLength != '' && this.exLength != undefined){
			//console.log(this.name, this.fieldLabel, this.labelWidth, this.exLength);
			if(this.fieldLabel == null){
				this.labelWidth = 0;
			}
			//this.setWidth(this.exLength * 8 + 10 + this.labelWidth);
			this.setWidth(this.exLength * 7.6 + 7 + 22 + this.labelWidth);
		}
        */
		if(this.exReadOnly==true){
			this.setReadOnly(true);
			this.setFieldStyle('background:#d0e4f3');
		}
		else{
			this.setReadOnly(false);
			this.setFieldStyle('background:white');
		}		
		if(this.exMand == true){
		 	//this.setFieldStyle('background-color:#dbfdc0; background-image: none');
			this.setFieldStyle('background-color:#ffffff; background-image: none');
		}
		me.callParent(arguments);
        if(this.exCommonDmnCode != null && this.exCommonDmnCode != '' ){
            if(this.exCommonDefaultCode != null && this.exCommonDefaultCode != ''){
                ExFrm.app.getController('AppController').setCommonDataStore(this, this.exCommonDmnCode, this.exCommonDefaultCode);
            } else {
                ExFrm.app.getController('AppController').setCommonDataStore(this, this.exCommonDmnCode);          
            }
        }
        else if(this.exCommonDmnCodeReal != null && this.exCommonDmnCodeReal != '' ){
            if(this.exCommonDefaultCode != null && this.exCommonDefaultCode != ''){
                ExFrm.app.getController('AppController').setCommonDataStoreReal(this, this.exCommonDmnCodeReal, this.exCommonDefaultCode);
            } else {
                ExFrm.app.getController('AppController').setCommonDataStoreReal(this, this.exCommonDmnCode);          
            }
        }        
        
	},
	listeners:{
		specialkey:function(f,e){
			if(e.getKey() == e.ENTER){
				console.log(arguments);
				f.setValue(f.getRawValue());
				var form1 = this.up('exformsub,exfieldsetsrch');
				var b = form1.query('[formfind=formfind]');
				for(var i=0; i < b.length; i++){
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
				//	this.setFieldStyle('background-color:#dbfdc0; background-image: none');
					this.setFieldStyle('background-color:#ffffff; background-image: none');
				}
				else {
			 		this.setFieldStyle('background-color:#ffffff; background-image: none');
			 	}
			}			
		}	
	}	    
})