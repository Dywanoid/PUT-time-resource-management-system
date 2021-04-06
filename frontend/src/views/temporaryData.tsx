const columns = [
        {
          dataIndex: 'client',
          key: 'client',
          title: 'client',
        },
        {
          dataIndex: 'project',
          key: 'project',
          title: 'project',
        },
        {
          dataIndex: 'task',
          key: 'task',
          title: 'task',
        },
        {
          dataIndex: 'time',
          key: 'time',
          title: 'time',
        }
      ]
      , data = [
        {
          client: 'KFC',
          key: '1',
          project: 'Kubełek',
          task: 'kurczak',
          time: 10,
        },
        {
          client: 'KFC',
          key: '2',
          project: 'grander',
          task: 'kurczak',
          time: 60,
        },
        {
          client: 'KFC',
          key: '3',
          project: 'bsmart',
          task: 'wołowina',
          time: 40,
        },
        {
          client: 'KFC',
          key: '4',
          project: 'zinger',
          task: 'kurczak',
          time: 60,
        },
        {
          client: 'KFC',
          key: '5',
          project: 'grander texas',
          task: 'kurczak',
          time: 50,
        },
        {
          client: 'Jim Green',
          key: '6',
          project: 'Kubełek',
          task: 'kurczak',
          time: 20,
        },
        {
          client: 'Joe Black',
          key: '7',
          project: 'Kubełek',
          task: 'kurczak',
          time: 10,
        }
      ];

export { columns, data };
