import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AppStateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AppStateQuery = { __typename?: 'Query', app: { __typename?: 'AppState', loggedIn: boolean } };


export const AppStateDocument = gql`
    query AppState {
  app @client {
    loggedIn
  }
}
    `;

/**
 * __useAppStateQuery__
 *
 * To run a query within a React component, call `useAppStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppStateQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppStateQuery(baseOptions?: Apollo.QueryHookOptions<AppStateQuery, AppStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppStateQuery, AppStateQueryVariables>(AppStateDocument, options);
      }
export function useAppStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppStateQuery, AppStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppStateQuery, AppStateQueryVariables>(AppStateDocument, options);
        }
export type AppStateQueryHookResult = ReturnType<typeof useAppStateQuery>;
export type AppStateLazyQueryHookResult = ReturnType<typeof useAppStateLazyQuery>;
export type AppStateQueryResult = Apollo.QueryResult<AppStateQuery, AppStateQueryVariables>;