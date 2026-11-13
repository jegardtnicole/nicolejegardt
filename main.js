const { Application, Graphics, Text } = PIXI;

gsap.registerPlugin(Physics2DPlugin);

const app = new Application();
await app.init({ background: "#97dff1ff", resizeTo: window, antialias: true });
document.body.appendChild(app.canvas);

app.stage.eventMode = "static";
app.stage.cursor = "pointer";
app.stage.hitArea = app.screen;

const colors = ["#ff0099", "#00ffff", "#33ff00", "#9900ff", "#ffcc00"];

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

const text = new Text({
  text: "Click to celebrate",
  style: { fontFamily: "impact", fontSize: 50, fill: "white", align: "center" },
  anchor: 0.5,
  x: app.screen.width / 2,
  y: app.screen.height / 2 - 50,
});
app.stage.addChild(text);
