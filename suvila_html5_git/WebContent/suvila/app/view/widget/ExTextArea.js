Ext.define('ExFrm.view.widget.ExTextArea', {
    extend: 'Ext.form.field.TextArea',
    xtype:'extextarea',
    formfind:'formfind',
    exInitStr:"{    \n        xtype:'extextarea'    }",
	labelAlign:'right',
	setExReadOnly:function(val){
		this.exReadOnly = val;
		if(val==true){
			this.setReadOnly(false);
			this.setFieldStyle('background:#d0e4f3');
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
	getExValue:function(){
		return this.getValue();
	},
	setExValue:function(val){
		this.setValue(val);
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
		}	
	}	
})