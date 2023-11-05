export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: string; output: string; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: number; output: number; }
  AWSURL: { input: string; output: string; }
};

export type Abilities = {
  __typename?: 'Abilities';
  ability?: Maybe<Array<Maybe<Ability>>>;
};

export type AbilitiesInput = {
  ability?: InputMaybe<Array<InputMaybe<AbilityInput>>>;
};

export type Ability = {
  __typename?: 'Ability';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type AbilityInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  catchPokemon?: Maybe<Pokemon>;
};


export type MutationCatchPokemonArgs = {
  input?: InputMaybe<PokemonInput>;
};

export type Pokemon = {
  __typename?: 'Pokemon';
  abilities?: Maybe<Array<Maybe<Abilities>>>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  sprites?: Maybe<Sprites>;
  types?: Maybe<Array<Maybe<Types>>>;
  weight?: Maybe<Scalars['Int']['output']>;
};

export type PokemonInput = {
  abilities?: InputMaybe<Array<InputMaybe<AbilitiesInput>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  sprites?: InputMaybe<SpritesInput>;
  types?: InputMaybe<Array<InputMaybe<TypesInput>>>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getPokemon?: Maybe<Array<Maybe<Pokemon>>>;
};

export type Sprites = {
  __typename?: 'Sprites';
  front_default?: Maybe<Scalars['String']['output']>;
};

export type SpritesInput = {
  front_default?: InputMaybe<Scalars['String']['input']>;
};

export type Type = {
  __typename?: 'Type';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type TypeInput = {
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Types = {
  __typename?: 'Types';
  type?: Maybe<Array<Maybe<Type>>>;
};

export type TypesInput = {
  type?: InputMaybe<Array<InputMaybe<TypeInput>>>;
};
