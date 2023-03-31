import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes, { RouteType } from "./router";

const generateRouter = (routers: RouteType[]) => {
    return routers.map(item => {
        if (typeof item.element === 'function') {
            const Component = lazy(item.element);
            item.element = (
                <Suspense fallback={<></>}>
                    <Component />
                </Suspense >
            )
        }
        return item
    })
}

const createRouter = () => {
    let element =useRoutes(generateRouter(routes))
    return element
}
export default createRouter