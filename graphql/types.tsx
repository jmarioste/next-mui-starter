export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signin: User;
  signup?: Maybe<User>;
};


export type MutationSigninArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  body: Scalars['String'];
  title: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  posts: Array<Post>;
  secret: User;
};

export type SignupInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  display_name: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};
