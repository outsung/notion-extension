import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div style={{ display: "flex", flex: 1, height: "100%" }}>
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "20%",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
