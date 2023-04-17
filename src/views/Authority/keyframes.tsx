import { useTheme } from "@/until/useThree"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const Modeling = () => {
    const domRef = useRef<HTMLDivElement>(null)
    // useTheme({
    //     el: domRef,
    //     axisHidden: true,
    //     rendererColor: '#f3f3f3',
    //     cameraPosition: [0, 0, 10],
    // }, async ({ scene, renderer, camera }) => {
    //     let light = new THREE.AmbientLight("red")
    //     // scene.add(light)
    //     // const loader = new GLTFLoader()
    //     // const initRender = () => {
    //     //     renderer.render(scene, camera)
    //     //     requestAnimationFrame(initRender)
    //     // }
    //     // loader.load("/image/mode/b.glb", function (gltf) {
    //     //     scene.add(gltf.scene)
    //     //     initRender()
    //     // })

    // })
    useEffect(() => {
        if (domRef.current) {
            let screenWidth = domRef.current.getBoundingClientRect().width
            let screenHeight = domRef.current.getBoundingClientRect().height
            let scene = new THREE.Scene()
            let camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000)
            camera.lookAt(scene.position)
            camera.position.set(10, 10, 10)
            let renderer = new THREE.WebGL1Renderer({
                antialias: true,
            })
            let axisHelper = new THREE.AxesHelper(50)
            scene.add(axisHelper)
            renderer.setSize(screenWidth, screenHeight)
            renderer.render(scene, camera)
            let controls = new OrbitControls(camera, renderer.domElement);
            domRef.current?.append(renderer.domElement)

            const loader = new GLTFLoader()
            loader.load("/image/mode/b.glb", function (gltf) {
                scene.add(gltf.scene)
                aniamte()
            })

            const aniamte = () => {

                renderer.render(scene, camera)
                requestAnimationFrame(aniamte)
            }
        }

    }, [domRef])

    return (
        <div style={{ height: '100%' }} ref={domRef}>

        </div>
    )
}

export default Modeling