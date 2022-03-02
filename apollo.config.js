module.exports = {
  client: {
    includes: [
      "./pages/**/*.{ts,tsx}",
      "./libs/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
    ],
    tagName: "gql",
    service: {
      name: "uber-eats-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
