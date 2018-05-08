precision mediump float; 
uniform float     time; 
uniform vec2      resolution; 
uniform vec2      mouse; 
/*
void main(void){
	vec2 p=gl_FragCoord.xy/resolution.x*4.-vec2(2.5,1.1);
	vec2 z=p,r;
	float j=0.;
	for(int i=0;i<201;i++){
		r=p+vec2(z.x*z.x-z.y*z.y,2.*z.y*z.x);
		if(length(r)>2.)
		  break;
		z=r;
		j+=1.;
	}
    gl_FragColor =  vec4(step(j,199.)*j*vec3(0.05,j*0.0003,0.),1.);
}*/
void main(void){
	vec3 col = vec3(0.0);
	vec2 q = gl_FragCoord.xy / resolution.xy;
    vec2 p = -1.0 + 2.0 * q;
    p.x *= resolution.x/resolution.y;
	float zoo = 0.62 + 0.38*cos(.07*time);
    float coa = cos( 0.15*(1.0-zoo)*time );
    float sia = sin( 0.15*(1.0-zoo)*time );
    zoo = pow( zoo,8.0);
    vec2 xy = vec2( p.x*coa-p.y*sia, p.x*sia+p.y*coa);
    vec2 c = vec2(-.745,.186) + xy*zoo;

    const float B = 256.0;
    float l = 0.0;
	vec2 z  = vec2(0.0);
    for( int i=0; i<200; i++ )
        {
            // z = z*z + c		
    		z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;
		
    		if( dot(z,z)>(B*B) ) break;

    		l += 1.0;
        }

    	// ------------------------------------------------------
        // smooth interation count
    	//float sl = l - log(log(length(z))/log(B))/log(2.0);
        
        // equivalent optimized smooth interation count
    	float sl = l - log2(log2(dot(z,z))) + 4.0; 
    	// ------------------------------------------------------
	
        float al = smoothstep( -0.1, 0.0, sin(0.5*6.2831*time ) );
        l = mix( l, sl, al );

        col += 0.5 + 0.5*cos( 3.0 + l*0.15 + vec3(0.0,0.6,1.0));
       gl_FragColor =  vec4(col,1.);
}

