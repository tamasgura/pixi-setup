const Sprite = PIXI.Sprite;
const TextureCache = PIXI.utils.TextureCache;
const resources = PIXI.loader.resources;
let state;
let sprites;

init();

function gameLoop(delta){
  // Update the current game state:
  state(delta);
}

function play(delta) {
  // Mofify sprites

}

function init() {
  initPixiCanvas();
  const app = initPixiApplication();
  const imageSprites = getImagesFromAssets();
  initTextures(imageSprites).then((textures) => {
    //Set the game state
    sprites = {}

    state = play;
    addTexturesToStage(app, sprites);
    app.ticker.add((delta) => gameLoop(delta, sprites))
  });
}

function initPixiCanvas() {
  let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
  }
  PIXI.utils.sayHello(type);
}

function initPixiApplication() {
  // Create a Pixi Application
  let app = new PIXI.Application({width: 256, height: 256});
  // Make canvas full size
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  // Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);
  return app;
}

function getImagesFromAssets() {
  function importImages(r) {
    return r.keys().forEach(key => cache[key] = r(key));
  }

  const sourcePath = './src/' // NOTE config
  const pathToImageAssets = 'assets/images/';  // NOTE config
  const cache = {};
  const sprites = {};

  importImages(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));

  Object.keys(cache).forEach(k => {
    const imageName = k.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
    sprites[imageName] = {
      src: sourcePath + pathToImageAssets + k,
      value: null,
    }
  })
  return sprites;
}

function initTextures(sprites) {
  return new Promise((resolve) => {
    const sourceArray = Object.keys(sprites).map(s => sprites[s].src);

    PIXI.loader.add(sourceArray)
      .load(() => setup(sprites))

    function setup(sprites) {
      Object.keys(sprites).forEach(s => {
        sprites[s].value = new PIXI.Sprite(
          PIXI.loader.resources[sprites[s].src].texture
        )
      });
      resolve(sprites);
    }
  });
}

function addTexturesToStage(app, components) {
  function addStyles() {
    Object.keys(components).forEach((k) => {
      if (components[k].options) {
        Object.keys(components[k].options).forEach((o) => {
          components[k].value[o] = components[k].options[o];
        })
      }
    });
  }
  addStyles();
}
