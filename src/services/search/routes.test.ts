import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import promiseRequest from "request-promise";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "../../services/search/routes";

jest.mock("request-promise");
(promiseRequest as any).mockImplementation(() => '{"features": []}');

describe("routes", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

  test("a valid string query", async () => {
    const response = await request(router).get("/api/v1/search?q=Cham");
    expect(response.status).toEqual(200);
  });
});