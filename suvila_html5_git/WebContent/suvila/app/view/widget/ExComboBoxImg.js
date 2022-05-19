Ext.define('ExFrm.view.widget.ExComboBoxImg', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'excomboboximg',
    formfind:'formfind',
    queryMode:'local',
    editable:false,
    exCommonType:'comboboximg',
	labelAlign:'right',	
    exInitStr:"{    \n        xtype:'excomboboximg',\n        fieldLabel:'콤보박스',\n        displayField:'display',\n        exDisplayImageField:'img',\n        valueField:'value',\n" + 
              "        store:{ data:[\n            \n{ img:'./resources/img/image1.jpeg', display:'name1', value:'value1'},\n" + 
			  "            { img:'./resources/img/image2.jpeg', display:'name2', value:'value2'}\n        ]}\n    }",
    getDisplayText:function(param){
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
				this.setFieldStyle('background-color:#dbfdc0');
			}
			else {
		 		this.setFieldStyle('background-color:#ffffff');
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
			this.setFieldStyle('background:lightgray');
		}
		else{
			this.setReadOnly(false);
			this.setFieldStyle('background:white');
		}		
		if(this.exMand == true){
		 	this.setFieldStyle('background-color:#dbfdc0');
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
    listConfig:{
		getInnerTpl:function(displayField){
			console.log('>>', arguments);
			var tpl='<div>' + 
				'<img src="{img}" style="height:25px" heigth="25px" width="25px"> {' + displayField + '}' +   
				'<div>';
			return tpl;
		}     
	}, 
	listeners:{
        select: function (comboBox, record) {
            comboBox.inputEl.setStyle({
                'background-image':    'url(' + record.get(this.exDisplayImageField) + ')',
				'background-size':     '25px 25px',
                'background-repeat':   'no-repeat',
                'background-position': '3px center',
                'padding-left':        '35px'
            });
        },
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
			 	this.setFieldStyle('background-color:#fdfdc9');
			}		
		},
		blur:function(d){
			if(this.exReadOnly != true){
				if(this.exMand == true){
					this.setFieldStyle('background-color:#dbfdc0');
				}
				else {
			 		this.setFieldStyle('background-color:#ffffff');
			 	}
			}			
		}	
	}	    
})