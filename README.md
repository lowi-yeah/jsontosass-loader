
---
# yaml to sass loader for webpack

## Straight forward adaption of Edward Irbys jsontosass-loader

### Installation

`npm install ymltosass-loader --save-dev`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Example config

``` javascript
var sassVars = 'path/to/your/vars.json';
var webpackConfig = {
    module: {
        loaders:[
            {test: /.scss$/, loader: "style!css!sass!ymltosass?path="+ sassVars}
        ]
    },
}

```

**Input [YourVars.yml file]**
``` yml
breakpoints:
  - portraitS: "320px"
  - portraitM: "360px"
  - portraitL: "414px"

localNavHeight: "50px"
```

**Output SCSS**
``` scss
$breakpoints:(portraitS:320px,portraitM:360px,portraitL:414px);
$localNavHeight:50px;
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
