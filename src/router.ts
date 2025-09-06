import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const module = await import("./paginas/PaginaInicial");
      return { Component: module.default };
    },  
  },
  {
    path: "/ocorrencia/:id",
    lazy: async () => {
        const module = await import("./paginas/PaginaOcorrencia");
        return { Component: module.default };
    }
  },
  {
    path: "/explorar",
    lazy: async () => {
      const module = await import("./paginas/PaginaExplorar");
      return { Component: module.default};
    }
  }
]);

export default router;
