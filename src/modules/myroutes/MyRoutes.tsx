export const ROUTES = {
    HOME: "/",
    SPARES: "/spares",
    REG: "/register",
    LOG: "/login",
    ORDER: "/order",
    USER: "/private",
    USERINFO: "/changeinfo",
    USERORDERS: "/myorders"
  }
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    SPARES: "Запчасти",
    REG: "Регистрация",
    LOG: "Вход",
    ORDER: "Заказ",
    USER: "Покупатель",
    USERINFO: "Изменение информации",
    USERORDERS: "Заказы покупателя"
};