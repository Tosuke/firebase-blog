import * as React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import { NextContext } from 'next'

type InitialPropsProvider<A> = (context: NextContext) => A | Promise<A>
type InitialPropsEnhancer<A> = <B>(component: React.ComponentType<A & B>) => React.ComponentType<B>

export function withInitialProps<A>(provider: InitialPropsProvider<A>): InitialPropsEnhancer<A> {
  return <B>(BaseComponent: React.ComponentType<A & B>) => {
    class WithInitialPropsWrapper extends React.Component<B> {
      static readonly displayName = `withInitialProps(${BaseComponent.displayName})`

      public static getInitialProps(context: NextContext): A | Promise<A> {
        return provider(context)
      }

      public render() {
        return React.createElement(BaseComponent, this.props as any)
      }
    }
    return hoistNonReactStatic(WithInitialPropsWrapper, BaseComponent)
  }
}
