import 'antd/dist/antd.css';
import '../css/ReportsView.css';
import locale from 'antd/es/date-picker/locale/pl_PL';
import moment, { Moment } from 'moment';

import { Button, Select,Table, Typography, DatePicker, Space } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { useGetAllClientsAndProjectsWithTasksQuery, useGetAllTeamsQuery } from '../generated/graphql';
import { Loader } from '../components';
const { Text } = Typography;

interface PickerOption {
  label: string;
  value: string;
}

interface PickerProps {
  defaultValue: PickerOption[];
  label: string;
  selected: PickerOption[];
  onChange: (newValue: string[]) => void;
  options: PickerOption[];
}

interface TableRow {
  client: string;
  key: string;
  project: string;
  task: string;
  team: string;
  time: string;
  cost: string;
  clientRowSpan: number;
  projectRowSpan: number;
  teamRowSpan: number;
}
interface TableColumn {
  // align?: 'center'
  dataIndex: string;
  render?: any;
  title: string;
}

const dataColumns : TableColumn[] = [
  {
    dataIndex: 'client',
    render: (value, row) => {
      return {
        children: value,
        props: { rowSpan: row.clientRowSpan }
      };
    },
    title: 'Klient'
  },
  {
    dataIndex: 'project',
    render: (value, row) => {
      return {
        children: value,
        props: { rowSpan: row.projectRowSpan }
      };
    },
    title: 'Projekt'
  },
  {
    dataIndex: 'team',
    render: (value, row) => {
      return {
        children: value,
        props: { rowSpan: row.teamRowSpan }
      };
    },
    title: 'Zespół'
  },
  {
    dataIndex: 'task',
    title: 'Zadanie'
  },
  {
    dataIndex: 'time',
    title: 'Godziny'
  },
  {
    dataIndex: 'cost',
    title: 'Koszt'
  }
];

const Picker = (props: PickerProps): JSX.Element => {
  const {
    defaultValue,
    label,
    selected,
    onChange,
    options
  } = props;

  return (
    <>
      <Text
        className="pickerLabel"
      >
        {`${ label }:`}
      </Text>

      <Select
        mode='multiple'
        style= {{ width: '350px' }}
        maxTagCount='responsive'
        value={selected.map((value) => value.value)}
        defaultValue={defaultValue.map((value) => value.value)}
        onChange={onChange}
        options={options}
      />
    </>
  );
};

const getHandlerForCollection = (
  collection: PickerOption[],
  setter: React.Dispatch<React.SetStateAction<PickerOption[]>>
) => (newSelectedValues: string[]): void => {
  if(newSelectedValues.length) {
    setter(newSelectedValues.map((value) => collection.find((option) => option.value === value)) as PickerOption[]);
  }
};

const currentMomentGetter = () => moment();

const customDateFormat = (value) => value.format('MMMM YYYY');

export const ReportsView = () : JSX.Element => {
  const [clientOptions, setClientOptions] = useState<PickerOption[]>([]);
  const [projectOptions, setProjectOptions] = useState<PickerOption[]>([]);
  const [teamOptions, setTeamOptions] = useState<PickerOption[]>([]);

  const [selectedClients, setSelectedClients] = useState<PickerOption[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<PickerOption[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<PickerOption[]>([]);

  const [date, setDate] = useState<Moment>(currentMomentGetter);

  const teamsQuery = useGetAllTeamsQuery();
  const clientsProjectsQuery = useGetAllClientsAndProjectsWithTasksQuery();

  useEffect(
    () => {
      if(teamsQuery.error || clientsProjectsQuery.error || teamsQuery.loading || clientsProjectsQuery.loading) {
        return;
      }
      const newClients = clientsProjectsQuery?.data?.clients || [];
      const newClientOptions = newClients.map(
        (client) => {
          return { label: client.name, value: client.id };
        }
      ) || [];

      setClientOptions(newClientOptions);
      setSelectedClients(newClientOptions);
      handleProjects(newClients, newClientOptions);

      const newTeams = teamsQuery.data?.teams || [];
      const newTeamOptions = newTeams.map(
        (team) => {
          return { label: team.name, value: team.id };
        }
      );

      setTeamOptions(newTeamOptions);
      setSelectedTeams(newTeamOptions);
    },
    [
      teamsQuery,
      clientsProjectsQuery
    ]
  );

  const handleProjects = (clients, selected) => {
    const selectedClientsMap: {[id: string]: boolean} = selected.reduce((acc, client) => {
      acc[client.value] = true;

      return acc;
    }, {});

    const newProjectOptions = clients.reduce((acc: PickerOption[], client) => {
      if(selectedClientsMap[client.id]) {
        acc.push(
          ...(client.projects?.map((project) => {return { label: project.name, value: project.id };}) || [])
        );
      }

      return acc;
    }, []) || [];

    setProjectOptions(newProjectOptions);
    setSelectedProjects(newProjectOptions);
  };

  useEffect(
    () => {
      if(!teamsQuery.loading && !clientsProjectsQuery.loading) {
        handleProjects(clientsProjectsQuery?.data?.clients, selectedClients);
      }
    },
    [
      selectedClients
    ]
  );

  const handleClientChange = getHandlerForCollection(clientOptions, setSelectedClients);
  const handleProjectChange = getHandlerForCollection(projectOptions, setSelectedProjects);
  const handleTeamChange = getHandlerForCollection(teamOptions, setSelectedTeams);

  const changeMonth = (forwardDirection: boolean): void => {
    const months = forwardDirection ? 1 : -1;

    const newDate = date.clone().add(months, 'month');

    onChangeForDataPicker(newDate);
  };

  const onChangeForDataPicker = (newDate): void => {
    if(newDate) {
      setDate(newDate);
    }
  };

  if(teamsQuery.error || clientsProjectsQuery.error) {return (<p>Error!</p>);}
  if(teamsQuery.loading || clientsProjectsQuery.loading) {return (<Loader/>);}
  if(!selectedClients.length
    || !selectedProjects.length
    || !selectedTeams.length) {
    return (<p>Selektory sie zepsuly</p>);
  }

  const rowSpanMap: {[id: string]: number} = {};

  clientsProjectsQuery?.data?.clients?.forEach((client) => {
    const clientId = `client_${ client.id }`;

    client?.projects?.forEach((project)=>{
      const projectId = `project_${ project.id }_${ clientId }`;
      const taskCount = project?.tasks?.length || 0;

      teamsQuery?.data?.teams?.forEach((team) => {
        const teamId = `team_${ team.id }_${ projectId }`;

        if(!rowSpanMap[clientId]) {
          rowSpanMap[clientId] = 0;
        }

        if(!rowSpanMap[projectId]) {
          rowSpanMap[projectId] = 0;
        }

        if(!rowSpanMap[teamId]) {
          rowSpanMap[teamId] = 0;
        }

        rowSpanMap[clientId] += taskCount;
        rowSpanMap[projectId] += taskCount;
        rowSpanMap[teamId] = taskCount;
      });
    });
  });

  const rowSpansUsedMap: {[id: string]: boolean} = {};

  const rows = clientsProjectsQuery?.data?.clients?.reduce((acc: TableRow[], client) => {
    const clientId = `client_${ client.id }`;

    client?.projects?.forEach((project)=>{
      const projectId = `project_${ project.id }_${ clientId }`;

      teamsQuery?.data?.teams?.forEach((team) => {
        const teamId = `team_${ team.id }_${ projectId }`;

        acc.push(...project?.tasks?.map((task) => {
          let clientRowSpan = 0;
          let projectRowSpan = 0;
          let teamRowSpan = 0;

          if(!rowSpansUsedMap[clientId]) {
            rowSpansUsedMap[clientId] = true;
            clientRowSpan = rowSpanMap[clientId];
          }

          if(!rowSpansUsedMap[projectId]) {
            rowSpansUsedMap[projectId] = true;
            projectRowSpan = rowSpanMap[projectId];
          }

          if(!rowSpansUsedMap[teamId]) {
            rowSpansUsedMap[teamId] = true;
            teamRowSpan = rowSpanMap[teamId];
          }

          const randomTime = Math.floor(Math.random() * 100 + 10);
          const randomCost = Math.floor(Math.random() * 50 + 20);

          const row: TableRow = {
            client: client.name,
            clientRowSpan,
            cost: `${ randomCost * randomTime } zł`,
            key: `${ Math.random() }`,
            project: project.name,
            projectRowSpan,
            task: task.name,
            team: team.name,
            teamRowSpan,
            time: `${ randomTime }h`
          };

          return row;
        }) || []);

      });
    });

    return acc;
  }, []) || [];

  return (
    <>
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%' }}
      >
        <Space
          direction="horizontal"
          size="large"
        >
          <Picker
            defaultValue={selectedClients}
            selected={selectedClients}
            label="Klienci"
            onChange={handleClientChange}
            options={clientOptions}
          />

          <Picker
            defaultValue={selectedProjects}
            selected={selectedProjects}
            label="Projekty"
            onChange={handleProjectChange}
            options={projectOptions}
          />

          <Picker
            defaultValue={selectedTeams}
            selected={selectedTeams}
            label="Zespoły"
            onChange={handleTeamChange}
            options={teamOptions}
          />
          <div className="datePicker">
            <Button
              type="ghost"
              shape="round"
              icon={<CaretLeftOutlined/>}
              size='small'
              onClick={() => changeMonth(false)}
            />
            <DatePicker
              className="reports-date-picker"
              locale={locale}
              onChange={onChangeForDataPicker}
              picker="month"
              format={customDateFormat}
              value={date}
            />
            <Button
              type="ghost"
              shape="round"
              icon={<CaretRightOutlined/>}
              size='small'
              onClick={() => changeMonth(true)}
            />
          </div>
        </Space>

        <Table
          columns={dataColumns}
          dataSource={rows}
          pagination={false}
          bordered
        />
      </Space>

    </>
  );
};