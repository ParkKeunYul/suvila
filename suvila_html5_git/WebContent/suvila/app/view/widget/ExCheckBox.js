Ext.define('ExFrm.view.widget.ExCheckBox', {
    extend: 'Ext.form.field.Checkbox',
    xtype:'excheckbox',
    cls:'excheckbox',
    exInitStr:"{    xtype:'excheckbox',\n    inputValue:'1'\n    }",
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