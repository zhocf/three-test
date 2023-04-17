export interface RouteType {
    path:string,
    element?:any,
}
const routes:RouteType[] = [
    {
        path:"/examples/overali",
        element:() => import("@/views/Examples/overallView")
    },
    {
        path:"/test/modeling",
        element:() => import("@/views/Test/modeling")
    },
    {
        path:"/test/video",
        element:() => import("@/views/Test/video")
    },
    {
        path:"/authority/keyframes",
        element:() => import("@/views/Authority/keyframes")
    }
]
export default routes