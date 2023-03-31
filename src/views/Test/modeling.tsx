import { useTheme } from "@/until/useThree"
import { useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Modeling = () => {
    const domRef = useRef<HTMLDivElement>(null)
    useTheme({
        el: domRef,
        axisHidden: true,
        rendererColor:'#f3f3f3',
        cameraPosition: [0, 0, 10],
    }, async ({ scene, renderer, camera }) => {
        let light = new THREE.AmbientLight("white")
        scene.add(light)
        const loader = new GLTFLoader()
        const parrotData = await loader.loadAsync("/image/mode/b.glb")
        console.log(parrotData);
        
        scene.add(parrotData.scene)

        const initRender = () => {
            renderer.render(scene, camera)
            requestAnimationFrame(initRender)
        }
        initRender()
    })
    return (
        <div style={{ height: '100%' }} ref={domRef}>

        </div>
    )
}

export default Modeling