import { useTheme } from "@/until/useThree"
import { useRef } from "react"
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper"
import * as THREE from "three"
import * as dat from 'dat.gui'

const Fragment = () => {
    const domRef = useRef<HTMLDivElement>(null)
    let sound: any
    let mesh: any
    useTheme({
        el: domRef,
        axisHidden: false,
        rendererColor: '#f3f3f3',
        cameraPosition: [5, 5, 5],
    }, async ({ scene, renderer, camera }) => {
        const gridHelper = new THREE.GridHelper(20, 20);
        scene.add(gridHelper)
        //可视化
        const gui = new dat.GUI({})


        //创建物体
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 'skyblue' })
        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        gui.add(mesh.position,'x').min(-10).max(10).name('x轴')
        gui.add(mesh.position,'y').min(-10).max(10).name('y轴')
        gui.add(mesh.position,'z').min(-10).max(10).name('z轴')


        // 创建全局源
        const listener = new THREE.AudioListener();

        sound = new THREE.PositionalAudio(listener)
        sound.setRefDistance(10)

        mesh.add(sound)
        const helper = new PositionalAudioHelper(sound,1)
        console.log(helper );
        
        // //加载一个sound并设置为Audio对象的缓冲区
        const audioLoader = new THREE.AudioLoader()
        audioLoader.load("/image/assets/1.mp3", (buffer) => {
            sound.setBuffer(buffer)
            sound.setVolume(1)
          //辅助对象
           
            mesh.add(helper);
        })

        const initRender = () => {
            renderer.render(scene, camera)
            helper.update()
            requestAnimationFrame(initRender)
        }
        initRender()

    })

    const click = () => {
        sound.play()
    }
    return (
        <div style={{ height: '100%' }} ref={domRef}>
            <div onClick={click}>按钮</div>
        </div>
    )
}
export default Fragment