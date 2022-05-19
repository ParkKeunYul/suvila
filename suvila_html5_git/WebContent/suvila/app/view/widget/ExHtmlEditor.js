Ext.define('ExFrm.view.widget.ExHtmlEditor', {
    extend: 'Ext.form.field.HtmlEditor',
    xtype:'exhtmleditor',
    exInitStr:"{    \n        xtype:'exhtmleditor' }",
    formfind:'formfind',
    border:1,
    hideLabel: true,
	labelAlign:'right',	
    autoCreate: {
        tag: "textarea",
        style: "width:500px;height:300px;",
        autocomplete: "off",
        spellcheck: "false"
    },
    getDocMarkup : function(){
        return '<html><head></head><body spellcheck="false"></body></html>';
    },
    getExValue: function(){
    	return this.getValue();
    },
    setExValue: function(input){
    	this.setValue(input);
    },
    fontSize:2,
    increaseFontSize:function(){
    	this.fontSize++;
    	if(this.fontSize > 10)
    		this.fontSize = 10;
    	this.setExValue(this.getExValue());
    	this.setValue('<font size=' + this.fontSize + '>' + this.getValue() + '</font>');
    	//console.log('...',this.getValue());
    },
    decreaseFontSize:function(){
    	this.fontSize--;
    	if(this.fontSize < 1)
    		this.fontSize = 1;
    	this.setExValue(this.getExValue());
    	this.setValue('<font size=' + this.fontSize + '>' + this.getValue() + '</font>');
    },
    listeners:{
		afterrender: function(editor) {
		    editor.getToolbar().hide();
		}
    }
})