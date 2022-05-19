Ext.define('ExFrm.view.widget.ExTreeCheck', {
    extend: 'Ext.tree.Panel',
    xtype:'extreecheck',
    cls:'extreecheck',
    exCheckChild:true,
    exInitStr:"{    \n        xtype:'extreecheck',\n        bind:{ store:'' },\n        rootVisible:false,\n        displayField:'name',\n    height:200,   width:200,\n    border:1    }",
    initComponent:function(){
        var me = this;
        this.addListener('checkchange',function(node, checked,eOpts){
            if(me.exCheckChild== true){
                node.eachChild(function(n1) {
                    n1.set('checked', checked);
                    n1.eachChild(function(n2) {
                        n2.set('checked', checked);
                        n2.eachChild(function(n3) {
                            n3.set('checked', checked);
                            n3.eachChild(function(n4) {
                                n4.set('checked', checked);
                                n4.eachChild(function(n5) {
                                    n5.set('checked', checked);
                                });                             
                            }); 
                        }); 
                    }); 
                });   
            }
        });
        this.callParent(arguments);
        if(exCommon.getMode() == 'dev'){
            this.applyStore=function(newStore){
                console.log('applyStore', newStore);
                //newStore.getProxy().getReader().getRoot(
                if(newStore == null || newStore.getRoot == null){
                    console.log('트리패널의 스토어 설정이 잘못되었습니다.');
                    return Ext.create('Ext.data.TreeStore', {
                        root : {
                            text : 'bla bla bla',
                        }
                    });
                }
                return newStore;
            }; 
        }
    }
})