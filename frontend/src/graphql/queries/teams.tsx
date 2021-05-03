import { gql } from '@apollo/client';

export const GetAllTeams = gql`query{ teams { id, name, description } }`;

export const CreateTeamMutation = gql`
mutation createTeam($name: String!, $description: String)
{ createTeam(input: { name: $name, description: $description }){ id name } }`;

export const UpdateTeamMutation = gql`
mutation updateTeam($teamId: ID!, $name: String!, $description: String)
{ updateTeam(input: { teamId: $teamId, name: $name, description: $description }){ id name } }`;