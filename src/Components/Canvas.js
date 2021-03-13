import React, { useEffect, useState } from "react";
import "./Canvas.css";
import Card from "./Card/Card";
import Media from "./Media";

// ELSE, try out class component and make full use of constructor + componentDidMount
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.interactiveCanvas = window.interactiveCanvas;
    this.callbacks = {};
    this.callbacks.onUpdate = (data) => {
      this.callbacks.html_data = data;
      switch (data.scene) {
        case "WELCOME":
          console.log("welcome got called");
          break;
        case "CARD":
          console.log("Hello card");
          window.interactiveCanvas.sendTextQuery("card");
          this.cardScene();
          break;
        case "MEDIA":
          window.interactiveCanvas.sendTextQuery("media");
          this.mediaScene();
          break;
        default:
          break;
      }
    };
    this.state = {
      marginTop: "0px",
      sceneType: "WELCOME",
    };
  }

  componentDidMount() {
    this.interactiveCanvas.getHeaderHeightPx().then((height) => {
      this.setState({ marginTop: `${height}px` });
      this.interactiveCanvas.ready(this.callbacks);
    });
  }

  welcomeScene = () => {
    this.setState({ sceneType: "WELCOME" });
  };

  cardScene = () => {
    this.setState({ sceneType: "CARD" });
  };

  mediaScene = () => {
    this.setState({ sceneType: "MEDIA" });
  };

  renderWelcomeScene = () => {
    return (
      <div
        className="splash-container"
        style={{ marginTop: this.state.marginTop }}
      >
        <span className="quiz-text">Hello! Splash Container</span> <br />
        <h1 className="quiz-text">React w Canvas</h1>
      </div>
    );
  };

  render() {
    const { sceneType } = this.state;
    if (sceneType === "WELCOME") return this.renderWelcomeScene();
    if (sceneType === "CARD") return <Card marginTop={this.state.marginTop} />;
    if (sceneType === "MEDIA")
      return <Media marginTop={this.state.marginTop} />;
  }
}
// const Canvas = () => {
//   let interactiveCanvas;
//   let callbacks = {};
//   let imageLoader = true;
//   // let showSplashScreen = true;
//   // const [showSplashScreen, setSplashScreen] = useState(true);
//   // const [marginTop, setMarginTop] = useState("0px");

//   //   const [interactiveCanvas, setInteractiveCanvas] = useState(null);

//   console.log(window.interactiveCanvas);
//   console.log(window.interactiveCanvas.getHeaderHeightPx());
//   console.log("wtf is this man");
//   console.log("we can actually get this????");

//   useEffect(() => {
//     // setInteractiveCanvas(window.interactiveCanvas);
//     interactiveCanvas = window && window.interactiveCanvas;
//     callbacks.onUpdate = (data) => {
//       console.log(data);
//       callbacks.html_data = data;
//       switch (data.scene) {
//         case "WELCOME":
//           console.log("welcome got called");
//           break;
//       }
//     };
//     interactiveCanvas.ready(callbacks);
//     const initializeScene = () => {
//       // interactiveCanvas.ready(callbacks);
//       interactiveCanvas.getHeaderHeightPx().then((height) => {
//         // setMarginTop(height);
//         // console.log(height)
//         // console.log("got height??")
//         // interactiveCanvas.ready(callbacks);
//         setTimeout(() => {
//           // showSplashScreen = false;

//           setSplashScreen(false);
//           // $(document.body).css('background-color', `#553d7c`);
//         }, 16000);
//       });
//     };

//     initializeScene();
//   }, []);

//   // initialize scene
//   // useEffect(() => {
//   //   interactiveCanvas.ready(callbacks);
//   //   window.interactiveCanvas.getHeaderHeightPx().then((height) => {
//   //     // setMarginTop(height);
//   //     // console.log(height)
//   //     // console.log("got height??")
//   //     setTimeout(() => {
//   //       // showSplashScreen = false;

//   //       setSplashScreen(false);
//   //       // $(document.body).css('background-color', `#553d7c`);
//   //     }, 16000);
//   //   });
//   // });

//   // return (
//   //   {showSplashScreen && (
//   //   <div className="splash-container">
//   //     <span className="quiz-text">Hello! Splash Container</span> <br />
//   //     <h1 className="quiz-text">React w Canvas</h1>
//   //   </div>)
//   //   }
//   // );

//   // if (showSplashScreen) {
//     return (
//       <div className="splash-container">
//         <span className="quiz-text">Hello! Splash Container</span> <br />
//         <h1 className="quiz-text">React w Canvas</h1>
//       </div>
//     );
//   // }

//   // return (
//   //   <div className="splash-container">
//   //     <Card />
//   //   </div>
//   // );
// };

export default Canvas;
