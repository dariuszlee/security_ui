import * as React from "react";
import { render } from "react-dom";
import * as THREE from "three";
import {AppToolBar} from "./AppToolBar"

type AppProps = {
    scene: any,
    camera: any,
    renderer: any,
}

class App extends React.Component<AppProps, {}> {
    mount: any;
    props: AppProps
    constructor(props: AppProps){
        super(props)
        this.props = props;
        console.log("DARIUS", props)
    }

    componentDidMount() {
        console.log("Camera props: ", this.props.camera.position)
        this.props.scene.background = 0xffffff
        this.props.renderer.setClearColor( 0xffffff, 1);

        this.props.renderer.setSize( window.innerWidth, window.innerHeight );
        this.mount.appendChild( this.props.renderer.domElement );

        var gridHelper = new THREE.GridHelper(100, 100, 0x999999, 0xaaaaaa);
        gridHelper.rotation.x = 1.571
        /* gridHelper.rotation.y = 50 */
        /* gridHelper.rotation.z = 50 */
        this.props.scene.add( gridHelper );

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        this.props.scene.add( cube );
        this.props.camera.position.z = 40;
        var animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            this.props.renderer.render( this.props.scene, this.props.camera );
        };
        animate = animate.bind(this)
        animate();
    }

    render() {
        var handleResize = function () {
            this.props.renderer.setSize(window.innerWidth, window.innerHeight)
        }
        handleResize = handleResize.bind(this)
        window.addEventListener('resize', handleResize)
        return (
            <div ref={ref => (this.mount = ref)}> 
                <AppToolBar />
            </div>
            )
    }
}

const initial_props: AppProps = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
    renderer: new THREE.WebGLRenderer(),
}
const rootElement = document.getElementById("root");
render(<App  {...initial_props} />, rootElement);