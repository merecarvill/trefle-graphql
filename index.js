import { server } from "./src/server.js"

server.listen().then(({ url }) => {
  console.log(`🌿 trefle-graphql server ready at ${url}`);
}); 
