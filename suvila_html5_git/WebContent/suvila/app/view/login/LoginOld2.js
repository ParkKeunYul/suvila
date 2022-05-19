Ext.define('ExFrm.view.login.Login',{
    extend:'Ext.form.Panel',
    alias:'widget.login',
    requires:['ExFrm.view.login.LoginController'],
    controller:'login',
    name:'regForm',
    //layout:'fit',
    //relogin:'false',
    layout:{
        type:'vbox',
        align:'center',
        pack:'middle'
    },
    items:[{
        html:'<i class="fa fa-spinner fa-4x fa-spin" aria-hidden="true"></i>'
    }]
})