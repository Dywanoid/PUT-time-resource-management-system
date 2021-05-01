import { gql } from '@apollo/client';

export const GetAllTeams = gql`query{ teams {id, name, description} }`;

export const CreateTeamMutation = gql`
mutation createTeam($name: String!, $description: String)
{ createTeam(input: {name: $name, description: $description}){ id name } }`;