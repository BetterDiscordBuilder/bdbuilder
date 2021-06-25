import React from 'react';

export type fallback = ({ error, info }: { error: Error, info: React.ErrorInfo }) => any;

export default class ErrorBoundary extends React.Component<{ id: string, fallback?: fallback }> {
    state = { hasError: false, error: null, info: null, didFallbackError: false };

    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({
            hasError: true,
            didFallbackError: false,
            info,
            error
        });
        console.error(`[ErrorBoundary:${this.props.id}] HI OVER HERE!! SHOW THIS SCREENSHOT TO THE DEVELOPER.\n`, error);
    }

    public render() {
        const { fallback: Fallback } = this.props;

        if (this.state.hasError && typeof this.props.fallback === 'function' && !this.state.didFallbackError) {
            return (
                <Fallback error={this.state.error} info={this.state.info} />
            );
        } else if (typeof this.props.fallback !== 'function' && this.state.hasError) {
            return (
                <div>Component Error</div>
            );
        } else if (this.state.didFallbackError && this.state.hasError) {
            return (
                <div>Double Crashed.</div>
            );
        }

        return this.props.children;
    }

    public static from(Component: any, name?: string, fallback?: fallback) {
        const id = name ?? Component.displayName ?? Component.name;

        const Element = React.memo(props => (
            <ErrorBoundary id={id} fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        ));
        Object.assign(Element, Component);

        return Element;
    }
}