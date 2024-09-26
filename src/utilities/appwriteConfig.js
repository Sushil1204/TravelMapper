import { Client, Account, ID, Databases } from "appwrite";

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);
export { account, ID, databases };
