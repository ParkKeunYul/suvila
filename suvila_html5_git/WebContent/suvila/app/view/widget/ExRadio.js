Ext.define('ExFrm.view.widget.ExRadio', {
    extend: 'Ext.form.field.Radio',
    xtype:'exradio',
    cls:'exradio',
    exInitStr:"{xtype:'exradio'}",
    formfind:'formfind',
    exCompName:'',
    labelAlign:'right', 
    setExValue:function(val){
        this.setValue(val);
    },
    getExValue:function(){
        return this.getValue();
    }
})