Ext.define('ExFrm.view.widget.ExDateField', {
    extend: 'Ext.form.field.Date',
    xtype:'exdatefield',
    cls:'exdatefield',
    formfind:'formfind',
	labelSeparator : ':',
	fieldStyle: 'background-color: #ffffff; background-image: none;',
	focusCls: 'widgetfocus',
        exLength:10,
	format: 'Y-m-d',
	submitFormat:'Ymd',
	submitValue:true,	
	exInitStr:"{    \n        xtype:'exdatefield',\n        fieldLabel:'날짜'\n    }",
	getSubmitValue:function(){
		var temp = this.getRawValue();
		temp = temp.replace('-','');
		temp = temp.replace('-','');
		return temp;
	},	
	setExReadOnly:function(val){
		this.exReadOnly = val;
		if(val==true){
			this.setReadOnly(true);
	//		this.setFieldStyle('background:#d0e4f3;background-image: none;');
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
	getDateValue:function(){
		return Ext.Date.format(this.getValue(), 'Ymd');
	},
	getExValue:function(val){
		return this.getDateValue();
	},
	setExValue:function(val){
		this.setDateValue(val);
	},
	setDateValue:function(val){
		if(val == null)
			return;
		if(val.length == 0){
			val = '';
		}
		else if(val == ' '){
			val = '';
		}
		else if(val.length != 8 && val.length != 10){
			return;
		}
		else if(val.length==8){
			val = val.substring(0,4) + '-' + val.substring(4,6) + '-' + val.substring(6,8);
		}
		this.setValue(val);
	},
	setDateValueEmpty:function(val){
		//console.log('setDateValueEmpty', val);
		if(val == null)
			return;
		if(val.length == 0){
			val = '';
		}
		else if(val == ' '){
			val = '';
		}
		else if(val.length != 8 && val.length != 10){
			return;
		}
		else if(val.length==8){
			val = val.substring(0,4) + '-' + val.substring(4,6) + '-' + val.substring(6,8);
		}
	//	console.log('setDateValue2', val);
		return val;
	},
	getDateValueEmpty: function(){
		//console.log('getDateValueEmpty', this.getValue());
		return this.getValue();
	},
	initComponent:function(){
		var me = this;
		if(this.fieldLabel == null){
			this.setWidth(105);
		}
		else {
			if(this.exLength != null && this.exLength != '' && this.exLength != undefined){
				//if(this.fieldLabel == null){			
				//	this.labelWidth = 0;
				//}			
				this.setWidth(this.exLength * 7.6 + 8.3 + 22 + this.labelWidth);
			}
		}
		if(this.exReadOnly==true){
			this.setReadOnly(true);
			this.setFieldStyle('background:#d0e4f3');
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
				var form1 = this.up('exformsub,exfieldsetsrch');
				var b = form1.query('[formfind=formfind]');
				for(var i=0; i< b.length; i++){
					if(this.reference != null &&
						b[i].reference != null){
						if(this.reference == b[i].reference){
							try{
								b[i+1].focus();
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
			this.setDateValue(this.getValue());
		}	
	}		
})