import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { word } from "@/screens";
import { Layout } from "@/components/common";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>완전 메인</div>,
    },
    {
      path: "word",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <word.WordMainScreen />,
        },
        {
          path: "question",
          element: <word.WordQuestionScreen />,
        },
        {
          path: "result",
          element: <word.WordResultScreen />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
