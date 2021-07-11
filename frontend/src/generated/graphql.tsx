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
  status: HolidayRequestStatus;
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

export type ClientReport = Report & {
  __typename?: 'ClientReport';
  client: Client;
  projectReports?: Maybe<Array<ProjectReport>>;
  userReports?: Maybe<Array<UserReport>>;
  totalCost: Scalars['Float'];
  invoiceLinks?: Maybe<Array<DocumentLink>>;
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
  type: HolidayRequestType;
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
};

export type CreateInvoiceInput = {
  clientId: Scalars['ID'];
  billingBeginDate: Scalars['Date'];
  billingEndDate: Scalars['Date'];
  language: Language;
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



export type DayOff = {
  __typename?: 'DayOff';
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  user: User;
};

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

export type DocumentLink = {
  __typename?: 'DocumentLink';
  language: Language;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type HolidayRequest = {
  __typename?: 'HolidayRequest';
  id: Scalars['ID'];
  status: HolidayRequestStatus;
  type: HolidayRequestType;
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  user: User;
  changedBy: User;
};

export enum HolidayRequestStatus {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Cancelled = 'CANCELLED'
}

export enum HolidayRequestType {
  Holiday = 'HOLIDAY',
  OnDemand = 'ON_DEMAND',
  Unpaid = 'UNPAID',
  ChildCare = 'CHILD_CARE',
  CompassionateLeave = 'COMPASSIONATE_LEAVE',
  SickLeave = 'SICK_LEAVE'
}


export enum Language {
  Pl = 'PL',
  En = 'EN'
}

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
  updateSupervisor: User;
  unassignSupervisor: User;
  updateSupervisorBatch?: Maybe<Array<User>>;
  unassignSupervisorBatch?: Maybe<Array<User>>;
  createInvoice: DocumentLink;
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


export type MutationUpdateSupervisorArgs = {
  input: UpdateSupervisorInput;
};


export type MutationUnassignSupervisorArgs = {
  input: UnassignSupervisorInput;
};


export type MutationUpdateSupervisorBatchArgs = {
  input: UpdateSupervisorBatchInput;
};


export type MutationUnassignSupervisorBatchArgs = {
  input: UnassignSupervisorBatchInput;
};


export type MutationCreateInvoiceArgs = {
  input?: Maybe<CreateInvoiceInput>;
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

export type ProjectAssignmentReport = Report & {
  __typename?: 'ProjectAssignmentReport';
  projectAssignment: ProjectAssignment;
  totalDuration: Scalars['Interval'];
  totalCost: Scalars['Float'];
};

export type ProjectReport = Report & {
  __typename?: 'ProjectReport';
  project: Project;
  taskReports?: Maybe<Array<TaskReport>>;
  userReports?: Maybe<Array<UserReport>>;
  totalCost: Scalars['Float'];
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
  holidayRequests?: Maybe<Array<HolidayRequest>>;
  daysOff?: Maybe<Array<DayOff>>;
  /** @deprecated use team(id) { members { ... } } */
  teamMembers?: Maybe<Array<TeamMember>>;
  /** @deprecated use user(id) { teams { ... } } */
  userTeams?: Maybe<Array<TeamMember>>;
  projectAssignments?: Maybe<Array<ProjectAssignment>>;
  getAllSubordinates?: Maybe<Array<User>>;
  clientReports?: Maybe<Array<ClientReport>>;
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


export type QueryHolidayRequestsArgs = {
  requestStatuses?: Maybe<Array<Maybe<HolidayRequestStatus>>>;
  requestTypes?: Maybe<Array<Maybe<HolidayRequestType>>>;
  userList?: Maybe<Array<Maybe<Scalars['ID']>>>;
  teamList?: Maybe<Array<Maybe<Scalars['ID']>>>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};


export type QueryDaysOffArgs = {
  userList?: Maybe<Array<Maybe<Scalars['ID']>>>;
  teamList?: Maybe<Array<Maybe<Scalars['ID']>>>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};


export type QueryTeamMembersArgs = {
  teamId: Scalars['ID'];
};


export type QueryUserTeamsArgs = {
  userId: Scalars['ID'];
};


export type QueryProjectAssignmentsArgs = {
  userId?: Maybe<Scalars['ID']>;
  projectId?: Maybe<Scalars['ID']>;
  fromDate?: Maybe<Scalars['Date']>;
  toDate?: Maybe<Scalars['Date']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetAllSubordinatesArgs = {
  userId?: Maybe<Scalars['ID']>;
};


export type QueryClientReportsArgs = {
  clientIds?: Maybe<Array<Scalars['ID']>>;
  fromDate: Scalars['Date'];
  toDate: Scalars['Date'];
};

export type Report = {
  totalCost: Scalars['Float'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  project: Project;
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  archived: Scalars['Boolean'];
};

export type TaskReport = Report & {
  __typename?: 'TaskReport';
  task: Task;
  userReports?: Maybe<Array<UserReport>>;
  totalCost: Scalars['Float'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  members?: Maybe<Array<User>>;
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

export type UnassignSupervisorBatchInput = {
  userList?: Maybe<Array<Scalars['ID']>>;
};

export type UnassignSupervisorInput = {
  userId: Scalars['ID'];
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

export type UpdateSupervisorBatchInput = {
  userList?: Maybe<Array<Scalars['ID']>>;
  supervisorId: Scalars['ID'];
};

export type UpdateSupervisorInput = {
  userId: Scalars['ID'];
  supervisorId: Scalars['ID'];
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
  teams?: Maybe<Array<Team>>;
  supervisor?: Maybe<User>;
  subordinates?: Maybe<Array<User>>;
};

export type UserReport = Report & {
  __typename?: 'UserReport';
  user?: Maybe<User>;
  projectAssignmentReports?: Maybe<Array<ProjectAssignmentReport>>;
  totalCost: Scalars['Float'];
};

export type CreateHolidayRequestMutationVariables = Exact<{
  userId: Scalars['ID'];
  type: HolidayRequestType;
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type CreateHolidayRequestMutation = (
  { __typename?: 'Mutation' }
  & { createHolidayRequest: (
    { __typename?: 'HolidayRequest' }
    & Pick<HolidayRequest, 'id' | 'status' | 'type' | 'startDate' | 'endDate' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
      & { teams?: Maybe<Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'description' | 'archived' | 'createdAt'>
      )>> }
    ), changedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type ChangeHolidayRequestStatusMutationVariables = Exact<{
  requestId: Scalars['ID'];
  status: HolidayRequestStatus;
}>;


export type ChangeHolidayRequestStatusMutation = (
  { __typename?: 'Mutation' }
  & { changeHolidayRequestStatus: (
    { __typename?: 'HolidayRequest' }
    & Pick<HolidayRequest, 'id' | 'status' | 'type' | 'startDate' | 'endDate' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
      & { teams?: Maybe<Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'description' | 'archived' | 'createdAt'>
      )>> }
    ), changedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
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

export type AssignUserToProjectMutationVariables = Exact<{
  userId: Scalars['ID'];
  projectId: Scalars['ID'];
  hourlyRate: Scalars['Float'];
  beginDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
}>;


export type AssignUserToProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProjectAssignment: (
    { __typename?: 'ProjectAssignment' }
    & Pick<ProjectAssignment, 'id' | 'hourlyRate'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type DeleteUserFromProjectMutationVariables = Exact<{
  projectAssignmentId: Scalars['ID'];
}>;


export type DeleteUserFromProjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteProjectAssignment: (
    { __typename?: 'ProjectAssignment' }
    & Pick<ProjectAssignment, 'id'>
  ) }
);

export type UpdateProjectAssignmentMutationVariables = Exact<{
  projectAssignmentId: Scalars['ID'];
  hourlyRate: Scalars['Float'];
  beginDate: Scalars['Date'];
  endDate: Scalars['Date'];
}>;


export type UpdateProjectAssignmentMutation = (
  { __typename?: 'Mutation' }
  & { updateProjectAssignment: (
    { __typename?: 'ProjectAssignment' }
    & Pick<ProjectAssignment, 'id' | 'hourlyRate'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
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

export type CreateInvoiceMutationVariables = Exact<{
  clientId: Scalars['ID'];
  beginDate: Scalars['Date'];
  endDate: Scalars['Date'];
  language: Language;
}>;


export type CreateInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { createInvoice: (
    { __typename?: 'DocumentLink' }
    & Pick<DocumentLink, 'language' | 'title' | 'url'>
  ) }
);

export type UpdateSupervisorBatchMutationVariables = Exact<{
  userList?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
  supervisorId: Scalars['ID'];
}>;


export type UpdateSupervisorBatchMutation = (
  { __typename?: 'Mutation' }
  & { updateSupervisorBatch?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )>> }
);

export type UnassignSupervisorBatchMutationVariables = Exact<{
  userList?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type UnassignSupervisorBatchMutation = (
  { __typename?: 'Mutation' }
  & { unassignSupervisorBatch?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )>> }
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

export type UnarchiveTeamMutationVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type UnarchiveTeamMutation = (
  { __typename?: 'Mutation' }
  & { unarchiveTeam: (
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

export type GetHolidayRequestsQueryVariables = Exact<{
  requestStatuses?: Maybe<Array<Maybe<HolidayRequestStatus>> | Maybe<HolidayRequestStatus>>;
  requestTypes?: Maybe<Array<Maybe<HolidayRequestType>> | Maybe<HolidayRequestType>>;
  startDate?: Maybe<Scalars['DateTime']>;
  userList?: Maybe<Array<Maybe<Scalars['ID']>> | Maybe<Scalars['ID']>>;
  teamList?: Maybe<Array<Maybe<Scalars['ID']>> | Maybe<Scalars['ID']>>;
  endDate?: Maybe<Scalars['DateTime']>;
}>;


export type GetHolidayRequestsQuery = (
  { __typename?: 'Query' }
  & { holidayRequests?: Maybe<Array<(
    { __typename?: 'HolidayRequest' }
    & Pick<HolidayRequest, 'id' | 'type' | 'status' | 'createdAt' | 'startDate' | 'endDate'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
      & { teams?: Maybe<Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'description' | 'archived' | 'createdAt'>
        & { members?: Maybe<Array<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name'>
        )>> }
      )>> }
    ) }
  )>> }
);

export type GetUsersDayOffQueryVariables = Exact<{
  startDate?: Maybe<Scalars['DateTime']>;
  userList?: Maybe<Array<Maybe<Scalars['ID']>> | Maybe<Scalars['ID']>>;
  teamList?: Maybe<Array<Maybe<Scalars['ID']>> | Maybe<Scalars['ID']>>;
  endDate?: Maybe<Scalars['DateTime']>;
}>;


export type GetUsersDayOffQuery = (
  { __typename?: 'Query' }
  & { daysOff?: Maybe<Array<(
    { __typename?: 'DayOff' }
    & Pick<DayOff, 'startDate' | 'endDate'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
      & { teams?: Maybe<Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'description' | 'archived' | 'createdAt'>
        & { members?: Maybe<Array<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name'>
        )>> }
      )>> }
    ) }
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

export type GetProjectAssignmentsQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type GetProjectAssignmentsQuery = (
  { __typename?: 'Query' }
  & { projectAssignments?: Maybe<Array<(
    { __typename?: 'ProjectAssignment' }
    & Pick<ProjectAssignment, 'id' | 'hourlyRate' | 'beginDate' | 'endDate' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ), project: (
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    ) }
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

export type GetAllClientsAndProjectsWithTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllClientsAndProjectsWithTasksQuery = (
  { __typename?: 'Query' }
  & { clients?: Maybe<Array<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'currency'>
    & { projects?: Maybe<Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
      & { tasks?: Maybe<Array<(
        { __typename?: 'Task' }
        & Pick<Task, 'id' | 'name'>
      )>> }
    )>> }
  )>> }
);

export type GetClientReportsQueryVariables = Exact<{
  clientIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
  fromDate: Scalars['Date'];
  toDate: Scalars['Date'];
}>;


export type GetClientReportsQuery = (
  { __typename?: 'Query' }
  & { clientReports?: Maybe<Array<(
    { __typename?: 'ClientReport' }
    & Pick<ClientReport, 'totalCost'>
    & { client: (
      { __typename?: 'Client' }
      & Pick<Client, 'id' | 'name'>
    ), projectReports?: Maybe<Array<(
      { __typename?: 'ProjectReport' }
      & Pick<ProjectReport, 'totalCost'>
      & { project: (
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name'>
      ), taskReports?: Maybe<Array<(
        { __typename?: 'TaskReport' }
        & Pick<TaskReport, 'totalCost'>
        & { task: (
          { __typename?: 'Task' }
          & Pick<Task, 'id' | 'name'>
        ), userReports?: Maybe<Array<(
          { __typename?: 'UserReport' }
          & { projectAssignmentReports?: Maybe<Array<(
            { __typename?: 'ProjectAssignmentReport' }
            & Pick<ProjectAssignmentReport, 'totalDuration'>
          )>> }
        )>> }
      )>>, userReports?: Maybe<Array<(
        { __typename?: 'UserReport' }
        & { projectAssignmentReports?: Maybe<Array<(
          { __typename?: 'ProjectAssignmentReport' }
          & Pick<ProjectAssignmentReport, 'totalDuration'>
        )>> }
      )>> }
    )>>, invoiceLinks?: Maybe<Array<(
      { __typename?: 'DocumentLink' }
      & Pick<DocumentLink, 'url' | 'language' | 'title'>
    )>>, userReports?: Maybe<Array<(
      { __typename?: 'UserReport' }
      & { projectAssignmentReports?: Maybe<Array<(
        { __typename?: 'ProjectAssignmentReport' }
        & Pick<ProjectAssignmentReport, 'totalDuration'>
      )>> }
    )>> }
  )>> }
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
    & { members?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
      & { supervisor?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      )>, subordinates?: Maybe<Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'roles'>
      )>> }
    )>> }
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
  userId?: Maybe<Scalars['ID']>;
  fromDate?: Maybe<Scalars['Date']>;
  toDate?: Maybe<Scalars['Date']>;
}>;


export type GetUserProjectsQuery = (
  { __typename?: 'Query' }
  & { projectAssignments?: Maybe<Array<(
    { __typename?: 'ProjectAssignment' }
    & Pick<ProjectAssignment, 'id' | 'beginDate' | 'endDate'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ), project: (
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

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'roles'>
    & { teams?: Maybe<Array<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'description' | 'archived' | 'createdAt'>
      & { members?: Maybe<Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'roles'>
        & { supervisor?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name'>
        )>, subordinates?: Maybe<Array<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name' | 'roles'>
        )>> }
      )>> }
    )>>, supervisor?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>, subordinates?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
    )>> }
  )>> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'roles'>
    & { teams?: Maybe<Array<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'description' | 'archived' | 'createdAt'>
      & { members?: Maybe<Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'roles'>
        & { supervisor?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name'>
        )>, subordinates?: Maybe<Array<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name' | 'roles'>
        )>> }
      )>> }
    )>>, supervisor?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>, subordinates?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'roles'>
    )>> }
  ) }
);


export const CreateHolidayRequestDocument = gql`
    mutation createHolidayRequest($userId: ID!, $type: HolidayRequestType!, $startDate: DateTime!, $endDate: DateTime!) {
  createHolidayRequest(
    input: {userId: $userId, type: $type, startDate: $startDate, endDate: $endDate}
  ) {
    id
    status
    type
    startDate
    endDate
    createdAt
    user {
      id
      name
      roles
      teams {
        id
        name
        description
        archived
        createdAt
      }
    }
    changedBy {
      id
      name
    }
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
 *      type: // value for 'type'
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
    mutation changeHolidayRequestStatus($requestId: ID!, $status: HolidayRequestStatus!) {
  changeHolidayRequestStatus(input: {requestId: $requestId, status: $status}) {
    id
    status
    type
    startDate
    endDate
    createdAt
    user {
      id
      name
      roles
      teams {
        id
        name
        description
        archived
        createdAt
      }
    }
    changedBy {
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
 *      status: // value for 'status'
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
export const AssignUserToProjectDocument = gql`
    mutation AssignUserToProject($userId: ID!, $projectId: ID!, $hourlyRate: Float!, $beginDate: Date, $endDate: Date) {
  createProjectAssignment(
    input: {userId: $userId, projectId: $projectId, hourlyRate: $hourlyRate, beginDate: $beginDate, endDate: $endDate}
  ) {
    id
    user {
      id
      name
    }
    hourlyRate
  }
}
    `;
export type AssignUserToProjectMutationFn = Apollo.MutationFunction<AssignUserToProjectMutation, AssignUserToProjectMutationVariables>;

/**
 * __useAssignUserToProjectMutation__
 *
 * To run a mutation, you first call `useAssignUserToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserToProjectMutation, { data, loading, error }] = useAssignUserToProjectMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      projectId: // value for 'projectId'
 *      hourlyRate: // value for 'hourlyRate'
 *      beginDate: // value for 'beginDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useAssignUserToProjectMutation(baseOptions?: Apollo.MutationHookOptions<AssignUserToProjectMutation, AssignUserToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignUserToProjectMutation, AssignUserToProjectMutationVariables>(AssignUserToProjectDocument, options);
      }
export type AssignUserToProjectMutationHookResult = ReturnType<typeof useAssignUserToProjectMutation>;
export type AssignUserToProjectMutationResult = Apollo.MutationResult<AssignUserToProjectMutation>;
export type AssignUserToProjectMutationOptions = Apollo.BaseMutationOptions<AssignUserToProjectMutation, AssignUserToProjectMutationVariables>;
export const DeleteUserFromProjectDocument = gql`
    mutation DeleteUserFromProject($projectAssignmentId: ID!) {
  deleteProjectAssignment(input: {projectAssignmentId: $projectAssignmentId}) {
    id
  }
}
    `;
export type DeleteUserFromProjectMutationFn = Apollo.MutationFunction<DeleteUserFromProjectMutation, DeleteUserFromProjectMutationVariables>;

/**
 * __useDeleteUserFromProjectMutation__
 *
 * To run a mutation, you first call `useDeleteUserFromProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserFromProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserFromProjectMutation, { data, loading, error }] = useDeleteUserFromProjectMutation({
 *   variables: {
 *      projectAssignmentId: // value for 'projectAssignmentId'
 *   },
 * });
 */
export function useDeleteUserFromProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserFromProjectMutation, DeleteUserFromProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserFromProjectMutation, DeleteUserFromProjectMutationVariables>(DeleteUserFromProjectDocument, options);
      }
export type DeleteUserFromProjectMutationHookResult = ReturnType<typeof useDeleteUserFromProjectMutation>;
export type DeleteUserFromProjectMutationResult = Apollo.MutationResult<DeleteUserFromProjectMutation>;
export type DeleteUserFromProjectMutationOptions = Apollo.BaseMutationOptions<DeleteUserFromProjectMutation, DeleteUserFromProjectMutationVariables>;
export const UpdateProjectAssignmentDocument = gql`
    mutation updateProjectAssignment($projectAssignmentId: ID!, $hourlyRate: Float!, $beginDate: Date!, $endDate: Date!) {
  updateProjectAssignment(
    input: {projectAssignmentId: $projectAssignmentId, hourlyRate: $hourlyRate, beginDate: $beginDate, endDate: $endDate}
  ) {
    id
    user {
      id
      name
    }
    hourlyRate
  }
}
    `;
export type UpdateProjectAssignmentMutationFn = Apollo.MutationFunction<UpdateProjectAssignmentMutation, UpdateProjectAssignmentMutationVariables>;

/**
 * __useUpdateProjectAssignmentMutation__
 *
 * To run a mutation, you first call `useUpdateProjectAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectAssignmentMutation, { data, loading, error }] = useUpdateProjectAssignmentMutation({
 *   variables: {
 *      projectAssignmentId: // value for 'projectAssignmentId'
 *      hourlyRate: // value for 'hourlyRate'
 *      beginDate: // value for 'beginDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useUpdateProjectAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectAssignmentMutation, UpdateProjectAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectAssignmentMutation, UpdateProjectAssignmentMutationVariables>(UpdateProjectAssignmentDocument, options);
      }
export type UpdateProjectAssignmentMutationHookResult = ReturnType<typeof useUpdateProjectAssignmentMutation>;
export type UpdateProjectAssignmentMutationResult = Apollo.MutationResult<UpdateProjectAssignmentMutation>;
export type UpdateProjectAssignmentMutationOptions = Apollo.BaseMutationOptions<UpdateProjectAssignmentMutation, UpdateProjectAssignmentMutationVariables>;
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
export const CreateInvoiceDocument = gql`
    mutation CreateInvoice($clientId: ID!, $beginDate: Date!, $endDate: Date!, $language: Language!) {
  createInvoice(
    input: {clientId: $clientId, billingEndDate: $endDate, billingBeginDate: $beginDate, language: $language}
  ) {
    language
    title
    url
  }
}
    `;
export type CreateInvoiceMutationFn = Apollo.MutationFunction<CreateInvoiceMutation, CreateInvoiceMutationVariables>;

/**
 * __useCreateInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoiceMutation, { data, loading, error }] = useCreateInvoiceMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      beginDate: // value for 'beginDate'
 *      endDate: // value for 'endDate'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useCreateInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvoiceMutation, CreateInvoiceMutationVariables>(CreateInvoiceDocument, options);
      }
export type CreateInvoiceMutationHookResult = ReturnType<typeof useCreateInvoiceMutation>;
export type CreateInvoiceMutationResult = Apollo.MutationResult<CreateInvoiceMutation>;
export type CreateInvoiceMutationOptions = Apollo.BaseMutationOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const UpdateSupervisorBatchDocument = gql`
    mutation updateSupervisorBatch($userList: [ID!], $supervisorId: ID!) {
  updateSupervisorBatch(input: {userList: $userList, supervisorId: $supervisorId}) {
    id
    name
  }
}
    `;
export type UpdateSupervisorBatchMutationFn = Apollo.MutationFunction<UpdateSupervisorBatchMutation, UpdateSupervisorBatchMutationVariables>;

/**
 * __useUpdateSupervisorBatchMutation__
 *
 * To run a mutation, you first call `useUpdateSupervisorBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSupervisorBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSupervisorBatchMutation, { data, loading, error }] = useUpdateSupervisorBatchMutation({
 *   variables: {
 *      userList: // value for 'userList'
 *      supervisorId: // value for 'supervisorId'
 *   },
 * });
 */
export function useUpdateSupervisorBatchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSupervisorBatchMutation, UpdateSupervisorBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSupervisorBatchMutation, UpdateSupervisorBatchMutationVariables>(UpdateSupervisorBatchDocument, options);
      }
export type UpdateSupervisorBatchMutationHookResult = ReturnType<typeof useUpdateSupervisorBatchMutation>;
export type UpdateSupervisorBatchMutationResult = Apollo.MutationResult<UpdateSupervisorBatchMutation>;
export type UpdateSupervisorBatchMutationOptions = Apollo.BaseMutationOptions<UpdateSupervisorBatchMutation, UpdateSupervisorBatchMutationVariables>;
export const UnassignSupervisorBatchDocument = gql`
    mutation unassignSupervisorBatch($userList: [ID!]) {
  unassignSupervisorBatch(input: {userList: $userList}) {
    id
    name
  }
}
    `;
export type UnassignSupervisorBatchMutationFn = Apollo.MutationFunction<UnassignSupervisorBatchMutation, UnassignSupervisorBatchMutationVariables>;

/**
 * __useUnassignSupervisorBatchMutation__
 *
 * To run a mutation, you first call `useUnassignSupervisorBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignSupervisorBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignSupervisorBatchMutation, { data, loading, error }] = useUnassignSupervisorBatchMutation({
 *   variables: {
 *      userList: // value for 'userList'
 *   },
 * });
 */
export function useUnassignSupervisorBatchMutation(baseOptions?: Apollo.MutationHookOptions<UnassignSupervisorBatchMutation, UnassignSupervisorBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnassignSupervisorBatchMutation, UnassignSupervisorBatchMutationVariables>(UnassignSupervisorBatchDocument, options);
      }
export type UnassignSupervisorBatchMutationHookResult = ReturnType<typeof useUnassignSupervisorBatchMutation>;
export type UnassignSupervisorBatchMutationResult = Apollo.MutationResult<UnassignSupervisorBatchMutation>;
export type UnassignSupervisorBatchMutationOptions = Apollo.BaseMutationOptions<UnassignSupervisorBatchMutation, UnassignSupervisorBatchMutationVariables>;
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
export const UnarchiveTeamDocument = gql`
    mutation UnarchiveTeam($teamId: ID!) {
  unarchiveTeam(input: {teamId: $teamId}) {
    id
  }
}
    `;
export type UnarchiveTeamMutationFn = Apollo.MutationFunction<UnarchiveTeamMutation, UnarchiveTeamMutationVariables>;

/**
 * __useUnarchiveTeamMutation__
 *
 * To run a mutation, you first call `useUnarchiveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnarchiveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unarchiveTeamMutation, { data, loading, error }] = useUnarchiveTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useUnarchiveTeamMutation(baseOptions?: Apollo.MutationHookOptions<UnarchiveTeamMutation, UnarchiveTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnarchiveTeamMutation, UnarchiveTeamMutationVariables>(UnarchiveTeamDocument, options);
      }
export type UnarchiveTeamMutationHookResult = ReturnType<typeof useUnarchiveTeamMutation>;
export type UnarchiveTeamMutationResult = Apollo.MutationResult<UnarchiveTeamMutation>;
export type UnarchiveTeamMutationOptions = Apollo.BaseMutationOptions<UnarchiveTeamMutation, UnarchiveTeamMutationVariables>;
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
export const GetHolidayRequestsDocument = gql`
    query GetHolidayRequests($requestStatuses: [HolidayRequestStatus], $requestTypes: [HolidayRequestType], $startDate: DateTime, $userList: [ID], $teamList: [ID], $endDate: DateTime) {
  holidayRequests(
    requestStatuses: $requestStatuses
    requestTypes: $requestTypes
    startDate: $startDate
    endDate: $endDate
    userList: $userList
    teamList: $teamList
  ) {
    id
    type
    status
    createdAt
    startDate
    endDate
    user {
      id
      name
      roles
      teams {
        id
        name
        description
        archived
        createdAt
        members {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetHolidayRequestsQuery__
 *
 * To run a query within a React component, call `useGetHolidayRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHolidayRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHolidayRequestsQuery({
 *   variables: {
 *      requestStatuses: // value for 'requestStatuses'
 *      requestTypes: // value for 'requestTypes'
 *      startDate: // value for 'startDate'
 *      userList: // value for 'userList'
 *      teamList: // value for 'teamList'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useGetHolidayRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetHolidayRequestsQuery, GetHolidayRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHolidayRequestsQuery, GetHolidayRequestsQueryVariables>(GetHolidayRequestsDocument, options);
      }
export function useGetHolidayRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHolidayRequestsQuery, GetHolidayRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHolidayRequestsQuery, GetHolidayRequestsQueryVariables>(GetHolidayRequestsDocument, options);
        }
export type GetHolidayRequestsQueryHookResult = ReturnType<typeof useGetHolidayRequestsQuery>;
export type GetHolidayRequestsLazyQueryHookResult = ReturnType<typeof useGetHolidayRequestsLazyQuery>;
export type GetHolidayRequestsQueryResult = Apollo.QueryResult<GetHolidayRequestsQuery, GetHolidayRequestsQueryVariables>;
export const GetUsersDayOffDocument = gql`
    query GetUsersDayOff($startDate: DateTime, $userList: [ID], $teamList: [ID], $endDate: DateTime) {
  daysOff(
    startDate: $startDate
    endDate: $endDate
    userList: $userList
    teamList: $teamList
  ) {
    startDate
    endDate
    user {
      id
      name
      roles
      teams {
        id
        name
        description
        archived
        createdAt
        members {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetUsersDayOffQuery__
 *
 * To run a query within a React component, call `useGetUsersDayOffQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersDayOffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersDayOffQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      userList: // value for 'userList'
 *      teamList: // value for 'teamList'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useGetUsersDayOffQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersDayOffQuery, GetUsersDayOffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersDayOffQuery, GetUsersDayOffQueryVariables>(GetUsersDayOffDocument, options);
      }
export function useGetUsersDayOffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersDayOffQuery, GetUsersDayOffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersDayOffQuery, GetUsersDayOffQueryVariables>(GetUsersDayOffDocument, options);
        }
export type GetUsersDayOffQueryHookResult = ReturnType<typeof useGetUsersDayOffQuery>;
export type GetUsersDayOffLazyQueryHookResult = ReturnType<typeof useGetUsersDayOffLazyQuery>;
export type GetUsersDayOffQueryResult = Apollo.QueryResult<GetUsersDayOffQuery, GetUsersDayOffQueryVariables>;
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
export const GetProjectAssignmentsDocument = gql`
    query GetProjectAssignments($projectId: ID!) {
  projectAssignments(projectId: $projectId) {
    id
    user {
      id
      name
    }
    hourlyRate
    beginDate
    endDate
    createdAt
    project {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProjectAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetProjectAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectAssignmentsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectAssignmentsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectAssignmentsQuery, GetProjectAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectAssignmentsQuery, GetProjectAssignmentsQueryVariables>(GetProjectAssignmentsDocument, options);
      }
export function useGetProjectAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectAssignmentsQuery, GetProjectAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectAssignmentsQuery, GetProjectAssignmentsQueryVariables>(GetProjectAssignmentsDocument, options);
        }
export type GetProjectAssignmentsQueryHookResult = ReturnType<typeof useGetProjectAssignmentsQuery>;
export type GetProjectAssignmentsLazyQueryHookResult = ReturnType<typeof useGetProjectAssignmentsLazyQuery>;
export type GetProjectAssignmentsQueryResult = Apollo.QueryResult<GetProjectAssignmentsQuery, GetProjectAssignmentsQueryVariables>;
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
export const GetAllClientsAndProjectsWithTasksDocument = gql`
    query GetAllClientsAndProjectsWithTasks {
  clients {
    id
    name
    currency
    projects {
      id
      name
      tasks {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetAllClientsAndProjectsWithTasksQuery__
 *
 * To run a query within a React component, call `useGetAllClientsAndProjectsWithTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClientsAndProjectsWithTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClientsAndProjectsWithTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllClientsAndProjectsWithTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllClientsAndProjectsWithTasksQuery, GetAllClientsAndProjectsWithTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllClientsAndProjectsWithTasksQuery, GetAllClientsAndProjectsWithTasksQueryVariables>(GetAllClientsAndProjectsWithTasksDocument, options);
      }
export function useGetAllClientsAndProjectsWithTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClientsAndProjectsWithTasksQuery, GetAllClientsAndProjectsWithTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllClientsAndProjectsWithTasksQuery, GetAllClientsAndProjectsWithTasksQueryVariables>(GetAllClientsAndProjectsWithTasksDocument, options);
        }
export type GetAllClientsAndProjectsWithTasksQueryHookResult = ReturnType<typeof useGetAllClientsAndProjectsWithTasksQuery>;
export type GetAllClientsAndProjectsWithTasksLazyQueryHookResult = ReturnType<typeof useGetAllClientsAndProjectsWithTasksLazyQuery>;
export type GetAllClientsAndProjectsWithTasksQueryResult = Apollo.QueryResult<GetAllClientsAndProjectsWithTasksQuery, GetAllClientsAndProjectsWithTasksQueryVariables>;
export const GetClientReportsDocument = gql`
    query GetClientReports($clientIds: [ID!], $fromDate: Date!, $toDate: Date!) {
  clientReports(clientIds: $clientIds, fromDate: $fromDate, toDate: $toDate) {
    client {
      id
      name
    }
    projectReports {
      project {
        id
        name
      }
      taskReports {
        task {
          id
          name
        }
        totalCost
        userReports {
          projectAssignmentReports {
            totalDuration
          }
        }
      }
      totalCost
      userReports {
        projectAssignmentReports {
          totalDuration
        }
      }
    }
    invoiceLinks {
      url
      language
      title
    }
    totalCost
    userReports {
      projectAssignmentReports {
        totalDuration
      }
    }
  }
}
    `;

/**
 * __useGetClientReportsQuery__
 *
 * To run a query within a React component, call `useGetClientReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientReportsQuery({
 *   variables: {
 *      clientIds: // value for 'clientIds'
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *   },
 * });
 */
export function useGetClientReportsQuery(baseOptions: Apollo.QueryHookOptions<GetClientReportsQuery, GetClientReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientReportsQuery, GetClientReportsQueryVariables>(GetClientReportsDocument, options);
      }
export function useGetClientReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientReportsQuery, GetClientReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientReportsQuery, GetClientReportsQueryVariables>(GetClientReportsDocument, options);
        }
export type GetClientReportsQueryHookResult = ReturnType<typeof useGetClientReportsQuery>;
export type GetClientReportsLazyQueryHookResult = ReturnType<typeof useGetClientReportsLazyQuery>;
export type GetClientReportsQueryResult = Apollo.QueryResult<GetClientReportsQuery, GetClientReportsQueryVariables>;
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
    members {
      id
      name
      roles
      supervisor {
        id
        name
      }
      subordinates {
        id
        name
        roles
      }
    }
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
    query GetUserProjects($userId: ID, $fromDate: Date, $toDate: Date) {
  projectAssignments(userId: $userId, fromDate: $fromDate, toDate: $toDate) {
    id
    beginDate
    endDate
    user {
      id
      name
    }
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
export function useGetUserProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
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
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  users {
    id
    name
    roles
    teams {
      id
      name
      description
      archived
      createdAt
      members {
        id
        name
        roles
        supervisor {
          id
          name
        }
        subordinates {
          id
          name
          roles
        }
      }
    }
    supervisor {
      id
      name
    }
    subordinates {
      id
      name
      roles
    }
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
    query GetCurrentUser {
  user {
    id
    name
    roles
    teams {
      id
      name
      description
      archived
      createdAt
      members {
        id
        name
        roles
        supervisor {
          id
          name
        }
        subordinates {
          id
          name
          roles
        }
      }
    }
    supervisor {
      id
      name
    }
    subordinates {
      id
      name
      roles
    }
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
    GetHolidayRequests: 'GetHolidayRequests',
    GetUsersDayOff: 'GetUsersDayOff',
    GetAllClients: 'GetAllClients',
    GetProjectAssignments: 'GetProjectAssignments',
    GetProjects: 'GetProjects',
    GetAllClientsAndProjectsWithTasks: 'GetAllClientsAndProjectsWithTasks',
    GetClientReports: 'GetClientReports',
    GetTasks: 'GetTasks',
    GetAllTeams: 'GetAllTeams',
    GetTeamInfo: 'GetTeamInfo',
    GetUserProjects: 'GetUserProjects',
    GetAllUsers: 'GetAllUsers',
    GetCurrentUser: 'GetCurrentUser'
  },
  Mutation: {
    createHolidayRequest: 'createHolidayRequest',
    changeHolidayRequestStatus: 'changeHolidayRequestStatus',
    CreateClient: 'CreateClient',
    UpdateClient: 'UpdateClient',
    ArchiveClient: 'ArchiveClient',
    AssignUserToProject: 'AssignUserToProject',
    DeleteUserFromProject: 'DeleteUserFromProject',
    updateProjectAssignment: 'updateProjectAssignment',
    AddProject: 'AddProject',
    UpdateProject: 'UpdateProject',
    ArchiveProject: 'ArchiveProject',
    CreateInvoice: 'CreateInvoice',
    updateSupervisorBatch: 'updateSupervisorBatch',
    unassignSupervisorBatch: 'unassignSupervisorBatch',
    AddTask: 'AddTask',
    UpdateTask: 'UpdateTask',
    ArchiveTask: 'ArchiveTask',
    CreateTeam: 'CreateTeam',
    UpdateTeam: 'UpdateTeam',
    ArchiveTeam: 'ArchiveTeam',
    UnarchiveTeam: 'UnarchiveTeam',
    CreateTeamMembers: 'CreateTeamMembers',
    DeleteTeamMembers: 'DeleteTeamMembers',
    TimeLog: 'TimeLog'
  }
}