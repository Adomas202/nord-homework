import Servers from "./Servers";
import { renderWithProviders } from "../../tests/render";
import { setupStore } from "../../store";
import { waitFor, within } from "@testing-library/react";
import { getServers } from "../../store/servers/servers.actions";
import axios from "axios";
import { vi } from "vitest";

axios.get = vi.fn();

describe("Test servers rendering", () => {
  it("renders loader", () => {
    const { getByText } = renderWithProviders(<Servers />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders server list from store", async () => {
    const mockedAxios = axios.get as jest.Mock;
    const store = setupStore();
    const mockedResponse = {
      data: [
        { name: "United States #15", distance: 386 },
        { name: "Latvia #30", distance: 180 },
      ],
    };
    mockedAxios.mockResolvedValue(mockedResponse);

    store.dispatch(getServers() as any);

    const { getAllByTestId } = renderWithProviders(<Servers />, { store });

    await waitFor(() => {
      mockedResponse.data.forEach((server, index) => {
        const serverName = within(getAllByTestId("server-name")[index]);
        const serverDistance = within(getAllByTestId("server-distance")[index]);
        expect(serverName.getByText(server.name)).toBeVisible();
        expect(serverDistance.getByText(server.distance)).toBeVisible();
      });
    });
  });
});
