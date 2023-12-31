//import init, {greet} from "./pkg/cube_solver.js";

const ctx = document.getElementById("output").getContext("experimental-webgl");

function init()
{
    // Initialize
    var gl = initWebGL("example");
    if (!gl) {
        return;
    }

    g.program = simpleSetup(
            gl, "vshader", "fshader", 
            [ "vNormal", "vColor", "vPosition"], [ 0, 0, 0, 1 ], 10000);

    // Set some uniform variables for the shaders
    gl.uniform3f(gl.getUniformLocation(g.program, "lightDir"), 0, 0, 1);
    gl.uniform1i(gl.getUniformLocation(g.program, "sampler2d"), 0);

    // Create a box. with the BufferObjects containing the arrays 
    // for vertices, normals, texture coords, and indices.
    g.box = makeBox(gl);

    // Load an image to use. Returns a WebGLTexture object
    spiritTexture = loadImageTexture(gl, "resources/spirit.jpg");

    // Create some matrices to use later and save their locations in the shaders
    g.mvMatrix = new J3DIMatrix4();
    g.u_normalMatrixLoc = gl.getUniformLocation(g.program, "u_normalMatrix");
    g.normalMatrix = new J3DIMatrix4();
    g.u_modelViewProjMatrixLoc = gl.getUniformLocation(g.program, "u_modelViewProjMatrix");
    g.mvpMatrix = new J3DIMatrix4();

    // Enable all of the vertex attribute arrays.
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.enableVertexAttribArray(2);

    // Set up all the vertex attributes for vertices, normals and texCoords
    gl.bindBuffer(gl.ARRAY_BUFFER, g.box.vertexObject);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, g.box.normalObject);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, g.box.texCoordObject);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

    // Bind the index array
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g.box.indexObject);

    return gl;
}

init();