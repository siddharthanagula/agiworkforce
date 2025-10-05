import { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    });
    
    // You could also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full space-y-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-destructive mt-0.5" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Oops! Something went wrong
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    We encountered an unexpected error. This has been logged and we'll look into it.
                  </p>
                  
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <details className="mb-4">
                      <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                        Error details (development only)
                      </summary>
                      <pre className="mt-2 text-xs bg-background/50 p-2 rounded overflow-auto">
                        {this.state.error.toString()}
                        {this.state.errorInfo?.componentStack}
                      </pre>
                    </details>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={this.handleReset}
                      variant="default"
                      size="sm"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/'}
                      variant="outline"
                      size="sm"
                    >
                      Go to Home
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
