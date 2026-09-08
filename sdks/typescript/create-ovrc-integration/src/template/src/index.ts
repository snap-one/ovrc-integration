import {
  serveRpc,
  type methodGetAuthentication,
} from "@snap-one/ovrc-integration-{{category}}";

const getAuthentication: methodGetAuthentication = async () => {
  return {
    methods: [
      {
        id: "user-credentials",
        label: "User Credentials",
        valid: false,
        documentationURL: "url...",
        fields: [
          {
            label: "Username",
            value: null,
            type: "STRING",
            id: "username",
            credentialType: { type: "USERNAME" },
          },
          {
            label: "Password",
            value: null,
            type: "STRING",
            id: "password",
            credentialType: { type: "PASSWORD" },
          },
        ],
      },
    ],
  };
};

await serveRpc({
  getAuthentication,
});
