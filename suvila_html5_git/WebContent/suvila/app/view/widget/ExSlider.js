Ext.define('ExFrm.view.widget.ExSlider', {
    extend: 'Ext.slider.Single',
    xtype:'exslider',    
	exInitStr:"{\n" +
	    "    xtype:'exslider',\n" +
	    "    fieldLabel: '슬라이더',\n" +
	    "    value: 50,\n" +
	    "    width:300,\n" +
	    "    name: 'slider1'\n" +
	    "}",
	getExValue:function(){
		return this.getValue();
	},
	setExValue:function(val){
		this.setValue(val);
	}
    
})