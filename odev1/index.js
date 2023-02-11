const { ApolloServer, gql } = require("apollo-server");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { users, events, locations, participants } = require("./data.json");

const typeDefs = gql`

  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]
    participants: [Participant!]
  }

  type Event{
    id: ID!
    title: String!
    desc: String!
    date: String!,
    from: String!,
    to: String!,
    location_id: ID!,
    location: Location!,
    user_id: ID!,
    user: User!,
    participants: [Participant!]
  }

  type Location{
    id: ID!
    name: String!
    desc: String!
    lat: Float,
    lng: Float!
  }

  type Participant{
    id: ID!,
    user_id: ID!,
    event_id: ID!
    user: User!
    event: Event!
  }

  type Query {
    users: [User!]!
    events: [Event!]!
    locations: [Location!]!
    participants: [Participant!]!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    events: () => events,
    locations: () => locations,
    participants: () => participants,
  },
  User: {
    events: (parent, args) => {
      return events.filter(event => event.user_id === parent.id);
    },
    participants: (parent, args) => {
      return participants.filter(participant => participant.user_id === parent.id);
    }
  },
  Event: {
    user: (parent, args) => {
      return users.find(user => user.id === parent.user_id);
    },
    location: (parent, args) => {
      return locations.find(location => location.id === parent.location_id);
    },
    participants:(parent,args)=>{
      return participants.filter(participant=> participant.event_id === parent.id);
    }
  },
  Participant:{
    user:(parent,args)=>{
      return users.find(user => user.id === parent.user_id);
    },
    event: (parent, args) => {
      return events.find(event => event.id === parent.event_id);
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});