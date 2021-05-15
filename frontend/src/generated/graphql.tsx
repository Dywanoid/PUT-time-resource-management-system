/* eslint-disable max-len */
import {
  gql,
  MutationFunction,
  MutationHookOptions,
  useMutation,
  MutationResult,
  BaseMutationOptions,
  useQuery,
  LazyQueryHookOptions,
  useLazyQuery,
  QueryHookOptions,
  QueryResult
} from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
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

export type Client = {
  __typename?: 'Client';
  id: Scalars['ID'];
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  archived: Scalars['Boolean'];
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

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  tasks?: Maybe<Array<Task>>;
  archived: Scalars['Boolean'];
};

export type ProjectTasksArgs = {
  includeArchived?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  clients?: Maybe<Array<Client>>;
  client: Client;
  project: Project;
  task: Task;
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

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  archived: Scalars['Boolean'];
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

export type UpdateClientInput = {
  clientId: Scalars['ID'];
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  projectId: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateTaskInput = {
  taskId: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateClientMutationVariables = Exact<{
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
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

export type GetAllClientsQueryVariables = Exact<{ [key: string]: never; }>;

export type GetAllClientsQuery = (
  { __typename?: 'Query' }
  & { clients?: Maybe<Array<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'taxId' | 'streetWithNumber' | 'zipCode' | 'city'>
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

export const CreateClientDocument = gql`
    mutation CreateClient($name: String!, $taxId: String, $streetWithNumber: String, $zipCode: String, $city: String) {
  createClient(
    input: {name: $name, taxId: $taxId, streetWithNumber: $streetWithNumber, zipCode: $zipCode, city: $city}
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
export type CreateClientMutationFn = MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

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
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
}

export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($clientId: ID!, $name: String!, $taxId: String, $streetWithNumber: String, $zipCode: String, $city: String) {
  updateClient(
    input: {clientId: $clientId, name: $name, taxId: $taxId, streetWithNumber: $streetWithNumber, zipCode: $zipCode, city: $city}
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
export type UpdateClientMutationFn = MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

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
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
}
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const ArchiveClientDocument = gql`
    mutation ArchiveClient($clientId: ID!) {
  archiveClient(input: {clientId: $clientId}) {
    id
  }
}
    `;
export type ArchiveClientMutationFn = MutationFunction<ArchiveClientMutation, ArchiveClientMutationVariables>;

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
export function useArchiveClientMutation(baseOptions?: MutationHookOptions<ArchiveClientMutation, ArchiveClientMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<ArchiveClientMutation, ArchiveClientMutationVariables>(ArchiveClientDocument, options);
}
export type ArchiveClientMutationHookResult = ReturnType<typeof useArchiveClientMutation>;
export type ArchiveClientMutationResult = MutationResult<ArchiveClientMutation>;
export type ArchiveClientMutationOptions = BaseMutationOptions<ArchiveClientMutation, ArchiveClientMutationVariables>;
export const AddProjectDocument = gql`
    mutation AddProject($clientId: ID!, $name: String!) {
  addProject(input: {clientId: $clientId, name: $name}) {
    id
    name
  }
}
    `;
export type AddProjectMutationFn = MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

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
export function useAddProjectMutation(baseOptions?: MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, options);
}
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($projectId: ID!, $name: String!) {
  updateProject(input: {projectId: $projectId, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateProjectMutationFn = MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

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
export function useUpdateProjectMutation(baseOptions?: MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
}
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const ArchiveProjectDocument = gql`
    mutation ArchiveProject($projectId: ID!) {
  archiveProject(input: {projectId: $projectId}) {
    id
  }
}
    `;
export type ArchiveProjectMutationFn = MutationFunction<ArchiveProjectMutation, ArchiveProjectMutationVariables>;

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
export function useArchiveProjectMutation(baseOptions?: MutationHookOptions<ArchiveProjectMutation, ArchiveProjectMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<ArchiveProjectMutation, ArchiveProjectMutationVariables>(ArchiveProjectDocument, options);
}
export type ArchiveProjectMutationHookResult = ReturnType<typeof useArchiveProjectMutation>;
export type ArchiveProjectMutationResult = MutationResult<ArchiveProjectMutation>;
export type ArchiveProjectMutationOptions = BaseMutationOptions<ArchiveProjectMutation, ArchiveProjectMutationVariables>;
export const AddTaskDocument = gql`
    mutation AddTask($projectId: ID!, $name: String!) {
  addTask(input: {projectId: $projectId, name: $name}) {
    id
    name
  }
}
    `;
export type AddTaskMutationFn = MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

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
export function useAddTaskMutation(baseOptions?: MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, options);
}
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($taskId: ID!, $name: String!) {
  updateTask(input: {taskId: $taskId, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateTaskMutationFn = MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

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
export function useUpdateTaskMutation(baseOptions?: MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
}
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const ArchiveTaskDocument = gql`
    mutation ArchiveTask($taskId: ID!) {
  archiveTask(input: {taskId: $taskId}) {
    id
  }
}
    `;
export type ArchiveTaskMutationFn = MutationFunction<ArchiveTaskMutation, ArchiveTaskMutationVariables>;

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
export function useArchiveTaskMutation(baseOptions?: MutationHookOptions<ArchiveTaskMutation, ArchiveTaskMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useMutation<ArchiveTaskMutation, ArchiveTaskMutationVariables>(ArchiveTaskDocument, options);
}
export type ArchiveTaskMutationHookResult = ReturnType<typeof useArchiveTaskMutation>;
export type ArchiveTaskMutationResult = MutationResult<ArchiveTaskMutation>;
export type ArchiveTaskMutationOptions = BaseMutationOptions<ArchiveTaskMutation, ArchiveTaskMutationVariables>;
export const GetAllClientsDocument = gql`
    query GetAllClients {
  clients(limit: 100) {
    id
    name
    taxId
    streetWithNumber
    zipCode
    city
  }
} `;

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
export function useGetAllClientsQuery(baseOptions?: QueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
}

export function useGetAllClientsLazyQuery(baseOptions?: LazyQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useLazyQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
}
export type GetAllClientsQueryHookResult = ReturnType<typeof useGetAllClientsQuery>;
export type GetAllClientsLazyQueryHookResult = ReturnType<typeof useGetAllClientsLazyQuery>;
export type GetAllClientsQueryResult = QueryResult<GetAllClientsQuery, GetAllClientsQueryVariables>;
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
export function useGetProjectsQuery(baseOptions: QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
}

export function useGetProjectsLazyQuery(baseOptions?: LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
}
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
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
export function useGetTasksQuery(baseOptions: QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };

  return useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
}

export function useGetTasksLazyQuery(baseOptions?: LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
  const options = {  ...defaultOptions, ...baseOptions };

  return useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
}

export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const namedOperations = {
  Mutation: {
    AddProject: 'AddProject',
    AddTask: 'AddTask',
    ArchiveClient: 'ArchiveClient',
    ArchiveProject: 'ArchiveProject',
    ArchiveTask: 'ArchiveTask',
    CreateClient: 'CreateClient',
    UpdateClient: 'UpdateClient',
    UpdateProject: 'UpdateProject',
    UpdateTask: 'UpdateTask'
  },
  Query: {
    GetAllClients: 'GetAllClients',
    GetProjects: 'GetProjects',
    GetTasks: 'GetTasks'
  }
};
