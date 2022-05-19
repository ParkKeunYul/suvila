Ext.define('ExFrm.view.widget.ExTreePanel', {
    extend: 'Ext.tree.Panel',
    xtype:'extreepanel',
    cls:'extreepanel',
    exInitStr:"{    \n        xtype:'extreepanel',\n        bind:{ store:'' },\n        rootVisible:false,\n        displayField:'name',\n    height:200,   width:200,\n    border:1    }",
    initComponent:function(){
        this.callParent(arguments);
        /*
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
        */
    }
})