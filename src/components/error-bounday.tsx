'use client'

import { ReactNode, Component, ErrorInfo } from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError)
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="max-w-md w-full mx-auto p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <h2 className="text-lg font-semibold text-foreground">
                Something went wrong
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {this.state.error.message || 'An unexpected error occurred'}
            </p>
            <details className="mb-6 text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-2">
                Error details
              </summary>
              <pre className="bg-background p-2 rounded overflow-auto max-h-32">
                {this.state.error.stack}
              </pre>
            </details>
            <Button
              onClick={this.resetError}
              className="w-full gap-2"
            >
              <RotateCcw size={16} />
              Try again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
