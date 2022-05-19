Ext.define('ExFrm.view.widget.ExTextField', {
    extend: 'Ext.form.field.Text',
    xtype:'extextfield',
    cls:'extextfield',
	formfind:'formfind',
    exInitStr:"{    \n        xtype:'extextfield' }",
//	labelSeparator : '',
	fieldStyle: 'background-color: #ffffff; background-image: none;',
	exFormat:'',
	labelAlign:'right',
	getSubmitValue:function(){
		return this.getValue();
	},	
	rawToValue:function(rawValue){
		//console.log('rawToValue' + rawValue);
		if(this.exFormat == 'bzn'){
			//console.log('변환1:' + rawValue);
			rawValue = rawValue.replace('-','');
			rawValue = rawValue.replace('-','');
			//console.log('변환2:' + rawValue);
			return rawValue;
		}
		if(this.exFormat == 'acn'){
			rawValue = rawValue.replace('/-/g','');
			rawValue = rawValue.replace('-','');
			rawValue = rawValue.replace('-','');
			rawValue = rawValue.replace('-','');
			return rawValue;
		}
		if(this.exFormat == 'zip'){
			try{
				if(rawValue.length == 6){
					return rawValue.substr(0,3) + "-" + rawValue.substr(3,6)
				}else{
					return rawValue
				}
			}catch (e) {
				return rawValue
			}
			
		}
		if(this.exNumberComma == true){
			var temp = rawValue + '';
			temp = temp.replace(',','');
			temp = temp.replace(',','');
			temp = temp.replace(',','');
			temp = temp.replace(',','');
			temp = temp.replace(',','');
			return temp;
		}
		return rawValue;
	},
	valueToRaw:function(val){
		if(val == null)
			val = '';
		val = val + '';

		if(this.exFormat == 'bzn'){
			if(val.length != 10)
				return val;
			else
				return val.substring(0,3) + '-' + val.substring(3,5) + '-' + val.substring(5,10);
		}
		if(this.exFormat == 'acn'){
			if(val.length != 14)
				return val;
			else
				return val.substring(0,3) + '-' + val.substring(3,9) + '-' + val.substring(9,11) + val.substring(11,14);
		}
		if(this.exFormat == 'zip'){
			try{
				if(val.length == 6){
					return val.substr(0,3) + "-" + val.substr(3,6)
				}else{
					return val
				}
			}catch (e) {
				return val
			}
			
		}
		
		if(this.exNumberComma == true){
			var n = val.indexOf('.');
			var fval = val.substring(0,n);
			var rval = val.substring(n+1);
			if(n == null || n== -1){
				//console.log('superclass' + this.superclass);
				return Ext.util.Format.number(val, '0,000');
			}
			else{
				return Ext.util.Format.number(fval, '0,000') + '.' + rval;
			}
		}		
		return val;
	},
	getExValue:function(){
		return this.getValue();
	},
	setExValue:function(val){
		if(this.exNumberComma == true){
			var valc = (val + "").replace('/,/g','') + '';
			var n = valc.indexOf('.');
			var fval = valc.substring(0,n);
			var rval = valc.substring(n+1);
			//console.log('fval, rval', fval, rval, n);
			if(n == null || n== -1){
				//console.log('superclass' + this.superclass);
				this.setRawValue(Ext.util.Format.number(valc, '0,000'));
			}
			else{
				this.setRawValue(Ext.util.Format.number(fval, '0,000') + '.' + rval);
			}
		}
		else if(this.exZeroPadding == true){
			var valc = val + "";
			if(this.maxLength> 30){
				Ext.Msg.alert('오류', 'exZeroPadding은 maxLength를 30자리까지만 지원합니다.');
				return;
			}				
			if(valc.length > 0){
				this.setValue( ('000000000000000000000000000000' + valc).substring(30-this.maxLength + valc.length));
			}
		}
		else {
			this.setValue(val);
		}
	},
	setExReadOnly:function(val){
		this.exReadOnly = val;
		if(val==true){
			this.setReadOnly(true);
			this.setFieldStyle('background:#d0e4f3');
		}
		else{
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
	initComponent:function(){
		var me = this;
		if(this.exLength != null && this.exLength != '' && this.exLength != undefined){
			if(this.fieldLabel == null){
				this.labelWidth = 0;
			}
			this.setWidth(this.exLength * 7.6 + 7 + this.labelWidth);
		}
		
		if(this.exType == 'number'){
		//	this.exAlign = 'right';
			if(this.exNumberComma != null && this.exNumberComma == false){
				this.exNumberComma = false;
			}
			else{ 
				this.exNumberComma = true;
			}
			Ext.apply({maskRe:/[-\d,.]+/});
		}
		if(this.exAlign == 'right'){
			this.addCls('align-text-right');
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
		// 	this.setFieldStyle('background-color:#dbfdc0; background-image: none');
		 	this.setFieldStyle('background-color:#ffffff; background-image: none');
		}
		me.callParent(arguments);
	},
	listeners:{
		afterrender:function(){
			if(this.exAlign != null && this.exAlign == 'right'){
				//this.addCls('align-text-right');
				//console.log(this);
				this.inputEl.setStyle('text-align', 'right');
			}	
		},		
		specialkey:function(f,e){
			try{
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
			}catch(Exception){}
		},		
		focus:function(){
			if(this.exReadOnly != true){
			 	this.setFieldStyle('background-color:#fdfdc9; background-image: none');
			}
			if(this.exNumberComma == true){
				var val = this.getRawValue().replace(/,/g,'');
				this.setRawValue(val);
			}
			if(this.exFormat == 'bzn' || this.exFormat == 'acn'){
				var rawVal = this.getRawValue().replace(/-/g,'');
				this.setRawValue(rawVal);
			}
		},
		blur:function(d){
			if(this.exReadOnly != true){
				if(this.exMand == true){
					//this.setFieldStyle('background-color:#dbfdc0; background-image: none');
					this.setFieldStyle('background-color:#ffffff; background-image: none');
				}
				else {
			 		this.setFieldStyle('background-color:#ffffff; background-image: none');
			 	}
			}
			if(this.exNumberComma == true){
				var val = this.getRawValue().replace('/,/g','') + '';
				var n = val.indexOf('.');
				var fval = val.substring(0,n);
				var rval = val.substring(n+1);
				
				if(n == null || n== -1){
					this.setRawValue(Ext.util.Format.number(val, '0,000'));
				}
				else{
					this.setRawValue(Ext.util.Format.number(fval, '0,000') + '.' + rval);
				}
				
				this.setFieldStyle('text-align:right;');
				
			}
			else if(this.exZeroPadding == true){
				if(this.maxLength> 20){
					Ext.Msg.alert('오류', 'exZeroPadding은 maxLength를 20자리까지만 지원합니다.');
					return;
				}				
				if(this.getValue().length > 0){
					this.setValue( ('00000000000000000000' + this.getValue()).substring(20-this.maxLength + this.getValue().length));
				}
			}
			if(this.exFormat == 'bzn'){
				var val = this.getValue();
				console.log(val);
				if(val == null)
					val = '';
				if(val.length != 0 && val.length != 10){
					Ext.Msg.alert('확인','사업자번호가 유효하지 않습니다.');
					this.focus();
				}
				if(val.length != 10){
					this.setRawValue(val);
				}
				else{
					this.setRawValue(val.substring(0,3) + '-' + val.substring(3,5) + '-' + val.substring(5,10));
				}
			}			
			else if(this.exFormat == 'acn'){
				var val = this.getValue();
				console.log(val);
				if(val == null)
					val = '';
				if(val.length != 14)
					this.setRawValue(val);
				else
					this.setRawValue(val.substring(0,3) + '-' + val.substring(3,9) + '-' + val.substring(9,11)+ '-' + val.substring(11,14));
			}			
		}
	}	
})