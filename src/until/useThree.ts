import { RefObject, useCallback, useEffect, useLayoutEffect, useState } from "react"
import * as THREE from "three"
import { ColorRepresentation } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface ThreeProps {
    el: RefObject<HTMLElement | null>,
    axisHidden?:boolean,
    cameraPosition: [number, number, number],
    rendererColor?: ColorRepresentation   //渲染器背景颜色
}

interface callback {
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera | THREE.Camera,
    renderer:THREE.WebGL1Renderer,
}


export const useTheme = (options: ThreeProps, callback: (parmas: callback) => void) => {
    const { el, cameraPosition, rendererColor,axisHidden } = options

    let screenWidth: number = 0
    let screenHeight: number = 0
    //场景
    let scene = new THREE.Scene()
    // 透视相机
    let camera: THREE.PerspectiveCamera | THREE.Camera
    let renderer = new THREE.WebGL1Renderer({
        antialias:true,
    })
    //初始化
    const initMount = () => {
        camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000)
        camera.position.set(...cameraPosition)
        camera.lookAt(scene.position)
        //渲染器
        if (rendererColor) {
            renderer.setClearColor(rendererColor)
        }
        renderer.setSize(screenWidth, screenHeight)
        renderer.render(scene, camera)
        el.current?.append(renderer.domElement)
        //坐标系
        if(!axisHidden){
            let axisHelper = new THREE.AxesHelper(250)
            scene.add(axisHelper)
        }
      
        //控制器
        let controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
    }

    useLayoutEffect(() => {
        if (el.current) {
            screenWidth = el.current.getBoundingClientRect().width
            screenHeight = el.current.getBoundingClientRect().height
            initMount()
            callback({
                scene,
                camera,
                renderer
            })
        }
        return () => {
            scene.clear()
            renderer.dispose()
            renderer.domElement.remove()
        }
    }, [el])
}
