// eslint-disabled
import React, { useEffect, useRef, useCallback } from 'react';

export default function Iframe(props) {
  const iframeRef = useRef();

  useEffect(() => {
    const onBlur = () => {
      if (
        document.activeElement &&
        document.activeElement.nodeName.toLowerCase() === 'iframe' &&
        iframeRef.current &&
        iframeRef.current === document.activeElement
      ) {
        // infer a click event
        props.onInferredClick(iframeRef.current);
      }
    };

    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  const { onInferredClick, ...cuprops } = props;

  return <iframe {...cuprops} ref={iframeRef} />;
}
