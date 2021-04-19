_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[15],{Y5Gk:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/samples/helloTriangle",function(){return r("zM6r")}])},zM6r:function(e,n,r){"use strict";r.r(n);var t=r("o0o1"),a=r.n(t),i=r("HaE+"),o=r("SoUo");function s(){return(s=Object(i.a)(a.a.mark((function e(n){var r,t,i,o,s,d,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u=function(){var e=t.createCommandEncoder(),n={colorAttachments:[{view:s.getCurrentTexture().createView(),loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]},r=e.beginRenderPass(n);r.setPipeline(d),r.draw(3,1,0,0),r.endPass(),t.queue.submit([e.finish()])},e.next=3,navigator.gpu.requestAdapter();case 3:return r=e.sent,e.next=6,r.requestDevice();case 6:return t=e.sent,i=n.getContext("gpupresent"),o="bgra8unorm",s=i.configureSwapChain({device:t,format:o}),d=t.createRenderPipeline({vertex:{module:t.createShaderModule({code:c.vertex}),entryPoint:"main"},fragment:{module:t.createShaderModule({code:c.fragment}),entryPoint:"main",targets:[{format:o}]},primitive:{topology:"triangle-list"}}),e.abrupt("return",u);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var c={vertex:"\nlet pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(\n    vec2<f32>(0.0, 0.5),\n    vec2<f32>(-0.5, -0.5),\n    vec2<f32>(0.5, -0.5));\n\n[[stage(vertex)]]\nfn main([[builtin(vertex_index)]] VertexIndex : u32)\n     -> [[builtin(position)]] vec4<f32> {\n  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);\n}\n",fragment:"\n[[stage(fragment)]]\nfn main() -> [[location(0)]] vec4<f32> {\n  return vec4<f32>(1.0, 0.0, 0.0, 1.0);\n}\n"},d=Object(o.c)({name:"Hello Triangle",description:"Shows rendering a basic triangle.",slug:"helloTriangle",init:function(e){return s.apply(this,arguments)},source:"import { makeBasicExample } from '../../components/basicExample';\n\nasync function init(canvas: HTMLCanvasElement) {\n  const adapter = await navigator.gpu.requestAdapter();\n  const device = await adapter.requestDevice();\n\n  const context = canvas.getContext('gpupresent');\n\n  const swapChainFormat = 'bgra8unorm';\n\n  const swapChain = context.configureSwapChain({\n    device,\n    format: swapChainFormat,\n  });\n\n  const pipeline = device.createRenderPipeline({\n    vertex: {\n      module: device.createShaderModule({\n        code: wgslShaders.vertex,\n      }),\n      entryPoint: 'main',\n    },\n    fragment: {\n      module: device.createShaderModule({\n        code: wgslShaders.fragment,\n      }),\n      entryPoint: 'main',\n      targets: [\n        {\n          format: swapChainFormat,\n        },\n      ],\n    },\n    primitive: {\n      topology: 'triangle-list',\n    },\n  });\n\n  function frame() {\n    const commandEncoder = device.createCommandEncoder();\n    const textureView = swapChain.getCurrentTexture().createView();\n\n    const renderPassDescriptor: GPURenderPassDescriptor = {\n      colorAttachments: [\n        {\n          view: textureView,\n          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },\n          storeOp: 'store',\n        },\n      ],\n    };\n\n    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n    passEncoder.setPipeline(pipeline);\n    passEncoder.draw(3, 1, 0, 0);\n    passEncoder.endPass();\n\n    device.queue.submit([commandEncoder.finish()]);\n  }\n\n  return frame;\n}\n\nconst wgslShaders = {\n  vertex: `\nlet pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(\n    vec2<f32>(0.0, 0.5),\n    vec2<f32>(-0.5, -0.5),\n    vec2<f32>(0.5, -0.5));\n\n[[stage(vertex)]]\nfn main([[builtin(vertex_index)]] VertexIndex : u32)\n     -> [[builtin(position)]] vec4<f32> {\n  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);\n}\n`,\n  fragment: `\n[[stage(fragment)]]\nfn main() -> [[location(0)]] vec4<f32> {\n  return vec4<f32>(1.0, 0.0, 0.0, 1.0);\n}\n`,\n};\n\n// import ma from '../../components/BasicExample';\n\nconst HelloTriangle = makeBasicExample({\n  name: 'Hello Triangle',\n  description: 'Shows rendering a basic triangle.',\n  slug: 'helloTriangle',\n  init,\n  source: __SOURCE__,\n});\n\nexport default HelloTriangle;\n"});n.default=d}},[["Y5Gk",0,1,4,2,3]]]);