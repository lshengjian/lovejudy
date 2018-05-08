precision mediump float; 
uniform float     time; 
uniform vec2      resolution; 
uniform vec2      mouse; 

void main(void){
	float e = 4.0/resolution.x;
    vec2 p = vec2(4.0,1.0)*gl_FragCoord.xy/resolution.xy;

    float x = 0.5;

    // remove the line below to get rid of the transient state
    //for( int i=0; i<200; i++ ) x = p.x*x*(1.0-x);

    // plot the attractor    
    float f = 0.0;
    for( int i=0; i<512; i++ )
    {
        x = p.x*x*(1.0-x);
        f += 0.1*exp(-200000.0*(p.y-x)*(p.y-x));
    }
    
    f = 1.0 - f;

    // fixed points
    float al = 0.5 + 0.5*cos(time*6.2831);
    f *= al + (1.0-al)*smoothstep(0.0,1.5*e,abs(p.x-1.0));
    f *= al + (1.0-al)*smoothstep(0.0,1.5*e,abs(p.x-3.0));
    f *= al + (1.0-al)*smoothstep(0.0,1.5*e,abs(p.x-3.4495));
    gl_FragColor =  vec4(  f, f, f, 1.0 );
}

