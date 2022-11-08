import { Ref, ToRefs, ComponentPublicInstance } from 'vue';
import {
  ComputePositionReturn,
  Middleware,
  MiddlewareData,
  Placement,
  Side,
  Strategy,
  ReferenceElement,
  FloatingElement,
  Padding,
} from '@floating-ui/dom';

export * from '@floating-ui/dom';

// common
export type MaybeRef<T> = T | Ref<T>;

// useFloating.js
export type UseFloatingData = Omit<ComputePositionReturn, 'x' | 'y'> & {
  x: number | null;
  y: number | null;
};

export type UseFloatingReturn = ToRefs<UseFloatingData> & {
  update: () => void;
  reference: Ref<ReferenceElement | ComponentPublicInstance | null>;
  floating: Ref<FloatingElement | ComponentPublicInstance | null>;
};

export type UseFloatingProps = {
  placement?: MaybeRef<Placement>;
  strategy?: MaybeRef<Strategy>;
  middleware?: MaybeRef<Array<Middleware>>;
  whileElementsMounted?: (
    reference: ReferenceElement,
    floating: FloatingElement,
    update: () => void
  ) => void | (() => void);
};

export function useFloating({
  placement,
  middleware,
  strategy,
  whileElementsMounted,
}?: UseFloatingProps): UseFloatingReturn;

// arrow.js
// @todo Should be re-exported by @floating-ui/dom
export type ArrowOptions = {
  element: MaybeRef<HTMLElement | null>;
  padding?: Padding;
};

export type ArrowPositionOptions = Omit<ArrowOptions, 'padding'>;

export type ComputeArrowPositionOptions = {
  element: MaybeRef<HTMLElement>;
  placement: MaybeRef<Placement>;
  middlewareData: MaybeRef<MiddlewareData>;
};

// @todo learn how to cast SideObject type to be "px string"
export type ComputeArrowPositionReturn = Partial<{
  [key in Side]: string;
}>;

export function arrow({ element, padding }: ArrowOptions): Middleware;
export function arrowPosition({ element }: ArrowPositionOptions): Middleware;

export function computeArrowPosition({
  element,
  placement,
  middlewareData,
}: ComputeArrowPositionOptions): ComputeArrowPositionReturn;
