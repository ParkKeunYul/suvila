Ext.define('ExFrm.view.demo.Demo010',{
    extend:'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.demo010',

    requires:['ExFrm.view.demo.Demo010Controller',
              'ExFrm.view.demo.Demo010Model',
              'Ext.calendar.model.Calendar'],
    controller:'demo010',
    viewModel:{
        type:'demo010'
    },
    name:'Demo010',
    isRootView:true,
    title:'캘린더',
    closable:true,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        flex:1,
        layout:{
            type:'vbox',
            align:'stretch'
        },
        xtype:'exformmain',
        items:[{
            xtype:'hidden',
            name:'arrayC',
            reference:'arrayC'
        },{
            xtype:'hidden',
            name:'arrayU',
            reference:'arrayU'
        },{
            xtype:'hidden',
            name:'arrayD',
            reference:'arrayD'
        },{
            flex:1,
            reference:'calendarMultiview',
            xtype: 'calendar',
            draggable:false,
            store: {
                autoLoad: true,
                data: [{
                    id: 1,
                    title: 'Work Calendar',
                    eventStore: {
                        proxy: {
                            type: 'ajax',
                            url: './json/test1.json'
                        },
                        
                        listeners:{
                            add:function(store, records){
                                console.log('eventStore add', arguments);
                                console.log('들어옴');
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue(Ext.encode(records[0].data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });
                            },
                            remove:function(store, records){
                                console.log('eventStore remove', arguments);
                                console.log('들어옴');
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue(Ext.encode(records[0].data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });
                            },
                            update:function(store, records, kind){
                                console.log('eventStore update', arguments);
                                console.log('들어옴');
                                if(kind != 'edit'){
                                    return;
                                }
                                console.log('들어옴2', kind);
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue(Ext.encode(records.data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });

                            }
                            /*
                            datachanged :function(store){
                                */
                                /*
                                console.log('datachanged--------------------------', arguments);
                                var items = store.data.items;
                                var arrayC = [];
                                var arrayU = [];
                                var arrayD = [];
                                for(var i=0; i< items.length; i++){
                                    console.log('i',i);
                                    if(items[i].crudState != null && items[i].crudState == 'C'){
                                        arrayC.push(items[i].data);
                                    }
                                    else if(items[i].crudState != null && items[i].crudState == 'U'){
                                        arrayU.push(items[i].data);
                                    }
                                    else if(items[i].crudState != null && items[i].crudState == 'D'){
                                        arrayD.push(items[i].data);
                                    }
                                }
                                console.log('체크', arrayC);
                                if(arrayC.length == 0 &&  arrayU.length ==0 && arrayD.length == 0){
                                }
                                else {
                                    console.log('들어옴');
                                    Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue(Ext.encode(arrayC));
                                    Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue(Ext.encode(arrayU));
                                    Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue(Ext.encode(arrayD));
                                    var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                    form.url='./json/demo009upd.json';		
                                    form.submit({
                                        success:function(form, action){
                                            store.commitChanges();
                                        },
                                        failure:function(form, action){
                                            console.log('store arguments', arguments);
                                            Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                            store.rejectChanges();
                                        }
                                    });
                                }
                                
                                
                            }
                            */
                        }
                    }
                }, {
                    id: 2,
                    title: 'Personal',
                    eventStore: {
                        proxy: {
                            type: 'ajax',
                            url: './json/test2.json'
                        },
                        listeners:{
                            add:function(store, records){
                                console.log('eventStore add', arguments);
                                console.log('들어옴');
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue(Ext.encode(records[0].data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });
                            },
                            remove:function(store, records){
                                console.log('eventStore remove', arguments);
                                console.log('들어옴');
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue(Ext.encode(records[0].data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });
                            },
                            update:function(store, records, kind){
                                console.log('eventStore update', arguments);
                                console.log('들어옴');
                                if(kind != 'edit'){
                                    return;
                                }
                                console.log('들어옴2', kind);
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue(Ext.encode(records.data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });

                            }
                        }
                    }
                }, {
                    id: 3,
                    title: 'Project Zeus',
                    eventStore: {
                        proxy: {
                            type: 'ajax',
                            url: './json/test3.json'
                        },
                        listeners:{
                            add:function(store, records){
                                console.log('eventStore add', arguments);
                                console.log('들어옴');
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue(Ext.encode(records[0].data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });
                            },
                            remove:function(store, records){
                                console.log('eventStore remove', arguments);
                                console.log('들어옴');
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayD]').setValue(Ext.encode(records[0].data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });
                            },
                            update:function(store, records, kind){
                                console.log('eventStore update', arguments);
                                console.log('1들어옴', kind);
                                if(kind != 'edit'){
                                    return;
                                }
                                console.log('들어옴2', kind);
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayC]').setValue();
                                Ext.ComponentQuery.query('demo010')[0].down('[name=arrayU]').setValue(Ext.encode(records.data));
                                var form = Ext.ComponentQuery.query('demo010')[0].down('[reference=regform]').getForm();
                                form.url='./json/demo009upd.json';		
                                form.submit({
                                    success:function(form, action){
                                        store.commitChanges();
                                    },
                                    failure:function(form, action){
                                        console.log('store arguments', arguments);
                                        Ext.Msg.alert('오류', '등록중 오류가 발생하였습니다.');
                                        store.rejectChanges();
                                    }
                                });
                            }
                        }                        
                    }
                }],

                /*
                eventStoreDefaults: {
                    type:'json',
                    data:[{
                    
                        id:1001,
                        clendarId:1,
                        title: '1내용을 넣으세요.',
                        part:'부서1',
                        startDate: new Date(2017,4,14, 10, 15, 0),
                        endDate: new Date(2017,4,14, 13, 30, 0)

                    }]
                }
                */
                /*,//getStaticWorkData(),
                
                personal:[{
                    title: '내용을 넣으세요.',
                    part:'부서1',
                    startDate: new Date(),
                    endDate: new Date()

                },{
                    title: '111이것은 바입니다.',
                    part:'부서2',
                    allDay: true,
                    startDate:  new Date(2017,4,2, 0, 0, 0),//D.clearTime(D.getFirstDateOfMonth(new Date()), true), 2.2~2.4일까지일 경우 
                    endDate: new Date(2017,4,4,24, 0, 0)
                }]
                },

                */
            },

            views: {
                day: {
                    xtype: 'calendar-day',
                    draggable:false,
                },
                week: {
                    xtype: 'calendar-week',
                    draggable:false,
                },
                month: {
                    xtype: 'calendar-month',
                    draggable:false,
                }
            },
            defaultView: 'month'
        }]
    }]
});
