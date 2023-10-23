import "reflect-metadata";
import { initServer } from "./server";

initServer().catch((error) => {
  console.log("An error occured", error);
});
