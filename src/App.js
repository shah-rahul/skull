import React, { Suspense, useEffect, useRef } from 'react';

import './App.scss';
// components
import Header from './components/header';
import { Section } from './components/section';
import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTFLoader } from 'drei';

// pageState
import state from './components/state';

// intersection observer
import { useInView } from 'react-intersection-observer';

const Model = ({ modelPath, scale }) => {
  const gltf = useGLTFLoader(modelPath, true);
  return (
    <primitive scale={scale} object={gltf.scene} dispose={null}></primitive>
  );
};
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />;
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  );
};

const HtmlContent = ({
  scale,
  domContent,
  bgColor,
  children,
  modelPath,
  positionY,
}) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.001;
    ref.current.rotation.x += 0.001;
  });
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, 10, 0]}>
          <Model scale={scale} modelPath={modelPath}></Model>
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className='container' ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

const App = () => {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(
    () =>
      void onScroll({
        target: scrollArea.current,
      }),
    []
  );

  return (
    <>
      <Header />
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HtmlContent
            bgColor={'#000000'}
            domContent={domContent}
            scale={[50, 50, 50]}
            modelPath='/scene.gltf'
            positionY={250}>
            <h1 className='title'>Hello</h1>
          </HtmlContent>
          {/* <HtmlContent
            bgColor={'#571ec1'}
            domContent={domContent}
            modelPath='/armchairGreen.gltf'
            positionY={0}>
            <h1 className='title'>baith ja bhai</h1>
          </HtmlContent>
          <HtmlContent
            bgColor={'#636567'}
            domContent={domContent}
            modelPath='/armchairGray.gltf'
            positionY={-250}>
            <h1 className='title'>Please bhai </h1>
          </HtmlContent> */}
        </Suspense>
      </Canvas>
      <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: 'sticky', top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </>
  );
};

export default App;
