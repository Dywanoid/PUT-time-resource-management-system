import 'antd/dist/antd.css';
import '../css/ReportsView.css';
import locale from 'antd/es/date-picker/locale/pl_PL';
import moment, { Moment } from 'moment';

import { Button, Select,Table, Typography, DatePicker, Space } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import React, { useEffect, useMemo, useState } from 'react';
import {
  useGetAllClientsAndProjectsWithTasksQuery,
  useGetAllTeamsQuery,
  useGetClientReportsQuery
} from '../generated/graphql';
import { Loader } from '../components';
import { formatDateForBackend } from '../utils/utils';
import { injectIntl, IntlShape } from 'react-intl';
const { Text } = Typography;

interface PickerOption {
  label: string;
  value: string;
}

interface PickerProps {
  defaultValue: PickerOption[];
  label: string;
  onChange: (newValue: string[]) => void;
  options: PickerOption[];
  selected: PickerOption[];
}

interface TableRow {
  client: string;
  clientRowSpan: number;
  cost: string;
  key: string;
  project: string;
  projectRowSpan: number;
  task: string;
  // team: string;
  // teamRowSpan: number;
  time: string;
}
interface TableColumn {
  dataIndex: string;
  render?: (value: string, row: TableRow) => {
    children: string | JSX.Element;
    props: {
      className: string;
      rowSpan: number;
    }
  };
  title: string;
}

const getTableCellProps = (rowSpan: number) => {
  return {
    className: 'table-cell-merged',
    rowSpan: rowSpan
  };
};

const INVOCIE_URL_SEPARATOR = '@@@';

const getDataColumns = (intl: IntlShape) => {
  // .map((column) => {
  //   return { ...column, title:  };
  // })
  const dataColumns : TableColumn[] = [
    {
      dataIndex: 'client',
      render: (value, row) => {
        let children: JSX.Element = (<span>{value}</span>);

        if(value.includes(INVOCIE_URL_SEPARATOR)) {
          const [name, url] = value.split(INVOCIE_URL_SEPARATOR);

          // TODO: REMOVE REPLACE!!!
          children = (<>
            <Text style={{ padding: '3px' }}>{name}</Text>
            <a href={url.replace('pdf', 'html')}>
              {intl.formatMessage({ id: 'download_invoice' })}
            </a>
          </>);
        }

        return {
          children,
          props: getTableCellProps(row.clientRowSpan)
        };
      },
      title: intl.formatMessage({ id: 'client' })
    },
    {
      dataIndex: 'project',
      render: (value, row) => {
        return {
          children: value,
          props: getTableCellProps(row.projectRowSpan)
        };
      },
      title: intl.formatMessage({ id: 'project' })
    },
    // {
    //   dataIndex: 'team',
    //   render: (value, row) => {
    //     return {
    //       children: value,
    //       props: getTableCellProps(row.teamRowSpan)
    //     };
    //   },
    //   title: 'Zespół'
    // },
    {
      dataIndex: 'task',
      title: intl.formatMessage({ id: 'task' })
    },
    {
      dataIndex: 'time',
      title: intl.formatMessage({ id: 'hours' })
    },
    {
      dataIndex: 'cost',
      title: intl.formatMessage({ id: 'cost' })
    }
  ];

  return dataColumns;
};

const Picker = (props: PickerProps): JSX.Element => {
  const {
    defaultValue,
    label,
    onChange,
    options,
    selected
  } = props;

  return (
    <>
      <Text
        className="pickerLabel"
      >
        {`${ label }:`}
      </Text>

      <Select
        className='picker-select'
        defaultValue={defaultValue.map((value) => value.value)}
        maxTagCount='responsive'
        mode='multiple'
        onChange={onChange}
        options={options}
        value={selected.map((value) => value.value)}
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

const customDateFormat = (value: Moment) => value.format('MM/YYYY');

const getMonthEnds = (date: Moment) => {

  return {
    end: formatDateForBackend(date.clone().endOf('month')),
    start: formatDateForBackend(date.clone().startOf('month'))
  };
};

export const ReportsView = injectIntl(({ intl }) : JSX.Element => {
  const [clientOptions, setClientOptions] = useState<PickerOption[]>([]);
  const [projectOptions, setProjectOptions] = useState<PickerOption[]>([]);
  // const [teamOptions, setTeamOptions] = useState<PickerOption[]>([]);

  const [selectedClients, setSelectedClients] = useState<PickerOption[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<PickerOption[]>([]);
  // const [selectedTeams, setSelectedTeams] = useState<PickerOption[]>([]);

  const [currencyMap, setCurrencyMap] = useState({});
  const [date, setDate] = useState<Moment>(currentMomentGetter);
  const monthRange = useMemo(() => getMonthEnds(date), [date]);

  const teamsQuery = useGetAllTeamsQuery();
  const clientsProjectsQuery = useGetAllClientsAndProjectsWithTasksQuery();

  const dataColumns = getDataColumns(intl);
  const reportsQuery = useGetClientReportsQuery(
    {
      fetchPolicy: 'no-cache',
      variables: {
        clientIds: selectedClients.map((selectedClient) => selectedClient.value),
        fromDate: monthRange.start,
        toDate: monthRange.end
      }
    }
  );

  const costHoursMap = reportsQuery?.data?.clientReports?.reduce((acc, currentClientReport) => {
    const { client, invoiceUrl } = currentClientReport;
    const clientId = `client_${ client.id }`;
    let clientHourSum = 0;

    currentClientReport.userReports?.forEach(
      (currentUserReport) => {
        currentUserReport.projectAssignmentReports?.forEach((
          currentProjectAssignmentReport
        ) => {
          clientHourSum += currentProjectAssignmentReport.duration;
        });}
    );

    acc[clientId] = { cost: currentClientReport.totalCost, hours: clientHourSum, invoiceUrl };
    currentClientReport.projectReports?.forEach((currentProjectReport) => {
      const { project } = currentProjectReport;
      const projectId = `project_${ project.id }`;
      let projectHourSum = 0;

      currentClientReport.userReports?.forEach(
        (currentUserReport) => {
          currentUserReport.projectAssignmentReports?.forEach((
            currentProjectAssignmentReport
          ) => {
            projectHourSum += currentProjectAssignmentReport.duration;
          });}
      );

      acc[projectId] = { cost: currentProjectReport.totalCost, hours: projectHourSum };
      currentProjectReport.taskReports?.forEach((currentTaskReport) => {
        const { task } = currentTaskReport;
        const taskId = `task_${ task.id }`;
        let taskHourSum = 0;

        currentClientReport.userReports?.forEach(
          (currentUserReport) => {
            currentUserReport.projectAssignmentReports?.forEach((
              currentProjectAssignmentReport
            ) => {
              taskHourSum += currentProjectAssignmentReport.duration;
            });}
        );

        acc[taskId] = { cost: currentTaskReport.totalCost, hours: taskHourSum };
      });
    });

    return acc;
  }, {}) || {};

  useEffect(
    () => {
      if(teamsQuery.error || clientsProjectsQuery.error || teamsQuery.loading || clientsProjectsQuery.loading) {
        return;
      }
      const clientToCurrencyMap = {};

      const newClients = clientsProjectsQuery?.data?.clients || [];
      const newClientOptions = newClients.map(
        (client) => {
          clientToCurrencyMap[client.id] = client.currency;

          return { label: client.name, value: client.id };
        }
      ) || [];

      setCurrencyMap(clientToCurrencyMap);
      setClientOptions(newClientOptions);
      setSelectedClients(newClientOptions);
      handleProjects(newClients, newClientOptions);

      // const newTeams = teamsQuery.data?.teams || [];
      // const newTeamOptions = newTeams.map(
      //   (team) => {
      //     return { label: team.name, value: team.id };
      //   }
      // );

      // setTeamOptions(newTeamOptions);
      // setSelectedTeams(newTeamOptions);
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
  // const handleTeamChange = getHandlerForCollection(teamOptions, setSelectedTeams);

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
    // || !selectedTeams.length
  ) {
    return (<p>Selektory sie zepsuly</p>);
  }

  const getUsedValuesMap = (collection: PickerOption[]) => collection.reduce((acc, item) => {
    acc[item.value] = true;

    return acc;
  }, {});

  const selectedClientsMap = getUsedValuesMap(selectedClients);

  const selectedProjectsMap = getUsedValuesMap(selectedProjects);
  // const selectedTeamsMap = getUsedValuesMap(selectedTeams);

  const rowSpanMap: {[id: string]: number} = {};

  clientsProjectsQuery?.data?.clients?.forEach((client) => {
    if(!selectedClientsMap[client.id]) {
      return;
    }

    const clientId = `client_${ client.id }`;

    client?.projects?.forEach((project)=>{
      if(!selectedProjectsMap[project.id]) {
        return;
      }

      const projectId = `project_${ project.id }_${ clientId }`;
      const taskCount = project?.tasks?.length || 0;

      // teamsQuery?.data?.teams?.forEach((team) => {
      //   if(!selectedTeamsMap[team.id]) {
      //     return;
      //   }

      // const teamId = `team_${ team.id }_${ projectId }`;

      if(!rowSpanMap[clientId]) {
        rowSpanMap[clientId] = 0;
      }

      if(!rowSpanMap[projectId]) {
        rowSpanMap[projectId] = 0;
      }

      // if(!rowSpanMap[teamId]) {
      //   rowSpanMap[teamId] = 0;
      // }

      rowSpanMap[clientId] += taskCount;
      rowSpanMap[projectId] += taskCount;
      // rowSpanMap[teamId] = taskCount;
      // });
    });
  });

  const rowSpansUsedMap: {[id: string]: boolean} = {};

  const rows = clientsProjectsQuery?.data?.clients?.reduce((acc: TableRow[], client) => {
    if(!selectedClientsMap[client.id]) {
      return acc;
    }

    const clientId = `client_${ client.id }`;

    client?.projects?.forEach((project)=> {
      if(!selectedProjectsMap[project.id]) {
        return;
      }

      const projectId = `project_${ project.id }_${ clientId }`;

      // teamsQuery?.data?.teams?.forEach((team) => {
      //   if(!selectedTeamsMap[team.id]) {
      //     return;
      //   }

      // const teamId = `team_${ team.id }_${ projectId }`;

      acc.push(...project?.tasks?.reduce((taskAcc: TableRow[], task) => {
        let clientRowSpan = 0;
        let projectRowSpan = 0;
        // let teamRowSpan = 0;

        const taskId = `task_${ task.id }`;
        const taskCost = costHoursMap[taskId]?.cost;
        const taskHours = costHoursMap[taskId]?.hours;
        const invoiceUrl = costHoursMap[clientId]?.invoiceUrl;

        if(!taskCost) {return taskAcc;}

        if(!rowSpansUsedMap[clientId]) {
          rowSpansUsedMap[clientId] = true;
          clientRowSpan = rowSpanMap[clientId];
        }

        if(!rowSpansUsedMap[projectId]) {
          rowSpansUsedMap[projectId] = true;
          projectRowSpan = rowSpanMap[projectId];
        }

        // if(!rowSpansUsedMap[teamId]) {
        //   rowSpansUsedMap[teamId] = true;
        //   teamRowSpan = rowSpanMap[teamId];
        // }

        const row: TableRow = {
          client: `${ client.name }${ INVOCIE_URL_SEPARATOR }${ invoiceUrl }`,
          clientRowSpan,
          cost: `${ taskCost || 0 } ${ currencyMap[client.id] }`,
          key: `${ client.id }-${ project.id }-${ task.id }`,
          project: project.name,
          projectRowSpan,
          task: task.name,
          // team: team.name,
          // teamRowSpan,
          time: `${ (taskHours/60) } h`
        };

        taskAcc.push(row);

        return taskAcc;
      }, []) || []);

      // });
    });

    return acc;
  }, []) || [];

  return (
    <>
      <Space
        className="vertical-spacer"
        direction="vertical"
        size="large"
      >
        <div>
          <Space
            direction="horizontal"
            size="large"
          >
            <Picker
              defaultValue={selectedClients}
              label={intl.formatMessage({ id: 'clients' })}
              onChange={handleClientChange}
              options={clientOptions}
              selected={selectedClients}
            />

            <Picker
              defaultValue={selectedProjects}
              label={intl.formatMessage({ id: 'projects' })}

              onChange={handleProjectChange}
              options={projectOptions}
              selected={selectedProjects}
            />

            {/* <Picker
              defaultValue={selectedTeams}
              label="Zespoły"
              onChange={handleTeamChange}
              options={teamOptions}
              selected={selectedTeams}
            /> */}

          </Space>
          <div
            className="datePicker"
          >
            <Button
              icon={<CaretLeftOutlined/>}
              onClick={() => changeMonth(false)}
              shape="round"
              size='small'
              type="ghost"
            />
            <DatePicker
              className="reports-date-picker"
              format={customDateFormat}
              locale={locale}
              onChange={onChangeForDataPicker}
              picker="month"
              value={date}
            />
            <Button
              icon={<CaretRightOutlined/>}
              onClick={() => changeMonth(true)}
              shape="round"
              size='small'
              type="ghost"
            />
          </div>
        </div>

        <Table
          bordered
          columns={dataColumns}
          dataSource={rows}
          pagination={false}
        />
      </Space>

    </>
  );
});