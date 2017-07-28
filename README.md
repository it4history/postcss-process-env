# postcss-process-env
PostCSS plugin that puts values from process.env into css

# examples
```css
div {
    position: absolute;
    width: <%env.div_size%>em; 
    height: <%process.env.div_size%>em; 
}

env. is shorthand for process.env.

values should be of type number or string, and are converted to number
