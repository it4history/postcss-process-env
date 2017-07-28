# postcss-process-env
PostCSS plugin that puts values from process.env into css

# examples
```css
div {
    position: absolute;
    width: <%env.div_size%>em; 
    height: <%process.env.div_size%>em; 
    top: v(div_top); 
}

env. is shorthand for process.env.

values should be of type number or string, and are converted to number

if values are set of type string with suffix then their full value may be referenced in css as v(name) where name without prefix process.env.
