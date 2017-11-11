/// <reference path="../node_modules/@types/googlemaps/index.d.ts" />
/// <reference path="../node_modules/@types/mithril/index.d.ts" />
/// <reference path="../node_modules/compote/components/index.d.ts" />

import { Vnode, Component, Hyperscript } from 'mithril';

declare global {
  const process: {
    env: Record<string, any>;
  };

  interface Action<ActionType> {
    type?: ActionType;
  }

  interface FnComponent<State = {}, ElementType = HTMLDivElement> {
    (vnode: any): Component<State & Partial<ElementType>, null>;
  }

  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
  namespace JSX {
    type Element = any;

    type IntrinsicElements = {
      [key: string]: any
    };
  }

  const m: Hyperscript;
}
