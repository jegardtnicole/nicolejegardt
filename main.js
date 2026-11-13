//hämtar funktioner från pixi
const { Application, Graphics, Text } = PIXI;

gsap.registerPlugin(Physics2DPlugin);

//skapar det jag tog från pixi
const app = new Application();
await app.init({ background: "#141b1dff", resizeTo: window, antialias: true });
document.body.appendChild(app.canvas);

app.stage.eventMode = "static";
app.stage.cursor = "pointer";
app.stage.hitArea = app.screen;

//färg till konfetting
const colors = ["#ff0099", "#00ffff", "#33ff00", "#9900ff", "#ffcc00"];

//skapar konfettin vid klick
window.addEventListener("click", (event) => {
  const dotCount = gsap.utils.random(15, 30, 1);

  for (let i = 0; i < dotCount; i++) {
    const dot = new Graphics()
      .circle(0, 0, gsap.utils.random(20, 40))
      .fill("white");

    app.stage.addChild(dot);

    gsap.set(dot, {
      tint: gsap.utils.random(colors),
      x: event.clientX,
      y: event.clientY,
      scale: 0,
    });

//rörelse till cirklarna
    gsap
      .timeline({ onComplete: () => dot.destroy() })
      .to(dot, {
        scale: gsap.utils.random(0.3, 1),
        duration: 0.02,
        ease: "power3.out",
      })
      .to(dot, {
        duration: 2,
        physics2D: {
          velocity: gsap.utils.random(500, 1000),
          angle: gsap.utils.random(0, 360),
          gravity: 1500,
        },
        ease: "none",
      });
  }
});

//text i mitten av sidan om konfettin
const text = new Text({
  text: "Click for confetti",
  style: { fontFamily: "impact", fontSize: 50, fill: "lightblue", align: "center" },
  anchor: 0.5,
  x: app.screen.width / 2,
  y: app.screen.height / 2 - 50,
});
app.stage.addChild(text);
