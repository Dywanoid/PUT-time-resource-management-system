/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Interval: any;
};



export type AddProjectInput = {
  clientId: Scalars['ID'];
  name: Scalars['String'];
};

export type AddTaskInput = {
  projectId: Scalars['ID'];
  name: Scalars['String'];
};

export type ArchiveClientInput = {
  clientId: Scalars['ID'];
};

export type ArchiveProjectInput = {
  projectId: Scalars['ID'];
};

export type ArchiveTaskInput = {
  taskId: Scalars['ID'];
};

export type ArchiveTeamInput = {
  teamId: Scalars['ID'];
};

export type ChangeHolidayRequestStatusInput = {
  requestId: Scalars['ID'];
  statusId: Scalars['ID'];
};

export type Client = {
  __typename?: 'Client';
  id: Scalars['ID'];
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  archived: Scalars['Boolean'];
  currency: Currency;
  createdAt: Scalars['DateTime'];
  projects?: Maybe<Array<Project>>;
};


export type ClientProjectsArgs = {
  includeArchived?: Maybe<Scalars['Boolean']>;
};

export type CreateClientInput = {
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  currency: Currency;
};

export type CreateHolidayRequestInput = {
  userId: Scalars['ID'];
  typeId: Scalars['ID'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
};

export type CreateProjectAssignmentInput = {
  userId: Scalars['ID'];
  projectId: Scalars['ID'];
  beginDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  hourlyRate: Scalars['Float'];
};

export type CreateTeamInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type CreateTeamMemberBatchInput = {
  userIdList?: Maybe<Array<Scalars['ID']>>;
  teamId: Scalars['ID'];
};

export type CreateTeamMemberInput = {
  userId: Scalars['ID'];
  teamId: Scalars['ID'];
};

export type CreateUpdateOrDeleteTimeLogInput = {
  projectAssignmentId: Scalars['ID'];
  taskId: Scalars['ID'];
  date: Scalars['Date'];
  duration: Scalars['Interval'];
};

export enum Currency {
  Eur = 'EUR',
  Usd = 'USD',
  Pln = 'PLN'
}



export type DeleteProjectAssignmentInput = {
  projectAssignmentId: Scalars['ID'];
};

export type DeleteTeamMemberBatchInput = {
  userIdList?: Maybe<Array<Scalars['ID']>>;
  teamId: Scalars['ID'];
};

export type DeleteTeamMemberInput = {
  userId: Scalars['ID'];
  teamId: Scalars['ID'];
};

export type DeleteTimeLogInput = {
  projectAssignmentId: Scalars['ID'];
  taskId: Scalars['ID'];
  date: Scalars['Date'];
};

export type HolidayRequest = {
  __typename?: 'HolidayRequest';
  id: Scalars['ID'];
  userId: Scalars['ID'];
  typeId: Scalars['ID'];
  statusId: Scalars['ID'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  status: HolidayRequestStatus;
  type: HolidayRequestType;
  user: User;
};

export type HolidayRequestStatus = {
  __typename?: 'HolidayRequestStatus';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type HolidayRequestType = {
  __typename?: 'HolidayRequestType';
  id: Scalars['ID'];
  name: Scalars['String'];
  shortCode: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createClient: Client;
  archiveClient: Client;
  unarchiveClient: Client;
  updateClient: Client;
  addProject: Project;
  updateProject: Project;
  archiveProject: Project;
  unarchiveProject: Project;
  addTask: Task;
  updateTask: Task;
  archiveTask: Task;
  unarchiveTask: Task;
  createTeam: Team;
  updateTeam: Team;
  archiveTeam: Team;
  unarchiveTeam: Team;
  createTeamMember: TeamMember;
  deleteTeamMember: TeamMember;
  deleteTeamMemberBatch?: Maybe<Array<TeamMember>>;
  createTeamMemberBatch?: Maybe<Array<TeamMember>>;
  createHolidayRequest: HolidayRequest;
  changeHolidayRequestStatus: HolidayRequest;
  createProjectAssignment: ProjectAssignment;
  updateProjectAssignment: ProjectAssignment;
  deleteProjectAssignment: ProjectAssignment;
  createUpdateOrDeleteTimeLog: TimeLog;
};


export type MutationCreateClientArgs = {
  input: CreateClientInput;
};


export type MutationArchiveClientArgs = {
  input: ArchiveClientInput;
};


export type MutationUnarchiveClientArgs = {
  input: UnarchiveClientInput;
};


export type MutationUpdateClientArgs = {
  input: UpdateClientInput;
};


export type MutationAddProjectArgs = {
  input: AddProjectInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationArchiveProjectArgs = {
  input: ArchiveProjectInput;
};


export type MutationUnarchiveProjectArgs = {
  input: UnarchiveProjectInput;
};


export type MutationAddTaskArgs = {
  input: AddTaskInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


export type MutationArchiveTaskArgs = {
  input: ArchiveTaskInput;
};


export type MutationUnarchiveTaskArgs = {
  input: UnarchiveTaskInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};


export type MutationArchiveTeamArgs = {
  input: ArchiveTeamInput;
};


export type MutationUnarchiveTeamArgs = {
  input: UnarchiveTeamInput;
};


export type MutationCreateTeamMemberArgs = {
  input: CreateTeamMemberInput;
};


export type MutationDeleteTeamMemberArgs = {
  input: DeleteTeamMemberInput;
};


export type MutationDeleteTeamMemberBatchArgs = {
  input: DeleteTeamMemberBatchInput;
};


export type MutationCreateTeamMemberBatchArgs = {
  input: DeleteTeamMemberBatchInput;
};


export type MutationCreateHolidayRequestArgs = {
  input: CreateHolidayRequestInput;
};


export type MutationChangeHolidayRequestStatusArgs = {
  input: ChangeHolidayRequestStatusInput;
};


export type MutationCreateProjectAssignmentArgs = {
  input: CreateProjectAssignmentInput;
};


export type MutationUpdateProjectAssignmentArgs = {
  input: UpdateProjectAssignmentInput;
};


export type MutationDeleteProjectAssignmentArgs = {
  input: DeleteProjectAssignmentInput;
};


export type MutationCreateUpdateOrDeleteTimeLogArgs = {
  input: CreateUpdateOrDeleteTimeLogInput;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  tasks?: Maybe<Array<Task>>;
  archived: Scalars['Boolean'];
  client: Client;
  assignments?: Maybe<Array<ProjectAssignment>>;
};


export type ProjectTasksArgs = {
  includeArchived?: Maybe<Scalars['Boolean']>;
};

export type ProjectAssignment = {
  __typename?: 'ProjectAssignment';
  id: Scalars['ID'];
  project: Project;
  user: User;
  beginDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  hourlyRate: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  timeLogs?: Maybe<Array<TimeLog>>;
  timeLogInfo?: Maybe<TimeLogInfo>;
};


export type ProjectAssignmentTimeLogsArgs = {
  fromDate?: Maybe<Scalars['Date']>;
  toDate?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  clients?: Maybe<Array<Client>>;
  client: Client;
  project: Project;
  task: Task;
  teams?: Maybe<Array<Team>>;
  team: Team;
  users?: Maybe<Array<User>>;
  user: User;
  teamMembers?: Maybe<Array<TeamMember>>;
  userTeams?: Maybe<Array<TeamMember>>;
  holidayRequestTypes?: Maybe<Array<HolidayRequestType>>;
  holidayRequestStatuses?: Maybe<Array<HolidayRequestStatus>>;
  userHolidayRequests?: Maybe<Array<HolidayRequest>>;
  holidayRequests?: Maybe<Array<HolidayRequest>>;
  projectAssignments?: Maybe<Array<ProjectAssignment>>;
};


export type QueryClientsArgs = {
  includeArchived?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryTeamsArgs = {
  includeArchived?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryTeamArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryTeamMembersArgs = {
  teamId: Scalars['ID'];
};


export type QueryUserTeamsArgs = {
  userId: Scalars['ID'];
};


export type QueryUserHolidayRequestsArgs = {
  userId: Scalars['ID'];
  onlyPending?: Maybe<Scalars['Boolean']>;
};


export type QueryHolidayRequestsArgs = {
  requestStatuses: Array<Maybe<Scalars['ID']>>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};


export type QueryProjectAssignmentsArgs = {
  userId?: Maybe<Scalars['ID']>;
  projectId?: Maybe<Scalars['ID']>;
  fromDate?: Maybe<Scalars['Date']>;
  toDate?: Maybe<Scalars['Date']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  project: Project;
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  archived: Scalars['Boolean'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  userId: Scalars['ID'];
  teamId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  user: User;
  team: Team;
};

export type TimeLog = {
  __typename?: 'TimeLog';
  projectAssignment: ProjectAssignment;
  task: Task;
  date: Scalars['Date'];
  duration: Scalars['Interval'];
  createdAt: Scalars['DateTime'];
};

export type TimeLogInfo = {
  __typename?: 'TimeLogInfo';
  earliestDate?: Maybe<Scalars['Date']>;
  latestDate?: Maybe<Scalars['Date']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UnarchiveClientInput = {
  clientId: Scalars['ID'];
};

export type UnarchiveProjectInput = {
  projectId: Scalars['ID'];
};

export type UnarchiveTaskInput = {
  taskId: Scalars['ID'];
};

export type UnarchiveTeamInput = {
  teamId: Scalars['ID'];
};

export type UpdateClientInput = {
  clientId: Scalars['ID'];
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  currency: Currency;
};

export type UpdateProjectAssignmentInput = {
  projectAssignmentId: Scalars['ID'];
  beginDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  hourlyRate: Scalars['Float'];
};

export type UpdateProjectInput = {
  projectId: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateTaskInput = {
  taskId: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateTeamInput = {
  teamId: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  roles?: Maybe<Array<Scalars['String']>>;
};

export type CreateHolidayRequestMutationVariables = Exact<{
  userId: Scalars['ID'];
  typeId: Scalars['ID'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type CreateHolidayRequestMutation = (
  { __typename?: 'Mutation' }
  & { createHolidayRequest: (
    { __typename?: 'HolidayRequest' }
    & Pick<HolidayRequest, 'id'>
  ) }
);

export type ChangeHolidayRequestStatusMutationVariables = Exact<{
  requestId: Scalars['ID'];
  statusId: Scalars['ID'];
}>;


export type ChangeHolidayRequestStatusMutation = (
  { __typename?: 'Mutation' }
  & { changeHolidayRequestStatus: (
    { __typename?: 'HolidayRequest' }
    & { status: (
      { __typename?: 'HolidayRequestStatus' }
      & Pick<HolidayRequestStatus, 'id' | 'name'>
    ) }
  ) }
);

export type CreateClientMutationVariables = Exact<{
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  currency: Currency;
}>;


export type CreateClientMutation = (
  { __typename?: 'Mutation' }
  & { createClient: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'taxId' | 'streetWithNumber' | 'zipCode' | 'city'>
  ) }
);

export type UpdateClientMutationVariables = Exact<{
  clientId: Scalars['ID'];
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  currency: Currency;
}>;


export type UpdateClientMutation = (
  { __typename?: 'Mutation' }
  & { updateClient: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'taxId' | 'streetWithNumber' | 'zipCode' | 'city'>
  ) }
);

export type ArchiveClientMutationVariables = Exact<{
  clientId: Scalars['ID'];
}>;


export type ArchiveClientMutation = (
  { __typename?: 'Mutation' }
  & { archiveClient: (
    { __typename?: 'Client' }
    & Pick<Client, 'id'>
  ) }
);

export type AddProjectMutationVariables = Exact<{
  clientId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type AddProjectMutation = (
  { __typename?: 'Mutation' }
  & { addProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  ) }
);

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  ) }
);

export type ArchiveProjectMutationVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type ArchiveProjectMutation = (
  { __typename?: 'Mutation' }
  & { archiveProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id'>
  ) }
);

export type AddTaskMutationVariables = Exact<{
  projectId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type AddTaskMutation = (
  { __typename?: 'Mutation' }
  & { addTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name'>
  ) }
);

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name'>
  ) }
);

export type ArchiveTaskMutationVariables = Exact<{
  taskId: Scalars['ID'];
}>;


export type ArchiveTaskMutation = (
  { __typename?: 'Mutation' }
  & { archiveTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  ) }
);

export type UpdateTeamMutationVariables = Exact<{
  teamId: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}>;


export type UpdateTeamMutation = (
  { __typename?: 'Mutation' }
  & { updateTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  ) }
);

export type ArchiveTeamMutationVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type ArchiveTeamMutation = (
  { __typename?: 'Mutation' }
  & { archiveTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id'>
  ) }
);

export type CreateTeamMembersMutationVariables = Exact<{
  teamId: Scalars['ID'];
  userIdList?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type CreateTeamMembersMutation = (
  { __typename?: 'Mutation' }
  & { createTeamMemberBatch?: Maybe<Array<(
    { __typename?: 'TeamMember' }
    & Pick<TeamMember, 'userId' | 'teamId'>
  )>> }
);

export type DeleteTeamMembersMutationVariables = Exact<{
  teamId: Scalars['ID'];
  userIdList?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type DeleteTeamMembersMutation = (
  { __typename?: 'Mutation' }
  & { deleteTeamMemberBatch?: Maybe<Array<(
    { __typename?: 'TeamMember' }
    & Pick<TeamMember, 'teamId' | 'userId'>
  )>> }
);

export type TimeLogMutationVariables = Exact<{
  projectAssignmentId: Scalars['ID'];
  taskId: Scalars['ID'];
  date: Scalars['Date'];
  duration: Scalars['Interval'];
}>;


export type TimeLogMutation = (
  { __typename?: 'Mutation' }
  & { createUpdateOrDeleteTimeLog: (
    { __typename?: 'TimeLog' }
    & Pick<TimeLog, 'date' | 'duration'>
    & { task: (
      { __typename?: 'Task' }
      & Pick<Task, 'id'>
    ) }
  ) }
);

export type GetUserApplicationsQueryVariables = Exact<{
  holidayUserId: Scalars['ID'];
}>;


export type GetUserApplicationsQuery = (
  { __typename?: 'Query' }
  & { userHolidayRequests?: Maybe<Array<(
    { __typename?: 'HolidayRequest' }
    & Pick<HolidayRequest, 'id' | 'userId' | 'typeId' | 'statusId' | 'createdAt' | 'startDate' | 'endDate'>
    & { status: (
      { __typename?: 'HolidayRequestStatus' }
      & Pick<HolidayRequestStatus, 'id' | 'name'>
    ), type: (
      { __typename?: 'HolidayRequestType' }
      & Pick<HolidayRequestType, 'id' | 'name' | 'shortCode'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
    ) }
  )>> }
);

export type GetUsersApplicationsQueryVariables = Exact<{
  requestStatusIds: Array<Maybe<Scalars['ID']>> | Maybe<Scalars['ID']>;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
}>;


export type GetUsersApplicationsQuery = (
  { __typename?: 'Query' }
  & { holidayRequests?: Maybe<Array<(
    { __typename?: 'HolidayRequest' }
    & Pick<HolidayRequest, 'id' | 'userId' | 'typeId' | 'statusId' | 'createdAt' | 'startDate' | 'endDate'>
    & { status: (
      { __typename?: 'HolidayRequestStatus' }
      & Pick<HolidayRequestStatus, 'id' | 'name'>
    ), type: (
      { __typename?: 'HolidayRequestType' }
      & Pick<HolidayRequestType, 'id' | 'name' | 'shortCode'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
    ) }
  )>> }
);

export type GetUserApplicationsTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserApplicationsTypesQuery = (
  { __typename?: 'Query' }
  & { holidayRequestTypes?: Maybe<Array<(
    { __typename?: 'HolidayRequestType' }
    & Pick<HolidayRequestType, 'id' | 'name' | 'shortCode'>
  )>> }
);

export type GetHolidayRequestStatusesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHolidayRequestStatusesQuery = (
  { __typename?: 'Query' }
  & { holidayRequestStatuses?: Maybe<Array<(
    { __typename?: 'HolidayRequestStatus' }
    & Pick<HolidayRequestStatus, 'id' | 'name'>
  )>> }
);

export type GetAllClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllClientsQuery = (
  { __typename?: 'Query' }
  & { clients?: Maybe<Array<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'taxId' | 'currency' | 'streetWithNumber' | 'zipCode' | 'city'>
  )>> }
);

export type GetProjectsQueryVariables = Exact<{
  clientId: Scalars['ID'];
}>;


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { client: (
    { __typename?: 'Client' }
    & { projects?: Maybe<Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )>> }
  ) }
);

export type GetTasksQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type GetTasksQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
    & { tasks?: Maybe<Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'name'>
    )>> }
  ) }
);

export type GetAllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTeamsQuery = (
  { __typename?: 'Query' }
  & { teams?: Maybe<Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'description' | 'archived'>
  )>> }
);

export type GetAllUsersInTeamQueryVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type GetAllUsersInTeamQuery = (
  { __typename?: 'Query' }
  & { teamMembers?: Maybe<Array<(
    { __typename?: 'TeamMember' }
    & Pick<TeamMember, 'userId' | 'teamId'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
    ), team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'description' | 'archived' | 'createdAt'>
    ) }
  )>> }
);

export type GetUserTeamsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserTeamsQuery = (
  { __typename?: 'Query' }
  & { userTeams?: Maybe<Array<(
    { __typename?: 'TeamMember' }
    & Pick<TeamMember, 'userId' | 'teamId' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
    ), team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'description' | 'archived' | 'createdAt'>
    ) }
  )>> }
);

export type GetTeamInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTeamInfoQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'name' | 'id' | 'description' | 'archived' | 'createdAt'>
  ) }
);

export type GetUserProjectsQueryVariables = Exact<{
  userId: Scalars['ID'];
  fromDate?: Maybe<Scalars['Date']>;
  toDate?: Maybe<Scalars['Date']>;
}>;


export type GetUserProjectsQuery = (
  { __typename?: 'Query' }
  & { projectAssignments?: Maybe<Array<(
    { __typename?: 'ProjectAssignment' }
    & Pick<ProjectAssignment, 'id' | 'beginDate' | 'endDate'>
    & { project: (
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
      & { tasks?: Maybe<Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'name'>
      )>>, client: (
        { __typename?: 'Client' }
        & Pick<Client, 'id' | 'name'>
      ) }
    ), timeLogs?: Maybe<Array<(
      { __typename?: 'TimeLog' }
      & Pick<TimeLog, 'date' | 'duration'>
      & { task: (
        { __typename?: 'Task' }
        & Pick<Task, 'id'>
      ) }
    )>>, timeLogInfo?: Maybe<(
      { __typename?: 'TimeLogInfo' }
      & Pick<TimeLogInfo, 'earliestDate' | 'latestDate' | 'totalCount'>
    )> }
  )>> }
);

export type GetUserInfoQueryVariables = Exact<{
  userId?: Maybe<Scalars['ID']>;
}>;


export type GetUserInfoQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'roles'>
  ) }
);

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'roles'>
  )>> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ) }
);


export const CreateHolidayRequestDocument = gql`
    mutation createHolidayRequest($userId: ID!, $typeId: ID!, $startDate: DateTime!, $endDate: DateTime!) {
  createHolidayRequest(
    input: {userId: $userId, typeId: $typeId, startDate: $startDate, endDate: $endDate}
  ) {
    id
  }
}
    `;
export type CreateHolidayRequestMutationFn = Apollo.MutationFunction<CreateHolidayRequestMutation, CreateHolidayRequestMutationVariables>;

/**
 * __useCreateHolidayRequestMutation__
 *
 * To run a mutation, you first call `useCreateHolidayRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHolidayRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHolidayRequestMutation, { data, loading, error }] = useCreateHolidayRequestMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      typeId: // value for 'typeId'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useCreateHolidayRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateHolidayRequestMutation, CreateHolidayRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHolidayRequestMutation, CreateHolidayRequestMutationVariables>(CreateHolidayRequestDocument, options);
      }
export type CreateHolidayRequestMutationHookResult = ReturnType<typeof useCreateHolidayRequestMutation>;
export type CreateHolidayRequestMutationResult = Apollo.MutationResult<CreateHolidayRequestMutation>;
export type CreateHolidayRequestMutationOptions = Apollo.BaseMutationOptions<CreateHolidayRequestMutation, CreateHolidayRequestMutationVariables>;
export const ChangeHolidayRequestStatusDocument = gql`
    mutation changeHolidayRequestStatus($requestId: ID!, $statusId: ID!) {
  changeHolidayRequestStatus(input: {requestId: $requestId, statusId: $statusId}) {
    status {
      id
      name
    }
  }
}
    `;
export type ChangeHolidayRequestStatusMutationFn = Apollo.MutationFunction<ChangeHolidayRequestStatusMutation, ChangeHolidayRequestStatusMutationVariables>;

/**
 * __useChangeHolidayRequestStatusMutation__
 *
 * To run a mutation, you first call `useChangeHolidayRequestStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeHolidayRequestStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeHolidayRequestStatusMutation, { data, loading, error }] = useChangeHolidayRequestStatusMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *      statusId: // value for 'statusId'
 *   },
 * });
 */
export function useChangeHolidayRequestStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeHolidayRequestStatusMutation, ChangeHolidayRequestStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeHolidayRequestStatusMutation, ChangeHolidayRequestStatusMutationVariables>(ChangeHolidayRequestStatusDocument, options);
      }
export type ChangeHolidayRequestStatusMutationHookResult = ReturnType<typeof useChangeHolidayRequestStatusMutation>;
export type ChangeHolidayRequestStatusMutationResult = Apollo.MutationResult<ChangeHolidayRequestStatusMutation>;
export type ChangeHolidayRequestStatusMutationOptions = Apollo.BaseMutationOptions<ChangeHolidayRequestStatusMutation, ChangeHolidayRequestStatusMutationVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($name: String!, $taxId: String, $streetWithNumber: String, $zipCode: String, $city: String, $currency: Currency!) {
  createClient(
    input: {name: $name, taxId: $taxId, streetWithNumber: $streetWithNumber, currency: $currency, zipCode: $zipCode, city: $city}
  ) {
    id
    name
    taxId
    streetWithNumber
    zipCode
    city
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      name: // value for 'name'
 *      taxId: // value for 'taxId'
 *      streetWithNumber: // value for 'streetWithNumber'
 *      zipCode: // value for 'zipCode'
 *      city: // value for 'city'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($clientId: ID!, $name: String!, $taxId: String, $streetWithNumber: String, $zipCode: String, $city: String, $currency: Currency!) {
  updateClient(
    input: {clientId: $clientId, name: $name, taxId: $taxId, streetWithNumber: $streetWithNumber, currency: $currency, zipCode: $zipCode, city: $city}
  ) {
    id
    name
    taxId
    streetWithNumber
    zipCode
    city
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      name: // value for 'name'
 *      taxId: // value for 'taxId'
 *      streetWithNumber: // value for 'streetWithNumber'
 *      zipCode: // value for 'zipCode'
 *      city: // value for 'city'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const ArchiveClientDocument = gql`
    mutation ArchiveClient($clientId: ID!) {
  archiveClient(input: {clientId: $clientId}) {
    id
  }
}
    `;
export type ArchiveClientMutationFn = Apollo.MutationFunction<ArchiveClientMutation, ArchiveClientMutationVariables>;

/**
 * __useArchiveClientMutation__
 *
 * To run a mutation, you first call `useArchiveClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveClientMutation, { data, loading, error }] = useArchiveClientMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useArchiveClientMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveClientMutation, ArchiveClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveClientMutation, ArchiveClientMutationVariables>(ArchiveClientDocument, options);
      }
export type ArchiveClientMutationHookResult = ReturnType<typeof useArchiveClientMutation>;
export type ArchiveClientMutationResult = Apollo.MutationResult<ArchiveClientMutation>;
export type ArchiveClientMutationOptions = Apollo.BaseMutationOptions<ArchiveClientMutation, ArchiveClientMutationVariables>;
export const AddProjectDocument = gql`
    mutation AddProject($clientId: ID!, $name: String!) {
  addProject(input: {clientId: $clientId, name: $name}) {
    id
    name
  }
}
    `;
export type AddProjectMutationFn = Apollo.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, options);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($projectId: ID!, $name: String!) {
  updateProject(input: {projectId: $projectId, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const ArchiveProjectDocument = gql`
    mutation ArchiveProject($projectId: ID!) {
  archiveProject(input: {projectId: $projectId}) {
    id
  }
}
    `;
export type ArchiveProjectMutationFn = Apollo.MutationFunction<ArchiveProjectMutation, ArchiveProjectMutationVariables>;

/**
 * __useArchiveProjectMutation__
 *
 * To run a mutation, you first call `useArchiveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveProjectMutation, { data, loading, error }] = useArchiveProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useArchiveProjectMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveProjectMutation, ArchiveProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveProjectMutation, ArchiveProjectMutationVariables>(ArchiveProjectDocument, options);
      }
export type ArchiveProjectMutationHookResult = ReturnType<typeof useArchiveProjectMutation>;
export type ArchiveProjectMutationResult = Apollo.MutationResult<ArchiveProjectMutation>;
export type ArchiveProjectMutationOptions = Apollo.BaseMutationOptions<ArchiveProjectMutation, ArchiveProjectMutationVariables>;
export const AddTaskDocument = gql`
    mutation AddTask($projectId: ID!, $name: String!) {
  addTask(input: {projectId: $projectId, name: $name}) {
    id
    name
  }
}
    `;
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, options);
      }
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($taskId: ID!, $name: String!) {
  updateTask(input: {taskId: $taskId, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const ArchiveTaskDocument = gql`
    mutation ArchiveTask($taskId: ID!) {
  archiveTask(input: {taskId: $taskId}) {
    id
  }
}
    `;
export type ArchiveTaskMutationFn = Apollo.MutationFunction<ArchiveTaskMutation, ArchiveTaskMutationVariables>;

/**
 * __useArchiveTaskMutation__
 *
 * To run a mutation, you first call `useArchiveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveTaskMutation, { data, loading, error }] = useArchiveTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useArchiveTaskMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveTaskMutation, ArchiveTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveTaskMutation, ArchiveTaskMutationVariables>(ArchiveTaskDocument, options);
      }
export type ArchiveTaskMutationHookResult = ReturnType<typeof useArchiveTaskMutation>;
export type ArchiveTaskMutationResult = Apollo.MutationResult<ArchiveTaskMutation>;
export type ArchiveTaskMutationOptions = Apollo.BaseMutationOptions<ArchiveTaskMutation, ArchiveTaskMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!, $description: String) {
  createTeam(input: {name: $name, description: $description}) {
    id
    name
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($teamId: ID!, $name: String!, $description: String) {
  updateTeam(input: {teamId: $teamId, name: $name, description: $description}) {
    id
    name
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const ArchiveTeamDocument = gql`
    mutation ArchiveTeam($teamId: ID!) {
  archiveTeam(input: {teamId: $teamId}) {
    id
  }
}
    `;
export type ArchiveTeamMutationFn = Apollo.MutationFunction<ArchiveTeamMutation, ArchiveTeamMutationVariables>;

/**
 * __useArchiveTeamMutation__
 *
 * To run a mutation, you first call `useArchiveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveTeamMutation, { data, loading, error }] = useArchiveTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useArchiveTeamMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveTeamMutation, ArchiveTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveTeamMutation, ArchiveTeamMutationVariables>(ArchiveTeamDocument, options);
      }
export type ArchiveTeamMutationHookResult = ReturnType<typeof useArchiveTeamMutation>;
export type ArchiveTeamMutationResult = Apollo.MutationResult<ArchiveTeamMutation>;
export type ArchiveTeamMutationOptions = Apollo.BaseMutationOptions<ArchiveTeamMutation, ArchiveTeamMutationVariables>;
export const CreateTeamMembersDocument = gql`
    mutation CreateTeamMembers($teamId: ID!, $userIdList: [ID!]) {
  createTeamMemberBatch(input: {teamId: $teamId, userIdList: $userIdList}) {
    userId
    teamId
  }
}
    `;
export type CreateTeamMembersMutationFn = Apollo.MutationFunction<CreateTeamMembersMutation, CreateTeamMembersMutationVariables>;

/**
 * __useCreateTeamMembersMutation__
 *
 * To run a mutation, you first call `useCreateTeamMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMembersMutation, { data, loading, error }] = useCreateTeamMembersMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userIdList: // value for 'userIdList'
 *   },
 * });
 */
export function useCreateTeamMembersMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMembersMutation, CreateTeamMembersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMembersMutation, CreateTeamMembersMutationVariables>(CreateTeamMembersDocument, options);
      }
export type CreateTeamMembersMutationHookResult = ReturnType<typeof useCreateTeamMembersMutation>;
export type CreateTeamMembersMutationResult = Apollo.MutationResult<CreateTeamMembersMutation>;
export type CreateTeamMembersMutationOptions = Apollo.BaseMutationOptions<CreateTeamMembersMutation, CreateTeamMembersMutationVariables>;
export const DeleteTeamMembersDocument = gql`
    mutation DeleteTeamMembers($teamId: ID!, $userIdList: [ID!]) {
  deleteTeamMemberBatch(input: {teamId: $teamId, userIdList: $userIdList}) {
    teamId
    userId
  }
}
    `;
export type DeleteTeamMembersMutationFn = Apollo.MutationFunction<DeleteTeamMembersMutation, DeleteTeamMembersMutationVariables>;

/**
 * __useDeleteTeamMembersMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMembersMutation, { data, loading, error }] = useDeleteTeamMembersMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userIdList: // value for 'userIdList'
 *   },
 * });
 */
export function useDeleteTeamMembersMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMembersMutation, DeleteTeamMembersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMembersMutation, DeleteTeamMembersMutationVariables>(DeleteTeamMembersDocument, options);
      }
export type DeleteTeamMembersMutationHookResult = ReturnType<typeof useDeleteTeamMembersMutation>;
export type DeleteTeamMembersMutationResult = Apollo.MutationResult<DeleteTeamMembersMutation>;
export type DeleteTeamMembersMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMembersMutation, DeleteTeamMembersMutationVariables>;
export const TimeLogDocument = gql`
    mutation TimeLog($projectAssignmentId: ID!, $taskId: ID!, $date: Date!, $duration: Interval!) {
  createUpdateOrDeleteTimeLog(
    input: {projectAssignmentId: $projectAssignmentId, taskId: $taskId, date: $date, duration: $duration}
  ) {
    task {
      id
    }
    date
    duration
  }
}
    `;
export type TimeLogMutationFn = Apollo.MutationFunction<TimeLogMutation, TimeLogMutationVariables>;

/**
 * __useTimeLogMutation__
 *
 * To run a mutation, you first call `useTimeLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTimeLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [timeLogMutation, { data, loading, error }] = useTimeLogMutation({
 *   variables: {
 *      projectAssignmentId: // value for 'projectAssignmentId'
 *      taskId: // value for 'taskId'
 *      date: // value for 'date'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useTimeLogMutation(baseOptions?: Apollo.MutationHookOptions<TimeLogMutation, TimeLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TimeLogMutation, TimeLogMutationVariables>(TimeLogDocument, options);
      }
export type TimeLogMutationHookResult = ReturnType<typeof useTimeLogMutation>;
export type TimeLogMutationResult = Apollo.MutationResult<TimeLogMutation>;
export type TimeLogMutationOptions = Apollo.BaseMutationOptions<TimeLogMutation, TimeLogMutationVariables>;
export const GetUserApplicationsDocument = gql`
    query GetUserApplications($holidayUserId: ID!) {
  userHolidayRequests(userId: $holidayUserId) {
    id
    userId
    typeId
    statusId
    createdAt
    status {
      id
      name
    }
    startDate
    endDate
    type {
      id
      name
      shortCode
    }
    user {
      id
      name
      roles
    }
  }
}
    `;

/**
 * __useGetUserApplicationsQuery__
 *
 * To run a query within a React component, call `useGetUserApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserApplicationsQuery({
 *   variables: {
 *      holidayUserId: // value for 'holidayUserId'
 *   },
 * });
 */
export function useGetUserApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetUserApplicationsQuery, GetUserApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserApplicationsQuery, GetUserApplicationsQueryVariables>(GetUserApplicationsDocument, options);
      }
export function useGetUserApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserApplicationsQuery, GetUserApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserApplicationsQuery, GetUserApplicationsQueryVariables>(GetUserApplicationsDocument, options);
        }
export type GetUserApplicationsQueryHookResult = ReturnType<typeof useGetUserApplicationsQuery>;
export type GetUserApplicationsLazyQueryHookResult = ReturnType<typeof useGetUserApplicationsLazyQuery>;
export type GetUserApplicationsQueryResult = Apollo.QueryResult<GetUserApplicationsQuery, GetUserApplicationsQueryVariables>;
export const GetUsersApplicationsDocument = gql`
    query GetUsersApplications($requestStatusIds: [ID]!, $start: DateTime, $end: DateTime) {
  holidayRequests(
    requestStatuses: $requestStatusIds
    startDate: $start
    endDate: $end
  ) {
    id
    userId
    typeId
    statusId
    createdAt
    status {
      id
      name
    }
    startDate
    endDate
    type {
      id
      name
      shortCode
    }
    user {
      id
      name
      roles
    }
  }
}
    `;

/**
 * __useGetUsersApplicationsQuery__
 *
 * To run a query within a React component, call `useGetUsersApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersApplicationsQuery({
 *   variables: {
 *      requestStatusIds: // value for 'requestStatusIds'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetUsersApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersApplicationsQuery, GetUsersApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersApplicationsQuery, GetUsersApplicationsQueryVariables>(GetUsersApplicationsDocument, options);
      }
export function useGetUsersApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersApplicationsQuery, GetUsersApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersApplicationsQuery, GetUsersApplicationsQueryVariables>(GetUsersApplicationsDocument, options);
        }
export type GetUsersApplicationsQueryHookResult = ReturnType<typeof useGetUsersApplicationsQuery>;
export type GetUsersApplicationsLazyQueryHookResult = ReturnType<typeof useGetUsersApplicationsLazyQuery>;
export type GetUsersApplicationsQueryResult = Apollo.QueryResult<GetUsersApplicationsQuery, GetUsersApplicationsQueryVariables>;
export const GetUserApplicationsTypesDocument = gql`
    query GetUserApplicationsTypes {
  holidayRequestTypes {
    id
    name
    shortCode
  }
}
    `;

/**
 * __useGetUserApplicationsTypesQuery__
 *
 * To run a query within a React component, call `useGetUserApplicationsTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserApplicationsTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserApplicationsTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserApplicationsTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserApplicationsTypesQuery, GetUserApplicationsTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserApplicationsTypesQuery, GetUserApplicationsTypesQueryVariables>(GetUserApplicationsTypesDocument, options);
      }
export function useGetUserApplicationsTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserApplicationsTypesQuery, GetUserApplicationsTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserApplicationsTypesQuery, GetUserApplicationsTypesQueryVariables>(GetUserApplicationsTypesDocument, options);
        }
export type GetUserApplicationsTypesQueryHookResult = ReturnType<typeof useGetUserApplicationsTypesQuery>;
export type GetUserApplicationsTypesLazyQueryHookResult = ReturnType<typeof useGetUserApplicationsTypesLazyQuery>;
export type GetUserApplicationsTypesQueryResult = Apollo.QueryResult<GetUserApplicationsTypesQuery, GetUserApplicationsTypesQueryVariables>;
export const GetHolidayRequestStatusesDocument = gql`
    query GetHolidayRequestStatuses {
  holidayRequestStatuses {
    id
    name
  }
}
    `;

/**
 * __useGetHolidayRequestStatusesQuery__
 *
 * To run a query within a React component, call `useGetHolidayRequestStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHolidayRequestStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHolidayRequestStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHolidayRequestStatusesQuery(baseOptions?: Apollo.QueryHookOptions<GetHolidayRequestStatusesQuery, GetHolidayRequestStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHolidayRequestStatusesQuery, GetHolidayRequestStatusesQueryVariables>(GetHolidayRequestStatusesDocument, options);
      }
export function useGetHolidayRequestStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHolidayRequestStatusesQuery, GetHolidayRequestStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHolidayRequestStatusesQuery, GetHolidayRequestStatusesQueryVariables>(GetHolidayRequestStatusesDocument, options);
        }
export type GetHolidayRequestStatusesQueryHookResult = ReturnType<typeof useGetHolidayRequestStatusesQuery>;
export type GetHolidayRequestStatusesLazyQueryHookResult = ReturnType<typeof useGetHolidayRequestStatusesLazyQuery>;
export type GetHolidayRequestStatusesQueryResult = Apollo.QueryResult<GetHolidayRequestStatusesQuery, GetHolidayRequestStatusesQueryVariables>;
export const GetAllClientsDocument = gql`
    query GetAllClients {
  clients(limit: 100) {
    id
    name
    taxId
    currency
    streetWithNumber
    zipCode
    city
  }
}
    `;

/**
 * __useGetAllClientsQuery__
 *
 * To run a query within a React component, call `useGetAllClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllClientsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
      }
export function useGetAllClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
        }
export type GetAllClientsQueryHookResult = ReturnType<typeof useGetAllClientsQuery>;
export type GetAllClientsLazyQueryHookResult = ReturnType<typeof useGetAllClientsLazyQuery>;
export type GetAllClientsQueryResult = Apollo.QueryResult<GetAllClientsQuery, GetAllClientsQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects($clientId: ID!) {
  client(id: $clientId) {
    projects {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetTasksDocument = gql`
    query GetTasks($projectId: ID!) {
  project(id: $projectId) {
    id
    name
    tasks {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetAllTeamsDocument = gql`
    query GetAllTeams {
  teams {
    id
    name
    description
    archived
  }
}
    `;

/**
 * __useGetAllTeamsQuery__
 *
 * To run a query within a React component, call `useGetAllTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, options);
      }
export function useGetAllTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTeamsQuery, GetAllTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTeamsQuery, GetAllTeamsQueryVariables>(GetAllTeamsDocument, options);
        }
export type GetAllTeamsQueryHookResult = ReturnType<typeof useGetAllTeamsQuery>;
export type GetAllTeamsLazyQueryHookResult = ReturnType<typeof useGetAllTeamsLazyQuery>;
export type GetAllTeamsQueryResult = Apollo.QueryResult<GetAllTeamsQuery, GetAllTeamsQueryVariables>;
export const GetAllUsersInTeamDocument = gql`
    query GetAllUsersInTeam($teamId: ID!) {
  teamMembers(teamId: $teamId) {
    userId
    user {
      id
      name
      roles
    }
    team {
      id
      name
      description
      archived
      createdAt
    }
    teamId
  }
}
    `;

/**
 * __useGetAllUsersInTeamQuery__
 *
 * To run a query within a React component, call `useGetAllUsersInTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersInTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersInTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetAllUsersInTeamQuery(baseOptions: Apollo.QueryHookOptions<GetAllUsersInTeamQuery, GetAllUsersInTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersInTeamQuery, GetAllUsersInTeamQueryVariables>(GetAllUsersInTeamDocument, options);
      }
export function useGetAllUsersInTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersInTeamQuery, GetAllUsersInTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersInTeamQuery, GetAllUsersInTeamQueryVariables>(GetAllUsersInTeamDocument, options);
        }
export type GetAllUsersInTeamQueryHookResult = ReturnType<typeof useGetAllUsersInTeamQuery>;
export type GetAllUsersInTeamLazyQueryHookResult = ReturnType<typeof useGetAllUsersInTeamLazyQuery>;
export type GetAllUsersInTeamQueryResult = Apollo.QueryResult<GetAllUsersInTeamQuery, GetAllUsersInTeamQueryVariables>;
export const GetUserTeamsDocument = gql`
    query GetUserTeams($userId: ID!) {
  userTeams(userId: $userId) {
    userId
    teamId
    user {
      id
      name
      roles
    }
    team {
      id
      name
      description
      archived
      createdAt
    }
    createdAt
  }
}
    `;

/**
 * __useGetUserTeamsQuery__
 *
 * To run a query within a React component, call `useGetUserTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTeamsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserTeamsQuery(baseOptions: Apollo.QueryHookOptions<GetUserTeamsQuery, GetUserTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTeamsQuery, GetUserTeamsQueryVariables>(GetUserTeamsDocument, options);
      }
export function useGetUserTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTeamsQuery, GetUserTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTeamsQuery, GetUserTeamsQueryVariables>(GetUserTeamsDocument, options);
        }
export type GetUserTeamsQueryHookResult = ReturnType<typeof useGetUserTeamsQuery>;
export type GetUserTeamsLazyQueryHookResult = ReturnType<typeof useGetUserTeamsLazyQuery>;
export type GetUserTeamsQueryResult = Apollo.QueryResult<GetUserTeamsQuery, GetUserTeamsQueryVariables>;
export const GetTeamInfoDocument = gql`
    query GetTeamInfo($id: ID!) {
  team(id: $id) {
    name
    id
    description
    archived
    createdAt
  }
}
    `;

/**
 * __useGetTeamInfoQuery__
 *
 * To run a query within a React component, call `useGetTeamInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTeamInfoQuery(baseOptions: Apollo.QueryHookOptions<GetTeamInfoQuery, GetTeamInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamInfoQuery, GetTeamInfoQueryVariables>(GetTeamInfoDocument, options);
      }
export function useGetTeamInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamInfoQuery, GetTeamInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamInfoQuery, GetTeamInfoQueryVariables>(GetTeamInfoDocument, options);
        }
export type GetTeamInfoQueryHookResult = ReturnType<typeof useGetTeamInfoQuery>;
export type GetTeamInfoLazyQueryHookResult = ReturnType<typeof useGetTeamInfoLazyQuery>;
export type GetTeamInfoQueryResult = Apollo.QueryResult<GetTeamInfoQuery, GetTeamInfoQueryVariables>;
export const GetUserProjectsDocument = gql`
    query GetUserProjects($userId: ID!, $fromDate: Date, $toDate: Date) {
  projectAssignments(userId: $userId, fromDate: $fromDate, toDate: $toDate) {
    id
    beginDate
    endDate
    project {
      id
      name
      tasks {
        id
        name
      }
      client {
        id
        name
      }
    }
    timeLogs {
      task {
        id
      }
      date
      duration
    }
    timeLogInfo {
      earliestDate
      latestDate
      totalCount
    }
  }
}
    `;

/**
 * __useGetUserProjectsQuery__
 *
 * To run a query within a React component, call `useGetUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProjectsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *   },
 * });
 */
export function useGetUserProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, options);
      }
export function useGetUserProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, options);
        }
export type GetUserProjectsQueryHookResult = ReturnType<typeof useGetUserProjectsQuery>;
export type GetUserProjectsLazyQueryHookResult = ReturnType<typeof useGetUserProjectsLazyQuery>;
export type GetUserProjectsQueryResult = Apollo.QueryResult<GetUserProjectsQuery, GetUserProjectsQueryVariables>;
export const GetUserInfoDocument = gql`
    query GetUserInfo($userId: ID) {
  user(id: $userId) {
    id
    name
    roles
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  users {
    id
    name
    roles
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  user {
    id
    name
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const namedOperations = {
  Query: {
    GetUserApplications: 'GetUserApplications',
    GetUsersApplications: 'GetUsersApplications',
    GetUserApplicationsTypes: 'GetUserApplicationsTypes',
    GetHolidayRequestStatuses: 'GetHolidayRequestStatuses',
    GetAllClients: 'GetAllClients',
    GetProjects: 'GetProjects',
    GetTasks: 'GetTasks',
    GetAllTeams: 'GetAllTeams',
    GetAllUsersInTeam: 'GetAllUsersInTeam',
    GetUserTeams: 'GetUserTeams',
    GetTeamInfo: 'GetTeamInfo',
    GetUserProjects: 'GetUserProjects',
    GetUserInfo: 'GetUserInfo',
    GetAllUsers: 'GetAllUsers',
    getCurrentUser: 'getCurrentUser'
  },
  Mutation: {
    createHolidayRequest: 'createHolidayRequest',
    changeHolidayRequestStatus: 'changeHolidayRequestStatus',
    CreateClient: 'CreateClient',
    UpdateClient: 'UpdateClient',
    ArchiveClient: 'ArchiveClient',
    AddProject: 'AddProject',
    UpdateProject: 'UpdateProject',
    ArchiveProject: 'ArchiveProject',
    AddTask: 'AddTask',
    UpdateTask: 'UpdateTask',
    ArchiveTask: 'ArchiveTask',
    CreateTeam: 'CreateTeam',
    UpdateTeam: 'UpdateTeam',
    ArchiveTeam: 'ArchiveTeam',
    CreateTeamMembers: 'CreateTeamMembers',
    DeleteTeamMembers: 'DeleteTeamMembers',
    TimeLog: 'TimeLog'
  }
}