(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[15],{OI48:function(e,n,t){"use strict";n.a="@fragment\nfn main() -> @location(0) vec4<f32> {\n  return vec4<f32>(1.0, 0.0, 0.0, 1.0);\n}"},RkKu:function(e,n,t){"use strict";t.r(n),n.default="@keyframes animated-size {\n  0% {\n    width: 10px;\n    height: 600px;\n  }\n  50% {\n    width: 100%;\n    height: 600px;\n  }\n  100% {\n    width: 10px;\n    height: 600px;\n  }\n}\n\n.animatedCanvasSize {\n  animation-duration: 3s;\n  animation-iteration-count: infinite;\n  animation-name: animated-size;\n  animation-timing-function: ease;\n}"},WsHf:function(e,n,t){e.exports={animatedCanvasSize:"animatedCanvasSize_animatedCanvasSize__1QN6P","animated-size":"animatedCanvasSize_animated-size__IZ3q6"}},"l+hO":function(e,n,t){"use strict";t.r(n),function(e,a){var r=t("o0o1"),i=t.n(r),s=t("HaE+"),o=t("8i9l"),c=t("nBne"),d=t("OI48"),l=t("WsHf"),u=t.n(l),m=function(){var e=Object(s.a)(i.a.mark((function e(n){var t,a,r,s,o,l,m,v,p,g,h,f;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f=function(){if(s){var e=window.devicePixelRatio,n=Math.floor(s.clientWidth*e),t=Math.floor(s.clientHeight*e),a=Math.ceil(s.clientWidth/200);a!==h&&(void 0!==g&&g.destroy(),h=a,s.width=n,s.height=t,g=p(r,[n,t]));var i=r.createCommandEncoder(),c={colorAttachments:[{view:g.createView(),resolveTarget:o.getCurrentTexture().createView(),clearValue:{r:.2,g:.2,b:.2,a:1},loadOp:"clear",storeOp:"store"}]},d=i.beginRenderPass(c);d.setPipeline(m),d.draw(3,1,0,0),d.end(),r.queue.submit([i.finish()]),requestAnimationFrame(f)}},t=n.canvasRef,e.next=4,navigator.gpu.requestAdapter();case 4:return a=e.sent,e.next=7,a.requestDevice();case 7:if(r=e.sent,null!==(s=t.current)){e.next=11;break}return e.abrupt("return");case 11:o=s.getContext("webgpu"),l=navigator.gpu.getPreferredCanvasFormat(),o.configure({device:r,format:l,alphaMode:"opaque"}),4,m=r.createRenderPipeline({layout:"auto",vertex:{module:r.createShaderModule({code:c.a}),entryPoint:"main"},fragment:{module:r.createShaderModule({code:d.a}),entryPoint:"main",targets:[{format:l}]},primitive:{topology:"triangle-list"},multisample:{count:4}}),v=0,g=(p=function(e,n){return e.createTexture({label:"".concat(v++),size:n,sampleCount:4,format:l,usage:GPUTextureUsage.RENDER_ATTACHMENT})})(r,[s.width,s.height]),h=Math.ceil(s.clientWidth/200),s.classList.add(u.a.animatedCanvasSize),requestAnimationFrame(f);case 22:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();n.default=function(){return Object(o.a)({name:"Resize Canvas",description:"Shows multisampled rendering a basic triangle on a dynamically sized canvas.",init:m,sources:[{name:e.substring(a.length+1),contents:"import { makeSample, SampleInit } from '../../components/SampleLayout';\n\nimport triangleVertWGSL from '../../shaders/triangle.vert.wgsl';\nimport redFragWGSL from '../../shaders/red.frag.wgsl';\n\nimport styles from './animatedCanvasSize.module.css';\n\nconst init: SampleInit = async ({ canvasRef }) => {\n  const adapter = await navigator.gpu.requestAdapter();\n  const device = await adapter.requestDevice();\n  const canvas = canvasRef.current;\n\n  if (canvas === null) return;\n  const context = canvas.getContext('webgpu') as GPUCanvasContext;\n\n  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();\n\n  context.configure({\n    device,\n    format: presentationFormat,\n    alphaMode: 'opaque',\n  });\n\n  const sampleCount = 4;\n\n  const pipeline = device.createRenderPipeline({\n    layout: 'auto',\n    vertex: {\n      module: device.createShaderModule({\n        code: triangleVertWGSL,\n      }),\n      entryPoint: 'main',\n    },\n    fragment: {\n      module: device.createShaderModule({\n        code: redFragWGSL,\n      }),\n      entryPoint: 'main',\n      targets: [\n        {\n          format: presentationFormat,\n        },\n      ],\n    },\n    primitive: {\n      topology: 'triangle-list',\n    },\n    multisample: {\n      count: 4,\n    },\n  });\n\n  let counter = 0;\n  const createTexture = (device: GPUDevice, size: GPUExtent3DStrict) => {\n    return device.createTexture({\n      // Add a label for debugging how many times the canvas resize\n      label: `${counter++}`,\n      size: size,\n      sampleCount,\n      format: presentationFormat,\n      usage: GPUTextureUsage.RENDER_ATTACHMENT,\n    });\n  };\n\n  let renderTarget = createTexture(device, [canvas.width, canvas.height]);\n  let lastWidthStep = Math.ceil(canvas.clientWidth / 200);\n\n  canvas.classList.add(styles.animatedCanvasSize);\n\n  function frame() {\n    // Sample is no longer the active page.\n    if (!canvas) return;\n\n    const devicePixelRatio = window.devicePixelRatio;\n    // Make sure canvas size to be integer.\n    const currentWidth = Math.floor(canvas.clientWidth * devicePixelRatio);\n    const currentHeight = Math.floor(canvas.clientHeight * devicePixelRatio);\n    const currentWidthStep = Math.ceil(canvas.clientWidth / 200);\n    // Means that canvas CSS width has changed more than 200px from the last time,\n    // we should recreate the canvas backing texture.\n    if (currentWidthStep !== lastWidthStep) {\n      if (renderTarget !== undefined) {\n        renderTarget.destroy();\n      }\n      lastWidthStep = currentWidthStep; // update the step\n      // Reset canvas DOM size & canvas size\n      canvas.width = currentWidth;\n      canvas.height = currentHeight;\n      renderTarget = createTexture(device, [currentWidth, currentHeight]);\n    }\n\n    const commandEncoder = device.createCommandEncoder();\n\n    const renderPassDescriptor: GPURenderPassDescriptor = {\n      colorAttachments: [\n        {\n          view: renderTarget.createView(),\n          resolveTarget: context.getCurrentTexture().createView(),\n          clearValue: { r: 0.2, g: 0.2, b: 0.2, a: 1.0 },\n          loadOp: 'clear',\n          storeOp: 'store',\n        },\n      ],\n    };\n\n    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n    passEncoder.setPipeline(pipeline);\n    passEncoder.draw(3, 1, 0, 0);\n    passEncoder.end();\n\n    device.queue.submit([commandEncoder.finish()]);\n    requestAnimationFrame(frame);\n  }\n\n  requestAnimationFrame(frame);\n};\n\nconst ResizeCanvas: () => JSX.Element = () =>\n  makeSample({\n    name: 'Resize Canvas',\n    description:\n      'Shows multisampled rendering a basic triangle on a dynamically sized canvas.',\n    init,\n    sources: [\n      {\n        name: __filename.substring(__dirname.length + 1),\n        contents: __SOURCE__,\n      },\n      {\n        name: '../../shaders/triangle.vert.wgsl',\n        contents: triangleVertWGSL,\n        editable: true,\n      },\n      {\n        name: '../../shaders/red.frag.wgsl',\n        contents: redFragWGSL,\n        editable: true,\n      },\n      {\n        name: './animatedCanvasSize.module.css',\n        // eslint-disable-next-line @typescript-eslint/no-var-requires\n        contents: require('!!raw-loader!./animatedCanvasSize.module.css')\n          .default,\n      },\n    ],\n    filename: __filename,\n  });\n\nexport default ResizeCanvas;\n"},{name:"../../shaders/triangle.vert.wgsl",contents:c.a,editable:!0},{name:"../../shaders/red.frag.wgsl",contents:d.a,editable:!0},{name:"./animatedCanvasSize.module.css",contents:t("RkKu").default}],filename:e})}}.call(this,"src/sample/resizeCanvas/main.ts","src/sample/resizeCanvas")},nBne:function(e,n,t){"use strict";n.a="@vertex\nfn main(\n  @builtin(vertex_index) VertexIndex : u32\n) -> @builtin(position) vec4<f32> {\n  var pos = array<vec2<f32>, 3>(\n    vec2<f32>(0.0, 0.5),\n    vec2<f32>(-0.5, -0.5),\n    vec2<f32>(0.5, -0.5)\n  );\n\n  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);\n}\n"}}]);