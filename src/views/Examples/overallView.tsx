import { useTheme } from "@/until/useThree"
import { useRef } from "react"
import * as THREE from "three"

const OverallView = () => {
    const triggerRef = useRef<HTMLDivElement>(null)
    useTheme({
        el: triggerRef,
        axisHidden:true,
        cameraPosition: [0, 0, 10],
    }, ({ scene,renderer,camera }) => {
        let light = new THREE.AmbientLight("white")
        scene.add(light)

        let texture = new THREE.TextureLoader().load("/image/overallView/sphere.jpg")
        let geometry = new THREE.SphereGeometry(5)
        geometry.scale(5, 5, -5)
        let material = new THREE.MeshLambertMaterial({
            map: texture
        })
        let mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        const initRender = () => {
            mesh.rotateY(0.002)
            renderer.render(scene, camera)
            requestAnimationFrame(initRender)
        }
        initRender()
    })

    return (
        <div style={{ height: '100%' }} ref={triggerRef}>

        </div>
    )
}

export default OverallView