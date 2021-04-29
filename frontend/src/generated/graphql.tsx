/* eslint-disable max-len */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
;

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

export type Client = {
  __typename?: 'Client';
  id: Scalars['ID'];
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  projects?: Maybe<Array<Project>>;
};

export type CreateClientInput = {
  name: Scalars['String'];
  taxId?: Maybe<Scalars['String']>;
  streetWithNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
};

/** TODO handle validation errors */
export type Mutation = {
  __typename?: 'Mutation';
  createClient: Client;
  updateClient: Client;
  addProject?: Maybe<Project>;
  addTask?: Maybe<Task>;
};

/** TODO handle validation errors */
export type MutationCreateClientArgs = {
  input: CreateClientInput;
};

/** TODO handle validation errors */
export type MutationUpdateClientArgs = {
  id: Scalars['ID'];
  input: CreateClientInput;
};

/** TODO handle validation errors */
export type MutationAddProjectArgs = {
  input: AddProjectInput;
};

/** TODO handle validation errors */
export type MutationAddTaskArgs = {
  input: AddTaskInput;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  tasks?: Maybe<Array<Task>>;
};

export type Query = {
  __typename?: 'Query';
  clients?: Maybe<Array<Client>>;
  client?: Maybe<Client>;
  projects?: Maybe<Array<Project>>;
  project?: Maybe<Project>;
  tasks?: Maybe<Array<Task>>;
  task?: Maybe<Task>;
};

export type QueryClientsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryClientArgs = {
  id: Scalars['ID'];
};

export type QueryProjectsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryProjectArgs = {
  id: Scalars['ID'];
};

export type QueryTasksArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryTaskArgs = {
  id: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
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
    & Pick<Client, 'id' | 'name'>
  ) }
);

export type GetAllClientsQueryVariables = Exact<{ [key: string]: never; }>;

export type GetAllClientsQuery = (
  { __typename?: 'Query' }
  & { clients?: Maybe<Array<(
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name'>
  )>> }
);

export const CreateClientDocument = gql`
    mutation CreateClient($name: String!, $taxId: String, $streetWithNumber: String, $zipCode: String, $city: String) {
  createClient(
    input: {name: $name, taxId: $taxId, streetWithNumber: $streetWithNumber, zipCode: $zipCode, city: $city}
  ) {
    id
    name
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
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
;

  return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
}
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const GetAllClientsDocument = gql`
    query GetAllClients {
  clients(limit: 100) {
    id
    name
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
;

  return Apollo.useQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
}
export function useGetAllClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
;

  return Apollo.useLazyQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
}
export type GetAllClientsQueryHookResult = ReturnType<typeof useGetAllClientsQuery>;
export type GetAllClientsLazyQueryHookResult = ReturnType<typeof useGetAllClientsLazyQuery>;
export type GetAllClientsQueryResult = Apollo.QueryResult<GetAllClientsQuery, GetAllClientsQueryVariables>;