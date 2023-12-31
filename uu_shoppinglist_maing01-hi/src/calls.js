import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },

  getUsers(dtoIn) {
    const commandUri = Calls.getCommandUri("user");
    return Calls.call("get", commandUri, dtoIn);
  },

  getLists(dtoIn) {
    const commandUri = Calls.getCommandUri("list");
    return Calls.call("get", commandUri, dtoIn);
  },

  createList(dtoIn) {
    const commandUri = Calls.getCommandUri("list");
    return Calls.call("post", commandUri, dtoIn);
  },

  updateList(dtoIn) {
    const commandUri = Calls.getCommandUri("list/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  deleteList(dtoIn) {
    const commandUri = Calls.getCommandUri("list/delete");
    return Calls.call("post", commandUri, dtoIn);
  },

  getItemsForList(dtoIn) {
    const commandUri = Calls.getCommandUri("list/item");
    return Calls.call("get", commandUri, dtoIn);
  },

  createItemForList(dtoIn) {
    const commandUri = Calls.getCommandUri("list/item");
    return Calls.call("post", commandUri, dtoIn);
  },

  updateItem(dtoIn) {
    const commandUri = Calls.getCommandUri("list/item/update");
    return Calls.call("post", commandUri, dtoIn);
  },

  deleteItem(dtoIn) {
    const commandUri = Calls.getCommandUri("list/item/delete");
    return Calls.call("post", commandUri, dtoIn);
  },
};

export default Calls;
