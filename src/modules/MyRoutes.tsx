export const ROUTES = {
    HOME: "/",
    SPARES: "/spares",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    SPARES: "Запчасти",
  };