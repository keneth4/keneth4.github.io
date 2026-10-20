import{G as E,a as I,P as H,b as C,W as B,H as U,V as T}from"./playCanvasSpzViewer-XM1S__iy.js";import"./preload-helper-CLcXU_4U.js";const P=1347635022,F=1,G=2,b=[0,3,8,15,24],M=`
uniform float spzPositionScale;

// work values
uvec4 packedData;   // xyz: 24-bit position + 8-bit scale per component, w: rotation bits

vec3 getCenter() {
    packedData = loadPackedTexture();

    // sign-extend the 24-bit fixed point position
    ivec3 p = ivec3(packedData.xyz << 8u) >> 8;
    return vec3(p) * spzPositionScale;
}

vec4 getColor() {
    vec4 c = loadColorTexture();

    // rgb stores SH DC coefficients as c * 0.15 + 0.5, convert to color as 0.5 + SH_C0 * dc,
    // alpha is stored with sigmoid already applied
    const float scale = 0.28209479177387814 / 0.15;
    return vec4((c.rgb - 0.5) * scale + 0.5, c.a);
}

vec4 getRotation() {
    // smallest-three encoding: bits 30-31 store the index of the largest component, the
    // remaining three components are stored as 9-bit magnitude + sign bit, 10 bits each,
    // starting from the lowest bits for the highest component index
    uint comp = packedData.w;
    uint largest = comp >> 30u;
    float q[4];
    float sumSquares = 0.0;
    for (int i = 3; i >= 0; i--) {
        if (uint(i) != largest) {
            float v = float(comp & 0x1ffu) * (0.7071067811865476 / 511.0);
            if ((comp & 0x200u) != 0u) v = -v;
            comp = comp >> 10u;
            q[i] = v;
            sumSquares += v * v;
        }
    }
    q[largest] = sqrt(max(0.0, 1.0 - sumSquares));

    // spz stores the quaternion as (x, y, z, w), the engine expects (w, x, y, z)
    return vec4(q[3], q[0], q[1], q[2]);
}

vec3 getScale() {
    // 8-bit log encoded scale in the top byte of each position word
    vec3 s = vec3(packedData.xyz >> 24u);
    return exp(s / 16.0 - 10.0);
}

#if SH_BANDS > 0

// quantized SH bytes of the current splat, packed 4 to a word
uint shWords[12];

float unpackSH(int i) {
    uint b = (shWords[i >> 2] >> uint(8 * (i & 3))) & 0xffu;
    return (float(b) - 128.0) / 128.0;
}

void readSHData(out vec3 sh[SH_COEFFS], out float scale) {
    uvec4 d0 = loadShTexture0();
    shWords[0] = d0.x; shWords[1] = d0.y; shWords[2] = d0.z; shWords[3] = d0.w;
    #if SH_BANDS > 1
        uvec4 d1 = loadShTexture1();
        shWords[4] = d1.x; shWords[5] = d1.y; shWords[6] = d1.z; shWords[7] = d1.w;
    #endif
    #if SH_BANDS > 2
        uvec4 d2 = loadShTexture2();
        shWords[8] = d2.x; shWords[9] = d2.y; shWords[10] = d2.z; shWords[11] = d2.w;
    #endif

    for (int i = 0; i < SH_COEFFS; i++) {
        sh[i] = vec3(unpackSH(i * 3), unpackSH(i * 3 + 1), unpackSH(i * 3 + 2));
    }

    scale = 1.0;
}

#endif
`,O=`
uniform spzPositionScale: f32;

// work values
var<private> packedData: vec4u;    // xyz: 24-bit position + 8-bit scale per component, w: rotation bits

fn getCenter() -> vec3f {
    packedData = loadPackedTexture();

    // sign-extend the 24-bit fixed point position
    let p = bitcast<vec3i>(packedData.xyz << vec3u(8u)) >> vec3u(8u);
    return vec3f(p) * uniform.spzPositionScale;
}

fn getColor() -> vec4f {
    let c = loadColorTexture();

    // rgb stores SH DC coefficients as c * 0.15 + 0.5, convert to color as 0.5 + SH_C0 * dc,
    // alpha is stored with sigmoid already applied
    const scale: f32 = 0.28209479177387814 / 0.15;
    return vec4f((c.rgb - 0.5) * scale + 0.5, c.a);
}

fn getRotation() -> vec4f {
    // smallest-three encoding: bits 30-31 store the index of the largest component, the
    // remaining three components are stored as 9-bit magnitude + sign bit, 10 bits each,
    // starting from the lowest bits for the highest component index
    var comp: u32 = packedData.w;
    let largest: u32 = comp >> 30u;
    var q = array<f32, 4>(0.0, 0.0, 0.0, 0.0);
    var sumSquares: f32 = 0.0;
    for (var i: i32 = 3; i >= 0; i--) {
        if (u32(i) != largest) {
            var v: f32 = f32(comp & 0x1ffu) * (0.7071067811865476 / 511.0);
            if ((comp & 0x200u) != 0u) { v = -v; }
            comp = comp >> 10u;
            q[i] = v;
            sumSquares += v * v;
        }
    }
    q[largest] = sqrt(max(0.0, 1.0 - sumSquares));

    // spz stores the quaternion as (x, y, z, w), the engine expects (w, x, y, z)
    return vec4f(q[3], q[0], q[1], q[2]);
}

fn getScale() -> vec3f {
    // 8-bit log encoded scale in the top byte of each position word
    let s = vec3f(packedData.xyz >> vec3u(24u));
    return exp(s / 16.0 - 10.0);
}

#if SH_BANDS > 0

// quantized SH bytes of the current splat, packed 4 to a word
var<private> shWords: array<u32, 12>;

fn unpackSH(i: i32) -> f32 {
    let b = (shWords[i >> 2] >> u32(8 * (i & 3))) & 0xffu;
    return (f32(b) - 128.0) / 128.0;
}

fn readSHData(sh: ptr<function, array<half3, SH_COEFFS>>, scale: ptr<function, f32>) {
    let d0 = loadShTexture0();
    shWords[0] = d0.x; shWords[1] = d0.y; shWords[2] = d0.z; shWords[3] = d0.w;
    #if SH_BANDS > 1
        let d1 = loadShTexture1();
        shWords[4] = d1.x; shWords[5] = d1.y; shWords[6] = d1.z; shWords[7] = d1.w;
    #endif
    #if SH_BANDS > 2
        let d2 = loadShTexture2();
        shWords[8] = d2.x; shWords[9] = d2.y; shWords[10] = d2.z; shWords[11] = d2.w;
    #endif

    for (var i: i32 = 0; i < SH_COEFFS; i++) {
        sh[i] = half3(vec3f(unpackSH(i * 3), unpackSH(i * 3 + 1), unpackSH(i * 3 + 2)));
    }

    *scale = 1.0;
}

#endif
`;class L{numSplats;fractionalBits;shBands;shDim;antialiased;positions;alphas;colors;scales;rotations;sh;constructor(o,e){this.numSplats=o.numPoints,this.fractionalBits=o.fractionalBits,this.antialiased=o.antialiased,this.shDim=b[o.shDegree],this.shBands=Math.min(o.shDegree,3),this.positions=e.positions,this.alphas=e.alphas,this.colors=e.colors,this.scales=e.scales,this.rotations=e.rotations,this.sh=e.sh??null}getCenters(){const{numSplats:o,positions:e}=this,l=1/(1<<this.fractionalBits),a=new Float32Array(o*3);for(let t=0;t<o*3;t++){const n=t*3;let i=e[n]|e[n+1]<<8|e[n+2]<<16;i=i<<8>>8,a[t]=i*l}return a}calcAabb(o){const{numSplats:e,positions:l}=this,a=1/(1<<this.fractionalBits),t=new T(1/0,1/0,1/0),n=new T(-1/0,-1/0,-1/0);for(let i=0;i<e;i++)for(let r=0;r<3;r++){const c=(i*3+r)*3;let u=l[c]|l[c+1]<<8|l[c+2]<<16;u=u<<8>>8;const m=u*a,p=r===0?"x":r===1?"y":"z";t[p]=Math.min(t[p],m),n[p]=Math.max(n[p],m)}o.setMinMax(t,n)}}class N extends E{constructor(o,e,l={}){super(o,e,l);const{numSplats:a,shBands:t}=e,n=[{name:"packedTexture",format:H},{name:"colorTexture",format:C}],i=t>0?Math.ceil(b[t]*3/16):0;for(let s=0;s<i;s++)n.push({name:`shTexture${s}`,format:H});this._format=new I(o,n,{readGLSL:M,readWGSL:O}),this.streams.init(this.format,a),this.parameters.set("spzPositionScale",1/(1<<e.fractionalBits));const{positions:r,scales:c,rotations:u,colors:m,alphas:p}=e,d=this.streams.getTexture("packedTexture"),S=d.lock();for(let s=0;s<a;s++){const f=s*9,w=s*3,h=s*4;S[s*4+0]=r[f+0]|r[f+1]<<8|r[f+2]<<16|c[w+0]<<24,S[s*4+1]=r[f+3]|r[f+4]<<8|r[f+5]<<16|c[w+1]<<24,S[s*4+2]=r[f+6]|r[f+7]<<8|r[f+8]<<16|c[w+2]<<24,S[s*4+3]=u[h+0]|u[h+1]<<8|u[h+2]<<16|u[h+3]<<24}d.unlock();const v=this.streams.getTexture("colorTexture"),g=v.lock();for(let s=0;s<a;s++)g[s*4+0]=m[s*3+0],g[s*4+1]=m[s*3+1],g[s*4+2]=m[s*3+2],g[s*4+3]=p[s];if(v.unlock(),t>0){const s=e.sh,f=e.shDim*3,w=b[t]*3;for(let h=0;h<i;h++){const W=this.streams.getTexture(`shTexture${h}`),q=W.lock();for(let D=0;D<a;D++){const _=D*f+h*16;for(let z=0;z<4;z++){let k=0;for(let y=0;y<4;y++){const A=h*16+z*4+y;k|=(A<w?s[_+z*4+y]:128)<<y*8}q[D*4+z]=k}}W.unlock()}}}configureMaterialDefines(o){o.set("SH_BANDS",this.gsplatData.shBands)}}const R=(x,o)=>{const e=new DataView(x);if(e.byteLength<32)throw new Error("Invalid spz file: too small");const l=e.getUint32(0,!0),a=e.getUint32(4,!0);if(l!==P)throw e.getUint8(0)===31&&e.getUint8(1)===139?new Error("Unsupported spz file: legacy gzip based version, only version 4 is supported"):new Error(`Invalid spz file: unexpected magic number 0x${l.toString(16)}`);if(a!==4)throw new Error(`Unsupported spz version ${a}, only version 4 is supported`);const t={numPoints:e.getUint32(8,!0),shDegree:e.getUint8(12),fractionalBits:e.getUint8(13),flags:e.getUint8(14),numStreams:e.getUint8(15),tocByteOffset:e.getUint32(16,!0),antialiased:!1};if(t.antialiased=(t.flags&F)!==0,t.shDegree>=b.length)throw new Error(`Invalid spz file: unsupported SH degree ${t.shDegree}`);t.flags&G&&console.warn("SpzParser: file contains extensions which are not supported and will be ignored");const n=t.numPoints,i=b[t.shDegree],r=["positions","alphas","colors","scales","rotations","sh"],c=[n*9,n,n*3,n*3,n*4,n*i*3].filter(d=>d>0);if(t.numStreams!==c.length)throw new Error(`Invalid spz file: expected ${c.length} streams, found ${t.numStreams}`);const u=t.numStreams*16;if(t.tocByteOffset<32||t.tocByteOffset+u>e.byteLength)throw new Error("Invalid spz file: table of contents out of bounds");const m={};let p=t.tocByteOffset+u;for(let d=0;d<t.numStreams;d++){const S=Number(e.getBigUint64(t.tocByteOffset+d*16,!0)),v=Number(e.getBigUint64(t.tocByteOffset+d*16+8,!0));if(v!==c[d])throw new Error(`Invalid spz file: unexpected size of the ${r[d]} stream`);if(p+S>e.byteLength)throw new Error("Invalid spz file: stream extends past the end of the file");const g=new Uint8Array(x,p,S);m[r[d]]=o.decompress(g,v),p+=S}return new L(t,m)};class V{app;constructor(o){this.app=o}canParse(o){return o.ext==="spz"}load(o,e,l){if(!B.getConfig("ZstdDecoderModule")){e("SpzParser: ZSTD decoder module is not registered. Use WasmModule.setConfig('ZstdDecoderModule', { glueUrl, wasmUrl }) before loading spz files.");return}this.handler.fetch(o,U.ResponseType.ARRAY_BUFFER,(a,t)=>{if(a){e(a);return}B.getInstance("ZstdDecoderModule",n=>{try{const i=R(t,n),r=this.app.scene?.gsplatCentersEnabled!==!1,c=new N(this.app.graphicsDevice,i,{prepareCenters:r});e(null,c)}catch(i){e(i)}})},l)}open(o,e){return e}}export{N as GSplatSpzResource,V as SpzParser};
