import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

describe('Dashboard App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  it('renders welcome screen initially', () => {
    render(<App />)
    
    expect(screen.getByText('Professional Dashboard Builder')).toBeInTheDocument()
    expect(screen.getByText('Start Building Dashboard')).toBeInTheDocument()
  })

  it('can navigate from welcome to dashboard', async () => {
    render(<App />)
    
    const startButton = screen.getByText('Start Building Dashboard')
    fireEvent.click(startButton)
    
    await waitFor(() => {
      expect(screen.getByText('Dashboard Builder')).toBeInTheDocument()
    })
  })

  it('shows empty dashboard state initially', async () => {
    // Mock localStorage to skip welcome screen
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ showWelcome: false }))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Your dashboard is empty')).toBeInTheDocument()
      expect(screen.getAllByText('Add Widget')).toHaveLength(2) // Header button + empty state button
    })
  })

  it('can toggle theme', () => {
    render(<App />)
    
    const themeToggle = screen.getByTitle('Toggle Theme')
    fireEvent.click(themeToggle)
    
    // Check if theme was saved to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('dashboard-theme', expect.any(String))
  })
})
