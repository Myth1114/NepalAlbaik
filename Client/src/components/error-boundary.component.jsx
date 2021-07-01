import React from "react";
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from "./error-boundary.styles";
class ErrorBoundary extends React.Component {
  //? we wrap this comp to the lazy comp to catch the error
  constructor() {
    super();
    this.state = { hasErrored: false };
  }

  static getDerivedStateFromError(error) {
    //? this lifecycle method will catch all the error in the children
    //* and then change the internal state to signify that error has occured
    return { hasErrored: true };
  }
  componentDidCatch(error, info) {
    //do something with error(sideeffect)
    //* this catch error and info about error and allows sideeffect on them
 
  }
  render() {
    if (this.state.hasErrored) {
      return (
          // ! using custom component (UI) to render when error caught
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
          <ErrorImageText>we are lost </ErrorImageText>
        </ErrorImageOverlay>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
