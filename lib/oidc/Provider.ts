import { Provider } from "oidc-provider";

// const configuration = {
//   clients: [
//     {
//       client_id: "oidcCLIENT",
//       client_secret: "Some_super_secret",
//       grant_types: ["authorization_code"],
//       redirect_uris: ["http://localhost:3001/auth/login/callback"],
//       response_types: ["code"],
//       //other configurations if needed
//     },
//   ],
//   pkce: {
//     required: () => false,
//   },
// };

let oidc: Provider;

export function getOidcProvider(): Provider {
  if (!oidc) {
    oidc = new Provider("http://localhost:3001", {
      clients: [
        {
          client_id: "expensebook",
          client_secret: "secret",
          grant_types: ["authorization_code"],
          redirect_uris: ["http://localhost:3000/auth/login/callback"],
          response_types: ["code"],
        },
      ],
    });
  }

  return oidc;
}
