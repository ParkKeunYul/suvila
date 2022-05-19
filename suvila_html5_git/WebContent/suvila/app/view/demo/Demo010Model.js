Ext.define('ExFrm.view.demo.Demo010Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo010', 
    stores:{ 
        calendarInfo:{
            fields:['field1'],
            /*
            proxy:{
                type:'ajax',
                url:'./json/demo010.json',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    totalProperty:'listTotalSize',
                    keepRawData:true
                }
            },
            */
            data: [{
                title:'이것은',
                id: 1,
                title: 'Work Calendar',
                eventStore: {
                    data:[{
                    //work:[{
                        id:1001,
                        calendarId:1,
                        title: '1내용을 넣으세요.',
                        part:'부서1',
                        startDate: new Date(2017,4,14, 10, 15, 0),
                        endDate: new Date(2017,4,14, 13, 30, 0)

                    },{
                        id:1002,
                        calendarId:2,
                        title: '2이것은 바입니다.',
                        part:'부서2',
                        allDay: true,
                        startDate: new Date(2017,4,2, 0, 0, 0), //  D.clearTime(D.getFirstDateOfMonth(new Date()), true),
                        endDate: new Date(2017,4,3, 0, 0, 0) //D.add(D.clearTime(D.getFirstDateOfMonth(new Date()), true), D.DAY, 2)
                    }]
                }
            }, {
                id: 2,
                title: 'Personal',
                eventStore: {
                    data:[{
                    //work:[{
                        id:1001,
                        calendarId:1,
                        title: '2내용을 넣으세요.',
                        part:'부서1',
                        startDate: new Date(2017,4,14, 10, 15, 0),
                        endDate: new Date(2017,4,14, 13, 30, 0)

                    },{
                        id:1002,
                        calendarId:2,
                        title: '2이것은 바입니다.',
                        part:'부서2',
                        allDay: true,
                        startDate: new Date(2017,4,2, 0, 0, 0), //  D.clearTime(D.getFirstDateOfMonth(new Date()), true),
                        endDate: new Date(2017,4,3, 0, 0, 0) //D.add(D.clearTime(D.getFirstDateOfMonth(new Date()), true), D.DAY, 2)
                    }]
                }
            }, {
                id: 3,
                title: 'Project Zeus',
                eventStore: {
                    data:[{
                    //work:[{
                        id:1001,
                        calendarId:1,
                        title: '3내용을 넣으세요.',
                        part:'부서1',
                        startDate: new Date(2017,4,14, 10, 15, 0),
                        endDate: new Date(2017,4,14, 13, 30, 0)

                    },{
                        id:1002,
                        calendarId:2,
                        title: '3이것은 바입니다.',
                        part:'부서2',
                        allDay: true,
                        startDate: new Date(2017,4,2, 0, 0, 0), //  D.clearTime(D.getFirstDateOfMonth(new Date()), true),
                        endDate: new Date(2017,4,3, 0, 0, 0) //D.add(D.clearTime(D.getFirstDateOfMonth(new Date()), true), D.DAY, 2)
                    }]
                }
            }],
            autoLoad:false,
            pageSize:10
        }
    }
});