import { useState, useCallback } from 'react';

interface PurchaseAnimationState {
  isVisible: boolean;
  title: string;
  message: string;
  clickPosition?: { x: number; y: number };
}

export const usePurchaseAnimation = () => {
  const [animationState, setAnimationState] = useState<PurchaseAnimationState>({
    isVisible: false,
    title: '',
    message: '',
  });

  const triggerAnimation = useCallback((
    title: string,
    message: string,
    clickEvent?: React.MouseEvent | MouseEvent
  ) => {
    let clickPosition: { x: number; y: number } | undefined;
    
    if (clickEvent) {
      clickPosition = {
        x: clickEvent.clientX,
        y: clickEvent.clientY,
      };
    }

    setAnimationState({
      isVisible: true,
      title,
      message,
      clickPosition,
    });
  }, []);

  const hideAnimation = useCallback(() => {
    setAnimationState(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return {
    animationState,
    triggerAnimation,
    hideAnimation,
  };
};