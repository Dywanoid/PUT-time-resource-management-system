import { gql } from '@apollo/client';

export const GetAllTeams = gql`query{ teams { id, name, description, archived } }`;

export const GetAllUsersInTeam = gql`query teamMembers($teamId: ID!)
{ teamMembers(teamId: $teamId) { userId }}`;

export const GetAllUsers = gql`query{ users { id, name } }`;

export const CreateTeamMutation = gql`
mutation createTeam($name: String!, $description: String)
{ createTeam(input: { name: $name, description: $description }){ id name } }`;

export const UpdateTeamMutation = gql`
mutation updateTeam($teamId: ID!, $name: String!, $description: String)
{ updateTeam(input: { teamId: $teamId, name: $name, description: $description }){ id name } }`;

export const ArchiveTeamMutation = gql`
mutation archiveTeam($teamId: ID!)
{ archiveTeam(input: { teamId: $teamId }){ id } }`;

export const createTeamMembersMutation = gql`
mutation createTeamMemberBatch($teamId: ID!, $userIdList: [ID!])
{ createTeamMemberBatch(input:{ teamId: $teamId, userIdList: $userIdList }){ userId, teamId } }`;