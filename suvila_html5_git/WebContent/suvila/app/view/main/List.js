Ext.define('ExFrm.view.main.List',{
    extend:'Ext.grid.Panel',
    xtype:'mainlist',
    requires:[
    'ExFrm.store.Personnel'
],
    title:'Personnel',
    store:{
        type: 'personnel'
    },
    bbb:'12345',
    html:'aaa\'' + 'bbb' + 'ccc',
    tools:[
    {
        type:'minus',
        handler:'onDeleteItem'
    }],
    columns:[
    {
        text: 'Name',
        dataIndex: 'name'
    },{
        text: 'Email',
        dataIndex: 'email',
        flex: 1
    },{
        text: 'Phone',
        dataIndex: 'phone',
        flex: 1
    }],
    aaa:1,
    ddd:'abcdefg\n' + this.bbb
    + 'xyz' + "kkk" + "kk\"" + "''''" + '""""',
    listeners:[
    {
        select:function(){
            alert('hello\\n');
            var a = b+c;
            var c = d + 'cccc\n';
        },
        resize: Ext.Function.bind(function(comp,
        width,
        height,
        oldWidth,
        oldHeight,
        eOpts) {
            comp.setWidth(width);
            comp.setHeight(height);
        },
        this)
    }],
    ccc:1222123120
}
)